import { useState } from 'react';
import { ArticleCard } from '@/components/toolkit/ArticleCard';
import { ArticleReader } from '@/components/toolkit/ArticleReader';
import { InsightCard } from '@/components/toolkit/InsightCard';
import { PracticeCard } from '@/components/toolkit/PracticeCard';
import { PracticePlayer } from '@/components/toolkit/PracticePlayer';
import { SAMPLE_ARTICLES } from '@/lib/toolkit/SAMPLE_ARTICLES';
import { SAMPLE_INSIGHTS } from '@/lib/toolkit/SAMPLE_INSIGHTS';
import { SAMPLE_PRACTICES } from '@/lib/toolkit/SAMPLE_PRACTICES';
import type { Article, Insight, Practice } from '@/lib/types/toolkit';
import { BookOpen, Lightbulb, Play, Search, Filter } from 'lucide-react';

type Tab = 'articles' | 'insights' | 'practices';
type PillarId = 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM' | 'all';

export function ToolkitPage() {
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [filterPillar, setFilterPillar] = useState<PillarId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filterContent = <T extends { pillar_id: string; title: string }>(items: T[]) => {
    return items.filter(item => {
      const matchesPillar = filterPillar === 'all' || item.pillar_id === filterPillar;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPillar && matchesSearch;
    });
  };

  const filteredArticles = filterContent(SAMPLE_ARTICLES);
  const filteredInsights = filterContent(SAMPLE_INSIGHTS);
  const filteredPractices = filterContent(SAMPLE_PRACTICES);

  const handleArticleComplete = (proof: any) => {
    console.log('Article completed:', proof);
    // TODO: Write to event_spine and proof_artifacts
  };

  const handleInsightRespond = (response: any) => {
    console.log('Insight response:', response);
    // TODO: Write to event_spine and proof_artifacts
  };

  const handlePracticeComplete = (completion: any) => {
    console.log('Practice completed:', completion);
    // TODO: Write to event_spine and proof_artifacts
  };

  const pillars: { id: PillarId; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'ER', label: 'Emotional Regulation' },
    { id: 'SR', label: 'Shame Resilience' },
    { id: 'SC', label: 'Self Concept' },
    { id: 'CR', label: 'Connection' },
    { id: 'II', label: 'Identity' },
    { id: 'DM', label: 'Decision Making' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#3E2BB8]/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-[#3E2BB8] mb-2">Toolkit</h1>
          <p className="text-[#3E2BB8]/60">
            Knowledge to action. Articles, insights, and practices for your recovery.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#3E2BB8]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'articles'
                  ? 'border-[#5739FB] text-[#5739FB]'
                  : 'border-transparent text-[#3E2BB8]/60 hover:text-[#3E2BB8]'
              }`}
            >
              <BookOpen className="size-5" />
              <span>Articles</span>
              <span className={`px-2 py-1 text-xs ${
                activeTab === 'articles' ? 'bg-[#5739FB]/10' : 'bg-[#3E2BB8]/5'
              }`}>
                {SAMPLE_ARTICLES.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'insights'
                  ? 'border-[#5739FB] text-[#5739FB]'
                  : 'border-transparent text-[#3E2BB8]/60 hover:text-[#3E2BB8]'
              }`}
            >
              <Lightbulb className="size-5" />
              <span>Insights</span>
              <span className={`px-2 py-1 text-xs ${
                activeTab === 'insights' ? 'bg-[#5739FB]/10' : 'bg-[#3E2BB8]/5'
              }`}>
                {SAMPLE_INSIGHTS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('practices')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === 'practices'
                  ? 'border-[#5739FB] text-[#5739FB]'
                  : 'border-transparent text-[#3E2BB8]/60 hover:text-[#3E2BB8]'
              }`}
            >
              <Play className="size-5" />
              <span>Practices</span>
              <span className={`px-2 py-1 text-xs ${
                activeTab === 'practices' ? 'bg-[#5739FB]/10' : 'bg-[#3E2BB8]/5'
              }`}>
                {SAMPLE_PRACTICES.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#3E2BB8]/20 bg-[#3E2BB8]/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#3E2BB8]/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] placeholder:text-[#3E2BB8]/40 focus:outline-none focus:border-[#5739FB]"
                />
              </div>
            </div>

            {/* Pillar Filter */}
            <div className="flex items-center gap-2">
              <Filter className="size-5 text-[#3E2BB8]/60" />
              <select
                value={filterPillar}
                onChange={(e) => setFilterPillar(e.target.value as PillarId)}
                className="px-4 py-2 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] focus:outline-none focus:border-[#5739FB]"
              >
                {pillars.map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInsights.map(insight => (
              <InsightCard
                key={insight.id}
                insight={insight}
                onRespond={handleInsightRespond}
              />
            ))}
          </div>
        )}

        {activeTab === 'practices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPractices.map(practice => (
              <PracticeCard
                key={practice.id}
                practice={practice}
                onClick={() => setSelectedPractice(practice)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'articles' && filteredArticles.length === 0) ||
          (activeTab === 'insights' && filteredInsights.length === 0) ||
          (activeTab === 'practices' && filteredPractices.length === 0)) && (
          <div className="text-center py-12">
            <p className="text-[#3E2BB8]/60">
              No results found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <ArticleReader
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onComplete={handleArticleComplete}
        />
      )}

      {/* Practice Player Modal */}
      {selectedPractice && (
        <PracticePlayer
          practice={selectedPractice}
          onClose={() => setSelectedPractice(null)}
          onComplete={handlePracticeComplete}
        />
      )}
    </div>
  );
}
