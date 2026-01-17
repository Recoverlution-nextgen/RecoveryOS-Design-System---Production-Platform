import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 04
 */

interface NaviCue04Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue04({ onComplete, onExit }: NaviCue04Props) {
  const [holding, setHolding] = useState(false);
  const [duration, setDuration] = useState(0);

  let startTime: number = 0;
  let intervalId: NodeJS.Timeout;

  const handlePress = () => {
    setHolding(true);
    startTime = Date.now();
    intervalId = setInterval(() => {
      setDuration(Date.now() - startTime);
    }, 50);
  };

  const handleRelease = () => {
    setHolding(false);
    clearInterval(intervalId);
    const finalDuration = Date.now() - startTime;
    onComplete?.({ heldMs: finalDuration, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        className="text-center space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-2xl mb-12" style={{ color: '#FFFFFF' }}>
          Hold until it feels right
        </div>

        <motion.div
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
          onTouchStart={handlePress}
          onTouchEnd={handleRelease}
          className="w-48 h-48 mx-auto rounded-full flex items-center justify-center cursor-pointer"
          style={{
            backgroundColor: holding ? '#5739FB' : 'rgba(87, 57, 251, 0.2)',
            transition: 'background-color 0.1s',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-white text-2xl">
            {holding ? `${(duration / 1000).toFixed(1)}s` : ''}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
