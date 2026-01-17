/**
 * CLINICAL II BATCH PAGE
 * 50 Identity Integration NaviCues from arsenal
 */

import React, { useState } from 'react';
import ClinicalII from '../../navicues/arsenal/clinical-batch-05-II';

const navicues = [
  // Self-Concept Exploration (10)
  { id: 'self-concept-map', name: 'Self-Concept Map', component: ClinicalII.SelfConceptMap, desc: 'Who are you? Map your identity' },
  { id: 'ideal-vs-actual', name: 'Ideal vs Actual Self', component: ClinicalII.IdealVsActualSelf, desc: 'The gap creates suffering' },
  { id: 'public-private', name: 'Public vs Private Self', component: ClinicalII.PublicVsPrivateSelf, desc: 'Different faces for different places' },
  { id: 'should-self', name: 'Should Self Detector', component: ClinicalII.ShouldSelf, desc: 'Who you think you should be' },
  { id: 'mirror-test', name: 'Mirror Test', component: ClinicalII.MirrorTest, desc: 'Who looks back at you?' },
  { id: 'self-compassion', name: 'Self-Compassion vs Self-Esteem', component: ClinicalII.SelfCompassionVsSelfEsteem, desc: 'Two different approaches to self' },
  { id: 'self-critic', name: 'Self-Critic Voice Identifier', component: ClinicalII.SelfCriticVoice, desc: 'The voice that attacks' },
  { id: 'self-acceptance', name: 'Self-Acceptance Scale', component: ClinicalII.SelfAcceptanceScale, desc: 'Can you accept who you are?' },
  { id: 'self-knowledge', name: 'Self-Knowledge Inventory', component: ClinicalII.SelfKnowledgeInventory, desc: 'How well do you know yourself?' },
  { id: 'self-awareness', name: 'Self-Awareness Levels', component: ClinicalII.SelfAwarenessLevels, desc: 'Layers of self-perception' },
  
  // Values Alignment (10)
  { id: 'core-values', name: 'Core Values Identifier', component: ClinicalII.CoreValuesIdentifier, desc: 'What matters most to you?' },
  { id: 'values-hierarchy', name: 'Values Hierarchy', component: ClinicalII.ValuesHierarchy, desc: 'Rank what matters' },
  { id: 'values-behavior', name: 'Values-Behavior Alignment', component: ClinicalII.ValuesBehaviorAlignment, desc: 'Do your actions match beliefs?' },
  { id: 'values-conflict', name: 'Values Conflict Detector', component: ClinicalII.ValuesConflictDetector, desc: 'When values clash' },
  { id: 'lived-stated', name: 'Lived vs Stated Values', component: ClinicalII.LivedVsStatedValues, desc: 'What you do vs what you say' },
  { id: 'values-drift', name: 'Values Drift Monitor', component: ClinicalII.ValuesDrift, desc: 'Slow change over time' },
  { id: 'values-clarity', name: 'Values Clarity Assessment', component: ClinicalII.ValuesClarity, desc: 'How clear are your values?' },
  { id: 'values-decisions', name: 'Values-Based Decision Making', component: ClinicalII.ValuesBasedDecisions, desc: 'Let values guide choices' },
  { id: 'integrity-gap', name: 'Integrity Gap Measure', component: ClinicalII.IntegrityGap, desc: 'Distance between values and action' },
  { id: 'values-evolution', name: 'Values Evolution Over Time', component: ClinicalII.ValuesEvolution, desc: 'How values change' },
  
  // Narrative Identity (10)
  { id: 'life-chapters', name: 'Life Story Chapters', component: ClinicalII.LifeStoryChapters, desc: 'Divide your life into chapters' },
  { id: 'turning-points', name: 'Turning Points Mapper', component: ClinicalII.TurningPoints, desc: 'Moments that changed everything' },
  { id: 'narrative-coherence', name: 'Narrative Coherence Check', component: ClinicalII.NarrativeCoherence, desc: 'Does your story make sense?' },
  { id: 'victim-hero', name: 'Victim vs Hero Narrative', component: ClinicalII.VictimVsHeroNarrative, desc: 'Which story are you telling?' },
  { id: 'redemption', name: 'Redemption Sequences', component: ClinicalII.RedemptionSequences, desc: 'Bad to good transformation' },
  { id: 'contamination', name: 'Contamination Sequences', component: ClinicalII.ContaminationSequences, desc: 'Good to bad transformation' },
  { id: 'life-themes', name: 'Life Themes Identifier', component: ClinicalII.LifeThemes, desc: 'Recurring patterns in your story' },
  { id: 'story-rewriting', name: 'Story Rewriting Exercise', component: ClinicalII.StoryRewriting, desc: 'Change the narrative' },
  { id: 'author-character', name: 'Author vs Character Perspective', component: ClinicalII.AuthorVsCharacter, desc: 'Are you writing or living?' },
  { id: 'future-chapter', name: 'Future Chapter Planning', component: ClinicalII.FutureChapterPlanning, desc: 'Design the next chapter' },
  
  // Purpose & Meaning (10)
  { id: 'purpose-statement', name: 'Purpose Statement Builder', component: ClinicalII.PurposeStatement, desc: 'Define your why' },
  { id: 'meaning-making', name: 'Meaning Making Process', component: ClinicalII.MeaningMaking, desc: 'How you create meaning' },
  { id: 'contribution', name: 'Contribution Inventory', component: ClinicalII.ContributionInventory, desc: 'What do you give?' },
  { id: 'legacy', name: 'Legacy Mapping', component: ClinicalII.LegacyMapping, desc: 'What will you leave behind?' },
  { id: 'existential-meaning', name: 'Existential Meaning Finder', component: ClinicalII.ExistentialMeaning, desc: 'Why are you here?' },
  { id: 'impact', name: 'Impact Assessment', component: ClinicalII.ImpactAssessment, desc: 'Measure your effect on others' },
  { id: 'calling-job', name: 'Calling vs Job Distinction', component: ClinicalII.CallingVsJob, desc: 'Work for money or meaning?' },
  { id: 'purpose-drift', name: 'Purpose Drift Detector', component: ClinicalII.PurposeDrift, desc: 'Are you losing your way?' },
  { id: 'transcendent-goals', name: 'Transcendent Goals', component: ClinicalII.TranscendentGoals, desc: 'Beyond the self' },
  { id: 'meaningful-activities', name: 'Meaningful Activities Tracker', component: ClinicalII.MeaningfulActivities, desc: 'What fills you with meaning?' },
  
  // Authenticity (10)
  { id: 'authenticity-gauge', name: 'Authenticity Gauge', component: ClinicalII.AuthenticityGauge, desc: 'How authentic are you?' },
  { id: 'mask-identifier', name: 'Mask Identifier', component: ClinicalII.MaskIdentifier, desc: 'What masks do you wear?' },
  { id: 'true-self', name: 'True Self Access', component: ClinicalII.TrueSelfAccess, desc: 'Can you reach your core?' },
  { id: 'role-identity', name: 'Role vs Identity Separation', component: ClinicalII.RoleVsIdentity, desc: 'You are not your role' },
  { id: 'social-desirability', name: 'Social Desirability Bias Detector', component: ClinicalII.SocialDesirabilityBias, desc: 'Saying what sounds good' },
  { id: 'authentic-expression', name: 'Authentic Expression Meter', component: ClinicalII.AuthenticExpression, desc: 'Speaking your truth' },
  { id: 'congruence', name: 'Congruence Check', component: ClinicalII.CongruenceCheck, desc: 'Inside matches outside' },
  { id: 'vulnerability', name: 'Vulnerability Capacity', component: ClinicalII.VulnerabilityCapacity, desc: 'Can you be vulnerable?' },
  { id: 'authentic-relationships', name: 'Authentic Relationships Audit', component: ClinicalII.AuthenticRelationships, desc: 'Which relationships are real?' },
  { id: 'self-betrayal', name: 'Self-Betrayal Detector', component: ClinicalII.SelfBetrayal, desc: 'When you abandon yourself' },
];

interface ClinicalIIBatchProps {
  onNavigate?: (page: string) => void;
}

export function ClinicalIIBatch({ onNavigate }: ClinicalIIBatchProps) {
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
            ← Back to II Arsenal
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
            PILLAR II
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Identity Integration Arsenal
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            50 NaviCues for self-concept, values alignment, narrative identity, purpose, and authenticity
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Self-Concept</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Values</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Narrative</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Purpose</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Authenticity</div>
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
                II-{String(idx + 1).padStart(2, '0')}
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

export default ClinicalIIBatch;
