/**
 * FEATURE DEEP DIVE MODULE
 * 
 * Converts FlipTileClassWithFeatures into an explorable discovery module
 * Shows feature benefits with expandable deep dives
 * 
 * Created: December 11, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MODULES, CATEGORIES } from '../discoveryData';

interface FeatureDeepDiveModuleProps {
  moduleId: string;
}

export function FeatureDeepDiveModule({ moduleId }: FeatureDeepDiveModuleProps) {
  const module = MODULES.find(m => m.id === moduleId);
  const category = module ? CATEGORIES.find(c => c.id === module.categoryId) : null;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  if (!module || !module.content) return null;

  const { features } = module.content;

  return (
    <div>
      {/* Module Header */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 mb-6"
        style={{
          background: `linear-gradient(135deg, ${category?.color}25, ${category?.color}15)`,
          border: `1px solid ${category?.color}40`,
          borderRadius: '0px'
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}
        >
          {category?.name}
        </span>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '2rem',
          letterSpacing: '-0.02em',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '1rem',
          lineHeight: 1.2
        }}
      >
        {module.title}
      </h2>

      <p
        style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.70)',
          lineHeight: 1.6,
          marginBottom: '3rem',
          fontWeight: 500
        }}
      >
        {module.subtitle}
      </p>

      {/* Background Asset */}
      {module.content.backgroundAsset && (
        <div
          className="relative mb-8"
          style={{
            height: '300px',
            borderRadius: '0px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.10)'
          }}
        >
          <img
            src={module.content.backgroundAsset}
            alt=""
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: module.content.gradientOverlay || 'linear-gradient(135deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.20))'
            }}
          />
        </div>
      )}

      {/* Feature Sections */}
      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                background: isExpanded
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: '0px',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full text-left p-6 flex items-start gap-4 group"
                style={{ transition: 'all 0.2s ease' }}
              >
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0px',
                    background: `linear-gradient(135deg, ${feature.color}40, ${feature.color}20)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={20} style={{ color: '#FFFFFF', strokeWidth: 2.5 }} />
                </div>

                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      letterSpacing: '-0.01em',
                      color: '#FFFFFF',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontWeight: 500,
                      lineHeight: 1.5
                    }}
                  >
                    {feature.description}
                  </p>
                </div>

                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '0px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                  className="group-hover:bg-white/15"
                >
                  {isExpanded ? (
                    <ChevronUp size={16} style={{ color: 'rgba(255, 255, 255, 0.70)' }} />
                  ) : (
                    <ChevronDown size={16} style={{ color: 'rgba(255, 255, 255, 0.70)' }} />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: '0 1.5rem 1.5rem 1.5rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <div className="pt-6 pl-16">
                        {feature.deepDive && (
                          <div className="space-y-4">
                            {feature.deepDive.map((point, pointIdx) => (
                              <div
                                key={pointIdx}
                                style={{
                                  padding: '1rem',
                                  background: 'rgba(0, 0, 0, 0.20)',
                                  borderRadius: '0px',
                                  borderLeft: `3px solid ${feature.color}`
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: '0.875rem',
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    fontWeight: 500,
                                    lineHeight: 1.6
                                  }}
                                >
                                  {point}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
