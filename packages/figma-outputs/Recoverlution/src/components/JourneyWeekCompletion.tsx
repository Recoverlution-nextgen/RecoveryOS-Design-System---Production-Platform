/**
 * Journey Week Completion
 * Celebration screen after completing all 7 days
 */

import { Button } from './ui/button';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useEffect, useState } from 'react';

interface JourneyWeekCompletionProps {
  blockName: string; // "Buy 2 Seconds"
  nextBlockName?: string; // Next block from LUMA
  nextBlockReason?: string; // Why LUMA recommended this
  onStartNext: () => void;
  onViewProgress: () => void;
}

export function JourneyWeekCompletion({
  blockName,
  nextBlockName,
  nextBlockReason,
  onStartNext,
  onViewProgress,
}: JourneyWeekCompletionProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 bg-black/80 backdrop-blur-md z-50 
        flex items-center justify-center p-4
        transition-opacity duration-500
        ${show ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <GlassCard className="max-w-2xl w-full relative overflow-hidden">
        {/* Celebration gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3E2BB8]/30 via-[#5739FB]/30 to-purple-500/30" />

        {/* Content */}
        <div className="relative z-10 p-12 text-center">
          {/* Celebration icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#3E2BB8]/30 to-[#5739FB]/30 mb-6">
            <Star className="w-10 h-10 text-[#5739FB] fill-[#5739FB]/20" />
          </div>

          {/* Main message */}
          <h1 className="text-3xl text-white mb-4">
            Week Complete
          </h1>
          <p className="text-xl text-white/80 mb-3">
            You completed "{blockName}"
          </p>
          <p className="text-white/60 mb-12 max-w-md mx-auto">
            Seven days of intentional practice. Your brain is different than it was a week ago. 
            New neural pathways have been carved.
          </p>

          {/* Stats (could be dynamic) */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl text-white mb-1">7</div>
              <div className="text-white/50 text-sm">Days Complete</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl text-white mb-1">100%</div>
              <div className="text-white/50 text-sm">Completion</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl text-white mb-1">1</div>
              <div className="text-white/50 text-sm">Block Mastered</div>
            </div>
          </div>

          {/* Next recommendation */}
          {nextBlockName && (
            <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-8 mb-8 text-left">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5739FB]/20 flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#5739FB]" />
                </div>
                <div>
                  <div className="text-white/50 text-sm mb-2">LUMA Recommends Next</div>
                  <div className="text-xl text-white mb-2">{nextBlockName}</div>
                  {nextBlockReason && (
                    <div className="text-white/70 text-sm">{nextBlockReason}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onViewProgress}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              View Progress
            </Button>
            <Button
              onClick={onStartNext}
              className="flex-1 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white"
            >
              Start Next Block
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
