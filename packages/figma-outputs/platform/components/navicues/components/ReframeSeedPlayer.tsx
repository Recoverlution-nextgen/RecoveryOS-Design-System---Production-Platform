/**
 * REFRAME SEED PLAYER
 * 
 * Plants alternative perspective for consideration
 * Response: Rank 3 (which reframes resonate most)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Lightbulb } from 'lucide-react';

interface ReframeSeedPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function ReframeSeedPlayer({ navicue, variant, userState, onResponse }: ReframeSeedPlayerProps) {
  const [rankings, setRankings] = useState<Record<string, number>>({});
  
  const handleRank = (option: string, rank: number) => {
    setRankings({ ...rankings, [option]: rank });
  };
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'rank_3',
      value: rankings,
      timestamp: new Date().toISOString(),
    });
  };
  
  const options = variant.copy.options || [
    'What if this is protection, not sabotage?',
    'What if the discomfort means growth?',
    'What if the pattern served me once?'
  ];
  
  const allRanked = options.every(opt => rankings[opt] > 0);
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Headline */}
      {variant.copy.headline && (
        <div className="flex items-center gap-3 text-2xl mb-6">
          <Lightbulb className="w-6 h-6 text-[#5739FB]" />
          {variant.copy.headline}
        </div>
      )}
      
      {/* Body */}
      {variant.copy.body && (
        <div className="text-lg opacity-80 mb-8 leading-relaxed">
          {variant.copy.body}
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-base opacity-70 mb-6">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Reframes to Rank */}
      <div className="space-y-4 mb-8">
        {options.map((option, idx) => (
          <div
            key={idx}
            className="p-6 border-2 border-zinc-700 bg-zinc-900/30"
          >
            <div className="text-lg mb-4">{option}</div>
            
            <div className="flex gap-2">
              <span className="text-sm opacity-60 mr-3">Rank:</span>
              {[1, 2, 3].map(rank => (
                <button
                  key={rank}
                  onClick={() => handleRank(option, rank)}
                  className={`w-10 h-10 border-2 transition-all ${
                    rankings[option] === rank
                      ? 'border-[#5739FB] bg-[#5739FB] text-white'
                      : 'border-zinc-600 hover:border-zinc-500'
                  }`}
                >
                  {rank}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!allRanked}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
