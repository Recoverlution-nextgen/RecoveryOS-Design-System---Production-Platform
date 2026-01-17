/**
 * NAVICUE RENDERER
 * Polymorphic content renderer based on modality
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { NaviCue } from '../../lib/navicues/types';

interface NaviCueRendererProps {
  navicue: NaviCue;
  onContentComplete?: () => void;
}

export function NaviCueRenderer({ navicue, onContentComplete }: NaviCueRendererProps) {
  switch (navicue.modality) {
    case 'text':
      return <TextContent navicue={navicue} />;
    
    case 'audio':
      return <AudioContent navicue={navicue} onComplete={onContentComplete} />;
    
    case 'video':
      return <VideoContent navicue={navicue} onComplete={onContentComplete} />;
    
    case 'soundbite':
      return <SoundbiteContent navicue={navicue} onComplete={onContentComplete} />;
    
    case 'interactive':
      return <InteractiveContent navicue={navicue} />;
    
    default:
      return <TextContent navicue={navicue} />;
  }
}

// ============================================================================
// TEXT CONTENT
// ============================================================================

function TextContent({ navicue }: { navicue: NaviCue }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto px-6"
    >
      {/* Pillar label */}
      <div className="mb-4 flex items-center gap-2">
        <div 
          className="w-1 h-4" 
          style={{ backgroundColor: navicue.pillar_color }}
        />
        <span 
          className="text-sm uppercase tracking-wider"
          style={{ color: navicue.pillar_color }}
        >
          {navicue.pillar_name}
        </span>
      </div>

      {/* Text content */}
      <p className="text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed">
        {navicue.text_line}
      </p>

      {/* Theme tag (if present) */}
      {navicue.theme_name && (
        <div className="mt-6">
          <span className="text-sm text-white/50 uppercase tracking-wide">
            {navicue.theme_name}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// AUDIO CONTENT
// ============================================================================

function AudioContent({ navicue, onComplete }: { navicue: NaviCue; onComplete?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!navicue.audio_asset) return;

    const audio = new Audio(navicue.audio_asset);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      onComplete?.();
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [navicue.audio_asset, onComplete]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto px-6"
    >
      {/* Text */}
      <div className="mb-8">
        <TextContent navicue={navicue} />
      </div>

      {/* Audio player */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6">
        {/* Play button */}
        <button
          onClick={togglePlayPause}
          className="w-16 h-16 mx-auto mb-4 bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors flex items-center justify-center"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </button>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 mb-2">
          <motion.div
            className="h-full bg-[#5739FB]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* Time */}
        <div className="flex justify-between text-xs text-white/50">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// VIDEO CONTENT
// ============================================================================

function VideoContent({ navicue, onComplete }: { navicue: NaviCue; onComplete?: () => void }) {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      onComplete?.();
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full"
    >
      <video
        ref={videoRef}
        src={navicue.video_asset}
        className="w-full h-full object-cover"
        autoPlay
        loop={false}
        muted={isMuted}
        playsInline
      />

      {/* Mute toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 bg-black/50 p-3 text-white hover:bg-black/70 transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Text overlay */}
      {navicue.text_line && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="text-white text-xl md:text-2xl">
            {navicue.text_line}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// SOUNDBITE CONTENT
// ============================================================================

function SoundbiteContent({ navicue, onComplete }: { navicue: NaviCue; onComplete?: () => void }) {
  // TODO: Integrate with soundbite player
  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <TextContent navicue={navicue} />
      <div className="mt-6 p-4 bg-white/5 border border-white/10 backdrop-blur-lg text-center">
        <p className="text-white/70 text-sm">
          Soundbite player (coming soon)
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE CONTENT
// ============================================================================

function InteractiveContent({ navicue }: { navicue: NaviCue }) {
  // TODO: Render interactive component
  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <TextContent navicue={navicue} />
      <div className="mt-6 p-4 bg-white/5 border border-white/10 backdrop-blur-lg text-center">
        <p className="text-white/70 text-sm">
          Interactive component (coming soon)
        </p>
      </div>
    </div>
  );
}
