/**
 * PARTS ROLLCALL PLAYER
 * 
 * Component: parts_rollcall
 * Purpose: "Which part is driving?" (IFS without diagnosis)
 * Response: Part selected
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariant, StateSnapshot } from '../../../types/navicue-contract';

interface PartsRollcallPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariant;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

const DEFAULT_PARTS = [
  { key: 'protector', label: 'Protector' },
  { key: 'judge', label: 'Judge' },
  { key: 'pleaser', label: 'Pleaser' },
  { key: 'runner', label: 'Runner' },
  { key: 'child', label: 'Wounded Child' },
  { key: 'numb', label: 'Numb One' },
  { key: 'wise', label: 'Wise Self' },
];

export function PartsRollcallPlayer({
  navicue,
  variant,
  userState,
  onResponse,
}: PartsRollcallPlayerProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  
  // Use parts from config or default
  const parts = (navicue.config?.parts as any[]) || DEFAULT_PARTS;
  
  const handleSubmit = () => {
    if (!selectedPart) return;
    
    const response = {
      part_selected: selectedPart,
    };
    
    const statePost: StateSnapshot = {
      ...userState,
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
      
      {/* Parts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {parts.map((part) => (
          <button
            key={part.key}
            onClick={() => setSelectedPart(part.key)}
            className={`p-6 border-2 transition-all ${
              selectedPart === part.key
                ? 'border-[#5739FB] bg-[#5739FB]/10'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className="text-lg">{part.label}</div>
          </button>
        ))}
      </div>
      
      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!selectedPart}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg"
      >
        Continue
      </button>
    </div>
  );
}
