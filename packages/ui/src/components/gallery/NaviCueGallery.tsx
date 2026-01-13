import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NaviCueGallery.css';

export type NaviCueCategory = 'moment' | 'grounding' | 'reflection' | 'connection' | 'toolkit';
export type Lens = 'individual' | 'professional' | 'organisation';

export interface NaviCue {
  id: string;
  name: string;
  category: NaviCueCategory;
  description: {
    individual: string;
    professional: string;
    organisation: string;
  };
  contract: {
    individual: string;
    professional: string;
    organisation: string;
  };
  duration: string;
  icon: string;
  color: string;
  featured?: boolean;
}

export interface NaviCueGalleryProps {
  cues?: NaviCue[];
  selectedCategory?: NaviCueCategory | 'all';
  lens?: Lens;
  onLaunch?: (cueId: string) => void;
  onCategoryChange?: (category: NaviCueCategory | 'all') => void;
  className?: string;
}

const DEFAULT_CUES: NaviCue[] = [
  {
    id: 'breathe-now',
    name: 'Breathe Now',
    category: 'grounding',
    description: {
      individual: 'Quick breathing exercise to center yourself',
      professional: 'Guided breathing for client stabilization',
      organisation: 'Standardized grounding protocol',
    },
    contract: {
      individual: '2 minutes → calmer state',
      professional: 'Assign to client → tracked completion',
      organisation: 'Deploy to cohort → usage metrics',
    },
    duration: '2 min',
    icon: '🫁',
    color: '#3b82f6',
    featured: true,
  },
  {
    id: 'mood-check',
    name: 'Mood Check',
    category: 'moment',
    description: {
      individual: 'Quick emotional temperature reading',
      professional: 'Client self-report capture',
      organisation: 'Standardized mood tracking',
    },
    contract: {
      individual: '30 seconds → logged state',
      professional: 'Assign check-in → timestamped data',
      organisation: 'Deploy pulse → aggregated insights',
    },
    duration: '30 sec',
    icon: '🎭',
    color: '#8b5cf6',
    featured: true,
  },
  {
    id: 'gratitude-note',
    name: 'Gratitude Note',
    category: 'reflection',
    description: {
      individual: 'Capture something good from today',
      professional: 'Positive psychology micro-intervention',
      organisation: 'Evidence-based gratitude practice',
    },
    contract: {
      individual: '1 minute → saved moment',
      professional: 'Assign practice → completed proof',
      organisation: 'Deploy intervention → completion rate',
    },
    duration: '1 min',
    icon: '✨',
    color: '#f59e0b',
  },
  {
    id: 'five-senses',
    name: 'Five Senses',
    category: 'grounding',
    description: {
      individual: 'Ground through what you can sense right now',
      professional: 'Sensory grounding for dissociation',
      organisation: 'Evidence-based grounding technique',
    },
    contract: {
      individual: '3 minutes → grounded state',
      professional: 'Assign technique → tracked use',
      organisation: 'Deploy protocol → efficacy data',
    },
    duration: '3 min',
    icon: '👁️',
    color: '#10b981',
  },
  {
    id: 'worry-box',
    name: 'Worry Box',
    category: 'reflection',
    description: {
      individual: 'Set aside a worry for later review',
      professional: 'Anxiety management micro-tool',
      organisation: 'Standardized worry postponement',
    },
    contract: {
      individual: '2 minutes → contained worry',
      professional: 'Assign technique → logged concern',
      organisation: 'Deploy tool → usage patterns',
    },
    duration: '2 min',
    icon: '📦',
    color: '#ef4444',
  },
  {
    id: 'safe-person',
    name: 'Safe Person',
    category: 'connection',
    description: {
      individual: 'Quick message to someone you trust',
      professional: 'Support network activation',
      organisation: 'Crisis prevention via connection',
    },
    contract: {
      individual: '1 minute → sent message',
      professional: 'Assign outreach → contact logged',
      organisation: 'Deploy connection → engagement rate',
    },
    duration: '1 min',
    icon: '🤝',
    color: '#ec4899',
  },
  {
    id: 'values-compass',
    name: 'Values Compass',
    category: 'reflection',
    description: {
      individual: 'Check if current action aligns with your values',
      professional: 'Values clarification micro-exercise',
      organisation: 'Values-based decision support',
    },
    contract: {
      individual: '2 minutes → clarity check',
      professional: 'Assign reflection → values data',
      organisation: 'Deploy exercise → alignment metrics',
    },
    duration: '2 min',
    icon: '🧭',
    color: '#06b6d4',
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    category: 'grounding',
    description: {
      individual: 'Quick check-in with physical sensations',
      professional: 'Somatic awareness building',
      organisation: 'Mindfulness-based intervention',
    },
    contract: {
      individual: '3 minutes → body awareness',
      professional: 'Assign practice → completion proof',
      organisation: 'Deploy protocol → adherence data',
    },
    duration: '3 min',
    icon: '🧘',
    color: '#14b8a6',
  },
];

const CATEGORIES = [
  { id: 'all' as const, label: 'All NaviCues', icon: '⭐' },
  { id: 'moment' as NaviCueCategory, label: 'Moment Checks', icon: '⚡' },
  { id: 'grounding' as NaviCueCategory, label: 'Grounding', icon: '🌱' },
  { id: 'reflection' as NaviCueCategory, label: 'Reflection', icon: '💭' },
  { id: 'connection' as NaviCueCategory, label: 'Connection', icon: '🔗' },
  { id: 'toolkit' as NaviCueCategory, label: 'Toolkit', icon: '🛠️' },
];

export const NaviCueGallery: React.FC<NaviCueGalleryProps> = ({
  cues = DEFAULT_CUES,
  selectedCategory = 'all',
  lens = 'individual',
  onLaunch,
  onCategoryChange,
  className = '',
}) => {
  const [expandedCue, setExpandedCue] = useState<string | null>(null);

  const filteredCues = selectedCategory === 'all'
    ? cues
    : cues.filter(cue => cue.category === selectedCategory);

  const featuredCues = filteredCues.filter(cue => cue.featured);
  const regularCues = filteredCues.filter(cue => !cue.featured);

  const handleLaunch = (cueId: string) => {
    if (onLaunch) {
      onLaunch(cueId);
    }
  };

  const handleCategoryClick = (categoryId: NaviCueCategory | 'all') => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const renderCueCard = (cue: NaviCue, featured: boolean = false) => {
    const isExpanded = expandedCue === cue.id;

    return (
      <motion.div
        key={cue.id}
        className={`navicue-card ${featured ? 'featured' : ''} ${isExpanded ? 'expanded' : ''}`}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="navicue-card__accent"
          style={{ backgroundColor: cue.color }}
        />

        <div className="navicue-card__header">
          <div className="navicue-card__icon">{cue.icon}</div>
          <div className="navicue-card__title-group">
            <h3 className="navicue-card__title">{cue.name}</h3>
            <span className="navicue-card__duration">{cue.duration}</span>
          </div>
        </div>

        <p className="navicue-card__description">
          {cue.description[lens]}
        </p>

        <div className="navicue-card__contract">
          <div className="contract-label">One-move contract:</div>
          <div className="contract-value">{cue.contract[lens]}</div>
        </div>

        <button
          className="navicue-card__details-toggle"
          onClick={() => setExpandedCue(isExpanded ? null : cue.id)}
        >
          {isExpanded ? 'Less info' : 'More info'}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="navicue-card__details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="details-section">
                <h4 className="details-heading">What happens</h4>
                <p className="details-text">
                  This NaviCue provides a structured micro-intervention designed for immediate use.
                  No setup required—just launch and complete.
                </p>
              </div>
              <div className="details-section">
                <h4 className="details-heading">What you get</h4>
                <p className="details-text">
                  A timestamped proof of completion, logged in your integrity trail.
                  This becomes part of your recoverable evidence.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="navicue-card__launch"
          onClick={() => handleLaunch(cue.id)}
          style={{ borderColor: cue.color }}
        >
          <span className="launch-icon">▶</span>
          <span className="launch-label">
            {lens === 'individual' ? 'Launch Now' : lens === 'professional' ? 'Assign' : 'Deploy'}
          </span>
        </button>
      </motion.div>
    );
  };

  return (
    <div className={`navicue-gallery ${className}`}>
      <div className="navicue-gallery__header">
        <h2 className="navicue-gallery__title">NaviCue Gallery</h2>
        <p className="navicue-gallery__subtitle">
          {lens === 'individual' && 'Quick moves when you need them'}
          {lens === 'professional' && 'Micro-interventions you can assign'}
          {lens === 'organisation' && 'Available mini-apps for deployment'}
        </p>
      </div>

      {/* Category Filter */}
      <div className="navicue-gallery__categories">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Featured NaviCues */}
      {featuredCues.length > 0 && selectedCategory === 'all' && (
        <div className="navicue-gallery__section">
          <h3 className="section-title">Featured</h3>
          <div className="navicue-gallery__grid navicue-gallery__grid--featured">
            <AnimatePresence mode="popLayout">
              {featuredCues.map(cue => renderCueCard(cue, true))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Regular NaviCues */}
      <div className="navicue-gallery__section">
        {featuredCues.length > 0 && selectedCategory === 'all' && (
          <h3 className="section-title">All NaviCues</h3>
        )}
        <div className="navicue-gallery__grid">
          <AnimatePresence mode="popLayout">
            {regularCues.map(cue => renderCueCard(cue, false))}
          </AnimatePresence>
        </div>
      </div>

      {filteredCues.length === 0 && (
        <div className="navicue-gallery__empty">
          <p>No NaviCues available in this category.</p>
        </div>
      )}
    </div>
  );
};
