import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NaviCue01 } from '../navicues/batch1/NaviCue01';
import { NaviCue02 } from '../navicues/batch1/NaviCue02';
import { NaviCue03 } from '../navicues/batch1/NaviCue03';
import { NaviCue04 } from '../navicues/batch1/NaviCue04';
import { NaviCue05 } from '../navicues/batch1/NaviCue05';
import { NaviCue06 } from '../navicues/batch1/NaviCue06';
import { NaviCue07 } from '../navicues/batch1/NaviCue07';
import { NaviCue08 } from '../navicues/batch1/NaviCue08';
import { NaviCue09 } from '../navicues/batch1/NaviCue09';
import { NaviCue10 } from '../navicues/batch1/NaviCue10';

/**
 * BATCH 1 VIEWER
 * Quick review interface for 10 NaviCues
 */

interface NaviCueBatch1ViewerProps {
  onNavigate?: (page: string) => void;
}

export function NaviCueBatch1Viewer({ onNavigate }: NaviCueBatch1ViewerProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const navicues = [
    { id: 1, name: 'Silence Before Speaking', component: NaviCue01 },
    { id: 2, name: 'Certainty Counter', component: NaviCue02 },
    { id: 3, name: 'Wait for Nothing', component: NaviCue03 },
    { id: 4, name: 'Hold Until Right', component: NaviCue04 },
    { id: 5, name: 'Impermanence Memory', component: NaviCue05 },
    { id: 6, name: 'Weight Slider', component: NaviCue06 },
    { id: 7, name: 'What You Resist', component: NaviCue07 },
    { id: 8, name: 'Breath Counter', component: NaviCue08 },
    { id: 9, name: 'Unsaid Word', component: NaviCue09 },
    { id: 10, name: 'If No One Watched', component: NaviCue10 },
  ];

  const handleComplete = (index: number, data: any) => {
    setResults([...results, { index, data }]);
  };

  const handleExit = () => {
    if (currentIndex !== null && currentIndex < navicues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(null);
    }
  };

  if (currentIndex !== null) {
    const CurrentNaviCue = navicues[currentIndex].component;
    return (
      <AnimatePresence mode="wait">
        <CurrentNaviCue
          key={currentIndex}
          onComplete={(data) => handleComplete(currentIndex, data)}
          onExit={handleExit}
        />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate?.('navicue-arsenal')}
            className="text-sm px-4 py-2"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            ← Back to Arsenal
          </button>

          <div>
            <h1 className="text-3xl mb-2" style={{ color: '#FFFFFF' }}>
              Batch 1: Free Mind Experiments
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              10 NaviCues. No explanation. No rules. Just experience.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {navicues.map((navicue, index) => (
            <button
              key={navicue.id}
              onClick={() => setCurrentIndex(index)}
              className="aspect-square p-6 flex flex-col items-center justify-center text-center transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: results.some(r => r.index === index) 
                  ? 'rgba(87, 57, 251, 0.3)' 
                  : 'rgba(87, 57, 251, 0.1)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
              }}
            >
              <div className="text-3xl mb-3" style={{ color: '#5739FB' }}>
                {navicue.id}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {navicue.name}
              </div>
              {results.some(r => r.index === index) && (
                <div className="mt-2 text-xs" style={{ color: '#5739FB' }}>
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Play All */}
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
            }}
          >
            Play All ({results.length}/10 completed)
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-12 p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
            <h2 className="text-xl mb-4" style={{ color: '#FFFFFF' }}>
              Captured Data
            </h2>
            <div className="space-y-2 text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {results.map((result, i) => (
                <div key={i}>
                  NaviCue {navicues[result.index].id}: {JSON.stringify(result.data)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
