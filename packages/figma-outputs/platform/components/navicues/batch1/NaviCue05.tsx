import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * NAVICUE 05
 */

interface NaviCue05Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue05({ onComplete, onExit }: NaviCue05Props) {
  const [stage, setStage] = useState<'show' | 'ask'>('show');
  const [remembered, setRemembered] = useState<string | null>(null);

  const word = 'impermanence';

  const handleAnswer = (answer: string) => {
    setRemembered(answer);
    onComplete?.({ word, remembered: answer, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <AnimatePresence mode="wait">
        {stage === 'show' && (
          <motion.div
            key="show"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
            onAnimationComplete={() => {
              setTimeout(() => setStage('ask'), 2000);
            }}
          >
            <div className="text-5xl" style={{ color: '#FFFFFF' }}>
              {word}
            </div>
          </motion.div>
        )}

        {stage === 'ask' && (
          <motion.div
            key="ask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md w-full p-8 text-center space-y-8"
          >
            <div className="text-xl" style={{ color: '#FFFFFF' }}>
              What was the word?
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleAnswer('remembered')}
                className="w-full p-4"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '1px solid rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                I remember
              </button>

              <button
                onClick={() => handleAnswer('forgot')}
                className="w-full p-4"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '1px solid rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                I forgot
              </button>

              <button
                onClick={() => handleAnswer('didnt-try')}
                className="w-full p-4"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '1px solid rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                I did not try
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
