import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE 01
 * No explanation. No context. Just... this.
 */

interface NaviCue01Props {
  onComplete?: (data: any) => void;
  onExit?: () => void;
}

export function NaviCue01({ onComplete, onExit }: NaviCue01Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    setSelected(choice);
    onComplete?.({ choice, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-xl w-full p-8 space-y-12"
      >
        <div className="text-center">
          <div className="text-3xl mb-8" style={{ color: '#FFFFFF' }}>
            The silence before you speak
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSelect('protection')}
            className="w-full p-6 text-left transition-all duration-200"
            style={{
              backgroundColor: selected === 'protection' ? 'rgba(87, 57, 251, 0.2)' : 'rgba(87, 57, 251, 0.05)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            Protection
          </button>

          <button
            onClick={() => handleSelect('preparation')}
            className="w-full p-6 text-left transition-all duration-200"
            style={{
              backgroundColor: selected === 'preparation' ? 'rgba(87, 57, 251, 0.2)' : 'rgba(87, 57, 251, 0.05)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            Preparation
          </button>

          <button
            onClick={() => handleSelect('space')}
            className="w-full p-6 text-left transition-all duration-200"
            style={{
              backgroundColor: selected === 'space' ? 'rgba(87, 57, 251, 0.2)' : 'rgba(87, 57, 251, 0.05)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          >
            Space
          </button>
        </div>
      </motion.div>
    </div>
  );
}
