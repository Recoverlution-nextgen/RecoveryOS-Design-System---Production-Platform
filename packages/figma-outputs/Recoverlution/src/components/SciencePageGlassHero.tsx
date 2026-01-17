/**
 * SCIENCE PAGE GLASS HERO
 * 
 * Mission: Full-bleed hero with glass treatment matching Platform page specifications
 * Design DNA: rgba(255,255,255,0.05) background, 48px blur, crisp white text
 * Pattern: Full-bleed 3D asset with floating glass panel overlay
 */

import { motion } from 'motion/react';
import { Brain } from 'lucide-react';
import dashboardOSMockup from "figma:asset/70bd8359e020fc2f6a942c935216c7bac6feec53.png";

export function SciencePageGlassHero() {
  return (
    <section 
      className="py-36 md:py-44 overflow-hidden"
      style={{
        background: '#FFFFFF'
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Full-Bleed Container with 3D Asset and Glass Panel */}
        <div className="relative" style={{ borderRadius: '0px' }}>
          
          {/* Full-Bleed 3D Asset Background */}
          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden" style={{ 
            borderRadius: '0px',
            boxShadow: '0 48px 140px rgba(87, 57, 251, 0.35), 0 24px 72px rgba(64, 224, 208, 0.28)'
          }}>
            <motion.img 
              src={dashboardOSMockup}
              alt="The Human Cognition Platform - Neuroscience-backed recovery architecture"
              className="w-full h-full object-cover"
              style={{ position: 'absolute', inset: 0, zIndex: 1 }}
              initial={{ opacity: 0, scale: 1.06 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
            />
            
            {/* TOP LEFT - Headline Glass Panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
              className="absolute top-10 left-10 right-10 lg:right-auto w-full lg:w-[560px] border"
              style={{
                zIndex: 10,
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.05)),
                  radial-gradient(circle at 35% 25%, rgba(87, 57, 251, 0.14) 0%, transparent 55%)
                `,
                borderColor: 'rgba(255, 255, 255, 0.22)',
                borderRadius: '0px',
                backdropFilter: 'blur(48px) saturate(200%)',
                WebkitBackdropFilter: 'blur(48px) saturate(200%)',
                boxShadow: `
                  0 12px 40px rgba(0, 0, 0, 0.45),
                  inset 0 2px 0 rgba(255, 255, 255, 0.25),
                  inset 0 0 100px rgba(87, 57, 251, 0.10),
                  0 0 80px rgba(87, 57, 251, 0.18)
                `
              }}
            >
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(87, 57, 251, 0.18) 30%, rgba(87, 57, 251, 0.10) 50%, rgba(87, 57, 251, 0.18) 70%, transparent 100%)',
                  animation: 'shimmer-glass 14s ease-in-out infinite',
                  borderRadius: '0px'
                }}
              />

              <div className="relative p-10 lg:p-12">
                
                {/* Eyebrow Badge - FULL GLASS */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="inline-flex items-center gap-3 px-5 py-3 mb-7 self-start"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0px',
                    backdropFilter: 'blur(48px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(48px) saturate(200%)'
                  }}
                >
                  <Brain 
                    size={16} 
                    style={{ 
                      color: '#FFFFFF'
                    }} 
                  />
                  <span 
                    className="uppercase tracking-wider text-white"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      letterSpacing: '0.15em'
                    }}
                  >
                    THE HUMAN BASELINE
                  </span>
                </motion.div>

                {/* Main Headline - WHITE TEXT (on glass) */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.65 }}
                  className="mb-5"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 800, 
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#FFFFFF'
                  }}
                >
                  The human baseline<br />
                  for modern systems.
                </motion.h1>

                {/* Body Copy - WHITE TEXT (on glass) */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.75 }}
                  style={{ 
                    fontSize: '1.0625rem', 
                    lineHeight: 1.7,
                    letterSpacing: '-0.005em',
                    maxWidth: '460px',
                    color: 'rgba(255, 255, 255, 0.90)'
                  }}
                >
                  Load aligned to biology, trust native, breakthroughs in motion. Pace won't slow. Patients must drive.
                </motion.p>

              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
