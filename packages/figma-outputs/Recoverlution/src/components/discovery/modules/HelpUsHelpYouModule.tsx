/**
 * HELP US HELP YOU MODULE
 * 
 * Interactive qualification experience.
 * "The more we know, the more we grow together."
 * 
 * Collects practice context to personalize the journey.
 * Not a sales form. A partnership beginning.
 * 
 * Created: December 11, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface HelpUsHelpYouModuleProps {
  moduleId: string;
  onNavigateToPricing?: (pricingTier: 'foundation' | 'professional' | 'enterprise') => void;
}

const QUESTIONS = [
  {
    id: 'practice-type',
    question: 'Your practice',
    prompt: 'Where does your work live?',
    options: [
      { label: 'Solo practice', value: 'solo', description: 'Building depth on your own' },
      { label: 'Group practice', value: 'group', description: 'Team of clinicians' },
      { label: 'Treatment center', value: 'treatment', description: 'IOP, residential, or continuum' },
      { label: 'Healthcare system', value: 'system', description: 'Hospital or integrated care' },
      { label: 'Just exploring', value: 'exploring', description: 'Learning for now' }
    ]
  },
  {
    id: 'challenge',
    question: 'Your challenge',
    prompt: 'What feels hardest right now?',
    options: [
      { label: 'Continuity gaps', value: 'continuity', description: 'Space between sessions' },
      { label: 'Scaling depth', value: 'scale', description: 'More clients, same quality' },
      { label: 'Proving outcomes', value: 'outcomes', description: 'Showing what works' },
      { label: 'Administrative weight', value: 'admin', description: 'Too much overhead' },
      { label: 'Client engagement', value: 'engagement', description: 'Maintaining momentum' }
    ]
  },
  {
    id: 'caseload',
    question: 'Your reach',
    prompt: 'How many people are you serving?',
    options: [
      { label: '1 to 10', value: '1-10', description: 'Deep work, small group' },
      { label: '10 to 30', value: '10-30', description: 'Growing practice' },
      { label: '30 to 50', value: '30-50', description: 'At capacity' },
      { label: '50 plus', value: '50+', description: 'Managing scale' },
      { label: 'Multiple clinicians', value: 'org', description: 'Team serving many' }
    ]
  },
  {
    id: 'timeline',
    question: 'Your timeline',
    prompt: 'When does change feel possible?',
    options: [
      { label: 'Right now', value: 'now', description: 'Ready to move' },
      { label: 'Next few months', value: '1-3months', description: 'Planning ahead' },
      { label: 'This year', value: '3-6months', description: 'Longer runway' },
      { label: 'Future thinking', value: 'future', description: 'Just learning' }
    ]
  }
];

export function HelpUsHelpYouModule({ moduleId, onNavigateToPricing }: HelpUsHelpYouModuleProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = complete ? 100 : ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleOptionClick = (value: string) => {
    // Safety check
    if (!currentQuestion) return;
    
    // Save answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    // Move to next or complete
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 400);
    } else {
      setTimeout(() => {
        setComplete(true);
      }, 400);
    }
  };

  const generatePersonalizedMessage = () => {
    const practiceType = answers['practice-type'];
    const challenge = answers['challenge'];
    const caseload = answers['caseload'];
    const timeline = answers['timeline'];

    // RECOMMENDATION LOGIC
    // Enterprise: treatment centers, healthcare systems, org caseload
    if (practiceType === 'treatment' || practiceType === 'system' || caseload === 'org') {
      return {
        tier: 'enterprise' as const,
        tierName: 'Enterprise',
        message: 'At your scale, every efficiency compounds. Every outcome matters. You need proof that systems improve care, not just capture data.',
        why: 'Custom infrastructure, institutional pricing, and dedicated support for multi-clinician environments.',
        price: 'Custom pricing'
      };
    }

    // Professional: group practice, scaling challenges, 30+ clients
    if (practiceType === 'group' || challenge === 'scale' || caseload === '30-50' || caseload === '50+') {
      return {
        tier: 'professional' as const,
        tierName: 'Professional',
        message: 'You are building something that matters. The right tools make the difference between sustainable growth and burnout.',
        why: 'Complete control with custom branding, advanced analytics, and priority support for growing practices.',
        price: '£199/month'
      };
    }

    // Foundation: solo practitioners, smaller caseloads, continuity focus
    return {
      tier: 'foundation' as const,
      tierName: 'Foundation',
      message: 'Solo practice requires leverage. Depth without burning out. You need tools that multiply your impact without multiplying your hours.',
      why: 'Complete platform access with all six pillars, outcomes tracking, and the tools that matter most.',
      price: '£99/month'
    };
  };

  const recommendation = complete ? generatePersonalizedMessage() : null;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(99, 102, 241, 0.15))',
            border: '1px solid rgba(99, 102, 241, 0.40)'
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
            PERSONALIZATION
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: '-0.02em',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '0.75rem',
            lineHeight: 1.2
          }}
        >
          Help us help you
        </h2>

        <p
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.70)',
            lineHeight: 1.6,
            fontWeight: 500,
            marginBottom: '2rem'
          }}
        >
          The more we know about your practice, the more relevant this exploration becomes.
        </p>

        {/* Progress */}
        {!complete && (
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
                Question {currentStep + 1} of {QUESTIONS.length}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#6366F1',
                  fontWeight: 700
                }}
              >
                {Math.round(progress)}%
              </span>
            </div>
            <div
              style={{
                height: '4px',
                background: 'rgba(255, 255, 255, 0.10)',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '2rem'
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
        )}
      </div>

      <AnimatePresence mode="wait">
        {!complete && currentQuestion ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '0.5rem'
              }}
            >
              {currentQuestion.question}
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.60)',
                marginBottom: '2rem',
                fontWeight: 500
              }}
            >
              {currentQuestion.prompt}
            </p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className="w-full group text-left"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    transition: 'all 0.3s ease'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    background: 'rgba(99, 102, 241, 0.15)',
                    borderColor: 'rgba(99, 102, 241, 0.50)',
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.95)',
                          marginBottom: '0.25rem'
                        }}
                      >
                        {option.label}
                      </div>
                      <div
                        style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.50)',
                          fontWeight: 500
                        }}
                      >
                        {option.description}
                      </div>
                    </div>
                    <ArrowRight
                      size={18}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1"
                      style={{ color: '#6366F1' }}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Thank You Message */}
            <div
              className="p-6 mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.20), rgba(139, 92, 246, 0.15))',
                border: '1px solid rgba(99, 102, 241, 0.40)',
                borderRadius: '8px'
              }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} style={{ color: '#6366F1', flexShrink: 0 }} />
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: 'rgba(255, 255, 255, 0.95)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Thank you
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'rgba(255, 255, 255, 0.80)',
                      lineHeight: 1.6,
                      fontWeight: 500
                    }}
                  >
                    {recommendation?.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Plan */}
            {recommendation && (
              <div
                className="p-6 mb-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(87, 57, 251, 0.40)',
                  borderRadius: '8px'
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <Sparkles size={20} style={{ color: '#5739FB', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#5739FB',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.5rem'
                      }}
                    >
                      Recommended For You
                    </div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: 'rgba(255, 255, 255, 0.95)',
                        marginBottom: '0.25rem'
                      }}
                    >
                      {recommendation.tierName} Plan
                    </h4>
                    <div
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: '#5739FB',
                        marginBottom: '0.75rem'
                      }}
                    >
                      {recommendation.price}
                    </div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.70)',
                        lineHeight: 1.6,
                        fontWeight: 500
                      }}
                    >
                      {recommendation.why}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => {
                  if (recommendation && onNavigateToPricing) {
                    onNavigateToPricing(recommendation.tier);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg group"
                style={{ borderRadius: '8px' }}
              >
                <span style={{ fontWeight: 600 }}>View {recommendation?.tierName} Plan</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  setComplete(false);
                  setCurrentStep(0);
                  setAnswers({});
                }}
                className="w-full px-6 py-4 border-2 border-white/20 text-white hover:bg-white/10 transition-all"
                style={{ borderRadius: '8px' }}
              >
                <span style={{ fontWeight: 600 }}>Start over</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}