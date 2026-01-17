/**
 * GURU BATCH 05: JACK KORNFIELD
 * 16 NaviCues from American Buddhist teacher
 * Core themes: Wise heart, RAIN practice, Forgiveness, Loving-kindness, After the ecstasy the laundry
 */

import React, { useState } from 'react';

// ============================================================================
// WISE HEART (4 NaviCues)
// ============================================================================

export function WiseHeartPractice() {
  const [wisdom, setWisdom] = useState(5);
  const [compassion, setCompassion] = useState(5);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Wise Heart</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Wisdom and compassion together. Head and heart united.
        </p>

        <div className="space-y-8 mb-8">
          <div>
            <div className="mb-2" style={{ color: '#FFFFFF' }}>Wisdom</div>
            <input
              type="range"
              min="0"
              max="10"
              value={wisdom}
              onChange={(e) => setWisdom(parseInt(e.target.value))}
              className="w-full h-2"
              style={{ accentColor: '#5739FB' }}
            />
            <div className="text-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{wisdom}/10</div>
          </div>

          <div>
            <div className="mb-2" style={{ color: '#FFFFFF' }}>Compassion</div>
            <input
              type="range"
              min="0"
              max="10"
              value={compassion}
              onChange={(e) => setCompassion(parseInt(e.target.value))}
              className="w-full h-2"
              style={{ accentColor: '#FF6B9D' }}
            />
            <div className="text-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{compassion}/10</div>
          </div>
        </div>

        <div className="p-8 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-4" style={{ color: '#5739FB' }}>
            Balance: {Math.abs(wisdom - compassion) === 0 ? 'Perfect' : Math.abs(wisdom - compassion) < 3 ? 'Good' : 'Imbalanced'}
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {wisdom > compassion + 2 && 'All head, no heart. Wisdom without warmth.'}
            {compassion > wisdom + 2 && 'All heart, no head. Compassion without discernment.'}
            {Math.abs(wisdom - compassion) <= 2 && 'The wise heart integrates both.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeadAndHeart() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Head and Heart Integration - Coming Soon</div>;
}

export function WisdomWithCompassion() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Wisdom With Compassion - Coming Soon</div>;
}

export function DiscernmentAndLove() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Discernment and Love - Coming Soon</div>;
}

// ============================================================================
// RAIN PRACTICE (4 NaviCues)
// ============================================================================

export function RAINPractice() {
  const [step, setStep] = useState(0);

  const steps = [
    { letter: 'R', word: 'Recognize', desc: 'What is happening right now?' },
    { letter: 'A', word: 'Allow', desc: 'Can you let it be here?' },
    { letter: 'I', word: 'Investigate', desc: 'What does this feel like in your body?' },
    { letter: 'N', word: 'Nurture', desc: 'What does this part of you need?' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>RAIN Practice</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Four steps to work with difficult emotions.
        </p>

        <div className="space-y-6 mb-8">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: step === idx ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                opacity: step >= idx ? 1 : 0.5,
              }}
              onClick={() => setStep(idx)}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="text-3xl" style={{ color: '#FFFFFF' }}>{s.letter}</div>
                <div className="text-2xl" style={{ color: '#FFFFFF' }}>{s.word}</div>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {step === 3 && (
          <div className="text-center p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.15)', color: 'rgba(255, 255, 255, 0.8)' }}>
            You have completed the RAIN practice. The storm has passed.
          </div>
        )}
      </div>
    </div>
  );
}

export function Recognize() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Recognize Step - Coming Soon</div>;
}

export function Allow() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Allow Step - Coming Soon</div>;
}

export function InvestigateWithKindness() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Investigate With Kindness - Coming Soon</div>;
}

// FORGIVENESS (4 NaviCues)
export function ForgivenessPractice() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Forgiveness Practice - Coming Soon</div>;
}

export function ForgivingYourself() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Forgiving Yourself - Coming Soon</div>;
}

export function ForgivingOthers() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Forgiving Others - Coming Soon</div>;
}

export function LettingGoOfGrudges() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Letting Go of Grudges - Coming Soon</div>;
}

// LOVING-KINDNESS (4 NaviCues)
export function MettaPractice() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Metta Practice - Coming Soon</div>;
}

export function LovingKindnessForSelf() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Loving-Kindness for Self - Coming Soon</div>;
}

export function ExpandingTheCir() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Expanding the Circle - Coming Soon</div>;
}

export function DifficultPeople() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Difficult People Practice - Coming Soon</div>;
}

const GuruKornfield = {
  // Wise Heart (4)
  WiseHeartPractice,
  HeadAndHeart,
  WisdomWithCompassion,
  DiscernmentAndLove,
  
  // RAIN Practice (4)
  RAINPractice,
  Recognize,
  Allow,
  InvestigateWithKindness,
  
  // Forgiveness (4)
  ForgivenessPractice,
  ForgivingYourself,
  ForgivingOthers,
  LettingGoOfGrudges,
  
  // Loving-Kindness (4)
  MettaPractice,
  LovingKindnessForSelf,
  ExpandingTheCir,
  DifficultPeople,
};

export default GuruKornfield;
