/**
 * Enhanced Practice Page - infiniteK Design
 * 
 * Interactive practice experience with:
 * - Hero image with floating pillar badge
 * - Step-by-step instructions with optional timer
 * - The Science section (what's happening in your brain)
 * - When To Use guidance
 * - Related practices
 * - NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, Lightbulb, Brain, Clock, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  getPracticeById,
  getRelatedPractices,
  pillarMetadata,
  type Practice
} from '../../utils/practiceLibrary';

interface EnhancedPracticePageProps {
  practiceId: string;
  onBack?: () => void;
  onNavigateToPractice?: (practiceId: string) => void;
}

export function EnhancedPracticePage({ practiceId, onBack, onNavigateToPractice }: EnhancedPracticePageProps) {
  const practice = getPracticeById(practiceId);
  const relatedPractices = getRelatedPractices(practiceId);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!practice) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600">Practice not found</p>
          <button
            onClick={onBack}
            className="mt-4 text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Back to Toolkit
          </button>
        </div>
      </div>
    );
  }

  const pillar = pillarMetadata[practice.pillar];
  const totalSteps = practice.steps.length;

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setElapsedSeconds(0);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    if (stepIndex < totalSteps - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#2ECC71';
      case 'intermediate': return '#F39C12';
      case 'advanced': return '#E74C3C';
      default: return '#95A5A6';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      {/* Sticky Top Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                Back to Toolkit
              </span>
            </button>

            {/* Timer Display */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span 
                  className={isTimerRunning ? 'text-[#3E2BB8]' : 'text-gray-500'}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600 }}
                >
                  {formatTime(elapsedSeconds)}
                </span>
              </div>
              <div className="flex gap-2">
                {!isTimerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    className="w-8 h-8 flex items-center justify-center bg-[#3E2BB8] text-white hover:bg-[#5739FB] transition-all"
                    style={{ borderRadius: '0px' }}
                  >
                    <Play className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handlePauseTimer}
                    className="w-8 h-8 flex items-center justify-center bg-[#3E2BB8] text-white hover:bg-[#5739FB] transition-all"
                    style={{ borderRadius: '0px' }}
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleResetTimer}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all"
                  style={{ borderRadius: '0px' }}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <ImageWithFallback
          src={practice.image}
          alt={practice.name}
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/50" />
        
        {/* Floating pillar badge - bottom left */}
        <div className="absolute bottom-8 left-6 md:left-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '0px'
            }}
          >
            <span 
              className="uppercase tracking-wider"
              style={{ 
                color: pillar.color,
                fontFamily: 'var(--font-display)', 
                fontWeight: 600, 
                fontSize: '0.75rem',
                letterSpacing: '0.05em'
              }}
            >
              {pillar.name}
            </span>
          </div>
        </div>

        {/* Duration badge - bottom right */}
        <div className="absolute bottom-8 right-6 md:right-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '0px'
            }}
          >
            <Clock className="w-4 h-4" style={{ color: pillar.color }} />
            <span 
              style={{ 
                color: pillar.color,
                fontFamily: 'var(--font-display)', 
                fontWeight: 600, 
                fontSize: '0.875rem'
              }}
            >
              {practice.duration} min
            </span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        {/* Title */}
        <h1 
          className="text-gray-900 mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {practice.name}
        </h1>

        {/* Subtitle */}
        <p 
          className="text-gray-600 mb-8"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.6' }}
        >
          {practice.subtitle}
        </p>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {practice.microBlocks.slice(0, 3).map((microBlock, index) => (
            <span
              key={index}
              className="px-2 py-1"
              style={{
                backgroundColor: `${pillar.color}10`,
                color: pillar.color,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.625rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: '0px'
              }}
            >
              {microBlock}
            </span>
          ))}
        </div>

        {/* Purpose */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5" style={{ color: pillar.color }} />
            <h2 
              className="text-gray-900"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}
            >
              Why This Practice
            </h2>
          </div>
          <p 
            className="text-gray-700"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.8' }}
          >
            {practice.purpose}
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-[#FAFAFA] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 
            className="text-gray-900 mb-8"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}
          >
            Step by Step Instructions
          </h2>

          <div className="space-y-6">
            {practice.steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;

              return (
                <div
                  key={index}
                  className={`bg-white p-6 border-l-4 transition-all ${
                    isCompleted 
                      ? 'opacity-60'
                      : isCurrent
                      ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
                      : ''
                  }`}
                  style={{
                    borderColor: isCompleted ? '#2ECC71' : isCurrent ? pillar.color : '#E5E7EB',
                    borderRadius: '0px'
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isCompleted ? '#2ECC7115' : `${pillar.color}15`,
                        color: isCompleted ? '#2ECC71' : pillar.color,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        borderRadius: '0px'
                      }}
                    >
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : step.stepNumber}
                    </div>

                    <div className="flex-1">
                      {/* Instruction */}
                      <p 
                        className="text-gray-900 mb-3"
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
                      >
                        {step.instruction}
                      </p>

                      {/* Duration */}
                      {step.duration && (
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span 
                            className="text-gray-500"
                            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                          >
                            {step.duration}
                          </span>
                        </div>
                      )}

                      {/* Tip */}
                      {step.tip && (
                        <div 
                          className="p-3 mt-3"
                          style={{ backgroundColor: `${pillar.color}08`, borderRadius: '0px' }}
                        >
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pillar.color }} />
                            <span 
                              className="text-gray-700 italic"
                              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: '1.5' }}
                            >
                              {step.tip}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Complete Button */}
                      {!isCompleted && isCurrent && (
                        <button
                          onClick={() => handleStepComplete(index)}
                          className="mt-4 px-4 py-2 text-white transition-all"
                          style={{
                            backgroundColor: pillar.color,
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            borderRadius: '0px'
                          }}
                        >
                          {index === totalSteps - 1 ? 'Complete Practice' : 'Next Step'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The Science Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5" style={{ color: pillar.color }} />
          <h2 
            className="text-gray-900"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}
          >
            The Science
          </h2>
        </div>
        <div 
          className="border-l-4 pl-8 py-4"
          style={{ borderColor: pillar.color, borderRadius: '0px' }}
        >
          <p 
            className="text-gray-700"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.8' }}
          >
            {practice.theScience}
          </p>
        </div>
      </div>

      {/* When To Use Section */}
      <div className="bg-[#FAFAFA] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5" style={{ color: pillar.color }} />
            <h2 
              className="text-gray-900"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}
            >
              When To Use This Practice
            </h2>
          </div>
          <div className="space-y-3">
            {practice.whenToUse.map((scenario, index) => (
              <div key={index} className="flex items-start gap-3">
                <div 
                  className="w-2 h-2 mt-2 flex-shrink-0"
                  style={{ backgroundColor: pillar.color, borderRadius: '0px' }}
                />
                <p 
                  className="text-gray-700 flex-1"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
                >
                  {scenario}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appears In Section */}
      {practice.appearsIn.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h3 
            className="text-gray-900 mb-6"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}
          >
            This Practice Appears In
          </h3>
          <div className="grid gap-4">
            {practice.appearsIn.map((location, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200/60"
                style={{ borderRadius: '0px' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="px-2 py-0.5 uppercase tracking-wider"
                    style={{
                      backgroundColor: `${pillar.color}15`,
                      color: pillar.color,
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      borderRadius: '0px'
                    }}
                  >
                    {location.type === 'article' ? 'Article' : 'Building Block'}
                  </span>
                </div>
                <p 
                  className="text-gray-900"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}
                >
                  {location.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Practices */}
      {relatedPractices.length > 0 && (
        <div className="border-t border-gray-200/60 bg-[#FAFAFA]">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h3 
              className="text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}
            >
              Related Practices
            </h3>
            <div className="grid gap-4">
              {relatedPractices.map(relatedPractice => {
                const relatedPillar = pillarMetadata[relatedPractice.pillar];
                return (
                  <button
                    key={relatedPractice.id}
                    onClick={() => onNavigateToPractice?.(relatedPractice.id)}
                    className="text-left p-6 bg-white border border-gray-200/60 hover:border-gray-300 transition-all"
                    style={{ borderRadius: '0px' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="uppercase tracking-wider"
                        style={{ 
                          color: relatedPillar.color,
                          fontFamily: 'var(--font-display)', 
                          fontWeight: 600, 
                          fontSize: '0.75rem'
                        }}
                      >
                        {relatedPillar.name}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
                        {relatedPractice.duration} min
                      </span>
                    </div>
                    <h4 
                      className="text-gray-900 mb-1"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem' }}
                    >
                      {relatedPractice.name}
                    </h4>
                    <p 
                      className="text-gray-600"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                    >
                      {relatedPractice.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}