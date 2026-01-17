import { useState } from 'react';
import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

interface Layer {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  color: string;
}

const layers: Layer[] = [
  {
    id: 'cc2',
    number: '01',
    name: 'Command Center 2',
    tagline: 'Control Plane · Truth · Governance',
    description: 'The mission control layer where schemas are defined, events are traced, proof is validated, and simulations are run.',
    features: [
      'Registry Studio: Define schemas, families, mindblocks',
      'Event Explorer: Trace every interaction',
      'Proof Ledger: Validate change receipts',
      'Simulation Lab: Test routing before deployment'
    ],
    color: '#5739FB'
  },
  {
    id: 'luma',
    number: '02',
    name: 'LUMA',
    tagline: 'AI Orchestration · Decision OS · WhyNow Engine',
    description: 'The intelligent layer that decides what cue to deliver, when to deliver it, and why it matters now.',
    features: [
      'Real-time state awareness (arousal, focus, context)',
      'Multi-armed bandit optimization',
      'Schema + heat + KBE routing',
      'Resistance signal detection'
    ],
    color: '#5739FB'
  },
  {
    id: 'orbit',
    number: '03',
    name: '6S Orbit',
    tagline: 'State · Scene · Session · Story · Soundbite · Structure',
    description: 'The six dimensions that govern how therapeutic work is packaged and delivered.',
    features: [
      'State: Arousal and activation level',
      'Scene: Momentary context and trigger',
      'Session: Time-boxed therapeutic container',
      'Story: Narrative coherence across time',
      'Soundbite: Portable wisdom units',
      'Structure: Repeatable patterns and routines'
    ],
    color: '#5739FB'
  },
  {
    id: 'rooms',
    number: '04',
    name: 'Rooms',
    tagline: '7 Therapeutic Environments',
    description: 'Where you actually live the work. Each room is purpose-built for a specific mode of engagement.',
    features: [
      'Journey: Guided pathways (64 templates, 832 scenes)',
      'Wellbeing: Daily state tracking and patterns',
      'Reflection: Process and integrate',
      'Library: Access your cue archive',
      'Progress: Proof and transfer metrics',
      'Connect: Support network',
      'Tools: Primitives and practices'
    ],
    color: '#5739FB'
  }
];

export function FourLayerArchitecture() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  return (
    <V3Section id="four-layers" className="py-24 bg-gradient-to-b from-black to-[#0A0A0A]">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Four-Layer Architecture
          </h2>
          <p className="text-xl text-white/70">
            A complete clinical operating system, built in layers from control to delivery
          </p>
        </div>

        {/* Layers Stack */}
        <div className="max-w-5xl mx-auto space-y-6">
          {layers.map((layer, index) => (
            <div key={layer.id}>
              {/* Layer Card */}
              <button
                onClick={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
                className="w-full text-left bg-white/5 border border-white/10 p-8 hover:border-[#5739FB]/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Layer Number */}
                    <div className="text-sm font-mono text-white/40 mb-2">
                      LAYER {layer.number}
                    </div>

                    {/* Layer Name */}
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-[#5739FB] transition-colors">
                      {layer.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-white/60 mb-4">
                      {layer.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-white/80 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>

                  {/* Expand Icon */}
                  <div className="ml-6 text-white/40 group-hover:text-[#5739FB] transition-colors">
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${
                        expandedLayer === layer.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedLayer === layer.id && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-3">
                      {layer.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#5739FB] mr-3 mt-1">•</span>
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>

              {/* Connection Arrow */}
              {index < layers.length - 1 && (
                <div className="flex justify-center py-3">
                  <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </V3Container>
    </V3Section>
  );
}
