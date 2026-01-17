/**
 * SOUNDTRACK CARD
 * Premium card for user-created playlists
 */

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Play, Music, Edit3, Share2, Trash2, Plus } from 'lucide-react';
import { Soundtrack } from '../../types/lumaPlay';

interface SoundtrackCardProps {
  soundtrack?: Soundtrack;
  isPlaying?: boolean;
  isCreateNew?: boolean;
  onPlay?: () => void;
  onOpen?: () => void;
  onCreate?: () => void;
}

export function SoundtrackCard({ 
  soundtrack, 
  isPlaying = false, 
  isCreateNew = false,
  onPlay,
  onOpen,
  onCreate
}: SoundtrackCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  if (isCreateNew) {
    return (
      <button
        onClick={onCreate}
        className="w-full luma-glass p-5 text-left transition-all hover:bg-white/10 border-2 border-dashed border-white/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex-shrink-0 luma-glass flex items-center justify-center">
            <Plus className="w-7 h-7 text-white/40" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white/70 mb-1">New Soundtrack</div>
            <div className="text-white/40 text-sm">Create a playlist</div>
          </div>
        </div>
      </button>
    );
  }

  if (!soundtrack) return null;

  const getPlaylistGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, rgba(87, 57, 251, 0.3), rgba(157, 78, 221, 0.2))',
      'linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 184, 0, 0.2))',
      'linear-gradient(135deg, rgba(157, 78, 221, 0.3), rgba(62, 43, 184, 0.2))',
    ];
    return gradients[index % gradients.length];
  };

  const totalDuration = soundtrack.tracks.reduce((sum, track) => sum + track.duration, 0);
  const formatTotalDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  };

  // Get first 4 track types for visual indicator
  const trackTypes = soundtrack.tracks.slice(0, 4).map(t => t.type);

  return (
    <div className="group relative">
      <button
        onClick={onOpen}
        className="w-full luma-glass p-5 text-left transition-all hover:bg-white/10 relative overflow-hidden"
      >
        <div className="flex items-center gap-4">
          {/* Album art style box */}
          <div 
            className="w-16 h-16 flex-shrink-0 relative overflow-hidden flex items-center justify-center"
            style={{ background: getPlaylistGradient(parseInt(soundtrack.id.replace(/\D/g, '') || '0')) }}
          >
            {/* Grid of dots representing tracks */}
            <div className="grid grid-cols-2 gap-1 absolute inset-0 p-3">
              {trackTypes.map((type, i) => (
                <div 
                  key={i}
                  style={{
                    backgroundColor: 
                      type === 'spark' ? 'rgba(255, 184, 0, 0.6)' :
                      type === 'flame' ? 'rgba(255, 107, 53, 0.6)' :
                      'rgba(157, 78, 221, 0.6)'
                  }}
                ></div>
              ))}
            </div>
            
            {/* Playing indicator overlay */}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex items-center gap-0.5">
                  <div className="w-1 h-3 bg-white animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-5 bg-white animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-3 bg-white animate-pulse" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="text-white mb-1 truncate">{soundtrack.name}</div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span>{soundtrack.tracks.length} tracks</span>
              <span>•</span>
              <span>{formatTotalDuration(totalDuration)}</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}