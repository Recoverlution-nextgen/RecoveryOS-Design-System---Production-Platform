/**
 * Journey Page (Weekly ERA) - infiniteK Design
 * 12-Week Recovery Journey
 * 
 * Philosophy:
 * - 84 daily exercises across 12 weeks
 * - Each week follows ERA flow: Experience → Recognize → Align
 * - Infinite Canvas Principle (never complete, always deepening)
 * - The NOW Principle (patients are always in the now)
 * 
 * Design Principles:
 * - NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 * - borderRadius: '0px' everywhere
 * - Background differentiation for week cards
 * - Square progress indicators
 * - Clean typography-first layout
 */

import { useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2, Circle, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { DailyExerciseCard } from '../DailyExerciseCard';
import { 
  TWELVE_WEEK_OVERVIEW, 
  getWeekExercises, 
  getWeekOverview,
  calculateWeekProgress,
  ERA_COLORS 
} from '../../utils/weeklyEraData';
import { StoryLink } from '../StoryLink';

interface WeeklyEraPageProps {
  onNavigate?: (page: string) => void;
}

export function WeeklyEraPage({ onNavigate }: WeeklyEraPageProps) {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [completedDays, setCompletedDays] = useState<Record<number, number[]>>({
    1: [1, 2], // Demo: Week 1, Days 1 & 2 completed
  });
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Handle marking a day complete
  const handleCompleteDay = (week: number, day: number) => {
    setCompletedDays(prev => ({
      ...prev,
      [week]: [...(prev[week] || []), day],
    }));
  };

  // Check if a day is completed
  const isDayCompleted = (week: number, day: number) => {
    return completedDays[week]?.includes(day) || false;
  };

  // Calculate progress for a week
  const getWeekProgress = (week: number) => {
    return calculateWeekProgress(week, completedDays[week] || []);
  };

  // OVERVIEW: Show all 12 weeks - infiniteK
  if (!selectedWeek) {
    return (
      <div className="min-h-screen bg-white pb-24">
        {/* Header - infiniteK square */}
        <div 
          className="bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] text-white px-6 py-12"
          style={{ borderRadius: '0px' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              {onNavigate && (
                <button 
                  onClick={() => onNavigate('Journey')}
                  className="p-2 hover:bg-white/10 transition-colors"
                  style={{ borderRadius: '0px' }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <p 
                  className="text-purple-200 mb-1"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                >
                  ST43: Weekly ERA Sprints
                </p>
                <h1 
                  className="text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Your 12-Week Recovery Journey
                </h1>
              </div>
            </div>
            <p 
              className="text-purple-100 max-w-2xl"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.6' }}
            >
              84 daily exercises designed to transform recovery into reflexes. Each week completes one Theme through the ERA flow: <strong>Experience → Recognize → Align</strong>.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Related DNA Foundation - infiniteK */}
          {onNavigate && (
            <div 
              className="bg-[#F5F3FF] p-6 border-2 border-[#5739FB]/10 mb-8"
              style={{ borderRadius: '0px' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-[#3E2BB8]" />
                <h3 
                  className="text-gray-900"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
                >
                  Built on DNA Foundation
                </h3>
              </div>
              <p 
                className="text-gray-600 mb-4"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
              >
                This content tool implements core principles from DNA HUB
              </p>
              <div className="flex flex-wrap gap-2">
                <StoryLink storyId="ST3" onNavigate={onNavigate} variant="pill" showTitle />
                <StoryLink storyId="ST2" onNavigate={onNavigate} variant="pill" showTitle />
                <StoryLink storyId="ST43" onNavigate={onNavigate} variant="pill" showTitle />
              </div>
            </div>
          )}
          
          {/* Legend - infiniteK square */}
          <div 
            className="bg-[#FAFAFA] p-6 mb-8"
            style={{ borderRadius: '0px' }}
          >
            <h3 
              className="text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
            >
              The ERA Journey
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`p-4 ${ERA_COLORS.experience.bg} border-2 ${ERA_COLORS.experience.border}`}
                style={{ borderRadius: '0px' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className={`px-2 py-0.5 ${ERA_COLORS.experience.badge}`}
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 600, 
                      fontSize: '0.75rem',
                      borderRadius: '0px'
                    }}
                  >
                    EXPERIENCE
                  </span>
                </div>
                <p 
                  className="text-gray-700"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                >
                  Weeks 1-4: Spark awareness and create "aha" moments
                </p>
              </div>
              <div 
                className={`p-4 ${ERA_COLORS.recognize.bg} border-2 ${ERA_COLORS.recognize.border}`}
                style={{ borderRadius: '0px' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className={`px-2 py-0.5 ${ERA_COLORS.recognize.badge}`}
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 600, 
                      fontSize: '0.75rem',
                      borderRadius: '0px'
                    }}
                  >
                    RECOGNIZE
                  </span>
                </div>
                <p 
                  className="text-gray-700"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                >
                  Weeks 5-8: Build pattern recognition and test new responses
                </p>
              </div>
              <div 
                className={`p-4 ${ERA_COLORS.align.bg} border-2 ${ERA_COLORS.align.border}`}
                style={{ borderRadius: '0px' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className={`px-2 py-0.5 ${ERA_COLORS.align.badge}`}
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 600, 
                      fontSize: '0.75rem',
                      borderRadius: '0px'
                    }}
                  >
                    ALIGN
                  </span>
                </div>
                <p 
                  className="text-gray-700"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                >
                  Weeks 9-12: Decide, commit, and embody lasting change
                </p>
              </div>
            </div>
          </div>

          {/* 12 Week Grid - infiniteK */}
          <div className="space-y-4">
            {TWELVE_WEEK_OVERVIEW.map((week) => {
              const progress = getWeekProgress(week.week);
              const eraColor = ERA_COLORS[week.eraPhase];
              
              return (
                <button
                  key={week.week}
                  onClick={() => setSelectedWeek(week.week)}
                  className="w-full bg-[#FAFAFA] p-6 hover:shadow-md transition-all text-left group"
                  style={{ borderRadius: '0px' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Week Number & Badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <span 
                          className="text-gray-900"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
                        >
                          Week {week.week}
                        </span>
                        <span 
                          className={`px-2 py-0.5 ${eraColor.badge}`}
                          style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            borderRadius: '0px'
                          }}
                        >
                          {week.eraPhase.toUpperCase()}
                        </span>
                      </div>

                      {/* Theme */}
                      <h3 
                        className="text-gray-900 group-hover:text-[#5739FB] transition-colors mb-2"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                      >
                        {week.theme}
                      </h3>

                      {/* Description */}
                      <p 
                        className="text-gray-600 mb-3"
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                      >
                        {week.description}
                      </p>

                      {/* Domain & Pillar - No emojis */}
                      <div 
                        className="flex items-center gap-4 text-gray-500"
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}
                      >
                        <span>Domain: {week.domain}</span>
                        <span>Pillar: {week.pillar}</span>
                      </div>
                    </div>

                    {/* Progress Circle - Square container */}
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#F3F4F6"
                            strokeWidth="6"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#5739FB"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span 
                            className="text-gray-900"
                            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
                          >
                            {progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar - Square */}
                  {progress > 0 && (
                    <div className="mt-4 pt-4 border-t-2 border-gray-200">
                      <div className="flex items-center gap-2">
                        <div 
                          className="flex-1 h-2 bg-gray-200 overflow-hidden"
                          style={{ borderRadius: '0px' }}
                        >
                          <div 
                            className="h-full bg-[#5739FB] transition-all duration-500"
                            style={{ width: `${progress}%`, borderRadius: '0px' }}
                          />
                        </div>
                        <span 
                          className="text-gray-500"
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}
                        >
                          {Math.round(progress / 100 * 7)}/7 days
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Info Footer - infiniteK square */}
          <div 
            className="mt-12 bg-purple-50 border-2 border-purple-200 p-6"
            style={{ borderRadius: '0px' }}
          >
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 
                  className="text-purple-900 mb-2"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
                >
                  The Infinite Canvas Principle
                </h4>
                <p 
                  className="text-purple-800"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: '1.6' }}
                >
                  Recovery isn't about completion. It's about exploration. Each week opens new pathways, and your favorite practices become lifelong companions. Nothing is ever "done," only deepened and refined.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // WEEK VIEW: Show 7 days for selected week - infiniteK
  const weekOverview = getWeekOverview(selectedWeek);
  const weekExercises = getWeekExercises(selectedWeek);
  const weekProgress = getWeekProgress(selectedWeek);

  if (!weekOverview) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p 
            className="text-gray-600 mb-4"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
          >
            Week {selectedWeek} content coming soon...
          </p>
          <Button 
            onClick={() => setSelectedWeek(null)}
            style={{ borderRadius: '0px' }}
          >
            Back to Overview
          </Button>
        </div>
      </div>
    );
  }

  const eraColor = ERA_COLORS[weekOverview.eraPhase];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header - infiniteK square */}
      <div 
        className={`${eraColor.bg} border-b-2 ${eraColor.border} px-6 py-8`}
        style={{ borderRadius: '0px' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => setSelectedWeek(null)}
              className="p-2 hover:bg-white/50 transition-colors"
              style={{ borderRadius: '0px' }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p 
                  className={`${eraColor.text}`}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                >
                  Week {selectedWeek}
                </p>
                <span 
                  className={`px-2 py-0.5 ${eraColor.badge}`}
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 600, 
                    fontSize: '0.75rem',
                    borderRadius: '0px'
                  }}
                >
                  {weekOverview.eraPhase.toUpperCase()}
                </span>
              </div>
              <h1 
                className="text-gray-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {weekOverview.theme}
              </h1>
            </div>
          </div>
          
          <p 
            className="text-gray-700 mb-4 max-w-2xl"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
          >
            {weekOverview.description}
          </p>

          {/* Progress - Square */}
          <div className="flex items-center gap-4">
            <div 
              className="flex-1 h-2 bg-white overflow-hidden"
              style={{ borderRadius: '0px' }}
            >
              <div 
                className="h-full bg-[#5739FB] transition-all duration-500"
                style={{ width: `${weekProgress}%`, borderRadius: '0px' }}
              />
            </div>
            <span 
              className="text-gray-700"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
            >
              {weekProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Days Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {weekExercises.map((day) => {
            const isCompleted = isDayCompleted(selectedWeek, day.day);
            const isExpanded = expandedDay === day.day;
            
            return (
              <div
                key={day.day}
                className="bg-[#FAFAFA] overflow-hidden transition-all"
                style={{ borderRadius: '0px' }}
              >
                <button
                  onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                  className="w-full p-6 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  {/* Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCompleted) {
                        handleCompleteDay(selectedWeek, day.day);
                      }
                    }}
                    className="flex-shrink-0 mt-1"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="text-gray-900"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem' }}
                      >
                        Day {day.day}
                      </span>
                      {isCompleted && (
                        <span 
                          className="px-2 py-0.5 bg-green-100 text-green-700"
                          style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontWeight: 600, 
                            fontSize: '0.625rem',
                            borderRadius: '0px',
                            textTransform: 'uppercase'
                          }}
                        >
                          Complete
                        </span>
                      )}
                    </div>
                    <h3 
                      className="text-gray-900 mb-2"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}
                    >
                      {day.title}
                    </h3>
                    <p 
                      className="text-gray-600"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                    >
                      {day.description}
                    </p>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t-2 border-gray-200">
                    <DailyExerciseCard
                      day={day.day}
                      title={day.title}
                      description={day.description}
                      exercises={day.exercises}
                      onComplete={() => handleCompleteDay(selectedWeek, day.day)}
                      isCompleted={isCompleted}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
