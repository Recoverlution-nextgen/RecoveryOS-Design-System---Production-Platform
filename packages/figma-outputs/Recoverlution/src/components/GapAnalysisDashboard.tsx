import { AlertCircle, TrendingUp, Clock, Users } from 'lucide-react';
import { MicroBlock } from '../utils/microBlockData';
import { identifyContentGaps, type ContentGap } from '../utils/contentMappingData';

interface GapAnalysisDashboardProps {
  microBlocks: MicroBlock[];
}

export function GapAnalysisDashboard({ microBlocks }: GapAnalysisDashboardProps) {
  // Prepare data for gap analysis
  const microBlocksWithMetadata = microBlocks.map(block => ({
    id: block.id,
    name: block.name,
    pillarName: block.pillarName,
    appearsInWeeks: block.appearsInWeeks,
    favoriteCount: block.favoriteCount,
  }));

  const gaps = identifyContentGaps(microBlocksWithMetadata);

  // Statistics
  const critical = gaps.filter(g => g.priority === 'critical').length;
  const high = gaps.filter(g => g.priority === 'high').length;
  const medium = gaps.filter(g => g.priority === 'medium').length;
  const low = gaps.filter(g => g.priority === 'low').length;

  const totalMissingPieces = gaps.reduce((sum, gap) => sum + gap.missingContentTypes.length, 0);

  // Priority colors
  const getPriorityColor = (priority: ContentGap['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-50 border-red-300 text-red-700';
      case 'high': return 'bg-orange-50 border-orange-300 text-orange-700';
      case 'medium': return 'bg-yellow-50 border-yellow-300 text-yellow-700';
      case 'low': return 'bg-blue-50 border-blue-300 text-blue-700';
    }
  };

  const getPriorityBadgeColor = (priority: ContentGap['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalMissingPieces}</div>
          <div className="text-xs text-gray-600">Content Pieces Needed</div>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-700 mb-1">{critical}</div>
          <div className="text-xs text-red-700">Critical Priority</div>
        </div>
        <div className="bg-orange-50 rounded-lg border border-orange-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-700 mb-1">{high}</div>
          <div className="text-xs text-orange-700">High Priority</div>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700 mb-1">{medium}</div>
          <div className="text-xs text-yellow-700">Medium Priority</div>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-700 mb-1">{low}</div>
          <div className="text-xs text-blue-700">Low Priority</div>
        </div>
      </div>

      {/* Content Creation Queue */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-display text-lg text-gray-900">Content Creation Queue</h3>
          <p className="text-sm text-gray-600 mt-1">
            Prioritized list of missing content, sorted by clinical importance and usage
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {gaps.length > 0 ? (
            gaps.map((gap, index) => (
              <div 
                key={gap.microBlockId}
                className={`px-6 py-4 border-l-4 ${getPriorityColor(gap.priority)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Block Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-300">
                            {gap.microBlockId}
                          </span>
                          <h4 className="font-display text-base text-gray-900">
                            {gap.microBlockName}
                          </h4>
                        </div>
                        <div className="text-xs text-gray-600">
                          {gap.pillarName}
                        </div>
                      </div>
                    </div>

                    {/* Missing Content Types */}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-700 mb-1">Missing Content:</div>
                      <div className="flex flex-wrap gap-2">
                        {gap.missingContentTypes.map(type => (
                          <span 
                            key={type}
                            className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 border border-gray-300"
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{gap.reasoning}</span>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Weeks: {gap.appearsInWeeks.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{gap.favoriteCount.toLocaleString()} favorites</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Priority Badge */}
                  <div className="flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getPriorityBadgeColor(gap.priority)}`}>
                      {gap.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">🎉 No content gaps!</p>
              <p className="text-sm text-gray-500">All micro-blocks have adequate content coverage.</p>
            </div>
          )}
        </div>
      </div>

      {/* Velocity Projections */}
      {gaps.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <h4 className="font-display mb-4 text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Content Creation Velocity
          </h4>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-xs text-gray-600 mb-2">Current Pace (6 pieces/week)</div>
              <div className="text-2xl font-bold text-purple-700">
                {Math.ceil(totalMissingPieces / 6)} weeks
              </div>
              <div className="text-xs text-gray-600 mt-1">
                (~{Math.ceil(totalMissingPieces / 6 / 4)} months to close gap)
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-2">If doubled (12 pieces/week)</div>
              <div className="text-2xl font-bold text-blue-700">
                {Math.ceil(totalMissingPieces / 12)} weeks
              </div>
              <div className="text-xs text-gray-600 mt-1">
                (~{Math.ceil(totalMissingPieces / 12 / 4)} months to close gap)
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-2">Critical only ({critical} blocks)</div>
              <div className="text-2xl font-bold text-red-700">
                {critical * 3} pieces
              </div>
              <div className="text-xs text-gray-600 mt-1">
                (~{Math.ceil((critical * 3) / 6)} weeks at current pace)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
