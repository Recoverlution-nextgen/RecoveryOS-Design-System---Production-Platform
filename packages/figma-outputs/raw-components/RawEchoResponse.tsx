/**
 * RAW ECHO RESPONSE - V3 READY
 * Stripped down voice repetition component
 * No dependencies on V2 architecture
 */

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, CheckCircle } from 'lucide-react';

interface RawEchoResponseProps {
  statement: string;
  repetitions?: number;
  onComplete: (count: number) => void;
  primaryColor?: string;
}

export function RawEchoResponse({
  statement,
  repetitions = 3,
  onComplete,
  primaryColor = '#FF6B6B'
}: RawEchoResponseProps) {
  const [currentCount, setCurrentCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (currentCount >= repetitions) {
      setTimeout(() => onComplete(currentCount), 1000);
    }
  }, [currentCount, repetitions, onComplete]);

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
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setCurrentCount(prev => prev + 1);
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const progressPercentage = (currentCount / repetitions) * 100;

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      {/* Statement to repeat */}
      <div style={{
        fontSize: '18px',
        fontWeight: '500',
        marginBottom: '24px',
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        "{statement}"
      </div>

      {/* Progress indicator */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {Array.from({ length: repetitions }, (_, i) => (
            <div
              key={i}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: i < currentCount ? primaryColor : '#E5E7EB',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#6B7280'
        }}>
          {currentCount} of {repetitions} repetitions
        </div>
      </div>

      {/* Recording button */}
      {currentCount < repetitions && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isRecording ? '#EF4444' : primaryColor,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '24px',
              transition: 'all 0.2s ease'
            }}
          >
            {isRecording ? <Square size={32} /> : <Mic size={32} />}
          </button>

          <div style={{
            marginTop: '12px',
            fontSize: '14px',
            color: '#6B7280'
          }}>
            {isRecording ? 'Tap to stop' : 'Tap to record'}
          </div>
        </div>
      )}

      {/* Completion state */}
      {currentCount >= repetitions && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#F0FDF4',
          border: `2px solid ${primaryColor}`,
          borderRadius: '0' // InfiniteK: no rounded corners
        }}>
          <CheckCircle size={48} color={primaryColor} style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#065F46' }}>
            Complete!
          </div>
          <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
            You've embodied this {repetitions} times
          </div>
        </div>
      )}
    </div>
  );
}