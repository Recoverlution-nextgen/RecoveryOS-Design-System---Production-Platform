import { Heart, Brain, Wind, Users, Target, Zap, Check, ChevronRight, ArrowRight, Activity, Eye, Sparkles, BookOpen } from "lucide-react";
import { StoryLink } from "./StoryLink";

/**
 * CHAPTER ONE: STEADY THE STORM
 * The Emotional Regulation Pillar - Deep Dive
 * 
 * Science · Stories · Soul
 * A love letter to anyone who's ever felt the surge and thought, "I can't."
 * You can. One breath, one choice, one proof at a time.
 * 
 * Content: Daniel's raw truth + neuroscience validation
 * Design: Apple-grade precision + emotional resonance
 */

interface EmotionalRegulationPillarProps {
  onNavigate?: (page: string) => void;
}

export function EmotionalRegulationPillar({ onNavigate }: EmotionalRegulationPillarProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-white/80 text-sm uppercase tracking-wide mb-1">Chapter One · Pillar 1</div>
              <h1 className="text-white text-5xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Steady the Storm
              </h1>
              <p className="text-white/90 text-xl mt-2">The Emotional Regulation Thesis</p>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <p className="text-white/95 text-lg leading-relaxed mb-6 italic">
              Science · Stories · Soul. A love letter to anyone who's ever felt the surge and thought, "I can't." You can. One breath, one choice, one proof at a time.
            </p>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-white font-semibold mb-3">Dedication</h3>
              <p className="text-white/90 leading-relaxed">
                To the ones white-knuckling the night. To the parents searching the dark. To clinicians holding the line. To engineers making empathy fast. To investors betting on dignity. To everyone building a world where coming home to yourself is normal.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Related Content Tools */}
        {onNavigate && (
          <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-xl p-6 border border-[#5739FB]/10">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-[#3E2BB8]" />
              <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                Micro-Blocks & Resources
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              8 micro-blocks and therapeutic practices for Emotional Regulation
            </p>
            <div className="flex flex-wrap gap-2">
              <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST42" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST45" onNavigate={onNavigate} variant="pill" showTitle />
            </div>
          </div>
        )}
        
        {/* The Thesis */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              The Thesis
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200/50">
              <h3 className="text-red-900 font-semibold mb-3">Problem, simply</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                When arousal spikes, the brain narrows, old routes light up, and choice collapses. Insight alone can't hold the wheel.
              </p>
              <div className="p-3 bg-white/70 rounded-lg text-xs text-gray-700 space-y-1">
                <p><strong>Physiologically:</strong> Sympathetic activation → catecholamine surge → PFC impairment (Arnsten, 2015)</p>
                <p><strong>Psychologically:</strong> Attentional narrowing, working memory collapse, habit dominance (Schwabe & Wolf, 2009)</p>
                <p><strong>Cognitively:</strong> Appraisal rigidity, catastrophizing, executive function failure</p>
              </div>
            </div>

            {/* Answer */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200/50">
              <h3 className="text-green-900 font-semibold mb-3">Answer, human</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Train the body to come home faster so the mind can choose truer—then prove it in the lived day.
              </p>
              <div className="p-3 bg-white/70 rounded-lg text-xs text-gray-700 space-y-1">
                <p><strong>Vagal tone training:</strong> Resonant breathing → ↑HRV → ↑parasympathetic brake (Lehrer et al., 2020)</p>
                <p><strong>Window of tolerance:</strong> Widen arousal range where cognition works (Siegel, 1999)</p>
                <p><strong>Recovery half-life:</strong> Faster return to baseline = more choice (Porges, 2011)</p>
              </div>
            </div>

            {/* How */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200/50">
              <h3 className="text-blue-900 font-semibold mb-3">How we do it</h3>
              <p className="text-gray-800 leading-relaxed">
                Weekly ERA journeys (Experience → Recognise → Align) + on-demand navicues that fit in life's cracks + a gentle Inner Compass (Energy · Clarity · Connection). LUMA brings the right prompt at the right moment—with receipts (why now / why this / expected effect).
              </p>
            </div>

            {/* Why */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border-2 border-purple-200/50">
              <h3 className="text-purple-900 font-semibold mb-3">Why it endures</h3>
              <p className="text-gray-800 leading-relaxed">
                We stack micro-proofs until identity changes from the inside out. Progress is vectors, not levels.
              </p>
            </div>
          </div>
        </section>

        {/* The Vows */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              The Vows
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            These aren't slogans; they are safety rails and north stars. They keep us humble in the lab, honest in the clinic, and human in the interface.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {vows.map((vow, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1">{vow.principle}</h4>
                    <p className="text-sm text-gray-600">{vow.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dream Team */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Dream Team
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We stand on generous shoulders. The names below represent decades of inquiry, debate, and care. Their science guides our craft; our craft carries their science to the kitchen table.
          </p>

          <div className="space-y-4">
            {dreamTeam.map((category, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <h3 className="text-gray-900 font-semibold mb-3">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.researchers.map((researcher, rIdx) => (
                    <span key={rIdx} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-900 rounded-lg text-sm font-medium border border-blue-200/50">
                      {researcher}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 italic">
              Many serve across pillars; this chapter anchors their craft to regulation.
            </p>
          </div>
        </section>

        {/* Core Model */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Core Model: State Drives Story
            </h2>
          </div>

          <div className="p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border-2 border-blue-200/50 mb-6">
            <h3 className="text-gray-900 font-semibold mb-4">The Flow (jargon-light)</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Sensations (heart, breath, gut) rise → attention locks → meaning is made → behavior fires. We intervene at all four stages:
            </p>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-xl">
                <div className="text-blue-600 font-bold mb-2">1. Situation</div>
                <p className="text-xs text-gray-700">Shape the context</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Avoid trigger locations, edit environment
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <div className="text-indigo-600 font-bold mb-2">2. Attention</div>
                <p className="text-xs text-gray-700">Where we aim the mind</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Shift from cue to breath, 3×3 sensory scan
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <div className="text-purple-600 font-bold mb-2">3. Meaning</div>
                <p className="text-xs text-gray-700">How we appraise things</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Reappraise urge as wave, shrink catastrophe
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <div className="text-pink-600 font-bold mb-2">4. Response</div>
                <p className="text-xs text-gray-700">What we do in the body</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Breathe, move, co-regulate, Right-Next-Inch
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
            <h3 className="text-gray-900 font-semibold mb-4">Brain Under the Hood (fast sketch)</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Prefrontal Cortex & ACC</p>
                  <p className="text-xs text-gray-600">Braking, reframing, holding goals. Impaired by stress (Arnsten).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                <Zap className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Amygdala</p>
                  <p className="text-xs text-gray-600">Alarm learning; calms with skillful input (LeDoux).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <Eye className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Insula</p>
                  <p className="text-xs text-gray-600">Interoception; sensing internal signals (Barrett, Paulus).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <Wind className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Autonomic Nervous System (Vagus)</p>
                  <p className="text-xs text-gray-600">The "vagal brake" that slows the system (Porges' Polyvagal Theory).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Stack */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Skills Stack (Body → Mind → Meaning)
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We build from the ground up: stabilize physiology first, then attention, then meaning, then identity. Each layer supports the next.
          </p>

          <div className="space-y-6">
            {skillsStack.map((category, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.duration}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.practices.map((practice, pIdx) => (
                    <div key={pIdx} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl">
                      <div className="flex items-start gap-2 mb-2">
                        <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{practice.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{practice.description}</p>
                          {practice.mechanism && (
                            <div className="mt-2 p-2 bg-white/70 rounded text-xs text-gray-600">
                              <strong>Mechanism:</strong> {practice.mechanism}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practice Liquidity Score */}
        <section>
          <div className="p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-3xl border-2 border-amber-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Practice Liquidity Score (PLS)
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Novel metric for real-world feasibility.</strong> Recovery happens in the wild, not the clinic. High-PLS practices get used. Low-PLS practices get forgotten.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Definition</h4>
                <p className="text-sm text-gray-700 mb-3">
                  A 0.0-1.0 metric quantifying how easily a practice can be performed in real-world contexts.
                </p>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Time:</strong> Shorter = higher score</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Environment:</strong> Can be done anywhere = higher</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Cognitive load:</strong> Simple = higher</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Equipment:</strong> None needed = higher</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Social:</strong> Doesn't draw attention = higher</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Examples</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">I-Line (45-60s)</span>
                      <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded font-bold">PLS 0.97</span>
                    </div>
                    <p className="text-xs text-gray-600">Can be done anywhere, eyes closed, no movement, silent</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">Buddy Breath (120s)</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded font-bold">PLS 0.88</span>
                    </div>
                    <p className="text-xs text-gray-600">Requires another person, but simple, low-key</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">Cold Face Splash (10-30s)</span>
                      <span className="text-xs px-2 py-0.5 bg-orange-600 text-white rounded font-bold">PLS 0.50-0.70</span>
                    </div>
                    <p className="text-xs text-gray-600">Needs sink/water, can't do in meeting</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/70 rounded-xl">
              <p className="text-xs text-gray-700">
                <strong>Research backing:</strong> Just-in-time adaptive interventions (JITAIs) - Susan Murphy, Inbal Nahum-Shani; behavioral economics - friction/convenience (Milkman, Thaler)
              </p>
            </div>
          </div>
        </section>

        {/* Covenant */}
        <section>
          <div className="p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white">
            <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Covenant
            </h2>
            <p className="text-white/95 leading-relaxed mb-4">
              This chapter is not a plan on paper; it is a promise in practice. We vow to meet people in the heat, to choose physiology before philosophy, to make room for choice, and to count progress in moments that matter.
            </p>
            <p className="text-white/95 leading-relaxed mb-6">
              We believe in micro-proofs that add up to identity, in compassion that never condescends, and in science that serves the soul. If we do this faithfully, lives bend toward home.
            </p>
            <p className="text-white font-semibold">
              Chapter One stands. Signed in good faith, by everyone who builds and everyone who breathes this work.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

// Data

const vows = [
  {
    principle: "Regulate before you reason.",
    explanation: "If arousal ≥7/10, the body goes first. PFC is offline at high arousal (Arnsten)."
  },
  {
    principle: "Two-step minimum: Regulate → Choose.",
    explanation: "Close every loop in behavior. Stabilize, then decide. No leaping from insight to action."
  },
  {
    principle: "Kind, not cute.",
    explanation: "Words that lower shame, raise agency. No toxic positivity, no minimizing pain."
  },
  {
    principle: "Practice liquidity.",
    explanation: "Drills that fit queues, commutes, bathrooms, elevators. High-PLS practices get used."
  },
  {
    principle: "Explain everything.",
    explanation: "Why now · Why this · Expected effect. Trust is a feature. Transparency is non-negotiable."
  },
  {
    principle: "Evidence lives here.",
    explanation: "Claims map to measures. When truth moves, we move. No hand-waving allowed."
  }
];

const dreamTeam = [
  {
    category: "Affect & Regulation",
    researchers: ["James J. Gross", "Kevin Ochsner", "Lisa Feldman Barrett", "Richard J. Davidson"]
  },
  {
    category: "Craving & Habit",
    researchers: ["Hedy Kober", "Judson Brewer", "Kent C. Berridge"]
  },
  {
    category: "Stress & Sleep",
    researchers: ["Wendy Suzuki", "Amy Arnsten", "Matthew Walker"]
  },
  {
    category: "Methods (JITAI/N-of-1)",
    researchers: ["Susan Murphy", "Inbal Nahum-Shani"]
  },
  {
    category: "Psychophysiology",
    researchers: ["Paul Lehrer", "Richard Gevirtz"]
  },
  {
    category: "Addiction/Policy",
    researchers: ["Nora Volkow", "Anna Lembke"]
  }
];

const skillsStack = [
  {
    name: "Physiological Ground",
    duration: "2-5 min",
    practices: [
      {
        name: "Resonant breathing",
        description: "≈5-6 breaths/min; nasal; light, low, slow; metronome/HRV when available.",
        mechanism: "Goal: ↑HRV, longer exhale. Activates vagal brake (Lehrer et al., 2020)."
      },
      {
        name: "Box or 4-7-8 breathing",
        description: "For acute spikes. Structured breath patterns regulate arousal.",
        mechanism: "Shifts autonomic balance toward parasympathetic (Porges, 2011)."
      },
      {
        name: "Physiological downshift",
        description: "Eyes soft, jaw unhinge, shoulders drop. Postural cues to safety.",
        mechanism: "Body-to-brain signaling; posture shapes emotion (Carney et al., 2010)."
      },
      {
        name: "Cold face splash / cool air",
        description: "Short, optional; triggers mammalian dive reflex.",
        mechanism: "Rapid vagal activation (Gooden, 1994)."
      }
    ]
  },
  {
    name: "Attentional Control",
    duration: "1-3 min",
    practices: [
      {
        name: "Name it, notice it",
        description: "Label emotion → cognitive load ↓.",
        mechanism: "Affect labeling reduces amygdala reactivity (Lieberman et al., 2007)."
      },
      {
        name: "3×3 sensory scan",
        description: "3 sights / 3 sounds / 3 touches → present-focus.",
        mechanism: "Breaks cue-lock, shifts attention to neutral stimuli."
      },
      {
        name: "Spot-swap",
        description: "Move attention from cue to breath or feet for 30-60s.",
        mechanism: "Attentional disengagement from craving cues (Franken et al., 2000)."
      }
    ]
  },
  {
    name: "Cognitive Reframe",
    duration: "When settled ≥5/10",
    practices: [
      {
        name: "Reappraise",
        description: "'This urge is energy I can surf; it will peak and pass.'",
        mechanism: "Cognitive reappraisal recruits PFC to modulate emotion (Gross & Ochsner)."
      },
      {
        name: "Distance talk",
        description: "Second/third-person self-talk; shrink catastrophizing.",
        mechanism: "Self-distancing reduces emotional reactivity (Kross et al., 2014)."
      },
      {
        name: "Values cue",
        description: "Recall who you are becoming; pick the next right action.",
        mechanism: "Values affirmation buffers stress, strengthens self-control (Steele, 1988)."
      }
    ]
  },
  {
    name: "Acceptance & Urge-Surfing",
    duration: "1-2 min",
    practices: [
      {
        name: "Sense the wave",
        description: "Tightness, heat, buzz. Breathe with it.",
        mechanism: "Urges peak ~90s and pass (Marlatt & Gordon, 1985; Brewer et al., 2013)."
      },
      {
        name: "Keep posture open",
        description: "Ride ~90s; choose again.",
        mechanism: "Open posture supports parasympathetic tone (Carney et al., 2010)."
      }
    ]
  },
  {
    name: "Social Co-Regulation",
    duration: "60-90s",
    practices: [
      {
        name: "Face-voice-breath with a steady person",
        description: "Live/phone; borrow calm.",
        mechanism: "Social engagement system activates vagal brake (Porges, 2011)."
      },
      {
        name: "Ask for resonance",
        description: "'Breathe with me, slow and even.'",
        mechanism: "Co-regulation through synchronized physiology (Feldman, 2012)."
      }
    ]
  },
  {
    name: "Identity Integration",
    duration: "45-120s",
    practices: [
      {
        name: "I-statements",
        description: "'I am someone who returns to baseline.'",
        mechanism: "Identity-based behavior change (Oyserman & Destin, 2010)."
      },
      {
        name: "Micro-proofs",
        description: "Stack 2-minute reps daily to make it true.",
        mechanism: "Small wins reinforce new identity (Amabile & Kramer, 2011)."
      }
    ]
  }
];
