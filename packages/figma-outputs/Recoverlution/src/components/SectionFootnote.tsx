/**
 * SECTION FOOTNOTE - UNIVERSAL SUPPORTING TAGLINE
 * 
 * Purpose: Provide subtle, elegant supporting context below hero tile sections
 * Philosophy: Back up without intruding, complement without competing
 * 
 * Design DNA:
 * - NO background assets (clean, minimal)
 * - Subtle separator line above
 * - Small, refined typography
 * - Centered layout
 * - Optional phrases/list items
 * - Positioned directly below hero tiles (mt-16 wrapper recommended)
 * 
 * infiniteK Rules:
 * - Square borders (borderRadius: 0px)
 * - Clean backgrounds (no images)
 * - Typography hierarchy respected
 * - Never overpowers parent section
 * - Connected to tiles, not floating at section bottom
 * 
 * Usage:
 * <div className="mt-16">
 *   <SectionFootnote
 *     headline="Recovery is a journey"
 *     phrases={["Challenge Assumptions", "Honor the science", "Co-Create the destination"]}
 *   />
 * </div>
 * 
 * Created: November 3, 2025
 */

import { motion } from 'motion/react';

interface SectionFootnoteProps {
  headline: string;
  phrases?: string[];
  className?: string;
}

const BRAND = {
  mid: '#5739FB',
  cyan: '#40E0D0'
};

export function SectionFootnote({ 
  headline, 
  phrases = [], 
  className = ''
}: SectionFootnoteProps) {
  // Clean implementation - no background management needed
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={className}
    >
      {/* Subtle Separator Line */}
      <div 
        className="w-16 h-px mx-auto mb-6"
        style={{
          background: `linear-gradient(90deg, transparent, ${BRAND.mid}20, transparent)`
        }}
      />
      
      {/* Headline */}
      <h4
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.02em',
          lineHeight: 1.4,
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: phrases.length > 0 ? '0.75rem' : '0'
        }}
      >
        {headline}
      </h4>
      
      {/* Optional Phrases */}
      {phrases.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
          {phrases.map((phrase, i) => (
            <div key={i} className="flex items-center gap-4">
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#9CA3AF',
                  letterSpacing: '0.01em'
                }}
              >
                {phrase}
              </span>
              {i < phrases.length - 1 && (
                <div
                  style={{
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: BRAND.mid,
                    opacity: 0.3
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
      
    </motion.div>
  );
}
