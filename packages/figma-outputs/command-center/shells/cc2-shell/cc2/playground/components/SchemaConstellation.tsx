/**
 * SCHEMA CONSTELLATION
 * 20 predictive patterns, not diagnoses
 * Interactive network graph showing schema relationships
 */

import { useState } from 'react';
import { Network, Info } from 'lucide-react';

interface Schema {
  id: string;
  name: string;
  pillar: string;
  pillarColor: string;
  families: number;
  proofRoutes: number;
  x: number;
  y: number;
}

const SCHEMAS: Schema[] = [
  { id: 'abandonment', name: 'Abandonment', pillar: 'ER', pillarColor: '#E85D75', families: 12, proofRoutes: 8, x: 20, y: 30 },
  { id: 'mistrust', name: 'Mistrust/Abuse', pillar: 'ER', pillarColor: '#E85D75', families: 10, proofRoutes: 6, x: 35, y: 15 },
  { id: 'defectiveness', name: 'Defectiveness', pillar: 'II', pillarColor: '#9B87F5', families: 8, proofRoutes: 7, x: 50, y: 25 },
  { id: 'failure', name: 'Failure', pillar: 'DM', pillarColor: '#F59E42', families: 9, proofRoutes: 5, x: 70, y: 20 },
  { id: 'dependence', name: 'Dependence', pillar: 'SR', pillarColor: '#5AB9EA', families: 7, proofRoutes: 4, x: 15, y: 55 },
  { id: 'vulnerability', name: 'Vulnerability', pillar: 'SR', pillarColor: '#5AB9EA', families: 11, proofRoutes: 9, x: 30, y: 70 },
  { id: 'enmeshment', name: 'Enmeshment', pillar: 'SC', pillarColor: '#10B981', families: 6, proofRoutes: 3, x: 50, y: 60 },
  { id: 'subjugation', name: 'Subjugation', pillar: 'SC', pillarColor: '#10B981', families: 8, proofRoutes: 6, x: 65, y: 75 },
  { id: 'self-sacrifice', name: 'Self-Sacrifice', pillar: 'SC', pillarColor: '#10B981', families: 10, proofRoutes: 7, x: 80, y: 55 },
  { id: 'approval-seeking', name: 'Approval Seeking', pillar: 'II', pillarColor: '#9B87F5', families: 9, proofRoutes: 8, x: 25, y: 45 },
  { id: 'negativity', name: 'Negativity', pillar: 'CR', pillarColor: '#40E0D0', families: 7, proofRoutes: 5, x: 45, y: 40 },
  { id: 'control', name: 'Emotional Inhibition', pillar: 'CR', pillarColor: '#40E0D0', families: 8, proofRoutes: 6, x: 60, y: 45 },
  { id: 'unrelenting', name: 'Unrelenting Standards', pillar: 'DM', pillarColor: '#F59E42', families: 11, proofRoutes: 9, x: 75, y: 35 },
  { id: 'entitlement', name: 'Entitlement', pillar: 'DM', pillarColor: '#F59E42', families: 6, proofRoutes: 4, x: 85, y: 70 },
  { id: 'insufficient-control', name: 'Insufficient Control', pillar: 'SR', pillarColor: '#5AB9EA', families: 9, proofRoutes: 7, x: 15, y: 80 },
  { id: 'punitiveness', name: 'Punitiveness', pillar: 'CR', pillarColor: '#40E0D0', families: 8, proofRoutes: 5, x: 40, y: 85 },
  { id: 'social-isolation', name: 'Social Isolation', pillar: 'SC', pillarColor: '#10B981', families: 10, proofRoutes: 8, x: 55, y: 10 },
  { id: 'emotional-deprivation', name: 'Emotional Deprivation', pillar: 'ER', pillarColor: '#E85D75', families: 7, proofRoutes: 6, x: 10, y: 10 },
  { id: 'pessimism', name: 'Pessimism', pillar: 'CR', pillarColor: '#40E0D0', families: 6, proofRoutes: 4, x: 90, y: 25 },
  { id: 'shame', name: 'Shame', pillar: 'II', pillarColor: '#9B87F5', families: 12, proofRoutes: 10, x: 70, y: 90 }
];

export function SchemaConstellation() {
  const [selectedSchema, setSelectedSchema] = useState<Schema | null>(null);

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
              02 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            20 predictive patterns, not diagnoses.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Each schema holds its own families, voices, and proof routes.
          </p>
        </div>
      </div>

      {/* Constellation Visualization */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Network Graph */}
          <div className="col-span-2">
            <div 
              className="relative border border-zinc-800 bg-zinc-950"
              style={{ height: '700px' }}
            >
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {SCHEMAS.map((schema, i) => 
                  SCHEMAS.slice(i + 1).map((otherSchema, j) => {
                    const distance = Math.sqrt(
                      Math.pow(schema.x - otherSchema.x, 2) + 
                      Math.pow(schema.y - otherSchema.y, 2)
                    );
                    
                    if (distance < 30) {
                      return (
                        <line
                          key={`${i}-${j}`}
                          x1={`${schema.x}%`}
                          y1={`${schema.y}%`}
                          x2={`${otherSchema.x}%`}
                          y2={`${otherSchema.y}%`}
                          stroke="#27272A"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                      );
                    }
                    return null;
                  })
                )}
              </svg>

              {/* Schema Nodes */}
              {SCHEMAS.map((schema) => (
                <button
                  key={schema.id}
                  onClick={() => setSelectedSchema(schema)}
                  className="absolute transition-all hover:scale-110"
                  style={{
                    left: `${schema.x}%`,
                    top: `${schema.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div
                    className="w-3 h-3 transition-all"
                    style={{
                      background: selectedSchema?.id === schema.id ? schema.pillarColor : '#27272A',
                      border: `2px solid ${schema.pillarColor}`,
                      borderRadius: 'var(--radius)',
                      boxShadow: selectedSchema?.id === schema.id 
                        ? `0 0 20px ${schema.pillarColor}` 
                        : 'none'
                    }}
                  />
                  
                  {selectedSchema?.id === schema.id && (
                    <div
                      className="absolute top-full mt-2 px-3 py-1 whitespace-nowrap text-xs font-semibold"
                      style={{
                        background: schema.pillarColor,
                        color: '#000',
                        fontFamily: 'var(--font-sans)',
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                    >
                      {schema.name}
                    </div>
                  )}
                </button>
              ))}

              {/* Legend */}
              <div className="absolute bottom-6 left-6 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ background: '#E85D75', borderRadius: 'var(--radius)' }} />
                  <span className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-sans)' }}>ER</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ background: '#5AB9EA', borderRadius: 'var(--radius)' }} />
                  <span className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-sans)' }}>SR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ background: '#10B981', borderRadius: 'var(--radius)' }} />
                  <span className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-sans)' }}>SC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ background: '#40E0D0', borderRadius: 'var(--radius)' }} />
                  <span className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-sans)' }}>CR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ background: '#9B87F5', borderRadius: 'var(--radius)' }} />
                  <span className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-sans)' }}>II</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ background: '#F59E42', borderRadius: 'var(--radius)' }} />
                  <span className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-sans)' }}>DM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div>
            {selectedSchema ? (
              <div 
                className="border border-zinc-800 p-6"
                style={{
                  background: 'rgba(39, 39, 42, 0.3)',
                  backdropFilter: 'blur(20px) saturate(110%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                  borderLeft: `4px solid ${selectedSchema.pillarColor}`
                }}
              >
                <div className="mb-4">
                  <span 
                    className="text-xs tracking-[0.15em]"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      color: selectedSchema.pillarColor
                    }}
                  >
                    PILLAR: {selectedSchema.pillar}
                  </span>
                </div>

                <h2 
                  className="text-2xl font-bold mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {selectedSchema.name}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="bg-zinc-900 border border-zinc-800 p-4">
                    <p className="text-xs text-zinc-500 mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                      FAMILIES
                    </p>
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedSchema.families}
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-4">
                    <p className="text-xs text-zinc-500 mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                      PROOF ROUTES
                    </p>
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedSchema.proofRoutes}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                  {selectedSchema.families} families ready. Proof routes attached.
                </p>

                <button
                  className="w-full px-6 py-3 bg-[#5739FB] text-white font-semibold transition-all hover:bg-[#3E2BB8]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Show families and proofs
                </button>
              </div>
            ) : (
              <div 
                className="border border-zinc-800 p-6 flex flex-col items-center justify-center text-center"
                style={{ height: '700px' }}
              >
                <Network className="w-12 h-12 text-zinc-700 mb-4" />
                <p className="text-zinc-500" style={{ fontFamily: 'var(--font-sans)' }}>
                  Select a schema to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
