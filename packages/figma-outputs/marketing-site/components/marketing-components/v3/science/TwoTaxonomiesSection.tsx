import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function TwoTaxonomiesSection() {
  return (
    <V3Section className="py-24 bg-[#0A0A0A]">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Two Complementary Taxonomies
          </h2>
          <p className="text-xl text-white/70">
            One for creators. One for orchestration. Both essential.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* 200-Component System */}
          <div className="bg-white/5 border border-white/10 p-8">
            <div className="mb-6">
              <div className="text-sm text-[#5739FB] font-semibold uppercase tracking-wider mb-2">
                For Content Creators
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                200-Component System
              </h3>
              <p className="text-white/60">
                Therapeutic / clinical ontology
              </p>
            </div>

            <p className="text-white/70 mb-6 leading-relaxed">
              The taxonomy clinicians and content creators use to build NaviCues. Organized by therapeutic intent and clinical domain.
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                Example Categories
              </h4>
              <div className="space-y-2 font-mono text-sm">
                <div className="text-white/70">witness.peer_reflection</div>
                <div className="text-white/70">downshift.somatic_anchor</div>
                <div className="text-white/70">name.pattern_map</div>
                <div className="text-white/70">repair.reconnection_script</div>
                <div className="text-white/70">make_move.boundary_rehearsal</div>
                <div className="text-white/70">capture_receipt.proof_validation</div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="text-sm text-white/50 mb-2">Purpose</div>
              <p className="text-white/70">
                Makes content creation systematic, not inspirational. Every component maps to clinical intent.
              </p>
            </div>
          </div>

          {/* 560 Cue Type System */}
          <div className="bg-gradient-to-br from-[#5739FB]/20 to-[#3E2BB8]/10 border-2 border-[#5739FB]/50 p-8">
            <div className="mb-6">
              <div className="text-sm text-[#5739FB] font-semibold uppercase tracking-wider mb-2">
                For LUMA Orchestration
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                560 Cue Type System
              </h3>
              <p className="text-white/80">
                State-aware delivery specification
              </p>
            </div>

            <p className="text-white/80 mb-6 leading-relaxed">
              The taxonomy LUMA uses to route cues based on state, context, and therapeutic progression. Organized by delivery dimensions.
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                Delivery Dimensions
              </h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-[#5739FB] mr-2">•</span>
                  <div>
                    <span className="text-white font-semibold">Format:</span>
                    <span className="text-white/80 ml-2">text, audio, video, interactive</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#5739FB] mr-2">•</span>
                  <div>
                    <span className="text-white font-semibold">Mode:</span>
                    <span className="text-white/80 ml-2">now, believe, learn, live, practice</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#5739FB] mr-2">•</span>
                  <div>
                    <span className="text-white font-semibold">Arousal:</span>
                    <span className="text-white/80 ml-2">red, amber, green, calm, activated</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#5739FB] mr-2">•</span>
                  <div>
                    <span className="text-white font-semibold">Voice:</span>
                    <span className="text-white/80 ml-2">clinician, witness, coach, sage, paradox, etc.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#5739FB]/30">
              <div className="text-sm text-[#5739FB] mb-2">Purpose</div>
              <p className="text-white/80">
                Enables real-time routing. LUMA matches current state to optimal cue type without human decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Example Mapping */}
        <div className="max-w-4xl mx-auto mt-12 bg-white/5 border border-white/10 p-8">
          <h4 className="text-white font-semibold mb-4 text-center">How They Work Together</h4>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-sm text-white/50 mb-2">Creator builds</div>
              <div className="font-mono text-sm text-white/80 mb-2">
                downshift.somatic_anchor
              </div>
              <div className="text-xs text-white/40">(200-Component)</div>
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-[#5739FB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-white/50 mb-2">LUMA routes as</div>
              <div className="font-mono text-sm text-white/80 mb-2">
                audio.now.red.nurturer
              </div>
              <div className="text-xs text-white/40">(560 Cue Type)</div>
            </div>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
