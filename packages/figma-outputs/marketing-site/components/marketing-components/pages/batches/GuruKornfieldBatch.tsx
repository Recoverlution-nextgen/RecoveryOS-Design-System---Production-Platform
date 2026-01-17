/**
 * GURU JACK KORNFIELD BATCH PAGE
 * 16 NaviCues inspired by Jack Kornfield's teachings
 */

import React, { useState } from 'react';
import GuruKornfield from '../../navicues/batches-guru/guru-batch-05-kornfield';

const navicues = [
  // Wise Heart (4)
  { id: 'wise-heart', name: 'Wise Heart Practice', component: GuruKornfield.WiseHeartPractice, desc: 'Wisdom and compassion united' },
  { id: 'head-heart', name: 'Head and Heart Integration', component: GuruKornfield.HeadAndHeart, desc: 'Think and feel together' },
  { id: 'wisdom-compassion', name: 'Wisdom With Compassion', component: GuruKornfield.WisdomWithCompassion, desc: 'Balance both' },
  { id: 'discernment-love', name: 'Discernment and Love', component: GuruKornfield.DiscernmentAndLove, desc: 'Clear seeing, warm heart' },
  
  // RAIN Practice (4)
  { id: 'rain', name: 'RAIN Practice', component: GuruKornfield.RAINPractice, desc: 'Four steps for emotions' },
  { id: 'recognize', name: 'Recognize Step', component: GuruKornfield.Recognize, desc: 'Name what is happening' },
  { id: 'allow', name: 'Allow Step', component: GuruKornfield.Allow, desc: 'Let it be here' },
  { id: 'investigate', name: 'Investigate With Kindness', component: GuruKornfield.InvestigateWithKindness, desc: 'Explore with care' },
  
  // Forgiveness (4)
  { id: 'forgiveness', name: 'Forgiveness Practice', component: GuruKornfield.ForgivenessPractice, desc: 'Release the burden' },
  { id: 'forgive-self', name: 'Forgiving Yourself', component: GuruKornfield.ForgivingYourself, desc: 'Self-forgiveness work' },
  { id: 'forgive-others', name: 'Forgiving Others', component: GuruKornfield.ForgivingOthers, desc: 'Release resentment' },
  { id: 'grudges', name: 'Letting Go of Grudges', component: GuruKornfield.LettingGoOfGrudges, desc: 'Drop the weight' },
  
  // Loving-Kindness (4)
  { id: 'metta', name: 'Metta Practice', component: GuruKornfield.MettaPractice, desc: 'Loving-kindness meditation' },
  { id: 'loving-self', name: 'Loving-Kindness for Self', component: GuruKornfield.LovingKindnessForSelf, desc: 'Start with yourself' },
  { id: 'expanding-circle', name: 'Expanding the Circle', component: GuruKornfield.ExpandingTheCir, desc: 'Wider and wider love' },
  { id: 'difficult-people', name: 'Difficult People Practice', component: GuruKornfield.DifficultPeople, desc: 'Extend to challenges' },
];

interface GuruKornfieldBatchProps {
  onNavigate?: (page: string) => void;
}

export function GuruKornfieldBatch({ onNavigate }: GuruKornfieldBatchProps) {
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
            ← Back to Jack Kornfield Arsenal
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
            GURU BATCH 05
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Jack Kornfield Collection
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            16 NaviCues: Wise heart, RAIN practice, Forgiveness, Loving-kindness
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>4</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Wise Heart</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>4</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>RAIN</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>4</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Forgiveness</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>4</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Metta</div>
          </div>
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
                KORNFIELD-{String(idx + 1).padStart(2, '0')}
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

export default GuruKornfieldBatch;
