/**
 * FOUR-LAYER ARCHITECTURE
 * How everything connects
 * CC2 (Control) → LUMA (Orchestration) → 6S Orbit (Daily OS) → Rooms (Delivery)
 */

import { useState } from 'react';
import { Settings, Brain, Grid3x3, Box, ChevronDown, ChevronUp } from 'lucide-react';

interface Layer {
  id: string;
  name: string;
  icon: any;
  color: string;
  shortDescription: string;
  whatItIs: string;
  whoUsesIt: string[];
  keyFunctions: string[];
  dataFlow: string;
}

const LAYERS: Layer[] = [
  {
    id: 'cc2',
    name: 'CC2',
    icon: Settings,
    color: '#5739FB',
    shortDescription: 'Command Center 2. Governance and control plane.',
    whatItIs: 'The clinical governance layer. Configuration, policy, proof ledger, simulation lab. Where clinicians design and monitor the system.',
    whoUsesIt: ['Clinicians', 'Researchers', 'System architects'],
    keyFunctions: [
      'Registry management',
      'Event monitoring',
      'Proof ledger access',
      'Journey template authoring',
      'Routing rule configuration',
      'Simulation and testing'
    ],
    dataFlow: 'Pushes configuration to LUMA. Receives proof receipts and event logs.'
  },
  {
    id: 'luma',
    name: 'LUMA',
    icon: Brain,
    color: '#40E0D0',
    shortDescription: 'Decision OS. Real-time orchestration and routing.',
    whatItIs: 'The intelligent orchestration layer. Reads state, applies routing logic, selects content, captures receipts. The brain that routes everything.',
    whoUsesIt: ['System (automated)', 'Power users (via Luma Talk)'],
    keyFunctions: [
      'State assessment',
      'Heat + KBE computation',
      'Archetype matching',
      'Content routing',
      'Voice selection',
      'Receipt capture',
      'Transfer scheduling'
    ],
    dataFlow: 'Receives state from 6S. Queries CC2 for routing rules. Pushes content to 6S and Rooms.'
  },
  {
    id: 'sixs',
    name: '6S Orbit',
    icon: Grid3x3,
    color: '#10B981',
    shortDescription: 'Daily OS. Soundtrack, Stories, Stickies, Shelf, Stations, Search.',
    whatItIs: 'The daily operating system. Where users live. Content organized by medium and intent. Ambient, explorable, always available.',
    whoUsesIt: ['All users (primary interface)'],
    keyFunctions: [
      'Soundtrack (audio library)',
      'Stories (journal)',
      'Stickies (notes)',
      'Shelf (saved content)',
      'Stations (themed collections)',
      'Search (universal query)'
    ],
    dataFlow: 'Sends user actions and state to LUMA. Receives routed content from LUMA and Rooms.'
  },
  {
    id: 'rooms',
    name: 'Rooms',
    icon: Box,
    color: '#9B87F5',
    shortDescription: 'Delivery contexts. Journeys, Therapy, Peer, Wellbeing.',
    whatItIs: 'Specialized delivery contexts. Each room has its own rules, rhythm, and receipts. Where structured programs and sessions live.',
    whoUsesIt: ['Users (context-specific)', 'Professionals (therapy room)', 'Peers (connection room)'],
    keyFunctions: [
      'Journey Room (832 scene library)',
      'Therapy Room (session management)',
      'Peer Room (connection hub)',
      'Wellbeing Room (video library)',
      'Family Room (support network)'
    ],
    dataFlow: 'Receives content and routing from LUMA. Sends completion receipts and state changes back to LUMA.'
  }
];

export function FourLayerArchitecture() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const toggleLayer = (id: string) => {
    setExpandedLayer(expandedLayer === id ? null : id);
  };

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
              10 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            How everything connects.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Four layers, one system.
          </p>
        </div>
      </div>

      {/* Layer Visualization */}
      <div className="max-w-[1000px] mx-auto px-8 py-12">
        <div className="space-y-6">
          {LAYERS.map((layer, index) => {
            const Icon = layer.icon;
            const isExpanded = expandedLayer === layer.id;

            return (
              <div key={layer.id}>
                {/* Layer Card */}
                <button
                  onClick={() => toggleLayer(layer.id)}
                  className="w-full text-left border border-zinc-800 p-6 transition-all hover:border-zinc-700"
                  style={{
                    background: 'rgba(39, 39, 42, 0.3)',
                    backdropFilter: 'blur(20px) saturate(110%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                    borderLeft: `4px solid ${layer.color}`
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Icon className="w-8 h-8 flex-shrink-0" style={{ color: layer.color }} />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 
                            className="text-2xl font-bold"
                            style={{ 
                              fontFamily: 'var(--font-display)',
                              color: layer.color
                            }}
                          >
                            {layer.name}
                          </h2>
                          <span 
                            className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            LAYER {index + 1}
                          </span>
                        </div>
                        
                        <p 
                          className="text-base text-zinc-400"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {layer.shortDescription}
                        </p>
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-zinc-500 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div 
                    className="border-l border-r border-b border-zinc-800 p-6"
                    style={{
                      background: 'rgba(39, 39, 42, 0.2)',
                      borderLeft: `4px solid ${layer.color}`
                    }}
                  >
                    {/* What It Is */}
                    <div className="mb-6">
                      <p 
                        className="text-xs text-zinc-500 mb-2"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        WHAT IT IS
                      </p>
                      <p 
                        className="text-sm text-zinc-300"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {layer.whatItIs}
                      </p>
                    </div>

                    {/* Who Uses It */}
                    <div className="mb-6">
                      <p 
                        className="text-xs text-zinc-500 mb-2"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        WHO USES IT
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {layer.whoUsesIt.map(user => (
                          <span
                            key={user}
                            className="text-xs px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            {user}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Functions */}
                    <div className="mb-6">
                      <p 
                        className="text-xs text-zinc-500 mb-3"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        KEY FUNCTIONS
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {layer.keyFunctions.map((func, i) => (
                          <div
                            key={i}
                            className="text-xs px-3 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            {func}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Data Flow */}
                    <div className="p-4 bg-zinc-900 border border-zinc-800">
                      <p 
                        className="text-xs text-zinc-500 mb-2"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        DATA FLOW
                      </p>
                      <p 
                        className="text-sm text-zinc-300"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {layer.dataFlow}
                      </p>
                    </div>
                  </div>
                )}

                {/* Connection Arrow */}
                {index < LAYERS.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-px h-8"
                        style={{ background: 'linear-gradient(180deg, ' + layer.color + ', ' + LAYERS[index + 1].color + ')' }}
                      />
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path 
                          d="M6 0 L6 12 M0 6 L6 12 L12 6" 
                          stroke={LAYERS[index + 1].color} 
                          strokeWidth="2" 
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Simulate Flow CTA */}
        <div className="mt-12 text-center">
          <button
            className="px-8 py-4 bg-[#5739FB] text-white font-semibold text-lg transition-all hover:bg-[#3E2BB8]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Simulate flow
          </button>
        </div>
      </div>
    </div>
  );
}
