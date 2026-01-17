import { BookOpen } from "lucide-react";
import { StoryLink } from "./StoryLink";

interface InfiniteCanvasPrincipleProps {
  onNavigate?: (page: string) => void;
}

export function InfiniteCanvasPrinciple({ onNavigate }: InfiniteCanvasPrincipleProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#7C67FF] via-[#9D8FFF] to-[#C4B5FD] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                Design Philosophy
              </span>
            </div>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.1 }}
            >
              Infinite Canvas Principle
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, lineHeight: 1.5 }}
            >
              Nothing is finite. Nothing is boxed. Recovery is an infinite canvas for exploration, creation, and becoming.
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
              Tools implementing the Infinite Canvas philosophy
            </p>
            <div className="flex flex-wrap gap-2">
              <StoryLink storyId="ST42" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
            </div>
          </div>
        )}
        
        {/* Overview */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            The Philosophy
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              Recovery is not a checklist. It's not a linear path from broken to fixed. It's an ongoing exploration of who you are, who you're becoming, and what you're capable of.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              The Infinite Canvas Principle rejects completion markers, progress bars, and rigid pathways. Instead, it embraces fluidity, curiosity, and perpetual growth. It says: <em>"You're never done. And that's beautiful."</em>
            </p>
          </div>
        </section>

        {/* Core Tenets */}
        <section className="space-y-12">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            Core Tenets
          </h2>

          {/* Tenet 1: No Completion */}
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 space-y-4">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
              1. No Completion, Only Practice
            </h3>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>The Problem with "Complete":</strong> Traditional platforms use completion markers (checkboxes, progress bars, "100% done") to create a sense of achievement. But recovery isn't a course you finish—it's a practice you refine forever.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Our Approach:</strong> No content is ever "complete." Users <em>favorite</em> content they want to revisit, creating a personalized library of tools they return to again and again. Nothing is checked off. Everything is available.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> A user reads "Window of Tolerance" article in Week 1. Favorites it. Reads it again in Week 8 with new understanding. Favorites a different passage. Reads it again in Month 6 after a relapse. Each encounter deepens the reflex.
              </p>
            </div>
          </div>

          {/* Tenet 2: Infinite Scrolling */}
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 space-y-4">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
              2. Infinite Scrolling, Zero Time Limits
            </h3>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>The Problem with Constraints:</strong> Time limits and pagination create artificial endings. They say "stop here" when the brain might be ready to go deeper.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Our Approach:</strong> NaviCues and Building Blocks use infinite scrolling. No "Next" buttons. No timers. No "You've reached the end." Content flows as long as curiosity persists.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> User opens NaviCues at 11pm. Swipes through 40 provocations. Finds one that resonates. Expands into Building Block. Reads for 20 minutes. No app says "Time's up." User stops when ready.
              </p>
            </div>
          </div>

          {/* Tenet 3: Fluid Navigation */}
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 space-y-4">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
              3. Fluid Navigation, Not Linear Paths
            </h3>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>The Problem with Pathways:</strong> Rigid pathways (Module 1 → Module 2 → Module 3) assume everyone learns the same way. They create "correct" and "incorrect" journeys.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Our Approach:</strong> Users explore through curiosity, not curriculum. LUMA surfaces content based on current state, not predetermined sequences. Every path is valid. Every journey is unique.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> User A explores Pillar 1 (Emotional Regulation) deeply before touching other pillars. User B bounces between all 6 pillars based on daily needs. Both are supported. Neither is "wrong."
              </p>
            </div>
          </div>

          {/* Tenet 4: State-Based, Not Stage-Based */}
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 space-y-4">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
              4. State-Based, Not Stage-Based
            </h3>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>The Problem with Stages:</strong> Traditional models (Beginner → Intermediate → Advanced) lock users into fixed identities. You're either "in recovery" or "recovered."
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Our Approach:</strong> Content adapts to current <em>state</em> (red/orange/green micro-blocks, Inner Compass readings), not historical stage. A user in year 5 might need beginner content on a new stressor. The system meets them where they are, today.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> User with 3 years of sobriety experiences relapse. Inner Compass goes red. LUMA surfaces foundational content on shame resilience—content they "already knew" but need to re-encounter in this state.
              </p>
            </div>
          </div>
        </section>

        {/* Data Model: How We Build Infinity */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            Data Model: How We Build Infinity
          </h2>
          <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            The Infinite Canvas isn't just philosophy—it's architecture. Here's how we structure data to eliminate boundaries:
          </p>

          <div className="space-y-8">
            <div className="border-l-4 border-[#3E2BB8] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Content Is Atomic, Not Sequential
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                Every NaviCue and Building Block is a standalone unit. No dependencies. No prerequisites. No "You must complete X before accessing Y."
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`{
  contentId: "bb-window-tolerance",
  type: "BuildingBlock",
  microBlocks: ["emotional-regulation", "nervous-system"],
  pillar: "Emotional Regulation",
  prerequisites: null, // No barriers
  relatedContent: ["nc-grounding-001", "bb-polyvagal-theory"]
}`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-[#5739FB] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                User State Is Continuous, Not Categorical
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                Micro-block states use decimal values (0.0 to 1.0), not binary flags. This allows for nuance: "shame" can be 0.4 (orange, improving) or 0.8 (green, strong).
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`{
  userId: "user-123",
  microBlocks: {
    "shame": { strength: 0.42, state: "orange", trend: "improving" },
    "craving-surfing": { strength: 0.87, state: "green", trend: "stable" }
  }
}`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-[#7C67FF] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Engagement Metrics Are Qualitative, Not Quantitative
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                We don't track "completion rate" or "time on task." We track: resonance (favorited?), depth (scroll depth, exercise completion), and recurrence (how often user returns).
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`{
  contentId: "bb-window-tolerance",
  userId: "user-123",
  engagements: [
    { date: "2025-10-01", scrollDepth: 0.65, favorited: false },
    { date: "2025-10-15", scrollDepth: 1.0, favorited: true, notes: "..." },
    { date: "2025-11-03", scrollDepth: 0.8, favorited: true }
  ]
}`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-[#9D8FFF] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Content Surfacing Is Dynamic, Not Static
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                LUMA's recommendation algorithm regenerates every time the user opens the app. It factors in: current emotional state, micro-block health, time since last engagement, and random exploration (20% of suggestions are intentionally unexpected).
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`// LUMA regenerates feed on every app open
const feed = await generateFeed({
  userId,
  currentState: innerCompassReading, // Real-time
  microBlockHealth: microBlockProfile, // Red/orange/green
  explorationFactor: 0.2 // 20% serendipity
});`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* UI Manifestations */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            UI Manifestations
          </h2>
          <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            The Infinite Canvas shapes every interface decision:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: '#3E2BB8' }}>
                No Progress Bars
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Instead of "3/10 modules complete," we show: "14 micro-blocks green, 6 orange, 2 red." Progress is multidimensional, not linear.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: '#3E2BB8' }}>
                No "Next" Buttons
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Content flows infinitely. Users swipe, scroll, or explore related content organically. No artificial endpoints.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: '#3E2BB8' }}>
                No "Unlock" Gates
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                All content is accessible from day one. Users explore based on curiosity, not permission. Trust them to self-direct.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: '#3E2BB8' }}>
                Stars Instead of Checks
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Favoriting (⭐) replaces completion (✓). It signals: "This is valuable to me" not "I'm done with this."
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            Why This Matters
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Psychologically:</strong> Completion markers create pressure and shame. When you see "20% complete," you feel behind. When you see "infinite canvas," you feel free.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Neurologically:</strong> The brain learns through spaced repetition, not one-time mastery. Infinite access supports this natural process.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Clinically:</strong> Recovery is fluid. Users need different content in different states. Rigid pathways can't adapt. Infinite canvas can.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Philosophically:</strong> Recovery is becoming, not arriving. The Infinite Canvas honors this truth.
            </p>
          </div>
        </section>

        {/* Closing Principle */}
        <section className="bg-gradient-to-br from-[#7C67FF] to-[#9D8FFF] text-white rounded-2xl p-8 md:p-12">
          <p className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.4 }}>
            "You don't finish recovery. You practice it. Forever. And that's not a bug—it's the design."
          </p>
          <p className="mt-4 text-white/80" style={{ fontSize: '1.125rem' }}>
            — Recoverlution Design Manifesto
          </p>
        </section>

        {/* Navigation Footer */}
        <section className="pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <a 
              href="/docs/era-flow"
              className="text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              ← ERA Flow
            </a>
            <a 
              href="/docs/product-dna"
              className="text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Back to Product DNA →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
