/**
 * GURU BATCH 04: THÍCH NHẤT HẠNH
 * 18 NaviCues from Vietnamese Zen master
 * Core themes: Interbeing, Mindful breathing, Present moment, Deep listening, Peace
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// INTERBEING (6 NaviCues)
// ============================================================================

export function InterbeingAwareness() {
  const [selected, setSelected] = useState<string | null>(null);

  const connections = [
    { item: 'Your coffee', connections: ['Farmer', 'Earth', 'Rain', 'Sun', 'Truck driver', 'Store worker'] },
    { item: 'Your shirt', connections: ['Cotton plant', 'Worker', 'Designer', 'Water', 'Soil', 'Seeds'] },
    { item: 'Your breath', connections: ['Trees', 'Ocean', 'Atmosphere', 'Plants', 'Ancient forests', 'All beings'] },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Interbeing</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Nothing exists independently. Everything inter-is. See the connections.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {connections.map((item) => (
            <button
              key={item.item}
              onClick={() => setSelected(item.item)}
              className="p-6 text-center transition-all duration-200"
              style={{
                backgroundColor: selected === item.item ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                color: '#FFFFFF',
              }}
            >
              {item.item}
            </button>
          ))}
        </div>

        {selected && (
          <div className="p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.15)' }}>
            <div className="text-xl mb-6" style={{ color: '#5739FB' }}>
              {selected} contains:
            </div>
            <div className="grid grid-cols-2 gap-3">
              {connections.find(c => c.item === selected)?.connections.map((conn) => (
                <div key={conn} className="p-3 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)', color: '#FFFFFF' }}>
                  {conn}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function InterconnectionMapping() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Interconnection Mapping - Coming Soon</div>;
}

export function NothingIndependent() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Nothing Exists Independently - Coming Soon</div>;
}

export function WebOfLife() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Web of Life Visualization - Coming Soon</div>;
}

export function InterbeingPractice() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Interbeing Daily Practice - Coming Soon</div>;
}

export function EmptyOfSeparateSelf() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Empty of Separate Self - Coming Soon</div>;
}

// ============================================================================
// MINDFUL BREATHING (4 NaviCues)
// ============================================================================

export function ConsciousBreathing() {
  const [breathCount, setBreathCount] = useState(0);
  const [breathing, setBreathing] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Conscious Breathing</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Breathing in, I know I am breathing in. Breathing out, I know I am breathing out.
        </p>

        <div className="text-6xl mb-8" style={{ color: '#5739FB' }}>{breathCount}</div>
        <div className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Conscious breaths</div>

        <button
          onClick={() => setBreathCount(breathCount + 1)}
          className="px-12 py-6 text-2xl transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Breathe
        </button>

        {breathCount > 0 && (
          <div className="mt-12 p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: 'rgba(255, 255, 255, 0.8)' }}>
            {breathCount === 1 && 'You have begun.'}
            {breathCount > 1 && breathCount < 10 && 'Each breath brings you home.'}
            {breathCount >= 10 && breathCount < 50 && 'You are building the practice.'}
            {breathCount >= 50 && 'Your awareness deepens.'}
          </div>
        )}
      </div>
    </div>
  );
}

export function BreathingGathas() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Breathing Gathas - Coming Soon</div>;
}

export function InOutDeepSlow() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>In Out Deep Slow - Coming Soon</div>;
}

export function BreathAsAnchor() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Breath As Anchor - Coming Soon</div>;
}

// PRESENT MOMENT (4 NaviCues)
export function PresentMomentAwareness() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Present Moment Awareness - Coming Soon</div>;
}

export function HereAndNowPractice() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Here and Now Practice - Coming Soon</div>;
}

export function ArrivingInTheNow() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Arriving in the Now - Coming Soon</div>;
}

export function StoppingAndCalming() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Stopping and Calming - Coming Soon</div>;
}

// DEEP LISTENING (4 NaviCues)
export function DeepListeningPractice() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Deep Listening Practice - Coming Soon</div>;
}

export function ListeningWithCompassion() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Listening With Compassion - Coming Soon</div>;
}

export function LovingSpeech() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Loving Speech - Coming Soon</div>;
}

export function BeginningAnew() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Beginning Anew Practice - Coming Soon</div>;
}

const GuruThich = {
  // Interbeing (6)
  InterbeingAwareness,
  InterconnectionMapping,
  NothingIndependent,
  WebOfLife,
  InterbeingPractice,
  EmptyOfSeparateSelf,
  
  // Mindful Breathing (4)
  ConsciousBreathing,
  BreathingGathas,
  InOutDeepSlow,
  BreathAsAnchor,
  
  // Present Moment (4)
  PresentMomentAwareness,
  HereAndNowPractice,
  ArrivingInTheNow,
  StoppingAndCalming,
  
  // Deep Listening (4)
  DeepListeningPractice,
  ListeningWithCompassion,
  LovingSpeech,
  BeginningAnew,
};

export default GuruThich;
