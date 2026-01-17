/**
 * LUMA PLAY - TYPE DEFINITIONS
 * The modular player system for the 6 S's architecture
 */

// ═══════════════════════════════════════════════════════════
// SOUND BITE TYPES
// ═══════════════════════════════════════════════════════════

export interface SoundBite {
  id: string;
  type: 'spark' | 'flame' | 'ember';
  source: 'library' | 'voice';
  title: string;
  duration: number; // seconds
  context?: string; // for voice notes (bucket name)
  timestamp?: number; // for story timeline
  tags?: string[];
}

// ═══════════════════════════════════════════════════════════
// THE 6 S'S
// ═══════════════════════════════════════════════════════════

export type SMode = 'station' | 'soundtracks' | 'story' | 'stickynotes' | 'shelf' | 'search' | null;

// ═══════════════════════════════════════════════════════════
// STATION (Preset frequencies)
// ═══════════════════════════════════════════════════════════

export interface StationPreset {
  id: string;
  name: string; // "Morning Ritual", "Daily Vibration", etc.
  icon: string; // emoji or icon name
  frequency: FrequencySettings;
}

export interface FrequencySettings {
  mode: 'all' | 'sparks' | 'flames' | 'embers';
  tempo: 'high' | 'medium' | 'low' | 'off';
  source: 'library' | 'voice' | 'both';
}

// ═══════════════════════════════════════════════════════════
// SOUNDTRACK (Manual playlists)
// ═══════════════════════════════════════════════════════════

export interface Soundtrack {
  id: string;
  name: string;
  tracks: SoundBite[];
  createdAt: number;
  shuffle: boolean;
  repeat: boolean;
}

// ═══════════════════════════════════════════════════════════
// STICKYNOTE (Support message)
// ═══════════════════════════════════════════════════════════

export interface Stickynote {
  id: string;
  from: string; // sender name
  message: string;
  audioUrl?: string; // optional audio message
  createdAt: number;
  accepted: boolean;
}

// ═══════════════════════════════════════════════════════════
// PLAYER STATE
// ═══════════════════════════════════════════════════════════

export interface PlayerState {
  // What's playing
  source: SMode; // which S is active
  sourceId: string | null; // specific station/soundtrack/etc ID
  currentTrack: SoundBite | null;
  playlist: SoundBite[];
  currentIndex: number;

  // Playback
  isPlaying: boolean;
  progress: number; // seconds elapsed
  volume: number; // 0-1

  // UI
  isExpanded: boolean;
  activeTab: 'now-playing' | 'switch' | 'settings';
}

// ═══════════════════════════════════════════════════════════
// VOICE NOTE BUCKETS (for "YOUR VOICE")
// ═══════════════════════════════════════════════════════════

export type VoiceBucket = 
  | 'overwhelm'
  | 'physical'
  | 'identity'
  | 'boundaries'
  | 'reflection'
  | 'affirmation';

// ═══════════════════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════════════════

export interface PlayerActions {
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  
  // Source switching
  playStation: (stationId: string) => void;
  playSoundtrack: (soundtrackId: string) => void;
  playStory: () => void;
  playStickynotes: () => void;
  playFromShelf: (soundBite: SoundBite) => void;
  search: (query: string) => void;

  // UI
  toggleExpanded: () => void;
  setActiveTab: (tab: 'now-playing' | 'switch' | 'settings') => void;
}
