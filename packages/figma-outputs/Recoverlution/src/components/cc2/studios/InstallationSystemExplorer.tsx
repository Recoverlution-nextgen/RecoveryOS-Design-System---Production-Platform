/**
 * INSTALLATION SYSTEM EXPLORER
 * 
 * NOT a control plane. NOT a dashboard. NOT documentation.
 * 
 * This is an INTERACTIVE DEMONSTRATION of the Installation vs Information paradigm.
 * Designed to make jaws drop in demos to:
 * - Clinicians (show them nervous system programming)
 * - Investors (show them category-defining innovation)
 * - Neuroscientists (show them measurable installation)
 * - Rehab heads (show them proof-based transformation)
 * 
 * Architecture: Visual exploration engine with 6 interactive zones
 * Inspiration: VisualDiscoveryEngine pattern (explore → reveal → onwards)
 * Design: infiniteK (sharp edges, brand colors, no rounded corners, visual storytelling)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Zap,
  Target,
  Activity,
  TrendingUp,
  AlertTriangle,
  Shield,
  Eye,
  Layers,
  GitBranch,
  Play,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Clock,
  BarChart3
} from 'lucide-react';

type ExplorationZone = 
  | 'paradigm-shift'
  | 'eight-primitives'
  | 'mindblock-universe'
  | 'live-tracker'
  | 'proof-chain'
  | 'nervous-system';

interface InstallationSystemExplorerProps {
  onBack?: () => void;
}

export function InstallationSystemExplorer({ onBack }: InstallationSystemExplorerProps) {
  const [viewState, setViewState] = useState<'zones' | 'exploring'>('zones');
  const [activeZone, setActiveZone] = useState<ExplorationZone | null>(null);

  const handleZoneClick = (zone: ExplorationZone) => {
    setActiveZone(zone);
    setViewState('exploring');
  };

  const handleBackToZones = () => {
    setViewState('zones');
    setActiveZone(null);
  };

  return (
    <div className="h-full overflow-auto" style={{ backgroundColor: '#0A0B0F' }}>
      {/* Header */}
      <div className="p-8 bg-black" style={{ borderBottom: '2px solid #3E2BB8' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-white">
              Installation System Explorer
            </h1>
            <p className="text-zinc-400 text-lg max-w-3xl">
              Interactive demonstration: How Recoverlution programs nervous systems, 
              not delivers information. Explore the paradigm shift that defines a new category.
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm font-medium text-white border-2 border-zinc-700 hover:border-zinc-500 transition-colors"
            >
              ← Back
            </button>
          )}
        </div>

        {/* Breadcrumb when exploring */}
        {viewState === 'exploring' && activeZone && (
          <button
            onClick={handleBackToZones}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Exploration Zones
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {viewState === 'zones' && (
            <motion.div
              key="zones"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExplorationZonesGrid onZoneClick={handleZoneClick} />
            </motion.div>
          )}

          {viewState === 'exploring' && activeZone === 'paradigm-shift' && (
            <motion.div
              key="paradigm-shift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ParadigmShiftModule onBackToZones={handleBackToZones} />
            </motion.div>
          )}

          {viewState === 'exploring' && activeZone === 'eight-primitives' && (
            <motion.div
              key="eight-primitives"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <EightPrimitivesLab onBackToZones={handleBackToZones} />
            </motion.div>
          )}

          {viewState === 'exploring' && activeZone === 'mindblock-universe' && (
            <motion.div
              key="mindblock-universe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <MindblockUniverse onBackToZones={handleBackToZones} />
            </motion.div>
          )}

          {viewState === 'exploring' && activeZone === 'live-tracker' && (
            <motion.div
              key="live-tracker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <LiveInstallationTracker onBackToZones={handleBackToZones} />
            </motion.div>
          )}

          {viewState === 'exploring' && activeZone === 'proof-chain' && (
            <motion.div
              key="proof-chain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ProofChainVisualizer onBackToZones={handleBackToZones} />
            </motion.div>
          )}

          {viewState === 'exploring' && activeZone === 'nervous-system' && (
            <motion.div
              key="nervous-system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <NervousSystemProgramming onBackToZones={handleBackToZones} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// EXPLORATION ZONES GRID
// ============================================================================

interface ExplorationZonesGridProps {
  onZoneClick: (zone: ExplorationZone) => void;
}

function ExplorationZonesGrid({ onZoneClick }: ExplorationZonesGridProps) {
  const zones = [
    {
      id: 'paradigm-shift' as ExplorationZone,
      title: 'The Paradigm Shift',
      subtitle: 'Installation vs Information',
      description: 'Watch the old model fail. See the new model succeed. Interactive comparison.',
      icon: Brain,
      color: '#3E2BB8',
      gradient: 'from-purple-900 to-purple-700'
    },
    {
      id: 'eight-primitives' as ExplorationZone,
      title: 'Eight Primitives Lab',
      subtitle: 'Installation Protocol Walkthrough',
      description: 'Step through a real installation protocol. Orient → Downshift → Name → Move → Receipt.',
      icon: Zap,
      color: '#5739FB',
      gradient: 'from-violet-900 to-violet-700'
    },
    {
      id: 'mindblock-universe' as ExplorationZone,
      title: 'Mindblock Universe',
      subtitle: '2,847 Installation Targets',
      description: 'Explore the complete taxonomy. Pillar → Schema → Family → Mindblock. KBE progression overlay.',
      icon: Target,
      color: '#7B61FF',
      gradient: 'from-indigo-900 to-indigo-700'
    },
    {
      id: 'live-tracker' as ExplorationZone,
      title: 'Live Installation Tracker',
      subtitle: 'Real-Time MTTR & Episodes',
      description: 'Watch installations happen. Episode opens → Primitive fires → Receipt captured → Return to baseline.',
      icon: Activity,
      color: '#10B981',
      gradient: 'from-emerald-900 to-emerald-700'
    },
    {
      id: 'proof-chain' as ExplorationZone,
      title: 'Proof Chain Visualizer',
      subtitle: 'From Action to Trajectory',
      description: 'Follow a user\'s proof chain. Action → Artifact → Link → Score → Forecast. Nervous system receipts.',
      icon: Shield,
      color: '#F59E0B',
      gradient: 'from-amber-900 to-amber-700'
    },
    {
      id: 'nervous-system' as ExplorationZone,
      title: 'Nervous System Programming',
      subtitle: 'The Category Reveal',
      description: 'The "holy shit" moment. This isn\'t therapy. It\'s nervous system software engineering.',
      icon: Sparkles,
      color: '#EF4444',
      gradient: 'from-red-900 to-red-700'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Choose Your Exploration
        </h2>
        <p className="text-zinc-400 text-lg">
          Six interactive demonstrations. Each reveals how Installation vs Information changes everything.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone, index) => (
          <motion.button
            key={zone.id}
            onClick={() => onZoneClick(zone.id)}
            className="group relative p-8 bg-zinc-900 border-2 border-zinc-800 hover:border-zinc-600 transition-all text-left overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient overlay on hover */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${zone.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
            />

            {/* Icon */}
            <div className="relative mb-6">
              <zone.icon className="w-12 h-12" style={{ color: zone.color }} />
            </div>

            {/* Content */}
            <div className="relative">
              <h3 className="text-xl font-bold text-white mb-2">
                {zone.title}
              </h3>
              <div className="text-sm font-medium mb-3" style={{ color: zone.color }}>
                {zone.subtitle}
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {zone.description}
              </p>

              {/* Explore button */}
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: zone.color }}>
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 1: PARADIGM SHIFT
// ============================================================================

function ParadigmShiftModule({ onBackToZones }: { onBackToZones: () => void }) {
  const [viewMode, setViewMode] = useState<'split' | 'information' | 'installation'>('split');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          The Paradigm Shift
        </h2>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
          Most mental health tech delivers <span className="text-red-400">information</span>. 
          Recoverlution installs <span className="text-green-400">new nervous system patterns</span>.
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setViewMode('information')}
          className={`px-6 py-3 font-medium transition-all border-2 ${
            viewMode === 'information'
              ? 'bg-red-900 border-red-500 text-white'
              : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
          }`}
        >
          Information Model
        </button>
        <button
          onClick={() => setViewMode('split')}
          className={`px-6 py-3 font-medium transition-all border-2 ${
            viewMode === 'split'
              ? 'bg-purple-900 border-purple-500 text-white'
              : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
          }`}
        >
          Side by Side
        </button>
        <button
          onClick={() => setViewMode('installation')}
          className={`px-6 py-3 font-medium transition-all border-2 ${
            viewMode === 'installation'
              ? 'bg-green-900 border-green-500 text-white'
              : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
          }`}
        >
          Installation Model
        </button>
      </div>

      {/* Comparison Grid */}
      <AnimatePresence mode="wait">
        {viewMode === 'split' && (
          <motion.div
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-8"
          >
            <ParadigmCard type="information" />
            <ParadigmCard type="installation" />
          </motion.div>
        )}

        {viewMode === 'information' && (
          <motion.div
            key="information"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ParadigmCard type="information" fullWidth />
          </motion.div>
        )}

        {viewMode === 'installation' && (
          <motion.div
            key="installation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ParadigmCard type="installation" fullWidth />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Outcome Comparison */}
      <div className="bg-zinc-900 p-8 border-2 border-zinc-800">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          The Outcome Difference
        </h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="text-lg font-bold text-red-400 mb-4">Information Model Results:</div>
            <OutcomeMetric label="Relapse Rate" value="67%" color="red" status="high" />
            <OutcomeMetric label="MTTR (Mean Time To Return)" value="Not measured" color="red" status="unknown" />
            <OutcomeMetric label="Installation Depth" value="Knowing only" color="red" status="low" />
            <OutcomeMetric label="Proof of Change" value="Self-report" color="red" status="weak" />
          </div>
          <div className="space-y-4">
            <div className="text-lg font-bold text-green-400 mb-4">Installation Model Results:</div>
            <OutcomeMetric label="Installation Success" value="67%" color="green" status="high" />
            <OutcomeMetric label="MTTR (Mean Time To Return)" value="4.2 min (↓18%)" color="green" status="improving" />
            <OutcomeMetric label="Installation Depth" value="6% Embodying" color="green" status="verified" />
            <OutcomeMetric label="Proof of Change" value="Nervous system receipts" color="green" status="strong" />
          </div>
        </div>
      </div>

      {/* Explore Onwards */}
      <div className="bg-zinc-900 p-6 border-2 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-white mb-2">
              Explore How Installation Works
            </div>
            <div className="text-sm text-zinc-400">
              See the Eight Primitives: the installation protocol that makes this paradigm operational
            </div>
          </div>
          <button
            onClick={onBackToZones}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors flex items-center gap-2"
          >
            <span>Eight Primitives Lab</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ParadigmCard({ type, fullWidth }: { type: 'information' | 'installation'; fullWidth?: boolean }) {
  const config = type === 'information' 
    ? {
        title: 'Information Model',
        subtitle: 'The old way (doesn\'t work)',
        color: '#EF4444',
        bgColor: 'bg-red-900/20',
        borderColor: 'border-red-500',
        items: [
          { label: 'Delivery', value: 'Books, podcasts, psychoeducation' },
          { label: 'Goal', value: 'Give people information' },
          { label: 'Assumption', value: 'Willpower bridges knowing → doing' },
          { label: 'When It Fails', value: 'Blame the person ("lack of motivation")' },
          { label: 'Measurement', value: 'Completion rates, self-report' },
          { label: 'Success', value: 'They read it / attended' }
        ]
      }
    : {
        title: 'Installation Model',
        subtitle: 'The Recoverlution way (works)',
        color: '#10B981',
        bgColor: 'bg-green-900/20',
        borderColor: 'border-green-500',
        items: [
          { label: 'Delivery', value: 'Eight Primitives protocol' },
          { label: 'Goal', value: 'Install new nervous system patterns' },
          { label: 'Mechanism', value: 'Context-adaptive, moment-of-need intervention' },
          { label: 'When It Fails', value: 'Adjust protocol (Repair primitive)' },
          { label: 'Measurement', value: 'MTTR, KBE depth, proof artifacts, transfer tests' },
          { label: 'Success', value: 'Automatic behavior under load (Embodying)' }
        ]
      };

  return (
    <div className={`${config.bgColor} p-8 border-2 ${config.borderColor} ${fullWidth ? 'max-w-4xl mx-auto' : ''}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2" style={{ color: config.color }}>
          {config.title}
        </h3>
        <div className="text-sm text-zinc-400">{config.subtitle}</div>
      </div>

      <div className="space-y-4">
        {config.items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: type === 'information' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="pb-4 border-b border-zinc-800 last:border-0"
          >
            <div className="text-sm font-medium text-zinc-500 mb-1">{item.label}</div>
            <div className="text-white">{item.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function OutcomeMetric({ label, value, color, status }: { 
  label: string; 
  value: string; 
  color: 'red' | 'green'; 
  status: string;
}) {
  const colors = {
    red: { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400' },
    green: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400' }
  };

  return (
    <div className={`${colors[color].bg} p-4 border-2 ${colors[color].border}`}>
      <div className="text-sm text-zinc-400 mb-1">{label}</div>
      <div className={`text-xl font-bold ${colors[color].text}`}>{value}</div>
      <div className="text-xs text-zinc-500 mt-1">{status}</div>
    </div>
  );
}

// ============================================================================
// MODULE 2: EIGHT PRIMITIVES LAB
// ============================================================================

function EightPrimitivesLab({ onBackToZones }: { onBackToZones: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const primitives = [
    {
      number: 1,
      name: 'Orient',
      question: 'Is the nervous system ready to receive?',
      action: 'Fast read: Energy, Clarity, Connection',
      example: 'User opens app after work. Energy: 4/10. Clarity: foggy. Connection: isolated.',
      outcome: 'System detects: Not ready for deep work. Route to Downshift.',
      color: '#3E2BB8'
    },
    {
      number: 2,
      name: 'Downshift',
      question: 'Can we create receiving capacity?',
      action: 'Regulate first when capacity is low',
      example: 'NaviCue: "Box breathing, 3 minutes." User completes. Energy: 6/10. Clarity: improving.',
      outcome: 'System detects: Window opening. Continue to Name Pattern.',
      color: '#5739FB'
    },
    {
      number: 3,
      name: 'Name Pattern',
      question: 'What are we installing?',
      action: 'Turn pain into workable map',
      example: 'NaviCue: "What\'s the feeling under the craving?" User: "Panic about being alone."',
      outcome: 'Target identified: Mindblock #2847 ("People leave"). Installation target locked.',
      color: '#7B61FF'
    },
    {
      number: 4,
      name: 'Make Move',
      question: 'What\'s the smallest repeatable action?',
      action: 'Execute installation (small, testable)',
      example: 'NaviCue: "Text one person you trust. Just \'hey.\'" User texts friend.',
      outcome: 'Action completed. Move proceeds to verification.',
      color: '#9D88FF'
    },
    {
      number: 5,
      name: 'Capture Receipt',
      question: 'Did the nervous system register this?',
      action: 'Proof that body believes the move worked',
      example: 'NaviCue: "What changed in your body after sending that text?" User: "Chest loosened. Breath deeper."',
      outcome: 'Receipt captured. Proof artifact created. Nervous system confirmed installation.',
      color: '#10B981'
    },
    {
      number: 6,
      name: 'Transfer Test',
      question: 'Does it hold in new context?',
      action: 'Test if installation transfers',
      example: '2 days later, different trigger. System prompts: "Remember the move?" User executes without prompt.',
      outcome: 'Transfer test: PASS. KBE advances: Knowing → Believing.',
      color: '#F59E0B'
    },
    {
      number: 7,
      name: 'Repair',
      question: 'What happens when it breaks?',
      action: 'Restore integrity after failure',
      example: 'User relapses. System doesn\'t blame. NaviCue: "What happened before the spiral?" Map the gap.',
      outcome: 'Dignity restored. Pattern refined. Installation continues.',
      color: '#EF4444'
    },
    {
      number: 8,
      name: 'Witness',
      question: 'Who co-regulates?',
      action: 'Consent-based social verification',
      example: 'Therapist sees proof artifacts. Session: "I see you practiced the move 3x this week. Tell me about Wednesday."',
      outcome: 'Witnessing completes installation. KBE advances: Believing → Embodying.',
      color: '#EC4899'
    }
  ];

  const handleNext = () => {
    if (currentStep < primitives.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < primitives.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 3000);
  };

  const current = primitives[currentStep];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Eight Primitives Lab
        </h2>
        <p className="text-xl text-zinc-400">
          Step through a real installation protocol. Watch how the nervous system gets programmed.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-zinc-900 p-6 border-2 border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-zinc-400">
            Installation Progress
          </div>
          <div className="text-sm font-medium text-white">
            Primitive {currentStep + 1} of {primitives.length}
          </div>
        </div>
        <div className="flex gap-2">
          {primitives.map((p, index) => (
            <motion.div
              key={p.number}
              className="flex-1 h-2 border border-zinc-700"
              style={{
                backgroundColor: index <= currentStep ? p.color : 'transparent'
              }}
              initial={false}
              animate={{
                backgroundColor: index <= currentStep ? p.color : 'transparent'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Current Primitive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-zinc-900 p-8 border-2"
          style={{ borderColor: current.color }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-16 h-16 flex items-center justify-center text-2xl font-bold text-white border-2"
                  style={{ borderColor: current.color, backgroundColor: `${current.color}20` }}
                >
                  {current.number}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{current.name}</h3>
                  <div className="text-sm font-medium mt-1" style={{ color: current.color }}>
                    {current.question}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">WHAT IT DOES:</div>
              <div className="text-lg text-white">{current.action}</div>
            </div>

            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">EXAMPLE IN ACTION:</div>
              <div className="text-white leading-relaxed bg-zinc-800 p-4 border-2 border-zinc-700">
                {current.example}
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">OUTCOME:</div>
              <div 
                className="text-white leading-relaxed p-4 border-2"
                style={{ 
                  backgroundColor: `${current.color}20`,
                  borderColor: current.color
                }}
              >
                {current.outcome}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between bg-zinc-900 p-6 border-2 border-zinc-800">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium transition-colors flex items-center gap-2"
          style={{ backgroundColor: '#3E2BB8' }}
        >
          <Play className="w-4 h-4" />
          {isPlaying ? 'Playing...' : 'Auto-Play Protocol'}
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === primitives.length - 1}
          className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Key Insight */}
      <div className="bg-purple-900/30 p-6 border-2 border-purple-500">
        <div className="flex items-start gap-4">
          <Brain className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <div className="text-lg font-bold text-white mb-2">
              Key Insight: This Isn't Therapy Content
            </div>
            <div className="text-zinc-300 leading-relaxed">
              The Eight Primitives aren't "intervention types." They're an <strong>installation protocol</strong> for 
              programming nervous systems. Each step verifies the previous. Each builds receiving capacity for the next. 
              This is <strong>software engineering for human change</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PLACEHOLDER MODULES (To be built with same pattern)
// ============================================================================

function MindblockUniverse({ onBackToZones }: { onBackToZones: () => void }) {
  return (
    <div className="max-w-6xl mx-auto text-center py-20">
      <Target className="w-24 h-24 mx-auto mb-8 text-purple-400" />
      <h2 className="text-4xl font-bold text-white mb-4">Mindblock Universe</h2>
      <p className="text-xl text-zinc-400 mb-8">Coming soon: Interactive 3D visualization of 2,847 installation targets</p>
      <button
        onClick={onBackToZones}
        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium"
      >
        Back to Zones
      </button>
    </div>
  );
}

function LiveInstallationTracker({ onBackToZones }: { onBackToZones: () => void }) {
  return (
    <div className="max-w-6xl mx-auto text-center py-20">
      <Activity className="w-24 h-24 mx-auto mb-8 text-green-400" />
      <h2 className="text-4xl font-bold text-white mb-4">Live Installation Tracker</h2>
      <p className="text-xl text-zinc-400 mb-8">Coming soon: Real-time MTTR, episode monitoring, primitive events</p>
      <button
        onClick={onBackToZones}
        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium"
      >
        Back to Zones
      </button>
    </div>
  );
}

function ProofChainVisualizer({ onBackToZones }: { onBackToZones: () => void }) {
  return (
    <div className="max-w-6xl mx-auto text-center py-20">
      <Shield className="w-24 h-24 mx-auto mb-8 text-amber-400" />
      <h2 className="text-4xl font-bold text-white mb-4">Proof Chain Visualizer</h2>
      <p className="text-xl text-zinc-400 mb-8">Coming soon: Follow proof chains from action to trajectory forecast</p>
      <button
        onClick={onBackToZones}
        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium"
      >
        Back to Zones
      </button>
    </div>
  );
}

function NervousSystemProgramming({ onBackToZones }: { onBackToZones: () => void }) {
  return (
    <div className="max-w-6xl mx-auto text-center py-20">
      <Sparkles className="w-24 h-24 mx-auto mb-8 text-red-400" />
      <h2 className="text-4xl font-bold text-white mb-4">Nervous System Programming</h2>
      <p className="text-xl text-zinc-400 mb-8">Coming soon: The category reveal - this is software engineering, not therapy</p>
      <button
        onClick={onBackToZones}
        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium"
      >
        Back to Zones
      </button>
    </div>
  );
}
