import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 09
 */

interface NaviCue09Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue09({ onComplete, onExit }: NaviCue09Props) {
  const [typed, setTyped] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!typed.trim()) return;
    setSubmitted(true);
    onComplete?.({ word: typed, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        className="max-w-lg w-full p-8 space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center text-2xl" style={{ color: '#FFFFFF' }}>
          The word you cannot say
        </div>

        {!submitted ? (
          <>
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
              className="w-full p-6 text-center text-2xl bg-transparent text-white border-b-2"
              style={{
                borderColor: 'rgba(87, 57, 251, 0.5)',
                outline: 'none',
              }}
            />

            <button
              onClick={handleSubmit}
              className="w-full p-4"
              style={{
                backgroundColor: typed.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            >
              Release
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xl"
            style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            Released
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
