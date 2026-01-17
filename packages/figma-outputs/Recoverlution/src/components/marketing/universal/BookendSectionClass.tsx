/**
 * BOOKEND SECTION CLASS - UNIVERSAL COMPONENT
 * 
 * Pattern: Full-bleed 3D asset background + headline panel (top-left) + component tiles (bottom-right, one row)
 * Used on: Platform Page (Human Baseline, Multi-Device Continuity)
 * 
 * Philosophy: Exhibition-grade glass overlays on premium 3D assets
 * Data Attribute: data-section-type="bookend-foundation"
 * 
 * Apple-Grade Typography System - Updated: November 6, 2025
 * TIER 4: INTEGRATED MOMENTS (H2 On Asset - 44px max)
 * 
 * Created: November 5, 2025 - Phase 3: Section 2 Pattern Consolidation
 */

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface BookendTile {
  id: string;
  icon: LucideIcon;
  label: string;
  tagline?: string; // Optional secondary text (e.g., "NEUROADAPTIVE ENGINE")
  color?: string; // Optional color for the tile
}

interface BookendSectionClassProps {
  // Content
  eyebrow: string;
  eyebrowIcon?: ReactNode; // Optional icon before eyebrow text
  headline: string | ReactNode;
  bodyCopy: string | ReactNode;
  
  // Tiles (bottom-right)
  tiles: BookendTile[];
  
  // Asset
  backgroundAsset: string;
  backgroundAssetAlt: string;
  
  // Styling
  backgroundColor?: string; // Default: #FFFFFF
  shadowColor?: string; // Shadow color for container (default: universal shadow standard)
  
  // Layout
  sectionPadding?: string; // Default: py-36 md:py-44
  containerMaxWidth?: string; // Default: 1600px
  assetMinHeight?: string; // Default: min-h-[600px] md:min-h-[700px]
}

export function BookendSectionClass({
  eyebrow,
  eyebrowIcon,
  headline,
  bodyCopy,
  tiles,
  backgroundAsset,
  backgroundAssetAlt,
  backgroundColor = '#FFFFFF',
  shadowColor = '0 32px 100px rgba(0, 0, 0, 0.1), 0 12px 40px rgba(87, 57, 251, 0.15)',
  sectionPadding = 'py-36 md:py-44',
  containerMaxWidth = '1600px',
  assetMinHeight = 'min-h-[600px] md:min-h-[700px]',
}: BookendSectionClassProps) {
  
  return (
    <section 
      className={`${sectionPadding} overflow-hidden`}
      style={{
        background: backgroundColor
      }}
      data-section-type="bookend-foundation"
    >
      <div 
        className="mx-auto px-6 md:px-12"
        style={{ maxWidth: containerMaxWidth }}
      >
        
        {/* Revolutionary Container - Full-Bleed 3D Asset with Floating Glass Cards */}
        <div className="relative" style={{ borderRadius: '0px' }}>
          
          {/* Full-Bleed 3D Asset Background - CINEMATIC ASPECT RATIO */}
          <div 
            className={`relative ${assetMinHeight} lg:min-h-0 overflow-hidden aspect-[16/9] lg:aspect-[21/9]`}
            style={{ 
              borderRadius: '0px',
              boxShadow: shadowColor
            }}
          >
            <motion.img 
              src={backgroundAsset}
              alt={backgroundAssetAlt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 1 }}
              initial={{ opacity: 0, scale: 1.06 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
            />
            
            {/* Content Wrapper - Relative on Mobile, Contains Both Panels */}
            <div className="relative lg:absolute lg:inset-0 flex flex-col lg:block" style={{ zIndex: 10 }}>

            {/* TOP LEFT - Headline Glass Panel - BOTTOM ALIGNED */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
              className="relative lg:absolute lg:top-16 lg:left-16 lg:right-auto lg:bottom-auto w-full lg:w-[560px] p-6 md:p-8 lg:p-0"
            >
              <div 
                className="relative lg:h-full flex flex-col lg:justify-end px-0 py-0"
                style={{
                  background: 'transparent',
                  borderRadius: '0px',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)'
                }}
              >
                
                {/* Eyebrow Badge - Universal Pattern (Transparent Box + Border) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="inline-flex items-center gap-2 px-3 py-2 mb-7 backdrop-blur-sm border border-white/30 self-start"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0px'
                  }}
                >
                  {eyebrowIcon}
                  <span 
                    className="uppercase tracking-wider"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700,
                      fontSize: '0.6875rem', // 11px - UNIVERSAL EYEBROW SIZE
                      letterSpacing: '0.12em',
                      color: '#FFFFFF'
                    }}
                  >
                    {eyebrow}
                  </span>
                </motion.div>

                {/* Main Headline - WHITE TEXT (on glass) */}
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.65 }}
                  className="mb-5"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 800, 
                    fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', // TIER 4: 28px → 44px mobile-optimized
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: '#FFFFFF',
                    textShadow: '0 2px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.6)',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto'
                  }}
                >
                  {headline}
                </motion.h2>

                {/* Body Copy - WHITE TEXT (on glass) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.75 }}
                  style={{ 
                    fontSize: '0.9375rem', // 15px - slightly smaller for mobile
                    lineHeight: 1.65,
                    letterSpacing: '-0.005em',
                    maxWidth: '460px',
                    color: 'rgba(255, 255, 255, 0.90)',
                    textShadow: '0 1px 12px rgba(0, 0, 0, 0.3)',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                >
                  {bodyCopy}
                </motion.div>

              </div>
            </motion.div>

            {/* BOTTOM RIGHT - Component Tiles - RESPONSIVE - FIT ON ONE ROW */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative lg:absolute lg:bottom-10 lg:right-10 lg:left-auto w-full px-4 md:px-8 lg:px-0 mt-4 lg:mt-0 pb-6 lg:pb-0"
            >
              <div className="flex flex-nowrap gap-1.5 md:gap-3 lg:gap-4 justify-center lg:justify-end overflow-x-auto scrollbar-hide max-w-full">
                {tiles.map((tile, idx) => {
                  const TileIcon = tile.icon;
                  
                  return (
                    <motion.div
                      key={tile.id}
                      className="flex flex-col items-center gap-2 p-2.5 md:p-4 lg:p-6 group cursor-pointer flex-shrink-0"
                      style={{
                        background: 'transparent',
                        borderRadius: '0px',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        width: tiles.length === 3 ? 'clamp(95px, 30vw, 140px)' : 'clamp(68px, 18vw, 140px)',
                        transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)'
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 + idx * 0.1 }}
                    >
                      {/* Icon */}
                      <TileIcon 
                        size={tiles.length === 3 ? 28 : 24}
                        style={{ color: tile.color || '#FFFFFF', strokeWidth: 2.5, flexShrink: 0 }} 
                      />

                      {/* Label - Below Icon - CRISP WHITE */}
                      <span 
                        className="uppercase tracking-wider"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: tiles.length === 3 ? 'clamp(0.625rem, 1.4vw, 0.75rem)' : 'clamp(0.5rem, 1.2vw, 0.6875rem)',
                          letterSpacing: '0.06em',
                          textAlign: 'center',
                          color: '#FFFFFF',
                          lineHeight: 1.2,
                          wordBreak: 'break-word',
                          hyphens: 'auto'
                        }}
                      >
                        {tile.label}
                      </span>

                      {/* Optional Tagline */}
                      {tile.tagline && (
                        <span 
                          className="uppercase tracking-wider text-center"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 500,
                            fontSize: tiles.length === 3 ? 'clamp(0.5rem, 1vw, 0.5625rem)' : 'clamp(0.4375rem, 0.9vw, 0.5rem)',
                            letterSpacing: '0.06em',
                            color: 'rgba(255, 255, 255, 0.70)',
                            marginTop: '-0.25rem',
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                            hyphens: 'auto'
                          }}
                        >
                          {tile.tagline}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Optimization Styles */}
      <style>{`
        /* Prevent horizontal overflow on mobile */
        @media (max-width: 1023px) {
          [data-section-type="bookend-foundation"] * {
            max-width: 100%;
            box-sizing: border-box;
          }
        }
      `}</style>
    </section>
  );
}
