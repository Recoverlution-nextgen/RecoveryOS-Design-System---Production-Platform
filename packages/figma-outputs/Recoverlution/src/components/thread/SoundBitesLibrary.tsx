/**
 * SOUND BITES LIBRARY
 * 
 * Two-part system:
 * 1. YOUR VOICE - User's captured reflections organized by bucket
 * 2. LIBRARY - Curated wisdom content (Sparks/Flames/Embers)
 * 
 * Mobile-first, clean, production-ready
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Search, ChevronDown, Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Luma3Header } from '../luma3/Luma3Header';

interface UserSoundBite {
  id: string;
  audio_url: string;
  transcript: string;
  title?: string; // AI-generated track title (1-3 words extracted from transcript)
  bucket: string;
  duration: number;
  timestamp: string;
}

interface LibrarySoundBite {
  id: string;
  code: string;
  pillar_id: number;
  theme_id: number;
  guru_id: number;
  tag: string;
  angle: string;
  sound_bite: string; // Audio URL
  transcript: string;
  duration: number; // In seconds
}

interface SoundBitesLibraryProps {
  onClose: () => void;
  backgroundUrl?: string;
}

const BUCKETS = [
  { value: 'story', label: 'Story', color: '#8B5CF6', description: 'Decode the narrative' },
  { value: 'vision', label: 'Vision', color: '#3B82F6', description: 'Anything is possible' },
  { value: 'baggage', label: 'Baggage', color: '#10B981', description: 'Take the load off' },
  { value: 'insights', label: 'Insights', color: '#F39C12', description: 'Map the magic' },
  { value: 'heart', label: 'Heart', color: '#EC4899', description: 'Feelings uncover truth' },
  { value: 'space', label: 'Space', color: '#6366F1', description: 'Let it go' },
];

// Mock user voice data
const MOCK_USER_SOUND_BITES: UserSoundBite[] = [
  {
    id: '1',
    audio_url: 'mock1.webm',
    transcript: 'I keep noticing this pattern where I push people away right when things start to feel good. Like I am testing them to see if they will stay.',
    title: 'Pushing Away',
    bucket: 'insights',
    duration: 47,
    timestamp: '2024-12-15T14:30:00Z',
  },
  {
    id: '2',
    audio_url: 'mock2.webm',
    transcript: 'My body feels so heavy today. Like I am carrying something I cannot name.',
    title: 'Heavy Body',
    bucket: 'heart',
    duration: 23,
    timestamp: '2024-12-15T09:15:00Z',
  },
  {
    id: '3',
    audio_url: 'mock3.webm',
    transcript: 'The story I have been telling myself is that I am not enough. That I need to earn love through achievement.',
    title: 'Not Enough',
    bucket: 'story',
    duration: 38,
    timestamp: '2024-12-14T11:20:00Z',
  },
  {
    id: '4',
    audio_url: 'mock4.webm',
    transcript: 'I am letting go of needing to understand why they hurt me. I am choosing me.',
    title: 'Letting Go',
    bucket: 'space',
    duration: 29,
    timestamp: '2024-12-13T19:00:00Z',
  },
];

// Mock library data (will come from public.sound_bites table)
const MOCK_LIBRARY_SPARKS: LibrarySoundBite[] = [
  { id: 's1', code: 'ER-A-01', pillar_id: 1, theme_id: 1, guru_id: 1, tag: 'regulation', angle: 'permission', sound_bite: 'spark1.webm', transcript: 'You are not your worst moment', duration: 6 },
  { id: 's2', code: 'ER-A-02', pillar_id: 1, theme_id: 1, guru_id: 2, tag: 'grounding', angle: 'somatic', sound_bite: 'spark2.webm', transcript: 'Name it to tame it', duration: 4 },
  { id: 's3', code: 'CR-B-01', pillar_id: 2, theme_id: 3, guru_id: 1, tag: 'reframe', angle: 'perspective', sound_bite: 'spark3.webm', transcript: 'What else could be true?', duration: 5 },
  { id: 's4', code: 'SC-A-01', pillar_id: 3, theme_id: 2, guru_id: 3, tag: 'kindness', angle: 'permission', sound_bite: 'spark4.webm', transcript: 'Rest is not earned. It is a birthright', duration: 7 },
  { id: 's5', code: 'DM-C-01', pillar_id: 4, theme_id: 4, guru_id: 2, tag: 'values', angle: 'inquiry', sound_bite: 'spark5.webm', transcript: 'What would your future self choose?', duration: 6 },
];

const MOCK_LIBRARY_FLAMES: LibrarySoundBite[] = [
  { id: 'f1', code: 'ER-A-10', pillar_id: 1, theme_id: 1, guru_id: 1, tag: 'regulation', angle: 'teaching', sound_bite: 'flame1.webm', transcript: 'The window of tolerance. That space where you can feel without flooding. Where emotions inform without overwhelming. Regulation is not about control. It is about capacity.', duration: 35 },
  { id: 'f2', code: 'CR-B-05', pillar_id: 2, theme_id: 3, guru_id: 2, tag: 'reframe', angle: 'wisdom', sound_bite: 'flame2.webm', transcript: 'Between stimulus and response there is a space. In that space is our power to choose our response. And in our response lies our growth and our freedom.', duration: 32 },
  { id: 'f3', code: 'SC-A-08', pillar_id: 3, theme_id: 2, guru_id: 3, tag: 'kindness', angle: 'challenge', sound_bite: 'flame3.webm', transcript: 'What if the voice that says you are not enough is not yours? What if you inherited it? And what if you could give it back?', duration: 28 },
];

const MOCK_LIBRARY_EMBERS: LibrarySoundBite[] = [
  { id: 'e1', code: 'ER-A-20', pillar_id: 1, theme_id: 1, guru_id: 1, tag: 'integration', angle: 'deep', sound_bite: 'ember1.webm', transcript: 'Healing is not linear. Some days you will feel like you are back at the beginning. That is not regression. That is depth. You are not going backwards. You are going inwards. And every time you return to a familiar wound with new awareness, you are rewiring the circuitry. You are teaching your nervous system that it is safe to feel. That vulnerability is not weakness. That the only way out is through. And through means feeling it all.', duration: 68 },
  { id: 'e2', code: 'CR-B-15', pillar_id: 2, theme_id: 3, guru_id: 2, tag: 'perspective', angle: 'philosophical', sound_bite: 'ember2.webm', transcript: 'The stories we tell ourselves become the lives we live. Not because they are true. But because we believe them. And belief is a powerful architect. It builds walls or it builds bridges. It creates ceilings or it opens skies. The question is not whether your story is true. The question is whether it serves you. Whether it makes space for your becoming. Or whether it keeps you small in service of someone else need for you to stay the same.', duration: 72 },
];

export function SoundBitesLibrary({ onClose, backgroundUrl }: SoundBitesLibraryProps) {
  const [view, setView] = useState<'your-voice' | 'library'>('your-voice');
  const [selectedBucket, setSelectedBucket] = useState('story');
  const [showBucketDropdown, setShowBucketDropdown] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<{ id: string; title: string; duration: number; type: 'user' | 'library' } | null>(null);

  const sparksScrollRef = useRef<HTMLDivElement>(null);
  const flamesScrollRef = useRef<HTMLDivElement>(null);
  const embersScrollRef = useRef<HTMLDivElement>(null);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredUserSoundBites = MOCK_USER_SOUND_BITES.filter(sb => {
    const matchesBucket = sb.bucket === selectedBucket;
    const matchesSearch = searchQuery === '' || 
      sb.transcript.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBucket && matchesSearch;
  });

  const handlePlay = (id: string, title: string, duration: number, type: 'user' | 'library') => {
    if (playingId === id) {
      setPlayingId(null);
      setNowPlaying(null);
    } else {
      setPlayingId(id);
      setNowPlaying({ id, title, duration, type });
      // In Phase 2, actually play audio
    }
  };

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 280; // Card width + gap
      ref.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const selectedBucketData = BUCKETS.find(b => b.value === selectedBucket) || BUCKETS[0];

  return (
    <div 
      className="luma-screen"
      style={backgroundUrl ? {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      {/* LUMA3 Header with unified navigation */}
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-8">
        <Luma3Header
          title="PLAY"
          showPlayByDefault={true}
          showVoiceByDefault={false}
          onClose={onClose}
        />
        
        {/* Control bar - View toggle + Search */}
        <div className="luma-voice-message mt-0" style={{ borderTop: 'none', paddingTop: '20px', paddingBottom: '20px' }}>
          <div className="flex items-center justify-between">
            {/* Left: View toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('your-voice')}
                className={view === 'your-voice' ? 'luma-toggle-active' : 'luma-toggle'}
              >
                Your Voice
              </button>
              <button
                onClick={() => setView('library')}
                className={view === 'library' ? 'luma-toggle-active' : 'luma-toggle'}
              >
                Library
              </button>
            </div>

            {/* Right: Search icon button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`luma-icon-button-sm ${showSearch ? 'luma-icon-button-sm-highlight' : ''}`}
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Expandable search input */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sound bites..."
                    className="luma-input w-full"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto pb-24">
        
        {/* YOUR VOICE VIEW */}
        {view === 'your-voice' && (
          <div className="luma-container py-6">
            
            {/* Bucket selector dropdown */}
            <div className="mb-6">
              <div className="relative">
                <button
                  onClick={() => setShowBucketDropdown(!showBucketDropdown)}
                  className="w-full luma-glass-dark px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="luma-pillar-dot"
                      style={{ backgroundColor: selectedBucketData.color }}
                    />
                    <div className="text-left">
                      <div className="luma-label text-white mb-0.5">
                        {selectedBucketData.label}
                      </div>
                      <div className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-display)' }}>
                        {selectedBucketData.description}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${showBucketDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showBucketDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 luma-glass-dark overflow-hidden z-10"
                    >
                      {BUCKETS.map((bucket) => (
                        <button
                          key={bucket.value}
                          onClick={() => {
                            setSelectedBucket(bucket.value);
                            setShowBucketDropdown(false);
                          }}
                          className="w-full px-5 py-4 flex items-start gap-3 hover:bg-white/5 transition-all border-b border-white/10 last:border-b-0"
                        >
                          <div 
                            className="luma-pillar-dot mt-1.5"
                            style={{ backgroundColor: bucket.color }}
                          />
                          <div className="text-left flex-1">
                            <div className="luma-label text-white mb-1">
                              {bucket.label}
                            </div>
                            <div className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                              {bucket.description}
                            </div>
                          </div>
                          {bucket.value === selectedBucket && (
                            <Check className="w-4 h-4 text-white/60 mt-1" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bucket invitation card */}
            <BucketInvitation bucket={selectedBucket} onCapture={() => {
              // TODO: Open capture interface with this bucket pre-selected
              console.log('Open capture for bucket:', selectedBucket);
            }} />

            {/* User sound bites list */}
            {filteredUserSoundBites.length > 0 && (
              <div className="space-y-6 mt-8">
                {/* Group by time period */}
                {(() => {
                  const now = new Date();
                  const today: UserSoundBite[] = [];
                  const thisWeek: UserSoundBite[] = [];
                  const earlier: UserSoundBite[] = [];

                  filteredUserSoundBites.forEach(sb => {
                    const date = new Date(sb.timestamp);
                    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                    
                    if (diffInDays === 0) today.push(sb);
                    else if (diffInDays < 7) thisWeek.push(sb);
                    else earlier.push(sb);
                  });

                  return (
                    <>
                      {today.length > 0 && (
                        <div>
                          <h3 className="text-white/40 text-xs mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                            Today
                          </h3>
                          <div className="space-y-1">
                            {today.map((soundBite, index) => (
                              <SoundBiteTrack 
                                key={soundBite.id} 
                                soundBite={soundBite} 
                                isPlaying={playingId === soundBite.id}
                                onPlay={() => handlePlay(soundBite.id, soundBite.title || soundBite.transcript.slice(0, 40) + '...', soundBite.duration, 'user')}
                                trackNumber={index + 1}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {thisWeek.length > 0 && (
                        <div>
                          <h3 className="text-white/40 text-xs mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                            This Week
                          </h3>
                          <div className="space-y-1">
                            {thisWeek.map((soundBite, index) => (
                              <SoundBiteTrack 
                                key={soundBite.id} 
                                soundBite={soundBite} 
                                isPlaying={playingId === soundBite.id}
                                onPlay={() => handlePlay(soundBite.id, soundBite.title || soundBite.transcript.slice(0, 40) + '...', soundBite.duration, 'user')}
                                trackNumber={index + 1}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {earlier.length > 0 && (
                        <div>
                          <h3 className="text-white/40 text-xs mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                            Earlier
                          </h3>
                          <div className="space-y-1">
                            {earlier.map((soundBite, index) => (
                              <SoundBiteTrack 
                                key={soundBite.id} 
                                soundBite={soundBite} 
                                isPlaying={playingId === soundBite.id}
                                onPlay={() => handlePlay(soundBite.id, soundBite.title || soundBite.transcript.slice(0, 40) + '...', soundBite.duration, 'user')}
                                trackNumber={index + 1}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* LIBRARY VIEW */}
        {view === 'library' && (
          <div className="py-6">
            
            {/* Sparks section */}
            <div className="mb-10">
              <div className="luma-container mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="luma-title mb-1">Sparks</h2>
                    <p className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-display)' }}>
                      Quick ignition (5 to 10s mantras)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => scroll(sparksScrollRef, 'left')}
                      className="luma-icon-button-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => scroll(sparksScrollRef, 'right')}
                      className="luma-icon-button-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div 
                ref={sparksScrollRef}
                className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {MOCK_LIBRARY_SPARKS.map(spark => {
                  const isPlaying = playingId === spark.id;
                  return (
                    <div 
                      key={spark.id} 
                      className="luma-glass-dark p-5 flex-shrink-0 snap-start"
                      style={{ width: '260px' }}
                    >
                      {/* Duration */}
                      <div className="text-white/40 text-xs mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                        {formatDuration(spark.duration)}
                      </div>

                      {/* Transcript */}
                      <p className="text-white text-sm mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                        {spark.transcript}
                      </p>

                      {/* Play button */}
                      <button
                        onClick={() => handlePlay(spark.id, spark.transcript, spark.duration, 'library')}
                        className="luma-icon-button-sm"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Flames section */}
            <div className="mb-10">
              <div className="luma-container mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="luma-title mb-1">Flames</h2>
                    <p className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-display)' }}>
                      Sustained burn (30 to 40s passages)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => scroll(flamesScrollRef, 'left')}
                      className="luma-icon-button-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => scroll(flamesScrollRef, 'right')}
                      className="luma-icon-button-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div 
                ref={flamesScrollRef}
                className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {MOCK_LIBRARY_FLAMES.map(flame => {
                  const isPlaying = playingId === flame.id;
                  return (
                    <div 
                      key={flame.id} 
                      className="luma-glass-dark p-5 flex-shrink-0 snap-start"
                      style={{ width: '320px' }}
                    >
                      {/* Duration */}
                      <div className="text-white/40 text-xs mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                        {formatDuration(flame.duration)}
                      </div>

                      {/* Transcript */}
                      <p className="text-white/90 text-sm mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                        {flame.transcript}
                      </p>

                      {/* Play button */}
                      <button
                        onClick={() => handlePlay(flame.id, flame.transcript.slice(0, 40) + '...', flame.duration, 'library')}
                        className="luma-icon-button-sm"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Embers section */}
            <div className="mb-10">
              <div className="luma-container mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="luma-title mb-1">Embers</h2>
                    <p className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-display)' }}>
                      Long burning wisdom (60s plus you return to)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => scroll(embersScrollRef, 'left')}
                      className="luma-icon-button-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => scroll(embersScrollRef, 'right')}
                      className="luma-icon-button-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div 
                ref={embersScrollRef}
                className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {MOCK_LIBRARY_EMBERS.map(ember => {
                  const isPlaying = playingId === ember.id;
                  return (
                    <div 
                      key={ember.id} 
                      className="luma-glass-dark p-5 flex-shrink-0 snap-start"
                      style={{ width: '380px' }}
                    >
                      {/* Duration */}
                      <div className="text-white/40 text-xs mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                        {formatDuration(ember.duration)}
                      </div>

                      {/* Transcript */}
                      <p className="text-white text-sm mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                        {ember.transcript}
                      </p>

                      {/* Play button */}
                      <button
                        onClick={() => handlePlay(ember.id, ember.transcript.slice(0, 50) + '...', ember.duration, 'library')}
                        className="luma-icon-button-sm"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Persistent player (bottom) */}
      <AnimatePresence>
        {nowPlaying && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 luma-glass-dark border-t border-white/20 z-50"
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <div className="luma-container py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-white text-sm truncate mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                    {nowPlaying.title}
                  </p>
                  <p className="text-white/40 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                    {nowPlaying.type === 'user' ? 'Your Voice' : 'Library'} · {formatDuration(nowPlaying.duration)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setPlayingId(null);
                    setNowPlaying(null);
                  }}
                  className="luma-icon-button-sm"
                >
                  <Pause className="w-4 h-4" />
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/10 relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: nowPlaying.duration, ease: 'linear' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Bucket Invitation Component
interface BucketInvitationProps {
  bucket: string;
  onCapture: () => void;
}

function BucketInvitation({ bucket, onCapture }: BucketInvitationProps) {
  const bucketContent: Record<string, {
    tagline: string;
    prompts: string[];
  }> = {
    story: {
      tagline: 'What story wants to be told?',
      prompts: [
        'The Narrative',
        'Inherited',
        'Before',
      ]
    },
    vision: {
      tagline: 'Who are you becoming?',
      prompts: [
        'If Nothing',
        'Becoming',
        'Unfolding',
      ]
    },
    baggage: {
      tagline: 'What are you ready to set down?',
      prompts: [
        'Carrying This',
        'The Weight',
        'Not Mine',
      ]
    },
    insights: {
      tagline: 'What are you noticing?',
      prompts: [
        'The Pattern',
        'Finally Seeing',
        'Body Knows',
      ]
    },
    heart: {
      tagline: 'What is your heart saying?',
      prompts: [
        'Actually Feeling',
        'Holding',
        'Underneath',
      ]
    },
    space: {
      tagline: 'What wants to be released?',
      prompts: [
        'Letting Go',
        'Choosing Release',
        'No Longer',
      ]
    },
  };

  const content = bucketContent[bucket];
  const bucketData = BUCKETS.find(b => b.value === bucket);

  if (!content || !bucketData) return null;

  return (
    <motion.div
      key={bucket}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      {/* Tagline */}
      <p 
        className="text-white/50 mb-4 text-sm" 
        style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
      >
        {content.tagline}
      </p>

      {/* Prompt tiles - horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {content.prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={onCapture}
            className="luma-option hover:bg-white/10 hover:text-white transition-all group flex-shrink-0 px-5 py-3"
            style={{ minWidth: '140px' }}
          >
            <div className="flex items-center justify-between gap-3">
              <span 
                className="text-sm leading-snug text-left"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                {prompt}
              </span>
              <Plus className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {/* Open capture button - full width, lighter */}
      <button
        onClick={onCapture}
        className="w-full py-3 text-white/50 hover:text-white/70 hover:bg-white/5 transition-all text-sm border-t border-white/10"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
      >
        Or capture your own
      </button>
    </motion.div>
  );
}

// SoundBiteTrack Component
interface SoundBiteTrackProps {
  soundBite: UserSoundBite;
  isPlaying: boolean;
  onPlay: () => void;
  trackNumber: number;
}

function SoundBiteTrack({ soundBite, isPlaying, onPlay, trackNumber }: SoundBiteTrackProps) {
  // Use the AI-generated title if available, otherwise truncate transcript
  const trackTitle = soundBite.title || (
    soundBite.transcript.length > 60 
      ? soundBite.transcript.slice(0, 60) + '...' 
      : soundBite.transcript
  );

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <button
      onClick={onPlay}
      className="w-full hover:bg-white/5 transition-all group flex items-center gap-4 px-4 py-3"
    >
      {/* Play button */}
      <div className="flex-shrink-0">
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white" />
        ) : (
          <Play className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0 text-left">
        <p 
          className={`text-sm truncate ${isPlaying ? 'text-white' : 'text-white/80 group-hover:text-white'} transition-colors`}
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
        >
          {trackTitle}
        </p>
      </div>

      {/* Duration */}
      <div className="flex-shrink-0">
        <span 
          className="text-xs text-white/40"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {formatDuration(soundBite.duration)}
        </span>
      </div>
    </button>
  );
}