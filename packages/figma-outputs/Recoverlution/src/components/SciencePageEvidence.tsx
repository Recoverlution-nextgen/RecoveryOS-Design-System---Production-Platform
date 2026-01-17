/**
 * SCIENCE PAGE - EVIDENCE BASED SECTION
 * REFACTORED TO USE COMPOUND GLASS (Nov 5, 2025)
 * 
 * Special tile variant for evidence stats with:
 * - Large stat number
 * - Direction arrow (up/down)
 * - Label and context
 * - Icon watermark
 * 
 * Updated: November 5, 2025 - Now uses TwoColumnHeadlineClass, 4 tiles with updated stats
 */

import { Activity, Target, Shield, Brain, TrendingUp, TrendingDown, Users, Repeat } from 'lucide-react';
import { motion } from 'motion/react';
import { TwoColumnHeadlineClass } from './marketing/universal';

// Evidence Assets - Shared with Homepage Section 7 "Validated by Science"
// Update assets in /utils/scienceAssets.tsx and BOTH sections update automatically
import { 
  evidenceMemoryOptimized, 
  evidenceBehaviorOptimized, 
  evidenceEngagementOptimized, 
  evidenceRelapseOptimized 
} from '../utils/scienceAssets';

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB'
};

interface EvidenceItem {
  stat: string;
  direction: 'up' | 'down';
  label: string;
  context: string;
  icon: typeof Activity;
  color: string;
  glassBackground: string;
  gradientOverlay: string;
}

export function SciencePageEvidence() {
  const evidence: EvidenceItem[] = [
    {
      stat: '75%',
      direction: 'up',
      label: 'Memory Consolidation',
      context: 'when practice is experiential',
      icon: Brain,
      color: '#5739FB',
      glassBackground: evidenceMemoryOptimized,
      gradientOverlay: 'linear-gradient(135deg, rgba(62, 43, 184, 0.08) 0%, rgba(87, 57, 251, 0.06) 100%)'
    },
    {
      stat: '60%',
      direction: 'up',
      label: 'Behaviour Change',
      context: 'when reflection is structured',
      icon: Repeat,
      color: '#6366F1',
      glassBackground: evidenceBehaviorOptimized,
      gradientOverlay: 'linear-gradient(135deg, rgba(87, 57, 251, 0.08) 0%, rgba(62, 43, 184, 0.06) 100%)'
    },
    {
      stat: '72%',
      direction: 'up',
      label: 'Sustained Coherence',
      context: 'when support adapts to context',
      icon: Target,
      color: '#0891B2',
      glassBackground: evidenceEngagementOptimized,
      gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.08) 0%, rgba(44, 153, 175, 0.06) 100%)'
    },
    {
      stat: '24%',
      direction: 'down',
      label: 'Relapse Reduction',
      context: 'when recovery is connected',
      icon: Users,
      color: '#14B8A6',
      glassBackground: evidenceRelapseOptimized,
      gradientOverlay: 'linear-gradient(135deg, rgba(87, 57, 251, 0.08) 0%, rgba(62, 43, 184, 0.06) 100%)'
    }
  ];

  return (
    <section 
      className="py-32 md:py-40 relative overflow-hidden" 
      style={{ background: '#F5F3FF' }}
    >
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Two-Column Headline */}
        <TwoColumnHeadlineClass
          headline="Evidence Based"
          headlineAccent="Based"
          accentColor={BRAND.mid}
          tagline="Clinical outcomes validated across behavioral health research"
          layout="right"
          marginBottom="mb-16"
        />

        {/* Evidence Stats Grid - COMPOUND GLASS - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {evidence.map((item, i) => {
            const Icon = item.icon;
            const DirectionIcon = item.direction === 'up' ? TrendingUp : TrendingDown;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative overflow-hidden group"
                style={{
                  borderRadius: '0px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(87, 57, 251, 0.12)',
                  transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)'
                }}
                whileHover={{
                  scale: 1.012,
                  y: -3,
                  boxShadow: `
                    0 28px 80px rgba(0, 0, 0, 0.12),
                    0 12px 32px rgba(87, 57, 251, 0.15)
                  `
                }}
              >
                {/* Shimmer Animation Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
                    animation: 'shimmer-glass 12s ease-in-out infinite',
                    borderRadius: '0px',
                    zIndex: 100
                  }}
                />

                {/* 3D Asset Background */}
                <div className="absolute inset-0" style={{ zIndex: 1 }}>
                  <img 
                    src={item.glassBackground}
                    alt=""
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      background: item.gradientOverlay,
                      zIndex: 2
                    }}
                  />
                </div>

                {/* Hover Glow */}
                <div 
                  className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${item.color}12 0%, transparent 50%)`,
                    filter: 'blur(20px)',
                    zIndex: 0
                  }}
                />

                {/* Icon Watermark */}
                <Icon 
                  size={70}
                  style={{ 
                    color: item.color,
                    opacity: 0.08,
                    strokeWidth: 1.5,
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    pointerEvents: 'none',
                    transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
                    zIndex: 5
                  }}
                  className="group-hover:opacity-[0.09]"
                />

                <div className="relative p-8 flex flex-col justify-between" style={{ zIndex: 10, minHeight: '280px' }}>
                  
                  {/* Stat with Direction Arrow - TOP */}
                  <div
                    className="flex items-center gap-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: 'clamp(3.5rem, 6vw, 4.5rem)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em',
                      color: '#FFFFFF',
                      textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {item.stat}
                    <DirectionIcon 
                      size={40} 
                      style={{ 
                        color: '#FFFFFF',
                        strokeWidth: 3,
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                      }} 
                    />
                  </div>

                  {/* Copy Container - BOTTOM (matches other sections) */}
                  <div 
                    className="mt-auto"
                    style={{
                      background: 'transparent',
                      borderRadius: '0px',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)'
                    }}
                  >
                    {/* Label */}
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        letterSpacing: '-0.01em',
                        color: '#FFFFFF',
                        marginBottom: '0.5rem',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {item.label}
                    </h4>

                    {/* Context */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: '#FFFFFF',
                        fontWeight: 500,
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {item.context}
                    </p>
                  </div>

                </div>

                {/* Shimmer animation keyframes */}
                <style>{`
                  @keyframes shimmer-glass {
                    0%, 100% {
                      background-position: -200% 0;
                    }
                    50% {
                      background-position: 200% 0;
                    }
                  }
                `}</style>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
