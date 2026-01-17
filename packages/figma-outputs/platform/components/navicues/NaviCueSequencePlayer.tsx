import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * NAVICUE SEQUENCE PLAYER
 * 
 * Purpose: Orchestrates multi-step belief change arcs
 * Philosophy: One NaviCue can't create belief change. A SEQUENCE can.
 * 
 * Architecture:
 * - SOFTEN (state regulation, safety)
 * - SHIFT (prediction error, new perspective)
 * - STACK (field test, evidence collection)
 * - SEAL (receipt, consolidation)
 * - RE-PROBE (transfer test)
 */

export interface SequenceStep {
  id: string;
  component: React.ComponentType<any>;
  props: any;
  duration?: number; // Optional timeout in ms
  voice?: VoiceArchetype;
  onComplete: (data: any) => void;
}

export interface VoiceArchetype {
  name: string;
  warmth: number; // 0-10
  directness: number; // 0-10
  stance: 'inquiry' | 'mirror' | 'invitation' | 'claim' | 'koan' | 'permission';
  intro?: string; // Optional intro message in this voice
  outro?: string; // Optional outro message
}

interface NaviCueSequencePlayerProps {
  sequenceName: string;
  sequenceDescription: string;
  steps: SequenceStep[];
  onSequenceComplete: (results: any[]) => void;
  onExit?: () => void;
}

export function NaviCueSequencePlayer({
  sequenceName,
  sequenceDescription,
  steps,
  onSequenceComplete,
  onExit,
}: NaviCueSequencePlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepResults, setStepResults] = useState<any[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionText, setTransitionText] = useState('');

  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    // Auto-hide intro after 3 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleStepComplete = (data: any) => {
    const newResults = [...stepResults, { stepId: currentStep.id, data }];
    setStepResults(newResults);

    // Show transition if we have more steps
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      
      // Transition message based on voice archetype
      if (nextStep.voice?.intro) {
        setTransitionText(nextStep.voice.intro);
      } else {
        setTransitionText('Next...');
      }
      
      setShowTransition(true);
      
      setTimeout(() => {
        setShowTransition(false);
        setCurrentStepIndex(prev => prev + 1);
      }, 2000);
    } else {
      // Sequence complete
      onSequenceComplete(newResults);
    }
  };

  // Intro screen
  if (showIntro) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: '#0A0B0F' }}
      >
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Belief sequence
          </div>
          <h1 className="text-3xl" style={{ color: '#FFFFFF' }}>
            {sequenceName}
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {sequenceDescription}
          </p>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            {steps.length} steps · 3-5 minutes
          </div>
        </div>
      </motion.div>
    );
  }

  // Transition screen
  if (showTransition) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: '#0A0B0F' }}
      >
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Progress bar */}
          <div className="w-full h-1" style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full"
              style={{ backgroundColor: '#5739FB' }}
            />
          </div>

          {/* Transition message */}
          <p className="text-xl" style={{ color: '#FFFFFF' }}>
            {transitionText}
          </p>
        </div>
      </motion.div>
    );
  }

  // Render current step
  const StepComponent = currentStep.component;

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      {/* Progress indicator (top) */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full h-1" style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full"
            style={{ backgroundColor: '#5739FB' }}
          />
        </div>
      </div>

      {/* Exit button */}
      {onExit && (
        <button
          onClick={onExit}
          className="fixed top-6 right-6 z-50 p-2 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StepComponent
            {...currentStep.props}
            onResponse={handleStepComplete}
            onComplete={handleStepComplete}
          />
        </motion.div>
      </AnimatePresence>

      {/* Step counter (bottom) */}
      <div className="fixed bottom-6 left-0 right-0 z-50">
        <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
          Step {currentStepIndex + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
}
