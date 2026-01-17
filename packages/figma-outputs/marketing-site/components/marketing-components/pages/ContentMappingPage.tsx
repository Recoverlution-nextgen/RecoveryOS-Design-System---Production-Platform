import { useState } from 'react';
import { ArrowLeft, BarChart3, AlertTriangle, FileText, CheckCircle, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CoverageMatrix } from '../CoverageMatrix';
import { GapAnalysisDashboard } from '../GapAnalysisDashboard';
import { StoryLink } from '../StoryLink';
import { EMOTIONAL_REGULATION_BLOCKS } from '../../utils/microBlockData';
import { TAGGED_CONTENT, getContentStatistics } from '../../utils/contentMappingData';

interface ContentMappingPageProps {
  onNavigate?: (page: string) => void;
}

export function ContentMappingPage({ onNavigate }: ContentMappingPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'coverage' | 'gaps'>('overview');

  const stats = getContentStatistics();

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            {onNavigate && (
              <button 
                onClick={() => onNavigate('docs-content-roadmap')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <p className="text-purple-200 text-sm mb-1">ST45: Content Mapping & Tagging System</p>
              <h1 className="font-display text-3xl md:text-4xl">
                Content Mapping & Gap Analysis
              </h1>
            </div>
          </div>
          <p className="text-purple-100 text-lg max-w-3xl">
            Track which micro-blocks have supporting content, identify gaps, and prioritize content creation to ensure every therapeutic practice is well-documented and discoverable.
          </p>
        </div>
      </div>

      {/* Main Content */}
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
              Maps content resources to micro-blocks and ERA flow for systematic gap analysis
            </p>
            <div className="flex flex-wrap gap-2">
              <StoryLink storyId="ST2" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST3" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="coverage" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Coverage Matrix</span>
              </TabsTrigger>
              <TabsTrigger value="gaps" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Gap Analysis</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-[#3E2BB8] mb-2">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Content Pieces</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-[#5739FB] mb-2">{stats.byType.articles}</div>
                <div className="text-sm text-gray-600">Articles</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-[#7C67FF] mb-2">{stats.byType.videos}</div>
                <div className="text-sm text-gray-600">Videos</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-[#9D8FFF] mb-2">{stats.byType.exercises}</div>
                <div className="text-sm text-gray-600">Exercises</div>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-gray-900">Total Views</h3>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-1">
                  {stats.totalViews.toLocaleString()}
                </div>
                <div className="text-sm text-purple-600">
                  Across all content
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-gray-900">Favorites</h3>
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-700 mb-1">
                  {stats.totalFavorites.toLocaleString()}
                </div>
                <div className="text-sm text-yellow-600">
                  Total favorites
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-gray-900">Avg Completion</h3>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {stats.avgCompletionRate}%
                </div>
                <div className="text-sm text-green-600">
                  Completion rate
                </div>
              </div>
            </div>

            {/* Content Inventory */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-display text-lg text-gray-900">Content Inventory</h3>
                <p className="text-sm text-gray-600 mt-1">
                  All tagged content currently in the platform
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Pillar</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Micro-Blocks</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Views</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {TAGGED_CONTENT.map(content => (
                      <tr key={content.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {content.id}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {content.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {content.description}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {content.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {content.pillarIds[0]?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700">
                          {content.microBlockIds.length}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700">
                          {content.viewCount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            content.status === 'published' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {content.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Info */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display mb-2 text-blue-900">
                    About Content Mapping
                  </h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    This system catalogs all content (articles, videos, exercises), tags it with our taxonomy (pillars, concepts, micro-blocks, states, difficulty), and maps it to the 440 micro-blocks to identify which blocks have adequate support and which need more content created. This enables rich discovery and ensures every therapeutic practice is well-documented.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Coverage Matrix Tab */}
          <TabsContent value="coverage">
            <CoverageMatrix microBlocks={EMOTIONAL_REGULATION_BLOCKS} />
          </TabsContent>

          {/* Gap Analysis Tab */}
          <TabsContent value="gaps">
            <GapAnalysisDashboard microBlocks={EMOTIONAL_REGULATION_BLOCKS} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
