import { useState } from 'react';
import { V3Section } from '../layout/V3Section';
import { V3Container } from '../layout/V3Container';

export function ClinicalStackSection() {
  const [expandedSchema, setExpandedSchema] = useState<string | null>(null);

  const schemas = [
    {
      id: 's1',
      name: 'Immediate Relief',
      prediction: 'When I feel this, I must end it now',
      families: ['Urgency Spike', 'Future Discounting', 'Impulsive Autopilot', 'Late Night Risk Cluster', 'Numb The Signal', 'Secret Permission', 'Mini Collapse After Stress', 'Slip Spiral Rewrite'],
      mindblockExample: 'MB-ER-01: "This state will last forever" → "States shift; I can shorten the half-life"'
    },
    {
      id: 's2',
      name: 'Defectiveness / Shame',
      prediction: 'If you really saw me, you\'d leave',
      families: ['Preemptive Self Attack', 'Hide The Real Self', 'Reject Kindness', 'Perfection As Cover', 'No Repair Allowed', 'Comparison Wound', 'Intimacy Avoidance', 'Relapse As Proof Of Bad'],
      mindblockExample: 'MB-CR-03: "I\'m bad; that\'s the reason" → "Shame is a state, not a verdict"'
    },
    {
      id: 's3',
      name: 'Abandonment / Disconnection',
      prediction: 'People go. Safety doesn\'t last.',
      families: ['Test Without Asking', 'Cling And Chase', 'Freeze When Distant', 'Leave First', 'Overgive To Keep Love', 'Hypervigilant Attachment Scan', 'Protest Behaviour', 'Shut Down Bonding'],
      mindblockExample: 'MB-SC-03: "Conflict ends relationships" → "Repair builds relationships"'
    },
    {
      id: 's4',
      name: 'Mistrust / Harm',
      prediction: 'Care is a trap',
      families: ['Motive Scanning', 'Armor Mode', 'Control The Controller', 'Keep Receipts', 'Boundary As Weapon', 'Vulnerability Equals Ammunition', 'Push Away Help', 'Rage As Protection'],
      mindblockExample: 'MB-SC-02: "No equals rejection" → "Boundaries are care"'
    }
  ];

  return (
    <V3Section className="py-24 bg-black">
      <V3Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Clinical Stack
          </h2>
          <p className="text-xl text-white/70">
            From predictive patterns to atomic endpoints
          </p>
        </div>

        {/* Stack Layers Diagram */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="space-y-6">
            {/* Layer 1: Schemas */}
            <div className="bg-gradient-to-r from-[#5739FB]/20 to-transparent border-l-4 border-[#5739FB] p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Layer 1: 20 Schemas</h3>
                <span className="text-sm text-white/50">Predictive patterns, not diagnoses</span>
              </div>
              <p className="text-white/70">
                The default models of what will happen. Risk forecasts, not labels.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Layer 2: Families */}
            <div className="bg-gradient-to-r from-[#5739FB]/15 to-transparent border-l-4 border-[#5739FB]/70 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Layer 2: 160 Families</h3>
                <span className="text-sm text-white/50">8 families per schema</span>
              </div>
              <p className="text-white/70">
                Expression clusters. Same schema, different costumes.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Layer 3: Mindblocks */}
            <div className="bg-gradient-to-r from-[#5739FB]/10 to-transparent border-l-4 border-[#5739FB]/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Layer 3: Mindblocks</h3>
                <span className="text-sm text-white/50">Atomic endpoints</span>
              </div>
              <p className="text-white/70">
                The smallest if-X-then-Y prediction you can target, test, and rewrite.
              </p>
            </div>
          </div>
        </div>

        {/* Schema Examples (Expandable) */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Schema Examples
          </h3>
          <div className="space-y-4">
            {schemas.map((schema) => (
              <button
                key={schema.id}
                onClick={() => setExpandedSchema(expandedSchema === schema.id ? null : schema.id)}
                className="w-full text-left bg-white/5 border border-white/10 p-6 hover:border-[#5739FB]/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">{schema.name}</h4>
                    <p className="text-white/60 italic">"{schema.prediction}"</p>
                  </div>
                  <div className="ml-4 text-white/40">
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        expandedSchema === schema.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {expandedSchema === schema.id && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    {/* Families */}
                    <div>
                      <h5 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                        8 Families
                      </h5>
                      <div className="grid md:grid-cols-2 gap-2">
                        {schema.families.map((family, i) => (
                          <div key={i} className="flex items-start">
                            <span className="text-[#5739FB] mr-2 text-sm">F{i + 1}</span>
                            <span className="text-white/70 text-sm">{family}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mindblock Example */}
                    <div>
                      <h5 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                        Example Mindblock
                      </h5>
                      <div className="bg-gradient-to-r from-[#5739FB]/10 to-transparent border-l-4 border-[#5739FB] p-4">
                        <p className="text-white/80 font-mono text-sm">{schema.mindblockExample}</p>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* More Schemas Indicator */}
          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              + 16 more schemas covering the complete clinical space
            </p>
          </div>
        </div>
      </V3Container>
    </V3Section>
  );
}
