import { FileText, Video, CheckSquare, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { MicroBlock } from '../utils/microBlockData';
import { calculateMicroBlockCoverage, type MicroBlockCoverage } from '../utils/contentMappingData';

interface CoverageMatrixProps {
  microBlocks: MicroBlock[];
  onViewContent?: (microBlockId: string) => void;
}

export function CoverageMatrix({ microBlocks, onViewContent }: CoverageMatrixProps) {
  // Calculate coverage for all micro-blocks
  const coverageData = microBlocks.map(block => 
    calculateMicroBlockCoverage(block.id, block.name)
  );

  // Statistics
  const excellent = coverageData.filter(c => c.coverageLevel === 'excellent').length;
  const good = coverageData.filter(c => c.coverageLevel === 'good').length;
  const poor = coverageData.filter(c => c.coverageLevel === 'poor').length;
  const orphaned = coverageData.filter(c => c.coverageLevel === 'orphaned').length;
  
  const avgCoverage = Math.round(
    coverageData.reduce((sum, c) => sum + c.coverageScore, 0) / coverageData.length
  );

  // Coverage level colors
  const getLevelColor = (level: MicroBlockCoverage['coverageLevel']) => {
    switch (level) {
      case 'excellent': return 'bg-green-50 border-green-300';
      case 'good': return 'bg-yellow-50 border-yellow-300';
      case 'poor': return 'bg-orange-50 border-orange-300';
      case 'orphaned': return 'bg-red-50 border-red-300';
    }
  };

  const getLevelIcon = (level: MicroBlockCoverage['coverageLevel']) => {
    switch (level) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-yellow-600" />;
      case 'poor': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'orphaned': return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getLevelText = (level: MicroBlockCoverage['coverageLevel']) => {
    switch (level) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'poor': return 'Poor';
      case 'orphaned': return 'Orphaned';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{avgCoverage}%</div>
          <div className="text-xs text-gray-600">Avg Coverage</div>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-700 mb-1">{excellent}</div>
          <div className="text-xs text-green-700">Excellent (100%)</div>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700 mb-1">{good}</div>
          <div className="text-xs text-yellow-700">Good (67%)</div>
        </div>
        <div className="bg-orange-50 rounded-lg border border-orange-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-700 mb-1">{poor}</div>
          <div className="text-xs text-orange-700">Poor (33%)</div>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-700 mb-1">{orphaned}</div>
          <div className="text-xs text-red-700">Orphaned (0%)</div>
        </div>
      </div>

      {/* Coverage Matrix Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Micro-Block</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">
                  <FileText className="w-4 h-4 mx-auto" />
                  <div className="mt-1">Articles</div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">
                  <Video className="w-4 h-4 mx-auto" />
                  <div className="mt-1">Videos</div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">
                  <CheckSquare className="w-4 h-4 mx-auto" />
                  <div className="mt-1">Exercises</div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Score</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coverageData.map((coverage) => (
                <tr 
                  key={coverage.microBlockId}
                  className={`hover:bg-gray-50 transition-colors ${getLevelColor(coverage.coverageLevel)}`}
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
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      coverage.articles.length > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {coverage.articles.length}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      coverage.videos.length > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {coverage.videos.length}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      coverage.exercises.length > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {coverage.exercises.length}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            coverage.coverageScore === 100 ? 'bg-green-500' :
                            coverage.coverageScore === 67 ? 'bg-yellow-500' :
                            coverage.coverageScore === 33 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${coverage.coverageScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-10 text-right">
                        {coverage.coverageScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {getLevelIcon(coverage.coverageLevel)}
                      <span className="text-sm font-medium">
                        {getLevelText(coverage.coverageLevel)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <h4 className="font-display text-sm text-gray-900 mb-3">Coverage Levels</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-gray-700"><strong>100%</strong> - All 3 content types</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500" />
            <span className="text-gray-700"><strong>67%</strong> - 2 of 3 types</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500" />
            <span className="text-gray-700"><strong>33%</strong> - 1 of 3 types</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span className="text-gray-700"><strong>0%</strong> - No content (orphaned)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
