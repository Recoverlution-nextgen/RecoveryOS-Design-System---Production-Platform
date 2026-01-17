/**
 * NAVICUE-ROUTER V2 — FULL LUMA INTEGRATION
 * 
 * Integrates:
 * - Arousal computation (arousalComputation.ts)
 * - State computation (stateComputation.ts)
 * - Advanced scoring (advancedScoring.ts)
 * - Strategy selection (orchestrationEngine.ts patterns)
 * 
 * Deploy as replacement for navicue-router once ready.
 */

import { createClient } from "npm:@supabase/supabase-js@2.45.4";

// Note: In production, these would be imported from your lib directory
// For now, we'll inline the critical logic

const supabaseAdmin = () => createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const getUserClient = (jwt: string) => createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
  { global: { headers: { Authorization: `Bearer ${jwt}` } } }
);

const ok = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), { ...init, headers: { "Content-Type": "application/json", ...(init.headers || {}) } });
const bad = (status: number, message: string) => ok({ error: message }, { status });

// ============================================================================
// AROUSAL COMPUTATION (inlined from arousalComputation.ts)
// ============================================================================

const AROUSAL_THRESHOLDS = {
  resistance: { green_max: 4, amber_max: 7, red_min: 7 },
  choice_access: { green_min: 6, amber_min: 3, red_max: 3 },
  shame_threat: { green_max: 4, amber_max: 7, red_min: 7 },
  connection: { green_min: 5, amber_min: 3, red_max: 3 },
  fusion: { green_max: 5, amber_max: 8, red_min: 8 },
};

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function computeArousalFromSignals(signals: any[]): 'green' | 'amber' | 'red' {
  if (signals.length === 0) return 'amber';

  const avg = {
    resistance: mean(signals.map(s => s.resistance ?? 5)),
    choice_access: mean(signals.map(s => s.choice_access ?? 5)),
    shame_threat: mean(signals.map(s => s.shame_threat ?? 5)),
    connection: mean(signals.map(s => s.connection ?? 5)),
    fusion: mean(signals.map(s => s.fusion ?? 5)),
  };

  let score = 0;
  let votes = 0;

  // Resistance
  if (avg.resistance >= AROUSAL_THRESHOLDS.resistance.red_min) { score += 2; votes++; }
  else if (avg.resistance > AROUSAL_THRESHOLDS.resistance.green_max) { score += 1; votes++; }
  else { votes++; }

  // Choice access (inverted)
  if (avg.choice_access < AROUSAL_THRESHOLDS.choice_access.red_max) { score += 2; votes++; }
  else if (avg.choice_access < AROUSAL_THRESHOLDS.choice_access.green_min) { score += 1; votes++; }
  else { votes++; }

  // Shame threat
  if (avg.shame_threat >= AROUSAL_THRESHOLDS.shame_threat.red_min) { score += 2; votes++; }
  else if (avg.shame_threat > AROUSAL_THRESHOLDS.shame_threat.green_max) { score += 1; votes++; }
  else { votes++; }

  // Connection (inverted)
  if (avg.connection < AROUSAL_THRESHOLDS.connection.red_max) { score += 2; votes++; }
  else if (avg.connection < AROUSAL_THRESHOLDS.connection.green_min) { score += 1; votes++; }
  else { votes++; }

  const finalScore = score / votes;
  if (finalScore >= 1.5) return 'red';
  if (finalScore >= 0.7) return 'amber';
  return 'green';
}

async function computeArousal(userId: string, client: any) {
  const since = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  const { data: responses } = await client
    .from('navicue_responses')
    .select('meta')
    .eq('user_id', userId)
    .gte('captured_at', since);

  const signals = (responses || [])
    .map((r: any) => r.meta?.signals)
    .filter((s: any) => s && typeof s.resistance === 'number');

  return computeArousalFromSignals(signals);
}

// ============================================================================
// ADVANCED SCORING (inlined from advancedScoring.ts)
// ============================================================================

function scoreSchemaMatch(candidate: any, activeSchemas: any[]): number {
  if (!candidate.schema_id) return 20;
  const active = activeSchemas.find(s => s.schema === candidate.schema_id);
  return active ? active.heat : 20;
}

function scoreKBEAppropriateness(candidate: any, kbeReadiness: any[]): number {
  if (!candidate.schema_id) return 50;
  const readiness = kbeReadiness.find(k => k.schema === candidate.schema_id);
  if (!readiness) return 50;

  const layerOrder = ['knowing', 'believing', 'embodying'];
  const currentIdx = layerOrder.indexOf(readiness.current_layer);
  const targetIdx = layerOrder.indexOf(candidate.kbe_target);

  if (readiness.current_layer === candidate.kbe_target) return 80;
  if (targetIdx === currentIdx + 1 && readiness.ready_for_next) return 90 * readiness.confidence;
  if (targetIdx > currentIdx + 1) return 20;
  if (targetIdx < currentIdx) return 60;
  return 50;
}

function scoreArousalSafety(cueHeat: string, arousal: string): number {
  if (!cueHeat) return 100;
  const heatLvl: Record<string, number> = { low: 0, medium: 1, high: 2 };
  const arousalLvl: Record<string, number> = { green: 0, amber: 1, red: 2 };
  const h = heatLvl[cueHeat] ?? 1;
  const a = arousalLvl[arousal] ?? 1;
  if (h === a) return 100;
  if (h > a) return 70 + (h - a) * 10;
  return Math.max(0, 50 - (a - h) * 20);
}

function scoreFamilyEffectiveness(family: string, familyPerf: any[]): number {
  const perf = familyPerf.find(f => f.family === family);
  if (!perf) return 50;
  return (perf.engagement_score + perf.resonance_score) / 2;
}

function scoreNovelty(navicueId: string, recent: string[]): number {
  return recent.includes(navicueId) ? 10 : 100;
}

function scoreVariety(candidate: any, seenPillars: string[], seenFamilies: string[], seenSchemas: string[]): number {
  let score = 100;
  if (seenPillars.includes(candidate.pillar_id)) score -= 20;
  if (seenFamilies.includes(candidate.family)) score -= 20;
  if (candidate.schema_id && seenSchemas.includes(candidate.schema_id)) score -= 20;
  return Math.max(0, score);
}

function getStrategyWeights(strategy: string) {
  const base = { schema: 0.3, kbe: 0.2, arousal: 0.15, family: 0.15, novelty: 0.1, variety: 0.1 };
  if (strategy === 'schema_clustering') { base.schema = 0.5; base.family = 0.2; base.variety = 0.15; }
  if (strategy === 'kbe_progression') { base.kbe = 0.5; base.schema = 0.3; }
  if (strategy === 'heat_regulation') { base.arousal = 0.6; base.family = 0.2; }
  return base;
}

function scoreCandidate(
  candidate: any,
  arousal: string,
  activeSchemas: any[],
  kbeReadiness: any[],
  familyPerf: any[],
  recent: string[],
  seenPillars: string[],
  seenFamilies: string[],
  seenSchemas: string[],
  strategy: string
): number {
  const s_schema = scoreSchemaMatch(candidate, activeSchemas);
  const s_kbe = scoreKBEAppropriateness(candidate, kbeReadiness);
  const s_arousal = scoreArousalSafety(candidate.heat_level, arousal);
  const s_family = scoreFamilyEffectiveness(candidate.family, familyPerf);
  const s_novelty = scoreNovelty(candidate.id, recent);
  const s_variety = scoreVariety(candidate, seenPillars, seenFamilies, seenSchemas);

  const w = getStrategyWeights(strategy);
  return (
    s_schema * w.schema +
    s_kbe * w.kbe +
    s_arousal * w.arousal +
    s_family * w.family +
    s_novelty * w.novelty +
    s_variety * w.variety
  );
}

// ============================================================================
// USER & ADMIN
// ============================================================================

async function getUserAndJwt(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const jwt = auth.startsWith("Bearer ") ? auth.slice(7) : undefined;
  if (!jwt) return { user: null, jwt: null };
  const client = getUserClient(jwt);
  const { data } = await client.auth.getUser();
  return { user: data?.user ?? null, jwt };
}

async function isAdmin(userId: string) {
  const supa = supabaseAdmin();
  const { data } = await supa.from("app_admins").select("user_id").eq("user_id", userId).limit(1);
  return !!(data && data.length > 0);
}

function withinQuietHoursUTC(start: string | null, end: string | null, now: Date): boolean {
  if (!start || !end) return false;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const s = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), sh || 0, sm || 0));
  const e = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), eh || 0, em || 0));
  if (e <= s) return now >= s || now <= e;
  return now >= s && now <= e;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

Deno.serve(async (req: Request) => {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/functions\/v1\//, "");
    const method = req.method.toUpperCase();
    const { user, jwt } = await getUserAndJwt(req);
    if (!user || !jwt) return bad(401, "Unauthorized");

    if (path === "navicue-router-v2/serve-next" && method === "POST") {
      const { count = 3, mode = "adaptive", debug = false } = await req.json().catch(() => ({}));
      const admin = supabaseAdmin();
      const userClient = getUserClient(jwt);

      // Cadence & quiet hours
      const { data: cadence } = await admin
        .from("user_cadence_settings")
        .select("max_per_day, min_gap_minutes, quiet_start_utc, quiet_end_utc")
        .eq("user_id", user.id)
        .maybeSingle();

      const now = new Date();
      if (withinQuietHoursUTC(cadence?.quiet_start_utc, cadence?.quiet_end_utc, now)) {
        return ok({ navicues: [], reasoning: { blocked: "quiet_hours_utc" } });
      }

      // Daily limit
      const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
      const { count: servedToday } = await userClient
        .from("feed_exposures")
        .select("*", { count: "exact", head: true })
        .eq("content_type", "navicue")
        .gte("surfaced_at", startOfDayUTC.toISOString());

      if (cadence?.max_per_day != null && servedToday != null && servedToday >= cadence.max_per_day) {
        return ok({ navicues: [], reasoning: { blocked: "daily_limit", servedToday, max: cadence.max_per_day } });
      }

      // Min gap
      if (cadence?.min_gap_minutes) {
        const since = new Date(now.getTime() - cadence.min_gap_minutes * 60 * 1000).toISOString();
        const { count: recentGap } = await userClient
          .from("feed_exposures")
          .select("*", { count: "exact", head: true })
          .eq("content_type", "navicue")
          .gte("surfaced_at", since);
        if ((recentGap || 0) > 0) {
          return ok({ navicues: [], reasoning: { blocked: "min_gap", min_gap_minutes: cadence.min_gap_minutes } });
        }
      }

      // ========================================================================
      // COMPUTE AROUSAL (arousalComputation.ts)
      // ========================================================================
      const arousal = await computeArousal(user.id, userClient);

      // ========================================================================
      // LOAD STATE (stateComputation.ts via views)
      // ========================================================================
      const [schemaHeat, kbeReadiness, familyPerf, recentNavicues] = await Promise.all([
        admin.from('v_user_schema_heat').select('*').eq('user_id', user.id),
        admin.from('v_user_kbe_readiness').select('*').eq('user_id', user.id),
        admin.from('v_user_family_performance').select('*').eq('user_id', user.id),
        userClient.from('v_user_recent_navicues').select('navicue_id').eq('user_id', user.id),
      ]);

      const activeSchemas = (schemaHeat.data || []).map((s: any) => ({ schema: s.schema_id, heat: s.heat }));
      const kbeReady = (kbeReadiness.data || []).map((k: any) => ({
        schema: k.schema_id,
        current_layer: k.current_layer,
        ready_for_next: k.ready_for_next,
        confidence: parseFloat(k.confidence || 0),
      }));
      const familyPerformance = (familyPerf.data || []).map((f: any) => ({
        family: f.family,
        engagement_score: f.engagement_score,
        resonance_score: f.resonance_score,
      }));
      const recent = (recentNavicues.data || []).map((r: any) => r.navicue_id);

      // Seen today for variety
      const { data: todayExp } = await userClient
        .from('feed_exposures')
        .select('content_id')
        .eq('content_type', 'navicue')
        .gte('surfaced_at', startOfDayUTC.toISOString());
      const todayIds = (todayExp || []).map((r: any) => r.content_id);

      const { data: todayLib } = await admin
        .from('navicue_library')
        .select('id, pillar_id, family')
        .in('id', todayIds);

      const seenPillars = [...new Set((todayLib || []).map((l: any) => l.pillar_id))];
      const seenFamilies = [...new Set((todayLib || []).map((l: any) => l.family))];
      const seenSchemas: string[] = []; // Would need schema join, simplified

      // ========================================================================
      // FETCH CANDIDATES
      // ========================================================================
      const { data: candidates, error: candErr } = await admin
        .from("content_registry")
        .select("id, source_pk, pillar_id")
        .eq("content_kind", "navicue")
        .eq("is_active", true)
        .limit(2000);
      if (candErr) return bad(500, `candidate_error: ${candErr.message}`);

      const navicueIds = (candidates || []).map((c: any) => c.source_pk);
      const { data: library } = await admin
        .from("navicue_library")
        .select("id, pillar_id, kbe_target, status, heat_level, family, schema_id")
        .in("id", navicueIds);

      const libById = new Map((library || []).map((l: any) => [l.id, l]));

      // ========================================================================
      // CAPACITY GATING (critical safety)
      // ========================================================================
      const heatLvl: Record<string, number> = { low: 0, medium: 1, high: 2 };
      const arousalLvl: Record<string, number> = { green: 0, amber: 1, red: 2 };
      const userArousalLvl = arousalLvl[arousal] ?? 1;

      const gated = (candidates || []).filter((c: any) => {
        const lib = libById.get(c.source_pk);
        if (!lib || lib.status !== 'active') return false;
        if (recent.includes(c.source_pk)) return false;
        const cueHeat = heatLvl[lib.heat_level || 'medium'] ?? 1;
        return cueHeat >= userArousalLvl; // Capacity rule
      });

      // ========================================================================
      // ADVANCED SCORING (advancedScoring.ts)
      // ========================================================================
      const strategy = mode === 'targeted' ? 'schema_clustering' : 'adaptive';

      const scored = gated.map((c: any) => {
        const lib = libById.get(c.source_pk);
        const score = scoreCandidate(
          { ...lib, id: c.source_pk },
          arousal,
          activeSchemas,
          kbeReady,
          familyPerformance,
          recent,
          seenPillars,
          seenFamilies,
          seenSchemas,
          strategy
        );
        return { c, lib, score };
      }).sort((a, b) => b.score - a.score);

      const topN = scored.slice(0, count);

      // ========================================================================
      // QUEUE & RETURN
      // ========================================================================
      const queuedAt = new Date().toISOString();
      const rows = topN.map(({ c, lib }, i) => ({
        individual_id: user.id,
        item_kind: "micro",
        content_type: "navicue",
        content_id: String(c.source_pk),
        reason: "luma_v2",
        priority: i,
        score: null,
        rank_features: {},
        arousal_fit: arousal,
        queued_at: queuedAt,
        metadata: { content_ref: c.id, pillar_id: c.pillar_id },
        content_ref: c.id,
      }));

      const { error: insErr } = await userClient.from("user_feed_queue_v2").insert(rows);
      if (insErr) return bad(500, `queue_insert_error: ${insErr.message}`);

      const response: any = {
        navicues: rows.map((r, idx) => ({
          navicue_id: r.content_id,
          priority: idx + 1,
          expected_arousal_fit: r.arousal_fit,
          selection_reason: "luma_v2_advanced_scoring",
        })),
        reasoning: { arousal_state: arousal, strategy, active_schemas: activeSchemas.length },
      };

      if (debug && await isAdmin(user.id)) {
        response.debug = {
          arousal,
          activeSchemas,
          topScores: scored.slice(0, 10).map(s => ({ id: s.c.source_pk, score: s.score })),
        };
      }

      return ok(response);
    }

    // Other routes (exposure, response, analytics) remain same as navicue-router

    return bad(404, "Not found");
  } catch (e) {
    return bad(500, String(e?.message || e));
  }
});
