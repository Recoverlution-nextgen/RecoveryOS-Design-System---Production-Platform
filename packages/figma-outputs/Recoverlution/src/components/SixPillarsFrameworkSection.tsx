import React from "react";
import { ChevronRight, Brain, Heart, Users, Sparkles, Target, Zap, Check } from "lucide-react";
import { EmotionalRegulationPillar } from "./EmotionalRegulationPillar";
import { StressResiliencePillar } from "./StressResiliencePillar";
import { SocialConnectivityPillar } from "./SocialConnectivityPillar";
import { CognitiveReframingPillar } from "./CognitiveReframingPillar";
import { IdentityIntegrationPillar } from "./IdentityIntegrationPillar";
import { DecisionMasteryPillar } from "./DecisionMasteryPillar";

/**
 * 6 PILLARS FRAMEWORK SECTION
 * 
 * The neuroscience-backed foundation for lasting change.
 * This is the clinical map that governs the LUMA intelligence algorithm (ST1).
 * 
 * Content source: Daniel's personal journey + clinical research
 * Design goal: Apple-grade authority + emotional resonance
 */

export function SixPillarsSection() {
  return (
    <div className="space-y-12">
      {/* Hero/Introduction */}
      <div>
        <h2 className="text-gray-900 text-4xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          The 6 Pillars Framework
        </h2>
        <p className="text-gray-600 text-xl mb-6 leading-relaxed">
          The neuroscience of lasting change. The clinical foundation of the LUMA intelligence algorithm.
        </p>
        <div className="p-8 bg-gradient-to-br from-[#F5F3FF] via-white to-[#FEF3F2] rounded-3xl border-2 border-[#3E2BB8]/20">
          <p className="text-gray-800 text-lg leading-relaxed mb-4">
            <strong className="text-[#3E2BB8]">From Daniel's journey:</strong>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <em>"Our GOAL is to spark and build NEW NEURAL PATHWAYS. You have to <strong>EXPERIENCE</strong> it, then <strong>RECOGNIZE</strong> it, <strong>NAME</strong> it, <strong>CARRY</strong> it, <strong>TEST</strong> it, <strong>CHALLENGE</strong> it, <strong>SIT</strong> with it, <strong>WRESTLE</strong> with it. This is the transition from <strong>KNOWING</strong> to <strong>BELIEVING</strong>. You experience the benefit, validate the recognition, then hit the most <strong>RESISTANCE</strong> to change. Then you <strong>DECIDE</strong>: Do you <strong>EMBRACE</strong> it? Do you <strong>COMMIT</strong>? Do you <strong>ALIGN</strong> and <strong>EMBODY</strong> it?"</em>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>This is the ERA flow. This is why the 6 Pillars work.</strong>
          </p>
          <p className="text-gray-600 italic text-sm">
            Addiction is terminal. This platform is a mission to guide people home before they hit rock bottom—because we know the path, and we know the cost.
          </p>
        </div>
      </div>

      {/* Executive Brief */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-900 text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Executive Brief
          </h3>
        </div>

        <div className="space-y-6">
          {/* Clinical Stance */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50">
            <h4 className="text-gray-900 font-semibold mb-3">Clinical Stance</h4>
            <p className="text-gray-800 text-sm leading-relaxed mb-4">
              Addiction is not a character deficit; it is a <strong>learned, plastic, whole-system adaptation</strong> to stress, trauma, availability, and reinforcement schedules—maintained by neurobiological sensitization, habit circuitry, cognitive appraisal loops, and social context.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-white/70 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-1">MECHANISMS</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Incentive-salience (wanting ≠ liking)</li>
                  <li>• Allostatic load (stress-system drift)</li>
                  <li>• Habit loops (cue→routine→reward)</li>
                  <li>• Interoceptive prediction</li>
                  <li>• Impaired top-down control under stress</li>
                </ul>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-1">MAINTAINERS</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Volatility in arousal regulation</li>
                  <li>• Maladaptive appraisals</li>
                  <li>• Social isolation/misalignment</li>
                  <li>• Identity narratives locked to illness</li>
                  <li>• Choice architectures saturated with cues</li>
                </ul>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-1">REMISSION PATH</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Stabilize physiology</li>
                  <li>• Widen window of tolerance</li>
                  <li>• Rebuild appraisal flexibility</li>
                  <li>• Restore social connection</li>
                  <li>• Re-author identity</li>
                  <li>• Improve decision quality</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Platform Thesis */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/50">
            <h4 className="text-gray-900 font-semibold mb-3">Platform Thesis</h4>
            <p className="text-gray-800 text-sm leading-relaxed">
              <strong>Deliver micro-shifts weekly via ERA</strong> (Experience → Recognize → Align); <strong>accelerate plasticity with NaviCues</strong>; <strong>maintain alignment through Inner Compass</strong> (Energy, Clarity, Connection); <strong>orchestrate with LUMA</strong> (explainable JITAI, voice/text); <strong>prove change with mixed outcomes</strong> (self-report, behavioral, physiologic).
            </p>
            <div className="mt-4 p-3 bg-white/70 rounded-lg">
              <p className="text-xs text-gray-700">
                <strong>Clinical posture:</strong> Harm-reduction-friendly, trauma-informed, measurement-based care; integrates psychotherapeutics and (where applicable) medications for addiction treatment (MAT) within clear medical governance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Science of Change */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-3xl p-8 border-2 border-amber-200/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-900 text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            The Science of Change
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-gray-800 leading-relaxed">
            <strong>Why neuroplasticity matters:</strong> The brain is not fixed. Neural pathways can be rewired through <em>experience-dependent learning</em>. But change is hard—deeply embedded patterns resist disruption.
          </p>
          
          <div className="p-6 bg-white/80 rounded-2xl">
            <h4 className="text-gray-900 font-semibold mb-4">The Path of Change (ERA Flow)</h4>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <div className="text-blue-900 font-bold mb-2">1. EXPERIENCE</div>
                <p className="text-xs text-blue-800">Feel the spark. Notice the shift. You have to <em>experience</em> it to believe it's possible.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                <div className="text-purple-900 font-bold mb-2">2. RECOGNIZE</div>
                <p className="text-xs text-purple-800">Name it. Carry it. Test it. Challenge it. Sit with it. This is where knowing becomes believing.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl">
                <div className="text-amber-900 font-bold mb-2">3. ALIGN</div>
                <p className="text-xs text-amber-800">The resistance hits here. You have all the info. Now: Do you commit? Do you embrace it? Do you embody it?</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                <div className="text-green-900 font-bold mb-2">4. EMBODY</div>
                <p className="text-xs text-green-800">New pathways become reflex. What was effortful becomes automatic. This is neuroplastic change.</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-sm italic">
            <strong>Research backing:</strong> Neuroplasticity (Doidge, Merzenich), experience-dependent brain change (Hebb), habit formation (Graybiel), reappraisal networks (Gross, Ochsner), narrative identity (McAdams).
          </p>
        </div>
      </div>

      {/* The 6 Pillars Overview */}
      <div>
        <h3 className="text-gray-900 text-3xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          The 6 Pillars
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          These six domains fulfill the human condition. Every micro-block, every NaviCue, every Journey step maps to one of these pillars. <strong>This is how recovery becomes systematic.</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {pillarsData.map((pillar) => (
            <div key={pillar.id} className="bg-white rounded-3xl p-6 border-2 border-gray-200 hover:border-[#3E2BB8]/30 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: `linear-gradient(135deg, ${pillar.color}, ${pillar.colorDark})` }}
                >
                  <pillar.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 text-xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {pillar.name}
                  </h4>
                  <p className="text-sm text-gray-600 italic">{pillar.tagline}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Clinical Aim</p>
                  <p className="text-sm text-gray-800">{pillar.clinicalAim}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Key Mechanisms</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {pillar.mechanisms.slice(0, 3).map((mech, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-white rounded border border-gray-300 text-gray-700">
                        {mech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    <strong>Example interventions:</strong> {pillar.exampleInterventions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Measurement Framework */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-900 text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Measurement Framework (MBI)
          </h3>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          <strong>Core outcomes (12 weeks):</strong> Every claim maps to a specific metric. Measurement-based care is not optional—it's how we prove change.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50">
            <h4 className="font-semibold text-gray-900 mb-3">Physiology</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Morning HRV (RMSSD) - autonomic regulation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Sleep duration/regularity - recovery quality</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Breath rate in sessions - arousal state</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/50">
            <h4 className="font-semibold text-gray-900 mb-3">Self-Report</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Craving VAS, mood, DERS-16, ERQ</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>PSS-4; optional PHQ-2/GAD-2 screens</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>AUDIT-C, DAST-10, or ASSIST (where indicated)</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl border border-amber-200/50">
            <h4 className="font-semibold text-gray-900 mb-3">Behavioral</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Time-to-baseline recovery post-trigger</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Peak urge intensity, lapse events</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Days of abstinence/reduction, adherence streaks</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl border border-green-200/50">
            <h4 className="font-semibold text-gray-900 mb-3">Function/Quality</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>WHOQOL-BREF or PROMIS short forms</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Values-behavior congruence indices</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Purpose/meaning scores</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-700">
            <strong>Scoring cadence:</strong> Light-touch EMA daily; brief weekly packs; monthly deep cuts. All claims map to specific metrics with calculation rules.
          </p>
        </div>
      </div>

      {/* Export for ST1 */}
      <div className="p-6 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] rounded-3xl text-white">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8" />
          <div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              This Powers ST1
            </h3>
            <p className="text-white/80 text-sm">The LUMA intelligence algorithm references this framework</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed">
          When LUMA selects a NaviCue, adjusts Journey pacing, or flags a patient for outreach—it's using this clinical map. The 6 Pillars are the foundation. The micro-blocks are the language. The ERA flow is the method. Together, they turn recovery from guesswork into systematic, measurable, neuroplastic change.
        </p>
      </div>
    </div>
  );
}

export function MicroBlocksSection({ onNavigateToPillar }: { onNavigateToPillar?: (pillarId: string) => void }) {
  const [activePillar, setActivePillar] = React.useState(0); // Default to Emotional Regulation
  const [showFullChapter, setShowFullChapter] = React.useState(false); // Toggle between summary and full chapter

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Micro-Block Library
        </h2>
        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
          Deep-dive into each pillar. The framework within the framework.
        </p>
      </div>

      {/* Pillar tabs - compact horizontal row */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {pillarsData.map((pillar, idx) => {
          const PillarIcon = pillar.icon;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(idx)}
              className={`
                flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all
                ${activePillar === idx 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 bg-white hover:border-emerald-300'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-white`}
                  style={{ background: `linear-gradient(135deg, ${pillar.color}, ${pillar.colorDark})` }}
                >
                  <PillarIcon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-gray-900">{pillar.name}</h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active pillar content */}
      <div className="bg-white rounded-3xl p-8 border-2 border-emerald-400 shadow-lg">
        {(() => {
          const ActiveIcon = pillarsData[activePillar].icon;
          return (
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                style={{ background: `linear-gradient(135deg, ${pillarsData[activePillar].color}, ${pillarsData[activePillar].colorDark})` }}
              >
                <ActiveIcon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-gray-900 text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {pillarsData[activePillar].name}
                  </h3>
                  <span className="text-xs px-3 py-1 bg-emerald-600 text-white rounded-full font-bold">COMPLETE</span>
                </div>
                <p className="text-gray-600 italic mt-1">{pillarsData[activePillar].tagline}</p>
              </div>
            </div>
          );
        })()}

        <div className="space-y-6">
          {/* Clinical Aim */}
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
            <h4 className="text-emerald-900 font-semibold mb-2">Clinical Aim</h4>
            <p className="text-gray-800">{pillarsData[activePillar].clinicalAim}</p>
          </div>

          {/* Mechanisms */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-3">Neurobiological Mechanisms</h4>
            <div className="grid md:grid-cols-2 gap-2">
              {pillarsData[activePillar].mechanisms.map((mechanism, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{mechanism}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Example Interventions */}
          <div className="p-6 bg-gray-50 rounded-2xl">
            <h4 className="text-gray-900 font-semibold mb-2">Example Interventions</h4>
            <p className="text-sm text-gray-700">{pillarsData[activePillar].exampleInterventions}</p>
          </div>

          {/* Chapter Status - Now Clickable! */}
          <button 
            onClick={() => {
              setShowFullChapter(!showFullChapter);
              // Smooth scroll to top when opening
              if (!showFullChapter) {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }
            }}
            className="w-full p-6 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl text-white hover:from-emerald-700 hover:to-green-700 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-semibold mb-1">
                  {activePillar === 0 && "✅ Chapter One Complete: Science · Stories · Soul"}
                  {activePillar === 1 && "✅ Chapter Two Complete: Stronger brake, wiser throttle"}
                  {activePillar === 2 && "✅ Chapter Three Complete: Safe together, stronger apart"}
                  {activePillar === 3 && "✅ Chapter Four Complete: See wider. Choose better."}
                  {activePillar === 4 && "✅ Chapter Five Complete: Live the line you can love."}
                  {activePillar === 5 && "✅ Chapter Six Complete: Make room. Make the move."}
                </p>
                <p className="text-sm text-emerald-100">
                  {showFullChapter ? "↑ Hide full chapter" : "↓ Read full chapter with micro-blocks & definitions"}
                </p>
              </div>
              <ChevronRight className={`w-6 h-6 transition-transform ${showFullChapter ? 'rotate-90' : ''} group-hover:translate-x-1`} />
            </div>
          </button>
        </div>
      </div>

      {/* Full Chapter Content - Expands inline */}
      {showFullChapter && (
        <div className="mt-8" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          {/* Back to Summary button */}
          <div className="mb-6">
            <button
              onClick={() => {
                setShowFullChapter(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back to Micro-Block Library</span>
            </button>
          </div>

          {/* Render the appropriate pillar chapter */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {activePillar === 0 && <EmotionalRegulationPillar />}
            {activePillar === 1 && <StressResiliencePillar />}
            {activePillar === 2 && <SocialConnectivityPillar />}
            {activePillar === 3 && <CognitiveReframingPillar />}
            {activePillar === 4 && <IdentityIntegrationPillar />}
            {activePillar === 5 && <DecisionMasteryPillar />}
          </div>

          {/* Bottom Back button */}
          <div className="mt-6">
            <button
              onClick={() => {
                setShowFullChapter(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back to Micro-Block Library</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Pillars data
const pillarsData = [
  {
    id: "emotional-regulation",
    name: "Emotional Regulation",
    tagline: "Widen window of tolerance; shorten recovery half-life",
    color: "#3B82F6",
    colorDark: "#1D4ED8",
    icon: Heart,
    clinicalAim: "Widen window of tolerance; shorten recovery half-life post-trigger.",
    mechanisms: [
      "Autonomic regulation (vagal tone)",
      "Interoception",
      "Attentional disengagement",
      "Cognitive reappraisal",
      "Acceptance"
    ],
    exampleInterventions: "Resonance breathing, physiological sigh, urge surfing, label & locate, distancing self-talk, values-anchored 'Right-Next-Inch'"
  },
  {
    id: "stress-resilience",
    name: "Stress Resilience",
    tagline: "Reduce allostatic load; protect PFC under stress",
    color: "#10B981",
    colorDark: "#047857",
    icon: Zap,
    clinicalAim: "Reduce allostatic load; protect PFC under stress; improve sleep and recovery.",
    mechanisms: [
      "Stress-response calibration (HPA)",
      "Cognitive control under catecholamines",
      "Recovery behaviors"
    ],
    exampleInterventions: "Paced breathing, exercise micro-bursts, cognitive offloading, sleep wind-down protocols, reframing stress as fuel"
  },
  {
    id: "social-connectivity",
    name: "Social Connectivity",
    tagline: "Safe bonds, co-regulation, prosocial identity",
    color: "#EC4899",
    colorDark: "#BE185D",
    icon: Users,
    clinicalAim: "Increase perceived and received support; shift from risky networks to safe bonds; leverage co-regulation.",
    mechanisms: [
      "Attachment security cues",
      "Loneliness biology",
      "Social reward",
      "Prosocial identity"
    ],
    exampleInterventions: "Buddy breath, repair credits, prosocial micro-acts, safe-face gallery, community rituals, guided disclosure scripts"
  },
  {
    id: "cognitive-reframing",
    name: "Cognitive Reframing",
    tagline: "Appraisal flexibility; shrink catastrophic thinking",
    color: "#A855F7",
    colorDark: "#7E22CE",
    icon: Sparkles,
    clinicalAim: "Increase appraisal flexibility; reduce catastrophic thinking; strengthen values-consistent choices.",
    mechanisms: [
      "Reappraisal networks",
      "Self-distancing",
      "Imagery rescripting",
      "Cognitive restructuring",
      "Acceptance"
    ],
    exampleInterventions: "Distance talk, catastrophe shrink, imagery rescripting, if-then implementation intentions, ACT-style defusion"
  },
  {
    id: "identity-integration",
    name: "Identity Integration",
    tagline: "From illness identity to values-congruent narrative",
    color: "#F59E0B",
    colorDark: "#D97706",
    icon: Target,
    clinicalAim: "Move from illness identity to values-congruent narrative; stabilize 'I am' with micro-proofs.",
    mechanisms: [
      "Narrative identity formation",
      "Self-verification",
      "Growth mindset",
      "Prospection"
    ],
    exampleInterventions: "Identity checksum (daily I-line + proof), future-self dialogues, purpose mapping, service acts, memory reconsolidation scripts"
  },
  {
    id: "decision-mastery",
    name: "Decision Mastery",
    tagline: "Improve choice quality; lengthen stimulus→response gap",
    color: "#14B8A6",
    colorDark: "#0F766E",
    icon: Brain,
    clinicalAim: "Improve choice quality under pressure; lengthen stimulus→response gap; reshape environments.",
    mechanisms: [
      "Model-based vs model-free control",
      "Intertemporal choice",
      "Loss aversion",
      "Attentional capture",
      "Choice architecture"
    ],
    exampleInterventions: "Temporal dilation drills, pre-commitment and friction edits, default swaps, if-then plans, urge timers, environment swaps"
  }
];
