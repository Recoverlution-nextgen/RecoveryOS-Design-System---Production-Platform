/**
 * SOUND BITE CAPTURE - Full-screen voice reflection interface
 * 
 * Contextual recording experience with dropdown contexts:
 * - Open, Thought, Insight, Pain, Story, Question, Gratitude
 * 
 * Creates persistent "Sound Bites" that transcribe and save to backend
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, ChevronDown, Check } from 'lucide-react';
import { SoundBitesLibrary } from './SoundBitesLibrary';

interface SoundBiteCaptureProps {
  onComplete: (soundBite: {
    audio_url: string;
    transcript: string;
    context: string;
    duration: number;
    timestamp: string;
  }) => void;
  onClose: () => void;
  backgroundUrl?: string; // Dynamic background from current NaviCue
}

const CONTEXTS = [
  { value: 'story', label: 'Story', color: '#8B5CF6', description: 'Decode the narrative' },
  { value: 'vision', label: 'Vision', color: '#3B82F6', description: 'Anything is possible' },
  { value: 'baggage', label: 'Baggage', color: '#10B981', description: 'Take the load off' },
  { value: 'insights', label: 'Insights', color: '#F39C12', description: 'Map the magic' },
  { value: 'heart', label: 'Heart', color: '#EC4899', description: 'Feelings uncover truth' },
  { value: 'space', label: 'Space', color: '#6366F1', description: 'Let it go' },
];

export function SoundBiteCapture({ 
  onComplete, 
  onClose,
  backgroundUrl
}: SoundBiteCaptureProps) {
  const [selectedContext, setSelectedContext] = useState('story');
  const [showContextDropdown, setShowContextDropdown] = useState(false);
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'complete'>('idle');
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const selectedContextData = CONTEXTS.find(c => c.value === selectedContext) || CONTEXTS[0];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecordingState('recording');

      // Start timer
      timerRef.current = window.setInterval(() => {
        setDuration(prev => {
          if (prev >= 180) { // 3 minutes max
            handleDone();
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          setPermissionError('Microphone access was denied. Please allow microphone access in your browser settings.');
        } else if (error.name === 'NotFoundError') {
          setPermissionError('No microphone found. Please connect a microphone and try again.');
        } else {
          setPermissionError('Could not access microphone. Please check your browser settings.');
        }
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecordingState('complete');
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleDone = () => {
    stopRecording();
  };

  const handleSave = () => {
    // In Phase 2, this will upload audio, transcribe, and save to backend
    // For now, return mock data
    const mockAudioUrl = 'mock-audio-url.webm';
    const mockTranscript = 'This is a placeholder transcript. The actual transcription will happen in Phase 2 when we integrate with OpenAI Whisper API.';
    
    onComplete({
      audio_url: mockAudioUrl,
      transcript: mockTranscript,
      context: selectedContext,
      duration: duration,
      timestamp: new Date().toISOString()
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col bg-black"
      style={backgroundUrl ? {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      {/* Top nav */}
      <div className="luma-top-nav">
        <div /> {/* Spacer */}
        <button
          onClick={onClose}
          className="luma-icon-button-sm"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-8 overflow-y-auto">
        <div className="max-w-md w-full">
          
          {/* Sound Bites tile at top (only show when idle) */}
          {recordingState === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
              style={{
                padding: '16px 20px',
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0'
              }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 
                  className="text-white/90"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  Sound Bites
                </h3>
                <div className="flex items-center gap-3 text-white/40 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span>127 Total</span>
                  <span>·</span>
                  <span>12 Patterns</span>
                  <span>·</span>
                  <span>5 Themes</span>
                </div>
              </div>

              <p className="text-white/50 text-xs mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Speak what you notice. LUMA connects the dots.
              </p>

              {/* Navigation to deeper views */}
              <button 
                onClick={() => onComplete({ 
                  audio_url: '', 
                  transcript: '', 
                  context: '', 
                  duration: 0,
                  timestamp: new Date().toISOString(),
                  action: 'view_library'
                })}
                className="w-full py-2 text-white/40 hover:text-white/70 hover:bg-white/5 transition-all text-xs border-t border-white/10 pt-3" 
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                View All →
              </button>
            </motion.div>
          )}
          
          {/* Context selector (only show when idle) */}
          {recordingState === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              {/* Hero Headline */}
              <h2 className="luma-title-lg text-center mb-8">
                What are you noticing?
              </h2>
              
              <div className="relative">
                {/* Collapsed state */}
                <button
                  onClick={() => setShowContextDropdown(!showContextDropdown)}
                  className="w-full luma-user"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-left">
                      <span className="luma-body-text">
                        {CONTEXTS.find(c => c.value === selectedContext)?.label}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${showContextDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {showContextDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 luma-glass-dark overflow-hidden z-10"
                    >
                      {CONTEXTS.map((context) => (
                        <button
                          key={context.value}
                          onClick={() => {
                            setSelectedContext(context.value);
                            setShowContextDropdown(false);
                          }}
                          className="w-full px-5 py-4 flex items-start gap-3 hover:bg-white/5 transition-all border-b border-white/10 last:border-b-0"
                        >
                          <div 
                            className="luma-pillar-dot mt-1.5"
                            style={{ backgroundColor: context.color }}
                          />
                          <div className="text-left flex-1">
                            <div className="luma-label text-white mb-1">
                              {context.label}
                            </div>
                            <div className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                              {context.description}
                            </div>
                          </div>
                          {context.value === selectedContext && (
                            <Check className="w-4 h-4 text-white/60 mt-1" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Permission Error */}
          {permissionError && (
            <div className="text-center">
              <div className="w-24 h-24 bg-white/10 mx-auto mb-6 flex items-center justify-center shadow-2xl border border-white/20">
                <Mic className="w-12 h-12 text-white/40" />
              </div>

              <p className="text-white text-xl mb-2" style={{ fontWeight: 600 }}>
                Microphone Access Needed
              </p>

              <p className="text-white/60 text-sm mb-8 max-w-sm mx-auto">
                {permissionError}
              </p>

              <button
                onClick={() => {
                  setPermissionError(null);
                  startRecording();
                }}
                className="w-full py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white mb-3 shadow-2xl hover:shadow-[0_0_30px_rgba(62,43,184,0.3)] transition-all"
                style={{ borderRadius: '0px', fontWeight: 600 }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Idle state - Hold to record */}
          {recordingState === 'idle' && !permissionError && (
            <div className="text-center">
              <button
                onMouseDown={startRecording}
                onTouchStart={startRecording}
                className="w-32 h-32 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] mx-auto mb-8 flex items-center justify-center shadow-2xl hover:shadow-[0_0_40px_rgba(62,43,184,0.4)] transition-all active:scale-95 backdrop-blur-24"
                style={{ borderRadius: '0px', backdropFilter: 'blur(24px)' }}
              >
                <Mic className="w-16 h-16 text-white" />
              </button>

              <p 
                className="text-white/80 text-lg"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                Press and hold to record
              </p>
            </div>
          )}

          {/* Recording state */}
          {recordingState === 'recording' && (
            <div className="text-center">
              {/* Pulsing indicator with context color */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut'
                }}
                className="w-32 h-32 mx-auto mb-6 flex items-center justify-center shadow-2xl border-4"
                style={{ 
                  borderRadius: '0px',
                  backgroundColor: selectedContextData.color,
                  borderColor: selectedContextData.color
                }}
              >
                <Mic className="w-16 h-16 text-white" />
              </motion.div>

              {/* Waveform visualization */}
              <div className="flex gap-1 justify-center mb-8 h-20 items-end">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1"
                    style={{ 
                      borderRadius: '0px',
                      backgroundColor: selectedContextData.color,
                      opacity: 0.8
                    }}
                    animate={{
                      height: [
                        `${Math.random() * 40 + 10}px`,
                        `${Math.random() * 60 + 20}px`,
                        `${Math.random() * 40 + 10}px`
                      ]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: i * 0.02,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </div>

              {/* Duration */}
              <p
                className="text-white text-4xl mb-12"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
              >
                {formatTime(duration)}
              </p>

              {/* Context badge */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div 
                  className="w-2 h-2"
                  style={{ 
                    backgroundColor: selectedContextData.color,
                    borderRadius: '0px'
                  }}
                />
                <span 
                  className="text-white/60 text-sm uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  {selectedContextData.label}
                </span>
              </div>

              {/* Stop recording button */}
              <button
                onClick={handleDone}
                className="w-full py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white shadow-2xl hover:shadow-[0_0_30px_rgba(62,43,184,0.3)] transition-all"
                style={{ borderRadius: '0px', fontWeight: 600 }}
              >
                Done Recording
              </button>
            </div>
          )}

          {/* Complete state */}
          {recordingState === 'complete' && audioBlob && (
            <div className="text-center">
              <div 
                className="w-32 h-32 mx-auto mb-6 flex items-center justify-center shadow-2xl"
                style={{ 
                  borderRadius: '0px',
                  backgroundColor: selectedContextData.color
                }}
              >
                <Check className="w-16 h-16 text-white" />
              </div>

              <p className="text-white text-xl mb-2" style={{ fontWeight: 600 }}>
                Sound Bite captured
              </p>

              <p className="text-white/60 text-sm mb-2">
                {formatTime(duration)} recorded
              </p>

              {/* Context badge */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div 
                  className="w-2 h-2"
                  style={{ 
                    backgroundColor: selectedContextData.color,
                    borderRadius: '0px'
                  }}
                />
                <span 
                  className="text-white/60 text-sm uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  {selectedContextData.label}
                </span>
              </div>

              {/* Save button */}
              <button
                onClick={handleSave}
                className="w-full py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white mb-3 shadow-2xl hover:shadow-[0_0_30px_rgba(62,43,184,0.3)] transition-all"
                style={{ borderRadius: '0px', fontWeight: 600 }}
              >
                Save to Thread
              </button>

              {/* Re-record button */}
              <button
                onClick={() => {
                  setAudioBlob(null);
                  setDuration(0);
                  setRecordingState('idle');
                }}
                className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all"
                style={{ borderRadius: '0px', fontWeight: 600, fontSize: '0.875rem' }}
              >
                Re-record
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}