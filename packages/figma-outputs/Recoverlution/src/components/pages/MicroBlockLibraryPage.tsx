import { useState, useMemo } from 'react';
import { Search, Filter, ArrowLeft, Download, Grid3x3, List, Star, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MicroBlockCard } from '../MicroBlockCard';
import { StoryLink } from '../StoryLink';
import { 
  PILLARS, 
  EMOTIONAL_REGULATION_BLOCKS,
  searchMicroBlocks,
  getMicroBlocksByState,
  STATE_COLORS,
  DIFFICULTY_COLORS,
  type MicroBlock
} from '../../utils/microBlockData';

interface MicroBlockLibraryPageProps {
  onNavigate?: (page: string) => void;
}

type ViewMode = 'list' | 'grid';
type SortMode = 'alphabetical' | 'most-used' | 'most-effective' | 'newest';

export function MicroBlockLibraryPage({ onNavigate }: MicroBlockLibraryPageProps) {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<'red' | 'orange' | 'green' | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortMode, setSortMode] = useState<SortMode>('alphabetical');
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  const [favoritedBlocks, setFavoritedBlocks] = useState<Set<string>>(new Set());

  // Filter and sort blocks
  const filteredBlocks = useMemo(() => {
    let blocks = [...EMOTIONAL_REGULATION_BLOCKS];

    // Search filter
    if (searchQuery.trim()) {
      blocks = searchMicroBlocks(searchQuery);
    }

    // Pillar filter
    if (selectedPillar) {
      blocks = blocks.filter(b => b.pillarId === selectedPillar);
    }

    // State filter
    if (selectedState) {
      blocks = blocks.filter(b => b.targetStates.includes(selectedState));
    }

    // Difficulty filter
    if (selectedDifficulty) {
      blocks = blocks.filter(b => b.difficulty === selectedDifficulty);
    }

    // Sorting
    switch (sortMode) {
      case 'alphabetical':
        blocks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'most-used':
        blocks.sort((a, b) => b.favoriteCount - a.favoriteCount);
        break;
      case 'most-effective':
        blocks.sort((a, b) => b.efficacyScore - a.efficacyScore);
        break;
      case 'newest':
        blocks.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
    }

    return blocks;
  }, [searchQuery, selectedPillar, selectedState, selectedDifficulty, sortMode]);

  // Statistics
  const stats = useMemo(() => {
    const totalBlocks = EMOTIONAL_REGULATION_BLOCKS.length;
    const totalPillars = PILLARS.length;
    const mostUsed = [...EMOTIONAL_REGULATION_BLOCKS].sort((a, b) => b.practiceCount - a.practiceCount)[0];
    
    return {
      totalBlocks,
      totalPillars,
      mostUsed,
    };
  }, []);

  // Active filters count
  const activeFiltersCount = [selectedPillar, selectedState, selectedDifficulty].filter(Boolean).length;

  // Clear all filters
  const clearFilters = () => {
    setSelectedPillar(null);
    setSelectedState(null);
    setSelectedDifficulty(null);
    setSearchQuery('');
  };

  // Toggle favorite
  const toggleFavorite = (blockId: string) => {
    setFavoritedBlocks(prev => {
      const next = new Set(prev);
      if (next.has(blockId)) {
        next.delete(blockId);
      } else {
        next.add(blockId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            {onNavigate && (
              <button 
                onClick={() => onNavigate('docs-brand-anchor')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <p className="text-purple-200 text-sm mb-1">ST44: Micro-Block Library</p>
              <h1 className="font-display text-3xl md:text-4xl">
                Micro-Block Library
              </h1>
            </div>
          </div>
          <p className="text-purple-100 text-lg max-w-3xl">
            The definitive reference for all therapeutic knowledge and practices. Each micro-block is an atomic unit, searchable, portable, and forever yours to practice.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-6xl mx-auto px-6 -mt-6">
        {/* Related DNA Foundation */}
        {onNavigate && (
          <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-xl p-6 border border-[#5739FB]/10 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-[#3E2BB8]" />
              <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                Built on DNA Foundation
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              48 micro-blocks mapped to the Six Pillars framework and HCP architecture
            </p>
            <div className="flex flex-wrap gap-2">
              <StoryLink storyId="ST2" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST5" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST6" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST7" onNavigate={onNavigate} variant="pill" showTitle />
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3E2BB8] mb-1">
                {stats.totalBlocks}
              </div>
              <div className="text-sm text-gray-600">
                Micro-Blocks Documented
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#5739FB] mb-1">
                {stats.totalPillars}
              </div>
              <div className="text-sm text-gray-600">
                Pillars of Recovery
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Most Used</div>
              <div className="text-lg font-semibold text-[#7C67FF]">
                {stats.mostUsed.name}
              </div>
              <div className="text-xs text-gray-500">
                {stats.mostUsed.practiceCount.toLocaleString()} practices
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Pillar Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Filter by Pillar
              </label>
              <select
                value={selectedPillar || ''}
                onChange={(e) => setSelectedPillar(e.target.value || null)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5739FB] focus:border-transparent"
              >
                <option value="">All Pillars</option>
                {PILLARS.map(pillar => (
                  <option key={pillar.id} value={pillar.id}>
                    {pillar.name} ({pillar.blockCount})
                  </option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Filter by State
              </label>
              <select
                value={selectedState || ''}
                onChange={(e) => setSelectedState((e.target.value || null) as any)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5739FB] focus:border-transparent"
              >
                <option value="">All States</option>
                <option value="red">🔴 RED (Crisis)</option>
                <option value="orange">🟠 ORANGE (Elevated)</option>
                <option value="green">🟢 GREEN (Regulated)</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Filter by Difficulty
              </label>
              <select
                value={selectedDifficulty || ''}
                onChange={(e) => setSelectedDifficulty((e.target.value || null) as any)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5739FB] focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Sort By
              </label>
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5739FB] focus:border-transparent"
              >
                <option value="alphabetical">A-Z</option>
                <option value="most-used">Most Used</option>
                <option value="most-effective">Most Effective</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>
          </div>

          {/* Active Filters & View Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <>
                  <span className="text-sm text-gray-600">
                    {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 text-xs"
                  >
                    Clear All
                  </Button>
                </>
              )}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-[#5739FB] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-[#5739FB] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredBlocks.length} of {stats.totalBlocks} micro-blocks
        </div>

        {/* Blocks List */}
        {filteredBlocks.length > 0 ? (
          <div className="space-y-4">
            {filteredBlocks.map((block) => (
              <MicroBlockCard
                key={block.id}
                block={block}
                isExpanded={expandedBlockId === block.id}
                onToggleExpand={() => setExpandedBlockId(expandedBlockId === block.id ? null : block.id)}
                onFavorite={toggleFavorite}
                isFavorited={favoritedBlocks.has(block.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No micro-blocks match your filters</p>
            <p className="text-sm text-gray-500 mb-6">Try adjusting your search or filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display mb-2 text-purple-900">
                The Sphere Principle
              </h4>
              <p className="text-sm text-purple-800 leading-relaxed">
                Everyone is a sphere filled with blocks. When that sphere rolls through life, whatever block is touching the floor is what you're working with. Blocks are universal, portable, contextual, and forever. You never "complete" a block. You practice it ongoing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
