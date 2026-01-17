/**
 * NAVICUE CARD (for Dialogue)
 * 
 * Bridge from dialogue to structured content
 * Appears when clear pattern emerges + relevant content exists
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Book, Compass, Sparkles } from 'lucide-react';

interface NaviCueCardProps {
  title: string;
  description: string;
  pillar?: string;
  pillarColor?: string;
  contentType: 'journey' | 'practice' | 'article' | 'rescue';
  onExplore: () => void;
  onDismiss: () => void;
}

export function NaviCueCard({
  title,
  description,
  pillar,
  pillarColor,
  contentType,
  onExplore,
  onDismiss
}: NaviCueCardProps) {
  const getIcon = () => {
    switch (contentType) {
      case 'journey':
        return Compass;
      case 'practice':
        return Sparkles;
      case 'article':
        return Book;
      case 'rescue':
        return Sparkles;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="my-6 bg-gradient-to-br from-[#3E2BB8]/20 to-[#5739FB]/10 backdrop-blur-xl border border-[#5739FB]/40 p-6 relative"
    >
      {/* Accent bar */}
      {pillarColor && (
        <div 
          className="absolute top-0 left-0 w-1 h-full"
          style={{ backgroundColor: pillarColor }}
        />
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[#9D8FFF] text-xs uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              This resonates
            </span>
            {pillar && (
              <>
                <span className="text-white/30">·</span>
                <span className="text-white/50 text-xs">
                  {pillar}
                </span>
              </>
            )}
          </div>

          <h4
            className="text-white mb-2"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 600,
              fontSize: '1.25rem',
              lineHeight: '1.4'
            }}
          >
            {title}
          </h4>

          <p
            className="text-white/80 mb-4"
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}
          >
            {description}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onExplore}
              className="px-5 py-2.5 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white flex items-center gap-2 hover:shadow-[0_0_20px_rgba(62,43,184,0.3)] transition-all"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onDismiss}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
