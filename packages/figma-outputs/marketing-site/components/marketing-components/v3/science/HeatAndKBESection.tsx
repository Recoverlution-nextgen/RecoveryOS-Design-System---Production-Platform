import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function HeatAndKBESection() {
  return (
    <V3Section className="py-24 bg-black">
      <V3Container>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Heat Bands + KBE Progression
            </h2>
            <p className="text-xl text-white/70">
              State-aware gating meets therapeutic progression
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Heat Bands */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Heat Bands</h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Arousal state determines what's possible. We don't think our way through a fire. We gate by heat.
              </p>

              <div className="space-y-4">
                {/* RED */}
                <div className="border-l-4 border-red-500 bg-red-500/10 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-white">RED</h4>
                    <span className="text-sm text-white/60">Arousal 7-10</span>
                  </div>
                  <p className="text-white/70 mb-3">
                    Crisis / High activation. No learning. Rescue only.
                  </p>
                  <div className="text-sm text-white/60">
                    <div className="font-semibold mb-1">Default Primitives:</div>
                    <div>Orient → Downshift</div>
                  </div>
                </div>

                {/* AMBER */}
                <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-white">AMBER</h4>
                    <span className="text-sm text-white/60">Arousal 4-6</span>
                  </div>
                  <p className="text-white/70 mb-3">
                    Elevated / Moderate. Can name patterns, can downshift, limited bandwidth.
                  </p>
                  <div className="text-sm text-white/60">
                    <div className="font-semibold mb-1">Default Primitives:</div>
                    <div>Name → Witness → Repair</div>
                  </div>
                </div>

                {/* GREEN */}
                <div className="border-l-4 border-green-500 bg-green-500/10 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-white">GREEN</h4>
                    <span className="text-sm text-white/60">Arousal 1-3</span>
                  </div>
                  <p className="text-white/70 mb-3">
                    Calm / Ready. Can build, practice, transfer, reflect.
                  </p>
                  <div className="text-sm text-white/60">
                    <div className="font-semibold mb-1">Default Primitives:</div>
                    <div>Make Move → Capture Receipt → Transfer</div>
                  </div>
                </div>
              </div>
            </div>

            {/* KBE Progression */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">KBE Progression</h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Therapeutic depth follows a predictable sequence. You must know before you can believe. You must believe before you can embody.
              </p>

              <div className="space-y-4">
                {/* Knowing */}
                <div className="border-l-4 border-[#5739FB] bg-[#5739FB]/10 p-6">
                  <h4 className="text-xl font-bold text-white mb-3">Knowing</h4>
                  <p className="text-white/70 mb-3">
                    Map the loop. See the pattern without verdict.
                  </p>
                  <div className="text-sm text-white/60">
                    <div className="font-semibold mb-1">Example:</div>
                    <div>"I withdraw when criticized. That pushes them away. Which feels like more rejection."</div>
                  </div>
                </div>

                {/* Believing */}
                <div className="border-l-4 border-[#5739FB]/70 bg-[#5739FB]/10 p-6">
                  <h4 className="text-xl font-bold text-white mb-3">Believing</h4>
                  <p className="text-white/70 mb-3">
                    The shift lands. New prediction feels possible.
                  </p>
                  <div className="text-sm text-white/60">
                    <div className="font-semibold mb-1">Example:</div>
                    <div>"I can stay in the conversation without collapsing. I've done it before. I have evidence."</div>
                  </div>
                </div>

                {/* Embodying */}
                <div className="border-l-4 border-[#00C9A7] bg-[#00C9A7]/10 p-6">
                  <h4 className="text-xl font-bold text-white mb-3">Embodying</h4>
                  <p className="text-white/70 mb-3">
                    Proof + transfer. Change is automatic, not effortful.
                  </p>
                  <div className="text-sm text-white/60">
                    <div className="font-semibold mb-1">Example:</div>
                    <div>"I stay in hard conversations without thinking about it. It's just what I do now."</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Note */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#5739FB]/10 to-transparent border-l-4 border-[#5739FB] p-8">
              <h4 className="text-white font-semibold mb-3">How They Work Together</h4>
              <p className="text-white/70 leading-relaxed">
                Heat determines what's <span className="text-white italic">possible</span> right now. KBE determines where you are in the <span className="text-white italic">progression</span>. LUMA uses both to route the right cue at the right moment.
              </p>
            </div>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
