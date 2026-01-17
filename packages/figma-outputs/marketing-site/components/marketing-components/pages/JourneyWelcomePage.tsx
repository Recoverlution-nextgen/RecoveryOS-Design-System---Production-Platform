/**
 * Journey Welcome Page
 * Introduces the ERA Sprint concept for first-time users
 * Apple-grade clarity and simplicity
 */

import { useState } from 'react';
import { ArrowRight, Calendar, Eye, Brain } from 'lucide-react';
import { Button } from '../ui/button';
import { PlatformPageHeader } from '../PlatformPageHeader';

interface JourneyWelcomePageProps {
  journeyId: string;
  onContinue: () => void;
  onBack: () => void;
}

export function JourneyWelcomePage({ journeyId, onContinue, onBack }: JourneyWelcomePageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Journey-specific content
  const journeyContent = {
    'era-sprint': {
      name: 'ERA Sprint',
      focus: 'Buy 2 Seconds',
      focusDescription: 'The space between what happens and how you respond. This week, you\'ll learn to notice and use that space.',
      conceptLens: 'Impulse Control',
      lensDescription: 'Every change starts with the ability to pause. This is the foundation.',
      weekStructure: {
        title: 'How your week works',
        description: 'Each day builds on the last, creating a clear path from awareness to action to identity.',
        days: [
          {
            phase: 'Experience',
            day: 'Monday',
            label: 'Cue',
            description: 'You receive a simple prompt to carry with you. No pressure, just awareness.',
            icon: Eye,
          },
          {
            phase: 'Experience',
            day: 'Tuesday',
            label: 'Seed',
            description: 'Reflect on what you noticed. The experience becomes part of you.',
            icon: Brain,
          },
          {
            phase: 'Recognize',
            day: 'Wednesday',
            label: 'Cue',
            description: 'Go deeper. You\'re building the skill to spot patterns.',
            icon: Eye,
          },
          {
            phase: 'Recognize',
            day: 'Thursday',
            label: 'Deepen',
            description: 'Connect what you\'re learning to your life. Make it real.',
            icon: Brain,
          },
          {
            phase: 'Align',
            day: 'Friday',
            label: 'Choice',
            description: 'You have options now. Practice choosing differently.',
            icon: Eye,
          },
          {
            phase: 'Align',
            day: 'Saturday',
            label: 'Introspect',
            description: 'Look at the whole picture. See how far you\'ve come.',
            icon: Brain,
          },
          {
            phase: 'Mirror',
            day: 'Sunday',
            label: 'Identity',
            description: 'This is who you\'re becoming. Name it. Own it.',
            icon: Sparkles,
          },
        ],
      },
    },
  };

  const content = journeyContent[journeyId as keyof typeof journeyContent];

  if (!content) {
    return null;
  }

  const steps = [
    {
      title: 'This week\'s focus',
      content: (
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3E2BB8]/10 text-[#3E2BB8] mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              <Sparkles className="w-4 h-4" />
              <span>Focus</span>
            </div>
            <h2 className="text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '2.5rem', letterSpacing: '-0.025em' }}>
              {content.focus}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              {content.focusDescription}
            </p>
          </div>

          <div className="pt-8 border-t border-gray-200/60">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5739FB]/10 text-[#5739FB] mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.8125rem' }}>
              <Brain className="w-4 h-4" />
              <span>Concept Lens</span>
            </div>
            <h3 className="text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}>
              {content.conceptLens}
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              {content.lensDescription}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'How your week works',
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '2rem', letterSpacing: '-0.02em' }}>
              {content.weekStructure.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
              {content.weekStructure.description}
            </p>
          </div>

          {/* ERA Flow */}
          <div className="space-y-6">
            {content.weekStructure.days.map((day, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-white/95 backdrop-blur-[40px] backdrop-saturate-[180%] rounded-[16px] border border-gray-200/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Day Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#3E2BB8]/10 to-[#5739FB]/10 flex items-center justify-center" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#3E2BB8' }}>
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                        {day.day}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span className="text-[#3E2BB8] text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {day.phase}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span className="text-[#5739FB] text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {day.label}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                      {day.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <day.icon className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'What to expect',
      content: (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '2rem', letterSpacing: '-0.02em' }}>
              What to expect
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              This is different from anything you've tried before
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-[40px] backdrop-saturate-[180%] rounded-[16px] border border-gray-200/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] p-6">
              <h3 className="text-[#1A1A1A] mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>
                No daily time commitment
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                Each prompt takes seconds to read. You carry it with you during your day. The practice happens in real life, not on a screen.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-[40px] backdrop-saturate-[180%] rounded-[16px] border border-gray-200/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] p-6">
              <h3 className="text-[#1A1A1A] mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>
                You won't feel instant relief
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                This isn't about feeling better right now. It's about building the capacity to manage what you feel. The shift is subtle but profound.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-[40px] backdrop-saturate-[180%] rounded-[16px] border border-gray-200/40 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] p-6">
              <h3 className="text-[#1A1A1A] mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>
                Some days will feel harder than others
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                That's the point. We're working with real challenges in real time. The hard days are where the growth happens.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStepContent = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Universal Page Header - Same as all platform pages */}
      <PlatformPageHeader
        page="Journey"
        headline={content.name}
        subheadline="Your first 7 days"
        height="compact"
      />

      {/* Main Content */}
      <div className="container-responsive py-16">
        <div className="max-w-5xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-[#3E2BB8]'
                    : index < currentStep
                    ? 'w-6 bg-[#3E2BB8]/40'
                    : 'w-6 bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-12">
            {currentStepContent.content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <Button
              onClick={() => {
                if (currentStep === 0) {
                  onBack();
                } else {
                  setCurrentStep(currentStep - 1);
                }
              }}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Back
            </Button>

            <Button
              onClick={() => {
                if (isLastStep) {
                  onContinue();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className="bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white shadow-[0_2px_12px_rgba(62,43,184,0.25)] hover:shadow-[0_4px_20px_rgba(62,43,184,0.35)] transition-all duration-300"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              {isLastStep ? (
                <>
                  <span>Start Week 1</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
