/**
 * LUMA PLAY - Modular Player with 6 S's Architecture
 * 
 * Pattern: The player is THE interface
 * Three states: Collapsed (bar), Expanded Empty (launcher), Expanded Playing (3 tabs)
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft } from 'lucide-react';
import { Luma3Header } from './Luma3Header';
import { LumaPlayer } from '../luma-play/LumaPlayer';
import { TrackItem } from '../luma-play/TrackItem';
import { StationCard } from '../luma-play/StationCard';
import { StationDetail } from '../luma-play/StationDetail';
import { SoundtrackCard } from '../luma-play/SoundtrackCard';
import { SoundtrackDetail } from '../luma-play/SoundtrackDetail';
import { StoryTagCard } from '../luma-play/StoryTagCard';
import { StoryDetail } from '../luma-play/StoryDetail';
import { PlayerState, Soundtrack, StationPreset } from '../../types/lumaPlay';
import { 
  Radio, Music, Book, StickyNote, Library, Search,
  Zap, Flame, Sparkles 
} from 'lucide-react';
import { STATIONS, SOUNDTRACKS, STORY_TAGS } from '../../data/lumaPlayMockData';
import { getLibraryTracks, LibraryTrack } from '../../utils/supabase/soundbites';
import { useLumaPlayer } from '../../contexts/LumaPlayerContext';
import { migrateLegacyUrl } from '../../utils/supabase/storage';

interface LumaPlayProps {
  onClose: () => void;
  onNavigateHome?: () => void;
  onNavigateToVoice?: () => void;
}

const DEFAULT_BACKGROUND = migrateLegacyUrl('https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/client%20experience/Precision%20practices.avif');

type ActiveView = 'stations' | 'soundtracks' | 'story' | 'stickynotes' | 'shelf' | 'search' | null;

export function LumaPlay({ onClose, onNavigateHome, onNavigateToVoice }: LumaPlayProps) {
  const [activeView, setActiveView] = useState<ActiveView>('shelf');
  const [selectedSoundtrack, setSelectedSoundtrack] = useState<Soundtrack | null>(null);
  const [selectedStation, setSelectedStation] = useState<StationPreset | null>(null);
  const [selectedStoryTag, setSelectedStoryTag] = useState<string | null>(null);
  const [librarySparks, setLibrarySparks] = useState<LibraryTrack[]>([]);
  const [libraryFlames, setLibraryFlames] = useState<LibraryTrack[]>([]);
  const [libraryEmbers, setLibraryEmbers] = useState<LibraryTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllSparks, setShowAllSparks] = useState(false);
  const [showAllFlames, setShowAllFlames] = useState(false);
  const [showAllEmbers, setShowAllEmbers] = useState(false);
  
  // Player context
  const { playTrack, currentTrack, isPlaying } = useLumaPlayer();

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayTrack = (track: LibraryTrack) => {
    playTrack(track);
  };

  const handleOpenSoundtrack = (soundtrack: Soundtrack) => {
    setSelectedSoundtrack(soundtrack);
  };

  const handleBackToSoundtracks = () => {
    setSelectedSoundtrack(null);
  };

  const handleOpenStation = (station: StationPreset) => {
    setSelectedStation(station);
  };

  const handleBackToStations = () => {
    setSelectedStation(null);
  };

  const handleOpenStoryTag = (tag: string) => {
    setSelectedStoryTag(tag);
  };

  const handleBackToStoryTags = () => {
    setSelectedStoryTag(null);
  };

  // Navigation
  const navigationItems = [
    { id: 'shelf' as const, icon: Library },
    { id: 'stations' as const, icon: Radio },
    { id: 'soundtracks' as const, icon: Music },
    { id: 'story' as const, icon: Book },
    { id: 'search' as const, icon: Search },
  ];

  useEffect(() => {
    const fetchLibraryTracks = async () => {
      try {
        const tracks = await getLibraryTracks();
        setLibrarySparks(tracks.sparks);
        setLibraryFlames(tracks.flames);
        setLibraryEmbers(tracks.embers);
        console.log('[LUMA Play] Loaded library tracks:', {
          sparks: tracks.sparks.length,
          flames: tracks.flames.length,
          embers: tracks.embers.length,
          total: tracks.all.length
        });
      } catch (error) {
        console.error('[LUMA Play] Error loading library tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryTracks();
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-black luma-overlay-strong"
      style={{
        backgroundImage: `url(${DEFAULT_BACKGROUND})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <Luma3Header 
          title="PLAY"
          showPlayByDefault={true}
          showVoiceByDefault={false}
          onHome={onNavigateHome}
          onVoice={onNavigateToVoice}
          onClose={onClose}
        />

        {/* 6 S's Navigation */}
        <div className="mt-6 flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-12 h-12 flex items-center justify-center luma-glass transition-all ${
                  activeView === item.id 
                    ? 'bg-[#5739FB]/30 text-white shadow-lg' 
                    : 'text-white/50 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* STATIONS */}
          {activeView === 'stations' && !selectedStation && (
            <div className="space-y-4">
              <div className="text-white/70 text-sm mb-4">Preset frequencies for different moments</div>
              <div className="grid grid-cols-2 gap-3">
                {STATIONS.map((station) => (
                  <StationCard key={station.id} station={station} onOpen={() => handleOpenStation(station)} />
                ))}
              </div>
            </div>
          )}

          {/* STATION DETAIL */}
          {activeView === 'stations' && selectedStation && (
            <StationDetail 
              station={selectedStation}
              onBack={handleBackToStations}
              onStartStation={() => console.log('Start station:', selectedStation.id)}
              formatDuration={formatDuration}
            />
          )}

          {/* SOUNDTRACKS */}
          {activeView === 'soundtracks' && !selectedSoundtrack && (
            <div className="space-y-4">
              <div className="text-white/70 text-sm mb-4">Your manual playlists</div>
              {SOUNDTRACKS.map((soundtrack) => (
                <SoundtrackCard 
                  key={soundtrack.id} 
                  soundtrack={soundtrack}
                  onOpen={() => handleOpenSoundtrack(soundtrack)}
                />
              ))}
              
              {/* New Soundtrack */}
              <SoundtrackCard 
                isCreateNew={true}
                onCreate={() => console.log('Create new soundtrack')}
              />
            </div>
          )}

          {/* SOUNDTRACK DETAIL */}
          {activeView === 'soundtracks' && selectedSoundtrack && (
            <SoundtrackDetail 
              soundtrack={selectedSoundtrack}
              onBack={handleBackToSoundtracks}
              onPlayTrack={handlePlayTrack}
              formatDuration={formatDuration}
            />
          )}

          {/* STORY */}
          {activeView === 'story' && !selectedStoryTag && (
            <div className="space-y-4">
              <div className="text-white/70 text-sm mb-4">Your voice notes organized by theme</div>
              <div className="grid grid-cols-2 gap-3">
                {STORY_TAGS.map((tag) => (
                  <StoryTagCard 
                    key={tag.id} 
                    tag={tag}
                    onOpen={() => handleOpenStoryTag(tag.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STORY DETAIL */}
          {activeView === 'story' && selectedStoryTag && (
            <StoryDetail 
              tag={STORY_TAGS.find(t => t.id === selectedStoryTag)!}
              onBack={handleBackToStoryTags}
              formatDuration={formatDuration}
            />
          )}

          {/* SHELF - Browse all content */}
          {activeView === 'shelf' && (
            <div className="space-y-8">
              
              {/* Loading State */}
              {loading && (
                <div className="luma-glass p-12 text-center">
                  <div className="text-white/50 text-sm">Loading library...</div>
                </div>
              )}

              {/* Sparks */}
              {!loading && librarySparks.length > 0 && (
                <div>
                  <div className="mb-3 px-3">
                    <div className="flex items-start gap-3 mb-2">
                      <div 
                        className="w-10 h-10 flex items-center justify-center luma-glass flex-shrink-0"
                        style={{
                          borderLeft: '2px solid #7C67FF',
                        }}
                      >
                        <Zap className="w-5 h-5" style={{ color: '#7C67FF' }} />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="text-white text-lg mb-1">Sparks</div>
                        <div className="text-white/50 text-xs">
                          Quick moments of wisdom to shift your perspective
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="luma-glass">
                    {librarySparks.slice(0, showAllSparks ? librarySparks.length : 20).map((track, i) => (
                      <TrackItem
                        key={track.id}
                        track={track}
                        isPlaying={currentTrack?.id === track.id && isPlaying}
                        onPlay={() => handlePlayTrack(track)}
                        formatDuration={formatDuration}
                        showDivider={i < Math.min(librarySparks.length, showAllSparks ? librarySparks.length : 20) - 1}
                      />
                    ))}
                    {librarySparks.length > 20 && !showAllSparks && (
                      <button
                        className="w-full py-4 text-center text-sm transition-all"
                        style={{ color: '#7C67FF' }}
                        onClick={() => setShowAllSparks(true)}
                      >
                        Show All {librarySparks.length} Sparks
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Flames */}
              {!loading && libraryFlames.length > 0 && (
                <div>
                  <div className="mb-3 px-3">
                    <div className="flex items-start gap-3 mb-2">
                      <div 
                        className="w-10 h-10 flex items-center justify-center luma-glass flex-shrink-0"
                        style={{
                          borderLeft: '2px solid #5739FB',
                        }}
                      >
                        <Flame className="w-5 h-5" style={{ color: '#5739FB' }} />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="text-white text-lg mb-1">Flames</div>
                        <div className="text-white/50 text-xs">
                          Deeper dives into the concepts that fuel transformation
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="luma-glass">
                    {libraryFlames.slice(0, showAllFlames ? libraryFlames.length : 20).map((track, i) => (
                      <TrackItem
                        key={track.id}
                        track={track}
                        isPlaying={currentTrack?.id === track.id && isPlaying}
                        onPlay={() => handlePlayTrack(track)}
                        formatDuration={formatDuration}
                        showDivider={i < Math.min(libraryFlames.length, showAllFlames ? libraryFlames.length : 20) - 1}
                      />
                    ))}
                    {libraryFlames.length > 20 && !showAllFlames && (
                      <button
                        className="w-full py-4 text-center text-sm transition-all"
                        style={{ color: '#5739FB' }}
                        onClick={() => setShowAllFlames(true)}
                      >
                        Show All {libraryFlames.length} Flames
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Embers */}
              {!loading && libraryEmbers.length > 0 && (
                <div>
                  <div className="mb-3 px-3">
                    <div className="flex items-start gap-3 mb-2">
                      <div 
                        className="w-10 h-10 flex items-center justify-center luma-glass flex-shrink-0"
                        style={{
                          borderLeft: '2px solid #3E2BB8',
                        }}
                      >
                        <Sparkles className="w-5 h-5" style={{ color: '#3E2BB8' }} />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="text-white text-lg mb-1">Embers</div>
                        <div className="text-white/50 text-xs">
                          Extended reflections for sustained growth and integration
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="luma-glass">
                    {libraryEmbers.slice(0, showAllEmbers ? libraryEmbers.length : 20).map((track, i) => (
                      <TrackItem
                        key={track.id}
                        track={track}
                        isPlaying={currentTrack?.id === track.id && isPlaying}
                        onPlay={() => handlePlayTrack(track)}
                        formatDuration={formatDuration}
                        showDivider={i < Math.min(libraryEmbers.length, showAllEmbers ? libraryEmbers.length : 20) - 1}
                      />
                    ))}
                    {libraryEmbers.length > 20 && !showAllEmbers && (
                      <button
                        className="w-full py-4 text-center text-sm transition-all"
                        style={{ color: '#3E2BB8' }}
                        onClick={() => setShowAllEmbers(true)}
                      >
                        Show All {libraryEmbers.length} Embers
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OTHER VIEWS - Placeholder */}
          {(activeView === 'stickynotes' || activeView === 'search') && (
            <div className="luma-glass p-12 text-center">
              <div className="text-white/50 text-lg mb-2">
                {activeView === 'stickynotes' && 'Support messages from your circle'}
                {activeView === 'search' && 'Search all content'}
              </div>
              <div className="text-white/30 text-sm">
                Coming soon
              </div>
            </div>
          )}
        </div>
      </div>

      {/* The Modular Player - Always at bottom, decoupled from content */}
      <LumaPlayer />
    </motion.div>
  );
}