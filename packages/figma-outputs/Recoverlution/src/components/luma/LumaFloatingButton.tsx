/**
 * LUMA FLOATING BUTTON - Always-Accessible Entry Point
 * 
 * The shining beacon that's always there.
 * Your trusted antenna, ready when you are.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Radio } from 'lucide-react';

interface LumaFloatingButtonProps {
  onClick: () => void;
}

export function LumaFloatingButton({ onClick }: LumaFloatingButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] shadow-2xl hover:shadow-[0_0_40px_rgba(62,43,184,0.5)] transition-all group"
      style={{ borderRadius: '0px' }}
      aria-label="Open LUMA"
    >
      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        style={{ borderRadius: '0px' }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut'
        }}
      />

      {/* Icon */}
      <div className="relative flex items-center justify-center w-full h-full">
        <Radio className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      </div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/90 backdrop-blur-sm border border-white/10 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Open LUMA
        <div className="absolute top-full right-4 w-2 h-2 bg-black/90 rotate-45 -mt-1" />
      </div>
    </motion.button>
  );
}
