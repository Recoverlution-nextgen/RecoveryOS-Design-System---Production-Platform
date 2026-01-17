/**
 * useNaviCueRecommendation Hook
 * 
 * LUMA's intelligence for selecting the right NaviCue at the right time
 * Based on: State, History, K-B-E progression, Variety
 */

import { useState, useEffect } from 'react';
import type { NaviCue } from '../../navicues/NaviCueEngine';

interface NaviCueRecommendation {
  navicue: NaviCue | null;
  reason: string;
  confidence: number; // 0-1
}

interface UseNaviCueRecommendationOptions {
  userId?: string;
  rehabId?: string;
  currentState?: {
    tempo: number;
    flow: number;
    sync: number;
    avg_state: number;
  };
}

/**
 * Hook that returns recommended NaviCue based on user context
 * 
 * Selection Algorithm:
 * 1. Get user's current state (tempo/flow/sync)
 * 2. Get recent NaviCue history (avoid repetition)
 * 3. Determine K-B-E target needed
 * 4. Match NaviCues from library
 * 5. Score by relevance
 * 6. Return best match with reasoning
 */
export function useNaviCueRecommendation(options: UseNaviCueRecommendationOptions = {}): NaviCueRecommendation {
  const { userId, rehabId, currentState } = options;
  
  const [recommendation, setRecommendation] = useState<NaviCueRecommendation>({
    navicue: null,
    reason: 'Loading...',
    confidence: 0
  });

  useEffect(() => {
    selectNaviCue();
  }, [userId, rehabId, currentState]);

  const selectNaviCue = async () => {
    // TODO: Replace with actual API call when backend is ready
    // For now, use client-side logic with test data
    
    const mockRecommendation = getClientSideRecommendation(currentState);
    setRecommendation(mockRecommendation);
  };

  return recommendation;
}

/**
 * Client-side recommendation logic (temporary until backend is built)
 */
function getClientSideRecommendation(
  currentState?: {
    tempo: number;
    flow: number;
    sync: number;
    avg_state: number;
  }
): NaviCueRecommendation {
  // Import test NaviCues
  // NOTE: In production, this would come from Supabase via backend
  const { TEST_NAVICUES } = require('../../../utils/testNaviCues');
  
  if (!currentState) {
    // No state data - default to awareness (KNOWING)
    const navicue = TEST_NAVICUES.find((n: NaviCue) => 
      n.kbe_target === 'knowing' && n.response_type === 'slider'
    );
    
    return {
      navicue: navicue || TEST_NAVICUES[0],
      reason: 'Let us check in on where you are',
      confidence: 0.8
    };
  }

  const avgState = currentState.avg_state;

  // STATE-BASED SELECTION
  
  // Dysregulated (RED: 0-3.9) - Focus on regulation & safety
  if (avgState < 4) {
    const navicue = TEST_NAVICUES.find((n: NaviCue) => 
      n.pillar_id === 'P-01' && // Safety & Trust
      (n.response_type === 'breath' || n.response_type === 'witness' || n.response_type === 'body_map')
    );
    
    return {
      navicue: navicue || TEST_NAVICUES[0],
      reason: 'Your state is low. Let us find safety first.',
      confidence: 0.95
    };
  }

  // Moderate (AMBER: 4-6.9) - Build awareness & belief
  if (avgState < 7) {
    const navicue = TEST_NAVICUES.find((n: NaviCue) => 
      n.kbe_target === 'believing' &&
      (n.response_type === 'mirror' || n.response_type === 'binary' || n.response_type === 'voice10')
    );
    
    return {
      navicue: navicue || TEST_NAVICUES[1],
      reason: 'You are stable enough to explore deeper.',
      confidence: 0.85
    };
  }

  // Regulated (GREEN: 7-10) - Challenge & grow
  const navicue = TEST_NAVICUES.find((n: NaviCue) => 
    n.kbe_target === 'embodying' &&
    (n.response_type === 'echo' || n.response_type === 'paradox' || n.response_type === 'constellation')
  );
  
  return {
    navicue: navicue || TEST_NAVICUES[2],
    reason: 'You are regulated. Time to deepen the work.',
    confidence: 0.9
  };
}

/**
 * Determine K-B-E target based on user history
 * 
 * Logic:
 * - If < 3 total responses: KNOWING (awareness)
 * - If mostly KNOWING: BELIEVING (challenge beliefs)
 * - If mostly BELIEVING: EMBODYING (practice)
 * - Cycle through layers
 */
function determineKBETarget(recentHistory: any[]): 'knowing' | 'believing' | 'embodying' {
  if (!recentHistory || recentHistory.length < 3) {
    return 'knowing';
  }

  // Count K-B-E distribution
  const kbeCounts = recentHistory.reduce((acc, item) => {
    const target = item.kbe_target || 'knowing';
    acc[target] = (acc[target] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Progress: K → B → E
  if ((kbeCounts.knowing || 0) > (kbeCounts.believing || 0)) {
    return 'believing';
  }
  if ((kbeCounts.believing || 0) > (kbeCounts.embodying || 0)) {
    return 'embodying';
  }
  
  // Cycle back
  return 'knowing';
}

/**
 * Get recently used response types to avoid repetition
 */
function getRecentResponseTypes(recentHistory: any[]): string[] {
  if (!recentHistory) return [];
  return recentHistory.slice(0, 5).map(item => item.response_type);
}

/**
 * Score NaviCue candidates by relevance
 * 
 * Factors:
 * - State match (higher weight)
 * - K-B-E progression (medium weight)
 * - Variety (avoid recent types)
 * - Time of day
 * - Pillar balance
 */
function scoreNaviCue(
  navicue: NaviCue,
  state: any,
  history: any[],
  targetKBE: string
): number {
  let score = 0;

  // K-B-E match (0-30 points)
  if (navicue.kbe_target === targetKBE) {
    score += 30;
  }

  // State appropriateness (0-40 points)
  const avgState = state?.avg_state || 5;
  if (avgState < 4) {
    // Dysregulated - prioritize safety/regulation
    if (navicue.pillar_id === 'P-01' && 
        ['breath', 'witness', 'hold', 'body_map'].includes(navicue.response_type)) {
      score += 40;
    }
  } else if (avgState < 7) {
    // Moderate - awareness & belief work
    if (['knowing', 'believing'].includes(navicue.kbe_target)) {
      score += 30;
    }
  } else {
    // Regulated - challenge
    if (navicue.kbe_target === 'embodying' || 
        ['paradox', 'echo', 'constellation'].includes(navicue.response_type)) {
      score += 35;
    }
  }

  // Variety (0-20 points) - penalize recent types
  const recentTypes = getRecentResponseTypes(history);
  if (!recentTypes.includes(navicue.response_type)) {
    score += 20;
  } else {
    score -= 10;
  }

  // Time of day (0-10 points)
  const hour = new Date().getHours();
  if (hour < 6 || hour > 22) {
    // Late night/early morning - gentle
    if (['witness', 'breath', 'none'].includes(navicue.response_type)) {
      score += 10;
    }
  }

  return score;
}
