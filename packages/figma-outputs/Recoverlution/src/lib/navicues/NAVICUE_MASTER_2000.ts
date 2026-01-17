/**
 * NAVICUE MASTER INDEX - ALL 2000 NAVICUES
 * 
 * The complete strategic arsenal for algorithmic mindset transformation
 * 
 * STRUCTURE:
 * - Batch 1 (nc.001 - nc.1000): Original transformed arsenal
 * - Batch 2 (nc.1001 - nc.2000): Strategic algorithmic arsenal
 * 
 * TOTAL: 2000 NaviCues
 * - 12 Schemas across all
 * - 6 Pillars across all
 * - 8 Families across all
 * - 3 KBE Layers (knowing, believing, embodying)
 * - 3 Tracks (clinical, guru, infinite)
 * 
 * PHILOSOPHY: Neuroscience + Spirit + Poetry
 * 
 * USE CASES:
 * - Universal Player consumption
 * - LUMA AI orchestration
 * - Algorithmic rotation and testing
 * - Clinical Foundation mapping
 * - Schema-based therapeutic interventions
 */

import { NaviCue } from './types';
import { NAVICUE_1000_COMPLETE } from './NAVICUE_1000_COMPLETE';
import { NAVICUE_2000_ARSENAL } from './NAVICUE_2000_ARSENAL';

// ============================================================================
// MASTER EXPORT - ALL 2000 NAVICUES
// ============================================================================

export const NAVICUE_MASTER_2000: NaviCue[] = [
  ...NAVICUE_1000_COMPLETE,
  ...NAVICUE_2000_ARSENAL,
];

// ============================================================================
// BATCH EXPORTS (for targeted access)
// ============================================================================

export const NAVICUE_BATCH_1 = NAVICUE_1000_COMPLETE; // nc.001 - nc.1000
export const NAVICUE_BATCH_2 = NAVICUE_2000_ARSENAL;   // nc.1001 - nc.2000

// ============================================================================
// STATISTICS & VALIDATION
// ============================================================================

export function getMasterStats() {
  const stats = {
    total: NAVICUE_MASTER_2000.length,
    batch1Count: NAVICUE_BATCH_1.length,
    batch2Count: NAVICUE_BATCH_2.length,
    byFamily: {} as Record<string, number>,
    byPillar: {} as Record<string, number>,
    bySchema: {} as Record<string, number>,
    byModality: {} as Record<string, number>,
    byResponseType: {} as Record<string, number>,
    byTrack: {} as Record<string, number>,
    byKBE: {} as Record<string, number>,
    idRange: {
      min: 'nc.001',
      max: 'nc.2000',
    },
  };

  NAVICUE_MASTER_2000.forEach(nc => {
    stats.byFamily[nc.family] = (stats.byFamily[nc.family] || 0) + 1;
    stats.byPillar[nc.pillar_id] = (stats.byPillar[nc.pillar_id] || 0) + 1;
    stats.bySchema[nc.schema || 'none'] = (stats.bySchema[nc.schema || 'none'] || 0) + 1;
    stats.byModality[nc.modality] = (stats.byModality[nc.modality] || 0) + 1;
    stats.byResponseType[nc.response_type] = (stats.byResponseType[nc.response_type] || 0) + 1;
    stats.byTrack[nc.track || 'clinical'] = (stats.byTrack[nc.track || 'clinical'] || 0) + 1;
    stats.byKBE[nc.kbe_target] = (stats.byKBE[nc.kbe_target] || 0) + 1;
  });

  return stats;
}

// ============================================================================
// FILTERING & QUERY FUNCTIONS
// ============================================================================

export function getNaviCuesBySchema(schema: string): NaviCue[] {
  return NAVICUE_MASTER_2000.filter(nc => nc.schema === schema);
}

export function getNaviCuesByPillar(pillarId: string): NaviCue[] {
  return NAVICUE_MASTER_2000.filter(nc => nc.pillar_id === pillarId);
}

export function getNaviCuesByFamily(family: string): NaviCue[] {
  return NAVICUE_MASTER_2000.filter(nc => nc.family === family);
}

export function getNaviCuesByKBE(kbeLayer: 'knowing' | 'believing' | 'embodying'): NaviCue[] {
  return NAVICUE_MASTER_2000.filter(nc => nc.kbe_target === kbeLayer);
}

export function getNaviCuesBySchemaAndKBE(
  schema: string,
  kbeLayer: 'knowing' | 'believing' | 'embodying'
): NaviCue[] {
  return NAVICUE_MASTER_2000.filter(
    nc => nc.schema === schema && nc.kbe_target === kbeLayer
  );
}

export function getNaviCuesBySchemaAndFamily(
  schema: string,
  family: string
): NaviCue[] {
  return NAVICUE_MASTER_2000.filter(
    nc => nc.schema === schema && nc.family === family
  );
}

export function getNaviCueById(id: string): NaviCue | undefined {
  return NAVICUE_MASTER_2000.find(nc => nc.id === id);
}

export function getRandomNaviCues(count: number = 10): NaviCue[] {
  const shuffled = [...NAVICUE_MASTER_2000].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ============================================================================
// ALGORITHMIC ARSENAL FUNCTIONS
// ============================================================================

/**
 * Get multiple NaviCues for a specific mindblock to test from different angles
 * This is the core of the algorithmic rotation strategy
 */
export function getArsenalForMindblock(
  schema: string,
  count: number = 5,
  options?: {
    kbeLayer?: 'knowing' | 'believing' | 'embodying';
    families?: string[];
    pillarId?: string;
  }
): NaviCue[] {
  let filtered = NAVICUE_MASTER_2000.filter(nc => nc.schema === schema);

  if (options?.kbeLayer) {
    filtered = filtered.filter(nc => nc.kbe_target === options.kbeLayer);
  }

  if (options?.families && options.families.length > 0) {
    filtered = filtered.filter(nc => options.families!.includes(nc.family));
  }

  if (options?.pillarId) {
    filtered = filtered.filter(nc => nc.pillar_id === options.pillarId);
  }

  // Shuffle to get variety
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get a progression sequence: knowing → believing → embodying
 * For gradual deepening on a specific schema
 */
export function getKBEProgression(
  schema: string,
  perLayer: number = 3
): NaviCue[] {
  const knowing = getNaviCuesBySchemaAndKBE(schema, 'knowing')
    .sort(() => Math.random() - 0.5)
    .slice(0, perLayer);
  
  const believing = getNaviCuesBySchemaAndKBE(schema, 'believing')
    .sort(() => Math.random() - 0.5)
    .slice(0, perLayer);
  
  const embodying = getNaviCuesBySchemaAndKBE(schema, 'embodying')
    .sort(() => Math.random() - 0.5)
    .slice(0, perLayer);

  return [...knowing, ...believing, ...embodying];
}

/**
 * Get diverse family types for the same schema
 * Test which approach resonates best
 */
export function getDiverseApproaches(
  schema: string,
  kbeLayer?: 'knowing' | 'believing' | 'embodying'
): NaviCue[] {
  const families = [
    'statement_mirror',
    'belief_probe',
    'identity_koan',
    'paradox_prompt',
    'story_shard',
    'reframe_seed',
    'curveball',
    'practice'
  ];

  const results: NaviCue[] = [];

  families.forEach(family => {
    let filtered = NAVICUE_MASTER_2000.filter(
      nc => nc.schema === schema && nc.family === family
    );

    if (kbeLayer) {
      filtered = filtered.filter(nc => nc.kbe_target === kbeLayer);
    }

    if (filtered.length > 0) {
      const random = filtered[Math.floor(Math.random() * filtered.length)];
      results.push(random);
    }
  });

  return results;
}

// ============================================================================
// VALIDATION & LOGGING
// ============================================================================

console.log('✅ NAVICUE MASTER 2000 - Loaded Successfully');
console.log('📊 Total Arsenal:', NAVICUE_MASTER_2000.length);
console.log('🎯 Batch 1 (Original):', NAVICUE_BATCH_1.length);
console.log('🎯 Batch 2 (Strategic):', NAVICUE_BATCH_2.length);
console.log('🧬 Ready for Universal Player, LUMA AI, and algorithmic orchestration');

// Export default for convenience
export default NAVICUE_MASTER_2000;
