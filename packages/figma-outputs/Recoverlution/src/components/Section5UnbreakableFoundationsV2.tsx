import { useState } from 'react';
import { Heart, Shield, Users, Brain, Target, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuzzTag } from './BuzzTag';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, TOUCH_TARGETS } from '../utils/mobileResponsive';
import { BRAND_COLORS } from '../utils/sectionStyles';
import { 
  section5EmotionalOptimized, 
  section5StressOptimized,
  section5SocialOptimized,
  section5CognitiveOptimized,
  section5IdentityOptimized,
  section5DecisionOptimized
} from '../utils/section5Assets';

// THE SIX PILLARS - Architectural Foundation (COPY UNCHANGED - PERFECT)
const pillars = [
  {
    id: 'emotional',
    icon: Heart,
    name: 'Emotional Regulation',
    nameLines: ['EMOTIONAL', 'REGULATION'],
    role: 'THE PILOT LIGHT',
    description: 'Fortifies the system, ensuring the nervous system is regulated before therapeutic reasoning begins.',
    detailCopy: 'The foundational pillar that must be fortified first. No therapeutic work can proceed if the nervous system is operating at high arousal. This pillar calms the limbic system, creating the biological conditions necessary for rational thought and cognitive reframing to take hold.',
    impact: 'Calms the limbic system and creates biological readiness for change',
    mechanism: 'Nervous system regulation through breathwork, somatic practices, and co-regulation',
    buzzTags: ['Limbic Regulation', 'Biological Readiness', 'Nervous System Calm'],
    color: '#8B5CF6', // Violet - Energy, Emotional Movement
    asset: section5EmotionalOptimized,
  },
  {
    id: 'stress',
    icon: Shield,
    name: 'Stress Resilience',
    nameLines: ['STRESS', 'RESILIENCE'],
    role: 'THE CAPACITY ENGINE',
    description: 'Protects the Prefrontal Cortex under load, ensuring resources remain available for decisions.',
    detailCopy: 'The protective mechanism that maintains cognitive capacity under pressure. This pillar keeps the rational "Pilot" online during moments of stress, preventing the system from collapsing into automatic, model-free behavior patterns that undermine recovery.',
    impact: 'Maintains executive function under pressure and prevents system collapse',
    mechanism: 'Prefrontal cortex protection through stress inoculation and capacity building',
    buzzTags: ['Executive Protection', 'Stress Inoculation', 'Cognitive Capacity'],
    color: '#3B82F6', // Blue
    asset: section5StressOptimized,
  },
  {
    id: 'social',
    icon: Users,
    name: 'Social Connectivity',
    nameLines: ['SOCIAL', 'CONNECTIVITY'],
    role: 'THE ANCHORAGE SYSTEM',
    description: 'Restores felt safety and belonging, as social pain amplifies craving and blunts system regulation.',
    detailCopy: 'The safety architecture that creates the conditions for vulnerable identity work. Strong, secure bonds provide the trust necessary to overcome shame and engage in the self-narrative reconstruction that recovery demands. Social pain is neurologically identical to physical pain.',
    impact: 'Creates felt safety necessary for vulnerable identity reconstruction',
    mechanism: 'Secure attachment through consistent connection and shame resilience',
    buzzTags: ['Secure Attachment', 'Shame Resilience', 'Felt Safety'],
    color: '#0891B2', // Cyan - Connection, Support
    asset: section5SocialOptimized,
  },
  {
    id: 'cognitive',
    icon: Brain,
    name: 'Cognitive Reframing',
    nameLines: ['COGNITIVE', 'REFRAMING'],
    role: 'THE LENS EDITOR',
    description: 'Builds appraisal flexibility to transform catastrophic thinking into simple, actionable movement.',
    detailCopy: 'The pattern-breaking system that builds appraisal flexibility. A kinder, truer thought (a reframe) directly lowers physiological arousal and calms the body, creating a virtuous cycle that reinforces Emotional Regulation and builds capacity for sustained change.',
    impact: 'Transforms catastrophic thinking into compassionate, actionable perspective',
    mechanism: 'Appraisal flexibility through CBT, ACT, and metacognitive awareness',
    buzzTags: ['Appraisal Flexibility', 'Pattern Breaking', 'Metacognitive Awareness'],
    color: '#6366F1', // Indigo - Mental Systems, Pattern Change
    asset: section5CognitiveOptimized,
  },
  {
    id: 'identity',
    icon: Target,
    name: 'Identity Integration',
    nameLines: ['IDENTITY', 'INTEGRATION'],
    role: 'THE PROOF BUILDER',
    description: 'Ensures recovery is self-verification, stacking micro-proofs into lasting identity-level knowing, believing and embodying.',
    detailCopy: 'The narrative architecture that converts behavior into belief. Recovery is not about stated intent; it is about accumulating micro-proofs that stack into lasting, identity-level knowing, believing, and embodying. A strong identity narrative dictates the default choice under pressure.',
    impact: 'Converts repeated behavior into identity-level conviction and embodiment',
    mechanism: 'Self-concept transformation through micro-proof accumulation and narrative reconstruction',
    buzzTags: ['Micro-Proof Stacking', 'Narrative Reconstruction', 'Self-Concept Shift'],
    color: '#5739FB', // Primary Purple - Core Platform, Proof Building
    asset: section5IdentityOptimized,
  },
  {
    id: 'decision',
    icon: Zap,
    name: 'Decision Mastery',
    nameLines: ['DECISION', 'MASTERY'],
    role: 'THE AUTONOMY ENABLER',
    description: 'Creates the vital gap between cue and action, making the wiser move become the easy default choice.',
    detailCopy: 'The autonomy mechanism that creates the vital gap between cue and action. This pillar converts philosophical insight into consistent, embodied behavior. Every successful decision acts as a proof point, validating the structural integrity of the entire framework.',
    impact: 'Creates the pause between trigger and response where wisdom lives',
    mechanism: 'Executive control through decision rehearsal and value-based choice architecture',
    buzzTags: ['Choice Architecture', 'Decision Rehearsal', 'Value Alignment'],
    asset: section5DecisionOptimized,
    color: '#14B8A6', // Teal - Growth, Autonomy, Forward Motion
  }
];

export default function Section5UnbreakableFoundationsV2() {
  const [activePillar, setActivePillar] = useState(pillars[0]);

  const handlePillarClick = (pillar: typeof pillars[0]) => {
    if (pillar.id === activePillar.id) return;
    setActivePillar(pillar);
  };

  const Icon = activePillar.icon;

  return (
    <section 
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: '#FFFFFF'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-foundations {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow-blue {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.15; }
        }
        @keyframes shimmer-asset {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Subtle ambient cyan glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(64, 224, 208, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'pulse-glow-blue 20s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <CentralisedHeadlineClass
          eyebrow="STRUCTURAL INTEGRITY"
          eyebrowIcon={<Shield size={16} style={{ strokeWidth: 2 }} />}
          eyebrowColor={BRAND_COLORS.cyan}
          headline={
            <>
              Unbreakable<br className="hidden md:block" /> <span style={{ color: BRAND_COLORS.cyan }}>Foundations</span>
            </>
          }
          subheadline="An indivisible, architectural solution where the framework itself is the foundation of recovery."
        />

        {/* Tab Navigation - Mobile: 2 Columns, Desktop: Wrap 3 Columns */}
        <motion.div 
          className="grid grid-cols-2 md:flex md:flex-wrap justify-center mb-8 md:mb-12 gap-3 md:gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {pillars.map((pillar) => {
            const PillarIcon = pillar.icon;
            const isActive = activePillar.id === pillar.id;
            
            return (
              <button
                key={pillar.id}
                onClick={() => handlePillarClick(pillar)}
                className={`
                  group relative overflow-hidden transition-all md:w-auto
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${pillar.color}18, ${pillar.color}12)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isActive ? `${pillar.color}60` : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1.25rem, 3vw, 1.5rem)', // Responsive padding
                  boxShadow: isActive 
                    ? `0 8px 24px ${pillar.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 'clamp(2.25rem, 6vw, 2.5rem)', // 36px-40px
                      height: 'clamp(2.25rem, 6vw, 2.5rem)',
                      background: isActive 
                        ? `linear-gradient(135deg, ${pillar.color}30, ${pillar.color}20)`
                        : 'rgba(107, 114, 128, 0.08)',
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <PillarIcon 
                      size={20} 
                      style={{ 
                        color: isActive ? pillar.color : '#6B7280',
                        strokeWidth: isActive ? 2.5 : 2,
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  </div>
                  <div className="text-left leading-tight">
                    {pillar.nameLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="uppercase tracking-wider"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: MOBILE_TYPE.labels.caps, // clamp(0.625rem, 1.8vw, 0.75rem) → 10px-12px
                          letterSpacing: '0.12em',
                          color: isActive ? pillar.color : '#6B7280',
                          transition: 'all 0.3s ease',
                          lineHeight: 1.3
                        }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content - Image + Floating Glass Stat Pattern (V2) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            
            {/* Image Container - Content-Driven Height */}
            <div 
              className="relative overflow-hidden border min-h-[400px] md:aspect-[4/3]"
              style={{
                background: 'linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 100%)',
                borderColor: `${activePillar.color}40`,
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                animation: 'float-gentle-foundations 22s ease-in-out infinite'
              }}
            >
              {/* Background Image - Pillar-Specific Asset */}
              <motion.img 
                key={activePillar.id}
                src={activePillar.asset}
                alt={`${activePillar.name} - ${activePillar.role}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Ultra-subtle overlay */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(135deg, ${activePillar.color}06 0%, ${activePillar.color}04 100%)`,
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

              {/* TEXT OVERLAY - Natural Content Height */}
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
                
                {/* Role Badge - Responsive */}
                <div 
                  className="inline-flex items-center gap-2 px-3 py-2 mb-4 backdrop-blur-sm border border-white/30"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0px'
                  }}
                >
                  <Icon size={16} style={{ color: '#FFFFFF' }} />
                  <span 
                    className="uppercase tracking-wider"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700,
                      fontSize: MOBILE_TYPE.labels.caps, // clamp(0.625rem, 1.8vw, 0.75rem) → 10px-12px
                      letterSpacing: '0.12em',
                      color: '#FFFFFF'
                    }}
                  >
                    {activePillar.role}
                  </span>
                </div>

                {/* Pillar Name - Responsive */}
                <h3 
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: MOBILE_TYPE.section.h4, // clamp(1.125rem, 4vw, 2rem) → 18px-32px
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: '#FFFFFF'
                  }}
                >
                  {activePillar.name}
                </h3>

                {/* 5-PART COPY STRUCTURE - Responsive Typography */}
                <div className="space-y-4">

                  {/* 1. Description */}
                  <p 
                    style={{
                      fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)', // 14px-15px
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF'
                    }}
                  >
                    {activePillar.description}
                  </p>

                  {/* 2. Detail Copy with accent border */}
                  <div 
                    className="pl-4"
                    style={{
                      borderLeft: '2px solid rgba(255, 255, 255, 0.4)',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem'
                    }}
                  >
                    <p 
                      style={{
                        fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)', // 14px-15px
                        lineHeight: 1.6,
                        fontWeight: 500,
                        color: '#FFFFFF'
                      }}
                    >
                      {activePillar.detailCopy}
                    </p>
                  </div>

                  {/* 3. IMPACT - Labeled Section */}
                  <div className="pt-2">
                    <div 
                      className="uppercase tracking-wider mb-1.5"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.caps, // clamp(0.625rem, 1.8vw, 0.75rem) → 10px-12px
                        letterSpacing: '0.12em',
                        color: '#FFFFFF',
                        opacity: 0.85
                      }}
                    >
                      IMPACT
                    </div>
                    <p 
                      style={{
                        fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)', // 12px-13px
                        lineHeight: 1.5,
                        fontWeight: 500,
                        color: '#FFFFFF'
                      }}
                    >
                      {activePillar.impact}
                    </p>
                  </div>
                  
                  {/* 4. MECHANISM - Labeled Section */}
                  <div>
                    <div 
                      className="uppercase tracking-wider mb-1.5"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.caps, // clamp(0.625rem, 1.8vw, 0.75rem) → 10px-12px
                        letterSpacing: '0.12em',
                        color: '#FFFFFF',
                        opacity: 0.85
                      }}
                    >
                      MECHANISM
                    </div>
                    <p 
                      style={{
                        fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)', // 12px-13px
                        lineHeight: 1.5,
                        fontWeight: 500,
                        color: '#FFFFFF'
                      }}
                    >
                      {activePillar.mechanism}
                    </p>
                  </div>

                  {/* 5. BUZZ TAGS - At Bottom with Width Constraint */}
                  <motion.div
                    className="pt-4 md:pt-5 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="max-w-full overflow-hidden">
                      <BuzzTag tags={activePillar.buzzTags} sectionColor={activePillar.color} />
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
