/**
 * FILTER BAR - PRODUCTION-READY FILTERING COMPONENT
 * Multiple filter types · Search · Create button
 */

import { Search, Plus, Filter } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

interface FilterBarProps {
  filters: FilterConfig[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onCreateNew?: () => void;
  createLabel?: string;
}

export function FilterBar({ 
  filters, 
  searchQuery = '', 
  onSearchChange, 
  onCreateNew,
  createLabel = 'Create New' 
}: FilterBarProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Left: Filters */}
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <Filter className="w-4 h-4 text-zinc-500" />
          {filters.map((filter) => (
            <div key={filter.label} className="flex items-center gap-2">
              <label className="text-sm text-zinc-400">{filter.label}:</label>
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-1.5 focus:outline-none focus:border-[#5739FB]"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Right: Search + Create */}
        <div className="flex gap-3 w-full lg:w-auto">
          {onSearchChange && (
            <div className="relative flex-1 lg:flex-initial lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-full bg-zinc-800 border border-zinc-700 pl-10 pr-4 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#5739FB]"
              />
            </div>
          )}
          
          {onCreateNew && (
            <button
              onClick={onCreateNew}
              className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              {createLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}