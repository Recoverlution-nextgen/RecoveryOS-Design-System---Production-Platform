/**
 * UNIVERSAL COMMAND CENTER PATTERNS
 * 
 * Reusable architectural patterns extracted from NaviCue Arsenal.
 * These patterns work across ALL Control Rooms.
 * 
 * Philosophy: "If you built it once, abstract it. If you built it twice, systematize it."
 * 
 * Created: December 26, 2025
 * Status: Universal Framework
 */

import React, { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { CC_TOKENS, CommandCenterCard } from './CommandCenterLayout';

// ============================================================================
// PATTERN 1: SIDEBAR + MAIN CONTENT (Belief Ladders, Voice Constellation)
// ============================================================================

/**
 * Left sidebar with selectable items + main content area on right.
 * Used in: Belief Ladders (select schema → view ladder), Voice Constellation, etc.
 */
interface SidebarContentLayoutProps<T> {
  items: T[];
  selectedItem: T | null;
  onSelectItem: (item: T) => void;
  renderSidebarItem: (item: T, isSelected: boolean) => ReactNode;
  renderMainContent: (item: T | null) => ReactNode;
  sidebarTitle?: string;
  sidebarWidth?: 'narrow' | 'medium' | 'wide'; // 3, 4, or 5 columns
}

export function SidebarContentLayout<T>({
  items,
  selectedItem,
  onSelectItem,
  renderSidebarItem,
  renderMainContent,
  sidebarTitle,
  sidebarWidth = 'narrow',
}: SidebarContentLayoutProps<T>) {
  const gridCols = {
    narrow: 'grid-cols-12',
    medium: 'grid-cols-12',
    wide: 'grid-cols-12',
  };

  const sidebarCols = {
    narrow: 'col-span-3',
    medium: 'col-span-4',
    wide: 'col-span-5',
  };

  const mainCols = {
    narrow: 'col-span-9',
    medium: 'col-span-8',
    wide: 'col-span-7',
  };

  return (
    <div className={`grid ${gridCols[sidebarWidth]} gap-6`}>
      {/* Sidebar */}
      <div className={sidebarCols[sidebarWidth]}>
        {sidebarTitle && (
          <div 
            className="mb-4"
            style={{ 
              color: CC_TOKENS.colors.text.secondary,
              fontSize: CC_TOKENS.typography.small.fontSize,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {sidebarTitle}
          </div>
        )}
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} onClick={() => onSelectItem(item)}>
              {renderSidebarItem(item, item === selectedItem)}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={mainCols[sidebarWidth]}>
        {renderMainContent(selectedItem)}
      </div>
    </div>
  );
}

// ============================================================================
// PATTERN 2: HEATMAP GRID (Coverage Analysis)
// ============================================================================

/**
 * 2D grid showing coverage/gaps (e.g., Pillars × Intents, Categories × States).
 * Color-coded cells with hover states.
 */
interface HeatmapGridProps {
  rows: string[];
  columns: string[];
  data: Record<string, Record<string, number>>;
  getColor: (value: number) => string;
  onCellClick?: (row: string, column: string, value: number) => void;
  rowLabel?: string;
  columnLabel?: string;
}

export function HeatmapGrid({
  rows,
  columns,
  data,
  getColor,
  onCellClick,
  rowLabel = 'Row',
  columnLabel = 'Column',
}: HeatmapGridProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th 
              className="p-3 text-left text-xs uppercase tracking-wider"
              style={{ color: CC_TOKENS.colors.text.tertiary }}
            >
              {rowLabel}
            </th>
            {columns.map((col) => (
              <th 
                key={col}
                className="p-3 text-center text-xs uppercase tracking-wider"
                style={{ color: CC_TOKENS.colors.text.tertiary }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td 
                className="p-3 text-sm"
                style={{ color: CC_TOKENS.colors.text.primary }}
              >
                {row}
              </td>
              {columns.map((col) => {
                const value = data[row]?.[col] || 0;
                return (
                  <td key={col} className="p-2">
                    <div
                      className="w-full h-12 flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 cursor-pointer"
                      style={{
                        backgroundColor: getColor(value),
                        color: CC_TOKENS.colors.text.primary,
                      }}
                      onClick={() => onCellClick?.(row, col, value)}
                    >
                      {value}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// PATTERN 3: FILTERABLE GRID (Browser, Catalog, Library)
// ============================================================================

/**
 * Grid of items with multi-level filters (track, category, tags).
 * Used in: NaviCue Browser, Content Library, Scene Browser, etc.
 */
interface FilterableGridProps<T> {
  items: T[];
  filters: FilterConfig[];
  renderCard: (item: T) => ReactNode;
  emptyState?: ReactNode;
  gridCols?: 2 | 3 | 4;
}

interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'single' | 'multi'; // Single select or multi-select
}

interface FilterOption {
  value: string;
  label: string;
  count?: number; // Optional: show count of items
}

export function FilterableGrid<T>({
  items,
  filters,
  renderCard,
  emptyState,
  gridCols = 3,
}: FilterableGridProps<T>) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});

  const toggleFilter = (filterId: string, value: string, type: 'single' | 'multi') => {
    if (type === 'single') {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: prev[filterId] === value ? '' : value,
      }));
    } else {
      setActiveFilters((prev) => {
        const current = (prev[filterId] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [filterId]: updated };
      });
    }
  };

  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-6">
        {filters.map((filter) => (
          <div key={filter.id}>
            <div 
              className="mb-2"
              style={{ 
                color: CC_TOKENS.colors.text.secondary,
                fontSize: CC_TOKENS.typography.small.fontSize,
                textTransform: 'uppercase',
              }}
            >
              {filter.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {filter.options.map((option) => {
                const isActive = filter.type === 'single'
                  ? activeFilters[filter.id] === option.value
                  : (activeFilters[filter.id] as string[] || []).includes(option.value);

                return (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter(filter.id, option.value, filter.type)}
                    className="px-3 py-1.5 transition-all"
                    style={{
                      backgroundColor: isActive 
                        ? CC_TOKENS.colors.brand.primary 
                        : CC_TOKENS.colors.bg.card,
                      color: isActive 
                        ? CC_TOKENS.colors.text.primary 
                        : CC_TOKENS.colors.text.secondary,
                      border: `1px solid ${isActive 
                        ? CC_TOKENS.colors.brand.secondary 
                        : CC_TOKENS.colors.border.subtle}`,
                      fontSize: CC_TOKENS.typography.small.fontSize,
                    }}
                  >
                    {option.label}
                    {option.count !== undefined && (
                      <span className="ml-1.5" style={{ opacity: 0.6 }}>
                        ({option.count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      {items.length > 0 ? (
        <div className={`grid ${gridClasses[gridCols]} gap-4`}>
          {items.map((item, index) => (
            <div key={index}>{renderCard(item)}</div>
          ))}
        </div>
      ) : (
        emptyState || (
          <CommandCenterCard>
            <div className="text-center py-12">
              <p style={{ color: CC_TOKENS.colors.text.secondary }}>
                No items match the current filters
              </p>
            </div>
          </CommandCenterCard>
        )
      )}
    </div>
  );
}

// ============================================================================
// PATTERN 4: PROGRESS TRACKER (Completion, Coverage, Status)
// ============================================================================

/**
 * Progress bar with stages (KNOWING → BELIEVING → EMBODYING).
 * Used in: Belief Ladders, Journey Progress, Content Completion, etc.
 */
interface ProgressTrackerProps {
  stages: ProgressStage[];
  currentStage: number; // Index of current stage
  showLabels?: boolean;
  showPercentage?: boolean;
}

interface ProgressStage {
  id: string;
  label: string;
  progress: number; // 0-100
  color?: string;
}

export function ProgressTracker({
  stages,
  currentStage,
  showLabels = true,
  showPercentage = true,
}: ProgressTrackerProps) {
  return (
    <div className="space-y-3">
      {stages.map((stage, index) => {
        const isActive = index === currentStage;
        const isComplete = index < currentStage;

        return (
          <div key={stage.id}>
            {showLabels && (
              <div className="flex items-center justify-between mb-1">
                <span 
                  style={{ 
                    color: isActive 
                      ? CC_TOKENS.colors.text.primary 
                      : CC_TOKENS.colors.text.secondary,
                    fontSize: CC_TOKENS.typography.small.fontSize,
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {stage.label}
                </span>
                {showPercentage && (
                  <span 
                    style={{ 
                      color: CC_TOKENS.colors.text.tertiary,
                      fontSize: CC_TOKENS.typography.small.fontSize,
                    }}
                  >
                    {stage.progress}%
                  </span>
                )}
              </div>
            )}
            <div 
              className="h-2 overflow-hidden"
              style={{ 
                backgroundColor: CC_TOKENS.colors.bg.card,
                border: `1px solid ${CC_TOKENS.colors.border.subtle}`,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stage.progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: stage.color || CC_TOKENS.colors.brand.primary,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// PATTERN 5: STATS DASHBOARD (Quick Metrics)
// ============================================================================

/**
 * Grid of stat cards showing key metrics.
 * Used in: Arsenal stats, Journey stats, Content stats, etc.
 */
interface StatsDashboardProps {
  stats: StatCard[];
  columns?: 2 | 3 | 4;
}

interface StatCard {
  label: string;
  value: string | number;
  change?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: string;
  color?: string;
}

export function StatsDashboard({ stats, columns = 3 }: StatsDashboardProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {stats.map((stat, index) => (
        <CommandCenterCard key={index}>
          <div className="flex items-start justify-between mb-3">
            {stat.icon && <span className="text-2xl">{stat.icon}</span>}
            {stat.change && (
              <span 
                className="px-2 py-0.5"
                style={{
                  backgroundColor: 
                    stat.change.direction === 'up' ? `${CC_TOKENS.colors.status.success}20` :
                    stat.change.direction === 'down' ? `${CC_TOKENS.colors.status.error}20` :
                    `${CC_TOKENS.colors.status.neutral}20`,
                  color: 
                    stat.change.direction === 'up' ? CC_TOKENS.colors.status.success :
                    stat.change.direction === 'down' ? CC_TOKENS.colors.status.error :
                    CC_TOKENS.colors.status.neutral,
                  fontSize: CC_TOKENS.typography.small.fontSize,
                  border: `1px solid ${
                    stat.change.direction === 'up' ? `${CC_TOKENS.colors.status.success}40` :
                    stat.change.direction === 'down' ? `${CC_TOKENS.colors.status.error}40` :
                    `${CC_TOKENS.colors.status.neutral}40`
                  }`,
                }}
              >
                {stat.change.direction === 'up' && '↑ '}
                {stat.change.direction === 'down' && '↓ '}
                {stat.change.value}
              </span>
            )}
          </div>
          <div 
            className="mb-1"
            style={{ 
              color: stat.color || CC_TOKENS.colors.brand.secondary,
              fontSize: '2rem',
              lineHeight: 1,
            }}
          >
            {stat.value}
          </div>
          <div 
            style={{ 
              color: CC_TOKENS.colors.text.secondary,
              fontSize: CC_TOKENS.typography.small.fontSize,
            }}
          >
            {stat.label}
          </div>
        </CommandCenterCard>
      ))}
    </div>
  );
}

// ============================================================================
// PATTERN 6: TABBED CONTENT (Multiple Perspectives on Same Data)
// ============================================================================

/**
 * Horizontal tabs with content panels.
 * Used in: Different views of same data, content types, etc.
 */
interface TabbedContentProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

interface Tab {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  content: ReactNode;
}

export function TabbedContent({ tabs, activeTab, onTabChange }: TabbedContentProps) {
  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b" style={{ borderColor: CC_TOKENS.colors.border.subtle }}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="px-4 py-3 transition-all relative"
              style={{
                color: isActive 
                  ? CC_TOKENS.colors.text.primary 
                  : CC_TOKENS.colors.text.secondary,
                fontSize: CC_TOKENS.typography.body.fontSize,
                borderBottom: `2px solid ${isActive 
                  ? CC_TOKENS.colors.brand.primary 
                  : 'transparent'}`,
              }}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
              {tab.badge && (
                <span 
                  className="ml-2 px-1.5 py-0.5"
                  style={{
                    backgroundColor: CC_TOKENS.colors.brand.secondary,
                    color: CC_TOKENS.colors.text.primary,
                    fontSize: CC_TOKENS.typography.small.fontSize,
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeContent}
      </motion.div>
    </div>
  );
}

// ============================================================================
// PATTERN 7: SEARCH + FILTER BAR (Universal Search)
// ============================================================================

/**
 * Search input with quick filters.
 * Used everywhere: Content search, scene search, NaviCue search, etc.
 */
interface SearchFilterBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  quickFilters?: QuickFilter[];
  activeFilters?: string[];
  onToggleFilter?: (filterId: string) => void;
}

interface QuickFilter {
  id: string;
  label: string;
  count?: number;
}

export function SearchFilterBar({
  placeholder = 'Search...',
  onSearch,
  quickFilters = [],
  activeFilters = [],
  onToggleFilter,
}: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 transition-all"
        style={{
          backgroundColor: CC_TOKENS.colors.bg.card,
          color: CC_TOKENS.colors.text.primary,
          border: `1px solid ${CC_TOKENS.colors.border.medium}`,
          fontSize: CC_TOKENS.typography.body.fontSize,
        }}
      />

      {/* Quick Filters */}
      {quickFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => {
            const isActive = activeFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => onToggleFilter?.(filter.id)}
                className="px-3 py-1.5 transition-all"
                style={{
                  backgroundColor: isActive 
                    ? CC_TOKENS.colors.brand.primary 
                    : CC_TOKENS.colors.bg.card,
                  color: isActive 
                    ? CC_TOKENS.colors.text.primary 
                    : CC_TOKENS.colors.text.secondary,
                  border: `1px solid ${isActive 
                    ? CC_TOKENS.colors.brand.secondary 
                    : CC_TOKENS.colors.border.subtle}`,
                  fontSize: CC_TOKENS.typography.small.fontSize,
                }}
              >
                {filter.label}
                {filter.count !== undefined && (
                  <span className="ml-1.5" style={{ opacity: 0.6 }}>
                    ({filter.count})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// HELPER: COLOR SCALES (For heatmaps, progress bars, etc.)
// ============================================================================

/**
 * Generate color based on value and thresholds.
 * Used in: Heatmaps, coverage grids, status indicators.
 */
export function getHeatColor(
  value: number,
  thresholds: { min: number; color: string }[]
): string {
  // Sort thresholds by min value descending
  const sorted = [...thresholds].sort((a, b) => b.min - a.min);
  
  for (const threshold of sorted) {
    if (value >= threshold.min) {
      return threshold.color;
    }
  }
  
  return sorted[sorted.length - 1]?.color || CC_TOKENS.colors.status.neutral;
}

/**
 * Default color scale for coverage/completion (0-100%).
 */
export const COVERAGE_COLOR_SCALE = [
  { min: 80, color: CC_TOKENS.colors.status.success },   // 80-100%: Green
  { min: 50, color: CC_TOKENS.colors.brand.secondary },  // 50-79%: Purple
  { min: 25, color: CC_TOKENS.colors.status.warning },   // 25-49%: Yellow
  { min: 0, color: CC_TOKENS.colors.status.error },      // 0-24%: Red
];
