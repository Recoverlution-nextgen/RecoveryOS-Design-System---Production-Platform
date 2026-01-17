/**
 * Journey Reflection Input - infiniteK Design System
 * Voice recording and text input for reflection
 * THE ANCHOR RULE: NO CARD ON CARD
 */

import { useState, useRef, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';

interface JourneyReflectionInputProps {
  value: string;
  onChange: (value: string) => void;
  onVoiceRecording?: (audioBlob: Blob) => void;
  prompts: string[];
}

export function JourneyReflectionInput({
  value,
  onChange,
  onVoiceRecording,
  prompts
}: JourneyReflectionInputProps) {
  const [mode, setMode] = useState<'text' | 'voice'>('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        
        if (onVoiceRecording) {
          onVoiceRecording(audioBlob);
        }
        
        setIsTranscribing(true);
        setTimeout(() => {
          onChange('[Voice recording captured - transcription pending]');
          setIsTranscribing(false);
        }, 1000);
      };
      
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      // Handle microphone access errors gracefully
      setPermissionError('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Prompts */}
      <div style={{ marginBottom: 'clamp(20px, 4vw, 28px)' }}>
        {prompts.map((prompt, index) => (
          <p key={index} className="journey-reflection-label">
            {prompt}
          </p>
        ))}
      </div>

      {/* Mode Toggle */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: 'clamp(20px, 4vw, 24px)'
      }}>
        <button
          onClick={() => setMode('voice')}
          disabled={isRecording}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: 'clamp(14px, 3vw, 16px) clamp(20px, 4vw, 24px)',
            background: mode === 'voice' 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.14) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            border: mode === 'voice' ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid rgba(255, 255, 255, 0.18)',
            color: '#FFFFFF',
            fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
            fontWeight: 600,
            letterSpacing: '0.015em',
            cursor: isRecording ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isRecording && mode !== 'voice' ? 0.5 : 1,
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            boxShadow: mode === 'voice'
              ? '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
              : '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => {
            if (!isRecording && mode !== 'voice') {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.1) 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'voice') {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)';
            }
          }}
        >
          <Mic size={18} />
          Voice
        </button>

        <button
          onClick={() => setMode('text')}
          disabled={isRecording}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: 'clamp(14px, 3vw, 16px) clamp(20px, 4vw, 24px)',
            background: mode === 'text' 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.14) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            border: mode === 'text' ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid rgba(255, 255, 255, 0.18)',
            color: '#FFFFFF',
            fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
            fontWeight: 600,
            letterSpacing: '0.015em',
            cursor: isRecording ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isRecording && mode !== 'text' ? 0.5 : 1,
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            boxShadow: mode === 'text'
              ? '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
              : '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => {
            if (!isRecording && mode !== 'text') {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.1) 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'text') {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)';
            }
          }}
        >
          Write
        </button>
      </div>

      {/* Voice Mode */}
      {mode === 'voice' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          padding: 'clamp(32px, 6vw, 48px) clamp(24px, 5vw, 32px)',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.08) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '4px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          minHeight: '200px',
          justifyContent: 'center'
        }}>
          {permissionError ? (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                backdropFilter: 'blur(50px)',
                WebkitBackdropFilter: 'blur(50px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
              }}>
                <Mic size={36} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
              </div>

              <p style={{ 
                color: 'rgba(255, 255, 255, 0.85)', 
                margin: 0, 
                textAlign: 'center',
                fontSize: 'clamp(0.875rem, 1.875vw, 1rem)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
                maxWidth: '300px'
              }}>
                {permissionError}
              </p>

              <button
                onClick={() => {
                  setPermissionError(null);
                  startRecording();
                }}
                className="journey-btn journey-btn-primary"
                style={{ width: 'auto', minWidth: '180px' }}
              >
                Try Again
              </button>
            </>
          ) : isTranscribing ? (
            <>
              <div style={{
                width: '48px',
                height: '48px',
                border: '3px solid rgba(255, 255, 255, 0.2)',
                borderTopColor: '#FFFFFF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0, textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)' }}>
                Processing your voice...
              </p>
            </>
          ) : isRecording ? (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.15) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(239, 68, 68, 0.4)',
                boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>
                <Mic size={36} style={{ color: '#EF4444' }} />
              </div>
              
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#FFFFFF',
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
              }}>
                {formatTime(recordingTime)}
              </div>

              <button
                onClick={stopRecording}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: 'clamp(14px, 3vw, 16px) clamp(28px, 5vw, 32px)',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)',
                  backdropFilter: 'blur(50px)',
                  WebkitBackdropFilter: 'blur(50px)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  color: '#FFFFFF',
                  fontSize: 'clamp(1rem, 2.25vw, 1.125rem)',
                  fontWeight: 600,
                  letterSpacing: '0.015em',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
                  boxShadow: '0 8px 32px rgba(239, 68, 68, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(239, 68, 68, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(239, 68, 68, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
              >
                <Square size={18} fill="currentColor" />
                Stop Recording
              </button>
            </>
          ) : (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(50px)',
                WebkitBackdropFilter: 'blur(50px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
              }}>
                <Mic size={36} style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
              </div>

              <button
                onClick={startRecording}
                className="journey-btn journey-btn-primary"
                style={{ width: 'auto', minWidth: '200px' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                  <Mic size={18} />
                  Start Recording
                </span>
              </button>
              
              <p style={{
                fontSize: 'clamp(0.875rem, 1.875vw, 1rem)',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
                textAlign: 'center',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)'
              }}>
                Speak freely. Your words matter.
              </p>
            </>
          )}
        </div>
      )}

      {/* Text Mode */}
      {mode === 'text' && (
        <div className="journey-reflection-input-wrapper">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Take your time. There is no rush..."
            className="journey-reflection-textarea"
            rows={7}
          />
          <div className="journey-reflection-underline"></div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.05);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}