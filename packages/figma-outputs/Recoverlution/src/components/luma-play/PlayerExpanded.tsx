/**
 * EXPANDED PLAYER
 * Apple Music style: full-screen focus on what's playing
 * Large artwork, title, controls, scrubber
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, SkipBack, SkipForward, Play, Pause, Volume2, List, Heart, FastForward } from 'lucide-react';
import { useLumaPlayer } from '../../contexts/LumaPlayerContext';
import { PostStateDrawer, PostState } from '../soundbites/PostStateDrawer';

interface PlayerExpandedProps {
  onCollapse: () => void;
}

export function PlayerExpanded({ onCollapse }: PlayerExpandedProps) {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration,
    playlist,
    currentIndex,
    play, 
    pause, 
    next, 
    previous, 
    seek,
    volume,
    setVolume,
    isSaved,
    saveCurrentTrack,
    skipCurrentTrack,
    completeSession,
  } = useLumaPlayer();

  const [showQueue, setShowQueue] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showPostState, setShowPostState] = useState(false);

  if (!currentTrack) {
    return null;
  }

  const handleSave = async () => {
    await saveCurrentTrack();
  };

  const handleSkip = async () => {
    await skipCurrentTrack();
    next();
  };

  const handlePostStateSubmit = async (postState: PostState) => {
    const durationMs = duration * 1000;
    await completeSession(postState, {
      completed: true,
      duration_listened_ms: durationMs,
    });
    setShowPostState(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * duration;
    seek(newTime);
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[10001] flex flex-col"
      style={{
        background: 'linear-gradient(180deg, rgba(62, 43, 184, 0.4) 0%, rgba(0, 0, 0, 0.9) 100%)',
        backdropFilter: 'blur(60px)',
        WebkitBackdropFilter: 'blur(60px)',
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-8 pb-4 flex items-center justify-between">
        <button
          onClick={onCollapse}
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>

        <div className="text-white/70 text-xs uppercase tracking-wider">
          Now Playing
        </div>

        <button
          onClick={() => setShowQueue(!showQueue)}
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <List className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-8 max-w-2xl mx-auto w-full">
        
        {/* Large artwork */}
        <div className="mb-8">
          <div 
            className="w-full aspect-square flex items-center justify-center mx-auto"
            style={{
              maxWidth: '400px',
              background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
              boxShadow: '0 20px 60px rgba(87, 57, 251, 0.4)',
            }}
          >
            <div className="text-white text-8xl uppercase tracking-widest opacity-90">
              {currentTrack.type === 'spark' ? 'S' : currentTrack.type === 'flame' ? 'F' : 'E'}
            </div>
          </div>
        </div>

        {/* Track info */}
        <div className="text-center mb-8">
          <div className="text-white text-2xl mb-2">{currentTrack.title}</div>
          <div className="text-white/60 text-sm">
            {currentTrack.type.toUpperCase()} · {currentTrack.code}
          </div>
        </div>

        {/* Progress scrubber */}
        <div className="mb-8">
          <div 
            className="h-1 bg-white/20 cursor-pointer relative"
            onClick={handleSeek}
          >
            <div 
              className="h-full transition-all"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #3E2BB8, #5739FB)',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-white/50 text-xs">{formatTime(progress)}</div>
            <div className="text-white/50 text-xs">{formatTime(duration)}</div>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <button
            onClick={previous}
            className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-all"
          >
            <SkipBack className="w-7 h-7 text-white fill-white" />
          </button>

          <button
            onClick={isPlaying ? pause : play}
            className="w-16 h-16 flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
              boxShadow: '0 8px 24px rgba(87, 57, 251, 0.4)',
            }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-white" />
            ) : (
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            )}
          </button>

          <button
            onClick={next}
            className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-all"
          >
            <SkipForward className="w-7 h-7 text-white fill-white" />
          </button>
        </div>

        {/* NEW v2.2: Save & Skip buttons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handleSave}
            className="px-6 py-2 flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
            style={{ borderRadius: '20px' }}
          >
            <Heart 
              className="w-5 h-5 text-white" 
              fill={isSaved ? '#fff' : 'none'}
            />
            <span className="text-white text-sm">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleSkip}
            className="px-6 py-2 flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
            style={{ borderRadius: '20px' }}
          >
            <FastForward className="w-5 h-5 text-white" />
            <span className="text-white text-sm">Skip</span>
          </button>

          <button
            onClick={() => setShowPostState(true)}
            className="px-6 py-2 flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
            style={{ borderRadius: '20px' }}
          >
            <span className="text-white text-sm">How do you feel?</span>
          </button>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-3 max-w-md mx-auto w-full">
          <Volume2 className="w-5 h-5 text-white/50" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="flex-1"
            style={{
              height: '4px',
              background: `linear-gradient(to right, #5739FB 0%, #5739FB ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
              outline: 'none',
              appearance: 'none',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* Queue info */}
        {playlist.length > 1 && (
          <div className="text-center mt-6 text-white/40 text-xs">
            Track {currentIndex + 1} of {playlist.length}
          </div>
        )}
      </div>

      {/* Queue overlay (coming soon) */}
      {showQueue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowQueue(false)}
        >
          <div className="text-white/50">Queue view coming soon</div>
        </motion.div>
      )}

      {/* NEW v2.2: Post-State Capture Drawer */}
      <PostStateDrawer
        isOpen={showPostState}
        onClose={() => setShowPostState(false)}
        onSubmit={handlePostStateSubmit}
        soundbiteTitle={currentTrack.title}
      />
    </motion.div>
  );
}