// SEARCH - Intelligent search across all content
// Search soundbites, practices, articles, and more with smart filters

import { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, X, Play, Heart, BookOpen, Compass } from 'lucide-react';
import { Button } from '../ui/button';

interface SearchResult {
  id: string;
  type: 'soundbite' | 'practice' | 'article' | 'journey' | 'insight';
  title: string;
  description: string;
  pillar: string;
  concept?: string;
  theme?: string;
  tags: string[];
  relevanceScore: number;
  color: string;
}

const PILLARS = [
  { id: 'ER', name: 'Emotional Regulation', color: '#7C67FF' },
  { id: 'SR', name: 'Stress Resilience', color: '#C49DC4' },
  { id: 'SC', name: 'Social Connectivity', color: '#9D8FFF' },
  { id: 'CR', name: 'Cognitive Reframing', color: '#3E2BB8' },
  { id: 'II', name: 'Identity Integration', color: '#5739FB' },
  { id: 'DM', name: 'Decision Mastery', color: '#A8C4E1' },
];

const CONTENT_TYPES = [
  { id: 'soundbite', label: 'Soundbites', icon: Play },
  { id: 'practice', label: 'Practices', icon: Heart },
  { id: 'article', label: 'Articles', icon: BookOpen },
  { id: 'journey', label: 'Journeys', icon: Compass },
];

export function SearchInterface() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    pillars: [] as string[],
    contentTypes: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [query, filters]);

  const performSearch = async () => {
    setLoading(true);
    
    try {
      // Search backend
      const params = new URLSearchParams({
        q: query,
        pillars: filters.pillars.join(','),
        types: filters.contentTypes.join(','),
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
      
      // Mock results for demo
      setResults([
        {
          id: '1',
          type: 'soundbite',
          title: 'The Power of Pause',
          description: 'Learn to create space between stimulus and response',
          pillar: 'ER',
          concept: 'Emotional Awareness',
          theme: 'Mindful Response',
          tags: ['pause', 'awareness', 'response'],
          relevanceScore: 0.95,
          color: '#7C67FF',
        },
        {
          id: '2',
          type: 'practice',
          title: 'Box Breathing Technique',
          description: '4-4-4-4 breathing pattern for stress reduction',
          pillar: 'SR',
          concept: 'Stress Management',
          theme: 'Breathwork',
          tags: ['breathing', 'stress', 'calm'],
          relevanceScore: 0.87,
          color: '#C49DC4',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePillar = (pillarId: string) => {
    setFilters(prev => ({
      ...prev,
      pillars: prev.pillars.includes(pillarId)
        ? prev.pillars.filter(p => p !== pillarId)
        : [...prev.pillars, pillarId],
    }));
  };

  const handleToggleContentType = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(typeId)
        ? prev.contentTypes.filter(t => t !== typeId)
        : [...prev.contentTypes, typeId],
    }));
  };

  const handleClearFilters = () => {
    setFilters({ pillars: [], contentTypes: [] });
  };

  const activeFilterCount = filters.pillars.length + filters.contentTypes.length;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <SearchIcon className="w-8 h-8" style={{ color: '#5739FB' }} />
          <h1 className="headline-section text-primary">SEARCH</h1>
        </div>
        <p className="copy-secondary">Find soundbites, practices, and more</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for soundbites, practices, articles..."
            className="w-full pl-12 pr-32 py-4 border-2 border-[--border] focus:border-primary outline-none text-lg"
          />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-2 hover:bg-black/5 transition-all"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center gap-2 px-4 py-2 border transition-all
                ${showFilters || activeFilterCount > 0
                  ? 'border-primary bg-primary/10' 
                  : 'border-[--border] hover:border-primary/30'
                }
              `}
            >
              <Filter className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="text-sm">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-6 border border-[--border] bg-white">
            {/* Content Type Filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm">Content Type</h3>
                {filters.contentTypes.length > 0 && (
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, contentTypes: [] }))}
                    className="text-xs text-primary hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {CONTENT_TYPES.map(type => {
                  const Icon = type.icon;
                  const isActive = filters.contentTypes.includes(type.id);
                  
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleToggleContentType(type.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 border transition-all
                        ${isActive 
                          ? 'border-primary bg-primary/10' 
                          : 'border-[--border] hover:border-primary/30'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pillar Filters */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm">Pillar</h3>
                {filters.pillars.length > 0 && (
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, pillars: [] }))}
                    className="text-xs text-primary hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {PILLARS.map(pillar => {
                  const isActive = filters.pillars.includes(pillar.id);
                  
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => handleTogglePillar(pillar.id)}
                      className={`
                        px-4 py-2 border transition-all
                        ${isActive ? 'border-2' : 'border-[--border] hover:border-primary/30'}
                      `}
                      style={{
                        borderColor: isActive ? pillar.color : undefined,
                        backgroundColor: isActive ? `${pillar.color}15` : undefined,
                      }}
                    >
                      {pillar.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear All */}
            {activeFilterCount > 0 && (
              <div className="mt-4 pt-4 border-t border-[--border]">
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-red-500 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent mx-auto" style={{ borderRadius: '50%' }} />
          </div>
        ) : query.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[--border]">
            <SearchIcon className="w-12 h-12 mx-auto mb-4" style={{ color: '#5739FB', opacity: 0.5 }} />
            <h3 className="headline-card mb-2">Search the library</h3>
            <p className="copy-secondary">Enter a keyword to find soundbites, practices, and more</p>
          </div>
        ) : query.length < 2 ? (
          <div className="text-center py-12">
            <p className="copy-secondary">Type at least 2 characters to search</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="headline-card mb-2">No results found</h3>
            <p className="copy-secondary">Try different keywords or remove some filters</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="headline-card">{results.length} results</h2>
              <span className="text-sm text-muted-foreground">
                Sorted by relevance
              </span>
            </div>

            <div className="space-y-4">
              {results.map(result => {
                const pillar = PILLARS.find(p => p.id === result.pillar);
                const TypeIcon = CONTENT_TYPES.find(t => t.id === result.type)?.icon || Play;
                
                return (
                  <div
                    key={result.id}
                    className="p-6 border border-[--border] bg-white hover:border-primary/30 transition-all"
                    style={{ borderLeft: `4px solid ${result.color}` }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary flex items-center gap-1">
                            <TypeIcon className="w-3 h-3" />
                            {result.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {pillar?.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(result.relevanceScore * 100)}% match
                          </span>
                        </div>
                        
                        <h3 className="headline-card mb-2">{result.title}</h3>
                        <p className="copy-secondary text-sm mb-3">{result.description}</p>

                        {/* Taxonomy */}
                        {result.concept && result.theme && (
                          <p className="text-xs text-muted-foreground">
                            {pillar?.name} → {result.concept} → {result.theme}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    {result.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-black/5 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        style={{ backgroundColor: result.color }}
                        className="text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Open
                      </Button>
                      <button className="p-2 hover:bg-black/5 transition-all">
                        <Heart className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
