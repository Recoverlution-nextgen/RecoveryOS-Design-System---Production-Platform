import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 02
 */

interface NaviCue02Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue02({ onComplete, onExit }: NaviCue02Props) {
  const [taps, setTaps] = useState(0);

  const handleTap = () => {
    const newTaps = taps + 1;
    setTaps(newTaps);
    
    if (newTaps >= 3) {
      onComplete?.({ taps: newTaps, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        className="text-center space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          How many times do you need to be certain?
        </div>

        <motion.button
          onClick={handleTap}
          whileTap={{ scale: 0.95 }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{
            backgroundColor: '#5739FB',
          }}
        >
          <div className="text-4xl text-white">{taps}</div>
        </motion.button>
      </motion.div>
    </div>
  );
}
