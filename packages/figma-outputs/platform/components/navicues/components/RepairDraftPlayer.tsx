/**
 * REPAIR DRAFT PLAYER
 * 
 * Draft relational repair message
 * Response: Text short
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { MessageSquare } from 'lucide-react';

interface RepairDraftPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function RepairDraftPlayer({ navicue, variant, userState, onResponse }: RepairDraftPlayerProps) {
  const [draft, setDraft] = useState('');
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'text_short',
      value: draft,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <MessageSquare className="w-10 h-10 text-[#5739FB]" />
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
      
      {/* Draft Area */}
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Draft what you want to say..."
        className="w-full h-48 p-4 bg-zinc-900/50 border border-zinc-700 text-white resize-none mb-8 focus:border-[#5739FB] focus:outline-none"
      />
      
      {/* Helper */}
      <div className="text-xs opacity-50 mb-6 text-center">
        This is just a draft. You decide if and when to send it.
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!draft.trim()}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Save Draft
      </button>
    </div>
  );
}
