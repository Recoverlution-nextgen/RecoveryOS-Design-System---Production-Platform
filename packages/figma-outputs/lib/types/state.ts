// STATE TYPES
// Tempo · Flow · Sync check-ins

export type StateBand = 'green' | 'amber' | 'red' | 'shutdown';
export type ArousalContext = 'calm' | 'activated' | 'shutdown';

export interface StateCheckIn {
  id: string;
  user_id: string;
  
  // User Input
  tempo: number; // 0-100 (Energy/Arousal)
  flow: number; // 0-100 (Clarity/Focus)
  sync: number; // 0-100 (Connection/Safety)
  
  // Computed
  composite: number; // avg(tempo, flow, sync)
  state_band: StateBand;
  arousal_context: ArousalContext;
  
  // Context
  context?: string; // "Morning check-in", "Post-craving", "End of day"
  location?: string;
  triggered_by: 'scheduled' | 'manual' | 'luma_prompt';
  
  // Metadata
  captured_at: string;
}

// Compute state band from composite
export function computeStateBand(composite: number): StateBand {
  if (composite >= 60) return 'green';
  if (composite >= 40) return 'amber';
  if (composite >= 20) return 'red';
  return 'shutdown';
}

// Compute arousal context from tempo and sync
export function computeArousalContext(tempo: number, sync: number): ArousalContext {
  if (tempo > 70 && sync < 40) return 'activated';
  if (tempo < 30) return 'shutdown';
  return 'calm';
}

// Compute composite
export function computeComposite(tempo: number, flow: number, sync: number): number {
  return Math.round((tempo + flow + sync) / 3);
}

// State Timeline Point
export interface StateTimelinePoint {
  timestamp: string;
  tempo: number;
  flow: number;
  sync: number;
  composite: number;
  state_band: StateBand;
}

// State Insights
export interface StateInsight {
  type: 'pattern' | 'trend' | 'correlation';
  title: string;
  description: string;
  confidence: number; // 0-1
  data_points: number;
  discovered_at: string;
}
