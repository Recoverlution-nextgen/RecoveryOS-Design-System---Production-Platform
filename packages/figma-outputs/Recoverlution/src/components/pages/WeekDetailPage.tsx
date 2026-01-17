/**
 * ST49: Week Detail Page
 * Individual week view with NaviCues and live micro-block state changes
 */

import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  ArrowLeft,
  Brain,
  Heart,
  Users,
  Lightbulb,
  Target,
  Compass,
  Star,
  Play,
  CheckCircle2,
} from 'lucide-react';
import {
  Patient,
  PatientMicroBlockState,
  getPatient,
  getPatientMicroBlocks,
  updateMicroBlockState,
  completeNaviCue,
  toggleFavorite,
  getStateColor,
  getStateEmoji,
  getNextState,
} from '../../utils/patientData';
import { microBlocks } from '../../utils/microBlockData';
import { weeklyEraData } from '../../utils/weeklyEraData';

interface WeekDetailPageProps {
  patientId: string;
  weekNumber: number;
  onBack: () => void;
  onNavigateToNaviCue: (navicueId: string) => void;
}

// Pillar icons mapping
const PILLAR_ICONS: Record<string, any> = {
  'Emotional Regulation': Heart,
  'Stress & Resilience': Target,
  'Social Connectivity': Users,
  'Cognitive Reframing': Brain,
  'Identity Integration': Compass,
  'Decision Mastery': Lightbulb,
};

// Mock NaviCues data (we'll expand this later)
const NAVICUES_DATA = [
  {
    id: 'cognitive-defusion',
    title: 'Cognitive Defusion',
    description: 'Learn to observe thoughts without being controlled by them',
    pillar: 'Cognitive Reframing',
    duration: '3 min read',
    targetBlocks: ['CB-COG-001', 'CB-COG-002', 'CB-COG-003'],
  },
  {
    id: 'social-support-mapping',
    title: 'Social Support Mapping',
    description: 'Identify and strengthen your support network',
    pillar: 'Social Connectivity',
    duration: '4 min read',
    targetBlocks: ['CB-SOC-001', 'CB-SOC-002'],
  },
  {
    id: 'urge-surfing',
    title: 'Urge Surfing',
    description: 'Ride the wave of cravings without acting on them',
    pillar: 'Emotional Regulation',
    duration: '8 min practice',
    targetBlocks: ['CB-EMO-001', 'CB-EMO-002'],
  },
  {
    id: 'values-clarification',
    title: 'Values Clarification',
    description: 'Connect with what truly matters to you',
    pillar: 'Identity Integration',
    duration: '12 min exercise',
    targetBlocks: ['CB-IDE-001', 'CB-IDE-002'],
  },
];

export function WeekDetailPage({
  patientId,
  weekNumber,
  onBack,
  onNavigateToNaviCue,
}: WeekDetailPageProps) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [microBlockStates, setMicroBlockStates] = useState<PatientMicroBlockState[]>([]);
  const [completedNaviCues, setCompletedNaviCues] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const weekData = weeklyEraData.find((w) => w.weekNumber === weekNumber);

  useEffect(() => {
    loadWeekData();
  }, [patientId, weekNumber]);

  const loadWeekData = async () => {
    setIsLoading(true);
    try {
      const [patientData, blockStates] = await Promise.all([
        getPatient(patientId),
        getPatientMicroBlocks(patientId),
      ]);

      setPatient(patientData);
      setMicroBlockStates(blockStates);

      // Load journey progress for this week
      // (In production, this would come from getJourneyProgress)
      // For now, we'll track locally
    } catch (error) {
      console.error('❌ Error loading week data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get micro-blocks for this week
  const weekMicroBlocks = weekData
    ? weekData.microBlockIds
        .map((blockId) => {
          const block = microBlocks.find((b) => b.id === blockId);
          const state = microBlockStates.find((s) => s.blockId === blockId);
          return { block, state };
        })
        .filter((item) => item.block && item.state)
    : [];

  // Simulate completing a NaviCue (this will trigger real state changes)
  const handleCompleteNaviCue = async (navicueId: string) => {
    if (!patient) return;

    // Find NaviCue
    const navicue = NAVICUES_DATA.find((n) => n.id === navicueId);
    if (!navicue) return;

    try {
      // Update all target micro-blocks
      for (const blockId of navicue.targetBlocks) {
        const currentState = microBlockStates.find((s) => s.blockId === blockId);
        if (currentState) {
          const nextState = getNextState(currentState.state);
          await updateMicroBlockState(patient.id, blockId, nextState, navicueId);
          console.log(`✅ Updated ${blockId}: ${currentState.state} → ${nextState}`);
        }
      }

      // Mark NaviCue as completed
      await completeNaviCue(patient.id, weekNumber, navicueId);
      setCompletedNaviCues([...completedNaviCues, navicueId]);

      // Reload data to show updated states
      await loadWeekData();

      alert(`✅ NaviCue completed! Micro-blocks updated:\n${navicue.targetBlocks.join(', ')}`);
    } catch (error) {
      console.error('❌ Error completing NaviCue:', error);
      alert('Failed to update progress. Please try again.');
    }
  };

  // Toggle favorite
  const handleToggleFavorite = async (navicueId: string) => {
    if (!patient) return;

    try {
      const isFavorited = await toggleFavorite(patient.id, weekNumber, navicueId);
      
      if (isFavorited) {
        setFavorites([...favorites, navicueId]);
      } else {
        setFavorites(favorites.filter((id) => id !== navicueId));
      }
    } catch (error) {
      console.error('❌ Error toggling favorite:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5739FB] mx-auto mb-4" />
          <p className="text-gray-600">Loading Week {weekNumber}...</p>
        </div>
      </div>
    );
  }

  if (!weekData || !patient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <p className="text-red-600">Week not found.</p>
          <Button onClick={onBack} className="mt-4">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  const getPhase = () => {
    if (weekNumber <= 3) return { name: 'Foundation', color: 'bg-blue-500' };
    if (weekNumber <= 6) return { name: 'Integration', color: 'bg-purple-500' };
    return { name: 'Autonomy', color: 'bg-green-500' };
  };

  const phase = getPhase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-[#5739FB]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Journey
        </Button>

        {/* Week Header */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-display text-[#3E2BB8]">
                  Week {weekNumber}
                </h1>
                <Badge className={`${phase.color} text-white`}>{phase.name}</Badge>
              </div>
              <p className="text-xl text-gray-700 mb-2">{weekData.primaryFocus}</p>
              <p className="text-gray-600">{weekData.pillarEmphasis}</p>
            </div>
          </div>

          {/* Micro-Block Overview */}
          <div className="mt-6 pt-6 border-t border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-[#5739FB]" />
              <h3 className="text-lg font-display text-[#3E2BB8]">
                Micro-Block Progress
              </h3>
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
              {weekMicroBlocks.map(({ block, state }: any) => {
                const PillarIcon = PILLAR_ICONS[block.pillar] || Brain;
                return (
                  <div
                    key={state.blockId}
                    className="group relative"
                    title={`${block.name} - ${state.state}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${getStateColor(
                        state.state
                      )} flex items-center justify-center transition-transform group-hover:scale-110 shadow-md`}
                    >
                      <PillarIcon className="w-5 h-5 text-white" />
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

            {/* State Counts */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-sm text-gray-700">
                  {weekMicroBlocks.filter(({ state }: any) => state.state === 'red').length} Red
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500" />
                <span className="text-sm text-gray-700">
                  {weekMicroBlocks.filter(({ state }: any) => state.state === 'orange').length}{' '}
                  Orange
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">
                  {weekMicroBlocks.filter(({ state }: any) => state.state === 'green').length} Green
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* NaviCues Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-display text-[#3E2BB8] mb-4">
            NaviCues for This Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NAVICUES_DATA.map((navicue) => {
              const PillarIcon = PILLAR_ICONS[navicue.pillar] || Brain;
              const isCompleted = completedNaviCues.includes(navicue.id);
              const isFavorited = favorites.includes(navicue.id);

              return (
                <Card key={navicue.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center">
                        <PillarIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-[#3E2BB8]">{navicue.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {navicue.pillar}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFavorite(navicue.id)}
                      className={isFavorited ? 'text-yellow-500' : 'text-gray-400'}
                    >
                      <Star className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{navicue.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{navicue.duration}</span>
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleCompleteNaviCue(navicue.id)}
                          className="bg-[#5739FB] hover:bg-[#4729DB] text-white"
                          size="sm"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Target Blocks */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Affects {navicue.targetBlocks.length} micro-blocks:</p>
                    <div className="flex items-center gap-2">
                      {navicue.targetBlocks.map((blockId) => {
                        const state = microBlockStates.find((s) => s.blockId === blockId);
                        return (
                          <div
                            key={blockId}
                            className={`w-6 h-6 rounded-full ${
                              state ? getStateColor(state.state) : 'bg-gray-400'
                            }`}
                            title={blockId}
                          />
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
