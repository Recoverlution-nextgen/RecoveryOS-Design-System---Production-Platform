import { useState } from "react";
import { Search, Filter, Clock, Book, Brain, ArrowRight, X } from "lucide-react";
import { allArticles, pillarMetadata, type PillarType } from "../../utils/contentLibraryMaster";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ArticleLibraryPageProps {
  onNavigateToArticle: (id: string) => void; // CHANGED: string instead of number
  onBack?: () => void;
}

export function ArticleLibraryPage({ onNavigateToArticle, onBack }: ArticleLibraryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | 'all'>('all');

  // Filter articles
  const filteredArticles = allArticles.filter(article => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.thoughtLeader?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.blocks?.some(block => block.toLowerCase().includes(searchQuery.toLowerCase()));

    // Pillar filter
    const matchesPillar = selectedPillar === 'all' || article.pillar === selectedPillar;

    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === 'all' || article.difficulty === selectedDifficulty;

    return matchesSearch && matchesPillar && matchesDifficulty;
  });

  // Group articles by pillar for display
  const articlesByPillar = Object.keys(pillarMetadata).reduce((acc, pillar) => {
    const pillarKey = pillar as PillarType;
    acc[pillarKey] = filteredArticles.filter(a => a.pillar === pillarKey);
    return acc;
  }, {} as Record<PillarType, typeof allArticles>);

  // Count articles per pillar
  const pillarCounts = Object.keys(pillarMetadata).reduce((acc, pillar) => {
    const pillarKey = pillar as PillarType;
    acc[pillarKey] = allArticles.filter(a => a.pillar === pillarKey).length;
    return acc;
  }, {} as Record<PillarType, number>);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="glass-card border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}>
                Article Library
              </h1>
              <p className="text-gray-600">Evidence based therapeutic content mapped to Six Pillars</p>
            </div>
            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900"
              >
                Close
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles, thought leaders, or blocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border-gray-200 focus:border-[#3E2BB8] focus:ring-[#3E2BB8]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Pillar Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedPillar}
                onChange={(e) => setSelectedPillar(e.target.value as PillarType | 'all')}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-[#3E2BB8] focus:border-[#3E2BB8] focus:ring-[#3E2BB8] transition-colors cursor-pointer"
              >
                <option value="all">All Pillars ({allArticles.length})</option>
                {Object.entries(pillarMetadata).map(([key, meta]) => (
                  <option key={key} value={key}>
                    {meta.name} ({pillarCounts[key as PillarType]})
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-[#3E2BB8] focus:border-[#3E2BB8] focus:ring-[#3E2BB8] transition-colors cursor-pointer"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Active Filters Summary */}
          {(selectedPillar !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Showing {filteredArticles.length} articles</span>
              <button
                onClick={() => {
                  setSelectedPillar('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="text-sm text-[#3E2BB8] hover:text-[#5739FB]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {selectedPillar === 'all' ? (
          // Show all pillars with their articles
          <div className="space-y-16">
            {Object.entries(pillarMetadata).map(([pillarKey, meta]) => {
              const pillarArticles = articlesByPillar[pillarKey as PillarType];
              if (pillarArticles.length === 0) return null;

              return (
                <div key={pillarKey}>
                  {/* Pillar Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{meta.icon}</span>
                      <h2 className="text-2xl" style={{ fontFamily: 'var(--font-display)', color: meta.color }}>
                        {meta.name}
                      </h2>
                      <Badge variant="outline" className="ml-auto">
                        {pillarArticles.length} articles
                      </Badge>
                    </div>
                    <p className="text-gray-600 italic">{meta.description}</p>
                  </div>

                  {/* Articles Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillarArticles.map(article => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onClick={() => onNavigateToArticle(article.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <Book className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl mb-2 text-gray-600" style={{ fontFamily: 'var(--font-display)' }}>
                  No articles found
                </h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        ) : (
          // Show selected pillar articles
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => onNavigateToArticle(article.id)}
                />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <Book className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl mb-2 text-gray-600" style={{ fontFamily: 'var(--font-display)' }}>
                  No articles found
                </h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="glass-card border-t mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}>
                {allArticles.length}
              </div>
              <div className="text-sm text-gray-600">Total Articles</div>
            </div>
            <div>
              <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}>
                6
              </div>
              <div className="text-sm text-gray-600">Therapeutic Pillars</div>
            </div>
            <div>
              <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}>
                {allArticles.reduce((sum, a) => sum + (a.blocks?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Blocks Covered</div>
            </div>
            <div>
              <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}>
                {new Set(allArticles.map(a => a.thoughtLeader).filter(Boolean)).size}
              </div>
              <div className="text-sm text-gray-600">Thought Leaders</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Article Card Component
function ArticleCard({ article, onClick }: { article: typeof allArticles[number]; onClick: () => void }) {
  return (
    <Card
      onClick={onClick}
      className="glass-card p-6 hover:shadow-lg transition-all cursor-pointer group border"
      style={{ borderColor: `${article.pillarColor}20` }}
    >
      {/* Pillar Badge */}
      <div className="flex items-center justify-between mb-4">
        <Badge
          variant="outline"
          style={{
            backgroundColor: `${article.pillarColor}10`,
            color: article.pillarColor,
            borderColor: `${article.pillarColor}30`
          }}
        >
          {article.pillarName}
        </Badge>
        {article.difficulty && (
          <Badge variant="outline" className="text-xs">
            {article.difficulty}
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-lg mb-2 group-hover:text-[#5739FB] transition-colors"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {article.title}
      </h3>

      {/* Summary */}
      {article.summary && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {article.summary}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {article.readTime} min
        </div>
        {article.conceptName && (
          <div className="flex items-center gap-1">
            <Brain className="w-3 h-3" />
            {article.conceptName}
          </div>
        )}
      </div>

      {/* Thought Leader */}
      {article.thoughtLeader && (
        <div className="text-xs text-gray-500 mb-3">
          By: <span className="text-gray-700">{article.thoughtLeader}</span>
        </div>
      )}

      {/* Block IDs */}
      {article.blocks && article.blocks.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {article.blocks.slice(0, 2).map((blockId, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600"
            >
              {blockId}
            </span>
          ))}
          {article.blocks.length > 2 && (
            <span className="text-xs px-2 py-1 text-gray-500">
              +{article.blocks.length - 2} more
            </span>
          )}
        </div>
      )}

      {/* Read More */}
      <div className="flex items-center gap-2 text-sm text-[#3E2BB8] group-hover:text-[#5739FB]">
        Read article
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  );
}