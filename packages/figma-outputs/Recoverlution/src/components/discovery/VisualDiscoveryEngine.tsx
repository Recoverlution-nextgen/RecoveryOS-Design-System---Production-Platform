/**
 * VISUAL DISCOVERY ENGINE
 * 
 * THE REAL THING - Not a chatbot, visual exploration
 * 
 * Philosophy:
 * - They discover meaning, we don't prescribe it
 * - Exploratory language, not diagnostic
 * - Solution-forward, not sales-y
 * - Feels native to infiniteK
 * 
 * Architecture:
 * - LEFT: Visual exploration (category grid → modules → onwards paths)
 * - RIGHT: Rich module content
 * 
 * States:
 * 1. Category Grid (10 exploration zones)
 * 2. Module Tiles (within selected category)
 * 3. Onwards Paths (navigation from active module)
 * 4. Chat (qualification flow)
 * 
 * Created: December 10, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight,
  ChevronLeft,
  Eye,
  Sparkles,
  Search,
  X
} from 'lucide-react';
import { DualPerspectiveModule } from './modules/DualPerspectiveModule';
import { RevealTileModule } from './modules/RevealTileModule';
import { JourneyWalkthroughModule } from './modules/JourneyWalkthroughModule';
import { EvidenceShowcaseModule } from './modules/EvidenceShowcaseModule';
import { DeepDiveModule } from './modules/DeepDiveModule';
import { OrchestrationVisModule } from './modules/OrchestrationVisModule';
import { SubscriptionFlowModule } from './modules/SubscriptionFlowModule';
import { FeatureDeepDiveModule } from './modules/FeatureDeepDiveModule';
import { FeatureShowcaseModule } from './modules/FeatureShowcaseModule';
import { DiscoveryChatPanel } from './DiscoveryChatPanel';
import { ChatVisualization } from './ChatVisualization';
import { DynamicChatPanel } from './DynamicChatPanel';
import { HelpUsHelpYouModule } from './modules/HelpUsHelpYouModule';
import { DiscoveryEngineFooter } from './DiscoveryEngineFooter';
import { CATEGORIES, MODULES, ONWARDS_PATHS } from './discoveryData';
import type { ExplorationCategory, ExplorationModule, OnwardsPath } from './discoveryData';

interface VisualDiscoveryEngineProps {
  onSignupComplete?: (userId: string, email: string) => void;
}

// Qualification questions for chat flow
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

export function VisualDiscoveryEngine({ onSignupComplete }: VisualDiscoveryEngineProps) {
  // State management
  const [viewState, setViewState] = useState<'categories' | 'modules' | 'exploring' | 'chat'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [chatStep, setChatStep] = useState(0); // Track qualification flow step
  
  // Get filtered modules for selected category
  const categoryModules = selectedCategory 
    ? MODULES.filter(m => m.categoryId === selectedCategory)
    : [];
  
  // Search functionality
  const searchResults = searchQuery.trim().length > 0
    ? MODULES.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        CATEGORIES.find(c => c.id === m.categoryId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const hasSearchResults = searchResults.length > 0;

  // Get onwards paths for active module
  // First check if module has exploreNext (hierarchical children), then fall back to ONWARDS_PATHS
  const activeModuleData = activeModuleId ? MODULES.find(m => m.id === activeModuleId) : null;
  const onwardsPaths = activeModuleId 
    ? (activeModuleData?.exploreNext 
        ? activeModuleData.exploreNext.map((childId, idx) => {
            const childModule = MODULES.find(m => m.id === childId);
            return {
              id: `explore-${idx}`,
              label: childModule?.title || '',
              targetModuleId: childId
            };
          })
        : ONWARDS_PATHS[activeModuleId] || []
      )
    : [];

  // Get exploration context for chat
  const activeModule = activeModuleId ? MODULES.find(m => m.id === activeModuleId) : null;
  const activeCategoryName = selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : undefined;

  const explorationContext = {
    currentModuleId: activeModuleId || undefined,
    currentModuleTitle: activeModule?.title,
    categoryName: activeCategoryName
  };

  // Handlers
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setViewState('modules');
    setActiveModuleId(null);
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setViewState('exploring');
  };

  const handleOnwardsClick = (targetModuleId: string) => {
    setActiveModuleId(targetModuleId);
    // Update category if needed
    const targetModule = MODULES.find(m => m.id === targetModuleId);
    if (targetModule && targetModule.categoryId !== selectedCategory) {
      setSelectedCategory(targetModule.categoryId);
    }
  };

  const handleBackToCategories = () => {
    setViewState('categories');
    setSelectedCategory(null);
    setActiveModuleId(null);
  };

  const handleBackToModules = () => {
    setViewState('modules');
    setActiveModuleId(null);
  };

  const handleChatOpen = () => {
    setViewState('chat');
  };

  const handleChatClose = () => {
    setViewState('exploring');
    setChatMessages([]);
    setChatStep(0);
  };

  const handleModuleNavigate = (moduleId: string) => {
    // Special handling for helpUsHelpYou - it's not a regular module
    if (moduleId === 'helpUsHelpYou') {
      // For now, navigate to a relevant module or show Help Us Help You component
      // You could expand this to show the HelpUsHelpYouModule in the right panel
      setActiveModuleId(moduleId);
      setViewState('exploring');
      return;
    }

    // Navigate to the module
    const targetModule = MODULES.find(m => m.id === moduleId);
    if (targetModule) {
      setSelectedCategory(targetModule.categoryId);
      setActiveModuleId(moduleId);
      setViewState('exploring');
    }
  };

  const handlePricingNavigation = (pricingTier: 'foundation' | 'professional' | 'enterprise') => {
    // Map tier to module ID
    const moduleId = `pricing-${pricingTier}`;
    const targetModule = MODULES.find(m => m.id === moduleId);
    
    if (targetModule) {
      setSelectedCategory(targetModule.categoryId);
      setActiveModuleId(moduleId);
      setViewState('exploring');
    }
  };
  
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Header - LEFT ALIGNED PATTERN (alternates with sections before/after) */}
        <div className="section-header-left">
          <motion.div
            className="headline-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-eyebrow">
              <Eye size={14} style={{ strokeWidth: 2.5 }} />
              <span>EXPLORE THE SYSTEM</span>
            </div>
            <h2 className="section-headline-therapy">
              Discovery yours.<br />
              <span className="accent">Journey infinite.</span>
            </h2>
          </motion.div>

          <motion.div
            className="subheading-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="section-subheading">
              Every practitioner walks a unique path. Every feature meets you where you are. Choose what matters most to explore how the system works.
            </p>
          </motion.div>
        </div>

        {/* Main Container with Background */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            borderRadius: '0px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(62, 43, 184, 0.12)'
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <img 
              src="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/explore.avif"
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text legibility */}
            <div 
              className="absolute inset-0" 
              style={{ 
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)',
                zIndex: 2
              }}
            />
          </div>

          {/* Shimmer Animation Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
              animation: 'shimmer-glass 12s ease-in-out infinite',
              borderRadius: '0px',
              zIndex: 100
            }}
          />

          {/* Content Grid */}
          <div className="relative grid md:grid-cols-2 gap-0" style={{ zIndex: 10 }}>
            
            {/* LEFT PANEL: Visual Discovery */}
            <div className="p-8 md:p-12 border-r border-white/10">
              
              <AnimatePresence mode="wait">
                
                {/* STATE 1: Category Grid */}
                {viewState === 'categories' && (
                  <motion.div
                    key="categories"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
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
                      Where do you want to begin?
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontWeight: 500,
                        marginBottom: '1.5rem'
                      }}
                    >
                      Choose an area to explore. Each one reveals depth you can navigate at your own pace.
                    </p>

                    {/* Search Bar */}
                    <div className="relative mb-4">
                      <Search 
                        size={16} 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search modules..."
                        className="w-full pl-10 pr-10 py-2.5 border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                        style={{ borderRadius: '0px' }}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    {/* Search Results */}
                    {searchQuery.trim().length > 0 ? (
                      <div>
                        <div className="text-xs font-semibold mb-3 uppercase tracking-wide"
                          style={{
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}
                        >
                          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {searchResults.map((module, index) => {
                            const category = CATEGORIES.find(c => c.id === module.categoryId);
                            return (
                              <motion.button
                                key={module.id}
                                onClick={() => {
                                  setSearchQuery('');
                                  setSelectedCategory(module.categoryId);
                                  handleModuleClick(module.id);
                                }}
                                className="w-full group relative text-left overflow-hidden"
                                style={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(10px)',
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                  borderRadius: '0px',
                                  padding: '1rem',
                                  transition: 'all 0.3s ease'
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                  y: -2
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {/* Hover gradient effect */}
                                <div 
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  style={{
                                    background: `linear-gradient(135deg, ${category?.color}20 0%, transparent 100%)`
                                  }}
                                />
                                
                                <div className="flex items-start gap-3 relative">
                                  <div
                                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                    style={{
                                      background: category?.color
                                    }}
                                  />
                                  <div className="flex-1">
                                    <div
                                      style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: category?.color,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '0.25rem'
                                      }}
                                    >
                                      {category?.name}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 600,
                                        fontSize: '0.9375rem',
                                        color: '#FFFFFF',
                                        marginBottom: '0.25rem'
                                      }}
                                    >
                                      {module.title}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: '0.8125rem',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: 400,
                                        lineHeight: 1.4
                                      }}
                                    >
                                      {module.subtitle}
                                    </div>
                                  </div>
                                  <ArrowRight 
                                    size={14} 
                                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2"
                                    style={{ color: category?.color }}
                                  />
                                </div>
                              </motion.button>
                            );
                          })}
                          {searchResults.length === 0 && (
                            <div className="text-center py-8 text-sm"
                              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                            >
                              No modules found matching &quot;{searchQuery}&quot;
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {CATEGORIES.map((category, index) => {
                          const Icon = category.icon;
                          return (
                            <motion.button
                              key={category.id}
                              onClick={() => handleCategoryClick(category.id)}
                              className="group relative text-left overflow-hidden"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '0px',
                                padding: '1rem',
                                transition: 'all 0.3s ease',
                                minHeight: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                              }}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 + (index * 0.05) }}
                              whileHover={{
                                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                y: -2
                              }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Hover gradient effect */}
                              <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  background: `linear-gradient(135deg, ${category.color}20 0%, transparent 100%)`
                                }}
                              />
                              
                              {/* Icon */}
                              <div 
                                className="w-10 h-10 flex items-center justify-center flex-shrink-0 relative z-10"
                                style={{ 
                                  backgroundColor: `${category.color}25`,
                                  borderRadius: '0px',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Icon size={18} style={{ color: category.color, strokeWidth: 2.5 }} />
                              </div>
                              
                              {/* Title */}
                              <h4 
                                className="relative z-10"
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontWeight: 700,
                                  fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)',
                                  letterSpacing: '-0.01em',
                                  color: '#FFFFFF',
                                  lineHeight: 1.2
                                }}
                              >
                                {category.name}
                              </h4>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STATE 2: Module Tiles */}
                {viewState === 'modules' && selectedCategory && (
                  <motion.div
                    key="modules"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Back button */}
                    <button
                      onClick={handleBackToCategories}
                      className="flex items-center gap-2 mb-6 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      <ChevronLeft size={16} />
                      <span>Back to all areas</span>
                    </button>

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
                      {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontWeight: 500,
                        marginBottom: '2rem'
                      }}
                    >
                      {CATEGORIES.find(c => c.id === selectedCategory)?.description}
                    </p>

                    <div className="space-y-3">
                      {categoryModules.map((module, index) => {
                        const category = CATEGORIES.find(c => c.id === module.categoryId);
                        return (
                          <motion.button
                            key={module.id}
                            onClick={() => handleModuleClick(module.id)}
                            className="w-full group relative text-left overflow-hidden"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '0px',
                              padding: '1rem',
                              transition: 'all 0.3s ease'
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            whileHover={{
                              backgroundColor: 'rgba(255, 255, 255, 0.12)',
                              y: -2
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Hover gradient effect */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${category?.color}20 0%, transparent 100%)`
                              }}
                            />
                            
                            <div className="relative">
                              <div
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontWeight: 600,
                                  fontSize: '0.9375rem',
                                  color: '#FFFFFF',
                                  marginBottom: '0.25rem'
                                }}
                              >
                                {module.title}
                              </div>
                              
                              <div
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  fontWeight: 400,
                                  lineHeight: 1.4
                                }}
                              >
                                {module.subtitle}
                              </div>

                              <ArrowRight 
                                size={14} 
                                className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: category?.color }}
                              />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STATE 3: Onwards Paths */}
                {viewState === 'exploring' && activeModuleId && (
                  <motion.div
                    key="exploring"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Back button */}
                    <button
                      onClick={handleBackToModules}
                      className="flex items-center gap-2 mb-6 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      <ChevronLeft size={16} />
                      <span>Back to {CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
                    </button>

                    {/* Current module indicator */}
                    <div className="mb-8 pb-6 border-b border-slate-200/50">
                      <div className="text-xs text-indigo-600 font-semibold mb-2 uppercase tracking-wide">
                        Currently Exploring
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          letterSpacing: '-0.01em',
                          color: '#0A192F'
                        }}
                      >
                        {MODULES.find(m => m.id === activeModuleId)?.title}
                      </h3>
                    </div>

                    {/* Onwards paths */}
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          letterSpacing: '0.05em',
                          color: '#64748B',
                          textTransform: 'uppercase',
                          marginBottom: '1rem'
                        }}
                      >
                        Explore Next
                      </h4>

                      <div className="space-y-3">
                        {onwardsPaths.map((path, index) => {
                          const targetModule = MODULES.find(m => m.id === path.targetModuleId);
                          const category = CATEGORIES.find(c => c.id === targetModule?.categoryId);
                          
                          return (
                            <motion.button
                              key={path.id}
                              onClick={() => handleOnwardsClick(path.targetModuleId)}
                              className="w-full group relative text-left"
                              style={{
                                background: 'rgba(255, 255, 255, 0.40)',
                                border: '1px solid rgba(0, 0, 0, 0.08)',
                                borderRadius: '0px',
                                padding: '1rem',
                                transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)'
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.08 }}
                              whileHover={{
                                scale: 1.02,
                                borderColor: category?.color + '60',
                                background: `linear-gradient(135deg, ${category?.color}15, ${category?.color}08)`
                              }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div
                                style={{
                                  fontSize: '0.9375rem',
                                  fontWeight: 600,
                                  color: '#1E293B',
                                  marginBottom: '0.25rem'
                                }}
                              >
                                {path.label}
                              </div>
                              
                              {targetModule && (
                                <div
                                  style={{
                                    fontSize: '0.75rem',
                                    color: '#64748B',
                                    fontWeight: 500
                                  }}
                                >
                                  {targetModule.subtitle}
                                </div>
                              )}

                              <ArrowRight 
                                size={14} 
                                className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: category?.color }}
                              />
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE 4: Chat */}
                {viewState === 'chat' && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Back button */}
                    <button
                      onClick={handleChatClose}
                      className="flex items-center gap-2 mb-6 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      <ChevronLeft size={16} />
                      <span>Back to exploring</span>
                    </button>

                    <DynamicChatPanel
                      isOpen={true}
                      onClose={handleChatClose}
                      onModuleSelect={(moduleId) => {
                        setActiveModuleId(moduleId);
                        setViewState('exploring');
                        const targetModule = MODULES.find(m => m.id === moduleId);
                        if (targetModule) {
                          setSelectedCategory(targetModule.categoryId);
                        }
                      }}
                      explorationContext={explorationContext}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PERSISTENT FOOTER - CONVERSION LAYER */}
              <DiscoveryEngineFooter 
                onChatOpen={handleChatOpen}
                viewState={viewState}
                onModuleNavigate={handleModuleNavigate}
                onPricingNavigation={handlePricingNavigation}
              />
            </div>

            {/* RIGHT PANEL: Module Content or Category Grid */}
            <div 
              className="p-8 md:p-12 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.25) 0%, rgba(87, 57, 251, 0.15) 100%)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)'
              }}
            >
              <AnimatePresence mode="wait">
                {/* INVITATION STATE - When viewing categories */}
                {viewState === 'categories' && (
                  <motion.div
                    key="invitation"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="h-full flex flex-col justify-center"
                    style={{ minHeight: '500px' }}
                  >
                    {/* Ambient gradient orb */}
                    <div 
                      className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(64, 224, 208, 0.4) 0%, rgba(87, 57, 251, 0.2) 50%, transparent 100%)',
                        animation: 'pulse-glow 8s ease-in-out infinite'
                      }}
                    />

                    <div className="relative z-10 max-w-lg">
                      {/* Eyebrow */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-6"
                      >
                        <div 
                          className="inline-flex items-center gap-2 px-4 py-2"
                          style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '0px'
                          }}
                        >
                          <Sparkles size={14} style={{ color: '#40E0D0', strokeWidth: 2.5 }} />
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#40E0D0'
                            }}
                          >
                            Welcome to Discovery
                          </span>
                        </div>
                      </motion.div>

                      {/* Main Headline */}
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.1,
                          color: '#FFFFFF',
                          marginBottom: '1.5rem',
                          textShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        Every path is<br />
                        <span style={{ color: '#40E0D0' }}>infinitely yours.</span>
                      </motion.h2>

                      {/* Body Copy */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-4"
                      >
                        <p
                          style={{
                            fontSize: '1.125rem',
                            lineHeight: 1.6,
                            color: 'rgba(255, 255, 255, 0.85)',
                            fontWeight: 500
                          }}
                        >
                          A system built around your questions.
                        </p>
                        <p
                          style={{
                            fontSize: '1.125rem',
                            lineHeight: 1.6,
                            color: 'rgba(255, 255, 255, 0.85)',
                            fontWeight: 500
                          }}
                        >
                          Structure that moves with you, at your pace, revealing depth as you explore.
                        </p>
                      </motion.div>

                      {/* Elegant Divider */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="my-8 h-px origin-left"
                        style={{
                          background: 'linear-gradient(90deg, rgba(64, 224, 208, 0.5) 0%, rgba(87, 57, 251, 0.3) 50%, transparent 100%)'
                        }}
                      />

                      {/* Closing Invitation */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1 }}
                        style={{
                          fontSize: '0.9375rem',
                          lineHeight: 1.6,
                          color: 'rgba(255, 255, 255, 0.65)',
                          fontWeight: 500,
                          fontStyle: 'italic'
                        }}
                      >
                        Choose where to begin. Everything connects from there.
                      </motion.p>

                      {/* Subtle animated accent */}
                      <motion.div
                        className="mt-12 flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: '#40E0D0',
                            boxShadow: '0 0 20px rgba(64, 224, 208, 0.6)',
                            animation: 'pulse-dot 2s ease-in-out infinite'
                          }}
                        />
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: 'rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          Select an area on the left
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* CATEGORY HERO - When viewing module tiles */}
                {viewState === 'modules' && selectedCategory && (
                  <CategoryHero categoryId={selectedCategory} />
                )}

                {viewState === 'exploring' && activeModuleId && (
                  <motion.div
                    key={activeModuleId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <ModuleContent moduleId={activeModuleId} onPricingNavigation={handlePricingNavigation} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Category Hero Component - Apple-grade value props for each category
function CategoryHero({ categoryId }: { categoryId: string }) {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryModules = MODULES.filter(m => m.categoryId === categoryId);
  
  if (!category) return null;

  const getCategoryHero = () => {
    // NEW OPTION C CATEGORIES
    if (categoryId === 'features') {
      return {
        headline: 'The tools.',
        subheadline: 'What you use. What they experience.',
        valueProp: 'STATE for morning check-ins. LUMA for evening reflection. NaviCues for moment-of-need guidance. Articles that teach. Practices that build. Journeys that structure. Every tool designed to extend your clinical framework into their daily life.',
        power: 'Nine features working as one. Not bolted together. Orchestrated. Each tool serves the whole. Every interaction informed by what came before.'
      };
    }

    if (categoryId === 'science') {
      return {
        headline: 'The research.',
        subheadline: 'Why any of this works.',
        valueProp: 'Not innovation for innovation sake. Every feature grounded in neuroscience, behavioral research, clinical evidence. The platform is not built on hope. It is built on what we know about how change happens.',
        power: 'Neuroplasticity. Therapeutic alliance. Circadian regulation. Memory consolidation. The science of transformation, delivered through technology.'
      };
    }

    if (categoryId === 'pillars') {
      return {
        headline: 'The framework.',
        subheadline: 'Six clinical pillars. One coherent system.',
        valueProp: 'Cognitive Reframing. Decision Mastery. Emotional Regulation. Identity Integration. Social Connectivity. Stress Resilience. Not modules. Not topics. The complete architecture of therapeutic change.',
        power: 'Every article maps to a pillar. Every practice builds capacity. Every journey sequences growth. The six pillars structure everything.'
      };
    }

    if (categoryId === 'continuity') {
      return {
        headline: 'The thread.',
        subheadline: 'The space between sessions is where recovery happens.',
        valueProp: 'You see them for one hour. They live recovery for 167. The gap between sessions is not empty space. It is where insight fades, patterns return, and progress stalls. Or where presence extends, support flows, and recovery deepens.',
        power: 'Continuity is not more sessions. It is your clinical framework traveling with them, morning to night, session to session, moment to moment.'
      };
    }

    if (categoryId === 'system') {
      return {
        headline: 'The architecture.',
        subheadline: 'How everything connects.',
        valueProp: 'STATE flows to LUMA. LUMA informs Momentum. NaviCues respond to patterns. The console shows you signal. The companion delivers structure. Not separate tools. One orchestrated system.',
        power: 'Integration with your EHR. Data flowing where you work. No silos. No exports. Seamless clinical workflow.'
      };
    }

    if (categoryId === 'intelligence') {
      return {
        headline: 'The engine.',
        subheadline: 'The system learns. You lead.',
        valueProp: 'Every interaction creates signal. Every pattern reveals insight. The platform does not replace your clinical judgment. It amplifies it with context you could never gather manually.',
        power: 'Pattern recognition that surfaces what matters. Adaptive prompts that meet them where they are. Intelligence in service of your expertise.'
      };
    }

    if (categoryId === 'practice') {
      return {
        headline: 'The workflow.',
        subheadline: 'Your work deserves better tools.',
        valueProp: 'Solo practitioners scaling depth. Group practices maintaining consistency. Treatment centers personalizing at scale. The platform adapts to how you work, whether you see 10 clients or 100.',
        power: 'Less time documenting. More time connecting. Sustainable caseloads. Recurring revenue. Your practice, transformed.'
      };
    }

    if (categoryId === 'evidence') {
      return {
        headline: 'The proof.',
        subheadline: 'The work you do creates patterns you can see.',
        valueProp: 'Progress is not a feeling. It is signal. Patterns emerging. Behaviors shifting. Regulation improving. The work creates data, and the data reveals the work.',
        power: 'Living charts that show what matters. Not dashboards. Not reports. Evidence that helps you see what is working and what needs to shift.'
      };
    }

    if (categoryId === 'foundation') {
      return {
        headline: 'The trust.',
        subheadline: 'Safety is not a feature. It is the foundation.',
        valueProp: 'Clinical boundaries by design. Privacy sealed. Risk protocols built in. Regulatory compliance met. Trauma-informed at every layer. The system creates safety without creating dependence.',
        power: 'They feel held. You stay informed. Clinical judgment remains yours. Always.'
      };
    }

    if (categoryId === 'start') {
      return {
        headline: 'The journey.',
        subheadline: 'Your first week. Their first experience.',
        valueProp: 'Onboarding is not paperwork. It is partnership. You set up your practice. They discover their path. Within days, patterns begin emerging. Within weeks, transformation becomes visible.',
        power: 'Implementation support. Training included. Quick wins from day one. We help you launch successfully.'
      };
    }

    // Default
    return {
      headline: category.name,
      subheadline: category.description,
      valueProp: '',
      power: ''
    };
  };

  const hero = getCategoryHero();

  return (
    <motion.div
      key={`hero-${categoryId}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="h-full flex flex-col justify-center"
      style={{ minHeight: '500px' }}
    >
      {/* Ambient gradient orb */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${category.color}40 0%, ${category.color}20 50%, transparent 100%)`,
          animation: 'pulse-glow 8s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-lg">
        {/* Category eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div 
            className="inline-flex items-center gap-2 px-4 py-2"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '0px'
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: category.color }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: category.color
              }}
            >
              {category.name}
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#FFFFFF',
            marginBottom: '1.5rem',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
          }}
        >
          {hero.headline}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.4,
            marginBottom: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}
        >
          {hero.subheadline}
        </motion.p>

        {/* Value prop */}
        {hero.valueProp && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontSize: '1.0625rem',
              color: 'rgba(255, 255, 255, 0.70)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontWeight: 500
            }}
          >
            {hero.valueProp}
          </motion.p>
        )}

        {/* Power statement */}
        {hero.power && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="p-4"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderLeft: `3px solid ${category.color}`,
              borderRadius: '0px'
            }}
          >
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.6,
                fontWeight: 500,
                fontStyle: 'italic'
              }}
            >
              {hero.power}
            </p>
          </motion.div>
        )}

        {/* Elegant divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="mt-8 h-px origin-left"
          style={{
            background: `linear-gradient(90deg, ${category.color}60 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`
          }}
        />

        {/* Closing invitation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.65)',
            fontWeight: 500,
            fontStyle: 'italic',
            marginTop: '1.5rem'
          }}
        >
          Select a module on the left to explore deeper.
        </motion.p>

        {/* Subtle animated accent */}
        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div 
            className="w-2 h-2 rounded-full"
            style={{
              background: category.color,
              boxShadow: `0 0 20px ${category.color}60`,
              animation: 'pulse-dot 2s ease-in-out infinite'
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)'
            }}
          >
            {categoryModules.length} modules to explore
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Temporary: Module content placeholder
function ModuleContent({ moduleId, onPricingNavigation }: { moduleId: string; onPricingNavigation?: (tier: 'foundation' | 'professional' | 'enterprise') => void }) {
  const module = MODULES.find(m => m.id === moduleId);
  const category = CATEGORIES.find(c => c.id === module?.categoryId);
  
  // Special handling for helpUsHelpYou
  if (moduleId === 'helpUsHelpYou') {
    return <HelpUsHelpYouModule moduleId={moduleId} onNavigateToPricing={onPricingNavigation} />;
  }
  
  if (!module) return null;

  // Render specific module type components
  if (module.type === 'DUAL_PERSPECTIVE') {
    return <DualPerspectiveModule moduleId={moduleId} />;
  }

  if (module.type === 'REVEAL_TILE') {
    return <RevealTileModule moduleId={moduleId} />;
  }

  if (module.type === 'JOURNEY_WALKTHROUGH') {
    return <JourneyWalkthroughModule moduleId={moduleId} />;
  }

  if (module.type === 'EVIDENCE_SHOWCASE') {
    return <EvidenceShowcaseModule moduleId={moduleId} />;
  }

  if (module.type === 'DEEP_DIVE') {
    return <DeepDiveModule moduleId={moduleId} />;
  }

  if (module.type === 'ORCHESTRATION_VIS') {
    return <OrchestrationVisModule moduleId={moduleId} />;
  }

  if (module.type === 'SUBSCRIPTION_FLOW') {
    return <SubscriptionFlowModule moduleId={moduleId} />;
  }

  if (module.type === 'FEATURE_DEEP_DIVE') {
    return <FeatureDeepDiveModule moduleId={moduleId} />;
  }

  if (module.type === 'FEATURE_SHOWCASE') {
    return <FeatureShowcaseModule moduleId={moduleId} />;
  }

  // Fallback for other module types (placeholder)
  return (
    <div
      className="p-6"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: '0px'
      }}
    >
      <div 
        style={{
          fontSize: '0.8125rem',
          color: 'rgba(255, 255, 255, 0.50)',
          marginBottom: '0.75rem',
          fontWeight: 500
        }}
      >
        <strong style={{ color: 'rgba(255, 255, 255, 0.70)' }}>Module Type:</strong> {module.type}
      </div>
      <div 
        style={{
          fontSize: '0.8125rem',
          color: 'rgba(255, 255, 255, 0.50)',
          fontWeight: 500
        }}
      >
        <strong style={{ color: 'rgba(255, 255, 255, 0.70)' }}>Module ID:</strong>{' '}
        <code 
          className="text-xs px-2 py-1"
          style={{
            background: 'rgba(0, 0, 0, 0.30)',
            borderRadius: '0px',
            color: 'rgba(255, 255, 255, 0.60)'
          }}
        >
          {module.id}
        </code>
      </div>
      <p 
        style={{
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.40)',
          marginTop: '1rem',
          fontWeight: 500,
          fontStyle: 'italic'
        }}
      >
        Full module content will be rendered here. This is where the rich, interactive experiences live.
      </p>
    </div>
  );
}