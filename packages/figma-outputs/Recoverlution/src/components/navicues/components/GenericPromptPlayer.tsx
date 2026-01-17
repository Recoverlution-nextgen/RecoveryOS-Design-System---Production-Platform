/**
 * GENERIC PROMPT PLAYER
 * 
 * Fallback renderer for existing families from the 3,000 batch
 * Handles: statement_mirror, belief_probe, reframe_seed, etc.
 * 
 * This lets the 3,000 render through the Universal Player
 * without needing custom components for each legacy type
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariant, StateSnapshot } from '../../../types/navicue-contract';

interface GenericPromptPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariant;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function GenericPromptPlayer({
  navicue,
  variant,
  userState,
  onResponse,
}: GenericPromptPlayerProps) {
  const [response, setResponse] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number>(5);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleSubmit = () => {
    let responseData: any = {};
    
    // Determine response based on response_type
    switch (navicue.default_response_type) {
      case 'slider_0_10':
        responseData = { value: sliderValue };
        break;
      case 'text_1line':
      case 'text_short':
        responseData = { text: response };
        break;
      case 'choice_single':
        responseData = { choice: selectedOption };
        break;
      case 'binary':
        responseData = { answer: selectedOption };
        break;
      default:
        responseData = { completed: true };
    }
    
    const statePost: StateSnapshot = {
      ...userState,
    };
    
    onResponse(responseData, statePost);
  };
  
  const renderResponseInput = () => {
    const options = variant.copy.options || [];
    
    switch (navicue.default_response_type) {
      case 'slider_0_10':
        return (
          <div className="mb-8">
            <label className="block text-sm opacity-70 mb-3">
              Rate this (0-10)
            </label>
            <div className="flex items-center gap-4">
              <span className="text-xs opacity-60 w-16">0</span>
              <input
                type="range"
                min="0"
                max="10"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="flex-1 h-2 bg-zinc-700"
                style={{
                  background: `linear-gradient(to right, #3E2BB8 0%, #5739FB ${sliderValue * 10}%, #3f3f46 ${sliderValue * 10}%, #3f3f46 100%)`
                }}
              />
              <span className="text-xs opacity-60 w-16 text-right">10</span>
            </div>
            <div className="text-center mt-3">
              <span className="text-3xl font-bold text-[#5739FB]">{sliderValue}</span>
            </div>
          </div>
        );
      
      case 'text_1line':
        return (
          <div className="mb-8">
            <input
              type="text"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Your response..."
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white"
            />
          </div>
        );
      
      case 'text_short':
        return (
          <div className="mb-8">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Your reflection..."
              rows={4}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white"
            />
          </div>
        );
      
      case 'choice_single':
      case 'rank_3':
        return (
          <div className="grid grid-cols-1 gap-3 mb-8">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(option)}
                className={`p-4 border-2 text-left transition-all ${
                  selectedOption === option
                    ? 'border-[#5739FB] bg-[#5739FB]/10'
                    : 'border-zinc-700 hover:border-zinc-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      
      case 'binary':
        return (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setSelectedOption('yes')}
              className={`p-6 border-2 transition-all ${
                selectedOption === 'yes'
                  ? 'border-[#5739FB] bg-[#5739FB]/10'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setSelectedOption('no')}
              className={`p-6 border-2 transition-all ${
                selectedOption === 'no'
                  ? 'border-[#5739FB] bg-[#5739FB]/10'
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            >
              No
            </button>
          </div>
        );
      
      default:
        return (
          <div className="mb-8 p-4 bg-zinc-800/50 border border-zinc-700 text-center opacity-60">
            Response type: {navicue.default_response_type}
          </div>
        );
    }
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
      
      {/* Response Input */}
      {renderResponseInput()}
      
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
