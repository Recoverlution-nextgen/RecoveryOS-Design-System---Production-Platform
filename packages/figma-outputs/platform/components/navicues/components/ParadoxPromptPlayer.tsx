/**
 * PARADOX PROMPT PLAYER
 * 
 * Holds contradictory truths simultaneously
 * Response: Choice multi (which aspects are true)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';

interface ParadoxPromptPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function ParadoxPromptPlayer({ navicue, variant, userState, onResponse }: ParadoxPromptPlayerProps) {
  const [selected, setSelected] = useState<string[]>([]);
  
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter(o => o !== option));
    } else {
      setSelected([...selected, option]);
    }
  };
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'choice_multi',
      value: selected,
      timestamp: new Date().toISOString(),
    });
  };
  
  const options = variant.copy.options || [
    'I am broken AND whole',
    'I need to change AND I am enough',
    'This is painful AND necessary',
    'I am stuck AND making progress'
  ];
  
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
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-base opacity-70 mb-6 text-center italic">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Multi-Select Options */}
      <div className="space-y-3 mb-8">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => toggleOption(option)}
            className={`w-full p-5 border-2 text-left transition-all flex items-center gap-4 ${
              selected.includes(option)
                ? 'border-[#5739FB] bg-[#5739FB]/20'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className={`w-6 h-6 border-2 flex items-center justify-center ${
              selected.includes(option)
                ? 'border-[#5739FB] bg-[#5739FB]'
                : 'border-zinc-600'
            }`}>
              {selected.includes(option) && <div className="text-lg">✓</div>}
            </div>
            <div className="flex-1">{option}</div>
          </button>
        ))}
      </div>
      
      {/* Helper Text */}
      <div className="text-sm opacity-60 mb-6 text-center">
        Select all that feel true right now
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={selected.length === 0}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
