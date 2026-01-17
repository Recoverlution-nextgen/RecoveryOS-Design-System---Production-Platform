/**
 * COMPONENT STUBS
 * 
 * Placeholder implementations for remaining experience primitives
 * These work but can be enhanced later
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariant, StateSnapshot } from '../../../types/navicue-contract';

interface PlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariant;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

// VALUES FORK
export function ValuesForkPlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [choice, setChoice] = useState<string | null>(null);
  
  const options = variant.copy.options || ['Option A', 'Option B'];
  
  return (
    <div className="p-8">
      {variant.copy.headline && <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>}
      {variant.copy.body && <div className="text-lg opacity-90 mb-6">{variant.copy.body}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setChoice(opt)}
            className={`p-6 border-2 ${choice === opt ? 'border-[#5739FB] bg-[#5739FB]/10' : 'border-zinc-700'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onResponse({ choice }, userState)}
        disabled={!choice}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-30"
      >
        Continue
      </button>
    </div>
  );
}

// RECALL CARD CREATE
export function RecallCardCreatePlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [text, setText] = useState('');
  
  return (
    <div className="p-8">
      {variant.copy.headline && <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>}
      <div className="text-lg opacity-90 mb-6">
        {variant.copy.body || "What sentence do you want waiting for you when the wave hits?"}
      </div>
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your truth line..."
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white mb-8"
        maxLength={140}
      />
      
      <div className="text-xs opacity-60 mb-4">{text.length} / 140</div>
      
      <button
        onClick={() => onResponse({ recall_text: text }, userState)}
        disabled={!text.trim()}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-30"
      >
        Save
      </button>
    </div>
  );
}

// RECALL CARD RETURN
export function RecallCardReturnPlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [helpfulness, setHelpfulness] = useState(5);
  
  return (
    <div className="p-8">
      <div className="p-6 bg-[#5739FB]/10 border-l-4 border-[#5739FB] mb-8">
        <div className="text-sm opacity-60 mb-2">Your words, returned:</div>
        <div className="text-xl font-bold">{variant.copy.headline || "Sample recall card text"}</div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm opacity-70 mb-3">How helpful was this?</label>
        <input
          type="range"
          min="0"
          max="10"
          value={helpfulness}
          onChange={(e) => setHelpfulness(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-2 text-2xl font-bold text-[#5739FB]">{helpfulness}</div>
      </div>
      
      <button
        onClick={() => onResponse({ helpfulness }, userState)}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB]"
      >
        Continue
      </button>
    </div>
  );
}

// PROOF STAMP CAPTURE
export function ProofStampCapturePlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [action, setAction] = useState('');
  
  return (
    <div className="p-8">
      {variant.copy.headline && <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>}
      <div className="text-lg opacity-90 mb-6">
        {variant.copy.body || "What did you do that respected your life today?"}
      </div>
      
      <input
        type="text"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        placeholder="One thing you did..."
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white mb-8"
      />
      
      <button
        onClick={() => onResponse({ action_done: action }, userState)}
        disabled={!action.trim()}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-30"
      >
        Stamp It
      </button>
    </div>
  );
}

// REPAIR DRAFT
export function RepairDraftPlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [message, setMessage] = useState('');
  
  return (
    <div className="p-8">
      {variant.copy.headline && <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>}
      {variant.copy.body && <div className="text-lg opacity-90 mb-6">{variant.copy.body}</div>}
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Draft your repair message..."
        rows={6}
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white mb-8"
      />
      
      <button
        onClick={() => onResponse({ repair_text: message }, userState)}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB]"
      >
        Save Draft
      </button>
    </div>
  );
}

// SANGHA PING
export function SanghaPingPlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [intent, setIntent] = useState<string | null>(null);
  
  const options = variant.copy.options || [
    'Text my person',
    'Call my sponsor',
    'Send a check-in',
    'Ask for help'
  ];
  
  return (
    <div className="p-8">
      {variant.copy.headline && <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>}
      <div className="text-lg opacity-90 mb-6">
        {variant.copy.body || "Don't do this alone for 60 seconds."}
      </div>
      
      <div className="grid grid-cols-1 gap-3 mb-8">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setIntent(opt)}
            className={`p-4 border-2 text-left ${intent === opt ? 'border-[#5739FB] bg-[#5739FB]/10' : 'border-zinc-700'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onResponse({ contact_intent: intent }, userState)}
        disabled={!intent}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-30"
      >
        Continue
      </button>
    </div>
  );
}

// STORY SEED
export function StorySeedPlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [reflection, setReflection] = useState('');
  
  return (
    <div className="p-8">
      {variant.copy.headline && <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>}
      {variant.copy.body && (
        <div className="p-6 bg-zinc-800/50 border-l-4 border-[#3E2BB8] mb-6 text-lg opacity-90">
          {variant.copy.body}
        </div>
      )}
      
      <div className="mb-4 text-sm opacity-70">What did this touch in you?</div>
      
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Your reflection..."
        rows={4}
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white mb-8"
      />
      
      <button
        onClick={() => onResponse({ reflection }, userState)}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB]"
      >
        Continue
      </button>
    </div>
  );
}

// PARADOX KEY SAFE (COOL tier only)
export function ParadoxKeySafePlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [certainty, setCertainty] = useState(5);
  
  return (
    <div className="p-8">
      {variant.copy.headline && (
        <div className="text-2xl font-bold mb-4 text-[#5739FB]">{variant.copy.headline}</div>
      )}
      {variant.copy.body && <div className="text-lg opacity-90 mb-8">{variant.copy.body}</div>}
      
      <div className="mb-8">
        <label className="block text-sm opacity-70 mb-3">How certain did you feel before?</label>
        <input
          type="range"
          min="0"
          max="10"
          value={certainty}
          onChange={(e) => setCertainty(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-2 text-2xl font-bold text-[#5739FB]">{certainty}</div>
      </div>
      
      <button
        onClick={() => onResponse({ certainty_shift: certainty }, userState)}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB]"
      >
        Continue
      </button>
    </div>
  );
}

// SOMATIC MAP TAP
export function SomaticMapTapPlayer({ navicue, variant, userState, onResponse }: PlayerProps) {
  const [grip, setGrip] = useState(5);
  const [region, setRegion] = useState<string | null>(null);
  
  const regions = ['head', 'throat', 'chest', 'stomach', 'limbs'];
  
  return (
    <div className="p-8">
      {variant.copy.headline && <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>}
      <div className="text-lg opacity-90 mb-6">
        {variant.copy.body || "Where do you feel it in your body?"}
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-8">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`p-4 border-2 capitalize ${region === r ? 'border-[#5739FB] bg-[#5739FB]/10' : 'border-zinc-700'}`}
          >
            {r}
          </button>
        ))}
      </div>
      
      <div className="mb-8">
        <label className="block text-sm opacity-70 mb-3">How tight is the grip?</label>
        <input
          type="range"
          min="0"
          max="10"
          value={grip}
          onChange={(e) => setGrip(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-2 text-2xl font-bold text-[#5739FB]">{grip}</div>
      </div>
      
      <button
        onClick={() => onResponse({ body_location: region, grip_intensity: grip }, userState)}
        disabled={!region}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-30"
      >
        Continue
      </button>
    </div>
  );
}
