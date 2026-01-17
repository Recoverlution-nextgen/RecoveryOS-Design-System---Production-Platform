import { useState, useMemo } from 'react';
import { ArrowLeft, Video, Play, Clock, Eye, Star, BarChart3, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { StoryLink } from '../StoryLink';
import { EMOTIONAL_REGULATION_BLOCKS } from '../../utils/microBlockData';
import {
  WELLBEING_VIDEOS,
  getVideoStatistics,
  calculateVideoBlockCoverage,
  VIDEO_TYPE_CONFIG,
  type WellbeingVideo,
  type VideoType
} from '../../utils/videoLibraryData';
import { STATE_COLORS } from '../../utils/microBlockData';

interface VideoLibraryAuditPageProps {
  onNavigate?: (page: string) => void;
}

export function VideoLibraryAuditPage({ onNavigate }: VideoLibraryAuditPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'coverage' | 'gaps'>('overview');
  const [selectedVideoType, setSelectedVideoType] = useState<VideoType | 'all'>('all');

  const stats = getVideoStatistics();

  // Calculate coverage for all micro-blocks
  const coverageData = useMemo(() => {
    return EMOTIONAL_REGULATION_BLOCKS.map(block =>
      calculateVideoBlockCoverage(block.id, block.name)
    );
  }, []);

  const excellent = coverageData.filter(c => c.coverageLevel === 'excellent').length;
  const good = coverageData.filter(c => c.coverageLevel === 'good').length;
  const needsVideo = coverageData.filter(c => c.coverageLevel === 'needs-video').length;
  const critical = coverageData.filter(c => c.coverageLevel === 'critical').length;

  // Filter videos by type
  const filteredVideos = selectedVideoType === 'all'
    ? WELLBEING_VIDEOS
    : WELLBEING_VIDEOS.filter(v => v.videoType === selectedVideoType);

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
              <p className="text-purple-200 text-sm mb-1">ST46: Wellbeing Video Library Audit</p>
              <h1 className="font-display text-3xl md:text-4xl">
                Video Library Audit & Gap Analysis
              </h1>
            </div>
          </div>
          <p className="text-purple-100 text-lg max-w-3xl">
            Comprehensive audit of all wellbeing videos, mapped to micro-blocks with coverage analysis and prioritized gap identification for video creation planning.
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
              Analyzes video content coverage across 48 micro-blocks to identify high-priority gaps
            </p>
            <div className="flex flex-wrap gap-2">
              <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
              <StoryLink storyId="ST45" onNavigate={onNavigate} variant="pill" showTitle />
            </div>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="coverage" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Coverage</span>
              </TabsTrigger>
              <TabsTrigger value="gaps" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Gaps</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-[#3E2BB8] mb-2">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Videos</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-[#5739FB] mb-2">{Math.floor(stats.totalDuration / 60)}</div>
                <div className="text-sm text-gray-600">Total Minutes</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-[#7C67FF] mb-2">{Math.floor(stats.avgDuration / 60)}:{(stats.avgDuration % 60).toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">Avg Duration</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-[#9D8FFF] mb-2">{stats.accessibilityScore}%</div>
                <div className="text-sm text-gray-600">Accessibility</div>
              </div>
            </div>

            {/* Video Type Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-display text-lg text-gray-900">Video Library by Type</h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">📚</span>
                      <span className="text-2xl font-bold text-blue-700">{stats.byType.educational}</span>
                    </div>
                    <div className="text-sm font-medium text-blue-900">Educational</div>
                    <div className="text-xs text-blue-600 mt-1">Explains concepts</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🧘</span>
                      <span className="text-2xl font-bold text-purple-700">{stats.byType.guidedPractice}</span>
                    </div>
                    <div className="text-sm font-medium text-purple-900">Guided Practice</div>
                    <div className="text-xs text-purple-600 mt-1">Follow-along</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🛠️</span>
                      <span className="text-2xl font-bold text-green-700">{stats.byType.howTo}</span>
                    </div>
                    <div className="text-sm font-medium text-green-900">How-To</div>
                    <div className="text-xs text-green-600 mt-1">Teaches skills</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">⚡</span>
                      <span className="text-2xl font-bold text-red-700">{stats.byType.quickTip}</span>
                    </div>
                    <div className="text-sm font-medium text-red-900">Quick Tip</div>
                    <div className="text-xs text-red-600 mt-1">&lt;2 min micro-lessons</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">💬</span>
                      <span className="text-2xl font-bold text-yellow-700">{stats.byType.testimonial}</span>
                    </div>
                    <div className="text-sm font-medium text-yellow-900">Testimonial</div>
                    <div className="text-xs text-yellow-600 mt-1">Patient stories</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🎬</span>
                      <span className="text-2xl font-bold text-gray-700">{stats.byType.other}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">Other Types</div>
                    <div className="text-xs text-gray-600 mt-1">Animation, interviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-gray-900">Total Views</h3>
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-1">
                  {stats.totalViews.toLocaleString()}
                </div>
                <div className="text-sm text-purple-600">
                  Across all videos
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-gray-900">Favorites</h3>
                  <Star className="w-5 h-5 text-yellow-600" />
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
                  <h3 className="font-display text-gray-900">Completion</h3>
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {stats.avgCompletionRate}%
                </div>
                <div className="text-sm text-green-600">
                  Average completion rate
                </div>
              </div>
            </div>

            {/* Video Inventory Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg text-gray-900">Video Inventory</h3>
                  <p className="text-sm text-gray-600 mt-1">Complete catalog of all wellbeing videos</p>
                </div>
                <select
                  value={selectedVideoType}
                  onChange={(e) => setSelectedVideoType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="educational">Educational</option>
                  <option value="guided-practice">Guided Practice</option>
                  <option value="how-to">How-To</option>
                  <option value="quick-tip">Quick Tip</option>
                  <option value="testimonial">Testimonial</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Video</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Type</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Duration</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">States</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Blocks</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Views</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Quality</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredVideos.map(video => {
                      const typeConfig = VIDEO_TYPE_CONFIG[video.videoType];
                      return (
                        <tr key={video.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-3">
                              <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                                {video.id}
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-gray-900 mb-1">
                                  {video.title}
                                </div>
                                {video.presenter && (
                                  <div className="text-xs text-gray-500">
                                    by {video.presenter}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${typeConfig.color}`}>
                              <span>{typeConfig.icon}</span>
                              <span className="hidden lg:inline">{typeConfig.label}</span>
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1 text-sm text-gray-700">
                              <Clock className="w-3 h-3" />
                              {video.durationFormatted}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-1">
                              {video.targetStates.map(state => {
                                const stateColor = STATE_COLORS[state];
                                return (
                                  <div 
                                    key={state}
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: stateColor.solid }}
                                    title={state.toUpperCase()}
                                  />
                                );
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-gray-700">
                            {video.microBlockIds.length}
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-gray-700">
                            {video.viewCount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              video.videoQuality === 'excellent' ? 'bg-green-100 text-green-700' :
                              video.videoQuality === 'good' ? 'bg-blue-100 text-blue-700' :
                              video.videoQuality === 'needs-update' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {video.videoQuality}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* COVERAGE TAB */}
          <TabsContent value="coverage" className="space-y-6">
            {/* Coverage Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {Math.round(((excellent + good) / coverageData.length) * 100)}%
                </div>
                <div className="text-xs text-gray-600">Avg Coverage</div>
              </div>
              <div className="bg-green-50 rounded-lg border border-green-200 p-4 text-center">
                <div className="text-2xl font-bold text-green-700 mb-1">{excellent}</div>
                <div className="text-xs text-green-700">Excellent (3+ videos)</div>
              </div>
              <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-700 mb-1">{good}</div>
                <div className="text-xs text-yellow-700">Good (2 videos)</div>
              </div>
              <div className="bg-orange-50 rounded-lg border border-orange-200 p-4 text-center">
                <div className="text-2xl font-bold text-orange-700 mb-1">{needsVideo}</div>
                <div className="text-xs text-orange-700">Needs Video (1)</div>
              </div>
              <div className="bg-red-50 rounded-lg border border-red-200 p-4 text-center">
                <div className="text-2xl font-bold text-red-700 mb-1">{critical}</div>
                <div className="text-xs text-red-700">Critical (0)</div>
              </div>
            </div>

            {/* Coverage Matrix */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-display text-lg text-gray-900">Video Coverage Matrix</h3>
                <p className="text-sm text-gray-600 mt-1">Which micro-blocks have video support</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Micro-Block</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Videos</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Educational</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Guided</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">How-To</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {coverageData.map(coverage => (
                      <tr 
                        key={coverage.microBlockId}
                        className={`hover:bg-gray-50 ${
                          coverage.coverageLevel === 'excellent' ? 'bg-green-50' :
                          coverage.coverageLevel === 'good' ? 'bg-yellow-50' :
                          coverage.coverageLevel === 'needs-video' ? 'bg-orange-50' :
                          'bg-red-50'
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-300">
                              {coverage.microBlockId}
                            </span>
                            <span className="text-sm text-gray-900">
                              {coverage.microBlockName}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-lg font-bold text-gray-900">
                            {coverage.videos.length}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {coverage.hasEducational ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {coverage.hasGuidedPractice ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {coverage.hasHowTo ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                            coverage.coverageLevel === 'excellent' ? 'bg-green-100 text-green-700' :
                            coverage.coverageLevel === 'good' ? 'bg-yellow-100 text-yellow-700' :
                            coverage.coverageLevel === 'needs-video' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {coverage.coverageLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* GAPS TAB */}
          <TabsContent value="gaps" className="space-y-6">
            <div className="bg-orange-50 rounded-lg border border-orange-200 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display mb-2 text-orange-900">
                    {critical} Micro-Blocks Have No Video Support
                  </h4>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    These blocks are critical gaps in the video library. Priority should be given to creating video content for blocks that appear in early weeks (1-4) and RED-state crisis interventions.
                  </p>
                </div>
              </div>
            </div>

            {/* Gap List */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-display text-lg text-gray-900">Video Creation Queue</h3>
                <p className="text-sm text-gray-600 mt-1">Prioritized list of videos to create</p>
              </div>

              <div className="divide-y divide-gray-200">
                {coverageData
                  .filter(c => c.coverageLevel === 'critical')
                  .map((gap, index) => (
                    <div key={gap.microBlockId} className="px-6 py-4 bg-red-50 border-l-4 border-red-500">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-bold text-red-600">P0-{index + 1}</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-300">
                                  {gap.microBlockId}
                                </span>
                                <h4 className="font-display text-base text-gray-900">
                                  {gap.microBlockName}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-red-700 mb-3">{gap.notes}</p>
                          <div className="text-xs text-gray-600">
                            Suggested: Educational video (5-7 min) + Guided practice (3-5 min)
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium uppercase flex-shrink-0">
                          Critical
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
