/**
 * THREAD VIEW - Your journey's collection
 * 
 * Chronological feed of Sound Bites + Anchor Points
 * Filterable by type, pillar, context, mode
 * Features "Listen and Read" mode and compilations
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Filter, Sparkles } from 'lucide-react';

// Mock data types (will connect to backend in Phase 2)
interface SoundBite {
  id: string;
  audio_url: string;
  transcript: string;
  context: 'open' | 'thought' | 'insight' | 'pain' | 'story' | 'question' | 'gratitude';
  duration: number;
  timestamp: string;
  pillar?: string;
  pillar_color?: string;
}

interface AnchorPoint {
  id: string;
  text: string;
  mode: 'inquiry' | 'philosophy' | 'reflection' | 'exploration' | 'challenge';
  timestamp: string;
  pillar?: string;
  pillar_color?: string;
  source_type: 'dialogue' | 'manual';
}

type ThreadItem = 
  | { type: 'soundbite'; data: SoundBite }
  | { type: 'anchorpoint'; data: AnchorPoint };

const CONTEXTS = [
  { value: 'open', label: 'Open', color: '#8B5CF6' },
  { value: 'thought', label: 'Thought', color: '#3B82F6' },
  { value: 'insight', label: 'Insight', color: '#10B981' },
  { value: 'pain', label: 'Pain', color: '#EF4444' },
  { value: 'story', label: 'Story', color: '#F59E0B' },
  { value: 'question', label: 'Question', color: '#6366F1' },
  { value: 'gratitude', label: 'Gratitude', color: '#EC4899' },
];

const MODES = [
  { value: 'inquiry', label: 'Inquiry', color: '#3B82F6' },
  { value: 'philosophy', label: 'Philosophy', color: '#8B5CF6' },
  { value: 'reflection', label: 'Reflection', color: '#10B981' },
  { value: 'exploration', label: 'Exploration', color: '#F59E0B' },
  { value: 'challenge', label: 'Challenge', color: '#EF4444' },
];

export function ThreadView() {
  const [filter, setFilter] = useState<'all' | 'soundbites' | 'anchorpoints'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Mock data - will be fetched from backend in Phase 2
  const mockThread: ThreadItem[] = [
    {
      type: 'soundbite',
      data: {
        id: 'sb1',
        audio_url: 'mock-url-1.webm',
        transcript: 'I noticed today that I was holding my breath during the difficult conversation with my manager. It is like my body was trying to make itself smaller, less present. When I finally breathed, it felt like coming back to myself.',
        context: 'insight',
        duration: 47,
        timestamp: '2025-01-15T14:23:00Z',
        pillar: 'Emotional Regulation',
        pillar_color: '#10B981'
      }
    },
    {
      type: 'anchorpoint',
      data: {
        id: 'ap1',
        text: 'The only way out is through, and through means feeling it all',
        mode: 'philosophy',
        timestamp: '2025-01-15T15:10:00Z',
        pillar: 'Emotional Regulation',
        pillar_color: '#10B981',
        source_type: 'dialogue'
      }
    },
    {
      type: 'soundbite',
      data: {
        id: 'sb2',
        audio_url: 'mock-url-2.webm',
        transcript: 'I am tired. Not just physically. That bone-deep exhaustion that comes from holding it all together. Maybe I do not need to hold it all together today.',
        context: 'pain',
        duration: 32,
        timestamp: '2025-01-14T22:45:00Z',
        pillar: 'Self-Compassion',
        pillar_color: '#8B5CF6'
      }
    },
    {
      type: 'anchorpoint',
      data: {
        id: 'ap2',
        text: 'Rest is not earned. It is a birthright.',
        mode: 'reflection',
        timestamp: '2025-01-14T10:30:00Z',
        pillar: 'Self-Compassion',
        pillar_color: '#8B5CF6',
        source_type: 'manual'
      }
    }
  ];

  const filteredThread = mockThread.filter(item => {
    if (filter === 'soundbites') return item.type === 'soundbite';
    if (filter === 'anchorpoints') return item.type === 'anchorpoint';
    return true;
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // In Phase 2, this will trigger actual audio playback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 
              className="text-white"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '2rem' }}
            >
              Your Thread
            </h1>
            
            <button
              className="px-4 py-2 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white flex items-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(62,43,184,0.3)] transition-all"
              style={{ borderRadius: '0px', fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              <Sparkles className="w-4 h-4" />
              Play Your Thread
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 transition-all ${
                filter === 'all'
                  ? 'bg-white/20 text-white border-b-2 border-[#5739FB]'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
              style={{ 
                borderRadius: '0px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilter('soundbites')}
              className={`px-4 py-2 transition-all ${
                filter === 'soundbites'
                  ? 'bg-white/20 text-white border-b-2 border-[#5739FB]'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
              style={{ 
                borderRadius: '0px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              Sound Bites
            </button>
            <button
              onClick={() => setFilter('anchorpoints')}
              className={`px-4 py-2 transition-all ${
                filter === 'anchorpoints'
                  ? 'bg-white/20 text-white border-b-2 border-[#5739FB]'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
              style={{ 
                borderRadius: '0px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              Anchor Points
            </button>
          </div>
        </div>
      </div>

      {/* Thread items */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {filteredThread.length === 0 ? (
          <div className="text-center py-20">
            <p 
              className="text-white/60 text-lg mb-2"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
            >
              Your Thread is empty
            </p>
            <p className="text-white/40 max-w-md mx-auto">
              Your journey takes shape here. Every Sound Bite and Anchor Point is part of your becoming.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredThread.map((item, index) => (
              <motion.div
                key={item.type === 'soundbite' ? item.data.id : item.data.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.type === 'soundbite' ? (
                  // Sound Bite card
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Context indicator */}
                        <div 
                          className="w-3 h-3"
                          style={{ 
                            backgroundColor: CONTEXTS.find(c => c.value === item.data.context)?.color || '#8B5CF6',
                            borderRadius: '0px'
                          }}
                        />
                        <span 
                          className="text-white/60 text-xs uppercase tracking-wide"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                        >
                          {CONTEXTS.find(c => c.value === item.data.context)?.label || 'Open'}
                        </span>
                        {item.data.pillar && (
                          <>
                            <span className="text-white/30">·</span>
                            <span className="text-white/50 text-xs">
                              {item.data.pillar}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-white/40 text-xs">
                        {formatDate(item.data.timestamp)}
                      </span>
                    </div>

                    {/* Waveform + Play button */}
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => handlePlayPause(item.data.id)}
                        className="w-12 h-12 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(62,43,184,0.3)] transition-all flex-shrink-0"
                        style={{ borderRadius: '0px' }}
                      >
                        {playingId === item.data.id ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>

                      {/* Mock waveform */}
                      <div className="flex-1 flex items-center gap-0.5 h-12">
                        {Array.from({ length: 60 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-white/20"
                            style={{ 
                              height: `${Math.random() * 100}%`,
                              minHeight: '4px',
                              borderRadius: '0px'
                            }}
                          />
                        ))}
                      </div>

                      <span 
                        className="text-white/60 text-sm flex-shrink-0"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {formatDuration(item.data.duration)}
                      </span>
                    </div>

                    {/* Transcript */}
                    <p 
                      className="text-white/80"
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        letterSpacing: '0.01em'
                      }}
                    >
                      {item.data.transcript}
                    </p>
                  </div>
                ) : (
                  // Anchor Point card
                  <div 
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 relative overflow-hidden"
                  >
                    {/* Decorative accent */}
                    <div 
                      className="absolute top-0 left-0 w-1 h-full"
                      style={{ 
                        backgroundColor: item.data.pillar_color || '#8B5CF6'
                      }}
                    />

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-white/60" />
                        <span 
                          className="text-white/60 text-xs uppercase tracking-wide"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                        >
                          {MODES.find(m => m.value === item.data.mode)?.label || 'Anchor Point'}
                        </span>
                        {item.data.pillar && (
                          <>
                            <span className="text-white/30">·</span>
                            <span className="text-white/50 text-xs">
                              {item.data.pillar}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-white/40 text-xs">
                        {formatDate(item.data.timestamp)}
                      </span>
                    </div>

                    <p 
                      className="text-white"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        lineHeight: '1.6',
                        fontWeight: 500,
                        letterSpacing: '0.01em'
                      }}
                    >
                      {item.data.text}
                    </p>

                    {item.data.source_type === 'dialogue' && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-white/40 text-xs">
                          From LUMA conversation
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
