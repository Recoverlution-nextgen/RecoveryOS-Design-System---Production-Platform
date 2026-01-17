import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Clock, TrendingUp, ExternalLink, BookOpen, Video, CheckSquare } from 'lucide-react';
import { Button } from './ui/button';
import { MicroBlock, STATE_COLORS, DIFFICULTY_COLORS } from '../utils/microBlockData';

interface MicroBlockCardProps {
  block: MicroBlock;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export function MicroBlockCard({ 
  block, 
  isExpanded = false,
  onToggleExpand,
  onFavorite,
  isFavorited = false
}: MicroBlockCardProps) {
  const [localExpanded, setLocalExpanded] = useState(isExpanded);
  
  const expanded = onToggleExpand ? isExpanded : localExpanded;
  const toggleExpand = onToggleExpand || (() => setLocalExpanded(!localExpanded));

  const difficultyColor = DIFFICULTY_COLORS[block.difficulty];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      {/* Header - Always Visible */}
      <button
        onClick={toggleExpand}
        className="w-full px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors text-left"
      >
        {/* ID Badge */}
        <div className="flex-shrink-0">
          <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {block.id}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name & States */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-display text-lg text-gray-900">
              {block.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              {block.targetStates.map(state => {
                const stateColor = STATE_COLORS[state];
                return (
                  <div 
                    key={state}
                    className={`w-3 h-3 rounded-full ${stateColor.solid}`}
                    style={{ backgroundColor: stateColor.solid }}
                    title={state.toUpperCase()}
                  />
                );
              })}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3">
            {block.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className={`px-2 py-0.5 rounded-full ${difficultyColor.badge}`}>
              {block.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {block.estimatedTime} min
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {block.favoriteCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {block.efficacyScore}% effective
            </span>
          </div>
        </div>

        {/* Expand Icon */}
        <div className="flex-shrink-0 mt-1">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-6 pb-6 bg-gray-50 border-t border-gray-200">
          {/* Hierarchy Breadcrumb */}
          <div className="mt-4 mb-6 p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">HIERARCHY</div>
            <div className="text-sm text-gray-700">
              {block.pillarName} → {block.conceptName} → {block.themeName}
            </div>
          </div>

          {/* What It Is */}
          <div className="mb-6">
            <h4 className="font-display mb-2 text-gray-900 flex items-center gap-2">
              <span className="text-lg">🎯</span>
              What It Is
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {block.fullContent.headline}
            </p>
          </div>

          {/* Why It Matters */}
          <div className="mb-6">
            <h4 className="font-display mb-2 text-gray-900 flex items-center gap-2">
              <span className="text-lg">💡</span>
              Why It Matters
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {block.fullContent.whyItMatters}
            </p>
          </div>

          {/* The Science */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-display mb-2 text-gray-900 flex items-center gap-2">
              <span className="text-lg">🧠</span>
              The Science
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              {block.fullContent.theScience}
            </p>
          </div>

          {/* How To Practice */}
          <div className="mb-6">
            <h4 className="font-display mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-lg">🛠️</span>
              How To Practice
            </h4>
            <ol className="space-y-2">
              {block.fullContent.howToPractice.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5739FB] text-white text-xs flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {block.fullContent.tips.length > 0 && (
            <div className="mb-6">
              <h4 className="font-display mb-3 text-gray-900">💡 Tips</h4>
              <ul className="space-y-2">
                {block.fullContent.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-yellow-500 flex-shrink-0">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* When To Use */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-display mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-lg">📍</span>
              When To Use
            </h4>
            <ul className="space-y-1">
              {block.fullContent.whenToUse.map((scenario, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 flex-shrink-0 mt-1">•</span>
                  <span>{scenario}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Micro-Blocks */}
          {block.relatedMicroBlocks.length > 0 && (
            <div className="mb-6">
              <h4 className="font-display mb-3 text-sm text-gray-700">
                🔗 Related Micro-Blocks
              </h4>
              <div className="flex flex-wrap gap-2">
                {block.relatedMicroBlocks.map((relatedId) => (
                  <span 
                    key={relatedId}
                    className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-300 hover:border-[#5739FB] hover:text-[#5739FB] cursor-pointer transition-colors"
                  >
                    {relatedId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related NaviCues */}
          {block.relatedNaviCues.length > 0 && (
            <div className="mb-6">
              <h4 className="font-display mb-3 text-sm text-gray-700">
                🧭 Related NaviCues
              </h4>
              <div className="flex flex-wrap gap-2">
                {block.relatedNaviCues.map((cueId) => (
                  <span 
                    key={cueId}
                    className="px-3 py-1 bg-purple-50 rounded-full text-xs text-purple-700 border border-purple-200 hover:border-purple-400 cursor-pointer transition-colors"
                  >
                    {cueId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Appears In Weeks */}
          {block.appearsInWeeks.length > 0 && (
            <div className="mb-6">
              <h4 className="font-display mb-3 text-sm text-gray-700">
                📅 Appears in Weeks
              </h4>
              <div className="flex gap-2">
                {block.appearsInWeeks.map((week) => (
                  <span 
                    key={week}
                    className="w-8 h-8 rounded-lg bg-[#5739FB] text-white text-sm flex items-center justify-center font-medium"
                  >
                    {week}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Patient Data */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <h4 className="font-display mb-3 text-gray-900">📊 Patient Data</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-[#3E2BB8]">{block.favoriteCount.toLocaleString()}</div>
                <div className="text-xs text-gray-600">patients favorited</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#5739FB]">{block.practiceCount.toLocaleString()}</div>
                <div className="text-xs text-gray-600">times practiced</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#7C67FF]">{block.efficacyScore}%</div>
                <div className="text-xs text-gray-600">efficacy score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#9D8FFF]">{block.appearsInWeeks.length}</div>
                <div className="text-xs text-gray-600">weeks featured</div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h4 className="font-display mb-3 text-sm text-gray-700">🏷️ Tags</h4>
            <div className="flex flex-wrap gap-2">
              {block.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <Button 
              onClick={() => onFavorite?.(block.id)}
              variant={isFavorited ? "default" : "outline"}
              className={isFavorited ? "bg-[#5739FB] hover:bg-[#3E2BB8]" : ""}
            >
              <Star className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
              {isFavorited ? 'Favorited' : 'Favorite'}
            </Button>
            <Button variant="outline">
              <CheckSquare className="w-4 h-4 mr-2" />
              Practice Now
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>

          {/* Related Resources */}
          {(block.articles.length > 0 || block.videos.length > 0 || block.exercises.length > 0) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-display mb-4 text-gray-900">📚 Related Resources</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {block.articles.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-[#5739FB]" />
                      <span className="text-sm font-medium text-gray-700">Articles</span>
                    </div>
                    <div className="text-xs text-gray-600">{block.articles.length} available</div>
                  </div>
                )}
                {block.videos.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="w-4 h-4 text-[#5739FB]" />
                      <span className="text-sm font-medium text-gray-700">Videos</span>
                    </div>
                    <div className="text-xs text-gray-600">{block.videos.length} available</div>
                  </div>
                )}
                {block.exercises.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckSquare className="w-4 h-4 text-[#5739FB]" />
                      <span className="text-sm font-medium text-gray-700">Exercises</span>
                    </div>
                    <div className="text-xs text-gray-600">{block.exercises.length} available</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Metadata Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <div className="flex items-center justify-between">
              <span>Last updated: {block.lastUpdated}</span>
              <span>v{block.version} • {block.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
