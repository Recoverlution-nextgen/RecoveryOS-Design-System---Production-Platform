/**
 * WITNESS SWITCH PLAYER
 * 
 * Component: witness_switch
 * Purpose: Train "thought → noticer" flip (decentering)
 * Response: Fusion slider (0-10)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariant, StateSnapshot } from '../../../types/navicue-contract';

interface WitnessSwitchPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariant;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function WitnessSwitchPlayer({
  navicue,
  variant,
  userState,
  onResponse,
}: WitnessSwitchPlayerProps) {
  const [fusion, setFusion] = useState<number>(userState?.fusion || 5);
  
  const handleSubmit = () => {
    const response = {
      fusion_0_10: fusion,
    };
    
    const statePost: StateSnapshot = {
      ...userState,
      fusion,
    };
    
    onResponse(response, statePost);
  };
  
  return (
    <div className="p-8">
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>
      )}
      
      {/* Body */}
      {variant.copy.body && (
        <div className="text-lg opacity-90 mb-6">{variant.copy.body}</div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="p-4 bg-[#3E2BB8]/10 border-l-4 border-[#3E2BB8] mb-8">
          <div className="opacity-80">{variant.copy.prompt}</div>
        </div>
      )}
      
      {/* Fusion Slider */}
      <div className="mb-8">
        <label className="block text-sm opacity-70 mb-3">
          How fused are you with the thought right now?
        </label>
        
        <div className="flex items-center gap-4">
          <span className="text-xs opacity-60 w-24">Not fused</span>
          <input
            type="range"
            min="0"
            max="10"
            value={fusion}
            onChange={(e) => setFusion(parseInt(e.target.value))}
            className="flex-1 h-2 bg-zinc-700 appearance-none slider"
            style={{
              background: `linear-gradient(to right, #3E2BB8 0%, #5739FB ${fusion * 10}%, #3f3f46 ${fusion * 10}%, #3f3f46 100%)`
            }}
          />
          <span className="text-xs opacity-60 w-24 text-right">Fully fused</span>
        </div>
        
        <div className="text-center mt-3">
          <span className="text-3xl font-bold text-[#5739FB]">{fusion}</span>
          <span className="text-sm opacity-60 ml-2">/ 10</span>
        </div>
      </div>
      
      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors text-lg"
      >
        Continue
      </button>
    </div>
  );
}
