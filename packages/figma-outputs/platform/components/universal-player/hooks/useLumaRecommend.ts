/**
 * USE LUMA RECOMMEND HOOK
 * AI-powered NaviCue recommendations based on user context
 */

import { useState, useCallback } from 'react';
import { NaviCue, LumaContext, LumaRecommendation } from '../../../lib/navicues/types';
import { fetchNaviCuesWithLuma } from '../../../lib/navicues/navicueData';

interface UseLumaRecommendParams {
  userId: string;
  initialContext?: Partial<LumaContext>;
}

export function useLumaRecommend({ userId, initialContext = {} }: UseLumaRecommendParams) {
  const [context, setContext] = useState<LumaContext>({
    userId,
    currentState: 'exploring',
    recentPillars: [],
    recentResponses: [],
    ...initialContext
  });

  const [isRecommending, setIsRecommending] = useState(false);
  const [lastRecommendation, setLastRecommendation] = useState<LumaRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Update context
  const updateContext = useCallback((updates: Partial<LumaContext>) => {
    setContext(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Add to recent responses
  const addRecentResponse = useCallback((navicue: NaviCue, response: any) => {
    setContext(prev => ({
      ...prev,
      recentResponses: [
        { navicue, response, timestamp: new Date().toISOString() },
        ...(prev.recentResponses || []).slice(0, 9) // Keep last 10
      ],
      recentPillars: [
        navicue.pillar_id,
        ...(prev.recentPillars || []).filter(p => p !== navicue.pillar_id).slice(0, 4) // Keep last 5 unique
      ]
    }));
  }, []);

  // Detect user state from responses
  const detectUserState = useCallback((responses: any[]): LumaContext['currentState'] => {
    // Simple heuristic (can be enhanced)
    if (responses.length === 0) return 'exploring';
    
    const recentResponse = responses[0];
    
    // Check for activation signals
    if (recentResponse.response?.intensity > 7) return 'activated';
    if (recentResponse.response?.rating < 3) return 'activated';
    
    // Check for regulation
    if (recentResponse.response?.calm === true) return 'regulated';
    
    // Check for integration
    if (responses.length > 5) return 'integrating';
    
    return 'exploring';
  }, []);

  // Get recommendations
  const recommend = useCallback(async (params: {
    count?: number;
    filters?: any;
    excludeIds?: string[];
  } = {}): Promise<LumaRecommendation> => {
    setIsRecommending(true);
    setError(null);

    try {
      // Detect current state from recent responses
      const detectedState = detectUserState(context.recentResponses || []);
      const updatedContext = { ...context, currentState: detectedState };

      const recommendation = await fetchNaviCuesWithLuma({
        lumaContext: updatedContext,
        userId,
        count: params.count || 10,
        filters: params.filters,
        excludeIds: params.excludeIds
      });

      setLastRecommendation(recommendation);
      return recommendation;
    } catch (err) {
      console.error('LUMA recommendation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // Return empty recommendation on error
      return {
        navicues: [],
        reasoning: `Error: ${errorMessage}`,
        adjustments: []
      };
    } finally {
      setIsRecommending(false);
    }
  }, [context, userId, detectUserState]);

  // Get wisdom response
  const getWisdom = useCallback(async (navicue: NaviCue, response: any): Promise<string | null> => {
    // TODO: Implement LUMA wisdom endpoint
    // For now, return null (no wisdom)
    return null;
  }, []);

  // Check if should show wisdom
  const shouldShowWisdom = useCallback((navicue: NaviCue): boolean => {
    // Show wisdom every 5 NaviCues
    const completedCount = context.recentResponses?.length || 0;
    return completedCount > 0 && completedCount % 5 === 0;
  }, [context.recentResponses]);

  return {
    context,
    isRecommending,
    lastRecommendation,
    error,
    updateContext,
    addRecentResponse,
    recommend,
    getWisdom,
    shouldShowWisdom
  };
}
