/**
 * COLLAPSED PLAYER
 * Always visible at bottom with full controls
 * infiniteK: no rounded corners
 */

import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useLumaPlayer } from '../../contexts/LumaPlayerContext';

interface PlayerCollapsedProps {
  onExpand: () => void;
}

export function PlayerCollapsed({ onExpand }: PlayerCollapsedProps) {
  const { currentTrack, isPlaying, progress, duration, play, pause, next, previous } = useLumaPlayer();

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  // Empty state (nothing ever played)
  if (!currentTrack) {
    return (
      <div 
        className="luma-glass-dark cursor-pointer"
        style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
        onClick={onExpand}
      >
        {/* Progress bar placeholder */}
        <div className="h-1 bg-white/10" />

        {/* Content */}
        <div className="px-4 py-3 flex items-center gap-3">
          {/* Artwork placeholder */}
          <div 
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
            }}
          >
            <Play className="w-5 h-5 text-white/50" />
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm">Nothing playing</div>
            <div className="text-white/50 text-xs">Tap to browse</div>
          </div>

          {/* Controls - disabled state */}
          <div className="flex items-center gap-2">
            <button
              disabled
              className="w-10 h-10 flex items-center justify-center transition-all opacity-30 cursor-not-allowed"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>

            <button
              disabled
              className="w-10 h-10 flex items-center justify-center transition-all opacity-30 cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
              }}
            >
              <Play className="w-5 h-5 text-white" />
            </button>

            <button
              disabled
              className="w-10 h-10 flex items-center justify-center transition-all opacity-30 cursor-not-allowed"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="luma-glass-dark cursor-pointer"
      style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
      }}
      onClick={onExpand}
    >
      {/* Progress bar */}
      <div className="h-1 bg-white/10 relative overflow-hidden">
        <div 
          className="h-full transition-all duration-300"
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #3E2BB8, #5739FB)',
          }}
        />
      </div>

      {/* Content */}
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Artwork */}
        <div 
          className="w-12 h-12 flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
          }}
        >
          <div className="text-white text-xs uppercase tracking-wider">
            {currentTrack.type === 'spark' ? 'S' : currentTrack.type === 'flame' ? 'F' : 'E'}
          </div>
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm truncate">{currentTrack.title}</div>
          <div className="text-white/50 text-xs truncate">
            {currentTrack.type.toUpperCase()} · {currentTrack.code}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              previous();
            }}
            className="w-10 h-10 flex items-center justify-center transition-all hover:bg-white/10"
          >
            <SkipBack className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              isPlaying ? pause() : play();
            }}
            className="w-10 h-10 flex items-center justify-center transition-all hover:scale-105 flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
              boxShadow: '0 0 15px rgba(87, 57, 251, 0.3)',
            }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="w-10 h-10 flex items-center justify-center transition-all hover:bg-white/10"
          >
            <SkipForward className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}