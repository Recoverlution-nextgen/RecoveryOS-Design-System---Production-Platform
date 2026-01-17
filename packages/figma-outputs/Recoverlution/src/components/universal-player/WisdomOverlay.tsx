/**
 * WISDOM OVERLAY
 * LUMA wisdom responses shown after certain NaviCues
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, X } from 'lucide-react';

interface WisdomOverlayProps {
  message: string;
  onClose: () => void;
}

export function WisdomOverlay({ message, onClose }: WisdomOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card */}
        <div className="bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] p-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Message */}
          <p className="text-white text-xl md:text-2xl text-center leading-relaxed mb-8 relative z-10">
            {message}
          </p>

          {/* Continue button */}
          <button
            onClick={onClose}
            className="w-full bg-white text-[#3E2BB8] hover:bg-white/90 transition-colors py-4 px-8 relative z-10"
          >
            Continue
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
