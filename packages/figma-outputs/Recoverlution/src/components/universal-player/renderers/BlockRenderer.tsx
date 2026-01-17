/**
 * BLOCK RENDERER
 * 
 * Renders content assembly blocks (Articles, Insights, Practices)
 * Used when professionals share content from library
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Lightbulb, Activity, User, Calendar, Tag, CheckCircle } from 'lucide-react';

interface BlockData {
  block_id: string;
  block_type: 'article' | 'insight' | 'practice';
  title: string;
  subtitle?: string;
  content: string;
  author?: string;
  pillar_id: string;
  pillar_name: string;
  pillar_color: string;
  schema_name?: string;
  tags?: string[];
  estimated_time?: number;
  authority_source?: string;
  shared_by?: {
    name: string;
    role: string;
    message?: string;
  };
  practice_instructions?: string[];
  expected_outcome?: string;
}

interface BlockRendererProps {
  content: BlockData;
  onResponse?: (response: any) => void;
  onClose?: () => void;
}

export function BlockRenderer({ content, onResponse, onClose }: BlockRendererProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const getBlockIcon = () => {
    switch (content.block_type) {
      case 'article': return BookOpen;
      case 'insight': return Lightbulb;
      case 'practice': return Activity;
      default: return BookOpen;
    }
  };

  const getBlockTypeLabel = () => {
    switch (content.block_type) {
      case 'article': return 'Article';
      case 'insight': return 'Insight';
      case 'practice': return 'Practice';
      default: return 'Content';
    }
  };

  const Icon = getBlockIcon();

  const handleComplete = () => {
    setIsCompleted(true);
    onResponse?.({
      action: 'completed',
      block_id: content.block_id,
      block_type: content.block_type,
      completion_time: new Date().toISOString()
    });
  };

  return (
    <div 
      className="min-h-screen p-8"
      style={{ 
        backgroundColor: 'var(--portal-bg)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  backgroundColor: `${content.pillar_color}30`,
                  border: `2px solid ${content.pillar_color}`
                }}
              >
                <Icon className="w-6 h-6" style={{ color: content.pillar_color }} />
              </div>
              <div>
                <div className="text-sm uppercase tracking-wider" style={{ color: content.pillar_color }}>
                  {getBlockTypeLabel()}
                </div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {content.pillar_name}
                </div>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                Close
              </button>
            )}
          </div>

          <h1 className="text-4xl" style={{ color: '#FFFFFF' }}>
            {content.title}
          </h1>

          {content.subtitle && (
            <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {content.subtitle}
            </div>
          )}

          {/* META INFO */}
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            {content.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {content.author}
              </div>
            )}
            {content.estimated_time && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {content.estimated_time} min read
              </div>
            )}
            {content.schema_name && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {content.schema_name}
              </div>
            )}
          </div>
        </motion.div>

        {/* SHARED BY (if shared by professional) */}
        {content.shared_by && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              borderLeft: '3px solid #5739FB',
              borderRadius: '0'
            }}
          >
            <div className="text-sm uppercase tracking-wider mb-2" style={{ color: '#5739FB' }}>
              Shared by {content.shared_by.name}
            </div>
            <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              {content.shared_by.role}
            </div>
            {content.shared_by.message && (
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                "{content.shared_by.message}"
              </div>
            )}
          </motion.div>
        )}

        {/* PRACTICE INSTRUCTIONS (if practice type) */}
        {content.block_type === 'practice' && content.practice_instructions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
              Instructions
            </h2>
            <div className="space-y-3">
              {content.practice_instructions.map((instruction, index) => (
                <div
                  key={index}
                  className={`p-4 flex items-start gap-4 cursor-pointer transition-all ${
                    currentStep === index ? 'scale-[1.02]' : ''
                  }`}
                  onClick={() => setCurrentStep(index)}
                  style={{
                    backgroundColor: currentStep === index 
                      ? `${content.pillar_color}20`
                      : 'rgba(255, 255, 255, 0.05)',
                    border: currentStep === index
                      ? `2px solid ${content.pillar_color}`
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0'
                  }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: currentStep >= index ? content.pillar_color : 'rgba(255, 255, 255, 0.1)',
                      color: currentStep >= index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ color: '#FFFFFF' }}>
                    {instruction}
                  </div>
                </div>
              ))}
            </div>

            {/* PRACTICE CONTROLS */}
            <div className="flex gap-3 justify-center pt-4">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  opacity: currentStep === 0 ? 0.3 : 1,
                  cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous Step
              </button>
              <button
                onClick={() => {
                  if (currentStep < content.practice_instructions!.length - 1) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    handleComplete();
                  }
                }}
                className="px-6 py-3"
                style={{
                  backgroundColor: content.pillar_color,
                  color: '#FFFFFF',
                  border: 'none'
                }}
              >
                {currentStep < content.practice_instructions!.length - 1 
                  ? 'Next Step' 
                  : 'Complete Practice'}
              </button>
            </div>
          </motion.div>
        )}

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert max-w-none"
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.8'
          }}
        >
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </motion.div>

        {/* EXPECTED OUTCOME */}
        {content.expected_outcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '0'
            }}
          >
            <div className="text-sm uppercase tracking-wider mb-2" style={{ color: '#10B981' }}>
              Expected Outcome
            </div>
            <div style={{ color: '#FFFFFF' }}>
              {content.expected_outcome}
            </div>
          </motion.div>
        )}

        {/* TAGS */}
        {content.tags && content.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {content.tags.map((tag, index) => (
              <div
                key={index}
                className="px-3 py-1 text-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                #{tag}
              </div>
            ))}
          </motion.div>
        )}

        {/* AUTHORITY SOURCE */}
        {content.authority_source && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-center"
            style={{ color: 'rgba(255, 255, 255, 0.4)' }}
          >
            Source: {content.authority_source}
          </motion.div>
        )}

        {/* COMPLETION BUTTON (for articles/insights) */}
        {content.block_type !== 'practice' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center pt-8"
          >
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className="px-8 py-4 flex items-center gap-3 text-lg"
              style={{
                backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.3)' : content.pillar_color,
                color: '#FFFFFF',
                border: 'none',
                opacity: isCompleted ? 0.7 : 1,
                cursor: isCompleted ? 'not-allowed' : 'pointer'
              }}
            >
              {isCompleted && <CheckCircle className="w-6 h-6" />}
              {isCompleted ? 'Completed' : 'Mark as Read'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
