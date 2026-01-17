import React, { useState, useEffect } from 'react';

/**
 * REACTION TIMER - KNOWING LAYER
 * 
 * Purpose: Speed of response reveals automatic associations
 * Mechanism: Measures time to classify statements as true/false
 * Psychology: Faster = more automatic belief, slower = cognitive dissonance
 * 
 * Example: "I am lovable" - Quick YES = integrated belief
 *          "I am lovable" - Slow YES = intellectual but not embodied
 */

interface ReactionTimerProps {
  statement: string;
  onResponse: (answer: boolean, reactionTime: number) => void;
}

export function ReactionTimer({ statement, onResponse }: ReactionTimerProps) {
  const [startTime] = useState(Date.now());
  const [responded, setResponded] = useState(false);

  const handleResponse = (answer: boolean) => {
    if (responded) return;
    
    const reactionTime = Date.now() - startTime;
    setResponded(true);
    
    setTimeout(() => {
      onResponse(answer, reactionTime);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-12">
        {/* Instruction */}
        <div className="text-center text-sm uppercase tracking-wider" style={{ color: '#5739FB' }}>
          Answer as fast as you can
        </div>

        {/* Statement */}
        <div className="text-center">
          <h2 className="text-3xl" style={{ color: '#FFFFFF' }}>
            {statement}
          </h2>
        </div>

        {/* Response buttons */}
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => handleResponse(true)}
            disabled={responded}
            className="p-8 text-xl transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#3E2BB8',
              color: '#FFFFFF',
              opacity: responded ? 0.5 : 1,
            }}
          >
            TRUE
          </button>
          <button
            onClick={() => handleResponse(false)}
            disabled={responded}
            className="p-8 text-xl transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.2)',
              color: '#FFFFFF',
              opacity: responded ? 0.5 : 1,
            }}
          >
            FALSE
          </button>
        </div>

        {/* Hint */}
        <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Don't think. Just respond.
        </div>
      </div>
    </div>
  );
}
