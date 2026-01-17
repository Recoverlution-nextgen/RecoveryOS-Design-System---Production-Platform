import { useState } from "react";
import { Brain, Heart, Shield, Users, Target, Sparkles, ChevronRight } from "lucide-react";

// Six Pillars with deep neuroscience
const PILLARS_DATA = [
  {
    name: "Emotional Regulation",
    icon: Heart,
    color: "#7C67FF",
    tagline: "The Pilot Light",
    description: "The primary prerequisite for all therapeutic work.",
    neuroscience: "Strengthen the vagal brake and calm limbic load. When arousal ≥7/10, the body must be regulated before any belief can be reframed.",
    mechanism: "Affect Labeling · Pacer Resets · Vagal Reset (5.5 bpm)",
    why: "Without emotional regulation, the amygdala hijacks decision-making. This pillar thickens the vagal brake - the physiological mechanism that restores calm and enables prefrontal cortex engagement."
  },
  {
    name: "Stress Resilience",
    icon: Shield,
    color: "#C49DC4",
    tagline: "The Capacity Engine",
    description: "Combat allostatic load to protect executive function.",
    neuroscience: "Train the system to protect PFC under catecholamine surge and shorten recovery half-life after stress spikes.",
    mechanism: "Protecting PFC · Light + Motion AM Resets · Micro-Recovery",
    why: "Chronic stress depletes the resources needed for top-down control. Without capacity, patients default to old habits under pressure - no matter how much insight they've gained."
  },
  {
    name: "Social Connectivity",
    icon: Users,
    color: "#9D8FFF",
    tagline: "The Anchorage System",
    description: "Felt safety through reliable social signals.",
    neuroscience: "Social pain overlaps with physical pain in the brain. Secure bonds activate oxytocin pathways essential for sustained growth and healing.",
    mechanism: "Micro-Repair · Boundary Setting · Co-Regulation (Buddy Breath)",
    why: "Recovery is a team sport played in the nervous system. Isolation maintains threat response; connection restores the safety needed for neuroplastic change."
  },
  {
    name: "Cognitive Reframing",
    icon: Brain,
    color: "#3E2BB8",
    tagline: "The Lens Editor",
    description: "Build appraisal flexibility to rename reality.",
    neuroscience: "Target cognitive appraisal failure where catastrophes inflate and shame writes the ending. Flexible reappraisal restores adaptive perspective.",
    mechanism: "Self-Distancing · Imagery Rescripting · Threat → Challenge Scripting",
    why: "Under stress, the brain defaults to catastrophic interpretations. This pillar trains the neural flexibility to choose a truer, kinder narrative - changing the story changes the brain."
  },
  {
    name: "Identity Integration",
    icon: Target,
    color: "#5739FB",
    tagline: "The Proof Builder",
    description: "Becoming someone new through self-verification.",
    neuroscience: "Update narrative identity through memory reconsolidation - pairing old stuck memories with new emotional outcomes and verified evidence.",
    mechanism: "Micro-Proof Logs · I-Lines · Memory Reconsolidation Scripts",
    why: "Addiction colonizes identity. Behavior change alone isn't enough - the nervous system needs verifiable proof that 'I am someone who returns to baseline' is the easiest true thing to say."
  },
  {
    name: "Decision Mastery",
    icon: Sparkles,
    color: "#E1A57E",
    tagline: "The Autonomy Enabler",
    description: "Train the 2-second gap between cue and action.",
    neuroscience: "Resolve model-free dominance by deliberately creating space between trigger and response. We don't preach willpower - we design for it.",
    mechanism: "Temporal Dilation · Choice Architecture · If-Then Implementation Intentions",
    why: "Under acute stress, the brain shifts from prefrontal cortex to dorsal striatum - fast, automatic habits win. This pillar engineers the gap that restores values-based choice."
  }
];

export function SixPillarsSection() {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 
            className="text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.25rem, 5vw, 3rem)', letterSpacing: '-0.02em' }}
          >
            Six Pillars of Recovery.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-2" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            The foundation you can build a skyscraper on.
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
            Interconnected neural pathways where strengthening one creates capacity across the entire system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS_DATA.map((pillar, index) => (
            <button
              key={pillar.name}
              onClick={() => setSelectedPillar(selectedPillar === index ? null : index)}
              className={`group relative bg-white rounded-2xl p-8 border-2 transition-all text-left w-full ${
                selectedPillar === index 
                  ? 'border-[#3E2BB8] shadow-lg shadow-[#3E2BB8]/10' 
                  : 'border-gray-200/40 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
                </div>
                <ChevronRight 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    selectedPillar === index ? 'rotate-90' : ''
                  }`}
                />
              </div>
              
              <h3 
                className="mb-2"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  color: pillar.color
                }}
              >
                {pillar.name}
              </h3>

              <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                {pillar.tagline}
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {pillar.description}
              </p>

              {/* Expanded Content */}
              {selectedPillar === index && (
                <div className="mt-6 pt-6 border-t border-gray-200/60 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      The Neuroscience
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {pillar.neuroscience}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      Key Mechanisms
                    </p>
                    <p className="text-gray-600 text-sm">
                      {pillar.mechanism}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-[#F5F3FF] rounded-xl p-4">
                    <p className="text-xs text-[#3E2BB8] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      Why This Works
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {pillar.why}
                    </p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Applied Neuroplasticity - White Background with Container */}
        <div className="mt-24 max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200/40">
          {/* Content */}
          <div className="px-8 py-16 md:px-16 md:py-20">
            <div className="max-w-4xl mx-auto">
              {/* Title */}
              <div className="text-center mb-12">
                <h3 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', letterSpacing: '-0.01em' }}>
                  Applied Neuroplasticity
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#3E2BB8]/20 to-transparent mx-auto"></div>
              </div>

              {/* Main Description */}
              <p className="text-gray-700 text-center mb-16 leading-relaxed max-w-3xl mx-auto" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                The platform solves the <span className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Rigidity × Failure</span> of the human stress system. Under acute stress, the brain shifts control from the prefrontal cortex (the "Pilot") to the dorsal striatum - executing fast, automatic, often maladaptive habits.
              </p>
              
              {/* Two Columns */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
                <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-2xl p-8 border border-[#3E2BB8]/10 hover:border-[#3E2BB8]/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#3E2BB8]/10 flex items-center justify-center mb-6">
                    <Brain className="w-6 h-6 text-[#3E2BB8]" />
                  </div>
                  <h4 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}>
                    Model-Free Dominance
                  </h4>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                    Under catecholamine surge, insight collapses. The system defaults to cue-bound habits - fast, automatic, and often destructive. This is why knowing isn't enough.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-2xl p-8 border border-[#3E2BB8]/10 hover:border-[#3E2BB8]/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#3E2BB8]/10 flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6 text-[#3E2BB8]" />
                  </div>
                  <h4 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}>
                    Allostatic Load
                  </h4>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                    Chronic stress depletes the energy resources needed for top-down control. The system literally lacks the capacity for the harder, healthier choice.
                  </p>
                </div>
              </div>

              {/* Bottom Statement */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3E2BB8]/5 to-transparent rounded-2xl"></div>
                <div className="relative py-8 px-6">
                  <p className="text-gray-700 text-center leading-relaxed" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                    The platform exists to interrupt this shift and restore <span className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Model-Based Control</span> by managing capacity. This is engineered neuroplasticity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
