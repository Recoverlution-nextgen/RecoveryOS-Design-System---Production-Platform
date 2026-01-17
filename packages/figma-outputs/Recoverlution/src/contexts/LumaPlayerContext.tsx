/**
 * LUMA PLAYER CONTEXT v2.2
 * Global state management for audio playback across all 6 S's
 * 
 * NEW v2.1: Full session lifecycle tracking with PATCH on completion
 * - Creates session on playback start (POST)
 * - Updates session on completion (PATCH)
 * - Tracks behavioral signals (saved, skipped, looped)
 * 
 * NEW v2.2: Behavioral tracking and actions
 * - Tracks if the current track is saved
 * - Tracks loop count
 * - Provides actions to save, skip, mark as leading to practice, mark as leading to receipt, and show post-state capture
 */

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { LibraryTrack } from '../utils/supabase/soundbites';
import { 
  createPlaybackSession, 
  updatePlaybackSession,
  PlaybackSessionRequest,
  SessionUpdateRequest,
} from '../utils/supabase/soundbites';

interface PlayerTrack {
  id: string;
  title: string;
  audioUrl: string;
  type: 'spark' | 'flame' | 'ember';
  pillarId: string;
  code: string;
}

interface PlayerContextValue {
  // Current state
  currentTrack: PlayerTrack | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  
  // Playlist
  playlist: PlayerTrack[];
  currentIndex: number;
  
  // NEW: Session tracking
  currentSession: { id: string; started_at: string } | null;
  
  // NEW v2.2: Behavioral tracking
  isSaved: boolean;
  loopCount: number;
  
  // Actions
  playTrack: (track: LibraryTrack, context?: { intent?: string; band?: number; preState?: any; whyNow?: any }) => void;
  playPlaylist: (tracks: LibraryTrack[], startIndex?: number) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  
  // NEW v2.1: Complete session (when track ends or user finishes)
  completeSession: (postState?: any, metrics?: any) => Promise<void>;
  
  // NEW v2.2: Behavioral actions
  saveCurrentTrack: () => Promise<void>;
  skipCurrentTrack: () => Promise<void>;
  markLedToPractice: () => Promise<void>;
  markLedToReceipt: () => Promise<void>;
  showPostStateCapture: () => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function LumaPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<PlayerTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [playlist, setPlaylist] = useState<PlayerTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // NEW: Session tracking
  const [currentSession, setCurrentSession] = useState<{ id: string; started_at: string } | null>(null);
  
  // NEW v2.2: Behavioral tracking
  const [isSaved, setIsSaved] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    const audio = audioRef.current;
    
    // Event listeners
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = async () => {
      // NEW v2.2: Auto-complete session on track end
      if (currentSession) {
        const durationMs = duration * 1000;
        await completeSession(null, {
          completed: true,
          skipped: false,
          duration_listened_ms: durationMs,
        });
      }
      
      // Auto-play next track
      handleNext();
    };
    
    const handleError = (e: ErrorEvent) => {
      console.error('[Player] Audio error:', e);
      setIsPlaying(false);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError as any);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError as any);
      audio.pause();
    };
  }, [currentSession, duration]);

  // Convert LibraryTrack to PlayerTrack
  const convertTrack = (track: LibraryTrack): PlayerTrack => ({
    id: track.id,
    title: track.title,
    audioUrl: track.audioUrl || '',
    type: track.type,
    pillarId: track.pillarId,
    code: track.code,
  });

  const playTrack = (track: LibraryTrack, context?: { intent?: string; band?: number; preState?: any; whyNow?: any }) => {
    if (!track.audioUrl) {
      console.error('[Player] Track has no audio URL:', track);
      return;
    }
    
    // NEW v2.2: Reset behavioral state for new track
    setIsSaved(false);
    setLoopCount(0);
    
    const playerTrack = convertTrack(track);
    setCurrentTrack(playerTrack);
    setPlaylist([playerTrack]);
    setCurrentIndex(0);
    
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log('[Player] Playing:', track.title);
          
          // NEW: Create playback session
          const sessionRequest: PlaybackSessionRequest = {
            soundbite_asset_id: track.id,
            intent: context?.intent || null,
            band: context?.band || null,
            pre_state: context?.preState || null,
            why_now: context?.whyNow || null,
            device: 'web',
            app_version: '2.0',
          };
          createPlaybackSession(sessionRequest)
            .then(session => {
              if (session) {
                setCurrentSession(session);
                console.log('[Player] Session created:', session.id);
              }
            })
            .catch(err => {
              console.error('[Player] Failed to create playback session:', err);
            });
        })
        .catch(err => {
          console.error('[Player] Play error:', err);
          setIsPlaying(false);
        });
    }
  };

  const playPlaylist = (tracks: LibraryTrack[], startIndex: number = 0) => {
    const playerTracks = tracks
      .filter(t => t.audioUrl)
      .map(convertTrack);
    
    if (playerTracks.length === 0) {
      console.error('[Player] No valid tracks in playlist');
      return;
    }
    
    setPlaylist(playerTracks);
    setCurrentIndex(startIndex);
    
    const trackToPlay = playerTracks[startIndex];
    setCurrentTrack(trackToPlay);
    
    if (audioRef.current) {
      audioRef.current.src = trackToPlay.audioUrl;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log('[Player] Playing playlist from index', startIndex);
        })
        .catch(err => {
          console.error('[Player] Play error:', err);
          setIsPlaying(false);
        });
    }
  };

  const play = () => {
    if (audioRef.current && currentTrack) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('[Player] Play error:', err));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    
    const nextTrack = playlist[nextIndex];
    setCurrentTrack(nextTrack);
    
    if (audioRef.current) {
      audioRef.current.src = nextTrack.audioUrl;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('[Player] Next track error:', err));
    }
  };

  const handlePrevious = () => {
    if (playlist.length === 0) return;
    
    // If more than 3 seconds in, restart current track
    if (progress > 3) {
      seek(0);
      return;
    }
    
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    
    const prevTrack = playlist[prevIndex];
    setCurrentTrack(prevTrack);
    
    if (audioRef.current) {
      audioRef.current.src = prevTrack.audioUrl;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('[Player] Previous track error:', err));
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  // NEW: Complete session (when track ends or user finishes)
  const completeSession = async (postState?: any, metrics?: any) => {
    if (!currentSession) {
      console.warn('[Player] No active session to complete');
      return;
    }

    const updateRequest: SessionUpdateRequest = {
      ended_at: new Date().toISOString(),
      post_state: postState || null,
      metrics: metrics || null,
      device: 'web',
      app_version: '2.1',
    };

    try {
      await updatePlaybackSession(currentSession.id, updateRequest);
      console.log('[Player] Session completed:', currentSession.id);
    } catch (err) {
      console.error('[Player] Failed to complete session:', err);
    }

    setCurrentSession(null);
  };

  // NEW v2.2: Behavioral actions
  const saveCurrentTrack = async () => {
    if (!currentSession) {
      console.warn('[Player] No active session to save track');
      return;
    }

    const updateRequest: SessionUpdateRequest = {
      metrics: {
        saved: true,
      },
      device: 'web',
      app_version: '2.2',
    };

    try {
      await updatePlaybackSession(currentSession.id, updateRequest);
      console.log('[Player] Track saved:', currentSession.id);
      setIsSaved(true);
    } catch (err) {
      console.error('[Player] Failed to save track:', err);
    }
  };

  const skipCurrentTrack = async () => {
    if (!currentSession) {
      console.warn('[Player] No active session to skip track');
      return;
    }

    const durationListened = audioRef.current ? audioRef.current.currentTime * 1000 : 0;
    const progressPercent = duration > 0 ? progress / duration : 0;

    const updateRequest: SessionUpdateRequest = {
      ended_at: new Date().toISOString(),
      metrics: {
        skipped: true,
        completed: progressPercent >= 0.8,
        duration_listened_ms: durationListened,
      },
      device: 'web',
      app_version: '2.2',
    };

    try {
      await updatePlaybackSession(currentSession.id, updateRequest);
      console.log('[Player] Track skipped:', currentSession.id);
      setCurrentSession(null);
    } catch (err) {
      console.error('[Player] Failed to skip track:', err);
    }
  };

  const markLedToPractice = async () => {
    if (!currentSession) {
      console.warn('[Player] No active session to mark as leading to practice');
      return;
    }

    const updateRequest: SessionUpdateRequest = {
      metrics: {
        led_to_practice: true,
      },
      device: 'web',
      app_version: '2.2',
    };

    try {
      await updatePlaybackSession(currentSession.id, updateRequest);
      console.log('[Player] Track marked as leading to practice:', currentSession.id);
    } catch (err) {
      console.error('[Player] Failed to mark track as leading to practice:', err);
    }
  };

  const markLedToReceipt = async () => {
    if (!currentSession) {
      console.warn('[Player] No active session to mark as leading to receipt');
      return;
    }

    const updateRequest: SessionUpdateRequest = {
      metrics: {
        led_to_receipt: true,
      },
      device: 'web',
      app_version: '2.2',
    };

    try {
      await updatePlaybackSession(currentSession.id, updateRequest);
      console.log('[Player] Track marked as leading to receipt:', currentSession.id);
    } catch (err) {
      console.error('[Player] Failed to mark track as leading to receipt:', err);
    }
  };

  const showPostStateCapture = () => {
    // Implement logic to show post-state capture UI
    console.log('[Player] Show post-state capture');
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        playlist,
        currentIndex,
        playTrack,
        playPlaylist,
        play,
        pause,
        next: handleNext,
        previous: handlePrevious,
        seek,
        setVolume,
        currentSession,
        completeSession,
        isSaved,
        loopCount,
        saveCurrentTrack,
        skipCurrentTrack,
        markLedToPractice,
        markLedToReceipt,
        showPostStateCapture,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function useLumaPlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('useLumaPlayer must be used within LumaPlayerProvider');
  }
  return context;
}