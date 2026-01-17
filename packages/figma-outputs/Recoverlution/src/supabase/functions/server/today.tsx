/**
 * TODAY API - Single endpoint for entire dashboard
 * 
 * Returns everything needed for "Today" view:
 * - Current Journey (ERA instruction for today)
 * - Spark (NaviCue recommendation)
 * - Wellbeing chip (if baseline low)
 * - Identity line (weekly anchor)
 * - SOS status (unresolved rescue events)
 * - Baseline metrics
 * 
 * One call, complete context, zero clutter
 */

import { Hono } from "npm:hono";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { recommendNaviCue } from './luma-v2.tsx';

const app = new Hono();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// ============================================================================
// HELPER: Get Today's ERA Key
// ============================================================================

function getTodaysERAKey(): string {
  const dayOfWeek = new Date().getDay(); // 0-6 (Sunday-Saturday)
  const eraKeys = [
    'sun_reflect',
    'mon_seed',
    'tue_embody',
    'wed_root',
    'thu_act',
    'fri_persist',
    'sat_integrate',
  ];
  return eraKeys[dayOfWeek];
}

// ============================================================================
// HELPER: Calculate Sentient Baseline (simplified)
// ============================================================================

async function getBaseline(userId: string, rehabId: string) {
  // Get recent signals
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

  // Get latest state
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

  const regulate_ready = sleep_minutes >= 360 && rmssd >= 30 ? 1 : 0;
  const cognitive_bandwidth = (flow + sync) / 2 >= 5 ? 1 : 0;

  return {
    regulate_ready,
    cognitive_bandwidth,
    sleep_minutes,
    rmssd,
    state: { tempo, flow, sync },
  };
}

// ============================================================================
// MAIN TODAY ENDPOINT
// ============================================================================

app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { user_id, rehab_id } = body;

    if (!user_id || !rehab_id) {
      return c.json({ error: 'user_id and rehab_id required' }, 400);
    }

    // ========================================================================
    // 1. CURRENT JOURNEY ASSIGNMENT
    // ========================================================================

    const { data: assignment } = await supabase
      .from('block_assignments')
      .select('*, blocks(*)')
      .eq('patient_id', user_id)
      .eq('status', 'in_progress')
      .order('assigned_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const eraKey = getTodaysERAKey();
    let eraInstruction = null;
    let journeyBlock = null;

    if (assignment && assignment.blocks) {
      journeyBlock = assignment.blocks;
      eraInstruction = assignment.blocks.era?.[eraKey] || null;
    }

    // ========================================================================
    // 2. SPARK (NAVICUE RECOMMENDATION)
    // ========================================================================

    let spark = null;
    try {
      const navicueReq = new Request('http://localhost/navicue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id,
          rehab_id,
          current_pillar: journeyBlock?.pillar_id || null,
        }),
      });
      const navicueRes = await recommendNaviCue(navicueReq);
      if (navicueRes.ok) {
        const navicueData = await navicueRes.json();
        spark = {
          navicue: navicueData.navicue,
          whyNow: navicueData.whyNow,
          score: navicueData.score,
        };
      }
    } catch (err) {
      console.error('NaviCue recommendation failed:', err);
      // Continue without spark
    }

    // ========================================================================
    // 3. SENTIENT BASELINE
    // ========================================================================

    const baseline = await getBaseline(user_id, rehab_id);

    // ========================================================================
    // 4. WELLBEING CHIP (if baseline low)
    // ========================================================================

    let wellbeingChip = null;
    if (baseline.regulate_ready === 0) {
      // Suggest quick regulation practice
      wellbeingChip = {
        type: 'breath',
        duration: 60,
        video_id: 'box-breathing-1min',
        title: 'Box Breathing (1 min)',
        reason: 'Your baseline is low today - this can help you regulate',
      };
    }

    // ========================================================================
    // 5. IDENTITY LINE (current active)
    // ========================================================================

    const { data: identityLine } = await supabase
      .from('identity_lines')
      .select('*')
      .eq('user_id', user_id)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // ========================================================================
    // 6. SOS STATUS (unresolved rescue events)
    // ========================================================================

    const { data: unresolvedSOS } = await supabase
      .from('rescue_events')
      .select('*')
      .eq('user_id', user_id)
      .eq('resolved', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // ========================================================================
    // 7. RECENT DIARY ENTRIES (last 3)
    // ========================================================================

    const { data: recentDiary } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(3);

    // ========================================================================
    // 8. MOMENTUM METRICS (streak, completion rate)
    // ========================================================================

    // Get last 7 days of activity
    const { data: recentActivity } = await supabase
      .from('activities')
      .select('*')
      .eq('patient_id', user_id)
      .gte(
        'created_at',
        new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
      )
      .order('created_at', { ascending: false });

    const daysActive = new Set(
      recentActivity?.map((a) =>
        new Date(a.created_at).toISOString().split('T')[0]
      ) || []
    ).size;

    const momentum = {
      current_streak: daysActive,
      completion_rate: assignment?.progress || 0,
      total_days: daysActive,
    };

    // ========================================================================
    // ASSEMBLE RESPONSE
    // ========================================================================

    return c.json({
      // Journey ERA
      journey: {
        block: journeyBlock,
        era_today: {
          day: eraKey,
          instruction: eraInstruction,
        },
        progress: assignment?.progress || 0,
        status: assignment?.status || null,
      },

      // Spark (NaviCue)
      spark: spark,

      // Wellbeing chip (optional)
      wellbeing: wellbeingChip,

      // Identity line
      identity_line: identityLine?.line_text || null,

      // SOS alert
      sos_active: !!unresolvedSOS,
      sos_details: unresolvedSOS
        ? {
            kind: unresolvedSOS.kind,
            created_at: unresolvedSOS.created_at,
            context: unresolvedSOS.context,
          }
        : null,

      // Baseline metrics
      baseline: baseline,

      // Recent diary
      recent_diary: recentDiary || [],

      // Momentum
      momentum: momentum,

      // Metadata
      generated_at: new Date().toISOString(),
      day_of_week: eraKey,
    });
  } catch (err) {
    console.error('Today API error:', err);
    return c.json({ error: 'Internal server error', details: String(err) }, 500);
  }
});

// ============================================================================
// HELPER: Quick Check (for health monitoring)
// ============================================================================

app.post('/quick', async (c) => {
  try {
    const body = await c.req.json();
    const { user_id, rehab_id } = body;

    // Just return baseline + SOS status
    const baseline = await getBaseline(user_id, rehab_id);

    const { data: unresolvedSOS } = await supabase
      .from('rescue_events')
      .select('count')
      .eq('user_id', user_id)
      .eq('resolved', false)
      .maybeSingle();

    return c.json({
      baseline,
      sos_active: (unresolvedSOS?.count || 0) > 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Quick check error:', err);
    return c.json({ error: 'Internal server error', details: String(err) }, 500);
  }
});

export default app;
