/**
 * NAVICUE CARD (for Dialogue)
 * 
 * Bridge from dialogue to structured content
 * Appears when clear pattern emerges + relevant content exists
 * NOW APPEARS IN BOTTOM BAR (replacing prompts during pause moments)
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="relative"
    >
      {/* Accent bar */}
      {pillarColor && (
        <div 
          className="absolute top-0 left-0 w-1 h-full"
          style={{ backgroundColor: pillarColor }}
        />
      )}

      <div className="flex items-start gap-4 pl-4">
        {/* Icon */}
        <div className="w-10 h-10 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
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
              fontSize: '1.125rem',
              lineHeight: '1.4'
            }}
          >
            {title}
          </h4>

          <p
            className="text-white/80 mb-4"
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}
          >
            {description}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onExplore}
              className="px-5 py-2.5 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white flex items-center gap-2 hover:shadow-[0_0_20px_rgba(62,43,184,0.3)] transition-all"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onDismiss}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}