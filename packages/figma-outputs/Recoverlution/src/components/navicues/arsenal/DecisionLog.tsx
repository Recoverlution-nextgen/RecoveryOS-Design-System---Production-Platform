import React, { useState } from 'react';

/**
 * DECISION LOG - KNOWING LAYER
 * 
 * Purpose: Tracks micro-choices to reveal decision-making patterns
 * Mechanism: Quick binary choices logged over time
 * Psychology: Accumulation reveals values and priorities
 * 
 * Example: Throughout day - "Rest or push?" "Connect or withdraw?"
 * Pattern over week reveals actual priorities vs stated values
 */

interface DecisionLogProps {
  question: string;
  optionA: string;
  optionB: string;
  context?: string;
  onChoice: (choice: 'A' | 'B') => void;
}

export function DecisionLog({ question, optionA, optionB, context, onChoice }: DecisionLogProps) {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);

  const handleChoice = (choice: 'A' | 'B') => {
    setSelected(choice);
    setTimeout(() => {
      onChoice(choice);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-10">
        {/* Context */}
        {context && (
          <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {context}
          </div>
        )}

        {/* Question */}
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#5739FB' }}>
            Right now
          </div>
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
            {question}
          </h2>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => handleChoice('A')}
            className="p-8 transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: selected === 'A' ? '#3E2BB8' : 'rgba(87, 57, 251, 0.15)',
              border: `2px solid ${selected === 'A' ? '#5739FB' : 'transparent'}`,
              color: '#FFFFFF',
            }}
          >
            <div className="text-xl">{optionA}</div>
          </button>
          
          <button
            onClick={() => handleChoice('B')}
            className="p-8 transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: selected === 'B' ? '#3E2BB8' : 'rgba(87, 57, 251, 0.15)',
              border: `2px solid ${selected === 'B' ? '#5739FB' : 'transparent'}`,
              color: '#FFFFFF',
            }}
          >
            <div className="text-xl">{optionB}</div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Your choices reveal your priorities
        </div>
      </div>
    </div>
  );
}
