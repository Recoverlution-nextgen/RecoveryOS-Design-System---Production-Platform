/**
 * COMMAND CENTER PATTERN LIBRARY
 * 
 * Live examples of all 7 universal patterns.
 * Visual cheatsheet for building new Control Rooms.
 * 
 * Route: /command-center/patterns
 * 
 * Created: December 26, 2025
 */

import React, { useState } from 'react';
import { 
  CommandCenterLayout, 
  CommandCenterCard,
  SectionHeader,
  CC_TOKENS,
} from '../commandcenter/CommandCenterLayout';
import {
  SidebarContentLayout,
  HeatmapGrid,
  FilterableGrid,
  ProgressTracker,
  StatsDashboard,
  TabbedContent,
  SearchFilterBar,
  getHeatColor,
  COVERAGE_COLOR_SCALE,
} from '../commandcenter/UniversalPatterns';

interface PatternLibraryProps {
  onNavigate: (page: string) => void;
}

export default function CommandCenterPatternLibrary({ onNavigate }: PatternLibraryProps) {
  const [view, setView] = useState<string>('all');

  const views = [
    { id: 'all', label: 'All Patterns', icon: '🎨' },
    { id: 'layout', label: 'Layouts', icon: '📐' },
    { id: 'data', label: 'Data Display', icon: '📊' },
    { id: 'interactive', label: 'Interactive', icon: '🖱️' },
  ];

  return (
    <CommandCenterLayout
      title="Pattern Library"
      subtitle="7 universal patterns for building Control Rooms"
      icon="🎨"
      currentView={view}
      views={views}
      onViewChange={setView}
      onNavigate={onNavigate}
    >
      {view === 'all' && <AllPatternsView />}
      {view === 'layout' && <LayoutPatternsView />}
      {view === 'data' && <DataPatternsView />}
      {view === 'interactive' && <InteractivePatternsView />}
    </CommandCenterLayout>
  );
}

// ============================================================================
// ALL PATTERNS VIEW
// ============================================================================

function AllPatternsView() {
  return (
    <div className="space-y-12">
      <Pattern1Demo />
      <Pattern2Demo />
      <Pattern3Demo />
      <Pattern4Demo />
      <Pattern5Demo />
      <Pattern6Demo />
      <Pattern7Demo />
    </div>
  );
}

function LayoutPatternsView() {
  return (
    <div className="space-y-12">
      <Pattern1Demo />
      <Pattern6Demo />
    </div>
  );
}

function DataPatternsView() {
  return (
    <div className="space-y-12">
      <Pattern2Demo />
      <Pattern4Demo />
      <Pattern5Demo />
    </div>
  );
}

function InteractivePatternsView() {
  return (
    <div className="space-y-12">
      <Pattern3Demo />
      <Pattern7Demo />
    </div>
  );
}

// ============================================================================
// PATTERN 1: SIDEBAR + CONTENT
// ============================================================================

function Pattern1Demo() {
  const [selectedSchema, setSelectedSchema] = useState<string | null>('shame');

  const schemas = [
    { id: 'shame', name: 'Shame / Unworthiness', progress: 60 },
    { id: 'control', name: 'Control / Hypervigilance', progress: 45 },
    { id: 'abandonment', name: 'Abandonment / Trust', progress: 30 },
  ];

  return (
    <div>
      <SectionHeader
        title="Pattern 1: Sidebar + Content"
        subtitle="Left sidebar with selectable items, main content on right"
        icon="📐"
      />
      <div 
        className="p-6 border"
        style={{ 
          backgroundColor: CC_TOKENS.colors.bg.card,
          borderColor: CC_TOKENS.colors.border.subtle,
        }}
      >
        <SidebarContentLayout
          items={schemas}
          selectedItem={schemas.find((s) => s.id === selectedSchema) || null}
          onSelectItem={(item) => setSelectedSchema(item.id)}
          sidebarTitle="Belief Schemas"
          sidebarWidth="narrow"
          renderSidebarItem={(schema, isSelected) => (
            <div 
              className="p-3 cursor-pointer transition-all"
              style={{
                backgroundColor: isSelected 
                  ? CC_TOKENS.colors.brand.primary 
                  : CC_TOKENS.colors.bg.card,
                border: `1px solid ${isSelected 
                  ? CC_TOKENS.colors.brand.secondary 
                  : CC_TOKENS.colors.border.subtle}`,
                color: CC_TOKENS.colors.text.primary,
              }}
            >
              <div className="mb-2" style={{ fontSize: CC_TOKENS.typography.body.fontSize }}>
                {schema.name}
              </div>
              <div 
                className="h-1"
                style={{ backgroundColor: CC_TOKENS.colors.bg.card }}
              >
                <div 
                  style={{
                    width: `${schema.progress}%`,
                    height: '100%',
                    backgroundColor: CC_TOKENS.colors.brand.secondary,
                  }}
                />
              </div>
            </div>
          )}
          renderMainContent={(schema) => (
            schema ? (
              <CommandCenterCard>
                <h3 
                  className="mb-2"
                  style={{ 
                    color: CC_TOKENS.colors.text.primary,
                    fontSize: CC_TOKENS.typography.h3.fontSize,
                  }}
                >
                  {schema.name}
                </h3>
                <p style={{ color: CC_TOKENS.colors.text.secondary }}>
                  Progress: {schema.progress}%
                </p>
                <p 
                  className="mt-4"
                  style={{ color: CC_TOKENS.colors.text.secondary }}
                >
                  This is where the main content for the selected item would appear.
                  Could be a belief ladder, journey details, scene editor, etc.
                </p>
              </CommandCenterCard>
            ) : (
              <CommandCenterCard>
                <div className="text-center py-12">
                  <div className="text-4xl mb-2">🪜</div>
                  <p style={{ color: CC_TOKENS.colors.text.secondary }}>
                    Select a schema from the sidebar
                  </p>
                </div>
              </CommandCenterCard>
            )
          )}
        />
      </div>
    </div>
  );
}

// ============================================================================
// PATTERN 2: HEATMAP GRID
// ============================================================================

function Pattern2Demo() {
  const data = {
    'ER': { engage: 12, calm: 24, excite: 8 },
    'SR': { engage: 10, calm: 20, excite: 6 },
    'SC': { engage: 18, calm: 10, excite: 12 },
  };

  return (
    <div>
      <SectionHeader
        title="Pattern 2: Heatmap Grid"
        subtitle="2D coverage analysis with color-coded cells"
        icon="🔥"
      />
      <CommandCenterCard>
        <HeatmapGrid
          rows={['ER', 'SR', 'SC']}
          columns={['engage', 'calm', 'excite']}
          data={data}
          getColor={(value) => {
            if (value >= 20) return CC_TOKENS.colors.status.success;
            if (value >= 12) return CC_TOKENS.colors.brand.primary;
            if (value >= 6) return CC_TOKENS.colors.status.warning;
            return CC_TOKENS.colors.status.error;
          }}
          onCellClick={(row, col, value) => console.log(`${row} × ${col}: ${value}`)}
          rowLabel="Pillar"
          columnLabel="Intent"
        />
      </CommandCenterCard>
    </div>
  );
}

// ============================================================================
// PATTERN 3: FILTERABLE GRID
// ============================================================================

function Pattern3Demo() {
  const items = [
    { id: '1', title: 'NaviCue 1', pillar: 'ER', type: 'clinical' },
    { id: '2', title: 'NaviCue 2', pillar: 'SR', type: 'guru' },
    { id: '3', title: 'NaviCue 3', pillar: 'ER', type: 'clinical' },
    { id: '4', title: 'NaviCue 4', pillar: 'SC', type: 'infinite' },
  ];

  return (
    <div>
      <SectionHeader
        title="Pattern 3: Filterable Grid"
        subtitle="Multi-filter content browser with dynamic grid"
        icon="🗂️"
      />
      <CommandCenterCard>
        <FilterableGrid
          items={items}
          filters={[
            {
              id: 'pillar',
              label: 'Pillar',
              type: 'multi',
              options: [
                { value: 'ER', label: 'ER', count: 2 },
                { value: 'SR', label: 'SR', count: 1 },
                { value: 'SC', label: 'SC', count: 1 },
              ],
            },
            {
              id: 'type',
              label: 'Type',
              type: 'single',
              options: [
                { value: 'clinical', label: 'Clinical', count: 2 },
                { value: 'guru', label: 'Guru', count: 1 },
                { value: 'infinite', label: 'Infinite', count: 1 },
              ],
            },
          ]}
          renderCard={(item) => (
            <CommandCenterCard hover border="medium">
              <div 
                style={{ 
                  color: CC_TOKENS.colors.text.primary,
                  fontSize: CC_TOKENS.typography.body.fontSize,
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </div>
              <div 
                style={{ 
                  color: CC_TOKENS.colors.text.tertiary,
                  fontSize: CC_TOKENS.typography.small.fontSize,
                }}
              >
                {item.pillar} • {item.type}
              </div>
            </CommandCenterCard>
          )}
          gridCols={3}
        />
      </CommandCenterCard>
    </div>
  );
}

// ============================================================================
// PATTERN 4: PROGRESS TRACKER
// ============================================================================

function Pattern4Demo() {
  return (
    <div>
      <SectionHeader
        title="Pattern 4: Progress Tracker"
        subtitle="Stage-based progress with visual bars"
        icon="📈"
      />
      <CommandCenterCard>
        <ProgressTracker
          stages={[
            { id: 'knowing', label: 'KNOWING', progress: 85, color: CC_TOKENS.colors.status.warning },
            { id: 'believing', label: 'BELIEVING', progress: 60, color: CC_TOKENS.colors.brand.primary },
            { id: 'embodying', label: 'EMBODYING', progress: 30, color: CC_TOKENS.colors.status.success },
          ]}
          currentStage={1}
          showLabels={true}
          showPercentage={true}
        />
      </CommandCenterCard>
    </div>
  );
}

// ============================================================================
// PATTERN 5: STATS DASHBOARD
// ============================================================================

function Pattern5Demo() {
  return (
    <div>
      <SectionHeader
        title="Pattern 5: Stats Dashboard"
        subtitle="Key metrics grid with change indicators"
        icon="📊"
      />
      <StatsDashboard
        stats={[
          {
            label: 'Total NaviCues',
            value: 500,
            icon: '⚡',
            change: { value: '+50', direction: 'up' },
          },
          {
            label: 'Active Users',
            value: 125,
            icon: '👥',
            change: { value: '-5', direction: 'down' },
          },
          {
            label: 'Completion Rate',
            value: '85%',
            icon: '✓',
            change: { value: '+2%', direction: 'up' },
          },
        ]}
        columns={3}
      />
    </div>
  );
}

// ============================================================================
// PATTERN 6: TABBED CONTENT
// ============================================================================

function Pattern6Demo() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <SectionHeader
        title="Pattern 6: Tabbed Content"
        subtitle="Multiple perspectives on same data"
        icon="📑"
      />
      <CommandCenterCard>
        <TabbedContent
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              icon: '📊',
              badge: 500,
              content: (
                <div style={{ color: CC_TOKENS.colors.text.secondary }}>
                  Overview content goes here
                </div>
              ),
            },
            {
              id: 'details',
              label: 'Details',
              icon: '🔍',
              content: (
                <div style={{ color: CC_TOKENS.colors.text.secondary }}>
                  Detailed content goes here
                </div>
              ),
            },
            {
              id: 'analytics',
              label: 'Analytics',
              icon: '📈',
              badge: '↑ 12%',
              content: (
                <div style={{ color: CC_TOKENS.colors.text.secondary }}>
                  Analytics content goes here
                </div>
              ),
            },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </CommandCenterCard>
    </div>
  );
}

// ============================================================================
// PATTERN 7: SEARCH + FILTER BAR
// ============================================================================

function Pattern7Demo() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <SectionHeader
        title="Pattern 7: Search + Filter Bar"
        subtitle="Universal search with quick filters"
        icon="🔍"
      />
      <CommandCenterCard>
        <SearchFilterBar
          placeholder="Search NaviCues, scenes, content..."
          onSearch={(query) => console.log('Search:', query)}
          quickFilters={[
            { id: 'er', label: 'ER', count: 50 },
            { id: 'sr', label: 'SR', count: 45 },
            { id: 'sc', label: 'SC', count: 40 },
            { id: 'recent', label: 'Recent', count: 25 },
          ]}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
        />
      </CommandCenterCard>
    </div>
  );
}
