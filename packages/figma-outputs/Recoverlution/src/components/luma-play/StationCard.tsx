/**
 * STATION CARD
 * Premium card for preset frequency stations
 */

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Play, Radio, Settings, Star, Trash2, Sunrise, Sparkles, Moon, Zap } from 'lucide-react';
import { StationPreset } from '../../types/lumaPlay';

interface StationCardProps {
  station: StationPreset;
  isPlaying?: boolean;
  onPlay?: () => void;
  onOpen?: () => void;
}

export function StationCard({ station, isPlaying = false, onPlay, onOpen }: StationCardProps) {
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

  const getStationIcon = (id: string) => {
    switch (id) {
      case 'morning-ritual':
        return <Sunrise className="w-6 h-6" />;
      case 'daily-vibration':
        return <Sparkles className="w-6 h-6" />;
      case 'night-reflect':
        return <Moon className="w-6 h-6" />;
      case 'quick-ground':
        return <Zap className="w-6 h-6" />;
      default:
        return <Radio className="w-6 h-6" />;
    }
  };

  const getStationGradient = (id: string) => {
    switch (id) {
      case 'morning-ritual':
        return 'linear-gradient(135deg, rgba(255, 184, 0, 0.2), rgba(255, 107, 53, 0.1))';
      case 'daily-vibration':
        return 'linear-gradient(135deg, rgba(87, 57, 251, 0.2), rgba(157, 78, 221, 0.1))';
      case 'night-reflect':
        return 'linear-gradient(135deg, rgba(62, 43, 184, 0.2), rgba(87, 57, 251, 0.1))';
      case 'quick-ground':
        return 'linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(255, 184, 0, 0.1))';
      default:
        return 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))';
    }
  };

  return (
    <div className="group relative">
      <button
        onClick={onOpen}
        className="w-full luma-glass p-5 text-left transition-all hover:bg-white/10 relative overflow-hidden"
      >
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{ background: getStationGradient(station.id) }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="text-white/80">{getStationIcon(station.id)}</div>
            
            {/* Playing indicator */}
            {isPlaying && (
              <div className="flex items-center gap-1">
                <div className="w-0.5 h-3 bg-[#5739FB] animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-0.5 h-4 bg-[#5739FB] animate-pulse" style={{ animationDelay: '150ms' }}></div>
                <div className="w-0.5 h-3 bg-[#5739FB] animate-pulse" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
          </div>

          <div className="text-white mb-1">{station.name}</div>
          
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span className="capitalize">{station.frequency.mode}</span>
            <span>•</span>
            <span className="capitalize">{station.frequency.tempo} tempo</span>
          </div>
        </div>
      </button>
    </div>
  );
}