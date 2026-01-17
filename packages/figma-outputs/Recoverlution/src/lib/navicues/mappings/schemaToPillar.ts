/**
 * SCHEMA TO PILLAR MAPPING
 * 
 * Maps each clinical schema (mindblock) to its parent pillar
 * in the 6-Pillar Clinical Blueprint.
 * 
 * Taxonomy: Pillar → Concept → Theme → Mindblock (Schema)
 */

export const SCHEMA_TO_PILLAR_MAP: Record<string, string> = {
  // ============================================================================
  // PILLAR 1: DECENTERING & COGNITIVE FLEXIBILITY
  // ============================================================================
  fusion: 'P-01',
  binary_thinking: 'P-01',
  catastrophizing: 'P-01',
  rumination: 'P-01',
  
  // ============================================================================
  // PILLAR 2: CO-REGULATION & CONNECTION
  // ============================================================================
  abandonment: 'P-02',
  mistrust: 'P-02',
  trust: 'P-02',
  enmeshment: 'P-02',
  social_isolation: 'P-02',
  
  // ============================================================================
  // PILLAR 3: AGENCY & EMPOWERMENT
  // ============================================================================
  control: 'P-03',
  defectiveness: 'P-03',
  perfectionism: 'P-03',
  dependence: 'P-03',
  incompetence: 'P-03',
  
  // ============================================================================
  // PILLAR 4: EMOTIONAL TOLERANCE & PRESENCE
  // ============================================================================
  emotional_deprivation: 'P-04',
  vulnerability: 'P-04',
  emotional_inhibition: 'P-04',
  negativity: 'P-04',
  
  // ============================================================================
  // PILLAR 5: AUTHENTICITY & ACCEPTANCE
  // ============================================================================
  shame: 'P-05',
  approval_seeking: 'P-05',
  subjugation: 'P-05',
  self_sacrifice: 'P-05',
  punitiveness: 'P-05',
  
  // ============================================================================
  // PILLAR 6: MEANING & INTEGRATION
  // ============================================================================
  failure: 'P-06',
  unrelenting_standards: 'P-06',
  entitlement: 'P-06',
  insufficient_self_control: 'P-06',
};

export const PILLAR_DEFINITIONS = {
  'P-01': {
    name: 'Decentering & Cognitive Flexibility',
    description: 'Learning to see thoughts as events, not facts. Building space between stimulus and response.',
    core_mechanism: 'Defusion from thoughts',
    key_schemas: ['fusion', 'binary_thinking', 'catastrophizing', 'rumination'],
  },
  'P-02': {
    name: 'Co-Regulation & Connection',
    description: 'Building secure attachment and relational safety. Repairing ruptures in connection.',
    core_mechanism: 'Earned secure attachment',
    key_schemas: ['abandonment', 'mistrust', 'enmeshment', 'social_isolation'],
  },
  'P-03': {
    name: 'Agency & Empowerment',
    description: 'Developing healthy control and self-efficacy. Balancing autonomy and interdependence.',
    core_mechanism: 'Restored agency',
    key_schemas: ['control', 'defectiveness', 'perfectionism', 'incompetence'],
  },
  'P-04': {
    name: 'Emotional Tolerance & Presence',
    description: 'Being with difficult emotions without fusion or avoidance. Window of tolerance expansion.',
    core_mechanism: 'Affect tolerance',
    key_schemas: ['emotional_deprivation', 'vulnerability', 'emotional_inhibition', 'negativity'],
  },
  'P-05': {
    name: 'Authenticity & Acceptance',
    description: 'Accepting self as inherently worthy. Living from values, not approval.',
    core_mechanism: 'Radical self-acceptance',
    key_schemas: ['shame', 'approval_seeking', 'subjugation', 'punitiveness'],
  },
  'P-06': {
    name: 'Meaning & Integration',
    description: 'Creating purpose and integrating growth. Moving from survival to thriving.',
    core_mechanism: 'Post-traumatic growth',
    key_schemas: ['failure', 'unrelenting_standards', 'entitlement', 'insufficient_self_control'],
  },
};

/**
 * Get pillar for a given schema
 */
export function getPillarForSchema(schema: string): string | undefined {
  return SCHEMA_TO_PILLAR_MAP[schema];
}

/**
 * Get all schemas for a given pillar
 */
export function getSchemasForPillar(pillarId: string): string[] {
  return Object.entries(SCHEMA_TO_PILLAR_MAP)
    .filter(([_, pillar]) => pillar === pillarId)
    .map(([schema]) => schema);
}

/**
 * Get pillar definition
 */
export function getPillarDefinition(pillarId: string) {
  return PILLAR_DEFINITIONS[pillarId as keyof typeof PILLAR_DEFINITIONS];
}
