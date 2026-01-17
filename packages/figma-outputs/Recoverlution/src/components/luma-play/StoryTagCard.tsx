/**
 * STORY TAG CARD
 * Card for browsing Story voice note categories
 * Premium glass design with category branding
 */

import React from 'react';
import { Book, Target, Archive, Lightbulb, Heart, Cloud } from 'lucide-react';

interface StoryTag {
  id: string;
  name: string;
  count: number;
  latestDate?: string;
}

interface StoryTagCardProps {
  tag: StoryTag;
  onOpen: () => void;
}

export function StoryTagCard({ tag, onOpen }: StoryTagCardProps) {
  
  const getTagIcon = (id: string) => {
    switch (id) {
      case 'story':
        return <Book className="w-7 h-7 text-white/90" />;
      case 'vision':
        return <Target className="w-7 h-7 text-white/90" />;
      case 'baggage':
        return <Archive className="w-7 h-7 text-white/90" />;
      case 'insights':
        return <Lightbulb className="w-7 h-7 text-white/90" />;
      case 'heart':
        return <Heart className="w-7 h-7 text-white/90" />;
      case 'space':
        return <Cloud className="w-7 h-7 text-white/90" />;
      default:
        return <Book className="w-7 h-7 text-white/90" />;
    }
  };

  const getTagGradient = (id: string) => {
    switch (id) {
      case 'story':
        return 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(109, 40, 217, 0.2))'; // Purple
      case 'vision':
        return 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.2))'; // Blue
      case 'baggage':
        return 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))'; // Green
      case 'insights':
        return 'linear-gradient(135deg, rgba(243, 156, 18, 0.3), rgba(245, 124, 0, 0.2))'; // Orange
      case 'heart':
        return 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(219, 39, 119, 0.2))'; // Pink
      case 'space':
        return 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(79, 70, 229, 0.2))'; // Indigo
      default:
        return 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
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
          style={{ background: getTagGradient(tag.id) }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="text-white/80">{getTagIcon(tag.id)}</div>
            
            {/* Count badge */}
            <div className="px-2 py-1 bg-white/10 border border-white/20">
              <span className="text-white/90 text-xs">{tag.count}</span>
            </div>
          </div>

          <div className="text-white mb-1">{tag.name}</div>
          
          {tag.latestDate && (
            <div className="text-white/40 text-xs">
              Latest: {tag.latestDate}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}