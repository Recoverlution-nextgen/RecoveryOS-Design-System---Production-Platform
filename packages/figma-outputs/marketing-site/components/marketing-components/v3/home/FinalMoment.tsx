import { motion } from 'motion/react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { CTAButton } from '../shared/CTAButton';

export function FinalMoment() {
  // Reuse ATLAS constellation from AtlasConstellation but simplified
  const primitives = [
    { name: "Orient", x: 50, y: 20 },
    { name: "Downshift", x: 30, y: 40 },
    { name: "Name", x: 70, y: 40 },
    { name: "Move", x: 25, y: 60 },
    { name: "Receipt", x: 50, y: 65 },
    { name: "Transfer", x: 75, y: 60 },
    { name: "Repair", x: 40, y: 85 },
    { name: "Witness", x: 60, y: 85 }
  ];

  return (
    <SectionWrapper background="darker" className="py-40">
      {/* ATLAS Constellation (Complete & Glowing) */}
      <div className="relative w-full h-[400px] max-w-3xl mx-auto mb-20">
        {/* Center glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] opacity-20 blur-3xl"
        />

        {/* Nodes */}
        {primitives.map((primitive, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="absolute"
            style={{
              left: `${primitive.x}%`,
              top: `${primitive.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Breathing glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2
              }}
              className="absolute inset-0 rounded-full bg-[#5739FB] blur-xl"
              style={{ width: '32px', height: '32px', margin: '-16px' }}
            />

            {/* Node */}
            <div className="relative w-4 h-4 rounded-full bg-[#5739FB] border-2 border-white/70" />
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center space-y-8"
      >
        <p className="text-2xl md:text-3xl text-white/80">
          The continuity infrastructure.
        </p>
        <p className="text-xl md:text-2xl text-white/60">
          Built for the 167 hours where life happens.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <CTAButton href="/v3/demo" variant="primary" size="lg">
            Experience ATLAS
          </CTAButton>
          <CTAButton href="/v3/demo" variant="outline" size="lg">
            Speak with Us
          </CTAButton>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
