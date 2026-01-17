/**
 * CENTRALISED HEADLINE CLASS - UNIVERSAL COMPONENT
 * 
 * Pattern: Centered eyebrow + headline + subheadline for section headers
 * Used on: Homepage sections 3-8, Pricing, Demo, Science pages
 * 
 * Philosophy: Clean, centered section headers with Motion animations
 * 
 * Apple-Grade Typography System - Updated: November 6, 2025
 * TIER 2.5: SECTION HEADERS (H2 Prominent - 44px → 72px)
 * 
 * Created: November 5, 2025 - Phase 4: Headline Class Consolidation
 */

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CentralisedHeadlineClassProps {
  // Eyebrow
  eyebrow: string;
  eyebrowIcon?: ReactNode; // Optional icon before eyebrow text
  eyebrowColor?: string; // Default: inherits from sectionColor or #5739FB
  eyebrowBackground?: string; // Default: rgba(255, 255, 255, 0.05)
  eyebrowBorder?: string; // Default: border-white/30
  
  // Headline
  headline: string | ReactNode;
  headlineColor?: string; // Default: #111827
  
  // Subheadline (optional)
  subheadline?: string | ReactNode;
  subheadlineColor?: string; // Default: #6B7280
  
  // Layout
  textAlign?: 'center' | 'left' | 'right'; // Default: center
  containerMaxWidth?: string; // Default: 4xl (56rem)
  marginBottom?: string; // Default: mb-12 md:mb-16
  
  // Animation delays
  animationDelay?: number; // Base delay for first element (default: 0)
  
  // Advanced styling
  headlineFontSize?: string; // Default: clamp(2.75rem, 5.5vw, 4.5rem) - TIER 2.5
  subheadlineFontSize?: string; // Default: clamp(1rem, 1.8vw, 1.125rem) - STANDARD BODY
}

export function CentralisedHeadlineClass({
  eyebrow,
  eyebrowIcon,
  eyebrowColor = '#5739FB',
  eyebrowBackground = 'rgba(255, 255, 255, 0.05)',
  eyebrowBorder = 'rgba(255, 255, 255, 0.3)',
  headline,
  headlineColor = '#111827',
  subheadline,
  subheadlineColor = '#6B7280',
  textAlign = 'center',
  containerMaxWidth = '56rem', // 4xl
  marginBottom = 'mb-12 md:mb-16',
  animationDelay = 0,
  headlineFontSize = 'clamp(2.75rem, 5.5vw, 4.5rem)', // TIER 2.5: 44px → 72px
  subheadlineFontSize = 'clamp(1rem, 1.8vw, 1.125rem)', // STANDARD: 16px → 18px
}: CentralisedHeadlineClassProps) {
  
  const alignmentClass = textAlign === 'center' ? 'text-center' : textAlign === 'left' ? 'text-left' : 'text-right';
  const justifyClass = textAlign === 'center' ? 'justify-center' : textAlign === 'left' ? 'justify-start' : 'justify-end';
  
  return (
    <div 
      className={`${marginBottom} ${alignmentClass} mx-auto`}
      style={{ maxWidth: containerMaxWidth }}
    >
      
      {/* Eyebrow Badge */}
      <motion.div
        className={`flex ${justifyClass} mb-6 md:mb-8`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: animationDelay }}
      >
        <div 
          className="inline-flex items-center gap-2 md:gap-2.5 px-4 py-2 md:px-5 md:py-2.5 backdrop-blur-sm border"
          style={{
            background: eyebrowBackground,
            borderColor: eyebrowBorder,
            borderRadius: '0px'
          }}
        >
          {eyebrowIcon && (
            <span style={{ color: eyebrowColor, display: 'flex', alignItems: 'center' }}>
              {eyebrowIcon}
            </span>
          )}
          <span 
            className="uppercase tracking-wider"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              fontSize: 'clamp(0.6875rem, 1.2vw, 0.75rem)', // 11px → 12px - TIGHTENED
              letterSpacing: '0.15em',
              color: eyebrowColor
            }}
          >
            {eyebrow}
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h2 
        className="mb-4 md:mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: animationDelay + 0.1 }}
        style={{ 
          fontFamily: 'var(--font-display)', 
          fontWeight: 800, 
          fontSize: headlineFontSize,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: headlineColor
        }}
      >
        {headline}
      </motion.h2>

      {/* Subheadline (optional) */}
      {subheadline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: animationDelay + 0.2 }}
          style={{ 
            fontSize: subheadlineFontSize,
            lineHeight: 1.6, 
            color: subheadlineColor,
            fontWeight: 500,
            maxWidth: '42rem',
            margin: textAlign === 'center' ? '0 auto' : '0'
          }}
        >
          {subheadline}
        </motion.p>
      )}
    </div>
  );
}
