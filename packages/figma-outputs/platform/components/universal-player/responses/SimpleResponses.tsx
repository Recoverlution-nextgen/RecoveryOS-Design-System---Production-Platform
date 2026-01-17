/**
 * SIMPLE RESPONSE COMPONENTS
 * Basic response types: tap, binary, slider, one_word, breath, hold, none
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

// ============================================================================
// TAP RESPONSE - Simple tap to continue
// ============================================================================

interface TapResponseProps {
  buttonText?: string;
  onComplete: (response: any) => void;
}

export function TapResponse({ buttonText = 'Continue', onComplete }: TapResponseProps) {
  return (
    <div className="w-full">
      <button
        onClick={() => onComplete({ tapped: true, timestamp: new Date().toISOString() })}
        className="w-full bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors py-4 px-8 text-white text-lg"
      >
        {buttonText}
      </button>
    </div>
  );
}

// ============================================================================
// BINARY RESPONSE - Yes/No, True/False, etc.
// ============================================================================

interface BinaryResponseProps {
  leftLabel?: string;
  rightLabel?: string;
  leftValue?: any;
  rightValue?: any;
  onComplete: (response: any) => void;
}

export function BinaryResponse({ 
  leftLabel = 'No', 
  rightLabel = 'Yes',
  leftValue = false,
  rightValue = true,
  onComplete 
}: BinaryResponseProps) {
  const handleChoice = (value: any, label: string) => {
    onComplete({
      choice: value,
      label,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="w-full flex gap-4">
      <button
        onClick={() => handleChoice(leftValue, leftLabel)}
        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all py-4 px-6 text-white"
      >
        {leftLabel}
      </button>
      <button
        onClick={() => handleChoice(rightValue, rightLabel)}
        className="flex-1 bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors py-4 px-6 text-white"
      >
        {rightLabel}
      </button>
    </div>
  );
}

// ============================================================================
// SLIDER RESPONSE - Numeric scale
// ============================================================================

interface SliderResponseProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  minLabel?: string;
  maxLabel?: string;
  showValue?: boolean;
  onComplete: (response: any) => void;
}

export function SliderResponse({ 
  min = 0, 
  max = 10, 
  step = 1,
  defaultValue = 5,
  minLabel,
  maxLabel,
  showValue = true,
  onComplete 
}: SliderResponseProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = () => {
    onComplete({
      value,
      min,
      max,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Slider */}
      <div className="space-y-3">
        {/* Value display */}
        {showValue && (
          <div className="text-center">
            <span className="text-4xl text-white">{value}</span>
          </div>
        )}

        {/* Range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-2 bg-white/10 appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #5739FB ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)`
          }}
        />

        {/* Labels */}
        {(minLabel || maxLabel) && (
          <div className="flex justify-between text-sm text-white/60">
            <span>{minLabel || min}</span>
            <span>{maxLabel || max}</span>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors py-4 px-8 text-white"
      >
        Continue
      </button>
    </div>
  );
}

// ============================================================================
// ONE WORD RESPONSE - Text input
// ============================================================================

interface OneWordResponseProps {
  placeholder?: string;
  maxLength?: number;
  onComplete: (response: any) => void;
}

export function OneWordResponse({ 
  placeholder = 'Type your answer...', 
  maxLength = 50,
  onComplete 
}: OneWordResponseProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onComplete({
        text: text.trim(),
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-white/5 border border-white/20 focus:border-[#5739FB] px-6 py-4 text-white placeholder-white/40 outline-none transition-colors text-lg"
        autoFocus
      />
      
      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="w-full bg-[#5739FB] hover:bg-[#3E2BB8] disabled:bg-white/10 disabled:text-white/30 transition-colors py-4 px-8 text-white"
      >
        Continue
      </button>
    </div>
  );
}

// ============================================================================
// BREATH RESPONSE - Guided breathing
// ============================================================================

interface BreathResponseProps {
  breathCount?: number;
  inhale?: number;
  hold?: number;
  exhale?: number;
  onComplete: (response: any) => void;
}

export function BreathResponse({ 
  breathCount = 3,
  inhale = 4,
  hold = 4,
  exhale = 4,
  onComplete 
}: BreathResponseProps) {
  const [currentBreath, setCurrentBreath] = useState(0);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [countdown, setCountdown] = useState(inhale);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            return hold;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return exhale;
          } else {
            // Completed one breath cycle
            if (currentBreath >= breathCount - 1) {
              // All breaths complete
              setIsActive(false);
              onComplete({
                breathCount,
                completed: true,
                timestamp: new Date().toISOString()
              });
              return 0;
            } else {
              // Next breath
              setCurrentBreath(prev => prev + 1);
              setPhase('inhale');
              return inhale;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase, currentBreath, breathCount, inhale, hold, exhale, onComplete]);

  const startBreathing = () => {
    setIsActive(true);
    setCurrentBreath(0);
    setPhase('inhale');
    setCountdown(inhale);
  };

  if (!isActive) {
    return (
      <div className="w-full">
        <button
          onClick={startBreathing}
          className="w-full bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors py-4 px-8 text-white text-lg"
        >
          Begin Breathing
        </button>
      </div>
    );
  }

  return (
    <div className="w-full text-center space-y-6">
      {/* Breathing circle */}
      <motion.div
        className="w-32 h-32 mx-auto bg-[#5739FB] opacity-60 rounded-full"
        animate={{
          scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.8 : 1
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* Instruction */}
      <div>
        <p className="text-2xl text-white uppercase tracking-wider mb-2">
          {phase === 'inhale' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out'}
        </p>
        <p className="text-6xl text-white">{countdown}</p>
      </div>

      {/* Progress */}
      <p className="text-sm text-white/60">
        Breath {currentBreath + 1} of {breathCount}
      </p>
    </div>
  );
}

// ============================================================================
// HOLD RESPONSE - Hold for N seconds
// ============================================================================

interface HoldResponseProps {
  duration?: number;
  instruction?: string;
  onComplete: (response: any) => void;
}

export function HoldResponse({ 
  duration = 5, 
  instruction = 'Hold this thought',
  onComplete 
}: HoldResponseProps) {
  const [countdown, setCountdown] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    if (countdown <= 0) {
      onComplete({
        duration,
        completed: true,
        timestamp: new Date().toISOString()
      });
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isActive, duration, onComplete]);

  const startHolding = () => {
    setIsActive(true);
    setCountdown(duration);
  };

  if (!isActive) {
    return (
      <div className="w-full">
        <button
          onClick={startHolding}
          className="w-full bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors py-4 px-8 text-white text-lg"
        >
          Begin
        </button>
      </div>
    );
  }

  return (
    <div className="w-full text-center space-y-6">
      <p className="text-xl text-white/80">{instruction}</p>
      <motion.div
        className="text-8xl text-white"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {countdown}
      </motion.div>
    </div>
  );
}

// ============================================================================
// AUTO ADVANCE RESPONSE - Automatically continue
// ============================================================================

interface AutoAdvanceResponseProps {
  delay?: number;
  showCountdown?: boolean;
  onComplete: (response: any) => void;
}

export function AutoAdvanceResponse({ 
  delay = 3, 
  showCountdown = true,
  onComplete 
}: AutoAdvanceResponseProps) {
  const [countdown, setCountdown] = useState(delay);

  useEffect(() => {
    if (countdown <= 0) {
      onComplete({
        autoAdvanced: true,
        timestamp: new Date().toISOString()
      });
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onComplete]);

  if (!showCountdown) {
    return null;
  }

  return (
    <div className="w-full text-center">
      <p className="text-white/60 text-sm">
        Continuing in {countdown}...
      </p>
    </div>
  );
}
