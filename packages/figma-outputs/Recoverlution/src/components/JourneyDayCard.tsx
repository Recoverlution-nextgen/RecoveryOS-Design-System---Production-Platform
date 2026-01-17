/**
 * Journey Day Card
 * Individual day instruction card with ERA phase styling
 */

import { Button } from './ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface JourneyDayCardProps {
  day: number; // 1-7
  eraLabel: string; // "SEED", "EMBODY", etc.
  eraPhase: 'experience' | 'recognize' | 'align' | 'mirror';
  instruction: string;
  isComplete: boolean;
  isCurrent: boolean;
  onComplete: () => void;
  className?: string;
}

const eraPhaseColors = {
  experience: 'from-rose-500/20 to-orange-500/20',
  recognize: 'from-purple-500/20 to-blue-500/20',
  align: 'from-emerald-500/20 to-teal-500/20',
  mirror: 'from-amber-500/20 to-yellow-500/20',
};

const eraPhaseText = {
  experience: 'text-orange-300',
  recognize: 'text-purple-300',
  align: 'text-emerald-300',
  mirror: 'text-amber-300',
};

const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function JourneyDayCard({
  day,
  eraLabel,
  eraPhase,
  instruction,
  isComplete,
  isCurrent,
  onComplete,
  className = '',
}: JourneyDayCardProps) {
  return (
    <GlassCard
      className={`
        relative overflow-hidden transition-all duration-300
        ${isCurrent ? 'ring-2 ring-[#5739FB]/50 shadow-xl shadow-[#5739FB]/20' : ''}
        ${isComplete ? 'opacity-60' : ''}
        ${className}
      `}
    >
      {/* Gradient overlay for ERA phase */}
      <div className={`absolute inset-0 bg-gradient-to-br ${eraPhaseColors[eraPhase]} opacity-50`} />

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-white/60 text-sm mb-1">{dayLabels[day - 1]}</div>
            <div className={`text-xl ${eraPhaseText[eraPhase]}`}>{eraLabel}</div>
          </div>

          {isComplete && (
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm">Complete</span>
            </div>
          )}
        </div>

        {/* Instruction */}
        <div className="text-white/90 leading-relaxed mb-8 min-h-[120px]">
          {instruction}
        </div>

        {/* Action */}
        {isCurrent && !isComplete && (
          <Button
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white"
          >
            Complete Today's Practice
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {isCurrent && isComplete && (
          <div className="text-center text-white/60 py-3">
            Practice completed. Continue tomorrow.
          </div>
        )}
      </div>
    </GlassCard>
  );
}
