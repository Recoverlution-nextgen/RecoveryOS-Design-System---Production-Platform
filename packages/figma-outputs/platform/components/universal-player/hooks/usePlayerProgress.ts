/**
 * USE PLAYER PROGRESS HOOK
 * Tracks user progress through NaviCue session
 */

import { useState, useEffect, useCallback } from 'react';
import { NaviCue, PlayerProgress, PillarId, ResponseType } from '../../../lib/navicues/types';

export function usePlayerProgress() {
  const [progress, setProgress] = useState<PlayerProgress>({
    totalServed: 0,
    totalCompleted: 0,
    byPillar: {
      ER: 0,
      SR: 0,
      SC: 0,
      CR: 0,
      II: 0,
      DM: 0
    },
    byResponseType: {} as Record<ResponseType, number>,
    sessionDuration: 0,
    responses: {}
  });

  const [sessionStartTime] = useState(Date.now());
  const [navicueStartTime, setNavicueStartTime] = useState(Date.now());

  // Update session duration every second
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => ({
        ...prev,
        sessionDuration: Math.floor((Date.now() - sessionStartTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Record that a NaviCue was served
  const recordServed = useCallback((navicue: NaviCue) => {
    setProgress(prev => ({
      ...prev,
      totalServed: prev.totalServed + 1
    }));
    setNavicueStartTime(Date.now());
  }, []);

  // Record that a NaviCue was completed
  const recordCompleted = useCallback((navicue: NaviCue, response: any) => {
    const timeSpent = Math.floor((Date.now() - navicueStartTime) / 1000);

    setProgress(prev => ({
      ...prev,
      totalCompleted: prev.totalCompleted + 1,
      byPillar: {
        ...prev.byPillar,
        [navicue.pillar_id]: (prev.byPillar[navicue.pillar_id] || 0) + 1
      },
      byResponseType: {
        ...prev.byResponseType,
        [navicue.response_type]: (prev.byResponseType[navicue.response_type] || 0) + 1
      },
      responses: {
        ...prev.responses,
        [navicue.id]: {
          response,
          timestamp: new Date().toISOString(),
          timeSpent
        }
      }
    }));
  }, [navicueStartTime]);

  // Get completion rate
  const getCompletionRate = useCallback((): number => {
    if (progress.totalServed === 0) return 0;
    return (progress.totalCompleted / progress.totalServed) * 100;
  }, [progress.totalServed, progress.totalCompleted]);

  // Get average time per NaviCue
  const getAverageTime = useCallback((): number => {
    if (progress.totalCompleted === 0) return 0;
    const totalTime = Object.values(progress.responses).reduce(
      (sum, r: any) => sum + (r.timeSpent || 0), 
      0
    );
    return totalTime / progress.totalCompleted;
  }, [progress.totalCompleted, progress.responses]);

  // Get most active pillar
  const getMostActivePillar = useCallback((): PillarId | null => {
    const pillars = Object.entries(progress.byPillar) as [PillarId, number][];
    if (pillars.length === 0) return null;
    
    const sorted = pillars.sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  }, [progress.byPillar]);

  // Get most used response type
  const getMostUsedResponseType = useCallback((): ResponseType | null => {
    const types = Object.entries(progress.byResponseType) as [ResponseType, number][];
    if (types.length === 0) return null;
    
    const sorted = types.sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  }, [progress.byResponseType]);

  // Format session duration as MM:SS
  const formatDuration = useCallback((seconds?: number): string => {
    const secs = seconds ?? progress.sessionDuration;
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  }, [progress.sessionDuration]);

  // Reset progress
  const reset = useCallback(() => {
    setProgress({
      totalServed: 0,
      totalCompleted: 0,
      byPillar: {
        ER: 0,
        SR: 0,
        SC: 0,
        CR: 0,
        II: 0,
        DM: 0
      },
      byResponseType: {} as Record<ResponseType, number>,
      sessionDuration: 0,
      responses: {}
    });
  }, []);

  return {
    progress,
    recordServed,
    recordCompleted,
    getCompletionRate,
    getAverageTime,
    getMostActivePillar,
    getMostUsedResponseType,
    formatDuration,
    reset
  };
}
