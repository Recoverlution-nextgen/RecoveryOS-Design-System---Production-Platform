/**
 * ECHO Response Component
 * 
 * Repeat affirmation multiple times via voice
 * Psychology: Repetition creates neural pathways, speaking = embodiment
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, Square, CheckCircle } from 'lucide-react';

interface EchoResponseProps {
  statement: string;
  repetitions?: number;
  onRespond: (count: number) => void;
  pillarColor: string;
}

export function EchoResponse({
  statement,
  repetitions = 3,
  onRespond,
  pillarColor
}: EchoResponseProps) {
  const [currentCount, setCurrentCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (currentCount >= repetitions) {
      setTimeout(() => {
        onRespond(currentCount);
      }, 1000);
    }
  }, [currentCount, repetitions, onRespond]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedBlobs(prev => [...prev, blob]);
        setCurrentCount(prev => prev + 1);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="space-y-8">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        Say this {repetitions} times
      </div>

      {/* Statement to repeat */}
      <div 
        className="text-center text-2xl text-white p-6 border-2"
        style={{
          borderRadius: '0px',
          borderColor: pillarColor,
          backgroundColor: `${pillarColor}10`,
          fontFamily: 'var(--font-display)',
          fontWeight: 600
        }}
      >
        "{statement}"
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <div className="text-center">
          <div 
            className="text-5xl mb-2"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: pillarColor
            }}
          >
            {currentCount} / {repetitions}
          </div>
          <div className="text-white/60 text-sm">
            {currentCount >= repetitions ? 'Complete!' : 'Keep going'}
          </div>
        </div>

        {/* Visual repetition tracker */}
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: repetitions }).map((_, idx) => (
            <motion.div
              key={idx}
              className="w-12 h-12 border-2 flex items-center justify-center"
              style={{
                borderRadius: '0px',
                borderColor: idx < currentCount ? pillarColor : 'rgba(255,255,255,0.2)',
                backgroundColor: idx < currentCount ? `${pillarColor}20` : 'transparent'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: idx === currentCount ? 1.1 : 1, 
                opacity: 1 
              }}
              transition={{ delay: idx * 0.1 }}
            >
              {idx < currentCount && (
                <CheckCircle 
                  className="w-6 h-6"
                  style={{ color: pillarColor }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Record button */}
      {currentCount < repetitions && (
        <div className="flex items-center justify-center">
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 flex items-center justify-center transition-colors"
            style={{
              borderRadius: '0px',
              backgroundColor: isRecording ? '#EF4444' : pillarColor,
            }}
          >
            {isRecording ? (
              <Square className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
}
