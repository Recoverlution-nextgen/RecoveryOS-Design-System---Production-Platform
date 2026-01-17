import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function SixPillarsSection() {
  const pillars = [
    {
      name: 'Emotional Regulation',
      description: 'Managing activation states without suppression',
      targets: 'Downshift capacity, distress tolerance, affect modulation',
      exampleMindblock: 'MB-ER-01: "I Can\'t Come Down" → "States shift; I can shorten the half-life"'
    },
    {
      name: 'Stress Resilience',
      description: 'Recovery capacity under load',
      targets: 'PFC protection, recovery routines, load management',
      exampleMindblock: 'MB-SR-01: "Stress means I\'m failing" → "Stress is load; I can recover on purpose"'
    },
    {
      name: 'Social Connectivity',
      description: 'Secure bonding and repair capacity',
      targets: 'Clear asks, boundaries, rupture repair, connection maintenance',
      exampleMindblock: 'MB-SC-01: "I can\'t ask" → "Clear asks create secure bonds"'
    },
    {
      name: 'Cognitive Reframing',
      description: 'Updating predictive models with evidence',
      targets: 'Thought testing, narrative updating, evidence gathering',
      exampleMindblock: 'MB-CR-01: "My thought is reality" → "Thoughts are predictions; I can test them"'
    },
    {
      name: 'Identity Integration',
      description: 'Building coherent self across time and context',
      targets: 'Self-compassion, future self connection, values alignment',
      exampleMindblock: 'MB-II-01: "I\'m my worst moment" → "That happened; it isn\'t my identity"'
    },
    {
      name: 'Decision Mastery',
      description: 'Gap creation and environment design',
      targets: 'Urge surfing, friction engineering, slip repair',
      exampleMindblock: 'MB-DM-01: "No gap under urge" → "I can buy 2 seconds"'
    }
  ];

  return (
    <V3Section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-black">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Six Clinical Pillars
          </h2>
          <p className="text-xl text-white/70">
            The complete map from physiology to identity
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.name}
              className="bg-white/5 border border-white/10 p-6 hover:border-[#5739FB]/50 transition-all duration-300 group"
            >
              {/* Pillar Number */}
              <div className="text-sm font-mono text-white/40 mb-3">
                PILLAR {String(index + 1).padStart(2, '0')}
              </div>

              {/* Pillar Name */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#5739FB] transition-colors">
                {pillar.name}
              </h3>

              {/* Description */}
              <p className="text-white/70 mb-4 leading-relaxed">
                {pillar.description}
              </p>

              {/* Targets */}
              <div className="mb-4 pb-4 border-b border-white/10">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  What It Targets
                </div>
                <p className="text-white/60 text-sm">
                  {pillar.targets}
                </p>
              </div>

              {/* Example Mindblock */}
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  Example Mindblock
                </div>
                <p className="text-white/70 text-sm font-mono">
                  {pillar.exampleMindblock}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-block px-8 py-6 bg-white/5 border border-white/10">
            <p className="text-white/70 leading-relaxed">
              Every journey, every cue, every mindblock maps to one or more of these six pillars. Nothing falls outside this clinical architecture.
            </p>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
