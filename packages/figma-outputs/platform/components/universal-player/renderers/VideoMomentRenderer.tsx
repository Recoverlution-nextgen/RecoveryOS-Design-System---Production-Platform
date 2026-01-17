/**
 * VIDEO MOMENT RENDERER
 * 
 * Renders AI-extracted video moments (clips, not full videos)
 * Short-form therapeutic content for mobile-first consumption
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, SkipForward, Repeat, Share2, Bookmark } from 'lucide-react';

interface VideoMomentData {
  moment_id: string;
  video_title: string;
  moment_title: string;
  moment_description: string;
  video_url: string;
  start_time: number;
  end_time: number;
  duration: number;
  thumbnail_url?: string;
  pillar_id: string;
  pillar_name: string;
  pillar_color: string;
  tags?: string[];
  transcript?: string;
  key_takeaway?: string;
  instructor?: string;
  ai_extraction_reason?: string;
}

interface VideoMomentRendererProps {
  content: VideoMomentData;
  onResponse?: (response: any) => void;
  onClose?: () => void;
  onNext?: () => void;
}

export function VideoMomentRenderer({ 
  content, 
  onResponse, 
  onClose,
  onNext
}: VideoMomentRendererProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set start time for the moment
      videoRef.current.currentTime = content.start_time;
    }
  }, [content.start_time]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const momentDuration = content.end_time - content.start_time;
      const momentProgress = ((currentTime - content.start_time) / momentDuration) * 100;
      
      setProgress(Math.min(Math.max(momentProgress, 0), 100));

      // Stop at end_time
      if (currentTime >= content.end_time) {
        videoRef.current.pause();
        setIsPlaying(false);
        setHasCompleted(true);
        
        onResponse?.({
          action: 'completed',
          moment_id: content.moment_id,
          watch_time: momentDuration,
          timestamp: new Date().toISOString()
        });
      }
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = content.start_time;
      videoRef.current.play();
      setIsPlaying(true);
      setHasCompleted(false);
      setProgress(0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundColor: '#000000',
        color: 'var(--text-primary)'
      }}
    >
      {/* MOBILE-FIRST VIDEO PLAYER */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* VIDEO */}
        <video
          ref={videoRef}
          src={content.video_url}
          className="w-full h-full object-contain max-h-screen cursor-pointer"
          onTimeUpdate={handleTimeUpdate}
          onClick={handleVideoClick}
          playsInline
        />

        {/* PLAY/PAUSE OVERLAY */}
        {!isPlaying && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
          >
            <div
              className="w-20 h-20 flex items-center justify-center"
              style={{
                backgroundColor: content.pillar_color,
                borderRadius: '50%'
              }}
            >
              <Play className="w-10 h-10 ml-2" style={{ color: '#FFFFFF' }} />
            </div>
          </motion.button>
        )}

        {/* TOP CONTROLS */}
        <div 
          className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)'
          }}
        >
          <div className="flex-1 space-y-1">
            <div className="text-xs uppercase tracking-wider" style={{ color: content.pillar_color }}>
              {content.pillar_name}
            </div>
            <div className="text-lg" style={{ color: '#FFFFFF' }}>
              {content.moment_title}
            </div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {Math.floor(content.duration)}s clip
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* BOTTOM CONTROLS */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 space-y-3"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
          }}
        >
          {/* PROGRESS BAR */}
          <div 
            className="h-1 relative"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            <div
              className="h-full"
              style={{
                backgroundColor: content.pillar_color,
                width: `${progress}%`,
                transition: 'width 0.1s linear'
              }}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between">
            {/* LEFT: Mute */}
            <button
              onClick={handleMuteToggle}
              className="w-10 h-10 flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF'
              }}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* CENTER: Main Action */}
            <div className="flex items-center gap-3">
              {hasCompleted ? (
                <>
                  <button
                    onClick={handleReplay}
                    className="px-6 py-3 flex items-center gap-2"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                      border: 'none'
                    }}
                  >
                    <Repeat className="w-5 h-5" />
                    Replay
                  </button>
                  {onNext && (
                    <button
                      onClick={onNext}
                      className="px-6 py-3 flex items-center gap-2"
                      style={{
                        backgroundColor: content.pillar_color,
                        color: '#FFFFFF',
                        border: 'none'
                      }}
                    >
                      Next
                      <SkipForward className="w-5 h-5" />
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={handlePlayPause}
                  className="w-16 h-16 flex items-center justify-center"
                  style={{
                    backgroundColor: content.pillar_color,
                    borderRadius: '50%',
                    color: '#FFFFFF'
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </button>
              )}
            </div>

            {/* RIGHT: Share & Bookmark */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onResponse?.({
                    action: 'bookmark',
                    moment_id: content.moment_id,
                    timestamp: new Date().toISOString()
                  });
                }}
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  onResponse?.({
                    action: 'share',
                    moment_id: content.moment_id,
                    timestamp: new Date().toISOString()
                  });
                }}
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* KEY TAKEAWAY */}
          {content.key_takeaway && (
            <div
              className="p-3"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: `1px solid ${content.pillar_color}`
              }}
            >
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: content.pillar_color }}>
                Key Takeaway
              </div>
              <div className="text-sm" style={{ color: '#FFFFFF' }}>
                {content.key_takeaway}
              </div>
            </div>
          )}

          {/* TRANSCRIPT TOGGLE */}
          {content.transcript && (
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="w-full p-2 text-sm text-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
            </button>
          )}
        </div>
      </div>

      {/* TRANSCRIPT PANEL */}
      {showTranscript && content.transcript && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="p-6"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            borderTop: `2px solid ${content.pillar_color}`,
            maxHeight: '40vh',
            overflowY: 'auto'
          }}
        >
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="text-xs uppercase tracking-wider" style={{ color: content.pillar_color }}>
              Transcript
            </div>
            <div className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {content.transcript}
            </div>
            {content.instructor && (
              <div className="text-xs pt-3 border-t" style={{ 
                color: 'rgba(255, 255, 255, 0.4)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}>
                Instructor: {content.instructor}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* METADATA FOOTER */}
      <div 
        className="p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {/* DESCRIPTION */}
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {content.moment_description}
          </div>

          {/* AI EXTRACTION REASON */}
          {content.ai_extraction_reason && (
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              💡 Why this moment: {content.ai_extraction_reason}
            </div>
          )}

          {/* TAGS */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {content.tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-2 py-1 text-xs"
                  style={{
                    backgroundColor: `${content.pillar_color}20`,
                    color: content.pillar_color,
                    border: `1px solid ${content.pillar_color}50`
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
