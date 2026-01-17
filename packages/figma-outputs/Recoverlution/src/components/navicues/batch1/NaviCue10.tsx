import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 10
 */

interface NaviCue10Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue10({ onComplete, onExit }: NaviCue10Props) {
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAnswer = (choice: string) => {
    setAnswer(choice);
    onComplete?.({ answer: choice, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        className="max-w-2xl w-full p-8 space-y-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center space-y-4">
          <div className="text-3xl" style={{ color: '#FFFFFF' }}>
            If no one was watching
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleAnswer('same')}
            className="p-6 text-left text-lg transition-all duration-200"
            style={{
              backgroundColor: answer === 'same' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            I would be the same
          </button>

          <button
            onClick={() => handleAnswer('different')}
            className="p-6 text-left text-lg transition-all duration-200"
            style={{
              backgroundColor: answer === 'different' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            I would be different
          </button>

          <button
            onClick={() => handleAnswer('free')}
            className="p-6 text-left text-lg transition-all duration-200"
            style={{
              backgroundColor: answer === 'free' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            I would be free
          </button>

          <button
            onClick={() => handleAnswer('lost')}
            className="p-6 text-left text-lg transition-all duration-200"
            style={{
              backgroundColor: answer === 'lost' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            I would be lost
          </button>
        </div>
      </motion.div>
    </div>
  );
}
