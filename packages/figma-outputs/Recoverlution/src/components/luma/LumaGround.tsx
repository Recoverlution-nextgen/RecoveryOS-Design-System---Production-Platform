/**
 * LUMA GROUND - Content + Actions Zone
 * 
 * Contains BOTH the asset info and action buttons.
 * Everything you need to know and do, in one place.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Play, Mic, Shuffle, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentPath {
  id: string;
  contentType: 'navicue' | 'practice' | 'state' | 'journey' | 'reflection';
  contentId: string;
  content: {
    title: string;
    description: string;
    backgroundImage: string;
    pillarName: string;
    pillarColor: string;
    duration?: string;
    instructor?: string;
    concept?: string;
  };
  reason: string;
  priority: 1 | 2 | 3;
}

interface LumaGroundProps {
  selectedPath: ContentPath | null;
  onBegin: (path: ContentPath) => void;
  onVent: () => void;
  onShuffle: () => void;
  onRescue: () => void;
  mode: 'navicue' | 'rescue';
  currentIndex: number;
  totalPaths: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function LumaGround({
  selectedPath,
  onBegin,
  onVent,
  onShuffle,
  onRescue,
  mode,
  currentIndex,
  totalPaths,
  onNavigate
}: LumaGroundProps) {
  if (!selectedPath) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="luma-glass-dark w-full"
    >
      {/* Asset Info */}
      <div className="px-6 pt-6 pb-6 luma-divider border-b">
        {/* Pillar + Duration + Nav Controls (top right) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="luma-pillar-dot"
              style={{
                backgroundColor: selectedPath.content.pillarColor
              }}
            />
            <span className="luma-label">
              {selectedPath.content.pillarName}
            </span>
            {selectedPath.content.duration && (
              <>
                <span className="luma-separator">·</span>
                <span className="text-white/50 text-xs">
                  {selectedPath.content.duration}
                </span>
              </>
            )}
          </div>

          {/* Navigation controls - top right */}
          <div className="flex gap-1">
            <button
              onClick={() => onNavigate('prev')}
              disabled={currentIndex === 0}
              className="luma-icon-button-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onShuffle}
              className="luma-icon-button-xs"
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('next')}
              disabled={currentIndex === totalPaths - 1}
              className="luma-icon-button-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="luma-title mb-3">
          {selectedPath.content.title}
        </h2>

        {/* Description */}
        <p className="luma-body-text">
          {selectedPath.content.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="p-6 flex gap-3">
        {/* Primary: Begin */}
        <button
          onClick={() => onBegin(selectedPath)}
          className="flex-1 luma-button flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Begin
        </button>

        {/* Secondary Actions */}
        <button
          onClick={onVent}
          className="luma-icon-button"
          title="Voice note"
        >
          <Mic className="w-5 h-5" />
        </button>

        {mode === 'navicue' && (
          <button
            onClick={() => {
              console.log('🔵 Message button clicked');
              onRescue();
            }}
            className="luma-icon-button"
            title="Message"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}