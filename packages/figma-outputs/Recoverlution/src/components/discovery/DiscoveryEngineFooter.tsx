/**
 * DISCOVERY ENGINE FOOTER
 * 
 * Persistent conversion layer across all discovery states
 * Shows on categories, modules, and exploring views
 * 
 * Contains:
 * 1. Chat ("Want to go deeper?")
 * 2. Help Us Help You status
 * 3. Pricing/Checkout quick access
 * 
 * Created: December 11, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, CheckCircle2, ArrowRight, Layers, Building2, X } from 'lucide-react';
import { SubscriptionFlowModule } from './modules/SubscriptionFlowModule';

interface DiscoveryEngineFooterProps {
  onChatOpen: () => void;
  helpUsHelpYouComplete?: boolean;
  viewState: 'categories' | 'modules' | 'exploring' | 'chat';
  onModuleNavigate?: (moduleId: string) => void;
  onPricingNavigation?: (tier: 'foundation' | 'professional' | 'enterprise') => void;
}

export function DiscoveryEngineFooter({ 
  onChatOpen, 
  helpUsHelpYouComplete = false,
  viewState,
  onModuleNavigate,
  onPricingNavigation
}: DiscoveryEngineFooterProps) {
  const [showPricing, setShowPricing] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'foundation' | 'professional' | 'enterprise' | null>(null);

  // Don't show footer in chat state
  if (viewState === 'chat') return null;

  return (
    <>
      {/* Persistent Footer - 3 Conversion Options */}
      <motion.div
        className="mt-8 pt-6 border-t border-white/10 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Option 1: Chat */}
        <button
          className="w-full group flex items-center justify-between p-4 relative overflow-hidden transition-all"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0px'
          }}
          onClick={onChatOpen}
        >
          {/* Hover gradient effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.2) 0%, transparent 100%)'
            }}
          />
          
          <div className="flex items-center gap-3 relative z-10">
            <MessageCircle size={18} style={{ color: '#5739FB' }} />
            <div className="text-left">
              <div 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                Want to go deeper?
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500
                }}
              >
                Start a conversation
              </div>
            </div>
          </div>
          <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform relative z-10" style={{ color: '#5739FB' }} />
        </button>

        {/* Option 2: Help Us Help You */}
        <button
          className="w-full group flex items-center justify-between p-4 relative overflow-hidden transition-all"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0px'
          }}
          onClick={() => {
            // Navigate to Help Us Help You module
            // This would be handled by parent component
            if (onModuleNavigate) {
              onModuleNavigate('helpUsHelpYou');
            }
          }}
        >
          {/* Hover gradient effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.2) 0%, transparent 100%)'
            }}
          />
          
          <div className="flex items-center gap-3 relative z-10">
            {helpUsHelpYouComplete ? (
              <CheckCircle2 size={18} style={{ color: '#40E0D0' }} />
            ) : (
              <Sparkles size={18} style={{ color: '#40E0D0' }} />
            )}
            <div className="text-left">
              <div 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                {helpUsHelpYouComplete ? 'Profile complete' : 'Help us help you'}
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500
                }}
              >
                {helpUsHelpYouComplete ? 'View your profile' : '3 quick questions to personalize'}
              </div>
            </div>
          </div>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform relative z-10" style={{ color: '#40E0D0' }} />
        </button>

        {/* Option 3: Ready to Subscribe */}
        <button
          className="w-full group flex items-center justify-between p-4 relative overflow-hidden transition-all"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0px'
          }}
          onClick={() => setShowPricing(!showPricing)}
        >
          {/* Hover gradient effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, transparent 100%)'
            }}
          />
          
          <div className="flex items-center gap-3 relative z-10">
            <Sparkles size={18} style={{ color: '#8B5CF6' }} />
            <div className="text-left">
              <div 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                Ready to transform?
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500
                }}
              >
                View pricing and subscribe
              </div>
            </div>
          </div>
          <ArrowRight 
            size={16} 
            className={`transition-transform relative z-10 ${showPricing ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
            style={{ color: '#8B5CF6' }}
          />
        </button>

        {/* Expandable Pricing Section */}
        <AnimatePresence>
          {showPricing && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pt-4 space-y-3">
                {/* Quick Tier Buttons */}
                {!selectedTier ? (
                  <>
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                      Choose your plan
                    </div>
                    
                    <button
                      onClick={() => setSelectedTier('foundation')}
                      className="w-full group flex items-center justify-between p-3 bg-white border border-slate-200 hover:border-violet-400 hover:bg-violet-50/50 transition-all"
                      style={{ borderRadius: '0px' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-violet-100 flex items-center justify-center" style={{ borderRadius: '0px' }}>
                          <Layers size={16} className="text-violet-600" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-slate-900">Foundation</div>
                          <div className="text-xs text-slate-600">£99/month</div>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                      onClick={() => setSelectedTier('professional')}
                      className="w-full group flex items-center justify-between p-3 bg-white border-2 border-violet-400 hover:bg-violet-50 transition-all relative"
                      style={{ borderRadius: '0px' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-violet-600 flex items-center justify-center" style={{ borderRadius: '0px' }}>
                          <Sparkles size={16} className="text-white" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-slate-900">Professional</div>
                          <div className="text-xs text-violet-600">£199/month</div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 text-xs font-bold text-violet-600 uppercase tracking-wide">
                        Popular
                      </div>
                      <ArrowRight size={14} className="text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                      onClick={() => setSelectedTier('enterprise')}
                      className="w-full group flex items-center justify-between p-3 bg-white border border-slate-200 hover:border-violet-400 hover:bg-violet-50/50 transition-all"
                      style={{ borderRadius: '0px' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 flex items-center justify-center" style={{ borderRadius: '0px' }}>
                          <Building2 size={16} className="text-slate-600" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-slate-900">Enterprise</div>
                          <div className="text-xs text-slate-600">Custom pricing</div>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </>
                ) : (
                  /* Selected Tier - Show explore option */
                  <div className="bg-white border border-slate-200 p-4" style={{ borderRadius: '0px' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-1">
                          Selected Plan
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {selectedTier === 'foundation' && 'Foundation'}
                          {selectedTier === 'professional' && 'Professional'}
                          {selectedTier === 'enterprise' && 'Enterprise'}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTier(null)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="text-xs text-violet-600 font-semibold mb-4">
                      {selectedTier === 'foundation' && '£99/month • Complete platform access'}
                      {selectedTier === 'professional' && '£199/month • Complete control'}
                      {selectedTier === 'enterprise' && 'Custom pricing • Institutional scale'}
                    </div>

                    {/* Explore Plan Button */}
                    <button
                      onClick={() => {
                        if (onModuleNavigate && onPricingNavigation) {
                          const moduleId = selectedTier === 'foundation' 
                            ? 'pricing-foundation' 
                            : selectedTier === 'professional'
                            ? 'pricing-professional'
                            : 'pricing-enterprise';
                          onModuleNavigate(moduleId);
                          onPricingNavigation(selectedTier);
                          setShowPricing(false);
                          setSelectedTier(null);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white transition-all group"
                      style={{ borderRadius: '0px' }}
                    >
                      <span className="text-xs font-semibold">Explore This Plan</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}