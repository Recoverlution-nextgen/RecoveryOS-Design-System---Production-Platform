/**
 * PROOF STAMP PLAYER
 * 
 * Captures evidence of progress/change
 * Response: Text short (what's the proof?)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Award } from 'lucide-react';

interface ProofStampPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function ProofStampPlayer({ navicue, variant, userState, onResponse }: ProofStampPlayerProps) {
  const [proof, setProof] = useState('');
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'text_short',
      value: proof,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Award className="w-12 h-12 text-[#5739FB]" />
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
        <div className="p-6 bg-[#5739FB]/10 border-2 border-[#5739FB] mb-8 text-lg text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Proof Input */}
      <textarea
        value={proof}
        onChange={(e) => setProof(e.target.value)}
        placeholder="Name the evidence..."
        className="w-full h-32 p-4 bg-zinc-900/50 border border-zinc-700 text-white resize-none mb-8 focus:border-[#5739FB] focus:outline-none"
      />
      
      {/* Skip or Continue */}
      <div className="flex gap-4">
        <button
          onClick={() => onResponse({ navicue_id: navicue.navicue_id, response_type: 'none', value: null, timestamp: new Date().toISOString() })}
          className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700"
        >
          Skip
        </button>
        <button
          onClick={handleSubmit}
          disabled={!proof.trim()}
          className="flex-1 px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Stamp It
        </button>
      </div>
    </div>
  );
}
