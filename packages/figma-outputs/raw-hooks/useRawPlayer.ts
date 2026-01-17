/**
 * RAW PLAYER HOOK - V3 READY
 * Simple state management for content players
 */

import { useState, useCallback } from 'react';

interface UseRawPlayerOptions {
  items: any[];
  onItemComplete?: (itemId: string, response?: any) => void;
  onComplete?: () => void;
}

export function useRawPlayer({ items, onItemComplete, onComplete }: UseRawPlayerOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isPlaying, setIsPlaying] = useState(true);

  const currentItem = items[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === items.length - 1;
  const progress = ((currentIndex + 1) / items.length) * 100;

  const next = useCallback(() => {
    if (!isLast) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete?.();
    }
  }, [currentIndex, isLast, onComplete]);

  const previous = useCallback(() => {
    if (!isFirst) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, isFirst]);

  const completeItem = useCallback((response?: any) => {
    const updatedResponses = { ...responses, [currentItem.id]: response };
    setResponses(updatedResponses);

    onItemComplete?.(currentItem.id, response);
    next();
  }, [currentItem, responses, onItemComplete, next]);

  const goToItem = useCallback((index: number) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
    }
  }, [items.length]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setResponses({});
    setIsPlaying(true);
  }, []);

  return {
    // State
    currentIndex,
    currentItem,
    responses,
    isPlaying,
    progress,

    // Computed
    isFirst,
    isLast,
    totalItems: items.length,

    // Actions
    next,
    previous,
    completeItem,
    goToItem,
    reset,
    setIsPlaying
  };
}