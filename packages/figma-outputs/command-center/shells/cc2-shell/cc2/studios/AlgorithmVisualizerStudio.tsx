import React, { useState } from 'react';
import { Brain, Zap, GitBranch, TrendingUp, Shield, Users, Database, Activity, Target } from 'lucide-react';

type ViewMode = 'overview' | 'algorithm' | 'dataflow' | 'taxonomy' | 'proof' | 'ecosystem';

interface AlgorithmVisualizerStudioProps {
  onBack?: () => void;
}

export function AlgorithmVisualizerStudio({ onBack }: AlgorithmVisualizerStudioProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');

  return (
    <div className="h-full overflow-auto" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header with Mode Selector */}
      <div className="p-8 bg-white" style={{ borderBottom: '2px solid #E0E0E0' }}>
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          The Recoverlution Algorithm
        </h1>
        <p className="text-gray-600 mb-6">
          Complete system architecture: Installation vs Information, Eight Primitives, LUMA orchestration, Proof Chain
        </p>
        
        {/* View Mode Tabs */}
        <div className="flex gap-2">
          <ModeTab active={viewMode === 'overview'} onClick={() => setViewMode('overview')} label="System Overview" />
          <ModeTab active={viewMode === 'algorithm'} onClick={() => setViewMode('algorithm')} label="Core Algorithm" />
          <ModeTab active={viewMode === 'dataflow'} onClick={() => setViewMode('dataflow')} label="Data Flow" />
          <ModeTab active={viewMode === 'taxonomy'} onClick={() => setViewMode('taxonomy')} label="Taxonomy Engine" />
          <ModeTab active={viewMode === 'proof'} onClick={() => setViewMode('proof')} label="Proof Chain" />
          <ModeTab active={viewMode === 'ecosystem'} onClick={() => setViewMode('ecosystem')} label="Ecosystem" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {viewMode === 'overview' && <SystemOverview />}
        {viewMode === 'algorithm' && <CoreAlgorithm />}
        {viewMode === 'dataflow' && <DataFlowView />}
        {viewMode === 'taxonomy' && <TaxonomyEngine />}
        {viewMode === 'proof' && <ProofChainView />}
        {viewMode === 'ecosystem' && <EcosystemView />}
      </div>
    </div>
  );
}

function ModeTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-medium text-sm transition-colors"
      style={{
        backgroundColor: active ? '#3E2BB8' : 'white',
        color: active ? 'white' : '#3E2BB8',
        border: active ? 'none' : '2px solid #E0E0E0'
      }}
    >
      {label}
    </button>
  );
}

// ============================================================================
// SYSTEM OVERVIEW
// ============================================================================

function SystemOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* The Paradigm Shift */}
      <Section title="The Paradigm Shift: Installation vs Information">
        <div className="grid grid-cols-2 gap-6">
          <ComparisonCard
            title="Traditional (Information)"
            items={[
              'Books, podcasts, data points',
              'Insight without rewiring',
              'Relapse latencies stagnant',
              'Body hijacked, story second'
            ]}
            color="#EF4444"
          />
          <ComparisonCard
            title="Recoverlution (Installation)"
            items={[
              'Continuity infrastructure',
              'Neurobiological rewiring',
              'Intervention at moment of drift',
              'Change the installation'
            ]}
            color="#22C55E"
          />
        </div>
      </Section>

      {/* Three Problems We Solve */}
      <Section title="Three Problems We Solve">
        <div className="grid grid-cols-3 gap-4">
          <ProblemCard
            title="Runaway Velocity"
            problem="World accelerates. Humans lag. Attention thins."
            solution={['Coherence under speed', 'Interventions at moment of drift', 'Shared grammar for action']}
          />
          <ProblemCard
            title="Spent Trust"
            problem="Exposure mistaken for impact. Consent thins."
            solution={['Outcome-led trust', 'Private-first intelligence', 'Auditable integrity']}
          />
          <ProblemCard
            title="Stranded Breakthroughs"
            problem="Wisdom stays local. Methods don't transfer."
            solution={['Breakthrough packaging', 'Composable blocks', 'Compounding library']}
          />
        </div>
      </Section>

      {/* Three Living Signals (The Engine) */}
      <Section title="The Engine: Three Living Signals">
        <div className="space-y-4">
          <SignalCard
            number="1"
            title="Switch On Coherence"
            subtitle="People become the platform"
            description="Cognition, behaviour, and identity move together in real time"
            foundation="Adaptive neuroscience + commons governance + composable design"
          />
          <SignalCard
            number="2"
            title="Signals That Steer"
            subtitle="On-device intelligence"
            description="Interventions arrive at the precise moment they matter"
            foundation="Intelligence lives where people are: private, personal, always-on"
          />
          <SignalCard
            number="3"
            title="Outcomes As Currency"
            subtitle="Trust that holds"
            description="Value measured in verified change, not attention"
            foundation="Cohort-level evidence, audited and actionable"
          />
        </div>
      </Section>

      {/* Platform in One Line */}
      <div className="bg-white p-8 text-center" style={{ border: '2px solid #3E2BB8' }}>
        <div className="text-sm text-gray-600 mb-2">THE PLATFORM IN ONE LINE</div>
        <div className="text-2xl font-bold" style={{ color: '#3E2BB8' }}>
          An operating system for human change:
        </div>
        <div className="text-xl mt-2 text-gray-700">
          private, adaptive, composable, and auditable
        </div>
        <div className="text-sm mt-4 text-gray-600">
          so progress compounds across people and systems
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CORE ALGORITHM
// ============================================================================

function CoreAlgorithm() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Operating Truth */}
      <Section title="Operating Truth">
        <div className="bg-white p-8" style={{ border: '2px solid #3E2BB8' }}>
          <div className="text-2xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
            Momentum increases when:
          </div>
          <div className="grid grid-cols-2 gap-6 text-lg">
            <div>
              <div className="font-semibold text-green-600 mb-2">MAXIMIZE ↑</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span><strong>Coherence (κ):</strong> Chosen Focus ÷ Available Focus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span><strong>Identity Flex (IFX):</strong> Self-story update rate</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-red-600 mb-2">MINIMIZE ↓</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-red-600" />
                  <span><strong>Spike Index (σ):</strong> Arousal bursts during focus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <span><strong>Ego Threat (ETS):</strong> Reactivity to feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-600 transform rotate-180" />
                  <span><strong>Repair Latency (τ):</strong> Time from rupture → repair</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Eight Primitives (The Installation Instruction Set) */}
      <Section title="Eight Primitives: The Installation Instruction Set">
        <div className="grid grid-cols-2 gap-4">
          <PrimitiveCard number="1" title="Orient" description="Fast read: Energy, Clarity, Connection" />
          <PrimitiveCard number="2" title="Downshift" description="Regulate first when capacity is low" />
          <PrimitiveCard number="3" title="Name the Pattern" description="Turn pain into workable map" />
          <PrimitiveCard number="4" title="Make the Next Move" description="One action small enough to be repeatable" />
          <PrimitiveCard number="5" title="Capture the Receipt" description="Proof that nervous system believes" />
          <PrimitiveCard number="6" title="Transfer Test" description="Does it hold in new context?" />
          <PrimitiveCard number="7" title="Repair" description="After miss, restore dignity and function" />
          <PrimitiveCard number="8" title="Witness" description="Consent-based co-regulation" />
        </div>
      </Section>

      {/* North Star Metric */}
      <div className="bg-white p-8 text-center" style={{ border: '2px solid #5739FB' }}>
        <div className="text-sm text-gray-600 mb-2">NORTH STAR METRIC</div>
        <div className="text-3xl font-bold mb-2" style={{ color: '#5739FB' }}>
          MTTR (Mean Time To Return)
        </div>
        <div className="text-lg text-gray-700">
          Time from dysregulation or rupture → back to baseline and values-aligned action
        </div>
      </div>

      {/* LUMA Decision Flow */}
      <Section title="LUMA Orchestration: Moment-to-Moment Decision Engine">
        <LUMAFlowDiagram />
      </Section>
    </div>
  );
}

// ============================================================================
// DATA FLOW VIEW
// ============================================================================

function DataFlowView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Section title="Real-Time Data Flow Architecture">
        <div className="bg-white p-8" style={{ border: '2px solid #E0E0E0' }}>
          <DataFlowDiagram />
        </div>
      </Section>

      {/* Data Tables Mapped */}
      <Section title="Database Architecture: 100+ Tables Organized by Purpose">
        <div className="grid grid-cols-3 gap-4">
          <TableGroupCard
            title="Identity & Access"
            count={12}
            tables={['profiles', 'organizations', 'professional_assignments', 'consent_ledger', 'access_audit_log']}
          />
          <TableGroupCard
            title="Content Delivery"
            count={25}
            tables={['navicues_v2', 'blocks', 'cue_sequences', 'practices', 'articles', 'insights', 'navicue_deployments_v2', 'block_deployments', 'feed_exposures', 'delivery_registry']}
          />
          <TableGroupCard
            title="User Responses"
            count={18}
            tables={['navicue_responses_v2', 'practice_logs', 'receipts', 'user_soundbites', 'engagement_events', 'content_engagements']}
          />
          <TableGroupCard
            title="State Tracking"
            count={15}
            tables={['state_checkins', 'user_arousal_state', 'user_state_bands', 'context_detections_v24', 'user_context_state', 'user_context_events', 'hot_context_scores_v24', 'risk_windows_v24']}
          />
          <TableGroupCard
            title="Decision Engine"
            count={20}
            tables={['decision_traces', 'bandit_decisions', 'bandit_rewards', 'candidate_scores', 'decision_feature_snapshots', 'policy_registry', 'policy_evaluations', 'safety_decisions']}
          />
          <TableGroupCard
            title="Proof & Outcomes"
            count={16}
            tables={['proof_artifacts_v26', 'proof_chain_links_v26', 'proof_scores_v26', 'proof_scores_by_scope_v26', 'transfer_test_results', 'context_transfer_results_v24', 'recovery_trajectory_snapshots']}
          />
          <TableGroupCard
            title="Journey System"
            count={12}
            tables={['journey_instances', 'journey_template', 'journey_template_scenes', 'journey_scene_events', 'journey_audio_events', 'journey_resistance_checks', 'journey_scene_captures']}
          />
          <TableGroupCard
            title="Taxonomy Engine"
            count={14}
            tables={['schema_catalog', 'mindblocks', 'mindblock_families', 'pillars', 'concepts', 'themes', 'content_registry', 'content_targets', 'navicue_targets_v2']}
          />
          <TableGroupCard
            title="Universal Stream"
            count={8}
            tables={['event_spine', 'notifications_outbox', 'notification_deliveries', 'access_audit_log', 'audit_edge_requests']}
          />
        </div>
      </Section>

      {/* Write Flow Example */}
      <Section title="Example: NaviCue Response Data Flow">
        <ResponseFlowExample />
      </Section>
    </div>
  );
}

// ============================================================================
// TAXONOMY ENGINE
// ============================================================================

function TaxonomyEngine() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Taxonomy Hierarchy */}
      <Section title="The Targeting Hierarchy: From Global to Precise">
        <TaxonomyHierarchyDiagram />
      </Section>

      {/* Six Pillars */}
      <Section title="Six Clinical Pillars">
        <div className="grid grid-cols-3 gap-4">
          <PillarCard pillar="ER" title="Emotional Regulation" description="Window of tolerance, arousal management" />
          <PillarCard pillar="SR" title="Stress Resilience" description="Capacity under load, recovery speed" />
          <PillarCard pillar="SC" title="Social Connection" description="Attachment, boundaries, co-regulation" />
          <PillarCard pillar="CR" title="Cognitive Reframe" description="Belief revision, schema flexibility" />
          <PillarCard pillar="II" title="Identity Integration" description="Self-trust, values alignment" />
          <PillarCard pillar="DM" title="Decision Making" description="Impulse control, delay gratification" />
        </div>
      </Section>

      {/* Mindblock Mapping */}
      <Section title="Mindblock System: Mapping the Brain">
        <div className="bg-white p-8" style={{ border: '2px solid #E0E0E0' }}>
          <div className="mb-6">
            <div className="text-2xl font-bold mb-2" style={{ color: '#3E2BB8' }}>2,847 Total Mindblocks Mapped</div>
            <div className="text-gray-600">Specific "belief knots" or stuck loops across six pillars</div>
          </div>
          
          <div className="space-y-4">
            <MindblockProgressBar pillar="ER" knowing={1200} believing={450} embodying={180} />
            <MindblockProgressBar pillar="SR" knowing={980} believing={320} embodying={95} />
            <MindblockProgressBar pillar="SC" knowing={1050} believing={280} embodying={75} />
            <MindblockProgressBar pillar="CR" knowing={890} believing={210} embodying={62} />
            <MindblockProgressBar pillar="II" knowing={620} believing={150} embodying={48} />
            <MindblockProgressBar pillar="DM" knowing={750} believing={180} embodying={55} />
          </div>
        </div>
      </Section>

      {/* KBE Progression */}
      <Section title="KBE Progression: Knowing → Believing → Embodying">
        <div className="grid grid-cols-3 gap-4">
          <KBECard stage="Knowing" color="#EF4444" threshold={33} description="Intellectual understanding, can name the pattern" />
          <KBECard stage="Believing" color="#F59E0B" threshold={66} description="Emotional conviction, predicts outcomes accurately" />
          <KBECard stage="Embodying" color="#22C55E" threshold={100} description="Automatic behavior, transfers across contexts" />
        </div>
      </Section>
    </div>
  );
}

// ============================================================================
// PROOF CHAIN VIEW
// ============================================================================

function ProofChainView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Section title="Genesis Proof: The Ethical Currency">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6" style={{ border: '2px solid #E0E0E0' }}>
            <h3 className="font-semibold mb-4" style={{ color: '#3E2BB8' }}>Proof Principles</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 mt-1" style={{ color: '#3E2BB8' }} />
                <span><strong>User-owned signals:</strong> Privacy first, on-device</span>
              </li>
              <li className="flex items-start gap-2">
                <Database className="w-5 h-5 mt-1" style={{ color: '#3E2BB8' }} />
                <span><strong>Auditable aggregation:</strong> Cohort-level only</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-5 h-5 mt-1" style={{ color: '#3E2BB8' }} />
                <span><strong>Consent-native:</strong> User controls measurement</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 mt-1" style={{ color: '#3E2BB8' }} />
                <span><strong>Verifiable actions:</strong> Not just self-report</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6" style={{ border: '2px solid #E0E0E0' }}>
            <h3 className="font-semibold mb-4" style={{ color: '#3E2BB8' }}>What It Delivers</h3>
            <ul className="space-y-3 text-gray-700">
              <li>✓ Spent trust reverses</li>
              <li>✓ Legitimacy through measurable change</li>
              <li>✓ Investment confidence</li>
              <li>✓ Repeatable scale</li>
              <li>✓ Outcomes as currency</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Proof Chain Flow */}
      <Section title="From Action → Artifact → Chain → Score">
        <ProofChainDiagram />
      </Section>

      {/* Proof Artifact Types */}
      <Section title="Proof Artifact Types">
        <div className="grid grid-cols-4 gap-3">
          <ArtifactTypeCard type="navicue_response" description="NaviCue completed with response data" />
          <ArtifactTypeCard type="practice_log" description="Practice session with quality rating" />
          <ArtifactTypeCard type="transfer_result" description="Skill transfer to new context" />
          <ArtifactTypeCard type="context_transfer" description="Context-specific transfer test" />
          <ArtifactTypeCard type="prediction_error" description="Expectation vs reality delta" />
          <ArtifactTypeCard type="witness_confirm" description="Social witness confirmation" />
          <ArtifactTypeCard type="micro_proof" description="Voice note or introspection" />
          <ArtifactTypeCard type="journey_completion" description="Journey scene completed" />
        </div>
      </Section>
    </div>
  );
}

// ============================================================================
// ECOSYSTEM VIEW
// ============================================================================

function EcosystemView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Section title="Four-Dimensional Ecosystem: Individual · Professional · Organisation · Family">
        <div className="bg-white p-1" style={{ border: '2px solid #3E2BB8' }}>
          <div className="text-center p-6">
            <div className="text-2xl font-bold mb-2" style={{ color: '#3E2BB8' }}>The Symbiosis</div>
            <div className="text-gray-700">
              Individuals generate signals → Professionals steer with precision → 
              Organisations compound outcomes → Individuals get better environments → <strong>cycle strengthens</strong>
            </div>
          </div>
        </div>
      </Section>

      {/* Four Dimensions */}
      <div className="grid grid-cols-2 gap-6">
        <EcosystemNodeCard
          title="INDIVIDUAL"
          goal="Stability + agency + identity-level recovery"
          receives={[
            'State + NaviCues + Toolkit',
            'Blocks / Insights / Practices',
            'Wellbeing videos',
            'Journey structure (ERA)',
            'Eight Primitives instruction set'
          ]}
          produces={[
            'Living signals',
            'Proof events',
            'Micro-wins',
            'Practice logs',
            'Transfer tests'
          ]}
        />
        
        <EcosystemNodeCard
          title="PROFESSIONAL"
          goal="Precision help without burnout, liability, or guesswork"
          receives={[
            'Shared grammar (Eight Primitives)',
            'Cohort lenses',
            'Verified progress (proof events)',
            'Safety alerts',
            'Session-prep summaries (MTTR deltas)'
          ]}
          produces={[
            'Calibrated interventions',
            'Content paths',
            'Care workflows',
            'Supervision notes',
            'Steerage data to LUMA'
          ]}
        />
        
        <EcosystemNodeCard
          title="ORGANISATION"
          goal="Trustable outcomes at scale"
          receives={[
            'Cohort evidence',
            'Governance + audit trails',
            'Adoption through dignity',
            'ROI metrics',
            'Alumni microsites'
          ]}
          produces={[
            'Investment confidence',
            'System-level upgrades',
            'Policy evidence',
            'Scaled legitimacy',
            'Non-linear scaling'
          ]}
        />
        
        <EcosystemNodeCard
          title="FAMILY (B2C)"
          goal="Relational repair + boundary sovereignty"
          receives={[
            'Loved One Journeys (tailored ERA)',
            'Co-Regulation Contracts',
            'Safe-Face Gallery (peer support)',
            'Eight Primitives (same instruction set)',
            'Educational content (neuroscience)'
          ]}
          produces={[
            'Relational stability',
            'Reduced codependency',
            'Boundary clarity',
            'System-level healing'
          ]}
        />
      </div>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#3E2BB8' }}>{title}</h2>
      {children}
    </div>
  );
}

function ComparisonCard({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="bg-white p-6" style={{ border: `2px solid ${color}` }}>
      <h3 className="font-bold mb-4" style={{ color }}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProblemCard({ title, problem, solution }: { title: string; problem: string; solution: string[] }) {
  return (
    <div className="bg-white p-6" style={{ border: '2px solid #E0E0E0' }}>
      <h3 className="font-bold mb-2" style={{ color: '#3E2BB8' }}>{title}</h3>
      <div className="text-sm text-red-600 mb-4"><strong>Problem:</strong> {problem}</div>
      <div className="text-sm text-gray-600"><strong>We deliver:</strong></div>
      <ul className="mt-2 space-y-1 text-sm text-gray-700">
        {solution.map((s, idx) => (
          <li key={idx}>• {s}</li>
        ))}
      </ul>
    </div>
  );
}

function SignalCard({ number, title, subtitle, description, foundation }: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  foundation: string;
}) {
  return (
    <div className="bg-white p-6 flex items-start gap-4" style={{ border: '2px solid #E0E0E0' }}>
      <div className="text-4xl font-bold" style={{ color: '#3E2BB8' }}>{number}</div>
      <div className="flex-1">
        <h3 className="font-bold text-lg" style={{ color: '#3E2BB8' }}>{title}</h3>
        <div className="text-sm text-gray-600 mb-2">{subtitle}</div>
        <div className="text-gray-700 mb-2">{description}</div>
        <div className="text-sm text-gray-600"><strong>Foundation:</strong> {foundation}</div>
      </div>
    </div>
  );
}

function PrimitiveCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white p-4 flex items-center gap-3" style={{ border: '2px solid #E0E0E0' }}>
      <div className="text-2xl font-bold" style={{ color: '#3E2BB8' }}>{number}</div>
      <div>
        <div className="font-semibold" style={{ color: '#3E2BB8' }}>{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}

function LUMAFlowDiagram() {
  return (
    <div className="space-y-4">
      <FlowBox label="INPUTS" items={[
        'State signals (arousal, focus, context)',
        'Taxonomy (pillar → schema → family → mindblock)',
        'Proof history (KBE progress)',
        'Consent rules',
        'Safety constraints'
      ]} color="#3E2BB8" />
      <Arrow />
      <FlowBox label="LUMA ORCHESTRATION" items={[
        'Explainable JITAI (Just-In-Time Adaptive Intervention)',
        'Why now transparency',
        'Safety-first routing',
        'Bandit arm selection',
        'Decision trace logging'
      ]} color="#5739FB" />
      <Arrow />
      <FlowBox label="OUTPUTS" items={[
        'NaviCue (now)',
        'Block / Insight (learn)',
        'Practice (do)',
        'Wellbeing Video (regulate)',
        'Toolkit injection (save/reuse)'
      ]} color="#3E2BB8" />
    </div>
  );
}

function DataFlowDiagram() {
  const steps = [
    { label: 'Individual Interaction', desc: 'NaviCue tap, practice complete, state check-in' },
    { label: 'Event Spine Write', desc: 'Universal timeline + event_spine + proof_artifacts_v26' },
    { label: 'LUMA Decision', desc: 'Analyzes state, context, proof → selects next move' },
    { label: 'Decision Trace', desc: 'Logged to decision_traces with features + candidates' },
    { label: 'Realtime Broadcast', desc: 'Push to user:{id}:feed channel' },
    { label: 'Next Move Delivered', desc: 'Content served with "why now" explanation' },
    { label: 'User Response', desc: 'Captured in *_responses tables + proof_artifacts_v26' },
    { label: 'Bandit Update', desc: 'Reward signal updates bandit_rewards, candidate_scores' },
    { label: 'Proof Aggregation', desc: 'proof_scores_v26 updated, KBE progression calculated' }
  ];

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-4 p-4" style={{ backgroundColor: '#FAFAFA', border: '2px solid #E0E0E0' }}>
            <div className="w-8 h-8 flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#3E2BB8' }}>
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="font-semibold" style={{ color: '#3E2BB8' }}>{step.label}</div>
              <div className="text-sm text-gray-600">{step.desc}</div>
            </div>
          </div>
          {idx < steps.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </div>
  );
}

function ResponseFlowExample() {
  return (
    <div className="bg-white p-6" style={{ border: '2px solid #E0E0E0' }}>
      <div className="font-semibold mb-4" style={{ color: '#3E2BB8' }}>
        What happens when a user completes a NaviCue:
      </div>
      <div className="space-y-2 text-sm font-mono text-gray-700">
        <div>1. POST /v1-ingest/navicue-response → make-server-49b28b8a</div>
        <div className="ml-4">├─ INSERT navicue_responses_v2</div>
        <div className="ml-4">├─ TRIGGER → INSERT event_spine (event_type: completed)</div>
        <div className="ml-4">├─ TRIGGER → INSERT proof_artifacts_v26 (artifact_type: navicue_response)</div>
        <div className="ml-4">├─ CALL get_next_feed_item(user_id) RPC</div>
        <div className="ml-8">│  ├─ SELECT FROM user_arousal_state WHERE user_id</div>
        <div className="ml-8">│  ├─ SELECT FROM user_context_state WHERE user_id</div>
        <div className="ml-8">│  ��─ SELECT FROM proof_scores_v26 WHERE individual_id</div>
        <div className="ml-8">│  ├─ RUN bandit_decisions logic</div>
        <div className="ml-8">│  └─ RETURN next_content_id with decision_trace_id</div>
        <div className="ml-4">├─ INSERT decision_traces</div>
        <div className="ml-4">├─ INSERT decision_feature_snapshots</div>
        <div className="ml-4">├─ INSERT candidate_scores (all scored alternatives)</div>
        <div className="ml-4">├─ BROADCAST realtime.send(user:&#123;id&#125;:feed, 'navicue_completed')</div>
        <div className="ml-4">└─ RETURN &#123;&quot;next&quot;: &#123;...&#125;, &quot;recorded&quot;: &#123;...&#125;&#125;</div>
        <div className="mt-4">2. Background (async via pg_cron or pgmq):</div>
        <div className="ml-4">├─ UPDATE proof_scores_v26 aggregates</div>
        <div className="ml-4">├─ UPDATE bandit_rewards with outcome signal</div>
        <div className="ml-4">└─ REFRESH user_feed_queue_v2</div>
      </div>
    </div>
  );
}

function TaxonomyHierarchyDiagram() {
  return (
    <div className="bg-white p-8" style={{ border: '2px solid #E0E0E0' }}>
      <div className="space-y-6">
        <TaxLevel level="Pillar" count={6} examples={['ER', 'SR', 'SC', 'CR', 'II', 'DM']} description="Top-level clinical domains" />
        <DownArrow />
        <TaxLevel level="Concept" count={~40} examples={['Window of Tolerance', 'Attachment Patterns', 'Cognitive Distortions']} description="Categories within pillars" />
        <DownArrow />
        <TaxLevel level="Theme" count={~150} examples={['Emotional Flooding', 'Avoidant Attachment', 'Black & White Thinking']} description="Focus areas within concepts" />
        <DownArrow />
        <TaxLevel level="Schema" count={~500} examples={['I am broken', 'People always leave', 'I must be perfect']} description="Deep psychological patterns" />
        <DownArrow />
        <TaxLevel level="Mindblock Family" count={~800} examples={['Shame spirals', 'Abandonment triggers', 'Performance anxiety']} description="Related belief clusters" />
        <DownArrow />
        <TaxLevel level="Mindblock" count={2847} examples={['Feeling unworthy when praised', 'Panic when alone', 'Freeze before decisions']} description="Specific belief knots" />
      </div>
    </div>
  );
}

function TaxLevel({ level, count, examples, description }: { level: string; count: number | string; examples: string[]; description: string }) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-32">
        <div className="font-bold" style={{ color: '#3E2BB8' }}>{level}</div>
        <div className="text-sm text-gray-600">({count})</div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-700 mb-2">{description}</div>
        <div className="flex gap-2 flex-wrap">
          {examples.map((ex, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700">{ex}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DownArrow() {
  return (
    <div className="flex justify-center">
      <div className="text-3xl" style={{ color: '#3E2BB8' }}>↓</div>
    </div>
  );
}

function PillarCard({ pillar, title, description }: { pillar: string; title: string; description: string }) {
  return (
    <div className="bg-white p-4" style={{ border: '2px solid #3E2BB8' }}>
      <div className="text-2xl font-bold mb-2" style={{ color: '#3E2BB8' }}>{pillar}</div>
      <div className="font-semibold mb-1" style={{ color: '#3E2BB8' }}>{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
}

function MindblockProgressBar({ pillar, knowing, believing, embodying }: { pillar: string; knowing: number; believing: number; embodying: number }) {
  const total = knowing + believing + embodying;
  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 font-bold" style={{ color: '#3E2BB8' }}>{pillar}</div>
        <div className="text-sm text-gray-600">{total} total mindblocks</div>
      </div>
      <div className="h-8 flex" style={{ border: '2px solid #E0E0E0' }}>
        <div 
          className="flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: '#EF4444', width: `${(knowing / total) * 100}%` }}
        >
          {knowing} Knowing
        </div>
        <div 
          className="flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: '#F59E0B', width: `${(believing / total) * 100}%` }}
        >
          {believing} Believing
        </div>
        <div 
          className="flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: '#22C55E', width: `${(embodying / total) * 100}%` }}
        >
          {embodying} Embodying
        </div>
      </div>
    </div>
  );
}

function KBECard({ stage, color, threshold, description }: { stage: string; color: string; threshold: number; description: string }) {
  return (
    <div className="text-center">
      <div className="h-24 flex items-center justify-center text-white font-bold text-xl mb-3" style={{ backgroundColor: color }}>
        {stage}
      </div>
      <div className="text-sm text-gray-600 mb-2">Threshold: {threshold}%</div>
      <div className="text-sm text-gray-700">{description}</div>
    </div>
  );
}

function ProofChainDiagram() {
  return (
    <div className="bg-white p-8" style={{ border: '2px solid #E0E0E0' }}>
      <div className="space-y-4">
        <ProofStep label="ACTION" desc="User completes NaviCue, practice, transfer test" />
        <Arrow />
        <ProofStep label="ARTIFACT" desc="proof_artifacts_v26 record created with type, source, payload" />
        <Arrow />
        <ProofStep label="CHAIN LINK" desc="proof_chain_links_v26 connects related artifacts into theme chains" />
        <Arrow />
        <ProofStep label="SCORE" desc="proof_scores_v26 aggregates by pillar, calculates KBE stage" />
        <Arrow />
        <ProofStep label="TRAJECTORY" desc="recovery_trajectory_snapshots tracks trend over time" />
      </div>
    </div>
  );
}

function ProofStep({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 p-4" style={{ backgroundColor: '#FAFAFA', border: '2px solid #E0E0E0' }}>
      <div className="font-bold" style={{ color: '#3E2BB8' }}>{label}</div>
      <div className="flex-1 text-sm text-gray-700">{desc}</div>
    </div>
  );
}

function ArtifactTypeCard({ type, description }: { type: string; description: string }) {
  return (
    <div className="bg-white p-3" style={{ border: '2px solid #E0E0E0' }}>
      <div className="text-sm font-mono mb-1" style={{ color: '#3E2BB8' }}>{type}</div>
      <div className="text-xs text-gray-600">{description}</div>
    </div>
  );
}

function TableGroupCard({ title, count, tables }: { title: string; count: number; tables: string[] }) {
  return (
    <div className="bg-white p-4" style={{ border: '2px solid #E0E0E0' }}>
      <h4 className="font-semibold mb-2" style={{ color: '#3E2BB8' }}>{title}</h4>
      <div className="text-sm text-gray-600 mb-3">{count} tables</div>
      <div className="space-y-1">
        {tables.slice(0, 5).map((table, idx) => (
          <div key={idx} className="text-xs font-mono text-gray-700">{table}</div>
        ))}
        {tables.length > 5 && <div className="text-xs text-gray-500">...and {tables.length - 5} more</div>}
      </div>
    </div>
  );
}

function EcosystemNodeCard({ title, goal, receives, produces }: {
  title: string;
  goal: string;
  receives: string[];
  produces: string[];
}) {
  return (
    <div className="bg-white p-6" style={{ border: '2px solid #3E2BB8' }}>
      <h3 className="text-xl font-bold mb-2" style={{ color: '#3E2BB8' }}>{title}</h3>
      <div className="text-sm text-gray-600 mb-4"><strong>Goal:</strong> {goal}</div>
      
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2" style={{ color: '#22C55E' }}>RECEIVES:</div>
        <ul className="space-y-1 text-sm text-gray-700">
          {receives.map((item, idx) => (
            <li key={idx}>→ {item}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <div className="text-sm font-semibold mb-2" style={{ color: '#5739FB' }}>PRODUCES:</div>
        <ul className="space-y-1 text-sm text-gray-700">
          {produces.map((item, idx) => (
            <li key={idx}>← {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FlowBox({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div className="bg-white p-6" style={{ border: `2px solid ${color}` }}>
      <div className="font-bold mb-3" style={{ color }}>{label}</div>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center">
      <div className="text-3xl" style={{ color: '#3E2BB8' }}>↓</div>
    </div>
  );
}