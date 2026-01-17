/**
 * RELEASE PROMPT PLAYER
 * 
 * Invitation to let go of something
 * Response: Slider 0-10 (readiness to release)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Wind } from 'lucide-react';

interface ReleasePromptPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function ReleasePromptPlayer({ navicue, variant, userState, onResponse }: ReleasePromptPlayerProps) {
  const [readiness, setReadiness] = useState(5);
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'slider_0_10',
      value: readiness,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Wind className="w-10 h-10 text-[#5739FB] opacity-70" />
      </div>
      
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
      
      {/* What to Release */}
      {variant.copy.prompt && (
        <div className="p-6 bg-zinc-900/50 border-l-4 border-[#5739FB] mb-8 text-lg italic">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Readiness Slider */}
      <div className="mb-8">
        <label className="block text-base opacity-70 mb-4 text-center">
          How ready do you feel to release this?
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={readiness}
          onChange={(e) => setReadiness(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs opacity-60 mt-2">
          <span>Not ready</span>
          <span className="text-2xl text-[#5739FB]">{readiness}</span>
          <span>Ready to let go</span>
        </div>
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8]"
      >
        Continue
      </button>
    </div>
  );
}
