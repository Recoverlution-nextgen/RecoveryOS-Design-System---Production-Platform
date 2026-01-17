/**
 * WITNESS Response Component
 * 
 * Observe without response - builds non-reactivity
 * Psychology: Mindfulness practice, separates observer from experience
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface WitnessResponseProps {
  duration?: number;
  onRespond: () => void;
  pillarColor: string;
}

export function WitnessResponse({
  duration = 10,
  onRespond,
  pillarColor
}: WitnessResponseProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0.1) {
          clearInterval(interval);
          setHasCompleted(true);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (hasCompleted) {
      onRespond();
    }
  }, [hasCompleted, onRespond]);

  const progress = ((duration - timeRemaining) / duration) * 100;

  return (
    <div className="space-y-8">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        Just observe. Do not respond. Just witness.
      </div>

      {/* Breathing animation */}
      <div className="flex items-center justify-center">
        <motion.div
          className="relative flex items-center justify-center"
          style={{ width: 200, height: 200 }}
        >
          {/* Expanding/contracting circle */}
          <motion.div
            className="absolute inset-0 border-4"
            style={{
              borderRadius: '0px',
              borderColor: pillarColor,
              backgroundColor: `${pillarColor}10`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Center */}
          <div 
            className="relative z-10 text-6xl"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: pillarColor
            }}
          >
            {timeRemaining.toFixed(1)}
          </div>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div 
          className="h-2 bg-white/10 overflow-hidden"
          style={{ borderRadius: '0px' }}
        >
          <motion.div
            className="h-full"
            style={{ 
              backgroundColor: pillarColor,
              width: `${progress}%`
            }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-white/40 text-sm">
          Witnessing...
        </div>
      </div>

      {/* Gentle prompt */}
      <div className="text-center text-white/60 text-sm italic">
        Notice what arises. Do not judge. Just see.
      </div>
    </div>
  );
}