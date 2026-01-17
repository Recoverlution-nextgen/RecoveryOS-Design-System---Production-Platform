/**
 * CLINICAL ARSENAL - PILLAR II: IDENTITY INTEGRATION
 * 50 NaviCues for self-concept, values, narrative identity, purpose, authenticity
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// SELF-CONCEPT EXPLORATION (10 NaviCues)
// ============================================================================

export function SelfConceptMap() {
  const [descriptors, setDescriptors] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');

  const predefinedDescriptors = [
    'Creative', 'Analytical', 'Caring', 'Independent', 'Ambitious', 'Spiritual',
    'Logical', 'Emotional', 'Leader', 'Follower', 'Optimistic', 'Realistic',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Self-Concept Map</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Who are you? List words that describe your sense of self.
        </p>

        <div className="mb-8">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && currentInput.trim()) {
                setDescriptors([...descriptors, currentInput.trim()]);
                setCurrentInput('');
              }
            }}
            placeholder="Type a word and press Enter..."
            className="w-full p-4 mb-4"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              border: '2px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          />

          <div className="flex flex-wrap gap-2 mb-6">
            {predefinedDescriptors.map((desc) => (
              <button
                key={desc}
                onClick={() => setDescriptors([...descriptors, desc])}
                disabled={descriptors.includes(desc)}
                className="px-4 py-2 text-sm transition-opacity"
                style={{
                  backgroundColor: descriptors.includes(desc) ? 'rgba(87, 57, 251, 0.3)' : 'rgba(87, 57, 251, 0.1)',
                  color: '#FFFFFF',
                  opacity: descriptors.includes(desc) ? 0.5 : 1,
                }}
              >
                {desc}
              </button>
            ))}
          </div>
        </div>

        {descriptors.length > 0 && (
          <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-xl mb-4" style={{ color: '#5739FB' }}>Your Self-Concept:</div>
            <div className="flex flex-wrap gap-3">
              {descriptors.map((desc, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2"
                  style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
                >
                  {desc}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function IdealVsActualSelf() {
  const [ideal, setIdeal] = useState(5);
  const [actual, setActual] = useState(5);

  const gap = Math.abs(ideal - actual);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Ideal vs Actual Self</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Who you want to be vs who you are. The gap creates suffering.
        </p>

        <div className="space-y-8 mb-8">
          <div>
            <div className="mb-2" style={{ color: '#FFFFFF' }}>Ideal Self (Who I want to be)</div>
            <input
              type="range"
              min="0"
              max="10"
              value={ideal}
              onChange={(e) => setIdeal(parseInt(e.target.value))}
              className="w-full h-2"
              style={{ accentColor: '#5739FB' }}
            />
            <div className="text-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{ideal}/10</div>
          </div>

          <div>
            <div className="mb-2" style={{ color: '#FFFFFF' }}>Actual Self (Who I am now)</div>
            <input
              type="range"
              min="0"
              max="10"
              value={actual}
              onChange={(e) => setActual(parseInt(e.target.value))}
              className="w-full h-2"
              style={{ accentColor: '#FF4444' }}
            />
            <div className="text-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{actual}/10</div>
          </div>
        </div>

        <div className="text-center p-8" style={{ backgroundColor: gap > 3 ? 'rgba(255, 68, 68, 0.1)' : 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-2" style={{ color: gap > 3 ? '#FF4444' : '#5739FB' }}>
            Gap: {gap}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {gap === 0 && 'Aligned. No discrepancy.'}
            {gap > 0 && gap <= 2 && 'Small gap. Room for growth.'}
            {gap > 2 && gap <= 4 && 'Moderate gap. Creates tension.'}
            {gap > 4 && 'Large gap. Source of suffering.'}
          </div>
        </div>
      </div>
    </div>
  );
}

// Remaining II NaviCues as placeholders
export function PublicVsPrivateSelf() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Public vs Private Self - Coming Soon</div>;
}

export function ShouldSelf() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Should Self Detector - Coming Soon</div>;
}

export function MirrorTest() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Mirror Test - Coming Soon</div>;
}

export function SelfCompassionVsSelfEsteem() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Self-Compassion vs Self-Esteem - Coming Soon</div>;
}

export function SelfCriticVoice() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Self-Critic Voice Identifier - Coming Soon</div>;
}

export function SelfAcceptanceScale() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Self-Acceptance Scale - Coming Soon</div>;
}

export function SelfKnowledgeInventory() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Self-Knowledge Inventory - Coming Soon</div>;
}

export function SelfAwarenessLevels() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Self-Awareness Levels - Coming Soon</div>;
}

// VALUES ALIGNMENT (10 NaviCues)
export function CoreValuesIdentifier() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Core Values Identifier - Coming Soon</div>;
}

export function ValuesHierarchy() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Values Hierarchy - Coming Soon</div>;
}

export function ValuesBehaviorAlignment() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Values-Behavior Alignment - Coming Soon</div>;
}

export function ValuesConflictDetector() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Values Conflict Detector - Coming Soon</div>;
}

export function LivedVsStatedValues() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Lived vs Stated Values - Coming Soon</div>;
}

export function ValuesDrift() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Values Drift Monitor - Coming Soon</div>;
}

export function ValuesClarity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Values Clarity Assessment - Coming Soon</div>;
}

export function ValuesBasedDecisions() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Values-Based Decision Making - Coming Soon</div>;
}

export function IntegrityGap() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Integrity Gap Measure - Coming Soon</div>;
}

export function ValuesEvolution() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Values Evolution Over Time - Coming Soon</div>;
}

// NARRATIVE IDENTITY (10 NaviCues)
export function LifeStoryChapters() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Life Story Chapters - Coming Soon</div>;
}

export function TurningPoints() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Turning Points Mapper - Coming Soon</div>;
}

export function NarrativeCoherence() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Narrative Coherence Check - Coming Soon</div>;
}

export function VictimVsHeroNarrative() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Victim vs Hero Narrative - Coming Soon</div>;
}

export function RedemptionSequences() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Redemption Sequences - Coming Soon</div>;
}

export function ContaminationSequences() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Contamination Sequences - Coming Soon</div>;
}

export function LifeThemes() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Life Themes Identifier - Coming Soon</div>;
}

export function StoryRewriting() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Story Rewriting Exercise - Coming Soon</div>;
}

export function AuthorVsCharacter() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Author vs Character Perspective - Coming Soon</div>;
}

export function FutureChapterPlanning() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Future Chapter Planning - Coming Soon</div>;
}

// PURPOSE & MEANING (10 NaviCues)
export function PurposeStatement() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Purpose Statement Builder - Coming Soon</div>;
}

export function MeaningMaking() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Meaning Making Process - Coming Soon</div>;
}

export function ContributionInventory() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Contribution Inventory - Coming Soon</div>;
}

export function LegacyMapping() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Legacy Mapping - Coming Soon</div>;
}

export function ExistentialMeaning() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Existential Meaning Finder - Coming Soon</div>;
}

export function ImpactAssessment() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Impact Assessment - Coming Soon</div>;
}

export function CallingVsJob() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Calling vs Job Distinction - Coming Soon</div>;
}

export function PurposeDrift() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Purpose Drift Detector - Coming Soon</div>;
}

export function TranscendentGoals() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Transcendent Goals - Coming Soon</div>;
}

export function MeaningfulActivities() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Meaningful Activities Tracker - Coming Soon</div>;
}

// AUTHENTICITY (10 NaviCues)
export function AuthenticityGauge() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Authenticity Gauge - Coming Soon</div>;
}

export function MaskIdentifier() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Mask Identifier - Coming Soon</div>;
}

export function TrueSelfAccess() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>True Self Access - Coming Soon</div>;
}

export function RoleVsIdentity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Role vs Identity Separation - Coming Soon</div>;
}

export function SocialDesirabilityBias() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Social Desirability Bias Detector - Coming Soon</div>;
}

export function AuthenticExpression() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Authentic Expression Meter - Coming Soon</div>;
}

export function CongruenceCheck() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Congruence Check - Coming Soon</div>;
}

export function VulnerabilityCapacity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Vulnerability Capacity - Coming Soon</div>;
}

export function AuthenticRelationships() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Authentic Relationships Audit - Coming Soon</div>;
}

export function SelfBetrayal() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Self-Betrayal Detector - Coming Soon</div>;
}

const ClinicalII = {
  // Self-Concept (10)
  SelfConceptMap,
  IdealVsActualSelf,
  PublicVsPrivateSelf,
  ShouldSelf,
  MirrorTest,
  SelfCompassionVsSelfEsteem,
  SelfCriticVoice,
  SelfAcceptanceScale,
  SelfKnowledgeInventory,
  SelfAwarenessLevels,
  
  // Values (10)
  CoreValuesIdentifier,
  ValuesHierarchy,
  ValuesBehaviorAlignment,
  ValuesConflictDetector,
  LivedVsStatedValues,
  ValuesDrift,
  ValuesClarity,
  ValuesBasedDecisions,
  IntegrityGap,
  ValuesEvolution,
  
  // Narrative Identity (10)
  LifeStoryChapters,
  TurningPoints,
  NarrativeCoherence,
  VictimVsHeroNarrative,
  RedemptionSequences,
  ContaminationSequences,
  LifeThemes,
  StoryRewriting,
  AuthorVsCharacter,
  FutureChapterPlanning,
  
  // Purpose & Meaning (10)
  PurposeStatement,
  MeaningMaking,
  ContributionInventory,
  LegacyMapping,
  ExistentialMeaning,
  ImpactAssessment,
  CallingVsJob,
  PurposeDrift,
  TranscendentGoals,
  MeaningfulActivities,
  
  // Authenticity (10)
  AuthenticityGauge,
  MaskIdentifier,
  TrueSelfAccess,
  RoleVsIdentity,
  SocialDesirabilityBias,
  AuthenticExpression,
  CongruenceCheck,
  VulnerabilityCapacity,
  AuthenticRelationships,
  SelfBetrayal,
};

export default ClinicalII;
