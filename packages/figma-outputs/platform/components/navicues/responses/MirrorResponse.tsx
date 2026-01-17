/**
 * MIRROR Response Component
 * 
 * Reflects user's previous words back to them
 * Psychology: Self-confrontation, ownership, tracks belief evolution
 */

import { motion } from 'motion/react';

interface MirrorResponseProps {
  previousResponse: {
    text: string;
    daysAgo: number;
  } | null;
  question?: string;
  onRespond: (stillTrue: boolean) => void;
  pillarColor: string;
}

export function MirrorResponse({
  previousResponse,
  question = 'Is this still true?',
  onRespond,
  pillarColor
}: MirrorResponseProps) {
  if (!previousResponse) {
    return (
      <div className="text-center text-white/60">
        No previous response found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quote box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 border-l-4"
        style={{
          borderRadius: '0px',
          backgroundColor: `${pillarColor}15`,
          borderLeftColor: pillarColor,
          borderLeftWidth: '4px'
        }}
      >
        {/* "You said" label */}
        <div 
          className="text-sm uppercase tracking-wider mb-3"
          style={{ color: pillarColor }}
        >
          You said
        </div>

        {/* Previous response text */}
        <p 
          className="text-xl text-white italic leading-relaxed"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          "{previousResponse.text}"
        </p>

        {/* Timestamp */}
        <div className="text-white/40 text-sm mt-4">
          {previousResponse.daysAgo === 0 ? 'Today' :
           previousResponse.daysAgo === 1 ? 'Yesterday' :
           `${previousResponse.daysAgo} days ago`}
        </div>
      </motion.div>

      {/* Question */}
      <div className="text-center text-white/80 text-lg">
        {question}
      </div>

      {/* Binary response */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onRespond(false)}
          className="py-6 bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
          style={{
            borderRadius: '0px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600
          }}
        >
          No, not anymore
        </button>
        <button
          onClick={() => onRespond(true)}
          className="py-6 bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
          style={{
            borderRadius: '0px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600
          }}
        >
          Yes, still true
        </button>
      </div>
    </div>
  );
}
