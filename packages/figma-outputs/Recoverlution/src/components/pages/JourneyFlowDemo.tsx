/**
 * Journey Flow Demo
 * 
 * Demonstrates the complete Journey flow:
 * 1. Journey Landing (NOW) ✅
 * 2. E-R-A Context Screens (Clean NaviCues aesthetic)
 * 3. SEED Scene (Full-screen experiential)
 * 4. Return to introspection/practice
 */

import { useState } from 'react';
import { JourneyERAScreens } from '../JourneyERAScreens';
import { JourneySeedScene } from '../JourneySeedScene';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Compass, Lightbulb, Brain, Heart, Sparkles, Play } from 'lucide-react';

type FlowState = 'landing' | 'era' | 'seed' | 'introspection';

export function JourneyFlowDemo() {
  const [flowState, setFlowState] = useState<FlowState>('landing');

  // Mock week data
  const weekData = {
    weekNumber: 1,
    theme: "Understanding Triggers",
    primaryFocus: "Recognize what activates your patterns",
    pillar: "Emotional Regulation",
  };

  // Mock E-R-A content
  const eraContent = {
    experience: {
      letter: 'E' as const,
      title: 'Experience',
      description: 'A trigger is not the enemy. It\'s information. A signal from your nervous system about something that needs attention.',
      keyPoints: [
        'Triggers are automatic responses formed through past experiences and conditioning.',
        'Your brain is protecting you based on patterns it learned - even if those patterns no longer serve you.',
        'The first step isn\'t to stop being triggered. It\'s to recognize when it\'s happening.',
        'Awareness creates space. Space creates choice. Choice creates freedom.',
      ],
      gradient: 'from-rose-500 to-pink-500',
      icon: Heart,
    },
    reflect: {
      letter: 'R' as const,
      title: 'Reflect',
      description: 'What if your triggers are trying to tell you something important? What if they\'re pointing to unmet needs or unhealed wounds?',
      keyPoints: [
        'Consider: What situations, people, or emotions tend to activate your patterns?',
        'Notice: What happens in your body when you\'re triggered? (racing heart, tight chest, tension)',
        'Recognize: What stories does your mind tell you in those moments?',
        'Remember: You\'re not broken. You\'re human. And you\'re learning to respond differently.',
      ],
      gradient: 'from-purple-500 to-violet-500',
      icon: Brain,
    },
    act: {
      letter: 'A' as const,
      title: 'Act',
      description: 'This week, your practice is simple: Notice. When you feel triggered, pause and name it. That\'s it. No fixing. No forcing. Just awareness.',
      keyPoints: [
        'When you notice a trigger, try saying internally: "I\'m noticing I feel triggered right now."',
        'Notice without judgment. You\'re a scientist observing data, not a judge making verdicts.',
        'If it feels safe, place a hand on your heart. This simple gesture can activate your parasympathetic nervous system.',
        'At the end of each day, reflect: What triggered me today? What did I notice?',
      ],
      gradient: 'from-amber-500 to-orange-500',
      icon: Lightbulb,
    },
  };

  // Mock seed content
  const seedContent = {
    seedPrompt: 'Notice what triggers you - without judgment, without fixing. Just notice. Name it. Honor it.',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    gradient: 'from-rose-500/50 to-orange-500/50',
  };

  // Render based on flow state
  if (flowState === 'era') {
    return (
      <JourneyERAScreens
        weekNumber={weekData.weekNumber}
        theme={weekData.theme}
        eraContent={eraContent}
        onComplete={() => setFlowState('seed')}
        onBack={() => setFlowState('landing')}
      />
    );
  }

  if (flowState === 'seed') {
    return (
      <JourneySeedScene
        weekNumber={weekData.weekNumber}
        theme={weekData.theme}
        seedPrompt={seedContent.seedPrompt}
        heroImage={seedContent.heroImage}
        gradient={seedContent.gradient}
        onReturn={() => setFlowState('introspection')}
      />
    );
  }

  if (flowState === 'introspection') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Card className="p-12 max-w-2xl text-center">
          <Sparkles className="w-16 h-16 text-[#5739FB] mx-auto mb-6" />
          <h1
            className="text-3xl text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Return to Introspection
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            This is where the patient would return to their daily practice, journaling, or other introspective work.
            The seed has been planted. Now they carry it with them throughout their day.
          </p>
          <Button
            onClick={() => setFlowState('landing')}
            className="bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white"
          >
            Back to Demo Start
          </Button>
        </Card>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFAFA] to-[#F9F7FF] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-12">
          <Compass className="w-20 h-20 text-[#5739FB] mx-auto mb-6" />
          <h1
            className="text-5xl text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
          >
            Journey Flow Demo
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Experience the complete Journey flow: E-R-A Context → SEED Scene → Return to practice
          </p>
        </div>

        {/* Demo Card */}
        <Card className="p-10 mb-8 bg-white shadow-xl border-2 border-[#3E2BB8]/20">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>

            <div className="flex-1">
              <h2
                className="text-3xl text-gray-900 mb-2"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {weekData.theme}
              </h2>
              <p className="text-gray-600 text-lg mb-3">{weekData.primaryFocus}</p>
              <div className="inline-block px-3 py-1 bg-[#F5F3FF] text-[#3E2BB8] rounded-full text-sm">
                {weekData.pillar}
              </div>
            </div>
          </div>

          <Button
            onClick={() => setFlowState('era')}
            className="w-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#2E1B98] hover:to-[#4729DB] text-white py-6 text-lg"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            <Play className="w-6 h-6 mr-3" />
            Begin Journey Practice
          </Button>
        </Card>

        {/* Flow Explanation */}
        <div className="space-y-4">
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#5739FB] text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  E-R-A Context Screens
                </h3>
                <p className="text-sm text-gray-600">
                  Clean NaviCues aesthetic, but with depth. Experience → Reflect → Act
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#5739FB] text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  SEED Scene
                </h3>
                <p className="text-sm text-gray-600">
                  Full-screen experiential moment. Plants the seed for the day: "Notice, look for, be aware of..."
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#5739FB] text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Return to Introspection
                </h3>
                <p className="text-sm text-gray-600">
                  Patient carries the seed with them throughout their day. No pressure, just presence.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12 pb-12">
          <p className="text-sm text-gray-500 italic leading-relaxed max-w-2xl mx-auto">
            This is the foundation of recovery. Not 10 quick NaviCues, but one deep journey practice that plants a seed and lets it grow.
          </p>
        </div>
      </div>
    </div>
  );
}
