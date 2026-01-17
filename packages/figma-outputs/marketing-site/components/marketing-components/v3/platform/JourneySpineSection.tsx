import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';
import { SupabaseAsset } from '../../SupabaseAsset';

export function JourneySpineSection() {
  const stats = [
    { value: '64', label: 'Journey Templates', description: 'Proven therapeutic pathways' },
    { value: '832', label: 'Scenes', description: 'Atomic units of change' },
    { value: '20', label: 'Schemas', description: 'Predictive patterns' },
    { value: '160', label: 'Families', description: 'Expression clusters' }
  ];

  return (
    <V3Section className="py-24 bg-[#0A0A0A]">
      <V3Container>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase text-[#5739FB]">
                The Journey System
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Spine of the Platform
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              The Journey system isn't content. It's the structured pathway from pattern recognition to proof to transfer. The work that holds between sessions.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <span className="text-[#5739FB] mr-3 mt-1 text-xl">•</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">Deterministic Progression</h4>
                  <p className="text-white/60">From Problem → Mechanism → Schema → Family → Mindblock → Proof → Transfer</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-[#5739FB] mr-3 mt-1 text-xl">•</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">State-Aware Routing</h4>
                  <p className="text-white/60">LUMA selects the right scene based on heat, KBE, and resistance signals</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-[#5739FB] mr-3 mt-1 text-xl">•</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">Auditable Change</h4>
                  <p className="text-white/60">Every step produces proof. Every proof gets tested via transfer.</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-[#5739FB] mb-1">{stat.value}</div>
                  <div className="text-white font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-white/50">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/5 border border-white/10 p-12 aspect-square flex items-center justify-center">
              <SupabaseAsset
                assetId="v3-platform-journey-spine"
                alt="Journey System Architecture"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
