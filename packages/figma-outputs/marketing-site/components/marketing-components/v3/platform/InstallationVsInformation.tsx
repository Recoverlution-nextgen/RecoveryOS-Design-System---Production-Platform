import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function InstallationVsInformation() {
  return (
    <V3Section className="py-24 bg-black">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Installation vs Information
          </h2>
          <p className="text-xl text-white/70">
            The paradigm shift that changes everything
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Information Column */}
          <div className="bg-white/5 border border-white/10 p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white/50 mb-2">Information</h3>
              <p className="text-white/40">The old paradigm</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white/60 font-semibold mb-2">Read it</h4>
                <p className="text-white/40">Consume content. Feel inspired.</p>
              </div>

              <div>
                <h4 className="text-white/60 font-semibold mb-2">Forget it</h4>
                <p className="text-white/40">No structure for retention or practice.</p>
              </div>

              <div>
                <h4 className="text-white/60 font-semibold mb-2">Repeat</h4>
                <p className="text-white/40">Same pattern. Same outcome. No proof of change.</p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="text-sm text-white/30 uppercase tracking-wider mb-2">Result</div>
                <p className="text-white/50 italic">Hope without change</p>
              </div>
            </div>
          </div>

          {/* Installation Column */}
          <div className="bg-gradient-to-br from-[#5739FB]/20 to-[#3E2BB8]/10 border-2 border-[#5739FB]/50 p-8 relative">
            {/* Highlight badge */}
            <div className="absolute top-0 right-0 -mt-3 -mr-3">
              <div className="bg-[#5739FB] text-white text-xs font-semibold px-3 py-1">
                ATLAS
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Installation</h3>
              <p className="text-[#5739FB]">The ATLAS way</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Practice it</h4>
                <p className="text-white/80">Structured reps with the Eight Primitives.</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Prove it</h4>
                <p className="text-white/80">Capture receipts. Validate change in real-time.</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Transfer it</h4>
                <p className="text-white/80">Test in new contexts. Build automaticity.</p>
              </div>

              <div className="pt-6 border-t border-[#5739FB]/30">
                <div className="text-sm text-[#5739FB] uppercase tracking-wider mb-2">Result</div>
                <p className="text-white font-semibold">Change you can audit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-block px-8 py-6 bg-white/5 border border-white/10">
            <p className="text-white/80 text-lg leading-relaxed">
              "We don't ask you to believe. We ask you to test.<br />
              We don't deliver hope. We install operating procedures."
            </p>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
