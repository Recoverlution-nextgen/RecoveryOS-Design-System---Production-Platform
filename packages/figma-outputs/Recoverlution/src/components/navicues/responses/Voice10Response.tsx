/**
 * VOICE10 Response Component
 * 
 * 10-second voice recording with waveform visualization
 * Psychology: Verbal processing activates different brain pathways
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, Play, Square } from 'lucide-react';

interface Voice10ResponseProps {
  onRespond: (audioData: { blob: Blob; duration: number }) => void;
  maxDuration?: number;
  showWaveform?: boolean;
  allowPlayback?: boolean;
}

export function Voice10Response({ 
  onRespond, 
  maxDuration = 10,
  showWaveform = true,
  allowPlayback = true
}: Voice10ResponseProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(new Array(20).fill(0));
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio context for waveform
      if (showWaveform) {
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 64;
        updateWaveform();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration - 0.1) {
            stopRecording();
            return maxDuration;
          }
          return prev + 0.1;
        });
      }, 100);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  };

  const updateWaveform = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Sample every few values for display
    const samples = [];
    for (let i = 0; i < 20; i++) {
      const idx = Math.floor((dataArray.length / 20) * i);
      samples.push(dataArray[idx] / 255);
    }
    setWaveformData(samples);
    
    if (isRecording) {
      requestAnimationFrame(updateWaveform);
    }
  };

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };
    }
  };

  const handleContinue = () => {
    if (audioBlob) {
      onRespond({ blob: audioBlob, duration: recordingTime });
    }
  };

  return (
    <div className="space-y-6">
      {/* Timer display */}
      <div className="text-center">
        <div className="text-white/60 text-sm mb-2 uppercase tracking-wider">
          {isRecording ? 'Recording...' : audioBlob ? 'Recording Complete' : 'Speak Your Truth'}
        </div>
        <div 
          className="text-5xl text-white"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
        >
          {recordingTime.toFixed(1)}s
        </div>
        <div className="text-white/40 text-sm mt-1">
          / {maxDuration.toFixed(1)}s
        </div>
      </div>

      {/* Waveform visualization */}
      {showWaveform && (
        <div className="flex items-end justify-center gap-1 h-24">
          {waveformData.map((amplitude, idx) => (
            <motion.div
              key={idx}
              className="w-2 bg-white/60"
              style={{ borderRadius: '0px' }}
              animate={{
                height: isRecording 
                  ? `${Math.max(amplitude * 100, 10)}%` 
                  : '10%'
              }}
              transition={{
                duration: 0.1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {!audioBlob ? (
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 flex items-center justify-center transition-colors"
            style={{
              borderRadius: '0px',
              backgroundColor: isRecording ? '#EF4444' : 'rgba(255, 255, 255, 0.2)',
            }}
          >
            {isRecording ? (
              <Square className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </motion.button>
        ) : (
          <>
            {allowPlayback && (
              <motion.button
                onClick={playRecording}
                whileTap={{ scale: 0.95 }}
                disabled={isPlaying}
                className="w-16 h-16 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors disabled:opacity-50"
                style={{ borderRadius: '0px' }}
              >
                <Play className="w-6 h-6 text-white" />
              </motion.button>
            )}
            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white transition-colors"
              style={{
                borderRadius: '0px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600
              }}
            >
              Continue
            </button>
          </>
        )}
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
}
