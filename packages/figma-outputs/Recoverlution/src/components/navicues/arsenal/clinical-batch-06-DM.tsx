/**
 * CLINICAL ARSENAL - PILLAR DM: DECISION MASTERY
 * 50 NaviCues for agency, choice architecture, decision fatigue, commitment, regret
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// AGENCY & AUTONOMY (10 NaviCues)
// ============================================================================

export function LocusOfControl() {
  const [responses, setResponses] = useState<number[]>([]);

  const scenarios = [
    'When things go wrong in my life, it is usually due to factors outside my control',
    'I am responsible for the outcomes in my life',
    'Success is mostly about being in the right place at the right time',
    'I can shape my future through my choices',
    'External forces determine what happens to me',
  ];

  const handleResponse = (idx: number, value: number) => {
    const newResponses = [...responses];
    newResponses[idx] = value;
    setResponses(newResponses);
  };

  const internalScore = responses.filter((r, i) => [1, 3].includes(i)).reduce((a, b) => a + b, 0);
  const externalScore = responses.filter((r, i) => [0, 2, 4].includes(i)).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Locus of Control</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Do you believe you control your life, or does life control you?
        </p>

        <div className="space-y-6 mb-8">
          {scenarios.map((scenario, idx) => (
            <div key={idx} className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <p className="mb-4" style={{ color: '#FFFFFF' }}>{scenario}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Disagree</span>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={responses[idx] || 4}
                  onChange={(e) => handleResponse(idx, parseInt(e.target.value))}
                  className="flex-1 mx-4"
                  style={{ accentColor: '#5739FB' }}
                />
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Agree</span>
              </div>
            </div>
          ))}
        </div>

        {responses.length === 5 && (
          <div className="p-8 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.15)' }}>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl mb-2" style={{ color: '#5739FB' }}>{internalScore}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Internal Control</div>
              </div>
              <div>
                <div className="text-3xl mb-2" style={{ color: '#FF4444' }}>{externalScore}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>External Control</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LearnedHelplessness() {
  const [attempts, setAttempts] = useState(0);
  const [gaveUp, setGaveUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Learned Helplessness Detector</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          When do you stop trying? Pattern of giving up reveals learned helplessness.
        </p>

        {!gaveUp ? (
          <div>
            <div className="text-6xl mb-8" style={{ color: '#5739FB' }}>{attempts}</div>
            <div className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Attempts made</div>
            <button
              onClick={() => setAttempts(attempts + 1)}
              className="px-8 py-4 text-lg mr-4"
              style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
            >
              Try Again
            </button>
            <button
              onClick={() => setGaveUp(true)}
              className="px-8 py-4 text-lg"
              style={{ backgroundColor: 'rgba(255, 68, 68, 0.2)', color: '#FF4444' }}
            >
              Give Up
            </button>
          </div>
        ) : (
          <div className="p-8" style={{ backgroundColor: 'rgba(255, 68, 68, 0.1)' }}>
            <div className="text-2xl mb-4" style={{ color: '#FF4444' }}>
              Gave up after {attempts} attempts
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {attempts < 3 && 'Low persistence threshold. Quick to give up.'}
              {attempts >= 3 && attempts < 10 && 'Moderate persistence. Will try but has limits.'}
              {attempts >= 10 && 'High persistence. Willing to keep trying.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Remaining DM NaviCues as placeholders
export function AgencyVsVictimhood() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Agency vs Victimhood - Coming Soon</div>;
}

export function ChoiceParalysis() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Choice Paralysis Detector - Coming Soon</div>;
}

export function AutonomySupport() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Autonomy Support Meter - Coming Soon</div>;
}

export function SelfDetermination() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Self-Determination Theory - Coming Soon</div>;
}

export function PerceivedControl() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Perceived Control Assessment - Coming Soon</div>;
}

export function EmpowermentIndex() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Empowerment Index - Coming Soon</div>;
}

export function AgenticShift() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Agentic Shift Tracker - Coming Soon</div>;
}

export function ResponsibilityAcceptance() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Responsibility Acceptance - Coming Soon</div>;
}

// CHOICE ARCHITECTURE (10 NaviCues)
export function DefaultBias() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Default Bias Detector - Coming Soon</div>;
}

export function ChoiceFraming() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Choice Framing Effects - Coming Soon</div>;
}

export function DecoyEffect() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Decoy Effect Awareness - Coming Soon</div>;
}

export function AnchoringBias() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Anchoring Bias Detector - Coming Soon</div>;
}

export function ChoiceOverload() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Choice Overload Assessment - Coming Soon</div>;
}

export function OptimalChoiceSet() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Optimal Choice Set Size - Coming Soon</div>;
}

export function ChoiceSequencing() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Choice Sequencing Strategy - Coming Soon</div>;
}

export function NudgeRecognition() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Nudge Recognition - Coming Soon</div>;
}

export function ChoiceEnvironment() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Choice Environment Design - Coming Soon</div>;
}

export function PreCommitment() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Pre-Commitment Devices - Coming Soon</div>;
}

// DECISION FATIGUE (10 NaviCues)
export function DecisionLoad() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Decision Load Tracker - Coming Soon</div>;
}

export function EgoDepletion() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Ego Depletion Monitor - Coming Soon</div>;
}

export function DecisionTimeline() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Decision Timeline Mapping - Coming Soon</div>;
}

export function WillpowerReserve() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Willpower Reserve Gauge - Coming Soon</div>;
}

export function DecisionQuality() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Decision Quality Over Time - Coming Soon</div>;
}

export function CognitiveLoad() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Cognitive Load Assessment - Coming Soon</div>;
}

export function DecisionBatching() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Decision Batching Strategy - Coming Soon</div>;
}

export function AutomationOpportunities() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Automation Opportunities - Coming Soon</div>;
}

export function RoutineBuilder() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Routine Builder for Decisions - Coming Soon</div>;
}

export function DecisionEnergy() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Decision Energy Management - Coming Soon</div>;
}

// COMMITMENT STRATEGIES (10 NaviCues)
export function CommitmentDevices() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Commitment Devices Builder - Coming Soon</div>;
}

export function ImplementationIntentions() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Implementation Intentions - Coming Soon</div>;
}

export function PublicCommitment() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Public Commitment Power - Coming Soon</div>;
}

export function StakesSetting() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Stakes Setting - Coming Soon</div>;
}

export function AccountabilityPartner() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Accountability Partner System - Coming Soon</div>;
}

export function BridgeBurning() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Bridge Burning Strategy - Coming Soon</div>;
}

export function FutureBinding() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Future Self Binding - Coming Soon</div>;
}

export function CommitmentTesting() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Commitment Testing - Coming Soon</div>;
}

export function UlyssesContracts() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Ulysses Contracts - Coming Soon</div>;
}

export function CommitmentEscalation() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Commitment Escalation Path - Coming Soon</div>;
}

// REGRET MANAGEMENT (10 NaviCues)
export function RegretAnticipation() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Regret Anticipation - Coming Soon</div>;
}

export function ActionVsInactionRegret() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Action vs Inaction Regret - Coming Soon</div>;
}

export function RegretMinimization() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Regret Minimization Framework - Coming Soon</div>;
}

export function CounterfactualThinking() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Counterfactual Thinking - Coming Soon</div>;
}

export function RegretReprocessing() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Regret Reprocessing - Coming Soon</div>;
}

export function OpportunityRegret() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Opportunity Regret Assessment - Coming Soon</div>;
}

export function RegretResilience() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Regret Resilience Building - Coming Soon</div>;
}

export function LearningFromRegret() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Learning From Regret - Coming Soon</div>;
}

export function RegretVsGuilt() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Regret vs Guilt Distinction - Coming Soon</div>;
}

export function RegretIntensity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Regret Intensity Mapping - Coming Soon</div>;
}

const ClinicalDM = {
  // Agency & Autonomy (10)
  LocusOfControl,
  LearnedHelplessness,
  AgencyVsVictimhood,
  ChoiceParalysis,
  AutonomySupport,
  SelfDetermination,
  PerceivedControl,
  EmpowermentIndex,
  AgenticShift,
  ResponsibilityAcceptance,
  
  // Choice Architecture (10)
  DefaultBias,
  ChoiceFraming,
  DecoyEffect,
  AnchoringBias,
  ChoiceOverload,
  OptimalChoiceSet,
  ChoiceSequencing,
  NudgeRecognition,
  ChoiceEnvironment,
  PreCommitment,
  
  // Decision Fatigue (10)
  DecisionLoad,
  EgoDepletion,
  DecisionTimeline,
  WillpowerReserve,
  DecisionQuality,
  CognitiveLoad,
  DecisionBatching,
  AutomationOpportunities,
  RoutineBuilder,
  DecisionEnergy,
  
  // Commitment Strategies (10)
  CommitmentDevices,
  ImplementationIntentions,
  PublicCommitment,
  StakesSetting,
  AccountabilityPartner,
  BridgeBurning,
  FutureBinding,
  CommitmentTesting,
  UlyssesContracts,
  CommitmentEscalation,
  
  // Regret Management (10)
  RegretAnticipation,
  ActionVsInactionRegret,
  RegretMinimization,
  CounterfactualThinking,
  RegretReprocessing,
  OpportunityRegret,
  RegretResilience,
  LearningFromRegret,
  RegretVsGuilt,
  RegretIntensity,
};

export default ClinicalDM;
