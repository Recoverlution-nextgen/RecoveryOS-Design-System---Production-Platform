import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function RealTimeDecisionEngine() {
  const inputs = [
    { label: 'Current State', value: 'Arousal: 7/10', color: '#FF6B6B' },
    { label: 'Context', value: 'Late night, alone', color: '#FFA500' },
    { label: 'Schema', value: 'Immediate Relief', color: '#5739FB' },
    { label: 'Heat Band', value: 'RED', color: '#FF0000' },
    { label: 'KBE Target', value: 'Believing', color: '#00C9A7' },
    { label: 'Resistance', value: 'Low willingness', color: '#FFD700' }
  ];

  return (
    <V3Section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-black">
      <V3Container>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase text-[#5739FB]">
                LUMA Orchestration
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real-Time Decision Engine
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The right cue, at the right moment, for the right reason. State-aware orchestration powered by multi-armed bandit optimization.
            </p>
          </div>

          {/* Decision Flow Diagram */}
          <div className="space-y-8">
            {/* Inputs */}
            <div>
              <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-4">
                System Inputs
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {inputs.map((input) => (
                  <div
                    key={input.label}
                    className="bg-white/5 border border-white/10 p-4"
                  >
                    <div className="text-sm text-white/50 mb-1">{input.label}</div>
                    <div className="text-white font-semibold" style={{ color: input.color }}>
                      {input.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
                <svg className="w-6 h-6 text-[#5739FB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* LUMA Processing */}
            <div className="bg-gradient-to-br from-[#5739FB]/20 to-[#3E2BB8]/10 border-2 border-[#5739FB]/50 p-8">
              <h3 className="text-[#5739FB] text-sm font-semibold uppercase tracking-wider mb-4">
                LUMA Processing
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-white/80">
                  <span className="text-[#5739FB] mr-3">▸</span>
                  <span>Filter cue library by schema + family</span>
                </div>
                <div className="flex items-center text-white/80">
                  <span className="text-[#5739FB] mr-3">▸</span>
                  <span>Match to heat band (RED → Orient + Downshift)</span>
                </div>
                <div className="flex items-center text-white/80">
                  <span className="text-[#5739FB] mr-3">▸</span>
                  <span>Select voice stance based on resistance signal</span>
                </div>
                <div className="flex items-center text-white/80">
                  <span className="text-[#5739FB] mr-3">▸</span>
                  <span>Run multi-armed bandit optimization</span>
                </div>
                <div className="flex items-center text-white/80">
                  <span className="text-[#5739FB] mr-3">▸</span>
                  <span>Deploy highest probability cue for shift</span>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
                <svg className="w-6 h-6 text-[#5739FB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Output */}
            <div className="bg-white/5 border border-white/10 p-8">
              <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-4">
                Deployed Cue
              </h3>
              <div className="bg-gradient-to-r from-[#5739FB]/10 to-transparent border-l-4 border-[#5739FB] p-6">
                <div className="text-sm text-[#5739FB] mb-2 font-semibold">
                  downshift.somatic_anchor.audio.now.red.nurturer
                </div>
                <p className="text-white/80 leading-relaxed mb-4">
                  "Let's find your feet. Right now, can you feel the ground beneath you? Press down gently. Notice the support. You don't have to change the feeling. Just locate yourself in space."
                </p>
                <div className="flex gap-4 text-sm text-white/50">
                  <span>Voice: Nurturer</span>
                  <span>•</span>
                  <span>Primitive: Downshift</span>
                  <span>•</span>
                  <span>Duration: 90 sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Insight */}
          <div className="mt-16 text-center">
            <p className="text-white/60 text-lg max-w-3xl mx-auto">
              Every decision is logged. Every outcome is measured. The system learns what works for <span className="text-white italic">you</span>, not what works on average.
            </p>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
