/**
 * ST49: Journey Timeline Component
 * 8-week vertical timeline with micro-block traffic light visualization
 */

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Calendar,
  Lock,
  Unlock,
  Star,
  TrendingUp,
  Brain,
  Heart,
  Users,
  Lightbulb,
  Target,
  Compass,
} from 'lucide-react';
import {
  Patient,
  PatientMicroBlockState,
  JourneyProgress,
  getPatient,
  getPatientMicroBlocks,
  getJourneyProgress,
  calculateOverallProgress,
  getStateColor,
  getStateEmoji,
} from '../utils/patientData';
import { microBlocks } from '../utils/microBlockData';
import { weeklyEraData } from '../utils/weeklyEraData';

interface JourneyTimelineProps {
  patientId: string;
  onNavigateToWeek: (weekNumber: number) => void;
}

// Pillar icons mapping
const PILLAR_ICONS: Record<string, any> = {
  'Emotional Regulation': Heart,
  'Stress & Resilience': TrendingUp,
  'Social Connectivity': Users,
  'Cognitive Reframing': Brain,
  'Identity Integration': Compass,
  'Decision Mastery': Target,
};

export function JourneyTimeline({ patientId, onNavigateToWeek }: JourneyTimelineProps) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [microBlockStates, setMicroBlockStates] = useState<PatientMicroBlockState[]>([]);
  const [journeyProgress, setJourneyProgress] = useState<JourneyProgress[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPatientData();
  }, [patientId]);

  const loadPatientData = async () => {
    setIsLoading(true);
    try {
      const [patientData, blockStates, progress, progressPercentage] = await Promise.all([
        getPatient(patientId),
        getPatientMicroBlocks(patientId),
        getJourneyProgress(patientId),
        calculateOverallProgress(patientId),
      ]);

      setPatient(patientData);
      setMicroBlockStates(blockStates);
      setJourneyProgress(progress);
      setOverallProgress(progressPercentage);
    } catch (error) {
      console.error('❌ Error loading patient data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get micro-blocks for a specific week
  const getMicroBlocksForWeek = (weekNumber: number) => {
    const weekData = weeklyEraData.find((w) => w.weekNumber === weekNumber);
    if (!weekData) return [];

    return weekData.microBlockIds
      .map((blockId) => {
        const block = microBlocks.find((b) => b.id === blockId);
        const state = microBlockStates.find((s) => s.blockId === blockId);
        return { block, state };
      })
      .filter((item) => item.block && item.state);
  };

  // Check if week is unlocked
  const isWeekUnlocked = (weekNumber: number) => {
    if (!patient) return false;
    return weekNumber <= patient.currentWeek;
  };

  // Get phase for week
  const getPhase = (weekNumber: number) => {
    if (weekNumber <= 3) return { name: 'Foundation', color: 'bg-blue-500' };
    if (weekNumber <= 6) return { name: 'Integration', color: 'bg-purple-500' };
    return { name: 'Autonomy', color: 'bg-green-500' };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5739FB] mx-auto mb-4" />
          <p className="text-gray-600">Loading your journey...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <p className="text-red-600">Patient not found. Please create a profile first.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-display text-[#3E2BB8] mb-2">
                Your Journey
              </h1>
              <p className="text-gray-600">
                Welcome back, {patient.name}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-display text-[#3E2BB8]">
                {overallProgress}%
              </div>
              <p className="text-sm text-gray-600">Overall Progress</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card className="p-4 text-center">
              <div className="text-2xl font-display text-[#3E2BB8]">
                Week {patient.currentWeek}
              </div>
              <p className="text-sm text-gray-600">Current Week</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-display text-[#3E2BB8]">
                {microBlockStates.filter((s) => s.state === 'green').length}
              </div>
              <p className="text-sm text-gray-600">Green Blocks</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-display text-[#3E2BB8]">
                {journeyProgress.reduce((sum, p) => sum + p.completedNaviCues.length, 0)}
              </div>
              <p className="text-sm text-gray-600">NaviCues Completed</p>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {weeklyEraData.map((week) => {
            const unlocked = isWeekUnlocked(week.weekNumber);
            const isCurrent = week.weekNumber === patient.currentWeek;
            const phase = getPhase(week.weekNumber);
            const weekBlocks = getMicroBlocksForWeek(week.weekNumber);
            const weekProgressData = journeyProgress.find((p) => p.weekNumber === week.weekNumber);

            return (
              <Card
                key={week.weekNumber}
                className={`p-6 transition-all ${
                  isCurrent
                    ? 'border-2 border-[#5739FB] shadow-xl scale-105'
                    : unlocked
                    ? 'border-purple-200 hover:shadow-lg'
                    : 'border-gray-200 opacity-60'
                }`}
              >
                {/* Week Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {unlocked ? (
                      <Unlock className="w-6 h-6 text-[#5739FB]" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-display text-[#3E2BB8]">
                          Week {week.weekNumber}
                        </h3>
                        <Badge className={`${phase.color} text-white`}>
                          {phase.name}
                        </Badge>
                        {isCurrent && (
                          <Badge className="bg-[#5739FB] text-white">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-700">{week.primaryFocus}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {week.pillarEmphasis}
                      </p>
                    </div>
                  </div>

                  {unlocked && (
                    <Button
                      onClick={() => onNavigateToWeek(week.weekNumber)}
                      className="bg-[#5739FB] hover:bg-[#4729DB] text-white"
                    >
                      Enter Week
                    </Button>
                  )}
                </div>

                {/* Micro-Block Traffic Lights */}
                {unlocked && weekBlocks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-purple-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        Micro-Block Progress ({weekBlocks.length} blocks)
                      </span>
                    </div>
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                      {weekBlocks.map(({ block, state }: any) => {
                        const PillarIcon = PILLAR_ICONS[block.pillar] || Brain;
                        return (
                          <div
                            key={state.blockId}
                            className="group relative"
                            title={`${block.name} - ${state.state}`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full ${getStateColor(
                                state.state
                              )} flex items-center justify-center transition-transform group-hover:scale-125`}
                            >
                              <PillarIcon className="w-4 h-4 text-white" />
                            </div>
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                              <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                                {block.name}
                                <br />
                                {getStateEmoji(state.state)} {state.state.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* State Summary */}
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-gray-600">
                          {weekBlocks.filter(({ state }: any) => state.state === 'red').length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-gray-600">
                          {weekBlocks.filter(({ state }: any) => state.state === 'orange').length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-gray-600">
                          {weekBlocks.filter(({ state }: any) => state.state === 'green').length}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Locked State */}
                {!unlocked && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                    <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Complete Week {patient.currentWeek} to unlock
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
