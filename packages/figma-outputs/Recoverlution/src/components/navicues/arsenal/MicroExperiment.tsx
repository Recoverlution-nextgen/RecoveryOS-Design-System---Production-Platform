import React, { useState } from 'react';

/**
 * MICRO-EXPERIMENT DESIGNER - BELIEVING LAYER
 * 
 * Purpose: Design safe real-world tests of new beliefs
 * Mechanism: Small, low-stakes experiments with clear hypothesis
 * Psychology: Experiential learning > intellectual understanding
 * 
 * Example: "Test: Ask one person for help today"
 * Hypothesis: "They will judge me" vs "They will be glad to help"
 * Outcome: Data that updates belief
 */

interface MicroExperimentProps {
  newBelief: string;
  suggestedExperiments: Array<{
    id: string;
    title: string;
    description: string;
    stakes: 'low' | 'medium' | 'high';
  }>;
  onDesign: (experimentId: string, hypothesis: string) => void;
}

export function MicroExperiment({ newBelief, suggestedExperiments, onDesign }: MicroExperimentProps) {
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);
  const [hypothesis, setHypothesis] = useState('');

  const handleDesign = () => {
    if (!selectedExperiment || !hypothesis.trim()) return;
    onDesign(selectedExperiment, hypothesis);
  };

  const selectedExp = suggestedExperiments.find(e => e.id === selectedExperiment);

  const stakesColor = (stakes: string) => {
    switch(stakes) {
      case 'low': return '#5739FB';
      case 'medium': return '#7B68EE';
      case 'high': return '#9370DB';
      default: return '#5739FB';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Micro-experiment
          </div>
          <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            New belief to test:
          </h2>
          <div className="text-2xl" style={{ color: '#FFFFFF' }}>
            {newBelief}
          </div>
        </div>

        {/* Suggested experiments */}
        <div className="space-y-3">
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Choose an experiment:
          </div>
          {suggestedExperiments.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setSelectedExperiment(exp.id)}
              className="w-full p-5 text-left transition-all duration-200"
              style={{
                backgroundColor: selectedExperiment === exp.id 
                  ? 'rgba(87, 57, 251, 0.2)' 
                  : 'rgba(87, 57, 251, 0.05)',
                border: `2px solid ${selectedExperiment === exp.id ? '#5739FB' : 'transparent'}`,
                color: '#FFFFFF',
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-lg">{exp.title}</div>
                <div 
                  className="text-xs px-2 py-1 uppercase"
                  style={{
                    backgroundColor: stakesColor(exp.stakes),
                    color: '#FFFFFF',
                  }}
                >
                  {exp.stakes} stakes
                </div>
              </div>
              <div className="text-sm opacity-70">{exp.description}</div>
            </button>
          ))}
        </div>

        {/* Hypothesis */}
        {selectedExperiment && (
          <div className="space-y-3">
            <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              What do you think will happen?
            </label>
            <textarea
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              placeholder="If I do this, I predict..."
              className="w-full p-4"
              rows={3}
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            />
          </div>
        )}

        {/* Start experiment */}
        <button
          onClick={handleDesign}
          disabled={!selectedExperiment || !hypothesis.trim()}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: (selectedExperiment && hypothesis.trim()) ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
            opacity: (selectedExperiment && hypothesis.trim()) ? 1 : 0.5,
          }}
        >
          Run experiment
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Experience changes beliefs more than thinking
        </div>
      </div>
    </div>
  );
}
