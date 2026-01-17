/**
 * ST49: Journey - NOW View with 12-Scene E-R-A + SEED Integration
 * REDESIGNED v3.0: NaviCues-style tiles with Pixabay images
 * 
 * THE NOW PRINCIPLE: Patients are always in the now.
 * No timelines, no weeks, no deadlines, no completion tracking.
 * Only: What's here for you now + What you've explored before.
 * 
 * Philosophy:
 * - Fluid and forever (nothing complete, only favorited)
 * - Inner work you can feel (not tasks to log)
 * - Plant the seed, let them experience
 * - Start when you're ready, revisit what resonates
 * 
 * @version 3.0 - October 2024 - NaviCues-style tile design
 */

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import {
  Sparkles,
  Heart,
  Users,
  Brain,
  Target,
  Compass,
  Lightbulb,
  Play,
  History,
  ChevronRight,
  Star,
  Clock,
} from 'lucide-react';
import {
  Patient,
  getPatient,
} from '../utils/patientData';
import { JourneyWeekFlow } from './JourneyWeekFlow';
import { JourneyScenarioSwitcher } from './JourneyScenarioSwitcher';
import { getJourneyWeekData } from '../utils/journeyWeekData';
import { PlatformPageHeader } from './PlatformPageHeader';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getJourneySceneImageUrl } from '../utils/journeySceneImages';

interface JourneyNowViewProps {
  patientId: string;
  onStartPractice?: (navicueId: string) => void;
}

// Pillar icons
const PILLAR_ICONS: Record<string, any> = {
  'Emotional Regulation': Heart,
  'Stress & Resilience': Target,
  'Social Connectivity': Users,
  'Cognitive Reframing': Brain,
  'Identity Integration': Compass,
  'Decision Mastery': Lightbulb,
};

// Pillar colors
const PILLAR_COLORS: Record<string, { gradient: string, bg: string }> = {
  'Emotional Regulation': {
    gradient: 'from-rose-500 to-pink-500',
    bg: 'from-rose-500/5 to-pink-500/5'
  },
  'Stress & Resilience': {
    gradient: 'from-amber-500 to-orange-500',
    bg: 'from-amber-500/5 to-orange-500/5'
  },
  'Social Connectivity': {
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-500/5 to-cyan-500/5'
  },
  'Cognitive Reframing': {
    gradient: 'from-[#3E2BB8] to-[#5739FB]',
    bg: 'from-[#3E2BB8]/5 to-[#5739FB]/5'
  },
  'Identity Integration': {
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'from-emerald-500/5 to-teal-500/5'
  },
  'Decision Mastery': {
    gradient: 'from-yellow-500 to-amber-500',
    bg: 'from-yellow-500/5 to-amber-500/5'
  },
};

// Journey Practice Card
interface JourneyPracticeCard {
  id: string;
  weekNumber: number;
  title: string;
  tagline: string;
  pillar: string;
  duration: string;
  heroImage: string;
}

// Mock Journey Practices
// NOTE: heroImage is not used - JourneyWeekFlow generates dynamic Pixabay backgrounds
const JOURNEY_PRACTICES: JourneyPracticeCard[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    title: 'Foundations of Presence',
    tagline: 'Recognize triggers. Build conscious response.',
    pillar: 'Emotional Regulation',
    duration: '45 min',
    heroImage: '', // Not used - dynamic Pixabay backgrounds in JourneyWeekFlow
  },
  {
    id: 'week-8',
    weekNumber: 8,
    title: 'Living Your Values',
    tagline: 'Connect with what truly matters.',
    pillar: 'Identity Integration',
    duration: '50 min',
    heroImage: '', // Not used - dynamic Pixabay backgrounds in JourneyWeekFlow
  },
  {
    id: 'week-3',
    weekNumber: 3,
    title: 'Riding the Wave',
    tagline: 'Navigate cravings without acting.',
    pillar: 'Stress & Resilience',
    duration: '40 min',
    heroImage: '', // Not used - dynamic Pixabay backgrounds in JourneyWeekFlow
  },
];

export function JourneyNowView({ patientId, onStartPractice }: JourneyNowViewProps) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyExplored, setRecentlyExplored] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Flow state management
  const [inWeekFlow, setInWeekFlow] = useState(false);
  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number | null>(null);
  
  // Demo scenario switcher
  const [scenario, setScenario] = useState<'day-1' | 'months-in'>('day-1');
  
  // Practice card images (dynamically loaded from Pixabay/fallback)
  const [practiceImages, setPracticeImages] = useState<Record<number, string>>({});

  useEffect(() => {
    loadPatientData();
  }, [patientId]);

  const loadPatientData = async () => {
    setIsLoading(true);
    try {
      const patientData = await getPatient(patientId);
      
      const mockPatient: Patient = patientData || {
        id: patientId,
        name: 'Demo Patient',
        email: 'demo@recoverlution.com',
        currentWeek: scenario === 'day-1' ? 1 : 8,
        hasCompletedOnboarding: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setPatient(mockPatient);
      
      if (scenario === 'day-1') {
        setRecentlyExplored([]);
      } else {
        setRecentlyExplored(['week-1', 'week-3']);
      }
      
      // Load practice images for visible weeks
      loadPracticeImages();
    } catch (error) {
      console.error('❌ Error loading patient data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load images for all practice cards
  const loadPracticeImages = async () => {
    console.log('\n🖼️ === LOADING PRACTICE CARD IMAGES ===');
    
    // Load images in parallel
    JOURNEY_PRACTICES.forEach(async (practice) => {
      try {
        const image = getJourneySceneImageUrl(practice.weekNumber);
        
        if (image) {
          setPracticeImages(prev => ({ ...prev, [practice.weekNumber]: image }));
        }
      } catch (error) {
        console.error(`❌ Error loading Week ${practice.weekNumber}:`, error);
      }
    });
  };
  
  useEffect(() => {
    if (patient) {
      loadPatientData();
    }
  }, [scenario]);

  const handleStartWeek = (weekNumber: number) => {
    setSelectedWeekNumber(weekNumber);
    setInWeekFlow(true);
  };

  const handleWeekComplete = () => {
    const weekId = `week-${selectedWeekNumber}`;
    if (selectedWeekNumber && !recentlyExplored.includes(weekId)) {
      setRecentlyExplored(prev => [...prev, weekId]);
    }
    setInWeekFlow(false);
    setSelectedWeekNumber(null);
  };

  const toggleFavorite = (practiceId: string) => {
    if (favorites.includes(practiceId)) {
      setFavorites(favorites.filter(id => id !== practiceId));
    } else {
      setFavorites([...favorites, practiceId]);
    }
  };

  // Render Week Flow (12 scenes)
  if (inWeekFlow && selectedWeekNumber) {
    const weekData = getJourneyWeekData(selectedWeekNumber);
    const practice = JOURNEY_PRACTICES.find(p => p.weekNumber === selectedWeekNumber);
    
    if (!weekData || !practice) {
      setInWeekFlow(false);
      return null;
    }

    return (
      <JourneyWeekFlow
        weekData={weekData}
        pillarName={practice.pillar}
        onComplete={handleWeekComplete}
        onBack={() => {
          setInWeekFlow(false);
          setSelectedWeekNumber(null);
        }}
      />
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div 
            className="w-8 h-8 border-4 border-[#3E2BB8]/20 border-t-[#3E2BB8] animate-spin mx-auto mb-4"
            style={{ borderRadius: '50%' }}
          />
          <p className="text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center px-6">
          <p className="text-red-600">Unable to load your profile.</p>
        </div>
      </div>
    );
  }

  // Separate practices
  const practicesToExplore = JOURNEY_PRACTICES.filter(p => !recentlyExplored.includes(p.id));
  const practicesToRevisit = JOURNEY_PRACTICES.filter(p => recentlyExplored.includes(p.id));

  // Dynamic practice count based on patient week
  const currentWeek = patient?.currentWeek || 1;
  const maxPracticesToShow = currentWeek <= 2 ? 1 : currentWeek <= 4 ? 2 : 3;
  const visiblePractices = practicesToExplore.slice(0, maxPracticesToShow);

  // Explored Sheet
  const exploredSheet = (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-md"
        >
          <History className="w-4 h-4 mr-2" />
          Explored
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-auto bg-white">
        <SheetHeader>
          <SheetTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Explored Practices
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Return to what resonates
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-3">
          {practicesToRevisit.map((practice) => {
            const PillarIcon = PILLAR_ICONS[practice.pillar] || Brain;
            const pillarColor = PILLAR_COLORS[practice.pillar];
            const isFavorite = favorites.includes(practice.id);
            
            return (
              <div 
                key={practice.id} 
                className="bg-white border border-gray-200 p-6 hover:border-[#3E2BB8]/30 hover:shadow-lg transition-all"
                style={{ borderRadius: '0px' }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className={`w-12 h-12 bg-gradient-to-br ${pillarColor.gradient} flex items-center justify-center flex-shrink-0`}
                    style={{ borderRadius: '0px' }}
                  >
                    <PillarIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {practice.title}
                      </h3>
                      <Button
                        onClick={() => toggleFavorite(practice.id)}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 flex-shrink-0"
                      >
                        <Star className={`w-4 h-4 ${isFavorite ? 'fill-[#5739FB] text-[#5739FB]' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{practice.tagline}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{practice.pillar}</span>
                      <span>•</span>
                      <span className="text-[#5739FB]">Explored</span>
                    </div>
                    <Button
                      onClick={() => handleStartWeek(practice.weekNumber)}
                      size="sm"
                      className="w-full"
                    >
                      Revisit
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <div className="flex-1 flex flex-col bg-white">
        {/* Universal Header with Explored Button */}
        <PlatformPageHeader
          page="Journey"
          headline="A timeless path to where you belong, as yourself."
          height="medium"
          actions={practicesToRevisit.length > 0 ? exploredSheet : undefined}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
            
            {/* Practice Cards - NaviCues Style */}
            {visiblePractices.length > 0 ? (
              <div className="space-y-6">
                {visiblePractices.map((practice) => {
                  const PillarIcon = PILLAR_ICONS[practice.pillar] || Brain;
                  const pillarColor = PILLAR_COLORS[practice.pillar];
                  
                  return (
                    <div 
                      key={practice.id} 
                      className="bg-white overflow-hidden border-2 border-gray-200 hover:border-[#3E2BB8]/30 transition-all hover:shadow-xl group"
                      style={{ borderRadius: '0px' }}
                      onMouseEnter={() => {
                        // Preload image when hovering over card
                        if (!practiceImages[practice.weekNumber]) {
                          const img = getJourneySceneImageUrl(practice.weekNumber);
                          if (img) {
                            setPracticeImages(prev => ({ ...prev, [practice.weekNumber]: img }));
                          }
                        }
                      }}
                    >
                      {/* Full Glass Card with Dynamic Pixabay Image */}
                      <div className="relative p-6 h-80 overflow-hidden">
                        {/* Base pillar gradient (fallback while loading) */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${pillarColor.gradient}`} />
                        
                        {/* Loading shimmer */}
                        {!practiceImages[practice.weekNumber] && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" 
                               style={{ backgroundSize: '200% 100%' }} 
                          />
                        )}
                        
                        {/* Pixabay Image - fades in when loaded */}
                        {practiceImages[practice.weekNumber] && (
                          <ImageWithFallback
                            src={practiceImages[practice.weekNumber]}
                            alt={practice.title}
                            className="absolute inset-0 w-full h-full object-cover animate-fadeIn"
                          />
                        )}
                        
                        {/* Gradient overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
                        
                        {/* Content over image */}
                        <div className="relative z-10 h-full flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div 
                                className="w-14 h-14 bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 flex-shrink-0"
                                style={{ borderRadius: '0px' }}
                              >
                                <PillarIcon className="w-7 h-7 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-white text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                                  {practice.title}
                                </h3>
                                <p className="text-white/90">{practice.tagline}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-white/80 text-sm">
                              <div 
                                className="w-2 h-2 bg-white/60"
                                style={{ borderRadius: '0px' }}
                              />
                              <span>{practice.pillar}</span>
                            </div>
                            
                            <Button
                              onClick={() => handleStartWeek(practice.weekNumber)}
                              className="bg-[#3E2BB8] hover:bg-[#5739FB] text-white"
                              size="sm"
                            >
                              <Play className="w-4 h-4 mr-1.5" />
                              Start
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div 
                className="bg-white border border-dashed border-gray-300 p-20 text-center"
                style={{ borderRadius: '0px' }}
              >
                <div 
                  className="w-20 h-20 bg-gradient-to-br from-[#3E2BB8]/10 to-[#5739FB]/10 flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: '0px' }}
                >
                  <Compass className="w-10 h-10 text-[#3E2BB8]/40" />
                </div>
                <h3 
                  className="text-[#1A1A1A] mb-3"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  You've explored what's here
                </h3>
                <p 
                  className="text-gray-500 mb-6"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem' }}
                >
                  Return to what resonates in Explored
                </p>
                {practicesToRevisit.length > 0 && (
                  <Button variant="outline">
                    <History className="w-4 h-4 mr-2" />
                    View Explored
                  </Button>
                )}
              </div>
            )}

            {/* Bottom Message */}
            {visiblePractices.length > 0 && (
              <div className="mt-20 text-center">
                <p 
                  className="text-gray-400 italic max-w-2xl mx-auto"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.8 }}
                >
                  Your path unfolds at your pace
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scenario Switcher */}
      <JourneyScenarioSwitcher
        currentScenario={scenario}
        onSwitch={setScenario}
      />
    </>
  );
}
