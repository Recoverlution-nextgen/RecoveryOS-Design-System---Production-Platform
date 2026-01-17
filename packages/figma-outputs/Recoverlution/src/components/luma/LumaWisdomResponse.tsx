/**
 * LUMA WISDOM RESPONSE
 * 
 * Post-voice-note presence.
 * Following /docs/luma-voice-principles.md:
 * - Show, never tell
 * - Presence, not processing
 * - Immediate, not conceptual
 * - Sometimes silence
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface LumaWisdomResponseProps {
  message: string | null;
  onComplete: () => void;
}

export function LumaWisdomResponse({ message, onComplete }: LumaWisdomResponseProps) {
  useEffect(() => {
    if (message) {
      // Show response for 2.5 seconds, then fade and complete
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [message, onComplete]);

  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-40 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="max-w-md text-center"
      >
        <p
          className="text-white text-2xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 1.4 }}
        >
          {message}
        </p>
      </motion.div>
    </motion.div>
  );
}

/**
 * WISDOM RESPONSE LIBRARY
 * 
 * Reference: /docs/luma-voice-principles.md
 * 
 * Rotate through these based on context, time, emotional tone detected.
 * Never explanatory. Always immediate. Sometimes silence.
 */

export const WISDOM_RESPONSES = {
  // Presence (just acknowledgment)
  presence: [
    "You're here.",
    "Yeah.",
    "Okay.",
    "I got you.",
  ],

  // Immediate (return to now)
  immediate: [
    "Breathe.",
    "The sky is still there.",
    "You're trying to get somewhere. Notice that.",
    "Right now, you're safe.",
  ],

  // Perspective (reframe without explaining)
  perspective: [
    "This will pass.",
    "You don't have to fix it right now.",
    "You saw it. That's enough.",
    "It's okay to not know.",
  ],

  // Body (return to physical)
  body: [
    "Feel your feet.",
    "Your body is here.",
    "Notice your breath.",
  ],

  // Silence (sometimes the response is no response, just let paths shift)
  silence: null,
};

/**
 * Get a wisdom response based on context
 * 
 * @param context - 'stress' | 'insomnia' | 'breakthrough' | 'neutral'
 * @returns A wisdom response string or null (for silence)
 */
export function getWisdomResponse(context: string = 'neutral'): string | null {
  // Sometimes just... silence. Paths shift, no words needed.
  if (Math.random() < 0.2) {
    return null;
  }

  // Choose category based on context
  let category: keyof typeof WISDOM_RESPONSES;

  switch (context) {
    case 'stress':
      category = Math.random() < 0.5 ? 'immediate' : 'perspective';
      break;
    case 'insomnia':
      category = 'body';
      break;
    case 'breakthrough':
      category = 'presence';
      break;
    default:
      // Random selection for neutral context
      const categories = ['presence', 'immediate', 'perspective', 'body'];
      category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof WISDOM_RESPONSES;
  }

  const responses = WISDOM_RESPONSES[category];
  if (!responses) return null;

  return responses[Math.floor(Math.random() * responses.length)];
}
