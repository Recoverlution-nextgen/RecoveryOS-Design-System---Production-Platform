/**
 * TRACK ITEM
 * Apple Music style track display with 3-dot menu
 */

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Play, Heart, Plus, Share2, Trash2 } from 'lucide-react';
import { LibraryTrack, getPillarInfo } from '../../utils/supabase/soundbites';

interface TrackItemProps {
  track: LibraryTrack;
  isPlaying?: boolean;
  onPlay: () => void;
  formatDuration?: (seconds: number) => string;
  showDivider?: boolean;
}

export function TrackItem({ 
  track, 
  isPlaying = false, 
  onPlay, 
  formatDuration,
  showDivider = true 
}: TrackItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spark': return '#7C67FF'; // Light purple - quick energy
      case 'flame': return '#5739FB'; // Brand purple - core transformation
      case 'ember': return '#3E2BB8'; // Deep purple - sustained depth
      default: return '#5739FB';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'spark': return 'Spark';
      case 'flame': return 'Flame';
      case 'ember': return 'Ember';
      default: return '';
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    setMenuOpen(false);
  };

  const handleAddTo = () => {
    // TODO: Implement add to playlist
    setMenuOpen(false);
  };

  const handleShare = () => {
    // TODO: Implement share
    setMenuOpen(false);
  };

  const handleRemove = () => {
    // TODO: Implement remove
    setMenuOpen(false);
  };

  return (
    <div className="group">
      <div 
        className="flex items-center gap-4 py-2 px-3 hover:bg-white/5 transition-all cursor-pointer relative"
        onClick={onPlay}
      >
        {/* Play indicator or icon */}
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <div className="w-1 h-4 bg-[#5739FB] animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-6 bg-[#5739FB] animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-3 bg-[#5739FB] animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          ) : (
            <div 
              className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-0 transition-opacity"
              style={{ backgroundColor: getTypeColor(track.type) }}
            ></div>
          )}
          <Play 
            className="w-4 h-4 text-white absolute opacity-0 group-hover:opacity-100 transition-opacity" 
            fill="white"
          />
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm truncate">
            {track.title}
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs mt-0.5">
            <span 
              className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider"
              style={{ 
                backgroundColor: `${getTypeColor(track.type)}20`,
                color: getTypeColor(track.type)
              }}
            >
              {getTypeLabel(track.type)}
            </span>
            {track.pillarId && (
              <span 
                className="px-1.5 py-0.5 text-[10px] tracking-wide"
                style={{ 
                  backgroundColor: `${getTypeColor(track.type)}15`,
                  color: `${getTypeColor(track.type)}CC`
                }}
              >
                {getPillarInfo(track.pillarId).shortName}
              </span>
            )}
          </div>
        </div>

        {/* Favorite indicator */}
        {isFavorited && (
          <Heart className="w-4 h-4 text-[#5739FB] flex-shrink-0" fill="#5739FB" />
        )}

        {/* 3-dot menu */}
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
            style={{ borderRadius: '4px' }}
          >
            <MoreHorizontal className="w-4 h-4 text-white/70" />
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div 
              className="absolute right-0 top-full mt-1 w-48 luma-glass border border-white/10 py-1 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleToggleFavorite}
                className="w-full px-4 py-2 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#5739FB] text-[#5739FB]' : 'text-white/70'}`} />
                {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>

              <button
                onClick={handleAddTo}
                className="w-full px-4 py-2 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Plus className="w-4 h-4 text-white/70" />
                Add to Soundtrack
              </button>

              <button
                onClick={handleShare}
                className="w-full px-4 py-2 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Share2 className="w-4 h-4 text-white/70" />
                Share
              </button>

              <div className="h-px bg-white/10 my-1"></div>

              <button
                onClick={handleRemove}
                className="w-full px-4 py-2 text-left text-red-400 text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      {showDivider && (
        <div className="h-px bg-white/5 ml-14"></div>
      )}
    </div>
  );
}