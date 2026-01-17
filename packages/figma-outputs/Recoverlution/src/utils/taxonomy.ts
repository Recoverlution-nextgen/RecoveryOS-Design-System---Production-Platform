/**
 * RECOVERLUTION TAXONOMY SYSTEM
 * 
 * Hierarchical learning framework:
 * PILLAR → CONCEPT → THEME → BLOCK
 * 
 * Each level serves a purpose:
 * - PILLAR: Philosophy, rationale, importance, benefit (why it matters)
 * - CONCEPT: Theory and science (what it is)
 * - THEME: Function and practicality (how it works)
 * - BLOCK: Learning objective/competency unit (what to master)
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type PillarCode = 'ER' | 'SR' | 'SS' | 'MR' | 'IC' | 'PS';

export type BlockStatus = 'red' | 'orange' | 'green' | 'unknown';

export interface Pillar {
  id: PillarCode;
  type: 'pillar';
  name_clinical: string;
  name_patient: string;
  philosophy: string; // Why it matters
  icon: string; // lucide-react icon name
  color: string; // Hex color
  order: number;
}

export interface Concept {
  id: string; // Format: {PILLAR}_{CODE} e.g., "ER_WOT"
  type: 'concept';
  pillar_id: PillarCode;
  name: string;
  theory: string; // What it is (the science)
  science_refs?: string[]; // Academic references
  order: number;
}

export interface Theme {
  id: string; // Format: {CONCEPT}_{CODE} e.g., "ER_WOT_REC"
  type: 'theme';
  concept_id: string;
  pillar_id: PillarCode; // Denormalized for easy filtering
  name: string;
  function: string; // How it works (practicality)
  order: number;
  total_blocks: number; // Calculated field
}

export interface Block {
  id: string; // Format: {THEME}_{NUMBER} e.g., "ER_WOT_REC_001"
  type: 'block';
  theme_id: string;
  concept_id: string; // Denormalized
  pillar_id: PillarCode; // Denormalized
  
  // What is being learned/mastered
  learning_objective: string;
  competency_description: string;
  
  // How we measure this block (signals to look for)
  assessment_signals: string[];
  
  order: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

// ============================================================================
// ID PARSING & HIERARCHY UTILITIES
// ============================================================================

/**
 * Parse a block ID into its hierarchical components
 * @example parseBlockId("ER_WOT_REC_001") 
 *   → { pillar: "ER", concept: "ER_WOT", theme: "ER_WOT_REC", number: "001" }
 */
export function parseBlockId(blockId: string): {
  pillar_id: PillarCode;
  concept_id: string;
  theme_id: string;
  block_number: string;
} {
  const parts = blockId.split('_');
  
  if (parts.length < 4) {
    throw new Error(`Invalid block ID format: ${blockId}. Expected format: PILLAR_CONCEPT_THEME_NUMBER`);
  }
  
  const [pillar, concept, theme, number] = parts;
  
  return {
    pillar_id: pillar as PillarCode,
    concept_id: `${pillar}_${concept}`,
    theme_id: `${pillar}_${concept}_${theme}`,
    block_number: number
  };
}

/**
 * Parse a theme ID into its hierarchical components
 */
export function parseThemeId(themeId: string): {
  pillar_id: PillarCode;
  concept_id: string;
} {
  const parts = themeId.split('_');
  
  if (parts.length < 3) {
    throw new Error(`Invalid theme ID format: ${themeId}`);
  }
  
  const [pillar, concept] = parts;
  
  return {
    pillar_id: pillar as PillarCode,
    concept_id: `${pillar}_${concept}`
  };
}

/**
 * Parse a concept ID into its pillar
 */
export function parseConceptId(conceptId: string): {
  pillar_id: PillarCode;
} {
  const parts = conceptId.split('_');
  
  if (parts.length < 2) {
    throw new Error(`Invalid concept ID format: ${conceptId}`);
  }
  
  return {
    pillar_id: parts[0] as PillarCode
  };
}

/**
 * Get parent IDs from any level
 */
export function getParentIds(id: string, level: 'block' | 'theme' | 'concept'): {
  pillar_id?: PillarCode;
  concept_id?: string;
  theme_id?: string;
} {
  switch (level) {
    case 'block':
      return parseBlockId(id);
    case 'theme':
      return parseThemeId(id);
    case 'concept':
      return parseConceptId(id);
    default:
      return {};
  }
}

// ============================================================================
// KV STORE KEY BUILDERS
// ============================================================================

/**
 * Generate KV store keys for taxonomy entities
 */
export const TaxonomyKeys = {
  // Taxonomy definitions
  pillar: (pillarId: PillarCode) => `taxonomy:pillar:${pillarId}`,
  concept: (conceptId: string) => `taxonomy:concept:${conceptId}`,
  theme: (themeId: string) => `taxonomy:theme:${themeId}`,
  block: (blockId: string) => `taxonomy:block:${blockId}`,
  
  // All entities of a type
  allPillars: () => 'taxonomy:pillar:',
  allConcepts: () => 'taxonomy:concept:',
  allThemes: () => 'taxonomy:theme:',
  allBlocks: () => 'taxonomy:block:',
  
  // Hierarchy queries
  conceptsForPillar: (pillarId: PillarCode) => `taxonomy:concept:${pillarId}_`,
  themesForConcept: (conceptId: string) => `taxonomy:theme:${conceptId}_`,
  blocksForTheme: (themeId: string) => `taxonomy:block:${themeId}_`,
};

// ============================================================================
// PILLAR REGISTRY
// ============================================================================

export const PILLARS: Record<PillarCode, Pillar> = {
  ER: {
    id: 'ER',
    type: 'pillar',
    name_clinical: 'Emotional Regulation',
    name_patient: 'Managing Your Feelings',
    philosophy: 'Understanding and working with your emotions is the foundation of recovery. When you can recognize, name, and respond to your feelings skillfully, you gain the power to navigate life\'s challenges without being overwhelmed.',
    icon: 'heart-pulse',
    color: '#3E2BB8',
    order: 1
  },
  SR: {
    id: 'SR',
    type: 'pillar',
    name_clinical: 'Stress Resilience',
    name_patient: 'Building Your Strength',
    philosophy: 'Resilience is not about avoiding stress but developing the capacity to face challenges and recover from setbacks. Through understanding your stress response and building coping strategies, you create lasting strength.',
    icon: 'shield-check',
    color: '#5739FB',
    order: 2
  },
  SS: {
    id: 'SS',
    type: 'pillar',
    name_clinical: 'Social Support',
    name_patient: 'Connecting with Others',
    philosophy: 'Recovery happens in connection. Building healthy relationships and learning to give and receive support are essential skills that strengthen your foundation and remind you that you are not alone.',
    icon: 'users',
    color: '#3E2BB8',
    order: 3
  },
  MR: {
    id: 'MR',
    type: 'pillar',
    name_clinical: 'Meaning & Reflection',
    name_patient: 'Finding Your Purpose',
    philosophy: 'Recovery is not just about stopping harmful behaviors but discovering what you are moving toward. Through reflection and exploring what matters most, you create a life worth living.',
    icon: 'lightbulb',
    color: '#5739FB',
    order: 4
  },
  IC: {
    id: 'IC',
    type: 'pillar',
    name_clinical: 'Identity & Confidence',
    name_patient: 'Knowing Yourself',
    philosophy: 'Your past does not define your future. Building a healthy sense of self and confidence in your abilities empowers you to step into the person you are becoming.',
    icon: 'user-check',
    color: '#3E2BB8',
    order: 5
  },
  PS: {
    id: 'PS',
    type: 'pillar',
    name_clinical: 'Physical Self-Care',
    name_patient: 'Caring for Your Body',
    philosophy: 'Your mind and body are inseparable. Taking care of your physical health through sleep, nutrition, movement, and rest creates the foundation for emotional and mental wellbeing.',
    icon: 'activity',
    color: '#5739FB',
    order: 6
  }
};

/**
 * Get all pillars in order
 */
export function getAllPillars(): Pillar[] {
  return Object.values(PILLARS).sort((a, b) => a.order - b.order);
}

/**
 * Get pillar by ID
 */
export function getPillar(pillarId: PillarCode): Pillar | null {
  return PILLARS[pillarId] || null;
}

/**
 * Get pillar name (patient-friendly by default)
 */
export function getPillarName(pillarId: PillarCode, clinical: boolean = false): string {
  const pillar = PILLARS[pillarId];
  if (!pillar) return pillarId;
  return clinical ? pillar.name_clinical : pillar.name_patient;
}

/**
 * Get pillar color
 */
export function getPillarColor(pillarId: PillarCode): string {
  return PILLARS[pillarId]?.color || '#3E2BB8';
}

/**
 * Get pillar icon
 */
export function getPillarIcon(pillarId: PillarCode): string {
  return PILLARS[pillarId]?.icon || 'circle';
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate ID format
 */
export function isValidBlockId(id: string): boolean {
  const pattern = /^[A-Z]{2}_[A-Z]{3}_[A-Z]{3}_\d{3}$/;
  return pattern.test(id);
}

export function isValidThemeId(id: string): boolean {
  const pattern = /^[A-Z]{2}_[A-Z]{3}_[A-Z]{3}$/;
  return pattern.test(id);
}

export function isValidConceptId(id: string): boolean {
  const pattern = /^[A-Z]{2}_[A-Z]{3}$/;
  return pattern.test(id);
}

export function isValidPillarId(id: string): boolean {
  return id in PILLARS;
}

// ============================================================================
// DISPLAY HELPERS
// ============================================================================

/**
 * Format a block ID for display
 * @example formatBlockForDisplay("ER_WOT_REC_001") → "ER.WOT.REC.001"
 */
export function formatBlockForDisplay(blockId: string): string {
  return blockId.replace(/_/g, '.');
}

/**
 * Get human-readable hierarchy path
 * @example getHierarchyPath({ pillar: "ER", concept: "ER_WOT", theme: "ER_WOT_REC" })
 *   → "Emotional Regulation > Window of Tolerance > Recognizing Your Window"
 */
export function getHierarchyPath(ids: {
  pillar_id?: PillarCode;
  concept_id?: string;
  theme_id?: string;
  block_id?: string;
}): string {
  const parts: string[] = [];
  
  if (ids.pillar_id) {
    parts.push(getPillarName(ids.pillar_id));
  }
  
  // Note: Concept and theme names would need to be fetched from KV store
  // This is a placeholder for the structure
  
  return parts.join(' > ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  PILLARS,
  getAllPillars,
  getPillar,
  getPillarName,
  getPillarColor,
  getPillarIcon,
  parseBlockId,
  parseThemeId,
  parseConceptId,
  getParentIds,
  TaxonomyKeys,
  isValidBlockId,
  isValidThemeId,
  isValidConceptId,
  isValidPillarId,
  formatBlockForDisplay,
  getHierarchyPath
};
