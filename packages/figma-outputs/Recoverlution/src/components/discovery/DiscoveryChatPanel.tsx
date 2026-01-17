/**
 * DISCOVERY CHAT PANEL
 * 
 * Conversational qualification flow that opens when users want to go deeper.
 * Context-aware based on exploration journey.
 * 
 * Features:
 * - Slide-in panel (right side)
 * - Qualification questions
 * - Lead to signup or demo booking
 * - Track exploration context
 * 
 * Created: December 10, 2025
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, User, CheckCircle2, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface QuestionOption {
  label: string;
  value: string;
}

interface QualificationData {
  practiceType?: string;
  biggestChallenge?: string;
  caseload?: string;
  timeline?: string;
  email?: string;
  name?: string;
}

interface DiscoveryChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  explorationContext?: {
    currentModuleId?: string;
    currentModuleTitle?: string;
    categoryName?: string;
    explorationPath?: string[];
  };
  onSignupComplete?: (userId: string, email: string) => void;
  chatMessages: Array<{ role: 'user' | 'assistant'; content: string }>;
  setChatMessages: React.Dispatch<React.SetStateAction<Array<{ role: 'user' | 'assistant'; content: string }>>>;
  chatStep: number;
  setChatStep: React.Dispatch<React.SetStateAction<number>>;
}

// Qualification flow questions
const QUALIFICATION_QUESTIONS = [
  {
    id: 'practice-type',
    question: 'What type of practice are you with?',
    options: [
      { label: 'Solo practitioner', value: 'solo' },
      { label: 'Group practice', value: 'group' },
      { label: 'Treatment center / IOP', value: 'treatment-center' },
      { label: 'Hospital / Healthcare system', value: 'hospital' },
      { label: 'Other / Just exploring', value: 'other' }
    ]
  },
  {
    id: 'challenge',
    question: 'What\'s your biggest challenge right now?',
    options: [
      { label: 'Continuity between sessions', value: 'continuity' },
      { label: 'Scaling without losing depth', value: 'scale' },
      { label: 'Measuring outcomes', value: 'outcomes' },
      { label: 'Administrative burden', value: 'admin' },
      { label: 'Client engagement', value: 'engagement' }
    ]
  },
  {
    id: 'caseload',
    question: 'How many clients are you typically working with?',
    options: [
      { label: '1-10 clients', value: '1-10' },
      { label: '10-30 clients', value: '10-30' },
      { label: '30-50 clients', value: '30-50' },
      { label: '50+ clients', value: '50+' },
      { label: 'Organizational / Multiple clinicians', value: 'org' }
    ]
  },
  {
    id: 'timeline',
    question: 'What\'s your timeline for exploring a platform like this?',
    options: [
      { label: 'Actively looking now', value: 'now' },
      { label: 'Next 1-3 months', value: '1-3months' },
      { label: '3-6 months', value: '3-6months' },
      { label: 'Just researching for future', value: 'future' },
      { label: 'Not sure yet', value: 'unsure' }
    ]
  }
];

export function DiscoveryChatPanel({ 
  isOpen, 
  onClose, 
  explorationContext,
  onSignupComplete,
  chatMessages,
  setChatMessages,
  chatStep,
  setChatStep
}: DiscoveryChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [qualificationData, setQualificationData] = useState<QualificationData>({});
  const [showCTAs, setShowCTAs] = useState(false);
  
  const currentQuestion = QUALIFICATION_QUESTIONS[chatStep];
  
  // Initialize with context-aware greeting
  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      const greeting = explorationContext?.currentModuleTitle
        ? `I see you've been exploring ${explorationContext.currentModuleTitle}. I'd love to understand your practice better so I can show you what's most relevant.`
        : `Thanks for your interest in Recoverlution. I'd love to understand your practice better so I can show you what's most relevant.`;
      
      setChatMessages([{
        role: 'assistant',
        content: greeting
      }]);
    }
  }, [isOpen, explorationContext, chatMessages.length, setChatMessages]);

  const handleOptionClick = (option: QuestionOption) => {
    // Add user message
    setChatMessages(prev => [...prev, {
      role: 'user',
      content: option.label
    }]);
    
    // Update qualification data
    const questionId = currentQuestion.id;
    setQualificationData(prev => ({
      ...prev,
      [questionId]: option.value
    }));
    
    // Move to next step or show CTAs
    if (chatStep < QUALIFICATION_QUESTIONS.length - 1) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: QUALIFICATION_QUESTIONS[chatStep + 1].question
        }]);
        setChatStep(prev => prev + 1);
      }, 600);
    } else {
      // All questions answered, show CTAs
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: generatePersonalizedResponse(qualificationData, option.value)
        }]);
        setShowCTAs(true);
      }, 600);
    }
  };
  
  const generatePersonalizedResponse = (data: QualificationData, timeline: string) => {
    const urgency = timeline === 'now' || timeline === '1-3months';
    
    if (urgency) {
      return `Based on what you've shared, Recoverlution could be a strong fit. I'd recommend ${data['practice-type'] === 'solo' ? 'starting with a pilot' : 'scheduling a demo'} so you can see exactly how it addresses your ${data.challenge} challenge.`;
    } else {
      return `Thanks for sharing. Since you're in the research phase, I'd recommend booking a demo when you're ready. In the meantime, feel free to continue exploring the system.`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} className="text-indigo-600" />
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.125rem',
              color: '#0A192F'
            }}
          >
            Let's talk about your practice
          </h3>
        </div>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#64748B',
            fontWeight: 500
          }}
        >
          A few questions to personalize your experience
        </p>
      </div>

      {/* Conversation Messages (scrollable) */}
      <div className="flex-1 space-y-4 mb-6 overflow-y-auto max-h-96">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-900'
              }`}
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.5
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Prompt Buttons (if question active) */}
      {!showCTAs && currentQuestion && (
        <div className="space-y-2 mb-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#1E293B'
                }}
                className="group-hover:text-indigo-700"
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* CTAs (after completion) */}
      {showCTAs && (
        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-between px-6 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            onClick={() => {
              // Handle demo booking
              console.log('Book demo', qualificationData);
            }}
          >
            <span style={{ fontWeight: 600 }}>Schedule a Demo</span>
            <ArrowRight size={18} />
          </button>
          
          <button
            className="w-full flex items-center justify-between px-6 py-4 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all"
            onClick={() => {
              // Handle pilot signup
              console.log('Start pilot', qualificationData);
            }}
          >
            <span style={{ fontWeight: 600 }}>Start a Pilot</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Text Input (always visible) */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Or type your question..."
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                setChatMessages(prev => [...prev, {
                  role: 'user',
                  content: inputValue.trim()
                }]);
                setInputValue('');
                // Handle custom message
                setTimeout(() => {
                  setChatMessages(prev => [...prev, {
                    role: 'assistant',
                    content: 'Thanks for that. Let me help you with that question. For now, try exploring more modules or use the prompt buttons above.'
                  }]);
                }, 600);
              }
            }}
          />
          <button
            onClick={() => {
              if (inputValue.trim()) {
                setChatMessages(prev => [...prev, {
                  role: 'user',
                  content: inputValue.trim()
                }]);
                setInputValue('');
              }
            }}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            disabled={!inputValue.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}