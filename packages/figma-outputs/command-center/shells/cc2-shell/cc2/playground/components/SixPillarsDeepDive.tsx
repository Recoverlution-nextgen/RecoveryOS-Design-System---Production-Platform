/**
 * SIX PILLARS DEEP DIVE
 * Longform vertical scroll through the six clinical pillars
 * ER, SR, SC, CR, II, DM
 */

import { useState } from 'react';
import { Heart, Shield, Users, Lightbulb, Compass, Target } from 'lucide-react';

interface Pillar {
  id: string;
  code: string;
  name: string;
  icon: any;
  color: string;
  quote: string;
  description: string;
  connectedSchemas: string[];
  sampleMindblocks: string[];
  proofArtifacts: string[];
  howItWorks: string[];
}

const PILLARS: Pillar[] = [
  {
    id: 'er',
    code: 'ER',
    name: 'Emotional Regulation',
    icon: Heart,
    color: '#E85D75',
    quote: 'The ability to notice, name, and modulate emotional states without suppression or explosion.',
    description: 'Physiology up through cognition. The foundation of all other work.',
    connectedSchemas: ['Abandonment', 'Mistrust/Abuse', 'Emotional Deprivation'],
    sampleMindblocks: [
      'If I feel anger, I will lose control',
      'Strong emotion means something is wrong',
      'I must suppress to stay safe'
    ],
    proofArtifacts: [
      'Heart rate variability improvement',
      'Self-reported distress delta',
      'Time to recovery metric'
    ],
    howItWorks: [
      'Orient to present state and physiology',
      'Downshift arousal with breath or movement',
      'Capture receipt of change'
    ]
  },
  {
    id: 'sr',
    code: 'SR',
    name: 'Stress Resilience',
    icon: Shield,
    color: '#5AB9EA',
    quote: 'Building capacity to meet challenge without fracture.',
    description: 'Not eliminating stress, but changing the relationship to it.',
    connectedSchemas: ['Dependence', 'Vulnerability', 'Insufficient Control'],
    sampleMindblocks: [
      'If stress comes, I will collapse',
      'I cannot handle uncertainty',
      'Challenge means danger'
    ],
    proofArtifacts: [
      'Challenge response delta',
      'Recovery time improvement',
      'Stress tolerance metric'
    ],
    howItWorks: [
      'Orient to stress as signal, not threat',
      'Downshift with grounding practice',
      'Capture receipt of resilience'
    ]
  },
  {
    id: 'sc',
    code: 'SC',
    name: 'Social Connectivity',
    icon: Users,
    color: '#10B981',
    quote: 'Healthy attachment without enmeshment or isolation.',
    description: 'Connection as nourishment, not obligation or threat.',
    connectedSchemas: ['Enmeshment', 'Subjugation', 'Self-Sacrifice', 'Social Isolation'],
    sampleMindblocks: [
      'If I set boundaries, I will be alone',
      'Connection requires sacrifice',
      'I am safer isolated'
    ],
    proofArtifacts: [
      'Boundary setting frequency',
      'Connection quality rating',
      'Enmeshment reduction delta'
    ],
    howItWorks: [
      'Orient to connection needs vs fears',
      'Downshift with self-compassion',
      'Capture receipt of healthy connection'
    ]
  },
  {
    id: 'cr',
    code: 'CR',
    name: 'Cognitive Reframing',
    icon: Lightbulb,
    color: '#40E0D0',
    quote: 'Seeing thoughts as events, not truth. Rewriting the narrative.',
    description: 'From automatic to intentional cognition.',
    connectedSchemas: ['Negativity', 'Emotional Inhibition', 'Punitiveness', 'Pessimism'],
    sampleMindblocks: [
      'This thought is who I am',
      'If I think it, it must be true',
      'I cannot change my mind'
    ],
    proofArtifacts: [
      'Thought distancing metric',
      'Reframe frequency count',
      'Narrative shift delta'
    ],
    howItWorks: [
      'Orient to thought as object',
      'Downshift with witness stance',
      'Capture receipt of new frame'
    ]
  },
  {
    id: 'ii',
    code: 'II',
    name: 'Identity Integration',
    icon: Compass,
    color: '#9B87F5',
    quote: 'Coherent self that holds multiplicity without fragmentation.',
    description: 'Who you are when no one is watching.',
    connectedSchemas: ['Defectiveness', 'Approval Seeking', 'Shame'],
    sampleMindblocks: [
      'I am what others think of me',
      'My value depends on performance',
      'I am fundamentally broken'
    ],
    proofArtifacts: [
      'Self-concept stability metric',
      'Values-action alignment score',
      'Shame response delta'
    ],
    howItWorks: [
      'Orient to core values vs conditional worth',
      'Downshift with self-compassion',
      'Capture receipt of integration'
    ]
  },
  {
    id: 'dm',
    code: 'DM',
    name: 'Decision Mastery',
    icon: Target,
    color: '#F59E42',
    quote: 'Making choices aligned with values, not fear or compulsion.',
    description: 'Agency over reactivity. Future over past.',
    connectedSchemas: ['Failure', 'Unrelenting Standards', 'Entitlement'],
    sampleMindblocks: [
      'If I choose wrong, I am worthless',
      'Perfect is the only option',
      'I deserve without effort'
    ],
    proofArtifacts: [
      'Decision confidence rating',
      'Values alignment score',
      'Rumination reduction delta'
    ],
    howItWorks: [
      'Orient to values vs fear-based choice',
      'Downshift perfectionism with compassion',
      'Capture receipt of aligned decision'
    ]
  }
];

export function SixPillarsDeepDive() {
  const [activePillar, setActivePillar] = useState<string>(PILLARS[0].id);

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
              04 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Six pillars. Physiology up to identity.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Enter on the pillar that matches the present state.
          </p>
        </div>
      </div>

      {/* Pillar Navigation */}
      <div className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex gap-1">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setActivePillar(pillar.id);
                    document.getElementById(`pillar-${pillar.id}`)?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                  className="flex-1 py-4 transition-all"
                  style={{
                    borderBottom: activePillar === pillar.id 
                      ? `3px solid ${pillar.color}` 
                      : '3px solid transparent',
                    color: activePillar === pillar.id ? pillar.color : '#71717A'
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span 
                      className="text-xs font-semibold"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {pillar.code}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pillar Sections */}
      <div className="max-w-[900px] mx-auto px-8">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <section
              key={pillar.id}
              id={`pillar-${pillar.id}`}
              className="py-20 border-b border-zinc-800"
            >
              {/* Icon & Name */}
              <div className="flex items-center gap-4 mb-6">
                <Icon className="w-10 h-10" style={{ color: pillar.color }} />
                <div>
                  <h2 
                    className="text-3xl font-bold"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      color: pillar.color
                    }}
                  >
                    {pillar.name}
                  </h2>
                  <p 
                    className="text-sm text-zinc-500"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {pillar.code}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote 
                className="text-xl italic text-zinc-300 mb-8 pl-6 border-l-4"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  borderColor: pillar.color
                }}
              >
                {pillar.quote}
              </blockquote>

              {/* Description */}
              <p 
                className="text-lg text-zinc-400 mb-8"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {pillar.description}
              </p>

              {/* Connected Schemas */}
              <div className="mb-8">
                <h3 
                  className="text-sm font-semibold text-zinc-500 mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  CONNECTED SCHEMAS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pillar.connectedSchemas.map((schema) => (
                    <span
                      key={schema}
                      className="px-3 py-1 text-sm bg-zinc-900 border border-zinc-800 text-zinc-300"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {schema}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Mindblocks */}
              <div className="mb-8">
                <h3 
                  className="text-sm font-semibold text-zinc-500 mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  SAMPLE MINDBLOCKS
                </h3>
                <div className="space-y-2">
                  {pillar.sampleMindblocks.map((mindblock, i) => (
                    <div 
                      key={i}
                      className="p-3 bg-zinc-900 border border-zinc-800 text-sm text-zinc-300"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {mindblock}
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div className="mb-8">
                <h3 
                  className="text-sm font-semibold text-zinc-500 mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  HOW IT WORKS
                </h3>
                <div className="space-y-2">
                  {pillar.howItWorks.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span 
                        className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold"
                        style={{
                          background: pillar.color,
                          color: '#000',
                          fontFamily: 'var(--font-sans)'
                        }}
                      >
                        {i + 1}
                      </span>
                      <p 
                        className="text-sm text-zinc-300 pt-1"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proof Artifacts */}
              <div className="mb-8">
                <h3 
                  className="text-sm font-semibold text-zinc-500 mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  PROOF ARTIFACTS
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {pillar.proofArtifacts.map((artifact) => (
                    <div 
                      key={artifact}
                      className="p-3 bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 text-center"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {artifact}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                className="px-6 py-3 font-semibold transition-all"
                style={{
                  background: pillar.color,
                  color: '#000',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                Open pillar detail
              </button>
            </section>
          );
        })}
      </div>
    </div>
  );
}
