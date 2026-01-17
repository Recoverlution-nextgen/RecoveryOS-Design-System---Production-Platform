/**
 * CREATIVE DOMAINS BROWSER
 * 
 * Complete catalog and browser for all 6000 NaviCues across 5 creative domains
 * Organized by domain → category → subcategory
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Domain = 'science' | 'arts' | 'philosophy' | 'games' | 'psychology';

interface DomainInfo {
  id: Domain;
  name: string;
  tagline: string;
  color: string;
  total: number;
  icon: string;
  categories: CategoryInfo[];
}

interface CategoryInfo {
  id: string;
  name: string;
  count: number;
  description: string;
}

const CREATIVE_DOMAINS: DomainInfo[] = [
  {
    id: 'science',
    name: 'Science',
    tagline: 'Natural laws as transformation frameworks',
    color: '#3B82F6',
    total: 1200,
    icon: '⚛️',
    categories: [
      { id: 'physics', name: 'Physics', count: 150, description: 'Motion, energy, forces as life metaphors' },
      { id: 'chemistry', name: 'Chemistry', count: 150, description: 'Reactions, bonds, catalysts for change' },
      { id: 'biology', name: 'Biology', count: 150, description: 'Life systems, adaptation, evolution' },
      { id: 'neuroscience', name: 'Neuroscience', count: 150, description: 'Brain plasticity, networks, learning' },
      { id: 'astronomy', name: 'Astronomy', count: 150, description: 'Cosmic scale, perspective, patterns' },
      { id: 'mathematics', name: 'Mathematics', count: 150, description: 'Patterns, proof, elegant solutions' },
      { id: 'geology', name: 'Geology', count: 100, description: 'Deep time, pressure, transformation' },
      { id: 'ecology', name: 'Ecology', count: 100, description: 'Systems, interdependence, balance' },
      { id: 'quantum', name: 'Quantum', count: 100, description: 'Superposition, uncertainty, observation' },
      { id: 'evolution', name: 'Evolution', count: 100, description: 'Selection, adaptation, emergence' },
    ],
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    tagline: 'Creative expression as belief transformation',
    color: '#F59E0B',
    total: 1200,
    icon: '🎨',
    categories: [
      { id: 'visual', name: 'Visual Arts', count: 150, description: 'Color, composition, perspective' },
      { id: 'music', name: 'Music', count: 150, description: 'Harmony, rhythm, emotional resonance' },
      { id: 'literature', name: 'Literature', count: 150, description: 'Narrative, metaphor, meaning' },
      { id: 'film', name: 'Film', count: 150, description: 'Montage, framing, storytelling' },
      { id: 'dance', name: 'Dance', count: 100, description: 'Movement, embodiment, expression' },
      { id: 'architecture', name: 'Architecture', count: 150, description: 'Space, form, function' },
      { id: 'design', name: 'Design', count: 100, description: 'Systems, constraints, elegance' },
      { id: 'photography', name: 'Photography', count: 100, description: 'Light, moment, framing' },
      { id: 'theater', name: 'Theater', count: 100, description: 'Performance, presence, role' },
      { id: 'sculpture', name: 'Sculpture', count: 100, description: 'Form, material, transformation' },
    ],
  },
  {
    id: 'philosophy',
    name: 'Philosophy & Wisdom',
    tagline: 'Ancient wisdom as modern psychology',
    color: '#9333EA',
    total: 1200,
    icon: '📜',
    categories: [
      { id: 'stoicism', name: 'Stoicism', count: 150, description: 'Control, acceptance, virtue' },
      { id: 'buddhism', name: 'Buddhism', count: 150, description: 'Suffering, impermanence, awareness' },
      { id: 'taoism', name: 'Taoism', count: 150, description: 'Flow, balance, non-action' },
      { id: 'existentialism', name: 'Existentialism', count: 150, description: 'Choice, meaning, authenticity' },
      { id: 'phenomenology', name: 'Phenomenology', count: 100, description: 'Lived experience, perception' },
      { id: 'ethics', name: 'Ethics', count: 100, description: 'Right action, virtue, principles' },
      { id: 'metaphysics', name: 'Metaphysics', count: 100, description: 'Being, reality, existence' },
      { id: 'logic', name: 'Logic', count: 100, description: 'Reasoning, fallacies, clarity' },
      { id: 'epistemology', name: 'Epistemology', count: 100, description: 'Knowledge, belief, truth' },
      { id: 'ancient', name: 'Ancient Wisdom', count: 100, description: 'Mythology, archetypes, timeless truth' },
    ],
  },
  {
    id: 'games',
    name: 'Games & Strategy',
    tagline: 'Strategic thinking as life framework',
    color: '#10B981',
    total: 1200,
    icon: '♟️',
    categories: [
      { id: 'chess', name: 'Chess', count: 150, description: 'Tactics, position, endgame thinking' },
      { id: 'poker', name: 'Poker', count: 150, description: 'Probability, bluffing, risk' },
      { id: 'sports', name: 'Sports Psychology', count: 150, description: 'Flow, mental game, performance' },
      { id: 'gametheory', name: 'Game Theory', count: 150, description: 'Nash equilibrium, cooperation, defection' },
      { id: 'economics', name: 'Economics', count: 150, description: 'Incentives, tradeoffs, systems' },
      { id: 'military', name: 'Military Strategy', count: 100, description: 'Sun Tzu, positioning, deception' },
      { id: 'negotiation', name: 'Negotiation', count: 100, description: 'Anchoring, BATNA, win-win' },
      { id: 'systems', name: 'Systems Thinking', count: 100, description: 'Feedback loops, leverage, emergence' },
      { id: 'decision', name: 'Decision Theory', count: 100, description: 'Expected value, Bayesian thinking' },
      { id: 'risk', name: 'Risk Management', count: 100, description: 'Antifragile, tail risk, optionality' },
    ],
  },
  {
    id: 'psychology',
    name: 'Psychology & Mind',
    tagline: 'Mind science as self-awareness tools',
    color: '#EF4444',
    total: 1200,
    icon: '🧠',
    categories: [
      { id: 'biases', name: 'Cognitive Biases', count: 150, description: 'Thinking errors, heuristics, blind spots' },
      { id: 'behavioral', name: 'Behavioral Economics', count: 150, description: 'Loss aversion, framing, nudges' },
      { id: 'social', name: 'Social Psychology', count: 150, description: 'Conformity, attribution, influence' },
      { id: 'developmental', name: 'Developmental', count: 100, description: 'Attachment, stages, growth' },
      { id: 'evolutionary', name: 'Evolutionary Psychology', count: 100, description: 'Mating, status, tribal instincts' },
      { id: 'neuroplasticity', name: 'Neuroplasticity', count: 150, description: 'Rewiring, habit formation, learning' },
      { id: 'memory', name: 'Memory', count: 100, description: 'Reconsolidation, encoding, retrieval' },
      { id: 'attention', name: 'Attention', count: 100, description: 'Focus, distraction, selective awareness' },
      { id: 'motivation', name: 'Motivation', count: 100, description: 'Intrinsic, extrinsic, drive' },
      { id: 'flow', name: 'Flow States', count: 100, description: 'Challenge-skill balance, immersion' },
    ],
  },
];

interface CreativeDomainsBrowserProps {
  onNavigate?: (page: string) => void;
}

export function CreativeDomainsBrowser({ onNavigate }: CreativeDomainsBrowserProps) {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const currentDomain = selectedDomain ? CREATIVE_DOMAINS.find(d => d.id === selectedDomain) : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <AnimatePresence mode="wait">
        {!selectedDomain ? (
          <DomainGrid
            key="domains"
            domains={CREATIVE_DOMAINS}
            onSelectDomain={setSelectedDomain}
            onNavigate={onNavigate}
          />
        ) : !selectedCategory ? (
          <CategoryGrid
            key="categories"
            domain={currentDomain!}
            onBack={() => setSelectedDomain(null)}
            onSelectCategory={setSelectedCategory}
          />
        ) : (
          <NaviCueList
            key="navicues"
            domain={currentDomain!}
            categoryId={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// DOMAIN GRID
// ============================================================================

function DomainGrid({ domains, onSelectDomain, onNavigate }: {
  domains: DomainInfo[];
  onSelectDomain: (domain: Domain) => void;
  onNavigate?: (page: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-12"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          {onNavigate && (
            <button
              onClick={() => onNavigate('command-center-navicue-arsenal')}
              className="text-sm mb-4 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              ← Back to NaviCue Arsenal
            </button>
          )}
          <h1 className="text-5xl" style={{ color: '#FFFFFF' }}>
            Creative Domains
          </h1>
          <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            6,000 NaviCues across 5 domains • All run in Universal Player
          </p>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Science • Arts & Culture • Philosophy & Wisdom • Games & Strategy • Psychology & Mind
          </div>
        </div>

        {/* Domain Cards */}
        <div className="grid grid-cols-1 gap-6">
          {domains.map((domain, index) => (
            <motion.button
              key={domain.id}
              onClick={() => onSelectDomain(domain.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 text-left transition-all duration-200"
              style={{
                backgroundColor: `${domain.color}15`,
                border: `2px solid ${domain.color}`,
              }}
            >
              <div className="flex items-start gap-6">
                <div className="text-6xl">{domain.icon}</div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl" style={{ color: '#FFFFFF' }}>
                      {domain.name}
                    </h2>
                    <div
                      className="px-3 py-1 text-sm uppercase tracking-wider"
                      style={{
                        backgroundColor: `${domain.color}30`,
                        color: domain.color,
                      }}
                    >
                      {domain.total} NaviCues
                    </div>
                  </div>
                  <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {domain.tagline}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {domain.categories.slice(0, 5).map(cat => (
                      <div
                        key={cat.id}
                        className="text-xs px-2 py-1 text-center"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-5 gap-4 pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="text-center">
            <div className="text-3xl" style={{ color: '#FFFFFF' }}>6,000</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Total NaviCues</div>
          </div>
          <div className="text-center">
            <div className="text-3xl" style={{ color: '#FFFFFF' }}>50</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl" style={{ color: '#FFFFFF' }}>~500</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Mechanical Types</div>
          </div>
          <div className="text-center">
            <div className="text-3xl" style={{ color: '#FFFFFF' }}>21</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Response Types</div>
          </div>
          <div className="text-center">
            <div className="text-3xl" style={{ color: '#FFFFFF' }}>∞</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Combinations</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// CATEGORY GRID
// ============================================================================

function CategoryGrid({ domain, onBack, onSelectCategory }: {
  domain: DomainInfo;
  onBack: () => void;
  onSelectCategory: (categoryId: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-12"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={onBack}
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            ← Back to Domains
          </button>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{domain.icon}</div>
            <div>
              <h1 className="text-4xl" style={{ color: '#FFFFFF' }}>
                {domain.name}
              </h1>
              <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {domain.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4">
          {domain.categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 text-left transition-all duration-200"
              style={{
                backgroundColor: `${domain.color}10`,
                border: `1px solid ${domain.color}40`,
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl" style={{ color: '#FFFFFF' }}>
                    {category.name}
                  </h3>
                  <div
                    className="px-2 py-1 text-xs"
                    style={{
                      backgroundColor: `${domain.color}30`,
                      color: domain.color,
                    }}
                  >
                    {category.count}
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {category.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// NAVICUE LIST
// ============================================================================

function NaviCueList({ domain, categoryId, onBack }: {
  domain: DomainInfo;
  categoryId: string;
  onBack: () => void;
}) {
  const category = domain.categories.find(c => c.id === categoryId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-12"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={onBack}
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            ← Back to {domain.name}
          </button>
          <div>
            <h1 className="text-3xl" style={{ color: '#FFFFFF' }}>
              {category?.name}
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {category?.description}
            </p>
            <div className="text-sm mt-2" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              {category?.count} NaviCues • All playable in Universal Player
            </div>
          </div>
        </div>

        {/* Coming Soon Placeholder */}
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
            NaviCue List View
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Individual NaviCue browser coming next
          </p>
          <p className="text-sm mt-4" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            All {category?.count} NaviCues are generated and ready to play in Universal Player
          </p>
        </div>
      </div>
    </motion.div>
  );
}
