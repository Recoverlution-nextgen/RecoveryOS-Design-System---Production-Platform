/**
 * CLINICAL ARSENAL - PILLAR CR: COGNITIVE REFRAMING
 * 50 NaviCues for cognitive distortions, reappraisal, perspective shifts, metacognition
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// COGNITIVE DISTORTIONS (10 NaviCues)
// ============================================================================

export function DistortionDetector() {
  const [thought, setThought] = useState('');
  const [detected, setDetected] = useState<string[]>([]);

  const distortions = [
    { name: 'All-or-Nothing', keywords: ['always', 'never', 'completely', 'totally'] },
    { name: 'Catastrophizing', keywords: ['disaster', 'terrible', 'worst', 'ruin'] },
    { name: 'Mind Reading', keywords: ['they think', 'must think', 'probably thinks'] },
    { name: 'Fortune Telling', keywords: ['will never', 'going to', 'destined', 'bound to'] },
    { name: 'Overgeneralization', keywords: ['everyone', 'no one', 'everything'] },
  ];

  const checkDistortions = () => {
    const found = distortions
      .filter(d => d.keywords.some(kw => thought.toLowerCase().includes(kw)))
      .map(d => d.name);
    setDetected(found);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Distortion Detector</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Your thoughts are not facts. Find the distortion.
        </p>

        <textarea
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="Write a thought that bothers you..."
          className="w-full p-4 mb-4 h-32"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '2px solid rgba(87, 57, 251, 0.2)',
            color: '#FFFFFF',
          }}
        />

        <button
          onClick={checkDistortions}
          disabled={!thought}
          className="w-full p-4 mb-6"
          style={{
            backgroundColor: thought ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
          }}
        >
          Check for Distortions
        </button>

        {detected.length > 0 && (
          <div className="space-y-3">
            {detected.map(d => (
              <div key={d} className="p-4" style={{ backgroundColor: 'rgba(255, 68, 68, 0.1)', color: '#FF4444' }}>
                ⚠️ {d}
              </div>
            ))}
          </div>
        )}

        {detected.length === 0 && thought && (
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#5739FB' }}>
            No obvious distortions detected
          </div>
        )}
      </div>
    </div>
  );
}

export function AllOrNothingSlider() {
  const [position, setPosition] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>All or Nothing?</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Life lives in the gray area. Not black or white.
        </p>

        <div className="mb-8">
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(parseInt(e.target.value))}
            className="w-full h-2"
            style={{ accentColor: '#5739FB' }}
          />
          <div className="flex justify-between text-xs mt-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            <span>Total Failure</span>
            <span>Perfection</span>
          </div>
        </div>

        <div className="p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-2" style={{ color: '#5739FB' }}>{position}%</div>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {position < 20 && 'Not all bad. Some things went right.'}
            {position >= 20 && position < 40 && 'Progress exists here.'}
            {position >= 40 && position < 60 && 'Middle ground. Most of life.'}
            {position >= 60 && position < 80 && 'Good, not perfect. That is enough.'}
            {position >= 80 && 'No one is perfect. You are human.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CatastrophizingCalculator() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Catastrophizing Calculator - Coming Soon</div>;
}

export function MindReadingChallenge() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Mind Reading Challenge - Coming Soon</div>;
}

export function FortuneTellingTest() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Fortune Telling Test - Coming Soon</div>;
}

export function OvergeneralizationDetector() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Overgeneralization Detector - Coming Soon</div>;
}

export function EmotionalReasoningTest() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Emotional Reasoning Test - Coming Soon</div>;
}

export function LabelingVsDescribing() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Labeling vs Describing - Coming Soon</div>;
}

export function ShouldStatementCounter() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Should Statement Counter - Coming Soon</div>;
}

export function PersonalizationMeter() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Personalization Meter - Coming Soon</div>;
}

// Remaining 40 NaviCues across Reappraisal, Perspective, Metacognition sections
export function CognitiveReappraisalPractice() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Cognitive Reappraisal Practice - Coming Soon</div>;
}

export function SituationReframing() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Situation Reframing - Coming Soon</div>;
}

export function MeaningMaker() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Meaning Maker - Coming Soon</div>;
}

export function AlternativeExplanations() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Alternative Explanations - Coming Soon</div>;
}

export function EvidenceForAgainst() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Evidence For & Against - Coming Soon</div>;
}

export function DownwardArrow() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Downward Arrow - Coming Soon</div>;
}

export function SocraticQuestioning() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Socratic Questioning - Coming Soon</div>;
}

export function BenefitCostAnalysis() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Benefit-Cost Analysis - Coming Soon</div>;
}

export function TemporalDistancing() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Temporal Distancing - Coming Soon</div>;
}

export function SpatialDistancing() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Spatial Distancing - Coming Soon</div>;
}

export function PerspectiveShiftWheel() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Perspective Shift Wheel - Coming Soon</div>;
}

export function ThirdPersonPerspective() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Third Person Perspective - Coming Soon</div>;
}

export function FlyOnWall() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Fly on the Wall - Coming Soon</div>;
}

export function ZoomOutTechnique() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Zoom Out Technique - Coming Soon</div>;
}

export function BiggerPictureView() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Bigger Picture View - Coming Soon</div>;
}

export function FutureMe() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Future Me Perspective - Coming Soon</div>;
}

export function WisestFriend() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Wisest Friend Advice - Coming Soon</div>;
}

export function MultipleLenses() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Multiple Lenses - Coming Soon</div>;
}

export function StakeholderPerspective() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Stakeholder Perspective - Coming Soon</div>;
}

export function RoleReversal() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Role Reversal - Coming Soon</div>;
}

export function MetacognitiveAwareness() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Metacognitive Awareness - Coming Soon</div>;
}

export function ThinkingAboutThinking() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Thinking About Thinking - Coming Soon</div>;
}

export function ThoughtObserver() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Thought Observer - Coming Soon</div>;
}

export function CognitiveFusion() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Cognitive Fusion Detector - Coming Soon</div>;
}

export function DefusionTechniques() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Defusion Techniques - Coming Soon</div>;
}

export function ThoughtsAreNotFacts() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Thoughts Are Not Facts - Coming Soon</div>;
}

export function MentalNoise() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Mental Noise Filter - Coming Soon</div>;
}

export function CognitiveFlexibility() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Cognitive Flexibility - Coming Soon</div>;
}

export function BeliefRigidity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Belief Rigidity Detector - Coming Soon</div>;
}

export function MentalSets() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Mental Sets - Coming Soon</div>;
}

export function SchemaActivation() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Schema Activation Tracker - Coming Soon</div>;
}

export function CoreBeliefIdentifier() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Core Belief Identifier - Coming Soon</div>;
}

export function IntermediateBeliefs() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Intermediate Beliefs - Coming Soon</div>;
}

export function AutomaticThoughts() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Automatic Thoughts Log - Coming Soon</div>;
}

export function ThoughtRecord() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Thought Record - Coming Soon</div>;
}

export function BalancedThinking() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Balanced Thinking - Coming Soon</div>;
}

export function RationalResponse() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Rational Response Generator - Coming Soon</div>;
}

export function CopingCards() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Coping Cards - Coming Soon</div>;
}

export function AdaptiveBeliefs() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Adaptive Beliefs Builder - Coming Soon</div>;
}

export function FunctionalAnalysis() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Functional Analysis - Coming Soon</div>;
}

const ClinicalCR = {
  DistortionDetector,
  AllOrNothingSlider,
  CatastrophizingCalculator,
  MindReadingChallenge,
  FortuneTellingTest,
  OvergeneralizationDetector,
  EmotionalReasoningTest,
  LabelingVsDescribing,
  ShouldStatementCounter,
  PersonalizationMeter,
  CognitiveReappraisalPractice,
  SituationReframing,
  MeaningMaker,
  AlternativeExplanations,
  EvidenceForAgainst,
  DownwardArrow,
  SocraticQuestioning,
  BenefitCostAnalysis,
  TemporalDistancing,
  SpatialDistancing,
  PerspectiveShiftWheel,
  ThirdPersonPerspective,
  FlyOnWall,
  ZoomOutTechnique,
  BiggerPictureView,
  FutureMe,
  WisestFriend,
  MultipleLenses,
  StakeholderPerspective,
  RoleReversal,
  MetacognitiveAwareness,
  ThinkingAboutThinking,
  ThoughtObserver,
  CognitiveFusion,
  DefusionTechniques,
  ThoughtsAreNotFacts,
  MentalNoise,
  CognitiveFlexibility,
  BeliefRigidity,
  MentalSets,
  SchemaActivation,
  CoreBeliefIdentifier,
  IntermediateBeliefs,
  AutomaticThoughts,
  ThoughtRecord,
  BalancedThinking,
  RationalResponse,
  CopingCards,
  AdaptiveBeliefs,
  FunctionalAnalysis,
};

export default ClinicalCR;
