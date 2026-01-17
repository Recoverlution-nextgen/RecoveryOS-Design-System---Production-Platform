/**
 * THERAPY INNOVATION SECTION V2
 * Split-Screen Theater: Editorial, Asset-First, Premium
 * 
 * Pattern: LEFT sidebar selectors | RIGHT large asset with overlay
 * Interaction: Tap to explore (one innovation at a time)
 * Focus: Breathable, focused, magazine-like presentation
 */

import { useState } from 'react';
import { Brain, Activity, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BRAND = {
  mid: '#5739FB',
  dark: '#3E2BB8',
  cyan: '#40E0D0'
};

const innovations = [
  {
    id: 'adaptive',
    icon: Brain,
    miniHeadline: 'Adaptive Intelligence',
    roleShort: 'Intelligent Timing',
    headline: 'Reads State. Adapts Delivery.',
    description: 'Generic content delivered at the wrong moment creates resistance. Recoverlution reads nervous system state in real time—dysregulated? We deliver regulation practices. Stable? Identity work. High capacity? Decision rehearsal. The right intervention at the biological moment they can integrate it.',
    impact: 'Eliminates therapeutic resistance by matching intervention to biological readiness.',
    color: BRAND.mid,
    image: 'https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwYnJhaW4lMjBhZGFwdGl2ZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0Nzc1MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'clinical',
    icon: Activity,
    miniHeadline: 'Clinical Translation',
    roleShort: 'Your Method, Sentient',
    headline: 'Your Frameworks Become Infrastructure.',
    description: 'Your clinical depth lives in your head. It disappears when you leave the room. We translate your therapeutic method into adaptive architecture—your reframing techniques become intelligent prompts, your regulation protocols become just-in-time interventions, your identity work becomes accumulating micro-proofs. The infrastructure carries your voice into every moment between sessions.',
    impact: 'Transforms therapist expertise into scalable, always-available clinical infrastructure.',
    color: BRAND.dark,
    image: 'https://images.unsplash.com/photo-1533042789716-e9a9c97cf4ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGluaWNhbCUyMGFyY2hpdGVjdHVyZSUyMGluZnJhc3RydWN0dXJlJTIwYmx1ZXByaW50fGVufDF8fHx8MTc2NDc3NTEzOHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'scalable',
    icon: Zap,
    miniHeadline: 'Scalable Depth',
    roleShort: 'Depth Without Dilution',
    headline: 'Individual Precision. Infinite Scale.',
    description: 'Most platforms force a choice: personalized care or scalable operations. You should not have to choose. Recoverlution personalizes at the individual level while scaling infinitely. Each client receives a unique pathway calibrated to their patterns, pace, and readiness. You maintain therapeutic depth across ten clients or a hundred. The system adapts, the quality stays constant.',
    impact: 'Enables infinite scale while maintaining individual therapeutic precision and depth.',
    color: BRAND.cyan,
    image: 'https://images.unsplash.com/photo-1602503497726-dc6cfaab7e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVjaXNpb24lMjBkZXB0aCUyMHBlcnNvbmFsaXphdGlvbiUyMHNjYWxlfGVufDF8fHx8MTc2NDc3NTEzOHww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export default function TherapyInnovationSectionV2() {
  const [activeInnovation, setActiveInnovation] = useState(innovations[0]);

  const handleInnovationClick = (innovation: typeof innovations[0]) => {
    if (innovation.id === activeInnovation.id) return;
    setActiveInnovation(innovation);
  };

  return (
    <section 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: '#FFFFFF'
      }}
    >
      
      {/* Subtle ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        
        {/* DESKTOP: SPLIT LAYOUT | MOBILE: STACKED */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-start">
          
          {/* LEFT SIDEBAR: Section Header + Selectors */}
          <div className="space-y-8">
            
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="flex items-center gap-2 mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.625rem, 1.5vw, 0.6875rem)',
                  letterSpacing: '0.12em',
                  color: BRAND.mid,
                  textTransform: 'uppercase'
                }}
              >
                <Brain size={14} style={{ strokeWidth: 2.5 }} />
                <span>THE INNOVATION</span>
              </div>
              
              <h2 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: '#111827',
                  marginBottom: '1rem'
                }}
              >
                Clinical depth.<br />
                <span style={{ color: BRAND.mid }}>Now infrastructure.</span>
              </h2>
              
              <p 
                style={{
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  lineHeight: 1.6,
                  color: '#6B7280',
                  fontWeight: 500
                }}
              >
                Neuroadaptive architecture that makes your therapeutic frameworks scalable, responsive, and always available.
              </p>
            </motion.div>

            {/* Selector Cards - Stack Vertically */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {innovations.map((innovation) => {
                const InnovationIcon = innovation.icon;
                const isActive = activeInnovation.id === innovation.id;
                
                return (
                  <button
                    key={innovation.id}
                    onClick={() => handleInnovationClick(innovation)}
                    className="group relative w-full text-left transition-all duration-300"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${innovation.color}15, ${innovation.color}08)`
                        : 'transparent',
                      border: `1px solid ${isActive ? `${innovation.color}40` : 'rgba(100, 116, 139, 0.15)'}`,
                      borderRadius: '0px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      boxShadow: isActive
                        ? `0 8px 24px ${innovation.color}15`
                        : 'none'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div 
                        className="flex-shrink-0 w-12 h-12 flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isActive 
                            ? `linear-gradient(135deg, ${innovation.color}25, ${innovation.color}15)`
                            : `${innovation.color}08`,
                          borderRadius: '0px'
                        }}
                      >
                        <InnovationIcon 
                          size={22} 
                          style={{ 
                            color: isActive ? innovation.color : `${innovation.color}99`,
                            strokeWidth: isActive ? 2.5 : 2,
                            transition: 'all 0.3s ease'
                          }} 
                        />
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div 
                          className="mb-1"
                          style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontWeight: 700,
                            fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                            letterSpacing: '-0.01em',
                            color: isActive ? innovation.color : '#374151',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {innovation.miniHeadline}
                        </div>
                        <div
                          style={{
                            fontSize: 'clamp(0.8125rem, 1.8vw, 0.875rem)',
                            fontWeight: 500,
                            color: isActive ? '#4B5563' : '#9CA3AF',
                            transition: 'all 0.3s ease',
                            lineHeight: 1.4
                          }}
                        >
                          {innovation.roleShort}
                        </div>
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="flex-shrink-0 w-1 h-full absolute right-0 top-0"
                          style={{
                            background: innovation.color,
                            borderRadius: '0px'
                          }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </motion.div>

          </div>

          {/* RIGHT: Large Asset with Text Overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeInnovation.id}
              className="relative"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              
              {/* Asset Container */}
              <div 
                className="relative overflow-hidden aspect-[4/3] lg:aspect-[3/4]"
                style={{
                  background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 100%)',
                  border: `1px solid ${activeInnovation.color}25`,
                  borderRadius: '0px',
                  boxShadow: `0 32px 80px ${activeInnovation.color}12, 0 16px 40px rgba(0, 0, 0, 0.08)`
                }}
              >
                {/* Background Image */}
                <motion.img 
                  key={activeInnovation.id}
                  src={activeInnovation.image}
                  alt={activeInnovation.headline}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Gradient Overlay for Text Readability */}
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 70%)',
                    zIndex: 2
                  }}
                />

                {/* Text Overlay - Bottom Left */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10"
                  style={{
                    zIndex: 10
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  
                  {/* Icon Badge */}
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-2 mb-4 backdrop-blur-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0px'
                    }}
                  >
                    {(() => {
                      const Icon = activeInnovation.icon;
                      return <Icon size={16} style={{ color: '#FFFFFF' }} />;
                    })()}
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 700,
                        fontSize: 'clamp(0.625rem, 1.5vw, 0.6875rem)',
                        letterSpacing: '0.12em',
                        color: '#FFFFFF',
                        textTransform: 'uppercase'
                      }}
                    >
                      {activeInnovation.miniHeadline}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h3 
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      color: '#FFFFFF'
                    }}
                  >
                    {activeInnovation.headline}
                  </h3>

                  {/* Description */}
                  <p 
                    className="mb-5 max-w-2xl"
                    style={{
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    {activeInnovation.description}
                  </p>

                  {/* Impact Statement - With Left Border */}
                  <div 
                    className="pl-4"
                    style={{
                      borderLeft: '2px solid rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    <div 
                      className="mb-2"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(0.625rem, 1.5vw, 0.6875rem)',
                        letterSpacing: '0.12em',
                        color: 'rgba(255, 255, 255, 0.8)',
                        textTransform: 'uppercase'
                      }}
                    >
                      IMPACT
                    </div>
                    <p 
                      style={{
                        fontSize: 'clamp(0.8125rem, 1.8vw, 0.875rem)',
                        lineHeight: 1.5,
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.95)'
                      }}
                    >
                      {activeInnovation.impact}
                    </p>
                  </div>

                </motion.div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
