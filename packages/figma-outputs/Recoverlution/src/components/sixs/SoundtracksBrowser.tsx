// SOUNDTRACKS - Curated playlists from 450 real soundbites
// Organized by 6-Pillar Clinical Blueprint

import { useState, useEffect } from 'react';
import { Play, Pause, Heart, Filter, Clock, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface Soundbite {
  id: string;
  title: string;
  duration: number; // seconds
  pillar: string;
  concept: string;
  theme: string;
  audioUrl?: string;
  transcript: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  pillar: string;
  soundbites: Soundbite[];
  totalDuration: number;
  color: string;
}

const PILLARS = [
  { id: 'ER', name: 'Emotional Regulation', color: '#7C67FF' },
  { id: 'SR', name: 'Stress Resilience', color: '#C49DC4' },
  { id: 'SC', name: 'Social Connectivity', color: '#9D8FFF' },
  { id: 'CR', name: 'Cognitive Reframing', color: '#3E2BB8' },
  { id: 'II', name: 'Identity Integration', color: '#5739FB' },
  { id: 'DM', name: 'Decision Mastery', color: '#A8C4E1' },
];

export function SoundtracksBrowser() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [filterPillar, setFilterPillar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      // Load curated playlists from backend
      const response = await fetch('/api/soundtracks/playlists');
      const data = await response.json();
      setPlaylists(data.playlists || []);
    } catch (error) {
      console.error('Failed to load playlists:', error);
      
      // Fallback to mock data for demo
      setPlaylists([
        {
          id: 'morning-reset',
          name: 'Morning Reset',
          description: 'Start your day with grounding and intention',
          pillar: 'ER',
          soundbites: [],
          totalDuration: 900, // 15 minutes
          color: '#7C67FF',
        },
        {
          id: 'stress-toolkit',
          name: 'Stress Toolkit',
          description: 'Quick practices for high stress moments',
          pillar: 'SR',
          soundbites: [],
          totalDuration: 720, // 12 minutes
          color: '#C49DC4',
        },
        {
          id: 'identity-work',
          name: 'Identity Work',
          description: 'Deep dive into who you are becoming',
          pillar: 'II',
          soundbites: [],
          totalDuration: 1200, // 20 minutes
          color: '#5739FB',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const handlePlayPause = (soundbiteId: string) => {
    if (currentlyPlaying === soundbiteId) {
      setCurrentlyPlaying(null);
      // Pause audio
    } else {
      setCurrentlyPlaying(soundbiteId);
      // Play audio
    }
  };

  const filteredPlaylists = filterPillar
    ? playlists.filter(p => p.pillar === filterPillar)
    : playlists;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent" style={{ borderRadius: '50%' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8" style={{ color: '#5739FB' }} />
          <h1 className="headline-section text-primary">SOUNDTRACKS</h1>
        </div>
        <p className="copy-secondary">Curated playlists from 450 soundbites</p>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm">Filter by pillar:</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilterPillar(null)}
            className={`
              px-4 py-2 border transition-all
              ${!filterPillar 
                ? 'border-primary bg-primary/10' 
                : 'border-[--border] hover:border-primary/30'
              }
            `}
          >
            All Pillars
          </button>
          
          {PILLARS.map(pillar => (
            <button
              key={pillar.id}
              onClick={() => setFilterPillar(pillar.id)}
              className={`
                px-4 py-2 border transition-all
                ${filterPillar === pillar.id 
                  ? 'border-2' 
                  : 'border-[--border] hover:border-primary/30'
                }
              `}
              style={{
                borderColor: filterPillar === pillar.id ? pillar.color : undefined,
                backgroundColor: filterPillar === pillar.id ? `${pillar.color}15` : undefined,
              }}
            >
              {pillar.name}
            </button>
          ))}
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="max-w-6xl mx-auto">
        {filteredPlaylists.length === 0 ? (
          <div className="text-center py-12">
            <p className="copy-secondary">No playlists found for this pillar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map(playlist => {
              const pillar = PILLARS.find(p => p.id === playlist.pillar);
              
              return (
                <button
                  key={playlist.id}
                  onClick={() => setSelectedPlaylist(playlist)}
                  className="p-6 border border-[--border] bg-white hover:border-primary/30 transition-all text-left group"
                  style={{ borderLeft: `4px solid ${pillar?.color || '#5739FB'}` }}
                >
                  {/* Playlist Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="headline-card mb-2 group-hover:text-primary transition-colors">
                        {playlist.name}
                      </h3>
                      <p className="text-xs px-2 py-1 bg-primary/10 text-primary inline-block mb-2">
                        {pillar?.name || playlist.pillar}
                      </p>
                    </div>
                    <Play 
                      className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" 
                      style={{ color: pillar?.color }}
                    />
                  </div>

                  {/* Description */}
                  <p className="copy-secondary text-sm mb-4">
                    {playlist.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(playlist.totalDuration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{playlist.soundbites.length} soundbites</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Playlist Detail Modal */}
      {selectedPlaylist && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedPlaylist(null)}
        >
          <div 
            className="bg-white max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="headline-section mb-2">{selectedPlaylist.name}</h2>
                <p className="copy-secondary">{selectedPlaylist.description}</p>
              </div>
              <button
                onClick={() => setSelectedPlaylist(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Soundbites List */}
            <div className="space-y-3">
              {selectedPlaylist.soundbites.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  Loading soundbites...
                </p>
              ) : (
                selectedPlaylist.soundbites.map((soundbite, index) => (
                  <div
                    key={soundbite.id}
                    className="flex items-center gap-4 p-4 border border-[--border] hover:border-primary/30 transition-all"
                  >
                    <span className="text-sm text-muted-foreground w-8">
                      {index + 1}
                    </span>
                    
                    <button
                      onClick={() => handlePlayPause(soundbite.id)}
                      className="p-2 hover:bg-primary/10 transition-all"
                    >
                      {currentlyPlaying === soundbite.id ? (
                        <Pause className="w-5 h-5" style={{ color: selectedPlaylist.color }} />
                      ) : (
                        <Play className="w-5 h-5" style={{ color: selectedPlaylist.color }} />
                      )}
                    </button>

                    <div className="flex-1">
                      <h4 className="mb-1">{soundbite.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {soundbite.theme} • {formatDuration(soundbite.duration)}
                      </p>
                    </div>

                    <button className="p-2 hover:bg-primary/10 transition-all">
                      <Heart className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <Button
                className="flex-1"
                style={{ backgroundColor: selectedPlaylist.color }}
              >
                Play All
              </Button>
              <Button variant="outline" className="flex-1">
                Add to Library
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
