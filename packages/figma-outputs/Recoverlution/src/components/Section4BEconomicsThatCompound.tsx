/**
 * SECTION 3 - ECONOMICS THAT COMPOUND
 * 
 * Mission: Bridge neuroscience (Section 2) to business transformation
 * Positioning: Show the future state as inevitable, economics as strategic advantage
 * Philosophy: Implied authority, plant seeds of possibility, no problem-stating
 * 
 * Narrative Arc:
 * - Section 2 showed HOW (neuroscience, cognition engine)
 * - Section 3 shows WHY IT MATTERS (economics transform when science is right)
 * - Section 4 will show APPLICATIONS (patient continuity, operational leverage)
 * 
 * Created: October 30, 2025
 * Transformed: November 1, 2025 (Section 2 Formula Applied)
 * Premium 3D Assets: November 1, 2025 (Exhibition-Grade Architectural Renders)
 */

import { useState } from 'react';
import { Repeat, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuzzTag } from './BuzzTag';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, TOUCH_TARGETS } from '../utils/mobileResponsive';
import { BRAND_COLORS } from '../utils/sectionStyles';
import { 
  section3ConnectionOptimized, 
  section3BrillianceOptimized, 
  section3DataOptimized 
} from '../utils/section3Assets';

// THREE ECONOMIC TRANSFORMATIONS - Apple-grade precision
const economicShifts = [
  {
    id: 'continuity',
    icon: Repeat,
    tagline: 'RELATIONSHIP ARCHITECTURE',
    roleShort: 'Economics That Extend',
    contentEyebrow: 'THE CONTINUITY MULTIPLIER',
    headline: 'Connection That Compounds',
    openingLine: 'Traditional rehab invests most when the brain can absorb least. Inpatient intensity meets neurological chaos. Aftercare fades to nothing.',
    narrative: 'Digital infrastructure inverts this economic model. The first 30 days lay neurological foundation when limbic systems are flooded. The next 335 days become the real therapeutic work, delivered when prefrontal capacity returns and memory encoding stabilizes.',
    impact: 'Alumni transform from discharged patients into continuous relationships that deepen across time, generating predictable recurring economics.',
    mechanism: 'Tiered engagement architecture extends therapeutic relationships beyond discharge, creating sustained connection as economic infrastructure.',
    buzzTags: ['Recurring Relationships', 'Extended Investment', 'Lifetime Economics'],
    color: BRAND_COLORS.green, // Green - Section color (Button 1)
    image: section3ConnectionOptimized,
    imageAlt: 'Purple organic 3D forms with butterfly and raised fist representing continuous therapeutic relationships that transform and compound'
  },
  {
    id: 'scale',
    icon: Zap,
    tagline: 'INTELLIGENCE ARCHITECTURE',
    roleShort: 'Expertise That Multiplies',
    contentEyebrow: 'THE CAPACITY MULTIPLIER',
    headline: 'Brilliance That Scales',
    openingLine: 'Your lead therapist holds decades of clinical intuition. That wisdom lives in 1:1 sessions, bound by time and physical walls.',
    narrative: 'Intelligent systems encode therapeutic expertise into adaptive infrastructure. Clinical frameworks become sentient architecture that personalizes at scale, delivering your team\'s best thinking to thousands simultaneously without dilution.',
    impact: 'Expertise escapes the room. Capacity divorces from headcount. One clinical team generates infinite therapeutic reach without burnout.',
    mechanism: 'Adaptive therapeutic frameworks digitize clinical wisdom into scalable infrastructure that maintains quality across unlimited patient populations.',
    buzzTags: ['Digitized Expertise', 'Non-Linear Capacity', 'Architectural Intelligence'],
    color: BRAND_COLORS.dark, // Brand Blue - Next in cycle (Button 2)
    image: section3BrillianceOptimized,
    imageAlt: 'Purple minimalist scene with vase and plant under pendant lamp representing clinical expertise nurtured and scaled infinitely'
  },
  {
    id: 'evidence',
    icon: TrendingUp,
    tagline: 'OUTCOME ARCHITECTURE',
    roleShort: 'Proof That Converts',
    contentEyebrow: 'THE EVIDENCE MULTIPLIER',
    headline: 'Data That Closes',
    openingLine: 'Healthcare economics are shifting from selling interventions to selling verified outcomes. Payers buy proof, not promises. Claims lose to data.',
    narrative: 'Continuous measurement transforms invisible clinical quality into auditable proof. Longitudinal tracking surfaces neuroplastic progress, behavioral stability, and sustained recovery as verifiable economic units that command premium positioning.',
    impact: 'Cohort evidence becomes the revenue engine. Outcomes justify value-based contracts. Strategic advantage shifts from marketing to measurement.',
    mechanism: 'Automated outcome verification creates audit-ready proof that validates clinical excellence and converts payers through measurable recovery data.',
    buzzTags: ['Verifiable Outcomes', 'Evidence Economics', 'Measurable Advantage'],
    color: BRAND_COLORS.cyan, // Cyan - Completes cycle (Button 3)
    image: section3DataOptimized,
    imageAlt: 'Purple geometric layered stairs ascending representing verifiable outcomes as the fundamental sellable unit of modern recovery'
  }
];

export default function Section4BEconomicsThatCompound() {
  const [activeShift, setActiveShift] = useState(economicShifts[0]);
  
  // DEBUG: Verify correct file is loaded
  console.log('✅ Section4BEconomicsThatCompound.tsx loaded - Button logic: SCALE and EVIDENCE show backgrounds');

  const handleShiftClick = (shift: typeof economicShifts[0]) => {
    if (shift.id === activeShift.id) return;
    setActiveShift(shift);
  };

  const Icon = activeShift.icon;

  return (
    <section 
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: '#FFFFFF'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-economics {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow-subtle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        @keyframes shimmer-asset {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Subtle ambient green glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(44, 153, 175, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'pulse-glow-subtle 15s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <CentralisedHeadlineClass
          eyebrow="ECONOMICS THAT COMPOUND"
          eyebrowIcon={<DollarSign size={16} style={{ strokeWidth: 2 }} />}
          eyebrowColor={BRAND_COLORS.green}
          headline={
            <>
              The<br className="hidden md:block" /> <span style={{ color: BRAND_COLORS.green }}>Evidence</span> Era
            </>
          }
          subheadline="The difference between software and strategic advantage. When relationships extend beyond discharge, everything changes."
        />

        {/* Tab Navigation - Mobile: Stack Vertically, Desktop: Horizontal */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center mb-8 md:mb-12 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {economicShifts.map((shift) => {
            const ShiftIcon = shift.icon;
            const isActive = activeShift.id === shift.id;
            
            return (
              <button
                key={shift.id}
                onClick={() => handleShiftClick(shift)}
                className={`
                  group relative overflow-hidden transition-all w-full md:w-auto
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: (isActive && (shift.id === 'scale' || shift.id === 'evidence'))
                    ? `linear-gradient(135deg, ${shift.color}20, ${shift.color}15)`
                    : 'transparent',
                  border: `1px solid ${isActive ? `${shift.color}40` : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1.25rem, 3vw, 1.5rem)', // Responsive padding
                  boxShadow: (isActive && (shift.id === 'scale' || shift.id === 'evidence'))
                    ? `0 8px 24px ${shift.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="flex items-center justify-center"
                    style={{
                      width: 'clamp(2.25rem, 6vw, 2.5rem)', // 36px-40px
                      height: 'clamp(2.25rem, 6vw, 2.5rem)',
                      background: isActive 
                        ? `linear-gradient(135deg, ${shift.color}30, ${shift.color}20)`
                        : `${shift.color}10`,
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ShiftIcon 
                      size={20} 
                      style={{ 
                        color: isActive ? shift.color : `${shift.color}99`,
                        strokeWidth: isActive ? 2.5 : 2,
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  </div>
                  <div className="text-left">
                    <div 
                      className="uppercase tracking-wider mb-0.5"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.caps, // clamp(0.625rem, 1.8vw, 0.75rem) → 10px-12px
                        letterSpacing: '0.12em',
                        color: isActive ? shift.color : '#6B7280',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {shift.tagline}
                    </div>
                    <div
                      style={{
                        fontSize: MOBILE_TYPE.body.small, // clamp(0.8125rem, 2vw, 0.875rem) → 13px-14px
                        fontWeight: 600,
                        color: isActive ? '#1F2937' : '#9CA3AF',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {shift.roleShort}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content - Image + Floating Glass Card Pattern (V2) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeShift.id}
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
                background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 100%)',
                borderColor: `${activeShift.color}30`,
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                animation: 'float-gentle-economics 18s ease-in-out infinite'
              }}
            >
              {/* Background Image */}
              <motion.img 
                key={activeShift.id}
                src={activeShift.image}
                alt={activeShift.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Ultra-subtle overlay - DYNAMIC COLOR */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(135deg, ${activeShift.color}06 0%, ${activeShift.color}04 100%)`,
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
                
                {/* Badge - Responsive */}
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
                    {activeShift.contentEyebrow}
                  </span>
                </div>

                {/* Headline - Responsive */}
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
                  {activeShift.headline}
                </h3>

                {/* 5-PART COPY STRUCTURE - Responsive Typography */}
                <div className="space-y-4">
                  
                  {/* 1. Opening Line - Punchy (15-20 WORDS) */}
                  <p 
                    style={{
                      fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)', // 14px-15px
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF'
                    }}
                  >
                    {activeShift.openingLine}
                  </p>
                  
                  {/* 2. Narrative - WITH LEFT BORDER (25-30 WORDS) */}
                  <p 
                    className="pl-4"
                    style={{
                      fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)', // 14px-15px
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF',
                      borderLeft: '2px solid rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    {activeShift.narrative}
                  </p>

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
                      {activeShift.impact}
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
                      {activeShift.mechanism}
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
                      <BuzzTag tags={activeShift.buzzTags} sectionColor={activeShift.color} />
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