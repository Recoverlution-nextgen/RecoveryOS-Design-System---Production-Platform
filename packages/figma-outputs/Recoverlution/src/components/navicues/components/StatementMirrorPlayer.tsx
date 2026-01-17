/**
 * STATEMENT MIRROR PLAYER
 * 
 * Reflects user's own words back to create recognition
 * Response: Choice single (which reflection resonates most)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';

interface StatementMirrorPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function StatementMirrorPlayer({ navicue, variant, userState, onResponse }: StatementMirrorPlayerProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleSubmit = () => {
    if (!selectedOption) return;
    
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'choice_single',
      value: selectedOption,
      timestamp: new Date().toISOString(),
    });
  };
  
  const options = variant.copy.options || [
    'This lands',
    'Not quite',
    'Getting warmer',
    'Need to sit with this'
  ];
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl mb-6">
          {variant.copy.headline}
        </div>
      )}
      
      {/* Mirror Statement */}
      {variant.copy.body && (
        <div className="p-8 bg-gradient-to-br from-[#3E2BB8]/30 to-[#5739FB]/30 border-l-4 border-[#5739FB] mb-8 text-xl leading-relaxed italic">
          "{variant.copy.body}"
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-lg opacity-80 mb-6">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Options */}
      <div className="space-y-3 mb-8">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOption(option)}
            className={`w-full p-4 border-2 text-left transition-all ${
              selectedOption === option
                ? 'border-[#5739FB] bg-[#5739FB]/20'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
