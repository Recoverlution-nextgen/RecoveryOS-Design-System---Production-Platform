import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 08
 */

interface NaviCue08Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue08({ onComplete, onExit }: NaviCue08Props) {
  const [breathCount, setBreathCount] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  const handleBreathe = () => {
    if (phase === 'in') {
      setPhase('out');
    } else {
      setPhase('in');
      const newCount = breathCount + 1;
      setBreathCount(newCount);
      
      if (newCount >= 3) {
        onComplete?.({ breaths: newCount, timestamp: Date.now() });
        setTimeout(() => onExit?.(), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          onClick={handleBreathe}
          className="w-64 h-64 mx-auto rounded-full flex items-center justify-center cursor-pointer"
          animate={{
            scale: phase === 'in' ? 1.2 : 1,
            backgroundColor: phase === 'in' ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
        >
          <div className="text-white text-xl">
            {phase === 'in' ? 'In' : 'Out'}
          </div>
        </motion.div>

        <div className="mt-8 text-white opacity-50">
          {breathCount}/3
        </div>
      </motion.div>
    </div>
  );
}
