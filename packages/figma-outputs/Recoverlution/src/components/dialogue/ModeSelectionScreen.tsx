/**
 * MODE SELECTION SCREEN
 * 
 * Entry point for Message dialogue
 * User selects their intention/mode
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageCircle, Lightbulb, Eye, Compass, Flame } from 'lucide-react';

interface Mode {
  id: 'inquiry' | 'philosophy' | 'reflection' | 'exploration' | 'challenge';
  label: string;
  description: string;
  energy: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const MODES: Mode[] = [
  {
    id: 'inquiry',
    label: 'Inquiry',
    description: 'Explore what questions are alive for you right now',
    energy: 'Curious, open',
    icon: MessageCircle,
    gradient: 'from-[#3B82F6] to-[#2563EB]'
  },
  {
    id: 'philosophy',
    label: 'Philosophy',
    description: 'Zoom out to see patterns and meaning',
    energy: 'Expansive, big picture',
    icon: Lightbulb,
    gradient: 'from-[#8B5CF6] to-[#7C3AED]'
  },
  {
    id: 'reflection',
    label: 'Reflection',
    description: 'Notice what is here in this moment',
    energy: 'Gentle, present',
    icon: Eye,
    gradient: 'from-[#10B981] to-[#059669]'
  },
  {
    id: 'exploration',
    label: 'Exploration',
    description: 'Follow the thread deeper into a pattern',
    energy: 'Deep dive, focused',
    icon: Compass,
    gradient: 'from-[#F59E0B] to-[#D97706]'
  },
  {
    id: 'challenge',
    label: 'Challenge',
    description: 'Work the edge with loving confrontation',
    energy: 'Direct, edge work',
    icon: Flame,
    gradient: 'from-[#EF4444] to-[#DC2626]'
  }
];

interface ModeSelectionScreenProps {
  onSelectMode: (mode: Mode['id']) => void;
  onClose: () => void;
}

export function ModeSelectionScreen({ onSelectMode, onClose }: ModeSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1
            className="text-white mb-4"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 600, 
              fontSize: '2.5rem',
              lineHeight: '1.2'
            }}
          >
            What brings you here?
          </h1>
          <p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.125rem',
              lineHeight: '1.7'
            }}
          >
            Choose the energy that matches where you are right now. 
            There is no wrong choice.
          </p>
        </motion.div>

        {/* Mode cards */}
        <div className="space-y-4">
          {MODES.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectMode(mode.id)}
                className="w-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 p-6 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon with gradient background */}
                  <div 
                    className={`w-14 h-14 bg-gradient-to-br ${mode.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3
                        className="text-white"
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontWeight: 600,
                          fontSize: '1.5rem'
                        }}
                      >
                        {mode.label}
                      </h3>
                      <span
                        className="text-white/50 text-sm"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {mode.energy}
                      </span>
                    </div>
                    <p
                      className="text-white/70"
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.0625rem',
                        lineHeight: '1.6'
                      }}
                    >
                      {mode.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="text-white/30 group-hover:text-white/60 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/40 mt-12 max-w-xl mx-auto"
          style={{ 
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            lineHeight: '1.6'
          }}
        >
          LUMA meets you exactly where you are. Light conversations matter as much as deep ones.
        </motion.p>
      </div>
    </div>
  );
}
