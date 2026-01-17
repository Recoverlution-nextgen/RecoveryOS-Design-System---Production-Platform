/**
 * THERAPY PAGE: HOW IT WORKS SECTION
 * 
 * 6-Button Narrative Flow:
 * 1. Seamless Operations → Infrastructure on autopilot
 * 2. Neuroadaptive Timing → Right moment, right intervention
 * 3. Unbreakable Foundations → Architectural integrity
 * 4. Always-On Continuity → Between-session momentum
 * 5. Momentum Signals → Clinical intelligence
 * 6. Method as Infrastructure → Episodic becomes recurring
 * 
 * Content mapped from Homepage Sections:
 * - Transform Your Treatment (Operational Leverage, Continuity)
 * - Architecting DNA (Neural readiness, Adaptive signals)
 * - Unbreakable Foundations (Six Pillars)
 * - Always-on Lifetime Care (Journey Suite, ERA cycles)
 * - Economics That Compound (Recurring revenue, scaling)
 * 
 * Component Pattern: Same as Homepage sections
 * - Buttons + Asset + Overlay Copy
 * - TAP TO EXPLORE → Flips to show features (instead of buzz tags)
 */

import { useState } from 'react';
import { Settings, Brain, Shield, Infinity, Activity, Layers, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, TOUCH_TARGETS } from '../utils/mobileResponsive';

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  cyan: '#40E0D0',
  green: '#10B981',
};

// THE 6-ACT NARRATIVE - Operations → Biology → Architecture → Continuity → Intelligence → Economics
const howItWorksStories = [
  {
    id: 'operations',
    icon: Settings,
    tagline: 'FRICTIONLESS INFRASTRUCTURE',
    roleShort: 'Set up once. Scale forever.',
    contentEyebrow: 'THE OPERATIONS ENGINE',
    headline: 'Seamless Operations',
    openingLine: 'Scheduling. Billing. Video. Admin. All built in. Your practice infrastructure runs on autopilot.',
    narrative: 'One-tap check-ins replace administrative noise. Integrated systems handle scheduling, billing, video sessions, and documentation without requiring constant oversight. What used to steal clinical hours now runs silently in the background, creating operational leverage that scales without adding headcount.',
    impact: 'Frees clinical capacity from administrative burden and creates frictionless adoption across your entire patient population',
    mechanism: 'Built-in automation, one-tap engagement systems, and intelligent clinical coordination tools',
    features: [
      'Integrated scheduling and calendar sync',
      'Automated billing and payment processing',
      'Built-in HIPAA-compliant video sessions',
      'Smart documentation and note templates',
      'One-tap patient check-ins and updates'
    ],
    color: BRAND.green,
    // Placeholder - will need asset
    image: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/Between%20session%20fade.avif'
  },
  {
    id: 'timing',
    icon: Brain,
    tagline: 'NEUROBIOLOGICAL PRECISION',
    roleShort: 'Right moment. Right intervention.',
    contentEyebrow: 'THE COGNITION ENGINE',
    headline: 'Neuroadaptive Timing',
    openingLine: 'Early recovery brains cannot encode complex information. You teach. They forget. Not because they do not care. Because the prefrontal cortex is offline.',
    narrative: 'Traditional treatment ignores neurobiological reality. We track readiness at the neural level, quantifying when your patients can actually encode and retain therapeutic information. Breathwork, somatic practices, and co-regulation are delivered when neurobiology signals receptiveness. Your clinical insights land when biology allows, not just when the calendar says.',
    impact: 'Reduces limbic activation and creates measurable biological readiness for therapeutic change',
    mechanism: 'Neural readiness tracking, somatic intelligence, and contextual micro-interventions triggered by real-time biological feedback',
    features: [
      'Tracks neural readiness and cognitive load',
      'Delivers content when prefrontal cortex is online',
      'Somatic signals trigger contextual support',
      'Breathwork and co-regulation practices',
      'Adaptive pacing based on biological state'
    ],
    color: BRAND.mid,
    image: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/Precision%20practices.avif'
  },
  {
    id: 'foundations',
    icon: Shield,
    tagline: 'STRUCTURAL INTEGRITY',
    roleShort: 'Built to hold under pressure.',
    contentEyebrow: 'THE ARCHITECTURAL CORE',
    headline: 'Unbreakable Foundations',
    openingLine: 'Recovery is not one skill. It is a structural framework that must hold when everything else falls apart.',
    narrative: 'Emotional regulation. Stress resilience. Social connection. Cognitive reframing. Identity integration. Decision mastery. These are not separate tools. They are an interdependent architecture where each pillar reinforces the others. We encode your therapeutic depth into adaptive infrastructure that personalizes at scale without dilution. Your clinical frameworks become sentient architecture.',
    impact: 'Creates structural integrity that holds under pressure and converts therapeutic expertise into scalable infrastructure',
    mechanism: 'Six interdependent pillars delivered as adaptive therapeutic frameworks that maintain clinical quality across unlimited populations',
    features: [
      'Emotional Regulation: Nervous system calm',
      'Stress Resilience: Executive function under load',
      'Social Connectivity: Felt safety and belonging',
      'Cognitive Reframing: Pattern breaking flexibility',
      'Identity Integration: Micro-proof accumulation',
      'Decision Mastery: Gap between cue and action'
    ],
    color: BRAND.cyan,
    image: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/Time%20for%20money%20trap.avif'
  },
  {
    id: 'continuity',
    icon: Infinity,
    tagline: 'THERAPEUTIC MOMENTUM',
    roleShort: 'Between sessions. That\'s where recovery happens.',
    contentEyebrow: 'THE CONTINUITY BRIDGE',
    headline: 'Always-On Continuity',
    openingLine: 'Insight peaks in your office. Stress peaks Tuesday night. Traditional therapy equals one hour breakthrough, 167 hours alone.',
    narrative: 'We bridge the gap between sessions through continuous micro-interventions and contextual support. Evidence, Reflection, Action micro-cycles maintain therapeutic momentum when clients hit triggers in real life. Neuroadaptive systems deliver your clinical presence in moments that matter. Recovery becomes continuous, not episodic. The discharge cliff disappears.',
    impact: 'Eliminates the discharge cliff and maintains therapeutic momentum across all care transitions',
    mechanism: 'ERA micro-cycles, contextual micro-interventions (Navicues), Journey pathways, and continuous support ecosystem',
    features: [
      'ERA micro-cycles: Evidence, Reflection, Action',
      'Contextual triggers deliver support in real-time',
      'Journey pathways bridge treatment to daily life',
      'Navigate connects to therapists and community',
      'Continuous momentum from inpatient to alumni'
    ],
    color: BRAND.dark,
    image: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/The%20evidence%20gap.avif'
  },
  {
    id: 'signals',
    icon: Activity,
    tagline: 'CLINICAL INTELLIGENCE',
    roleShort: 'See the signal before the session.',
    contentEyebrow: 'THE INTELLIGENCE LAYER',
    headline: 'Momentum Signals',
    openingLine: 'Who is engaging. Who is drifting. Pattern recognition surfaces what matters before they walk through the door.',
    narrative: 'Longitudinal patterns emerge from continuous micro-data. You see neurological stability, not just attendance. State tracking shows current capacity across three dimensions. Momentum reveals behavioral patterns over time. Clinical intelligence informs without overwhelming. Insights surface. Data stays quiet. You know what is working before the session starts.',
    impact: 'Makes invisible progress visible and converts continuous data into actionable clinical intelligence',
    mechanism: 'Multi-dimensional state tracking, pattern recognition algorithms, and longitudinal visualization that surfaces clinical signals',
    features: [
      'Real-time engagement and drift patterns',
      'State tracking: Red, Orange, Green capacity',
      'Momentum analysis shows stability over time',
      'Pattern recognition before sessions',
      'Clinical dashboard with actionable insights'
    ],
    color: BRAND.mid,
    image: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/Between%20session%20fade.avif'
  },
  {
    id: 'infrastructure',
    icon: Layers,
    tagline: 'SCALABLE ECONOMICS',
    roleShort: 'Episodic becomes recurring.',
    contentEyebrow: 'THE REVENUE ENGINE',
    headline: 'Method as Infrastructure',
    openingLine: 'Session fees become subscriptions. Your clinical method scales while you rest. Predictable revenue. Outcome-driven economics.',
    narrative: 'What you have built becomes infrastructure that works beyond your calendar. Alumni relationships extend beyond discharge, creating continuous engagement and recurring revenue. Your intellectual property escapes the hourly model. Digital infrastructure inverts traditional economics: invest most when the brain can absorb most. The first 30 days lay foundation. The next 335 days become the real therapeutic work.',
    impact: 'Transforms episodic session fees into recurring revenue infrastructure and creates predictable, outcome-driven economics',
    mechanism: 'Tiered engagement architecture, continuous alumni relationships, and digital infrastructure that scales clinical method beyond sessions',
    features: [
      'Subscription-based recurring revenue model',
      'Alumni engagement extends beyond discharge',
      'Clinical method scales without session limits',
      'Predictable revenue replaces episodic fees',
      'Outcome-driven economics justify premium pricing'
    ],
    color: BRAND.green,
    image: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/Time%20for%20money%20trap.avif'
  }
];

export default function TherapyHowItWorksSection() {
  const [activeStory, setActiveStory] = useState(howItWorksStories[0]);
  const [showFeatures, setShowFeatures] = useState(false);

  const handleStoryClick = (story: typeof howItWorksStories[0]) => {
    if (story.id === activeStory.id) return;
    setActiveStory(story);
    setShowFeatures(false); // Reset flip when changing stories
  };

  const Icon = activeStory.icon;

  return (
    <section 
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: '#FFFFFF'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-therapy {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow-therapy {
          0%, 100% { opacity: 0.10; }
          50% { opacity: 0.18; }
        }
        @keyframes shimmer-asset {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Subtle ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.10) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'pulse-glow-therapy 16s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <CentralisedHeadlineClass
          eyebrow="HOW IT WORKS"
          eyebrowIcon={<Layers size={16} style={{ strokeWidth: 2 }} />}
          eyebrowColor={BRAND.mid}
          headline={
            <>
              Carry the work.<br className="hidden md:block" /> Not the <span style={{ color: BRAND.mid }}>weight</span>.
            </>
          }
          subheadline="Your method becomes infrastructure that works while you rest. From operations to outcomes, six layers that transform clinical practice into scalable architecture."
        />

        {/* Tab Navigation - 6 Buttons */}
        <motion.div 
          className="mb-8 md:mb-12 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {howItWorksStories.map((story) => {
            const StoryIcon = story.icon;
            const isActive = activeStory.id === story.id;
            
            return (
              <button
                key={story.id}
                onClick={() => handleStoryClick(story)}
                className={`
                  group relative overflow-hidden transition-all
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${story.color}18, ${story.color}12)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isActive ? `${story.color}60` : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  boxShadow: isActive 
                    ? `0 8px 24px ${story.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 'clamp(2rem, 5vw, 2.5rem)',
                      height: 'clamp(2rem, 5vw, 2.5rem)',
                      background: isActive 
                        ? `linear-gradient(135deg, ${story.color}30, ${story.color}20)`
                        : 'rgba(107, 114, 128, 0.08)',
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <StoryIcon 
                      size={18} 
                      style={{ 
                        color: isActive ? story.color : '#6B7280',
                        strokeWidth: isActive ? 2.5 : 2,
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  </div>
                  <div className="text-center">
                    <div
                      style={{
                        fontSize: 'clamp(0.7rem, 1.6vw, 0.8125rem)',
                        fontWeight: 600,
                        color: isActive ? '#1F2937' : '#9CA3AF',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.3
                      }}
                    >
                      {story.headline}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
          </div>
        </motion.div>

        {/* Main Content - Image + Overlay OR Features List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeStory.id}-${showFeatures}`}
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
                borderColor: `${activeStory.color}30`,
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                animation: 'float-gentle-therapy 18s ease-in-out infinite'
              }}
            >
              {/* Background Image */}
              <motion.img 
                key={activeStory.id}
                src={activeStory.image}
                alt={activeStory.headline}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Ultra-subtle overlay */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(135deg, ${activeStory.color}06 0%, ${activeStory.color}04 100%)`,
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

              {/* CONDITIONAL CONTENT: Text Overlay OR Features List */}
              <AnimatePresence mode="wait">
                {!showFeatures ? (
                  /* TEXT OVERLAY */
                  <motion.div 
                    key="text-overlay"
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
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    
                    {/* Badge */}
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
                          fontSize: MOBILE_TYPE.labels.caps,
                          letterSpacing: '0.12em',
                          color: '#FFFFFF'
                        }}
                      >
                        {activeStory.contentEyebrow}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 
                      className="mb-4"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.section.h4,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        color: '#FFFFFF'
                      }}
                    >
                      {activeStory.headline}
                    </h3>

                    {/* Copy Structure */}
                    <div className="space-y-4">
                      
                      {/* Opening Line */}
                      <p 
                        style={{
                          fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)',
                          lineHeight: 1.6,
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        {activeStory.openingLine}
                      </p>
                      
                      {/* Narrative with border */}
                      <p 
                        className="pl-4"
                        style={{
                          fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)',
                          lineHeight: 1.6,
                          fontWeight: 500,
                          color: '#FFFFFF',
                          borderLeft: '2px solid rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        {activeStory.narrative}
                      </p>

                      {/* IMPACT */}
                      <div className="pt-2">
                        <div 
                          className="uppercase tracking-wider mb-1.5"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: MOBILE_TYPE.labels.caps,
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
                          {activeStory.impact}
                        </p>
                      </div>

                      {/* MECHANISM */}
                      <div>
                        <div 
                          className="uppercase tracking-wider mb-1.5"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: MOBILE_TYPE.labels.caps,
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
                          {activeStory.mechanism}
                        </p>
                      </div>

                      {/* TAP TO EXPLORE Button */}
                      <motion.button
                        onClick={() => setShowFeatures(true)}
                        className="mt-4 px-4 py-3 w-full backdrop-blur-sm border border-white/40"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '0px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                          letterSpacing: '0.08em',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{ 
                          background: 'rgba(255, 255, 255, 0.15)',
                          scale: 1.02
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        TAP TO EXPLORE
                      </motion.button>

                    </div>

                  </motion.div>
                ) : (
                  /* FEATURES LIST */
                  <motion.div 
                    key="features-list"
                    className="relative md:absolute md:inset-8 p-6 md:p-8"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0px',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      zIndex: 10,
                      border: `2px solid ${activeStory.color}40`
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    
                    {/* Close Button */}
                    <button
                      onClick={() => setShowFeatures(false)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                      style={{
                        background: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '0px',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '20px', color: '#1F2937' }}>×</span>
                    </button>

                    {/* Features Header */}
                    <div className="mb-6">
                      <div 
                        className="inline-flex items-center gap-2 px-3 py-2 mb-3"
                        style={{
                          background: `${activeStory.color}15`,
                          borderRadius: '0px'
                        }}
                      >
                        <Icon size={16} style={{ color: activeStory.color }} />
                        <span 
                          className="uppercase tracking-wider"
                          style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontWeight: 700,
                            fontSize: MOBILE_TYPE.labels.caps,
                            letterSpacing: '0.12em',
                            color: activeStory.color
                          }}
                        >
                          {activeStory.contentEyebrow}
                        </span>
                      </div>
                      <h3 
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                          color: '#1F2937'
                        }}
                      >
                        {activeStory.headline}
                      </h3>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-3">
                      {activeStory.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <div
                            className="flex-shrink-0 flex items-center justify-center"
                            style={{
                              width: '24px',
                              height: '24px',
                              background: `${activeStory.color}20`,
                              borderRadius: '0px',
                              border: `1px solid ${activeStory.color}40`
                            }}
                          >
                            <Check 
                              size={16} 
                              style={{ 
                                color: activeStory.color,
                                strokeWidth: 3
                              }} 
                            />
                          </div>
                          <p
                            style={{
                              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                              lineHeight: 1.5,
                              fontWeight: 500,
                              color: '#1F2937'
                            }}
                          >
                            {feature}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
