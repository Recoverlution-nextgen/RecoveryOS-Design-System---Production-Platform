import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 03
 */

interface NaviCue03Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue03({ onComplete, onExit }: NaviCue03Props) {
  const [clicked, setClicked] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!clicked) {
      const interval = setInterval(() => {
        setElapsed(e => e + 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [clicked]);

  const handleClick = () => {
    setClicked(true);
    onComplete?.({ waitedMs: elapsed, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        className="text-center space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Wait for nothing
        </div>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 text-lg"
          style={{
            backgroundColor: clicked ? 'rgba(87, 57, 251, 0.3)' : '#5739FB',
            color: '#FFFFFF',
          }}
        >
          {clicked ? '...' : 'Continue'}
        </motion.button>
      </motion.div>
    </div>
  );
}
