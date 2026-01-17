import { useState } from 'react';
import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

interface Primitive {
  id: string;
  number: string;
  name: string;
  description: string;
  whenToUse: string;
  exampleCue: string;
  clinical: string;
}

const primitives: Primitive[] = [
  {
    id: 'name',
    number: '01',
    name: 'Name',
    description: 'Map the pattern. See the loop without verdict.',
    whenToUse: 'When caught in a cycle but cannot see it clearly',
    exampleCue: 'Notice: when you feel criticized, you withdraw. When you withdraw, they pursue. When they pursue, you feel more criticized. This is the loop.',
    clinical: 'Metacognitive awareness. Pattern interruption requires pattern recognition.'
  },
  {
    id: 'orient',
    number: '02',
    name: 'Orient',
    description: 'Ground in the body. Locate yourself in space and time.',
    whenToUse: 'When dissociated, unmoored, or caught in thought spiral',
    exampleCue: 'Feel your feet. Press down gently. Notice the support beneath you. You are here. You are now.',
    clinical: 'Interoceptive awareness. Restore connection between mind and body.'
  },
  {
    id: 'downshift',
    number: '03',
    name: 'Downshift',
    description: 'Regulate the state. Reduce activation without suppression.',
    whenToUse: 'When arousal is too high for learning or choice',
    exampleCue: 'Box breathing. 4 in. Hold 4. 4 out. Hold 4. Not to fix the feeling. To make a gap.',
    clinical: 'Vagal tone regulation. Create neurophysiological space for cortical engagement.'
  },
  {
    id: 'make-move',
    number: '04',
    name: 'Make Move',
    description: 'Take the action. One imperfect rep in the right direction.',
    whenToUse: 'When the path is clear but the pattern is avoidance',
    exampleCue: 'Send the message. Do not edit for perfect. Edit for true. One sentence. Hit send.',
    clinical: 'Behavioral activation. Action precedes motivation in depression or avoidance.'
  },
  {
    id: 'capture-receipt',
    number: '05',
    name: 'Capture Receipt',
    description: 'Prove the change. Timestamp the shift.',
    whenToUse: 'Immediately after completing a primitive or making a move',
    exampleCue: 'What changed? Before: arousal 8/10. After: arousal 4/10. Time: 90 seconds. This is your receipt.',
    clinical: 'Evidence-based tracking. Change becomes auditable, not aspirational.'
  },
  {
    id: 'repair',
    number: '06',
    name: 'Repair',
    description: 'Fix the rupture. Reconnection builds security.',
    whenToUse: 'After conflict, misattunement, or relational injury',
    exampleCue: 'I was harsh earlier. That was not fair. I was scared, not mad at you. Can we reset?',
    clinical: 'Attachment repair. Rupture plus repair equals secure bond. Rupture without repair equals insecurity.'
  },
  {
    id: 'witness',
    number: '07',
    name: 'Witness',
    description: 'See without verdict. Hold the experience with compassion.',
    whenToUse: 'When shame, self-attack, or harsh judgment is active',
    exampleCue: 'You are struggling. That makes sense. This is hard. You are not broken. You are human.',
    clinical: 'Self-compassion. Shifts threat response (self-attack) to caregiving response.'
  },
  {
    id: 'transfer',
    number: '08',
    name: 'Transfer',
    description: 'Test in new context. Prove the pattern holds beyond the original setting.',
    whenToUse: 'After proof is captured and pattern is working in one context',
    exampleCue: 'You downshifted at home. Now try it at work. Same primitive. Different context. Does it hold?',
    clinical: 'Generalization. Skills must transfer across contexts to become operating procedures.'
  }
];

export function EightPrimitivesSection() {
  const [expandedPrimitive, setExpandedPrimitive] = useState<string | null>(null);

  return (
    <V3Section className="py-24 bg-gradient-to-b from-black to-[#0A0A0A]">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Eight Primitives
          </h2>
          <p className="text-xl text-white/70">
            The grammar of change. Every interaction, every cue, every journey is built from these atomic units.
          </p>
        </div>

        {/* Primitives Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {primitives.map((primitive) => (
            <button
              key={primitive.id}
              onClick={() => setExpandedPrimitive(expandedPrimitive === primitive.id ? null : primitive.id)}
              className="text-left bg-white/5 border border-white/10 p-6 hover:border-[#5739FB]/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {/* Number */}
                  <div className="text-sm font-mono text-white/40 mb-2">
                    {primitive.number}
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#5739FB] transition-colors">
                    {primitive.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70">
                    {primitive.description}
                  </p>
                </div>

                {/* Expand Icon */}
                <div className="ml-4 text-white/40 group-hover:text-[#5739FB] transition-colors">
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      expandedPrimitive === primitive.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPrimitive === primitive.id && (
                <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                      When To Use
                    </h4>
                    <p className="text-white/80">{primitive.whenToUse}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                      Example Cue
                    </h4>
                    <div className="bg-gradient-to-r from-[#5739FB]/10 to-transparent border-l-4 border-[#5739FB] p-4">
                      <p className="text-white/90 italic leading-relaxed">
                        "{primitive.exampleCue}"
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                      Clinical Foundation
                    </h4>
                    <p className="text-white/70 text-sm">{primitive.clinical}</p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Insight */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-block px-8 py-6 bg-white/5 border border-white/10">
            <p className="text-white/80 leading-relaxed">
              These eight primitives form the complete grammar of therapeutic change. Every NaviCue in the system uses one or more of these primitives. Nothing else is needed.
            </p>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}