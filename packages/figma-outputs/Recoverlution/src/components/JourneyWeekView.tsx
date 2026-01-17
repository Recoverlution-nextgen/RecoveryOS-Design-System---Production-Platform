/**
 * Journey Week View
 * Full 7-day ERA sprint experience
 * Desktop: Horizontal card flow
 * Mobile: Vertical stack with current day focus
 */

import { useState } from 'react';
import { JourneyDayCard } from './JourneyDayCard';
import { JourneyDayCompletion } from './JourneyDayCompletion';
import { JourneyWeekCompletion } from './JourneyWeekCompletion';
import { JourneyProgressBar } from './JourneyProgressBar';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface Block {
  id: string;
  name: string;
  theme_id: string;
  day_type?: string[];
  era: {
    experience: {
      mon_seed: string;
      tue_reflect: string;
    };
    recognize: {
      wed_cue: string;
      thu_deepen: string;
    };
    align: {
      fri_choice: string;
      sat_introspect: string;
    };
    sun_mirror: {
      identity_line: string;
    };
  };
  measures?: {
    primary: string[];
    secondary: string[];
  };
  context_tags?: string[];
  skill_tags?: string[];
}

interface JourneyWeekViewProps {
  block: Block;
  initialDay?: number; // Start at specific day (1-7)
  onBack?: () => void;
  onWeekComplete?: (blockId: string) => void;
  className?: string;
}

// ERA structure for the 7-day week
const eraStructure = [
  { day: 1, label: 'SEED', phase: 'experience' as const, key: 'mon_seed' as const },
  { day: 2, label: 'REFLECT', phase: 'experience' as const, key: 'tue_reflect' as const },
  { day: 3, label: 'CUE', phase: 'recognize' as const, key: 'wed_cue' as const },
  { day: 4, label: 'DEEPEN', phase: 'recognize' as const, key: 'thu_deepen' as const },
  { day: 5, label: 'CHOICE', phase: 'align' as const, key: 'fri_choice' as const },
  { day: 6, label: 'INTROSPECT', phase: 'align' as const, key: 'sat_introspect' as const },
  { day: 7, label: 'MIRROR', phase: 'mirror' as const, key: 'identity_line' as const },
];

export function JourneyWeekView({
  block,
  initialDay = 1,
  onBack,
  onWeekComplete,
  className = '',
}: JourneyWeekViewProps) {
  const [currentDay, setCurrentDay] = useState(initialDay);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [showDayCompletion, setShowDayCompletion] = useState(false);
  const [showWeekCompletion, setShowWeekCompletion] = useState(false);

  // Get instruction for a specific day
  const getInstruction = (dayConfig: typeof eraStructure[0]): string => {
    const { phase, key } = dayConfig;
    
    if (phase === 'experience') {
      return block.era.experience[key as keyof typeof block.era.experience];
    } else if (phase === 'recognize') {
      return block.era.recognize[key as keyof typeof block.era.recognize];
    } else if (phase === 'align') {
      return block.era.align[key as keyof typeof block.era.align];
    } else if (phase === 'mirror') {
      return block.era.sun_mirror.identity_line;
    }
    return '';
  };

  const handleDayComplete = (day: number) => {
    // Mark day as complete
    setCompletedDays([...completedDays, day]);
    
    // Show completion modal
    setShowDayCompletion(true);
  };

  const handleDayCompletionContinue = () => {
    setShowDayCompletion(false);

    // Check if week is complete
    if (currentDay === 7) {
      // Show week completion after brief delay
      setTimeout(() => setShowWeekCompletion(true), 300);
    } else {
      // Move to next day
      setCurrentDay(currentDay + 1);
    }
  };

  const handleWeekCompleteContinue = () => {
    setShowWeekCompletion(false);
    onWeekComplete?.(block.id);
  };

  const handleViewProgress = () => {
    setShowWeekCompletion(false);
    // Navigate to momentum/progress page
    onBack?.();
  };

  const currentDayConfig = eraStructure[currentDay - 1];
  const tomorrowConfig = currentDay < 7 ? eraStructure[currentDay] : null;

  return (
    <div className={`min-h-screen bg-[#0A0118] ${className}`}>
      {/* Header */}
      <div className="sticky top-0 bg-[#0A0118]/80 backdrop-blur-xl z-40 border-b border-white/10">
        <div className="container-responsive py-6">
          <div className="flex items-center justify-between mb-4">
            {onBack && (
              <Button
                onClick={onBack}
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Journey
              </Button>
            )}
            <div className="ml-auto" />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl text-white mb-2">{block.name}</h1>
            <p className="text-white/60">7-Day Practice Block</p>
          </div>

          <JourneyProgressBar currentDay={currentDay} totalDays={7} />
        </div>
      </div>

      {/* Desktop: Horizontal scroll of all days */}
      <div className="hidden lg:block container-responsive py-12">
        <div className="grid grid-cols-3 gap-6">
          {eraStructure.map((dayConfig) => {
            const instruction = getInstruction(dayConfig);
            const isComplete = completedDays.includes(dayConfig.day);
            const isCurrent = dayConfig.day === currentDay;

            return (
              <JourneyDayCard
                key={dayConfig.day}
                day={dayConfig.day}
                eraLabel={dayConfig.label}
                eraPhase={dayConfig.phase}
                instruction={instruction}
                isComplete={isComplete}
                isCurrent={isCurrent}
                onComplete={() => handleDayComplete(dayConfig.day)}
              />
            );
          })}
        </div>
      </div>

      {/* Mobile: Current day focus with prev/next peek */}
      <div className="lg:hidden container-responsive py-8">
        <div className="space-y-6">
          {/* Current day - large */}
          <JourneyDayCard
            day={currentDayConfig.day}
            eraLabel={currentDayConfig.label}
            eraPhase={currentDayConfig.phase}
            instruction={getInstruction(currentDayConfig)}
            isComplete={completedDays.includes(currentDayConfig.day)}
            isCurrent={true}
            onComplete={() => handleDayComplete(currentDayConfig.day)}
            className="scale-100"
          />

          {/* Tomorrow preview (if not last day) */}
          {tomorrowConfig && (
            <div className="opacity-40 scale-95 pointer-events-none">
              <JourneyDayCard
                day={tomorrowConfig.day}
                eraLabel={tomorrowConfig.label}
                eraPhase={tomorrowConfig.phase}
                instruction={getInstruction(tomorrowConfig)}
                isComplete={false}
                isCurrent={false}
                onComplete={() => {}}
              />
            </div>
          )}
        </div>
      </div>

      {/* Day completion modal */}
      {showDayCompletion && (
        <JourneyDayCompletion
          day={currentDay}
          tomorrowLabel={tomorrowConfig?.label}
          tomorrowPreview={tomorrowConfig ? getInstruction(tomorrowConfig) : undefined}
          onContinue={handleDayCompletionContinue}
        />
      )}

      {/* Week completion modal */}
      {showWeekCompletion && (
        <JourneyWeekCompletion
          blockName={block.name}
          nextBlockName="Building Emotional Awareness"
          nextBlockReason="Based on your progress with impulse control, LUMA recommends building deeper emotional literacy."
          onStartNext={handleWeekCompleteContinue}
          onViewProgress={handleViewProgress}
        />
      )}
    </div>
  );
}
