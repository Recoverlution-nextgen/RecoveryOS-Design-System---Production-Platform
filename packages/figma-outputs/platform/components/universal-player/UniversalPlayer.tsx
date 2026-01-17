/**
 * UNIVERSAL PLAYER
 * Next-generation polymorphic NaviCue player
 * 
 * Features:
 * - Mobile-first (responsive to desktop)
 * - LUMA-ready (AI orchestration)
 * - Infinite scroll (auto-loads more)
 * - 21 response types
 * - 5 modalities
 * - Multiple modes (filtered, luma, journey, single)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { NaviCue, PlayerMode, FetchNaviCuesParams, LumaContext } from '../../lib/navicues/types';
import { usePlayerQueue } from './hooks/usePlayerQueue';
import { usePlayerProgress } from './hooks/usePlayerProgress';
import { useLumaRecommend } from './hooks/useLumaRecommend';
import { PlayerHeader } from './PlayerHeader';
import { NaviCueRenderer } from './NaviCueRenderer';
import { ResponseInterface } from './ResponseInterface';
import { WisdomOverlay } from './WisdomOverlay';
import { PlayerCollapsed } from './PlayerCollapsed';

// ============================================================================
// TYPES
// ============================================================================

interface UniversalPlayerProps {
  // Mode configuration
  mode: PlayerMode;
  
  // Initial data
  initialNaviCues?: NaviCue[];
  initialNaviCueId?: string;
  
  // Filters (for filtered mode)
  filters?: FetchNaviCuesParams['filters'];
  
  // LUMA context (for luma mode)
  userId?: string;
  lumaContext?: LumaContext;
  
  // Journey data (for journey mode)
  journeyId?: string;
  sceneId?: string;
  
  // Callbacks
  onClose: () => void;
  onComplete?: () => void;
  onNaviCueComplete?: (navicue: NaviCue, response: any) => void;
  
  // UI configuration
  showProgress?: boolean;
  allowCollapse?: boolean;
  embedded?: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function UniversalPlayer({
  mode,
  initialNaviCues = [],
  initialNaviCueId,
  filters,
  userId,
  lumaContext,
  journeyId,
  sceneId,
  onClose,
  onComplete,
  onNaviCueComplete,
  showProgress = true,
  allowCollapse = true,
  embedded = false
}: UniversalPlayerProps) {
  // =========================================================================
  // STATE
  // =========================================================================
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showWisdom, setShowWisdom] = useState(false);
  const [wisdomMessage, setWisdomMessage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  // =========================================================================
  // HOOKS
  // =========================================================================
  
  // Queue management
  const queue = usePlayerQueue({
    mode,
    initialNaviCues,
    fetchParams: { filters, userId },
    lumaContext,
    batchSize: 10,
    lowThreshold: 3
  });

  // Progress tracking
  const progress = usePlayerProgress();

  // LUMA recommendations (if applicable)
  const luma = mode === 'luma' && userId 
    ? useLumaRecommend({ userId, initialContext: lumaContext })
    : null;

  // =========================================================================
  // EFFECTS
  // =========================================================================

  // Track when new NaviCue is served
  useEffect(() => {
    if (queue.currentNaviCue) {
      progress.recordServed(queue.currentNaviCue);
      
      // Update background
      if (queue.currentNaviCue.background_asset) {
        setBackgroundImage(queue.currentNaviCue.background_asset);
      }
    }
  }, [queue.currentNaviCue?.id]);

  // Complete session when queue is exhausted
  useEffect(() => {
    if (!queue.hasMore && queue.currentIndex >= queue.totalInQueue - 1 && queue.totalInQueue > 0) {
      console.log('Session complete!');
      onComplete?.();
    }
  }, [queue.hasMore, queue.currentIndex, queue.totalInQueue]);

  // =========================================================================
  // HANDLERS
  // =========================================================================

  const handleResponse = useCallback(async (response: any) => {
    if (!queue.currentNaviCue) return;

    const navicue = queue.currentNaviCue;

    // Record completion
    progress.recordCompleted(navicue, response);

    // Notify parent
    onNaviCueComplete?.(navicue, response);

    // Update LUMA context
    if (luma) {
      luma.addRecentResponse(navicue, response);
      
      // Check if should show wisdom
      if (luma.shouldShowWisdom(navicue)) {
        const wisdom = await luma.getWisdom(navicue, response);
        if (wisdom) {
          setWisdomMessage(wisdom);
          setShowWisdom(true);
          return; // Don't advance yet, show wisdom first
        }
      }
    }

    // Auto-advance to next NaviCue
    const advanced = queue.next();
    
    if (!advanced && !queue.hasMore) {
      // Session complete
      console.log('✅ Session complete!');
      onComplete?.();
    }
  }, [queue, progress, luma, onNaviCueComplete, onComplete]);

  const handleWisdomClose = useCallback(() => {
    setShowWisdom(false);
    setWisdomMessage(null);
    
    // Advance to next NaviCue
    queue.next();
  }, [queue]);

  const handleCollapse = useCallback(() => {
    if (allowCollapse) {
      setIsCollapsed(true);
    }
  }, [allowCollapse]);

  const handleExpand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  // =========================================================================
  // LOADING & ERROR STATES
  // =========================================================================

  if (queue.isLoading && queue.totalInQueue === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#5739FB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading NaviCues...</p>
        </div>
      </div>
    );
  }

  if (queue.error && queue.totalInQueue === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-8">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-4">Error loading NaviCues</p>
          <p className="text-white/60 text-sm mb-6">{queue.error}</p>
          <button
            onClick={onClose}
            className="bg-[#5739FB] hover:bg-[#3E2BB8] px-6 py-3 text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!queue.currentNaviCue) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-8">
        <div className="text-center max-w-md">
          <p className="text-white/60 mb-6">No NaviCues available</p>
          <button
            onClick={onClose}
            className="bg-[#5739FB] hover:bg-[#3E2BB8] px-6 py-3 text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // COLLAPSED STATE
  // =========================================================================

  if (isCollapsed) {
    return (
      <PlayerCollapsed
        navicue={queue.currentNaviCue}
        progress={progress.progress}
        onExpand={handleExpand}
        onClose={onClose}
      />
    );
  }

  // =========================================================================
  // RENDER PLAYER
  // =========================================================================

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={embedded ? "relative w-full" : "fixed inset-0 z-50"}
      style={embedded ? { minHeight: '600px' } : {}}
    >
      {/* Background layer */}
      <div className={embedded ? "relative w-full h-full bg-black" : "absolute inset-0 bg-black"}>
        {backgroundImage && (
          <motion.img
            key={backgroundImage}
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-40"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <PlayerHeader
          currentIndex={queue.currentIndex}
          totalInQueue={queue.totalInQueue}
          hasMore={queue.hasMore}
          onClose={onClose}
          onBack={queue.currentIndex > 0 ? queue.previous : undefined}
          onCollapse={allowCollapse ? handleCollapse : undefined}
          showProgress={showProgress}
        />

        {/* Main content area */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={queue.currentNaviCue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl"
            >
              <NaviCueRenderer 
                navicue={queue.currentNaviCue}
                onContentComplete={() => {
                  // Auto-advance if no response required
                  if (queue.currentNaviCue.response_type === 'none') {
                    handleResponse({ autoAdvanced: true });
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Response area */}
        <footer className="px-4 pb-6 pt-4">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={queue.currentNaviCue.id + '-response'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <ResponseInterface
                  type={queue.currentNaviCue.response_type}
                  options={queue.currentNaviCue.response_options}
                  onResponse={handleResponse}
                  pillarColor={queue.currentNaviCue.pillar_color}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </footer>

        {/* Loading indicator (when fetching more) */}
        {queue.isLoading && queue.totalInQueue > 0 && (
          <div className="absolute top-20 right-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-2 text-white/70 text-sm flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
              Loading more...
            </div>
          </div>
        )}
      </div>

      {/* Wisdom overlay */}
      <AnimatePresence>
        {showWisdom && wisdomMessage && (
          <WisdomOverlay
            message={wisdomMessage}
            onClose={handleWisdomClose}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
