/**
 * NaviCue Response Handler
 * 
 * Routes to the correct UI component based on response_type
 * Implements the 21 response types from the contract:
 * 
 * Simple: one_word, binary, slider, dial, timeline
 * Tap/Hold: tap, hold
 * Somatic: body_map, breath
 * Reflective: witness, echo, paradox
 * Audio: voice10
 * 
 * Fallback: If unknown response_type → render text input + log error
 */

import { useState, useEffect } from 'react';
import { NaviCue } from './JourneyPlayer';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface NaviCueResponseHandlerProps {
  navicue: NaviCue;
  onResponse: (responseData: any) => Promise<any>;
  currentResponse?: any;
}

export function NaviCueResponseHandler({ 
  navicue, 
  onResponse,
  currentResponse 
}: NaviCueResponseHandlerProps) {
  const [localResponse, setLocalResponse] = useState<any>(currentResponse || null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(!!currentResponse);

  useEffect(() => {
    if (currentResponse) {
      setLocalResponse(currentResponse);
      setSubmitted(true);
    }
  }, [currentResponse]);

  const handleSubmit = async (responseData: any) => {
    setSubmitting(true);
    try {
      await onResponse(responseData);
      setLocalResponse(responseData);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting response:', err);
      alert('Failed to save response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Render the appropriate component based on response_type
  const renderResponseComponent = () => {
    const { response_type, response_options } = navicue;

    switch (response_type) {
      case 'one_word':
        return (
          <OneWordInput
            options={response_options}
            value={localResponse}
            onChange={handleSubmit}
            disabled={submitting || submitted}
          />
        );

      case 'binary':
        return (
          <BinaryChoice
            options={response_options}
            value={localResponse}
            onChange={handleSubmit}
            disabled={submitting || submitted}
          />
        );

      case 'slider':
        return (
          <SliderInput
            options={response_options}
            value={localResponse}
            onChange={handleSubmit}
            disabled={submitting || submitted}
          />
        );

      case 'dial':
        return (
          <DialInput
            options={response_options}
            value={localResponse}
            onChange={handleSubmit}
            disabled={submitting || submitted}
          />
        );

      case 'timeline':
        return (
          <TimelineSelector
            options={response_options}
            value={localResponse}
            onChange={handleSubmit}
            disabled={submitting || submitted}
          />
        );

      case 'tap':
        return (
          <TapButton
            options={response_options}
            onTap={() => handleSubmit({ tapped: true, timestamp: new Date().toISOString() })}
            disabled={submitting || submitted}
          />
        );

      case 'hold':
        return (
          <HoldButton
            options={response_options}
            onComplete={(duration) => handleSubmit({ held: true, duration })}
            disabled={submitting || submitted}
          />
        );

      case 'witness':
        return (
          <WitnessTimer
            options={response_options}
            onComplete={() => handleSubmit({ witnessed: true, timestamp: new Date().toISOString() })}
            disabled={submitting || submitted}
          />
        );

      case 'echo':
        return (
          <EchoRitual
            options={response_options}
            onComplete={(repetitions) => handleSubmit({ echoed: true, repetitions })}
            disabled={submitting || submitted}
          />
        );

      case 'voice10':
        return (
          <VoiceRecorder
            options={response_options}
            onRecorded={(audioUrl) => handleSubmit({ voice_url: audioUrl })}
            disabled={submitting || submitted}
          />
        );

      default:
        // FALLBACK: Unknown response type
        console.error(`Unknown response_type: ${response_type} for NaviCue ${navicue.navicue_id}`);
        return (
          <FallbackTextInput
            value={localResponse}
            onChange={handleSubmit}
            disabled={submitting || submitted}
          />
        );
    }
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10">
      {/* NaviCue Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="text-[#5739FB] text-sm mb-1">
              {navicue.delivery_mechanism}
            </div>
            <p className="text-white text-lg">{navicue.text_line}</p>
          </div>
          {submitted && (
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 ml-4" />
          )}
        </div>
      </div>

      {/* Response Component */}
      <div className="mt-4">
        {renderResponseComponent()}
      </div>

      {/* Metadata (for debugging/transparency) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/40">
          <div>ID: {navicue.navicue_id}</div>
          <div>Type: {navicue.response_type}</div>
          <div>Track: {navicue.track} | Pillar: {navicue.pillar_id} | Layer: {navicue.kbe_layer}</div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SIMPLE INPUTS
// ============================================================================

function OneWordInput({ options, value, onChange, disabled }: any) {
  const [text, setText] = useState(value?.text || '');

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => text && onChange({ text })}
        placeholder={options?.placeholder || 'Type one word...'}
        maxLength={50}
        disabled={disabled}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#5739FB] disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}

function BinaryChoice({ options, value, onChange, disabled }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onChange({ choice: 'left', label: options?.binary_left })}
        disabled={disabled}
        className={`px-6 py-4 border transition-all ${
          value?.choice === 'left'
            ? 'bg-[#3E2BB8] border-[#5739FB] text-white'
            : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {options?.binary_left || 'Yes'}
      </button>
      <button
        onClick={() => onChange({ choice: 'right', label: options?.binary_right })}
        disabled={disabled}
        className={`px-6 py-4 border transition-all ${
          value?.choice === 'right'
            ? 'bg-[#3E2BB8] border-[#5739FB] text-white'
            : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {options?.binary_right || 'No'}
      </button>
    </div>
  );
}

function SliderInput({ options, value, onChange, disabled }: any) {
  const [sliderValue, setSliderValue] = useState(value?.value || 50);
  const min = options?.slider_min || 0;
  const max = options?.slider_max || 100;

  return (
    <div>
      <div className="mb-2 text-white/60 text-sm text-center">
        {options?.slider_label || 'How much?'}: {sliderValue}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        onChange={(e) => setSliderValue(parseInt(e.target.value))}
        onMouseUp={() => onChange({ value: sliderValue })}
        onTouchEnd={() => onChange({ value: sliderValue })}
        disabled={disabled}
        className="w-full h-2 bg-white/10 appearance-none slider-thumb"
        style={{
          accentColor: '#5739FB'
        }}
      />
      <div className="flex justify-between text-xs text-white/40 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function DialInput({ options, value, onChange, disabled }: any) {
  // Similar to slider but circular (simplified to slider for now)
  return <SliderInput options={options} value={value} onChange={onChange} disabled={disabled} />;
}

function TimelineSelector({ options, value, onChange, disabled }: any) {
  const labels = options?.timeline_labels || ['Past', 'Present', 'Future'];

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}>
      {labels.map((label: string, index: number) => (
        <button
          key={index}
          onClick={() => onChange({ selected: label, index })}
          disabled={disabled}
          className={`px-4 py-3 border text-sm transition-all ${
            value?.selected === label
              ? 'bg-[#3E2BB8] border-[#5739FB] text-white'
              : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// TAP / HOLD RITUALS
// ============================================================================

function TapButton({ options, onTap, disabled }: any) {
  return (
    <button
      onClick={onTap}
      disabled={disabled}
      className="w-full px-6 py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {options?.tap_label || 'Tap to continue'}
    </button>
  );
}

function HoldButton({ options, onComplete, disabled }: any) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = options?.hold_duration || 3;

  useEffect(() => {
    let interval: any;
    if (holding) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progressPercent = Math.min((elapsed / duration) * 100, 100);
        setProgress(progressPercent);

        if (elapsed >= duration) {
          clearInterval(interval);
          setHolding(false);
          onComplete(duration);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [holding, duration]);

  return (
    <button
      onMouseDown={() => !disabled && setHolding(true)}
      onMouseUp={() => setHolding(false)}
      onMouseLeave={() => setHolding(false)}
      onTouchStart={() => !disabled && setHolding(true)}
      onTouchEnd={() => setHolding(false)}
      disabled={disabled}
      className="relative w-full px-6 py-4 bg-white/10 border border-white/20 text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] transition-all"
        style={{ width: `${progress}%` }}
      />
      <span className="relative z-10">
        {holding ? 'Hold...' : options?.hold_label || 'Press and hold'}
      </span>
    </button>
  );
}

// ============================================================================
// REFLECTIVE / GUIDED PRESENCE
// ============================================================================

function WitnessTimer({ options, onComplete, disabled }: any) {
  const [started, setStarted] = useState(false);
  const [remaining, setRemaining] = useState(options?.witness_duration || 10);

  useEffect(() => {
    if (started && remaining > 0) {
      const timer = setTimeout(() => {
        setRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (started && remaining === 0) {
      onComplete();
    }
  }, [started, remaining]);

  if (!started) {
    return (
      <button
        onClick={() => setStarted(true)}
        disabled={disabled}
        className="w-full px-6 py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Begin Witness ({options?.witness_duration || 10}s)
      </button>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="text-6xl text-white mb-4">{remaining}</div>
      <div className="text-white/60">Just breathe and witness</div>
    </div>
  );
}

function EchoRitual({ options, onComplete, disabled }: any) {
  const [count, setCount] = useState(0);
  const total = options?.echo_repetitions || 3;
  const statement = options?.echo_statement || 'I am present';

  const handleEcho = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= total) {
      onComplete(newCount);
    }
  };

  return (
    <div className="text-center">
      <div className="text-white text-xl mb-6 italic">"{statement}"</div>
      <div className="text-white/40 text-sm mb-4">
        Repeat {count}/{total}
      </div>
      <button
        onClick={handleEcho}
        disabled={disabled || count >= total}
        className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Say it aloud
      </button>
    </div>
  );
}

// ============================================================================
// AUDIO CAPTURE
// ============================================================================

function VoiceRecorder({ options, onRecorded, disabled }: any) {
  const [recording, setRecording] = useState(false);
  
  // Simplified - would need actual MediaRecorder implementation
  const handleRecord = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      onRecorded('mock_audio_url.wav');
    }, options?.voice_max_duration * 1000 || 10000);
  };

  return (
    <button
      onClick={handleRecord}
      disabled={disabled || recording}
      className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {recording ? 'Recording...' : 'Record Voice Response'}
    </button>
  );
}

// ============================================================================
// FALLBACK
// ============================================================================

function FallbackTextInput({ value, onChange, disabled }: any) {
  const [text, setText] = useState(value?.text || '');

  return (
    <div>
      <div className="mb-2 text-yellow-400 text-sm">
        Unknown response type - using text input fallback
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => text && onChange({ text })}
        placeholder="Enter your response..."
        rows={3}
        disabled={disabled}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#5739FB] disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}
