import React, { useState } from 'react';

/**
 * BELIEF PROBE - KNOWING LAYER
 * 
 * Purpose: Reveals implicit beliefs through behavioral choices without self-report
 * Mechanism: Presents scenarios with multiple choice responses
 * Psychology: Response pattern reveals underlying framework
 * 
 * Example: "A friend cancels plans last minute. Your first thought:"
 * Options reveal attachment style, self-worth, trust patterns
 */

interface BeliefProbeProps {
  scenario: string;
  options: Array<{
    text: string;
    reveals: string; // What this choice reveals (e.g., "anxious_attachment")
  }>;
  onResponse: (selected: string, reveals: string) => void;
}

export function BeliefProbe({ scenario, options, onResponse }: BeliefProbeProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    setTimeout(() => {
      onResponse(options[index].text, options[index].reveals);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Scenario */}
        <div className="text-center space-y-4">
          <div className="text-sm uppercase tracking-wider" style={{ color: '#5739FB' }}>
            What would you think?
          </div>
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
            {scenario}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className="w-full p-6 text-left transition-all duration-200"
              style={{
                backgroundColor: selected === index ? '#3E2BB8' : 'rgba(87, 57, 251, 0.1)',
                border: selected === index ? '2px solid #5739FB' : '2px solid transparent',
                color: '#FFFFFF',
              }}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Instruction */}
        <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Choose your honest first reaction
        </div>
      </div>
    </div>
  );
}
