/**
 * LAUNCH PLAYER VIEW
 * Player control center with selectors and embedded/fullscreen modes
 */

import React, { useState, useEffect } from 'react';
import { UniversalPlayer } from '../universal-player/UniversalPlayer';
import { NaviCueFilters } from '../../lib/navicues/types';

// ============================================================================
// SCHEMA DEFINITIONS
// ============================================================================

const CORE_SCHEMAS = [
  { id: 'shame', name: 'Shame / Unworthiness', description: 'I am fundamentally flawed or unlovable' },
  { id: 'control', name: 'Control / Hypervigilance', description: 'I must control everything or chaos will happen' },
  { id: 'abandonment', name: 'Abandonment / Trust', description: 'People will leave me if I let them in' },
  { id: 'perfectionism', name: 'Perfectionism', description: 'I must be perfect to be acceptable' },
  { id: 'victimhood', name: 'Victimhood / Powerlessness', description: 'Things happen to me, I have no power' },
  { id: 'emotional-suppression', name: 'Emotional Suppression', description: 'Feelings are dangerous and should be hidden' },
  { id: 'people-pleasing', name: 'People Pleasing', description: 'I must make others happy to be safe' },
  { id: 'scarcity', name: 'Scarcity', description: 'There is never enough for me' },
  { id: 'comparison', name: 'Comparison', description: 'My worth depends on being better than others' },
  { id: 'catastrophizing', name: 'Catastrophizing', description: 'The worst will happen' },
  { id: 'identity-fusion', name: 'Identity Fusion', description: 'I am what I do / what happened to me' },
  { id: 'safety-seeking', name: 'Safety Seeking', description: 'I can never truly be safe' },
];

// ============================================================================
// NAVICUE TYPES (Therapeutic Function)
// ============================================================================

const NAVICUE_TYPES = [
  { 
    id: 'statement_mirror', 
    name: 'Reflection', 
    description: 'Mirrors back your patterns and beliefs',
    family: 'statement_mirror'
  },
  { 
    id: 'belief_probe', 
    name: 'Challenger', 
    description: 'Questions and challenges limiting beliefs',
    family: 'belief_probe'
  },
  { 
    id: 'identity_koan', 
    name: 'Deep Inquiry', 
    description: 'Paradoxical questions about identity',
    family: 'identity_koan'
  },
  { 
    id: 'paradox_prompt', 
    name: 'Paradox', 
    description: 'Holds two truths simultaneously',
    family: 'paradox_prompt'
  },
  { 
    id: 'story_shard', 
    name: 'Story Mapping', 
    description: 'Narrative and meaning making',
    family: 'story_shard'
  },
  { 
    id: 'reframe_seed', 
    name: 'Reframe', 
    description: 'Plants new perspectives',
    family: 'reframe_seed'
  },
  { 
    id: 'curveball', 
    name: 'Curveball', 
    description: 'Disrupts automatic patterns',
    family: 'curveball'
  },
  { 
    id: 'practice', 
    name: 'Practice', 
    description: 'Active skill building exercise',
    family: 'practice'
  },
];

export function LaunchPlayerView() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pillar' | 'schema' | 'track' | 'type'>('all');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [playerMode, setPlayerMode] = useState<'embedded' | 'fullscreen' | null>(null);

  useEffect(() => {
    import('../../lib/navicues/navicueData').then(async (module) => {
      const s = await module.getNaviCueStats();
      setStats(s);
      setLoading(false);
      console.log('📊 NaviCue Stats:', s);
    });
  }, []);

  const buildFilters = (): NaviCueFilters => {
    const filters: NaviCueFilters = {};
    if (selectedPillar) filters.pillar = selectedPillar;
    if (selectedSchema) filters.schema = selectedSchema;
    if (selectedTrack) filters.track = selectedTrack;
    if (selectedType) filters.family = selectedType as any;
    return filters;
  };

  const launchPlayer = (mode: 'embedded' | 'fullscreen') => {
    setPlayerMode(mode);
  };

  const closePlayer = () => {
    setPlayerMode(null);
  };

  if (loading) {
    return (
      <div style={{ color: '#FFFFFF' }}>
        <h2 className="text-2xl mb-4">Player Control Center</h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Loading NaviCue data...
        </p>
      </div>
    );
  }

  return (
    <div style={{ color: '#FFFFFF' }}>
      <h2 className="text-2xl mb-6">Player Control Center</h2>
      
      {/* SELECTOR SECTION */}
      <div className="mb-8 p-6 bg-[#5739FB]/10 border border-[#5739FB]/30">
        <h3 className="text-lg mb-4">Select Starting Point</h3>
        
        {/* Filter Type Selector */}
        <div className="grid grid-cols-6 gap-2 mb-6">
          {[
            { id: 'all', label: 'All NaviCues', icon: '🎯' },
            { id: 'pillar', label: 'By Pillar', icon: '🏛️' },
            { id: 'schema', label: 'By Schema', icon: '🗺️' },
            { id: 'track', label: 'By Track', icon: '🛤️' },
            { id: 'type', label: 'By Type', icon: '💡' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setSelectedFilter(filter.id as any);
                setSelectedPillar(null);
                setSelectedSchema(null);
                setSelectedTrack(null);
                setSelectedType(null);
              }}
              className="p-3 text-center transition-all"
              style={{
                backgroundColor: selectedFilter === filter.id ? '#5739FB' : 'rgba(255, 255, 255, 0.05)',
                border: selectedFilter === filter.id ? '2px solid #5739FB' : '2px solid transparent',
              }}
            >
              <div className="text-2xl mb-1">{filter.icon}</div>
              <div className="text-xs">{filter.label}</div>
            </button>
          ))}
        </div>

        {/* PILLAR SELECTOR */}
        {selectedFilter === 'pillar' && stats && (
          <div className="mb-4">
            <div className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Choose a Pillar to start with
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Object.entries(stats.byPillar).map(([pillar, count]) => (
                <button
                  key={pillar}
                  onClick={() => setSelectedPillar(pillar)}
                  className="p-3 text-center transition-all"
                  style={{
                    backgroundColor: selectedPillar === pillar ? '#5739FB' : 'rgba(255, 255, 255, 0.05)',
                    border: selectedPillar === pillar ? '2px solid #5739FB' : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-lg mb-1">{pillar}</div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {count as number}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCHEMA SELECTOR */}
        {selectedFilter === 'schema' && (
          <div className="mb-4">
            <div className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Choose a Schema to target
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CORE_SCHEMAS.map((schema) => (
                <button
                  key={schema.id}
                  onClick={() => setSelectedSchema(schema.id)}
                  className="p-3 text-left transition-all"
                  style={{
                    backgroundColor: selectedSchema === schema.id ? '#5739FB' : 'rgba(255, 255, 255, 0.05)',
                    border: selectedSchema === schema.id ? '2px solid #5739FB' : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-sm mb-1">{schema.name}</div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {schema.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TRACK SELECTOR */}
        {selectedFilter === 'track' && (
          <div className="mb-4">
            <div className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Choose a Track
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'clinical', name: 'Clinical', count: 300, color: '#3B82F6' },
                { id: 'guru', name: 'Guru', count: 150, color: '#8B5CF6' },
                { id: 'infinite', name: 'Infinite', count: 50, color: '#EC4899' },
              ].map((track) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className="p-4 text-center transition-all"
                  style={{
                    backgroundColor: selectedTrack === track.id ? track.color : 'rgba(255, 255, 255, 0.05)',
                    border: selectedTrack === track.id ? `2px solid ${track.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-lg mb-2">{track.name}</div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {track.count} NaviCues
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TYPE SELECTOR */}
        {selectedFilter === 'type' && (
          <div className="mb-4">
            <div className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Choose a Type
            </div>
            <div className="grid grid-cols-3 gap-3">
              {NAVICUE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className="p-4 text-center transition-all"
                  style={{
                    backgroundColor: selectedType === type.id ? '#5739FB' : 'rgba(255, 255, 255, 0.05)',
                    border: selectedType === type.id ? '2px solid #5739FB' : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-lg mb-2">{type.name}</div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LAUNCH BUTTONS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => launchPlayer('embedded')}
          className="bg-[#5739FB] hover:bg-[#3E2BB8] px-8 py-6 text-white text-lg transition-colors"
        >
          <div className="text-sm mb-1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Launch Embedded
          </div>
          <div>▶ Play in Page</div>
        </button>
        
        <button
          onClick={() => launchPlayer('fullscreen')}
          className="bg-[#3E2BB8] hover:bg-[#5739FB] px-8 py-6 text-white text-lg transition-colors"
        >
          <div className="text-sm mb-1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Launch Fullscreen
          </div>
          <div>⛶ Full Player Mode</div>
        </button>
      </div>

      {/* STATS PREVIEW */}
      {stats && !playerMode && (
        <div className="space-y-4">
          <h3 className="text-lg">Current Selection Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-2xl mb-1">{stats.total}</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Total Available
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-2xl mb-1">
                {selectedPillar ? (stats.byPillar[selectedPillar] || 0) : stats.total}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Will Play
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-2xl mb-1">∞</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Infinite Scroll
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMBEDDED PLAYER */}
      {playerMode === 'embedded' && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg">Now Playing</h3>
            <button
              onClick={closePlayer}
              className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors"
            >
              Stop Player
            </button>
          </div>
          <div className="border-2 border-[#5739FB]">
            <UniversalPlayer
              mode="filtered"
              filters={buildFilters()}
              onClose={closePlayer}
              onNaviCueComplete={(navicue, response) => {
                console.log('NaviCue completed:', navicue.id, response);
              }}
              showProgress={true}
              allowCollapse={true}
              embedded={true}
            />
          </div>
        </div>
      )}

      {/* FULLSCREEN PLAYER */}
      {playerMode === 'fullscreen' && (
        <UniversalPlayer
          mode="filtered"
          filters={buildFilters()}
          onClose={closePlayer}
          onNaviCueComplete={(navicue, response) => {
            console.log('NaviCue completed:', navicue.id, response);
          }}
          showProgress={true}
          allowCollapse={true}
          embedded={false}
        />
      )}
    </div>
  );
}