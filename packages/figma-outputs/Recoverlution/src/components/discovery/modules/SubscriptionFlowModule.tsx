/**
 * SUBSCRIPTION FLOW MODULE
 * 
 * Embeddable subscription/checkout component for discovery engine
 * Includes inline checkout for Foundation/Professional or Enterprise contact form
 * 
 * Created: December 11, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Sparkles, Layers, Building2 } from 'lucide-react';
import InlineCheckout from '../../therapy/InlineCheckout';
import EnterpriseContactForm from '../../therapy/EnterpriseContactForm';
import { MODULES } from '../discoveryData';

interface SubscriptionFlowModuleProps {
  moduleId: string;
}

export function SubscriptionFlowModule({ moduleId }: SubscriptionFlowModuleProps) {
  const module = MODULES.find(m => m.id === moduleId);
  const [selectedTier, setSelectedTier] = useState<'foundation' | 'professional' | 'enterprise' | null>(null);
  
  if (!module) return null;

  // Determine which tier based on moduleId
  const tierMap: Record<string, 'foundation' | 'professional' | 'enterprise'> = {
    'pricing-foundation': 'foundation',
    'pricing-professional': 'professional',
    'pricing-enterprise': 'enterprise'
  };

  const defaultTier = tierMap[moduleId];

  const tiers = [
    {
      id: 'foundation' as const,
      name: 'Foundation',
      icon: Layers,
      price: '£99',
      period: 'per month',
      tagline: 'Add continuity. Keep your rhythm.',
      color: '#5739FB',
      features: [
        'Practice architecture in place',
        'Extend your reach with companion continuity',
        'Continuity carries forward between sessions',
        'Intelligence reveals patterns',
        'Outcomes accelerate'
      ]
    },
    {
      id: 'professional' as const,
      name: 'Professional',
      icon: Sparkles,
      price: '£199',
      period: 'per month',
      tagline: 'Your model. Your rhythm. Complete control.',
      color: '#3E2BB8',
      features: [
        'Practice architecture accelerates',
        'Control your model completely',
        'Continuity compounds under your roof',
        'Intelligence flows continuously',
        'Speed, scale, sustain impact'
      ],
      highlighted: true
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      period: 'let us talk',
      tagline: 'Institutional scale. Your infrastructure.',
      color: '#2C99AF',
      features: [
        'Enterprise architecture deploys',
        'Brand your continuity at scale',
        'Intelligence aggregates across locations',
        'Partnership deploys you',
        'Your infrastructure, your rules'
      ]
    }
  ];

  return (
    <div>
      {/* Module Header */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 mb-6"
        style={{
          background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.25), rgba(87, 57, 251, 0.15))',
          border: '1px solid rgba(87, 57, 251, 0.40)',
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
          SUBSCRIPTION
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

      <AnimatePresence mode="wait">
        {!selectedTier ? (
          /* TIER SELECTION */
          <motion.div
            key="tier-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              const isDefault = tier.id === defaultTier;

              return (
                <motion.button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className="w-full group text-left relative"
                  style={{
                    background: isDefault
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(255, 255, 255, 0.08)',
                    border: isDefault
                      ? '2px solid rgba(255, 255, 255, 0.30)'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '0px',
                    padding: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.35)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '0px',
                        background: `linear-gradient(135deg, ${tier.color}40, ${tier.color}20)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Icon size={20} style={{ color: '#FFFFFF', strokeWidth: 2.5 }} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            letterSpacing: '-0.02em',
                            color: '#FFFFFF'
                          }}
                        >
                          {tier.name}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 800,
                              fontSize: '1.25rem',
                              color: '#FFFFFF'
                            }}
                          >
                            {tier.price}
                          </span>
                          {tier.period && (
                            <span
                              style={{
                                fontSize: '0.875rem',
                                color: 'rgba(255, 255, 255, 0.70)',
                                fontWeight: 500
                              }}
                            >
                              {tier.period}
                            </span>
                          )}
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: '0.9375rem',
                          color: 'rgba(255, 255, 255, 0.80)',
                          marginBottom: '1rem',
                          fontWeight: 500
                        }}
                      >
                        {tier.tagline}
                      </p>

                      <div className="space-y-2">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2
                              size={16}
                              style={{
                                color: tier.color,
                                strokeWidth: 2.5,
                                marginTop: '0.125rem',
                                flexShrink: 0
                              }}
                            />
                            <span
                              style={{
                                fontSize: '0.875rem',
                                color: 'rgba(255, 255, 255, 0.75)',
                                fontWeight: 500
                              }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {isDefault && (
                    <div
                      className="absolute top-4 right-4"
                      style={{
                        padding: '0.375rem 0.75rem',
                        background: tier.color,
                        borderRadius: '0px',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF'
                      }}
                    >
                      Recommended
                    </div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          /* CHECKOUT FLOW */
          <motion.div
            key="checkout-flow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setSelectedTier(null)}
              className="flex items-center gap-2 mb-6 text-white/70 hover:text-white transition-colors"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={16} />
              Back to plans
            </button>

            {selectedTier === 'enterprise' ? (
              <EnterpriseContactForm onBack={() => setSelectedTier(null)} />
            ) : (
              <InlineCheckout
                tier={selectedTier}
                onBack={() => setSelectedTier(null)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
