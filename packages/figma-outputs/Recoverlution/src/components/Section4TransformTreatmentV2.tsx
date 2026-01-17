import { useState } from 'react';
import { Heart, Users, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuzzTag } from './BuzzTag';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, TOUCH_TARGETS } from '../utils/mobileResponsive';
import { BRAND_COLORS } from '../utils/sectionStyles';
import { 
  section4ContinuityOptimized, 
  section4LeverageOptimized, 
  section4EconomicsOptimized 
} from '../utils/section4Assets';

// THREE VALUE PROPOSITIONS - Clinical, Premium B2B SaaS Copy (UNCHANGED - PERFECT)
const valueProps = [
  {
    id: 'recovery',
    icon: Heart,
    tagline: 'NEUROPLASTIC DESIGN',
    roleShort: 'Recovery Embedded',
    contentEyebrow: 'THE CONTINUITY BRIDGE',
    headline: 'Patient-First Continuity',
    description: 'Treatment ends. Life doesn\'t. We extend the breakthroughs of inpatient care into everyday moments so recovery becomes reflex, not just resolve.',
    detailCopy: 'Neuroadaptive systems maintain therapeutic momentum through every transition, ensuring progress compounds rather than resets. Every session, every insight, every micro-moment becomes part of a continuous thread that weaves treatment into identity.',
    impact: 'Eliminates the discharge cliff and maintains therapeutic momentum across all care transitions',
    mechanism: 'Neuroadaptive continuity systems, ERA micro-cycles, and identity-level integration frameworks',
    buzzTags: ['Discharge Prevention', 'Therapeutic Momentum', 'Identity Integration'],
    color: BRAND_COLORS.dark, // Brand Blue - Section 4 Primary
    image: section4ContinuityOptimized,
    imageAlt: 'Purple dominos falling in sequence representing therapeutic momentum cascading through patient recovery journey'
  },
  {
    id: 'capacity',
    icon: Users,
    tagline: 'ADAPTIVE ENGINE',
    roleShort: 'Capacity Scaled',
    contentEyebrow: 'THE LEVERAGE MULTIPLIER',
    headline: 'Operational Leverage',
    description: 'Your clinicians need time, not more tools. We seamlessly slot into your existing rhythm, reduce administrative noise, and scale connection without the chaos.',
    detailCopy: 'Frictionless adoption means one-tap check-ins and intelligent systems moving through complexity with grace. Built-in automation handles the mechanical while clinicians focus on the meaningful, creating operational leverage that compounds across your entire patient population.',
    impact: 'Scales clinical impact without linear headcount growth and maintains quality across populations',
    mechanism: 'Frictionless automation, one-tap engagement systems, and intelligent clinical coordination tools',
    buzzTags: ['Intelligent Automation', 'Non-Linear Scaling', 'Clinical Freedom'],
    color: BRAND_COLORS.purple, // Purple - Secondary accent
    image: section4LeverageOptimized,
    imageAlt: 'Blue wireframe architectural forms with human figures representing intelligent systems scaling clinical capacity with grace'
  },
  {
    id: 'proof',
    icon: TrendingUp,
    tagline: 'AUDIT-READY PROOF',
    roleShort: 'Proof Converted',
    contentEyebrow: 'THE ECONOMICS ENGINE',
    headline: 'Compounding Economics',
    description: 'Stop guessing. Start knowing. Our micro-block tracking shows exactly where neurological progress happens and where it stalls, giving you leverage for better contracts and demonstrable impact.',
    detailCopy: 'Digital rehab expansion with auditable ROI creates measurable outcomes you can see and prove. Every patient interaction generates structured data that validates clinical quality and demonstrates value to payers, creating economic leverage that compounds over time.',
    impact: 'Converts invisible clinical quality into auditable proof that justifies premium pricing and retention',
    mechanism: 'Micro-block tracking, automated outcome verification, and audit-ready reporting frameworks',
    buzzTags: ['Auditable ROI', 'Premium Justification', 'Value-Based Proof'],
    color: BRAND_COLORS.cyan, // Cyan - Tertiary accent
    image: section4EconomicsOptimized,
    imageAlt: 'Purple and cyan gradient geometric blocks representing measurable outcomes and auditable proof systems'
  }
];

export default function Section4TransformTreatmentV2() {
  const [activeValue, setActiveValue] = useState(valueProps[0]);

  const handleValueClick = (value: typeof valueProps[0]) => {
    if (value.id === activeValue.id) return;
    setActiveValue(value);
  };

  const Icon = activeValue.icon;

  return (
    <section 
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: '#FAFAFA'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-transform {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow-purple {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.22; }
        }
        @keyframes shimmer-asset {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Subtle ambient brand blue glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(62, 43, 184, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'pulse-glow-purple 18s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Section Header */}
        <CentralisedHeadlineClass
          eyebrow="FROM REHAB TO REALITY"
          eyebrowIcon={<Zap size={16} style={{ strokeWidth: 2 }} />}
          eyebrowColor={BRAND_COLORS.dark}
          headline={
            <>
              <span style={{ color: BRAND_COLORS.dark }}>Transform</span><br className="hidden md:block" /> Your Treatment
            </>
          }
          subheadline="Recovery is a daily identity, not a discharge plan. Continuous, patient-driven capacity bridges treatment into a lifelong structure."
        />

        {/* Tab Navigation - Clean V2 Style */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center mb-8 md:mb-12 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {valueProps.map((value) => {
            const ValueIcon = value.icon;
            const isActive = activeValue.id === value.id;
            
            return (
              <button
                key={value.id}
                onClick={() => handleValueClick(value)}
                className={`
                  group relative overflow-hidden transition-all w-full md:w-auto
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${BRAND_COLORS.dark}20, ${BRAND_COLORS.dark}15)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isActive ? 'rgba(62, 43, 184, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1.25rem, 3vw, 1.5rem)', // 14-16px / 20-24px
                  boxShadow: isActive 
                    ? '0 8px 24px rgba(62, 43, 184, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(62, 43, 184, 0.3), rgba(62, 43, 184, 0.2))'
                        : `${value.color}10`,
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ValueIcon 
                      size={20} 
                      style={{ 
                        color: isActive ? value.color : `${value.color}99`,
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
                        fontSize: MOBILE_TYPE.labels.caps, // clamp(0.625rem, 1.8vw, 0.75rem) → 10px-12px
                        letterSpacing: '0.1em',
                        color: isActive ? value.color : '#6B7280',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {value.tagline}
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', // 13px-14px
                        fontWeight: 600,
                        color: isActive ? '#1F2937' : '#9CA3AF',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {value.roleShort}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content - Image + Floating Glass Stat Pattern (V2) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeValue.id}
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            
            {/* Image Container - V2 Feature Section Pattern */}
            <div 
              className="relative overflow-hidden border min-h-[400px] md:aspect-[4/3]"
              style={{
                background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 100%)',
                borderColor: 'rgba(62, 43, 184, 0.3)',
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                animation: 'float-gentle-transform 18s ease-in-out infinite'
              }}
            >
              {/* Background Image */}
              <motion.img 
                key={activeValue.id}
                src={activeValue.image}
                alt={activeValue.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Ultra-subtle overlay */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.06) 0%, rgba(62, 43, 184, 0.04) 100%)',
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

              {/* TEXT DIRECTLY ON ASSET - Glass Treatment */}
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
                
                {/* Badge - CLEAR GLASS */}
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
                    {activeValue.contentEyebrow}
                  </span>
                </div>

                {/* Headline - CLEAN GLASS */}
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
                  {activeValue.headline}
                </h3>

                {/* 4-PART COPY STRUCTURE - CLEAN GLASS TREATMENT */}
                <div className="space-y-4">
                  
                  {/* 1. Opening Line - Punchy */}
                  <p 
                    style={{
                      fontSize: MOBILE_TYPE.body.small, // clamp(0.8125rem, 2vw, 0.9375rem) → 13px-15px
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF'
                    }}
                  >
                    {activeValue.description}
                  </p>

                  {/* 2. Narrative - WITH LEFT BORDER */}
                  <p 
                    className="pl-4"
                    style={{
                      fontSize: MOBILE_TYPE.body.small, // clamp(0.8125rem, 2vw, 0.9375rem) → 13px-15px
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF',
                      borderLeft: '2px solid rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    {activeValue.detailCopy}
                  </p>

                  {/* IMPACT - Labeled Section */}
                  <div className="pt-2">
                    <div 
                      className="uppercase tracking-wider mb-1.5"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.badge, // clamp(0.5625rem, 1.5vw, 0.6875rem) → 9px-11px
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
                      {activeValue.impact}
                    </p>
                  </div>

                  {/* MECHANISM - Labeled Section */}
                  <div>
                    <div 
                      className="uppercase tracking-wider mb-1.5"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.badge, // clamp(0.5625rem, 1.5vw, 0.6875rem) → 9px-11px
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
                      {activeValue.mechanism}
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
                      <BuzzTag tags={activeValue.buzzTags} sectionColor={activeValue.color} />
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
