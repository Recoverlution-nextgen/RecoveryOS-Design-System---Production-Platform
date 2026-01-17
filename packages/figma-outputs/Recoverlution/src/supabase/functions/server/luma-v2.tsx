/**
 * LUMA V2 - Enhanced with Story Map, Signals, and Sentient Baseline
 * 
 * LUMA = The Concierge
 * Guides patients to the right room at the right time
 * 
 * Context-aware decision making:
 * - Story Map (pain vectors, protection bias, hot contexts)
 * - Sentient Baseline (sleep, HRV, state)
 * - K-B-E Drift (knowing vs believing vs embodying gaps)
 * - Engagement History (what they've done recently)
 * 
 * Philosophy: Guide, not dictate
 */

import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// ============================================================================
// SENTIENT BASELINE CALCULATION
// ============================================================================

interface SentientBaseline {
  regulate_ready: number; // 0 or 1
  cognitive_bandwidth: number; // 0 or 1
  social_capacity: number; // 0 or 1
  sleep_minutes: number;
  rmssd: number; // HRV
  state: {
    tempo: number;
    flow: number;
    sync: number;
  };
}

async function calculateSentientBaseline(
  userId: string,
  rehabId: string
): Promise<SentientBaseline> {
  // 1. Get recent signals (last 24 hours)
  const { data: signals } = await supabase
    .from('signals')
    .select('*')
    .eq('user_id', userId)
    .eq('rehab_id', rehabId)
    .gte('captured_at', new Date(Date.now() - 24 * 3600 * 1000).toISOString())
    .order('captured_at', { ascending: false });

  const sleep_minutes =
    signals?.find((s) => s.key === 'sleep_minutes')?.value_num ?? 0;
  const rmssd = signals?.find((s) => s.key === 'rmssd')?.value_num ?? 0;

  // 2. Get latest state
  const { data: stateData } = await supabase
    .from('state_logs')
    .select('*')
    .eq('patient_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const tempo = stateData?.tempo ?? 5;
  const flow = stateData?.flow ?? 5;
  const sync = stateData?.sync ?? 5;

  // 3. Calculate composite indices
  const regulate_ready = sleep_minutes >= 360 && rmssd >= 30 ? 1 : 0;
  const cognitive_bandwidth = (flow + sync) / 2 >= 5 ? 1 : 0;
  const social_capacity = tempo >= 5 ? 1 : 0;

  return {
    regulate_ready,
    cognitive_bandwidth,
    social_capacity,
    sleep_minutes,
    rmssd,
    state: { tempo, flow, sync },
  };
}

// ============================================================================
// STORY MAP CONTEXT
// ============================================================================

interface StoryMapContext {
  protectionBias: string | null;
  hotContexts: string[];
  painVectors: any[];
}

async function getStoryMapContext(
  userId: string,
  rehabId: string
): Promise<StoryMapContext> {
  const since = new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString();

  const { data: story } = await supabase
    .from('story_map_entries')
    .select('protection_bias, hot_contexts, pain_vectors')
    .eq('user_id', userId)
    .eq('rehab_id', rehabId)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(20);

  const protectionBias =
    story?.find((s) => s.protection_bias)?.protection_bias ?? null;
  const hotContexts = [
    ...new Set((story || []).flatMap((s) => s.hot_contexts || [])),
  ];
  const painVectors = (story || []).flatMap((s) => s.pain_vectors || []);

  return { protectionBias, hotContexts, painVectors };
}

// ============================================================================
// K-B-E WEAK AREA DETECTION
// ============================================================================

async function getWeakestKBE(
  userId: string,
  rehabId: string
): Promise<string | null> {
  // Get recent NaviCue responses
  const { data: responses } = await supabase
    .from('navicue_responses')
    .select('navicue_id, response_data, created_at')
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString())
    .order('created_at', { ascending: false })
    .limit(50);

  if (!responses || responses.length === 0) return null;

  // Get NaviCues to find kbe_target
  const navicueIds = responses.map((r) => r.navicue_id);
  const { data: navicues } = await supabase
    .from('navicues')
    .select('id, kbe_target')
    .in('id', navicueIds);

  // Count responses by kbe_target
  const kbeCounts: Record<string, number> = {
    knowing: 0,
    believing: 0,
    embodying: 0,
  };

  responses.forEach((r) => {
    const navicue = navicues?.find((n) => n.id === r.navicue_id);
    if (navicue?.kbe_target) {
      kbeCounts[navicue.kbe_target] =
        (kbeCounts[navicue.kbe_target] || 0) + 1;
    }
  });

  // Find weakest (least practiced)
  const sorted = Object.entries(kbeCounts).sort((a, b) => a[1] - b[1]);
  return sorted[0]?.[0] || null;
}

// ============================================================================
// RECENT NAVICUE SUBTYPE (avoid repetition)
// ============================================================================

async function getRecentNavicueSubtype(
  userId: string,
  rehabId: string
): Promise<string | null> {
  const { data: last } = await supabase
    .from('navicue_responses')
    .select('navicue_id, created_at')
    .eq('user_id', userId)
    .gte(
      'created_at',
      new Date(Date.now() - 48 * 3600 * 1000).toISOString()
    )
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!last?.navicue_id) return null;

  const { data: lastNavicue } = await supabase
    .from('navicues')
    .select('subtype')
    .eq('id', last.navicue_id)
    .single();

  return lastNavicue?.subtype ?? null;
}

// ============================================================================
// NAVICUE SCORING (Enhanced)
// ============================================================================

interface NaviCue {
  id: string;
  name: string;
  title: string;
  type: string;
  subtype: string | null;
  kbe_target: string;
  curveball: boolean;
  pillar_links: string[];
  context_tags: string[];
  payload: any;
}

interface ScoringContext {
  baseline: SentientBaseline;
  story: StoryMapContext;
  kbeWeak: string | null;
  currentPillar: string | null;
  recentSubtype: string | null;
  contextTag: string | null;
}

function scoreNaviCue(navicue: NaviCue, context: ScoringContext): number {
  let score = 0.5; // Base score

  // 1. K-B-E targeting (+0.20)
  if (context.kbeWeak && navicue.kbe_target === context.kbeWeak) {
    score += 0.2;
  }

  // 2. Bridge pillars (+0.20)
  if (
    context.currentPillar &&
    navicue.pillar_links &&
    !navicue.pillar_links.includes(context.currentPillar)
  ) {
    score += 0.2;
  }

  // 3. Context match (+0.10)
  if (
    context.contextTag &&
    navicue.context_tags?.includes(context.contextTag)
  ) {
    score += 0.1;
  }

  // 4. Curveball bonus (+0.05, but max 1 per day)
  if (navicue.curveball) {
    score += 0.05;
  }

  // 5. Protection bias matching (+0.15)
  if (context.story.protectionBias) {
    if (context.story.protectionBias === 'control' && navicue.pillar_links?.includes('P-06')) {
      score += 0.15; // Decision Mastery for control-seeking
    }
    if (context.story.protectionBias === 'image' && navicue.pillar_links?.includes('P-05')) {
      score += 0.15; // Identity Integration for image protection
    }
    if (context.story.protectionBias === 'safety' && navicue.pillar_links?.includes('P-01')) {
      score += 0.15; // Emotional Regulation for safety-seeking
    }
    if (context.story.protectionBias === 'belonging' && navicue.pillar_links?.includes('P-03')) {
      score += 0.15; // Social Connectivity for belonging-seeking
    }
  }

  // 6. Hot context matching (+0.10)
  const matchingContexts = navicue.context_tags?.filter((tag) =>
    context.story.hotContexts.includes(tag)
  );
  if (matchingContexts && matchingContexts.length > 0) {
    score += 0.1;
  }

  // 7. Avoid subtype repetition (-0.10)
  if (
    context.recentSubtype &&
    navicue.subtype === context.recentSubtype
  ) {
    score -= 0.1;
  }

  // 8. Low bandwidth preference (+0.05 for mirrors)
  if (context.baseline.regulate_ready === 0 && navicue.type === 'mirror') {
    score += 0.05;
  }

  // 9. Regulation-first gating (major boost if needed)
  if (
    context.baseline.regulate_ready === 0 &&
    navicue.type === 'micro_practice' &&
    navicue.subtype === 'practice:breath'
  ) {
    score += 0.30; // Strong preference for breath practices when baseline low
  }

  return Math.max(0, Math.min(1, score)); // Clamp 0-1
}

// ============================================================================
// GENERATE "WHY NOW" EXPLANATION
// ============================================================================

function generateWhyNow(
  navicue: NaviCue,
  context: ScoringContext
): string {
  const reasons: string[] = [];

  if (context.baseline.regulate_ready === 0) {
    reasons.push('Your baseline is low today - this can help you regulate');
  }

  if (context.kbeWeak && navicue.kbe_target === context.kbeWeak) {
    reasons.push(`You're building ${context.kbeWeak} right now`);
  }

  if (
    context.story.protectionBias &&
    navicue.pillar_links?.some((p) => {
      if (context.story.protectionBias === 'control') return p === 'P-06';
      if (context.story.protectionBias === 'image') return p === 'P-05';
      if (context.story.protectionBias === 'safety') return p === 'P-01';
      if (context.story.protectionBias === 'belonging') return p === 'P-03';
      return false;
    })
  ) {
    reasons.push(`This addresses your ${context.story.protectionBias} pattern`);
  }

  const matchingContexts = navicue.context_tags?.filter((tag) =>
    context.story.hotContexts.includes(tag)
  );
  if (matchingContexts && matchingContexts.length > 0) {
    reasons.push(`Relevant to: ${matchingContexts.join(', ')}`);
  }

  if (navicue.curveball) {
    reasons.push('A curveball to wake your brain up');
  }

  if (reasons.length === 0) {
    return 'This felt right for where you are today';
  }

  return reasons.join('. ') + '.';
}

// ============================================================================
// MAIN NAVICUE RECOMMENDATION
// ============================================================================

export async function recommendNaviCue(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { user_id, rehab_id, current_pillar, context_tag } = body;

    if (!user_id || !rehab_id) {
      return new Response(
        JSON.stringify({ error: 'user_id and rehab_id required' }),
        { status: 400 }
      );
    }

    // 1. Gather context
    const baseline = await calculateSentientBaseline(user_id, rehab_id);
    const story = await getStoryMapContext(user_id, rehab_id);
    const kbeWeak = await getWeakestKBE(user_id, rehab_id);
    const recentSubtype = await getRecentNavicueSubtype(user_id, rehab_id);

    const context: ScoringContext = {
      baseline,
      story,
      kbeWeak,
      currentPillar: current_pillar || null,
      recentSubtype,
      contextTag: context_tag || null,
    };

    // 2. Get available NaviCues
    const { data: navicues, error } = await supabase
      .from('navicues')
      .select('*')
      .eq('status', 'published');

    if (error || !navicues || navicues.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No NaviCues available' }),
        { status: 404 }
      );
    }

    // 3. Score each NaviCue
    const scored = navicues.map((navicue) => ({
      navicue,
      score: scoreNaviCue(navicue, context),
    }));

    // 4. Pick top NaviCue
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    if (!best) {
      return new Response(
        JSON.stringify({ error: 'No suitable NaviCue found' }),
        { status: 404 }
      );
    }

    // 5. Generate explanation
    const whyNow = generateWhyNow(best.navicue, context);

    // 6. Log recommendation
    await supabase.from('navicue_responses').insert({
      user_id,
      rehab_id,
      navicue_id: best.navicue.id,
      response_data: {
        recommended_at: new Date().toISOString(),
        score: best.score,
        context: {
          baseline: baseline.state,
          protection_bias: story.protectionBias,
          kbe_weak: kbeWeak,
        },
      },
    });

    return new Response(
      JSON.stringify({
        navicue: best.navicue,
        score: best.score,
        whyNow,
        context: {
          baseline,
          story,
          kbeWeak,
        },
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (err) {
    console.error('LUMA NaviCue recommendation error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500 }
    );
  }
}

// ============================================================================
// JOURNEY BLOCK RECOMMENDATION
// ============================================================================

export async function recommendJourneyBlock(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { user_id, rehab_id, phase } = body;

    if (!user_id || !rehab_id) {
      return new Response(
        JSON.stringify({ error: 'user_id and rehab_id required' }),
        { status: 400 }
      );
    }

    // 1. Gather context
    const baseline = await calculateSentientBaseline(user_id, rehab_id);
    const story = await getStoryMapContext(user_id, rehab_id);
    const kbeWeak = await getWeakestKBE(user_id, rehab_id);

    // 2. Get available blocks
    const { data: blocks, error } = await supabase
      .from('blocks')
      .select('*')
      .eq('status', 'published');

    if (error || !blocks || blocks.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No Journey blocks available' }),
        { status: 404 }
      );
    }

    // 3. Score blocks
    const scored = blocks.map((block) => {
      let score = 0.5;

      // Phase alignment
      const eraKey = phase ? `${phase}_*` : null;
      if (eraKey && block.era?.[eraKey]) {
        score += 0.25;
      }

      // Baseline gating (regulation-first)
      if (baseline.regulate_ready === 0 && block.pillar_id === 'P-01') {
        score += 0.3; // Emotional Regulation priority
      }

      // Protection bias matching
      if (story.protectionBias === 'control' && block.pillar_id === 'P-06') {
        score += 0.15;
      }
      if (story.protectionBias === 'image' && block.pillar_id === 'P-05') {
        score += 0.15;
      }
      if (story.protectionBias === 'safety' && block.pillar_id === 'P-01') {
        score += 0.15;
      }
      if (story.protectionBias === 'belonging' && block.pillar_id === 'P-03') {
        score += 0.15;
      }

      // Hot context matching
      const matchingContexts = block.context_tags?.filter((tag) =>
        story.hotContexts.includes(tag)
      );
      if (matchingContexts && matchingContexts.length > 0) {
        score += 0.1;
      }

      // K-B-E weak area
      if (kbeWeak && block.kbe_target === kbeWeak) {
        score += 0.2;
      }

      return { block, score };
    });

    // 4. Pick top block
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    if (!best) {
      return new Response(
        JSON.stringify({ error: 'No suitable Journey block found' }),
        { status: 404 }
      );
    }

    // 5. Generate explanation
    const reasons: string[] = [];
    if (baseline.regulate_ready === 0) {
      reasons.push('Your baseline is low - starting with regulation');
    }
    if (story.protectionBias && best.block.pillar_id) {
      reasons.push(`Addresses your ${story.protectionBias} pattern`);
    }
    if (kbeWeak) {
      reasons.push(`Builds ${kbeWeak}`);
    }

    const whyNow = reasons.length > 0
      ? reasons.join('. ') + '.'
      : 'This felt like the right next step for you.';

    return new Response(
      JSON.stringify({
        next: best.block,
        score: best.score,
        whyNow,
        state: baseline.state,
        context: {
          baseline,
          story,
          kbeWeak,
        },
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (err) {
    console.error('LUMA Journey recommendation error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500 }
    );
  }
}

// ============================================================================
// HONO ROUTER (for server integration)
// ============================================================================

const lumaV2 = new Hono();

// Enable CORS
lumaV2.use('*', cors());

// NaviCue recommendation endpoint
lumaV2.post('/navicue', async (c) => {
  const req = c.req.raw;
  return await recommendNaviCue(req);
});

// Journey block recommendation endpoint
lumaV2.post('/journey', async (c) => {
  const req = c.req.raw;
  return await recommendJourneyBlock(req);
});

export default lumaV2;
