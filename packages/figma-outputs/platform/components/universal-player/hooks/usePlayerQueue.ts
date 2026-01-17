/**
 * USE PLAYER QUEUE HOOK
 * Manages infinite scroll queue for Universal Player
 */

import { useState, useEffect, useCallback } from 'react';
import { NaviCue, PlayerMode, FetchNaviCuesParams, LumaContext } from '../../../lib/navicues/types';
import { fetchNaviCues, fetchNaviCuesWithLuma } from '../../../lib/navicues/navicueData';

interface UsePlayerQueueParams {
  mode: PlayerMode;
  initialNaviCues?: NaviCue[];
  fetchParams?: FetchNaviCuesParams;
  lumaContext?: LumaContext;
  batchSize?: number;
  lowThreshold?: number;
}

export function usePlayerQueue({
  mode,
  initialNaviCues = [],
  fetchParams = {},
  lumaContext,
  batchSize = 10,
  lowThreshold = 3
}: UsePlayerQueueParams) {
  const [queue, setQueue] = useState<NaviCue[]>(initialNaviCues);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Current NaviCue
  const currentNaviCue = queue[currentIndex] || null;

  // Fetch next batch
  const fetchNextBatch = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      let newNaviCues: NaviCue[] = [];

      if (mode === 'luma' && lumaContext) {
        // LUMA-orchestrated fetch
        const recommendation = await fetchNaviCuesWithLuma({
          ...fetchParams,
          lumaContext,
          count: batchSize,
          excludeIds: excludedIds
        });
        newNaviCues = recommendation.navicues;
      } else if (mode === 'single') {
        // Single mode doesn't fetch more
        setHasMore(false);
        return;
      } else {
        // Filtered or Journey mode
        newNaviCues = await fetchNaviCues({
          ...fetchParams,
          count: batchSize,
          excludeIds: excludedIds
        });
      }

      if (newNaviCues.length === 0) {
        setHasMore(false);
        console.log('No more NaviCues available');
        return;
      }

      // Add to queue
      setQueue(prev => [...prev, ...newNaviCues]);
      
      // Track excluded IDs
      setExcludedIds(prev => [...prev, ...newNaviCues.map(nc => nc.id)]);

      console.log(`✅ Fetched ${newNaviCues.length} NaviCues (mode: ${mode})`);
    } catch (err) {
      console.error('Error fetching NaviCues:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [mode, fetchParams, lumaContext, batchSize, excludedIds, isLoading, hasMore]);

  // Load initial batch if queue is empty
  useEffect(() => {
    if (queue.length === 0 && mode !== 'single') {
      fetchNextBatch();
    }
  }, []);

  // Auto-fetch when queue runs low
  useEffect(() => {
    const remaining = queue.length - currentIndex;
    if (remaining <= lowThreshold && hasMore && !isLoading && mode !== 'single') {
      console.log(`⚡ Queue running low (${remaining} remaining), fetching more...`);
      fetchNextBatch();
    }
  }, [currentIndex, queue.length, hasMore, isLoading, lowThreshold, fetchNextBatch, mode]);

  // Navigate to next
  const next = useCallback(() => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return true;
    }
    return false;
  }, [currentIndex, queue.length]);

  // Navigate to previous
  const previous = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return true;
    }
    return false;
  }, [currentIndex]);

  // Jump to index
  const jumpTo = useCallback((index: number) => {
    if (index >= 0 && index < queue.length) {
      setCurrentIndex(index);
      return true;
    }
    return false;
  }, [queue.length]);

  // Reset queue
  const reset = useCallback(() => {
    setCurrentIndex(0);
    setQueue(initialNaviCues);
    setExcludedIds([]);
    setHasMore(true);
    setError(null);
  }, [initialNaviCues]);

  // Manually add NaviCues
  const addToQueue = useCallback((navicues: NaviCue[]) => {
    setQueue(prev => [...prev, ...navicues]);
  }, []);

  return {
    // State
    queue,
    currentIndex,
    currentNaviCue,
    isLoading,
    error,
    hasMore,
    
    // Stats
    totalInQueue: queue.length,
    remaining: queue.length - currentIndex - 1,
    progress: queue.length > 0 ? ((currentIndex + 1) / queue.length) * 100 : 0,
    
    // Actions
    next,
    previous,
    jumpTo,
    reset,
    addToQueue,
    fetchNextBatch
  };
}
