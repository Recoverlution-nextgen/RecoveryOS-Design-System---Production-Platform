import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Batch11to15 from '../navicues/batches11-15';
import * as Batch16to20 from '../navicues/batches16-20';

/**
 * BATCH VIEWERS for Batches 11-20
 */

interface BatchViewerProps {
  batchNumber: number;
  batchName: string;
  navicues: Array<{
    id: number;
    name: string;
    component: React.ComponentType<{ onComplete?: (data: any) => void; onExit?: () => void }>;
  }>;
  onNavigate?: (page: string) => void;
}

function BatchViewer({ batchNumber, batchName, navicues, onNavigate }: BatchViewerProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [results, setResults] = useState<any[]>([]);

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
            onClick={() => onNavigate?.('navicue-master-index')}
            className="text-sm px-4 py-2"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            ← Back to Master Index
          </button>

          <div>
            <h1 className="text-3xl mb-2" style={{ color: '#FFFFFF' }}>
              Batch {batchNumber}: {batchName}
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {navicues.length} NaviCues ready to experience
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
            Play All ({results.length}/{navicues.length} completed)
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

// Batch 11
export function NaviCueBatch11Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 101, name: 'Without Your Name', component: Batch11to15.NaviCue101 },
    { id: 102, name: 'Choose Age', component: Batch11to15.NaviCue102 },
    { id: 103, name: 'Past Self Meets', component: Batch11to15.NaviCue103 },
    { id: 104, name: 'Future Watching', component: Batch11to15.NaviCue104 },
    { id: 105, name: 'Remove Trait', component: Batch11to15.NaviCue105 },
    { id: 106, name: 'Add Quality', component: Batch11to15.NaviCue106 },
    { id: 107, name: 'Many Versions', component: Batch11to15.NaviCue107 },
    { id: 108, name: 'What You Hide', component: Batch11to15.NaviCue108 },
    { id: 109, name: 'Core Essence', component: Batch11to15.NaviCue109 },
    { id: 110, name: 'Dissolve Identity', component: Batch11to15.NaviCue110 },
  ];
  return <BatchViewer batchNumber={11} batchName="Identity Fragments" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 12
export function NaviCueBatch12Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 111, name: 'A or B', component: Batch11to15.NaviCue111 },
    { id: 112, name: 'Pick Number', component: Batch11to15.NaviCue112 },
    { id: 113, name: 'Left or Right', component: Batch11to15.NaviCue113 },
    { id: 114, name: 'Yes No Maybe', component: Batch11to15.NaviCue114 },
    { id: 115, name: 'More or Less', component: Batch11to15.NaviCue115 },
    { id: 116, name: 'Higher Lower', component: Batch11to15.NaviCue116 },
    { id: 117, name: 'First or Last', component: Batch11to15.NaviCue117 },
    { id: 118, name: 'In or Out', component: Batch11to15.NaviCue118 },
    { id: 119, name: 'Begin or End', component: Batch11to15.NaviCue119 },
    { id: 120, name: 'All or None', component: Batch11to15.NaviCue120 },
  ];
  return <BatchViewer batchNumber={12} batchName="Choice Without Meaning" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 13
export function NaviCueBatch13Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 121, name: 'Break Rhythm', component: Batch11to15.NaviCue121 },
    { id: 122, name: 'Skip Step', component: Batch11to15.NaviCue122 },
    { id: 123, name: 'Unexpected End', component: Batch11to15.NaviCue123 },
    { id: 124, name: 'Rule Changes', component: Batch11to15.NaviCue124 },
    { id: 125, name: 'Pattern Lies', component: Batch11to15.NaviCue125 },
    { id: 126, name: 'Expected Fails', component: Batch11to15.NaviCue126 },
    { id: 127, name: 'Normal Inverted', component: Batch11to15.NaviCue127 },
    { id: 128, name: 'Routine Shattered', component: Batch11to15.NaviCue128 },
    { id: 129, name: 'Predictable Broken', component: Batch11to15.NaviCue129 },
    { id: 130, name: 'Break Prediction', component: Batch11to15.NaviCue130 },
  ];
  return <BatchViewer batchNumber={13} batchName="Pattern Breaking" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 14
export function NaviCueBatch14Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 131, name: 'Let Go', component: Batch11to15.NaviCue131 },
    { id: 132, name: 'Release Control', component: Batch11to15.NaviCue132 },
    { id: 133, name: 'Stop Trying', component: Batch11to15.NaviCue133 },
    { id: 134, name: 'Allow It', component: Batch11to15.NaviCue134 },
    { id: 135, name: 'Give Up Wisely', component: Batch11to15.NaviCue135 },
    { id: 136, name: 'Acceptance Gauge', component: Batch11to15.NaviCue136 },
    { id: 137, name: 'Flow State', component: Batch11to15.NaviCue137 },
    { id: 138, name: 'Resistance Fade', component: Batch11to15.NaviCue138 },
    { id: 139, name: 'Struggle Meter', component: Batch11to15.NaviCue139 },
    { id: 140, name: 'Surrender Depth', component: Batch11to15.NaviCue140 },
  ];
  return <BatchViewer batchNumber={14} batchName="Surrender Mechanics" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 15
export function NaviCueBatch15Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 141, name: 'What Reflects', component: Batch11to15.NaviCue141 },
    { id: 142, name: 'See Yourself Seeing', component: Batch11to15.NaviCue142 },
    { id: 143, name: 'Mirror Distortion', component: Batch11to15.NaviCue143 },
    { id: 144, name: 'Reflection Truth', component: Batch11to15.NaviCue144 },
    { id: 145, name: 'Who Looks Back', component: Batch11to15.NaviCue145 },
    { id: 146, name: 'Self Image Gap', component: Batch11to15.NaviCue146 },
    { id: 147, name: 'Reality Perception', component: Batch11to15.NaviCue147 },
    { id: 148, name: 'Projection Meter', component: Batch11to15.NaviCue148 },
    { id: 149, name: 'Shadow Self', component: Batch11to15.NaviCue149 },
    { id: 150, name: 'True Reflection', component: Batch11to15.NaviCue150 },
  ];
  return <BatchViewer batchNumber={15} batchName="Mirror & Reflection" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 16
export function NaviCueBatch16Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 151, name: 'Maximum Intensity', component: Batch16to20.NaviCue151 },
    { id: 152, name: 'Minimum Existence', component: Batch16to20.NaviCue152 },
    { id: 153, name: 'Total Overflow', component: Batch16to20.NaviCue153 },
    { id: 154, name: 'Complete Depletion', component: Batch16to20.NaviCue154 },
    { id: 155, name: 'Beyond Limit', component: Batch16to20.NaviCue155 },
    { id: 156, name: 'Before Threshold', component: Batch16to20.NaviCue156 },
    { id: 157, name: 'Breaking Point', component: Batch16to20.NaviCue157 },
    { id: 158, name: 'At Edge', component: Batch16to20.NaviCue158 },
    { id: 159, name: 'Over Line', component: Batch16to20.NaviCue159 },
    { id: 160, name: 'Absolute Zero', component: Batch16to20.NaviCue160 },
  ];
  return <BatchViewer batchNumber={16} batchName="Edge Cases & Extremes" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 17
export function NaviCueBatch17Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 161, name: 'NaviCue About NaviCues', component: Batch16to20.NaviCue161 },
    { id: 162, name: 'Question Questions', component: Batch16to20.NaviCue162 },
    { id: 163, name: 'Choose to Choose', component: Batch16to20.NaviCue163 },
    { id: 164, name: 'Think Thinking', component: Batch16to20.NaviCue164 },
    { id: 165, name: 'Feel Feeling', component: Batch16to20.NaviCue165 },
    { id: 166, name: 'Aware Awareness', component: Batch16to20.NaviCue166 },
    { id: 167, name: 'Loop Within Loop', component: Batch16to20.NaviCue167 },
    { id: 168, name: 'Meta Layer', component: Batch16to20.NaviCue168 },
    { id: 169, name: 'Self Reference', component: Batch16to20.NaviCue169 },
    { id: 170, name: 'Infinite Regress', component: Batch16to20.NaviCue170 },
  ];
  return <BatchViewer batchNumber={17} batchName="Recursive & Meta" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 18
export function NaviCueBatch18Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 171, name: 'What Taste', component: Batch16to20.NaviCue171 },
    { id: 172, name: 'Texture Now', component: Batch16to20.NaviCue172 },
    { id: 173, name: 'Sound Silence', component: Batch16to20.NaviCue173 },
    { id: 174, name: 'Smell Memory', component: Batch16to20.NaviCue174 },
    { id: 175, name: 'Touch Without Contact', component: Batch16to20.NaviCue175 },
    { id: 176, name: 'See Eyes Closed', component: Batch16to20.NaviCue176 },
    { id: 177, name: 'Hear Thoughts', component: Batch16to20.NaviCue177 },
    { id: 178, name: 'Feel Invisible', component: Batch16to20.NaviCue178 },
    { id: 179, name: 'Sense Absent', component: Batch16to20.NaviCue179 },
    { id: 180, name: 'Synesthesia Moment', component: Batch16to20.NaviCue180 },
  ];
  return <BatchViewer batchNumber={18} batchName="Sensory" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 19
export function NaviCueBatch19Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 181, name: 'Both And State', component: Batch16to20.NaviCue181 },
    { id: 182, name: 'Superposition', component: Batch16to20.NaviCue182 },
    { id: 183, name: 'Collapse Wave', component: Batch16to20.NaviCue183 },
    { id: 184, name: 'Uncertain Until Observed', component: Batch16to20.NaviCue184 },
    { id: 185, name: 'Probability Slider', component: Batch16to20.NaviCue185 },
    { id: 186, name: 'Schrödinger Moment', component: Batch16to20.NaviCue186 },
    { id: 187, name: 'Entanglement', component: Batch16to20.NaviCue187 },
    { id: 188, name: 'Observer Effect', component: Batch16to20.NaviCue188 },
    { id: 189, name: 'Quantum Leap', component: Batch16to20.NaviCue189 },
    { id: 190, name: 'Uncertainty Principle', component: Batch16to20.NaviCue190 },
  ];
  return <BatchViewer batchNumber={19} batchName="Quantum & Uncertainty" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 20
export function NaviCueBatch20Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 191, name: 'What Missing', component: Batch16to20.NaviCue191 },
    { id: 192, name: 'Absence Presence', component: Batch16to20.NaviCue192 },
    { id: 193, name: 'Negative Space', component: Batch16to20.NaviCue193 },
    { id: 194, name: 'Void Quality', component: Batch16to20.NaviCue194 },
    { id: 195, name: 'Describe Nothing', component: Batch16to20.NaviCue195 },
    { id: 196, name: 'Lack Awareness', component: Batch16to20.NaviCue196 },
    { id: 197, name: 'Gap Recognition', component: Batch16to20.NaviCue197 },
    { id: 198, name: 'Hollow Measure', component: Batch16to20.NaviCue198 },
    { id: 199, name: 'Anti Matter', component: Batch16to20.NaviCue199 },
    { id: 200, name: 'NaviCue 200', component: Batch16to20.NaviCue200 },
  ];
  return <BatchViewer batchNumber={20} batchName="Void & Absence" navicues={navicues} onNavigate={onNavigate} />;
}
