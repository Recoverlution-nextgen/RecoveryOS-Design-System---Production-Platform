/**
 * STATE COMPUTATION LAYER
 * 
 * Loads data from analytics views and builds complete UserTherapeuticState
 * for use by the orchestration engine.
 */

import type { UserTherapeuticState } from './telemetrySchema';
import { ArousalComputation } from './arousalComputation';

export interface StateComputationInput {
  user_id: string;
  supabaseClient: any;
}

/**
 * Compute complete therapeutic state from database views
 */
export async function computeUserTherapeuticState(
  input: StateComputationInput
): Promise<UserTherapeuticState> {
  const { user_id, supabaseClient } = input;

  // =========================================================================
  // PARALLEL DATA FETCHING
  // =========================================================================

  const [
    schemaHeatResult,
    kbeReadinessResult,
    familyPerfResult,
    arousalTimelineResult,
    councilPerfResult,
    wayPerfResult,
    recentNavicuesResult,
    rotationNeedsResult,
    arousalResult,
  ] = await Promise.all([
    // Schema heat
    supabaseClient
      .from('v_user_schema_heat')
      .select('*')
      .eq('user_id', user_id),

    // KBE readiness
    supabaseClient
      .from('v_user_kbe_readiness')
      .select('*')
      .eq('user_id', user_id),

    // Family performance
    supabaseClient
      .from('v_user_family_performance')
      .select('*')
      .eq('user_id', user_id),

    // Arousal timeline
    supabaseClient
      .from('v_user_arousal_timeline')
      .select('*')
      .eq('user_id', user_id)
      .order('time_window', { ascending: false })
      .limit(24),

    // Council performance (Batch 3)
    supabaseClient
      .from('v_user_council_performance')
      .select('*')
      .eq('user_id', user_id),

    // Way performance (Batch 3)
    supabaseClient
      .from('v_user_way_performance')
      .select('*')
      .eq('user_id', user_id),

    // Recent NaviCues (30min)
    supabaseClient
      .from('v_user_recent_navicues')
      .select('navicue_id')
      .eq('user_id', user_id),

    // Rotation needs
    supabaseClient
      .from('v_user_rotation_needs')
      .select('*')
      .eq('user_id', user_id)
      .maybeSingle(),

    // Compute current arousal
    ArousalComputation.compute({ user_id }, supabaseClient),
  ]);

  // =========================================================================
  // ERROR HANDLING
  // =========================================================================

  if (schemaHeatResult.error) {
    throw new Error(`Failed to fetch schema heat: ${schemaHeatResult.error.message}`);
  }
  if (kbeReadinessResult.error) {
    throw new Error(`Failed to fetch KBE readiness: ${kbeReadinessResult.error.message}`);
  }
  if (familyPerfResult.error) {
    throw new Error(`Failed to fetch family performance: ${familyPerfResult.error.message}`);
  }

  // =========================================================================
  // BUILD STATE OBJECT
  // =========================================================================

  const schemaHeat = schemaHeatResult.data || [];
  const kbeReadiness = kbeReadinessResult.data || [];
  const familyPerf = familyPerfResult.data || [];
  const arousalTimeline = arousalTimelineResult.data || [];
  const councilPerf = councilPerfResult.data || [];
  const wayPerf = wayPerfResult.data || [];
  const recentNavicues = recentNavicuesResult.data || [];
  const rotationNeeds = rotationNeedsResult.data;

  const state: UserTherapeuticState = {
    user_id,
    computed_at: new Date().toISOString(),

    // Schema clustering
    active_schemas: schemaHeat.map((s: any) => ({
      schema: s.schema_id,
      heat: s.heat,
      recency_weight: 1.0, // Already factored into heat
      engagement_avg: parseFloat(s.engagement_avg || 0),
      last_hit: s.last_hit,
      hit_count_7d: s.hit_count_7d,
    })),

    // KBE progression
    kbe_distribution: computeKBEDistribution(kbeReadiness),
    kbe_readiness: kbeReadiness.map((k: any) => ({
      schema: k.schema_id,
      current_layer: k.current_layer,
      ready_for_next: k.ready_for_next,
      confidence: parseFloat(k.confidence || 0),
    })),

    // Arousal tracking
    current_arousal: arousalResult.current_arousal,
    arousal_trend: arousalResult.trend,
    arousal_history_1h: arousalTimeline.slice(0, 1).map((a: any) => ({
      timestamp: a.time_window,
      level: a.arousal_level,
    })),

    // Family effectiveness
    family_performance: familyPerf.map((f: any) => ({
      family: f.family,
      engagement_score: f.engagement_score,
      resonance_score: f.resonance_score,
      last_served: f.last_served,
      serve_count_7d: f.serve_count_7d,
      avg_hesitation_ms: f.avg_hesitation_ms,
    })),

    // Council resonance (Batch 3)
    council_performance: councilPerf.map((c: any) => ({
      lens: c.lens,
      resonance_score: c.resonance_score,
      serve_count: c.serve_count,
      avg_signals: {
        fusion: parseFloat(c.avg_fusion || 5),
        resistance: parseFloat(c.avg_resistance || 5),
        choice_access: parseFloat(c.avg_choice_access || 5),
      },
    })),

    // Way process effectiveness (Batch 3)
    way_performance: wayPerf.map((w: any) => ({
      process: w.process,
      effectiveness_score: w.effectiveness_score,
      serve_count: w.serve_count,
      avg_signals: {
        fusion: 5, // Not tracked for way, placeholder
        resistance: parseFloat(w.avg_resistance || 5),
        choice_access: parseFloat(w.avg_choice_access || 5),
      },
    })),

    // Rotation tracking
    recent_navicues_30min: recentNavicues.map((r: any) => r.navicue_id),
    family_rotation_needed: rotationNeeds?.family_rotation_needed || [],
    schema_rotation_needed: rotationNeeds?.schema_rotation_needed || [],

    // Overall metrics (computed from views)
    session_start: new Date().toISOString(), // Placeholder, would track session
    total_interactions: schemaHeat.reduce((sum: number, s: any) => sum + s.hit_count_7d, 0),
    avg_hesitation_ms: computeAvgHesitation(familyPerf),
    completion_rate: 0.75, // Placeholder, would compute from responses
    avg_fusion: arousalResult.signals.avg_fusion,
    avg_resistance: arousalResult.signals.avg_resistance,
    avg_choice_access: arousalResult.signals.avg_choice_access,
  };

  return state;
}

// ============================================================================
// HELPERS
// ============================================================================

function computeKBEDistribution(kbeReadiness: any[]): {
  knowing: number;
  believing: number;
  embodying: number;
} {
  if (kbeReadiness.length === 0) {
    return { knowing: 100, believing: 0, embodying: 0 };
  }

  const counts = {
    knowing: 0,
    believing: 0,
    embodying: 0,
  };

  kbeReadiness.forEach((k: any) => {
    const layer = k.current_layer as keyof typeof counts;
    if (layer in counts) {
      counts[layer]++;
    }
  });

  const total = kbeReadiness.length;

  return {
    knowing: Math.round((counts.knowing / total) * 100),
    believing: Math.round((counts.believing / total) * 100),
    embodying: Math.round((counts.embodying / total) * 100),
  };
}

function computeAvgHesitation(familyPerf: any[]): number {
  if (familyPerf.length === 0) return 2000;

  const total = familyPerf.reduce(
    (sum: number, f: any) => sum + (f.avg_hesitation_ms || 0),
    0
  );

  return Math.round(total / familyPerf.length);
}

// ============================================================================
// EXPORT
// ============================================================================

export const StateComputation = {
  compute: computeUserTherapeuticState,
};
