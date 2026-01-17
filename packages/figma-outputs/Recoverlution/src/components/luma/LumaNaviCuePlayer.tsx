/**
 * LUMA NAVICUE PLAYER - Infinite Mode
 * 
 * No suites, no durations, no limits.
 * Just pull → action → next → repeat.
 * 
 * Like Instagram: You never know how long you'll be here.
 * You just keep going until you collapse the player.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { NaviCueEngine, type NaviCue } from '../navicues/NaviCueEngine';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// ============================================================================
// WARM BACKGROUND POOL - Rotating therapeutic imagery
// ============================================================================
const WARM_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Mountain sunrise
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80', // Forest path
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80', // Misty lake
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80', // Ocean sunset
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80', // Beach calm
  'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=1920&q=80', // Meadow light
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80', // Nature green
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1920&q=80', // Purple sunset
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80', // Nature path
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&q=80', // Mountain landscape
];

// Get random background from pool
function getRandomBackground(): string {
  return WARM_BACKGROUNDS[Math.floor(Math.random() * WARM_BACKGROUNDS.length)];
}

interface LumaNaviCuePlayerProps {
  onClose: () => void;
  initialNaviCues?: NaviCue[]; // Optional starting batch
}

export function LumaNaviCuePlayer({ onClose, initialNaviCues = [] }: LumaNaviCuePlayerProps) {
  const [queue, setQueue] = useState<NaviCue[]>(initialNaviCues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalServed, setTotalServed] = useState(0);

  // Fetch batch of random NaviCues from database
  const fetchNaviCueBatch = async (size: number = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/navicues/batch?size=${size}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch NaviCues: ${response.statusText}`);
      }

      const data = await response.json();
      
      console.log(`✅ Fetched ${data.navicues.length} NaviCues from arsenal`);
      
      // Transform database schema to frontend schema
      const transformedCues: NaviCue[] = data.navicues.map((dbCue: any) => ({
        id: dbCue.id,
        family: 'statement_mirror', // Default - we can map this properly later
        modality: 'text',
        text_line: dbCue.text_line,
        pillar_id: dbCue.pillar_id,
        pillar_name: getPillarName(dbCue.pillar_id),
        pillar_color: getPillarColor(dbCue.pillar_id),
        theme_name: dbCue.theme_name || undefined,
        response_type: dbCue.response_type,
        response_options: dbCue.response_options || {},
        kbe_target: dbCue.kbe_target || 'knowing',
        background_asset: getRandomBackground(), // Random background from pool
        is_curveball: dbCue.is_curveball || false
      }));

      return transformedCues;
    } catch (err) {
      console.error('Error fetching NaviCues:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial batch if not provided
  useEffect(() => {
    if (queue.length === 0) {
      fetchNaviCueBatch(10).then(cues => {
        setQueue(cues);
      });
    }
  }, []);

  // Infinite scroll logic: When queue gets low, fetch more
  useEffect(() => {
    if (queue.length <= 3 && !isLoading) {
      console.log('⚡ Queue running low, fetching more...');
      fetchNaviCueBatch(10).then(cues => {
        setQueue(prev => [...prev, ...cues]);
      });
    }
  }, [queue.length]);

  const handleComplete = () => {
    // Completed one NaviCue, advance to next
    setTotalServed(prev => prev + 1);
    setQueue(prev => prev.slice(1)); // Remove first item
  };

  const handleExit = () => {
    onClose();
  };

  // Show loading state
  if (queue.length === 0 && isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <div className="text-white">Loading NaviCues...</div>
      </div>
    );
  }

  // Show error state
  if (queue.length === 0 && error) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-4 p-8">
        <div className="text-white text-center">
          <p className="mb-2">Could not load NaviCues</p>
          <p className="text-sm opacity-60">{error}</p>
        </div>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-white text-black"
        >
          Close
        </button>
      </div>
    );
  }

  // Show player
  return (
    <div className="fixed inset-0 z-[9999]">
      {queue.length > 0 && (
        <NaviCueEngine
          cues={queue}
          onExit={handleExit}
          onComplete={handleComplete}
        />
      )}
      
      {/* Infinite indicator (bottom-left subtle counter) */}
      {queue.length > 0 && (
        <div className="absolute bottom-4 left-4 text-white/40 text-xs">
          {totalServed} served
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PILLAR MAPPING (until we fetch from database)
// ============================================================================

function getPillarName(pillarId: string): string {
  const pillars: Record<string, string> = {
    'P-01': 'PAUSE + GROUND',
    'P-02': 'MEET YOUR NEEDS',
    'P-03': 'MOVE YOUR BODY',
    'P-04': 'CONNECT',
    'P-05': 'SHOW YOURSELF',
    'P-06': 'KNOW SELF'
  };
  return pillars[pillarId] || 'UNKNOWN';
}

function getPillarColor(pillarId: string): string {
  const colors: Record<string, string> = {
    'P-01': '#3E2BB8',
    'P-02': '#2EC4B6',
    'P-03': '#F4A261',
    'P-04': '#FFB703',
    'P-05': '#E84855',
    'P-06': '#5739FB'
  };
  return colors[pillarId] || '#3E2BB8';
}