import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 06
 */

interface NaviCue06Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue06({ onComplete, onExit }: NaviCue06Props) {
  const [intensity, setIntensity] = useState(50);
  const [released, setReleased] = useState(false);

  const handleRelease = () => {
    setReleased(true);
    onComplete?.({ intensity, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        className="max-w-lg w-full p-8 space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center text-xl" style={{ color: '#FFFFFF' }}>
          The weight you carry right now
        </div>

        <div className="space-y-6">
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            disabled={released}
            className="w-full h-2"
            style={{
              accentColor: '#5739FB',
            }}
          />

          <div 
            className="h-32 transition-all duration-300"
            style={{
              backgroundColor: `rgba(87, 57, 251, ${intensity / 100})`,
            }}
          />

          <button
            onClick={handleRelease}
            disabled={released}
            className="w-full p-4"
            style={{
              backgroundColor: released ? 'rgba(87, 57, 251, 0.3)' : '#5739FB',
              color: '#FFFFFF',
            }}
          >
            {released ? 'Released' : 'Release'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
