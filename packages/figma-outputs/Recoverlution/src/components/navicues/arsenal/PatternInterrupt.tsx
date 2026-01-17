import React, { useState } from 'react';

/**
 * PATTERN INTERRUPT - BELIEVING LAYER
 * 
 * Purpose: Catch automatic thought and insert alternative
 * Mechanism: Real-time recognition + replacement
 * Psychology: Interrupts habitual neural pathway, builds new one
 * 
 * Example: Automatic thought "I'll fail" → Interrupt → Alternative "I can learn"
 * Repetition creates new automatic response
 */

interface PatternInterruptProps {
  automaticThought: string;
  alternatives: string[];
  onInterrupt: (selectedAlternative: string) => void;
}

export function PatternInterrupt({ automaticThought, alternatives, onInterrupt }: PatternInterruptProps) {
  const [phase, setPhase] = useState<'recognize' | 'choose'>('recognize');
  const [selected, setSelected] = useState<number | null>(null);

  const handleRecognize = () => {
    setPhase('choose');
  };

  const handleChoose = (index: number) => {
    setSelected(index);
    setTimeout(() => {
      onInterrupt(alternatives[index]);
    }, 500);
  };

  if (phase === 'recognize') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-2xl w-full space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
              Pattern interrupt
            </div>
            <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Automatic thought detected:
            </h2>
          </div>

          {/* Automatic thought */}
          <div 
            className="p-8 text-center text-2xl relative"
            style={{
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              border: '2px solid rgba(255, 0, 0, 0.3)',
              color: '#FFFFFF',
            }}
          >
            <div className="absolute top-3 right-3 text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 0, 0, 0.6)' }}>
              OLD PATTERN
            </div>
            {automaticThought}
          </div>

          {/* Recognize */}
          <button
            onClick={handleRecognize}
            className="w-full p-6 text-lg transition-all duration-200"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
            }}
          >
            I recognize this pattern
          </button>

          {/* Insight */}
          <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Recognition is the first step to interruption
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Pattern interrupt
          </div>
          <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Choose a new response:
          </h2>
        </div>

        {/* Old thought (small) */}
        <div 
          className="p-4 text-center text-sm line-through opacity-40"
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.05)',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          {automaticThought}
        </div>

        {/* Alternatives */}
        <div className="space-y-3">
          {alternatives.map((alternative, index) => (
            <button
              key={index}
              onClick={() => handleChoose(index)}
              className="w-full p-6 text-left transition-all duration-200"
              style={{
                backgroundColor: selected === index 
                  ? '#3E2BB8' 
                  : 'rgba(87, 57, 251, 0.1)',
                border: `2px solid ${selected === index ? '#5739FB' : 'rgba(87, 57, 251, 0.2)'}`,
                color: '#FFFFFF',
              }}
            >
              <div className="text-xs mb-2 uppercase tracking-wider" style={{ color: '#5739FB' }}>
                NEW PATTERN
              </div>
              {alternative}
            </button>
          ))}
        </div>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Each time you choose the new pattern, it gets stronger
        </div>
      </div>
    </div>
  );
}
