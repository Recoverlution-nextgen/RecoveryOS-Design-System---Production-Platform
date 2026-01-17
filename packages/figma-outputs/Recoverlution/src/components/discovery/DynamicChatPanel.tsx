/**
 * DYNAMIC CHAT PANEL
 * 
 * Non-linear, intelligent navigation assistant.
 * Suggests 3 relevant modules based on context and questions.
 * 
 * Philosophy:
 * - Not a linear qualification flow
 * - Dynamic suggestions that evolve
 * - Answers questions by showing relevant modules
 * - The more they explore, the smarter it gets
 * 
 * Created: December 11, 2025
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, ChevronLeft } from 'lucide-react';
import { MODULES, CATEGORIES } from './discoveryData';

interface DynamicChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onModuleSelect: (moduleId: string) => void;
  explorationContext?: {
    currentModuleId?: string;
    currentModuleTitle?: string;
    categoryName?: string;
    explorationPath?: string[];
  };
}

// Smart suggestion engine based on context
function getSuggestedModules(
  currentModuleId?: string,
  explorationPath?: string[],
  userInput?: string
): string[] {
  // Default suggestions
  const defaults = [
    'continuity-not-there',
    'evidence-visible',
    'architecture-complete-system'
  ];

  // If they're exploring a module, suggest related ones
  if (currentModuleId) {
    const currentModule = MODULES.find(m => m.id === currentModuleId);
    if (currentModule) {
      // Get other modules from same category
      const sameCategoryModules = MODULES
        .filter(m => m.categoryId === currentModule.categoryId && m.id !== currentModuleId)
        .slice(0, 2)
        .map(m => m.id);
      
      // Get one from a complementary category
      const complementaryCategories: Record<string, string> = {
        'continuity': 'intelligence',
        'evidence': 'transformation',
        'architecture': 'flow',
        'intelligence': 'evidence',
        'safety': 'practice',
        'flow': 'architecture',
        'practice': 'scale',
        'scale': 'transformation',
        'transformation': 'authority',
        'authority': 'continuity'
      };
      
      const complementaryCategoryId = complementaryCategories[currentModule.categoryId];
      const complementaryModule = MODULES.find(m => m.categoryId === complementaryCategoryId);
      
      return [
        ...sameCategoryModules,
        complementaryModule?.id || defaults[2]
      ];
    }
  }

  // If they've typed something, try to match keywords
  if (userInput) {
    const keywords = userInput.toLowerCase();
    const matches = MODULES.filter(m => 
      m.title.toLowerCase().includes(keywords) ||
      m.subtitle.toLowerCase().includes(keywords)
    ).slice(0, 3);
    
    if (matches.length >= 3) {
      return matches.map(m => m.id);
    }
  }

  // Based on exploration path depth
  if (explorationPath && explorationPath.length > 3) {
    // They're deep in exploration, suggest advanced topics
    return [
      'flow-interoperability',
      'authority-validation',
      'transformation-what-changes'
    ];
  }

  return defaults;
}

export function DynamicChatPanel({
  isOpen,
  onClose,
  onModuleSelect,
  explorationContext
}: DynamicChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: 'user' | 'system';
    content: string;
  }>>([]);

  // Get suggested modules
  const suggestedModuleIds = getSuggestedModules(
    explorationContext?.currentModuleId,
    explorationContext?.explorationPath,
    inputValue
  );

  const suggestedModules = suggestedModuleIds
    .map(id => MODULES.find(m => m.id === id))
    .filter(Boolean) as typeof MODULES;

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && conversationHistory.length === 0) {
      const greeting = explorationContext?.currentModuleTitle
        ? `I see you have been exploring ${explorationContext.currentModuleTitle}. What would you like to understand next?`
        : `What aspect of Recoverlution would you like to understand better?`;
      
      setConversationHistory([{
        type: 'system',
        content: greeting
      }]);
    }
  }, [isOpen, explorationContext, conversationHistory.length]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setConversationHistory(prev => [...prev, {
      type: 'user',
      content: inputValue
    }]);

    // Add system response
    setTimeout(() => {
      setConversationHistory(prev => [...prev, {
        type: 'system',
        content: 'Here are some modules that address what you are asking about. Click any to explore.'
      }]);
    }, 600);

    setInputValue('');
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
            Navigate your way
          </h3>
        </div>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#64748B',
            fontWeight: 500
          }}
        >
          Ask questions or explore suggested modules
        </p>
      </div>

      {/* Conversation History (scrollable) */}
      <div className="flex-1 space-y-3 mb-6 overflow-y-auto max-h-60">
        {conversationHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                msg.type === 'user'
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

      {/* Suggested Modules (always 3) */}
      <div className="space-y-2 mb-4">
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}
        >
          Explore these next
        </div>
        {suggestedModules.map((module, idx) => {
          const category = CATEGORIES.find(c => c.id === module.categoryId);
          return (
            <motion.button
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: category?.color }}
                />
                <div className="flex-1">
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: category?.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.125rem'
                    }}
                  >
                    {category?.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      marginBottom: '0.125rem'
                    }}
                    className="group-hover:text-indigo-700"
                  >
                    {module.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#64748B',
                      fontWeight: 500,
                      lineHeight: 1.3
                    }}
                  >
                    {module.subtitle}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Text Input */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Or ask about something specific..."
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputValue.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}