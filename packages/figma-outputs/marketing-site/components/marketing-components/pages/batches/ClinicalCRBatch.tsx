/**
 * CLINICAL CR BATCH PAGE
 * 50 Cognitive Reframing NaviCues from arsenal
 */

import React, { useState } from 'react';
import ClinicalCR from '../../navicues/arsenal/clinical-batch-04-CR';

const navicues = [
  // Cognitive Distortions (10)
  { id: 'distortion-detector', name: 'Distortion Detector', component: ClinicalCR.DistortionDetector, desc: 'Identify thinking errors in real-time' },
  { id: 'all-or-nothing', name: 'All or Nothing Slider', component: ClinicalCR.AllOrNothingSlider, desc: 'Life in the gray area' },
  { id: 'catastrophizing', name: 'Catastrophizing Calculator', component: ClinicalCR.CatastrophizingCalculator, desc: 'Worst-case scenario probability' },
  { id: 'mind-reading', name: 'Mind Reading Challenge', component: ClinicalCR.MindReadingChallenge, desc: 'You cannot know what they think' },
  { id: 'fortune-telling', name: 'Fortune Telling Test', component: ClinicalCR.FortuneTellingTest, desc: 'Predictions vs reality check' },
  { id: 'overgeneralization', name: 'Overgeneralization Detector', component: ClinicalCR.OvergeneralizationDetector, desc: 'One event ≠ always' },
  { id: 'emotional-reasoning', name: 'Emotional Reasoning Test', component: ClinicalCR.EmotionalReasoningTest, desc: 'Feelings are not facts' },
  { id: 'labeling', name: 'Labeling vs Describing', component: ClinicalCR.LabelingVsDescribing, desc: 'Global labels vs specific behaviors' },
  { id: 'should-statements', name: 'Should Statement Counter', component: ClinicalCR.ShouldStatementCounter, desc: 'Track tyranny of shoulds' },
  { id: 'personalization', name: 'Personalization Meter', component: ClinicalCR.PersonalizationMeter, desc: 'Not everything is about you' },
  
  // Cognitive Reappraisal (10)
  { id: 'reappraisal-practice', name: 'Cognitive Reappraisal Practice', component: ClinicalCR.CognitiveReappraisalPractice, desc: 'Reframe the situation' },
  { id: 'situation-reframing', name: 'Situation Reframing', component: ClinicalCR.SituationReframing, desc: 'Different angle, different meaning' },
  { id: 'meaning-maker', name: 'Meaning Maker', component: ClinicalCR.MeaningMaker, desc: 'Choose the interpretation' },
  { id: 'alternative-explanations', name: 'Alternative Explanations', component: ClinicalCR.AlternativeExplanations, desc: 'At least 3 other reasons' },
  { id: 'evidence-for-against', name: 'Evidence For & Against', component: ClinicalCR.EvidenceForAgainst, desc: 'Balanced thought evaluation' },
  { id: 'downward-arrow', name: 'Downward Arrow', component: ClinicalCR.DownwardArrow, desc: 'Core belief excavation' },
  { id: 'socratic-questioning', name: 'Socratic Questioning', component: ClinicalCR.SocraticQuestioning, desc: 'Question your thoughts' },
  { id: 'benefit-cost', name: 'Benefit-Cost Analysis', component: ClinicalCR.BenefitCostAnalysis, desc: 'Does this belief serve you?' },
  { id: 'temporal-distancing', name: 'Temporal Distancing', component: ClinicalCR.TemporalDistancing, desc: 'How will this feel in 5 years?' },
  { id: 'spatial-distancing', name: 'Spatial Distancing', component: ClinicalCR.SpatialDistancing, desc: 'View from 10,000 feet' },
  
  // Perspective Shifting (10)
  { id: 'perspective-wheel', name: 'Perspective Shift Wheel', component: ClinicalCR.PerspectiveShiftWheel, desc: 'Rotate through viewpoints' },
  { id: 'third-person', name: 'Third Person Perspective', component: ClinicalCR.ThirdPersonPerspective, desc: 'See yourself from outside' },
  { id: 'fly-on-wall', name: 'Fly on the Wall', component: ClinicalCR.FlyOnWall, desc: 'Detached observer mode' },
  { id: 'zoom-out', name: 'Zoom Out Technique', component: ClinicalCR.ZoomOutTechnique, desc: 'Expand the frame' },
  { id: 'bigger-picture', name: 'Bigger Picture View', component: ClinicalCR.BiggerPictureView, desc: 'Context changes everything' },
  { id: 'future-me', name: 'Future Me Perspective', component: ClinicalCR.FutureMe, desc: 'Wisdom from your older self' },
  { id: 'wisest-friend', name: 'Wisest Friend Advice', component: ClinicalCR.WisestFriend, desc: 'What would they say?' },
  { id: 'multiple-lenses', name: 'Multiple Lenses', component: ClinicalCR.MultipleLenses, desc: 'Same event, different filters' },
  { id: 'stakeholder-perspective', name: 'Stakeholder Perspective', component: ClinicalCR.StakeholderPerspective, desc: 'How does each person see it?' },
  { id: 'role-reversal', name: 'Role Reversal', component: ClinicalCR.RoleReversal, desc: 'Walk in their shoes' },
  
  // Metacognition (10)
  { id: 'metacognitive-awareness', name: 'Metacognitive Awareness', component: ClinicalCR.MetacognitiveAwareness, desc: 'Notice the noticing' },
  { id: 'thinking-about-thinking', name: 'Thinking About Thinking', component: ClinicalCR.ThinkingAboutThinking, desc: 'Meta-level observation' },
  { id: 'thought-observer', name: 'Thought Observer', component: ClinicalCR.ThoughtObserver, desc: 'You are not your thoughts' },
  { id: 'cognitive-fusion', name: 'Cognitive Fusion Detector', component: ClinicalCR.CognitiveFusion, desc: 'Stuck to thoughts vs separate' },
  { id: 'defusion-techniques', name: 'Defusion Techniques', component: ClinicalCR.DefusionTechniques, desc: 'Create distance from thoughts' },
  { id: 'thoughts-not-facts', name: 'Thoughts Are Not Facts', component: ClinicalCR.ThoughtsAreNotFacts, desc: 'Mental events, not reality' },
  { id: 'mental-noise', name: 'Mental Noise Filter', component: ClinicalCR.MentalNoise, desc: 'Signal vs noise in mind' },
  { id: 'cognitive-flexibility', name: 'Cognitive Flexibility', component: ClinicalCR.CognitiveFlexibility, desc: 'Shift thinking patterns easily' },
  { id: 'belief-rigidity', name: 'Belief Rigidity Detector', component: ClinicalCR.BeliefRigidity, desc: 'How stuck are your beliefs?' },
  { id: 'mental-sets', name: 'Mental Sets', component: ClinicalCR.MentalSets, desc: 'Automatic thinking patterns' },
  
  // Belief Work (10)
  { id: 'schema-activation', name: 'Schema Activation Tracker', component: ClinicalCR.SchemaActivation, desc: 'When core beliefs trigger' },
  { id: 'core-beliefs', name: 'Core Belief Identifier', component: ClinicalCR.CoreBeliefIdentifier, desc: 'Deepest assumptions about self' },
  { id: 'intermediate-beliefs', name: 'Intermediate Beliefs', component: ClinicalCR.IntermediateBeliefs, desc: 'Rules, attitudes, assumptions' },
  { id: 'automatic-thoughts', name: 'Automatic Thoughts Log', component: ClinicalCR.AutomaticThoughts, desc: 'Catch fleeting thoughts' },
  { id: 'thought-record', name: 'Thought Record', component: ClinicalCR.ThoughtRecord, desc: 'Structured thought analysis' },
  { id: 'balanced-thinking', name: 'Balanced Thinking', component: ClinicalCR.BalancedThinking, desc: 'Neither negative nor positive bias' },
  { id: 'rational-response', name: 'Rational Response Generator', component: ClinicalCR.RationalResponse, desc: 'Create adaptive alternatives' },
  { id: 'coping-cards', name: 'Coping Cards', component: ClinicalCR.CopingCards, desc: 'Portable reminder cards' },
  { id: 'adaptive-beliefs', name: 'Adaptive Beliefs Builder', component: ClinicalCR.AdaptiveBeliefs, desc: 'Replace old with new' },
  { id: 'functional-analysis', name: 'Functional Analysis', component: ClinicalCR.FunctionalAnalysis, desc: 'What purpose does this serve?' },
];

interface ClinicalCRBatchProps {
  onNavigate?: (page: string) => void;
}

export function ClinicalCRBatch({ onNavigate }: ClinicalCRBatchProps) {
  const [activeNaviCue, setActiveNaviCue] = useState<number | null>(null);

  if (activeNaviCue !== null) {
    const NaviCueComponent = navicues[activeNaviCue].component;
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
          <button
            onClick={() => setActiveNaviCue(null)}
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            ← Back to CR Arsenal
          </button>
        </div>
        <NaviCueComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          {onNavigate && (
            <button
              onClick={() => onNavigate('navicue-arsenal')}
              className="text-sm mb-4 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              ← Back to NaviCue Arsenal
            </button>
          )}
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5739FB' }}>
            PILLAR CR
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Cognitive Reframing Arsenal
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            50 NaviCues for distortion detection, reappraisal, perspective shifts, and metacognition
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Distortions</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Reappraisal</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Perspective</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Metacognition</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Belief Work</div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {navicues.map((nc, idx) => (
            <button
              key={nc.id}
              onClick={() => setActiveNaviCue(idx)}
              className="p-8 text-left transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                border: '2px solid rgba(87, 57, 251, 0.2)',
              }}
            >
              <div className="text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: '#5739FB' }}>
                CR-{String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#FFFFFF' }}>
                {nc.name}
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {nc.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClinicalCRBatch;
