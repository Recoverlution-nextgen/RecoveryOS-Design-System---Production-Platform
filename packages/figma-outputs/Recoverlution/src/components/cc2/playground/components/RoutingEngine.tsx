/**
 * ROUTING ENGINE
 * Route by archetype, not by content
 * Heat + KBE + Schema → Archetype → Primitives, Voice, Proof
 */

import { useState } from 'react';
import { Play } from 'lucide-react';

interface Archetype {
  id: string;
  name: string;
  defaultHeat: 'RED' | 'AMBER' | 'GREEN';
  color: string;
  description: string;
  voices: string[];
  primitives: string[];
  families: string[];
  proofRequirements: string;
}

const ARCHETYPES: Archetype[] = [
  {
    id: 'panic-state',
    name: 'Panic State',
    defaultHeat: 'RED',
    color: '#DC2626',
    description: 'High arousal, threat perception, need for immediate regulation',
    voices: ['Clinician', 'Nurturer'],
    primitives: ['Orient', 'Downshift', 'Capture Receipt'],
    families: ['Fear of Being Left', 'Anticipating Harm', 'Catastrophic Thinking'],
    proofRequirements: 'HRV improvement or distress delta -2 minimum'
  },
  {
    id: 'rumination-loop',
    name: 'Rumination Loop',
    defaultHeat: 'AMBER',
    color: '#F59E42',
    description: 'Stuck in repetitive thought, need for cognitive distance',
    voices: ['Witness', 'Sage'],
    primitives: ['Witness', 'Name Pattern', 'Reframe'],
    families: ['Unrelenting Standards', 'Catastrophic Thinking', 'Hypervigilance'],
    proofRequirements: 'Thought distancing metric or pattern identification logged'
  },
  {
    id: 'action-ready',
    name: 'Action Ready',
    defaultHeat: 'GREEN',
    color: '#10B981',
    description: 'Calm, clear, ready for behavioral experiment',
    voices: ['Coach', 'Straight Talk'],
    primitives: ['Make Move', 'Transfer Test', 'Experiment'],
    families: ['Avoidance Patterns', 'Behavioral Freeze', 'Skill Deficit'],
    proofRequirements: 'Action completion + context test logged'
  },
  {
    id: 'shame-spiral',
    name: 'Shame Spiral',
    defaultHeat: 'RED',
    color: '#E85D75',
    description: 'Core wound activated, need for compassion and repair',
    voices: ['Nurturer', 'Witness'],
    primitives: ['Downshift', 'Repair', 'Self-Compassion'],
    families: ['Core Unworthiness', 'Defectiveness', 'Rejection Sensitivity'],
    proofRequirements: 'Self-compassion moment + repair attempt logged'
  },
  {
    id: 'integration-phase',
    name: 'Integration Phase',
    defaultHeat: 'GREEN',
    color: '#9B87F5',
    description: 'Multiple wins, ready to consolidate and transfer',
    voices: ['Elder', 'Sage'],
    primitives: ['Integrate', 'Transfer Test', 'Wisdom Capture'],
    families: ['Identity Patterns', 'Values Alignment', 'Meaning Making'],
    proofRequirements: 'Transfer completion + reflection logged'
  },
  {
    id: 'paradox-tension',
    name: 'Paradox Tension',
    defaultHeat: 'AMBER',
    color: '#40E0D0',
    description: 'Both/and conflict, need for tension holding',
    voices: ['Paradox', 'Sage'],
    primitives: ['Paradox Prompt', 'Witness', 'Reframe'],
    families: ['Either/Or Thinking', 'Moral Rigidity', 'Control Compulsion'],
    proofRequirements: 'Paradox hold logged or both/and statement captured'
  },
  {
    id: 'grief-state',
    name: 'Grief State',
    defaultHeat: 'AMBER',
    color: '#8B5CF6',
    description: 'Loss processing, need for witness and spaciousness',
    voices: ['Witness', 'Nurturer'],
    primitives: ['Witness', 'Allow', 'Repair'],
    families: ['Abandonment', 'Loss Patterns', 'Attachment Injury'],
    proofRequirements: 'Witness moment + emotion timeline logged'
  },
  {
    id: 'perfectionism-block',
    name: 'Perfectionism Block',
    defaultHeat: 'AMBER',
    color: '#F59E42',
    description: 'Performance anxiety, need for compassion and reframe',
    voices: ['Nurturer', 'Coach'],
    primitives: ['Reframe', 'Self-Compassion', 'Experiment'],
    families: ['Unrelenting Standards', 'Failure Fear', 'Approval Seeking'],
    proofRequirements: 'Micro-experiment + completion logged'
  },
  {
    id: 'isolation-pattern',
    name: 'Isolation Pattern',
    defaultHeat: 'AMBER',
    color: '#5AB9EA',
    description: 'Withdrawal, need for connection scaffolding',
    voices: ['Nurturer', 'Coach'],
    primitives: ['Orient', 'Micro-Connection', 'Capture Receipt'],
    families: ['Social Isolation', 'Enmeshment', 'Connection Avoidance'],
    proofRequirements: 'Connection attempt + subjective rating logged'
  },
  {
    id: 'breakthrough-moment',
    name: 'Breakthrough Moment',
    defaultHeat: 'GREEN',
    color: '#06B6D4',
    description: 'Insight crystallized, ready to lock in and transfer',
    voices: ['Elder', 'Coach'],
    primitives: ['Name Pattern', 'Integrate', 'Transfer Test'],
    families: ['Pattern Recognition', 'Insight Moments', 'Identity Shifts'],
    proofRequirements: 'Insight logged + transfer plan documented'
  }
];

export function RoutingEngine() {
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [simulationInput, setSimulationInput] = useState('');

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <div className="mb-3">
            <span 
              className="text-xs tracking-[0.2em] text-zinc-500"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              07 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Route by archetype, not by content.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Heat + KBE + schema leads to archetype, primitives, voice, proof.
          </p>
        </div>
      </div>

      {/* Two-Panel Layout */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Left: Archetype List */}
          <div className="border border-zinc-800">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3">
              <h3 
                className="text-sm font-semibold text-zinc-400"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                ARCHETYPES
              </h3>
            </div>
            <div className="max-h-[700px] overflow-y-auto">
              {ARCHETYPES.map((archetype) => (
                <button
                  key={archetype.id}
                  onClick={() => setSelectedArchetype(archetype)}
                  className="w-full text-left px-4 py-4 border-b border-zinc-800 transition-colors hover:bg-zinc-900"
                  style={{
                    background: selectedArchetype?.id === archetype.id 
                      ? 'rgba(87, 57, 251, 0.1)' 
                      : 'transparent'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-sm font-semibold"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {archetype.name}
                    </span>
                    <span 
                      className="text-xs px-2 py-1 font-bold"
                      style={{
                        background: `${archetype.color}20`,
                        color: archetype.color,
                        border: `1px solid ${archetype.color}40`,
                        fontFamily: 'var(--font-sans)'
                      }}
                    >
                      {archetype.defaultHeat}
                    </span>
                  </div>
                  <p 
                    className="text-xs text-zinc-500"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {archetype.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Routing Logic */}
          <div className="col-span-2">
            {selectedArchetype ? (
              <div 
                className="border border-zinc-800 p-8"
                style={{
                  background: 'rgba(39, 39, 42, 0.3)',
                  backdropFilter: 'blur(20px) saturate(110%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                  borderLeft: `4px solid ${selectedArchetype.color}`
                }}
              >
                {/* Archetype Name */}
                <h2 
                  className="text-3xl font-bold mb-4"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    color: selectedArchetype.color
                  }}
                >
                  {selectedArchetype.name}
                </h2>

                <p 
                  className="text-lg text-zinc-300 mb-8"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {selectedArchetype.description}
                </p>

                {/* Routing Details Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {/* Voices */}
                  <div>
                    <p 
                      className="text-xs text-zinc-500 mb-3"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      VOICES
                    </p>
                    <div className="space-y-2">
                      {selectedArchetype.voices.map((voice) => (
                        <div 
                          key={voice}
                          className="px-3 py-2 bg-zinc-900 border border-zinc-800 text-sm text-zinc-300"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {voice}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primitives */}
                  <div>
                    <p 
                      className="text-xs text-zinc-500 mb-3"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      PRIMITIVES
                    </p>
                    <div className="space-y-2">
                      {selectedArchetype.primitives.map((primitive) => (
                        <div 
                          key={primitive}
                          className="px-3 py-2 bg-zinc-900 border border-zinc-800 text-sm text-zinc-300"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {primitive}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Families */}
                <div className="mb-8">
                  <p 
                    className="text-xs text-zinc-500 mb-3"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    FAMILIES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedArchetype.families.map((family) => (
                      <span
                        key={family}
                        className="px-3 py-1 text-sm bg-zinc-900 border border-zinc-800 text-zinc-300"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {family}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Proof Requirements */}
                <div className="mb-8 p-4 bg-zinc-900 border border-zinc-800">
                  <p 
                    className="text-xs text-zinc-500 mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    PROOF REQUIREMENTS
                  </p>
                  <p 
                    className="text-sm text-zinc-300"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {selectedArchetype.proofRequirements}
                  </p>
                </div>

                {/* Simulation Input */}
                <div className="space-y-4">
                  <input
                    type="text"
                    value={simulationInput}
                    onChange={(e) => setSimulationInput(e.target.value)}
                    placeholder="Enter user state to simulate routing..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-[#5739FB] transition-colors"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  />
                  
                  <button
                    className="flex items-center gap-3 px-6 py-3 bg-[#5739FB] text-white font-semibold transition-all hover:bg-[#3E2BB8]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    <Play className="w-5 h-5" />
                    Run simulation
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="border border-zinc-800 flex items-center justify-center"
                style={{ height: '700px' }}
              >
                <p className="text-zinc-500" style={{ fontFamily: 'var(--font-sans)' }}>
                  Select an archetype to view routing logic
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
