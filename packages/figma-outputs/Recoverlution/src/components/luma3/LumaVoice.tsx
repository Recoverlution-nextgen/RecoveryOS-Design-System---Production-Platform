/**
 * LUMA VOICE - Record your thoughts
 * 
 * STRUCTURE (matching PLAY and TALK):
 * - Top: Luma3Header + Navigation + Content Area
 * - Bottom: Fixed Voice Recorder Bar (like player in PLAY, messenger in TALK)
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, FolderOpen, List, Clock, Square, Send, Trash2 } from 'lucide-react';
import { Luma3Header } from './Luma3Header';

interface LumaVoiceProps {
  onClose: () => void;
  onNavigateHome?: () => void;
  onNavigateToPlay?: () => void;
}

const DEFAULT_BACKGROUND = 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/client%20experience/Precision%20practices.avif';

type ActiveView = 'record' | 'buckets' | 'all' | 'recent';

const VOICE_CONTEXTS = [
  { value: 'story', label: 'Story', color: '#8B5CF6', description: 'Decode the narrative' },
  { value: 'vision', label: 'Vision', color: '#3B82F6', description: 'Anything is possible' },
  { value: 'baggage', label: 'Baggage', color: '#10B981', description: 'Take the load off' },
  { value: 'insights', label: 'Insights', color: '#F39C12', description: 'Map the magic' },
  { value: 'heart', label: 'Heart', color: '#EC4899', description: 'Feelings uncover truth' },
  { value: 'space', label: 'Space', color: '#6366F1', description: 'Let it go' },
];

export function LumaVoice({ onClose, onNavigateHome, onNavigateToPlay }: LumaVoiceProps) {
  const [activeView, setActiveView] = useState<ActiveView>('record');
  const [selectedContext, setSelectedContext] = useState('story');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedContextData = VOICE_CONTEXTS.find(c => c.value === selectedContext) || VOICE_CONTEXTS[0];

  // Navigation items
  const navigationItems = [
    { id: 'record' as const, icon: Mic, label: 'Record' },
    { id: 'buckets' as const, icon: FolderOpen, label: 'Buckets' },
    { id: 'all' as const, icon: List, label: 'All' },
    { id: 'recent' as const, icon: Clock, label: 'Recent' },
  ];

  // Start recording
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  // Stop recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Save recording
  const handleSaveRecording = async () => {
    if (!audioBlob) return;

    console.log('Saving recording:', {
      context: selectedContext,
      duration: recordingDuration,
      size: audioBlob.size
    });

    // TODO: Upload to Supabase
    // For now, just reset
    setAudioBlob(null);
    setRecordingDuration(0);
    alert(`Recording saved to ${selectedContextData.label}!`);
  };

  // Discard recording
  const handleDiscardRecording = () => {
    setAudioBlob(null);
    setRecordingDuration(0);
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-black luma-overlay-voice"
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
          title="VOICE"
          showPlayByDefault={false}
          showVoiceByDefault={false}
          onClose={onClose}
        />

        {/* Navigation */}
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

      {/* Content Area - With bottom padding for fixed recorder */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-56 relative z-10 flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          
          {/* RECORD - Context selection and prompt */}
          {activeView === 'record' && (
            <div className="space-y-6">
              {/* Prompt */}
              <div className="luma-glass p-6 text-center">
                <div className="text-white/90 text-lg mb-2">
                  What is present for you right now?
                </div>
                <div className="text-white/50 text-sm">
                  Your thoughts matter. Your voice matters. Record what is true.
                </div>
              </div>

              {/* Context Selector */}
              <div>
                <div className="text-white/70 text-sm mb-3 px-3">Choose your bucket</div>
                <div className="grid grid-cols-2 gap-3">
                  {VOICE_CONTEXTS.map((context) => (
                    <button
                      key={context.value}
                      onClick={() => setSelectedContext(context.value)}
                      className={`luma-glass p-4 text-left transition-all ${
                        selectedContext === context.value 
                          ? 'ring-2 ring-white/30' 
                          : 'hover:bg-white/5'
                      }`}
                      style={
                        selectedContext === context.value
                          ? { borderLeft: `3px solid ${context.color}` }
                          : {}
                      }
                    >
                      <div className="text-white text-sm mb-1">{context.label}</div>
                      <div className="text-white/50 text-xs">{context.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BUCKETS */}
          {activeView === 'buckets' && (
            <div className="space-y-4">
              <div className="text-white/70 text-sm mb-4">Your recordings organized by context</div>
              {VOICE_CONTEXTS.map((context) => (
                <div
                  key={context.value}
                  className="luma-glass p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all"
                  style={{ borderLeft: `3px solid ${context.color}` }}
                >
                  <div>
                    <div className="text-white text-sm mb-1">{context.label}</div>
                    <div className="text-white/50 text-xs">{context.description}</div>
                  </div>
                  <div className="text-white/50 text-xs">0 recordings</div>
                </div>
              ))}
            </div>
          )}

          {/* ALL & RECENT */}
          {(activeView === 'all' || activeView === 'recent') && (
            <div className="luma-glass p-8 text-center">
              <div className="text-white/70 text-sm">
                {activeView === 'all' ? 'All recordings' : 'Recent recordings'}
              </div>
              <div className="text-white/50 text-xs mt-2">
                No recordings yet
              </div>
            </div>
          )}

        </div>
      </div>

      {/* FIXED VOICE RECORDER BAR - Always visible at bottom (like player in PLAY, messenger in TALK) */}
      <div className="fixed bottom-0 left-0 right-0 z-[10000] pointer-events-none">
        <div className="mx-4 mb-4 pointer-events-auto">
          <div 
            className="luma-glass-dark"
            style={{ 
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="px-4 py-3">
              
              {/* NOT RECORDING - Simple mic button */}
              {!isRecording && !audioBlob && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <div 
                      className="w-3 h-3"
                      style={{ backgroundColor: selectedContextData.color }}
                    />
                    <div>
                      <div className="text-white text-sm">Ready to record</div>
                      <div className="text-white/50 text-xs">
                        Recording to {selectedContextData.label}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleStartRecording}
                    className="w-12 h-12 flex items-center justify-center transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${selectedContextData.color}, ${selectedContextData.color}dd)`,
                    }}
                  >
                    <Mic className="w-6 h-6 text-white" />
                  </button>
                </div>
              )}

              {/* RECORDING - Show duration and stop button */}
              {isRecording && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <div 
                      className="w-3 h-3 animate-pulse"
                      style={{ backgroundColor: selectedContextData.color }}
                    />
                    <div>
                      <div className="text-white text-sm">Recording</div>
                      <div className="text-white/50 text-xs">
                        {formatDuration(recordingDuration)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleStopRecording}
                    className="w-12 h-12 bg-red-500 flex items-center justify-center transition-all hover:scale-105"
                  >
                    <Square className="w-6 h-6 text-white" fill="white" />
                  </button>
                </div>
              )}

              {/* RECORDED - Show playback and save/discard options */}
              {audioBlob && !isRecording && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3"
                      style={{ backgroundColor: selectedContextData.color }}
                    />
                    <div className="flex-1">
                      <div className="text-white text-sm">Recording complete</div>
                      <div className="text-white/50 text-xs">
                        {formatDuration(recordingDuration)} • {selectedContextData.label}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDiscardRecording}
                      className="flex-1 bg-white/5 border border-white/10 py-3 flex items-center justify-center gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Discard</span>
                    </button>
                    <button
                      onClick={handleSaveRecording}
                      className="flex-1 py-3 flex items-center justify-center gap-2 text-white transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${selectedContextData.color}, ${selectedContextData.color}dd)`,
                      }}
                    >
                      <Send className="w-4 h-4" />
                      <span className="text-sm">Save to {selectedContextData.label}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}