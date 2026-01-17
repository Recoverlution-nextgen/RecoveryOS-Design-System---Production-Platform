import { BookOpen } from "lucide-react";
import { StoryLink } from "./StoryLink";

interface HumanCognitionPlatformProps {
  onNavigate?: (page: string) => void;
}

export function HumanCognitionPlatform({ onNavigate }: HumanCognitionPlatformProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#3E2BB8] via-[#5739FB] to-[#7C67FF] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                Platform Architecture
              </span>
            </div>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.1 }}
            >
              Human Cognition Platform
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, lineHeight: 1.5 }}
            >
              A three-layer architecture that mirrors how the brain processes information, learns from experience, and builds lasting behavioral change.
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
              Operational tools built on the HCP foundation
            </p>
            <div className="flex flex-wrap gap-2">
              <StoryLink storyId="ST42" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST45" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST46" onNavigate={onNavigate} variant="pill" showTitle />
            </div>
          </div>
        )}
        
        {/* Overview */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            Architecture Overview
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              The Human Cognition Platform (HCP) is Recoverlution's foundational architecture—a three-layer system inspired by neuroscience that transforms how therapeutic content is delivered, processed, and integrated into lasting behavioral change.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              Unlike traditional platforms that treat content as static resources, HCP mirrors the brain's natural learning pathways: rapid perception, reflective processing, and adaptive application. This creates a recovery experience that feels intuitive, personalized, and infinitely expandable.
            </p>
          </div>
        </section>

        {/* The Three Layers */}
        <section className="space-y-12">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            The Three Layers
          </h2>

          {/* Layer 1: Perception Layer */}
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center">
                <span className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>1</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
                Perception Layer
              </h3>
            </div>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>What it does:</strong> Rapid-fire provocations that spark curiosity and pattern recognition.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Platform manifestation:</strong> NaviCues—Instagram-speed micro-content (quotes, provocations, micro-teachings) with no time limits. Users swipe through infinite wisdom at their own pace.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Neuroscience foundation:</strong> The brain's perceptual systems process information in 200-500ms windows. NaviCues leverage this speed to create "aha moments" without cognitive overload.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> A quote about shame triggers pattern recognition → "That's me" → Curiosity to explore deeper.
              </p>
            </div>
          </div>

          {/* Layer 2: Processing Layer */}
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5739FB] to-[#7C67FF] flex items-center justify-center">
                <span className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>2</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
                Processing Layer
              </h3>
            </div>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>What it does:</strong> Deep exploration where users unpack concepts, understand mechanisms, and build mental models.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Platform manifestation:</strong> Building Blocks—longform articles, videos, exercises, and frameworks. Infinite scrolling with no completion markers. Content is tagged to micro-blocks in the brain for personalized pathways.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Neuroscience foundation:</strong> The prefrontal cortex requires sustained attention (5-15 minutes) to encode new neural pathways. Building Blocks provide scaffolded learning that respects cognitive load.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> A 10-minute article on "Window of Tolerance" with interactive diagrams, personal reflection prompts, and embedded videos.
              </p>
            </div>
          </div>

          {/* Layer 3: Integration Layer */}
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C67FF] to-[#9D8FFF] flex items-center justify-center">
                <span className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>3</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#3E2BB8' }}>
                Integration Layer
              </h3>
            </div>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>What it does:</strong> Adaptive intelligence that tracks micro-blocks, analyzes patterns, and surfaces the right content at the right time.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Platform manifestation:</strong> LUMA (Your Emotional Co-Pilot)—AI that knows which micro-blocks are red/orange/green, which content resonates, and what gaps exist in understanding. Surfaces NaviCues and Building Blocks based on real-time state and historical patterns.
            </p>
            <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              <strong>Neuroscience foundation:</strong> The brain consolidates learning through spaced repetition and contextual retrieval. LUMA uses these principles to reinforce weak micro-blocks and celebrate progress.
            </p>
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                <strong>Example:</strong> User marks "Shame" micro-block as red → LUMA surfaces a NaviCue about self-compassion → User engages → LUMA recommends Building Block on "Internalized Shame vs. Healthy Guilt."
              </p>
            </div>
          </div>
        </section>

        {/* How the Layers Work Together */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            How the Layers Work Together
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#3E2BB8] text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>→</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    User opens NaviCues (Perception Layer)
                  </p>
                  <p className="text-gray-600 mt-1">
                    Swipes through rapid provocations. Sees a quote about emotional regulation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#5739FB] text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>→</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    User taps to explore deeper (Processing Layer)
                  </p>
                  <p className="text-gray-600 mt-1">
                    NaviCue expands into a Building Block—a comprehensive article with exercises and frameworks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#7C67FF] text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>→</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    LUMA tracks engagement (Integration Layer)
                  </p>
                  <p className="text-gray-600 mt-1">
                    Notes that "Emotional Regulation" micro-block moved from red to orange. Surfaces related content tomorrow.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#9D8FFF] text-white flex items-center justify-center shrink-0 mt-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>🔄</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '1.125rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    Cycle repeats, infinitely
                  </p>
                  <p className="text-gray-600 mt-1">
                    User returns to NaviCues for quick inspiration. LUMA surfaces content that reinforces weak micro-blocks. Nothing is ever "complete."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            Technical Implementation
          </h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-[#3E2BB8] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Data Model
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                Every piece of content (NaviCue or Building Block) is tagged to one or more <strong>micro-blocks</strong>—granular cognitive/emotional concepts like "shame resilience," "craving surfing," or "identity reconstruction."
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`{
  contentId: "nc-shame-001",
  type: "NaviCue",
  microBlocks: ["shame", "self-compassion", "emotional-regulation"],
  pillar: "Emotional Regulation",
  format: "quote",
  content: "Shame hates being spoken..."
}`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-[#5739FB] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                User State Tracking
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                Each user has a <strong>micro-block profile</strong> that tracks the state of every concept (red/orange/green) based on engagement patterns, self-assessment, and time-based decay.
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-800">{`{
  userId: "user-123",
  microBlocks: {
    "shame": { state: "orange", lastEngaged: "2025-10-15", strength: 0.6 },
    "craving-surfing": { state: "green", lastEngaged: "2025-10-10", strength: 0.9 }
  }
}`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-[#7C67FF] pl-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                Content Surfacing Algorithm (LUMA)
              </h3>
              <p className="text-gray-700 mt-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                LUMA uses a priority queue that factors in:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                <li><strong>Micro-block state:</strong> Prioritize red/orange blocks</li>
                <li><strong>Current emotional state:</strong> Match content to real-time Inner Compass readings</li>
                <li><strong>Engagement history:</strong> Surface related content after a breakthrough</li>
                <li><strong>Spaced repetition:</strong> Reinforce green blocks at optimal intervals</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="space-y-6">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#3E2BB8' }}>
            Why This Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                For Users
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Recovery feels less like a curriculum and more like a conversation with a wise friend. NaviCues provide quick wins. Building Blocks provide depth. LUMA provides guidance. Nothing feels forced or finite.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                For Clinicians
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                HCP provides unprecedented visibility into patient progress. See which micro-blocks are struggling. Assign targeted content. Track engagement patterns. Support becomes precise, not prescriptive.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                For the Platform
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                HCP is infinitely scalable. Add new content → tag to micro-blocks → LUMA surfaces it automatically. No rigid pathways. No manual curation. The system learns and adapts.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#3E2BB8' }}>
                For Science
              </h3>
              <p className="text-gray-700 mt-3" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Every interaction generates data on what works. Which micro-blocks correlate with relapse? Which content formats drive engagement? HCP becomes a research engine for evidence-based recovery.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Principle */}
        <section className="bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] text-white rounded-2xl p-8 md:p-12">
          <p className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.4 }}>
            "The brain doesn't learn in chapters. It learns in moments, patterns, and connections. HCP mirrors this truth."
          </p>
          <p className="mt-4 text-white/80" style={{ fontSize: '1.125rem' }}>
            — Recoverlution Product Philosophy
          </p>
        </section>

        {/* Navigation Footer */}
        <section className="pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <a 
              href="/docs/product-dna"
              className="text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              ← Back to Product DNA
            </a>
            <div className="flex gap-6">
              <a 
                href="/docs/era-flow"
                className="text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                ERA Flow →
              </a>
              <a 
                href="/docs/infinite-canvas"
                className="text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Infinite Canvas →
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
