/**
 * STATION DETAIL
 * Full view of a station with frequency settings and generated queue
 * Apple Music Radio style - dynamic content generation
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Play, MoreHorizontal, Settings, Star, Trash2, Radio, Sparkles, Repeat, Sunrise, Moon, Zap } from 'lucide-react';
import { StationPreset } from '../../types/lumaPlay';
import { TrackItem } from './TrackItem';

interface StationDetailProps {
  station: StationPreset;
  onBack: () => void;
  onStartStation: () => void;
  formatDuration: (seconds: number) => string;
}

export function StationDetail({ 
  station, 
  onBack, 
  onStartStation,
  formatDuration 
}: StationDetailProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
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

  const getStationIcon = (id: string) => {
    switch (id) {
      case 'morning-ritual':
        return <Sunrise className="w-20 h-20 text-white/90" />;
      case 'daily-vibration':
        return <Sparkles className="w-20 h-20 text-white/90" />;
      case 'night-reflect':
        return <Moon className="w-20 h-20 text-white/90" />;
      case 'quick-ground':
        return <Zap className="w-20 h-20 text-white/90" />;
      default:
        return <Radio className="w-20 h-20 text-white/90" />;
    }
  };

  const getStationGradient = (id: string) => {
    switch (id) {
      case 'morning-ritual':
        return 'linear-gradient(135deg, rgba(255, 184, 0, 0.3), rgba(255, 107, 53, 0.2))';
      case 'daily-vibration':
        return 'linear-gradient(135deg, rgba(87, 57, 251, 0.3), rgba(157, 78, 221, 0.2))';
      case 'night-reflect':
        return 'linear-gradient(135deg, rgba(62, 43, 184, 0.3), rgba(87, 57, 251, 0.2))';
      case 'quick-ground':
        return 'linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 184, 0, 0.2))';
      default:
        return 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
    }
  };

  const getStationDescription = (id: string) => {
    switch (id) {
      case 'morning-ritual':
        return 'Start your day with uplifting energy. A curated flow of sparks and flames designed to awaken possibility.';
      case 'daily-vibration':
        return 'Maintain your frequency throughout the day. A balanced mix that keeps you grounded and moving forward.';
      case 'night-reflect':
        return 'Wind down and process your day. Gentle embers and reflective moments for evening integration.';
      case 'quick-ground':
        return 'Quick reset when you need it most. Powerful sparks to bring you back to center in under 5 minutes.';
      default:
        return 'A personalized station tuned to your therapeutic journey.';
    }
  };

  // Mock generated queue based on station frequency
  const mockQueue = [
    { id: '1', title: 'Morning Breath Work', artist: 'Dr. Sarah Chen', duration: 25, type: 'spark' as const },
    { id: '2', title: 'Setting Intentions', artist: 'YOUR VOICE', duration: 45, type: 'spark' as const },
    { id: '3', title: 'Body Scan: Gentle Awakening', artist: 'James Rodriguez', duration: 90, type: 'flame' as const },
    { id: '4', title: 'Gratitude Practice', artist: 'Maya Johnson', duration: 60, type: 'flame' as const },
  ];

  return (
    <div className="min-h-full">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Stations</span>
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
                  setIsFavorited(!isFavorited);
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Star className={`w-4 h-4 ${isFavorited ? 'fill-[#5739FB] text-[#5739FB]' : 'text-white/70'}`} />
                {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>

              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Settings className="w-4 h-4 text-white/70" />
                Tune Frequency
              </button>

              <div className="h-px bg-white/10 my-1"></div>

              <button
                onClick={() => {
                  console.log('Delete station');
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-red-400 text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Trash2 className="w-4 h-4" />
                Delete Station
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero section - Station branding */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
          {/* Station artwork */}
          <div 
            className="w-48 h-48 relative overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ background: getStationGradient(station.id) }}
          >
            {getStationIcon(station.id)}
            
            {/* Live indicator */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/20 border border-red-500/40 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-500 animate-pulse"></div>
              <span className="text-red-100 text-xs uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
              <Radio className="w-4 h-4" />
              <span>Station</span>
            </div>
            <h1 className="text-white text-4xl mb-3">{station.name}</h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              {getStationDescription(station.id)}
            </p>
          </div>
        </div>

        {/* Start button */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={onStartStation}
            className="px-8 h-14 bg-[#5739FB] hover:bg-[#6849FC] luma-glass flex items-center justify-center transition-all shadow-lg"
          >
            <Play className="w-5 h-5 text-white mr-2 ml-0.5" fill="white" />
            <span className="text-white">Start Station</span>
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-14 h-14 luma-glass hover:bg-white/15 flex items-center justify-center transition-all"
          >
            <Settings className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      {/* Frequency Settings */}
      {showSettings && (
        <div className="luma-glass p-6 mb-8">
          <div className="flex items-center gap-2 text-white mb-4">
            <Sparkles className="w-4 h-4 text-[#5739FB]" />
            <span>Frequency Settings</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Mode</div>
              <div className="luma-glass px-4 py-3 text-white capitalize">{station.frequency.mode}</div>
            </div>
            <div>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Tempo</div>
              <div className="luma-glass px-4 py-3 text-white capitalize">{station.frequency.tempo}</div>
            </div>
            <div>
              <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Source</div>
              <div className="luma-glass px-4 py-3 text-white capitalize">{station.frequency.source}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/40 text-xs">
              These settings determine how LUMA curates content for this station. Adjust them to fine tune your therapeutic frequency.
            </p>
          </div>
        </div>
      )}

      {/* Coming Up Next - Generated queue preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Radio className="w-4 h-4" />
            <span>Coming Up Next</span>
          </div>
          <button className="text-[#5739FB] text-sm hover:text-[#6849FC] transition-all">
            Refresh Queue
          </button>
        </div>

        <div className="luma-glass">
          {mockQueue.map((track, i) => (
            <TrackItem
              key={track.id}
              track={track}
              onPlay={() => console.log('Play track from station')}
              formatDuration={formatDuration}
              showDivider={i < mockQueue.length - 1}
            />
          ))}
        </div>

        <div className="mt-3 px-3">
          <p className="text-white/40 text-xs">
            This queue is dynamically generated based on your frequency settings. Each session will be unique to your current needs.
          </p>
        </div>
      </div>

      {/* Action: Save as Soundtrack */}
      <div className="mt-6">
        <button className="w-full luma-glass p-4 hover:bg-white/10 transition-all text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#5739FB]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#5739FB]" />
              </div>
              <div>
                <div className="text-white text-sm">Save Current Session</div>
                <div className="text-white/50 text-xs">Turn this into a replayable Soundtrack</div>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-white/30 rotate-180" />
          </div>
        </button>
      </div>
    </div>
  );
}