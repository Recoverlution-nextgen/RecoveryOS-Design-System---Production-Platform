/**
 * CONSTELLATION Response Component
 * 
 * Spatial positioning of beliefs/concepts around center point
 * Psychology: Map relationships, distance, closeness - used in family systems therapy
 */

import { useState } from 'react';
import { motion } from 'motion/react';

interface ConstellationItem {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface ConstellationResponseProps {
  items: string[];
  centerLabel?: string;
  onRespond: (positions: { label: string; x: number; y: number; distance: number }[]) => void;
  pillarColor: string;
}

export function ConstellationResponse({
  items,
  centerLabel = 'YOU',
  onRespond,
  pillarColor
}: ConstellationResponseProps) {
  const canvasSize = 400;
  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;

  // Initialize items in a circle around center
  const [constellationItems, setConstellationItems] = useState<ConstellationItem[]>(
    items.map((label, index) => {
      const angle = (index / items.length) * 2 * Math.PI;
      const radius = canvasSize * 0.3;
      return {
        id: `item-${index}`,
        label,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    })
  );

  const handleDrag = (id: string, x: number, y: number) => {
    setConstellationItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, x, y } : item
      )
    );
  };

  const calculateDistance = (x: number, y: number) => {
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleContinue = () => {
    const results = constellationItems.map(item => ({
      label: item.label,
      x: item.x,
      y: item.y,
      distance: calculateDistance(item.x, item.y)
    }));
    onRespond(results);
  };

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        Drag to show closeness. Closer to center = more present
      </div>

      {/* Canvas */}
      <div 
        className="relative mx-auto border border-white/20 bg-white/5"
        style={{ 
          width: canvasSize, 
          height: canvasSize,
          borderRadius: '0px'
        }}
      >
        {/* Distance rings (subtle guides) */}
        <svg className="absolute inset-0 pointer-events-none">
          <circle
            cx={centerX}
            cy={centerY}
            r={canvasSize * 0.15}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={canvasSize * 0.3}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={canvasSize * 0.45}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        </svg>

        {/* Center point */}
        <div
          className="absolute"
          style={{
            left: centerX - 30,
            top: centerY - 30,
            width: 60,
            height: 60,
          }}
        >
          <div
            className="w-full h-full flex items-center justify-center text-white"
            style={{
              backgroundColor: pillarColor,
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.75rem'
            }}
          >
            {centerLabel}
          </div>
        </div>

        {/* Draggable items */}
        {constellationItems.map(item => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={{ 
              left: 0, 
              right: canvasSize - 80, 
              top: 0, 
              bottom: canvasSize - 40 
            }}
            dragElastic={0}
            onDrag={(_, info) => {
              handleDrag(item.id, info.point.x, info.point.y);
            }}
            className="absolute cursor-move px-3 py-2 bg-white/20 border border-white/40 text-white text-sm"
            style={{
              left: item.x - 40,
              top: item.y - 20,
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              touchAction: 'none'
            }}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.1, zIndex: 10 }}
          >
            {item.label}
          </motion.div>
        ))}
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
