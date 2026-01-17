/**
 * AROUSAL STATE COMPUTATION
 * 
 * Analyzes recent telemetry to determine user's current arousal state:
 * - GREEN: Calm, grounded, regulated
 * - AMBER: Elevated, activated but not dysregulated
 * - RED: Dysregulated, crisis-level activation
 * 
 * Based on the 5 Universal Signals:
 * - fusion (0-10): Story = me (decentering metric)
 * - resistance (0-10): Can't be with this (acceptance metric)
 * - choice_access (0-10): Can I pause/choose (agency metric)
 * - shame_threat (0-10): Activation level
 * - connection (0-10): Co-regulation state
 */

export interface ArousalComputationInput {
  user_id: string;
  lookback_minutes?: number; // Default: 30
  min_signals?: number; // Min signals required for reliable computation
}

export interface ArousalComputationResult {
  user_id: string;
  computed_at: string;
  current_arousal: 'green' | 'amber' | 'red';
  trend: 'escalating' | 'stable' | 'deescalating';
  confidence: number; // 0-1
  signals: {
    avg_fusion: number;
    avg_resistance: number;
    avg_choice_access: number;
    avg_shame_threat: number;
    avg_connection: number;
    signal_count: number;
  };
  reasoning: string;
}

// ============================================================================
// AROUSAL THRESHOLDS
// ============================================================================

const THRESHOLDS = {
  // Resistance (primary indicator of dysregulation)
  resistance: {
    green_max: 4,     // < 4 = regulated
    amber_max: 7,     // 4-7 = elevated
    red_min: 7,       // >= 7 = dysregulated
  },
  
  // Choice access (inverted - low = dysregulated)
  choice_access: {
    green_min: 6,     // >= 6 = regulated
    amber_min: 3,     // 3-6 = elevated
    red_max: 3,       // < 3 = dysregulated
  },
  
  // Shame threat (activation level)
  shame_threat: {
    green_max: 4,
    amber_max: 7,
    red_min: 7,
  },
  
  // Connection (co-regulation, inverted)
  connection: {
    green_min: 5,
    amber_min: 3,
    red_max: 3,
  },
  
  // Fusion (less predictive of arousal, more of decentering progress)
  fusion: {
    green_max: 5,
    amber_max: 8,
    red_min: 8,
  },
};

// ============================================================================
// COMPUTATION LOGIC
// ============================================================================

/**
 * Compute arousal state from recent signals
 */
export function computeArousalFromSignals(
  signals: {
    fusion: number;
    resistance: number;
    choice_access: number;
    shame_threat?: number;
    connection?: number;
  }[]
): ArousalComputationResult['current_arousal'] {
  if (signals.length === 0) {
    return 'amber'; // Default to amber when no data
  }

  // Compute averages
  const avg = {
    fusion: mean(signals.map(s => s.fusion)),
    resistance: mean(signals.map(s => s.resistance)),
    choice_access: mean(signals.map(s => s.choice_access)),
    shame_threat: mean(signals.map(s => s.shame_threat ?? 5)),
    connection: mean(signals.map(s => s.connection ?? 5)),
  };

  // Score arousal level (0 = green, 1 = amber, 2 = red)
  let score = 0;
  let votes = 0;

  // Resistance (primary)
  if (avg.resistance >= THRESHOLDS.resistance.red_min) {
    score += 2;
    votes++;
  } else if (avg.resistance > THRESHOLDS.resistance.green_max) {
    score += 1;
    votes++;
  } else {
    score += 0;
    votes++;
  }

  // Choice access (inverted)
  if (avg.choice_access < THRESHOLDS.choice_access.red_max) {
    score += 2;
    votes++;
  } else if (avg.choice_access < THRESHOLDS.choice_access.green_min) {
    score += 1;
    votes++;
  } else {
    score += 0;
    votes++;
  }

  // Shame threat (if present)
  if (avg.shame_threat >= THRESHOLDS.shame_threat.red_min) {
    score += 2;
    votes++;
  } else if (avg.shame_threat > THRESHOLDS.shame_threat.green_max) {
    score += 1;
    votes++;
  } else {
    score += 0;
    votes++;
  }

  // Connection (inverted, if present)
  if (avg.connection < THRESHOLDS.connection.red_max) {
    score += 2;
    votes++;
  } else if (avg.connection < THRESHOLDS.connection.green_min) {
    score += 1;
    votes++;
  } else {
    score += 0;
    votes++;
  }

  // Fusion (less weight)
  if (avg.fusion >= THRESHOLDS.fusion.red_min) {
    score += 1; // Only contributes 0.5 weight
    votes += 0.5;
  } else if (avg.fusion > THRESHOLDS.fusion.green_max) {
    score += 0.5;
    votes += 0.5;
  }

  // Final arousal level
  const finalScore = score / votes;

  if (finalScore >= 1.5) return 'red';
  if (finalScore >= 0.7) return 'amber';
  return 'green';
}

/**
 * Compute trend from time-series signals
 */
export function computeTrend(
  signalsTimeSeries: Array<{
    timestamp: string;
    arousal: 'green' | 'amber' | 'red';
  }>
): ArousalComputationResult['trend'] {
  if (signalsTimeSeries.length < 2) return 'stable';

  const arousalToScore = { green: 0, amber: 1, red: 2 };
  
  // Compare first half vs second half
  const mid = Math.floor(signalsTimeSeries.length / 2);
  const firstHalf = signalsTimeSeries.slice(0, mid);
  const secondHalf = signalsTimeSeries.slice(mid);

  const firstAvg = mean(firstHalf.map(s => arousalToScore[s.arousal]));
  const secondAvg = mean(secondHalf.map(s => arousalToScore[s.arousal]));

  const delta = secondAvg - firstAvg;

  if (delta > 0.3) return 'escalating';
  if (delta < -0.3) return 'deescalating';
  return 'stable';
}

/**
 * Main computation function - processes recent telemetry
 */
export async function computeArousalState(
  input: ArousalComputationInput,
  supabaseClient: any
): Promise<ArousalComputationResult> {
  const {
    user_id,
    lookback_minutes = 30,
    min_signals = 2,
  } = input;

  const since = new Date(Date.now() - lookback_minutes * 60 * 1000).toISOString();

  // Fetch recent responses with signals
  const { data: responses, error } = await supabaseClient
    .from('navicue_responses')
    .select('captured_at, meta')
    .eq('user_id', user_id)
    .gte('captured_at', since)
    .order('captured_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch responses: ${error.message}`);
  }

  // Extract signals
  const signals = (responses || [])
    .map((r: any) => r.meta?.signals)
    .filter((s: any) => s && typeof s.resistance === 'number' && typeof s.choice_access === 'number');

  // Compute current arousal
  const current_arousal = computeArousalFromSignals(signals);

  // Compute time-series arousal for trend
  const timeSeries = (responses || [])
    .filter((r: any) => r.meta?.signals)
    .map((r: any) => ({
      timestamp: r.captured_at,
      arousal: computeArousalFromSignals([r.meta.signals]),
    }));

  const trend = computeTrend(timeSeries);

  // Compute signal averages
  const signalAvgs = signals.length > 0 ? {
    avg_fusion: mean(signals.map((s: any) => s.fusion ?? 5)),
    avg_resistance: mean(signals.map((s: any) => s.resistance)),
    avg_choice_access: mean(signals.map((s: any) => s.choice_access)),
    avg_shame_threat: mean(signals.map((s: any) => s.shame_threat ?? 5)),
    avg_connection: mean(signals.map((s: any) => s.connection ?? 5)),
    signal_count: signals.length,
  } : {
    avg_fusion: 5,
    avg_resistance: 5,
    avg_choice_access: 5,
    avg_shame_threat: 5,
    avg_connection: 5,
    signal_count: 0,
  };

  // Confidence based on signal count
  const confidence = Math.min(1, signals.length / min_signals);

  // Reasoning
  const reasoning = buildReasoning(current_arousal, signalAvgs, confidence);

  return {
    user_id,
    computed_at: new Date().toISOString(),
    current_arousal,
    trend,
    confidence,
    signals: signalAvgs,
    reasoning,
  };
}

/**
 * Update user_arousal_state table with computed values
 */
export async function updateArousalState(
  result: ArousalComputationResult,
  supabaseClient: any
): Promise<void> {
  const { user_id, current_arousal, trend, signals } = result;

  // Map arousal to energy/clarity/connection (0-1 scale)
  const arousalToEnergy = { green: 0.7, amber: 0.5, red: 0.3 };
  const arousalToClarity = { green: 0.8, amber: 0.5, red: 0.2 };

  const row = {
    user_id,
    energy01: arousalToEnergy[current_arousal],
    clarity01: arousalToClarity[current_arousal],
    connection01: signals.avg_connection / 10,
    computed_at: new Date().toISOString(),
    meta: {
      arousal_state: current_arousal,
      trend,
      signals,
    },
  };

  const { error } = await supabaseClient
    .from('user_arousal_state')
    .upsert(row, { onConflict: 'user_id' });

  if (error) {
    throw new Error(`Failed to update arousal state: ${error.message}`);
  }
}

// ============================================================================
// HELPERS
// ============================================================================

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function buildReasoning(
  arousal: 'green' | 'amber' | 'red',
  signals: ArousalComputationResult['signals'],
  confidence: number
): string {
  const reasons: string[] = [];

  if (signals.avg_resistance >= THRESHOLDS.resistance.red_min) {
    reasons.push('high_resistance');
  } else if (signals.avg_resistance > THRESHOLDS.resistance.green_max) {
    reasons.push('elevated_resistance');
  }

  if (signals.avg_choice_access < THRESHOLDS.choice_access.red_max) {
    reasons.push('low_choice_access');
  } else if (signals.avg_choice_access < THRESHOLDS.choice_access.green_min) {
    reasons.push('reduced_choice_access');
  }

  if (signals.avg_shame_threat >= THRESHOLDS.shame_threat.red_min) {
    reasons.push('high_shame_threat');
  }

  if (signals.avg_connection < THRESHOLDS.connection.red_max) {
    reasons.push('disconnected');
  }

  if (confidence < 0.5) {
    reasons.push('low_confidence_insufficient_signals');
  }

  return reasons.length > 0 ? reasons.join('|') : 'regulated';
}

// ============================================================================
// EXPORT FOR EDGE FUNCTIONS
// ============================================================================

export const ArousalComputation = {
  compute: computeArousalState,
  update: updateArousalState,
  computeFromSignals: computeArousalFromSignals,
  computeTrend,
};
