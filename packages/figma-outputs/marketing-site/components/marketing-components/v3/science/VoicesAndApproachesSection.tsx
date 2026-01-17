import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function VoicesAndApproachesSection() {
  const voices = [
    { name: 'Clinician', stance: 'Attuned Therapist', when: 'When empathy + expertise needed' },
    { name: 'Compassionate Witness', stance: 'Non-judging presence', when: 'When shame or self-attack is active' },
    { name: 'Coach', stance: 'Agency Builder', when: 'When action is clear but pattern is avoidance' },
    { name: 'Sage', stance: 'Perspective Shifter', when: 'When stuck in narrow view' },
    { name: 'Paradox', stance: 'Pattern Breaker', when: 'When logic loops keep running' },
    { name: 'Nurturer', stance: 'Co-regulator', when: 'When activation is high, need soothing' },
    { name: 'Straight Talk', stance: 'Reality Anchor', when: 'When avoidance needs confrontation' },
    { name: 'Elder', stance: 'Integrity / Values', when: 'When meaning or purpose is lost' }
  ];

  const approaches = [
    'Statement mirror',
    'Belief probe',
    'Somatic scan',
    'Paradox prompt',
    'Make one move',
    'Receipt capture',
    'Transfer test',
    'Repair script',
    'Witness reflection'
  ];

  return (
    <V3Section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-black">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Voices & Approaches
          </h2>
          <p className="text-xl text-white/70">
            Clinical delivery at the bedside
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Voices */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">8 Voices</h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Voice isn't personality. It's clinical stance. Each voice routes differently based on heat, schema, and resistance.
            </p>

            <div className="space-y-3">
              {voices.map((voice) => (
                <div
                  key={voice.name}
                  className="bg-white/5 border border-white/10 p-4 hover:border-[#5739FB]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-semibold">{voice.name}</h4>
                    <span className="text-xs text-white/40">{voice.stance}</span>
                  </div>
                  <p className="text-white/60 text-sm">{voice.when}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Approaches */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">9 Approaches</h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              The move library. How we actually deliver the primitive. Each approach is a structured interaction pattern.
            </p>

            <div className="space-y-3">
              {approaches.map((approach, index) => (
                <div
                  key={approach}
                  className="bg-white/5 border border-white/10 p-4 hover:border-[#5739FB]/30 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-[#5739FB] font-mono text-sm mr-3">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-white font-semibold">{approach}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Example Integration */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-br from-[#5739FB]/10 to-transparent border border-[#5739FB]/30 p-8">
          <h4 className="text-white font-semibold mb-6 text-center">
            Example: Voice + Approach + Primitive
          </h4>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-white/50 mb-2">Voice</div>
              <div className="text-white font-semibold">Nurturer</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/50 mb-2">Approach</div>
              <div className="text-white font-semibold">Somatic scan</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/50 mb-2">Primitive</div>
              <div className="text-white font-semibold">Downshift</div>
            </div>
          </div>

          <div className="bg-black/30 border border-white/10 p-6">
            <div className="text-sm text-[#5739FB] mb-2">Delivered Cue</div>
            <p className="text-white/80 italic leading-relaxed">
              "Let's find your feet. Right now, can you feel the ground beneath you? Press down gently. Notice the support. You don't have to change the feeling. Just locate yourself in space."
            </p>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
