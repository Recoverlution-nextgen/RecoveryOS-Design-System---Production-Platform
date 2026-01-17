/**
 * SPECTRUM Response Component
 * 
 * Two-axis positioning for complex states
 * Psychology: Captures nuance, reveals paradoxes
 */

import { useState } from 'react';
import { motion } from 'motion/react';

interface SpectrumResponseProps {
  xLabel?: string;
  yLabel?: string;
  quadrants?: [string, string, string, string]; // [TopLeft, TopRight, BottomLeft, BottomRight]
  onRespond: (position: { x: number; y: number }) => void;
  pillarColor: string;
}

export function SpectrumResponse({
  xLabel = 'Safe ← → Unsafe',
  yLabel = 'Connected ← → Alone',
  quadrants = ['Safe & Connected', 'Unsafe & Connected', 'Safe & Alone', 'Unsafe & Alone'],
  onRespond,
  pillarColor
}: SpectrumResponseProps) {
  const canvasSize = 400;
  const [position, setPosition] = useState({ 
    x: canvasSize / 2, 
    y: canvasSize / 2 
  });

  const getCurrentQuadrant = () => {
    const isLeft = position.x < canvasSize / 2;
    const isTop = position.y < canvasSize / 2;
    
    if (isTop && isLeft) return quadrants[0];
    if (isTop && !isLeft) return quadrants[1];
    if (!isTop && isLeft) return quadrants[2];
    return quadrants[3];
  };

  const handleContinue = () => {
    // Normalize to -1 to 1
    const normalizedX = ((position.x - canvasSize / 2) / (canvasSize / 2));
    const normalizedY = ((position.y - canvasSize / 2) / (canvasSize / 2));
    onRespond({ x: normalizedX, y: normalizedY });
  };

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        Drag to map where you are
      </div>

      {/* Current quadrant */}
      <div className="text-center">
        <div 
          className="text-xl text-white"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 600,
            color: pillarColor
          }}
        >
          {getCurrentQuadrant()}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative mx-auto" style={{ width: canvasSize, height: canvasSize }}>
        {/* Grid */}
        <div 
          className="absolute inset-0 border border-white/20 bg-white/5"
          style={{ borderRadius: '0px' }}
        >
          {/* Vertical center line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white/20"
            style={{ left: '50%' }}
          />
          {/* Horizontal center line */}
          <div 
            className="absolute left-0 right-0 h-0.5 bg-white/20"
            style={{ top: '50%' }}
          />

          {/* Quadrant labels */}
          <div className="absolute top-2 left-2 text-xs text-white/40 max-w-[45%]">
            {quadrants[0]}
          </div>
          <div className="absolute top-2 right-2 text-xs text-white/40 text-right max-w-[45%]">
            {quadrants[1]}
          </div>
          <div className="absolute bottom-2 left-2 text-xs text-white/40 max-w-[45%]">
            {quadrants[2]}
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-white/40 text-right max-w-[45%]">
            {quadrants[3]}
          </div>
        </div>

        {/* Draggable marker */}
        <motion.div
          drag
          dragConstraints={{ 
            left: 0, 
            right: canvasSize - 40, 
            top: 0, 
            bottom: canvasSize - 40 
          }}
          dragElastic={0}
          onDrag={(_, info) => {
            setPosition({ x: info.point.x, y: info.point.y });
          }}
          className="absolute w-10 h-10 cursor-move flex items-center justify-center"
          style={{
            left: position.x - 20,
            top: position.y - 20,
            backgroundColor: pillarColor,
            borderRadius: '0px',
            touchAction: 'none'
          }}
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 1.2 }}
        >
          <div className="w-3 h-3 bg-white" style={{ borderRadius: '0px' }} />
        </motion.div>

        {/* Axis labels */}
        <div className="absolute left-0 right-0 text-center text-white/60 text-xs uppercase tracking-wider" style={{ top: -24 }}>
          {yLabel.split('←')[0].trim()}
        </div>
        <div className="absolute left-0 right-0 text-center text-white/60 text-xs uppercase tracking-wider" style={{ bottom: -24 }}>
          {yLabel.split('→')[1].trim()}
        </div>
        <div className="absolute top-0 bottom-0 flex items-center text-white/60 text-xs uppercase tracking-wider" style={{ left: -60, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {xLabel.split('←')[0].trim()}
        </div>
        <div className="absolute top-0 bottom-0 flex items-center text-white/60 text-xs uppercase tracking-wider" style={{ right: -60, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {xLabel.split('→')[1].trim()}
        </div>
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        className="w-full py-4 bg-white/20 hover:bg-white/30 text-white transition-colors mt-12"
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
