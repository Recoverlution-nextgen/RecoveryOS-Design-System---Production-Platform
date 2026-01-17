/**
 * VOICE TAXONOMY
 * Eight clinical stances (not personalities)
 * Flip card interface with audio samples
 */

import { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface Voice {
  id: string;
  name: string;
  stance: string;
  color: string;
  whenToUse: string;
  pairings: string[];
  sampleMindblocks: string[];
  audioLength: string;
}

const VOICES: Voice[] = [
  {
    id: 'clinician',
    name: 'Clinician',
    stance: 'Evidence-based, structured, measurement-focused',
    color: '#5739FB',
    whenToUse: 'Heat RED, KBE Knowing. Need for structure and safety.',
    pairings: ['Orient', 'Downshift', 'Capture Receipt'],
    sampleMindblocks: ['If I feel panic, something is wrong', 'I cannot control my response'],
    audioLength: '0:32'
  },
  {
    id: 'witness',
    name: 'Witness',
    stance: 'Observational, non-judgmental, spacious',
    color: '#40E0D0',
    whenToUse: 'Heat AMBER, KBE Believing. Need for perspective.',
    pairings: ['Witness', 'Name Pattern', 'Reframe'],
    sampleMindblocks: ['This thought is me', 'I am my emotions'],
    audioLength: '0:28'
  },
  {
    id: 'coach',
    name: 'Coach',
    stance: 'Action-oriented, skill-building, forward momentum',
    color: '#10B981',
    whenToUse: 'Heat GREEN, KBE Embodying. Ready for action.',
    pairings: ['Make Move', 'Transfer Test', 'Experiment'],
    sampleMindblocks: ['I know what to do but do not do it', 'Change seems impossible'],
    audioLength: '0:35'
  },
  {
    id: 'sage',
    name: 'Sage',
    stance: 'Wisdom tradition, contemplative, long view',
    color: '#9B87F5',
    whenToUse: 'Heat AMBER to GREEN. Seeking meaning and context.',
    pairings: ['Witness', 'Name Pattern', 'Integrate'],
    sampleMindblocks: ['This moment is all there is', 'I cannot see the bigger picture'],
    audioLength: '0:42'
  },
  {
    id: 'paradox',
    name: 'Paradox',
    stance: 'Both/and, koan-like, tension-holding',
    color: '#F59E42',
    whenToUse: 'Heat AMBER. Stuck in either/or thinking.',
    pairings: ['Reframe', 'Paradox Prompt', 'Witness'],
    sampleMindblocks: ['It is either this or that', 'I must choose one truth'],
    audioLength: '0:30'
  },
  {
    id: 'nurturer',
    name: 'Nurturer',
    stance: 'Compassionate, soothing, self-care focused',
    color: '#E85D75',
    whenToUse: 'Heat RED. High distress, need for soothing.',
    pairings: ['Downshift', 'Self-Compassion', 'Repair'],
    sampleMindblocks: ['I do not deserve kindness', 'Self-care is selfish'],
    audioLength: '0:38'
  },
  {
    id: 'straight-talk',
    name: 'Straight Talk',
    stance: 'Direct, accountability-focused, boundary-setting',
    color: '#DC2626',
    whenToUse: 'Heat GREEN. Ready for honesty and accountability.',
    pairings: ['Name Pattern', 'Make Move', 'Boundary Work'],
    sampleMindblocks: ['I avoid hard truths', 'Honesty will hurt too much'],
    audioLength: '0:26'
  },
  {
    id: 'elder',
    name: 'Elder',
    stance: 'Experience-grounded, legacy-aware, integrative',
    color: '#8B5CF6',
    whenToUse: 'Heat GREEN. Integration and transfer phase.',
    pairings: ['Integrate', 'Transfer Test', 'Wisdom Capture'],
    sampleMindblocks: ['This change is isolated', 'I cannot hold what I learned'],
    audioLength: '0:45'
  }
];

export function VoiceTaxonomy() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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
              05 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Eight clinical stances.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Choose the stance that fits the heat and the job.
          </p>
        </div>
      </div>

      {/* Voice Cards Grid */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-6">
          {VOICES.map((voice) => {
            const isFlipped = flippedCards.has(voice.id);
            
            return (
              <div
                key={voice.id}
                className="relative"
                style={{ height: '320px', perspective: '1000px' }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 border border-zinc-800 p-6 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: 'hidden',
                      background: 'rgba(39, 39, 42, 0.3)',
                      backdropFilter: 'blur(20px) saturate(110%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                      borderTop: `4px solid ${voice.color}`
                    }}
                  >
                    <div>
                      <h3 
                        className="text-2xl font-bold mb-3"
                        style={{ 
                          fontFamily: 'var(--font-display)',
                          color: voice.color
                        }}
                      >
                        {voice.name}
                      </h3>
                      <p 
                        className="text-sm text-zinc-400"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {voice.stance}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleFlip(voice.id)}
                      className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Flip card
                    </button>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 border border-zinc-800 p-6 flex flex-col overflow-y-auto"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'rgba(39, 39, 42, 0.3)',
                      backdropFilter: 'blur(20px) saturate(110%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                      borderTop: `4px solid ${voice.color}`
                    }}
                  >
                    {/* When to Use */}
                    <div className="mb-4">
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
                        {voice.whenToUse}
                      </p>
                    </div>

                    {/* Pairings */}
                    <div className="mb-4">
                      <p 
                        className="text-xs text-zinc-500 mb-2"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        PAIRINGS
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {voice.pairings.map((pairing) => (
                          <span
                            key={pairing}
                            className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            {pairing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sample Mindblocks */}
                    <div className="mb-4">
                      <p 
                        className="text-xs text-zinc-500 mb-2"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        SAMPLE MINDBLOCKS
                      </p>
                      <div className="space-y-1">
                        {voice.sampleMindblocks.map((mb, i) => (
                          <p 
                            key={i}
                            className="text-xs text-zinc-400"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            • {mb}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Audio Sample */}
                    <button
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors mt-auto"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      <Volume2 className="w-4 h-4" />
                      Play {voice.audioLength} sample
                    </button>

                    <button
                      onClick={() => toggleFlip(voice.id)}
                      className="px-3 py-2 mt-2 bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Flip back
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
