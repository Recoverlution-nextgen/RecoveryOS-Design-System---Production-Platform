/**
 * DIAL Response Component
 * 
 * Circular intensity selector
 * Psychology: Energy levels, arousal, activation states
 */

import { useState } from 'react';
import { motion } from 'motion/react';

interface DialResponseProps {
  minLabel?: string;
  maxLabel?: string;
  colorStart?: string;
  colorEnd?: string;
  onRespond: (value: number) => void;
}

export function DialResponse({
  minLabel = 'Calm',
  maxLabel = 'Activated',
  colorStart = '#3B82F6', // Blue
  colorEnd = '#EF4444', // Red
  onRespond
}: DialResponseProps) {
  const [value, setValue] = useState(50); // 0-100
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateValueFromMouse(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    updateValueFromMouse(touch.clientX, touch.clientY);
  };

  const updateValueFromMouse = (clientX: number, clientY: number) => {
    const dial = document.getElementById('dial-container');
    if (!dial) return;

    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;

    const newValue = Math.round((angle / 360) * 100);
    setValue(newValue);
  };

  const getColor = () => {
    const ratio = value / 100;
    // Interpolate between colorStart and colorEnd
    const r1 = parseInt(colorStart.slice(1, 3), 16);
    const g1 = parseInt(colorStart.slice(3, 5), 16);
    const b1 = parseInt(colorStart.slice(5, 7), 16);
    const r2 = parseInt(colorEnd.slice(1, 3), 16);
    const g2 = parseInt(colorEnd.slice(3, 5), 16);
    const b2 = parseInt(colorEnd.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const angle = (value / 100) * 360;

  const handleContinue = () => {
    onRespond(value);
  };

  return (
    <div className="space-y-8">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        Rotate to select intensity
      </div>

      {/* Dial */}
      <div 
        id="dial-container"
        className="relative mx-auto"
        style={{ width: 200, height: 200 }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={() => setIsDragging(false)}
        onTouchEnd={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Outer ring */}
        <svg
          width="200"
          height="200"
          className="absolute inset-0"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <defs>
            <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colorStart} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#dialGradient)"
            strokeWidth="8"
            strokeDasharray={`${(angle / 360) * 565} 565`}
          />
        </svg>

        {/* Center display */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <div 
            className="text-5xl mb-2"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: getColor()
            }}
          >
            {value}
          </div>
          <div className="text-white/60 text-xs uppercase tracking-wider">
            {value < 50 ? minLabel : maxLabel}
          </div>
        </div>

        {/* Draggable handle */}
        <motion.div
          className="absolute w-10 h-10 bg-white border-4 cursor-move flex items-center justify-center"
          style={{
            top: '50%',
            left: '50%',
            marginTop: '-5px',
            marginLeft: '-5px',
            borderColor: getColor(),
            borderRadius: '0px',
            touchAction: 'none'
          }}
          animate={{
            x: Math.cos((angle - 90) * (Math.PI / 180)) * 90 - 15,
            y: Math.sin((angle - 90) * (Math.PI / 180)) * 90 - 15
          }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 1.2 }}
        >
          <div 
            className="w-3 h-3" 
            style={{ 
              backgroundColor: getColor(),
              borderRadius: '0px'
            }} 
          />
        </motion.div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-white/60 text-sm">
        <div>{minLabel}</div>
        <div>{maxLabel}</div>
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
