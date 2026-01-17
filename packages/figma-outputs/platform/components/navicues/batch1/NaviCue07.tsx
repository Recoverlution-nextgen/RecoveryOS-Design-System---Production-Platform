import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 07
 */

interface NaviCue07Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue07({ onComplete, onExit }: NaviCue07Props) {
  const [choice, setChoice] = useState<string | null>(null);

  const handleChoice = (selected: string) => {
    setChoice(selected);
    onComplete?.({ choice: selected, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        className="max-w-2xl w-full p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center mb-16 text-2xl" style={{ color: '#FFFFFF' }}>
          What you resist
        </div>

        <div className="grid grid-cols-2 gap-8">
          <motion.button
            onClick={() => handleChoice('stillness')}
            whileHover={{ scale: 1.02 }}
            className="aspect-square flex items-center justify-center text-xl"
            style={{
              backgroundColor: choice === 'stillness' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            Stillness
          </motion.button>

          <motion.button
            onClick={() => handleChoice('movement')}
            whileHover={{ scale: 1.02 }}
            className="aspect-square flex items-center justify-center text-xl"
            style={{
              backgroundColor: choice === 'movement' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            Movement
          </motion.button>

          <motion.button
            onClick={() => handleChoice('silence')}
            whileHover={{ scale: 1.02 }}
            className="aspect-square flex items-center justify-center text-xl"
            style={{
              backgroundColor: choice === 'silence' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            Silence
          </motion.button>

          <motion.button
            onClick={() => handleChoice('noise')}
            whileHover={{ scale: 1.02 }}
            className="aspect-square flex items-center justify-center text-xl"
            style={{
              backgroundColor: choice === 'noise' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            Noise
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
