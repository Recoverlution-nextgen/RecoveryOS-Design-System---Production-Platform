/**
 * FLIP TILE CLASS WITH FEATURES - INTERACTIVE REVEAL TILE (ENHANCED)
 * Created: November 28, 2025
 * Updated: December 4, 2025 - Added support for feature blocks with icons
 * 
 * Extended version of FlipTileClass with elegant feature lists on back:
 * - Front: Icon + Title + Tagline + Full narrative description + "Tap to explore"
 * - Back: Title + Feature blocks (with icons) OR simple feature list
 * - Smooth flip animation (400ms)
 * - Mobile-optimized tap targets
 * - Accessible keyboard support
 * 
 * USAGE:
 * ```tsx
 * // With feature blocks (icons + labels)
 * <FlipTileClassWithFeatures
 *   features={[
 *     { icon: Compass, label: 'Journey', color: '#5739FB' },
 *     { icon: Zap, label: 'Navicues', color: '#40E0D0' }
 *   ]}
 * />
 * 
 * // OR with simple strings (legacy)
 * <FlipTileClassWithFeatures
 *   features={['Feature one', 'Feature two']}
 * />
 * ```
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon, X, CheckCircle2 } from 'lucide-react';

/** Feature can be either a string OR an object with icon/label/color */
export type Feature = string | {
  icon: LucideIcon;
  label: string;
  color: string;
  description?: string; // Optional short description
  ticks?: string[]; // Optional tick list (3 items max recommended)
};

interface FlipTileClassWithFeaturesProps {
  /** Lucide icon component */
  icon: LucideIcon;
  
  /** Icon color (used for watermark and accents) */
  iconColor: string;
  
  /** Tile headline */
  title: string;
  
  /** Short tagline (3-5 words) shown on front */
  tagline: string;
  
  /** Punchy description shown on front (1-2 sentences max) */
  description: string;
  
  /** Optional intro paragraph shown on back before features */
  backIntro?: string;
  
  /** Feature list shown on back - can be strings OR objects with icons */
  features: Feature[];
  
  /** Full-bleed background asset */
  backgroundAsset: string;
  
  /** Gradient overlay for depth */
  gradientOverlay?: string;
  
  /** Animation delay (for staggered grid animations) */
  animationDelay?: number;
  
  /** Minimum height (default: 520px for more narrative space) */
  minHeight?: string;
}

export function FlipTileClassWithFeatures({
  icon: Icon,
  iconColor,
  title,
  tagline,
  description,
  backIntro,
  features,
  backgroundAsset,
  gradientOverlay = 'linear-gradient(135deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.04) 100%)',
  animationDelay = 0,
  minHeight = '520px'
}: FlipTileClassWithFeaturesProps) {
  
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: animationDelay }}
      className="relative overflow-hidden group"
      style={{
        borderRadius: '0px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(87, 57, 251, 0.12)',
        transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
        minHeight: minHeight,
        cursor: 'pointer'
      }}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? `Close ${title}` : `Explore ${title}`}
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
        {/* Subtle dark gradient at bottom for text legibility only */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 40%, transparent 70%)',
            zIndex: 2
          }}
        />
      </div>



      {/* Content Container */}
      <div 
        className="relative p-6 lg:p-6 flex flex-col justify-end" 
        style={{ 
          zIndex: 10,
          minHeight: minHeight
        }}
      >
        
        {/* Copy Container - Transparent, no background */}
        <div 
          className="p-6 flex flex-col"
          style={{
            background: 'transparent'
          }}
        >
          
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              // FRONT FACE - Full narrative visible
              <motion.div
                key="front"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Eyebrow with icon */}
                <div className="mb-4 flex items-center gap-2">
                  <Icon 
                    size={14} 
                    style={{ 
                      color: '#FFFFFF', 
                      strokeWidth: 2.5
                    }} 
                  />
                  <span
                    className="uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      letterSpacing: '0.12em',
                      color: '#FFFFFF'
                    }}
                  >
                    {title}
                  </span>
                </div>

                {/* Tagline promoted to hero headline */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.375rem, 2vw, 1.75rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: '#FFFFFF',
                    marginBottom: '1rem'
                  }}
                >
                  {tagline}
                </h3>

                {/* Full Description */}
                <p
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontWeight: 500,
                    marginBottom: '1.5rem'
                  }}
                >
                  {description}
                </p>

                {/* Tap to Explore Hint */}
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 border self-start"
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
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    TAP TO EXPLORE
                  </span>
                </div>
              </motion.div>
            ) : (
              // BACK FACE - Elegant feature list
              <motion.div
                key="back"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Close Button */}
                <div className="flex justify-between items-start mb-4">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      color: '#FFFFFF'
                    }}
                  >
                    {title}
                  </h3>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlip();
                    }}
                    className="flex-shrink-0 p-2 hover:bg-white/10 transition-colors rounded-sm"
                    style={{
                      color: '#FFFFFF',
                      borderRadius: '0px'
                    }}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Optional Back Intro */}
                {backIntro && (
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 500,
                      marginBottom: '1.25rem'
                    }}
                  >
                    {backIntro}
                  </p>
                )}

                {/* Feature List */}
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    if (typeof feature === 'string') {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-start gap-2.5"
                        >
                          <CheckCircle2 
                            size={16} 
                            style={{ 
                              color: '#FFFFFF',
                              flexShrink: 0,
                              marginTop: '0.125rem',
                              strokeWidth: 2.5
                            }} 
                          />
                          <span
                            style={{
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                              color: 'rgba(255, 255, 255, 0.95)',
                              fontWeight: 500
                            }}
                          >
                            {feature}
                          </span>
                        </motion.div>
                      );
                    } else {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="mb-4"
                        >
                          {/* Feature Icon + Label */}
                          <div className="flex items-start gap-2.5 mb-2">
                            <feature.icon 
                              size={18} 
                              style={{ 
                                color: feature.color,
                                flexShrink: 0,
                                marginTop: '0.125rem',
                                strokeWidth: 2.5
                              }} 
                            />
                            <span
                              style={{
                                fontSize: '0.9375rem',
                                lineHeight: 1.5,
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontWeight: 600,
                                letterSpacing: '-0.01em'
                              }}
                            >
                              {feature.label}
                            </span>
                          </div>
                          
                          {/* Ticks underneath */}
                          {feature.ticks && feature.ticks.length > 0 && (
                            <div className="ml-7 space-y-1.5">
                              {feature.ticks.map((tick, tickIndex) => (
                                <div key={tickIndex} className="flex items-start gap-2">
                                  <CheckCircle2 
                                    size={12} 
                                    style={{ 
                                      color: 'rgba(255, 255, 255, 0.6)',
                                      flexShrink: 0,
                                      marginTop: '0.25rem',
                                      strokeWidth: 2.5
                                    }} 
                                  />
                                  <span
                                    style={{
                                      fontSize: '0.75rem',
                                      lineHeight: 1.5,
                                      color: 'rgba(255, 255, 255, 0.85)',
                                      fontWeight: 400
                                    }}
                                  >
                                    {tick}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      );
                    }
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
}