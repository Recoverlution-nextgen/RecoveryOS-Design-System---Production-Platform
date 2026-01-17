/**
 * CLINICAL SPINE HERO
 * Deterministic, auditable change pipeline
 * Problem → Mechanism → Schema → Family → Mindblock → Proof → Transfer
 */

import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface Stage {
  id: string;
  label: string;
  description: string;
  color: string;
}

const STAGES: Stage[] = [
  {
    id: 'problem',
    label: 'Problem',
    description: 'What hurts right now. The fracture.',
    color: '#DC2626'
  },
  {
    id: 'mechanism',
    label: 'Mechanism',
    description: 'How the pattern maintains itself.',
    color: '#F59E42'
  },
  {
    id: 'schema',
    label: 'Schema',
    description: 'The predictive pattern beneath.',
    color: '#8B5CF6'
  },
  {
    id: 'family',
    label: 'Family',
    description: 'Which cluster this belongs to.',
    color: '#10B981'
  },
  {
    id: 'mindblock',
    label: 'Mindblock',
    description: 'The if-X-then-Y we rewrite.',
    color: '#5739FB'
  },
  {
    id: 'proof',
    label: 'Proof',
    description: 'Measurable delta. Receipt.',
    color: '#40E0D0'
  },
  {
    id: 'transfer',
    label: 'Transfer',
    description: 'Repeat the win. New context.',
    color: '#06B6D4'
  }
];

export function ClinicalSpineHero() {
  const [activeStage, setActiveStage] = useState(0);

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
              01 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Deterministic, auditable change pipeline.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Problem to proof, one step at a time.
          </p>
        </div>
      </div>

      {/* Spine Visualization */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Stage Timeline */}
        <div className="relative mb-12">
          {/* Connection Line */}
          <div 
            className="absolute top-6 left-0 h-[2px]"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #DC2626 0%, #40E0D0 100%)'
            }}
          />

          {/* Stages */}
          <div className="relative flex justify-between items-start">
            {STAGES.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center">
                {/* Stage Circle */}
                <button
                  onClick={() => setActiveStage(index)}
                  className="relative z-10 transition-all duration-300"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius)',
                    border: `3px solid ${index === activeStage ? stage.color : '#27272A'}`,
                    background: index === activeStage ? stage.color : '#0A0B0F',
                    transform: index === activeStage ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  <span 
                    className="text-sm font-bold"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      color: index === activeStage ? '#000' : stage.color
                    }}
                  >
                    {index + 1}
                  </span>
                </button>

                {/* Stage Label */}
                <div className="mt-4 text-center">
                  <p 
                    className="text-sm font-semibold mb-1"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      color: index === activeStage ? stage.color : '#71717A'
                    }}
                  >
                    {stage.label}
                  </p>
                </div>

                {/* Arrow */}
                {index < STAGES.length - 1 && (
                  <ArrowRight 
                    className="absolute"
                    style={{
                      top: '18px',
                      left: '50%',
                      transform: 'translateX(50%)',
                      width: '20px',
                      height: '20px',
                      color: '#3F3F46'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Stage Panel */}
        <div 
          className="border border-zinc-800 p-8"
          style={{
            background: 'rgba(39, 39, 42, 0.3)',
            backdropFilter: 'blur(20px) saturate(110%)',
            WebkitBackdropFilter: 'blur(20px) saturate(110%)',
            borderLeft: `4px solid ${STAGES[activeStage].color}`
          }}
        >
          <div className="mb-4">
            <span 
              className="text-xs tracking-[0.15em] text-zinc-500"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              WHAT WE DO NOW
            </span>
          </div>

          <h2 
            className="text-3xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: STAGES[activeStage].color
            }}
          >
            {STAGES[activeStage].label}
          </h2>

          <p 
            className="text-lg text-zinc-300 mb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {STAGES[activeStage].description}
          </p>

          {/* Stage-Specific Content */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 p-4">
              <p className="text-xs text-zinc-500 mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                INPUT
              </p>
              <p className="text-sm text-zinc-300" style={{ fontFamily: 'var(--font-sans)' }}>
                {activeStage === 0 && 'User reports distress or fracture'}
                {activeStage === 1 && 'Identified problem pattern'}
                {activeStage === 2 && 'Validated mechanism'}
                {activeStage === 3 && 'Selected schema'}
                {activeStage === 4 && 'Confirmed family cluster'}
                {activeStage === 5 && 'Targeted mindblock'}
                {activeStage === 6 && 'Proof artifact with delta'}
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4">
              <p className="text-xs text-zinc-500 mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                PROCESS
              </p>
              <p className="text-sm text-zinc-300" style={{ fontFamily: 'var(--font-sans)' }}>
                {activeStage === 0 && 'Orient to present state'}
                {activeStage === 1 && 'Map how pattern maintains'}
                {activeStage === 2 && 'Match to schema library'}
                {activeStage === 3 && 'Assign to family cluster'}
                {activeStage === 4 && 'Identify if-then pattern'}
                {activeStage === 5 && 'Capture measurable receipt'}
                {activeStage === 6 && 'Test in new context'}
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4">
              <p className="text-xs text-zinc-500 mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                OUTPUT
              </p>
              <p className="text-sm text-zinc-300" style={{ fontFamily: 'var(--font-sans)' }}>
                {activeStage === 0 && 'Problem statement logged'}
                {activeStage === 1 && 'Mechanism documented'}
                {activeStage === 2 && 'Schema assigned'}
                {activeStage === 3 && 'Family confirmed'}
                {activeStage === 4 && 'Mindblock ready for work'}
                {activeStage === 5 && 'Receipt stored'}
                {activeStage === 6 && 'Transfer complete'}
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            className="flex items-center gap-3 px-6 py-3 bg-[#5739FB] text-white font-semibold transition-all hover:bg-[#3E2BB8]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <Play className="w-5 h-5" />
            Run routing simulation
          </button>
        </div>
      </div>
    </div>
  );
}
