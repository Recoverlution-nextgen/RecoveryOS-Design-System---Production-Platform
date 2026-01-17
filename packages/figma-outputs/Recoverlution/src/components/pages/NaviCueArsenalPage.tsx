import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BeliefLadder, BeliefProgressTracker, BeliefLadderData, BeliefProgressData } from '../navicues/BeliefProgressTracker';
import { VOICE_ARCHETYPES, VoiceArchetypeName } from '../navicues/VoiceWrapper';
import { ALL_CLINICAL, ALL_GURU, ALL_INFINITE, EXTENDED_NAVICUE_CATALOG, getCompletionPercentage } from '../navicues/arsenal';
import NaviCueArsenalBrowser from '../navicues/NaviCueArsenalBrowser';
import { CreativePlaygroundPage } from './CreativePlaygroundPage';
import { MagicWandUniverse } from './magicwand/MagicWandUniverse';
import { MyBrainLaboratory } from './mybrain/MyBrainLaboratory';
import { FeatureIntegrationsOrchestra } from './integrations/FeatureIntegrationsOrchestra';
import { NaviCueLibraryBrowser } from './NaviCueLibraryBrowser';

/**
 * NAVICUE ARSENAL PAGE
 * 
 * Purpose: Command center for belief transformation system
 * Views:
 * 1. Belief Ladders (per-schema progression) - THE KILLER VIEW
 * 2. Heatmap (Pillars × Intent gap analysis)
 * 3. Voice Constellation (archetype network)
 * 4. NaviCue Library (detailed catalog)
 * 5. Live Demo (interactive showcase)
 * 6. Clinical Arsenal (NEW - ER/SR/SC/CR/II/DM pillar NaviCues)
 * 7. Guru NaviCues (NEW - Ram Dass, Alan Watts, etc.)
 * 8. Infinite NaviCues (NEW - Quantum, Music, etc.)
 * 9. NaviCue Browser (NEW - Visual explorer for all 74)
 * 10. Creative Playground (NEW - 10,000 NaviCues across 100 collections)
 * 11. Magic Wand (NEW - Generative NaviCue factory with 10 categories)
 * 12. My Brain (NEW - 25 secret sauce / next-gen experimental components)
 * 13. Feature Integrations (NEW - How everything connects together)
 */

type ViewMode = 'ladders' | 'heatmap' | 'voices' | 'library' | 'demo' | 'clinical' | 'guru' | 'infinite' | 'browser' | 'playground' | 'magicwand' | 'mybrain' | 'featureintegrations';

interface NaviCueArsenalPageProps {
  onNavigate?: (page: string) => void;
}

export function NaviCueArsenalPage({ onNavigate }: NaviCueArsenalPageProps) {
  const [view, setView] = useState<ViewMode>('ladders');
  const [selectedSchema, setSelectedSchema] = useState<string | null>('shame');
  const [selectedVoice, setSelectedVoice] = useState<VoiceArchetypeName | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2" style={{ color: '#FFFFFF' }}>
                NaviCue Arsenal
              </h1>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Belief transformation command center
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('command-center')}
                className="px-4 py-2 text-sm transition-opacity hover:opacity-70"
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                ← Back to Command Center
              </button>
            )}
          </div>

          {/* View selector */}
          <div className="flex gap-2">
            {[
              { id: 'ladders', label: 'Belief Ladders', icon: '🪜' },
              { id: 'heatmap', label: 'Heatmap', icon: '🔥' },
              { id: 'voices', label: 'Voice Archetypes', icon: '🎭' },
              { id: 'library', label: 'NaviCue Library', icon: '📚' },
              { id: 'demo', label: 'Live Demo', icon: '▶️' },
              { id: 'clinical', label: 'Clinical Arsenal', icon: '🩺' },
              { id: 'guru', label: 'Guru NaviCues', icon: 'ॐ' },
              { id: 'infinite', label: 'Infinite NaviCues', icon: '♾️' },
              { id: 'browser', label: 'NaviCue Browser', icon: '🌐' },
              { id: 'playground', label: 'Creative Playground', icon: '🎨' },
              { id: 'magicwand', label: 'Magic Wand', icon: '✨' },
              { id: 'mybrain', label: 'My Brain', icon: '🧠' },
              { id: 'featureintegrations', label: 'Feature Integrations', icon: '🔌' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewMode)}
                className="px-4 py-2 text-sm transition-all duration-200"
                style={{
                  backgroundColor: view === item.id ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                  color: view === item.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                }}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'ladders' && <BeliefLaddersView selectedSchema={selectedSchema} onSelectSchema={setSelectedSchema} />}
            {view === 'heatmap' && <HeatmapView />}
            {view === 'voices' && <VoiceConstellationView selectedVoice={selectedVoice} onSelectVoice={setSelectedVoice} />}
            {view === 'library' && <NaviCueLibraryView />}
            {view === 'demo' && <LiveDemoView onNavigate={onNavigate} />}
            {view === 'clinical' && <ClinicalArsenalView onNavigate={onNavigate} />}
            {view === 'guru' && <GuruNaviCuesView onNavigate={onNavigate} />}
            {view === 'infinite' && <InfiniteNaviCuesView onNavigate={onNavigate} />}
            {view === 'browser' && <NaviCueLibraryBrowser onNavigate={onNavigate} />}
            {view === 'playground' && <CreativePlaygroundPage onNavigate={onNavigate} />}
            {view === 'magicwand' && <MagicWandUniverse onNavigate={onNavigate} />}
            {view === 'mybrain' && <MyBrainLaboratory onNavigate={onNavigate} />}
            {view === 'featureintegrations' && <FeatureIntegrationsOrchestra onNavigate={onNavigate} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 1: BELIEF LADDERS (The Killer Feature)
// ============================================================================

interface BeliefLaddersViewProps {
  selectedSchema: string | null;
  onSelectSchema: (schema: string) => void;
}

function BeliefLaddersView({ selectedSchema, onSelectSchema }: BeliefLaddersViewProps) {
  // Mock data - in production this comes from backend
  const schemas: BeliefLadderData[] = [
    {
      schema: 'Shame / Unworthiness',
      schemaDescription: 'Core belief that "I am fundamentally flawed or unlovable"',
      totalMindblocks: 8,
      completedMindblocks: 3,
      mindblocks: [
        {
          id: 'MB-CR-001',
          limitingBelief: 'I am fundamentally flawed',
          newTruth: 'I am human, with strengths and limitations',
          stage: 'embodying',
          progress: 85,
        },
        {
          id: 'MB-CR-002',
          limitingBelief: 'I must hide my real self',
          newTruth: 'Authenticity creates real connection',
          stage: 'believing',
          progress: 60,
        },
        {
          id: 'MB-CR-003',
          limitingBelief: 'Making mistakes proves I am worthless',
          newTruth: 'Mistakes are how I learn and grow',
          stage: 'believing',
          progress: 45,
        },
        {
          id: 'MB-CR-004',
          limitingBelief: 'I do not deserve good things',
          newTruth: 'I am worthy of care and kindness',
          stage: 'knowing',
          progress: 30,
        },
      ],
    },
    {
      schema: 'Control / Hypervigilance',
      schemaDescription: 'Belief that "I must control everything or chaos will happen"',
      totalMindblocks: 6,
      completedMindblocks: 2,
      mindblocks: [
        {
          id: 'MB-ER-005',
          limitingBelief: 'If I relax my guard, everything will fall apart',
          newTruth: 'Safety can exist without constant vigilance',
          stage: 'embodying',
          progress: 75,
        },
        {
          id: 'MB-ER-006',
          limitingBelief: 'Uncertainty is dangerous',
          newTruth: 'I can tolerate not knowing',
          stage: 'believing',
          progress: 50,
        },
        {
          id: 'MB-ER-007',
          limitingBelief: 'I must micromanage or fail',
          newTruth: 'Delegation builds strength',
          stage: 'knowing',
          progress: 25,
        },
      ],
    },
    {
      schema: 'Abandonment / Trust',
      schemaDescription: 'Belief that "People will leave me if I let them in"',
      totalMindblocks: 7,
      completedMindblocks: 1,
      mindblocks: [
        {
          id: 'MB-SC-008',
          limitingBelief: 'I cannot trust people',
          newTruth: 'I can discern who is trustworthy',
          stage: 'believing',
          progress: 55,
        },
        {
          id: 'MB-SC-009',
          limitingBelief: 'Getting close means getting hurt',
          newTruth: 'Vulnerability creates real intimacy',
          stage: 'knowing',
          progress: 35,
        },
      ],
    },
  ];

  const selectedLadder = schemas.find(s => s.schema === selectedSchema) || schemas[0];

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Schema selector */}
      <div className="col-span-4 space-y-3">
        <h2 className="text-lg mb-4" style={{ color: '#FFFFFF' }}>
          Schemas
        </h2>
        {schemas.map((schema) => {
          const progress = (schema.completedMindblocks / schema.totalMindblocks) * 100;
          return (
            <button
              key={schema.schema}
              onClick={() => onSelectSchema(schema.schema)}
              className="w-full p-4 text-left transition-all duration-200"
              style={{
                backgroundColor: selectedSchema === schema.schema 
                  ? 'rgba(87, 57, 251, 0.2)' 
                  : 'rgba(87, 57, 251, 0.05)',
                border: `2px solid ${selectedSchema === schema.schema ? '#5739FB' : 'transparent'}`,
              }}
            >
              <div className="mb-2">
                <div className="text-sm mb-1" style={{ color: '#FFFFFF' }}>
                  {schema.schema}
                </div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {schema.completedMindblocks} of {schema.totalMindblocks} shifted
                </div>
              </div>
              <div className="w-full h-1" style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: '#5739FB',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected ladder */}
      <div className="col-span-8">
        <BeliefLadder ladder={selectedLadder} />
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 2: HEATMAP (Gap Analysis)
// ============================================================================

function HeatmapView() {
  const pillars = ['ER', 'SR', 'SC', 'CR', 'II', 'DM'];
  const intents = ['engage', 'calm', 'excite', 'boost', 'reinforce', 'remind', 'care', 'challenge', 'play'];

  // Mock data - number of NaviCues per pillar × intent
  const heatmapData: Record<string, Record<string, number>> = {
    'ER': { engage: 12, calm: 24, excite: 8, boost: 6, reinforce: 14, remind: 10, care: 18, challenge: 5, play: 3 },
    'SR': { engage: 10, calm: 20, excite: 6, boost: 8, reinforce: 12, remind: 8, care: 15, challenge: 7, play: 4 },
    'SC': { engage: 18, calm: 10, excite: 12, boost: 14, reinforce: 10, remind: 6, care: 20, challenge: 8, play: 6 },
    'CR': { engage: 15, calm: 8, excite: 10, boost: 12, reinforce: 16, remind: 12, care: 10, challenge: 14, play: 5 },
    'II': { engage: 8, calm: 6, excite: 14, boost: 18, reinforce: 20, remind: 10, care: 8, challenge: 12, play: 8 },
    'DM': { engage: 12, calm: 10, excite: 8, boost: 10, reinforce: 14, remind: 16, care: 6, challenge: 16, play: 4 },
  };

  const getHeatColor = (count: number) => {
    if (count >= 20) return '#5739FB'; // High coverage
    if (count >= 12) return '#7B68EE'; // Good coverage
    if (count >= 6) return '#9370DB'; // Moderate coverage
    return '#E74C3C'; // Gap - needs content
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
          Coverage Heatmap
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          NaviCue coverage by Pillar × Intent. Red = gaps, Purple = good coverage.
        </p>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Pillar
              </th>
              {intents.map((intent) => (
                <th key={intent} className="p-3 text-center text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {intent}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pillars.map((pillar) => (
              <tr key={pillar}>
                <td className="p-3 text-sm" style={{ color: '#FFFFFF' }}>
                  {pillar}
                </td>
                {intents.map((intent) => {
                  const count = heatmapData[pillar][intent];
                  return (
                    <td key={intent} className="p-2">
                      <div
                        className="w-full h-12 flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 cursor-pointer"
                        style={{
                          backgroundColor: getHeatColor(count),
                          color: '#FFFFFF',
                        }}
                      >
                        {count}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 justify-center p-4" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Coverage:</div>
        {[
          { color: '#E74C3C', label: 'Gap (< 6)' },
          { color: '#9370DB', label: 'Moderate (6-11)' },
          { color: '#7B68EE', label: 'Good (12-19)' },
          { color: '#5739FB', label: 'Excellent (20+)' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: item.color }} />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 3: VOICE CONSTELLATION (Network View)
// ============================================================================

interface VoiceConstellationViewProps {
  selectedVoice: VoiceArchetypeName | null;
  onSelectVoice: (voice: VoiceArchetypeName) => void;
}

function VoiceConstellationView({ selectedVoice, onSelectVoice }: VoiceConstellationViewProps) {
  const voices = Object.values(VOICE_ARCHETYPES);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
          Voice Archetypes
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          12 core voices for belief transformation. Voice is the delivery vehicle for prediction error.
        </p>
      </div>

      {/* Voice grid */}
      <div className="grid grid-cols-3 gap-4">
        {voices.map((voice) => (
          <button
            key={voice.name}
            onClick={() => onSelectVoice(voice.name)}
            className="p-6 text-left transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: selectedVoice === voice.name 
                ? `${voice.accentColor}30` 
                : 'rgba(87, 57, 251, 0.05)',
              border: `2px solid ${selectedVoice === voice.name ? voice.accentColor : 'transparent'}`,
            }}
          >
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg mb-2" style={{ color: voice.accentColor }}>
                {voice.displayName}
              </h3>
              <div className="text-xs uppercase tracking-wider px-2 py-1 inline-block" style={{
                backgroundColor: voice.accentColor,
                color: '#FFFFFF',
              }}>
                {voice.stance}
              </div>
            </div>

            {/* Parameters */}
            <div className="space-y-2 mb-4 text-xs">
              <Parameter label="Warmth" value={voice.warmth} />
              <Parameter label="Directness" value={voice.directness} />
              <Parameter label="Humor" value={voice.humor} />
              <Parameter label="Paradox" value={voice.paradox} />
            </div>

            {/* Sample */}
            <div className="text-xs italic" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              "{voice.intro}"
            </div>
          </button>
        ))}
      </div>

      {/* Selected voice detail */}
      {selectedVoice && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
          style={{
            backgroundColor: `${VOICE_ARCHETYPES[selectedVoice].accentColor}20`,
            border: `2px solid ${VOICE_ARCHETYPES[selectedVoice].accentColor}`,
          }}
        >
          <h3 className="text-xl mb-4" style={{ color: VOICE_ARCHETYPES[selectedVoice].accentColor }}>
            {VOICE_ARCHETYPES[selectedVoice].displayName}
          </h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Opening</div>
              <div style={{ color: '#FFFFFF' }}>"{VOICE_ARCHETYPES[selectedVoice].intro}"</div>
            </div>
            <div>
              <div className="mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Closing</div>
              <div style={{ color: '#FFFFFF' }}>"{VOICE_ARCHETYPES[selectedVoice].outro}"</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Parameter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{label}</span>
        <span style={{ color: '#FFFFFF' }}>{value}/10</span>
      </div>
      <div className="w-full h-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div
          className="h-full"
          style={{
            width: `${value * 10}%`,
            backgroundColor: '#5739FB',
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 4: NAVICUE LIBRARY
// ============================================================================

function NaviCueLibraryView() {
  const types = [
    { name: 'Belief Probe', layer: 'KNOWING', count: 45 },
    { name: 'Reaction Timer', layer: 'KNOWING', count: 38 },
    { name: 'Prediction Capture', layer: 'KNOWING', count: 42 },
    { name: 'Pattern Recognition', layer: 'KNOWING', count: 35 },
    { name: 'Decision Log', layer: 'KNOWING', count: 28 },
    { name: 'Implicit Association', layer: 'KNOWING', count: 32 },
    { name: 'Micro-Experiment', layer: 'BELIEVING', count: 52 },
    { name: 'Hypothesis Builder', layer: 'BELIEVING', count: 40 },
    { name: 'Prediction Lab', layer: 'BELIEVING', count: 36 },
    { name: 'Evidence Vault', layer: 'BELIEVING', count: 44 },
    { name: 'Identity Receipt', layer: 'EMBODYING', count: 48 },
    { name: 'Automaticity Tracker', layer: 'EMBODYING', count: 30 },
    { name: 'Transfer Trainer', layer: 'EMBODYING', count: 34 },
  ];

  const layerColors = {
    KNOWING: '#7B68EE',
    BELIEVING: '#5739FB',
    EMBODYING: '#3E2BB8',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
          NaviCue Library
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          All NaviCue types across the three transformation stages
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {types.map((type) => (
          <div
            key={type.name}
            className="p-4"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.05)',
              borderLeft: `4px solid ${layerColors[type.layer as keyof typeof layerColors]}`,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm" style={{ color: '#FFFFFF' }}>
                {type.name}
              </h3>
              <div className="text-xl" style={{ color: layerColors[type.layer as keyof typeof layerColors] }}>
                {type.count}
              </div>
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {type.layer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 5: LIVE DEMO
// ============================================================================

function LiveDemoView({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [selectedBucket, setSelectedBucket] = useState<'navicues' | 'insights' | 'snapshots'>('navicues');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
          Arsenal Test Lab
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Build, test, learn. Data will show what works.
        </p>
      </div>

      {/* Bucket selector */}
      <div className="flex gap-2">
        {[
          { id: 'navicues', label: 'NaviCues', count: 3 },
          { id: 'insights', label: 'Insights', count: 1 },
          { id: 'snapshots', label: 'Snapshots', count: 1 },
        ].map((bucket) => (
          <button
            key={bucket.id}
            onClick={() => setSelectedBucket(bucket.id as any)}
            className="px-4 py-2 text-sm transition-all duration-200"
            style={{
              backgroundColor: selectedBucket === bucket.id ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
              color: selectedBucket === bucket.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {bucket.label} ({bucket.count})
          </button>
        ))}
      </div>

      {/* NaviCues bucket */}
      {selectedBucket === 'navicues' && (
        <div className="space-y-6">
          <button
            onClick={() => onNavigate?.('navicue-master-index')}
            className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl mb-2">Master Index: 200 Live NaviCues</h3>
                <p className="text-sm opacity-80">
                  20 batches deployed. Pure experience. No explanations.
                </p>
              </div>
              <div className="text-5xl">→</div>
            </div>
          </button>

          <div className="p-6 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              From Time Paradoxes to Quantum Uncertainty. 200 ways to capture attention.
            </p>
          </div>
        </div>
      )}

      {/* Insights bucket */}
      {selectedBucket === 'insights' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <h3 className="text-xl mb-3" style={{ color: '#FFFFFF' }}>
              Trust Belief Shift
            </h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Deep dive into trust patterns. Multi-step guided process for belief transformation.
            </p>
            <div className="mb-4 text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              INSIGHT · 5 steps · 8-10 minutes
            </div>
            <button
              onClick={() => onNavigate?.('belief-sequence-demo')}
              className="w-full p-3 transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: '#5739FB',
                color: '#FFFFFF',
              }}
            >
              Launch insight
            </button>
          </div>
        </div>
      )}

      {/* Snapshots bucket */}
      {selectedBucket === 'snapshots' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <h3 className="text-xl mb-3" style={{ color: '#FFFFFF' }}>
              Trust Pattern Snapshot
            </h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Quick assessment to see your trust pattern. Experience and reflection.
            </p>
            <div className="mb-4 text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              SNAPSHOT · 3 scenarios · 2-3 minutes
            </div>
            <button
              onClick={() => onNavigate?.('trust-experience')}
              className="w-full p-3 transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: '#5739FB',
                color: '#FFFFFF',
              }}
            >
              Take snapshot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 6: CLINICAL ARSENAL
// ============================================================================

function ClinicalArsenalView({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
          Clinical NaviCues
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Evidence-based, mechanism-focused interventions mapped to the 6 Pillars
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-6 gap-4">
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>10</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>ER NaviCues</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>50</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>SR NaviCues</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>50</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>SC NaviCues</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>50</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>CR NaviCues</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>50</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>II NaviCues</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>50</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>DM NaviCues</div>
        </div>
      </div>

      {/* ER Batch */}
      <button
        onClick={() => onNavigate?.('clinical-er-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#5739FB',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">PILLAR ER</div>
            <h3 className="text-2xl mb-2">Emotional Regulation Arsenal</h3>
            <p className="text-sm opacity-80">
              10 NaviCues: Vagal tone, Window of Tolerance, State regulation, Grounding
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* SR Batch */}
      <button
        onClick={() => onNavigate?.('clinical-sr-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#7B68EE',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">PILLAR SR</div>
            <h3 className="text-2xl mb-2">Stress Resilience Arsenal</h3>
            <p className="text-sm opacity-80">
              50 NaviCues: HPA axis, Allostatic load, Recovery, Hormesis, Resilience building
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* SC Batch */}
      <button
        onClick={() => onNavigate?.('clinical-sc-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#9370DB',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">PILLAR SC</div>
            <h3 className="text-2xl mb-2">Social Connectivity Arsenal</h3>
            <p className="text-sm opacity-80">
              50 NaviCues: Attachment, Mentalization, Empathy, Belonging, Co-regulation
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* CR Batch */}
      <button
        onClick={() => onNavigate?.('clinical-cr-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#BA55D3',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">PILLAR CR</div>
            <h3 className="text-2xl mb-2">Cognitive Reframing Arsenal</h3>
            <p className="text-sm opacity-80">
              50 NaviCues: Distortions, Reappraisal, Perspective shifts, Metacognition, Belief work
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* II Batch */}
      <button
        onClick={() => onNavigate?.('clinical-ii-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#DA70D6',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">PILLAR II</div>
            <h3 className="text-2xl mb-2">Identity Integration Arsenal</h3>
            <p className="text-sm opacity-80">
              50 NaviCues: Self-concept, Values alignment, Narrative identity, Purpose, Authenticity
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* DM Batch */}
      <button
        onClick={() => onNavigate?.('clinical-dm-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#EE82EE',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">PILLAR DM</div>
            <h3 className="text-2xl mb-2">Decision Mastery Arsenal</h3>
            <p className="text-sm opacity-80">
              50 NaviCues: Agency, Choice architecture, Decision fatigue, Commitment, Regret management
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>
    </div>
  );
}

// ============================================================================
// VIEW 7: GURU NAVICUES
// ============================================================================

function GuruNaviCuesView({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
          Guru NaviCues
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Wisdom as design. If spiritual teachers could code, what would they build?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>80</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Total NaviCues</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>5</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Gurus Complete</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
          <div className="text-4xl mb-2 opacity-40" style={{ color: '#5739FB' }}>17</div>
          <div className="text-sm opacity-40" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Gurus Planned</div>
        </div>
      </div>

      {/* Ram Dass Batch */}
      <button
        onClick={() => onNavigate?.('guru-ram-dass-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#5739FB',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">GURU BATCH 01</div>
            <h3 className="text-2xl mb-2">Ram Dass Collection</h3>
            <p className="text-sm opacity-80">
              14 NaviCues: Witness practice, Be Here Now, Soul vs Ego, Loving presence
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* Alan Watts Batch */}
      <button
        onClick={() => onNavigate?.('guru-alan-watts-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#7B68EE',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">GURU BATCH 02</div>
            <h3 className="text-2xl mb-2">Alan Watts Collection</h3>
            <p className="text-sm opacity-80">
              12 NaviCues: Backwards Law, Ego as Fiction, Control Illusion, Paradox mechanics
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* Pema Chödrön Batch */}
      <button
        onClick={() => onNavigate?.('guru-pema-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#9370DB',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">GURU BATCH 03</div>
            <h3 className="text-2xl mb-2">Pema Chödrön Collection</h3>
            <p className="text-sm opacity-80">
              20 NaviCues: Groundlessness, Shenpa, Warrior spirit, Tonglen
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* Thích Nhất Hạnh Batch */}
      <button
        onClick={() => onNavigate?.('guru-thich-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#BA55D3',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">GURU BATCH 04</div>
            <h3 className="text-2xl mb-2">Thích Nhất Hạnh Collection</h3>
            <p className="text-sm opacity-80">
              18 NaviCues: Interbeing, Mindful breathing, Present moment, Deep listening
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* Jack Kornfield Batch */}
      <button
        onClick={() => onNavigate?.('guru-kornfield-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#DA70D6',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">GURU BATCH 05</div>
            <h3 className="text-2xl mb-2">Jack Kornfield Collection</h3>
            <p className="text-sm opacity-80">
              16 NaviCues: Wise heart, RAIN practice, Forgiveness, Loving-kindness
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* Coming Soon */}
      <div className="grid grid-cols-3 gap-4">
        {['Eckhart Tolle', 'Byron Katie', 'Tara Brach', 'Adyashanti', 'Mooji', 'Rupert Spira'].map((guru) => (
          <div key={guru} className="p-4 opacity-40" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{guru}</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Coming soon</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 8: INFINITE NAVICUES
// ============================================================================

function InfiniteNaviCuesView({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
          Infinite NaviCues
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Pure creative freedom. Cross-domain metaphors as therapeutic interventions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>18</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Total NaviCues</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-4xl mb-2" style={{ color: '#5739FB' }}>2</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Themes Complete</div>
        </div>
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
          <div className="text-4xl mb-2 opacity-40" style={{ color: '#5739FB' }}>10</div>
          <div className="text-sm opacity-40" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Themes Planned</div>
        </div>
      </div>

      {/* Quantum Batch */}
      <button
        onClick={() => onNavigate?.('infinite-quantum-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#5739FB',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">INFINITE BATCH 01</div>
            <h3 className="text-2xl mb-2">Quantum Therapy Mechanics</h3>
            <p className="text-sm opacity-80">
              9 NaviCues: Superposition, Uncertainty, Entanglement, Wave-Particle duality
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* Music Theory Batch */}
      <button
        onClick={() => onNavigate?.('infinite-music-batch')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#7B68EE',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2 opacity-60">INFINITE BATCH 02</div>
            <h3 className="text-2xl mb-2">Music Theory Emotion Architecture</h3>
            <p className="text-sm opacity-80">
              9 NaviCues: Emotional keys, Dissonance, Tempo, Dynamics, Harmony
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* Coming Soon */}
      <div className="grid grid-cols-3 gap-4">
        {['Gaming Mechanics', 'Chess Strategy', 'Weather Systems', 'Cooking Science', 'Architecture', 'Film Theory'].map((theme) => (
          <div key={theme} className="p-4 opacity-40" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{theme}</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Coming soon</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 9: NAVICUE BROWSER
// ============================================================================

function NaviCueLibraryBrowser({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
          NaviCue Master Browser
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Database-powered browser for all 1,064 NaviCues (Clinical + Guru + Magic Wand)
        </p>
      </div>

      {/* All NaviCues Button */}
      <button
        onClick={() => onNavigate?.('navicue-arsenal-browser')}
        className="w-full p-8 text-left transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#5739FB',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl mb-2">Browse All 1,064 NaviCues</h3>
            <p className="text-sm opacity-80">
              Filter by track, pillar, family, response type. Click any NaviCue to practice it.
            </p>
          </div>
          <div className="text-5xl">→</div>
        </div>
      </button>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-6 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-1" style={{ color: '#5739FB' }}>974</div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Clinical</div>
        </div>
        <div className="p-6 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-1" style={{ color: '#5739FB' }}>90</div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Magic Wand</div>
        </div>
        <div className="p-6 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-1" style={{ color: '#5739FB' }}>1064</div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Total Ready</div>
        </div>
        <div className="p-6 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-1" style={{ color: '#5739FB' }}>15</div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Response Types</div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          All 1,064 production NaviCues from the database. Filter by track (Clinical/Guru/Magic Wand), 
          pillar (ER/SR/SC/CR/II/DM), family, or response type. Click any NaviCue to see full details and practice it.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// MAGIC WAND, MY BRAIN, FEATURE INTEGRATIONS
// ============================================================================
// These three universes are imported from their own dedicated files:
// - MagicWandUniverse from './magicwand/MagicWandUniverse'
// - MyBrainLaboratory from './mybrain/MyBrainLaboratory'
// - FeatureIntegrationsOrchestra from './integrations/FeatureIntegrationsOrchestra'
//
// Each is a complete, self-contained interactive experience with
// its own personality, visual language, and creative freedom.
// ============================================================================