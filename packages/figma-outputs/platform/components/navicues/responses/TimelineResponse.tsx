/**
 * TIMELINE Response Component
 * 
 * Place event/belief on temporal line
 * Psychology: Process memory, track change, project future
 */

import { useState } from 'react';
import { motion } from 'motion/react';

interface TimelineResponseProps {
  labels?: string[];
  minLabel?: string;
  maxLabel?: string;
  onRespond: (position: number) => void;
  pillarColor: string;
}

export function TimelineResponse({
  labels = ['Childhood', 'Teen', 'Young Adult', 'Now', 'Future'],
  minLabel = 'PAST',
  maxLabel = 'FUTURE',
  onRespond,
  pillarColor
}: TimelineResponseProps) {
  const [position, setPosition] = useState(50); // 0-100

  const handleContinue = () => {
    onRespond(position);
  };

  const getCurrentLabel = () => {
    const index = Math.floor((position / 100) * (labels.length - 1));
    return labels[Math.min(index, labels.length - 1)];
  };

  return (
    <div className="space-y-8">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        Mark where this belongs on your timeline
      </div>

      {/* Current selection */}
      <div className="text-center">
        <div 
          className="text-3xl text-white mb-2"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700,
            color: pillarColor
          }}
        >
          {getCurrentLabel()}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative px-6">
        {/* Labels above line */}
        <div className="flex justify-between mb-4 text-xs text-white/60 uppercase tracking-wider">
          {labels.map((label, idx) => (
            <div 
              key={idx}
              className="text-center"
              style={{ 
                width: `${100 / labels.length}%`,
                fontFamily: 'var(--font-display)',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Timeline line */}
        <div className="relative h-2 bg-white/20" style={{ borderRadius: '0px' }}>
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${position}%`,
              backgroundColor: pillarColor,
              borderRadius: '0px'
            }}
            animate={{ width: `${position}%` }}
            transition={{ duration: 0.2 }}
          />

          {/* Tick marks */}
          {labels.map((_, idx) => (
            <div
              key={idx}
              className="absolute top-0 bottom-0 w-0.5 bg-white/40"
              style={{
                left: `${(idx / (labels.length - 1)) * 100}%`
              }}
            />
          ))}
        </div>

        {/* Draggable marker */}
        <div className="relative h-12">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(_, info) => {
              const containerWidth = info.point.x;
              const parentWidth = (info.point.x / position) * 100;
              const newPosition = Math.max(0, Math.min(100, (containerWidth / parentWidth) * 100));
              setPosition(newPosition);
            }}
            className="absolute top-0 w-12 h-12 bg-white border-4 cursor-move flex items-center justify-center"
            style={{
              left: `calc(${position}% - 24px)`,
              borderColor: pillarColor,
              borderRadius: '0px',
              touchAction: 'none'
            }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.2 }}
          >
            <div className="w-2 h-2" style={{ backgroundColor: pillarColor, borderRadius: '0px' }} />
          </motion.div>
        </div>

        {/* Slider input (hidden but functional) */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(parseInt(e.target.value))}
          className="absolute top-8 left-0 right-0 w-full h-2 opacity-0 cursor-pointer"
        />

        {/* Min/Max labels */}
        <div className="flex justify-between mt-2 text-white/40 text-xs uppercase tracking-wider">
          <div>{minLabel}</div>
          <div>{maxLabel}</div>
        </div>
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        className="w-full py-4 bg-white/20 hover:bg-white/30 text-white transition-colors"
        style={{
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 600
        }}
      >
        Continue
      </button>
    </div>
  );
}
