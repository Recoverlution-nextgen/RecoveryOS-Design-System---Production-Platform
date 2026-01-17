import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function ProofAndTransferSection() {
  const proofExamples = [
    {
      type: 'Receipt',
      title: '90-Second Rescue',
      before: 'Arousal: 8/10',
      after: 'Arousal: 4/10',
      timestamp: '2:47 AM',
      primitive: 'Downshift'
    },
    {
      type: 'Receipt',
      title: 'Boundary Message',
      before: 'Avoided conversation',
      after: 'Sent clear ask',
      timestamp: 'Yesterday',
      primitive: 'Make Move'
    },
    {
      type: 'Transfer',
      title: 'Context Switch',
      before: 'Worked at home',
      after: 'Repeated at work',
      timestamp: 'This week',
      primitive: 'Transfer'
    }
  ];

  return (
    <V3Section className="py-24 bg-black">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proof & Transfer
          </h2>
          <p className="text-xl text-white/70">
            Change you can audit. Not change you hope for.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
          {/* Proof Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Proof</h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Every primitive produces a receipt. A timestamp. A before and after. Evidence that something shifted.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-semibold">90-Second Rescue Receipt</h4>
                  <span className="text-xs text-white/40">2:47 AM</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-white/40 mb-1">Before</div>
                    <div className="text-white">Arousal: 8/10</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">After</div>
                    <div className="text-[#00C9A7]">Arousal: 4/10</div>
                  </div>
                </div>
                <div className="text-xs text-[#5739FB] font-semibold">
                  Primitive: Downshift
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-semibold">Boundary Message Sent</h4>
                  <span className="text-xs text-white/40">Yesterday</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-white/40 mb-1">Before</div>
                    <div className="text-white/60">Avoided conversation</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">After</div>
                    <div className="text-[#00C9A7]">Clear ask sent</div>
                  </div>
                </div>
                <div className="text-xs text-[#5739FB] font-semibold">
                  Primitive: Make Move
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-semibold">Repair Conversation</h4>
                  <span className="text-xs text-white/40">3 days ago</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-white/40 mb-1">Before</div>
                    <div className="text-white/60">Rupture unaddressed</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">After</div>
                    <div className="text-[#00C9A7]">Reconnection</div>
                  </div>
                </div>
                <div className="text-xs text-[#5739FB] font-semibold">
                  Primitive: Repair
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Transfer</h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Proof alone isn't enough. Can you do it again? In a new context? Under different conditions? That's where change becomes real.
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#5739FB]/10 to-transparent border-l-4 border-[#5739FB] p-6">
                <h4 className="text-white font-semibold mb-3">Transfer Test Structure</h4>
                <div className="space-y-3 text-white/70">
                  <div className="flex items-start">
                    <span className="text-[#5739FB] mr-3">1.</span>
                    <span>Same primitive, different context</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#5739FB] mr-3">2.</span>
                    <span>Same primitive, different relationship</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#5739FB] mr-3">3.</span>
                    <span>Same primitive, different emotional state</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#5739FB] mr-3">4.</span>
                    <span>Same primitive, without scaffolding</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <h4 className="text-white font-semibold mb-3">Transfer Example</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-white/40 mb-1">Original Context</div>
                    <div className="text-white/80">Downshift at home, alone, at night</div>
                  </div>
                  <div className="w-full h-px bg-white/10"></div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">Transfer 1</div>
                    <div className="text-white/80">Downshift at work, during meeting</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">Transfer 2</div>
                    <div className="text-white/80">Downshift in conflict, with partner</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">Transfer 3</div>
                    <div className="text-white/80">Downshift without audio cue</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#00C9A7]/10 to-transparent border-l-4 border-[#00C9A7] p-6">
                <div className="text-sm text-[#00C9A7] font-semibold mb-2">
                  Transfer Complete ✓
                </div>
                <p className="text-white/70 text-sm">
                  Pattern now available across contexts. Installation confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-block px-8 py-6 bg-white/5 border border-white/10 max-w-3xl">
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              "Every receipt is a timestamp of change. Every transfer test is proof it holds. This is how installation becomes real."
            </p>
            <button
              onClick={() => window.location.hash = '#/v3-science'}
              className="text-[#5739FB] font-semibold hover:text-[#3E2BB8] transition-colors"
            >
              Explore The Clinical Science →
            </button>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
