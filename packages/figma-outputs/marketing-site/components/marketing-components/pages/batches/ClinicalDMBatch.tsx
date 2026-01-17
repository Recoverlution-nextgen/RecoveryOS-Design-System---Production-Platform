/**
 * CLINICAL DM BATCH PAGE
 * 50 Decision Mastery NaviCues from arsenal
 */

import React, { useState } from 'react';
import ClinicalDM from '../../navicues/arsenal/clinical-batch-06-DM';

const navicues = [
  // Agency & Autonomy (10)
  { id: 'locus-control', name: 'Locus of Control', component: ClinicalDM.LocusOfControl, desc: 'Internal vs external control beliefs' },
  { id: 'learned-helplessness', name: 'Learned Helplessness Detector', component: ClinicalDM.LearnedHelplessness, desc: 'When do you give up?' },
  { id: 'agency-victimhood', name: 'Agency vs Victimhood', component: ClinicalDM.AgencyVsVictimhood, desc: 'Actor or acted upon?' },
  { id: 'choice-paralysis', name: 'Choice Paralysis Detector', component: ClinicalDM.ChoiceParalysis, desc: 'Too many options freeze you' },
  { id: 'autonomy-support', name: 'Autonomy Support Meter', component: ClinicalDM.AutonomySupport, desc: 'Environment enables choice' },
  { id: 'self-determination', name: 'Self-Determination Theory', component: ClinicalDM.SelfDetermination, desc: 'Autonomy, competence, relatedness' },
  { id: 'perceived-control', name: 'Perceived Control Assessment', component: ClinicalDM.PerceivedControl, desc: 'How much control do you feel?' },
  { id: 'empowerment', name: 'Empowerment Index', component: ClinicalDM.EmpowermentIndex, desc: 'Measure your power to act' },
  { id: 'agentic-shift', name: 'Agentic Shift Tracker', component: ClinicalDM.AgenticShift, desc: 'From passive to active' },
  { id: 'responsibility', name: 'Responsibility Acceptance', component: ClinicalDM.ResponsibilityAcceptance, desc: 'Owning your outcomes' },
  
  // Choice Architecture (10)
  { id: 'default-bias', name: 'Default Bias Detector', component: ClinicalDM.DefaultBias, desc: 'Power of the preset option' },
  { id: 'choice-framing', name: 'Choice Framing Effects', component: ClinicalDM.ChoiceFraming, desc: 'How options are presented' },
  { id: 'decoy-effect', name: 'Decoy Effect Awareness', component: ClinicalDM.DecoyEffect, desc: 'Third option changes preference' },
  { id: 'anchoring', name: 'Anchoring Bias Detector', component: ClinicalDM.AnchoringBias, desc: 'First number shapes decision' },
  { id: 'choice-overload', name: 'Choice Overload Assessment', component: ClinicalDM.ChoiceOverload, desc: 'When more is less' },
  { id: 'optimal-choice', name: 'Optimal Choice Set Size', component: ClinicalDM.OptimalChoiceSet, desc: 'Right number of options' },
  { id: 'choice-sequencing', name: 'Choice Sequencing Strategy', component: ClinicalDM.ChoiceSequencing, desc: 'Order matters' },
  { id: 'nudge-recognition', name: 'Nudge Recognition', component: ClinicalDM.NudgeRecognition, desc: 'Spot behavioral nudges' },
  { id: 'choice-environment', name: 'Choice Environment Design', component: ClinicalDM.ChoiceEnvironment, desc: 'Structure your decisions' },
  { id: 'pre-commitment', name: 'Pre-Commitment Devices', component: ClinicalDM.PreCommitment, desc: 'Decide before deciding' },
  
  // Decision Fatigue (10)
  { id: 'decision-load', name: 'Decision Load Tracker', component: ClinicalDM.DecisionLoad, desc: 'How many choices today?' },
  { id: 'ego-depletion', name: 'Ego Depletion Monitor', component: ClinicalDM.EgoDepletion, desc: 'Willpower runs out' },
  { id: 'decision-timeline', name: 'Decision Timeline Mapping', component: ClinicalDM.DecisionTimeline, desc: 'When you decide best' },
  { id: 'willpower-reserve', name: 'Willpower Reserve Gauge', component: ClinicalDM.WillpowerReserve, desc: 'Self-control capacity left' },
  { id: 'decision-quality', name: 'Decision Quality Over Time', component: ClinicalDM.DecisionQuality, desc: 'Decisions degrade with fatigue' },
  { id: 'cognitive-load', name: 'Cognitive Load Assessment', component: ClinicalDM.CognitiveLoad, desc: 'Mental bandwidth check' },
  { id: 'decision-batching', name: 'Decision Batching Strategy', component: ClinicalDM.DecisionBatching, desc: 'Group similar decisions' },
  { id: 'automation', name: 'Automation Opportunities', component: ClinicalDM.AutomationOpportunities, desc: 'What can you automate?' },
  { id: 'routine-builder', name: 'Routine Builder for Decisions', component: ClinicalDM.RoutineBuilder, desc: 'Remove daily decisions' },
  { id: 'decision-energy', name: 'Decision Energy Management', component: ClinicalDM.DecisionEnergy, desc: 'Conserve decision resources' },
  
  // Commitment Strategies (10)
  { id: 'commitment-devices', name: 'Commitment Devices Builder', component: ClinicalDM.CommitmentDevices, desc: 'Lock yourself in' },
  { id: 'implementation-intentions', name: 'Implementation Intentions', component: ClinicalDM.ImplementationIntentions, desc: 'If-then planning' },
  { id: 'public-commitment', name: 'Public Commitment Power', component: ClinicalDM.PublicCommitment, desc: 'Tell others your plan' },
  { id: 'stakes-setting', name: 'Stakes Setting', component: ClinicalDM.StakesSetting, desc: 'Raise the cost of failure' },
  { id: 'accountability-partner', name: 'Accountability Partner System', component: ClinicalDM.AccountabilityPartner, desc: 'Someone checks on you' },
  { id: 'bridge-burning', name: 'Bridge Burning Strategy', component: ClinicalDM.BridgeBurning, desc: 'Remove the exit' },
  { id: 'future-binding', name: 'Future Self Binding', component: ClinicalDM.FutureBinding, desc: 'Constrain future you' },
  { id: 'commitment-testing', name: 'Commitment Testing', component: ClinicalDM.CommitmentTesting, desc: 'How committed are you?' },
  { id: 'ulysses-contracts', name: 'Ulysses Contracts', component: ClinicalDM.UlyssesContracts, desc: 'Tie yourself to the mast' },
  { id: 'commitment-escalation', name: 'Commitment Escalation Path', component: ClinicalDM.CommitmentEscalation, desc: 'Progressively stronger binding' },
  
  // Regret Management (10)
  { id: 'regret-anticipation', name: 'Regret Anticipation', component: ClinicalDM.RegretAnticipation, desc: 'Future regret prediction' },
  { id: 'action-inaction', name: 'Action vs Inaction Regret', component: ClinicalDM.ActionVsInactionRegret, desc: 'Which hurts more long-term?' },
  { id: 'regret-minimization', name: 'Regret Minimization Framework', component: ClinicalDM.RegretMinimization, desc: 'Decide to minimize future regret' },
  { id: 'counterfactual', name: 'Counterfactual Thinking', component: ClinicalDM.CounterfactualThinking, desc: 'What if you had chosen differently?' },
  { id: 'regret-reprocessing', name: 'Regret Reprocessing', component: ClinicalDM.RegretReprocessing, desc: 'Transform regret into wisdom' },
  { id: 'opportunity-regret', name: 'Opportunity Regret Assessment', component: ClinicalDM.OpportunityRegret, desc: 'Missed chances inventory' },
  { id: 'regret-resilience', name: 'Regret Resilience Building', component: ClinicalDM.RegretResilience, desc: 'Bounce back from bad decisions' },
  { id: 'learning-regret', name: 'Learning From Regret', component: ClinicalDM.LearningFromRegret, desc: 'Extract the lesson' },
  { id: 'regret-guilt', name: 'Regret vs Guilt Distinction', component: ClinicalDM.RegretVsGuilt, desc: 'Different emotions, different responses' },
  { id: 'regret-intensity', name: 'Regret Intensity Mapping', component: ClinicalDM.RegretIntensity, desc: 'Which regrets hurt most?' },
];

interface ClinicalDMBatchProps {
  onNavigate?: (page: string) => void;
}

export function ClinicalDMBatch({ onNavigate }: ClinicalDMBatchProps) {
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
            ← Back to DM Arsenal
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
            PILLAR DM
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Decision Mastery Arsenal
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            50 NaviCues for agency, choice architecture, decision fatigue, commitment, and regret management
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Agency</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Architecture</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Fatigue</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Commitment</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Regret</div>
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
                DM-{String(idx + 1).padStart(2, '0')}
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

export default ClinicalDMBatch;
