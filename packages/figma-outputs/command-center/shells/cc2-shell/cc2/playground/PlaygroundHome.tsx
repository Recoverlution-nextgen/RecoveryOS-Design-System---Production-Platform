/**
 * PLAYGROUND HOME
 * Landing page for the 10 clinical architecture components
 * 
 * Components:
 * 01. Clinical Spine Hero - Complete pipeline (Problem → Transfer)
 * 02. Schema Constellation - 20 patterns network graph
 * 03. Family Tree Explorer - 200 clusters drill-down
 * 04. Six Pillars Deep Dive - Longform clinical framework
 * 05. Voice Taxonomy - 8 clinical stances
 * 06. Primitive Library - Action primitives showcase
 * 07. Routing Engine - 10 archetypes + decision tree
 * 08. Proof + Transfer System - Receipts & context tests
 * 09. Heat × KBE Matrix - State-based routing grid
 * 10. Four-Layer Architecture - CC2 → LUMA → 6S → Rooms
 */

import { useState } from 'react';
import { 
  Workflow, 
  Network, 
  TreePine, 
  Layers3, 
  MessageSquare, 
  Zap, 
  GitBranch, 
  FileCheck, 
  Grid3x3, 
  Building2,
  Search
} from 'lucide-react';

// Import all components
import { ClinicalSpineHero } from './components/ClinicalSpineHero';
import { SchemaConstellation } from './components/SchemaConstellation';
import { FamilyTreeExplorer } from './components/FamilyTreeExplorer';
import { SixPillarsDeepDive } from './components/SixPillarsDeepDive';
import { VoiceTaxonomy } from './components/VoiceTaxonomy';
import { PrimitiveLibrary } from './components/PrimitiveLibrary';
import { RoutingEngine } from './components/RoutingEngine';
import { ProofTransferSystem } from './components/ProofTransferSystem';
import { HeatKbeMatrix } from './components/HeatKbeMatrix';
import { FourLayerArchitecture } from './components/FourLayerArchitecture';

interface ComponentCard {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  status: 'ready' | 'building' | 'planned';
}

const COMPONENTS: ComponentCard[] = [
  {
    id: 'clinical-spine-hero',
    number: '01',
    title: 'Clinical Spine Hero',
    description: 'The complete deterministic pipeline. Problem → Mechanism → Schema → Family → Mindblock → Proof → Transfer',
    icon: Workflow,
    color: '#5739FB',
    status: 'building'
  },
  {
    id: 'schema-constellation',
    number: '02',
    title: 'Schema Constellation',
    description: '20 predictive patterns visualized as an interactive network graph showing connections and relationships',
    icon: Network,
    color: '#40E0D0',
    status: 'planned'
  },
  {
    id: 'family-tree-explorer',
    number: '03',
    title: 'Family Tree Explorer',
    description: 'Three-column hierarchical drill-down: 20 Schemas → 200 Families → 2,400 Mindblocks',
    icon: TreePine,
    color: '#10B981',
    status: 'planned'
  },
  {
    id: 'six-pillars-deep-dive',
    number: '04',
    title: 'Six Pillars Deep Dive',
    description: 'Longform vertical scroll through Emotional Regulation, Stress Resilience, Social Connectivity, Cognitive Reframing, Identity Integration, Decision Mastery',
    icon: Layers3,
    color: '#9B87F5',
    status: 'planned'
  },
  {
    id: 'voice-taxonomy',
    number: '05',
    title: 'Voice Taxonomy',
    description: '8 clinical stances (not personalities): Clinician, Witness, Coach, Sage, Paradox, Nurturer, Straight Talk, Elder',
    icon: MessageSquare,
    color: '#E85D75',
    status: 'planned'
  },
  {
    id: 'primitive-library',
    number: '06',
    title: 'Primitive Library',
    description: 'The action primitives: Orient, Downshift, Make Move, Repair, Name Pattern, Witness, Capture Receipt, Transfer Test',
    icon: Zap,
    color: '#F59E42',
    status: 'planned'
  },
  {
    id: 'routing-engine',
    number: '07',
    title: 'Routing Engine',
    description: '10 routing archetypes with decision tree visualization showing how user state maps to content',
    icon: GitBranch,
    color: '#5AB9EA',
    status: 'planned'
  },
  {
    id: 'proof-transfer-system',
    number: '08',
    title: 'Proof + Transfer System',
    description: 'How change becomes auditable: Receipts (proof artifacts) and Transfer Tests (context tests)',
    icon: FileCheck,
    color: '#8B5CF6',
    status: 'planned'
  },
  {
    id: 'heat-kbe-matrix',
    number: '09',
    title: 'Heat × KBE Matrix',
    description: '3×3 grid showing state-based routing: RED/AMBER/GREEN × Knowing/Believing/Embodying',
    icon: Grid3x3,
    color: '#DC2626',
    status: 'planned'
  },
  {
    id: 'four-layer-architecture',
    number: '10',
    title: 'Four-Layer Architecture',
    description: 'Complete platform visualization: CC2 (Control) → LUMA (Orchestration) → 6S Orbit (Daily OS) → Rooms (Delivery)',
    icon: Building2,
    color: '#3E2BB8',
    status: 'planned'
  },
];

export function PlaygroundHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const filteredComponents = COMPONENTS.filter(comp =>
    comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleComponentClick = (id: string) => {
    setSelectedComponent(id);
  };

  // Render selected component
  if (selectedComponent) {
    switch (selectedComponent) {
      case 'clinical-spine-hero':
        return <ClinicalSpineHero />;
      case 'schema-constellation':
        return <SchemaConstellation />;
      case 'family-tree-explorer':
        return <FamilyTreeExplorer />;
      case 'six-pillars-deep-dive':
        return <SixPillarsDeepDive />;
      case 'voice-taxonomy':
        return <VoiceTaxonomy />;
      case 'primitive-library':
        return <PrimitiveLibrary />;
      case 'routing-engine':
        return <RoutingEngine />;
      case 'proof-transfer-system':
        return <ProofTransferSystem />;
      case 'heat-kbe-matrix':
        return <HeatKbeMatrix />;
      case 'four-layer-architecture':
        return <FourLayerArchitecture />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Hero Section */}
      <section className="border-b border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="mb-4">
            <span 
              className="text-xs tracking-[0.2em] text-zinc-500"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              EXPLORE THE SYSTEM
            </span>
          </div>
          
          <h1 
            className="text-5xl font-bold mb-6"
            style={{ 
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #5739FB 0%, #40E0D0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Playground
          </h1>

          <p 
            className="text-xl text-zinc-400 max-w-3xl mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Clinical architecture, visualized. From Problem to Transfer. 20 schemas. 200 families. 2,400 signals. Infinite paths.
          </p>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full bg-zinc-900 border border-zinc-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#5739FB] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            />
          </div>
        </div>
      </section>

      {/* Component Grid */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-3 gap-6">
            {filteredComponents.slice(0, 9).map((component, index) => {
              const Icon = component.icon;
              const isLast = index === filteredComponents.length - 1 && filteredComponents.length === 10;
              
              return (
                <button
                  key={component.id}
                  onClick={() => handleComponentClick(component.id)}
                  className={`
                    group relative bg-zinc-950 border border-zinc-800 p-6 text-left
                    hover:border-zinc-700 transition-all duration-300
                    ${isLast ? 'col-span-3' : ''}
                  `}
                  style={{
                    backdropFilter: 'blur(20px) saturate(110%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                  }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {component.status === 'ready' && (
                      <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20">
                        READY
                      </span>
                    )}
                    {component.status === 'building' && (
                      <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        BUILDING
                      </span>
                    )}
                    {component.status === 'planned' && (
                      <span className="text-xs px-2 py-1 bg-zinc-700/50 text-zinc-500 border border-zinc-700">
                        PLANNED
                      </span>
                    )}
                  </div>

                  {/* Number */}
                  <div 
                    className="text-6xl font-bold mb-6 opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ fontFamily: 'var(--font-display)', color: component.color }}
                  >
                    {component.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <Icon 
                      className="w-8 h-8 group-hover:scale-110 transition-transform" 
                      style={{ color: component.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-xl font-bold mb-3 text-white group-hover:text-[#5739FB] transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {component.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-sm text-zinc-400 leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {component.description}
                  </p>

                  {/* Hover Indicator */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#5739FB] to-[#40E0D0] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ width: '100%' }}
                  />
                </button>
              );
            })}

            {/* Full-width Component 10 */}
            {filteredComponents.length === 10 && (
              <button
                onClick={() => handleComponentClick(filteredComponents[9].id)}
                className="group relative bg-zinc-950 border border-zinc-800 p-8 text-left col-span-3 hover:border-zinc-700 transition-all duration-300"
                style={{
                  backdropFilter: 'blur(20px) saturate(110%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                }}
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className="text-xs px-2 py-1 bg-zinc-700/50 text-zinc-500 border border-zinc-700">
                    PLANNED
                  </span>
                </div>

                <div className="flex items-start gap-8">
                  {/* Number */}
                  <div 
                    className="text-8xl font-bold opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ fontFamily: 'var(--font-display)', color: filteredComponents[9].color }}
                  >
                    {filteredComponents[9].number}
                  </div>

                  <div className="flex-1">
                    {/* Icon */}
                    <div className="mb-4">
                      <Building2 
                        className="w-10 h-10 group-hover:scale-110 transition-transform" 
                        style={{ color: filteredComponents[9].color }}
                      />
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-2xl font-bold mb-4 text-white group-hover:text-[#5739FB] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {filteredComponents[9].title}
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-base text-zinc-400 leading-relaxed max-w-3xl"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {filteredComponents[9].description}
                    </p>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#5739FB] to-[#40E0D0] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  style={{ width: '100%' }}
                />
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredComponents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">No components match your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}