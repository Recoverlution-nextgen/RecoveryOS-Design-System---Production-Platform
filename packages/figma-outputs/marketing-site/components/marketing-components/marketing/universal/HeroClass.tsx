/**
 * HERO CLASS - UNIVERSAL COMPONENT (Exhibition-Grade)
 * Used on all 6 marketing pages
 * 
 * Based on:
 * - /HERO-TYPOGRAPHY-SYSTEM-LOCKED.md
 * - /utils/heroStyles.tsx (HERO_STYLES)
 * - Latest Homepage Hero implementation
 * 
 * Features:
 * - Responsive heights (600px/700px mobile, aspect-ratio desktop)
 * - Motion.js animations
 * - HERO_STYLES typography
 * - Glass CTA buttons
 * - Full-bleed background assets
 * - Optional icons/overlays
 * 
 * Created: November 5, 2025
 */

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HERO_STYLES } from '../../../utils/heroStyles';

interface HeroClassProps {
  // Content
  eyebrow?: string;
  eyebrowIcon?: ReactNode; // Optional icon before eyebrow text
  headline: string | ReactNode;
  subheadline?: string | ReactNode;
  customContent?: ReactNode; // Optional custom content between subheadline and CTA (e.g., stats badges)
  
  // CTA Button
  ctaText: string;
  ctaOnClick: () => void;
  ctaIcon?: ReactNode; // Default: ArrowRight, can be null to hide
  
  // Asset
  backgroundAsset: string;
  backgroundAssetAlt: string;
  backgroundFilter?: string; // e.g., 'brightness(0.85) saturate(1.1)'
  
  // Background
  backgroundColor?: string; // Default: #0A192F
  overlayGradient?: string; // Optional overlay gradient
  
  // Text Colors (Heroes are typically white text on dark backgrounds)
  textColor?: string; // Default: white
  eyebrowColor?: string; // Default: #40E0D0 (cyan)
  
  // CTA Colors
  ctaBackgroundColor?: string; // Default: rgba(64, 224, 208, 0.08) - glass cyan
  ctaTextColor?: string; // Default: white
  
  // Layout
  contentAlignment?: 'left' | 'center'; // Default: center
  maxContentWidth?: string; // Default: 1440px
}

export function HeroClass({
  eyebrow,
  eyebrowIcon,
  headline,
  subheadline,
  customContent,
  ctaText,
  ctaOnClick,
  ctaIcon = <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5 duration-400" />,
  backgroundAsset,
  backgroundAssetAlt,
  backgroundFilter,
  backgroundColor = '#0A192F',
  overlayGradient,
  textColor = '#FFFFFF',
  eyebrowColor = '#40E0D0',
  ctaBackgroundColor = 'rgba(64, 224, 208, 0.08)',
  ctaTextColor = '#FFFFFF',
  contentAlignment = 'center',
  maxContentWidth = '1440px',
}: HeroClassProps) {
  return (
    <section 
      className="relative w-full h-[600px] md:h-[700px] lg:h-auto lg:aspect-[21/9] lg:min-h-[600px] lg:max-h-[900px] flex items-center justify-center overflow-hidden"
      style={{
        background: backgroundColor,
      }}
    >
      
      {/* BACKGROUND: Full Bleed Asset */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          overflow: 'hidden'
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
      >
        <img 
          src={backgroundAsset}
          alt={backgroundAssetAlt}
          loading="eager"
          fetchpriority="high"
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            opacity: 1,
            filter: backgroundFilter,
          }}
        />
      </motion.div>

      {/* Optional Overlay Gradient */}
      {overlayGradient && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: overlayGradient,
            zIndex: 2
          }}
        />
      )}

      {/* FOREGROUND: Content */}
      <div 
        className="relative z-10 w-full px-6 md:px-8 lg:px-12 xl:px-16 py-20 md:py-24 lg:py-32"
        style={{
          maxWidth: maxContentWidth,
          margin: '0 auto',
        }}
      >
        
        <div 
          className={contentAlignment === 'center' ? 'text-center' : 'text-left'}
        >
          
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div
              className={`flex ${contentAlignment === 'center' ? 'justify-center' : 'justify-start'} mb-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2">
                {eyebrowIcon && (
                  <div style={{ color: eyebrowColor }}>
                    {eyebrowIcon}
                  </div>
                )}
                <span 
                  className="uppercase"
                  style={{
                    ...HERO_STYLES.eyebrow,
                    color: textColor,
                  }}
                >
                  {eyebrow}
                </span>
              </div>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1 
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              ...HERO_STYLES.headline,
              color: textColor,
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.5)',
            }}
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          {subheadline && (
            <motion.p
              className={`mb-12 ${contentAlignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                ...HERO_STYLES.subheadline,
                color: textColor,
                opacity: 0.95,
                textShadow: '0 1px 12px rgba(0, 0, 0, 0.3), 0 0.5px 2px rgba(0, 0, 0, 0.4)',
              }}
            >
              {subheadline}
            </motion.p>
          )}

          {/* Custom Content (e.g., Platform stats badges) */}
          {customContent}

          {/* CTA Button */}
          <motion.div
            className={`flex ${contentAlignment === 'center' ? 'justify-center' : 'justify-start'} items-center`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <button
              onClick={ctaOnClick}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden border-square"
              style={{
                ...HERO_STYLES.button,
                background: ctaBackgroundColor,
              }}
            >
              {/* Button hover effect */}
              <div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-400 border-square"
              />
              
              {/* Button Content */}
              <span 
                className="flex items-center gap-2.5"
                style={{
                  ...HERO_STYLES.buttonText,
                  color: ctaTextColor,
                }}
              >
                {ctaText}
                {ctaIcon}
              </span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
