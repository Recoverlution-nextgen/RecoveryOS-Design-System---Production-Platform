/**
 * NaviCues Page - Recovery Instagram Landing
 * 
 * Philosophy:
 * - Show latest cue as a preview/hero
 * - When you interact → launches full Recovery Instagram
 * - Clean, immediate, inviting
 * - No information overload
 * 
 * Design DNA:
 * - infiniteK Square: borderRadius: '0px' everywhere
 * - Frosted Glass v4.9
 * - NO CARD ON CARD
 * - Brand purple: #3E2BB8 and #5739FB
 * - NO dashes, NO minimizing words
 */

import { useState } from "react";
import { Brain, Heart, Waves, Compass, Star, History, Sparkles, Play, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { PlatformPageHeader } from "../PlatformPageHeader";
import { 
  ShameSuite, 
  ValuesSuite, 
  UrgeSurfingSuite, 
  WindowOfToleranceSuite,
  CognitiveDefusionSuite,
  SocialSupportSuite
} from "../navicues/RecoveryInstagramSuites";
import { LumaRecommendations } from "../navicues/LumaRecommendations";

type NavicueType = "shame" | "window-of-tolerance" | "urge-surfing" | "values" | "cognitive-defusion" | "social-support";

interface NavicueMetadata {
  id: NavicueType;
  title: string;
  subtitle: string;
  pillar: string;
  icon: any;
  gradient: string;
  heroImage: string;
  tagline: string;
  favorited?: boolean;
}

const allNavicues: NavicueMetadata[] = [
  {
    id: "values",
    title: "Values Clarification",
    subtitle: "Discover what you're recovering for",
    pillar: "Identity Integration",
    icon: Compass,
    gradient: "from-blue-500 to-indigo-500",
    heroImage: "",
    tagline: "What's your why?"
  },
  {
    id: "shame",
    title: "Understanding Shame",
    subtitle: "Meet shame with compassion",
    pillar: "Emotional Regulation",
    icon: Heart,
    gradient: "from-[#FF8E72] to-[#FFB84D]",
    heroImage: "",
    tagline: "Shame dies in the light"
  },
  {
    id: "window-of-tolerance",
    title: "Window of Tolerance",
    subtitle: "Regulate your nervous system",
    pillar: "Stress Resilience",
    icon: Waves,
    gradient: "from-purple-500 to-pink-500",
    heroImage: "",
    tagline: "Where are you right now?"
  },
  {
    id: "urge-surfing",
    title: "Urge Surfing",
    subtitle: "Ride the wave of craving",
    pillar: "Stress Resilience",
    icon: Waves,
    gradient: "from-cyan-500 to-blue-500",
    heroImage: "",
    tagline: "Urges always pass"
  },
  {
    id: "cognitive-defusion",
    title: "Cognitive Defusion",
    subtitle: "See thoughts as mental events",
    pillar: "Cognitive Reframing",
    icon: Brain,
    gradient: "from-[#B4A7D6] to-[#C9A0DC]",
    heroImage: "",
    tagline: "Thoughts aren't facts"
  },
  {
    id: "social-support",
    title: "Social Support Mapping",
    subtitle: "Strengthen your connections",
    pillar: "Social Connectivity",
    icon: Heart,
    gradient: "from-emerald-500 to-teal-500",
    heroImage: "",
    tagline: "Who's in your corner?"
  }
];

interface NavicuesPageProps {
  patientId?: string;
  currentWeek?: number;
  onNavigateToBuildingBlock?: (navicueId: string) => void;
  heroImage?: string;
}

export function NavicuesPage({ 
  patientId = "mock-patient", 
  currentWeek = 1,
  onNavigateToBuildingBlock,
  heroImage
}: NavicuesPageProps) {
  const [selectedNavicue, setSelectedNavicue] = useState<NavicueType | null>(null);
  const [exploredNavicues, setExploredNavicues] = useState<Set<NavicueType>>(new Set(["values"]));
  const [favoritedNavicues, setFavoritedNavicues] = useState<Set<NavicueType>>(new Set(["values"]));

  // Dynamic count based on patient week
  const getVisibleCount = (week: number): number => {
    if (week <= 2) return 1;
    if (week <= 4) return 2;
    return 3;
  };

  const visibleCount = getVisibleCount(currentWeek);

  // Split navicues: unexplored vs explored
  const unexploredNavicues = allNavicues.filter(n => !exploredNavicues.has(n.id));
  
  // Featured cue = first unexplored (or first overall if all explored)
  const featuredCue = unexploredNavicues[0] || allNavicues[0];
  
  // Up next = 2-3 upcoming cues (after featured)
  const upNextCues = unexploredNavicues.slice(1, visibleCount);

  const handleExplore = (navicueId: NavicueType) => {
    setSelectedNavicue(navicueId);
  };

  const handleComplete = (navicueId: NavicueType) => {
    setExploredNavicues(prev => new Set([...prev, navicueId]));
    setSelectedNavicue(null);
  };

  const toggleFavorite = (navicueId: NavicueType) => {
    setFavoritedNavicues(prev => {
      const newSet = new Set(prev);
      if (newSet.has(navicueId)) {
        newSet.delete(navicueId);
      } else {
        newSet.add(navicueId);
      }
      return newSet;
    });
  };

  // If a NaviCue is selected, show Recovery Instagram fullscreen
  if (selectedNavicue) {
    switch (selectedNavicue) {
      case "values":
        return (
          <ValuesSuite
            onComplete={() => handleComplete("values")}
            onClose={() => setSelectedNavicue(null)}
            onBreathPause={() => setSelectedNavicue(null)}
            onGoDeeper={(navicueId) => {
              onNavigateToBuildingBlock?.(navicueId);
            }}
          />
        );
      case "shame":
        return (
          <ShameSuite
            onComplete={() => handleComplete("shame")}
            onClose={() => setSelectedNavicue(null)}
            onBreathPause={() => setSelectedNavicue(null)}
            onGoDeeper={(navicueId) => {
              onNavigateToBuildingBlock?.(navicueId);
            }}
          />
        );
      case "window-of-tolerance":
        return (
          <WindowOfToleranceSuite
            onComplete={() => handleComplete("window-of-tolerance")}
            onClose={() => setSelectedNavicue(null)}
            onBreathPause={() => setSelectedNavicue(null)}
            onGoDeeper={(navicueId) => {
              onNavigateToBuildingBlock?.(navicueId);
            }}
          />
        );
      case "urge-surfing":
        return (
          <UrgeSurfingSuite
            onComplete={() => handleComplete("urge-surfing")}
            onClose={() => setSelectedNavicue(null)}
            onBreathPause={() => setSelectedNavicue(null)}
            onGoDeeper={(navicueId) => {
              onNavigateToBuildingBlock?.(navicueId);
            }}
          />
        );
      case "cognitive-defusion":
        return (
          <CognitiveDefusionSuite
            onComplete={() => handleComplete("cognitive-defusion")}
            onClose={() => setSelectedNavicue(null)}
            onBreathPause={() => setSelectedNavicue(null)}
            onGoDeeper={(navicueId) => {
              onNavigateToBuildingBlock?.(navicueId);
            }}
          />
        );
      case "social-support":
        return (
          <SocialSupportSuite
            onComplete={() => handleComplete("social-support")}
            onClose={() => setSelectedNavicue(null)}
            onBreathPause={() => setSelectedNavicue(null)}
            onGoDeeper={(navicueId) => {
              onNavigateToBuildingBlock?.(navicueId);
            }}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="text-center">
              <Brain className="w-16 h-16 text-[#5739FB] mx-auto mb-4" />
              <h2 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">This NaviCue is being built with clinical rigor.</p>
              <Button onClick={() => setSelectedNavicue(null)} style={{ borderRadius: '0px' }}>
                Back to NaviCues
              </Button>
            </div>
          </div>
        );
    }
  }

  // Main view
  const FeaturedIcon = featuredCue.icon;

  // All Series Sheet component
  const allSeriesSheet = (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="bg-white/20 text-white border border-white/40 px-4 py-2 text-sm hover:bg-white/30 backdrop-blur-sm transition-all"
          style={{ borderRadius: '0px', fontFamily: 'var(--font-display)', fontWeight: 600 }}
        >
          <History className="w-4 h-4 inline-block mr-2" />
          All Series
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            All Series
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            Explore all NaviCue series. Return to what resonates.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {allNavicues.map((navicue) => {
            const Icon = navicue.icon;
            const isFavorited = favoritedNavicues.has(navicue.id);
            const isExplored = exploredNavicues.has(navicue.id);

            return (
              <div
                key={navicue.id}
                className="bg-white/85 backdrop-blur-[32px] backdrop-saturate-[180%] border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(62,43,184,0.1)_inset] hover:border-[#3E2BB8]/20 transition-all duration-300 overflow-hidden"
                style={{ borderRadius: '0px' }}
              >
                <div className="flex items-start gap-4 p-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${navicue.gradient} flex items-center justify-center flex-shrink-0`}
                       style={{ borderRadius: '0px' }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{navicue.title}</h3>
                      <button
                        onClick={() => toggleFavorite(navicue.id)}
                        className="flex-shrink-0"
                      >
                        <Star
                          className={`w-5 h-5 transition-colors ${
                            isFavorited
                              ? 'text-[#5739FB] fill-[#5739FB]'
                              : 'text-gray-400 hover:text-[#5739FB]'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{navicue.subtitle}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{navicue.pillar}</span>
                      {isExplored && (
                        <>
                          <span>•</span>
                          <span className="text-[#5739FB]">Explored</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => handleExplore(navicue.id)}
                      className="w-full py-2 px-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white text-sm hover:shadow-lg transition-all"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, borderRadius: '0px' }}
                    >
                      {isExplored ? 'Revisit' : 'Explore'}
                    </button>
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Universal Page Header */}
      <PlatformPageHeader
        page="Navicues"
        headline="Recovery in the flow of life."
        height="medium"
        actions={allSeriesSheet}
      />

      {/* Main Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* LUMA Recommendations - AI-Powered Suggestions */}
          <LumaRecommendations
            patientId={patientId}
            type="spark"
            limit={3}
            onSelectNaviCue={(id) => handleExplore(id as NavicueType)}
          />
          
          {/* Featured NaviCue */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-[#5739FB]" />
              <h2 className="text-2xl text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                The Time is Now.
              </h2>
            </div>

            {/* Hero Card */}
            <button
              onClick={() => handleExplore(featuredCue.id)}
              className="group relative w-full aspect-[9/16] md:aspect-[16/9] overflow-hidden bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.25),0_6px_20px_rgba(87,57,251,0.2)] transition-all duration-300"
              style={{ borderRadius: '0px' }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${featuredCue.gradient}`} />
              
              {/* Frosted Glass Footer Bar */}
              <div className="absolute bottom-0 left-0 right-0">
                <div 
                  className="bg-white/10 backdrop-blur-[32px] backdrop-saturate-[180%] 
                             border-t border-white/20 px-8 py-6
                             shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                             transition-all duration-300 group-hover:bg-white/15"
                >
                  {/* Content */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left: Icon + Title + Tagline */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 flex-shrink-0 bg-gradient-to-br ${featuredCue.gradient} flex items-center justify-center shadow-lg`}
                           style={{ borderRadius: '0px' }}>
                        <FeaturedIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-xl md:text-2xl mb-1 truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                          {featuredCue.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base italic truncate">
                          {featuredCue.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Right: CTA Button */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white shadow-lg group-hover:shadow-xl transition-all"
                           style={{ borderRadius: '0px' }}>
                        <Play className="w-5 h-5" />
                        <span className="text-base" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                          Start
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom hint */}
                  <p className="text-white/60 text-xs mt-3 text-center md:text-left">
                    Tap to begin. Always can skip. The time is now.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Up Next */}
          {upNextCues.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <ArrowRight className="w-6 h-6 text-[#5739FB]" />
                <h2 className="text-2xl text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  Up Next
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upNextCues.map((navicue) => {
                  const Icon = navicue.icon;

                  return (
                    <button
                      key={navicue.id}
                      onClick={() => handleExplore(navicue.id)}
                      className="group relative aspect-[4/3] overflow-hidden bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_28px_rgba(59,130,246,0.2),0_4px_14px_rgba(87,57,251,0.15)] transition-all duration-300 text-left"
                      style={{ borderRadius: '0px' }}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${navicue.gradient}`} />
                      
                      {/* Frosted Glass Footer */}
                      <div className="absolute bottom-0 left-0 right-0">
                        <div className="bg-white/10 backdrop-blur-[32px] backdrop-saturate-[180%] border-t border-white/20 p-4 transition-all duration-300 group-hover:bg-white/15">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 flex-shrink-0 bg-gradient-to-br ${navicue.gradient} flex items-center justify-center shadow-md`}
                                 style={{ borderRadius: '0px' }}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-white text-base flex-1 min-w-0 truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                              {navicue.title}
                            </h3>
                          </div>
                          <p className="text-white/70 text-xs pl-13">
                            {navicue.pillar}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gentle reminder */}
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500 italic leading-relaxed max-w-2xl mx-auto">
              Each NaviCue is a quick-fire brain ping. Always can skip. No pressure. Presence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}