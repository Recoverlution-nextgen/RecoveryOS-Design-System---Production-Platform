/**
 * BELIEF PROBE PLAYER
 * 
 * Surfaces + challenges core beliefs through direct inquiry
 * Response: Binary (True/Not True) with intensity slider
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';

interface BeliefProbePlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function BeliefProbePlayer({ navicue, variant, userState, onResponse }: BeliefProbePlayerProps) {
  const [selectedResponse, setSelectedResponse] = useState<'true' | 'not_true' | null>(null);
  const [intensity, setIntensity] = useState(5);
  
  const handleSubmit = () => {
    if (!selectedResponse) return;
    
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'binary',
      value: selectedResponse,
      intensity,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl mb-6 text-center">
          {variant.copy.headline}
        </div>
      )}
      
      {/* Body */}
      {variant.copy.body && (
        <div className="text-lg opacity-80 mb-8 text-center leading-relaxed">
          {variant.copy.body}
        </div>
      )}
      
      {/* Belief Statement */}
      {variant.copy.prompt && (
        <div className="p-6 bg-[#3E2BB8]/20 border-2 border-[#3E2BB8] mb-8 text-center text-xl">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Binary Response */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSelectedResponse('true')}
          className={`flex-1 p-6 border-2 transition-all ${
            selectedResponse === 'true'
              ? 'border-[#5739FB] bg-[#5739FB]/20'
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
        >
          <div className="text-xl mb-2">✓</div>
          <div>This feels true</div>
        </button>
        
        <button
          onClick={() => setSelectedResponse('not_true')}
          className={`flex-1 p-6 border-2 transition-all ${
            selectedResponse === 'not_true'
              ? 'border-[#5739FB] bg-[#5739FB]/20'
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
        >
          <div className="text-xl mb-2">✗</div>
          <div>This does not feel true</div>
        </button>
      </div>
      
      {/* Intensity Slider */}
      {selectedResponse && (
        <div className="mb-8">
          <label className="block text-sm opacity-70 mb-3 text-center">
            How strongly do you {selectedResponse === 'true' ? 'believe' : 'reject'} this?
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-2xl text-[#5739FB] mt-2">{intensity}/10</div>
        </div>
      )}
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!selectedResponse}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
