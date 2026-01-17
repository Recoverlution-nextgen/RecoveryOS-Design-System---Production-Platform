import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function AuditableChangeSection() {
  return (
    <V3Section className="py-24 bg-black">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Auditable Change
          </h2>
          <p className="text-xl text-white/70">
            We don't ask you to believe. We ask you to test.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* The Loop */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              The Proof Loop
            </h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="bg-white/5 border border-white/10 p-6">
                <div className="text-sm font-mono text-[#5739FB] mb-2">STEP 1</div>
                <h4 className="text-white font-semibold mb-3">Deploy Primitive</h4>
                <p className="text-white/60 text-sm">
                  State the prediction. Run the intervention.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/5 border border-white/10 p-6">
                <div className="text-sm font-mono text-[#5739FB] mb-2">STEP 2</div>
                <h4 className="text-white font-semibold mb-3">Capture Receipt</h4>
                <p className="text-white/60 text-sm">
                  Before/after. Timestamp. What shifted.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/5 border border-white/10 p-6">
                <div className="text-sm font-mono text-[#5739FB] mb-2">STEP 3</div>
                <h4 className="text-white font-semibold mb-3">Test Transfer</h4>
                <p className="text-white/60 text-sm">
                  Same primitive, new context. Does it hold?
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-gradient-to-br from-[#00C9A7]/20 to-transparent border border-[#00C9A7]/50 p-6">
                <div className="text-sm font-mono text-[#00C9A7] mb-2">RESULT</div>
                <h4 className="text-white font-semibold mb-3">Pattern Installed</h4>
                <p className="text-white/60 text-sm">
                  Available across contexts without scaffolding.
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Examples */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              What Counts As Proof
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 p-6">
                <h4 className="text-white font-semibold mb-4">Physiological Shift</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Before:</span>
                    <span className="text-white">Arousal 8/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">After:</span>
                    <span className="text-[#00C9A7]">Arousal 4/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Time:</span>
                    <span className="text-white">90 sec</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <h4 className="text-white font-semibold mb-4">Behavioral Action</h4>
                <div className="space-y-2 text-sm">
                  <div className="text-white/70">
                    Message sent: boundary clearly stated
                  </div>
                  <div className="text-white/70">
                    Timestamp: 3:47 PM
                  </div>
                  <div className="text-white/70">
                    Response received without rupture
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <h4 className="text-white font-semibold mb-4">Relational Repair</h4>
                <div className="space-y-2 text-sm">
                  <div className="text-white/70">
                    Rupture addressed within 24h
                  </div>
                  <div className="text-white/70">
                    Repair script used
                  </div>
                  <div className="text-white/70">
                    Reconnection confirmed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Structure */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Transfer Test Structure
            </h3>

            <div className="bg-gradient-to-r from-[#5739FB]/10 to-transparent border-l-4 border-[#5739FB] p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#5739FB] text-white font-bold text-xs px-2 py-1 mr-4 mt-1">T1</div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Different Context</h5>
                    <p className="text-white/70 text-sm">Same primitive, different environment (home → work)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#5739FB] text-white font-bold text-xs px-2 py-1 mr-4 mt-1">T2</div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Different Relationship</h5>
                    <p className="text-white/70 text-sm">Same primitive, different person (partner → colleague)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#5739FB] text-white font-bold text-xs px-2 py-1 mr-4 mt-1">T3</div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Different Arousal State</h5>
                    <p className="text-white/70 text-sm">Same primitive, different heat band (calm → activated)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#00C9A7] text-white font-bold text-xs px-2 py-1 mr-4 mt-1">T4</div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Without Scaffolding</h5>
                    <p className="text-white/70 text-sm">Same primitive, no cue prompt (automatic deployment)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Statement */}
          <div className="mt-16 text-center">
            <div className="inline-block px-8 py-6 bg-white/5 border border-white/10 max-w-3xl">
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                "This is the difference between hope and installation. Hope is a feeling. Installation is a protocol with receipts."
              </p>
              <button
                onClick={() => window.location.hash = '#/v3-platform'}
                className="text-[#5739FB] font-semibold hover:text-[#3E2BB8] transition-colors"
              >
                See The Platform →
              </button>
            </div>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
