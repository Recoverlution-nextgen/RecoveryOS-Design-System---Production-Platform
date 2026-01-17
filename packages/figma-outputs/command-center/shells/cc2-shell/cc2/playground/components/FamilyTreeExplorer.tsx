/**
 * FAMILY TREE EXPLORER
 * Three-column hierarchical drill-down
 * Schemas (20) → Families (200) → Mindblocks (2,400)
 */

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Mindblock {
  id: string;
  name: string;
  heat: 'RED' | 'AMBER' | 'GREEN';
  kbe: 'Knowing' | 'Believing' | 'Embodying';
}

interface Family {
  id: string;
  name: string;
  mindblocks: Mindblock[];
}

interface Schema {
  id: string;
  name: string;
  pillar: string;
  families: Family[];
}

const SAMPLE_DATA: Schema[] = [
  {
    id: 'abandonment',
    name: 'Abandonment',
    pillar: 'ER',
    families: [
      {
        id: 'fear-of-being-left',
        name: 'Fear of Being Left',
        mindblocks: [
          { id: 'mb1', name: 'If I show needs, they will leave', heat: 'RED', kbe: 'Believing' },
          { id: 'mb2', name: 'When close, I panic about loss', heat: 'AMBER', kbe: 'Embodying' },
          { id: 'mb3', name: 'Distance means rejection', heat: 'RED', kbe: 'Knowing' }
        ]
      },
      {
        id: 'hypervigilance-for-signs',
        name: 'Hypervigilance for Signs',
        mindblocks: [
          { id: 'mb4', name: 'If tone changes, abandonment is near', heat: 'AMBER', kbe: 'Believing' },
          { id: 'mb5', name: 'I scan for evidence of leaving', heat: 'RED', kbe: 'Embodying' }
        ]
      }
    ]
  },
  {
    id: 'mistrust',
    name: 'Mistrust/Abuse',
    pillar: 'ER',
    families: [
      {
        id: 'anticipating-harm',
        name: 'Anticipating Harm',
        mindblocks: [
          { id: 'mb6', name: 'If I trust, I will be hurt', heat: 'RED', kbe: 'Believing' },
          { id: 'mb7', name: 'People always have hidden motives', heat: 'AMBER', kbe: 'Knowing' }
        ]
      }
    ]
  },
  {
    id: 'defectiveness',
    name: 'Defectiveness',
    pillar: 'II',
    families: [
      {
        id: 'core-unworthiness',
        name: 'Core Unworthiness',
        mindblocks: [
          { id: 'mb8', name: 'If they knew me, they would reject me', heat: 'RED', kbe: 'Believing' },
          { id: 'mb9', name: 'I am fundamentally flawed', heat: 'RED', kbe: 'Embodying' }
        ]
      }
    ]
  }
];

export function FamilyTreeExplorer() {
  const [selectedSchema, setSelectedSchema] = useState<Schema | null>(SAMPLE_DATA[0]);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [expandedMindblock, setExpandedMindblock] = useState<string | null>(null);

  const getHeatColor = (heat: string) => {
    switch (heat) {
      case 'RED': return '#DC2626';
      case 'AMBER': return '#F59E42';
      case 'GREEN': return '#10B981';
      default: return '#71717A';
    }
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
              03 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Schemas, Families, Mindblocks.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Pick a schema, see the families, open a mindblock.
          </p>
        </div>
      </div>

      {/* Three-Column Layout */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-6" style={{ height: '700px' }}>
          {/* Column 1: Schemas */}
          <div className="border border-zinc-800 overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3">
              <h3 
                className="text-sm font-semibold text-zinc-400"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                SCHEMAS
              </h3>
            </div>
            <div>
              {SAMPLE_DATA.map((schema) => (
                <button
                  key={schema.id}
                  onClick={() => {
                    setSelectedSchema(schema);
                    setSelectedFamily(null);
                    setExpandedMindblock(null);
                  }}
                  className="w-full text-left px-4 py-3 border-b border-zinc-800 transition-colors hover:bg-zinc-900"
                  style={{
                    background: selectedSchema?.id === schema.id ? 'rgba(87, 57, 251, 0.1)' : 'transparent'
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-sm font-semibold"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {schema.name}
                    </span>
                    {selectedSchema?.id === schema.id && (
                      <ChevronRight className="w-4 h-4 text-[#5739FB]" />
                    )}
                  </div>
                  <span 
                    className="text-xs text-zinc-500"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {schema.families.length} families
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Families */}
          <div className="border border-zinc-800 overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3">
              <h3 
                className="text-sm font-semibold text-zinc-400"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                FAMILIES
              </h3>
            </div>
            <div>
              {selectedSchema ? (
                selectedSchema.families.map((family) => (
                  <button
                    key={family.id}
                    onClick={() => {
                      setSelectedFamily(family);
                      setExpandedMindblock(null);
                    }}
                    className="w-full text-left px-4 py-3 border-b border-zinc-800 transition-colors hover:bg-zinc-900"
                    style={{
                      background: selectedFamily?.id === family.id ? 'rgba(87, 57, 251, 0.1)' : 'transparent'
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span 
                        className="text-sm font-semibold"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {family.name}
                      </span>
                      {selectedFamily?.id === family.id && (
                        <ChevronRight className="w-4 h-4 text-[#5739FB]" />
                      )}
                    </div>
                    <span 
                      className="text-xs text-zinc-500"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {family.mindblocks.length} mindblocks
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-12 text-center text-zinc-500 text-sm">
                  Select a schema to view families
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Mindblocks */}
          <div className="border border-zinc-800 overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3">
              <h3 
                className="text-sm font-semibold text-zinc-400"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                MINDBLOCKS
              </h3>
            </div>
            <div>
              {selectedFamily ? (
                selectedFamily.mindblocks.map((mindblock) => (
                  <div key={mindblock.id} className="border-b border-zinc-800">
                    <button
                      onClick={() => setExpandedMindblock(
                        expandedMindblock === mindblock.id ? null : mindblock.id
                      )}
                      className="w-full text-left px-4 py-3 transition-colors hover:bg-zinc-900"
                    >
                      <p 
                        className="text-sm mb-2"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {mindblock.name}
                      </p>
                      <div className="flex gap-2">
                        <span 
                          className="text-xs px-2 py-1 font-semibold"
                          style={{
                            background: `${getHeatColor(mindblock.heat)}20`,
                            color: getHeatColor(mindblock.heat),
                            border: `1px solid ${getHeatColor(mindblock.heat)}40`,
                            fontFamily: 'var(--font-sans)'
                          }}
                        >
                          Heat: {mindblock.heat}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 font-semibold bg-zinc-800 text-zinc-300"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          KBE: {mindblock.kbe}
                        </span>
                      </div>
                    </button>
                    
                    {expandedMindblock === mindblock.id && (
                      <div className="px-4 pb-4 bg-zinc-950">
                        <div className="bg-zinc-900 border border-zinc-800 p-3">
                          <p className="text-xs text-zinc-400 mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                            ROUTING INFO
                          </p>
                          <p className="text-xs text-zinc-300" style={{ fontFamily: 'var(--font-sans)' }}>
                            Primary primitive: Orient<br />
                            Voice: Clinician<br />
                            Proof required: Delta -2 or better
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-12 text-center text-zinc-500 text-sm">
                  Select a family to view mindblocks
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
