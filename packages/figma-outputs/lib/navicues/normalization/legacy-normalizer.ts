/**
 * LEGACY NAVICUE NORMALIZER
 * 
 * Transforms the existing 3,000 NaviCues into the Universal Contract format
 * so they can sync to Supabase alongside the new 7,000
 * 
 * Input: Legacy NaviCue format (whatever the 3,000 currently use)
 * Output: GeneratedNavicue format (same as Batch 4-10 generator)
 */

import { GeneratedNavicue, KbeLayer, Tier, ComponentType, CouncilLens } from '../../../types/navicue-contract';

// ============================================================================
// LEGACY FORMAT (Define based on your existing 3,000)
// ============================================================================

/**
 * This is a PLACEHOLDER - replace with your actual legacy format
 * 
 * Where are the 3,000 currently?
 * - TS files? (import { BATCH_1 } from './legacy/batch1.ts')
 * - JSON files?
 * - Supabase old schema? (SELECT * FROM old_navicues)
 * - Hardcoded arrays?
 */
export interface LegacyNavicue {
  id?: string;
  code?: string;
  family?: string; // e.g. "statement_mirror", "belief_probe"
  copy?: {
    headline?: string;
    body?: string;
    prompt?: string;
    options?: string[];
  };
  response_type?: string;
  schema_id?: string;
  mindblock_id?: string;
  tags?: string[];
  batch?: number;
  // Add other fields as needed
}

// ============================================================================
// MAPPING TABLES
// ============================================================================

/**
 * Map legacy family names to new component_type
 */
const FAMILY_TO_COMPONENT: Record<string, ComponentType> = {
  'statement_mirror': 'statement_mirror',
  'belief_probe': 'belief_probe',
  'reframe_seed': 'reframe_seed',
  'identity_koan': 'identity_koan',
  'paradox_prompt': 'paradox_prompt',
  'practice': 'practice',
  'story_shard': 'story_shard',
  'curveball': 'curveball',
  'grip_scan': 'grip_scan',
  'allowing_gate': 'allowing_gate',
  'release_prompt': 'release_prompt',
  'story_drop': 'story_drop',
  'inventory_spark': 'inventory_spark',
  'proof_stamp': 'proof_stamp',
  'council_rotate': 'council_rotate',
};

/**
 * Infer KBE layer from component type
 */
const COMPONENT_TO_KBE: Record<string, KbeLayer> = {
  'statement_mirror': 'K',
  'belief_probe': 'K',
  'witness_switch': 'K',
  'two_column_reality': 'B',
  'reframe_seed': 'B',
  'parts_rollcall': 'B',
  'values_fork': 'B',
  'practice': 'E',
  'proof_stamp_capture': 'E',
  'recall_card_create': 'E',
  'sangha_ping': 'E',
  'somatic_map_tap': 'K',
  'grip_scan': 'K',
  'allowing_gate': 'B',
  'release_prompt': 'E',
  'story_drop': 'E',
  'story_seed': 'K',
  'paradox_key_safe': 'K',
  'repair_draft': 'E',
  'identity_koan': 'K',
  'paradox_prompt': 'B',
  'story_shard': 'K',
  'curveball': 'B',
  'inventory_spark': 'E',
  'proof_stamp': 'E',
  'council_rotate': 'B',
  'recall_card_return': 'E',
};

/**
 * Infer tier from component type (conservative defaults)
 */
const COMPONENT_TO_TIER: Record<string, Tier> = {
  'grip_scan': 'hot',
  'allowing_gate': 'hot',
  'somatic_map_tap': 'hot',
  'sangha_ping': 'warm',
  'witness_switch': 'warm',
  'two_column_reality': 'warm',
  'parts_rollcall': 'warm',
  'values_fork': 'warm',
  'statement_mirror': 'warm',
  'belief_probe': 'warm',
  'reframe_seed': 'warm',
  'practice': 'warm',
  'story_drop': 'warm',
  'release_prompt': 'warm',
  'proof_stamp': 'warm',
  'council_rotate': 'warm',
  'story_shard': 'warm',
  'curveball': 'cool',
  'paradox_key_safe': 'cool',
  'paradox_prompt': 'cool',
  'identity_koan': 'cool',
  'repair_draft': 'cool',
  'micro_thread_3': 'cool',
  'recall_card_create': 'cool',
  'recall_card_return': 'warm',
  'proof_stamp_capture': 'warm',
  'story_seed': 'cool',
  'inventory_spark': 'cool',
};

/**
 * Infer response type from component or legacy response_type
 */
const COMPONENT_TO_RESPONSE_TYPE: Record<string, string> = {
  'witness_switch': 'slider_0_10',
  'two_column_reality': 'choice_single',
  'parts_rollcall': 'choice_single',
  'values_fork': 'choice_single',
  'recall_card_create': 'text_1line',
  'recall_card_return': 'slider_0_10',
  'proof_stamp_capture': 'text_1line',
  'repair_draft': 'text_short',
  'sangha_ping': 'choice_single',
  'story_seed': 'text_short',
  'paradox_key_safe': 'slider_0_10',
  'somatic_map_tap': 'slider_0_10',
  'statement_mirror': 'text_short',
  'belief_probe': 'slider_0_10',
  'reframe_seed': 'text_1line',
  'identity_koan': 'text_short',
  'paradox_prompt': 'slider_0_10',
  'practice': 'binary',
  'story_shard': 'none',
  'curveball': 'choice_single',
  'grip_scan': 'slider_0_10',
  'allowing_gate': 'slider_0_10',
  'release_prompt': 'binary',
  'story_drop': 'none',
  'inventory_spark': 'checklist',
  'proof_stamp': 'text_1line',
  'council_rotate': 'none',
};

// ============================================================================
// NORMALIZER FUNCTION
// ============================================================================

/**
 * Normalize a legacy NaviCue into the Universal Contract format
 */
export function normalizeLegacyNavicue(legacy: LegacyNavicue, index: number): GeneratedNavicue {
  // Determine component type
  const componentType = (legacy.family && FAMILY_TO_COMPONENT[legacy.family]) || 'statement_mirror';
  
  // Generate code if missing (use legacy code or generate new one)
  const code = legacy.code || legacy.id || `nc.${String(index).padStart(4, '0')}`;
  
  // Infer KBE, tier, response type
  const kbeLayer = COMPONENT_TO_KBE[componentType] || 'K';
  const tier = COMPONENT_TO_TIER[componentType] || 'warm';
  const responseType = legacy.response_type || COMPONENT_TO_RESPONSE_TYPE[componentType] || 'text_short';
  
  // Create variant (use "system" lens for legacy, or detect if Council voice exists)
  const variant = {
    lens: detectCouncilLens(legacy) || 'system' as CouncilLens,
    copy: {
      headline: legacy.copy?.headline || '',
      body: legacy.copy?.body || '',
      prompt: legacy.copy?.prompt || '',
      options: legacy.copy?.options || [],
    },
  };
  
  // Create target (use schema_id or mindblock_id if available)
  const target = {
    scope_type: legacy.mindblock_id ? 'mindblock' as const : 'schema' as const,
    schema_id: legacy.schema_id,
    mindblock_id: legacy.mindblock_id,
    weight: 1.0,
    is_primary: true,
  };
  
  // Build normalized NaviCue
  const normalized: GeneratedNavicue = {
    code,
    kbe_layer: kbeLayer,
    tier,
    family: componentType, // Keep family for backwards compat
    component_type: componentType,
    default_response_type: responseType,
    intent: `Legacy cue normalized from batch ${legacy.batch || 'unknown'}`,
    variants: [variant],
    targets: [target],
    tags: [
      ...(legacy.tags || []),
      'legacy',
      `batch_${legacy.batch || 0}`,
      'normalized',
    ],
    config: {},
    analytics_config: {},
  };
  
  return normalized;
}

/**
 * Detect if legacy copy uses Council voice patterns
 * (Simple heuristic - can be enhanced)
 */
function detectCouncilLens(legacy: LegacyNavicue): CouncilLens | null {
  const allText = [
    legacy.copy?.headline,
    legacy.copy?.body,
    legacy.copy?.prompt,
  ].filter(Boolean).join(' ').toLowerCase();
  
  if (allText.includes('compassionate') || allText.includes('wounded')) return 'mate';
  if (allText.includes('one day at a time') || allText.includes('higher power')) return 'bill_w';
  if (allText.includes('paradox') || allText.includes('which is it?')) return 'watts';
  if (allText.includes('loving awareness') || allText.includes('be here now')) return 'ram_dass';
  if (allText.includes('let go of') || allText.includes('resistance')) return 'hawkins';
  
  return null; // Default to 'system' (will be set by caller)
}

// ============================================================================
// BATCH NORMALIZER
// ============================================================================

/**
 * Normalize an entire batch of legacy NaviCues
 */
export function normalizeLegacyBatch(legacyCues: LegacyNavicue[]): GeneratedNavicue[] {
  return legacyCues.map((legacy, index) => normalizeLegacyNavicue(legacy, index));
}

/**
 * Normalize all 3,000 legacy NaviCues and prepare for sync
 */
export function normalizeAll3000(
  batch1: LegacyNavicue[],
  batch2: LegacyNavicue[],
  batch3: LegacyNavicue[]
): GeneratedNavicue[] {
  const allLegacy = [
    ...batch1.map((c, i) => ({ ...c, batch: 1 })),
    ...batch2.map((c, i) => ({ ...c, batch: 2 })),
    ...batch3.map((c, i) => ({ ...c, batch: 3 })),
  ];
  
  return normalizeLegacyBatch(allLegacy);
}

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

/**
 * Export normalized cues as JSON for Playground preview
 */
export function exportAsJSON(normalized: GeneratedNavicue[]): string {
  return JSON.stringify({
    version: '1.0',
    source: 'legacy_normalization',
    count: normalized.length,
    generated_at: new Date().toISOString(),
    navicues: normalized,
  }, null, 2);
}

/**
 * Export normalized cues as SQL INSERT statements for Supabase
 */
export function exportAsSQL(normalized: GeneratedNavicue[]): string {
  let sql = `-- NORMALIZED LEGACY NAVICUES (${normalized.length} total)\n\n`;
  
  for (const cue of normalized) {
    // Insert into navicues
    sql += `INSERT INTO navicues (code, kbe_layer, tier, family, component_type, default_response_type, intent, tags, config) VALUES (\n`;
    sql += `  '${cue.code}',\n`;
    sql += `  '${cue.kbe_layer}',\n`;
    sql += `  '${cue.tier}',\n`;
    sql += `  '${cue.family}',\n`;
    sql += `  '${cue.component_type}',\n`;
    sql += `  '${cue.default_response_type}',\n`;
    sql += `  '${cue.intent}',\n`;
    sql += `  ARRAY[${cue.tags.map(t => `'${t}'`).join(', ')}],\n`;
    sql += `  '{}'::jsonb\n`;
    sql += `);\n\n`;
    
    // Insert variants
    for (const variant of cue.variants) {
      sql += `INSERT INTO navicue_variants (navicue_id, lens, language, copy, is_default) VALUES (\n`;
      sql += `  (SELECT id FROM navicues WHERE code = '${cue.code}'),\n`;
      sql += `  '${variant.lens}',\n`;
      sql += `  'en',\n`;
      sql += `  '${JSON.stringify(variant.copy)}'::jsonb,\n`;
      sql += `  true\n`;
      sql += `);\n\n`;
    }
    
    // Insert targets
    for (const target of cue.targets) {
      sql += `INSERT INTO navicue_targets (navicue_id, scope_type, schema_id, mindblock_id, weight, is_primary) VALUES (\n`;
      sql += `  (SELECT id FROM navicues WHERE code = '${cue.code}'),\n`;
      sql += `  '${target.scope_type}',\n`;
      sql += `  ${target.schema_id ? `'${target.schema_id}'` : 'NULL'},\n`;
      sql += `  ${target.mindblock_id ? `'${target.mindblock_id}'` : 'NULL'},\n`;
      sql += `  ${target.weight},\n`;
      sql += `  ${target.is_primary}\n`;
      sql += `);\n\n`;
    }
  }
  
  return sql;
}
