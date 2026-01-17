/**
 * MICRO-CUE COMPONENT
 * 
 * Small, contextual interventions woven into dialogue
 * Types: Sound Bite echo, breathing pause, body check, anchor point reminder
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Wind, Sparkles } from 'lucide-react';

export type MicroCueType = 'soundbite' | 'breath' | 'body' | 'anchorpoint';

interface MicroCueProps {
  type: MicroCueType;
  data?: any;
  onComplete?: () => void;
}

export function MicroCue({ type, data, onComplete }: MicroCueProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCycle, setBreathCycle] = useState(0);

  // Breathing animation logic
  useEffect(() => {
    if (type === 'breath' && isPlaying) {
      const phases = [
        { phase: 'inhale', duration: 4000 },
        { phase: 'hold', duration: 2000 },
        { phase: 'exhale', duration: 6000 }
      ];

      let currentPhaseIndex = 0;
      let currentCycle = 0;

      const runPhase = () => {
        const { phase, duration } = phases[currentPhaseIndex];
        setBreathPhase(phase as typeof breathPhase);

        setTimeout(() => {
          currentPhaseIndex++;
          if (currentPhaseIndex >= phases.length) {
            currentPhaseIndex = 0;
            currentCycle++;
            setBreathCycle(currentCycle);

            if (currentCycle >= 3) {
              setIsPlaying(false);
              onComplete?.();
              return;
            }
          }
          runPhase();
        }, duration);
      };

      runPhase();
    }
  }, [isPlaying, type, onComplete]);

  if (type === 'soundbite') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-4 bg-black/30 backdrop-blur-xl border border-white/10 p-4"
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center text-white flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-white/60 text-xs uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                From last week
              </span>
            </div>
            <p
              className="text-white/90 text-sm mb-1"
              style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}
            >
              {data?.transcript || 'You said something about this...'}
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>{data?.duration ? `${Math.floor(data.duration / 60)}:${(data.duration % 60).toString().padStart(2, '0')}` : '2:30'}</span>
              <span>·</span>
              <span>{data?.context || 'Pain'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'breath') {
    const getBreathText = () => {
      switch (breathPhase) {
        case 'inhale':
          return 'Breathe in...';
        case 'hold':
          return 'Hold...';
        case 'exhale':
          return 'Breathe out...';
      }
    };

    const getCircleScale = () => {
      switch (breathPhase) {
        case 'inhale':
          return 1.5;
        case 'hold':
          return 1.5;
        case 'exhale':
          return 1;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-6 bg-gradient-to-br from-[#10B981]/20 to-[#059669]/10 backdrop-blur-xl border border-[#10B981]/30 p-8"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <Wind className="w-5 h-5 text-[#10B981]" />
            <span
              className="text-white text-sm"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Let's pause here
            </span>
          </div>

          {!isPlaying ? (
            <button
              onClick={() => {
                setIsPlaying(true);
                setBreathCycle(0);
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Start breathing
            </button>
          ) : (
            <div className="flex flex-col items-center">
              {/* Animated breathing circle */}
              <div className="relative w-32 h-32 mb-6">
                <motion.div
                  animate={{ scale: getCircleScale() }}
                  transition={{ duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 0 : 6, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-[#10B981]/40 to-[#059669]/40 backdrop-blur-xl border border-[#10B981]/50"
                />
              </div>

              {/* Breath instruction */}
              <p
                className="text-white text-lg mb-2"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                {getBreathText()}
              </p>

              {/* Cycle counter */}
              <p className="text-white/50 text-sm">
                Cycle {breathCycle + 1} of 3
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  if (type === 'body') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-4 bg-black/30 backdrop-blur-xl border border-white/10 p-4"
      >
        <p
          className="text-white/80 text-sm"
          style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}
        >
          What are you noticing in your body right now?
        </p>
      </motion.div>
    );
  }

  if (type === 'anchorpoint') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-4"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
          <div>
            <p
              className="text-white/60 text-xs uppercase tracking-wide mb-2"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              You said this before
            </p>
            <p
              className="text-white"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.0625rem',
                lineHeight: '1.6',
                fontWeight: 500
              }}
            >
              {data?.text || 'The resistance might be the way through'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
