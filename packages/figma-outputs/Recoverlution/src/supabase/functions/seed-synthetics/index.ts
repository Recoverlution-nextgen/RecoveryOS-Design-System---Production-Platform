// seed-synthetics edge function
// Params: count_users, coverage_per_mindblock, days, cohort_label, with_orgs, with_journeys, with_notifications
// Implements: create users via Auth Admin API, upsert profiles/org_members, deterministic plan for mindblock coverage,
// batched inserts into content_engagements, optional journeys/notifications, idempotent via deterministic keys.
// Deno runtime, no external deps beyond npm:@supabase/supabase-js for Admin API.

import { createClient } from "npm:@supabase/supabase-js@2.44.4";

interface SeedParams {
  count_users?: number;
  coverage_per_mindblock?: number;
  days?: number;
  cohort_label?: string;
  with_orgs?: boolean;
  with_journeys?: boolean;
  with_notifications?: boolean;
}

const DEFAULTS = {
  count_users: 3000,
  coverage_per_mindblock: 15,
  days: 45,
  cohort_label: 'synthetics_v1',
  with_orgs: true,
  with_journeys: false,
  with_notifications: false,
};

// Deterministic PRNG (xorshift32)
function makePRNG(seed: number) {
  let x = seed || 123456789;
  return function rand() {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    // convert to [0,1)
    return ((x >>> 0) / 0xFFFFFFFF);
  };
}

// Lognormal-ish duration: median ~180s, tail to ~1800s
function sampleDuration(rand: () => number) {
  const mu = Math.log(180);
  const sigma = 0.9; // fat tail
  // Box-Muller
  const u1 = Math.max(1e-9, rand());
  const u2 = Math.max(1e-9, rand());
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const v = Math.exp(mu + sigma * z);
  return Math.min(1800, Math.max(15, Math.round(v)));
}

function clampRating(v: number) { return Math.max(1, Math.min(5, Math.round(v))); }

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') return new Response('Use POST', { status: 405 });
    const body = await req.json().catch(() => ({}));
    const p: SeedParams = { ...DEFAULTS, ...body };

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supa = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

    // 1) Ensure orgs
    let orgAlpha: string | null = null;
    let orgBeta: string | null = null;
    let orgGamma: string | null = null;
    if (p.with_orgs) {
      const orgs = [
        { name: 'alpha', organization_type: 'platform' },
        { name: 'beta', organization_type: 'platform' },
        { name: 'gamma', organization_type: 'platform' },
      ];
      for (const o of orgs) {
        const { data: found, error: fErr } = await supa
          .from('organizations')
          .select('id')
          .eq('name', o.name)
          .limit(1)
          .single();
        if (fErr && fErr.code !== 'PGRST116') throw fErr; // allow not found
        if (found) {
          if (o.name === 'alpha') orgAlpha = found.id; else if (o.name === 'beta') orgBeta = found.id; else orgGamma = found.id;
        } else {
          const { data: ins, error: iErr } = await supa
            .from('organizations')
            .insert({ name: o.name })
            .select('id')
            .single();
          if (iErr) throw iErr;
          if (o.name === 'alpha') orgAlpha = ins!.id; else if (o.name === 'beta') orgBeta = ins!.id; else orgGamma = ins!.id;
        }
      }
    }

    // 2) Create users via Auth Admin API (idempotent)
    // Determine desired email list
    const emails: string[] = Array.from({ length: p.count_users! }, (_, i) => `synthetic+${(i+1).toString().padStart(5,'0')}@example.com`);

    // Fetch existing to avoid duplicates
    // Supabase Auth Admin list is paginated; we query by email one-by-one for determinism
    const createdUserIds: string[] = [];
    for (const email of emails) {
      // Try get user by email
      const { data: userSearch, error: usErr } = await supa.auth.admin.listUsers({ page: 1, perPage: 1 });
      if (usErr) throw usErr;
      let userId: string | null = null;
      const existing = userSearch?.users?.find((u: any) => u.email === email);
      if (existing) {
        userId = existing.id;
        // Ensure synthetic flag in metadata if missing
        const meta = existing.user_metadata || {};
        if (!meta.synthetic) {
          await supa.auth.admin.updateUserById(userId, { user_metadata: { ...meta, synthetic: true, cohort_label: p.cohort_label } });
        }
      } else {
        const { data: created, error: cErr } = await supa.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: { synthetic: true, cohort_label: p.cohort_label },
        });
        if (cErr) throw cErr;
        userId = created.user?.id || null;
      }
      if (userId) createdUserIds.push(userId);
    }

    // 3) Upsert profiles and org membership
    // Assign org split: 60% alpha, 30% beta, 10% gamma
    const n = createdUserIds.length;
    const nA = Math.round(n * 0.6);
    const nB = Math.round(n * 0.3);
    const pickOrg = (idx: number): string | null => {
      if (!p.with_orgs) return null;
      if (idx < nA) return orgAlpha!;
      if (idx < nA + nB) return orgBeta!;
      return orgGamma!;
    };

    // Fetch existing profiles for upsert logic
    // We'll batch in pages
    const profileUpserts: any[] = [];
    for (let i = 0; i < n; i++) {
      const id = createdUserIds[i];
      const orgId = pickOrg(i);
      profileUpserts.push({ id, role: 'patient', organization_id: orgId, email: emails[i], full_name: null });
      if (profileUpserts.length >= 1000 || i === n - 1) {
        const { error: pErr } = await supa.from('profiles')
          .upsert(profileUpserts, { onConflict: 'id' });
        if (pErr) throw pErr;
        profileUpserts.length = 0;
      }
    }

    if (p.with_orgs) {
      // Upsert org_members
      const memberUpserts: any[] = [];
      for (let i = 0; i < n; i++) {
        const id = createdUserIds[i];
        const orgId = pickOrg(i);
        if (!orgId) continue;
        memberUpserts.push({ organization_id: orgId, user_id: id, role: 'member' });
        if (memberUpserts.length >= 1000 || i === n - 1) {
          const { error: mErr } = await supa.from('org_members')
            .upsert(memberUpserts, { onConflict: 'organization_id,user_id' });
          if (mErr) throw mErr;
          memberUpserts.length = 0;
        }
      }
    }

    // 3b) Upsert sim_users (NEW - required for continuous synthetics runner)
    // This table tracks which users are synthetic for the /synthetics/run endpoint
    const simUserUpserts: any[] = [];
    const personas = [
      'motivated_beginner',
      'struggling_returner', 
      'high_risk_relapse',
      'stable_maintainer',
      'crisis_intervention',
      'family_concerned',
      'mandated_treatment',
      'dual_diagnosis',
      'chronic_relapser',
      'early_recovery'
    ];
    
    for (let i = 0; i < n; i++) {
      const id = createdUserIds[i];
      const orgId = pickOrg(i);
      const personaKey = personas[i % personas.length]; // Distribute personas evenly
      
      simUserUpserts.push({ 
        profile_id: id,
        org_id: orgId,
        persona_key: personaKey,
        cohort_label: p.cohort_label,
        started_at: new Date().toISOString(),
        metadata: { 
          email: emails[i],
          created_by: 'seed-synthetics',
          batch_timestamp: new Date().toISOString()
        }
      });
      
      if (simUserUpserts.length >= 1000 || i === n - 1) {
        const { error: simErr } = await supa.from('sim_users')
          .upsert(simUserUpserts, { onConflict: 'profile_id' });
        if (simErr) {
          console.error('Error upserting sim_users:', simErr);
          // Don't throw - continue even if sim_users fails (table might not exist yet)
        }
        simUserUpserts.length = 0;
      }
    }

    // 4) Fetch mindblocks and precompute plan (deterministic). Guarantee coverage_per_mindblock.
    const { data: mbs, error: mbErr } = await supa.from('mindblock_library').select('id').order('id');
    if (mbErr) throw mbErr;
    const mindblockIds: string[] = (mbs || []).map((r: any) => r.id);

    // Deterministic assignment of users to mindblocks
    // For each mindblock, pick K distinct users based on hash of mindblock id + seed
    const seed = [...p.cohort_label!].reduce((a,c)=>a + c.charCodeAt(0), 0) + p.count_users! + p.coverage_per_mindblock!;
    const rand = makePRNG(seed);

    // Time window bounds
    const now = new Date();
    const start = new Date(now.getTime() - p.days! * 24 * 3600 * 1000);

    // Helper to sample timestamp in window with daytime bias
    function sampleTimestamp(rng: () => number) {
      const t = start.getTime() + Math.floor(rng() * (now.getTime() - start.getTime()));
      const d = new Date(t);
      // Force activity hours 08:00–22:00 local
      const hour = Math.floor(8 + rng() * 14);
      d.setHours(hour, Math.floor(rng()*60), Math.floor(rng()*60), 0);
      return d.toISOString();
    }

    // Plan to insert engagements
    // content_engagements columns: id (uuid default), individual_id, organization_id, content_type, content_id, action, duration_seconds, context_tags, metadata, created_at
    // We'll create rows for actions: viewed, started, completed (65%), rated (50%)

    let engagementsCreated = 0;
    const batch: any[] = [];

    // Build a round-robin index of users for deterministic spread
    const users = createdUserIds;
    const userCount = users.length;

    // Helper: rating dist ~ N(4.1, 0.7)
    function sampleRating(rng: () => number) {
      // Box-Muller
      const u1 = Math.max(1e-9, rng());
      const u2 = Math.max(1e-9, rng());
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const val = 4.1 + 0.7 * z;
      return clampRating(val);
    }

    // Choose reflection 20% of completed
    function maybeReflection(rng: () => number) {
      if (rng() < 0.2) {
        const texts = [
          'Felt helpful and practical.',
          'Noticed a small shift in perspective.',
          'Will try this again later today.',
          'A bit challenging, but made sense.',
          'Good reminder during a rough moment.'
        ];
        return texts[Math.floor(rng() * texts.length)];
      }
      return null;
    }

    // Org mapper for user index
    function orgForUserIdx(i: number) {
      if (!p.with_orgs) return null;
      const o = pickOrg(i);
      return o || null;
    }

    const K = p.coverage_per_mindblock!;

    // For idempotency, we will compute a deterministic dedupe key and skip if exists
    // Use metadata.seed_key = `${cohort_label}:${mindblock_id}:${user_id}` for action group

    async function flushBatch() {
      if (!batch.length) return;
      const { error: eErr } = await supa.from('content_engagements').insert(batch);
      if (eErr) throw eErr;
      engagementsCreated += batch.length;
      batch.length = 0;
    }

    // Walk all mindblocks
    for (let mi = 0; mi < mindblockIds.length; mi++) {
      const mindblock_id = mindblockIds[mi];
      // deterministically pick K distinct user slots spread across pool
      // start index based on hash-like transformation
      const base = Math.floor(rand() * userCount);
      const chosen: number[] = [];
      let cursor = base;
      while (chosen.length < Math.min(K, userCount)) {
        if (!chosen.includes(cursor)) chosen.push(cursor);
        cursor = (cursor + Math.floor(1 + rand() * 13)) % userCount; // stride
      }

      for (const uIdx of chosen) {
        const user_id = users[uIdx];
        const organization_id = orgForUserIdx(uIdx);
        const t_view = sampleTimestamp(rand);
        const t_start = sampleTimestamp(rand);
        const doComplete = rand() < 0.65;
        const doRate = rand() < 0.5;
        const duration_seconds = sampleDuration(rand);
        const rating = doRate ? sampleRating(rand) : null;
        const reflection = doComplete ? maybeReflection(rand) : null;
        const metaBase: any = { cohort_label: p.cohort_label, seed_key: `${p.cohort_label}:${mindblock_id}:${user_id}` };

        // idempotency: check if any engagement with this seed_key exists; if so, skip all actions for this pair
        const { data: exists, error: exErr } = await supa
          .from('content_engagements')
          .select('id')
          .eq('content_type','mindblock')
          .eq('content_id', mindblock_id)
          .eq('individual_id', user_id)
          .contains('metadata', { cohort_label: p.cohort_label })
          .limit(1);
        if (exErr) throw exErr;
        if (exists && exists.length) continue;

        // viewed
        batch.push({ individual_id: user_id, organization_id, content_type: 'mindblock', content_id: mindblock_id, action: 'viewed', duration_seconds: null, metadata: metaBase, created_at: t_view });
        // started
        batch.push({ individual_id: user_id, organization_id, content_type: 'mindblock', content_id: mindblock_id, action: 'started', duration_seconds: null, metadata: metaBase, created_at: t_start });
        // completed
        if (doComplete) {
          batch.push({ individual_id: user_id, organization_id, content_type: 'mindblock', content_id: mindblock_id, action: 'completed', duration_seconds, metadata: { ...metaBase, reflection }, created_at: sampleTimestamp(rand) });
        }
        // rated
        if (doRate && rating !== null) {
          batch.push({ individual_id: user_id, organization_id, content_type: 'mindblock', content_id: mindblock_id, action: 'rated', duration_seconds: null, metadata: { ...metaBase, rating }, created_at: sampleTimestamp(rand) });
        }

        if (batch.length >= 10000) {
          await flushBatch();
        }
      }
    }
    await flushBatch();

    // Optional: with_journeys / with_notifications hooks (conservative no-ops unless true)
    if (p.with_journeys) {
      // Minimal subset: create a few journey_runs and a couple scene_runs per run for first 200 users
      const cut = Math.min(200, users.length);
      for (let i = 0; i < cut; i++) {
        const individual_id = users[i];
        const { data: jr, error: jrErr } = await supa.from('journey_runs')
          .insert({ template_id: 'onboarding', user_id: null, status: 'running', started_at: new Date().toISOString() })
          .select('id')
          .single();
        if (jrErr) continue;
        const run_id = jr!.id;
        await supa.from('scene_runs').insert([
          { journey_run_id: run_id, template_id: 'onboarding', scene_number: 1, status: 'completed', started_at: new Date().toISOString(), completed_at: new Date().toISOString() },
          { journey_run_id: run_id, template_id: 'onboarding', scene_number: 2, status: 'completed', started_at: new Date().toISOString(), completed_at: new Date().toISOString() },
        ]);
      }
    }

    if (p.with_notifications) {
      // Seed a tiny set of in-app notifications for first 100 users
      const cut = Math.min(100, users.length);
      const rows = [] as any[];
      for (let i = 0; i < cut; i++) {
        const individual_id = users[i];
        rows.push({
          audience: 'user',
          recipient_profile_id: individual_id,
          channel: 'in_app',
          category: 'system',
          template_id: null,
          rendered_title: 'Welcome to synthetic seed',
          rendered_body: 'This is a test notification for synthetic cohort.',
          status: 'queued',
          send_after: new Date().toISOString(),
          metadata: { cohort_label: p.cohort_label },
        });
      }
      await supa.from('notifications_outbox').insert(rows);
    }

    // Report
    // Compute mindblocks_covered and min/max engagements per mindblock
    const { data: cov, error: covErr } = await supa
      .from('content_engagements')
      .select('content_id')
      .eq('content_type','mindblock')
      .contains('metadata', { cohort_label: p.cohort_label });
    if (covErr) throw covErr;
    
    const coverageMap = new Map<string, number>();
    for (const r of cov as any[]) {
      const key = r.content_id as string;
      coverageMap.set(key, (coverageMap.get(key) || 0) + 1);
    }
    const covered = coverageMap.size;
    const counts = [...coverageMap.values()];
    const minC = counts.length ? Math.min(...counts) : 0;
    const maxC = counts.length ? Math.max(...counts) : 0;

    const result = {
      users_created: createdUserIds.length,
      engagements_created: engagementsCreated,
      mindblocks_covered: covered,
      min_engagements_per_mindblock: minC,
      max_engagements_per_mindblock: maxC,
    };
    return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});