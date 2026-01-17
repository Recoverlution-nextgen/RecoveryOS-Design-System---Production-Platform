/**
 * THERAPIST DISCOVERY EXPLORER
 * 
 * The breakthrough component for /therapy page.
 * 
 * Interactive exploration where therapists discover how Recoverlution
 * addresses their clients' specific struggles through 6-pillar framework.
 * 
 * Design Principles:
 * - Glass morphism (platform.css patterns)
 * - Square borders (0px radius)
 * - Split view: Client experience vs. Therapist signals
 * - Natural discovery flow (not chatbot-y)
 * - Built on 6 pillars foundation
 * 
 * Created: November 27, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Brain, 
  Compass, 
  Users, 
  Shield, 
  Sparkles,
  Eye,
  Activity,
  ArrowRight
} from 'lucide-react';

interface PillarPreview {
  pillarId: string;
  pillarName: string;
  pillarColor: string;
  icon: React.ElementType;
  therapistPrompt: string;
  clientView: {
    type: string; // "NaviCue" | "Journey" | "Wellbeing" | "Insight"
    title: string;
    content: string;
    action: string;
  };
  therapistView: {
    signal: string;
    insight: string;
  };
}

const PILLAR_PREVIEWS: PillarPreview[] = [
  {
    pillarId: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#E85D75',
    icon: Heart,
    therapistPrompt: 'Emotional overwhelm',
    clientView: {
      type: 'NaviCue',
      title: 'You seem activated right now.',
      content: 'Your body is sending signals. Let\'s acknowledge them without judgment. Take three slow breaths. Notice where tension lives.',
      action: 'Start 3 Minute Practice'
    },
    therapistView: {
      signal: 'Activity: ↑ Regulation attempt logged',
      insight: 'Pattern: Evening activation (3 days this week)'
    }
  },
  {
    pillarId: 'cognitive-reframing',
    pillarName: 'Cognitive Reframing',
    pillarColor: '#5AB9EA',
    icon: Brain,
    therapistPrompt: 'Negative thought loops',
    clientView: {
      type: 'Journey',
      title: 'That thought isn\'t a fact.',
      content: 'It\'s a pattern your brain has practiced. Let\'s practice a new one. Write down the thought. Now write what someone who loves you might say instead.',
      action: 'Open Thought Record'
    },
    therapistView: {
      signal: 'Engagement: Thought record completed',
      insight: 'Shift: Self-critical thoughts ↓ 40% this week'
    }
  },
  {
    pillarId: 'decision-mastery',
    pillarName: 'Decision Mastery',
    pillarColor: '#F59E0B',
    icon: Compass,
    therapistPrompt: 'Impulsive decisions',
    clientView: {
      type: 'Toolkit',
      title: 'Pause. What would future you choose?',
      content: 'You\'re at a fork. One path is familiar. The other is aligned. Take 60 seconds. Imagine yourself tomorrow. What does tomorrow-you thank today-you for choosing?',
      action: 'Use Decision Framework'
    },
    therapistView: {
      signal: 'Pattern: Pause before impulse (new behavior)',
      insight: 'Progress: 5 decision pauses this week vs. 0 last week'
    }
  },
  {
    pillarId: 'identity-integration',
    pillarName: 'Identity Integration',
    pillarColor: '#8B5CF6',
    icon: Sparkles,
    therapistPrompt: 'Identity confusion',
    clientView: {
      type: 'Wellbeing',
      title: 'Who are you becoming?',
      content: 'Not who you were. Not who you think you should be. Who are you becoming right now, in this moment, with this choice?',
      action: 'Explore Identity Reflection'
    },
    therapistView: {
      signal: 'Insight: Identity language shifting',
      insight: 'Trend: "I am" statements increasingly aligned'
    }
  },
  {
    pillarId: 'social-connectivity',
    pillarName: 'Social Connectivity',
    pillarColor: '#10B981',
    icon: Users,
    therapistPrompt: 'Social isolation',
    clientView: {
      type: 'NaviCue',
      title: 'Reach out to one person today.',
      content: 'Not a long conversation. Just a signal. A text. A voice note. A like. Something that says I\'m here. You\'re not alone.',
      action: 'Log Connection Attempt'
    },
    therapistView: {
      signal: 'Social: Outreach attempt logged',
      insight: 'Pattern: Connection attempts rising (3 this week)'
    }
  },
  {
    pillarId: 'stress-resilience',
    pillarName: 'Stress Resilience',
    pillarColor: '#06B6D4',
    icon: Shield,
    therapistPrompt: 'Stress spikes',
    clientView: {
      type: 'Journey',
      title: 'Your body is your ally.',
      content: 'Check in with it. Scan from head to toe. Where do you feel tight? Where do you feel calm? Just notice. No judgment. Just data.',
      action: 'Start Body Scan'
    },
    therapistView: {
      signal: 'Stress: Body awareness practice completed',
      insight: 'Resilience: Somatic practices ↑ 60% this week'
    }
  }
];

export function TherapistDiscoveryExplorer() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePillarClick = (pillarId: string) => {
    setSelectedPillar(pillarId);
    setHasInteracted(true);
  };

  const selectedPreview = PILLAR_PREVIEWS.find(p => p.pillarId === selectedPillar);

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3E2BB8 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 border"
            style={{
              background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.08), rgba(87, 57, 251, 0.05))',
              borderColor: 'rgba(62, 43, 184, 0.20)',
              borderRadius: '0px'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Eye size={14} style={{ color: '#3E2BB8' }} />
            <span 
              className="uppercase tracking-wider"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                color: '#3E2BB8'
              }}
            >
              EXPLORE THE SYSTEM
            </span>
          </motion.div>

          <motion.h2
            className="mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#0A192F'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What do your clients struggle with most?
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: '#475569',
              fontWeight: 500
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Select what matters most. See how Recoverlution addresses it in real time.
          </motion.p>
        </div>

        {/* Main Discovery Container */}
        <motion.div
          className="relative"
          style={{
            background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.04), rgba(87, 57, 251, 0.02))',
            border: '1px solid rgba(62, 43, 184, 0.15)',
            borderRadius: '0px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(62, 43, 184, 0.12)'
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* LEFT: Pillar Selection */}
            <div className="p-8 md:p-12 border-r border-white/10">
              
              <div className="mb-8">
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    letterSpacing: '-0.01em',
                    color: '#0A192F',
                    marginBottom: '0.5rem'
                  }}
                >
                  Between sessions, they face.
                </h3>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: '#64748B',
                    fontWeight: 500
                  }}
                >
                  Click to explore how Recoverlution carries your clinical work into these moments.
                </p>
              </div>

              {/* Pillar Options */}
              <div className="space-y-3">
                {PILLAR_PREVIEWS.map((pillar, index) => {
                  const Icon = pillar.icon;
                  const isSelected = selectedPillar === pillar.pillarId;
                  
                  return (
                    <motion.button
                      key={pillar.pillarId}
                      onClick={() => handlePillarClick(pillar.pillarId)}
                      className="w-full group relative"
                      style={{
                        background: isSelected 
                          ? `linear-gradient(135deg, ${pillar.pillarColor}15, ${pillar.pillarColor}08)`
                          : 'rgba(255, 255, 255, 0.40)',
                        border: `1px solid ${isSelected ? pillar.pillarColor + '40' : 'rgba(0, 0, 0, 0.08)'}`,
                        borderRadius: '0px',
                        padding: '1rem',
                        textAlign: 'left',
                        transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.05) }}
                      whileHover={{
                        scale: 1.02,
                        borderColor: pillar.pillarColor + '60'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${pillar.pillarColor}20, ${pillar.pillarColor}10)`,
                            borderRadius: '0px'
                          }}
                        >
                          <Icon size={20} style={{ color: pillar.pillarColor, strokeWidth: 2.5 }} />
                        </div>
                        
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '0.9375rem',
                            color: isSelected ? pillar.pillarColor : '#1E293B',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {pillar.therapistPrompt}
                        </span>

                        <ArrowRight 
                          size={16} 
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: pillar.pillarColor }}
                        />
                      </div>

                      {/* Pillar Name Subtitle */}
                      {isSelected && (
                        <motion.div
                          className="mt-2 pt-2 border-t"
                          style={{
                            borderColor: pillar.pillarColor + '20'
                          }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              color: pillar.pillarColor,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            {pillar.pillarName}
                          </span>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Interaction Prompt */}
              {!hasInteracted && (
                <motion.div
                  className="mt-8 p-4"
                  style={{
                    background: 'rgba(64, 224, 208, 0.06)',
                    border: '1px solid rgba(64, 224, 208, 0.20)',
                    borderRadius: '0px'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      fontStyle: 'italic',
                      color: '#0D9488',
                      fontWeight: 500,
                      textAlign: 'center'
                    }}
                  >
                    Select any struggle to see how the system responds.
                  </p>
                </motion.div>
              )}
            </div>

            {/* RIGHT: Product Preview */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
              
              {/* Ambient Glow */}
              {selectedPreview && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${selectedPreview.pillarColor}15 0%, transparent 70%)`,
                    filter: 'blur(40px)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              )}

              <div className="relative z-10">
                
                <AnimatePresence mode="wait">
                  {!selectedPreview ? (
                    
                    // Placeholder State
                    <motion.div
                      key="placeholder"
                      className="flex items-center justify-center h-full min-h-[500px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center">
                        <Activity 
                          size={48} 
                          className="mx-auto mb-4 opacity-30"
                          style={{ color: '#40E0D0' }}
                        />
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'rgba(255, 255, 255, 0.60)',
                            marginBottom: '0.5rem'
                          }}
                        >
                          Select a struggle to explore.
                        </p>
                        <p
                          style={{
                            fontSize: '0.875rem',
                            color: 'rgba(255, 255, 255, 0.40)',
                            fontWeight: 500
                          }}
                        >
                          See what your clients experience and what you see as their therapist.
                        </p>
                      </div>
                    </motion.div>

                  ) : (
                    
                    // Preview Content
                    <motion.div
                      key={selectedPreview.pillarId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      
                      {/* Preview Type Badge */}
                      <div className="mb-6">
                        <span
                          className="inline-block px-3 py-1.5 border"
                          style={{
                            background: `linear-gradient(135deg, ${selectedPreview.pillarColor}20, ${selectedPreview.pillarColor}10)`,
                            borderColor: selectedPreview.pillarColor + '40',
                            borderRadius: '0px',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {selectedPreview.clientView.type}
                        </span>
                      </div>

                      {/* CLIENT VIEW */}
                      <div 
                        className="mb-8 p-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.10)',
                          borderRadius: '0px',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)'
                        }}
                      >
                        <div className="flex items-start gap-2 mb-3">
                          <Eye size={16} style={{ color: '#40E0D0', marginTop: '2px' }} />
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#40E0D0',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em'
                            }}
                          >
                            Client sees
                          </span>
                        </div>

                        <h4
                          className="mb-3"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            letterSpacing: '-0.01em',
                            color: '#FFFFFF',
                            lineHeight: 1.3
                          }}
                        >
                          {selectedPreview.clientView.title}
                        </h4>

                        <p
                          className="mb-4"
                          style={{
                            fontSize: '0.9375rem',
                            lineHeight: 1.7,
                            color: 'rgba(255, 255, 255, 0.85)',
                            fontWeight: 500
                          }}
                        >
                          {selectedPreview.clientView.content}
                        </p>

                        <button
                          className="group inline-flex items-center gap-2 px-4 py-2 border"
                          style={{
                            background: `linear-gradient(135deg, ${selectedPreview.pillarColor}30, ${selectedPreview.pillarColor}20)`,
                            borderColor: selectedPreview.pillarColor + '50',
                            borderRadius: '0px',
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {selectedPreview.clientView.action}
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* THERAPIST VIEW */}
                      <div 
                        className="p-6"
                        style={{
                          background: 'rgba(0, 0, 0, 0.20)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '0px'
                        }}
                      >
                        <div className="flex items-start gap-2 mb-3">
                          <Activity size={16} style={{ color: selectedPreview.pillarColor, marginTop: '2px' }} />
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: selectedPreview.pillarColor,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em'
                            }}
                          >
                            You see
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div
                              style={{
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.60)',
                                marginBottom: '0.25rem'
                              }}
                            >
                              Signal
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.875rem',
                                color: '#FFFFFF',
                                fontWeight: 500
                              }}
                            >
                              {selectedPreview.therapistView.signal}
                            </div>
                          </div>

                          <div>
                            <div
                              style={{
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.60)',
                                marginBottom: '0.25rem'
                              }}
                            >
                              Insight
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.875rem',
                                color: selectedPreview.pillarColor,
                                fontWeight: 500
                              }}
                            >
                              {selectedPreview.therapistView.insight}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Note */}
                      <motion.div
                        className="mt-6 p-4"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '0px'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p
                          style={{
                            fontSize: '0.8125rem',
                            fontStyle: 'italic',
                            color: 'rgba(255, 255, 255, 0.50)',
                            fontWeight: 500,
                            textAlign: 'center'
                          }}
                        >
                          Clients practice privately. You see patterns and progress. Not diaries.
                        </p>
                      </motion.div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </motion.div>

        {/* Bottom Encouragement */}
        {hasInteracted && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p
              style={{
                fontSize: '0.9375rem',
                color: '#64748B',
                fontWeight: 500
              }}
            >
              Try exploring different struggles to see the full picture.
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
