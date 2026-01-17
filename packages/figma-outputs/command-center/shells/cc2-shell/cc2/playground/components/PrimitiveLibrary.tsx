/**
 * PRIMITIVE LIBRARY
 * Action primitives showcase
 * Smallest moves paired with voice and proof
 */

import { useState } from 'react';
import { Compass, ArrowDown, Zap, Wrench, Tag, Eye, FileCheck, ArrowRight } from 'lucide-react';

interface Primitive {
  id: string;
  name: string;
  icon: any;
  color: string;
  definition: string;
  whenToUse: string;
  heatLevel: string;
  proofRequired: string;
  sampleNavicue: string;
}

const PRIMITIVES: Primitive[] = [
  {
    id: 'orient',
    name: 'Orient',
    icon: Compass,
    color: '#5739FB',
    definition: 'Establish present state without judgment',
    whenToUse: 'Heat RED or AMBER. First move in any sequence.',
    heatLevel: 'RED, AMBER, GREEN',
    proofRequired: 'State assessment complete',
    sampleNavicue: 'Right now check: Body, emotion, thought, urge'
  },
  {
    id: 'downshift',
    name: 'Downshift',
    icon: ArrowDown,
    color: '#10B981',
    definition: 'Reduce arousal to workable level',
    whenToUse: 'Heat RED. Distress above threshold.',
    heatLevel: 'RED',
    proofRequired: 'HRV improvement or distress delta',
    sampleNavicue: '4-7-8 breath with somatic scan'
  },
  {
    id: 'make-move',
    name: 'Make Move',
    icon: Zap,
    color: '#F59E42',
    definition: 'Execute targeted behavioral change',
    whenToUse: 'Heat GREEN. Ready for action.',
    heatLevel: 'GREEN',
    proofRequired: 'Completion logged',
    sampleNavicue: 'Commit to one micro action in next 2 hours'
  },
  {
    id: 'repair',
    name: 'Repair',
    icon: Wrench,
    color: '#E85D75',
    definition: 'Restore after rupture or fracture',
    whenToUse: 'Heat RED to AMBER. After breach or failure.',
    heatLevel: 'RED, AMBER',
    proofRequired: 'Repair attempt logged',
    sampleNavicue: 'Name what happened, what you need, what comes next'
  },
  {
    id: 'name-pattern',
    name: 'Name Pattern',
    icon: Tag,
    color: '#40E0D0',
    definition: 'Identify recurring structure',
    whenToUse: 'Heat AMBER to GREEN. Pattern visible.',
    heatLevel: 'AMBER, GREEN',
    proofRequired: 'Pattern documented',
    sampleNavicue: 'If X happens, I always Y. This is [schema name]'
  },
  {
    id: 'witness',
    name: 'Witness',
    icon: Eye,
    color: '#9B87F5',
    definition: 'Observe without merger or judgment',
    whenToUse: 'Heat AMBER. Need for perspective.',
    heatLevel: 'AMBER',
    proofRequired: 'Witness stance logged',
    sampleNavicue: 'Thoughts are events. Watch them pass.'
  },
  {
    id: 'capture-receipt',
    name: 'Capture Receipt',
    icon: FileCheck,
    color: '#5AB9EA',
    definition: 'Document measurable change',
    whenToUse: 'After any primitive sequence.',
    heatLevel: 'RED, AMBER, GREEN',
    proofRequired: 'Receipt with delta stored',
    sampleNavicue: 'Before: 8/10 distress. After: 5/10. Delta: -3'
  },
  {
    id: 'transfer-test',
    name: 'Transfer Test',
    icon: ArrowRight,
    color: '#06B6D4',
    definition: 'Repeat win in new context',
    whenToUse: 'Heat GREEN. After receipt captured.',
    heatLevel: 'GREEN',
    proofRequired: 'Transfer attempt logged',
    sampleNavicue: 'Take this move to [new context] by [deadline]'
  }
];

export function PrimitiveLibrary() {
  const [selectedPrimitive, setSelectedPrimitive] = useState<Primitive | null>(null);

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
              06 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Primitive actions. Smallest moves.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Pick the move, then pair voice and proof.
          </p>
        </div>
      </div>

      {/* Primitive Grid + Detail */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Primitive Cards */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-6">
              {PRIMITIVES.map((primitive) => {
                const Icon = primitive.icon;
                return (
                  <button
                    key={primitive.id}
                    onClick={() => setSelectedPrimitive(primitive)}
                    className="text-left border border-zinc-800 p-6 transition-all hover:border-zinc-700"
                    style={{
                      background: selectedPrimitive?.id === primitive.id 
                        ? 'rgba(87, 57, 251, 0.1)' 
                        : 'rgba(39, 39, 42, 0.3)',
                      backdropFilter: 'blur(20px) saturate(110%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                      borderTop: selectedPrimitive?.id === primitive.id 
                        ? `4px solid ${primitive.color}` 
                        : '1px solid #27272A'
                    }}
                  >
                    <Icon 
                      className="w-8 h-8 mb-4" 
                      style={{ color: primitive.color }} 
                    />
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {primitive.name}
                    </h3>
                    <p 
                      className="text-sm text-zinc-400"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {primitive.definition}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Pane */}
          <div>
            {selectedPrimitive ? (
              <div 
                className="sticky top-8 border border-zinc-800 p-6"
                style={{
                  background: 'rgba(39, 39, 42, 0.3)',
                  backdropFilter: 'blur(20px) saturate(110%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                  borderLeft: `4px solid ${selectedPrimitive.color}`
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  {(() => {
                    const Icon = selectedPrimitive.icon;
                    return <Icon className="w-12 h-12" style={{ color: selectedPrimitive.color }} />;
                  })()}
                </div>

                {/* Name */}
                <h2 
                  className="text-3xl font-bold mb-4"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    color: selectedPrimitive.color
                  }}
                >
                  {selectedPrimitive.name}
                </h2>

                {/* Definition */}
                <p 
                  className="text-lg text-zinc-300 mb-6"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {selectedPrimitive.definition}
                </p>

                {/* When to Use */}
                <div className="mb-6">
                  <p 
                    className="text-xs text-zinc-500 mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    WHEN TO USE
                  </p>
                  <p 
                    className="text-sm text-zinc-300"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {selectedPrimitive.whenToUse}
                  </p>
                </div>

                {/* Heat Level */}
                <div className="mb-6">
                  <p 
                    className="text-xs text-zinc-500 mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    HEAT LEVEL
                  </p>
                  <p 
                    className="text-sm text-zinc-300 font-semibold"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {selectedPrimitive.heatLevel}
                  </p>
                </div>

                {/* Proof Required */}
                <div className="mb-6">
                  <p 
                    className="text-xs text-zinc-500 mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    PROOF REQUIRED
                  </p>
                  <p 
                    className="text-sm text-zinc-300"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {selectedPrimitive.proofRequired}
                  </p>
                </div>

                {/* Sample Navicue */}
                <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800">
                  <p 
                    className="text-xs text-zinc-500 mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    SAMPLE NAVICUE
                  </p>
                  <p 
                    className="text-sm text-zinc-300 italic"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {selectedPrimitive.sampleNavicue}
                  </p>
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <button
                    className="w-full px-4 py-3 bg-[#5739FB] text-white font-semibold transition-all hover:bg-[#3E2BB8]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Play navicue
                  </button>
                  <button
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white font-semibold transition-all hover:bg-zinc-800"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Use this primitive
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="sticky top-8 border border-zinc-800 p-6 flex items-center justify-center text-center"
                style={{ height: '500px' }}
              >
                <p className="text-zinc-500" style={{ fontFamily: 'var(--font-sans)' }}>
                  Select a primitive to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
