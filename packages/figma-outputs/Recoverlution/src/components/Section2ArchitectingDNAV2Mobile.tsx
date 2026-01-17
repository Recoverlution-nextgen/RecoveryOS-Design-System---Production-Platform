/**
 * SECTION 2: ARCHITECTING DNA - MOBILE-RESPONSIVE VERSION
 * 
 * Mobile fixes:
 * - Content-driven height (container wraps copy, not vice versa)
 * - Responsive typography using clamp()
 * - Touch-friendly buttons that stack on mobile
 * - Responsive asset with overlay copy
 * - Mobile-optimized spacing
 */

import { useState } from 'react';
import { Brain, Activity, Award, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuzzTag } from './BuzzTag';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, MOBILE_SPACING, TOUCH_TARGETS } from '../utils/mobileResponsive';
import { BRAND_COLORS } from '../utils/sectionStyles';
import { 
  section2ScienceOptimized, 
  section2SignalsOptimized, 
  section2TrustOptimized 
} from '../utils/section2Assets';

const stories = [
  {
    id: 'science',
    icon: Brain,
    tagline: 'NEUROPLASTIC DESIGN',
    roleShort: 'Neural Rewiring',
    contentEyebrow: 'THE COGNITION ENGINE',
    headline: 'Science That Sticks',
    openingLine: 'Early recovery is marked by impaired decision-making and compromised memory. Traditional treatment ignores this neurobiological reality.',
    narrative: 'We track readiness at the neural level, quantifying when your patients can actually encode and retain information. Recovery becomes something the brain can absorb, not resist.',
    impact: 'Reduces limbic activation and creates measurable biological readiness for therapeutic change.',
    mechanism: 'Breathwork, somatic practices, and co-regulation delivered when neurobiology signals receptiveness.',
    buzzTags: ['Adaptive Intelligence', 'Neural Validation', 'Cognitive Precision'],
    color: BRAND_COLORS.mid,
    image: section2ScienceOptimized
  },
  {
    id: 'signals',
    icon: Activity,
    tagline: 'ADAPTIVE ENGINE',
    roleShort: 'Sentient Intervention',
    contentEyebrow: 'THE CONTINUITY STREAM',
    headline: 'Signals That Steer',
    openingLine: 'Complex therapy requires sustained executive function. But the prefrontal cortex is offline in early recovery. We translate therapy into the body.',
    narrative: 'High-fidelity micro-interventions use embodied signals—what the nervous system already speaks—to guide patients toward healthier patterns without overwhelming cognitive load.',
    impact: 'Sustained behavioral shifts through micro-dose delivery patients can actually integrate.',
    mechanism: 'Contextual prompts triggered by real-time somatic feedback and environmental cues.',
    buzzTags: ['Somatic Intelligence', 'Real-Time Guidance', 'Behavioral Architecture'],
    color: BRAND_COLORS.mid,
    image: section2SignalsOptimized
  },
  {
    id: 'trust',
    icon: Award,
    tagline: 'AUDIT-READY PROOF',
    roleShort: 'Verifiable Outcome',
    contentEyebrow: 'THE PROOF BUILDER',
    headline: 'Trust That Holds',
    openingLine: 'Recovery happens in the real world, not just in sessions. But traditional metrics miss what matters: consistency across contexts.',
    narrative: 'Adaptive technology tracks stability and pace as patients move through life, surfacing audit-ready signals that replace subjective progress notes with objective, measurable clinical outcomes.',
    impact: 'Transforms recovery from anecdotal reporting to verifiable, trackable neurological progress.',
    mechanism: 'Continuous behavioral data streams analyzed across environments to surface stability as clinical proof.',
    buzzTags: ['Outcome Verification', 'Pattern Recognition', 'Clinical Accountability'],
    color: BRAND_COLORS.dark,
    image: section2TrustOptimized
  }
];

export default function Section2ArchitectingDNAV2() {
  const [activeStory, setActiveStory] = useState(stories[0]);
  
  // DEBUG: Verify correct file is loaded
  console.log('✅ Section2ArchitectingDNAV2Mobile.tsx loaded - PURPLE (#5739FB) color scheme, Only TRUST shows background');

  const handleStoryClick = (story: typeof stories[0]) => {
    if (story.id === activeStory.id) return;
    setActiveStory(story);
  };

  const Icon = activeStory.icon;

  return (
    <section 
      className={`relative overflow-hidden ${MOBILE_SPACING.section.y}`}
      style={{
        background: '#FFFFFF'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-dna {
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

      {/* Subtle ambient purple glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'pulse-glow-subtle 15s ease-in-out infinite'
        }}
      />

      <div className={`relative z-10 max-w-[1600px] mx-auto ${MOBILE_SPACING.section.x}`}>
        
        {/* Section Header */}
        <CentralisedHeadlineClass
          eyebrow="RECOVERY IN THE FLOW OF LIFE"
          eyebrowIcon={<Network size={16} style={{ strokeWidth: 2 }} />}
          eyebrowColor={BRAND_COLORS.mid}
          headline={
            <>
              <span style={{ color: BRAND_COLORS.mid }}>Architecting</span> the<br className="hidden md:block" /> DNA of Care
            </>
          }
          subheadline="Neuroadaptive precision aligns cognition, behaviour and identity to embed real world recovery."
        />

        {/* Tab Navigation - Mobile: Stack Vertically, Desktop: Horizontal */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center mb-8 md:mb-12 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stories.map((story) => {
            const StoryIcon = story.icon;
            const isActive = activeStory.id === story.id;
            
            return (
              <button
                key={story.id}
                onClick={() => handleStoryClick(story)}
                className={`
                  group relative overflow-hidden transition-all w-full md:w-auto
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: (isActive && story.id === 'trust')
                    ? `linear-gradient(135deg, ${story.color}20, ${story.color}15)`
                    : 'transparent',
                  border: `1px solid ${isActive ? `${story.color}40` : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1.25rem, 3vw, 1.5rem)', // Responsive padding
                  boxShadow: (isActive && story.id === 'trust')
                    ? `0 8px 24px ${story.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
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
                        ? `linear-gradient(135deg, ${story.color}30, ${story.color}20)`
                        : `${story.color}10`,
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <StoryIcon 
                      size={20} 
                      style={{ 
                        color: isActive ? story.color : `${story.color}99`,
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
                        color: isActive ? story.color : '#6B7280',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {story.tagline}
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
                      {story.roleShort}
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
            key={activeStory.id}
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
                borderColor: `${activeStory.color}30`,
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                animation: 'float-gentle-dna 18s ease-in-out infinite'
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
                  <Icon size={14} className="md:w-4 md:h-4" style={{ color: '#FFFFFF' }} />
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
                    {activeStory.contentEyebrow}
                  </span>
                </div>

                {/* Headline - Responsive */}
                <h3 
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: MOBILE_TYPE.section.h4, // clamp(1.125rem, 4vw, 2rem) → 18px-32px
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    color: '#FFFFFF'
                  }}
                >
                  {activeStory.headline}
                </h3>

                {/* 4-PART COPY STRUCTURE - Responsive */}
                <div className="space-y-4">
                  
                  {/* 1. Opening Line */}
                  <p 
                    style={{
                      fontSize: MOBILE_TYPE.body.small, // clamp(0.8125rem, 2vw, 0.9375rem) → 13px-15px
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF'
                    }}
                  >
                    {activeStory.openingLine}
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
                    {activeStory.narrative}
                  </p>

                  {/* 3. IMPACT - Labeled Section */}
                  <div className="pt-2">
                    <div 
                      className="uppercase tracking-wider mb-2"
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
                        fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)', // 12px → 13px
                        lineHeight: 1.5,
                        fontWeight: 500,
                        color: '#FFFFFF'
                      }}
                    >
                      {activeStory.impact}
                    </p>
                  </div>

                  {/* 4. MECHANISM - Labeled Section */}
                  <div>
                    <div 
                      className="uppercase tracking-wider mb-2"
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
                      {activeStory.mechanism}
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
                      <BuzzTag tags={activeStory.buzzTags} sectionColor={activeStory.color} />
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
