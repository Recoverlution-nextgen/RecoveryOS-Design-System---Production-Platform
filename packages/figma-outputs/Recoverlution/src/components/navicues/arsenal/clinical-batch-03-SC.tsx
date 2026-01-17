/**
 * CLINICAL ARSENAL - PILLAR SC: SOCIAL CONNECTIVITY
 * 50 NaviCues for attachment, mentalization, empathy, belonging, co-regulation
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// ATTACHMENT PATTERNS (10 NaviCues)
// ============================================================================

export function AttachmentStyleMapper() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  
  const questions = [
    { id: 'q1', text: 'When stressed, I...', options: ['Reach out to others', 'Withdraw and self-soothe', 'Become anxious about connection', 'Feel numb'] },
    { id: 'q2', text: 'In relationships, I...', options: ['Feel secure and comfortable', 'Keep emotional distance', 'Fear abandonment', 'Feel detached'] },
    { id: 'q3', text: 'Conflict makes me...', options: ['Want to talk it through', 'Need space to process', 'Panic about losing them', 'Shut down emotionally'] },
  ];

  const getStyle = () => {
    const values = Object.values(selections);
    if (values.length < 3) return null;
    if (values.filter(v => v.includes('secure') || v.includes('Reach out') || v.includes('talk')).length >= 2) return 'Secure';
    if (values.filter(v => v.includes('distance') || v.includes('space')).length >= 2) return 'Avoidant';
    if (values.filter(v => v.includes('anxious') || v.includes('Fear') || v.includes('Panic')).length >= 2) return 'Anxious';
    return 'Disorganized';
  };

  const style = getStyle();

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Attachment Style Mapper</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          How you bond. How you connect. Your relational blueprint.
        </p>

        <div className="space-y-8 mb-8">
          {questions.map((q) => (
            <div key={q.id}>
              <div className="mb-4" style={{ color: '#FFFFFF' }}>{q.text}</div>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelections({ ...selections, [q.id]: option })}
                    className="p-4 text-sm transition-all duration-200"
                    style={{
                      backgroundColor: selections[q.id] === option ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                      color: '#FFFFFF',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {style && (
          <div className="text-center p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-3xl mb-2" style={{ color: '#5739FB' }}>{style}</div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {style === 'Secure' && 'Comfortable with intimacy and autonomy'}
              {style === 'Avoidant' && 'Value independence, discomfort with closeness'}
              {style === 'Anxious' && 'Crave closeness, fear rejection'}
              {style === 'Disorganized' && 'Mixed signals, approach-avoid conflict'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SecureBaseTest() {
  const [hasSafeBase, setHasSafeBase] = useState<boolean | null>(null);
  const [reflection, setReflection] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Secure Base Test</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Do you have a person who feels like home? A safe harbor in the storm?
        </p>

        {hasSafeBase === null ? (
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setHasSafeBase(true)}
              className="p-12 transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}
            >
              <div className="text-3xl mb-4">✓</div>
              <div className="text-xl">Yes</div>
            </button>
            <button
              onClick={() => setHasSafeBase(false)}
              className="p-12 transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}
            >
              <div className="text-3xl mb-4">✗</div>
              <div className="text-xl">No</div>
            </button>
          </div>
        ) : hasSafeBase ? (
          <div className="space-y-6">
            <div className="p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-2xl mb-4" style={{ color: '#5739FB' }}>Who is it?</div>
              <input
                type="text"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Their name..."
                className="w-full p-4 text-center text-xl"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.2)',
                  border: 'none',
                  color: '#FFFFFF',
                }}
              />
            </div>
            {reflection && (
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                That connection is a gift. Protect it.
              </div>
            )}
          </div>
        ) : (
          <div className="p-8" style={{ backgroundColor: 'rgba(255, 68, 68, 0.1)' }}>
            <div className="text-xl mb-4" style={{ color: '#FF4444' }}>Building one is possible.</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              You can become your own secure base first.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function InternalWorkingModelExplorer() {
  const [beliefs, setBeliefs] = useState({
    self: 5,
    others: 5,
  });

  const getQuadrant = () => {
    if (beliefs.self >= 5 && beliefs.others >= 5) return 'Secure';
    if (beliefs.self >= 5 && beliefs.others < 5) return 'Dismissive';
    if (beliefs.self < 5 && beliefs.others >= 5) return 'Preoccupied';
    return 'Fearful';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Internal Working Model</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Your core beliefs about self and others determine attachment style.
        </p>

        <div className="space-y-8 mb-8">
          <div>
            <div className="mb-2" style={{ color: '#FFFFFF' }}>View of Self (Am I worthy?)</div>
            <input
              type="range"
              min="0"
              max="10"
              value={beliefs.self}
              onChange={(e) => setBeliefs({ ...beliefs, self: parseInt(e.target.value) })}
              className="w-full h-2"
              style={{ accentColor: '#5739FB' }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              <span>Unworthy</span>
              <span>Worthy</span>
            </div>
          </div>

          <div>
            <div className="mb-2" style={{ color: '#FFFFFF' }}>View of Others (Are they reliable?)</div>
            <input
              type="range"
              min="0"
              max="10"
              value={beliefs.others}
              onChange={(e) => setBeliefs({ ...beliefs, others: parseInt(e.target.value) })}
              className="w-full h-2"
              style={{ accentColor: '#5739FB' }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              <span>Unreliable</span>
              <span>Reliable</span>
            </div>
          </div>
        </div>

        <div className="text-center p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-2" style={{ color: '#5739FB' }}>{getQuadrant()}</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Self: {beliefs.self}/10 | Others: {beliefs.others}/10
          </div>
        </div>
      </div>
    </div>
  );
}

export function EarnedSecureAttachment() {
  const [phase, setPhase] = useState(0);
  const phases = [
    'Recognize your pattern',
    'Understand its origin',
    'Challenge old beliefs',
    'Practice new behaviors',
    'Build secure relationships',
    'Earned security',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Earned Secure Attachment</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          You were not born secure. But you can become it.
        </p>

        <div className="space-y-4 mb-8">
          {phases.map((p, idx) => (
            <div
              key={p}
              className="p-6 transition-all duration-500"
              style={{
                backgroundColor: idx <= phase ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                color: idx <= phase ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
              }}
            >
              {idx + 1}. {p}
            </div>
          ))}
        </div>

        <button
          onClick={() => setPhase((prev) => (prev < phases.length - 1 ? prev + 1 : 0))}
          className="px-8 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {phase < phases.length - 1 ? 'Next Phase' : 'Start Over'}
        </button>
      </div>
    </div>
  );
}

export function ProximitySeekingBehavior() {
  const [distance, setDistance] = useState(50);
  const [comfort, setComfort] = useState(50);

  useEffect(() => {
    setComfort(100 - Math.abs(distance - 50));
  }, [distance]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Proximity Seeking</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          How close feels right? Too close = suffocation. Too far = abandonment.
        </p>

        <div className="mb-8">
          <div className="mb-4" style={{ color: '#FFFFFF' }}>Emotional Distance</div>
          <input
            type="range"
            min="0"
            max="100"
            value={distance}
            onChange={(e) => setDistance(parseInt(e.target.value))}
            className="w-full h-2"
            style={{ accentColor: '#5739FB' }}
          />
          <div className="flex justify-between text-xs mt-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            <span>Merged</span>
            <span>Separate</span>
          </div>
        </div>

        <div className="p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-3xl mb-2" style={{ color: '#5739FB' }}>Comfort: {comfort}%</div>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {distance < 30 && 'Too close. Need breathing room.'}
            {distance >= 30 && distance <= 70 && 'Just right. Secure connection.'}
            {distance > 70 && 'Too far. Feels lonely.'}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export remaining SC NaviCues as structured placeholders
export function SeparationAnxietyMeter() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Separation Anxiety Meter - Coming Soon</div>;
}

export function StrangerDangerGauge() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Stranger Danger Gauge - Coming Soon</div>;
}

export function SafeHavenDetector() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Safe Haven Detector - Coming Soon</div>;
}

export function ProtestDespairDetachment() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Protest-Despair-Detachment - Coming Soon</div>;
}

export function RepairRuptureCapacity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Repair & Rupture Capacity - Coming Soon</div>;
}

// ============================================================================
// MENTALIZATION (10 NaviCues)
// ============================================================================

export function MindReadingAccuracy() {
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const actualEmotion = 'Overwhelmed';

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Mind Reading Accuracy</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Can you accurately infer what others are feeling?
        </p>

        <div className="mb-8 p-12" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-xl mb-2" style={{ color: '#FFFFFF' }}>They said: "I'm fine."</div>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Voice tight. Eyes down. Arms crossed.</div>
        </div>

        {!revealed ? (
          <div className="space-y-4">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="What are they really feeling?"
              className="w-full p-4 text-center"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                border: '2px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            />
            <button
              onClick={() => setRevealed(true)}
              disabled={!guess}
              className="px-8 py-4"
              style={{
                backgroundColor: guess ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            >
              Check
            </button>
          </div>
        ) : (
          <div className="p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-4" style={{ color: '#5739FB' }}>They were: {actualEmotion}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              You guessed: {guess}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PerspectiveTakingExercise() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Perspective Taking Exercise - Coming Soon</div>;
}

export function TheoryOfMindTest() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Theory of Mind Test - Coming Soon</div>;
}

export function EmotionalGranularity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Emotional Granularity - Coming Soon</div>;
}

export function IntentionDetection() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Intention Detection - Coming Soon</div>;
}

export function ReflectiveFunctioning() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Reflective Functioning - Coming Soon</div>;
}

export function MentalStateLanguage() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Mental State Language - Coming Soon</div>;
}

export function OpacityOfMind() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Opacity of Mind - Coming Soon</div>;
}

export function ProjectionIdentifier() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Projection Identifier - Coming Soon</div>;
}

export function CuriousStance() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Curious Stance - Coming Soon</div>;
}

// Continue with remaining 30 NaviCues (Empathy, Belonging, Co-regulation sections)

export function CognitiveEmpathyMeter() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Cognitive Empathy Meter - Coming Soon</div>;
}

export function AffectiveEmpathyGauge() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Affective Empathy Gauge - Coming Soon</div>;
}

export function CompassionateConcern() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Compassionate Concern - Coming Soon</div>;
}

export function EmotionalContagion() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Emotional Contagion - Coming Soon</div>;
}

export function EmpathicDistress() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Empathic Distress - Coming Soon</div>;
}

export function MirrorNeuronActivation() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Mirror Neuron Activation - Coming Soon</div>;
}

export function EmpathyBurnout() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Empathy Burnout - Coming Soon</div>;
}

export function SelfOtherDifferentiation() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Self-Other Differentiation - Coming Soon</div>;
}

export function AffectiveResonance() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Affective Resonance - Coming Soon</div>;
}

export function EmpathyVsSympathy() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Empathy vs Sympathy - Coming Soon</div>;
}

export function BelongingNeedMeter() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Belonging Need Meter - Coming Soon</div>;
}

export function SocialIdentityMap() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Social Identity Map - Coming Soon</div>;
}

export function TribalConnection() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Tribal Connection - Coming Soon</div>;
}

export function InGroupOutGroup() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>In-Group vs Out-Group - Coming Soon</div>;
}

export function OstracismPain() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Ostracism Pain - Coming Soon</div>;
}

export function InclusionExclusion() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Inclusion vs Exclusion - Coming Soon</div>;
}

export function CommunityAnchors() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Community Anchors - Coming Soon</div>;
}

export function LonelinessVsSolitude() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Loneliness vs Solitude - Coming Soon</div>;
}

export function MattersToSomeone() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Matters to Someone - Coming Soon</div>;
}

export function SeenHeardKnown() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Seen, Heard, Known - Coming Soon</div>;
}

export function CoRegulationCapacity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Co-Regulation Capacity - Coming Soon</div>;
}

export function MutualRegulation() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Mutual Regulation - Coming Soon</div>;
}

export function SocialBuffering() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Social Buffering - Coming Soon</div>;
}

export function CalmingPresence() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Calming Presence - Coming Soon</div>;
}

export function EmotionalSynchrony() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Emotional Synchrony - Coming Soon</div>;
}

export function BidForConnection() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Bid for Connection - Coming Soon</div>;
}

export function TurnTowardAway() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Turn Toward vs Away - Coming Soon</div>;
}

export function AttunementQuality() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Attunement Quality - Coming Soon</div>;
}

export function RelationalSafety() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Relational Safety - Coming Soon</div>;
}

export function InterconnectedNervousSystem() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Interconnected Nervous System - Coming Soon</div>;
}

// Export all as default object
const ClinicalSC = {
  // Attachment (10)
  AttachmentStyleMapper,
  SecureBaseTest,
  InternalWorkingModelExplorer,
  EarnedSecureAttachment,
  ProximitySeekingBehavior,
  SeparationAnxietyMeter,
  StrangerDangerGauge,
  SafeHavenDetector,
  ProtestDespairDetachment,
  RepairRuptureCapacity,
  
  // Mentalization (10)
  MindReadingAccuracy,
  PerspectiveTakingExercise,
  TheoryOfMindTest,
  EmotionalGranularity,
  IntentionDetection,
  ReflectiveFunctioning,
  MentalStateLanguage,
  OpacityOfMind,
  ProjectionIdentifier,
  CuriousStance,
  
  // Empathy (10)
  CognitiveEmpathyMeter,
  AffectiveEmpathyGauge,
  CompassionateConcern,
  EmotionalContagion,
  EmpathicDistress,
  MirrorNeuronActivation,
  EmpathyBurnout,
  SelfOtherDifferentiation,
  AffectiveResonance,
  EmpathyVsSympathy,
  
  // Belonging (10)
  BelongingNeedMeter,
  SocialIdentityMap,
  TribalConnection,
  InGroupOutGroup,
  OstracismPain,
  InclusionExclusion,
  CommunityAnchors,
  LonelinessVsSolitude,
  MattersToSomeone,
  SeenHeardKnown,
  
  // Co-regulation (10)
  CoRegulationCapacity,
  MutualRegulation,
  SocialBuffering,
  CalmingPresence,
  EmotionalSynchrony,
  BidForConnection,
  TurnTowardAway,
  AttunementQuality,
  RelationalSafety,
  InterconnectedNervousSystem,
};

export default ClinicalSC;
