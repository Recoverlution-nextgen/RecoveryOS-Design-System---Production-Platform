/**
 * STORY DETAIL
 * Timeline view of voice notes in a specific category
 * Apple Music style - chronological audio diary
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Play, MoreHorizontal, Settings, Star, Trash2, Mic, Calendar, Clock, Share2, Download, Heart, Book, Target, Archive, Lightbulb, Cloud } from 'lucide-react';

interface VoiceNote {
  id: string;
  title: string;
  date: string;
  duration: number;
  transcript?: string;
}

interface StoryTag {
  id: string;
  name: string;
  count: number;
  latestDate?: string;
}

interface StoryDetailProps {
  tag: StoryTag;
  onBack: () => void;
  formatDuration: (seconds: number) => string;
}

export function StoryDetail({ 
  tag, 
  onBack, 
  formatDuration 
}: StoryDetailProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showTranscripts, setShowTranscripts] = useState(false);
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

  const getTagIcon = (id: string) => {
    switch (id) {
      case 'story':
        return <Book className="w-20 h-20 text-white/90" />;
      case 'vision':
        return <Target className="w-20 h-20 text-white/90" />;
      case 'baggage':
        return <Archive className="w-20 h-20 text-white/90" />;
      case 'insights':
        return <Lightbulb className="w-20 h-20 text-white/90" />;
      case 'heart':
        return <Heart className="w-20 h-20 text-white/90" />;
      case 'space':
        return <Cloud className="w-20 h-20 text-white/90" />;
      default:
        return <Mic className="w-20 h-20 text-white/90" />;
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

  const getTagDescription = (id: string) => {
    switch (id) {
      case 'story':
        return 'Decode the narrative. Your journey documented through your own words.';
      case 'vision':
        return 'Anything is possible. Capture your dreams, goals, and the future you are creating.';
      case 'baggage':
        return 'Take the load off. Process what you are carrying and ready to release.';
      case 'insights':
        return 'Map the magic. The patterns, breakthroughs, and discoveries you are making.';
      case 'heart':
        return 'Feelings uncover truth. Honor the emotional landscape of your healing.';
      case 'space':
        return 'Let it go. Thoughts and feelings you are working to release and transcend.';
      default:
        return 'Your voice notes organized by theme.';
    }
  };

  // Mock voice notes for this tag
  const mockVoiceNotes: VoiceNote[] = [
    { 
      id: '1', 
      title: 'Morning reflection on progress', 
      date: 'Dec 19, 2024', 
      duration: 127,
      transcript: 'I noticed something different this morning. The anxiety that usually greets me was quieter...'
    },
    { 
      id: '2', 
      title: 'Therapy session insights', 
      date: 'Dec 17, 2024', 
      duration: 243,
      transcript: 'Today we talked about boundaries and I finally understand what my therapist meant...'
    },
    { 
      id: '3', 
      title: 'Evening thoughts', 
      date: 'Dec 15, 2024', 
      duration: 89,
      transcript: 'Just wanted to capture this feeling before it fades. I feel capable...'
    },
    { 
      id: '4', 
      title: 'Processing the conversation with mom', 
      date: 'Dec 13, 2024', 
      duration: 312,
      transcript: 'That was hard but I did it. I said what I needed to say and held my ground...'
    },
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
          <span className="text-sm">Story</span>
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
                  setShowTranscripts(!showTranscripts);
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Settings className="w-4 h-4 text-white/70" />
                {showTranscripts ? 'Hide Transcripts' : 'Show Transcripts'}
              </button>

              <div className="h-px bg-white/10 my-1"></div>

              <button
                onClick={() => {
                  console.log('Export category');
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Download className="w-4 h-4 text-white/70" />
                Export All
              </button>

              <button
                onClick={() => {
                  console.log('Share category');
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Share2 className="w-4 h-4 text-white/70" />
                Share Category
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero section - Category branding */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
          {/* Category artwork */}
          <div 
            className="w-48 h-48 relative overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ background: getTagGradient(tag.id) }}
          >
            {getTagIcon(tag.id)}
            
            {/* YOUR VOICE badge */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-white/10 border border-white/20">
              <span className="text-white/90 text-xs uppercase tracking-wider">Your Voice</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
              <Mic className="w-4 h-4" />
              <span>Story</span>
            </div>
            <h1 className="text-white text-4xl mb-3">{tag.name}</h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              {getTagDescription(tag.id)}
            </p>
            <div className="mt-3 text-white/40 text-sm">
              {tag.count} voice {tag.count === 1 ? 'note' : 'notes'}
            </div>
          </div>
        </div>

        {/* Play all button */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => console.log('Play all notes')}
            className="px-8 h-14 bg-[#5739FB] hover:bg-[#6849FC] luma-glass flex items-center justify-center transition-all shadow-lg"
          >
            <Play className="w-5 h-5 text-white mr-2 ml-0.5" fill="white" />
            <span className="text-white">Play Timeline</span>
          </button>

          <button
            onClick={() => console.log('Record new')}
            className="w-14 h-14 luma-glass hover:bg-white/15 flex items-center justify-center transition-all"
          >
            <Mic className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      {/* Timeline - Chronological list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Timeline</span>
          </div>
          <div className="text-white/40 text-xs">
            Newest First
          </div>
        </div>

        <div className="space-y-3">
          {mockVoiceNotes.map((note) => (
            <div key={note.id} className="luma-glass hover:bg-white/10 transition-all">
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Play button */}
                  <button
                    onClick={() => console.log('Play note:', note.id)}
                    className="w-12 h-12 bg-white/5 hover:bg-white/10 flex items-center justify-center flex-shrink-0 transition-all"
                  >
                    <Play className="w-5 h-5 text-white/70" fill="rgba(255,255,255,0.7)" />
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-white mb-1">{note.title}</div>
                    <div className="flex items-center gap-3 text-white/40 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {note.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(note.duration)}
                      </span>
                    </div>
                    
                    {/* Transcript preview */}
                    {showTranscripts && note.transcript && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-white/50 text-xs italic leading-relaxed">
                          {note.transcript}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* More menu for individual note */}
                  <button
                    onClick={() => console.log('Note menu')}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-all flex-shrink-0"
                  >
                    <MoreHorizontal className="w-4 h-4 text-white/40" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick record */}
      <div className="mt-6">
        <button 
          onClick={() => console.log('Quick record')}
          className="w-full luma-glass p-4 hover:bg-white/10 transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 flex items-center justify-center">
                <Mic className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-white text-sm">Add to {tag.name}</div>
                <div className="text-white/50 text-xs">Record a new voice note</div>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-white/30 rotate-180" />
          </div>
        </button>
      </div>
    </div>
  );
}