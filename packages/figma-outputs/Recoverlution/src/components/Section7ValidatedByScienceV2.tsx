import { useState } from 'react';
import { Brain, Repeat, Target, Users, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuzzTag } from './BuzzTag';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, TOUCH_TARGETS } from '../utils/mobileResponsive';

// Evidence Assets - Shared with Science Page "Evidence Based" section
// Update assets in /utils/scienceAssets.tsx and BOTH sections update automatically
import { 
  evidenceMemoryOptimized as memoryAsset, 
  evidenceBehaviorOptimized as behaviorAsset, 
  evidenceEngagementOptimized as engagementAsset, 
  evidenceRelapseOptimized as relapseAsset 
} from '../utils/scienceAssets';

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  teal: '#0891B2',
};

// FOUR SCIENCE STATS - Neuroplasticity Evidence
const stats = [
  {
    id: 'memory',
    icon: Brain,
    percentage: '75',
    direction: 'up',
    metric: 'Memory Consolidation',
    role: 'EXPERIENTIAL PRACTICE',
    context: 'when practice is experiential',
    insight: 'We wire what we live, not what we hear or are told. Retention is maximized when practice is experiential and actively repeated in context.',
    detailCopy: 'Neural pathways strengthen through lived experience, not passive consumption. When patients practice new behaviors in real-world contexts, the brain creates stronger, more durable connections. Memory consolidation happens through doing, feeling, and reflecting, not just reading or listening.',
    research: 'Applied Neuroplasticity & Experiential Learning Research',
    buzzTags: ['Experiential Learning', 'Neural Encoding', 'Contextual Practice'],
    color: '#5739FB', // Primary Purple - Neuroplastic Foundation
    asset: memoryAsset, // Purple/cyan/green flowing waves - Neuroplasticity in motion
  },
  {
    id: 'behavior',
    icon: Repeat,
    percentage: '60',
    direction: 'up',
    metric: 'Behaviour Change',
    role: 'STRUCTURED REFLECTION',
    context: 'when reflection is structured',
    insight: 'When people join the dots, habits take hold faster. Behaviour change accelerates when self-reflection is structured and links experience to conviction.',
    detailCopy: 'The gap between insight and action closes when reflection is guided and intentional. Structured frameworks help patients connect their experiences to deeper meanings, transforming understanding into commitment. This metacognitive process builds the neural scaffolding for lasting change.',
    research: 'Cognitive-Behavioral Therapy & Metacognitive Science',
    buzzTags: ['Structured Reflection', 'Metacognitive Processing', 'Conviction Building'],
    color: '#6366F1', // Indigo - Structured Systems
    asset: behaviorAsset, // Blue geometric shapes - Structure creates change
  },
  {
    id: 'engagement',
    icon: Target,
    percentage: '72',
    direction: 'up',
    metric: 'Sustained Coherence',
    role: 'ADAPTIVE SUPPORT',
    context: 'when support adapts to context',
    insight: 'Relevance keeps people engaged and moving forward. Engagement sustains because support intelligently adapts to context and personal state.',
    detailCopy: 'Generic interventions fail because they ignore individual variability in readiness, capacity, and need. Just-In-Time Adaptive Interventions (JITAI) deliver the right support at the right moment, matching content to current state. This precision creates sustained engagement over time.',
    research: 'JITAI Research & Personalized Intervention Science',
    buzzTags: ['JITAI Framework', 'Adaptive Precision', 'State Matching'],
    color: '#0891B2', // Cyan - Adaptive Connection
    asset: engagementAsset, // Blue water droplets/bubbles - Sustained flow & adaptive coherence
  },
  {
    id: 'relapse',
    icon: Users,
    percentage: '24',
    direction: 'down',
    metric: 'Relapse Reduction',
    role: 'CONNECTED CONTINUITY',
    context: 'when recovery is connected',
    insight: 'Seamless support bridges critical gaps in recovery. Relapse risk is reduced when continuity of care replaces the isolation of discharge.',
    detailCopy: 'The most dangerous moment in recovery is the transition from structured treatment to independent life. Connected care eliminates the gap, providing continuous support through the vulnerable early months. Social connection and accessible resources prevent the isolation that precedes relapse.',
    research: 'Continuity of Care & Social Support Research',
    buzzTags: ['Continuity Research', 'Gap Prevention', 'Social Connection'],
    color: '#14B8A6', // Teal - Healing Continuity
    asset: relapseAsset, // Purple/green ethereal ink - Connected healing through continuity
  }
];

export default function Section7ValidatedByScienceV2() {
  const [activeStat, setActiveStat] = useState(stats[0]);

  const handleStatClick = (stat: typeof stats[0]) => {
    if (stat.id === activeStat.id) return;
    setActiveStat(stat);
  };

  const Icon = activeStat.icon;
  const TrendIcon = activeStat.direction === 'up' ? TrendingUp : TrendingDown;

  return (
    <section 
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: '#FFFFFF'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-science {
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.12) 0%, transparent 70%)',
          filter: 'blur(110px)',
          animation: 'pulse-glow-purple 18s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <CentralisedHeadlineClass
          eyebrow="PROVEN IN PRACTICE"
          eyebrowIcon={<Award size={16} style={{ strokeWidth: 2 }} />}
          eyebrowColor={BRAND.teal}
          headline={
            <>
              <span style={{ color: BRAND.teal }}>Validated</span><br className="hidden md:block" /> by Science
            </>
          }
          subheadline="Applied Neuroplasticity, Trauma-Aware Design, and JITAI research ensure every outcome is scientific and sustainable."
        />

        {/* Tab Navigation - Mobile: 2 Columns, Desktop: Flex Wrap */}
        <motion.div 
          className="grid grid-cols-2 md:flex md:flex-wrap justify-center mb-8 md:mb-12 gap-3 md:gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            const isActive = activeStat.id === stat.id;
            
            return (
              <button
                key={stat.id}
                onClick={() => handleStatClick(stat)}
                className={`
                  group relative overflow-hidden transition-all md:w-auto
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${stat.color}18, ${stat.color}12)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isActive ? `${stat.color}60` : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.5rem)',
                  boxShadow: isActive 
                    ? `0 8px 24px ${stat.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 'clamp(2rem, 5vw, 2.5rem)',
                      height: 'clamp(2rem, 5vw, 2.5rem)',
                      background: isActive 
                        ? `linear-gradient(135deg, ${stat.color}30, ${stat.color}20)`
                        : 'rgba(107, 114, 128, 0.08)',
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <StatIcon 
                      size={20} 
                      style={{ 
                        color: isActive ? stat.color : '#6B7280',
                        strokeWidth: isActive ? 2.5 : 2,
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  </div>
                  <div className="text-left min-w-0">
                    <div 
                      className="uppercase tracking-wider mb-0.5"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 700,
                        fontSize: MOBILE_TYPE.labels.caps,
                        letterSpacing: '0.12em',
                        color: isActive ? stat.color : '#6B7280',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {stat.role}
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                        fontWeight: 600,
                        color: isActive ? '#1F2937' : '#9CA3AF',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {stat.metric}
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
            key={activeStat.id}
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
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
                borderColor: `${activeStat.color}40`,
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(87, 57, 251, 0.15), 0 20px 60px rgba(99, 102, 241, 0.1)',
                animation: 'float-gentle-science 20s ease-in-out infinite'
              }}
            >
              {/* Background Image - Stat-Specific Asset */}
              <motion.img 
                key={activeStat.id}
                src={activeStat.asset}
                alt={`${activeStat.metric} - ${activeStat.role}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Color-coded overlay */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(135deg, ${activeStat.color}08 0%, ${activeStat.color}04 100%)`,
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
                className="relative md:absolute md:bottom-8 md:left-8 md:right-auto md:min-w-[320px] md:max-w-[480px] p-6 md:p-6"
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
                
                {/* Percentage Badge with Trend */}
                <div 
                  className="inline-flex items-center gap-2.5 px-4 py-3 mb-4 border"
                  style={{
                    background: activeStat.direction === 'up'
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.40), rgba(16, 185, 129, 0.30))'
                      : 'linear-gradient(135deg, rgba(87, 57, 251, 0.40), rgba(87, 57, 251, 0.30))',
                    borderColor: activeStat.direction === 'up' 
                      ? 'rgba(16, 185, 129, 0.60)'
                      : 'rgba(87, 57, 251, 0.60)',
                    borderRadius: '0px',
                    boxShadow: activeStat.direction === 'up'
                      ? '0 4px 12px rgba(16, 185, 129, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                      : '0 4px 12px rgba(87, 57, 251, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                  }}
                >
                  <TrendIcon 
                    size={20} 
                    style={{ 
                      color: '#FFFFFF',
                      filter: 'drop-shadow(0 0 8px currentColor)'
                    }} 
                  />
                  <span 
                    className="uppercase tracking-wider"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      letterSpacing: '0.05em',
                      color: '#FFFFFF',
                      textShadow: activeStat.direction === 'up' 
                        ? '0 1px 2px rgba(16, 185, 129, 0.8)'
                        : '0 1px 2px rgba(87, 57, 251, 0.8)'
                    }}
                  >
                    {activeStat.percentage}%
                  </span>
                  <span
                    className="uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.625rem',
                      letterSpacing: '0.1em',
                      color: '#FFFFFF',
                      textShadow: activeStat.direction === 'up' 
                        ? '0 1px 2px rgba(16, 185, 129, 0.8)'
                        : '0 1px 2px rgba(87, 57, 251, 0.8)'
                    }}
                  >
                    {activeStat.direction === 'up' ? 'INCREASE' : 'DECREASE'}
                  </span>
                </div>

                {/* Metric Name - Responsive */}
                <h3 
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: MOBILE_TYPE.section.h4,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: '#FFFFFF',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {activeStat.metric}
                </h3>

                {/* Context - Responsive */}
                <p 
                  className="mb-4"
                  style={{
                    fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                    lineHeight: 1.5,
                    fontWeight: 600,
                    fontStyle: 'italic',
                    color: '#FFFFFF',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)'
                  }}
                >
                  {activeStat.context}
                </p>

                {/* Insight - Responsive */}
                <p 
                  className="mb-4"
                  style={{
                    fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)',
                    lineHeight: 1.6,
                    fontWeight: 500,
                    color: '#FFFFFF',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)'
                  }}
                >
                  {activeStat.insight}
                </p>

                {/* Detail Copy with accent border */}
                <div 
                  className="pl-4 mb-5"
                  style={{
                    borderLeft: '2px solid rgba(255, 255, 255, 0.6)',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem'
                  }}
                >
                  <p 
                    style={{
                      fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)',
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: '#FFFFFF',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    {activeStat.detailCopy}
                  </p>
                </div>

                {/* Research Foundation - Responsive */}
                <div className="mb-5">
                  <div 
                    className="uppercase tracking-wider mb-1.5"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: MOBILE_TYPE.labels.caps,
                      letterSpacing: '0.12em',
                      color: '#FFFFFF',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    RESEARCH FOUNDATION
                  </div>
                  <p 
                    style={{
                      fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)',
                      lineHeight: 1.5,
                      fontWeight: 500,
                      color: '#FFFFFF'
                    }}
                  >
                    {activeStat.research}
                  </p>
                </div>

                {/* Buzz Tags - Inside Overlay */}
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="max-w-full overflow-hidden">
                    <BuzzTag tags={activeStat.buzzTags} sectionColor={activeStat.color} />
                  </div>
                </motion.div>

              </motion.div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
