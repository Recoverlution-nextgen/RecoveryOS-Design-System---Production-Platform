/**
 * Journey List Page
 * Shows available journeys - entry point for Journey experience
 * Apple-grade simplicity with universal header
 */

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { PlatformPageHeader } from '../PlatformPageHeader';

interface JourneyListPageProps {
  onSelectJourney: (journeyId: string) => void;
}

export function JourneyListPage({ onSelectJourney }: JourneyListPageProps) {
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);

  const journeys = [
    {
      id: 'era-sprint',
      name: 'ERA Sprint',
      subtitle: 'Your first 7 days',
      description: 'A structured week that introduces you to the foundation of sustainable change.',
      available: true,
      duration: '7 days',
      type: 'Foundation',
    },
    {
      id: 'regulation-foundation',
      name: 'Regulation Foundation',
      subtitle: 'Coming soon',
      description: 'Build the skills that let you manage your internal state.',
      available: false,
      duration: '14 days',
      type: 'Core Practice',
    },
    {
      id: 'connection-practice',
      name: 'Connection Practice',
      subtitle: 'Coming soon',
      description: 'Strengthen relationships and build authentic connection.',
      available: false,
      duration: '14 days',
      type: 'Core Practice',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Universal Page Header - Same as Wellbeing, State, etc. */}
      <PlatformPageHeader
        page="Journey"
        headline="Your path forward, one seed at a time"
        height="medium"
      />

      {/* Journey Grid */}
      <div className="container-responsive py-12">
        <div className="max-w-5xl mx-auto">
          {/* Intro Text - Simple and clear */}
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed">
              Each journey is a focused experience designed to build specific skills. 
              They're sequential, so start with your first available journey.
            </p>
          </div>

          {/* Journey Cards */}
          <div className="grid gap-6">
            {journeys.map((journey) => (
              <div
                key={journey.id}
                className={`
                  relative overflow-hidden
                  bg-white/95 backdrop-blur-[40px] backdrop-saturate-[180%]
                  border border-gray-200/40
                  shadow-[0_4px_16px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.5)_inset]
                  transition-all duration-300
                  ${journey.available 
                    ? 'hover:shadow-[0_8px_24px_rgba(62,43,184,0.12),0_0_0_1px_rgba(255,255,255,0.5)_inset] hover:border-[#3E2BB8]/20 cursor-pointer' 
                    : 'opacity-60 cursor-not-allowed'
                  }
                  ${selectedJourney === journey.id ? 'border-[#3E2BB8]/40 bg-[#3E2BB8]/5' : ''}
                `}
                style={{ borderRadius: '0px' }}
                onClick={() => journey.available && setSelectedJourney(journey.id)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {/* Type Badge */}
                      <div className="inline-block px-3 py-1 rounded-full bg-[#3E2BB8]/10 text-[#3E2BB8] text-xs mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {journey.type}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-[#1A1A1A] mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem', letterSpacing: '-0.015em' }}>
                        {journey.name}
                      </h3>
                      
                      {/* Subtitle */}
                      <p className="text-gray-500 mb-3" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}>
                        {journey.subtitle}
                      </p>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                        {journey.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{journey.duration}</span>
                      </div>
                    </div>

                    {/* Action */}
                    {journey.available && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectJourney(journey.id);
                        }}
                        className="ml-6 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white shadow-[0_2px_12px_rgba(62,43,184,0.25)] hover:shadow-[0_4px_20px_rgba(62,43,184,0.35)] transition-all duration-300"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                      >
                        <span>Begin</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
              New journeys unlock as you progress through the program
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
