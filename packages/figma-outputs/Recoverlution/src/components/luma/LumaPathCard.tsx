/**
 * LUMA PATH CARD - Individual Content Option
 * 
 * Displays a single path with background image, glass overlay, and "Why this?" explanation.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, HelpCircle } from 'lucide-react';

interface ContentPath {
  id: string;
  contentType: 'navicue' | 'practice' | 'state' | 'journey' | 'reflection';
  content: {
    title: string;
    description: string;
    backgroundImage: string;
    pillarName: string;
    pillarColor: string;
    duration?: string;
    instructor?: string;
    concept?: string;
  };
  reason: string;
  priority: 1 | 2 | 3;
}

interface LumaPathCardProps {
  path: ContentPath;
  isFocused: boolean; // Full-screen vs card mode
  isSelected?: boolean;
  onSelect: () => void;
}

export function LumaPathCard({ path, isFocused, isSelected, onSelect }: LumaPathCardProps) {
  const [showReason, setShowReason] = useState(false);

  return (
    <div
      className={`relative ${isFocused ? 'h-full' : 'min-h-96'} cursor-pointer overflow-hidden`}
      onClick={onSelect}
      style={{ borderRadius: '0px' }}
    >
      {/* Background image */}
      <img
        src={path.content.backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

      {/* Content overlay */}
      <div className={`absolute ${isFocused ? 'bottom-32' : 'bottom-4'} left-4 right-4`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl"
          style={{ borderRadius: '0px' }}
        >
          {/* Pillar badge + Duration */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3"
                style={{
                  backgroundColor: path.content.pillarColor,
                  borderRadius: '0px'
                }}
              />
              <span
                className="text-white/80 text-xs uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                {path.content.pillarName}
              </span>
            </div>

            {(path.content.duration || path.content.instructor || path.content.concept) && (
              <div className="flex items-center gap-2 flex-wrap">
                {path.content.duration && (
                  <>
                    <span className="text-white/40">·</span>
                    <span className="text-white/60 text-xs">
                      {path.content.duration}
                    </span>
                  </>
                )}

                {path.content.instructor && (
                  <>
                    <span className="text-white/40">·</span>
                    <span className="text-white/60 text-xs">
                      {path.content.instructor}
                    </span>
                  </>
                )}

                {path.content.concept && (
                  <>
                    <span className="text-white/40">·</span>
                    <span className="text-white/60 text-xs">
                      {path.content.concept}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-white text-xl mb-2"
            style={{ fontWeight: 600, lineHeight: '1.3' }}
          >
            {path.content.title}
          </h3>

          {/* Description */}
          <p
            className="text-white/80 text-sm leading-relaxed mb-3"
            style={{ lineHeight: '1.6' }}
          >
            {path.content.description}
          </p>

          {/* Why this? - Always visible in card mode */}
          {!isFocused && (
            <div className="pt-3 border-t border-white/10">
              <p className="text-white/50 text-xs mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Why this?
              </p>
              <p className="text-white/70 text-xs leading-relaxed" style={{ lineHeight: '1.5' }}>
                {path.reason}
              </p>
            </div>
          )}

          {/* Why this? button (only in focused mode) */}
          {isFocused && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowReason(!showReason);
              }}
              className="mt-4 flex items-center gap-2 text-white/60 hover:text-white text-xs transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              <HelpCircle className="w-4 h-4" />
              {showReason ? 'Hide why' : 'Why this?'}
            </button>
          )}

          {/* Reason explanation */}
          <AnimatePresence>
            {showReason && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/10 text-white/70 text-sm overflow-hidden"
                style={{ lineHeight: '1.6' }}
              >
                {path.reason}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Selection indicator (when in browse mode) */}
      {!isFocused && isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-8 h-8 bg-white flex items-center justify-center"
          style={{ borderRadius: '0px' }}
        >
          <Check className="w-5 h-5 text-[#3E2BB8]" />
        </motion.div>
      )}

      {/* Priority number (subtle, top-left) */}
      {!isFocused && (
        <div className="absolute top-4 left-4 w-8 h-8 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <span
            className="text-white text-sm"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            {path.priority}
          </span>
        </div>
      )}
    </div>
  );
}