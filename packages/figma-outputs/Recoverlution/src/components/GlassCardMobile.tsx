/**
 * MOBILE-RESPONSIVE GLASS CARD COMPONENT
 * Universal glass treatment with mobile-first design
 * 
 * Created: November 4, 2025
 * Purpose: Replace fixed glass panels with responsive variants
 */

import { ReactNode, CSSProperties } from 'react';
import { motion } from 'motion/react';
import { MOBILE_SPACING, MOBILE_GLASS } from '../utils/mobileResponsive';

interface GlassCardMobileProps {
  children: ReactNode;
  variant?: 'hero' | 'card' | 'overlay' | 'compact';
  className?: string;
  style?: CSSProperties;
  animate?: boolean;
  delay?: number;
}

/**
 * GLASS CARD MOBILE
 * Responsive glass panel with mobile-first padding and blur
 */
export function GlassCardMobile({
  children,
  variant = 'card',
  className = '',
  style = {},
  animate = true,
  delay = 0
}: GlassCardMobileProps) {
  
  // Variant configurations
  const variantConfig = {
    hero: {
      padding: MOBILE_SPACING.card.hero,
      blur: MOBILE_GLASS.hero,
      shadow: `
        0 12px 48px rgba(0, 0, 0, 0.12),
        0 6px 24px rgba(62, 43, 184, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1)
      `,
    },
    card: {
      padding: MOBILE_SPACING.card.standard,
      blur: MOBILE_GLASS.card,
      shadow: `
        0 8px 32px rgba(0, 0, 0, 0.10),
        0 4px 16px rgba(62, 43, 184, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.08)
      `,
    },
    overlay: {
      padding: MOBILE_SPACING.card.compact,
      blur: MOBILE_GLASS.overlay,
      shadow: `
        0 4px 16px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.2)
      `,
    },
    compact: {
      padding: MOBILE_SPACING.card.compact,
      blur: MOBILE_GLASS.card,
      shadow: `
        0 4px 16px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.25)
      `,
    }
  };

  const config = variantConfig[variant];

  const cardContent = (
    <div
      className={`
        ${config.padding}
        ${config.blur}
        ${className}
      `}
      style={{
        borderRadius: '0px',
        boxShadow: config.shadow,
        ...style
      }}
    >
      {children}
    </div>
  );

  // Return animated or static version
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.19, 1, 0.22, 1] }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

/**
 * HERO GLASS PANEL - Mobile Responsive
 * Special variant for hero sections with responsive positioning
 */
interface HeroGlassPanelProps {
  children: ReactNode;
  position?: 'topLeft' | 'centered' | 'bottom';
  className?: string;
}

export function HeroGlassPanel({
  children,
  position = 'topLeft',
  className = ''
}: HeroGlassPanelProps) {
  
  const positionConfig = {
    topLeft: 'relative md:absolute md:top-12 lg:top-16 md:left-8 lg:left-12 w-full md:max-w-xl lg:max-w-2xl mb-8 md:mb-0',
    centered: 'relative max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto',
    bottom: 'relative md:absolute md:bottom-12 lg:bottom-16 md:left-8 lg:left-12 w-full md:max-w-xl lg:max-w-2xl mt-8 md:mt-0'
  };

  return (
    <motion.div
      className={`z-10 ${positionConfig[position]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
    >
      <GlassCardMobile variant="hero" animate={false}>
        {children}
      </GlassCardMobile>
    </motion.div>
  );
}

/**
 * FEATURE TILE - Mobile Responsive
 * For economics-style multi-tile sections
 */
interface FeatureTileProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  color?: string;
  className?: string;
}

export function FeatureTile({
  icon: Icon,
  title,
  description,
  color = '#5739FB',
  className = ''
}: FeatureTileProps) {
  return (
    <GlassCardMobile variant="card" className={className}>
      <div className="flex flex-col gap-3 md:gap-4">
        
        {/* Icon */}
        <div 
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
          style={{
            background: `${color}15`,
            borderRadius: '0px'
          }}
        >
          <Icon 
            size={20}
            className="md:w-6 md:h-6"
            style={{ color }}
          />
        </div>

        {/* Title */}
        <h4
          className="text-base md:text-lg lg:text-xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            color: '#000000'
          }}
        >
          {title}
        </h4>

        {/* Description */}
        <p
          className="text-sm md:text-base"
          style={{
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            lineHeight: 1.6,
            color: 'rgba(0, 0, 0, 0.70)'
          }}
        >
          {description}
        </p>
      </div>
    </GlassCardMobile>
  );
}

/**
 * METRICS CARD - Mobile Responsive
 * For stat/metric displays
 */
interface MetricsCardProps {
  value: string;
  label: string;
  sublabel?: string;
  color?: string;
  className?: string;
}

export function MetricsCard({
  value,
  label,
  sublabel,
  color = '#5739FB',
  className = ''
}: MetricsCardProps) {
  return (
    <GlassCardMobile variant="compact" className={`min-w-[140px] lg:min-w-0 ${className}`}>
      <div className="flex flex-col gap-1.5">
        
        {/* Value */}
        <div
          className="text-2xl md:text-3xl lg:text-4xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color
          }}
        >
          {value}
        </div>

        {/* Label */}
        <div
          className="text-xs md:text-sm"
          style={{
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            lineHeight: 1.4,
            fontWeight: 600,
            color: 'rgba(0, 0, 0, 0.80)'
          }}
        >
          {label}
        </div>

        {/* Sublabel */}
        {sublabel && (
          <div
            className="text-xs"
            style={{
              fontSize: 'clamp(0.6875rem, 1.8vw, 0.75rem)',
              lineHeight: 1.3,
              color: 'rgba(0, 0, 0, 0.60)'
            }}
          >
            {sublabel}
          </div>
        )}
      </div>
    </GlassCardMobile>
  );
}

/**
 * EXPORT ALL COMPONENTS
 */
export default {
  GlassCardMobile,
  HeroGlassPanel,
  FeatureTile,
  MetricsCard
};
