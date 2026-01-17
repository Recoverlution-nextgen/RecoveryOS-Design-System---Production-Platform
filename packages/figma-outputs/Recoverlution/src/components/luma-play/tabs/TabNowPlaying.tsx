/**
 * TAB: NOW PLAYING
 * Full playback controls, track info, queue preview
 */

import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, ListPlus } from 'lucide-react';
import { PlayerState, PlayerActions } from '../../../types/lumaPlay';

interface TabNowPlayingProps {
  state: PlayerState;
  actions: PlayerActions;
  formatDuration: (seconds: number) => string;
  getSourceIcon: (source: string | null, trackType?: string) => React.ReactNode;
}

export function TabNowPlaying({
  state,
  actions,
  formatDuration,
  getSourceIcon,
}: TabNowPlayingProps) {
  const { currentTrack, isPlaying, progress, playlist, currentIndex } = state;

  if (!currentTrack) {
    return (
      <div className="flex items-center justify-center h-full px-4">
        <div className="text-center">
          <div className="text-white/50 text-lg mb-2">Nothing playing</div>
          <div className="text-white/30 text-sm">Select something to play from Switch tab</div>
        </div>
      </div>
    );
  }

  const nextTrack = playlist[currentIndex + 1];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-8">
      {/* Large Artwork/Icon */}
      <div 
        className="w-48 h-48 flex items-center justify-center luma-glass mb-8"
        style={{ 
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.2) 0%, rgba(87, 57, 251, 0.2) 100%)',
        }}
      >
        <div className="text-8xl">
          {getSourceIcon(state.source, currentTrack.type)}
        </div>
      </div>

      {/* Track Title */}
      <div className="text-white text-2xl text-center mb-2 max-w-md">
        {currentTrack.title}
      </div>

      {/* Source context */}
      {currentTrack.context && (
        <div className="text-white/50 text-sm mb-6">
          {currentTrack.context}
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-2">
        <div className="h-2 bg-white/10 relative overflow-hidden" style={{ borderRadius: '4px' }}>
          <div 
            className="h-full transition-all duration-1000"
            style={{
              width: `${(progress / currentTrack.duration) * 100}%`,
              background: 'linear-gradient(90deg, #3E2BB8, #5739FB)',
            }}
          />
        </div>
      </div>

      {/* Time */}
      <div className="flex items-center justify-between w-full max-w-md text-white/50 text-sm mb-8">
        <span>{formatDuration(progress)}</span>
        <span>{formatDuration(currentTrack.duration)}</span>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={actions.previous}
          disabled={currentIndex === 0}
          className="w-12 h-12 flex items-center justify-center luma-glass hover:bg-white/15 transition-all disabled:opacity-30"
        >
          <SkipBack className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={isPlaying ? actions.pause : actions.play}
          className="w-16 h-16 flex items-center justify-center transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
            boxShadow: '0 0 20px rgba(87, 57, 251, 0.4)',
            borderRadius: '16px',
          }}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white" />
          )}
        </button>

        <button
          onClick={actions.next}
          className="w-12 h-12 flex items-center justify-center luma-glass hover:bg-white/15 transition-all"
        >
          <SkipForward className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Queue Info */}
      <div className="luma-glass p-4 w-full max-w-md">
        <div className="text-white/70 text-xs mb-2">Queue</div>
        
        {state.source === 'station' && (
          <div className="text-white/50 text-sm">
            Auto-generated · Infinite
          </div>
        )}

        {state.source === 'soundtracks' && (
          <div className="text-white/50 text-sm">
            {playlist.length} tracks · {formatDuration(playlist.reduce((sum, t) => sum + t.duration, 0))}
          </div>
        )}

        {nextTrack && (
          <div className="text-white/50 text-sm mt-2">
            Next: {nextTrack.title}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button className="flex items-center gap-2 px-4 py-2 luma-glass hover:bg-white/15 transition-all text-white text-sm">
          <ListPlus className="w-4 h-4" />
          Add to Soundtrack
        </button>
        <button className="flex items-center gap-2 px-4 py-2 luma-glass hover:bg-white/15 transition-all text-white text-sm">
          <Heart className="w-4 h-4" />
          Favorite
        </button>
      </div>
    </div>
  );
}
