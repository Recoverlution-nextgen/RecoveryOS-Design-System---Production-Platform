/**
 * Journey Day Completion
 * Celebration micro-moment after completing a day
 */

import { Button } from './ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useEffect, useState } from 'react';

interface JourneyDayCompletionProps {
  day: number; // 1-7
  tomorrowLabel?: string; // "EMBODY", "ROOT", etc.
  tomorrowPreview?: string; // Preview of tomorrow's instruction
  onContinue: () => void;
}

const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function JourneyDayCompletion({
  day,
  tomorrowLabel,
  tomorrowPreview,
  onContinue,
}: JourneyDayCompletionProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setShow(true), 100);
  }, []);

  const isLastDay = day === 7;

  return (
    <div
      className={`
        fixed inset-0 bg-black/60 backdrop-blur-sm z-50 
        flex items-center justify-center p-4
        transition-opacity duration-300
        ${show ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={onContinue}
    >
      <GlassCard
        className="max-w-lg w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-blue-500/20" />

        {/* Content */}
        <div className="relative z-10 p-8 text-center">
          {/* Success icon with pulse animation */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-pulse" />
          </div>

          {/* Message */}
          <h2 className="text-2xl text-white mb-3">
            {dayLabels[day - 1]} Complete
          </h2>
          <p className="text-white/70 mb-8">
            You completed today's practice. Your brain just laid down new neural pathways.
          </p>

          {/* Tomorrow preview or week complete */}
          {!isLastDay && tomorrowLabel && tomorrowPreview ? (
            <div className="bg-white/5 rounded-xl p-6 mb-6 text-left">
              <div className="text-white/50 text-sm mb-2">Tomorrow</div>
              <div className="text-[#5739FB] mb-3">{tomorrowLabel}</div>
              <div className="text-white/80 text-sm leading-relaxed">
                {tomorrowPreview}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#3E2BB8]/20 to-[#5739FB]/20 rounded-xl p-6 mb-6">
              <div className="text-white/90 mb-2">Week Complete</div>
              <div className="text-white/70 text-sm">
                You completed all 7 days. Ready for the next block?
              </div>
            </div>
          )}

          {/* Continue button */}
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
