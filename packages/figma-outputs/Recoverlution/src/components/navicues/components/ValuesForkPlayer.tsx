/**
 * VALUES FORK PLAYER
 * 
 * Choice between competing values
 * Response: Choice single (which value wins right now)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { GitBranch } from 'lucide-react';

interface ValuesForkPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function ValuesForkPlayer({ navicue, variant, userState, onResponse }: ValuesForkPlayerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  
  const handleSubmit = () => {
    if (!selected) return;
    
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'choice_single',
      value: selected,
      timestamp: new Date().toISOString(),
    });
  };
  
  const options = variant.copy.options || ['Option A', 'Option B', 'Both', 'Neither'];
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <GitBranch className="w-10 h-10 text-[#5739FB]" />
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
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-base opacity-70 mb-6 text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Fork Options */}
      <div className="space-y-3 mb-8">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(option)}
            className={`w-full p-5 border-2 text-left transition-all ${
              selected === option
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
        disabled={!selected}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
