import { useState } from 'react';
import { Footprints, Compass, Activity, Users, Layers, Infinity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuzzTag } from './BuzzTag';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, TOUCH_TARGETS } from '../utils/mobileResponsive';
import { useResponsiveAsset } from '../utils/responsiveAssets';

// DESKTOP ASSETS
import platformOverviewAsset from 'figma:asset/bbdd46885c6d7c44cf5e832ddd2d8ac3d24d3a0f.png'; // ✅ NEW: Human Baseline - Laptop showing Connected Care app (Journey/Navicues/Wellbeing/Toolkit/State/Momentum tiles)
import journeyAsset from 'figma:asset/21ab7c3d05a2f009507ba3a3127b589b26fef6b5.png'; // ✅ NEW: Structured Pathways - Dual phones showing ERA framework + State metrics dashboard
import navigateAsset from 'figma:asset/73f4a98210b635195460d609ccf4085c6a758e40.png'; // ✅ REFINED: Connected Ecosystem - Laptop (Toolkit articles) + Tablet (Wellbeing videos) - Better composition
import momentumAsset from 'figma:asset/3211810921548f19e5e1967cbae1709d01289ea7.png'; // ✅ NEW: Data Insights - Tablet + Phone showing "Your rhythm" metrics + State vitality tracking
import careCoordinationAsset from 'figma:asset/0c2b400a3af874be0690a6b1b90578d8b8a6a654.png'; // ✅ NEW: Clinical Continuity - Tablet showing Navigate with Dr. Sarah Chen session + Boundaries Workshop + Alumni events

// MOBILE ASSETS - Optimized for mobile screens (ALL 5 COMPLETE ✨)
import platformOverviewAssetMobile from 'figma:asset/202f417f4865187ce22414c5e66f5b9b949bce08.png'; // 📱 MOBILE: Platform Overview - Single laptop portrait view
import journeyAssetMobile from 'figma:asset/33ab5d6f96a71ae3ebea61a62539c6ff55ac98ad.png'; // 📱 MOBILE: Journey - Single phone with ERA framework closeup
import navigateAssetMobile from 'figma:asset/8f78c397bc2f6f6668c83e1ab5aaad4b45e54e9f.png'; // 📱 MOBILE: Navigate - Tablet + laptop optimized composition
import momentumAssetMobile from 'figma:asset/fa5fe5b0cab644faa88ea56b343c1d54c3363d4b.png'; // 📱 MOBILE: Momentum - Tablet + phone showing vitality metrics closeup
import careCoordinationAssetMobile from 'figma:asset/42c8a89a31540e8ffedbe06ac64e2451cc896b62.png'; // 📱 MOBILE: Care Coordination - Tablet with Navigate session optimized

const BRAND = {
  // Core 5-Color Platform Schema (Patient-Safe, Brand-Aligned)
  platformPurple: '#5739FB',    // THE HUMAN BASELINE - Primary brand purple
  journeyPurple: '#3E2BB8',     // STRUCTURED PATHWAYS - Deep brand purple
  navigateTeal: '#0891B2',      // CONNECTED ECOSYSTEM - Cyan-teal for connection
  intelligenceViolet: '#8B5CF6', // DATA INSIGHTS - Violet for analytics (patient-safe)
  careSkyBlue: '#06B6D4',       // CLINICAL CONTINUITY - Sky Blue for healing (patient-safe)
  
  // Legacy support
  dark: '#3E2BB8',
  mid: '#5739FB',
  cyan: '#40E0D0',
  green: '#10B981',
};

// FIVE PLATFORM VIEWS - Platform Overview + Four Suites
const platformSuites = [
  {
    id: 'platform-overview',
    suiteName: 'Continuity Engine',
    eyebrow: 'THE HUMAN BASELINE',
    headline: 'Switch Recovery On',
    components: [],
    roleShort: 'Platform Core',
    description: 'Load aligned to biology, trust native, breakthroughs in motion.',
    detailCopy: 'The self-steering OS that sets recovery cadence, syncs cognition, and integrates at an identity level. Built-in rhythm, modular clicks, measurable momentum.',
    // Platform Overview uses foundational pillars instead of impact/mechanism
    foundations: [
      {
        name: 'Recoverlution OS',
        label: 'NEUROADAPTIVE ENGINE',
        description: 'Your Sentient Baseline that ensures reliable, measurable recovery every step of a patients recovery journey.'
      },
      {
        name: 'Recoverlution ORBIT',
        label: 'EXPONENTIAL CATALYST',
        description: 'Your Composable ecosystem where therapeutic modules click together, transforming recovery into infinitely connected pathways'
      },
      {
        name: 'Recoverlution PROOF',
        label: 'ETHICAL CURRENCY',
        description: 'Your Scalable Trust Standard that guarantees auditable integrity. Carry one operating truth, so recovery transfers and results compound'
      }
    ],
    buzzTags: ['Sentient Systems', 'Composable Architecture', 'Auditable Integrity'],
    color: BRAND.platformPurple, // THE HUMAN BASELINE - Primary brand purple
    icon: Layers,
    assetDesktop: platformOverviewAsset,
    assetMobile: platformOverviewAssetMobile
  },
  {
    id: 'journey-suite',
    suiteName: 'Journey Suite',
    eyebrow: 'STRUCTURED PATHWAYS',
    headline: 'Evidence, Reflection, Action',
    components: ['Journey', 'Navicues', 'LUMA'],
    roleShort: 'Daily Practice',
    description: 'Structured programs using ERA micro-cycles to convert insight into consistent, traceable practice.',
    detailCopy: 'Recovery is not a destination. It is a daily practice. The Journey Suite provides the structure that bridges the breakthrough of inpatient treatment into the rhythm of everyday life. Using Experience, Reflection, Action micro-cycles, patients build the neural pathways that make recovery automatic. Navicues deliver contextual micro-interventions, while LUMA provides intelligent guidance.',
    impact: 'Converts treatment insights into daily practice and long-term behavioral change',
    mechanism: 'ERA micro-cycles, contextual micro-interventions (Navicues), and intelligent guidance (LUMA)',
    buzzTags: ['ERA Micro-Cycles', 'Contextual Delivery', 'Pathway Automation'],
    color: BRAND.journeyPurple, // STRUCTURED PATHWAYS - Deep brand purple
    icon: Footprints,
    assetDesktop: journeyAsset,
    assetMobile: journeyAssetMobile
  },
  {
    id: 'navigate-suite',
    suiteName: 'Navigate Suite',
    eyebrow: 'CONNECTED ECOSYSTEM',
    headline: 'Support, Resources, Community',
    components: ['Navigate', 'Wellbeing', 'Toolkit'],
    roleShort: 'Support Network',
    description: 'Your support network, always on. Therapists, community, meetings, and resources in one integrated place.',
    detailCopy: 'Social pain is neurologically identical to physical pain. The Navigate Suite creates the felt safety and belonging that make vulnerable identity work possible. Navigate connects you to therapists and community. Wellbeing provides video-based practices. Toolkit offers practical resources. Together, they create an integrated support ecosystem that is always accessible, always responsive.',
    impact: 'Creates felt safety and continuous connection that prevents isolation and relapse',
    mechanism: 'Integrated support network, video-based wellbeing practices, and practical resource toolkit',
    buzzTags: ['Integrated Support', 'Always-On Access', 'Social Architecture'],
    color: BRAND.navigateTeal, // CONNECTED ECOSYSTEM - Cyan-teal for connection
    icon: Compass,
    assetDesktop: navigateAsset,
    assetMobile: navigateAssetMobile
  },
  {
    id: 'intelligence-suite',
    suiteName: 'Intelligence Suite',
    eyebrow: 'DATA INSIGHTS',
    headline: 'State Tracking & Progress',
    components: ['State', 'Momentum'],
    roleShort: 'Progress Analytics',
    description: 'Visualize progress, identify patterns, see stability over time. Your recovery intelligence dashboard.',
    detailCopy: 'What gets measured gets managed. The Intelligence Suite transforms invisible neurological change into visible proof. State tracks your current capacity across three dimensions (red/orange/green). Momentum shows longitudinal patterns and stability over time. Every data point is a micro-proof that stacks into identity-level conviction.',
    impact: 'Makes invisible progress visible and converts data into identity-affirming proof',
    mechanism: 'Multi-dimensional state tracking, pattern recognition, and longitudinal visualization',
    buzzTags: ['Visible Progress', 'Pattern Intelligence', 'Longitudinal Tracking'],
    color: BRAND.intelligenceViolet, // DATA INSIGHTS - Violet for analytics (patient-safe)
    icon: Activity,
    assetDesktop: momentumAsset,
    assetMobile: momentumAssetMobile // 📱 COMPLETE: Tablet + phone vitality metrics closeup
  },
  {
    id: 'care-coordination-suite',
    suiteName: 'Care Coordination Suite',
    eyebrow: 'CLINICAL CONTINUITY',
    headline: 'Connected Care Delivery',
    components: ['Therapist Portal', 'Connected Care'],
    roleShort: 'Care Coordination',
    description: 'Seamless coordination between patients, therapists, and care teams ensuring continuity beyond discharge.',
    detailCopy: 'The most dangerous moment in recovery is the transition from structured treatment to independent life. The Care Coordination Suite eliminates the gap, providing continuous clinical oversight through the vulnerable early months. Therapist Portal enables real-time monitoring and intervention. Connected Care ensures seamless handoffs and longitudinal support that prevent the isolation preceding relapse.',
    impact: 'Eliminates care gaps and maintains clinical continuity throughout the recovery journey',
    mechanism: 'Real-time therapist oversight, clinical coordination tools, and continuous care delivery',
    buzzTags: ['Gap Elimination', 'Clinical Oversight', 'Seamless Handoffs'],
    color: BRAND.careSkyBlue, // CLINICAL CONTINUITY - Sky Blue for healing (patient-safe)
    icon: Users,
    assetDesktop: careCoordinationAsset,
    assetMobile: careCoordinationAssetMobile // 📱 COMPLETE: Tablet with Navigate session optimized
  }
];

export default function Section6AlwaysOnLifetimeCareV2() {
  const [activeSuite, setActiveSuite] = useState(platformSuites[0]);

  const handleSuiteClick = (suite: typeof platformSuites[0]) => {
    if (suite.id === activeSuite.id) return;
    setActiveSuite(suite);
  };

  const Icon = activeSuite.icon;
  
  // 📱 RESPONSIVE ASSET SELECTION - Auto-switches based on screen width
  const currentAsset = useResponsiveAsset(
    activeSuite.assetDesktop,
    activeSuite.assetMobile
  );

  return (
    <section 
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: '#FAFAFA'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-care {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes pulse-glow-cyan {
          0%, 100% { opacity: 0.10; }
          50% { opacity: 0.18; }
        }
        @keyframes shimmer-asset {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        /* Mobile: Show bottom-right quadrant of images */
        @media (max-width: 767px) {
          .section6-asset {
            object-position: bottom right !important;
          }
        }
      `}</style>

      {/* Subtle ambient cyan glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1000px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(64, 224, 208, 0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'pulse-glow-cyan 16s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <CentralisedHeadlineClass
          eyebrow="ALL-IN-ONE COMPANION"
          eyebrowIcon={<Infinity size={16} style={{ strokeWidth: 2 }} />}
          eyebrowColor={BRAND.mid}
          headline={
            <>
              <span style={{ color: BRAND.mid }}>Always-on</span><br className="hidden md:block" /> Lifetime Care
            </>
          }
          subheadline="Built for rehabs. Designed for patients. Engineered for outcomes. Ready for real life."
        />

        {/* Tab Navigation - Mobile: 2 Columns, Tablet: 3 Columns, Desktop: 5 Columns */}
        <motion.div 
          className="mb-8 md:mb-12 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {platformSuites.map((suite) => {
            const SuiteIcon = suite.icon;
            const isActive = activeSuite.id === suite.id;
            
            return (
              <button
                key={suite.id}
                onClick={() => handleSuiteClick(suite)}
                className={`
                  group relative overflow-hidden transition-all
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${suite.color}18, ${suite.color}12)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isActive ? `${suite.color}60` : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.25rem)', // Responsive padding
                  boxShadow: isActive 
                    ? `0 8px 24px ${suite.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 'clamp(2rem, 5vw, 2.25rem)', // 32px-36px
                      height: 'clamp(2rem, 5vw, 2.25rem)',
                      background: isActive 
                        ? `linear-gradient(135deg, ${suite.color}30, ${suite.color}20)`
                        : 'rgba(107, 114, 128, 0.08)',
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <SuiteIcon 
                      size={18} 
                      style={{ 
                        color: isActive ? suite.color : '#6B7280',
                        strokeWidth: isActive ? 2.5 : 2,
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  </div>
                  <div className="text-left">
                    {/* Eyebrow */}
                    <div 
                      className="uppercase tracking-wider mb-0.5"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.caps, // clamp(0.625rem, 1.8vw, 0.75rem) → 10px-12px
                        letterSpacing: '0.12em',
                        color: isActive ? suite.color : '#6B7280',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {suite.eyebrow}
                    </div>
                    {/* Short Role Label */}
                    <div
                      style={{
                        fontSize: 'clamp(0.7rem, 1.6vw, 0.75rem)', // 11.2px-12px
                        fontWeight: 600,
                        color: isActive ? '#1F2937' : '#9CA3AF',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {suite.roleShort}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
          </div>
        </motion.div>

        {/* Main Content - Image + Floating Glass Stat Pattern (V2) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSuite.id}
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
                background: activeSuite.color, // FULL SOLID BRAND COLOR
                borderColor: `${activeSuite.color}80`,
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                animation: 'float-gentle-care 19s ease-in-out infinite'
              }}
            >
              {/* Premium light reflections for depth - Crystal effect */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 30%),
                    linear-gradient(-135deg, transparent 70%, rgba(255, 255, 255, 0.08) 100%),
                    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.18) 0%, transparent 40%),
                    radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.10) 0%, transparent 35%)
                  `,
                  zIndex: 1
                }}
              />
              
              {/* Subtle diagonal light streak for premium feel */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(45deg, 
                      transparent 0%, 
                      transparent 40%,
                      rgba(255, 255, 255, 0.06) 50%,
                      transparent 60%,
                      transparent 100%
                    )
                  `,
                  zIndex: 1
                }}
              />

              {/* Device Mockup - Transparent PNG - RESPONSIVE */}
              <motion.img 
                key={activeSuite.id}
                src={currentAsset}
                alt={`${activeSuite.suiteName} - ${activeSuite.eyebrow}`}
                className="section6-asset absolute inset-0 w-full h-full object-contain"
                style={{ 
                  zIndex: 2,
                  filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.25)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.15))'
                }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Subtle dark vignette for depth on solid color */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `
                    radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.12) 100%)
                  `,
                  zIndex: 3
                }}
              />

              {/* Premium shimmer effect - more pronounced on solid color */}
              <div 
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ zIndex: 4 }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
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
                
                {/* Eyebrow Badge - Responsive */}
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
                    {activeSuite.eyebrow}
                  </span>
                </div>

                {/* Suite Name - Responsive */}
                <h3 
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: MOBILE_TYPE.section.h4, // clamp(1.125rem, 4vw, 2rem) → 18px-32px
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: '#FFFFFF'
                  }}
                >
                  {activeSuite.suiteName}
                </h3>

                {/* Components as inline badges - Responsive */}
                {activeSuite.components.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {activeSuite.components.map((component, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center px-2 py-1 backdrop-blur-sm border border-white/30"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0px'
                        }}
                      >
                        <span
                          className="uppercase tracking-wider"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: 'clamp(0.5625rem, 1.4vw, 0.625rem)', // 9px-10px
                            letterSpacing: '0.1em',
                            color: '#FFFFFF',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {component}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Combined Description - Crystal White, No Indentation */}
                <p 
                  className="mb-5"
                  style={{
                    fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)', // 14px-15px
                    lineHeight: 1.6,
                    fontWeight: 500,
                    color: '#FFFFFF'
                  }}
                >
                  {activeSuite.description} {activeSuite.detailCopy}
                </p>

                {/* Platform Overview: Three Foundations OR Standard Suites: Impact & Mechanism */}
                {activeSuite.id === 'platform-overview' ? (
                  // Platform Overview - Three Foundational Pillars + Buzz Tags
                  <div className="space-y-4">
                    {activeSuite.foundations.map((foundation, idx) => (
                      <div key={idx} className="pt-2">
                        <div 
                          className="mb-2"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)', // 14px-15px
                            letterSpacing: '-0.01em',
                            color: '#FFFFFF'
                          }}
                        >
                          {foundation.name}
                        </div>
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
                          {foundation.label}
                        </div>
                        <p 
                          style={{
                            fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)', // 12px-13px
                            lineHeight: 1.5,
                            fontWeight: 500,
                            color: '#FFFFFF'
                          }}
                        >
                          {foundation.description}
                        </p>
                      </div>
                    ))}

                    {/* Buzz Tags - After foundations */}
                    <motion.div
                      className="pt-4 md:pt-5 w-full"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <div className="max-w-full overflow-hidden">
                        <BuzzTag tags={activeSuite.buzzTags} sectionColor={activeSuite.color} />
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // Standard Suites - Impact & Mechanism + Buzz Tags
                  <div className="space-y-4">
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
                        {activeSuite.impact}
                      </p>
                    </div>
                    
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
                        {activeSuite.mechanism}
                      </p>
                    </div>

                    {/* Buzz Tags - After impact/mechanism */}
                    <motion.div
                      className="pt-4 md:pt-5 w-full"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <div className="max-w-full overflow-hidden">
                        <BuzzTag tags={activeSuite.buzzTags} sectionColor={activeSuite.color} />
                      </div>
                    </motion.div>
                  </div>
                )}

              </motion.div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
