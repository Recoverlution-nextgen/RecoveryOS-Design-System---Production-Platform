/**
 * FAMILY TO KBE MAPPING
 * 
 * Maps each family to its default KBE layer (knowing, believing, embodying)
 * based on the mechanism's cognitive/experiential depth.
 * 
 * KBE Progression:
 * - KNOWING: Awareness, information, recognition
 * - BELIEVING: Processing, integration, practice
 * - EMBODYING: Somatic, experiential, relational
 */

export type KBETarget = 'knowing' | 'believing' | 'embodying';

/**
 * Default KBE layer for each family
 */
export const FAMILY_KBE_DEFAULTS: Record<string, KBETarget> = {
  // ============================================================================
  // KNOWING (Awareness Building)
  // ============================================================================
  grip_scan: 'knowing',
  /*
    Why: Builds awareness of sensations and patterns
    Mechanism: "Notice what's happening in your body"
    Progression: First step is knowing the grip exists
  */
  
  proof_stamp: 'knowing',
  /*
    Why: Gathers evidence and builds cognitive awareness
    Mechanism: "Notice the facts that counter the story"
    Progression: First step is knowing evidence exists
  */
  
  // ============================================================================
  // BELIEVING (Processing & Integration)
  // ============================================================================
  allowing_gate: 'believing',
  /*
    Why: Acceptance is a practice that builds belief
    Mechanism: "Can you let this be here?"
    Progression: Moves from knowing → believing acceptance is possible
  */
  
  release_prompt: 'believing',
  /*
    Why: Letting go requires believing you can survive without the grip
    Mechanism: "What would it be like to set this down?"
    Progression: Moves from knowing the grip → believing you can release it
  */
  
  story_drop: 'believing',
  /*
    Why: Decentering requires believing thoughts are not facts
    Mechanism: "Notice the story as story, not truth"
    Progression: Moves from knowing fusion → believing defusion is possible
  */
  
  paradox_key: 'believing',
  /*
    Why: Holding paradox requires believing both/and (not either/or)
    Mechanism: "Both broken AND whole"
    Progression: Deepens belief in cognitive flexibility
  */
  
  // ============================================================================
  // EMBODYING (Experiential & Relational)
  // ============================================================================
  inventory_spark: 'embodying',
  /*
    Why: Deep reflection requires embodied self-awareness
    Mechanism: "What part of you is protecting by staying small?"
    Progression: Moves to embodied integration of insights
  */
  
  sangha_ping: 'embodying',
  /*
    Why: Relational connection is embodied co-regulation
    Mechanism: "Text someone: I see you"
    Progression: Moves to embodied relational practice
  */
};

/**
 * Get default KBE target for a family
 */
export function getKBEForFamily(family: string): KBETarget {
  return FAMILY_KBE_DEFAULTS[family] || 'knowing';
}

/**
 * KBE progression order (for gating)
 */
export const KBE_PROGRESSION_ORDER: KBETarget[] = [
  'knowing',
  'believing',
  'embodying',
];

/**
 * Get KBE index (for comparison)
 */
export function getKBEIndex(kbe: KBETarget): number {
  return KBE_PROGRESSION_ORDER.indexOf(kbe);
}

/**
 * Check if user is ready for a given KBE level
 * Based on their current layer and interaction count
 */
export function isReadyForKBE(
  targetKBE: KBETarget,
  currentKBE: KBETarget,
  interactionsAtCurrentLevel: number,
  minInteractionsRequired: number = 3
): boolean {
  const currentIndex = getKBEIndex(currentKBE);
  const targetIndex = getKBEIndex(targetKBE);
  
  // If serving current level, always ready
  if (targetIndex === currentIndex) {
    return true;
  }
  
  // If serving next level, check if enough interactions at current
  if (targetIndex === currentIndex + 1) {
    return interactionsAtCurrentLevel >= minInteractionsRequired;
  }
  
  // If going backwards (review), always allowed
  if (targetIndex < currentIndex) {
    return true;
  }
  
  // If jumping too far ahead, not ready
  return false;
}

/**
 * Get next KBE level for progression
 */
export function getNextKBE(current: KBETarget): KBETarget | null {
  const currentIndex = getKBEIndex(current);
  if (currentIndex === KBE_PROGRESSION_ORDER.length - 1) {
    return null; // Already at deepest level
  }
  return KBE_PROGRESSION_ORDER[currentIndex + 1];
}

/**
 * KBE definitions for reference
 */
export const KBE_DEFINITIONS = {
  knowing: {
    name: 'Knowing',
    description: 'Awareness and recognition. "I see this pattern."',
    examples: [
      'Noticing the grip',
      'Recognizing the story',
      'Identifying the trigger',
      'Gathering evidence',
    ],
    typical_duration: '1-2 weeks',
  },
  believing: {
    name: 'Believing',
    description: 'Processing and integration. "This could be different."',
    examples: [
      'Practicing acceptance',
      'Experimenting with release',
      'Testing decentering',
      'Challenging the story',
    ],
    typical_duration: '2-4 weeks',
  },
  embodying: {
    name: 'Embodying',
    description: 'Experiential living. "I am this."',
    examples: [
      'Living from values',
      'Relational practice',
      'Somatic integration',
      'Spontaneous choice',
    ],
    typical_duration: 'Ongoing practice',
  },
};
