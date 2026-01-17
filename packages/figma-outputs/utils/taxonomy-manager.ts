/**
 * RECOVERLUTION TAXONOMY MANAGER
 * 
 * Manages the complete taxonomy system and integrates with KV store.
 * Provides functions to:
 * - Seed initial taxonomy data
 * - Query hierarchy at any level
 * - Fetch user progress across hierarchy
 * - Calculate rollup scores
 */

import { PILLARS, TaxonomyKeys, parseBlockId, type PillarCode, type Pillar, type Concept, type Theme, type Block } from './taxonomy';
import { CONCEPTS, THEMES, BLOCKS, getConceptsForPillar, getThemesForConcept, getBlocksForTheme } from './taxonomy-seed';
import { calculateBlockStatus, calculateThemeStatus, calculateConceptStatus, calculatePillarStatus, AssessmentKeys, type UserBlockProgress, type AssessmentData } from './block-assessment';

// ============================================================================
// SEEDING FUNCTIONS
// ============================================================================

/**
 * Seed all taxonomy data to KV store
 * Call this once to initialize the system
 */
export async function seedTaxonomy(
  kvSet: (key: string, value: any) => Promise<void>
): Promise<{
  pillars: number;
  concepts: number;
  themes: number;
  blocks: number;
}> {
  
  console.log('🌱 Seeding taxonomy data...');
  
  // 1. Seed Pillars
  const pillarPromises = Object.values(PILLARS).map(pillar => 
    kvSet(TaxonomyKeys.pillar(pillar.id), pillar)
  );
  await Promise.all(pillarPromises);
  console.log(`✅ Seeded ${Object.keys(PILLARS).length} pillars`);
  
  // 2. Seed Concepts
  const conceptPromises = CONCEPTS.map(concept =>
    kvSet(TaxonomyKeys.concept(concept.id), concept)
  );
  await Promise.all(conceptPromises);
  console.log(`✅ Seeded ${CONCEPTS.length} concepts`);
  
  // 3. Seed Themes
  const themePromises = THEMES.map(theme =>
    kvSet(TaxonomyKeys.theme(theme.id), theme)
  );
  await Promise.all(themePromises);
  console.log(`✅ Seeded ${THEMES.length} themes`);
  
  // 4. Seed Blocks
  const blockPromises = BLOCKS.map(block =>
    kvSet(TaxonomyKeys.block(block.id), block)
  );
  await Promise.all(blockPromises);
  console.log(`✅ Seeded ${BLOCKS.length} blocks`);
  
  console.log('🎉 Taxonomy seeding complete!');
  
  return {
    pillars: Object.keys(PILLARS).length,
    concepts: CONCEPTS.length,
    themes: THEMES.length,
    blocks: BLOCKS.length
  };
}

// ============================================================================
// QUERYING FUNCTIONS
// ============================================================================

/**
 * Get pillar by ID
 */
export async function getPillar(
  pillarId: PillarCode,
  kvGet: (key: string) => Promise<any>
): Promise<Pillar | null> {
  // Pillars are in memory, no need to fetch from KV
  return PILLARS[pillarId] || null;
}

/**
 * Get all pillars
 */
export function getAllPillars(): Pillar[] {
  return Object.values(PILLARS).sort((a, b) => a.order - b.order);
}

/**
 * Get concept by ID
 */
export async function getConcept(
  conceptId: string,
  kvGet: (key: string) => Promise<any>
): Promise<Concept | null> {
  return await kvGet(TaxonomyKeys.concept(conceptId));
}

/**
 * Get all concepts for a pillar
 */
export async function getConceptsForPillarFromKV(
  pillarId: PillarCode,
  kvGetByPrefix: (prefix: string) => Promise<any[]>
): Promise<Concept[]> {
  const concepts = await kvGetByPrefix(TaxonomyKeys.conceptsForPillar(pillarId));
  return concepts.sort((a, b) => a.order - b.order);
}

/**
 * Get theme by ID
 */
export async function getTheme(
  themeId: string,
  kvGet: (key: string) => Promise<any>
): Promise<Theme | null> {
  return await kvGet(TaxonomyKeys.theme(themeId));
}

/**
 * Get all themes for a concept
 */
export async function getThemesForConceptFromKV(
  conceptId: string,
  kvGetByPrefix: (prefix: string) => Promise<any[]>
): Promise<Theme[]> {
  const themes = await kvGetByPrefix(TaxonomyKeys.themesForConcept(conceptId));
  return themes.sort((a, b) => a.order - b.order);
}

/**
 * Get block by ID
 */
export async function getBlock(
  blockId: string,
  kvGet: (key: string) => Promise<any>
): Promise<Block | null> {
  return await kvGet(TaxonomyKeys.block(blockId));
}

/**
 * Get all blocks for a theme
 */
export async function getBlocksForThemeFromKV(
  themeId: string,
  kvGetByPrefix: (prefix: string) => Promise<any[]>
): Promise<Block[]> {
  const blocks = await kvGetByPrefix(TaxonomyKeys.blocksForTheme(themeId));
  return blocks.sort((a, b) => a.order - b.order);
}

/**
 * Get complete hierarchy for a pillar
 */
export async function getPillarHierarchy(
  pillarId: PillarCode,
  kvGet: (key: string) => Promise<any>,
  kvGetByPrefix: (prefix: string) => Promise<any[]>
): Promise<{
  pillar: Pillar;
  concepts: Array<{
    concept: Concept;
    themes: Array<{
      theme: Theme;
      blocks: Block[];
    }>;
  }>;
}> {
  
  const pillar = PILLARS[pillarId];
  const concepts = await getConceptsForPillarFromKV(pillarId, kvGetByPrefix);
  
  const conceptsWithThemes = await Promise.all(
    concepts.map(async (concept) => {
      const themes = await getThemesForConceptFromKV(concept.id, kvGetByPrefix);
      
      const themesWithBlocks = await Promise.all(
        themes.map(async (theme) => {
          const blocks = await getBlocksForThemeFromKV(theme.id, kvGetByPrefix);
          return { theme, blocks };
        })
      );
      
      return { concept, themes: themesWithBlocks };
    })
  );
  
  return {
    pillar,
    concepts: conceptsWithThemes
  };
}

// ============================================================================
// USER PROGRESS FUNCTIONS
// ============================================================================

/**
 * Get user's block progress
 */
export async function getUserBlockProgress(
  userId: string,
  blockId: string,
  kvGet: (key: string) => Promise<any>
): Promise<UserBlockProgress | null> {
  return await kvGet(AssessmentKeys.userBlockProgress(userId, blockId));
}

/**
 * Set user's block progress
 */
export async function setUserBlockProgress(
  userId: string,
  blockId: string,
  assessmentData: AssessmentData,
  kvSet: (key: string, value: any) => Promise<void>
): Promise<UserBlockProgress> {
  
  // Calculate status
  const { status, score, confidence } = calculateBlockStatus(assessmentData);
  
  // Generate LUMA insights
  const { generateLUMAInsights } = await import('./block-assessment');
  const luma_insights = generateLUMAInsights(blockId, assessmentData, status, score);
  
  const progress: UserBlockProgress = {
    user_id: userId,
    block_id: blockId,
    status,
    confidence_score: confidence,
    assessment_data: assessmentData,
    luma_insights,
    last_assessed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    next_assessment_due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
  };
  
  await kvSet(AssessmentKeys.userBlockProgress(userId, blockId), progress);
  
  return progress;
}

/**
 * Get all block progress for a user in a theme
 */
export async function getUserThemeProgress(
  userId: string,
  themeId: string,
  kvGet: (key: string) => Promise<any>,
  kvGetByPrefix: (prefix: string) => Promise<any[]>
): Promise<{
  theme: Theme;
  blocks: Array<{
    block: Block;
    progress: UserBlockProgress | null;
  }>;
  status: 'red' | 'orange' | 'green' | 'unknown';
  score: number;
  completed_blocks: number;
  total_blocks: number;
}> {
  
  const theme = await getTheme(themeId, kvGet);
  if (!theme) {
    throw new Error(`Theme not found: ${themeId}`);
  }
  
  const blocks = await getBlocksForThemeFromKV(themeId, kvGetByPrefix);
  
  const blocksWithProgress = await Promise.all(
    blocks.map(async (block) => {
      const progress = await getUserBlockProgress(userId, block.id, kvGet);
      return { block, progress };
    })
  );
  
  // Calculate theme status
  const blockStatuses = blocksWithProgress
    .filter(bp => bp.progress !== null)
    .map(bp => ({
      status: bp.progress!.status,
      score: calculateBlockStatus(bp.progress!.assessment_data).score
    }));
  
  const { status, score } = blockStatuses.length > 0 
    ? calculateThemeStatus(blockStatuses)
    : { status: 'unknown' as const, score: 0 };
  
  const completed_blocks = blocksWithProgress.filter(
    bp => bp.progress?.status === 'green'
  ).length;
  
  return {
    theme,
    blocks: blocksWithProgress,
    status,
    score,
    completed_blocks,
    total_blocks: blocks.length
  };
}

/**
 * Get all progress for a user in a concept
 */
export async function getUserConceptProgress(
  userId: string,
  conceptId: string,
  kvGet: (key: string) => Promise<any>,
  kvGetByPrefix: (prefix: string) => Promise<any[]>
): Promise<{
  concept: Concept;
  themes: Array<{
    theme: Theme;
    status: 'red' | 'orange' | 'green' | 'unknown';
    score: number;
    completed_blocks: number;
    total_blocks: number;
  }>;
  status: 'red' | 'orange' | 'green' | 'unknown';
  score: number;
}> {
  
  const concept = await getConcept(conceptId, kvGet);
  if (!concept) {
    throw new Error(`Concept not found: ${conceptId}`);
  }
  
  const themes = await getThemesForConceptFromKV(conceptId, kvGetByPrefix);
  
  const themesWithProgress = await Promise.all(
    themes.map(async (theme) => {
      const themeProgress = await getUserThemeProgress(userId, theme.id, kvGet, kvGetByPrefix);
      return {
        theme,
        status: themeProgress.status,
        score: themeProgress.score,
        completed_blocks: themeProgress.completed_blocks,
        total_blocks: themeProgress.total_blocks
      };
    })
  );
  
  const themeStatuses = themesWithProgress.map(t => ({
    status: t.status,
    score: t.score
  }));
  
  const { status, score } = themeStatuses.length > 0
    ? calculateConceptStatus(themeStatuses)
    : { status: 'unknown' as const, score: 0 };
  
  return {
    concept,
    themes: themesWithProgress,
    status,
    score
  };
}

/**
 * Get all progress for a user in a pillar
 */
export async function getUserPillarProgress(
  userId: string,
  pillarId: PillarCode,
  kvGet: (key: string) => Promise<any>,
  kvGetByPrefix: (prefix: string) => Promise<any[]>
): Promise<{
  pillar: Pillar;
  concepts: Array<{
    concept: Concept;
    status: 'red' | 'orange' | 'green' | 'unknown';
    score: number;
  }>;
  status: 'red' | 'orange' | 'green' | 'unknown';
  score: number;
}> {
  
  const pillar = PILLARS[pillarId];
  const concepts = await getConceptsForPillarFromKV(pillarId, kvGetByPrefix);
  
  const conceptsWithProgress = await Promise.all(
    concepts.map(async (concept) => {
      const conceptProgress = await getUserConceptProgress(userId, concept.id, kvGet, kvGetByPrefix);
      return {
        concept,
        status: conceptProgress.status,
        score: conceptProgress.score
      };
    })
  );
  
  const conceptStatuses = conceptsWithProgress.map(c => ({
    status: c.status,
    score: c.score
  }));
  
  const { status, score } = conceptStatuses.length > 0
    ? calculatePillarStatus(conceptStatuses)
    : { status: 'unknown' as const, score: 0 };
  
  return {
    pillar,
    concepts: conceptsWithProgress,
    status,
    score
  };
}

/**
 * Get overview of all 6 pillars for a user
 */
export async function getUserPillarOverview(
  userId: string,
  kvGet: (key: string) => Promise<any>,
  kvGetByPrefix: (prefix: string) => Promise<any[]>
): Promise<Array<{
  pillar: Pillar;
  status: 'red' | 'orange' | 'green' | 'unknown';
  score: number;
}>> {
  
  const pillars = getAllPillars();
  
  return await Promise.all(
    pillars.map(async (pillar) => {
      const progress = await getUserPillarProgress(userId, pillar.id, kvGet, kvGetByPrefix);
      return {
        pillar,
        status: progress.status,
        score: progress.score
      };
    })
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Seeding
  seedTaxonomy,
  
  // Querying
  getPillar,
  getAllPillars,
  getConcept,
  getConceptsForPillarFromKV,
  getTheme,
  getThemesForConceptFromKV,
  getBlock,
  getBlocksForThemeFromKV,
  getPillarHierarchy,
  
  // User Progress
  getUserBlockProgress,
  setUserBlockProgress,
  getUserThemeProgress,
  getUserConceptProgress,
  getUserPillarProgress,
  getUserPillarOverview
};
