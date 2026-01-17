import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, CheckCircle2, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { DailyExercise, ERA_COLORS, FORMAT_ICONS } from '../utils/weeklyEraData';

interface DailyExerciseCardProps {
  exercise: DailyExercise;
  isCompleted?: boolean;
  onComplete?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function DailyExerciseCard({ 
  exercise, 
  isCompleted = false,
  onComplete,
  isExpanded = false,
  onToggleExpand 
}: DailyExerciseCardProps) {
  const [localExpanded, setLocalExpanded] = useState(isExpanded);
  
  const expanded = onToggleExpand ? isExpanded : localExpanded;
  const toggleExpand = onToggleExpand || (() => setLocalExpanded(!localExpanded));
  
  const eraColor = ERA_COLORS[exercise.eraPhase];
  const formatIcon = FORMAT_ICONS[exercise.format];

  return (
    <div className={`border rounded-lg overflow-hidden transition-all ${eraColor.border} ${isCompleted ? 'opacity-75' : ''}`}>
      {/* Header - Always Visible */}
      <button
        onClick={toggleExpand}
        className="w-full px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors text-left"
      >
        {/* Completion Status */}
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Day & ERA Phase Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-600">
              Day {exercise.day}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${eraColor.badge}`}>
              {exercise.eraPhase.toUpperCase()}
            </span>
            <span className="text-sm">
              {formatIcon} {exercise.format}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display mb-1">
            {exercise.title}
          </h3>

          {/* Time Estimate */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{exercise.estimatedTime} min</span>
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
        <div className={`px-6 pb-6 ${eraColor.bg} border-t ${eraColor.border}`}>
          {/* Introduction */}
          <div className="mt-4 mb-6">
            <p className="text-gray-700 leading-relaxed">
              {exercise.content.introduction}
            </p>
          </div>

          {/* Main Content */}
          <div className="mb-6">
            <h4 className="font-display mb-3 text-gray-900">
              Today's Content
            </h4>
            {Array.isArray(exercise.content.mainContent) ? (
              <ul className="space-y-2">
                {exercise.content.mainContent.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#5739FB] mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">{exercise.content.mainContent}</p>
            )}
          </div>

          {/* Practice */}
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="font-display mb-2 text-gray-900 flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Your Practice
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {exercise.content.practice}
            </p>
          </div>

          {/* Reflection */}
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="font-display mb-2 text-gray-900 flex items-center gap-2">
              <span className="text-lg">💭</span>
              Reflection Prompt
            </h4>
            <p className="text-gray-700 leading-relaxed italic">
              {exercise.content.reflection}
            </p>
          </div>

          {/* Success Criteria */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              <strong>Success:</strong> {exercise.successCriteria}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isCompleted && onComplete && (
              <Button 
                onClick={onComplete}
                className="bg-[#5739FB] hover:bg-[#3E2BB8] text-white"
              >
                Mark Complete
              </Button>
            )}
            {isCompleted && (
              <Button 
                variant="outline"
                className="border-gray-300"
              >
                Review Again
              </Button>
            )}
            <Button 
              variant="outline"
              className="border-gray-300"
            >
              Journal About This
            </Button>
          </div>

          {/* Related Content */}
          {(exercise.relatedMicroBlocks.length > 0 || exercise.relatedNaviCues.length > 0) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-display mb-3 text-sm text-gray-700">
                Related Content
              </h4>
              <div className="flex flex-wrap gap-2">
                {exercise.relatedMicroBlocks.map((block, index) => (
                  <span 
                    key={`block-${index}`}
                    className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200"
                  >
                    📦 {block}
                  </span>
                ))}
                {exercise.relatedNaviCues.map((cue, index) => (
                  <span 
                    key={`cue-${index}`}
                    className="px-3 py-1 bg-purple-50 rounded-full text-xs text-purple-700 border border-purple-200"
                  >
                    ⚡ {cue}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
