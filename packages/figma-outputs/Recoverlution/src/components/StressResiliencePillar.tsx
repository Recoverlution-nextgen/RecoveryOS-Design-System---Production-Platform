import { Brain, Shield, Wind, Moon, Zap, Target, Check, ChevronRight, Activity, Heart, Sparkles, Coffee, BookOpen } from "lucide-react";
import { StoryLink } from "./StoryLink";

/**
 * CHAPTER TWO: HOLD THE LINE
 * The Stress Resilience Pillar - Deep Dive
 * 
 * Science · Stories · Soul
 * Stress is not the enemy; it is unskilled intensity.
 * We learn to meet it, shape it, and recover on purpose - so the day bends, not the person.
 * 
 * Content: Daniel's raw truth + neuroscience validation
 * Design: Apple-grade precision + emotional resonance
 */

interface StressResiliencePillarProps {
  onNavigate?: (page: string) => void;
}

export function StressResiliencePillar({ onNavigate }: StressResiliencePillarProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-white/80 text-sm uppercase tracking-wide mb-1">Chapter Two · Pillar 2</div>
              <h1 className="text-white text-5xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Hold the Line
              </h1>
              <p className="text-white/90 text-xl mt-2">The Stress Resilience Thesis</p>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <p className="text-white/95 text-lg leading-relaxed mb-6 italic">
              Science · Stories · Soul. Stress is not the enemy; it is unskilled intensity. We learn to meet it, shape it, and recover on purpose - so the day bends, not the person.
            </p>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-white font-semibold mb-3">Dedication</h3>
              <p className="text-white/90 leading-relaxed">
                For the overclocked and under-slept. For the carers who carry more than their share. For the nervous systems that learned to be loud to stay safe. For the builders who refuse to trade speed for humanity.
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
              8 micro-blocks and therapeutic practices for Stress Resilience
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
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
                Modern life keeps the accelerator down and the brake thin. Under load, the prefrontal "pilot" drops signal; attention tunnels; old habits drive.
              </p>
              <div className="p-3 bg-white/70 rounded-lg text-xs text-gray-700 space-y-1">
                <p><strong>Physiologically:</strong> Chronic stress → PFC impairment, HPA dysregulation, low HRV (Arnsten, 2015; Sapolsky, 2004)</p>
                <p><strong>Psychologically:</strong> Attentional tunneling, working memory collapse, threat bias amplification</p>
                <p><strong>Cognitively:</strong> Executive function failure, decision fatigue, cognitive inflexibility</p>
              </div>
            </div>

            {/* Answer */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200/50">
              <h3 className="text-green-900 font-semibold mb-3">Answer, human</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Thicken the vagal brake, coach the mind under catecholamines, and shorten the recovery half-life after hard moments. We don't erase stress; we reshape its curve.
              </p>
              <div className="p-3 bg-white/70 rounded-lg text-xs text-gray-700 space-y-1">
                <p><strong>Vagal tone training:</strong> HRV biofeedback → thicker brake (Lehrer et al., 2020)</p>
                <p><strong>PFC resilience:</strong> Anchors that hold under catecholamines (Arnsten, 2015)</p>
                <p><strong>Recovery half-life:</strong> Active recovery protocols → faster return to baseline (Porges, 2011)</p>
              </div>
            </div>

            {/* How */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200/50">
              <h3 className="text-blue-900 font-semibold mb-3">How we do it</h3>
              <p className="text-gray-800 leading-relaxed">
                Weekly ERA journeys (Experience → Recognise → Align) tuned to sleep, movement, and mindset + on-demand ResCues that fit the cracks (two minutes or less) + a gentle Inner Compass for Energy · Clarity · Connection. LUMA times the nudge; the body does the knowing.
              </p>
            </div>

            {/* Why */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border-2 border-purple-200/50">
              <h3 className="text-purple-900 font-semibold mb-3">Why it endures</h3>
              <p className="text-gray-800 leading-relaxed">
                We rehearse small wins until the system expects recovery. Baselines rise. Spikes soften. Control returns.
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
              The Vows (We Hold These Lines)
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {vows.map((vow, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-300 transition-all">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
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
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Dream Team (Anchors Who Inform This Chapter)
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Their science threads through every pattern below.
          </p>

          <div className="space-y-4">
            {dreamTeam.map((category, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <h3 className="text-gray-900 font-semibold mb-3">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.researchers.map((researcher, rIdx) => (
                    <span key={rIdx} className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-900 rounded-lg text-sm font-medium border border-emerald-200/50">
                      {researcher}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Model */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Core Model: The Curve We Change
            </h2>
          </div>

          <div className="p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl border-2 border-emerald-200/50 mb-6">
            <h3 className="text-gray-900 font-semibold mb-4">Load → Response → Recovery</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We don't flatten life; we round the corners. Before the hit: posture, breath, plan. During the hit: protect attention, keep the brake engaged. After the hit: actively recover (light, breath, motion, meaning) so the next hour isn't taxed by the last.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl">
                <div className="text-emerald-600 font-bold mb-2">1. Before the Hit</div>
                <p className="text-xs text-gray-700">Posture, breath, plan</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Morning light, HRV training, choice architecture
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <div className="text-teal-600 font-bold mb-2">2. During the Hit</div>
                <p className="text-xs text-gray-700">Protect attention, keep brake engaged</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Anchor & Aim, Temporal Dilation, box breath
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <div className="text-cyan-600 font-bold mb-2">3. After the Hit</div>
                <p className="text-xs text-gray-700">Actively recover</p>
                <div className="mt-2 text-xs text-gray-600">
                  <strong>Example:</strong> Micro-mobility, light/motion, meaning ping
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
            <h3 className="text-gray-900 font-semibold mb-4">Under the Hood (Fast Sketch)</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                <Brain className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Arnsten's Law</p>
                  <p className="text-xs text-gray-600">Stress narrows PFC control; we need anchors the PFC can keep even when catecholamines surge (Arnsten, 2015).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                <Wind className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">HRV & Vagal Brake</p>
                  <p className="text-xs text-gray-600">Higher tone, faster return. HRV biofeedback at 5.5 bpm strengthens parasympathetic brake (Lehrer et al., 2020).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">HPA Rhythm</p>
                  <p className="text-xs text-gray-600">Consistent sleep/wake cues keep cortisol honest. Disrupted HPA → allostatic load (Sapolsky, 2004).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <Heart className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Mindset Effects</p>
                  <p className="text-xs text-gray-600">Appraisal shifts can flip physiology (threat → challenge) when the body has some safety online (Crum, 2013).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Stack */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Skills Stack (What We Train)
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We build capacity before the hit, control during the hit, and recovery after the hit. Each layer supports the next.
          </p>

          <div className="space-y-6">
            {skillsStack.map((category, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.duration}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.practices.map((practice, pIdx) => (
                    <div key={pIdx} className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-xl">
                      <div className="flex items-start gap-2 mb-2">
                        <ChevronRight className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
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

        {/* Sleep as Sacred */}
        <section>
          <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl border-2 border-indigo-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Sleep is Sacred
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Night protocols outrank clever content.</strong> Sleep is when the brain consolidates learning, clears metabolic waste, and resets emotional reactivity. Without it, every other intervention is weakened.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Why Sleep Matters</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Memory consolidation:</strong> Sleep-dependent memory processing (Walker, 2017)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Emotional regulation:</strong> REM sleep reprocesses emotional memories, reducing reactivity (Walker & van der Helm, 2009)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Metabolic clearance:</strong> Glymphatic system clears waste during sleep (Xie et al., 2013)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span><strong>HPA reset:</strong> Sleep deprivation → cortisol dysregulation (Sapolsky, 2004)</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Wind-Down Protocol</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900 mb-1">10-20 min before bed</div>
                    <p className="text-xs text-gray-600">Light down, devices out, breath pacer, cool/quiet/dark</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900 mb-1">Late-night safe set</div>
                    <p className="text-xs text-gray-600">Box breath + gentle audio; no up-regulating content</p>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900 mb-1">Morning light/motion reset</div>
                    <p className="text-xs text-gray-600">2-5 min outdoor light + gentle movement → HPA anchoring</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/70 rounded-xl">
              <p className="text-xs text-gray-700">
                <strong>Research backing:</strong> Matthew Walker (2017) - Why We Sleep; Sara Mednick - Nap science; HPA rhythm regulation (Sapolsky, 2004)
              </p>
            </div>
          </div>
        </section>

        {/* Mindset as Moderator */}
        <section>
          <div className="p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-3xl border-2 border-amber-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900 text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Stress Can Serve
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>We teach mindset as moderator:</strong> Some intensity is fuel when framed and dosed. Stress is not the enemy; it's unskilled intensity. The same arousal can be threat or challenge depending on appraisal.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Threat vs Challenge</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Same physiological arousal. Different appraisal. Different outcome.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-red-50 rounded">
                    <strong className="text-red-900">Threat:</strong>
                    <span className="text-gray-700"> "This will overwhelm me. I can't handle this. I'm going to fail."</span>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <strong className="text-green-900">Challenge:</strong>
                    <span className="text-gray-700"> "My body is preparing. This is energy I can use. I have what I need."</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl">
                <h4 className="text-gray-900 font-semibold mb-3">Research Backing</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Crum et al. (2013):</strong> Stress mindset interventions improve performance and reduce cortisol reactivity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Jamieson et al. (2012):</strong> Reappraising arousal as functional improves exam performance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Blascovich & Tomaka (1996):</strong> Challenge state → better cardiovascular efficiency than threat state</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/70 rounded-xl">
              <p className="text-xs text-gray-700">
                <strong>Note:</strong> Mindset interventions work when the body has some safety online. If arousal ≥8/10, regulate first, reframe second.
              </p>
            </div>
          </div>
        </section>

        {/* Covenant */}
        <section>
          <div className="p-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl text-white">
            <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Covenant
            </h2>
            <p className="text-white/95 leading-relaxed mb-4">
              Stress will come; we will not pretend otherwise. We promise to meet it with design that protects the pilot, breath that thickens the brake, stories that turn threat into challenge, nights that forgive the day, and tiny recoveries that make tomorrow stronger.
            </p>
            <p className="text-white font-semibold">
              If we hold this line, lives bend - not from brittleness, but from practiced grace.
            </p>
            <p className="text-white/90 mt-4">
              Chapter Two stands. Signed in good faith, by everyone who builds and everyone who breathes this work.
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
    principle: "Protect the pilot.",
    explanation: "Under pressure, design so prefrontal control can stay online. Anchors that hold when catecholamines surge."
  },
  {
    principle: "Recovery is the training.",
    explanation: "We count how fast the system comes home, not how rarely it leaves. Recovery half-life is the metric."
  },
  {
    principle: "Stress can serve.",
    explanation: "We teach mindset as moderator: some intensity is fuel when framed and dosed. Threat → Challenge."
  },
  {
    principle: "Sleep is sacred.",
    explanation: "Night protocols outrank clever content. Sleep consolidates learning, resets emotion, clears waste."
  },
  {
    principle: "Explain the why.",
    explanation: "Mechanism builds trust; trust builds adherence. LUMA shows why now, why this, expected effect."
  }
];

const dreamTeam = [
  {
    category: "Stress & Control",
    researchers: ["Wendy Suzuki", "Amy Arnsten", "Alia Crum", "Robert Sapolsky"]
  },
  {
    category: "Sleep & Recovery",
    researchers: ["Matthew Walker", "Sara Mednick"]
  },
  {
    category: "JITAI & Methods",
    researchers: ["Susan Murphy", "Inbal Nahum-Shani"]
  },
  {
    category: "Biofeedback & Physiology",
    researchers: ["Paul Lehrer", "Richard Gevirtz"]
  },
  {
    category: "Addiction & Policy",
    researchers: ["Nora Volkow", "John F. Kelly"]
  }
];

const skillsStack = [
  {
    name: "Physiological Capacity",
    duration: "2-10 min, daily/light",
    practices: [
      {
        name: "Resonant breathing blocks",
        description: "5.5 breaths per minute or box breath sets - raise HRV, teach the brake.",
        mechanism: "HRV biofeedback strengthens vagal tone → faster recovery (Lehrer et al., 2020)."
      },
      {
        name: "Light + motion AM reset",
        description: "2-5 min outdoor light; gentle movement.",
        mechanism: "Morning light anchors circadian rhythm → HPA regulation (Sapolsky, 2004)."
      },
      {
        name: "Micro-mobility snacks",
        description: "Hips/shoulders/neck releases to bleed tension.",
        mechanism: "Movement breaks reduce accumulated tension, prevent musculoskeletal pain (Pronk et al., 2012)."
      }
    ]
  },
  {
    name: "Control Under Load",
    duration: "60-180s, in the moment",
    practices: [
      {
        name: "Anchor & Aim",
        description: "One visual anchor + breath + one bright priority.",
        mechanism: "External anchor + goal clarity → PFC focus under stress (Arnsten, 2015)."
      },
      {
        name: "Temporal Dilation",
        description: "Deliberate 2-second pause - gaze, breath, language - before choosing.",
        mechanism: "Delay creates space for PFC to engage before automatic response fires (Baumeister & Vohs, 2007)."
      },
      {
        name: "Cognitive off-load",
        description: "Capture → Now/Next/After.",
        mechanism: "External storage frees working memory → reduces cognitive load (Allen, 2001 - GTD)."
      }
    ]
  },
  {
    name: "Appraisal & Mindset",
    duration: "90-180s",
    practices: [
      {
        name: "Threat → Challenge scripts",
        description: '"Body preparing, not breaking."',
        mechanism: "Reappraisal shifts autonomic response pattern (Crum et al., 2013; Jamieson et al., 2012)."
      },
      {
        name: "Catastrophe shrink",
        description: "Worst-case → plan → one inch.",
        mechanism: "Cognitive restructuring reduces anticipatory anxiety (Beck, 1976 - CBT)."
      },
      {
        name: "Meaning ping",
        description: "Connect effort to value; reduce useless struggle.",
        mechanism: "Values affirmation buffers stress response (Steele, 1988)."
      }
    ]
  },
  {
    name: "Sleep & Repair",
    duration: "10-20 min, evening",
    practices: [
      {
        name: "Wind-down",
        description: "Light down, devices out, breath pacer, cool/quiet/dark.",
        mechanism: "Sleep hygiene → better sleep onset and quality (Walker, 2017)."
      },
      {
        name: "Late-night safe set",
        description: "Box breath + gentle audio; no up-regulating content.",
        mechanism: "Avoid arousal-increasing stimuli before sleep → parasympathetic dominance (Porges, 2011)."
      }
    ]
  },
  {
    name: "Social Buffers",
    duration: "90-180s",
    practices: [
      {
        name: "Buddy breath",
        description: "Co-regulate through synchronized breathing.",
        mechanism: "Social engagement system activates vagal brake (Porges, 2011)."
      },
      {
        name: "Repair credits",
        description: "Short repair after conflict.",
        mechanism: "Relationship repair reduces chronic stress (Gottman, 1999)."
      },
      {
        name: "Resonance ask",
        description: "Ask for calm presence before hot meetings.",
        mechanism: "Co-regulation through borrowed calm (Feldman, 2012)."
      }
    ]
  }
];
