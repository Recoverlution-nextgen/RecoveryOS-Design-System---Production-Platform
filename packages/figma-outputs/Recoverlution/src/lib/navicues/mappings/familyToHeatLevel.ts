/**
 * FAMILY TO HEAT LEVEL MAPPING
 * 
 * Determines appropriate arousal state for each family type.
 * Critical for state gating - ensures we never serve paradox_key
 * to a red-state user.
 * 
 * Heat Levels:
 * - HIGH: Safe for red state (activated, dysregulated)
 * - MEDIUM: Safe for amber state (regulated but elevated)
 * - LOW: Requires green state (calm, grounded)
 */

export type HeatLevel = 'high' | 'medium' | 'low';

/**
 * Default heat_level for each family
 * Based on cognitive load and arousal requirements
 */
export const FAMILY_HEAT_DEFAULTS: Record<string, HeatLevel> = {
  // ============================================================================
  // HIGH HEAT (Red State Appropriate)
  // Body-based, immediate, grounding interventions
  // ============================================================================
  grip_scan: 'high',
  /*
    Why: Pure somatic awareness, no cognitive complexity
    Examples:
    - "Notice your feet on the ground"
    - "Feel your breath, just this breath"
    Safe when dysregulated because requires minimal cognitive resources
  */
  
  allowing_gate: 'high',
  /*
    Why: Acceptance practices work in activation
    Examples:
    - "Can you let this be here, just for now?"
    - "What if you didn't need to fix this right now?"
    Safe when dysregulated because reduces struggle
  */
  
  proof_stamp: 'high',
  /*
    Why: Simple evidence gathering, concrete
    Examples:
    - "Name one time you handled hard before"
    - "What's one thing you know is true?"
    Safe when dysregulated because provides grounding in reality
  */
  
  // ============================================================================
  // MEDIUM HEAT (Amber State Appropriate)
  // Require some regulation but not full calm
  // ============================================================================
  release_prompt: 'medium',
  /*
    Why: Letting go requires capacity to notice and choose
    Examples:
    - "Can you release the grip on needing to know?"
    - "What would it be like to set this down?"
    Requires amber because needs some emotional space
  */
  
  story_drop: 'medium',
  /*
    Why: Decentering requires seeing the story as story
    Examples:
    - "What if this thought is just a thought?"
    - "Notice the story, not as truth but as narrative"
    Requires amber because needs cognitive distance
  */
  
  // ============================================================================
  // LOW HEAT (Green State ONLY)
  // Complex cognition, deep reflection, relational capacity
  // ============================================================================
  paradox_key: 'low',
  /*
    Why: Paradox requires holding two truths simultaneously (high cognitive load)
    Examples:
    - "Both broken AND whole"
    - "Trying AND surrendering at the same time"
    DANGER if served to red/amber: Will increase cognitive load and escalate
  */
  
  inventory_spark: 'low',
  /*
    Why: Deep self-reflection requires safety and capacity
    Examples:
    - "What part of you is protecting by staying small?"
    - "Write: What does your anger protect you from seeing?"
    DANGER if served to red/amber: Too vulnerable, will trigger defense
  */
  
  sangha_ping: 'low',
  /*
    Why: Relational connection requires co-regulation capacity
    Examples:
    - "Text someone: I see you"
    - "Who in your life mirrors your worth back to you?"
    DANGER if served to red/amber: Shame/rejection risk too high
  */
};

/**
 * Schema-specific heat modifiers
 * Some schemas are inherently hotter (more activating) than others
 */
export const SCHEMA_HEAT_MODIFIERS: Record<string, number> = {
  // HOT SCHEMAS (+1 heat level)
  shame: 1,
  abandonment: 1,
  vulnerability: 1,
  emotional_deprivation: 1,
  punitiveness: 1,
  
  // NEUTRAL SCHEMAS (no change)
  control: 0,
  perfectionism: 0,
  approval_seeking: 0,
  mistrust: 0,
  
  // COOLER SCHEMAS (-1 heat level, can go lower)
  failure: -1,
  binary_thinking: -1,
  entitlement: -1,
  unrelenting_standards: -1,
};

/**
 * Compute final heat_level for a NaviCue
 * Combines family baseline with schema modifier
 */
export function computeHeatLevel(
  family: string,
  schema?: string
): HeatLevel {
  // Get base heat from family
  const baseHeat = FAMILY_HEAT_DEFAULTS[family] || 'medium';
  
  // If no schema, return base
  if (!schema) return baseHeat;
  
  // Get schema modifier
  const modifier = SCHEMA_HEAT_MODIFIERS[schema] || 0;
  
  // Convert to numeric, apply modifier, convert back
  const heatToNumeric: Record<HeatLevel, number> = {
    high: 2,
    medium: 1,
    low: 0,
  };
  
  const numericToHeat: Record<number, HeatLevel> = {
    2: 'high',
    1: 'medium',
    0: 'low',
  };
  
  const baseNumeric = heatToNumeric[baseHeat];
  const adjusted = Math.max(0, Math.min(2, baseNumeric + modifier));
  
  return numericToHeat[adjusted];
}

/**
 * Get state gating rules for orchestration
 * Returns which families are allowed for each arousal state
 */
export const STATE_GATING_RULES = {
  red: {
    allowed_families: ['grip_scan', 'allowing_gate', 'proof_stamp'],
    description: 'User is activated/dysregulated. Only serve grounding, acceptance, and evidence.',
  },
  amber: {
    allowed_families: ['grip_scan', 'allowing_gate', 'proof_stamp', 'release_prompt', 'story_drop'],
    description: 'User is regulated but elevated. Can serve release and decentering.',
  },
  green: {
    allowed_families: ['grip_scan', 'allowing_gate', 'proof_stamp', 'release_prompt', 'story_drop', 'paradox_key', 'inventory_spark', 'sangha_ping'],
    description: 'User is calm/grounded. All families available.',
  },
};

/**
 * Check if a NaviCue is safe to serve based on user arousal state
 */
export function isHeatLevelSafe(
  navicueHeatLevel: HeatLevel,
  userArousalState: 'red' | 'amber' | 'green'
): boolean {
  const heatToNumeric: Record<HeatLevel, number> = {
    high: 2,
    medium: 1,
    low: 0,
  };
  
  const arousalToNumeric: Record<string, number> = {
    red: 2,
    amber: 1,
    green: 0,
  };
  
  const navicueLevel = heatToNumeric[navicueHeatLevel];
  const userLevel = arousalToNumeric[userArousalState];
  
  // NaviCue heat must be >= user arousal level
  // (High heat NaviCues safe for all states, low heat only for green)
  return navicueLevel >= userLevel;
}

/**
 * Get allowed families for a given arousal state
 */
export function getAllowedFamiliesForArousal(
  arousalState: 'red' | 'amber' | 'green'
): string[] {
  return STATE_GATING_RULES[arousalState].allowed_families;
}
