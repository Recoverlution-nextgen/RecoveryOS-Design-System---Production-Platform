import { useState } from 'react';
import { Stethoscope, Award, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuzzTag } from './BuzzTag';
import { CentralisedHeadlineClass } from './marketing/universal/CentralisedHeadlineClass';
import { MOBILE_TYPE, TOUCH_TARGETS } from '../utils/mobileResponsive';

// Stakeholder Assets - Centralized Repository
// Update assets in /utils/section8Assets.tsx for instant propagation
import { 
  impactClinicalOptimized as clinicalAsset,
  impactAccreditationOptimized as accreditationAsset,
  impactLeadershipOptimized as leadershipAsset,
  impactRevenueOptimized as revenueAsset
} from '../utils/section8Assets';

const BRAND = {
  blue: '#3E2BB8', // Brand Blue - proper infiniteK color
};

// FOUR STAKEHOLDER VALUE PROPOSITIONS - Measurable Impact
const stakeholders = [
  {
    id: 'clinical',
    icon: Stethoscope,
    role: 'CLINICAL DIRECTORS',
    roleShort: 'Clinical',
    value: 'Embedded Innovation',
    tagline: 'PROPRIETARY PRACTICE',
    description: 'Architect an adaptive system that turns neuroplastic science into scalable, proprietary practice across all programs.',
    detailCopy: 'Clinical innovation stops being theoretical and becomes operational. The platform embeds evidence-based frameworks directly into daily practice, creating a proprietary therapeutic approach that differentiates your facility. Every session, every interaction, every moment becomes part of a scientifically grounded, systematically delivered treatment model.',
    impact: 'Transform generic programming into a differentiated clinical signature that attracts patients and retains staff',
    mechanism: 'Evidence-based frameworks, structured delivery systems, and neuroplastic science embedded into operations',
    buzzTags: ['Clinical Differentiation', 'Proprietary Frameworks', 'Systematic Excellence'],
    color: '#3E2BB8',
    asset: clinicalAsset, // Geometric 3D shapes - Competitive intelligence & systematic architecture
  },
  {
    id: 'accreditation',
    icon: Award,
    role: 'ACCREDITATION TEAMS',
    roleShort: 'Accreditation',
    value: 'Verifiable Outcomes',
    tagline: 'AUDIT-READY EVIDENCE',
    description: 'Create audit-ready evidence that validates clinical care and turns success into quantifiable outcomes payers approve.',
    detailCopy: 'Compliance becomes automatic and outcomes become visible. Every patient interaction generates structured data that maps to accreditation standards. Treatment quality is no longer anecdotal, it is measurable, trackable, and reportable. Audits shift from stressful scrambles to confident presentations of systematic excellence.',
    impact: 'Convert invisible clinical quality into documented proof that satisfies regulators and impresses payers',
    mechanism: 'Automated data collection, standardized metrics, and compliance-ready reporting frameworks',
    buzzTags: ['Automated Compliance', 'Verifiable Outcomes', 'Regulatory Confidence'],
    color: '#0EA5E9', // Sky Blue - Verification & Evidence
    asset: accreditationAsset, // Pixelated/voxel sphere dispersing - Data integrity transforming into verifiable proof
  },
  {
    id: 'leadership',
    icon: Target,
    role: 'EXECUTIVE LEADERSHIP',
    roleShort: 'Leadership',
    value: 'Lifelong Capacity',
    tagline: 'SCALABLE OPERATIONS',
    description: 'Sustain 365-day engagement so patient care scales efficiently without new headcount, and operations stay predictable.',
    detailCopy: 'Growth stops requiring linear headcount expansion. The platform creates operational leverage by delivering consistent care at scale. Alumni stay engaged, outcomes remain high, and capacity expands without proportional cost increases. Leadership gains the visibility and predictability needed to plan strategically rather than react tactically.',
    impact: 'Scale impact without scaling costs and maintain quality across growing patient populations',
    mechanism: 'Automated engagement systems, scalable care delivery, and predictable operational frameworks',
    buzzTags: ['Operational Leverage', 'Non-Linear Growth', 'Strategic Visibility'],
    color: '#6366F1', // Indigo - Systems & Operations
    asset: leadershipAsset, // Blue translucent sphere - Scalable growth with clear operational visibility
  },
  {
    id: 'revenue',
    icon: TrendingUp,
    role: 'REVENUE LEADERS',
    roleShort: 'Revenue',
    value: 'Predictable Revenue',
    tagline: 'RECURRING GROWTH',
    description: 'Transform the discharge model, underwriting sustained growth and recurring revenue based on verifiable patient value.',
    detailCopy: 'Revenue becomes predictable and patient-centered value becomes monetizable. Continuous care models replace one-time discharge, creating ongoing revenue streams anchored in measurable outcomes. Payers see proof of value, patients experience sustained support, and revenue leaders gain the certainty needed to invest in growth.',
    impact: 'Shift from episodic transactions to continuous relationships that generate predictable recurring revenue',
    mechanism: 'Continuity-based care models, outcome verification systems, and payer-approved value metrics',
    buzzTags: ['Recurring Revenue', 'Value Monetization', 'Payer Validation'],
    color: '#14B8A6', // Teal - Growth & Continuity
    asset: revenueAsset, // Purple/blue stacked geometric shapes - Building blocks of recurring revenue architecture
  }
];

export default function Section8MeasurableImpactV2() {
  const [activeStakeholder, setActiveStakeholder] = useState(stakeholders[0]);

  const handleStakeholderClick = (stakeholder: typeof stakeholders[0]) => {
    if (stakeholder.id === activeStakeholder.id) return;
    setActiveStakeholder(stakeholder);
  };

  const Icon = activeStakeholder.icon;

  return (
    <section 
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: '#FAFAFA'
      }}
    >
      
      <style>{`
        @keyframes float-gentle-impact {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow-blue {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.14; }
        }
        @keyframes shimmer-asset {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Subtle ambient brand blue glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[850px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(62, 43, 184, 0.12) 0%, transparent 70%)',
          filter: 'blur(110px)',
          animation: 'pulse-glow-blue 17s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <CentralisedHeadlineClass
          eyebrow="OUTCOMES AS CURRENCY"
          eyebrowIcon={<TrendingUp size={16} style={{ strokeWidth: 2 }} />}
          eyebrowColor={BRAND.blue}
          headline={
            <>
              <span style={{ color: BRAND.blue }}>Measurable</span><br className="hidden md:block" /> Impact
            </>
          }
          subheadline="Surface what truly matters and turn invisible outcomes into competitive advantage."
        />

        {/* Tab Navigation - Mobile: 2 Columns, Desktop: Flex Wrap */}
        <motion.div 
          className="grid grid-cols-2 md:flex md:flex-wrap justify-center mb-8 md:mb-12 gap-3 md:gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stakeholders.map((stakeholder) => {
            const StakeholderIcon = stakeholder.icon;
            const isActive = activeStakeholder.id === stakeholder.id;
            
            return (
              <button
                key={stakeholder.id}
                onClick={() => handleStakeholderClick(stakeholder)}
                className={`
                  group relative overflow-hidden transition-all md:w-auto
                  ${TOUCH_TARGETS.button.standard}
                `}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${stakeholder.color}18, ${stakeholder.color}12)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isActive ? `${stakeholder.color}60` : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0px',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.5rem)',
                  boxShadow: isActive 
                    ? `0 8px 24px ${stakeholder.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
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
                        ? `linear-gradient(135deg, ${stakeholder.color}30, ${stakeholder.color}20)`
                        : 'rgba(107, 114, 128, 0.08)',
                      borderRadius: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <StakeholderIcon 
                      size={20} 
                      style={{ 
                        color: isActive ? stakeholder.color : '#6B7280',
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
                        color: isActive ? stakeholder.color : '#6B7280',
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2
                      }}
                    >
                      {stakeholder.tagline}
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
                      {stakeholder.roleShort}
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
            key={activeStakeholder.id}
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
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)',
                borderColor: `${activeStakeholder.color}40`,
                borderRadius: '0px',
                boxShadow: '0 40px 120px rgba(62, 43, 184, 0.15), 0 20px 60px rgba(99, 102, 241, 0.1)',
                animation: 'float-gentle-impact 21s ease-in-out infinite'
              }}
            >
              {/* Background Image - Stakeholder-Specific Asset */}
              <motion.img 
                key={activeStakeholder.id}
                src={activeStakeholder.asset}
                alt={`${activeStakeholder.value} - ${activeStakeholder.tagline}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Color-coded overlay */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(135deg, ${activeStakeholder.color}08 0%, ${activeStakeholder.color}04 100%)`,
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
                      fontSize: MOBILE_TYPE.labels.caps,
                      letterSpacing: '0.12em',
                      color: '#FFFFFF'
                    }}
                  >
                    {activeStakeholder.role}
                  </span>
                </div>

                {/* Value Proposition - Responsive */}
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
                  {activeStakeholder.value}
                </h3>

                {/* 4-PART COPY STRUCTURE - Responsive */}
                <div className="space-y-4">
                  
                  {/* 1. Tagline (Opening) - Responsive */}
                  <p 
                    style={{
                      fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)',
                      lineHeight: 1.6,
                      fontWeight: 500,
                      fontStyle: 'italic',
                      color: '#FFFFFF'
                    }}
                  >
                    {activeStakeholder.tagline}
                  </p>

                  {/* 2. Description (Narrative) - Responsive */}
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
                    {activeStakeholder.description}
                  </p>

                  {/* HIDDEN: Detail Copy (not in 4-part structure) */}
                  {activeStakeholder.detailCopy && (
                    <p 
                      style={{
                        fontSize: 'clamp(0.875rem, 2.2vw, 0.9375rem)',
                        lineHeight: 1.6,
                        fontWeight: 500,
                        color: '#FFFFFF'
                      }}
                    >
                      {activeStakeholder.detailCopy}
                    </p>
                  )}

                  {/* 3. IMPACT - Responsive */}
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
                      {activeStakeholder.impact}
                    </p>
                  </div>

                  {/* 4. MECHANISM - Responsive */}
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
                      {activeStakeholder.mechanism}
                    </p>
                  </div>

                  {/* Buzz Tags - Inside Overlay */}
                  <motion.div
                    className="pt-4 md:pt-5 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="max-w-full overflow-hidden">
                      <BuzzTag tags={activeStakeholder.buzzTags} sectionColor={activeStakeholder.color} />
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
