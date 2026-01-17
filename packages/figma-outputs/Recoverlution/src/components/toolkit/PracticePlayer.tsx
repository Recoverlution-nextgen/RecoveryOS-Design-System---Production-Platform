import { useState, useEffect } from 'react';
import type { Practice, PracticeCompletion } from '@/lib/types/toolkit';
import { X, Play, Pause, Check, ChevronRight } from 'lucide-react';

interface PracticePlayerProps {
  practice: Practice;
  onClose: () => void;
  onComplete: (completion: Partial<PracticeCompletion>) => void;
}

export function PracticePlayer({ practice, onClose, onComplete }: PracticePlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1); // -1 = intro
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  
  const [startTime] = useState(Date.now());

  const currentStep = currentStepIndex >= 0 ? practice.steps[currentStepIndex] : null;
  const isIntro = currentStepIndex === -1;
  const isReflection = hasCompleted;

  // Timer for timed steps
  useEffect(() => {
    if (!isPlaying || !currentStep?.duration_seconds) return;

    if (timeRemaining === 0) {
      setTimeRemaining(currentStep.duration_seconds);
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, timeRemaining]);

  const handleStart = () => {
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < practice.steps.length - 1) {
      setCurrentStepIndex(i => i + 1);
      setTimeRemaining(0);
      setIsPlaying(false);
    } else {
      setHasCompleted(true);
    }
  };

  const handleComplete = () => {
    const durationMinutes = Math.round((Date.now() - startTime) / 60000);
    
    onComplete({
      practice_id: practice.id,
      completed: true,
      duration_actual_minutes: durationMinutes,
      exit_responses: { reflection },
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col">
      {/* Minimal Progress */}
      {!isIntro && !isReflection && (
        <div className="h-0.5 bg-[#3E2BB8]/5">
          <div
            className="h-full bg-[#5739FB] transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / practice.steps.length) * 100}%` }}
          />
        </div>
      )}

      {/* Clean Header */}
      <div className="border-b border-[#3E2BB8]/10 px-8 py-6">
        <div className="max-w-4xl mx-auto flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 text-xs tracking-wide uppercase border border-[#3E2BB8]/20 text-[#3E2BB8]/60">
                {practice.pillar_id}
              </span>
              <span className="text-sm text-[#3E2BB8]/40">
                {practice.duration_minutes} min practice
              </span>
            </div>
            <h1 className="text-[#3E2BB8] leading-tight">{practice.title}</h1>
            {practice.subtitle && (
              <p className="text-[#3E2BB8]/50 mt-2">{practice.subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#3E2BB8]/5 transition-colors rounded-full"
            aria-label="Close"
          >
            <X className="size-5 text-[#3E2BB8]/60" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-16">
          {/* INTRO */}
          {isIntro && (
            <div className="max-w-2xl">
              <p className="text-[#3E2BB8]/70 leading-[1.8] text-lg mb-12">
                {practice.intro}
              </p>
              <div className="mb-12">
                <h3 className="text-[#3E2BB8] mb-6 text-xl">Steps</h3>
                <div className="space-y-4">
                  {practice.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="text-[#5739FB] flex-shrink-0 w-6">{step.step_number}.</span>
                      <span className="text-[#3E2BB8]/70 leading-relaxed">{step.instruction}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={handleStart}
                className="px-8 py-4 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors flex items-center gap-2"
              >
                <span>Begin Practice</span>
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}

          {/* PRACTICE STEPS */}
          {!isIntro && !isReflection && currentStep && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm text-[#3E2BB8]/40">
                    Step {currentStepIndex + 1} of {practice.steps.length}
                  </span>
                  {currentStep.duration_seconds && timeRemaining > 0 && (
                    <div className="text-3xl text-[#5739FB] font-light tabular-nums">
                      {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl text-[#3E2BB8] mb-6 leading-tight">
                  {currentStep.instruction}
                </h2>

                {currentStep.voice_guidance && (
                  <p className="text-[#3E2BB8]/50 italic text-lg leading-relaxed">
                    {currentStep.voice_guidance}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                {currentStep.duration_seconds && (
                  <button
                    onClick={() => {
                      if (!isPlaying && timeRemaining === 0) {
                        setTimeRemaining(currentStep.duration_seconds);
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    className="px-6 py-3 border border-[#3E2BB8]/20 text-[#3E2BB8] hover:bg-[#3E2BB8]/5 transition-colors flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                    <span>{isPlaying ? 'Pause' : timeRemaining > 0 ? 'Resume' : 'Start Timer'}</span>
                  </button>
                )}
                
                <button
                  onClick={handleNextStep}
                  className="flex-1 px-6 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors flex items-center justify-center gap-2"
                >
                  <span>{currentStepIndex < practice.steps.length - 1 ? 'Next Step' : 'Complete Practice'}</span>
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* REFLECTION */}
          {isReflection && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[#5739FB] mb-4">
                  <Check className="size-5" />
                  <span className="text-sm uppercase tracking-wide">Practice Complete</span>
                </div>
                <h3 className="text-[#3E2BB8] mb-3 text-2xl">How was that?</h3>
                <p className="text-[#3E2BB8]/50 mb-8 text-lg">
                  Take a moment to note what you noticed.
                </p>
              </div>
              
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What did you notice? What shifted?"
                className="w-full px-4 py-3 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] placeholder:text-[#3E2BB8]/30 focus:outline-none focus:border-[#5739FB]/50 transition-colors mb-6 rounded-sm"
                rows={4}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleComplete}
                  className="flex-1 px-6 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors"
                >
                  Save & Close
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-[#3E2BB8]/20 text-[#3E2BB8]/60 hover:bg-[#3E2BB8]/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}