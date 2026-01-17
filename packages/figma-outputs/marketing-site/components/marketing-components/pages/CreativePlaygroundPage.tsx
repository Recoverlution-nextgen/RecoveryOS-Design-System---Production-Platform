/**
 * CREATIVE PLAYGROUND PAGE
 * 
 * Master interface for exploring 10,000 NaviCues across 100 collections
 * Full tagging, filtering, and discovery system
 */

import React, { useState } from 'react';
import { COLLECTION_STATS } from '../navicues/creative-playground/master-registry';
import { TAG_BY_ID, getTagsByCategory, TagCategory } from '../navicues/creative-playground/taxonomy';

interface CreativePlaygroundProps {
  onNavigate?: (page: string) => void;
}

export function CreativePlaygroundPage({ onNavigate }: CreativePlaygroundProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.keys(COLLECTION_STATS.byCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl mb-2" style={{ color: '#FFFFFF' }}>
                Creative Playground
              </h1>
              <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                10,000 NaviCues across 100 collections. Pure creative freedom.
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('navicue-arsenal')}
                className="px-4 py-2 text-sm transition-opacity hover:opacity-70"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                ← Back to Arsenal
              </button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>
                {COLLECTION_STATS.totalNaviCues.toLocaleString()}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Total NaviCues
              </div>
            </div>
            <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>
                {COLLECTION_STATS.totalCollections}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Collections
              </div>
            </div>
            <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>
                {COLLECTION_STATS.functional}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Fully Functional
              </div>
            </div>
            <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>
                {categories.length}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Categories
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="col-span-3 space-y-6">
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className="w-full p-3 text-left transition-all duration-200"
                    style={{
                      backgroundColor: selectedCategory === category
                        ? 'rgba(87, 57, 251, 0.2)'
                        : 'rgba(87, 57, 251, 0.05)',
                      border: `2px solid ${selectedCategory === category ? '#5739FB' : 'transparent'}`,
                      color: '#FFFFFF',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{category}</span>
                      <span className="text-xs opacity-60">
                        {COLLECTION_STATS.byCategory[category as keyof typeof COLLECTION_STATS.byCategory]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Tag Filters
              </h3>
              <div className="space-y-4">
                {(['domain', 'mechanism', 'intent', 'complexity'] as TagCategory[]).map((category) => (
                  <div key={category}>
                    <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getTagsByCategory(category).slice(0, 8).map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => {
                            if (selectedTags.includes(tag.id)) {
                              setSelectedTags(selectedTags.filter(t => t !== tag.id));
                            } else {
                              setSelectedTags([...selectedTags, tag.id]);
                            }
                          }}
                          className="px-2 py-1 text-xs transition-all duration-200"
                          style={{
                            backgroundColor: selectedTags.includes(tag.id)
                              ? tag.color || '#5739FB'
                              : 'rgba(87, 57, 251, 0.1)',
                            color: selectedTags.includes(tag.id) ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                          }}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {/* Search */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search across 10,000 NaviCues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 text-lg"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '2px solid rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              />
            </div>

            {/* Collection Grid */}
            {selectedCategory === 'Science' && <ScienceCollectionsView />}
            {selectedCategory === 'Arts & Culture' && <ArtsCollectionsView />}
            {selectedCategory === 'Philosophy & Wisdom' && <PhilosophyCollectionsView />}
            {selectedCategory === 'Sports & Movement' && <SportsCollectionsView />}
            {selectedCategory === 'Games & Strategy' && <GamesCollectionsView />}
            
            {!selectedCategory && <AllCollectionsOverview />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COLLECTION VIEWS
// ============================================================================

function ScienceCollectionsView() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  
  const collections = [
    { id: 'physics', name: 'Physics Mechanics', count: 100, color: '#5739FB', desc: 'Laws of motion, energy, forces' },
    { id: 'chemistry', name: 'Chemistry Transformations', count: 100, color: '#7B68EE', desc: 'Reactions, bonds, catalysts' },
    { id: 'biology', name: 'Biology & Life Systems', count: 100, color: '#9370DB', desc: 'Evolution, ecosystems, adaptation' },
    { id: 'neuroscience', name: 'Neuroscience & Brain', count: 100, color: '#BA55D3', desc: 'Neural networks, plasticity' },
    { id: 'astronomy', name: 'Astronomy & Cosmos', count: 100, color: '#DA70D6', desc: 'Stellar evolution, space-time' },
    { id: 'geology', name: 'Geology & Earth', count: 100, color: '#EE82EE', desc: 'Plate tectonics, deep time' },
    { id: 'meteorology', name: 'Weather & Climate', count: 100, color: '#4ECDC4', desc: 'Atmospheric dynamics' },
    { id: 'oceanography', name: 'Oceans & Water', count: 100, color: '#44A7C4', desc: 'Ocean currents, tides' },
    { id: 'ecology', name: 'Ecology & Systems', count: 100, color: '#00B894', desc: 'Food webs, biodiversity' },
    { id: 'quantum', name: 'Quantum Mechanics', count: 100, color: '#341F97', desc: 'Superposition, entanglement' },
  ];

  // Show Physics NaviCues
  if (selectedCollection === 'physics') {
    return <PhysicsNaviCuesList onBack={() => setSelectedCollection(null)} />;
  }

  // Show coming soon for other collections
  if (selectedCollection) {
    const collection = collections.find(c => c.id === selectedCollection);
    return (
      <div>
        <button
          onClick={() => setSelectedCollection(null)}
          className="mb-6 px-4 py-2 text-sm"
          style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)', color: '#FFF' }}
        >
          ← Back to Science Collections
        </button>
        <div className="text-center p-12" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <h2 className="text-3xl mb-4" style={{ color: collection?.color || '#FFFFFF' }}>
            {collection?.name}
          </h2>
          <p className="text-lg mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            100 NaviCues coming soon
          </p>
          <div className="text-6xl mb-6">🔬</div>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            These {collection?.name} NaviCues are being crafted. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {collections.map((collection) => (
        <button
          key={collection.id}
          onClick={() => setSelectedCollection(collection.id)}
          className="p-8 transition-all duration-200 hover:scale-105 cursor-pointer text-left"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: `2px solid ${collection.color}30`,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl" style={{ color: collection.color }}>
              {collection.name}
            </h3>
            <div className="text-3xl" style={{ color: collection.color }}>
              {collection.count}
            </div>
          </div>
          <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {collection.desc}
          </p>
          <div className="flex items-center gap-2">
            {collection.id === 'physics' && (
              <div className="text-xs px-2 py-1 mr-2" style={{ backgroundColor: '#00B894', color: '#FFF' }}>
                1 LIVE
              </div>
            )}
            <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {collection.id === 'physics' ? 'Launch 25 NaviCues →' : 'Explore 100 NaviCues →'}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function ArtsCollectionsView() {
  const collections = [
    { id: 'music-theory', name: 'Music Theory', count: 100, desc: 'Harmony, rhythm, melody' },
    { id: 'visual-art', name: 'Visual Art', count: 100, desc: 'Composition, color, form' },
    { id: 'film', name: 'Film & Cinema', count: 100, desc: 'Montage, narrative, visual language' },
    { id: 'literature', name: 'Literature', count: 100, desc: 'Story structure, character' },
    { id: 'poetry', name: 'Poetry', count: 100, desc: 'Imagery, metaphor, compression' },
    { id: 'dance', name: 'Dance', count: 100, desc: 'Movement, rhythm, expression' },
    { id: 'theater', name: 'Theater', count: 100, desc: 'Performance, presence' },
    { id: 'photography', name: 'Photography', count: 100, desc: 'Light, composition, moment' },
    { id: 'architecture', name: 'Architecture', count: 100, desc: 'Space, structure, scale' },
    { id: 'design', name: 'Design', count: 100, desc: 'Visual communication' },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="p-8 transition-all duration-200 hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '2px solid rgba(87, 57, 251, 0.2)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl" style={{ color: '#5739FB' }}>
              {collection.name}
            </h3>
            <div className="text-3xl" style={{ color: '#5739FB' }}>
              {collection.count}
            </div>
          </div>
          <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {collection.desc}
          </p>
          <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Click to explore →
          </div>
        </div>
      ))}
    </div>
  );
}

function PhilosophyCollectionsView() {
  return <div style={{ color: '#FFF' }}>Philosophy Collections - 1,000 NaviCues across 10 wisdom traditions</div>;
}

function SportsCollectionsView() {
  return <div style={{ color: '#FFF' }}>Sports Collections - 800 NaviCues across 8 sports</div>;
}

function GamesCollectionsView() {
  return <div style={{ color: '#FFF' }}>Games Collections - 700 NaviCues across 7 game types</div>;
}

function AllCollectionsOverview() {
  return (
    <div className="space-y-8">
      <div className="p-8 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
        <h2 className="text-3xl mb-4" style={{ color: '#FFFFFF' }}>
          Welcome to the Creative Playground
        </h2>
        <p className="text-lg mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          10,000 NaviCues organized into 100 collections across 12 categories.
          Select a category on the left to explore.
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4" style={{ backgroundColor: 'rgba(87, 57, 251, 0.15)' }}>
            <div className="text-2xl mb-2" style={{ color: '#5739FB' }}>100</div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Collections</div>
          </div>
          <div className="p-4" style={{ backgroundColor: 'rgba(87, 57, 251, 0.15)' }}>
            <div className="text-2xl mb-2" style={{ color: '#5739FB' }}>12</div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Categories</div>
          </div>
          <div className="p-4" style={{ backgroundColor: 'rgba(87, 57, 251, 0.15)' }}>
            <div className="text-2xl mb-2" style={{ color: '#5739FB' }}>150+</div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Tag Combinations</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {Object.entries(COLLECTION_STATS.byCategory).map(([category, count]) => (
          <div
            key={category}
            className="p-6"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.05)',
              border: '2px solid rgba(87, 57, 251, 0.2)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl" style={{ color: '#FFFFFF' }}>{category}</h3>
              <div className="text-2xl" style={{ color: '#5739FB' }}>{count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PHYSICS NAVICUES LIST
// ============================================================================

function PhysicsNaviCuesList({ onBack }: { onBack: () => void }) {
  const [selectedNaviCue, setSelectedNaviCue] = useState<string | null>(null);

  const physicsNaviCues = [
    { id: 'inertia', name: 'Inertia', subtitle: 'Objects at rest, objects in motion', functional: true },
    { id: 'action-reaction', name: 'Action & Reaction', subtitle: 'Every force has an equal and opposite', functional: false },
    { id: 'conservation-energy', name: 'Conservation of Energy', subtitle: 'Energy cannot be created or destroyed', functional: false },
    { id: 'momentum', name: 'Momentum', subtitle: 'Mass in motion', functional: false },
    { id: 'friction', name: 'Friction Forces', subtitle: 'Resistance to motion', functional: false },
    { id: 'gravity', name: 'Gravity', subtitle: 'Universal attraction', functional: false },
    { id: 'potential-kinetic', name: 'Potential & Kinetic Energy', subtitle: 'Stored vs active energy', functional: false },
    { id: 'wave-particle', name: 'Wave-Particle Duality', subtitle: 'Light as both wave and particle', functional: false },
    { id: 'thermodynamics', name: 'Thermodynamics', subtitle: 'Heat and energy transfer', functional: false },
    { id: 'entropy', name: 'Entropy', subtitle: 'Disorder increases', functional: false },
    { id: 'resonance', name: 'Resonance', subtitle: 'Matching frequencies amplify', functional: false },
    { id: 'equilibrium', name: 'Equilibrium', subtitle: 'Forces in balance', functional: false },
    { id: 'tension-compression', name: 'Tension & Compression', subtitle: 'Push and pull forces', functional: false },
    { id: 'elasticity', name: 'Elasticity & Plasticity', subtitle: 'Return to shape or deform', functional: false },
    { id: 'oscillation', name: 'Oscillation', subtitle: 'Back and forth motion', functional: false },
    { id: 'torque', name: 'Torque', subtitle: 'Rotational force', functional: false },
    { id: 'center-of-mass', name: 'Center of Mass', subtitle: 'Balance point', functional: false },
    { id: 'lever', name: 'Lever Principle', subtitle: 'Mechanical advantage', functional: false },
    { id: 'pressure', name: 'Pressure Dynamics', subtitle: 'Force per area', functional: false },
    { id: 'fluid-dynamics', name: 'Fluid Dynamics', subtitle: 'Flow patterns', functional: false },
    { id: 'optics', name: 'Optics & Reflection', subtitle: 'Light behavior', functional: false },
    { id: 'electromagnetism', name: 'Electromagnetism', subtitle: 'Electric and magnetic fields', functional: false },
    { id: 'circuit', name: 'Circuit Analogy', subtitle: 'Flow of electricity', functional: false },
    { id: 'capacitance', name: 'Capacitance', subtitle: 'Energy storage', functional: false },
    { id: 'induction', name: 'Induction', subtitle: 'Creating current from motion', functional: false },
  ];

  // Show the actual NaviCue component
  if (selectedNaviCue === 'inertia') {
    return (
      <div>
        <button
          onClick={() => setSelectedNaviCue(null)}
          className="mb-4 px-4 py-2 text-sm"
          style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)', color: '#FFF' }}
        >
          ← Back to Physics List
        </button>
        <NewtonsFirstLawNaviCue />
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 text-sm"
        style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)', color: '#FFF' }}
      >
        ← Back to Science Collections
      </button>

      <h2 className="text-3xl mb-2" style={{ color: '#FFFFFF' }}>
        Physics Mechanics
      </h2>
      <p className="text-lg mb-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        25 NaviCues exploring laws of motion, energy, forces
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {physicsNaviCues.map((navicue) => (
          <button
            key={navicue.id}
            onClick={() => navicue.functional && setSelectedNaviCue(navicue.id)}
            className="p-6 text-left transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              border: '2px solid rgba(87, 57, 251, 0.2)',
              opacity: navicue.functional ? 1 : 0.5,
              cursor: navicue.functional ? 'pointer' : 'default',
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg" style={{ color: '#FFFFFF' }}>{navicue.name}</h3>
              {navicue.functional && (
                <div className="text-xs px-2 py-1" style={{ backgroundColor: '#00B894', color: '#FFF' }}>
                  LIVE
                </div>
              )}
            </div>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {navicue.subtitle}
            </p>
            <div className="mt-4 text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {navicue.functional ? 'Click to launch →' : 'Coming soon'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Simple wrapper for the actual NaviCue component
function NewtonsFirstLawNaviCue() {
  const [moving, setMoving] = useState(false);

  return (
    <div className="p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Inertia</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          An object at rest stays at rest. An object in motion stays in motion. Unless acted upon by an external force.
        </p>

        <div className="mb-8 p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-6xl mb-4">{moving ? '→' : '⬤'}</div>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {moving ? 'In motion' : 'At rest'}
          </div>
        </div>

        <button
          onClick={() => setMoving(!moving)}
          className="px-8 py-4 text-lg"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Apply Force
        </button>

        <div className="mt-12 p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)', color: 'rgba(255, 255, 255, 0.7)' }}>
          Your patterns have inertia too. Change requires force. What force will you apply?
        </div>
      </div>
    </div>
  );
}

export default CreativePlaygroundPage;