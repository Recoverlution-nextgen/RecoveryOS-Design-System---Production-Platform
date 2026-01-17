/**
 * NAVICUE ENHANCEMENT SYSTEM
 * 
 * Transforms raw NaviCues from TypeScript files into fully-tagged,
 * LUMA-ready NaviCues with complete metadata for orchestration.
 * 
 * Fills in missing fields based on intelligent defaults and mappings.
 */

import { getPillarForSchema } from './mappings/schemaToPillar';
import { computeHeatLevel } from './mappings/familyToHeatLevel';
import { getKBEForFamily } from './mappings/familyToKBE';
import { generateEnhancedTags } from './mappings/tagGenerator';

export interface RawNaviCue {
  id: string;
  text_line: string;
  response_type: string;
  family: string;
  
  // Optional (depends on batch)
  schema?: string;
  kbe_target?: string;
  council_lens?: string;
  way_process?: string;
  heat_level?: string;
  pillar_id?: string;
  tags?: string[];
}

export interface EnhancedNaviCue extends RawNaviCue {
  // Guaranteed to exist after enhancement
  schema: string;
  kbe_target: string;
  heat_level: string;
  pillar_id: string;
  tags: string[];
  
  // Metadata
  batch_number: number;
  batch_name: string;
  status: 'active' | 'draft' | 'archived';
}

/**
 * MAIN ENHANCEMENT FUNCTION
 * Takes a raw NaviCue and fills in all missing metadata
 */
export function enhanceNaviCue(
  rawNaviCue: RawNaviCue,
  batchNumber: number
): EnhancedNaviCue {
  const enhanced: any = { ...rawNaviCue };
  
  // ============================================================================
  // STEP 1: SCHEMA (if missing, infer from content - Batch 1 mainly)
  // ============================================================================
  if (!enhanced.schema) {
    enhanced.schema = inferSchemaFromContent(
      enhanced.text_line,
      enhanced.family
    );
  }
  
  // ============================================================================
  // STEP 2: KBE TARGET (if missing, use family default - Batch 3 mainly)
  // ============================================================================
  if (!enhanced.kbe_target) {
    enhanced.kbe_target = getKBEForFamily(enhanced.family);
  }
  
  // ============================================================================
  // STEP 3: HEAT LEVEL (if missing, compute from family + schema)
  // ============================================================================
  if (!enhanced.heat_level) {
    enhanced.heat_level = computeHeatLevel(enhanced.family, enhanced.schema);
  }
  
  // ============================================================================
  // STEP 4: PILLAR (map from schema)
  // ============================================================================
  if (!enhanced.pillar_id && enhanced.schema) {
    enhanced.pillar_id = getPillarForSchema(enhanced.schema) || 'P-01';
  }
  
  // ============================================================================
  // STEP 5: TAGS (generate from all metadata)
  // ============================================================================
  enhanced.tags = generateEnhancedTags({
    family: enhanced.family,
    schema: enhanced.schema,
    kbe_target: enhanced.kbe_target,
    council_lens: enhanced.council_lens,
    way_process: enhanced.way_process,
    heat_level: enhanced.heat_level,
    response_type: enhanced.response_type,
    text_line: enhanced.text_line,
    pillar_id: enhanced.pillar_id,
  });
  
  // ============================================================================
  // STEP 6: BATCH METADATA
  // ============================================================================
  enhanced.batch_number = batchNumber;
  enhanced.batch_name = getBatchName(batchNumber);
  enhanced.status = 'active';
  
  return enhanced as EnhancedNaviCue;
}

/**
 * Get batch name from number
 */
function getBatchName(batchNumber: number): string {
  const names: Record<number, string> = {
    1: 'neuroscience_spirit_poetry',
    2: 'algorithmic_arsenal',
    3: 'council_of_six',
  };
  return names[batchNumber] || 'unknown';
}

/**
 * SCHEMA INFERENCE (for Batch 1)
 * 
 * Uses keyword patterns and clinical taxonomy to infer schema
 * from NaviCue text content.
 * 
 * Priority order:
 * 1. Explicit keyword matches
 * 2. Family-based defaults
 * 3. Fallback to 'fusion' (most general)
 */
function inferSchemaFromContent(textLine: string, family: string): string {
  const lower = textLine.toLowerCase();
  
  // ============================================================================
  // EXPLICIT KEYWORD PATTERNS (high confidence)
  // ============================================================================
  const schemaPatterns: Record<string, string[]> = {
    shame: [
      'shame', 'unworthy', 'not good enough', 'defective', 'flawed',
      'worthless', 'inadequate', 'broken', 'damaged',
    ],
    
    abandonment: [
      'abandon', 'alone', 'left', 'rejected', 'isolated',
      'nobody cares', 'left behind', 'forgotten',
    ],
    
    control: [
      'control', 'helpless', 'powerless', 'out of control',
      'can\'t handle', 'overwhelmed', 'can\'t manage',
    ],
    
    perfectionism: [
      'perfect', 'mistake', 'fail', 'not enough', 'should',
      'have to', 'must', 'always', 'never good enough',
    ],
    
    vulnerability: [
      'vulnerable', 'hurt', 'exposed', 'unsafe', 'danger',
      'protect', 'guard', 'threat',
    ],
    
    approval_seeking: [
      'approval', 'please', 'validate', 'accept me',
      'what will they think', 'need them to',
    ],
    
    failure: [
      'failure', 'failing', 'loser', 'didn\'t make it',
      'not successful', 'gave up',
    ],
    
    trust: [
      'trust', 'safe', 'reliable', 'depend', 'count on',
    ],
    
    emotional_deprivation: [
      'empty', 'hollow', 'nothing', 'numb', 'void',
      'no one understands', 'not seen',
    ],
    
    defectiveness: [
      'something wrong with me', 'defective', 'fundamentally broken',
      'can\'t be fixed', 'damaged goods',
    ],
    
    subjugation: [
      'give in', 'sacrifice', 'put others first', 'can\'t say no',
      'lose myself', 'disappear',
    ],
    
    binary_thinking: [
      'always', 'never', 'all or nothing', 'black and white',
      'either', 'must be', 'can\'t be both',
    ],
    
    fusion: [
      'i am', 'this is me', 'defines me', 'who i am',
      'my identity', 'this thought', 'this story',
    ],
  };
  
  // Check for explicit matches
  for (const [schema, keywords] of Object.entries(schemaPatterns)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return schema;
    }
  }
  
  // ============================================================================
  // FAMILY-BASED DEFAULTS (medium confidence)
  // ============================================================================
  const familyDefaults: Record<string, string> = {
    grip_scan: 'fusion',           // Body awareness → noticing fusion
    allowing_gate: 'control',      // Acceptance → releasing control
    release_prompt: 'control',     // Letting go → releasing control
    story_drop: 'fusion',          // Decentering → defusing from story
    paradox_key: 'binary_thinking', // Paradox → both/and vs either/or
    proof_stamp: 'defectiveness',  // Evidence → countering defectiveness
    inventory_spark: 'shame',      // Reflection → exploring shame
    sangha_ping: 'abandonment',    // Connection → countering abandonment
  };
  
  if (familyDefaults[family]) {
    return familyDefaults[family];
  }
  
  // ============================================================================
  // FALLBACK (low confidence)
  // ============================================================================
  return 'fusion'; // Most general, applies to most content
}

/**
 * BATCH ENHANCEMENT FUNCTIONS
 * Batch-specific enhancement logic
 */

/**
 * Enhance Batch 1 (Neuroscience + Spirit + Poetry)
 * Missing: schema, heat_level, pillar_id, tags
 */
export function enhanceBatch1(rawNaviCues: RawNaviCue[]): EnhancedNaviCue[] {
  return rawNaviCues.map(nc => enhanceNaviCue(nc, 1));
}

/**
 * Enhance Batch 2 (Algorithmic Arsenal - 8 families × 12 schemas)
 * Has: schema, kbe_target, family
 * Missing: heat_level, pillar_id, tags
 */
export function enhanceBatch2(rawNaviCues: RawNaviCue[]): EnhancedNaviCue[] {
  return rawNaviCues.map(nc => enhanceNaviCue(nc, 2));
}

/**
 * Enhance Batch 3 (Council of Six - state gating)
 * Has: schema, family, council_lens, way_process, heat_level
 * Missing: kbe_target, pillar_id, tags
 */
export function enhanceBatch3(rawNaviCues: RawNaviCue[]): EnhancedNaviCue[] {
  return rawNaviCues.map(nc => enhanceNaviCue(nc, 3));
}

/**
 * VALIDATION FUNCTIONS
 */

/**
 * Validate that an enhanced NaviCue has all required fields
 */
export function validateEnhancedNaviCue(navicue: EnhancedNaviCue): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Required fields
  if (!navicue.id) errors.push('Missing id');
  if (!navicue.text_line) errors.push('Missing text_line');
  if (!navicue.response_type) errors.push('Missing response_type');
  if (!navicue.family) errors.push('Missing family');
  if (!navicue.schema) errors.push('Missing schema');
  if (!navicue.kbe_target) errors.push('Missing kbe_target');
  if (!navicue.heat_level) errors.push('Missing heat_level');
  if (!navicue.pillar_id) errors.push('Missing pillar_id');
  if (!navicue.tags || navicue.tags.length === 0) errors.push('Missing tags');
  if (!navicue.batch_number) errors.push('Missing batch_number');
  if (!navicue.batch_name) errors.push('Missing batch_name');
  
  // Valid values
  const validHeatLevels = ['high', 'medium', 'low'];
  if (navicue.heat_level && !validHeatLevels.includes(navicue.heat_level)) {
    errors.push(`Invalid heat_level: ${navicue.heat_level}`);
  }
  
  const validKBE = ['knowing', 'believing', 'embodying'];
  if (navicue.kbe_target && !validKBE.includes(navicue.kbe_target)) {
    errors.push(`Invalid kbe_target: ${navicue.kbe_target}`);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate a batch of enhanced NaviCues
 */
export function validateBatch(
  navicues: EnhancedNaviCue[]
): {
  totalCount: number;
  validCount: number;
  invalidCount: number;
  errors: Array<{ id: string; errors: string[] }>;
} {
  const results = navicues.map(nc => ({
    id: nc.id,
    validation: validateEnhancedNaviCue(nc),
  }));
  
  const invalid = results.filter(r => !r.validation.valid);
  
  return {
    totalCount: navicues.length,
    validCount: navicues.length - invalid.length,
    invalidCount: invalid.length,
    errors: invalid.map(r => ({
      id: r.id,
      errors: r.validation.errors,
    })),
  };
}

/**
 * STATISTICS & REPORTING
 */

/**
 * Get statistics about a batch of enhanced NaviCues
 */
export function getBatchStatistics(navicues: EnhancedNaviCue[]) {
  const stats = {
    total: navicues.length,
    by_family: {} as Record<string, number>,
    by_schema: {} as Record<string, number>,
    by_kbe: {} as Record<string, number>,
    by_heat: {} as Record<string, number>,
    by_pillar: {} as Record<string, number>,
    by_council: {} as Record<string, number>,
    by_way: {} as Record<string, number>,
  };
  
  navicues.forEach(nc => {
    // Count by family
    stats.by_family[nc.family] = (stats.by_family[nc.family] || 0) + 1;
    
    // Count by schema
    stats.by_schema[nc.schema] = (stats.by_schema[nc.schema] || 0) + 1;
    
    // Count by KBE
    stats.by_kbe[nc.kbe_target] = (stats.by_kbe[nc.kbe_target] || 0) + 1;
    
    // Count by heat
    stats.by_heat[nc.heat_level] = (stats.by_heat[nc.heat_level] || 0) + 1;
    
    // Count by pillar
    stats.by_pillar[nc.pillar_id] = (stats.by_pillar[nc.pillar_id] || 0) + 1;
    
    // Count by council (if present)
    if (nc.council_lens) {
      stats.by_council[nc.council_lens] = (stats.by_council[nc.council_lens] || 0) + 1;
    }
    
    // Count by way (if present)
    if (nc.way_process) {
      stats.by_way[nc.way_process] = (stats.by_way[nc.way_process] || 0) + 1;
    }
  });
  
  return stats;
}
