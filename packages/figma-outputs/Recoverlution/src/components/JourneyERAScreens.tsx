/**
 * Journey E-R-A Context Screens
 * 
 * Philosophy:
 * - Mirror NaviCues landing aesthetic (purple header, clean cards)
 * - NOT full-screen - these need detail
 * - Clean, immediate, but with depth
 * - These are VERY important - would rather patients do Journey than 10 NaviCues
 * - After E-R-A, launches into SEED scene
 */

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Brain, Heart, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ERAContent {
  letter: 'E' | 'R' | 'A';
  title: string;
  description: string;
  keyPoints: string[];
  gradient: string;
  icon: any;
}

interface JourneyERAScreensProps {
  weekNumber: number;
  theme: string;
  eraContent: {
    experience: ERAContent;
    reflect: ERAContent;
    act: ERAContent;
  };
  onComplete: () => void; // Proceeds to SEED scene
  onBack: () => void;
}

export function JourneyERAScreens({
  weekNumber,
  theme,
  eraContent,
  onComplete,
  onBack,
}: JourneyERAScreensProps) {
  const [currentStep, setCurrentStep] = useState<'E' | 'R' | 'A'>('E');

  const screens: ERAContent[] = [
    eraContent.experience,
    eraContent.reflect,
    eraContent.act,
  ];

  const currentIndex = screens.findIndex(s => s.letter === currentStep);
  const currentScreen = screens[currentIndex];
  const Icon = currentScreen.icon;

  const handleNext = () => {
    if (currentStep === 'E') setCurrentStep('R');
    else if (currentStep === 'R') setCurrentStep('A');
    else onComplete(); // After 'A', go to SEED scene
  };

  const handlePrevious = () => {
    if (currentStep === 'R') setCurrentStep('E');
    else if (currentStep === 'A') setCurrentStep('R');
    else onBack();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header - Matches NaviCues aesthetic */}
      <div className="relative h-[280px] w-full">
        {/* Purple smoke gradient - 220px */}
        <div className="relative h-[220px] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1617550523898-600c24418b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBzbW9rZSUyMGdyYWRpZW50JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYwMjg3ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Journey Context"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${currentScreen.gradient} opacity-30`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
          
          {/* Progress indicator */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentStep === 'E' ? 'bg-white' : 'bg-white/40'}`} />
            <div className={`w-2 h-2 rounded-full ${currentStep === 'R' ? 'bg-white' : 'bg-white/40'}`} />
            <div className={`w-2 h-2 rounded-full ${currentStep === 'A' ? 'bg-white' : 'bg-white/40'}`} />
          </div>
        </div>

        {/* Purple Bar - 60px */}
        <div className="relative h-[60px] w-full bg-[#3E2BB8] flex items-center px-6">
          <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
            <div>
              <h1
                className="text-white text-xl md:text-2xl tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {theme}
              </h1>
              <p
                className="text-white/90 text-xs italic"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
              >
                Week {weekNumber} • {currentScreen.letter} of E-R-A
              </p>
            </div>
            
            <button
              onClick={onBack}
              className="text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Clean, detailed */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-white via-[#FAFAFA] to-[#F9F7FF]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Letter Card - Hero style */}
          <div className="mb-8">
            <Card className="p-8 border-2 border-[#3E2BB8]/20 bg-white shadow-lg">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentScreen.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-5xl text-[#3E2BB8]"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
                    >
                      {currentScreen.letter}
                    </span>
                    <h2
                      className="text-3xl text-gray-900"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                    >
                      {currentScreen.title}
                    </h2>
                  </div>
                  
                  <p
                    className="text-gray-700 text-lg leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
                  >
                    {currentScreen.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Points */}
          <div className="space-y-4 mb-12">
            {currentScreen.keyPoints.map((point, index) => (
              <Card
                key={index}
                className="p-6 bg-white border border-gray-200 hover:border-[#3E2BB8]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5739FB] to-[#7C67FF] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <p
                    className="text-gray-700 leading-relaxed flex-1"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
                  >
                    {point}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:border-[#3E2BB8] hover:text-[#3E2BB8]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 'E' ? 'Back' : 'Previous'}
            </Button>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#2E1B98] hover:to-[#4729DB] text-white px-8"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              {currentStep === 'A' ? 'Continue to Your Day' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Gentle reminder */}
          <div className="pt-8 text-center">
            <p className="text-sm text-gray-500 italic leading-relaxed">
              Take your time with this. These insights are the foundation of your journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
