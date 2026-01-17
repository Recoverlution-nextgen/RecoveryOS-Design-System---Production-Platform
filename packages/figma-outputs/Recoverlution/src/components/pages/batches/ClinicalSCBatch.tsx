/**
 * CLINICAL SC BATCH PAGE
 * 50 Social Connectivity NaviCues from arsenal
 */

import React, { useState } from 'react';
import ClinicalSC from '../../navicues/arsenal/clinical-batch-03-SC';

const navicues = [
  // Attachment Patterns (10)
  { id: 'attachment-style', name: 'Attachment Style Mapper', component: ClinicalSC.AttachmentStyleMapper, desc: 'Secure, avoidant, anxious, or disorganized' },
  { id: 'secure-base', name: 'Secure Base Test', component: ClinicalSC.SecureBaseTest, desc: 'Do you have a safe harbor?' },
  { id: 'internal-working', name: 'Internal Working Model', component: ClinicalSC.InternalWorkingModelExplorer, desc: 'Core beliefs about self and others' },
  { id: 'earned-secure', name: 'Earned Secure Attachment', component: ClinicalSC.EarnedSecureAttachment, desc: 'Path from insecure to secure' },
  { id: 'proximity-seeking', name: 'Proximity Seeking', component: ClinicalSC.ProximitySeekingBehavior, desc: 'Optimal emotional distance' },
  { id: 'separation-anxiety', name: 'Separation Anxiety Meter', component: ClinicalSC.SeparationAnxietyMeter, desc: 'Fear of disconnection intensity' },
  { id: 'stranger-danger', name: 'Stranger Danger Gauge', component: ClinicalSC.StrangerDangerGauge, desc: 'Wariness of new connections' },
  { id: 'safe-haven', name: 'Safe Haven Detector', component: ClinicalSC.SafeHavenDetector, desc: 'Who you turn to when hurt' },
  { id: 'protest-despair', name: 'Protest-Despair-Detachment', component: ClinicalSC.ProtestDespairDetachment, desc: 'Separation response stages' },
  { id: 'repair-rupture', name: 'Repair & Rupture Capacity', component: ClinicalSC.RepairRuptureCapacity, desc: 'Healing relational breaks' },
  
  // Mentalization (10)
  { id: 'mind-reading', name: 'Mind Reading Accuracy', component: ClinicalSC.MindReadingAccuracy, desc: 'Can you infer others\' feelings?' },
  { id: 'perspective-taking', name: 'Perspective Taking Exercise', component: ClinicalSC.PerspectiveTakingExercise, desc: 'See from their view' },
  { id: 'theory-of-mind', name: 'Theory of Mind Test', component: ClinicalSC.TheoryOfMindTest, desc: 'Others have different beliefs' },
  { id: 'emotional-granularity', name: 'Emotional Granularity', component: ClinicalSC.EmotionalGranularity, desc: 'Precision in naming feelings' },
  { id: 'intention-detection', name: 'Intention Detection', component: ClinicalSC.IntentionDetection, desc: 'What motivates their behavior' },
  { id: 'reflective-functioning', name: 'Reflective Functioning', component: ClinicalSC.ReflectiveFunctioning, desc: 'Think about thinking' },
  { id: 'mental-state-language', name: 'Mental State Language', component: ClinicalSC.MentalStateLanguage, desc: 'Words for inner experience' },
  { id: 'opacity-mind', name: 'Opacity of Mind', component: ClinicalSC.OpacityOfMind, desc: 'You cannot truly know another' },
  { id: 'projection', name: 'Projection Identifier', component: ClinicalSC.ProjectionIdentifier, desc: 'Your feelings onto them' },
  { id: 'curious-stance', name: 'Curious Stance', component: ClinicalSC.CuriousStance, desc: 'Wonder vs certainty' },
  
  // Empathy (10)
  { id: 'cognitive-empathy', name: 'Cognitive Empathy Meter', component: ClinicalSC.CognitiveEmpathyMeter, desc: 'Understanding their perspective' },
  { id: 'affective-empathy', name: 'Affective Empathy Gauge', component: ClinicalSC.AffectiveEmpathyGauge, desc: 'Feeling what they feel' },
  { id: 'compassionate-concern', name: 'Compassionate Concern', component: ClinicalSC.CompassionateConcern, desc: 'Care without overwhelm' },
  { id: 'emotional-contagion', name: 'Emotional Contagion', component: ClinicalSC.EmotionalContagion, desc: 'Catching others\' emotions' },
  { id: 'empathic-distress', name: 'Empathic Distress', component: ClinicalSC.EmpathicDistress, desc: 'Overwhelmed by their pain' },
  { id: 'mirror-neuron', name: 'Mirror Neuron Activation', component: ClinicalSC.MirrorNeuronActivation, desc: 'Neurological resonance' },
  { id: 'empathy-burnout', name: 'Empathy Burnout', component: ClinicalSC.EmpathyBurnout, desc: 'Compassion fatigue warning' },
  { id: 'self-other-diff', name: 'Self-Other Differentiation', component: ClinicalSC.SelfOtherDifferentiation, desc: 'Their pain is not yours' },
  { id: 'affective-resonance', name: 'Affective Resonance', component: ClinicalSC.AffectiveResonance, desc: 'Emotional attunement quality' },
  { id: 'empathy-sympathy', name: 'Empathy vs Sympathy', component: ClinicalSC.EmpathyVsSympathy, desc: 'With them vs for them' },
  
  // Belonging (10)
  { id: 'belonging-need', name: 'Belonging Need Meter', component: ClinicalSC.BelongingNeedMeter, desc: 'Fundamental human need strength' },
  { id: 'social-identity', name: 'Social Identity Map', component: ClinicalSC.SocialIdentityMap, desc: 'Groups that define you' },
  { id: 'tribal-connection', name: 'Tribal Connection', component: ClinicalSC.TribalConnection, desc: 'Your people, your tribe' },
  { id: 'ingroup-outgroup', name: 'In-Group vs Out-Group', component: ClinicalSC.InGroupOutGroup, desc: 'Us vs them boundaries' },
  { id: 'ostracism-pain', name: 'Ostracism Pain', component: ClinicalSC.OstracismPain, desc: 'Exclusion activates physical pain' },
  { id: 'inclusion-exclusion', name: 'Inclusion vs Exclusion', component: ClinicalSC.InclusionExclusion, desc: 'Being in or out' },
  { id: 'community-anchors', name: 'Community Anchors', component: ClinicalSC.CommunityAnchors, desc: 'Social ties that ground you' },
  { id: 'loneliness-solitude', name: 'Loneliness vs Solitude', component: ClinicalSC.LonelinessVsSolitude, desc: 'Alone and lonely vs alone and content' },
  { id: 'matters-someone', name: 'Matters to Someone', component: ClinicalSC.MattersToSomeone, desc: 'Your existence matters' },
  { id: 'seen-heard', name: 'Seen, Heard, Known', component: ClinicalSC.SeenHeardKnown, desc: 'Deepest relational need' },
  
  // Co-regulation (10)
  { id: 'coregulation-capacity', name: 'Co-Regulation Capacity', component: ClinicalSC.CoRegulationCapacity, desc: 'Calm together, regulate together' },
  { id: 'mutual-regulation', name: 'Mutual Regulation', component: ClinicalSC.MutualRegulation, desc: 'Two nervous systems syncing' },
  { id: 'social-buffering', name: 'Social Buffering', component: ClinicalSC.SocialBuffering, desc: 'Presence reduces stress response' },
  { id: 'calming-presence', name: 'Calming Presence', component: ClinicalSC.CalmingPresence, desc: 'Your nervous system soothes theirs' },
  { id: 'emotional-synchrony', name: 'Emotional Synchrony', component: ClinicalSC.EmotionalSynchrony, desc: 'Moving together emotionally' },
  { id: 'bid-connection', name: 'Bid for Connection', component: ClinicalSC.BidForConnection, desc: 'Small reaches for contact' },
  { id: 'turn-toward', name: 'Turn Toward vs Away', component: ClinicalSC.TurnTowardAway, desc: 'Response to connection attempts' },
  { id: 'attunement-quality', name: 'Attunement Quality', component: ClinicalSC.AttunementQuality, desc: 'Matching emotional state' },
  { id: 'relational-safety', name: 'Relational Safety', component: ClinicalSC.RelationalSafety, desc: 'Felt security in connection' },
  { id: 'interconnected-nervous', name: 'Interconnected Nervous System', component: ClinicalSC.InterconnectedNervousSystem, desc: 'We regulate each other' },
];

interface ClinicalSCBatchProps {
  onNavigate?: (page: string) => void;
}

export function ClinicalSCBatch({ onNavigate }: ClinicalSCBatchProps) {
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
            ← Back to SC Arsenal
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
            PILLAR SC
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Social Connectivity Arsenal
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            50 NaviCues for attachment, mentalization, empathy, belonging, and co-regulation
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Attachment</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Mentalization</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Empathy</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Belonging</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Co-regulation</div>
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
                SC-{String(idx + 1).padStart(2, '0')}
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

export default ClinicalSCBatch;
