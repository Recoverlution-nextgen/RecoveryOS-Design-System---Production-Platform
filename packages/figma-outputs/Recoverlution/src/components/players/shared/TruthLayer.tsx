/**
 * TRUTH LAYER - SHARED ACROSS ALL 4 RENDERERS
 * 
 * Every intervention (Block / Insight / Practice / Video) must include:
 * 1) Lineage (Authority)
 * 2) Targeting (Relevance)
 * 3) State-fit (Safety + Timing)
 * 4) Proof hooks (Outcomes as currency)
 * 
 * This kills "soulless regurgitation" at the root.
 */

import { ChevronDown, ChevronUp, Users, Target, Shield, CheckSquare } from 'lucide-react';
import { useState } from 'react';

interface TruthLayerProps {
  lineage: {
    people: string[];  // e.g. ["Kristin Neff", "Christopher Germer"]
    lens?: string;     // e.g. "Compassion-Focused Therapy (CFT)"
    framework?: string; // e.g. "CBT + ACT"
  };
  targeting: {
    pillar: string;         // e.g. "SC (Self Compassion)"
    theme?: string;         // e.g. "Inner Critic"
    schema?: string;        // e.g. "Harsh Self-Judgment"
    family?: string;
    concept?: string;
    also_helps?: string[];  // Secondary pillars/themes
  };
  stateFit: {
    best_when: string;      // e.g. "Feeling calm or slightly agitated"
    not_when: string;       // e.g. "In acute crisis"
    arousal_constraint?: string; // e.g. "Cool to Warm bands only"
    contraindications?: string[];
  };
  proofHooks: {
    pre_post_state: boolean;
    completion_log: boolean;
    reflections: string[];  // e.g. ["What shifted, even 1%?"]
    transfer_test?: string; // e.g. "Where will you use this today?"
  };
}

export function TruthLayer({ lineage, targeting, stateFit, proofHooks }: TruthLayerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-3">
      {/* Lineage (Authority) */}
      <div className="border border-[#3E2BB8]/10 rounded-none overflow-hidden">
        <button
          onClick={() => toggle('lineage')}
          className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#3E2BB8]/5 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Users className="size-4 text-[#5739FB]" />
            <span className="text-sm tracking-wide text-[#3E2BB8]">LINEAGE</span>
          </div>
          {expandedSection === 'lineage' ? (
            <ChevronUp className="size-4 text-[#3E2BB8]/40" />
          ) : (
            <ChevronDown className="size-4 text-[#3E2BB8]/40" />
          )}
        </button>
        {expandedSection === 'lineage' && (
          <div className="px-4 py-4 bg-[#3E2BB8]/5 border-t border-[#3E2BB8]/10 space-y-2">
            <p className="text-sm text-[#3E2BB8]/70">
              <span className="text-[#3E2BB8]">Built from the work of:</span>{' '}
              {lineage.people.join(', ')}
            </p>
            {lineage.lens && (
              <p className="text-sm text-[#3E2BB8]/70">
                <span className="text-[#3E2BB8]">Lens:</span> {lineage.lens}
              </p>
            )}
            {lineage.framework && (
              <p className="text-sm text-[#3E2BB8]/70">
                <span className="text-[#3E2BB8]">Framework:</span> {lineage.framework}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Targeting (Relevance) */}
      <div className="border border-[#3E2BB8]/10 rounded-none overflow-hidden">
        <button
          onClick={() => toggle('targeting')}
          className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#3E2BB8]/5 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Target className="size-4 text-[#5739FB]" />
            <span className="text-sm tracking-wide text-[#3E2BB8]">TARGETING</span>
          </div>
          {expandedSection === 'targeting' ? (
            <ChevronUp className="size-4 text-[#3E2BB8]/40" />
          ) : (
            <ChevronDown className="size-4 text-[#3E2BB8]/40" />
          )}
        </button>
        {expandedSection === 'targeting' && (
          <div className="px-4 py-4 bg-[#3E2BB8]/5 border-t border-[#3E2BB8]/10 space-y-2">
            <div className="text-sm text-[#3E2BB8]/70">
              <span className="text-[#3E2BB8]">Primary:</span> {targeting.pillar}
              {targeting.theme && ` → ${targeting.theme}`}
              {targeting.schema && ` → ${targeting.schema}`}
            </div>
            {targeting.also_helps && targeting.also_helps.length > 0 && (
              <div className="text-sm text-[#3E2BB8]/70">
                <span className="text-[#3E2BB8]">Also helps with:</span>{' '}
                {targeting.also_helps.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* State-fit (Safety + Timing) */}
      <div className="border border-[#3E2BB8]/10 rounded-none overflow-hidden">
        <button
          onClick={() => toggle('statefit')}
          className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#3E2BB8]/5 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Shield className="size-4 text-[#5739FB]" />
            <span className="text-sm tracking-wide text-[#3E2BB8]">STATE FIT</span>
          </div>
          {expandedSection === 'statefit' ? (
            <ChevronUp className="size-4 text-[#3E2BB8]/40" />
          ) : (
            <ChevronDown className="size-4 text-[#3E2BB8]/40" />
          )}
        </button>
        {expandedSection === 'statefit' && (
          <div className="px-4 py-4 bg-[#3E2BB8]/5 border-t border-[#3E2BB8]/10 space-y-2">
            <div className="text-sm text-[#3E2BB8]/70">
              <span className="text-[#3E2BB8]">✅ Best when:</span> {stateFit.best_when}
            </div>
            <div className="text-sm text-[#3E2BB8]/70">
              <span className="text-[#3E2BB8]">❌ Not when:</span> {stateFit.not_when}
            </div>
            {stateFit.arousal_constraint && (
              <div className="text-sm text-[#3E2BB8]/70">
                <span className="text-[#3E2BB8]">Arousal constraint:</span> {stateFit.arousal_constraint}
              </div>
            )}
            {stateFit.contraindications && stateFit.contraindications.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[#3E2BB8]/10">
                <p className="text-xs text-[#3E2BB8]/60 mb-1">CONTRAINDICATIONS:</p>
                <ul className="text-sm text-[#3E2BB8]/70 space-y-1">
                  {stateFit.contraindications.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Proof Hooks (Outcomes as Currency) */}
      <div className="border border-[#3E2BB8]/10 rounded-none overflow-hidden">
        <button
          onClick={() => toggle('proof')}
          className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#3E2BB8]/5 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <CheckSquare className="size-4 text-[#5739FB]" />
            <span className="text-sm tracking-wide text-[#3E2BB8]">PROOF HOOKS</span>
          </div>
          {expandedSection === 'proof' ? (
            <ChevronUp className="size-4 text-[#3E2BB8]/40" />
          ) : (
            <ChevronDown className="size-4 text-[#3E2BB8]/40" />
          )}
        </button>
        {expandedSection === 'proof' && (
          <div className="px-4 py-4 bg-[#3E2BB8]/5 border-t border-[#3E2BB8]/10 space-y-2">
            <p className="text-xs text-[#3E2BB8]/60 mb-2">WHAT WE'LL MEASURE:</p>
            <ul className="text-sm text-[#3E2BB8]/70 space-y-1">
              {proofHooks.pre_post_state && (
                <li>• Pre/post state check (Energy, Clarity, Anchorage)</li>
              )}
              {proofHooks.completion_log && <li>• Practice completion log</li>}
              {proofHooks.reflections.map((reflection, idx) => (
                <li key={idx}>• Reflection: "{reflection}"</li>
              ))}
              {proofHooks.transfer_test && (
                <li>• Transfer test: "{proofHooks.transfer_test}"</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
