/**
 * TAXONOMY EXPLORATION ENGINE
 * 
 * NOT a data table. NOT documentation. NOT a dashboard.
 * 
 * This is an INTERACTIVE VISUAL EXPLORATION of the complete three-layer taxonomy
 * that powers the Recoverlution clinical operating system:
 * 
 * LAYER 1: Clinical Brain Map (20 Schemas → 200 Families → 2,400 Mindblocks)
 * LAYER 2: Component Types (200 → 560 Cue Types with parametric delivery specs)
 * LAYER 3: NaviCue Instances (3,000 → 10,000+ council-voiced content)
 * 
 * Design Challenge: Make INSANE COMPLEXITY feel explorable and beautiful.
 * 
 * Inspiration: VisualDiscoveryEngine pattern (same same but DIFFERENT)
 * Architecture: Multi-dimensional navigation with live connections
 * Design: infiniteK (sharp edges, brand colors #3E2BB8 and #5739FB, no rounded corners)
 * 
 * THE ANCHOR RULE: NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Target,
  Layers,
  GitBranch,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Activity,
  Sparkles,
  Filter,
  Search,
  Circle,
  Square
} from 'lucide-react';

type ExplorationMode = 
  | 'overview'         // The three layers explained
  | 'layer1-map'       // Clinical Brain Map explorer
  | 'layer2-delivery'  // Component Type / Cue Type explorer
  | 'layer3-content'   // NaviCue instance explorer
  | 'connections'      // See how layers connect
  | 'archetypes';      // The 10 routing archetypes

interface TaxonomyExplorationEngineProps {
  onBack?: () => void;
}

export function TaxonomyExplorationEngine({ onBack }: TaxonomyExplorationEngineProps) {
  const [mode, setMode] = useState<ExplorationMode>('overview');
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedMindblock, setSelectedMindblock] = useState<string | null>(null);

  return (
    <div className="h-full overflow-auto" style={{ backgroundColor: '#0A0B0F' }}>
      {/* Header */}
      <div className="p-8 bg-black" style={{ borderBottom: '2px solid #3E2BB8' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-white">
              Taxonomy Exploration Engine
            </h1>
            <p className="text-zinc-400 text-lg max-w-3xl">
              Navigate the complete three-layer system that makes LUMA 10X more precise:
              Clinical targets, delivery specifications, and council-voiced content.
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

        {/* Mode Selector */}
        <ModeSelector currentMode={mode} onModeChange={setMode} />
      </div>

      {/* Content Area */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {mode === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ThreeLayerOverview onModeChange={setMode} />
            </motion.div>
          )}

          {mode === 'layer1-map' && (
            <motion.div
              key="layer1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ClinicalBrainMapExplorer
                selectedSchema={selectedSchema}
                selectedFamily={selectedFamily}
                selectedMindblock={selectedMindblock}
                onSchemaSelect={setSelectedSchema}
                onFamilySelect={setSelectedFamily}
                onMindblockSelect={setSelectedMindblock}
              />
            </motion.div>
          )}

          {mode === 'layer2-delivery' && (
            <motion.div
              key="layer2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <DeliverySpecificationExplorer />
            </motion.div>
          )}

          {mode === 'layer3-content' && (
            <motion.div
              key="layer3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <NaviCueContentExplorer />
            </motion.div>
          )}

          {mode === 'connections' && (
            <motion.div
              key="connections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ConnectionsVisualizer />
            </motion.div>
          )}

          {mode === 'archetypes' && (
            <motion.div
              key="archetypes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ArchetypesExplorer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// MODE SELECTOR
// ============================================================================

interface ModeSelectorProps {
  currentMode: ExplorationMode;
  onModeChange: (mode: ExplorationMode) => void;
}

function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  const modes = [
    { id: 'overview' as ExplorationMode, label: 'Overview', icon: Eye },
    { id: 'layer1-map' as ExplorationMode, label: 'Brain Map', icon: Brain },
    { id: 'layer2-delivery' as ExplorationMode, label: 'Delivery Specs', icon: Zap },
    { id: 'layer3-content' as ExplorationMode, label: 'Content', icon: Layers },
    { id: 'connections' as ExplorationMode, label: 'Connections', icon: GitBranch },
    { id: 'archetypes' as ExplorationMode, label: 'Archetypes', icon: Target }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;
        
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap border-2 ${
              isActive
                ? 'bg-purple-900 border-purple-500 text-white'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            <Icon className="w-4 h-4" />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// OVERVIEW: THREE LAYERS EXPLAINED
// ============================================================================

interface ThreeLayerOverviewProps {
  onModeChange: (mode: ExplorationMode) => void;
}

function ThreeLayerOverview({ onModeChange }: ThreeLayerOverviewProps) {
  const layers = [
    {
      number: 1,
      title: 'Clinical Brain Map',
      subtitle: 'WHERE to target',
      description: '20 Schemas → 200 Families → 2,400 Mindblocks. The complete nervous system topology we\'re programming.',
      color: '#3E2BB8',
      icon: Brain,
      mode: 'layer1-map' as ExplorationMode,
      structure: [
        { label: 'Schemas (Patterns)', count: '20', desc: 'Predictive models, not diagnoses' },
        { label: 'Families (Clusters)', count: '200', desc: 'Expression patterns (10 per Schema)' },
        { label: 'Mindblocks (Signals)', count: '2,400', desc: 'Atomic endpoints (12 per Family)' }
      ],
      example: {
        schema: 'S12: Subjugation',
        family: 'F02: Conflict Equals Danger',
        mindblock: 'MB-S12-F02-04: "When connection feels uncertain, I must chase or test"'
      }
    },
    {
      number: 2,
      title: 'Delivery Specification',
      subtitle: 'WHAT intervention + WHEN/HOW to deliver',
      description: '200 Component Types → 560 Cue Types. Parametric combinations define precise delivery context.',
      color: '#5739FB',
      icon: Zap,
      mode: 'layer2-delivery' as ExplorationMode,
      structure: [
        { label: 'Component Types', count: '200', desc: 'Therapeutic patterns (human-facing)' },
        { label: 'Cue Types', count: '560', desc: 'Delivery specs (LUMA-facing)' },
        { label: 'Parameters', count: '8', desc: 'Move, Stage, State, Voice, Modality, Context...' }
      ],
      example: {
        schema: 'Component: belief_probe',
        family: 'Cue Type: downshift.grounding_54321.audio.learn.activated.nurturer_coregulate',
        mindblock: 'Output: Pre/post state delta + 90-sec receipt'
      }
    },
    {
      number: 3,
      title: 'NaviCue Content',
      subtitle: 'THE CONTENT (council-voiced)',
      description: '3,000 existing → 10,000+ target. Each instance links to Component Type and targets Schemas/Families/Mindblocks.',
      color: '#7B61FF',
      icon: Layers,
      mode: 'layer3-content' as ExplorationMode,
      structure: [
        { label: 'Active Cues', count: '~2,000', desc: 'Live, governed, routable' },
        { label: 'Draft Cues', count: '~1,000', desc: 'Being enriched with targets' },
        { label: 'Target: 10K+', count: '8,000', desc: 'Variety through component types, not synonyms' }
      ],
      example: {
        schema: 'Instance: "Box breathing, 3 minutes" (audio)',
        family: 'Targets: S12-F02-04 (Conflict Equals Danger)',
        mindblock: 'Status: ACTIVE (full contract + targets)'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          The Three-Layer Taxonomy System
        </h2>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
          This is what makes LUMA 10X more precise than schema matching alone.
          Explore each layer to understand how clinical targeting, delivery specification,
          and content generation work together.
        </p>
      </div>

      {/* The Spine Visual */}
      <div className="bg-zinc-900 p-8 border-2 border-purple-500">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          The Installation Spine
        </h3>
        <div className="flex items-center justify-center gap-4 text-center">
          {[
            'Problem',
            'Mechanism',
            'Schema',
            'Family',
            'Mindblock',
            'Proof',
            'Transfer'
          ].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 border-2 border-purple-500 bg-purple-900/20 flex items-center justify-center mb-2">
                  <span className="text-sm font-bold text-white">{step}</span>
                </div>
              </div>
              {index < 6 && (
                <ArrowRight className="w-6 h-6 text-purple-500 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-sm text-zinc-400 mt-6">
          Every unit of content and every interaction is traceable through this spine.
          That's what makes it auditable by neuroscientists, trustable by clinicians, and provable by users.
        </p>
      </div>

      {/* Layer Cards */}
      <div className="space-y-8">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.number}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-zinc-900 border-2"
            style={{ borderColor: layer.color }}
          >
            {/* Header */}
            <div className="p-8 border-b-2 border-zinc-800">
              <div className="flex items-start gap-6">
                <div
                  className="w-16 h-16 flex items-center justify-center border-2"
                  style={{ borderColor: layer.color, backgroundColor: `${layer.color}20` }}
                >
                  <layer.icon className="w-8 h-8" style={{ color: layer.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-bold text-zinc-500 mb-1">
                        LAYER {layer.number}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {layer.title}
                      </h3>
                      <div className="text-sm font-medium" style={{ color: layer.color }}>
                        {layer.subtitle}
                      </div>
                    </div>
                    <button
                      onClick={() => onModeChange(layer.mode)}
                      className="px-4 py-2 text-sm font-medium transition-all border-2 text-white hover:bg-white/10"
                      style={{ borderColor: layer.color }}
                    >
                      Explore Layer →
                    </button>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Structure */}
            <div className="p-8 border-b-2 border-zinc-800">
              <div className="text-sm font-bold text-zinc-500 mb-4">STRUCTURE:</div>
              <div className="grid grid-cols-3 gap-4">
                {layer.structure.map((item) => (
                  <div key={item.label} className="bg-zinc-800 p-4 border-2 border-zinc-700">
                    <div className="text-3xl font-bold mb-1" style={{ color: layer.color }}>
                      {item.count}
                    </div>
                    <div className="text-sm font-medium text-white mb-2">
                      {item.label}
                    </div>
                    <div className="text-xs text-zinc-400">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example */}
            <div className="p-8 bg-zinc-800/50">
              <div className="text-sm font-bold text-zinc-500 mb-4">EXAMPLE:</div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: layer.color }} />
                  <div>
                    <div className="text-sm font-medium text-zinc-400">
                      {layer.example.schema.split(':')[0]}:
                    </div>
                    <div className="text-white">
                      {layer.example.schema.split(':')[1]}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: layer.color }} />
                  <div>
                    <div className="text-sm font-medium text-zinc-400">
                      {layer.example.family.split(':')[0]}:
                    </div>
                    <div className="text-white">
                      {layer.example.family.split(':')[1]}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: layer.color }} />
                  <div>
                    <div className="text-sm font-medium text-zinc-400">
                      {layer.example.mindblock.split(':')[0]}:
                    </div>
                    <div className="text-white">
                      {layer.example.mindblock.split(':')[1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Key Insight */}
      <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 p-8 border-2 border-purple-500">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">
          The Key Insight
        </h3>
        <p className="text-lg text-zinc-300 leading-relaxed max-w-4xl mx-auto text-center">
          These three layers are <span className="text-purple-400 font-bold">COMPLEMENTARY</span>, not competing.
          <br />
          <span className="text-white font-bold">Clinical Brain Map</span> = WHERE to target.
          <br />
          <span className="text-white font-bold">Delivery Specification</span> = WHAT intervention + WHEN/HOW to deliver.
          <br />
          <span className="text-white font-bold">NaviCue Content</span> = THE CONTENT (council-voiced).
          <br /><br />
          LUMA becomes 10X more precise when all three layers work together.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LAYER 1: CLINICAL BRAIN MAP EXPLORER
// ============================================================================

interface ClinicalBrainMapExplorerProps {
  selectedSchema: string | null;
  selectedFamily: string | null;
  selectedMindblock: string | null;
  onSchemaSelect: (schema: string | null) => void;
  onFamilySelect: (family: string | null) => void;
  onMindblockSelect: (mindblock: string | null) => void;
}

function ClinicalBrainMapExplorer({
  selectedSchema,
  selectedFamily,
  selectedMindblock,
  onSchemaSelect,
  onFamilySelect,
  onMindblockSelect
}: ClinicalBrainMapExplorerProps) {
  // Sample data (in production, this would come from your Notion/Supabase)
  const schemas = [
    {
      code: 'S1',
      name: 'Immediate Relief',
      prediction: 'When I feel this, I must end it now',
      familyCount: 8,
      mindblockCount: 96
    },
    {
      code: 'S2',
      name: 'Defectiveness Shame',
      prediction: 'If you really saw me, you\'d leave',
      familyCount: 8,
      mindblockCount: 96
    },
    {
      code: 'S3',
      name: 'Abandonment Disconnection',
      prediction: 'People go. Safety doesn\'t last',
      familyCount: 8,
      mindblockCount: 96
    },
    {
      code: 'S12',
      name: 'Subjugation',
      prediction: 'If I say no, I lose love',
      familyCount: 8,
      mindblockCount: 96
    },
    {
      code: 'S20',
      name: 'Disconnection From Meaning',
      prediction: 'Nothing matters',
      familyCount: 8,
      mindblockCount: 96
    }
  ];

  const families = selectedSchema ? [
    { code: `${selectedSchema}-F01`, name: 'Preemptive Self Attack', archetype: 'C_ShameAttack' },
    { code: `${selectedSchema}-F02`, name: 'Conflict Equals Danger', archetype: 'F_AttachmentPanic' },
    { code: `${selectedSchema}-F03`, name: 'Needs Do Not Count', archetype: 'G_BoundarySubjugation' },
    { code: `${selectedSchema}-F04`, name: 'Permission Seeking Life', archetype: 'G_BoundarySubjugation' },
    { code: `${selectedSchema}-F05`, name: 'Swallow The No', archetype: 'G_BoundarySubjugation' },
    { code: `${selectedSchema}-F06`, name: 'Overfunction For Others', archetype: 'D_OvercontrolPerfection' },
    { code: `${selectedSchema}-F07`, name: 'Quiet Self Erasure', archetype: 'E_WithdrawalAvoidance' },
    { code: `${selectedSchema}-F08`, name: 'Resentment Spiral', archetype: 'C_ShameAttack' }
  ] : [];

  const mindblocks = selectedFamily ? Array.from({ length: 12 }, (_, i) => ({
    code: `MB-${selectedFamily}-${String(i + 1).padStart(2, '0')}`,
    limitingPrediction: `Limiting prediction ${i + 1} for ${selectedFamily}`,
    replacementTruth: `Replacement truth ${i + 1}`,
    heatBand: i < 4 ? 'RED' : i < 8 ? 'AMBER' : 'GREEN',
    kbeTarget: i < 4 ? 'Knowing' : i < 8 ? 'Believing' : 'Embodying'
  })) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Clinical Brain Map Explorer
        </h2>
        <p className="text-zinc-400 text-lg">
          20 Schemas → 200 Families → 2,400 Mindblocks. Navigate the complete nervous system topology.
        </p>
      </div>

      {/* Breadcrumb */}
      {selectedSchema && (
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => {
              onSchemaSelect(null);
              onFamilySelect(null);
              onMindblockSelect(null);
            }}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            All Schemas
          </button>
          {selectedFamily && (
            <>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
              <button
                onClick={() => {
                  onFamilySelect(null);
                  onMindblockSelect(null);
                }}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {selectedSchema}
              </button>
            </>
          )}
          {selectedMindblock && (
            <>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
              <span className="text-white">{selectedFamily}</span>
            </>
          )}
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: Schemas List */}
        <div className="col-span-4 space-y-2">
          <div className="text-sm font-bold text-zinc-500 mb-4">
            SCHEMAS (20 Patterns)
          </div>
          {schemas.map((schema) => (
            <motion.button
              key={schema.code}
              onClick={() => {
                onSchemaSelect(schema.code);
                onFamilySelect(null);
                onMindblockSelect(null);
              }}
              className={`w-full text-left p-4 border-2 transition-all ${
                selectedSchema === schema.code
                  ? 'bg-purple-900/30 border-purple-500'
                  : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'
              }`}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-sm font-bold text-purple-400">
                  {schema.code}
                </div>
                <div className="text-xs text-zinc-500">
                  {schema.familyCount} families
                </div>
              </div>
              <div className="text-white font-medium mb-1">
                {schema.name}
              </div>
              <div className="text-xs text-zinc-400 italic">
                "{schema.prediction}"
              </div>
            </motion.button>
          ))}
        </div>

        {/* MIDDLE: Families (if schema selected) */}
        {selectedSchema && (
          <div className="col-span-4 space-y-2">
            <div className="text-sm font-bold text-zinc-500 mb-4">
              FAMILIES (8 Clusters)
            </div>
            {families.map((family) => (
              <motion.button
                key={family.code}
                onClick={() => {
                  onFamilySelect(family.code);
                  onMindblockSelect(null);
                }}
                className={`w-full text-left p-4 border-2 transition-all ${
                  selectedFamily === family.code
                    ? 'bg-violet-900/30 border-violet-500'
                    : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm font-bold text-violet-400">
                    {family.code}
                  </div>
                  <div className="text-xs text-zinc-500">
                    12 signals
                  </div>
                </div>
                <div className="text-white font-medium mb-1 text-sm">
                  {family.name}
                </div>
                <div className="text-xs text-zinc-400">
                  Archetype: {family.archetype}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* RIGHT: Mindblocks (if family selected) */}
        {selectedFamily && (
          <div className="col-span-4 space-y-2">
            <div className="text-sm font-bold text-zinc-500 mb-4">
              MINDBLOCKS (12 Signals)
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {mindblocks.map((mindblock) => (
                <motion.button
                  key={mindblock.code}
                  onClick={() => onMindblockSelect(mindblock.code)}
                  className={`w-full text-left p-3 border-2 transition-all ${
                    selectedMindblock === mindblock.code
                      ? 'bg-indigo-900/30 border-indigo-500'
                      : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="text-xs font-bold text-indigo-400 mb-2">
                    {mindblock.code}
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-bold border ${
                        mindblock.heatBand === 'RED'
                          ? 'bg-red-900/30 border-red-500 text-red-400'
                          : mindblock.heatBand === 'AMBER'
                          ? 'bg-amber-900/30 border-amber-500 text-amber-400'
                          : 'bg-green-900/30 border-green-500 text-green-400'
                      }`}
                    >
                      {mindblock.heatBand}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-bold bg-purple-900/30 border border-purple-500 text-purple-400">
                      {mindblock.kbeTarget}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 line-clamp-2">
                    {mindblock.limitingPrediction}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Mindblock Detail (if selected) */}
      {selectedMindblock && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-8 border-2 border-indigo-500"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Mindblock Detail: {selectedMindblock}
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">LIMITING PREDICTION:</div>
              <div className="text-white bg-zinc-900 p-4 border-2 border-zinc-700">
                "When connection feels uncertain after a hard day, I must chase or test."
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">REPLACEMENT TRUTH:</div>
              <div className="text-white bg-zinc-900 p-4 border-2 border-zinc-700">
                "I can soothe first and then ask cleanly."
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">BEST PRIMITIVE:</div>
              <div className="text-purple-400 bg-zinc-900 p-4 border-2 border-zinc-700 font-medium">
                Downshift
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">BEST VOICE STANCES:</div>
              <div className="flex gap-2 bg-zinc-900 p-4 border-2 border-zinc-700">
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500 text-purple-400 text-sm font-medium">
                  Nurturer
                </span>
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500 text-purple-400 text-sm font-medium">
                  Clinician
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">PROOF ARTIFACTS:</div>
              <div className="text-white bg-zinc-900 p-4 border-2 border-zinc-700 text-sm">
                reassurance delay receipt; clean ask receipt
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-500 mb-2">TRANSFER TEST:</div>
              <div className="text-white bg-zinc-900 p-4 border-2 border-zinc-700 text-sm">
                repeat with a different person within 7 days
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// LAYER 2: DELIVERY SPECIFICATION EXPLORER
// ============================================================================

function DeliverySpecificationExplorer() {
  const [selectedMove, setSelectedMove] = useState<string | null>(null);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const moves = [
    { id: 'orient', name: 'Orient', color: '#3E2BB8', desc: 'Is the nervous system ready to receive?' },
    { id: 'downshift', name: 'Downshift', color: '#5739FB', desc: 'Create receiving capacity' },
    { id: 'name_pattern', name: 'Name Pattern', color: '#7B61FF', desc: 'Turn pain into workable map' },
    { id: 'make_move', name: 'Make Move', color: '#9D88FF', desc: 'Smallest repeatable action' },
    { id: 'capture_receipt', name: 'Capture Receipt', color: '#10B981', desc: 'Proof that body believes it worked' },
    { id: 'transfer_test', name: 'Transfer Test', color: '#F59E0B', desc: 'Test if it holds in new context' },
    { id: 'repair', name: 'Repair', color: '#EF4444', desc: 'Restore integrity after failure' },
    { id: 'witness', name: 'Witness', color: '#EC4899', desc: 'Consent-based social verification' }
  ];

  const modalities = [
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'somatic', name: 'Somatic', icon: '🫀' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'planner', name: 'Planner', icon: '📅' }
  ];

  const states = [
    { id: 'overwhelmed', name: 'Overwhelmed (RED)', color: '#EF4444' },
    { id: 'activated', name: 'Activated (AMBER)', color: '#F59E0B' },
    { id: 'calm', name: 'Calm (GREEN)', color: '#10B981' }
  ];

  const stages = [
    { id: 'learn', name: 'Learn (K - Knowing)', color: '#3B82F6' },
    { id: 'believe', name: 'Believe (B - Believing)', color: '#8B5CF6' },
    { id: 'live', name: 'Live (E - Embodying)', color: '#10B981' }
  ];

  const voices = [
    'Clinician',
    'Witness',
    'Coach',
    'Sage',
    'Paradox',
    'Nurturer',
    'Straight Talk',
    'Elder'
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Delivery Specification Explorer
        </h2>
        <p className="text-zinc-400 text-lg">
          560 Cue Types = parametric combinations of Move, Modality, Stage, State, Voice, and Context.
          This is what makes LUMA state-aware and context-adaptive.
        </p>
      </div>

      {/* The Formula */}
      <div className="bg-purple-900/20 p-8 border-2 border-purple-500">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          Cue Type Naming Formula
        </h3>
        <div className="text-center text-lg font-mono text-purple-400">
          {'{move}.{function}.{modality}.{stage}.{state}.{guidance_mode}.{context}'}
        </div>
        <div className="text-center text-sm text-zinc-400 mt-4">
          Example: <span className="text-white">downshift.grounding_54321.audio.learn.activated.nurturer_coregulate.ctx_craving</span>
        </div>
      </div>

      {/* Interactive Builder */}
      <div className="grid grid-cols-12 gap-6">
        {/* Moves */}
        <div className="col-span-6">
          <div className="text-sm font-bold text-zinc-500 mb-4">
            1. SELECT MOVE (8 Primitives)
          </div>
          <div className="space-y-2">
            {moves.map((move) => (
              <button
                key={move.id}
                onClick={() => setSelectedMove(move.id)}
                className={`w-full text-left p-4 border-2 transition-all ${
                  selectedMove === move.id
                    ? 'border-white bg-white/10'
                    : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'
                }`}
                style={{
                  borderColor: selectedMove === move.id ? move.color : undefined
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white mb-1">{move.name}</div>
                    <div className="text-sm text-zinc-400">{move.desc}</div>
                  </div>
                  {selectedMove === move.id && (
                    <div className="w-4 h-4 border-2 border-white bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Other Parameters */}
        <div className="col-span-6 space-y-6">
          {/* Modality */}
          <div>
            <div className="text-sm font-bold text-zinc-500 mb-4">
              2. SELECT MODALITY
            </div>
            <div className="grid grid-cols-5 gap-2">
              {modalities.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModality(mod.id)}
                  className={`p-4 border-2 text-center transition-all ${
                    selectedModality === mod.id
                      ? 'bg-purple-900/30 border-purple-500'
                      : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{mod.icon}</div>
                  <div className="text-xs font-medium text-white">{mod.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stage */}
          <div>
            <div className="text-sm font-bold text-zinc-500 mb-4">
              3. SELECT STAGE (KBE)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  className="p-3 bg-zinc-900 border-2 text-center"
                  style={{ borderColor: stage.color }}
                >
                  <div className="text-sm font-bold text-white">{stage.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* State */}
          <div>
            <div className="text-sm font-bold text-zinc-500 mb-4">
              4. SELECT STATE (Safety Gate)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {states.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setSelectedState(state.id)}
                  className={`p-3 border-2 text-center transition-all ${
                    selectedState === state.id
                      ? 'bg-white/10 border-white'
                      : 'bg-zinc-900'
                  }`}
                  style={{
                    borderColor: selectedState === state.id ? state.color : '#3f3f46'
                  }}
                >
                  <div className="text-sm font-bold text-white">{state.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Voice */}
          <div>
            <div className="text-sm font-bold text-zinc-500 mb-4">
              5. SELECT VOICE (Guidance Mode)
            </div>
            <div className="grid grid-cols-4 gap-2">
              {voices.map((voice) => (
                <button
                  key={voice}
                  className="p-2 bg-zinc-900 border-2 border-zinc-700 hover:border-zinc-500 text-center transition-all"
                >
                  <div className="text-xs font-medium text-white">{voice}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Preview */}
      {selectedMove && selectedModality && selectedState && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 p-8 border-2 border-purple-500"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Generated Cue Type:
          </h3>
          <div className="text-xl font-mono text-purple-400 bg-black p-4 border-2 border-purple-500">
            {selectedMove}.function_name.{selectedModality}.learn.{selectedState}.clinician_direct
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-zinc-900 p-4 border-2 border-zinc-700">
              <div className="text-sm text-zinc-500 mb-2">Expected Output:</div>
              <div className="text-white text-sm">
                Pre/post state delta + receipt artifact
              </div>
            </div>
            <div className="bg-zinc-900 p-4 border-2 border-zinc-700">
              <div className="text-sm text-zinc-500 mb-2">Safety Check:</div>
              <div className="text-white text-sm">
                State band verified: {selectedState}
              </div>
            </div>
            <div className="bg-zinc-900 p-4 border-2 border-zinc-700">
              <div className="text-sm text-zinc-500 mb-2">Context Optimizers:</div>
              <div className="text-white text-sm">
                craving, conflict, night, alone
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// LAYER 3: NAVICUE CONTENT EXPLORER
// ============================================================================

function NaviCueContentExplorer() {
  const [filter, setFilter] = useState<'all' | 'active' | 'draft'>('all');

  const sampleCues = [
    {
      id: 'nc-001',
      title: 'Box Breathing Protocol',
      status: 'active' as const,
      componentType: 'somatic_map',
      cueType: 'downshift.grounding_54321.audio.learn.activated.nurturer_coregulate',
      targets: {
        schema: 'S12',
        family: 'S12-F02',
        mindblock: 'MB-S12-F02-04'
      },
      modality: 'audio',
      duration: '3 min',
      receiptTypes: ['body_shift', 'pre_post_delta'],
      transferTest: 'repeat in new trigger within 24h'
    },
    {
      id: 'nc-002',
      title: 'Conflict Repair Script',
      status: 'active' as const,
      componentType: 'belief_probe',
      cueType: 'repair.receipt_debrief.text.believe.calm.clinician_direct',
      targets: {
        schema: 'S12',
        family: 'S12-F02',
        mindblock: null
      },
      modality: 'text',
      duration: '5 min',
      receiptTypes: ['repair_done', 'reflection_logged'],
      transferTest: 'next conflict within 7 days'
    },
    {
      id: 'nc-003',
      title: 'Clean Ask Practice',
      status: 'draft' as const,
      componentType: 'practice',
      cueType: null,
      targets: {
        schema: 'S12',
        family: null,
        mindblock: null
      },
      modality: 'social',
      duration: '10 min',
      receiptTypes: [],
      transferTest: null
    }
  ];

  const filteredCues = sampleCues.filter((cue) => {
    if (filter === 'all') return true;
    return cue.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-3">
          NaviCue Content Explorer
        </h2>
        <p className="text-zinc-400 text-lg">
          3,000 existing → 10,000+ target. Council-voiced content that links Component Types to Clinical Targets.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium border-2 transition-all ${
              filter === 'all'
                ? 'bg-purple-900 border-purple-500 text-white'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            All Cues
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 text-sm font-medium border-2 transition-all ${
              filter === 'active'
                ? 'bg-green-900 border-green-500 text-white'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            Active (~2,000)
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 text-sm font-medium border-2 transition-all ${
              filter === 'draft'
                ? 'bg-amber-900 border-amber-500 text-white'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            Draft (~1,000)
          </button>
        </div>

        <div className="text-sm text-zinc-400">
          Showing {filteredCues.length} cues
        </div>
      </div>

      {/* Cue Cards */}
      <div className="space-y-4">
        {filteredCues.map((cue) => (
          <motion.div
            key={cue.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 p-6 border-2 border-zinc-700 hover:border-zinc-500 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{cue.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-bold border-2 ${
                      cue.status === 'active'
                        ? 'bg-green-900/30 border-green-500 text-green-400'
                        : 'bg-amber-900/30 border-amber-500 text-amber-400'
                    }`}
                  >
                    {cue.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-zinc-500">{cue.id}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-zinc-400 mb-1">
                  {cue.modality} · {cue.duration}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-zinc-500 mb-2">COMPONENT TYPE:</div>
                  <div className="text-sm font-mono text-purple-400 bg-zinc-800 p-2 border-2 border-zinc-700">
                    {cue.componentType}
                  </div>
                </div>
                {cue.cueType && (
                  <div>
                    <div className="text-xs font-bold text-zinc-500 mb-2">CUE TYPE (560):</div>
                    <div className="text-xs font-mono text-violet-400 bg-zinc-800 p-2 border-2 border-zinc-700 break-all">
                      {cue.cueType}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-zinc-500 mb-2">CLINICAL TARGETS:</div>
                  <div className="flex flex-wrap gap-2">
                    {cue.targets.schema && (
                      <span className="px-2 py-1 text-xs font-bold bg-purple-900/30 border border-purple-500 text-purple-400">
                        {cue.targets.schema}
                      </span>
                    )}
                    {cue.targets.family && (
                      <span className="px-2 py-1 text-xs font-bold bg-violet-900/30 border border-violet-500 text-violet-400">
                        {cue.targets.family}
                      </span>
                    )}
                    {cue.targets.mindblock && (
                      <span className="px-2 py-1 text-xs font-bold bg-indigo-900/30 border border-indigo-500 text-indigo-400">
                        {cue.targets.mindblock}
                      </span>
                    )}
                    {!cue.targets.schema && (
                      <span className="px-2 py-1 text-xs font-bold bg-red-900/30 border border-red-500 text-red-400">
                        No targets (draft)
                      </span>
                    )}
                  </div>
                </div>
                {cue.receiptTypes.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-zinc-500 mb-2">RECEIPT TYPES:</div>
                    <div className="flex flex-wrap gap-2">
                      {cue.receiptTypes.map((receipt) => (
                        <span
                          key={receipt}
                          className="px-2 py-1 text-xs font-medium bg-zinc-800 border border-zinc-600 text-zinc-300"
                        >
                          {receipt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// CONNECTIONS VISUALIZER
// ============================================================================

function ConnectionsVisualizer() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-3">
          How The Layers Connect
        </h2>
        <p className="text-zinc-400 text-lg">
          Follow a complete selection flow from user state to deployed NaviCue.
        </p>
      </div>

      <div className="bg-zinc-900 p-8 border-2 border-purple-500">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          LUMA's 10X More Precise Selection Algorithm
        </h3>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border-2 border-purple-500 bg-purple-900/20 text-white font-bold">
              1
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-white mb-2">User State Detected</div>
              <div className="bg-zinc-800 p-4 border-2 border-zinc-700 text-sm text-zinc-300 space-y-1">
                <div>• Active Mindblock: <span className="text-purple-400 font-mono">MB-S12-F02-04</span> (Conflict Equals Danger)</div>
                <div>• Heat: <span className="text-red-400 font-bold">8/10</span> (RED - Activated)</div>
                <div>• KBE Layer: <span className="text-violet-400 font-bold">Believing</span></div>
                <div>• Context: <span className="text-amber-400">alone, night, recent_conflict</span></div>
                <div>• Preferences: <span className="text-green-400">audio, nurturer voice</span></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-purple-500" style={{ transform: 'rotate(90deg)' }} />
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border-2 border-purple-500 bg-purple-900/20 text-white font-bold">
              2
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-white mb-2">Query Layer 1: Clinical Target Metadata</div>
              <div className="bg-zinc-800 p-4 border-2 border-zinc-700 text-sm text-zinc-300 space-y-1">
                <div>• Mindblock metadata → <span className="text-purple-400">best_primitive: Downshift</span></div>
                <div>• Mindblock metadata → <span className="text-violet-400">best_voice_stances: Nurturer, Clinician</span></div>
                <div>• Mindblock metadata → <span className="text-red-400">heat_band: RED</span></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-purple-500" style={{ transform: 'rotate(90deg)' }} />
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border-2 border-purple-500 bg-purple-900/20 text-white font-bold">
              3
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-white mb-2">Query Layer 2: Matching Cue Types</div>
              <div className="bg-zinc-800 p-4 border-2 border-zinc-700 text-sm text-zinc-300 space-y-1">
                <div>• move_key: <span className="text-purple-400">downshift</span></div>
                <div>• stage_key: <span className="text-violet-400">believe</span></div>
                <div>• safe_states: contains <span className="text-red-400">"activated"</span></div>
                <div>• guidance_mode_key: <span className="text-green-400">nurturer_coregulate</span></div>
                <div>• modality: <span className="text-amber-400">audio</span></div>
                <div>• context_key: <span className="text-amber-400">conflict OR night OR null</span></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-purple-500" style={{ transform: 'rotate(90deg)' }} />
          </div>

          {/* Step 4 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border-2 border-purple-500 bg-purple-900/20 text-white font-bold">
              4
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-white mb-2">Query Layer 3: NaviCue Candidates</div>
              <div className="bg-zinc-800 p-4 border-2 border-zinc-700 text-sm text-zinc-300 space-y-1">
                <div>• cue_type_key IN (matching types from step 3)</div>
                <div>• targets.schema_id = <span className="text-purple-400">S12</span></div>
                <div>• targets.family_id = <span className="text-violet-400">S12-F02</span> (or null)</div>
                <div>• targets.mindblock_id = <span className="text-indigo-400">MB-S12-F02-04</span> (or null)</div>
                <div>• status = <span className="text-green-400">active</span></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-purple-500" style={{ transform: 'rotate(90deg)' }} />
          </div>

          {/* Step 5 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border-2 border-green-500 bg-green-900/20 text-white font-bold">
              ✓
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-white mb-2">Best Match Selected</div>
              <div className="bg-gradient-to-r from-green-900/30 to-purple-900/30 p-4 border-2 border-green-500 text-sm text-white space-y-2">
                <div className="font-bold text-lg">NaviCue: "Box Breathing, 3 minutes" (audio)</div>
                <div>• Cue Type: <span className="font-mono text-purple-400">downshift.grounding_54321.audio.believe.activated.nurturer_coregulate.ctx_conflict</span></div>
                <div>• Target: <span className="text-indigo-400">MB-S12-F02-04</span> (exact match)</div>
                <div>• Expected Receipt: <span className="text-green-400">body_shift, pre_post_delta</span></div>
                <div>• Transfer Test: <span className="text-amber-400">repeat in new trigger within 24h</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-zinc-400 text-sm">
          <strong className="text-white">Result:</strong> 10X more precise than schema matching alone because
          of clinical targeting + state safety + stage appropriateness + modality match + voice resonance + context optimization
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ARCHETYPES EXPLORER
// ============================================================================

function ArchetypesExplorer() {
  const archetypes = [
    {
      id: 'A',
      name: 'Urgency Spike and Escape',
      heat: 'RED',
      primitives: 'Orient → Downshift',
      voices: 'Nurturer, Clinician',
      proof: '90-second rescue receipt + before/after intensity',
      transfer: 'repeat same day in different context',
      color: '#EF4444',
      familyExamples: ['S1-F01: Urgency Spike', 'S17-F04: Escalate To End It']
    },
    {
      id: 'B',
      name: 'Rumination and Forecasting',
      heat: 'AMBER',
      primitives: 'Name Pattern',
      voices: 'Sage, Clinician, Paradox',
      proof: 'evidence/probability list',
      transfer: 'apply to second forecast within 48h',
      color: '#F59E0B',
      familyExamples: ['S16-F01: Catastrophic Forecasting', 'S16-F02: Rumination Engine']
    },
    {
      id: 'C',
      name: 'Shame and Self Attack',
      heat: 'AMBER',
      primitives: 'Witness → Repair',
      voices: 'Compassionate Witness, Clinician, Elder',
      proof: 'repair receipt + one self-compassion line',
      transfer: 'repair after next rupture',
      color: '#EC4899',
      familyExamples: ['S2-F01: Preemptive Self Attack', 'S18-F01: Harsh Inner Judge']
    },
    {
      id: 'F',
      name: 'Reassurance and Attachment Panic',
      heat: 'RED → AMBER',
      primitives: 'Downshift → Make Move',
      voices: 'Nurturer, Clinician',
      proof: 'delay-reassurance receipt + clean-ask receipt',
      transfer: 'repeat with different person',
      color: '#8B5CF6',
      familyExamples: ['S3-F02: Cling And Chase', 'S12-F02: Conflict Equals Danger']
    },
    {
      id: 'G',
      name: 'Boundary and Subjugation',
      heat: 'GREEN',
      primitives: 'Repair or Make Move',
      voices: 'Clinician, Elder',
      proof: '"no with warmth" or boundary message receipt',
      transfer: 'next boundary within 7 days',
      color: '#10B981',
      familyExamples: ['S12-F01: Appease Then Explode', 'S12-F05: Swallow The No']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-3">
          The 10 Routing Archetypes
        </h2>
        <p className="text-zinc-400 text-lg">
          Families map to Archetypes, which define default routing parameters.
          This is how LUMA knows HOW to deliver before seeing specific cue content.
        </p>
      </div>

      <div className="bg-purple-900/20 p-6 border-2 border-purple-500">
        <p className="text-zinc-300 text-center">
          <strong className="text-white">Key Principle:</strong> We do not route by content.
          We route by <span className="text-purple-400 font-bold">Family type</span>.
          Every asset declares: Family archetype, primary primitive, heat suitability, KBE intent.
        </p>
      </div>

      <div className="space-y-6">
        {archetypes.map((archetype, index) => (
          <motion.div
            key={archetype.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 border-2"
            style={{ borderColor: archetype.color }}
          >
            <div className="p-6 border-b-2 border-zinc-800">
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 flex items-center justify-center text-2xl font-bold text-white border-2"
                  style={{ borderColor: archetype.color, backgroundColor: `${archetype.color}20` }}
                >
                  {archetype.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Archetype {archetype.id}: {archetype.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="px-3 py-1 bg-zinc-800 border border-zinc-700">
                      <span className="text-xs text-zinc-500">Heat:</span>{' '}
                      <span className="text-sm font-bold text-white">{archetype.heat}</span>
                    </div>
                    <div className="px-3 py-1 bg-zinc-800 border border-zinc-700">
                      <span className="text-xs text-zinc-500">Primitives:</span>{' '}
                      <span className="text-sm font-bold text-white">{archetype.primitives}</span>
                    </div>
                    <div className="px-3 py-1 bg-zinc-800 border border-zinc-700">
                      <span className="text-xs text-zinc-500">Voices:</span>{' '}
                      <span className="text-sm font-bold text-white">{archetype.voices}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold text-zinc-500 mb-2">PROOF:</div>
                <div className="text-sm text-white bg-zinc-800 p-3 border-2 border-zinc-700">
                  {archetype.proof}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-500 mb-2">TRANSFER:</div>
                <div className="text-sm text-white bg-zinc-800 p-3 border-2 border-zinc-700">
                  {archetype.transfer}
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-800/50">
              <div className="text-xs font-bold text-zinc-500 mb-3">FAMILY EXAMPLES:</div>
              <div className="flex flex-wrap gap-2">
                {archetype.familyExamples.map((example) => (
                  <span
                    key={example}
                    className="px-3 py-1 text-sm font-medium bg-zinc-900 border-2 text-white"
                    style={{ borderColor: archetype.color }}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
