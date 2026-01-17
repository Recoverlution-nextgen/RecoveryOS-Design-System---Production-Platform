/**
 * PROFESSIONAL MESSAGE RENDERER
 * 
 * Renders messages from professionals (voice/text/video)
 * Includes Affective Compiler analysis and tone indicators
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, MessageSquare, Video, AlertCircle } from 'lucide-react';

interface ProfessionalMessageData {
  message_id: string;
  professional_name: string;
  professional_title: string;
  message_type: 'text' | 'voice' | 'video';
  content: string;
  audio_url?: string;
  video_url?: string;
  sent_at: string;
  affective_analysis?: {
    tone: 'supportive' | 'directive' | 'neutral' | 'concern';
    warmth_score: number;
    clarity_score: number;
    suggestions?: string[];
  };
  context?: string;
}

interface ProfessionalMessageRendererProps {
  content: ProfessionalMessageData;
  onResponse?: (response: any) => void;
  onClose?: () => void;
}

export function ProfessionalMessageRenderer({ 
  content, 
  onResponse, 
  onClose 
}: ProfessionalMessageRendererProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getToneColor = (tone?: string) => {
    switch (tone) {
      case 'supportive': return '#10B981';
      case 'directive': return '#5739FB';
      case 'concern': return '#F59E0B';
      case 'neutral': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const handlePlayPause = () => {
    if (content.message_type === 'voice' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (content.message_type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioProgress(0);
  };

  return (
    <div 
      className="min-h-screen p-8"
      style={{ 
        backgroundColor: 'var(--portal-bg)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl" style={{ color: '#FFFFFF' }}>
              Message from {content.professional_name}
            </h1>
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                Close
              </button>
            )}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {content.professional_title}
          </div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            {new Date(content.sent_at).toLocaleString()}
          </div>
        </motion.div>

        {/* CONTEXT (if provided) */}
        {content.context && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              borderRadius: '0'
            }}
          >
            <div className="text-sm uppercase tracking-wider mb-2" style={{ color: '#5739FB' }}>
              Context
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {content.context}
            </div>
          </motion.div>
        )}

        {/* MESSAGE CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-8 space-y-6"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0'
          }}
        >
          {/* TEXT MESSAGE */}
          {content.message_type === 'text' && (
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#5739FB' }} />
              <div className="text-lg leading-relaxed" style={{ color: '#FFFFFF' }}>
                {content.content}
              </div>
            </div>
          )}

          {/* VOICE MESSAGE */}
          {content.message_type === 'voice' && content.audio_url && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Volume2 className="w-6 h-6" style={{ color: '#5739FB' }} />
                <div className="text-lg" style={{ color: '#FFFFFF' }}>
                  Voice Message
                </div>
              </div>
              
              {/* Audio Player */}
              <div className="space-y-3">
                <audio
                  ref={audioRef}
                  src={content.audio_url}
                  onTimeUpdate={handleAudioTimeUpdate}
                  onEnded={handleAudioEnded}
                  style={{ display: 'none' }}
                />
                
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="w-16 h-16 flex items-center justify-center"
                  style={{
                    backgroundColor: '#5739FB',
                    border: 'none',
                    color: '#FFFFFF'
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </button>

                {/* Progress Bar */}
                <div 
                  className="h-2 relative"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0'
                  }}
                >
                  <div
                    className="h-full"
                    style={{
                      backgroundColor: '#5739FB',
                      width: `${audioProgress}%`,
                      transition: 'width 0.1s linear'
                    }}
                  />
                </div>
              </div>

              {/* Transcript */}
              {content.content && (
                <div className="mt-4 p-4" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0'
                }}>
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    Transcript
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {content.content}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIDEO MESSAGE */}
          {content.message_type === 'video' && content.video_url && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Video className="w-6 h-6" style={{ color: '#5739FB' }} />
                <div className="text-lg" style={{ color: '#FFFFFF' }}>
                  Video Message
                </div>
              </div>
              
              <video
                ref={videoRef}
                src={content.video_url}
                controls
                className="w-full"
                style={{
                  backgroundColor: '#000000',
                  maxHeight: '400px'
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          )}
        </motion.div>

        {/* AFFECTIVE COMPILER ANALYSIS */}
        {content.affective_analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 space-y-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${getToneColor(content.affective_analysis.tone)}`,
              borderRadius: '0'
            }}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" style={{ color: getToneColor(content.affective_analysis.tone) }} />
              <div className="text-sm uppercase tracking-wider" style={{ color: getToneColor(content.affective_analysis.tone) }}>
                Tone Analysis
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Tone */}
              <div>
                <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  Overall Tone
                </div>
                <div className="text-lg capitalize" style={{ color: getToneColor(content.affective_analysis.tone) }}>
                  {content.affective_analysis.tone}
                </div>
              </div>

              {/* Warmth */}
              <div>
                <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  Warmth
                </div>
                <div className="text-lg" style={{ color: '#FFFFFF' }}>
                  {content.affective_analysis.warmth_score}/10
                </div>
              </div>

              {/* Clarity */}
              <div>
                <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  Clarity
                </div>
                <div className="text-lg" style={{ color: '#FFFFFF' }}>
                  {content.affective_analysis.clarity_score}/10
                </div>
              </div>
            </div>

            {/* Suggestions */}
            {content.affective_analysis.suggestions && content.affective_analysis.suggestions.length > 0 && (
              <div className="pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  Suggestions for Response
                </div>
                <div className="space-y-2">
                  {content.affective_analysis.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      • {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center pt-4"
        >
          <button
            onClick={() => {
              onResponse?.({ 
                action: 'acknowledged',
                message_id: content.message_id,
                timestamp: new Date().toISOString() 
              });
              onClose?.();
            }}
            className="px-6 py-3"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF'
            }}
          >
            Mark as Read
          </button>
          <button
            onClick={() => {
              onResponse?.({ 
                action: 'reply',
                message_id: content.message_id,
                timestamp: new Date().toISOString() 
              });
              // In real implementation, this would open reply interface
              console.log('Open reply interface');
            }}
            className="px-6 py-3"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
              border: 'none'
            }}
          >
            Reply
          </button>
        </motion.div>
      </div>
    </div>
  );
}
