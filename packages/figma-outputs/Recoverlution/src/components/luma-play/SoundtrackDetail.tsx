/**
 * SOUNDTRACK DETAIL
 * Full view of a soundtrack with tracks - Apple Music playlist style
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Play, MoreHorizontal, Edit3, Share2, Trash2, Shuffle, Repeat } from 'lucide-react';
import { Soundtrack } from '../../types/lumaPlay';
import { TrackItem } from './TrackItem';

interface SoundtrackDetailProps {
  soundtrack: Soundtrack;
  onBack: () => void;
  onPlayTrack: (trackId: string) => void;
  formatDuration: (seconds: number) => string;
}

export function SoundtrackDetail({ 
  soundtrack, 
  onBack, 
  onPlayTrack,
  formatDuration 
}: SoundtrackDetailProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shuffleEnabled, setShuffleEnabled] = useState(soundtrack.shuffle);
  const [repeatEnabled, setRepeatEnabled] = useState(soundtrack.repeat);
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

  const getPlaylistGradient = (id: string) => {
    const gradients = [
      'linear-gradient(135deg, rgba(87, 57, 251, 0.4), rgba(157, 78, 221, 0.2))',
      'linear-gradient(135deg, rgba(255, 107, 53, 0.4), rgba(255, 184, 0, 0.2))',
      'linear-gradient(135deg, rgba(157, 78, 221, 0.4), rgba(62, 43, 184, 0.2))',
    ];
    const index = parseInt(id.replace(/\D/g, '') || '0');
    return gradients[index % gradients.length];
  };

  const totalDuration = soundtrack.tracks.reduce((sum, track) => sum + track.duration, 0);
  
  const formatTotalDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins} minutes`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMins} min`;
  };

  // Get track types for visual indicator
  const trackTypes = soundtrack.tracks.slice(0, 4).map(t => t.type);

  const handlePlayAll = () => {
    if (soundtrack.tracks.length > 0) {
      onPlayTrack(soundtrack.tracks[0].id);
    }
  };

  return (
    <div className="min-h-full">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Soundtracks</span>
        </button>

        {/* 3-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center luma-glass hover:bg-white/15 transition-all"
          >
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>

          {menuOpen && (
            <div 
              className="absolute right-0 top-full mt-2 w-52 luma-glass border border-white/10 py-1 z-50"
            >
              <button
                onClick={() => {
                  console.log('Edit soundtrack');
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Edit3 className="w-4 h-4 text-white/70" />
                Edit Soundtrack
              </button>

              <button
                onClick={() => {
                  console.log('Share soundtrack');
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Share2 className="w-4 h-4 text-white/70" />
                Share
              </button>

              <div className="h-px bg-white/10 my-1"></div>

              <button
                onClick={() => {
                  console.log('Delete soundtrack');
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-red-400 text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Trash2 className="w-4 h-4" />
                Delete Soundtrack
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero section - Album art style */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
          {/* Artwork */}
          <div 
            className="w-48 h-48 relative overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ background: getPlaylistGradient(soundtrack.id) }}
          >
            {/* Grid of dots representing tracks */}
            <div className="grid grid-cols-2 gap-2 absolute inset-0 p-8">
              {trackTypes.map((type, i) => (
                <div 
                  key={i}
                  className="rounded"
                  style={{
                    backgroundColor: 
                      type === 'spark' ? 'rgba(255, 184, 0, 0.6)' :
                      type === 'flame' ? 'rgba(255, 107, 53, 0.6)' :
                      'rgba(157, 78, 221, 0.6)'
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="text-white/50 text-sm mb-2">Soundtrack</div>
            <h1 className="text-white text-4xl mb-3">{soundtrack.name}</h1>
            <div className="text-white/50 text-sm">
              {soundtrack.tracks.length} tracks · {formatTotalDuration(totalDuration)}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          {/* Play button */}
          <button
            onClick={handlePlayAll}
            className="w-14 h-14 bg-[#5739FB] hover:bg-[#6849FC] luma-glass flex items-center justify-center transition-all shadow-lg"
          >
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </button>

          {/* Shuffle */}
          <button
            onClick={() => setShuffleEnabled(!shuffleEnabled)}
            className={`w-10 h-10 flex items-center justify-center transition-all luma-glass ${
              shuffleEnabled 
                ? 'bg-[#5739FB]/30 text-white' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          {/* Repeat */}
          <button
            onClick={() => setRepeatEnabled(!repeatEnabled)}
            className={`w-10 h-10 flex items-center justify-center transition-all luma-glass ${
              repeatEnabled 
                ? 'bg-[#5739FB]/30 text-white' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Track list */}
      <div className="luma-glass">
        {soundtrack.tracks.map((track, i) => (
          <TrackItem
            key={track.id}
            track={track}
            onPlay={() => onPlayTrack(track.id)}
            formatDuration={formatDuration}
            showDivider={i < soundtrack.tracks.length - 1}
          />
        ))}
      </div>

      {/* Empty state */}
      {soundtrack.tracks.length === 0 && (
        <div className="luma-glass p-12 text-center">
          <div className="text-white/50 mb-2">No tracks yet</div>
          <div className="text-white/30 text-sm">Add tracks to start building your soundtrack</div>
        </div>
      )}
    </div>
  );
}