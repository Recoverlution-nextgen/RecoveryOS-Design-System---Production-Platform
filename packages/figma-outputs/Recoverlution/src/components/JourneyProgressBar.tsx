/**
 * Journey Progress Bar
 * Shows 1/7, 2/7, etc. with visual progress indicator
 */

interface JourneyProgressBarProps {
  currentDay: number; // 1-7
  totalDays?: number; // Default 7
  className?: string;
}

export function JourneyProgressBar({ 
  currentDay, 
  totalDays = 7,
  className = '' 
}: JourneyProgressBarProps) {
  const progress = (currentDay / totalDays) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Text indicator */}
      <div className="flex items-center justify-between">
        <span className="text-white/60">Day {currentDay} of {totalDays}</span>
        <span className="text-white/60">{Math.round(progress)}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Day dots */}
      <div className="flex items-center justify-between pt-1">
        {Array.from({ length: totalDays }).map((_, index) => {
          const dayNum = index + 1;
          const isComplete = dayNum < currentDay;
          const isCurrent = dayNum === currentDay;
          const isUpcoming = dayNum > currentDay;

          return (
            <div
              key={dayNum}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${isComplete ? 'bg-[#3E2BB8] scale-110' : ''}
                ${isCurrent ? 'bg-[#5739FB] scale-125 ring-2 ring-[#5739FB]/30' : ''}
                ${isUpcoming ? 'bg-white/20' : ''}
              `}
            />
          );
        })}
      </div>
    </div>
  );
}
