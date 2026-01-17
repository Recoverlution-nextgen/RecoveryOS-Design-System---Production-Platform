import React, { useState, useEffect } from 'react';

/**
 * IMPLICIT ASSOCIATION - KNOWING LAYER
 * 
 * Purpose: Pairs concepts to reveal hidden beliefs
 * Mechanism: Speed of association reveals automatic connections
 * Psychology: Based on Implicit Association Test (IAT)
 * 
 * Example: "Self + Worthy" vs "Self + Broken"
 * Faster pairing = stronger implicit belief
 */

interface ImplicitAssociationProps {
  concept1: string;
  concept2: string;
  question: string;
  onResponse: (associated: boolean, reactionTime: number) => void;
}

export function ImplicitAssociation({ concept1, concept2, question, onResponse }: ImplicitAssociationProps) {
  const [startTime] = useState(Date.now());
  const [responded, setResponded] = useState(false);

  const handleResponse = (associated: boolean) => {
    if (responded) return;
    
    const reactionTime = Date.now() - startTime;
    setResponded(true);
    
    setTimeout(() => {
      onResponse(associated, reactionTime);
    }, 200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-12">
        {/* Instruction */}
        <div className="text-center space-y-2">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Quick response
          </div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {question}
          </div>
        </div>

        {/* Concepts */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className="text-3xl" style={{ color: '#FFFFFF' }}>
              {concept1}
            </div>
            <div className="text-2xl" style={{ color: '#5739FB' }}>
              +
            </div>
            <div className="text-3xl" style={{ color: '#FFFFFF' }}>
              {concept2}
            </div>
          </div>
        </div>

        {/* Response */}
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => handleResponse(true)}
            disabled={responded}
            className="p-8 text-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#3E2BB8',
              color: '#FFFFFF',
              opacity: responded ? 0.5 : 1,
            }}
          >
            YES
          </button>
          <button
            onClick={() => handleResponse(false)}
            disabled={responded}
            className="p-8 text-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.2)',
              color: '#FFFFFF',
              opacity: responded ? 0.5 : 1,
            }}
          >
            NO
          </button>
        </div>

        {/* Hint */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
          Trust your gut response
        </div>
      </div>
    </div>
  );
}
