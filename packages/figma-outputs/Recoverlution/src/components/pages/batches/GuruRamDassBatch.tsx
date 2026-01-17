/**
 * GURU RAM DASS BATCH PAGE
 * 14 Ram Dass NaviCues from batches-guru
 */

import React, { useState } from 'react';
import GuruRamDass from '../../navicues/batches-guru/guru-batch-01-ram-dass';

const navicues = [
  { id: 'witness', name: 'Witness Toggle', component: GuruRamDass.WitnessToggle, desc: 'Experience vs observer perspective' },
  { id: 'now', name: 'Now Duration Test', component: GuruRamDass.NowDurationTest, desc: 'How long can you stay in "now"?' },
  { id: 'soul', name: 'Soul vs Ego Identifier', component: GuruRamDass.SoulVsEgoIdentifier, desc: 'Which voice is speaking?' },
  { id: 'awareness', name: 'Awareness of Awareness', component: GuruRamDass.AwarenessOfAwareness, desc: 'Watch yourself watching' },
  { id: 'loving', name: 'Loving Witness Practice', component: GuruRamDass.LovingWitnessPractice, desc: 'Compassionate observation' },
  { id: 'space', name: 'Spaciousness Meter', component: GuruRamDass.SpaciousnessMeter, desc: 'Space between you and experience' },
  { id: 'anchor', name: 'Here Now Anchor', component: GuruRamDass.HereNowAnchor, desc: 'Return to present moment' },
  { id: 'roles', name: 'Role Recognition', component: GuruRamDass.RoleRecognition, desc: 'Which characters are on stage?' },
  { id: 'distance', name: 'Thought Distance Slider', component: GuruRamDass.ThoughtDistanceSlider, desc: 'Proximity to thoughts' },
  { id: 'being', name: 'Being Beneath Doing', component: GuruRamDass.BeingBeneathDoing, desc: 'Strip away identities' },
  { id: 'window', name: 'Present Moment Window', component: GuruRamDass.PresentMomentWindow, desc: 'Open/close window to now' },
  { id: 'suffering', name: 'Suffering Formula', component: GuruRamDass.SufferingFormula, desc: 'Pain × Resistance calculator' },
  { id: 'fierce', name: 'Fierce Grace Toggle', component: GuruRamDass.FierceGraceToggle, desc: 'Sword and embrace' },
  { id: 'compassion', name: 'Compassion Circle', component: GuruRamDass.CompassionCircle, desc: 'Expand from self to all beings' },
];

interface GuruRamDassBatchProps {
  onNavigate?: (page: string) => void;
}

export function GuruRamDassBatch({ onNavigate }: GuruRamDassBatchProps) {
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
            ← Back to Ram Dass Collection
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
            GURU BATCH 01
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Ram Dass Collection
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            14 NaviCues for witness practice, Be Here Now, and loving presence
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
                RD-{String(idx + 1).padStart(2, '0')}
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

export default GuruRamDassBatch;
