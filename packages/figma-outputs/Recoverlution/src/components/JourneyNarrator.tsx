/**
 * Journey Narrator - Audio + Synchronized Text Reveal
 * 
 * Features:
 * - Text reveals as narration plays (chunk by chunk)
 * - Audio on/off toggle
 * - Pause/resume controls
 * - Premium TTS via OpenAI (primary)
 * - Web Speech API (fallback)
 * 
 * infiniteK Design System: Clean, therapeutic controls
 */

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Howl } from 'howler';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface NarratorChunk {
  text: string;
  pauseAfter?: number; // milliseconds to pause after this chunk
}

interface JourneyNarratorProps {
  /** Array of text chunks that reveal sequentially */
  narrative: NarratorChunk[];
  /** Scene key for fetching pre-generated audio (e.g., "welcome", "day-1") */
  sceneKey: string;
  /** Called when narration completes */
  onComplete?: () => void;
  /** Auto-start narration */
  autoPlay?: boolean;
  /** Narration speed (0.8 = slow, 1.0 = normal, 1.2 = fast) */
  speed?: number;
}

export function JourneyNarrator({
  narrative,
  sceneKey,
  onComplete,
  autoPlay = true,
  speed = 0.85
}: JourneyNarratorProps) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(-1);
  const [revealedChunks, setRevealedChunks] = useState<number[]>([]);
  const [audioMode, setAudioMode] = useState<'premium' | 'fallback' | null>(null);
  const [audioLoading, setAudioLoading] = useState(true);
  
  const soundRef = useRef<Howl | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chunkIndexRef = useRef(-1);

  // Load audio preference and fetch premium audio
  useEffect(() => {
    const saved = localStorage.getItem('journey_audio_enabled');
    if (saved !== null) {
      setAudioEnabled(saved === 'true');
    }
    
    // Try to fetch premium audio
    fetchPremiumAudio();
  }, [sceneKey]);
  
  // Fetch premium audio from server
  const fetchPremiumAudio = async () => {
    setAudioLoading(true);
    
    try {
      console.log(`🎙️ Fetching premium audio for: ${sceneKey}`);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/audio/${sceneKey}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        // Check if this is a "use TTS" response (context scenes)
        if (response.status === 200 && errorData?.useTTS) {
          console.log(`ℹ️ ${sceneKey}: Using Web Speech API (dynamic content)`);
          setAudioMode('fallback');
          setAudioLoading(false);
          return;
        }
        
        // Real errors
        const errorText = errorData ? JSON.stringify(errorData) : 'Unknown error';
        console.error(`❌ AUDIO FETCH FAILED for ${sceneKey}`);
        console.error(`   Status: ${response.status}`);
        console.error(`   Response: ${errorText}`);
        console.error(`   URL: https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/audio/${sceneKey}`);
        console.error(`   Falling back to Web Speech API`);
        setAudioMode('fallback');
        setAudioLoading(false);
        return;
      }
      
      const data = await response.json();
      
      // Check if response indicates to use TTS
      if (data.useTTS) {
        console.log(`ℹ️ ${sceneKey}: Using Web Speech API (dynamic content)`);
        setAudioMode('fallback');
        setAudioLoading(false);
        return;
      }
      
      console.log(`✅ Server response for ${sceneKey}:`, data);
      
      if (!data.url) {
        console.warn(`❌ No URL in response for ${sceneKey}`, data);
        setAudioMode('fallback');
        setAudioLoading(false);
        return;
      }
      
      console.log(`🎵 Loading premium audio from URL:`, data.url);
      
      // Verify URL is accessible
      try {
        const testResponse = await fetch(data.url, { method: 'HEAD' });
        console.log(`   URL check: ${testResponse.status} ${testResponse.statusText}`);
        console.log(`   Content-Type: ${testResponse.headers.get('content-type')}`);
        console.log(`   Content-Length: ${testResponse.headers.get('content-length')}`);
      } catch (urlError) {
        console.error(`   ❌ URL not accessible:`, urlError);
      }
      
      // Load audio with Howler
      const sound = new Howl({
        src: [data.url],
        format: ['mp3'],
        html5: true, // Use HTML5 audio for better compatibility
        volume: 1.0,
        rate: speed,
        onload: () => {
          console.log(`✅ Premium audio loaded successfully for ${sceneKey}`);
          console.log(`   Duration: ${sound.duration()}s`);
          setAudioMode('premium');
          setAudioLoading(false);
        },
        onloaderror: (id, error) => {
          console.error(`❌ Howler load error for ${sceneKey}:`);
          console.error(`   Error ID: ${id}`);
          console.error(`   Error: ${error}`);
          console.error(`   This usually means:`)
          console.error(`   1. Audio file is corrupted or invalid MP3 format`);
          console.error(`   2. URL is not accessible (CORS issue)`);
          console.error(`   3. File is not actually an MP3 despite .mp3 extension`);
          console.error(`   → Falling back to Web Speech API`);
          setAudioMode('fallback');
          setAudioLoading(false);
        },
        onplayerror: (id, error) => {
          console.error(`❌ Howler play error for ${sceneKey}:`, error);
          setAudioMode('fallback');
          setIsPlaying(false);
        },
        onend: () => {
          setIsPlaying(false);
          if (onComplete) {
            setTimeout(onComplete, 1000);
          }
        }
      });
      
      soundRef.current = sound;
      
    } catch (error) {
      console.log(`ℹ️ Could not load premium audio for ${sceneKey}, using Web Speech:`, error);
      setAudioMode('fallback');
      setAudioLoading(false);
    }
  };

  // Save audio preference
  const toggleAudio = () => {
    const newValue = !audioEnabled;
    setAudioEnabled(newValue);
    localStorage.setItem('journey_audio_enabled', String(newValue));
    
    // If disabling while playing, stop
    if (!newValue && isPlaying) {
      stopNarration();
    }
  };

  // Start narration
  const startNarration = () => {
    if (!narrative || narrative.length === 0) return;
    
    setIsPlaying(true);
    setCurrentChunkIndex(0);
    setRevealedChunks([]);
    chunkIndexRef.current = 0;
    
    if (audioMode === 'premium' && audioEnabled && soundRef.current) {
      // Play premium audio and sync text reveals
      soundRef.current.play();
      syncTextWithPremiumAudio();
    } else {
      // Fall back to Web Speech with chunk-by-chunk reveal
      speakChunk(0);
    }
  };
  
  // Sync text reveals with premium audio playback
  const syncTextWithPremiumAudio = () => {
    if (!soundRef.current) return;
    
    /**
     * AUTOMATED AUDIO-TEXT SYNC SYSTEM
     * ================================
     * 
     * This system automatically syncs text reveals with premium audio playback
     * by tracking the audio's real-time playback position. It works for any
     * audio file without manual calibration.
     * 
     * HOW IT WORKS:
     * 1. Calculate "time weight" for each chunk based on word count
     * 2. Distribute audio duration proportionally to word count
     * 3. Poll audio playback position every 100ms
     * 4. Reveal chunks as their time threshold is crossed
     * 
     * EXAMPLE:
     * - Chunk 1: "This week belongs to one tool." (7 words)
     * - Chunk 2: "Not complicated. Not new. But when it becomes yours, everything shifts." (12 words)
     * - Total: 19 words
     * - Audio: 10 seconds
     * - Chunk 1 reveal: (7/19) × 10s = 3.7s
     * - Chunk 2 reveal: (12/19) × 10s = 6.3s
     * 
     * BENEFITS:
     * - Fully automated - works for any journey sprint
     * - Adapts to audio length automatically
     * - Proportional to content length (longer chunks = more time)
     * - Self-correcting - uses actual playback position
     * 
     * CONTENT PRODUCTION WORKFLOW:
     * 1. Write narrative chunks in journey-enhanced.tsx
     * 2. Generate audio from full narrative text (OpenAI TTS)
     * 3. Upload audio to server with scene key
     * 4. System automatically syncs text to audio ✅
     */
    
    const sound = soundRef.current;
    const audioDuration = sound.duration() * 1000; // Convert to milliseconds
    
    // Calculate word count for each chunk
    const chunkWeights = narrative.map(chunk => {
      const wordCount = chunk.text.trim().split(/\s+/).length;
      return wordCount;
    });
    
    const totalWords = chunkWeights.reduce((sum, words) => sum + words, 0);
    
    // Calculate cumulative time thresholds for each chunk
    let accumulatedWords = 0;
    const chunkThresholds = chunkWeights.map(words => {
      accumulatedWords += words;
      return (accumulatedWords / totalWords) * audioDuration;
    });
    
    console.log(`🎬 WORD-WEIGHTED SYNC: ${narrative.length} chunks, ${totalWords} words, ${(audioDuration/1000).toFixed(1)}s audio`);
    chunkThresholds.forEach((threshold, i) => {
      console.log(`   Chunk ${i + 1}: ${chunkWeights[i]} words → reveal at ${(threshold/1000).toFixed(2)}s`);
    });
    
    // Track playback position and reveal chunks in real-time
    const syncInterval = setInterval(() => {
      if (!sound.playing()) {
        clearInterval(syncInterval);
        return;
      }
      
      const currentTime = sound.seek() * 1000; // Current playback position in ms
      
      // Find which chunks should be revealed at current time
      let currentChunkIndex = -1;
      for (let i = 0; i < chunkThresholds.length; i++) {
        if (currentTime >= chunkThresholds[i]) {
          currentChunkIndex = i;
        } else {
          break;
        }
      }
      
      // Reveal all chunks up to and including current
      if (currentChunkIndex >= 0) {
        setRevealedChunks(prev => {
          const newRevealed = Array.from({ length: currentChunkIndex + 1 }, (_, i) => i);
          return newRevealed;
        });
        setCurrentChunkIndex(currentChunkIndex);
      }
      
    }, 100); // Poll every 100ms for smooth reveals
    
    // Cleanup interval when audio ends
    sound.once('end', () => {
      clearInterval(syncInterval);
      // Ensure all chunks are revealed
      setRevealedChunks(Array.from({ length: narrative.length }, (_, i) => i));
      setCurrentChunkIndex(narrative.length - 1);
    });
    
    // Store interval ref for cleanup
    timeoutRef.current = syncInterval as any;
  };

  // Speak individual chunk
  const speakChunk = (index: number) => {
    if (index >= narrative.length) {
      // Narration complete
      setIsPlaying(false);
      if (onComplete) {
        setTimeout(onComplete, 1000); // Wait 1s after last chunk
      }
      return;
    }

    const chunk = narrative[index];
    
    // Reveal this chunk
    setRevealedChunks(prev => [...prev, index]);
    setCurrentChunkIndex(index);

    // Speak if audio enabled
    if (audioEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(chunk.text);
      utterance.rate = speed;
      utterance.pitch = 1.0; // Changed from 0.9 to more natural
      utterance.volume = 1.0;

      // Try to select a good voice - wait for voices to load
      const setVoice = () => {
        const voices = speechSynthesis.getVoices();
        
        // Prefer high-quality female voices
        const preferredVoice = voices.find(v => 
          v.name.includes('Samantha') || // macOS - best quality
          v.name.includes('Ava') || // macOS alternative
          v.name.includes('Google US English') || // Chrome - natural
          v.name.includes('Microsoft Zira') || // Windows
          (v.lang.startsWith('en') && v.name.includes('Female'))
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
          console.log(`🎤 Using voice: ${preferredVoice.name}`);
        } else if (voices.length > 0) {
          // Fallback to first English voice
          const englishVoice = voices.find(v => v.lang.startsWith('en'));
          if (englishVoice) utterance.voice = englishVoice;
        }
      };

      // Set voice immediately if available, or wait for them to load
      if (speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        speechSynthesis.onvoiceschanged = setVoice;
      }

      utterance.onend = () => {
        // Move to next chunk after pause
        const pauseDuration = chunk.pauseAfter || 800;
        timeoutRef.current = setTimeout(() => {
          chunkIndexRef.current++;
          speakChunk(chunkIndexRef.current);
        }, pauseDuration);
      };

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    } else {
      // No audio - just reveal text with timing
      const estimatedDuration = chunk.text.split(' ').length * 400; // ~400ms per word
      const pauseDuration = chunk.pauseAfter || 800;
      
      timeoutRef.current = setTimeout(() => {
        chunkIndexRef.current++;
        speakChunk(chunkIndexRef.current);
      }, estimatedDuration + pauseDuration);
    }
  };

  // Pause narration
  const pauseNarration = () => {
    setIsPlaying(false);
    
    if (audioMode === 'premium' && soundRef.current) {
      soundRef.current.pause();
    } else if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Resume narration
  const resumeNarration = () => {
    setIsPlaying(true);
    
    if (audioMode === 'premium' && soundRef.current) {
      soundRef.current.play();
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      // Continue from current chunk
      speakChunk(chunkIndexRef.current);
    }
  };

  // Stop narration
  const stopNarration = () => {
    setIsPlaying(false);
    
    if (audioMode === 'premium' && soundRef.current) {
      soundRef.current.stop();
    } else if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Auto-play once audio is loaded
  useEffect(() => {
    if (autoPlay && !audioLoading && audioMode !== null && !isPlaying) {
      console.log(`🎬 Auto-starting narration with ${audioMode} audio`);
      // Small delay for smooth transition
      setTimeout(() => {
        startNarration();
      }, 300);
    }
  }, [autoPlay, audioLoading, audioMode]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* Narrative Text - Reveals chunk by chunk */}
      <div style={{
        marginBottom: '40px',
        minHeight: '200px'
      }}>
        {narrative.map((chunk, index) => {
          const isRevealed = revealedChunks.includes(index);
          const isCurrent = currentChunkIndex === index;
          
          return (
            <p
              key={index}
              style={{
                margin: '0 0 28px 0',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: isRevealed ? '#FFFFFF' : 'transparent',
                opacity: isRevealed ? (isCurrent ? 1 : 0.95) : 0,
                transform: isRevealed ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.6s ease-out',
                fontWeight: isCurrent ? 500 : 400,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                letterSpacing: '0.01em'
              }}
            >
              {chunk.text}
            </p>
          );
        })}
      </div>

      {/* Audio Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        paddingTop: '28px'
      }}>
        {/* Loading Indicator */}
        {audioLoading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: 'none',
            fontSize: '0.875rem',
            color: '#FFFFFF',
            fontWeight: 500,
            letterSpacing: '0.01em'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderTopColor: '#FFFFFF',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            Preparing premium narration...
          </div>
        )}
        
        {/* Play/Pause */}
        {!audioLoading && (
          !isPlaying ? (
            <button
              onClick={revealedChunks.length === 0 ? startNarration : resumeNarration}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
                minWidth: '120px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <Play size={18} />
              {revealedChunks.length === 0 ? 'Begin' : 'Resume'}
            </button>
          ) : (
            <button
              onClick={pauseNarration}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
                minWidth: '120px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <Pause size={18} />
              Pause
            </button>
          )
        )}

        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          disabled={audioLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: audioEnabled ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 24px',
            cursor: audioLoading ? 'wait' : 'pointer',
            fontSize: '0.9375rem',
            fontWeight: 500,
            letterSpacing: '0.01em',
            transition: 'all 0.2s ease',
            opacity: audioLoading ? 0.6 : 1,
            minWidth: '140px',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            if (!audioLoading) {
              e.currentTarget.style.background = audioEnabled ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.10)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = audioEnabled ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)';
          }}
        >
          {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          {audioLoading ? 'Loading...' : audioEnabled ? 'Audio On' : 'Audio Off'}
        </button>

        {/* Progress indicator */}
        {isPlaying && (
          <div style={{
            flex: 1,
            minWidth: '200px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              flex: 1,
              height: '3px',
              background: 'rgba(255, 255, 255, 0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${((currentChunkIndex + 1) / narrative.length) * 100}%`,
                background: 'rgba(255, 255, 255, 0.9)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.85)',
              minWidth: '50px',
              textAlign: 'right',
              fontWeight: 500,
              letterSpacing: '0.01em'
            }}>
              {currentChunkIndex + 1} / {narrative.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}