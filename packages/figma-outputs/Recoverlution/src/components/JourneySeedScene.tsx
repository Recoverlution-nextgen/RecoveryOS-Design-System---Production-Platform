/**
 * Journey SEED Scene
 * 
 * Philosophy:
 * - Full-screen experiential moment (like Recovery Instagram)
 * - Plants a seed for the day: "As you go about your day, notice..."
 * - Tied to the week's theme/concept
 * - No "next cue" - just return to introspection when ready
 * - Motivational, experiential, powerful
 */

import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface JourneySeedSceneProps {
  weekNumber: number;
  theme: string;
  seedPrompt: string; // The "notice/look for/be aware of" prompt
  heroImage: string;
  gradient: string;
  onReturn: () => void; // Return to introspection
}

export function JourneySeedScene({
  weekNumber,
  theme,
  seedPrompt,
  heroImage,
  gradient,
  onReturn,
}: JourneySeedSceneProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Full-screen hero image */}
      <div className="relative flex-1 flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={theme}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Top Bar - Exit */}
        <div className="relative z-10 flex items-center justify-between p-6">
          <button
            onClick={onReturn}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Return</span>
          </button>
        </div>

        {/* Center Content - The Seed */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-24">
          <div className="max-w-2xl text-center">
            {/* Sparkle Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Theme */}
            <h1
              className="text-white text-4xl md:text-5xl mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              {theme}
            </h1>

            {/* The Seed Prompt */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
              <p
                className="text-white/90 text-sm uppercase tracking-wider mb-4"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                As you go about your day today...
              </p>
              <p
                className="text-white text-xl md:text-2xl leading-relaxed"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                {seedPrompt}
              </p>
            </div>

            {/* Gentle reminder */}
            <p className="text-white/70 text-sm italic">
              No pressure. Just presence. The seed is planted.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 p-6 flex justify-center">
          <Button
            onClick={onReturn}
            className="bg-white text-[#3E2BB8] hover:bg-white/90 px-8 py-6 rounded-xl shadow-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Return to Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
