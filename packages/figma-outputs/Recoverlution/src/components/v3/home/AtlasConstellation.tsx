import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';

interface Primitive {
  id: number;
  name: string;
  position: { x: number; y: number };
  description: string;
}

const primitives: Primitive[] = [
  { id: 1, name: "Orient", position: { x: 50, y: 15 }, description: "Find ground" },
  { id: 2, name: "Downshift", position: { x: 30, y: 35 }, description: "Regulate first" },
  { id: 3, name: "Name", position: { x: 70, y: 35 }, description: "Pattern recognition" },
  { id: 4, name: "Move", position: { x: 25, y: 55 }, description: "The next inch" },
  { id: 5, name: "Receipt", position: { x: 50, y: 60 }, description: "Proof of change" },
  { id: 6, name: "Transfer", position: { x: 75, y: 55 }, description: "Hold under load?" },
  { id: 7, name: "Repair", position: { x: 40, y: 80 }, description: "Return speed" },
  { id: 8, name: "Witness", position: { x: 60, y: 80 }, description: "Seen, not surveilled" }
];

const connections = [
  [1, 2], [1, 3],
  [2, 4], [3, 6],
  [4, 5], [5, 6],
  [4, 7], [6, 8],
  [7, 8]
];

export function AtlasConstellation() {
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate nodes appearing
    primitives.forEach((primitive, index) => {
      setTimeout(() => {
        setVisibleNodes(prev => [...prev, primitive.id]);
      }, index * 400);
    });

    // Animate lines after nodes
    setTimeout(() => {
      connections.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLines(prev => [...prev, index]);
        }, index * 200);
      });
    }, primitives.length * 400);
  }, []);

  return (
    <SectionWrapper background="darker" className="py-40">
      <div className="text-center mb-20">
        <Headline level={2} className="mb-6">
          Meet ATLAS
        </Headline>
        <Subhead className="max-w-3xl mx-auto">
          The scaffold for oneness. The operating system for the human baseline.
        </Subhead>
      </div>

      {/* Constellation Canvas */}
      <div 
        ref={canvasRef}
        className="relative w-full h-[600px] max-w-4xl mx-auto"
      >
        {/* Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {connections.map((connection, index) => {
            const start = primitives.find(p => p.id === connection[0]);
            const end = primitives.find(p => p.id === connection[1]);
            if (!start || !end) return null;

            const isVisible = visibleLines.includes(index);

            return (
              <motion.line
                key={index}
                x1={`${start.position.x}%`}
                y1={`${start.position.y}%`}
                x2={`${end.position.x}%`}
                y2={`${end.position.y}%`}
                stroke="rgba(87, 57, 251, 0.3)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {primitives.map((primitive) => {
          const isVisible = visibleNodes.includes(primitive.id);

          return (
            <motion.div
              key={primitive.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute"
              style={{
                left: `${primitive.position.x}%`,
                top: `${primitive.position.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
            >
              {/* Glow effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-full bg-[#5739FB] blur-xl"
                style={{ width: '40px', height: '40px', margin: '-20px' }}
              />

              {/* Node circle */}
              <div className="relative w-4 h-4 rounded-full bg-[#5739FB] border-2 border-white/50" />

              {/* Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-center whitespace-nowrap"
              >
                <div className="text-white font-semibold text-sm">{primitive.name}</div>
                <div className="text-white/50 text-xs mt-1">{primitive.description}</div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Text Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5, duration: 1 }}
        className="text-center mt-20 space-y-4"
      >
        <p className="text-2xl md:text-3xl text-white font-semibold">
          Eight primitives.
        </p>
        <p className="text-xl md:text-2xl text-white/70">
          Not intervention types. Installation steps.
        </p>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mt-6">
          The instruction set for transformation.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
