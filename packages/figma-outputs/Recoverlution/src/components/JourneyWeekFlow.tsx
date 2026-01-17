/**
 * Journey Week Flow - Complete 12-Scene E·R·A Experience
 * 
 * infiniteK Design System v2.1 - WITH MAGIC ✨
 * - IntelligentBackground system (purple theme with dynamic fallback)
 * - borderRadius: '0px' everywhere (THE ANCHOR RULE)
 * - Refined spacing: mb-6 (badge→title), mb-8 (title→body), space-y-4 (sections)
 * - Enhanced glass effects with hover states
 * - Shadow system for depth
 * - Apple-level precision
 * 
 * Scene Flow:
 * 1. Focus Frame → "Begin Guide"
 * 2. Understanding E·R·A → "Start Practice"
 * 3. Experience Cue → "Continue"
 * 4. Experience SEED (Awareness) → "Continue"
 * 5. Experience Introspection → "Continue"
 * 6. Recognize Cue → "Continue"
 * 7. Recognize SEED (Contemplation) → "Continue"
 * 8. Recognize Introspection → "Continue"
 * 9. Align Cue → "Continue"
 * 10. Align SEED (Choice) → "Continue"
 * 11. Align Introspection → "Complete Practice"
 * 12. Integration → "Return to Your Journey" ♥
 */

import { useState } from "react";
import { ChevronRight, ArrowLeft, Sparkles, Heart, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { getJourneySceneImageUrl, JOURNEY_FALLBACK_GRADIENT } from "../utils/journeySceneImages";

type FlowStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ERAPhase = "intro" | "experience" | "recognize" | "align" | "complete";

interface JourneyWeekData {
  weekNumber: number;
  title: string;
  focusPoints: string[];
  experienceCue: {
    title: string;
    content: string[];
    heroImage: string;
  };
  experienceSeed: {
    prompt: string;
    heroImage: string;
    gradient: string;
  };
  recognizeCue: {
    title: string;
    content: string[];
    heroImage: string;
  };
  recognizeSeed: {
    prompt: string;
    heroImage: string;
    gradient: string;
  };
  alignCue: {
    title: string;
    content: string[];
    heroImage: string;
  };
  alignSeed: {
    prompt: string;
    heroImage: string;
    gradient: string;
  };
  integrationQuote: {
    quote: string;
    context: string;
  };
}

interface JourneyWeekFlowProps {
  weekData: JourneyWeekData;
  pillarName: string;
  onComplete: () => void;
  onBack: () => void;
}

export function JourneyWeekFlow({ weekData, pillarName, onComplete, onBack }: JourneyWeekFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>(1);
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const handleNext = () => {
    if (currentStep < 12) {
      setCurrentStep((prev) => (prev + 1) as FlowStep);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FlowStep);
    } else {
      onBack();
    }
  };

  // Get curated Unsplash image for this week (NaviCues pattern)
  const sceneImageUrl = getJourneySceneImageUrl(weekData.weekNumber);

  // Shared background wrapper component
  const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="absolute inset-0">
      {sceneImageUrl ? (
        <>
          {/* Curated Unsplash scene image (NaviCues pattern) */}
          <img 
            src={sceneImageUrl} 
            alt={`${weekData.title} background`}
            className="w-full h-full object-cover"
          />
          {/* Purple gradient overlay for brand consistency and text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3E2BB8]/60 via-[#3E2BB8]/40 to-[#3E2BB8]/60" />
        </>
      ) : (
        /* Fallback gradient if image fails */
        <div className="absolute inset-0" style={{ background: JOURNEY_FALLBACK_GRADIENT }} />
      )}
      {children}
    </div>
  );

  // ==================== SCENE 1: FOCUS FRAME ====================
  if (currentStep === 1) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center justify-between p-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
            <div className="max-w-4xl text-center">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div 
                  className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
                  style={{ borderRadius: '0px' }}
                >
                  <span 
                    className="text-white/90 tracking-wider uppercase"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    Focus Frame
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-white mb-10"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  fontSize: '3.5rem',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1
                }}
              >
                {weekData.title}
              </h1>

              {/* Focus points */}
              <div className="space-y-4 mb-10">
                {weekData.focusPoints.map((point, index) => (
                  <div 
                    key={index}
                    className="relative bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-6 pl-10 text-left shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    {/* Number badge */}
                    <div 
                      className="absolute -left-3 -top-3 w-10 h-10 bg-gradient-to-br from-[#5739FB] to-[#9D8FFF] flex items-center justify-center border-2 border-white/40 shadow-xl"
                      style={{ borderRadius: '0px' }}
                    >
                      <span 
                        className="text-white" 
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem' }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <p
                      className="text-white/95"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '1.0625rem', lineHeight: 1.7 }}
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </div>
                ))}
              </div>

              {/* Gentle note */}
              <p 
                className="text-white/60 italic"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
              >
                This week lays the foundation. Approach each moment with curiosity.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 flex justify-center">
            <button
              onClick={handleNext}
              className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
            >
              Begin Guide
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 2: UNDERSTANDING E·R·A ====================
  if (currentStep === 2) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between p-8 flex-shrink-0">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-scroll">
            <div className="flex flex-col items-center px-6 pt-12 pb-24">
              <div className="max-w-4xl w-full">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                  <div 
                    className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
                    style={{ borderRadius: '0px' }}
                  >
                    <span 
                      className="text-white/90 tracking-wider uppercase"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}
                    >
                      Concept Guide
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1
                  className="text-white mb-5 text-center"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 700, 
                    fontSize: '3.5rem',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1
                  }}
                >
                  Understanding E·R·A
                </h1>

                {/* Subtitle */}
                <p
                  className="text-white/80 text-center mb-12 max-w-2xl mx-auto"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', lineHeight: 1.7 }}
                >
                  The <span className="text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Experience · Recognize · Align</span> loop guides your journey toward physiological resilience.
                </p>

                {/* E·R·A Cards */}
                <div className="space-y-4 mb-10">
                  {/* E - Experience */}
                  <div 
                    className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/12 hover:border-white/30 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center flex-shrink-0 shadow-xl"
                        style={{ borderRadius: '0px' }}
                      >
                        <span 
                          className="text-white" 
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
                        >
                          E
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="text-white mb-3" 
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                        >
                          Experience
                        </h3>
                        <p 
                          className="text-white/90" 
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                        >
                          First, you learn to notice the external cue, the moment, sensation, or trigger that activates your pattern. This is about becoming aware of <em>what</em> is happening.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* R - Recognize */}
                  <div 
                    className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/12 hover:border-white/30 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 bg-gradient-to-br from-[#5739FB] to-[#7C67FF] flex items-center justify-center flex-shrink-0 shadow-xl"
                        style={{ borderRadius: '0px' }}
                      >
                        <span 
                          className="text-white" 
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
                        >
                          R
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="text-white mb-3" 
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                        >
                          Recognize
                        </h3>
                        <p 
                          className="text-white/90" 
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                        >
                          Next, you turn inward to recognize the internal response: your thoughts, emotions, and body sensations. This creates space between trigger and response.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* A - Align */}
                  <div 
                    className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/12 hover:border-white/30 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 bg-gradient-to-br from-[#7C67FF] to-[#9D8FFF] flex items-center justify-center flex-shrink-0 shadow-xl"
                        style={{ borderRadius: '0px' }}
                      >
                        <span 
                          className="text-white" 
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
                        >
                          A
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="text-white mb-3" 
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                        >
                          Align
                        </h3>
                        <p 
                          className="text-white/90" 
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                        >
                          Finally, you consciously choose an aligned response. This is where rewiring happens as you practice new patterns that serve your recovery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wisdom note */}
                <p 
                  className="text-white/60 italic text-center mb-10" 
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
                >
                  This framework becomes second nature with practice
                </p>

                {/* CTA */}
                <div className="flex justify-center pb-8">
                  <button
                    onClick={handleNext}
                    className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
                  >
                    Start Practice
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 3: EXPERIENCE CUE ====================
  if (currentStep === 3) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center p-8 flex-shrink-0">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-scroll">
            <div className="flex flex-col items-center px-6 pt-16 pb-24">
              <div className="max-w-4xl w-full">
                {/* Hero section */}
                <div className="text-center mb-12">
                  {/* Badge */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
                      style={{ borderRadius: '0px' }}
                    >
                      <span 
                        className="text-white/90 tracking-wider uppercase"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}
                      >
                        Experience
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1
                    className="text-white mb-5"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700, 
                      fontSize: '4rem',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05
                    }}
                  >
                    {weekData.experienceCue.title}
                  </h1>

                  {/* Divider */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  {/* Opening */}
                  <p
                    className="text-white/95 max-w-3xl mx-auto"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1.375rem', 
                      lineHeight: 1.7,
                      fontWeight: 400
                    }}
                  >
                    {weekData.experienceCue.content[0]}
                  </p>
                </div>

                {/* Content sections */}
                <div className="space-y-4 mb-10">
                  {/* Section 1: The Sensation */}
                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      The Sensation
                    </h3>
                    <div className="space-y-4">
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.experienceCue.content[1]}
                      </p>
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.experienceCue.content[2]}
                      </p>
                    </div>
                  </div>

                  {/* Section 2: Notice the Signs */}
                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      Notice the Signs
                    </h3>
                    <p 
                      className="text-white/90" 
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                    >
                      {weekData.experienceCue.content[3]}
                    </p>
                  </div>

                  {/* Section 3: The Practice */}
                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      The Practice
                    </h3>
                    <div className="space-y-4">
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.experienceCue.content[4]}
                      </p>
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.experienceCue.content[5]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Wisdom note */}
                <p 
                  className="text-white/60 text-center italic mb-10" 
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
                >
                  {weekData.experienceCue.content[6]}
                </p>

                {/* CTA */}
                <div className="flex justify-center pb-8">
                  <button
                    onClick={handleNext}
                    className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 4: EXPERIENCE SEED ====================
  if (currentStep === 4) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center justify-between p-8">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
            <div className="max-w-3xl text-center">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div 
                  className="w-20 h-20 bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                  style={{ borderRadius: '0px' }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Heading */}
              <h1
                className="text-white mb-8"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '3rem',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15
                }}
              >
                As you go about your day today...
              </h1>

              {/* Prompt card */}
              <div 
                className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-10 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                style={{ borderRadius: '0px' }}
              >
                <p
                  className="text-white leading-relaxed"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 500, 
                    fontSize: '1.5rem',
                    lineHeight: 1.5
                  }}
                >
                  {weekData.experienceSeed.prompt}
                </p>
              </div>

              {/* Wisdom */}
              <p 
                className="text-white/70 italic"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
              >
                No pressure. Just presence. The seed is planted.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 flex justify-center">
            <button
              onClick={handleNext}
              className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 5: EXPERIENCE INTROSPECTION ====================
  if (currentStep === 5) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center p-8">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center px-6 pt-8 pb-32">
            <div className="max-w-3xl w-full">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div 
                  className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
                  style={{ borderRadius: '0px' }}
                >
                  <span 
                    className="text-white/90 tracking-wider uppercase" 
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    Introspection
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-white mb-5 text-center"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700, 
                  fontSize: '2.5rem',
                  letterSpacing: '-0.03em'
                }}
              >
                Introspection Moment
              </h1>

              {/* Prompt */}
              <p
                className="text-white/80 text-center mb-10"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: 1.7 }}
              >
                When did you last feel this cue? Describe the immediate physical and mental sensations you noticed.
              </p>

              {/* Reflection card */}
              <div 
                className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                style={{ borderRadius: '0px' }}
              >
                <textarea
                  value={reflections['experience'] || ''}
                  onChange={(e) => setReflections(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="Your reflection..."
                  className="w-full bg-transparent text-white placeholder:text-white/40 border-none outline-none resize-none min-h-[200px]"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.8 }}
                />
              </div>

              {/* Wisdom */}
              <p 
                className="text-white/60 text-center italic" 
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
              >
                Take your time. There's no right or wrong answer.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 flex justify-center">
            <button
              onClick={handleNext}
              className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 6: RECOGNIZE CUE ====================
  if (currentStep === 6) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center p-8 flex-shrink-0">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-scroll">
            <div className="flex flex-col items-center px-6 pt-16 pb-24">
              <div className="max-w-4xl w-full">
                {/* Hero section */}
                <div className="text-center mb-12">
                  {/* Badge */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
                      style={{ borderRadius: '0px' }}
                    >
                      <span 
                        className="text-white/90 tracking-wider uppercase"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}
                      >
                        Recognize
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1
                    className="text-white mb-5"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700, 
                      fontSize: '4rem',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05
                    }}
                  >
                    {weekData.recognizeCue.title}
                  </h1>

                  {/* Divider */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  {/* Opening */}
                  <p
                    className="text-white/95 max-w-3xl mx-auto"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1.375rem', 
                      lineHeight: 1.7,
                      fontWeight: 400
                    }}
                  >
                    {weekData.recognizeCue.content[0]}
                  </p>
                </div>

                {/* Content sections */}
                <div className="space-y-4 mb-10">
                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      The Internal Response
                    </h3>
                    <div className="space-y-4">
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.recognizeCue.content[1]}
                      </p>
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.recognizeCue.content[2]}
                      </p>
                    </div>
                  </div>

                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      Creating Space
                    </h3>
                    <p 
                      className="text-white/90" 
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                    >
                      {weekData.recognizeCue.content[3]}
                    </p>
                  </div>

                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      The Practice
                    </h3>
                    <div className="space-y-4">
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.recognizeCue.content[4]}
                      </p>
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.recognizeCue.content[5]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Wisdom */}
                <p 
                  className="text-white/60 text-center italic mb-10" 
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
                >
                  {weekData.recognizeCue.content[6]}
                </p>

                {/* CTA */}
                <div className="flex justify-center pb-8">
                  <button
                    onClick={handleNext}
                    className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 7: RECOGNIZE SEED ====================
  if (currentStep === 7) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center justify-between p-8">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
            <div className="max-w-3xl text-center">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div 
                  className="w-20 h-20 bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                  style={{ borderRadius: '0px' }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Heading */}
              <h1
                className="text-white mb-8"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '3rem',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15
                }}
              >
                As you move through your day...
              </h1>

              {/* Prompt card */}
              <div 
                className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-10 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                style={{ borderRadius: '0px' }}
              >
                <p
                  className="text-white leading-relaxed"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 500, 
                    fontSize: '1.5rem',
                    lineHeight: 1.5
                  }}
                >
                  {weekData.recognizeSeed.prompt}
                </p>
              </div>

              {/* Wisdom */}
              <p 
                className="text-white/70 italic"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
              >
                Observation without judgment. The practice deepens.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 flex justify-center">
            <button
              onClick={handleNext}
              className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 8: RECOGNIZE INTROSPECTION ====================
  if (currentStep === 8) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center p-8">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center px-6 pt-8 pb-32">
            <div className="max-w-3xl w-full">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div 
                  className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
                  style={{ borderRadius: '0px' }}
                >
                  <span 
                    className="text-white/90 tracking-wider uppercase" 
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    Introspection
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-white mb-5 text-center"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700, 
                  fontSize: '2.5rem',
                  letterSpacing: '-0.03em'
                }}
              >
                Introspection Moment
              </h1>

              {/* Prompt */}
              <p
                className="text-white/80 text-center mb-10"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: 1.7 }}
              >
                Describe a time when you recognized your internal response. What thoughts, feelings, or body sensations appeared?
              </p>

              {/* Reflection card */}
              <div 
                className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                style={{ borderRadius: '0px' }}
              >
                <textarea
                  value={reflections['recognize'] || ''}
                  onChange={(e) => setReflections(prev => ({ ...prev, recognize: e.target.value }))}
                  placeholder="Your reflection..."
                  className="w-full bg-transparent text-white placeholder:text-white/40 border-none outline-none resize-none min-h-[200px]"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.8 }}
                />
              </div>

              {/* Wisdom */}
              <p 
                className="text-white/60 text-center italic" 
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
              >
                Each moment of awareness is progress.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 flex justify-center">
            <button
              onClick={handleNext}
              className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 9: ALIGN CUE ====================
  if (currentStep === 9) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center p-8 flex-shrink-0">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-scroll">
            <div className="flex flex-col items-center px-6 pt-16 pb-24">
              <div className="max-w-4xl w-full">
                {/* Hero section */}
                <div className="text-center mb-12">
                  {/* Badge */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
                      style={{ borderRadius: '0px' }}
                    >
                      <span 
                        className="text-white/90 tracking-wider uppercase"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}
                      >
                        Align
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1
                    className="text-white mb-5"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700, 
                      fontSize: '4rem',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05
                    }}
                  >
                    {weekData.alignCue.title}
                  </h1>

                  {/* Divider */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  {/* Opening */}
                  <p
                    className="text-white/95 max-w-3xl mx-auto"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1.375rem', 
                      lineHeight: 1.7,
                      fontWeight: 400
                    }}
                  >
                    {weekData.alignCue.content[0]}
                  </p>
                </div>

                {/* Content sections */}
                <div className="space-y-4 mb-10">
                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      The Choice Point
                    </h3>
                    <div className="space-y-4">
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.alignCue.content[1]}
                      </p>
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.alignCue.content[2]}
                      </p>
                    </div>
                  </div>

                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      Building New Pathways
                    </h3>
                    <p 
                      className="text-white/90" 
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                    >
                      {weekData.alignCue.content[3]}
                    </p>
                  </div>

                  <div 
                    className="bg-white/5 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                    style={{ borderRadius: '0px' }}
                  >
                    <h3 
                      className="text-white mb-4" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                    >
                      The Practice
                    </h3>
                    <div className="space-y-4">
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.alignCue.content[4]}
                      </p>
                      <p 
                        className="text-white/90" 
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.7 }}
                      >
                        {weekData.alignCue.content[5]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Wisdom */}
                <p 
                  className="text-white/60 text-center italic mb-10" 
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
                >
                  {weekData.alignCue.content[6]}
                </p>

                {/* CTA */}
                <div className="flex justify-center pb-8">
                  <button
                    onClick={handleNext}
                    className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 10: ALIGN SEED ====================
  if (currentStep === 10) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center justify-between p-8">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
            <div className="max-w-3xl text-center">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div 
                  className="w-20 h-20 bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                  style={{ borderRadius: '0px' }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Heading */}
              <h1
                className="text-white mb-8"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '3rem',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15
                }}
              >
                As you continue your journey...
              </h1>

              {/* Prompt card */}
              <div 
                className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-10 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                style={{ borderRadius: '0px' }}
              >
                <p
                  className="text-white leading-relaxed"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 500, 
                    fontSize: '1.5rem',
                    lineHeight: 1.5
                  }}
                >
                  {weekData.alignSeed.prompt}
                </p>
              </div>

              {/* Wisdom */}
              <p 
                className="text-white/70 italic"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
              >
                Each aligned choice strengthens the new pathway.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 flex justify-center">
            <button
              onClick={handleNext}
              className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 11: ALIGN INTROSPECTION ====================
  if (currentStep === 11) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center p-8">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center px-6 pt-8 pb-32">
            <div className="max-w-3xl w-full">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div 
                  className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20"
                  style={{ borderRadius: '0px' }}
                >
                  <span 
                    className="text-white/90 tracking-wider uppercase" 
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    Introspection
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-white mb-5 text-center"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700, 
                  fontSize: '2.5rem',
                  letterSpacing: '-0.03em'
                }}
              >
                Introspection Moment
              </h1>

              {/* Prompt */}
              <p
                className="text-white/80 text-center mb-10"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: 1.7 }}
              >
                Describe a moment when you chose an aligned response. What did that feel like in your body and mind?
              </p>

              {/* Reflection card */}
              <div 
                className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                style={{ borderRadius: '0px' }}
              >
                <textarea
                  value={reflections['align'] || ''}
                  onChange={(e) => setReflections(prev => ({ ...prev, align: e.target.value }))}
                  placeholder="Your reflection..."
                  className="w-full bg-transparent text-white placeholder:text-white/40 border-none outline-none resize-none min-h-[200px]"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.8 }}
                />
              </div>

              {/* Wisdom */}
              <p 
                className="text-white/60 text-center italic" 
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
              >
                You are building something profound.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 flex justify-center">
            <button
              onClick={handleNext}
              className="bg-white/15 backdrop-blur-[40px] text-white border-2 border-white/40 hover:bg-white/25 hover:border-white/60 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
            >
              Complete Practice
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCENE 12: INTEGRATION ====================
  if (currentStep === 12) {
    return (
      <div className="fixed inset-0 z-50 bg-[#3E2BB8]">
        <BackgroundWrapper />

        <div className="relative z-10 flex flex-col h-full overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between p-8 flex-shrink-0">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-scroll pointer-events-auto">
            <div className="flex flex-col items-center px-6 pt-12 pb-24">
              <div className="max-w-4xl text-center">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div 
                    className="w-24 h-24 bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                    style={{ borderRadius: '0px' }}
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h1
                  className="text-white mb-10"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 700, 
                    fontSize: '3.5rem',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1
                  }}
                >
                  Practice Complete
                </h1>

                {/* Quote card */}
                <div 
                  className="bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 p-12 mb-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                  style={{ borderRadius: '0px' }}
                >
                  <p
                    className="text-white mb-6 italic"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 500, 
                      fontSize: '1.75rem',
                      lineHeight: 1.6,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    "{weekData.integrationQuote.quote}"
                  </p>
                  <p 
                    className="text-white/70" 
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
                  >
                    {weekData.integrationQuote.context}
                  </p>
                </div>

                {/* Closing wisdom */}
                <p 
                  className="text-white/90 mb-10 max-w-2xl mx-auto" 
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: 1.8 }}
                >
                  You have planted seeds this week that will continue to grow. The E·R·A cycle is now part of your practice. Each repetition strengthens the neural pathways of recovery.
                </p>

                {/* Heart divider */}
                <div className="flex justify-center mb-10">
                  <Heart className="w-6 h-6 text-white/60 fill-white/60" />
                </div>

                {/* CTA */}
                <button
                  onClick={onComplete}
                  className="bg-white/20 backdrop-blur-[40px] text-white border-2 border-white/50 hover:bg-white/30 hover:border-white/70 px-10 py-4 transition-all hover:scale-[1.02] flex items-center gap-3 mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', borderRadius: '0px' }}
                >
                  Return to Your Journey
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
