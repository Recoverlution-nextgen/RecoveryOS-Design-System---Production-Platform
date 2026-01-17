/**
 * INFINITE QUANTUM BATCH PAGE
 * 9 Quantum Therapy NaviCues from batches-infinite
 */

import React, { useState } from 'react';
import InfiniteQuantum from '../../navicues/batches-infinite/infinite-batch-01-quantum';

const navicues = [
  { id: 'superposition', name: 'Superposition State Holder', component: InfiniteQuantum.SuperpositionStateHolder, desc: 'All emotional states exist until observed' },
  { id: 'uncertainty', name: 'Uncertainty Principle Slider', component: InfiniteQuantum.UncertaintyPrincipleSlider, desc: 'Position vs momentum trade-off' },
  { id: 'entanglement', name: 'Quantum Entanglement Detector', component: InfiniteQuantum.QuantumEntanglementDetector, desc: 'Correlated distant emotional states' },
  { id: 'wave', name: 'Wave-Particle Duality Toggle', component: InfiniteQuantum.WaveParticleDualityToggle, desc: 'You are both solid and fluid' },
  { id: 'tunneling', name: 'Quantum Tunneling Simulator', component: InfiniteQuantum.QuantumTunnelingSimulator, desc: 'Pass through impossible barriers' },
  { id: 'schrodinger', name: "Schrödinger's Emotional State", component: InfiniteQuantum.SchrodingersEmotionalState, desc: 'Fine AND not-fine until measured' },
  { id: 'probability', name: 'Probability Cloud Visualizer', component: InfiniteQuantum.ProbabilityCloudVisualizer, desc: 'Distribution not single answer' },
  { id: 'coherence', name: 'Quantum Coherence', component: InfiniteQuantum.QuantumCoherence, desc: 'Flow state vs decoherence' },
  { id: 'measurement', name: 'Quantum Measurement Problem', component: InfiniteQuantum.QuantumMeasurementProblem, desc: 'Observation changes reality' },
];

interface InfiniteQuantumBatchProps {
  onNavigate?: (page: string) => void;
}

export function InfiniteQuantumBatch({ onNavigate }: InfiniteQuantumBatchProps) {
  const [activeNaviCue, setActiveNaviCue] = useState<number | null>(null);

  if (activeNaviCue !== null) {
    const NaviCueComponent = navicues[activeNaviCue].component;
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
          <button
            onClick={() => setActiveNaviCue(null)}
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            ← Back to Quantum Collection
          </button>
        </div>
        <NaviCueComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          {onNavigate && (
            <button
              onClick={() => onNavigate('navicue-arsenal')}
              className="text-sm mb-4 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              ← Back to NaviCue Arsenal
            </button>
          )}
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5739FB' }}>
            INFINITE BATCH 01
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Quantum Therapy Mechanics
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            9 NaviCues using quantum physics as therapeutic metaphor
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {navicues.map((nc, idx) => (
            <button
              key={nc.id}
              onClick={() => setActiveNaviCue(idx)}
              className="p-8 text-left transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                border: '2px solid rgba(87, 57, 251, 0.2)',
              }}
            >
              <div className="text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: '#5739FB' }}>
                Q-{String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#FFFFFF' }}>
                {nc.name}
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {nc.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfiniteQuantumBatch;
