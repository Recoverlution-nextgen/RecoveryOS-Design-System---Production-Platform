/**
 * COMPARISON Response Component
 * 
 * Side-by-side old belief vs new belief
 * Psychology: Makes change visible, celebrates transformation
 */

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ComparisonResponseProps {
  oldText: string;
  newText: string;
  onRespond: () => void;
  pillarColor: string;
}

export function ComparisonResponse({
  oldText,
  newText,
  onRespond,
  pillarColor
}: ComparisonResponseProps) {
  return (
    <div className="space-y-6">
      {/* Split screen comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* THEN */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative p-6 bg-white/5 border border-white/10"
          style={{ borderRadius: '0px' }}
        >
          <div className="text-white/40 text-xs uppercase tracking-wider mb-3">
            Then
          </div>
          <p 
            className="text-white/60 line-through italic"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {oldText}
          </p>
        </motion.div>

        {/* NOW */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative p-6 border-4"
          style={{
            borderRadius: '0px',
            backgroundColor: `${pillarColor}10`,
            borderColor: pillarColor
          }}
        >
          <div 
            className="text-xs uppercase tracking-wider mb-3"
            style={{ color: pillarColor }}
          >
            Now
          </div>
          <p 
            className="text-white"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            {newText}
          </p>
        </motion.div>
      </div>

      {/* Progress arrow */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex-1 h-0.5 bg-white/20" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="w-12 h-12 flex items-center justify-center"
          style={{
            backgroundColor: pillarColor,
            borderRadius: '0px'
          }}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </motion.div>
        <div className="flex-1 h-0.5 bg-white/20" />
      </div>

      {/* Message */}
      <div className="text-center text-white/80">
        You have shifted
      </div>

      {/* Acknowledge button */}
      <button
        onClick={onRespond}
        className="w-full py-4 bg-white/20 hover:bg-white/30 text-white transition-colors"
        style={{
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 600
        }}
      >
        Acknowledge This Change
      </button>
    </div>
  );
}
