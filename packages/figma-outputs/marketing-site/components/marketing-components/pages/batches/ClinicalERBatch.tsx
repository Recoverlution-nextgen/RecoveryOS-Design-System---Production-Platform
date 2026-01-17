/**
 * CLINICAL ER BATCH PAGE
 * 10 Emotional Regulation NaviCues from arsenal
 */

import React, { useState } from 'react';
import ClinicalER from '../../navicues/arsenal/clinical-batch-01-ER';

const navicues = [
  { id: 'vagal', name: 'Vagal Tone Baseline', component: ClinicalER.VagalToneBaseline, desc: 'Count breaths for 60s to establish baseline vagal tone' },
  { id: 'window', name: 'Window of Tolerance', component: ClinicalER.WindowOfToleranceMap, desc: 'Map your position in arousal zones' },
  { id: 'delta', name: 'State Delta Capture', component: ClinicalER.StateDeltaCapture, desc: 'Measure before/after state change' },
  { id: 'grounding', name: 'Grounding Anchor', component: ClinicalER.GroundingAnchor, desc: '5-4-3-2-1 sensory anchoring' },
  { id: 'breath', name: 'Breath Rhythm Matcher', component: ClinicalER.BreathRhythmMatcher, desc: '4-2-6-2 breathing pacer' },
  { id: 'goldilocks', name: 'Arousal Goldilocks', component: ClinicalER.ArousalGoldilocks, desc: 'Too high/too low/just right' },
  { id: 'emotion', name: 'Emotion Namer', component: ClinicalER.EmotionNamer, desc: 'Non-cliché emotion words' },
  { id: 'coreg', name: 'Co-Regulation Detector', component: ClinicalER.CoRegulationDetector, desc: 'Who calms or activates you?' },
  { id: 'recovery', name: 'Recovery Half-Life', component: ClinicalER.RecoveryHalfLife, desc: 'Return to baseline speed' },
  { id: 'polyvagal', name: 'Polyvagal State Indicator', component: ClinicalER.PolyvagalStateIndicator, desc: 'Ventral/Sympathetic/Dorsal recognition' },
];

interface ClinicalERBatchProps {
  onNavigate?: (page: string) => void;
}

export function ClinicalERBatch({ onNavigate }: ClinicalERBatchProps) {
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
            ← Back to ER Arsenal
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
            PILLAR ER
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Emotional Regulation Arsenal
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            10 NaviCues for vagal tone, window of tolerance, state regulation, and grounding
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
                NC-A{String(idx + 1).padStart(2, '0')}
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

export default ClinicalERBatch;
