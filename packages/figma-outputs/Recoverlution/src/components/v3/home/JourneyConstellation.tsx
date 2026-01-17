import { useState } from 'react';
import { motion } from 'motion/react';
import { navigateToPage } from '../../../utils/router';
import { SectionWrapper } from '../shared/SectionWrapper';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';

interface Journey {
  id: string;
  icon: string;
  label: string;
  story: string;
  href: string;
  color: string;
}

const journeys: Journey[] = [
  {
    id: 'individual',
    icon: '🌅',
    label: 'Individual',
    story: 'The return to baseline. The capacity to meet yourself without flinching. The proof that change is real.',
    href: '/v3/individuals',
    color: '#5739FB'
  },
  {
    id: 'companion',
    icon: '🌿',
    label: 'Companion',
    story: 'The relational repair. Navigation through their own transformation. Support without suffocation.',
    href: '/v3/companions',
    color: '#10B981'
  },
  {
    id: 'professional',
    icon: '🪶',
    label: 'Professional',
    story: 'The extension of care. The work that holds between sessions. Clinical resilience without burnout.',
    href: '/v3/professionals',
    color: '#F59E0B'
  },
  {
    id: 'organisation',
    icon: '🏔️',
    label: 'Organisation',
    story: 'The continuity node. Infrastructure that eliminates the discharge cliff. Return on impact, not bed days.',
    href: '/v3/organisations',
    color: '#3E2BB8'
  }
];

export function JourneyConstellation() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleJourneyClick = (href: string) => {
    // Extract the page name from the href (e.g., '/v3/individuals' -> 'v3-individuals')
    const pageName = href.replace('/', '').replace(/\//g, '-');
    navigateToPage(pageName as any);
  };

  return (
    <SectionWrapper background="gradient" className="py-40">
      <div className="text-center mb-20">
        <Headline level={2} className="mb-6">
          Everyone has a journey.
        </Headline>
        <Subhead className="max-w-3xl mx-auto">
          Same scaffold. Different lens.
        </Subhead>
      </div>

      {/* Constellation Grid */}
      <div className="relative max-w-6xl mx-auto">
        {/* Center ATLAS glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] opacity-20 blur-3xl" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {journeys.map((journey) => (
            <motion.div
              key={journey.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setHoveredId(journey.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleJourneyClick(journey.href)}
              className="relative group cursor-pointer"
            >
              {/* Connection line to center */}
              <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
                <line
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke={journey.color}
                  strokeWidth="2"
                  opacity="0.2"
                  className="group-hover:opacity-50 transition-opacity"
                />
              </svg>

              {/* Node */}
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon circle */}
                <motion.div
                  animate={hoveredId === journey.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${journey.color}33, ${journey.color}11)`,
                    border: `2px solid ${journey.color}55`
                  }}
                >
                  {/* Glow */}
                  <motion.div
                    animate={hoveredId === journey.id ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ backgroundColor: journey.color, opacity: 0.2 }}
                  />
                  
                  <span className="relative text-4xl">{journey.icon}</span>
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white">
                  {journey.label}
                </h3>

                {/* Story (appears on hover) */}
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={hoveredId === journey.id ? { 
                    opacity: 1, 
                    height: 'auto' 
                  } : { 
                    opacity: 0, 
                    height: 0 
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-white/70 leading-relaxed overflow-hidden"
                >
                  {journey.story}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center mt-20 space-y-4"
      >
        <p className="text-lg md:text-xl text-white/70">
          Everyone uses the same eight primitives.
        </p>
        <p className="text-lg md:text-xl text-white/70">
          Everyone runs their own journey.
        </p>
        <p className="text-lg md:text-xl text-white/70">
          Everyone contributes to the mesh.
        </p>
        <p className="text-xl md:text-2xl text-white font-semibold mt-8">
          Choose your path →
        </p>
      </motion.div>
    </SectionWrapper>
  );
}