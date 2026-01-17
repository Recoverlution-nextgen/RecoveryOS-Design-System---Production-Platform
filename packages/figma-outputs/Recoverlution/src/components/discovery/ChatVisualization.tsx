/**
 * CHAT VISUALIZATION
 * 
 * Beautiful visualization of chat conversation in the RIGHT pane
 * Shows messages, progress, and context
 * 
 * Created: December 11, 2025
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';

interface ChatVisualizationProps {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  currentStep: number;
  totalSteps: number;
  explorationContext?: {
    currentModuleId?: string;
    currentModuleTitle?: string;
    categoryName?: string;
  };
}

export function ChatVisualization({
  messages,
  currentStep,
  totalSteps,
  explorationContext
}: ChatVisualizationProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} style={{ color: '#6366F1' }} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'rgba(255, 255, 255, 0.95)',
              letterSpacing: '-0.01em'
            }}
          >
            Let's find what fits your practice
          </h2>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.60)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Progress
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                color: '#6366F1',
                fontWeight: 700
              }}
            >
              {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <div
            style={{
              height: '4px',
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                borderRadius: '2px'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Context Banner (if exploring from a module) */}
      {explorationContext?.currentModuleTitle && (
        <motion.div
          className="p-4 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.10))',
            border: '1px solid rgba(99, 102, 241, 0.30)',
            borderRadius: '8px'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: '#8B5CF6',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem'
            }}
          >
            Exploring from
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.90)'
            }}
          >
            {explorationContext.currentModuleTitle}
          </div>
        </motion.div>
      )}

      {/* Conversation Display */}
      <div className="space-y-6">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: msg.role === 'user' ? '#6366F1' : 'rgba(255, 255, 255, 0.50)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}
            >
              {msg.role === 'user' ? 'You' : 'Recoverlution'}
            </div>
            <div
              className="p-4"
              style={{
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.20), rgba(99, 102, 241, 0.10))'
                  : 'rgba(255, 255, 255, 0.05)',
                border: msg.role === 'user'
                  ? '1px solid rgba(99, 102, 241, 0.40)'
                  : '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: '8px',
                borderLeft: msg.role === 'user'
                  ? '3px solid #6366F1'
                  : '3px solid rgba(255, 255, 255, 0.20)'
              }}
            >
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255, 255, 255, 0.90)',
                  lineHeight: 1.6,
                  fontWeight: 500
                }}
              >
                {msg.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Step Indicators */}
      <div className="mt-10 pt-6 border-t border-white/10">
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.50)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1rem'
          }}
        >
          Conversation Flow
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-1">
              {idx <= currentStep ? (
                <CheckCircle2 
                  size={16} 
                  style={{ color: '#6366F1', flexShrink: 0 }} 
                />
              ) : (
                <Circle 
                  size={16} 
                  style={{ color: 'rgba(255, 255, 255, 0.20)', flexShrink: 0 }} 
                />
              )}
              {idx < totalSteps - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    background: idx < currentStep
                      ? '#6366F1'
                      : 'rgba(255, 255, 255, 0.10)',
                    transition: 'all 0.4s ease'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
