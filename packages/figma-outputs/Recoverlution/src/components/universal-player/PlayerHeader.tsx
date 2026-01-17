/**
 * PLAYER HEADER
 * Minimal top bar for Universal Player (mobile-first)
 */

import React from 'react';
import { X, ChevronLeft, MoreVertical, Minimize2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PlayerHeaderProps {
  currentIndex: number;
  totalInQueue: number;
  hasMore: boolean;
  onClose: () => void;
  onBack?: () => void;
  onCollapse?: () => void;
  showProgress?: boolean;
}

export function PlayerHeader({
  currentIndex,
  totalInQueue,
  hasMore,
  onClose,
  onBack,
  onCollapse,
  showProgress = true
}: PlayerHeaderProps) {
  const progressPercentage = totalInQueue > 0 
    ? ((currentIndex + 1) / totalInQueue) * 100 
    : 0;

  return (
    <header className="px-4 pt-4 pb-4 flex items-center justify-between relative z-50">
      {/* Left: Back or Close */}
      {onBack ? (
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white transition-colors p-2"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors p-2"
          aria-label="Close player"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Center: Progress indicator */}
      {showProgress && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">
            {currentIndex + 1} {hasMore ? '/ ∞' : `/ ${totalInQueue}`}
          </span>
        </div>
      )}

      {/* Right: Collapse or Menu */}
      {onCollapse ? (
        <button
          onClick={onCollapse}
          className="text-white/60 hover:text-white/80 transition-colors p-2"
          aria-label="Collapse player"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      ) : (
        <button
          className="text-white/60 hover:text-white/80 transition-colors p-2 opacity-0 pointer-events-none"
          aria-label="Menu"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      )}

      {/* Progress bar */}
      {showProgress && !hasMore && totalInQueue > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#5739FB]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      )}
    </header>
  );
}
