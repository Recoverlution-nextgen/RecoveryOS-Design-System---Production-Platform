/**
 * PLATFORM FEATURES SECTION - ECONOMICS STYLE GLASS TREATMENT
 * 
 * NEW PATTERN: Economics "Alumni become infrastructure" structure
 * - Container background: feature.color
 * - Pattern image at z-index: 1 (background layer)
 * - Subtle tint overlay
 * - Glass content box at z-index: 10 (foreground layer)
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { PlatformMockupImage } from './PlatformMockupImage';
import { Compass, Brain, BarChart3, Users } from 'lucide-react';
import { useResponsiveAsset } from '../utils/responsiveAssets';

// SECTION 1 GLASS BACKGROUNDS - Purple Family (Fallback for features without patterns)
import glassBackgroundJourney from 'figma:asset/389f136d4823b60d185964a6a9afe22ff4413381.png';
import glassBackgroundNavicues from 'figma:asset/606860184da254b28d62b62283d89505479f6725.png';
import glassBackgroundLuma from 'figma:asset/00b029068419e00e8561d59887849d048db29ebd.png';

// SECTION 2 GLASS BACKGROUNDS - Cyan/Teal Family
import glassBackgroundNavigate from 'figma:asset/4efe271f7f9891746ddf240e9cf2709f1267d523.png';
import glassBackgroundWellbeing from 'figma:asset/f93c698d879ef0791043d0d067b13aa5e95ea49b.png';
import glassBackgroundToolkit from 'figma:asset/9f3d025726a65b0e1ba187e90d7447c2445bebb5.png';

// SECTION 3 GLASS BACKGROUNDS - Violet Family
import glassBackgroundState from 'figma:asset/2410d69f4aa815ea21cc4f0802949cc6ba34e15a.png';
import glassBackgroundMomentum from 'figma:asset/80c0eb4413c219cbfa35e8e2a9519b147d09b17e.png';

// SECTION 4 GLASS BACKGROUNDS - Sky Blue Family
import glassBackgroundTherapist from 'figma:asset/8f32e81734ab0cdfae3f247830e7e25aa2709deb.png';
import glassBackgroundConnectedCare from 'figma:asset/3ba31cdfa1a3c5ddfb4956a5d888c38803e67d14.png';

interface Feature {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  powerStatement: string;
  teaserDescription?: string;
  description: string;
  longDescription: string;
  impact: string;
  mechanism: string;
  color: string;
  image: string;
  isMockup?: boolean;
  altText?: string;
  patternLeft?: string; // NEW: Pattern background for left card
  patternRight?: string; // NEW: Pattern background for right asset
  patternRightMobile?: string; // 📱 NEW: Mobile-optimized pattern for right asset
  buzzTags?: string[]; // NEW: 3 tags for visual balance
}

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}

const FeatureCard = ({ feature, isSelected, onClick, delay = 0 }: FeatureCardProps) => {
  const Icon = feature.icon;
  
  // Fallback glass backgrounds if no pattern provided
  const getFallbackBackground = () => {
    switch(feature.id) {
      case 'journey': return glassBackgroundJourney;
      case 'navicues': return glassBackgroundNavicues;
      case 'luma': return glassBackgroundLuma;
      case 'navigate': return glassBackgroundNavigate;
      case 'wellbeing': return glassBackgroundWellbeing;
      case 'toolkit': return glassBackgroundToolkit;
      case 'state': return glassBackgroundState;
      case 'momentum': return glassBackgroundMomentum;
      case 'therapist': return glassBackgroundTherapist;
      case 'connected-care': return glassBackgroundConnectedCare;
      default: return glassBackgroundJourney;
    }
  };
  
  const hasPattern = !!feature.patternLeft;
  
  return (
    <div className="relative group">
      {/* Hover Glow Halo - ELEGANT: Subtle ambient glow */}
      <div 
        className="absolute -inset-1.5 opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${feature.color}10 0%, transparent 70%)`,
          filter: 'blur(16px)',
          zIndex: 0
        }}
      />
      
      <motion.button
        onClick={onClick}
        className="relative text-left w-full overflow-hidden group/button"
        style={{
          background: hasPattern ? feature.color : '#FFFFFF',
          borderRadius: '0px', // SQUARE - infiniteK DNA
          border: `1px solid ${isSelected ? feature.color + '60' : 'rgba(0, 0, 0, 0.05)'}`,
          borderLeft: `3px solid ${isSelected ? feature.color : 'rgba(0, 0, 0, 0.06)'}`, // ELEGANT: Subtle accent
          boxShadow: isSelected 
            ? `
                0 20px 60px ${feature.color}20,
                0 8px 28px ${feature.color}14,
                0 3px 12px ${feature.color}10,
                inset 0 1px 0 rgba(255, 255, 255, 1),
                inset 1px 0 0 rgba(255, 255, 255, 0.8),
                inset -1px 0 0 rgba(255, 255, 255, 0.3)
              `
            : `
                0 1px 2px rgba(0, 0, 0, 0.03),
                0 1px 1px rgba(0, 0, 0, 0.02),
                inset 0 1px 0 rgba(255, 255, 255, 0.95),
                inset 1px 0 0 rgba(255, 255, 255, 0.5)
              `,
          padding: '1.125rem 1.25rem', // ELEGANT: Slightly more generous vertical
          height: '104px', // ELEGANT: Slightly taller for tagline
          transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
          transform: isSelected ? 'scale(1.012) translateX(2px)' : 'scale(1) translateX(0)', // ELEGANT: Ultra-subtle movement
          zIndex: 1,
          cursor: 'pointer'
        }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{
          boxShadow: isSelected 
            ? `
                0 24px 72px ${feature.color}24,
                0 12px 36px ${feature.color}16,
                0 4px 16px ${feature.color}12,
                inset 0 1px 0 rgba(255, 255, 255, 1),
                inset 1px 0 0 rgba(255, 255, 255, 0.8),
                inset -1px 0 0 rgba(255, 255, 255, 0.3)
              `
            : `
                0 8px 32px ${feature.color}14,
                0 4px 16px ${feature.color}08,
                0 2px 8px rgba(0, 0, 0, 0.04),
                inset 0 1px 0 rgba(255, 255, 255, 0.95),
                inset 1px 0 0 rgba(255, 255, 255, 0.5)
              `,
          borderLeft: `3px solid ${feature.color}`,
          border: `1px solid ${feature.color}${isSelected ? '70' : '45'}`,
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
        }}
        whileTap={{
          scale: isSelected ? 1.008 : 0.998,
          transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        {/* PATTERN LAYER - z-index: 1 */}
        {hasPattern && (
          <div className="absolute inset-0 transition-opacity duration-500" style={{ zIndex: 1 }}>
            <img 
              src={feature.patternLeft}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Subtle overlay tint */}
            <div 
              className="absolute inset-0" 
              style={{ 
                background: `linear-gradient(135deg, ${feature.color}05 0%, ${feature.color}03 100%)`
              }}
            />
          </div>
        )}
        
        {/* Fallback pattern for non-pattern features */}
        {!hasPattern && (
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-500"
            style={{
              backgroundImage: `url(${getFallbackBackground()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isSelected ? 0.12 : 0.06,
              mixBlendMode: 'multiply',
              zIndex: 1
            }}
          />
        )}
        
        {/* GLASS CONTENT - z-index: 10 */}
        <div 
          className="relative h-full flex items-center"
          style={{
            zIndex: 10
          }}
        >
          <div 
            className="relative w-full px-5 py-4" // ELEGANT: Balanced padding
            style={{
              background: 'transparent',
              borderRadius: '0px',
              backdropFilter: 'blur(4px)', // ELEGANT: Refined blur
              WebkitBackdropFilter: 'blur(4px)',
              boxShadow: isSelected 
                ? 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.10), inset 1px 0 0 rgba(255, 255, 255, 0.08)'
                : 'inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.04)',
              transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
              overflow: 'hidden'
            }}
          >
            {/* Colored underglow for selected - "backlit" effect */}
            {isSelected && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${feature.color}32 0%, ${feature.color}18 40%, ${feature.color}08 70%, transparent 100%)`,
                  transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                  zIndex: 0
                }}
              />
            )}
            
            {/* Dark gradient overlay - ELEGANT: Strong contrast for unselected, subtle for selected */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isSelected
                  ? 'radial-gradient(ellipse at top left, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.10) 50%, rgba(0, 0, 0, 0.05) 80%, transparent 100%)'
                  : 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.62) 50%, rgba(0, 0, 0, 0.52) 80%, rgba(0, 0, 0, 0.40) 100%)',
                transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                zIndex: 1
              }}
            />
            
            {/* ELEGANT LAYOUT - Icon + Name + Tagline with refined hierarchy */}
            <div className="relative flex flex-col gap-1.5" style={{ zIndex: 2 }}>
              {/* Top Row: Icon + Name */}
              <div className="flex items-center gap-2.5">
                <Icon 
                  size={18}
                  style={{ 
                    color: '#FFFFFF',
                    opacity: isSelected ? 1 : 0.6,
                    transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                    flexShrink: 0,
                    strokeWidth: 2.5
                  }} 
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.6875rem', // 11px
                    letterSpacing: '0.12em',
                    color: '#FFFFFF',
                    opacity: isSelected ? 1 : 0.65,
                    textShadow: isSelected 
                      ? '0 1px 2px rgba(0, 0, 0, 0.35), 0 0 1px rgba(0, 0, 0, 0.25)'
                      : '0 1px 3px rgba(0, 0, 0, 0.55)',
                    textTransform: 'uppercase',
                    transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {feature.name}
                </span>
              </div>
              
              {/* Bottom Row: Tagline (subtle, refined) */}
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.625rem', // 10px - smaller, more subtle
                  letterSpacing: '0.02em',
                  color: '#FFFFFF',
                  opacity: isSelected ? 0.85 : 0.45,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                  paddingLeft: '26px', // Align with name (after icon)
                  lineHeight: 1.3
                }}
              >
                {feature.tagline}
              </span>
            </div>
          </div>
        </div>

        {/* Premium bottom accent - selected state only (ELEGANT: Refined gradient flow) */}
        {isSelected && (
          <>
            {/* Gradient fade accent */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '2px',
                background: `linear-gradient(90deg, 
                  ${feature.color}90 0%, 
                  ${feature.color}70 20%,
                  ${feature.color}50 40%,
                  ${feature.color}30 60%,
                  ${feature.color}15 80%,
                  transparent 100%
                )`,
                zIndex: 20
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            />
            {/* Bright leading edge */}
            <motion.div 
              className="absolute bottom-0 left-0"
              style={{
                height: '2px',
                width: '72px', // ELEGANT: Slightly longer
                background: `linear-gradient(90deg, ${feature.color} 0%, ${feature.color}E0 60%, ${feature.color}80 100%)`,
                boxShadow: `
                  0 0 12px ${feature.color}80,
                  0 0 6px ${feature.color}60,
                  0 1px 3px ${feature.color}40
                `,
                zIndex: 21
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            />
          </>
        )}
      </motion.button>
    </div>
  );
};

interface FeatureSectionProps {
  title: string;
  description: string;
  features: Feature[];
  selectedFeature: Feature;
  onSelectFeature: (feature: Feature) => void;
  layout: 'left' | 'right';
  sectionColor: string;
}

export const FeatureSection = ({
  title,
  description,
  features,
  selectedFeature,
  onSelectFeature,
  layout,
  sectionColor
}: FeatureSectionProps) => {
  
  // 📱 RESPONSIVE ASSET SELECTION - Auto-switches based on screen width
  const currentPatternRight = useResponsiveAsset(
    selectedFeature.patternRight || selectedFeature.image,
    selectedFeature.patternRightMobile
  );
  
  const cardsColumn = (
    <div className="lg:col-span-3 space-y-3">
      {features.map((feature, idx) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          isSelected={selectedFeature.id === feature.id}
          onClick={() => onSelectFeature(feature)}
          delay={idx * 0.1}
        />
      ))}
    </div>
  );

  const assetColumn = (
    <motion.div 
      className="lg:col-span-9 relative"
      initial={{ opacity: 0, x: layout === 'left' ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.3 }}
    >
      {/* FULL SECTION BACKGROUND - Journey Asset (Pure) */}
      <div 
        className="absolute inset-0 overflow-hidden min-h-[400px] md:min-h-[600px] lg:min-h-[700px]"
        style={{
          background: selectedFeature.color,
          borderRadius: '0px',
          boxShadow: '0 32px 100px rgba(0, 0, 0, 0.1), 0 12px 40px rgba(87, 57, 251, 0.15)'
        }}
      >
        {/* PATTERN BACKGROUND LAYER - RESPONSIVE */}
        <div className="absolute inset-0">
          {selectedFeature.isMockup ? (
            <PlatformMockupImage 
              src={currentPatternRight}
              alt={selectedFeature.altText || `${selectedFeature.name} platform feature mockup - ${selectedFeature.tagline}`}
              color={selectedFeature.color}
              featureId={selectedFeature.id}
            />
          ) : (
            <motion.img 
              key={selectedFeature.id}
              src={currentPatternRight}
              alt={selectedFeature.altText || `${selectedFeature.name} feature screenshot`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {/* Subtle overlay tint */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(135deg, ${selectedFeature.color}06 0%, ${selectedFeature.color}04 100%)`
            }}
          />
        </div>
      </div>

      {/* FLOATING GLASS CONTENT - Matching Left Tiles */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-8 p-6 md:p-8 lg:p-12"  style={{ minHeight: 'auto' }}>
        
        {/* TOP: GLASS COPY BLOCK - Matching Left Tile Treatment */}
        <motion.div 
          key={`copy-${selectedFeature.id}`}
          className="px-5 py-5 max-w-prose"
          style={{
            background: 'transparent',
            borderRadius: '0px',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        {/* Eyebrow Badge - Homepage Style (Transparent Box) */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-2 mb-5 backdrop-blur-sm border border-white/30"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0px'
          }}
        >
          <selectedFeature.icon size={14} style={{ color: '#FFFFFF' }} />
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
            {selectedFeature.name}
          </span>
        </div>

        {/* Power Statement */}
        <h3 
          className="mb-4 text-2xl md:text-3xl lg:text-4xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: '#FFFFFF'
          }}
        >
          {selectedFeature.powerStatement}
        </h3>

        {/* Description */}
        <p 
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.90)'
          }}
        >
          {selectedFeature.longDescription}
        </p>
      </motion.div>

        {/* BOTTOM: GLASS CARDS (Left side only - right is empty for asset to show) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* LEFT: IMPACT & MECHANISM Glass Cards (Vertical Stack) */}
          <motion.div 
            key={`details-${selectedFeature.id}`}
            className="col-span-1 lg:col-span-5 space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* IMPACT Glass Card - Matching Left Tiles */}
            <div 
              className="px-5 py-5"
              style={{
                background: 'transparent',
                borderRadius: '0px',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
            >
              <h5
                className="mb-3 uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.75)'
                }}
              >
                IMPACT
              </h5>
              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  fontWeight: 500,
                  color: '#FFFFFF'
                }}
              >
                {selectedFeature.impact}
              </p>
            </div>

            {/* MECHANISM Glass Card - Matching Left Tiles */}
            <div 
              className="px-5 py-5"
              style={{
                background: 'transparent',
                borderRadius: '0px',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
            >
              <h5
                className="mb-3 uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.75)'
                }}
              >
                MECHANISM
              </h5>
              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  fontWeight: 500,
                  color: '#FFFFFF'
                }}
              >
                {selectedFeature.mechanism}
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Empty space - Asset background shows through! */}
          <div className="hidden lg:block lg:col-span-7">
            {/* Intentionally empty - the background asset shines through here */}
          </div>
        </div>

        {/* BUZZ TAGS - Crystal Clear, Pure Text (Bottom-left on desktop, below content on mobile) */}
        {selectedFeature.buzzTags && selectedFeature.buzzTags.length > 0 && (
          <motion.div 
            key={`buzztags-${selectedFeature.id}`}
            className="relative lg:absolute lg:bottom-8 lg:left-[3.25rem] mt-4 lg:mt-0 px-6 md:px-8 lg:px-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 md:gap-3">
              {selectedFeature.buzzTags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="uppercase tracking-wider px-3 py-1.5"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    color: '#FFFFFF',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    borderRadius: '0px',
                    display: 'inline-block'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <section 
      className="relative py-36 md:py-44 overflow-hidden"
      style={{
        background: '#FFFFFF'
      }}
    >
      {/* Subtle ambient glow */}
      <div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] opacity-[0.04] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${selectedFeature.color}60 0%, transparent 70%)`,
          filter: 'blur(100px)'
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="mb-20 max-w-4xl" style={{ textAlign: layout === 'left' ? 'left' : 'right', marginLeft: layout === 'right' ? 'auto' : '0' }}>
          
          {/* Eyebrow Badge - Stripped Clean */}
          <motion.div
            className="mb-4"
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, x: layout === 'left' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="inline-flex items-center gap-2.5"
            >
              {title === 'STRUCTURED PATHWAYS' && <Compass size={16} style={{ color: sectionColor }} />}
              {title === 'CONTEXTUAL INTELLIGENCE' && <Brain size={16} style={{ color: sectionColor }} />}
              {title === 'FOUNDATIONAL ALIGNMENT' && <BarChart3 size={16} style={{ color: sectionColor }} />}
              {title === 'COLLABORATIVE CARE' && <Users size={16} style={{ color: sectionColor }} />}
              <span 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: sectionColor
                }}
              >
                {title}
              </span>
            </div>
          </motion.div>

          {/* Section Title - Two Line Break: Black + Color */}
          <motion.h2 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 800, 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em'
            }}
          >
            {title === 'STRUCTURED PATHWAYS' ? (
              <>
                <span style={{ color: '#000000', display: 'block' }}>Built for rehabs.</span>
                <span style={{ color: sectionColor, display: 'block' }}>Designed for patients.</span>
              </>
            ) : title === 'CONTEXTUAL INTELLIGENCE' ? (
              <>
                <span style={{ color: '#000000', display: 'block' }}>Wisdom that waits.</span>
                <span style={{ color: sectionColor, display: 'block' }}>Support that finds you.</span>
              </>
            ) : title === 'FOUNDATIONAL ALIGNMENT' ? (
              <>
                <span style={{ color: '#000000', display: 'block' }}>Data that empowers.</span>
                <span style={{ color: sectionColor, display: 'block' }}>Patterns that illuminate.</span>
              </>
            ) : title === 'COLLABORATIVE CARE' ? (
              <>
                <span style={{ color: '#000000', display: 'block' }}>Teams stay aligned.</span>
                <span style={{ color: sectionColor, display: 'block' }}>Trust stays intact.</span>
              </>
            ) : (
              description
            )}
          </motion.h2>

        </div>

        {/* Feature Cards & Asset View - 25/75 SPLIT (APPLE PATTERN: Minimal selectors get minimal space, hero gets spotlight) */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${layout === 'right' ? 'lg:grid-flow-dense' : ''}`}>
          {layout === 'left' ? (
            <>
              {cardsColumn}
              {assetColumn}
            </>
          ) : (
            <>
              <div className="lg:col-span-9 lg:col-start-4">
                {assetColumn}
              </div>
              <div className="lg:col-span-3 lg:col-start-1 lg:row-start-1">
                {cardsColumn}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
