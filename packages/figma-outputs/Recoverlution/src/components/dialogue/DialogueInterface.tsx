/**
 * DIALOGUE INTERFACE
 * 
 * Continuous conversation with LUMA
 * Organizer at top: "Bring me into your world"
 * Three dimensions set the default makeup of conversation
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Home, Heart, Users, Lightbulb, Target, Brain, MessageCircle, FileText, Video } from 'lucide-react';
import { MicroCue, MicroCueType } from './MicroCue';
import { NaviCueCard } from '../navicues/NaviCueCard';

interface Message {
  id: string;
  role: 'luma' | 'user';
  content: string;
  timestamp: string;
}

interface Prompt {
  id: string;
  text: string;
}

interface MicroCueData {
  id: string;
  type: MicroCueType;
  data?: any;
}

interface NaviCueData {
  id: string;
  title: string;
  description: string;
  pillar?: string;
  pillarColor?: string;
  contentType: 'journey' | 'practice' | 'article' | 'rescue';
}

interface DialogueInterfaceProps {
  onClose: () => void;
  backgroundUrl?: string; // Dynamic background from current NaviCue
  embedded?: boolean; // If true, renders without wrapper/organizer
}

// Conversation organizer dimensions
const WHERE_YOU_ARE = [
  { value: 'here', label: 'Here', icon: Home },
  { value: 'holding', label: 'Holding', icon: Target },
  { value: 'slipping', label: 'Slipping', icon: Lightbulb },
  { value: 'lost', label: 'Lost', icon: MessageCircle }
];

const WHAT_YOU_NEED = [
  { value: 'clarity', label: 'Clarity', icon: FileText },
  { value: 'space', label: 'Space', icon: Video },
  { value: 'direction', label: 'Direction', icon: Brain },
  { value: 'relief', label: 'Relief', icon: Heart }
];

const HOW_TO_TALK = [
  { value: 'straight', label: 'Straight', icon: ArrowLeft },
  { value: 'soft', label: 'Soft', icon: ChevronDown },
  { value: 'wandering', label: 'Wandering', icon: ChevronUp },
  { value: 'reflective', label: 'Reflective', icon: Users }
];

export function DialogueInterface({ onClose, backgroundUrl, embedded = false }: DialogueInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [microCues, setMicroCues] = useState<MicroCueData[]>([]);
  const [naviCue, setNaviCue] = useState<NaviCueData | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  
  // Conversation organizer state (persists as defaults)
  const [whereYouAre, setWhereYouAre] = useState<string>('here');
  const [whatYouNeed, setWhatYouNeed] = useState<string>('clarity');
  const [howToTalk, setHowToTalk] = useState<string>('straight');
  const [organizerOpen, setOrganizerOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize dialogue session
  useEffect(() => {
    initializeSession();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, microCues, naviCue]);

  // When organizer changes, LUMA adapts (only when not embedded)
  useEffect(() => {
    if (messages.length > 0 && !embedded) {
      console.log('Context changed:', { whereYouAre, whatYouNeed, howToTalk });
      // In Phase 2, this will send context update to backend
      // LUMA adapts tone, prompts, and responses based on new context
    }
  }, [whereYouAre, whatYouNeed, howToTalk, embedded]);

  const initializeSession = async () => {
    setIsLoading(true);
    try {
      // Get contextual opening based on time of day + organizer defaults
      const hour = new Date().getHours();
      let opening = '';
      
      if (hour < 6) {
        opening = 'You are up early. Or maybe you have not been able to sleep. Either way, I am here.';
      } else if (hour < 12) {
        opening = 'How are you starting your day? Not how you think you should be. How you actually are.';
      } else if (hour < 17) {
        opening = 'What is here for you right now?';
      } else {
        opening = 'How are you holding up?';
      }

      const mockSessionId = `session_${Date.now()}`;
      setSessionId(mockSessionId);

      const lumaMessage: Message = {
        id: `msg_${Date.now()}`,
        role: 'luma',
        content: opening,
        timestamp: new Date().toISOString()
      };

      setMessages([lumaMessage]);
      
      // Generate initial prompts based on context
      generatePrompts(opening, [], { whereYouAre, whatYouNeed, howToTalk });
    } catch (error) {
      console.error('Error initializing dialogue session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePrompts = (
    lumaMessage: string, 
    conversationHistory: Message[],
    context: { whereYouAre: string; whatYouNeed: string; howToTalk: string }
  ) => {
    // Generate contextual prompts based on conversation + organizer context
    // In Phase 2, this will use OpenAI with context
    
    if (conversationHistory.length === 0) {
      // First prompts - adapt to context
      if (context.whereYouAre === 'lost' || context.whereYouAre === 'slipping') {
        setPrompts([
          { id: 'p1', text: 'I do not know where to start' },
          { id: 'p2', text: 'Everything feels too much' },
          { id: 'p3', text: 'I need help' }
        ]);
      } else {
        setPrompts([
          { id: 'p1', text: 'I am okay' },
          { id: 'p2', text: 'Something is on my mind' },
          { id: 'p3', text: 'I want to explore something' }
        ]);
      }
    } else {
      // Adaptive prompts based on conversation + context
      const lastUserMessage = conversationHistory.filter(m => m.role === 'user').pop();
      
      if (lastUserMessage?.content.length > 100) {
        // They're decanting - minimal prompts
        setPrompts([
          { id: 'p1', text: 'There is more' },
          { id: 'p2', text: 'That is all for now' }
        ]);
      } else if (context.howToTalk === 'reflective' || context.howToTalk === 'wandering') {
        // Deeper, more exploratory prompts
        setPrompts([
          { id: 'p1', text: 'I keep wondering about this' },
          { id: 'p2', text: 'What if there is something I am not seeing' },
          { id: 'p3', text: 'Let me sit with this' }
        ]);
      } else {
        // Direct, grounded prompts
        setPrompts([
          { id: 'p1', text: 'Tell me what to do' },
          { id: 'p2', text: 'I need a next step' },
          { id: 'p3', text: 'Something feels stuck' }
        ]);
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setCustomInput('');
    setPrompts([]);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call including context
      
      // Mock LUMA response with adaptive logic based on context
      setTimeout(() => {
        const isLongMessage = content.length > 100;
        const isShortMessage = content.length < 20;

        let lumaResponse = '';
        
        // Adapt response based on whereYouAre
        if (whereYouAre === 'lost' || content.toLowerCase().includes('end it all')) {
          lumaResponse = 'I hear that you are in a lot of pain. You do not have to hold this alone. Would you like to connect with someone who can support you right now?';
        } else if (whereYouAre === 'slipping') {
          lumaResponse = 'What would help you feel a little more steady right now?';
        } else if (isLongMessage) {
          // User is decanting - witness
          lumaResponse = whatYouNeed === 'space' ? 'I am here.' : 'I am here with you.';
        } else if (isShortMessage || content.toLowerCase().includes('not know') || content.toLowerCase().includes('maybe')) {
          // User is stuck - adapt based on howToTalk
          if (howToTalk === 'straight') {
            lumaResponse = 'What are you noticing in your body right now?';
          } else if (howToTalk === 'soft') {
            lumaResponse = 'Can you take a breath and see what you notice?';
          } else {
            lumaResponse = 'What if you just stayed with not knowing for a moment?';
          }
        } else {
          // Normal flow - adapt based on whatYouNeed and howToTalk
          const directResponses = [
            'What would it feel like to let that just be here?',
            'What are you noticing in your body right now?',
            'What is one thing that would help?'
          ];
          const softResponses = [
            'Can you stay with that for a moment?',
            'What if you did not need to fix this right now?',
            'What would it mean to be gentle with yourself here?'
          ];
          const deepResponses = [
            'What if the pattern is pointing you toward something you have not been willing to feel?',
            'What does this want you to know?',
            'What would it mean to stop resisting this?',
            'What else is there?'
          ];
          
          const responseSet = howToTalk === 'straight' ? directResponses 
            : howToTalk === 'soft' ? softResponses 
            : deepResponses;
          
          lumaResponse = responseSet[Math.floor(Math.random() * responseSet.length)];
        }

        const lumaMessage: Message = {
          id: `msg_${Date.now()}`,
          role: 'luma',
          content: lumaResponse,
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, lumaMessage]);
        generatePrompts(lumaResponse, [...messages, userMessage], { whereYouAre, whatYouNeed, howToTalk });

        // Randomly trigger micro-cues (in real implementation, this would be intelligent)
        if (Math.random() > 0.7 && messages.length > 4) {
          setTimeout(() => {
            const cueTypes: MicroCueType[] = ['breath', 'body'];
            const randomType = cueTypes[Math.floor(Math.random() * cueTypes.length)];
            
            setMicroCues(prev => [...prev, {
              id: `cue_${Date.now()}`,
              type: randomType
            }]);
          }, 1000);
        }

        // Trigger NaviCue after a few messages (demo)
        if (messages.length >= 4 && !naviCue && Math.random() > 0.5) {
          setTimeout(() => {
            setNaviCue({
              id: `navicue_${Date.now()}`,
              title: 'Patterns in relationships',
              description: 'You have mentioned family dynamics several times. There is a journey about understanding your attachment patterns that might help you see what is happening more clearly.',
              pillar: 'Relationships',
              pillarColor: '#EC4899',
              contentType: 'journey'
            });
            // Clear prompts when NaviCue appears
            setPrompts([]);
          }, 2000);
        }

        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handlePromptClick = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      handleSendMessage(customInput);
    }
  };

  return (
    <div 
      className={embedded ? "h-full flex flex-col" : "fixed inset-0 z-[9999] flex flex-col bg-black luma-overlay-talk"}
      style={!embedded && backgroundUrl ? {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      {/* Conversation Organizer */}
      {!embedded && (
        <div className="luma-toolbar flex-shrink-0 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Collapsed view - shows current selections with proper glass buttons */}
            <div className="w-full px-6 py-4 flex items-center justify-between group">
              <button
                onClick={() => setOrganizerOpen(!organizerOpen)}
                className="flex items-center gap-2 flex-1"
              >
                {/* Glass icon buttons showing the 3 context dimensions */}
                {(() => {
                  const where = WHERE_YOU_ARE.find(w => w.value === whereYouAre);
                  const what = WHAT_YOU_NEED.find(w => w.value === whatYouNeed);
                  const how = HOW_TO_TALK.find(h => h.value === howToTalk);
                  
                  if (!where || !what || !how) return null;
                  
                  const WhereIcon = where.icon;
                  const WhatIcon = what.icon;
                  const HowIcon = how.icon;
                  
                  return (
                    <>
                      <div className="luma-icon-button-sm">
                        <WhereIcon className="w-4 h-4" />
                      </div>
                      <div className="luma-icon-button-sm">
                        <WhatIcon className="w-4 h-4" />
                      </div>
                      <div className="luma-icon-button-sm">
                        <HowIcon className="w-4 h-4" />
                      </div>
                    </>
                  );
                })()}
              </button>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setOrganizerOpen(!organizerOpen)}
                  animate={{ rotate: organizerOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="luma-icon-button-sm"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
                
                <button
                  onClick={onClose}
                  className="luma-icon-button-sm"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Expanded view - all options */}
            <AnimatePresence>
              {organizerOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-white/10">
                    {/* Where you are */}
                    <div className="mb-5 mt-6">
                      <p className="luma-section-label mb-2">
                        Where you are
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {WHERE_YOU_ARE.map(option => {
                          const Icon = option.icon;
                          const isSelected = whereYouAre === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => setWhereYouAre(option.value)}
                              className={isSelected ? 'luma-option-selected' : 'luma-option hover:bg-white/10 hover:text-white'}
                            >
                              <div className="flex flex-col items-center gap-1.5">
                                <Icon className="w-4 h-4" />
                                <span className="luma-label">
                                  {option.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* What you're looking for */}
                    <div className="mb-5">
                      <p className="luma-section-label mb-2">
                        What you are looking for
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {WHAT_YOU_NEED.map(option => {
                          const Icon = option.icon;
                          const isSelected = whatYouNeed === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => setWhatYouNeed(option.value)}
                              className={isSelected ? 'luma-option-selected' : 'luma-option hover:bg-white/10 hover:text-white'}
                            >
                              <div className="flex flex-col items-center gap-1.5">
                                <Icon className="w-4 h-4" />
                                <span className="luma-label">
                                  {option.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* How you want to talk */}
                    <div>
                      <p className="luma-section-label mb-2">
                        How you want to talk
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {HOW_TO_TALK.map(option => {
                          const Icon = option.icon;
                          const isSelected = howToTalk === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => setHowToTalk(option.value)}
                              className={isSelected ? 'luma-option-selected' : 'luma-option hover:bg-white/10 hover:text-white'}
                            >
                              <div className="flex flex-col items-center gap-1.5">
                                <Icon className="w-4 h-4" />
                                <span className="luma-label">
                                  {option.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${embedded ? 'pb-64' : ''}`}>
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0 }}
                className="mb-6"
              >
                {message.role === 'luma' ? (
                  // LUMA message
                  <div className="luma-voice">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="luma-label">
                        LUMA
                      </span>
                    </div>

                    <p className="luma-voice-text">
                      {message.content}
                    </p>
                  </div>
                ) : (
                  // User message
                  <div className="luma-user">
                    <div className="flex items-center justify-between mb-3">
                      <span className="luma-label">
                        YOU
                      </span>
                    </div>

                    <p className="luma-body-text">
                      {message.content}
                    </p>
                  </div>
                )}

                {/* Show micro-cues after relevant messages */}
                {microCues
                  .filter(cue => messages.indexOf(message) === messages.length - 1)
                  .map(cue => (
                    <MicroCue key={cue.id} type={cue.type} data={cue.data} />
                  ))}

                {/* NaviCues moved to bottom bar - no longer appear in message stream */}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-white/40"
            >
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Input area - Fixed at bottom when embedded, normal when standalone */}
      {!isLoading && (
        <div className={embedded ? "fixed bottom-0 left-0 right-0 z-[10000] pointer-events-none" : "flex-shrink-0 px-4 sm:px-6 lg:px-8 py-6"}>
          {embedded ? (
            <div className="mx-4 mb-4 pointer-events-auto">
              <div 
                className="luma-glass-dark"
                style={{ 
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="px-4 py-3">
                  <div className="max-w-4xl mx-auto">
                    {/* NaviCue takes over bottom bar during "pause" moments */}
                    <AnimatePresence mode="wait">
                      {naviCue ? (
                        <NaviCueCard
                          key="navicue"
                          {...naviCue}
                          onExplore={() => {
                            console.log('Explore content:', naviCue);
                            // TODO: Navigate to content
                          }}
                          onDismiss={() => {
                            setNaviCue(null);
                            // Re-generate prompts after dismissing NaviCue
                            generatePrompts(messages[messages.length - 1]?.content || '', messages, { whereYouAre, whatYouNeed, howToTalk });
                          }}
                        />
                      ) : (
                        <div key="prompts-input">
                          {/* Suggested prompts - Only show when no NaviCue */}
                          {prompts.length > 0 && (
                            <div className="grid grid-cols-1 gap-2 mb-3">
                              {prompts.map(prompt => (
                                <button
                                  key={prompt.id}
                                  onClick={() => handlePromptClick(prompt.text)}
                                  className="bg-white/5 border border-white/10 px-4 py-3 text-left text-white/90 text-sm hover:bg-white/10 transition-all"
                                >
                                  {prompt.text}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Custom input */}
                          <form onSubmit={handleCustomSubmit} className="flex gap-2 items-end">
                            <textarea
                              ref={inputRef}
                              value={customInput}
                              onChange={(e) => setCustomInput(e.target.value)}
                              placeholder="Type your message..."
                              rows={1}
                              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50 resize-none"
                              style={{ maxHeight: '120px' }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleCustomSubmit(e);
                                }
                              }}
                            />
                            <button
                              type="submit"
                              disabled={!customInput.trim()}
                              className="h-12 w-12 flex items-center justify-center bg-[#5739FB] hover:bg-[#3E2BB8] text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </form>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Suggested prompts */}
              {prompts.length > 0 && (
                <div className="grid grid-cols-1 gap-2 mb-3">
                  {prompts.map(prompt => (
                    <button
                      key={prompt.id}
                      onClick={() => handlePromptClick(prompt.text)}
                      className="luma-glass px-4 py-3 text-left text-white/90 text-sm hover:bg-white/10 transition-all"
                    >
                      {prompt.text}
                    </button>
                  ))}
                </div>
              )}

              {/* Custom input */}
              <form onSubmit={handleCustomSubmit} className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50 resize-none"
                  style={{ maxHeight: '120px' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCustomSubmit(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!customInput.trim()}
                  className="h-12 w-12 flex items-center justify-center bg-[#5739FB] hover:bg-[#3E2BB8] text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}