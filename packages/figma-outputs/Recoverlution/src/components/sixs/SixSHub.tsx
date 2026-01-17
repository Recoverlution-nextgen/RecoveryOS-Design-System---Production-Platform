// 6 S's HUB - Main navigation for the complete sound bites system
// STATION, SOUNDTRACKS, STORY, STICKYNOTES, SHELF, SEARCH

import { useState } from 'react';
import { Calendar, Sparkles, BookOpen, StickyNote, Heart, Search, X } from 'lucide-react';
import { StationDashboard } from './StationDashboard';
import { SoundtracksBrowser } from './SoundtracksBrowser';
import { StoryJournal } from './StoryJournal';
import { StickyNotes } from './StickyNotes';
import { ShelfBrowser } from './ShelfBrowser';
import { SearchInterface } from './SearchInterface';

type SixSView = 'station' | 'soundtracks' | 'story' | 'stickynotes' | 'shelf' | 'search' | null;

interface SixSHubProps {
  patientId: string;
  onClose?: () => void;
}

const SIX_S_OPTIONS = [
  {
    id: 'station' as const,
    name: 'STATION',
    description: 'Daily practice dashboard',
    icon: Calendar,
    color: '#5739FB',
  },
  {
    id: 'soundtracks' as const,
    name: 'SOUNDTRACKS',
    description: 'Curated playlists',
    icon: Sparkles,
    color: '#7C67FF',
  },
  {
    id: 'story' as const,
    name: 'STORY',
    description: 'Your personal journal',
    icon: BookOpen,
    color: '#9D8FFF',
  },
  {
    id: 'stickynotes' as const,
    name: 'STICKYNOTES',
    description: 'Quick captures',
    icon: StickyNote,
    color: '#3E2BB8',
  },
  {
    id: 'shelf' as const,
    name: 'SHELF',
    description: 'Saved favorites',
    icon: Heart,
    color: '#C49DC4',
  },
  {
    id: 'search' as const,
    name: 'SEARCH',
    description: 'Find anything',
    icon: Search,
    color: '#A8C4E1',
  },
];

export function SixSHub({ patientId, onClose }: SixSHubProps) {
  const [currentView, setCurrentView] = useState<SixSView>(null);

  // If a specific view is open, render that component
  if (currentView) {
    return (
      <div className="relative min-h-screen">
        {/* Back Navigation */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setCurrentView(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[--border] hover:border-primary/30 transition-all"
          >
            <X className="w-5 h-5" />
            <span>Back to Hub</span>
          </button>
        </div>

        {/* Render the selected component */}
        {currentView === 'station' && (
          <StationDashboard
            patientId={patientId}
            onStartPractice={(type) => console.log('Start practice:', type)}
            onOpenSoundbite={() => setCurrentView('soundtracks')}
          />
        )}
        {currentView === 'soundtracks' && <SoundtracksBrowser />}
        {currentView === 'story' && <StoryJournal />}
        {currentView === 'stickynotes' && <StickyNotes />}
        {currentView === 'shelf' && <ShelfBrowser />}
        {currentView === 'search' && <SearchInterface />}
      </div>
    );
  }

  // Main hub navigation
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="headline-display text-primary mb-4">
          The 6 S's
        </h1>
        <p className="copy-primary max-w-2xl mx-auto">
          Your complete toolkit for recovery. Access your daily practices, curated soundbites, personal journal, quick notes, favorites, and powerful search.
        </p>
      </div>

      {/* 6 S's Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SIX_S_OPTIONS.map((option) => {
          const Icon = option.icon;
          
          return (
            <button
              key={option.id}
              onClick={() => setCurrentView(option.id)}
              className="p-8 border-2 border-[--border] bg-white hover:border-primary/30 transition-all group text-left"
              style={{ borderLeft: `6px solid ${option.color}` }}
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${option.color}15` }}
              >
                <Icon className="w-8 h-8" style={{ color: option.color }} />
              </div>

              {/* Content */}
              <h2 className="headline-card mb-2 group-hover:text-primary transition-colors">
                {option.name}
              </h2>
              <p className="copy-secondary text-sm">
                {option.description}
              </p>

              {/* Arrow indicator */}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                <span>Explore</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Access Footer */}
      <div className="max-w-6xl mx-auto mt-12 p-6 border border-[--border] bg-white">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="headline-card mb-2">Start Today</h3>
            <p className="copy-secondary text-sm mb-3">
              Begin with STATION for your daily check-in and practices
            </p>
            <button
              onClick={() => setCurrentView('station')}
              className="text-sm text-primary hover:underline"
            >
              Go to STATION →
            </button>
          </div>

          <div>
            <h3 className="headline-card mb-2">Browse Library</h3>
            <p className="copy-secondary text-sm mb-3">
              Explore 450 soundbites organized in SOUNDTRACKS
            </p>
            <button
              onClick={() => setCurrentView('soundtracks')}
              className="text-sm text-primary hover:underline"
            >
              Browse SOUNDTRACKS →
            </button>
          </div>

          <div>
            <h3 className="headline-card mb-2">Find Quickly</h3>
            <p className="copy-secondary text-sm mb-3">
              Use SEARCH to find exactly what you need
            </p>
            <button
              onClick={() => setCurrentView('search')}
              className="text-sm text-primary hover:underline"
            >
              Open SEARCH →
            </button>
          </div>
        </div>
      </div>

      {/* Close button (if in modal context) */}
      {onClose && (
        <div className="max-w-6xl mx-auto mt-8 text-center">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-[--border] hover:border-primary/30 transition-all"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
