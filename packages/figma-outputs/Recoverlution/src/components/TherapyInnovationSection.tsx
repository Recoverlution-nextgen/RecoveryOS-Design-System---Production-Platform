/**
 * THERAPY INNOVATION SECTION
 * 
 * Section 3 in therapy page narrative flow
 * Answers: "WHAT IS RECOVERLUTION?" at its core
 * 
 * The Innovation: Clinical depth becomes adaptive infrastructure
 * 
 * Pattern: 3-tab system (like homepage Section2ArchitectingDNA)
 * Visual: Large asset with text overlay
 * Focus: Prove this is neuroadaptive infrastructure, not another homework app
 */

import { useState } from 'react';
import { Brain, Activity, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuzzTag } from './BuzzTag';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, TOUCH_TARGETS } from '../utils/mobileResponsive';

const BRAND = {
  mid: '#5739FB',
  dark: '#3E2BB8',
  cyan: '#40E0D0'
};

// Asset imports - Using therapy-specific visuals
import innovationAdaptiveAsset from 'figma:asset/bbdd46885c6d7c44cf5e832ddd2d8ac3d24d3a0f.png';
import innovationClinicalAsset from 'figma:asset/21ab7c3d05a2f009507ba3a3127b589b26fef6b5.png';
import innovationScalableAsset from 'figma:asset/73f4a98210b635195460d609ccf4085c6a758e40.png';

const innovations = [
  {
    id: 'adaptive',
    icon: Brain,
    tagline: 'RESPONSIVE INTERVENTION',
    roleShort: 'Reads state, adapts delivery',
    contentEyebrow: 'THE ADAPTIVE CORE',
    headline: 'Intelligent Timing',
    openingLine: 'Generic content delivered at the wrong moment creates resistance, not recovery. Your clients need interventions timed to their actual readiness.',
    narrative: 'Recoverlution reads nervous system state in real time. When a client is dysregulated, we deliver regulation practices. When they are stable, we offer identity work. When capacity is high, we introduce decision rehearsal. The right intervention, at the biological moment they can actually integrate it.',
    impact: 'Eliminates therapeutic resistance by matching intervention to biological readiness',
    mechanism: 'State-responsive delivery engine that adapts content based on real-time nervous system signals',
    buzzTags: ['Neural Readiness', 'Adaptive Delivery', 'State-Responsive'],
    color: BRAND.mid,
    image: innovationAdaptiveAsset
  },
  {
    id: 'clinical',
    icon: Activity,
    tagline: 'THERAPEUTIC INFRASTRUCTURE',
    roleShort: 'Your depth, engineered',
    contentEyebrow: 'THE TRANSLATION ENGINE',
    headline: 'Your Method, Sentient',
    openingLine: 'Your clinical frameworks live in your head. They disappear when you are not in the room. Recovery needs your depth available between sessions.',
    narrative: 'We translate your therapeutic method into adaptive architecture. Your reframing techniques become intelligent prompts. Your regulation protocols become just-in-time interventions. Your identity work becomes accumulating micro-proofs. The infrastructure carries your voice, your values, your clinical standards into every moment between sessions.',
    impact: 'Transforms therapist expertise into scalable, always-available clinical infrastructure',
    mechanism: 'Clinical framework translation system that encodes therapeutic depth into adaptive pathways',
    buzzTags: ['Framework Translation', 'Clinical Encoding', 'Therapeutic Infrastructure'],
    color: BRAND.dark,
    image: innovationClinicalAsset
  },
  {
    id: 'scalable',
    icon: Zap,
    tagline: 'PERSONALIZATION AT SCALE',
    roleShort: 'Individual, infinite',
    contentEyebrow: 'THE SCALING SOLUTION',
    headline: 'Depth Without Dilution',
    openingLine: 'Most platforms force a choice: personalized care or scalable operations. Individual attention or financial sustainability. You should not have to choose.',
    narrative: 'Recoverlution personalizes at the individual level while scaling infinitely. Each client receives a unique pathway calibrated to their patterns, pace, and readiness. You maintain therapeutic depth across ten clients or a hundred. The system adapts, the quality stays constant, and your capacity multiplies without compromise.',
    impact: 'Enables infinite scale while maintaining individual therapeutic precision and depth',
    mechanism: 'Individualized pathway engine that personalizes without requiring manual customization',
    buzzTags: ['Individual Precision', 'Infinite Scale', 'Quality Preservation'],
    color: BRAND.cyan,
    image: innovationScalableAsset
  }
];

export default function TherapyInnovationSection() {
  const [activeInnovation, setActiveInnovation] = useState(innovations[0]);

  const handleInnovationClick = (innovation: typeof innovations[0]) => {
    if (innovation.id === activeInnovation.id) return;
    setActiveInnovation(innovation);
  };

  const Icon = activeInnovation.icon;

  return (
    <section 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: '#FFFFFF'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-innovation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow-purple {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.15; }
        }
        @keyframes shimmer-asset {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Subtle ambient purple glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'pulse-glow-purple 18s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Section Header - LEFT ALIGNED PATTERN */}
        <div className="section-header-left">
          <motion.div
            className="headline-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-eyebrow">
              <Brain size={14} style={{ strokeWidth: 2.5 }} />
              <span>THE INNOVATION</span>
            </div>
            <h2 className="section-headline-therapy">
              Clinical depth.<br />
              <span className="accent">Now infrastructure.</span>
            </h2>
          </motion.div>

          <motion.div
            className="subheading-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="section-subheading">
              Not another app. Neuroadaptive architecture that makes your therapeutic frameworks scalable, responsive, and always available.
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation - Mobile: Stack Vertically, Desktop: Horizontal */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center mb-8 md:mb-12 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {innovations.map((innovation) => {
            const InnovationIcon = innovation.icon;
            const isActive = activeInnovation.id === innovation.id;
            
            return (
              <button
                key={innovation.id}
                onClick={() => handleInnovationClick(innovation)}
                className={`
                  group relative overflow-hidden transition-all w-full md:w-auto
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${innovation.color}20, ${innovation.color}15)`
                    : 'transparent',
                  border: `1px solid ${isActive ? `${innovation.color}40` : 'rgba(100, 116, 139, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1.25rem, 3vw, 1.5rem)',
                  boxShadow: isActive
                    ? `0 8px 24px ${innovation.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex items-center gap-3 md:gap-3">
                  <div 
                    className="w-10 h-10 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${innovation.color}30, ${innovation.color}20)`
                        : `${innovation.color}10`,
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <InnovationIcon 
                      size={20} 
                      style={{ 
                        color: isActive ? innovation.color : `${innovation.color}99`,
                        strokeWidth: isActive ? 2.5 : 2,
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  </div>
                  <div className="text-left flex-1">
                    <div 
                      className="uppercase tracking-wider mb-0.5"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.caps,
                        letterSpacing: '0.1em',
                        color: isActive ? innovation.color : '#6B7280',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {innovation.tagline}
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                        fontWeight: 600,
                        color: isActive ? '#1F2937' : '#9CA3AF',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {innovation.roleShort}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content - Responsive Asset with Overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeInnovation.id}
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            
            {/* Image Container */}
            <div 
              className="relative overflow-hidden border min-h-[400px] md:aspect-[4/3]"
              style={{
                background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 100%)',
                borderColor: `${activeInnovation.color}30`,
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                animation: 'float-gentle-innovation 20s ease-in-out infinite'
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
                transition={{ duration: 0.5 }}
              />

              {/* Ultra-subtle overlay */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(135deg, ${activeInnovation.color}06 0%, ${activeInnovation.color}04 100%)`,
                  zIndex: 2
                }}
              />

              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ zIndex: 3 }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                    animation: 'shimmer-asset 8s ease-in-out infinite',
                    width: '50%'
                  }}
                />
              </div>

              {/* TEXT OVERLAY */}
              <motion.div 
                className="relative md:absolute md:bottom-8 md:left-8 md:right-auto md:min-w-[320px] md:max-w-[440px] p-6 md:p-6"
                style={{
                  background: 'transparent',
                  borderRadius: '0px',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  zIndex: 10
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                
                {/* Badge */}
                <div 
                  className="inline-flex items-center gap-2 px-3 py-2 mb-4 backdrop-blur-sm border border-white/30"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0px'
                  }}
                >
                  <Icon size={14} className="md:w-4 md:h-4" style={{ color: '#FFFFFF' }} />
                  <span 
                    className="uppercase tracking-wider"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700,
                      fontSize: MOBILE_TYPE.labels.caps,
                      letterSpacing: '0.12em',
                      color: '#FFFFFF'
                    }}
                  >
                    {activeInnovation.contentEyebrow}
                  </span>
                </div>

                {/* Headline */}
                <h3 
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: MOBILE_TYPE.section.h4,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    color: '#FFFFFF'
                  }}
                >
                  {activeInnovation.headline}
                </h3>

                {/* Copy Structure */}
                <div className="space-y-4">
                  
                  {/* Opening Line */}
                  <p 
                    style={{
                      fontSize: MOBILE_TYPE.body.small,
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF'
                    }}
                  >
                    {activeInnovation.openingLine}
                  </p>
                  
                  {/* Narrative - WITH LEFT BORDER */}
                  <p 
                    className="pl-4"
                    style={{
                      fontSize: MOBILE_TYPE.body.small,
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF',
                      borderLeft: '2px solid rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    {activeInnovation.narrative}
                  </p>

                  {/* IMPACT */}
                  <div className="pt-2">
                    <div 
                      className="uppercase tracking-wider mb-2"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.badge,
                        letterSpacing: '0.12em',
                        color: '#FFFFFF',
                        opacity: 0.85
                      }}
                    >
                      IMPACT
                    </div>
                    <p 
                      style={{
                        fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)',
                        lineHeight: 1.5,
                        fontWeight: 500,
                        color: '#FFFFFF'
                      }}
                    >
                      {activeInnovation.impact}
                    </p>
                  </div>

                  {/* MECHANISM */}
                  <div>
                    <div 
                      className="uppercase tracking-wider mb-2"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.badge,
                        letterSpacing: '0.12em',
                        color: '#FFFFFF',
                        opacity: 0.85
                      }}
                    >
                      MECHANISM
                    </div>
                    <p 
                      style={{
                        fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)',
                        lineHeight: 1.5,
                        fontWeight: 500,
                        color: '#FFFFFF'
                      }}
                    >
                      {activeInnovation.mechanism}
                    </p>
                  </div>

                  {/* BUZZ TAGS */}
                  <motion.div
                    className="pt-4 md:pt-5 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="max-w-full overflow-hidden">
                      <BuzzTag tags={activeInnovation.buzzTags} sectionColor={activeInnovation.color} />
                    </div>
                  </motion.div>

                </div>

              </motion.div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
