/**
 * NAVICUE DATA ABSTRACTION LAYER
 * 
 * Schema-ready abstraction that switches between local data and Supabase
 * 
 * PHASE 1: Local data (1000 transformed NaviCues)
 * PHASE 2: Supabase (navicues_canonical table)
 * PHASE 3: LUMA-orchestrated (AI recommendations)
 */

import { NaviCue, FetchNaviCuesParams, LumaContext, LumaRecommendation, PILLARS } from './types';
import { applyFilters, shuffleNaviCues } from './filters';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import NAVICUE_1000_COMPLETE from './NAVICUE_1000_COMPLETE';

// ============================================================================
// LOCAL DATA SOURCES
// ============================================================================

// Use the transformed 1000 NaviCues
function getAllLocalNaviCues(): NaviCue[] {
  return NAVICUE_1000_COMPLETE;
}

// ============================================================================
// PHASE 1: LOCAL DATA FETCHING
// ============================================================================

async function fetchNaviCuesLocal(params: FetchNaviCuesParams): Promise<NaviCue[]> {
  // Get all local NaviCues
  let navicues = getAllLocalNaviCues();

  // Apply filters
  if (params.filters) {
    navicues = applyFilters(navicues, params.filters);
  }

  // Exclude IDs
  if (params.excludeIds && params.excludeIds.length > 0) {
    navicues = navicues.filter(nc => !params.excludeIds!.includes(nc.id));
  }

  // Shuffle if requested
  if (params.shuffle !== false) {
    navicues = shuffleNaviCues(navicues);
  }

  // Limit count
  if (params.count) {
    navicues = navicues.slice(0, params.count);
  }

  return navicues;
}

// ============================================================================
// PHASE 2: DATABASE FETCHING (Future)
// ============================================================================

async function fetchNaviCuesDatabase(params: FetchNaviCuesParams): Promise<NaviCue[]> {
  // TODO: Implement when database is ready
  
  // Example structure:
  // const { data, error } = await supabase
  //   .from('navicues_canonical')
  //   .select('*')
  //   .match(buildDatabaseFilters(params.filters))
  //   .limit(params.count || 10);
  
  // if (error) throw error;
  // return transformDatabaseNaviCues(data);
  
  return [];
}

// ============================================================================
// PHASE 3: LUMA-ORCHESTRATED FETCHING (Future)
// ============================================================================

async function fetchNaviCuesLuma(params: FetchNaviCuesParams): Promise<LumaRecommendation> {
  if (!params.lumaContext || !params.userId) {
    throw new Error('LUMA fetching requires lumaContext and userId');
  }

  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/luma/recommend-navicues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: params.userId,
          context: params.lumaContext,
          filters: params.filters,
          count: params.count || 10,
          excludeIds: params.excludeIds || []
        })
      }
    );

    if (!response.ok) {
      throw new Error(`LUMA recommendation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as LumaRecommendation;
  } catch (error) {
    console.error('LUMA recommendation error:', error);
    // Fallback to local data
    const navicues = await fetchNaviCuesLocal(params);
    return {
      navicues,
      reasoning: 'Fallback to local data due to LUMA error',
      adjustments: []
    };
  }
}

// ============================================================================
// PUBLIC API
// ============================================================================

export async function fetchNaviCues(params: FetchNaviCuesParams = {}): Promise<NaviCue[]> {
  // PHASE 1: Always use local data for now
  return fetchNaviCuesLocal(params);
  
  // PHASE 2: Switch to database when ready
  // if (USE_DATABASE) {
  //   return fetchNaviCuesDatabase(params);
  // }
  
  // PHASE 3: Use LUMA when available and requested
  // if (params.lumaContext && params.userId) {
  //   const recommendation = await fetchNaviCuesLuma(params);
  //   return recommendation.navicues;
  // }
}

export async function fetchNaviCuesWithLuma(params: FetchNaviCuesParams): Promise<LumaRecommendation> {
  // PHASE 3: LUMA-orchestrated
  // return fetchNaviCuesLuma(params);
  
  // PHASE 1: Fallback to local with mock recommendation
  const navicues = await fetchNaviCuesLocal(params);
  return {
    navicues,
    reasoning: 'Mock recommendation (LUMA not yet integrated)',
    adjustments: []
  };
}

export async function fetchSingleNaviCue(id: string): Promise<NaviCue | null> {
  const navicues = await fetchNaviCues({ 
    filters: { excludeIds: [] },
    shuffle: false 
  });
  return navicues.find(nc => nc.id === id) || null;
}

export async function fetchRandomNaviCueBatch(size: number = 10): Promise<NaviCue[]> {
  return fetchNaviCues({
    count: size,
    shuffle: true
  });
}

export async function fetchNaviCuesByPillar(pillarId: string, count?: number): Promise<NaviCue[]> {
  return fetchNaviCues({
    filters: { pillar: pillarId as any },
    count,
    shuffle: true
  });
}

export async function fetchNaviCuesByResponseType(responseType: string, count?: number): Promise<NaviCue[]> {
  return fetchNaviCues({
    filters: { responseTypes: [responseType as any] },
    count,
    shuffle: true
  });
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getPillarName(pillarId: string): string {
  return PILLARS[pillarId as keyof typeof PILLARS]?.name || 'Unknown';
}

export function getPillarColor(pillarId: string): string {
  return PILLARS[pillarId as keyof typeof PILLARS]?.color || '#666666';
}

export function getPillarDescription(pillarId: string): string {
  return PILLARS[pillarId as keyof typeof PILLARS]?.description || '';
}

// ============================================================================
// STATISTICS
// ============================================================================

export async function getNaviCueStats() {
  const navicues = await fetchNaviCues({ shuffle: false });
  
  const stats = {
    total: navicues.length,
    byPillar: {} as Record<string, number>,
    byResponseType: {} as Record<string, number>,
    byModality: {} as Record<string, number>,
    byDifficulty: {} as Record<number, number>,
    averageDuration: 0
  };

  navicues.forEach(nc => {
    // By pillar
    stats.byPillar[nc.pillar_id] = (stats.byPillar[nc.pillar_id] || 0) + 1;
    
    // By response type
    stats.byResponseType[nc.response_type] = (stats.byResponseType[nc.response_type] || 0) + 1;
    
    // By modality
    stats.byModality[nc.modality] = (stats.byModality[nc.modality] || 0) + 1;
    
    // By difficulty
    if (nc.difficulty) {
      stats.byDifficulty[nc.difficulty] = (stats.byDifficulty[nc.difficulty] || 0) + 1;
    }
  });

  // Calculate average duration
  const withDuration = navicues.filter(nc => nc.duration_minutes);
  if (withDuration.length > 0) {
    stats.averageDuration = withDuration.reduce((sum, nc) => sum + (nc.duration_minutes || 0), 0) / withDuration.length;
  }

  return stats;
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export {
  getAllLocalNaviCues,
  fetchNaviCuesLocal,
  fetchNaviCuesDatabase,
  fetchNaviCuesLuma
};