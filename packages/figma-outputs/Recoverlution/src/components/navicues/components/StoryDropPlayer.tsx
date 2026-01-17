/**
 * STORY DROP PLAYER
 * 
 * Longer narrative or teaching story
 * Response: None (just receive)
 */

import React from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { BookOpen } from 'lucide-react';

interface StoryDropPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function StoryDropPlayer({ navicue, variant, userState, onResponse }: StoryDropPlayerProps) {
  const handleContinue = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'none',
      value: null,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <BookOpen className="w-12 h-12 text-[#5739FB]" />
      </div>
      
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-3xl mb-8 text-center">
          {variant.copy.headline}
        </div>
      )}
      
      {/* Story Body */}
      {variant.copy.body && (
        <div className="prose prose-lg prose-invert max-w-none mb-12">
          <div className="text-xl leading-relaxed whitespace-pre-line p-8 bg-zinc-900/30 border-l-4 border-[#5739FB]">
            {variant.copy.body}
          </div>
        </div>
      )}
      
      {/* Optional Closing Prompt */}
      {variant.copy.prompt && (
        <div className="text-lg opacity-70 mb-8 text-center italic">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Continue */}
      <button
        onClick={handleContinue}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8]"
      >
        Continue
      </button>
    </div>
  );
}
