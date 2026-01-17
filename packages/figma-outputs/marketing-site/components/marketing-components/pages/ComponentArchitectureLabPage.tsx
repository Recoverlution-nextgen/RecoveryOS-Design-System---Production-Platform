import { useState } from 'react';
import { Box, Grid, Layers, Tag, CheckCircle2, Clock, XCircle, Plus, Filter, Search, ChevronRight, Eye, Code, Smartphone, Monitor, Layout, Palette, Zap, Home, FileText, PanelTop } from 'lucide-react';

// ============================================================================
// COMPONENT ARCHITECTURE LAB
// Visual Control Centre for Managing Component Matrix System
// ============================================================================

interface Pattern {
  id: string;
  name: string;
  type: 'Layout' | 'Content' | 'Behavior';
  reusability: 'Unique' | 'Template' | 'System';
  uses: number;
  status: 'Extracted' | 'Evaluate' | 'Inline' | 'Pending';
  usedIn: string[];
  description: string;
  hasDesktop: boolean;
  hasMobile: boolean;
}

interface Component {
  id: string;
  name: string;
  device: 'Desktop' | 'Mobile' | 'Both';
  usedIn: string[];
  extracted: boolean;
  filePath?: string;
}

interface Section {
  id: string;
  name: string;
  page: string;
  status: 'Pending' | 'Analyzing' | 'Complete';
  patterns: string[];
  components: string[];
  notes: string;
}

const INITIAL_PATTERNS: Pattern[] = [
  {
    id: 'p1',
    name: 'Full-Bleed Hero',
    type: 'Layout',
    reusability: 'System',
    uses: 6,
    status: 'Analyzing',
    usedIn: ['Home', 'Demo', 'Platform', 'Science', 'Story', 'Pricing'],
    description: 'Cinematic aspect ratio (21/9) hero with background asset, centered content overlay, and CTA. Updated Nov 4 with Apple-grade sizing.',
    hasDesktop: true,
    hasMobile: true
  },
  {
    id: 'p2',
    name: 'Centered Header',
    type: 'Content',
    reusability: 'System',
    uses: 8,
    status: 'Pending',
    usedIn: ['Home S2', 'Platform S1', 'Science S1', 'Story S1'],
    description: 'Eyebrow + Headline + Subheadline centered layout',
    hasDesktop: true,
    hasMobile: true
  },
  {
    id: 'p3',
    name: 'Interactive Carousel',
    type: 'Behavior',
    reusability: 'Template',
    uses: 2,
    status: 'Evaluate',
    usedIn: ['Home S2', 'Platform S3'],
    description: 'Multi-story navigation with active state tracking',
    hasDesktop: true,
    hasMobile: true
  },
  {
    id: 'p4',
    name: 'Square Asset w/Copy',
    type: 'Content',
    reusability: 'Template',
    uses: 3,
    status: 'Pending',
    usedIn: ['Home S2', 'Home S3', 'Platform S2'],
    description: 'Square asset with overlaid copy structure and buzz tags',
    hasDesktop: true,
    hasMobile: true
  },
  {
    id: 'p5',
    name: 'Buzz Tags',
    type: 'Content',
    reusability: 'System',
    uses: 12,
    status: 'Extracted',
    usedIn: ['Multiple sections'],
    description: 'Glass pill tags with color coding',
    hasDesktop: true,
    hasMobile: true
  }
];

const INITIAL_SECTIONS: Section[] = [
  {
    id: 's1',
    name: 'Homepage Hero',
    page: 'Home',
    status: 'Analyzing',
    patterns: ['Full-Bleed Hero', 'Eyebrow Typography', 'Hero Headline', 'Button Hero Primary'],
    components: [],
    notes: 'Nov 4: Updated to aspect-[21/9] with Apple-grade responsive padding. Analyzing typography, colors, icons.'
  },
  {
    id: 's2',
    name: 'Architecting DNA (Section 2)',
    page: 'Home',
    status: 'Complete',
    patterns: ['Centered Header', 'Interactive Carousel', 'Square Asset w/Copy', 'Buzz Tags'],
    components: [],
    notes: 'Mobile template complete - use as reference'
  },
  {
    id: 's3',
    name: 'Economics Transform (Section 3)',
    page: 'Home',
    status: 'Pending',
    patterns: [],
    components: [],
    notes: 'Next to analyze'
  }
];

export function ComponentArchitectureLabPage() {
  const [patterns, setPatterns] = useState<Pattern[]>(INITIAL_PATTERNS);
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [components, setComponents] = useState<Component[]>([]);
  const [activeTab, setActiveTab] = useState<'matrix' | 'patterns' | 'sections' | 'components'>('matrix');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Extracted': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Evaluate': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Inline': return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
      case 'Pending': return 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20';
      case 'Complete': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Analyzing': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Layout': return <Layout className="w-4 h-4" />;
      case 'Content': return <FileText className="w-4 h-4" />;
      case 'Behavior': return <Zap className="w-4 h-4" />;
      default: return <Box className="w-4 h-4" />;
    }
  };

  const filteredPatterns = patterns.filter(p => {
    if (filterType !== 'all' && p.type !== filterType) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl" style={{ fontFamily: 'system-ui', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    Component Architecture Lab
                  </h1>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'system-ui' }}>
                    Visual Matrix System for Component Management
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-xs text-emerald-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                  {patterns.filter(p => p.status === 'Extracted').length} EXTRACTED
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20">
                <div className="text-xs text-amber-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                  {patterns.filter(p => p.status === 'Evaluate').length} EVALUATING
                </div>
              </div>
              <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20">
                <div className="text-xs text-cyan-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                  {patterns.filter(p => p.status === 'Pending').length} PENDING
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 flex gap-1 border-t">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'matrix'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ fontFamily: 'system-ui', fontWeight: 600, fontSize: '0.875rem' }}
          >
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
              MATRIX VIEW
            </div>
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'patterns'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ fontFamily: 'system-ui', fontWeight: 600, fontSize: '0.875rem' }}
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              PATTERN CATALOG
            </div>
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'sections'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ fontFamily: 'system-ui', fontWeight: 600, fontSize: '0.875rem' }}
          >
            <div className="flex items-center gap-2">
              <PanelTop className="w-4 h-4" />
              SECTION AUDIT
            </div>
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'components'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ fontFamily: 'system-ui', fontWeight: 600, fontSize: '0.875rem' }}
          >
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              COMPONENT INVENTORY
            </div>
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* MATRIX VIEW */}
        {activeTab === 'matrix' && (
          <div className="space-y-8">
            {/* 3D Matrix Visualization */}
            <div className="bg-white border p-8">
              <h2 className="text-lg mb-6" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                3-Dimensional Component Matrix
              </h2>
              
              <div className="grid grid-cols-3 gap-6">
                {/* DIMENSION 1: Pattern Type */}
                <div className="border-2 border-purple-200 bg-purple-50/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-purple-500 flex items-center justify-center">
                      <Box className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                      DIMENSION 1: PATTERN TYPE
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Layout className="w-4 h-4 text-purple-600" />
                        <div className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                          Layout Pattern
                        </div>
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'system-ui' }}>
                        How elements are arranged
                      </div>
                      <div className="mt-2 text-xs text-purple-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.type === 'Layout').length} patterns
                      </div>
                    </div>
                    <div className="bg-white border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <div className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                          Content Pattern
                        </div>
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'system-ui' }}>
                        What elements contain
                      </div>
                      <div className="mt-2 text-xs text-purple-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.type === 'Content').length} patterns
                      </div>
                    </div>
                    <div className="bg-white border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-purple-600" />
                        <div className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                          Behavior Pattern
                        </div>
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'system-ui' }}>
                        How elements respond/interact
                      </div>
                      <div className="mt-2 text-xs text-purple-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.type === 'Behavior').length} patterns
                      </div>
                    </div>
                  </div>
                </div>

                {/* DIMENSION 2: Reusability */}
                <div className="border-2 border-emerald-200 bg-emerald-50/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                      DIMENSION 2: REUSABILITY
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white border p-3">
                      <div className="text-sm mb-1" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        Unique
                      </div>
                      <div className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'system-ui' }}>
                        One-off, keep inline
                      </div>
                      <div className="text-xs text-emerald-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.reusability === 'Unique').length} patterns
                      </div>
                    </div>
                    <div className="bg-white border p-3">
                      <div className="text-sm mb-1" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        Template
                      </div>
                      <div className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'system-ui' }}>
                        2+ uses, extract component
                      </div>
                      <div className="text-xs text-emerald-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.reusability === 'Template').length} patterns
                      </div>
                    </div>
                    <div className="bg-white border p-3">
                      <div className="text-sm mb-1" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        System
                      </div>
                      <div className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'system-ui' }}>
                        Core pattern, reuse everywhere
                      </div>
                      <div className="text-xs text-emerald-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.reusability === 'System').length} patterns
                      </div>
                    </div>
                  </div>
                </div>

                {/* DIMENSION 3: Device Variant */}
                <div className="border-2 border-cyan-200 bg-cyan-50/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                      DIMENSION 3: DEVICE VARIANT
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Monitor className="w-4 h-4 text-cyan-600" />
                        <div className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                          Desktop
                        </div>
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'system-ui' }}>
                        Desktop-specific variant
                      </div>
                      <div className="mt-2 text-xs text-cyan-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.hasDesktop).length} patterns
                      </div>
                    </div>
                    <div className="bg-white border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Smartphone className="w-4 h-4 text-cyan-600" />
                        <div className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                          Mobile
                        </div>
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'system-ui' }}>
                        Mobile-specific variant
                      </div>
                      <div className="mt-2 text-xs text-cyan-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.hasMobile).length} patterns
                      </div>
                    </div>
                    <div className="bg-white border p-3">
                      <div className="text-sm mb-1" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        Adaptive
                      </div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'system-ui' }}>
                        Works on both devices
                      </div>
                      <div className="mt-2 text-xs text-cyan-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {patterns.filter(p => p.hasDesktop && p.hasMobile).length} patterns
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white border p-6">
                <div className="text-3xl mb-2" style={{ fontFamily: 'system-ui', fontWeight: 800 }}>
                  {patterns.length}
                </div>
                <div className="text-sm text-gray-600" style={{ fontFamily: 'system-ui' }}>
                  Total Patterns
                </div>
              </div>
              <div className="bg-white border p-6">
                <div className="text-3xl mb-2" style={{ fontFamily: 'system-ui', fontWeight: 800 }}>
                  {components.length}
                </div>
                <div className="text-sm text-gray-600" style={{ fontFamily: 'system-ui' }}>
                  Extracted Components
                </div>
              </div>
              <div className="bg-white border p-6">
                <div className="text-3xl mb-2" style={{ fontFamily: 'system-ui', fontWeight: 800 }}>
                  {sections.filter(s => s.status === 'Complete').length}/{sections.length}
                </div>
                <div className="text-sm text-gray-600" style={{ fontFamily: 'system-ui' }}>
                  Sections Processed
                </div>
              </div>
              <div className="bg-white border p-6">
                <div className="text-3xl mb-2" style={{ fontFamily: 'system-ui', fontWeight: 800 }}>
                  {Math.round((sections.filter(s => s.status === 'Complete').length / sections.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600" style={{ fontFamily: 'system-ui' }}>
                  Completion Rate
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PATTERN CATALOG */}
        {activeTab === 'patterns' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                      FILTERS:
                    </span>
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border bg-white text-sm"
                    style={{ fontFamily: 'system-ui', fontWeight: 500 }}
                  >
                    <option value="all">All Types</option>
                    <option value="Layout">Layout</option>
                    <option value="Content">Content</option>
                    <option value="Behavior">Behavior</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border bg-white text-sm"
                    style={{ fontFamily: 'system-ui', fontWeight: 500 }}
                  >
                    <option value="all">All Status</option>
                    <option value="Extracted">Extracted</option>
                    <option value="Evaluate">Evaluate</option>
                    <option value="Inline">Keep Inline</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white flex items-center gap-2 hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                    ADD PATTERN
                  </span>
                </button>
              </div>
            </div>

            {/* Pattern Cards */}
            <div className="grid grid-cols-2 gap-6">
              {filteredPatterns.map(pattern => (
                <div key={pattern.id} className="bg-white border p-6 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 border border-purple-200 flex items-center justify-center">
                        {getTypeIcon(pattern.type)}
                      </div>
                      <div>
                        <h3 className="text-base mb-1" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                          {pattern.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs border ${getStatusColor(pattern.status)}`} style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                            {pattern.status}
                          </span>
                          <span className="text-xs text-gray-500" style={{ fontFamily: 'system-ui' }}>
                            {pattern.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl mb-1" style={{ fontFamily: 'system-ui', fontWeight: 800 }}>
                        {pattern.uses}
                      </div>
                      <div className="text-xs text-gray-500" style={{ fontFamily: 'system-ui' }}>
                        uses
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'system-ui', lineHeight: 1.6 }}>
                    {pattern.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    {pattern.hasDesktop && (
                      <div className="px-2 py-1 bg-cyan-50 border border-cyan-200 flex items-center gap-1">
                        <Monitor className="w-3 h-3 text-cyan-600" />
                        <span className="text-xs text-cyan-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                          Desktop
                        </span>
                      </div>
                    )}
                    {pattern.hasMobile && (
                      <div className="px-2 py-1 bg-cyan-50 border border-cyan-200 flex items-center gap-1">
                        <Smartphone className="w-3 h-3 text-cyan-600" />
                        <span className="text-xs text-cyan-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                          Mobile
                        </span>
                      </div>
                    )}
                    <div className={`px-2 py-1 border ${
                      pattern.reusability === 'System' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                      pattern.reusability === 'Template' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                      'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <span className="text-xs" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                        {pattern.reusability}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                      USED IN:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pattern.usedIn.slice(0, 4).map((location, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-50 border text-xs text-gray-700" style={{ fontFamily: 'system-ui' }}>
                          {location}
                        </span>
                      ))}
                      {pattern.usedIn.length > 4 && (
                        <span className="px-2 py-1 bg-gray-50 border text-xs text-gray-500" style={{ fontFamily: 'system-ui' }}>
                          +{pattern.usedIn.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION AUDIT */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            <div className="bg-white border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                  Section Processing Queue
                </h2>
                <button className="px-4 py-2 bg-purple-600 text-white flex items-center gap-2 hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                    ADD SECTION
                  </span>
                </button>
              </div>

              <div className="space-y-4">
                {sections.map(section => (
                  <div key={section.id} className={`border-l-4 p-6 ${
                    section.status === 'Complete' ? 'border-emerald-500 bg-emerald-50/30' :
                    section.status === 'Analyzing' ? 'border-purple-500 bg-purple-50/30' :
                    'border-cyan-500 bg-cyan-50/30'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                            {section.name}
                          </h3>
                          <span className="px-2 py-0.5 bg-gray-100 border text-xs text-gray-600" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                            {section.page}
                          </span>
                          <span className={`px-2 py-0.5 text-xs border ${getStatusColor(section.status)}`} style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                            {section.status}
                          </span>
                        </div>

                        {section.notes && (
                          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'system-ui', lineHeight: 1.6 }}>
                            {section.notes}
                          </p>
                        )}

                        {section.patterns.length > 0 && (
                          <div className="mb-3">
                            <div className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                              PATTERNS IDENTIFIED:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {section.patterns.map((patternName, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white border text-xs" style={{ fontFamily: 'system-ui', fontWeight: 500 }}>
                                  {patternName}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {section.status === 'Complete' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : section.status === 'Analyzing' ? (
                          <Clock className="w-5 h-5 text-purple-600" />
                        ) : (
                          <Eye className="w-5 h-5 text-cyan-600" />
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COMPONENT INVENTORY */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            <div className="bg-white border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                  Extracted Components
                </h2>
                <button className="px-4 py-2 bg-purple-600 text-white flex items-center gap-2 hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm" style={{ fontFamily: 'system-ui', fontWeight: 600 }}>
                    ADD COMPONENT
                  </span>
                </button>
              </div>

              {components.length === 0 ? (
                <div className="text-center py-12">
                  <Code className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500" style={{ fontFamily: 'system-ui' }}>
                    No components extracted yet. Start analyzing sections to build your library.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {components.map(component => (
                    <div key={component.id} className="border p-4 hover:border-purple-300 transition-colors">
                      <h3 className="text-sm mb-2" style={{ fontFamily: 'system-ui', fontWeight: 700 }}>
                        {component.name}
                      </h3>
                      <div className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'system-ui' }}>
                        {component.filePath}
                      </div>
                      <div className="flex items-center gap-2">
                        {component.device === 'Desktop' && <Monitor className="w-4 h-4 text-cyan-600" />}
                        {component.device === 'Mobile' && <Smartphone className="w-4 h-4 text-cyan-600" />}
                        <span className="text-xs text-gray-600" style={{ fontFamily: 'system-ui' }}>
                          {component.usedIn.length} uses
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
