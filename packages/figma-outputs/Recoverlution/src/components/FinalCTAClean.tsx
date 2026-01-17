/**
 * FINAL CTA - CLEAN STANDARD
 * 
 * Pattern: Same as Home Hero
 * 1. Background asset (full bleed)
 * 2. Subtle overlay (0.1-0.3 opacity)
 * 3. Glass copy on top
 * 
 * NO z-index mess, NO dark overlays, NO blur decorations
 */

import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { FINAL_CTA_STYLES } from '../utils/heroStyles';

interface FinalCTACleanProps {
  backgroundAsset: string;
  eyebrow: string;
  headline: string;
  accentWord?: string;
  subtext: string;
  buttonText: string;
  onButtonClick?: () => void;
  accentColor?: string; // Default: #40E0D0 (cyan)
  EyebrowIcon?: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
}

export default function FinalCTAClean({
  backgroundAsset,
  eyebrow,
  headline,
  accentWord,
  subtext,
  buttonText,
  onButtonClick,
  accentColor = '#40E0D0', // Cyan default (first 5 pages)
  EyebrowIcon = Sparkles
}: FinalCTACleanProps) {
  return (
    <section 
      className="py-20 md:py-32 lg:py-40 relative overflow-hidden"
      style={{
        background: '#0A192F' // Fallback
      }}
    >
      
      {/* BACKGROUND: Asset - Full Bleed - MOBILE OPTIMIZED */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
      >
        <img 
          src={backgroundAsset}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            opacity: 1,
            filter: 'brightness(1.15) saturate(1.2)' // Brighten to show purple chair clearly
          }}
        />
      </motion.div>

      {/* NO OVERLAY - let the asset shine (text has heavy shadows for readability) */}

      {/* FOREGROUND: Glass Copy - MOBILE OPTIMIZED */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 lg:px-12 text-center">
        
        {/* Eyebrow - Stripped Clean - MOBILE OPTIMIZED */}
        <motion.div
          className="flex justify-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2">
            <EyebrowIcon 
              size={14}
              className="md:hidden"
              style={{ 
                color: accentColor,
                strokeWidth: 2
              }} 
            />
            <EyebrowIcon 
              size={16}
              className="hidden md:block"
              style={{ 
                color: accentColor,
                strokeWidth: 2
              }} 
            />
            <span 
              className="uppercase tracking-wider text-white"
              style={FINAL_CTA_STYLES.eyebrow}
            >
              {eyebrow}
            </span>
          </div>
        </motion.div>

        {/* Headline - MOBILE OPTIMIZED */}
        <motion.h2 
          className="text-white mb-5 md:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={FINAL_CTA_STYLES.headline}
        >
          {accentWord ? (
            <>
              {headline.split(accentWord)[0]}
              <span style={{ 
                color: accentColor
              }}>
                {accentWord}
              </span>
              {headline.split(accentWord)[1]}
            </>
          ) : headline}
        </motion.h2>

        {/* Subtext - MOBILE OPTIMIZED */}
        <motion.p
          className="text-white mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={FINAL_CTA_STYLES.subtext}
        >
          {subtext}
        </motion.p>

        {/* Button - MOBILE OPTIMIZED */}
        <motion.button
          onClick={onButtonClick}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="group relative inline-flex items-center gap-2.5 md:gap-3 overflow-hidden"
          style={FINAL_CTA_STYLES.button}
        >
          {/* Button hover effect */}
          <div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-400"
            style={{ borderRadius: '0px' }}
          />
          
          {/* Button Content - RESPONSIVE */}
          <span 
            className="flex items-center gap-2.5 md:gap-3"
            style={FINAL_CTA_STYLES.buttonText}
          >
            {buttonText}
            <ArrowRight 
              size={20}
              className="md:hidden transition-transform group-hover:translate-x-1.5 duration-400" 
            />
            <ArrowRight 
              size={24}
              className="hidden md:block transition-transform group-hover:translate-x-1.5 duration-400" 
            />
          </span>
        </motion.button>

      </div>
    </section>
  );
}
