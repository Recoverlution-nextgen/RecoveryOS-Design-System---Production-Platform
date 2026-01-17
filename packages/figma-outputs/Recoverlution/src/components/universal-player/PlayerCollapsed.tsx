/**
 * PLAYER COLLAPSED STATE
 * Floating bar at bottom (like Spotify mini player)
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, ChevronUp } from 'lucide-react';
import { NaviCue, PlayerProgress } from '../../lib/navicues/types';

interface PlayerCollapsedProps {
  navicue: NaviCue;
  progress: PlayerProgress;
  onExpand: () => void;
  onClose: () => void;
}

export function PlayerCollapsed({ navicue, progress, onExpand, onClose }: PlayerCollapsedProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
    >
      {/* Main bar */}
      <div 
        className="bg-black/95 backdrop-blur-xl border-t border-white/10"
        onClick={onExpand}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Pillar indicator */}
          <div 
            className="w-1 h-12 flex-shrink-0"
            style={{ backgroundColor: navicue.pillar_color }}
          />

          {/* Content */}
          <div className="flex-1 min-w-0 cursor-pointer">
            <p className="text-white text-sm truncate mb-1">
              {navicue.text_line}
            </p>
            <p 
              className="text-xs uppercase tracking-wide truncate"
              style={{ color: navicue.pillar_color }}
            >
              {navicue.pillar_name}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Stats */}
            <div className="text-xs text-white/60 hidden sm:block">
              {progress.totalCompleted} completed
            </div>

            {/* Expand button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              className="text-white/60 hover:text-white p-2 transition-colors"
              aria-label="Expand player"
            >
              <ChevronUp className="w-5 h-5" />
            </button>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-white/60 hover:text-white p-2 transition-colors"
              aria-label="Close player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10">
          <motion.div
            className="h-full bg-[#5739FB]"
            initial={{ width: 0 }}
            animate={{ width: `${(progress.totalCompleted / progress.totalServed) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
