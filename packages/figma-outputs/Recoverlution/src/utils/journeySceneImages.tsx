/**
 * Journey Scene Images - Curated Unsplash Collection
 * 
 * One carefully selected image per Journey scene (12 weeks)
 * Each image becomes both the hero card AND the scene background
 * 
 * Design DNA:
 * - NaviCues pattern (same image for card + background)
 * - infiniteK purple aesthetic
 * - Square cards with frosted glass overlays
 * - Curated (not random) for consistent experience
 * 
 * Migration: Replaced Pixabay dynamic loading with curated Unsplash
 * Rationale: Better integration, faster loading, proven NaviCues pattern
 */

export interface JourneySceneImage {
  week: number;
  title: string;
  unsplashUrl: string;
  photographer: string;
  photographerUrl: string;
  searchQuery: string; // For reference/future updates
}

export const JOURNEY_SCENE_IMAGES: Record<number, JourneySceneImage> = {
  // Week 1: Anchor In
  1: {
    week: 1,
    title: "Anchor In",
    unsplashUrl: "https://images.unsplash.com/photo-1760039894970-eb66a3633c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwbGlnaHQlMjByYXlzJTIwY2FsbXxlbnwxfHx8fDE3NjEyOTExMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    photographer: "Unsplash",
    photographerUrl: "https://unsplash.com/",
    searchQuery: "underwater light rays calm"
  },

  // Week 2: The Inner Compass
  2: {
    week: 2,
    title: "The Inner Compass",
    unsplashUrl: "https://images.unsplash.com/photo-1695500077723-013595cee5b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMHB1cnBsZSUyMHBhdGh8ZW58MXx8fHwxNzYxMjkxMTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    photographer: "Unsplash",
    photographerUrl: "https://unsplash.com/",
    searchQuery: "northern lights purple path"
  },

  // Week 3: Urge Surfing
  3: {
    week: 3,
    title: "Urge Surfing",
    unsplashUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
    photographer: "Linus Nylund",
    photographerUrl: "https://unsplash.com/@doto",
    searchQuery: "ocean waves abstract"
  },

  // Week 4: Shame Resilience
  4: {
    week: 4,
    title: "Shame Resilience",
    unsplashUrl: "https://images.unsplash.com/photo-1518172429688-2f1c1f8e3c3e",
    photographer: "Joshua Sortino",
    photographerUrl: "https://unsplash.com/@sortino",
    searchQuery: "purple light healing glow"
  },

  // Week 5: Cognitive Defusion
  5: {
    week: 5,
    title: "Cognitive Defusion",
    unsplashUrl: "https://images.unsplash.com/photo-1536514072410-5019a3c69182",
    photographer: "Alberto Restifo",
    photographerUrl: "https://unsplash.com/@albertorestifo",
    searchQuery: "clouds sky light ethereal"
  },

  // Week 6: Social Support
  6: {
    week: 6,
    title: "Social Support",
    unsplashUrl: "https://images.unsplash.com/photo-1661338148419-dfabf6055238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMHRocmVhZHMlMjBjb25uZWN0aW9ufGVufDF8fHx8MTc2MTI5MTEyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    photographer: "Unsplash",
    photographerUrl: "https://unsplash.com/",
    searchQuery: "light threads connection"
  },

  // Week 7: Relapse Prevention
  7: {
    week: 7,
    title: "Relapse Prevention",
    unsplashUrl: "https://images.unsplash.com/photo-1721953039514-63dd6e523e3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMHBhdGglMjBmb3Jlc3QlMjBjYWxtfGVufDF8fHx8MTc2MTI5MTEyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    photographer: "Unsplash",
    photographerUrl: "https://unsplash.com/",
    searchQuery: "light path forest calm"
  },

  // Week 8: Grief & Loss
  8: {
    week: 8,
    title: "Grief & Loss",
    unsplashUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
    photographer: "Kristopher Roller",
    photographerUrl: "https://unsplash.com/@krisroller",
    searchQuery: "water gentle light soft"
  },

  // Week 9: Identity Integration
  9: {
    week: 9,
    title: "Identity Integration",
    unsplashUrl: "https://images.unsplash.com/photo-1726350170797-736288906423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwZmFicmljJTIwcHVycGxlJTIwZW1lcmdlbmNlfGVufDF8fHx8MTc2MTI5MTEyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    photographer: "Unsplash",
    photographerUrl: "https://unsplash.com/",
    searchQuery: "silk fabric purple emergence"
  },

  // Week 10: Future Self
  10: {
    week: 10,
    title: "Future Self",
    unsplashUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    photographer: "v2osk",
    photographerUrl: "https://unsplash.com/@v2osk",
    searchQuery: "horizon dawn light"
  },

  // Week 11: Decision Mastery
  11: {
    week: 11,
    title: "Decision Mastery",
    unsplashUrl: "https://images.unsplash.com/photo-1620656854929-5200d5d81889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwcHJpc20lMjBsaWdodHxlbnwxfHx8fDE3NjEyMDUxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    photographer: "Unsplash",
    photographerUrl: "https://unsplash.com/",
    searchQuery: "crystal prism light clarity"
  },

  // Week 12: Living Recovery
  12: {
    week: 12,
    title: "Living Recovery",
    unsplashUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    photographer: "Paul Earle",
    photographerUrl: "https://unsplash.com/@paulfaithfulearlephoto",
    searchQuery: "nature light vitality bloom"
  }
};

/**
 * Get image for a specific Journey week
 */
export function getJourneySceneImage(weekNumber: number): JourneySceneImage | null {
  return JOURNEY_SCENE_IMAGES[weekNumber] || null;
}

/**
 * Get all scene images (for preloading/caching)
 */
export function getAllJourneySceneImages(): JourneySceneImage[] {
  return Object.values(JOURNEY_SCENE_IMAGES);
}

/**
 * Helper to get scene image URL directly
 */
export function getJourneySceneImageUrl(weekNumber: number): string | null {
  const scene = getJourneySceneImage(weekNumber);
  return scene?.unsplashUrl || null;
}

/**
 * Fallback gradient if image fails to load
 * Matches Journey's purple brand aesthetic
 */
export const JOURNEY_FALLBACK_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
