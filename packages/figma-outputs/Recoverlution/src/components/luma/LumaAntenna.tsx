/**
 * LUMA ANTENNA - The Companion Banner
 * 
 * ONE unified block. Warm presence.
 * Title + mode toggle + message all together.
 */

import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface AntennaMessage {
  text: string;
  type: 'welcome' | 'celebration' | 'reflection' | 'mantra' | 'prompt';
}

interface LumaAntennaProps {
  message: AntennaMessage;
  mode: 'navicue' | 'rescue';
  onModeChange: (mode: 'navicue' | 'rescue') => void;
  onClose: () => void;
}

export function LumaAntenna({ message, mode, onModeChange, onClose }: LumaAntennaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="luma-glass-dark"
    >
      {/* Top row: NaviCue/Rescue toggle (left) + Close (right) */}
      <div className="flex items-center justify-between px-6 py-4 luma-divider border-b">
        {/* Mode toggle - left aligned */}
        <div className="flex gap-1">
          <button
            onClick={() => onModeChange('navicue')}
            className={mode === 'navicue' ? 'luma-toggle-active' : 'luma-toggle'}
          >
            NaviCue
          </button>
          <button
            onClick={() => onModeChange('rescue')}
            className={mode === 'rescue' ? 'luma-toggle-rescue-active' : 'luma-toggle-rescue'}
          >
            Rescue
          </button>
        </div>
        
        {/* Close button - right aligned */}
        <button
          onClick={onClose}
          className="luma-icon-button"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Message - A voice speaking to you */}
      <div className="px-6 py-6">
        <p className="luma-body-text text-white">
          {message.text}
        </p>
      </div>
    </motion.div>
  );
}