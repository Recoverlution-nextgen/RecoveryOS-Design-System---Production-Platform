/**
 * RECALL CARD RETURN PLAYER
 * 
 * Re-surface saved insight
 * Response: Binary (still true / not anymore)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { FileText } from 'lucide-react';

interface RecallCardReturnPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function RecallCardReturnPlayer({ navicue, variant, userState, onResponse }: RecallCardReturnPlayerProps) {
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);
  
  const handleSubmit = (value: 'yes' | 'no') => {
    setChoice(value);
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'binary',
      value,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-12 max-w-3xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <FileText className="w-10 h-10 text-[#5739FB]" />
      </div>
      
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl mb-8 text-center opacity-80">
          {variant.copy.headline}
        </div>
      )}
      
      {/* Recalled Memory */}
      {variant.copy.body && (
        <div className="text-2xl mb-16 text-center p-12 bg-[#5739FB]/10 border-2 border-[#5739FB] leading-relaxed italic">
          "{variant.copy.body}"
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-lg opacity-70 mb-12 text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Binary Choice */}
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleSubmit('yes')}
          className="p-8 border-2 border-[#5739FB] hover:bg-[#5739FB]/20 transition-all"
        >
          <div className="text-2xl mb-3">✓</div>
          <div className="text-xl">Yes</div>
        </button>
        
        <button
          onClick={() => handleSubmit('no')}
          className="p-8 border-2 border-zinc-700 hover:bg-zinc-800 transition-all"
        >
          <div className="text-2xl mb-3 opacity-60">✗</div>
          <div className="text-xl opacity-80">No</div>
        </button>
      </div>
    </div>
  );
}
