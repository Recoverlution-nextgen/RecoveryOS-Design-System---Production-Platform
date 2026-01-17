/**
 * THERAPIST DISCOVERY EXPLORER V2
 * 
 * Two-mode discovery and qualification system:
 * 1. EXPLORE MODE - Visual pillar-based preview (what we had)
 * 2. CONVERSATION MODE - AI-guided qualification chat
 * 
 * Flow:
 * - User explores pillars (2-3 clicks)
 * - "Start Conversation" button appears
 * - Switch to conversation mode
 * - AI guides them through qualification
 * - When ready (score >= 75), show inline signup
 * - Auto-login and navigate to platform
 * 
 * Created: November 27, 2025
 */

import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight,
  MessageCircle,
  ChevronLeft,
  Send,
  Loader2,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PillarPreview {
  pillarId: string;
  pillarName: string;
  pillarColor: string;
  icon: React.ElementType;
  therapistPrompt: string;
  clientView: {
    type: string;
    title: string;
    content: string;
    action: string;
  };
  therapistView: {
    signal: string;
    insight: string;
  };
}

interface ConversationMessage {
  role: 'system' | 'therapist';
  content: string;
  timestamp: string;
}

interface ContentView {
  type: 'product-preview' | 'therapist-console' | 'privacy-security' | 'pricing' | 'signup-form' | 'success';
  title: string;
  description?: string;
  data?: any;
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

interface TherapistDiscoveryExplorerV2Props {
  onSignupComplete?: (userId: string, email: string) => void;
}

export function TherapistDiscoveryExplorerV2({ onSignupComplete }: TherapistDiscoveryExplorerV2Props) {
  
  // Mode state
  const [mode, setMode] = useState<'explore' | 'conversation'>('explore');
  
  // Explore mode state
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [exploreClickCount, setExploreClickCount] = useState(0);
  
  // Conversation mode state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contentView, setContentView] = useState<ContentView | null>(null);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [readinessScore, setReadinessScore] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPracticeName, setSignupPracticeName] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when switching to conversation mode
  useEffect(() => {
    if (mode === 'conversation' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  const handlePillarClick = (pillarId: string) => {
    setSelectedPillar(pillarId);
    setExploreClickCount(prev => prev + 1);
  };

  const startConversation = () => {
    setMode('conversation');
    
    // Send initial greeting
    const greeting: ConversationMessage = {
      role: 'system',
      content: 'I\'m curious—what\'s the pattern you see most often between your sessions?',
      timestamp: new Date().toISOString()
    };
    setMessages([greeting]);
    
    // Set initial quick replies
    setQuickReplies([
      'Clients revert to old patterns',
      'Dropout after initial progress',
      'Between-session fade'
    ]);
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;
    
    setIsLoading(true);
    setInputValue('');
    
    // Add therapist message to UI immediately
    const therapistMessage: ConversationMessage = {
      role: 'therapist',
      content: textToSend,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, therapistMessage]);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/therapy-conversation/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            sessionId,
            message: textToSend
          })
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();
      
      // Update session ID
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }
      
      // Add system response
      const systemMessage: ConversationMessage = {
        role: 'system',
        content: data.reply,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, systemMessage]);
      
      // Update content view
      if (data.contentToShow) {
        setContentView(data.contentToShow);
      }
      
      // Update quick replies
      setQuickReplies(data.quickReplies || []);
      
      // Update readiness
      setReadinessScore(data.readinessScore || 0);
      setIsReady(data.isReady || false);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: ConversationMessage = {
        role: 'system',
        content: 'Sorry, I had trouble processing that. Can you try again?',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    
    if (!signupEmail || !signupPassword || !signupPracticeName) {
      setSignupError('Please fill in all fields.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/therapy-conversation/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            email: signupEmail,
            password: signupPassword,
            practiceName: signupPracticeName,
            sessionId
          })
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to create account');
      }
      
      const data = await response.json();
      
      // Show success
      setSignupSuccess(true);
      
      // Trigger callback
      if (onSignupComplete) {
        onSignupComplete(data.userId, data.email);
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        
        {/* Section Header - RIGHT ALIGNED PATTERN */}
        <div className="section-header-right">
          <motion.div
            className="subheading-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-subheading">
              {mode === 'explore'
                ? 'Every client walks a unique path. Every pillar meets them where they are. Choose what matters most to explore how the system works.'
                : 'A quick conversation to understand your practice and see if we can help.'}
            </p>
          </motion.div>

          <motion.div
            className="headline-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="section-eyebrow">
              <Eye size={14} style={{ strokeWidth: 2.5 }} />
              <span>{mode === 'explore' ? 'EXPLORE THE SYSTEM' : 'GUIDED CONVERSATION'}</span>
            </div>
            <h2 className="section-headline-therapy">
              {mode === 'explore' 
                ? (<>Six pillars.<br /><span className="accent">One journey.</span></>)
                : (<>Let\'s find out if this is right<br /><span className="accent">for your practice.</span></>)}
            </h2>
          </motion.div>
        </div>

        {/* Main Container */}
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
            
            {/* LEFT PANEL */}
            <div className="p-8 md:p-12 border-r border-white/10">
              
              {mode === 'explore' ? (
                // EXPLORE MODE
                <>
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

                  {/* Start Conversation Button */}
                  {exploreClickCount >= 2 && (
                    <motion.button
                      onClick={startConversation}
                      className="w-full mt-8 group relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.12), rgba(64, 224, 208, 0.08))',
                        border: '1px solid rgba(64, 224, 208, 0.30)',
                        borderRadius: '0px',
                        padding: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <MessageCircle size={20} style={{ color: '#0D9488' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.9375rem',
                            color: '#0D9488',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Want to go deeper? Start Conversation
                        </span>
                        <ArrowRight 
                          size={18} 
                          className="group-hover:translate-x-1 transition-transform"
                          style={{ color: '#0D9488' }}
                        />
                      </div>
                    </motion.button>
                  )}
                </>
              ) : (
                // CONVERSATION MODE
                <div className="flex flex-col h-full min-h-[600px]">
                  
                  {/* Back Button */}
                  <button
                    onClick={() => setMode('explore')}
                    className="flex items-center gap-2 mb-6 text-slate-600 hover:text-slate-900 transition-colors"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}
                  >
                    <ChevronLeft size={16} />
                    Back to Explore
                  </button>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${msg.role === 'therapist' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="max-w-[85%] px-4 py-3"
                          style={{
                            background: msg.role === 'therapist'
                              ? 'linear-gradient(135deg, rgba(62, 43, 184, 0.12), rgba(62, 43, 184, 0.08))'
                              : 'rgba(255, 255, 255, 0.60)',
                            border: `1px solid ${msg.role === 'therapist' ? 'rgba(62, 43, 184, 0.20)' : 'rgba(0, 0, 0, 0.08)'}`,
                            borderRadius: '0px',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)'
                          }}
                        >
                          <p
                            style={{
                              fontSize: '0.9375rem',
                              lineHeight: 1.6,
                              color: '#1E293B',
                              fontWeight: 500
                            }}
                          >
                            {msg.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isLoading && (
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div
                          className="px-4 py-3"
                          style={{
                            background: 'rgba(255, 255, 255, 0.60)',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            borderRadius: '0px'
                          }}
                        >
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  {quickReplies.length > 0 && !isLoading && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => sendMessage(reply)}
                          className="px-3 py-2 text-sm hover:scale-105 transition-transform"
                          style={{
                            background: 'rgba(64, 224, 208, 0.08)',
                            border: '1px solid rgba(64, 224, 208, 0.20)',
                            borderRadius: '0px',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                            color: '#0D9488'
                          }}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 outline-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.60)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '0px',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        color: '#1E293B'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isLoading}
                      className="px-4 py-3 transition-all disabled:opacity-50"
                      style={{
                        background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.12), rgba(62, 43, 184, 0.08))',
                        border: '1px solid rgba(62, 43, 184, 0.20)',
                        borderRadius: '0px'
                      }}
                    >
                      {isLoading ? (
                        <Loader2 size={20} className="animate-spin" style={{ color: '#3E2BB8' }} />
                      ) : (
                        <Send size={20} style={{ color: '#3E2BB8' }} />
                      )}
                    </button>
                  </form>

                  {/* Readiness Indicator */}
                  {readinessScore > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#64748B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          Qualification Progress
                        </span>
                        <span
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            color: readinessScore >= 75 ? '#10B981' : '#3E2BB8'
                          }}
                        >
                          {readinessScore}%
                        </span>
                      </div>
                      <div 
                        className="h-1.5 bg-white/20 overflow-hidden"
                        style={{ borderRadius: '0px' }}
                      >
                        <motion.div
                          className="h-full"
                          style={{
                            background: readinessScore >= 75 
                              ? 'linear-gradient(90deg, #10B981, #059669)'
                              : 'linear-gradient(90deg, #3E2BB8, #5739FB)',
                            width: `${readinessScore}%`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${readinessScore}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT PANEL - Content Display */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
              
              {/* Ambient Glow */}
              {(selectedPreview || contentView) && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: selectedPreview 
                      ? `radial-gradient(circle at 30% 50%, ${selectedPreview.pillarColor}15 0%, transparent 70%)`
                      : `radial-gradient(circle at 30% 50%, rgba(64, 224, 208, 0.15) 0%, transparent 70%)`,
                    filter: 'blur(40px)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              )}

              <div className="relative z-10">
                
                <AnimatePresence mode="wait">
                  {mode === 'explore' && !selectedPreview ? (
                    
                    // Placeholder
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

                  ) : mode === 'explore' && selectedPreview ? (
                    
                    // Product Preview (from original component)
                    <motion.div
                      key={selectedPreview.pillarId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      
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

                  ) : mode === 'conversation' && contentView?.type === 'signup-form' ? (
                    
                    // Signup Form
                    <motion.div
                      key="signup-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-center min-h-[500px]"
                    >
                      {signupSuccess ? (
                        <div className="text-center max-w-md">
                          <CheckCircle2 
                            size={64} 
                            className="mx-auto mb-6"
                            style={{ color: '#10B981' }}
                          />
                          <h3
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '1.5rem',
                              color: '#FFFFFF',
                              marginBottom: '1rem'
                            }}
                          >
                            Welcome to Recoverlution.
                          </h3>
                          <p
                            style={{
                              fontSize: '1rem',
                              lineHeight: 1.7,
                              color: 'rgba(255, 255, 255, 0.85)',
                              fontWeight: 500
                            }}
                          >
                            Your account is ready. Logging you in...
                          </p>
                        </div>
                      ) : (
                        <div className="w-full max-w-md">
                          <div className="mb-8 text-center">
                            <Lock 
                              size={48} 
                              className="mx-auto mb-4"
                              style={{ color: '#40E0D0' }}
                            />
                            <h3
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: '1.5rem',
                                color: '#FFFFFF',
                                marginBottom: '0.5rem'
                              }}
                            >
                              {contentView.title}
                            </h3>
                            <p
                              style={{
                                fontSize: '0.9375rem',
                                color: 'rgba(255, 255, 255, 0.70)',
                                fontWeight: 500
                              }}
                            >
                              Takes 90 seconds. Then invite your first client.
                            </p>
                          </div>

                          <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                              <label
                                htmlFor="practiceName"
                                style={{
                                  display: 'block',
                                  fontSize: '0.875rem',
                                  fontWeight: 600,
                                  color: 'rgba(255, 255, 255, 0.80)',
                                  marginBottom: '0.5rem'
                                }}
                              >
                                Practice Name
                              </label>
                              <input
                                type="text"
                                id="practiceName"
                                value={signupPracticeName}
                                onChange={(e) => setSignupPracticeName(e.target.value)}
                                className="w-full px-4 py-3 outline-none"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.10)',
                                  border: '1px solid rgba(255, 255, 255, 0.20)',
                                  borderRadius: '0px',
                                  fontSize: '0.9375rem',
                                  color: '#FFFFFF'
                                }}
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                style={{
                                  display: 'block',
                                  fontSize: '0.875rem',
                                  fontWeight: 600,
                                  color: 'rgba(255, 255, 255, 0.80)',
                                  marginBottom: '0.5rem'
                                }}
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                className="w-full px-4 py-3 outline-none"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.10)',
                                  border: '1px solid rgba(255, 255, 255, 0.20)',
                                  borderRadius: '0px',
                                  fontSize: '0.9375rem',
                                  color: '#FFFFFF'
                                }}
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="password"
                                style={{
                                  display: 'block',
                                  fontSize: '0.875rem',
                                  fontWeight: 600,
                                  color: 'rgba(255, 255, 255, 0.80)',
                                  marginBottom: '0.5rem'
                                }}
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                className="w-full px-4 py-3 outline-none"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.10)',
                                  border: '1px solid rgba(255, 255, 255, 0.20)',
                                  borderRadius: '0px',
                                  fontSize: '0.9375rem',
                                  color: '#FFFFFF'
                                }}
                                required
                              />
                            </div>

                            {signupError && (
                              <div
                                className="p-3"
                                style={{
                                  background: 'rgba(239, 68, 68, 0.10)',
                                  border: '1px solid rgba(239, 68, 68, 0.30)',
                                  borderRadius: '0px'
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: '0.875rem',
                                    color: '#FCA5A5',
                                    fontWeight: 500
                                  }}
                                >
                                  {signupError}
                                </p>
                              </div>
                            )}

                            <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full py-4 transition-all disabled:opacity-50"
                              style={{
                                background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.20), rgba(64, 224, 208, 0.15))',
                                border: '1px solid rgba(64, 224, 208, 0.40)',
                                borderRadius: '0px',
                                fontFamily: 'var(--font-display)',
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}
                            >
                              {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <Loader2 size={20} className="animate-spin" />
                                  Creating Account...
                                </span>
                              ) : (
                                'Create Account'
                              )}
                            </button>
                          </form>
                        </div>
                      )}
                    </motion.div>

                  ) : mode === 'conversation' && contentView ? (
                    
                    // Dynamic Content from Conversation
                    <motion.div
                      key={contentView.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="min-h-[500px]"
                    >
                      <div className="mb-6">
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            color: '#FFFFFF',
                            marginBottom: '0.5rem'
                          }}
                        >
                          {contentView.title}
                        </h3>
                        {contentView.description && (
                          <p
                            style={{
                              fontSize: '0.9375rem',
                              color: 'rgba(255, 255, 255, 0.70)',
                              fontWeight: 500
                            }}
                          >
                            {contentView.description}
                          </p>
                        )}
                      </div>

                      {/* Render content based on type */}
                      {contentView.type === 'product-preview' && contentView.data && (
                        <div
                          className="p-6"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.10)',
                            borderRadius: '0px'
                          }}
                        >
                          <p
                            className="mb-4"
                            style={{
                              fontSize: '1rem',
                              lineHeight: 1.7,
                              color: '#FFFFFF',
                              fontWeight: 500
                            }}
                          >
                            {contentView.data.clientMessage}
                          </p>
                          <div className="space-y-2">
                            <div
                              style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.875rem',
                                color: contentView.data.pillarColor
                              }}
                            >
                              {contentView.data.therapistSignal}
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.875rem',
                                color: '#40E0D0'
                              }}
                            >
                              {contentView.data.therapistInsight}
                            </div>
                          </div>
                        </div>
                      )}

                      {contentView.type === 'therapist-console' && contentView.data && (
                        <div className="space-y-3">
                          {contentView.data.clients.map((client: any, index: number) => (
                            <div
                              key={index}
                              className="p-4"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.10)',
                                borderRadius: '0px'
                              }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  style={{
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    color: '#FFFFFF'
                                  }}
                                >
                                  {client.name}
                                </span>
                                <span
                                  style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    color: client.trend === 'up' ? '#10B981' : client.trend === 'down' ? '#EF4444' : '#64748B'
                                  }}
                                >
                                  {client.engagement}%
                                </span>
                              </div>
                              <p
                                style={{
                                  fontSize: '0.8125rem',
                                  color: 'rgba(255, 255, 255, 0.60)'
                                }}
                              >
                                Last active: {client.lastActive}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {contentView.type === 'privacy-security' && contentView.data && (
                        <div className="space-y-3">
                          {contentView.data.principles.map((principle: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.10)',
                                borderRadius: '0px'
                              }}
                            >
                              <CheckCircle2 
                                size={20} 
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: '#10B981' }}
                              />
                              <p
                                style={{
                                  fontSize: '0.9375rem',
                                  lineHeight: 1.6,
                                  color: 'rgba(255, 255, 255, 0.85)',
                                  fontWeight: 500
                                }}
                              >
                                {principle}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {contentView.type === 'pricing' && contentView.data && (
                        <div className="space-y-4">
                          <div
                            className="p-6"
                            style={{
                              background: 'rgba(64, 224, 208, 0.08)',
                              border: '1px solid rgba(64, 224, 208, 0.20)',
                              borderRadius: '0px'
                            }}
                          >
                            <div className="mb-2"
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#40E0D0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em'
                              }}
                            >
                              Your Subscription
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: '#FFFFFF'
                              }}
                            >
                              {contentView.data.therapist}
                            </div>
                            <p
                              style={{
                                fontSize: '0.875rem',
                                color: 'rgba(255, 255, 255, 0.70)',
                                marginTop: '0.5rem'
                              }}
                            >
                              Unlimited clients
                            </p>
                          </div>

                          <div
                            className="p-6"
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.10)',
                              borderRadius: '0px'
                            }}
                          >
                            <div className="mb-2"
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: 'rgba(255, 255, 255, 0.60)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em'
                              }}
                            >
                              Client Subscription
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#FFFFFF'
                              }}
                            >
                              {contentView.data.client}
                            </div>
                            <p
                              style={{
                                fontSize: '0.875rem',
                                color: 'rgba(255, 255, 255, 0.70)',
                                marginTop: '0.5rem'
                              }}
                            >
                              {contentView.data.model}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>

                  ) : (
                    
                    // Default placeholder for conversation mode
                    <motion.div
                      key="conv-placeholder"
                      className="flex items-center justify-center h-full min-h-[500px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        <MessageCircle 
                          size={48} 
                          className="mx-auto mb-4 opacity-30"
                          style={{ color: '#40E0D0' }}
                        />
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'rgba(255, 255, 255, 0.60)'
                          }}
                        >
                          Content will appear here as we talk.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
