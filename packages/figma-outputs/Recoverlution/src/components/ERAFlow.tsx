import { BookOpen } from "lucide-react";
import { StoryLink } from "./StoryLink";

interface ERAFlowProps {
  onNavigate?: (page: string) => void;
}

export function ERAFlow({ onNavigate }: ERAFlowProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#5739FB] via-[#7C67FF] to-[#9D8FFF] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                Learning Mechanics
              </span>
            </div>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.1 }}
            >
              ERA Flow
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, lineHeight: 1.5 }}
            >
              Encounter → Reflection → Application. The neuroscience-backed pathway that transforms therapeutic insights into automatic reflexes.
            </p>
          </div>
        </div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-20 space-y-20">
        
        {/* Related Content Lab Tools */}
        {onNavigate && (
          <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-xl p-6 border border-[#5739FB]/10">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-[#3E2BB8]" />
              <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                Content Lab Tools
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Operational tools built on ERA Flow mechanics
            </p>
            <div className="flex flex-wrap gap-2">
              <StoryLink storyId="ST42" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST45" onNavigate={onNavigate} variant="pill" showTitle />
            </div>
          </div>
        )}
        
        {/* Overview */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            What is ERA Flow?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              ERA Flow is the learning loop at the heart of Recoverlution. It's how we turn recovery insights into reflexes—the automatic, embodied responses that define lasting behavioral change.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              Inspired by neuroscience research on habit formation, memory consolidation, and expertise development, ERA Flow mirrors how the brain naturally learns complex skills: encounter new information, reflect on its meaning, apply it in real contexts, and repeat until it becomes second nature.
            </p>
          </div>
        </section>

        {/* The Three Phases */}
        <section className="space-y-12">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            The Three Phases
          </h2>

          {/* Phase 1: Encounter */}
          <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>E</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
                Encounter
              </h3>
            </div>
            <p className="text-gray-900" style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
              Introduce new concepts in digestible, curiosity-sparking formats.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Platform manifestation:</strong> NaviCues deliver rapid-fire provocations—quotes, micro-teachings, visual cues—that create "aha moments" without overwhelming the prefrontal cortex.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Neuroscience foundation:</strong> The brain's attention system can process 40-50 bits of information per second. NaviCues respect this limit by delivering single, potent ideas that trigger pattern recognition ("I've felt this") without cognitive overload.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> NaviCue shows quote: "Shame hates being spoken. Speak it anyway." User's brain: "Wait, that's true. I've experienced that. Why does talking about shame help?"
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-900" style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                Goal: Create curiosity. Activate prior knowledge. Prepare the brain for deeper encoding.
              </p>
            </div>
          </div>

          {/* Phase 2: Reflection */}
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5739FB] to-[#7C67FF] flex items-center justify-center">
                <span className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>R</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
                Reflection
              </h3>
            </div>
            <p className="text-gray-900" style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
              Unpack the concept. Build mental models. Personalize the insight.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Platform manifestation:</strong> Building Blocks provide deep dives—articles, videos, exercises—that explain the "why" and "how." Users explore at their own pace, with infinite scrolling and no completion markers.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Neuroscience foundation:</strong> The hippocampus requires sustained attention (5-15 minutes) to encode episodic memories. Reflection allows the prefrontal cortex to integrate new information with existing schemas, creating durable neural pathways.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> User taps NaviCue → Building Block opens with article on "Shame Resilience" → Explains Brené Brown's research → User completes reflection prompts: "When did I last experience shame? What did I do? What could I try next time?"
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-900" style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                Goal: Build understanding. Create personal meaning. Strengthen neural encoding.
              </p>
            </div>
          </div>

          {/* Phase 3: Application */}
          <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>A</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
                Application
              </h3>
            </div>
            <p className="text-gray-900" style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
              Practice the skill in real-world contexts. Build reflexive responses.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Platform manifestation:</strong> LUMA surfaces content at emotionally relevant moments. Inner Compass tracks real-time states. Navigate connects users to care teams for accountability. Users apply insights when it matters most.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Neuroscience foundation:</strong> The basal ganglia automate behaviors through repetition in varied contexts. Spaced practice + emotional salience = faster habit formation. Application turns explicit knowledge into implicit reflexes.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> User feels shame spike (Inner Compass goes red) → LUMA surfaces NaviCue: "Speak it anyway" → User texts their sponsor → Shame dissipates → Micro-block "shame resilience" moves from red to orange. Brain learns: "Talking helps."
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-900" style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                Goal: Automate responses. Build muscle memory. Create lasting behavioral change.
              </p>
            </div>
          </div>
        </section>

        {/* The Loop: From Insights to Reflexes */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            The Loop: From Insights to Reflexes
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 space-y-6">
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              ERA Flow isn't linear—it's cyclical. Users don't "complete" concepts. They encounter them again and again, each time deepening understanding and strengthening reflexes.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>1</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    First Encounter (Week 1)
                  </p>
                  <p className="text-gray-600 mt-1">
                    NaviCue introduces "Window of Tolerance." User thinks: "Interesting concept."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#5739FB] text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>2</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    First Reflection (Week 2)
                  </p>
                  <p className="text-gray-600 mt-1">
                    User explores Building Block on polyvagal theory. Completes exercise mapping their own window. Thinks: "This explains why I shut down when overwhelmed."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500 text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>3</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    First Application (Week 3)
                  </p>
                  <p className="text-gray-600 mt-1">
                    User feels dysregulated (Inner Compass red). LUMA surfaces NaviCue: "You're outside your window. Try grounding." User practices box breathing. Nervous system regulates. Brain learns: "This works."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>4</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    Second Encounter (Week 5)
                  </p>
                  <p className="text-gray-600 mt-1">
                    NaviCue shows advanced concept: "Your window expands with practice." User thinks: "Oh, I can grow this capacity."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#7C67FF] text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>5</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    Reflex Formation (Week 12)
                  </p>
                  <p className="text-gray-600 mt-1">
                    User feels dysregulated. Automatically reaches for grounding technique. Doesn't need LUMA's prompt. The response is now reflexive. Micro-block "emotional regulation" is green.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3E2BB8] to-[#9D8FFF] text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>∞</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    Maintenance Forever
                  </p>
                  <p className="text-gray-600 mt-1">
                    LUMA continues surfacing Window of Tolerance content at optimal intervals (spaced repetition). Reflex stays sharp. Micro-block never decays back to red.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How ERA Flow Works in Code */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            How ERA Flow Works in Code
          </h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Encounter Trigger
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                When user opens NaviCues, LUMA queries for content tagged to red/orange micro-blocks. Content is surfaced in priority order.
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`// LUMA surfaces NaviCues based on micro-block state
const priorityContent = await getContentForUser({
  userId,
  microBlockStates: ['red', 'orange'],
  contentType: 'NaviCue',
  limit: 20
});`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-[#5739FB] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Reflection Deepening
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                When user taps a NaviCue, it expands into related Building Blocks. System tracks time spent, scroll depth, and completion of reflection exercises.
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`// Track engagement with Building Block
await trackEngagement({
  userId,
  contentId,
  microBlocks: ['shame', 'self-compassion'],
  timeSpent: 847, // seconds
  scrollDepth: 0.92,
  exercisesCompleted: ['reflection-prompt-1']
});`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Application Context
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                Inner Compass detects emotional dysregulation. LUMA surfaces context-appropriate NaviCue. User practices skill. System updates micro-block state.
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`// Inner Compass triggers intervention
if (emotionalState === 'dysregulated') {
  const intervention = await LUMA.suggestIntervention({
    userId,
    currentState: emotionalState,
    greenMicroBlocks: ['grounding', 'breath-work']
  });
  // User applies skill → micro-block strengthens
  await updateMicroBlock('emotional-regulation', { state: 'orange' });
}`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-[#9D8FFF] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Spaced Repetition Loop
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                LUMA schedules re-exposure to green micro-blocks at optimal intervals (1 day, 3 days, 7 days, 14 days, 30 days).
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`// Schedule maintenance encounters
const nextReview = calculateSpacedInterval({
  microBlock: 'shame-resilience',
  currentState: 'green',
  lastEncounter: '2025-10-10',
  strength: 0.85
});
// Returns: 2025-10-17 (7 days later)`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Why ERA Flow Matters */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            Why ERA Flow Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                It Mirrors Neuroscience
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                The brain learns through exposure → consolidation → retrieval practice. ERA Flow leverages this natural pathway instead of fighting it.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                It Respects Cognitive Load
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Users aren't bombarded with information. They encounter → reflect → apply at their own pace, reducing overwhelm and increasing retention.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                It's Infinitely Adaptable
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                LUMA adjusts the loop based on user behavior. Struggling with a concept? More encounters. Mastered it? Spaced maintenance. The system learns.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                It Builds Automaticity
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Recovery isn't about knowing what to do—it's about doing it automatically under stress. ERA Flow creates reflexes, not just knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Principle */}
        <section className="bg-gradient-to-br from-[#5739FB] to-[#7C67FF] text-white rounded-2xl p-8 md:p-12">
          <p className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.4 }}>
            "Knowledge is knowing what to do. Wisdom is doing it without thinking. ERA Flow bridges the gap."
          </p>
          <p className="mt-4 text-white/80" style={{ fontSize: '1.125rem' }}>
            — Recoverlution Learning Philosophy
          </p>
        </section>

        {/* Navigation Footer */}
        <section className="pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <a 
              href="/docs/hcp"
              className="text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              ← Human Cognition Platform
            </a>
            <a 
              href="/docs/infinite-canvas"
              className="text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Infinite Canvas →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
