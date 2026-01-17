/**
 * TILE CLASS - UNIVERSAL COMPOUND GLASS TILE STANDARD
 * Created: November 5, 2025
 * 
 * THE SOLUTION TO SCATTERED TILE IMPLEMENTATIONS
 * 
 * Before: Every page had inline tile implementations with duplicated:
 * - Shimmer animations
 * - Hover glow effects  
 * - Watermark icons
 * - Backdrop blur containers
 * - Box shadows
 * - Hover animations
 * 
 * After: ONE component, ONE source of truth, ONE place to tweak.
 * 
 * FEATURES:
 * - 12s infinite shimmer animation
 * - Radial gradient hover glow
 * - Watermark icon (opacity 0.05)
 * - Horizontal icon + headline layout
 * - Full white copy with sophisticated text shadows
 * - Backdrop blur (4px) on copy container
 * - Apple-grade hover animations
 * - Exhibition-grade box shadows
 * 
 * USAGE:
 * ```tsx
 * <TileClass
 *   icon={Brain}
 *   iconColor="#5739FB"
 *   title="Recovery is Architecture"
 *   description="Systematic neural rewiring through repetition, context, and lived experience"
 *   backgroundAsset={insightArchitecture}
 *   gradientOverlay="linear-gradient(135deg, rgba(87, 57, 251, 0.06) 0%, rgba(87, 57, 251, 0.04) 100%)"
 * />
 * ```
 * 
 * CUSTOMIZATION POINTS:
 * - All hover effects: Update whileHover
 * - All shadows: Update boxShadow in style
 * - Shimmer speed: Update animation duration
 * - Blur amount: Update backdropFilter
 * - Icon size/position: Update watermark styles
 */

import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface TileClassProps {
  /** Lucide icon component */
  icon?: LucideIcon;
  
  /** Icon color (used for small icon, watermark, and glass tint) */
  iconColor: string;
  
  /** Tile headline */
  title: string;
  
  /** Tile description/body text */
  description: string;
  
  /** Full-bleed background asset */
  backgroundAsset: string;
  
  /** Optional gradient overlay for depth */
  gradientOverlay?: string;
  
  /** Optional array of buzz tags to display */
  buzzTags?: string[];
  
  /** Optional badge text (e.g., "10 min") */
  badgeText?: string;
  
  /** Optional badge icon */
  badgeIcon?: LucideIcon;
  
  /** Animation delay (for staggered grid animations) */
  animationDelay?: number;
  
  /** Minimum height (default: 420px - Apple-grade standard) */
  minHeight?: string;
  
  /** Optional click handler */
  onClick?: () => void;
  
  /** Optional custom className */
  className?: string;
  
  // 🎨 ENHANCED VARIANT PROPS (Nov 5, 2025)
  
  /** Optional letter badge for ERA Framework (e.g., "E", "R", "A") */
  letterBadge?: string;
  
  /** Optional upper badge text for Architecture tiles (e.g., "NEUROADAPTIVE ENGINE") */
  upperBadge?: string;
  
  /** Optional eyebrow badge (Homepage style - icon + text in transparent box, e.g., "THE COGNITION ENGINE") */
  eyebrowBadge?: string;
  
  /** Optional tagline between title and description (e.g., "The Sentient Baseline") */
  tagline?: string;
  
  /** Optional neural tag for ERA tiles (e.g., "SENSORY INTEGRATION") */
  neuralTag?: string;
  
  /** Optional examples text for ERA tiles (e.g., "Breathwork · Body scan · Grounding") */
  examples?: string;
  
  /** Optional science stat for Pricing Economics (e.g., { value: "67%", label: "retention lift" }) */
  scienceStat?: {
    value: string;
    label: string;
  };
  
  /** Optional watermark number for Pricing Economics (e.g., "01", "02", "03") */
  watermarkNumber?: string;
  
  /** Optional clean variant (removes all shadows, colored backgrounds - pure white on glass) */
  cleanVariant?: boolean;
}

/**
 * 🎨 TILE CLASS - UNIVERSAL COMPOUND GLASS STANDARD
 * 
 * The single source of truth for all tile implementations across marketing pages.
 * Update here, changes propagate everywhere.
 */
export function TileClass({
  icon: Icon,
  iconColor,
  title,
  description,
  backgroundAsset,
  gradientOverlay = 'linear-gradient(135deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.04) 100%)',
  buzzTags,
  badgeText,
  badgeIcon: BadgeIcon,
  animationDelay = 0,
  minHeight = '420px',
  onClick,
  className = '',
  // Enhanced variants
  letterBadge,
  upperBadge,
  eyebrowBadge,
  tagline,
  neuralTag,
  examples,
  scienceStat,
  watermarkNumber,
  cleanVariant = false
}: TileClassProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: animationDelay }}
      className={`relative overflow-hidden group ${className}`}
      onClick={onClick}
      style={{
        borderRadius: '0px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(87, 57, 251, 0.12)',
        transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
        cursor: onClick ? 'pointer' : 'default'
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
          src={backgroundAsset}
          alt=""
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
        />
        {/* Gradient overlay for legibility */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: gradientOverlay,
            zIndex: 2
          }}
        />
      </div>

      {/* Hover Glow - Subtle Apple Pro style */}
      <div 
        className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${iconColor}12 0%, transparent 50%)`,
          filter: 'blur(20px)',
          zIndex: 0
        }}
      />

      {/* Watermark Icon or Letter/Number */}
      {watermarkNumber ? (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: letterBadge ? '8rem' : '6rem',
            lineHeight: 1,
            color: `${iconColor}06`,
            position: 'absolute',
            bottom: letterBadge ? '1rem' : '1.5rem',
            right: letterBadge ? '1.5rem' : '1.5rem',
            pointerEvents: 'none',
            transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
            zIndex: 3
          }}
        >
          {letterBadge || watermarkNumber}
        </div>
      ) : Icon ? (
        <Icon 
          size={80}
          style={{ 
            color: iconColor,
            opacity: 0.05,
            strokeWidth: 1.5,
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            pointerEvents: 'none',
            transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
            zIndex: 3
          }}
          className="group-hover:opacity-[0.065]"
        />
      ) : null}

      <div 
        className="relative p-6 lg:p-6 flex flex-col justify-end tile-content-wrapper" 
        style={{ 
          zIndex: 10
        }}
      >
        
        {/* Science Stat Badge - Top Right (Pricing Economics variant) */}
        {scienceStat && (
          <div 
            className="absolute top-6 right-6 lg:top-8 lg:right-8 p-3 text-center"
            style={{
              background: 'transparent',
              borderRadius: '0px',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              minWidth: '120px',
              zIndex: 20
            }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                }}
              >
                {scienceStat.value}
              </span>
            </div>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            >
              {scienceStat.label}
            </span>
          </div>
        )}
        
        {/* Glass Copy Container - Full White Copy */}
        <div 
          className="p-6 flex flex-col"
          style={{
            background: 'transparent',
            borderRadius: '0px',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
        >
          {/* VARIANT: Letter Badge (ERA Framework) */}
          {letterBadge && (
            <div 
              className="inline-flex items-center justify-center mb-6 self-start"
              style={{
                width: '4rem',
                height: '4rem',
                background: `linear-gradient(135deg, ${iconColor}15, ${iconColor}08)`,
                border: `1px solid ${iconColor}25`,
                borderRadius: '0px',
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.3)`
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '2rem',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                {letterBadge}
              </span>
            </div>
          )}

          {/* VARIANT: Eyebrow Badge (Homepage style - transparent box with icon + text) */}
          {eyebrowBadge && Icon && (
            <div 
              className="inline-flex items-center gap-2 px-3 py-2 mb-4 self-start backdrop-blur-sm border border-white/30"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0px'
              }}
            >
              <Icon size={14} style={{ color: '#FFFFFF' }} />
              <span 
                className="uppercase tracking-wider"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  fontSize: '0.6875rem', // 11px
                  letterSpacing: '0.12em',
                  color: '#FFFFFF'
                }}
              >
                {eyebrowBadge}
              </span>
            </div>
          )}

          {/* VARIANT: Icon + Upper Badge Row (Architecture variant) */}
          {upperBadge && Icon && !eyebrowBadge && (
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${iconColor}25, ${iconColor}15)`,
                  border: `1px solid ${iconColor}35`,
                  borderRadius: '0px',
                  boxShadow: `
                    0 6px 20px ${iconColor}25,
                    inset 0 1px 0 rgba(255, 255, 255, 0.3)
                  `
                }}
              >
                <Icon 
                  size={20} 
                  style={{ 
                    color: iconColor,
                    filter: `drop-shadow(0 0 8px ${iconColor}80)`
                  }} 
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: '#FFFFFF',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                {upperBadge.toUpperCase()}
              </span>
            </div>
          )}

          {/* STANDARD: Icon + Headline Row (default variant) */}
          {!letterBadge && !upperBadge && !eyebrowBadge && Icon && (
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={cleanVariant ? {
                  background: 'transparent',
                  borderRadius: '0px'
                } : {
                  background: `linear-gradient(135deg, ${iconColor}15, ${iconColor}08)`,
                  border: `1px solid ${iconColor}25`,
                  borderRadius: '0px',
                  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                }}
              >
                <Icon size={20} style={{ color: cleanVariant ? '#FFFFFF' : iconColor, strokeWidth: 2.5 }} />
              </div>
              
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  color: '#FFFFFF',
                  textShadow: cleanVariant ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                {title}
              </h3>
            </div>
          )}

          {/* VARIANT: Standalone Title (for letterBadge/upperBadge/eyebrowBadge variants) */}
          {(letterBadge || upperBadge || eyebrowBadge) && (
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.875rem, 2.25vw, 2.25rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: '#FFFFFF',
                marginBottom: '0.75rem',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
            >
              {title}
            </h3>
          )}

          {/* VARIANT: Tagline (Architecture variant) */}
          {tagline && (
            <p
              style={{
                fontSize: '0.875rem',
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontWeight: 600,
                marginBottom: '1rem',
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {tagline}
            </p>
          )}

          {/* VARIANT: Neural Tag (ERA Framework) */}
          {neuralTag && Icon && (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 self-start"
              style={{
                background: `linear-gradient(135deg, ${iconColor}12, ${iconColor}08)`,
                borderRadius: '0px',
                border: `1px solid ${iconColor}20`,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
            >
              <Icon size={14} style={{ color: '#FFFFFF' }} />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.1em',
                  color: '#FFFFFF',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                {neuralTag.toUpperCase()}
              </span>
            </div>
          )}

          {/* Badge (optional - original variant) */}
          {(badgeText || BadgeIcon) && !letterBadge && !upperBadge && (
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 border self-start mb-3"
              style={{
                background: `linear-gradient(135deg, ${iconColor}15, ${iconColor}10)`,
                borderColor: 'rgba(255, 255, 255, 0.30)',
                borderRadius: '0px',
                backdropFilter: 'blur(16px) saturate(150%)',
                WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                boxShadow: `0 2px 8px ${iconColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
              }}
            >
              {BadgeIcon && <BadgeIcon size={11} style={{ color: '#FFFFFF' }} />}
              {badgeText && (
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {badgeText}
                </span>
              )}
            </div>
          )}

          {/* Description - White Text */}
          <p
            style={{
              fontSize: '0.9375rem',
              lineHeight: 1.65,
              color: '#FFFFFF',
              fontWeight: 500,
              textShadow: cleanVariant ? 'none' : '0 1px 4px rgba(0, 0, 0, 0.2)',
              marginBottom: (buzzTags && buzzTags.length > 0) || examples ? '1.25rem' : '0'
            }}
          >
            {description}
          </p>

          {/* VARIANT: Examples (ERA Framework) */}
          {examples && (
            <p
              style={{
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                color: '#FFFFFF',
                fontWeight: 500,
                fontStyle: 'italic',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                marginBottom: buzzTags && buzzTags.length > 0 ? '1.25rem' : '0',
                opacity: 0.9
              }}
            >
              {examples}
            </p>
          )}

          {/* Buzz Tags (optional) - Stacked Vertically */}
          {buzzTags && buzzTags.length > 0 && (
            <div className="flex flex-col gap-2 mt-4" style={{ width: '100%' }}>
              {buzzTags.map((tag, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center px-3 py-1.5 border self-start"
                  style={{
                    background: `linear-gradient(135deg, ${iconColor}12, ${iconColor}08)`,
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '0px',
                    backdropFilter: 'blur(16px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                    boxShadow: `0 2px 8px ${iconColor}15, inset 0 1px 0 rgba(255, 255, 255, 0.25)`
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      whiteSpace: 'normal',
                      lineHeight: 1.3,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Shimmer animation keyframes + Responsive minHeight */}
      <style>{`
        @keyframes shimmer-glass {
          0%, 100% {
            background-position: -200% 0;
          }
          50% {
            background-position: 200% 0;
          }
        }
        
        /* Responsive minHeight for tile content */
        @media (min-width: 1024px) {
          .tile-content-wrapper {
            min-height: ${minHeight} !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

/**
 * 🎨 TILE GRID WRAPPER (Optional convenience component)
 * 
 * Standard grid wrapper for tile layouts
 */
interface TileGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: string;
  maxWidth?: string;
  className?: string;
}

export function TileGrid({ 
  children, 
  columns = 3,
  gap = '8',
  maxWidth = '6xl',
  className = ''
}: TileGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-${gap} max-w-${maxWidth} mx-auto ${className}`}>
      {children}
    </div>
  );
}
