/**
 * Journey Imagery System - Visual DNA with Pixabay Integration
 * 
 * Philosophy: Pixabay API with strict "Visual DNA" rules ensures variety
 * within brand coherence. Curated images (83/84/85) serve as premium fallback.
 * 
 * Visual DNA Requirements:
 * ✅ Purple → Pink → White gradient palette
 * ✅ Macro photography with bokeh depth
 * ✅ Organic spherical/fluid forms (orbs, bubbles, droplets)
 * ✅ Light, aspirational tone (no darkness)
 * ✅ Professional composition
 * 
 * ❌ NO geometric/angular shapes
 * ❌ NO people, faces, body parts
 * ❌ NO nature scenes (mountains, forests, oceans)
 * ❌ NO text, graphics, or illustrations
 * ❌ NO dark/heavy backgrounds
 */

import { searchPixabay, type PixabayImage } from './pixabayAPI';

// ============================================================================
// IMMEDIATE CACHE CLEANING - Runs on module load (before any components render)
// ============================================================================

// CRITICAL: Clear invalid Pixabay download URLs immediately
// This runs synchronously when the module loads, before any components try to read cache
try {
  const cached = localStorage.getItem('journey_imagery_cache');
  const therapeuticSearchVersion = localStorage.getItem('journey_therapeutic_search_v1');
  
  // One-time migration to therapeutic search (only runs once)
  if (cached && !therapeuticSearchVersion) {
    localStorage.removeItem('journey_imagery_cache');
    localStorage.setItem('journey_therapeutic_search_v1', 'true');
    console.log('🗑️ [INIT] CLEARED Journey cache - enabling THERAPEUTIC search');
    console.log('✅ [INIT] Searches now add "meditation" to prevent literal sports imagery');
  }
  
  // Check for invalid download URLs (ongoing safety check)
  if (cached) {
    const cache = JSON.parse(cached);
    
    const hasDownloadUrls = cache.some((entry: any) => 
      entry.imageUrl && entry.imageUrl.includes('pixabay.com/get/')
    );
    
    if (hasDownloadUrls) {
      localStorage.removeItem('journey_imagery_cache');
      console.log('🗑️ [INIT] CLEARED Journey cache - found invalid Pixabay download URLs');
      console.log('✅ [INIT] Fresh images will load with direct webformatURLs');
    }
  }
} catch (error) {
  // If anything goes wrong, nuke the cache as safety measure
  localStorage.removeItem('journey_imagery_cache');
  console.log('🗑️ [INIT] Cleared Journey cache (error during check)');
}

// ============================================================================
// GRADIENT FALLBACK - Always Available, Never Fails
// ============================================================================

// CSS gradient that matches brand colors - used as immediate fallback
// This ensures Journey scenes ALWAYS have a beautiful background even if images fail
export const JOURNEY_GRADIENT_FALLBACK = "linear-gradient(135deg, #3E2BB8 0%, #5739FB 50%, #7C67FF 100%)";

// For components that need a URL (not a gradient), we return empty string
// and let the component handle gradient via CSS
export const JOURNEY_HERO_PRIMARY = "";

// ============================================================================
// VISUAL DNA SEARCH PARAMETERS
// ============================================================================

const JOURNEY_VISUAL_DNA_QUERIES = [
  "bokeh purple soft spheres",
  "abstract purple pink bubbles",
  "glass orbs purple gradient",
  "soft focus purple spheres",
  "purple pink fluid abstract",
  "bokeh lights purple glow",
  "abstract purple orbs soft",
  "purple gradient smooth spheres",
];

const VISUAL_DNA_SEARCH_PARAMS = {
  colors: "lilac", // Pixabay only accepts single color: 'grayscale', 'transparent', 'red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'lilac', 'pink', 'white', 'gray', 'black', 'brown'
  orientation: "horizontal" as const,
  minWidth: 1920,
  minHeight: 1080,
  imageType: "photo" as const,
};

// Stricter params for dashboard card (visible small, needs high quality)
const DASHBOARD_CARD_SEARCH_PARAMS = {
  ...VISUAL_DNA_SEARCH_PARAMS,
  minWidth: 2400, // Higher res for crop flexibility
  minHeight: 1600,
};

// ============================================================================
// CACHING SYSTEM
// ============================================================================

interface CachedJourneyImage {
  weekNumber: number;
  imageUrl: string;
  timestamp: number;
  source: 'pixabay' | 'curated';
}

const CACHE_KEY = 'journey_imagery_cache';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

function getCachedImage(weekNumber: number): string | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cache: CachedJourneyImage[] = JSON.parse(cached);
    const weekCache = cache.find(c => c.weekNumber === weekNumber);

    if (!weekCache) return null;

    // Check if cache is still valid
    const isExpired = Date.now() - weekCache.timestamp > CACHE_DURATION;
    if (isExpired) {
      // Clean up expired cache
      const freshCache = cache.filter(c => Date.now() - c.timestamp <= CACHE_DURATION);
      localStorage.setItem(CACHE_KEY, JSON.stringify(freshCache));
      return null;
    }

    // CRITICAL FIX: Validate that cached URL is usable
    // In Figma Make preview, figma:asset imports become blob: URLs
    // If cache contains literal "figma:asset/..." string, it's invalid
    const imageUrl = weekCache.imageUrl;
    
    if (typeof imageUrl !== 'string') {
      console.warn('⚠️ Cached image is not a string, clearing cache for week', weekNumber);
      return null;
    }

    // Check if it's a figma:asset literal (invalid in browser)
    if (imageUrl.startsWith('figma:asset/')) {
      console.warn('⚠️ Cached image contains invalid figma:asset literal, clearing cache for week', weekNumber);
      // Remove this invalid cache entry
      const freshCache = cache.filter(c => c.weekNumber !== weekNumber);
      localStorage.setItem(CACHE_KEY, JSON.stringify(freshCache));
      return null;
    }

    // Valid cache (blob: URL or https: URL)
    return imageUrl;
  } catch (error) {
    console.warn('Error reading Journey imagery cache:', error);
    return null;
  }
}

function setCachedImage(weekNumber: number, imageUrl: string, source: 'pixabay' | 'curated') {
  try {
    // SAFETY CHECK: Never cache invalid URLs
    if (!imageUrl || typeof imageUrl !== 'string') {
      console.warn('⚠️ Attempted to cache invalid image URL:', imageUrl);
      return;
    }

    // SAFETY CHECK: Never cache figma:asset literal strings (they don't work in browser)
    if (imageUrl.startsWith('figma:asset/')) {
      console.error('❌ Cannot cache figma:asset literal - must be blob: or https: URL');
      return;
    }

    const cached = localStorage.getItem(CACHE_KEY);
    const cache: CachedJourneyImage[] = cached ? JSON.parse(cached) : [];

    // Remove existing cache for this week
    const filteredCache = cache.filter(c => c.weekNumber !== weekNumber);

    // Add new cache entry
    filteredCache.push({
      weekNumber,
      imageUrl,
      timestamp: Date.now(),
      source,
    });

    localStorage.setItem(CACHE_KEY, JSON.stringify(filteredCache));
    console.log(`✅ Cached ${source} image for Week ${weekNumber}`);
  } catch (error) {
    console.warn('Error writing Journey imagery cache:', error);
  }
}

// ============================================================================
// QUALITY SCORING
// ============================================================================

/**
 * Score Pixabay image based on Visual DNA compliance
 * Returns 0-100 score (higher is better)
 */
function scorePixabayImage(image: PixabayImage): number {
  let score = 50; // Base score

  // Bonus for high engagement
  const engagementRatio = (image.likes + image.downloads) / Math.max(image.views, 1);
  if (engagementRatio > 0.1) score += 20;
  else if (engagementRatio > 0.05) score += 10;

  // Bonus for high resolution
  if (image.imageWidth >= 3840 && image.imageHeight >= 2160) score += 15; // 4K+
  else if (image.imageWidth >= 2560 && image.imageHeight >= 1440) score += 10; // 2K+

  // Check tags for Visual DNA keywords
  const tags = image.tags.toLowerCase();
  const goodKeywords = ['bokeh', 'macro', 'abstract', 'gradient', 'sphere', 'orb', 'bubble', 'droplet', 'fluid', 'glow', 'soft', 'meditation', 'mindfulness', 'zen', 'peaceful', 'calm', 'serene', 'tranquil'];
  const badKeywords = [
    // SPORTS & ACTION (literal activity - not therapeutic)
    'sport', 'sports', 'surfing', 'surfer', 'surf', 'motorboat', 'boat', 'motorcycle', 'bike', 'skateboard', 'ski', 'snowboard', 'exercise', 'gym', 'running', 'athlete', 'competition', 'race', 'game', 'games', 'play', 'action',
    // PEOPLE & FACES (violates no-people rule)
    'person', 'people', 'face', 'man', 'woman', 'child', 'boy', 'girl', 'human', 'body', 'hand', 'foot',
    // Nature/landscapes (too literal)
    'landscape', 'mountain', 'forest', 'tree', 'leaf',
    // Geometric/angular patterns (violates organic rule)
    'geometric', 'web', 'spider', 'pattern', 'grid', 'hexagon', 'triangle', 'square', 'line', 'structure',
    // Dark/heavy imagery (violates light/aspirational rule)
    'dark', 'night', 'shadow', 'black', 'storm'
  ];

  const hasGoodKeywords = goodKeywords.some(keyword => tags.includes(keyword));
  const hasBadKeywords = badKeywords.some(keyword => tags.includes(keyword));

  if (hasGoodKeywords) score += 15;
  if (hasBadKeywords) score -= 50; // Strong penalty for sports/action/people

  // Check for purple/pink color in tags
  if (tags.includes('purple') || tags.includes('pink') || tags.includes('violet')) score += 10;

  return Math.max(0, Math.min(100, score));
}

// ============================================================================
// PIXABAY SEARCH WITH VISUAL DNA
// ============================================================================

/**
 * Search Pixabay for images matching Journey Visual DNA
 * Returns best match or null if none meet quality threshold
 * 
 * @param weekNumber - Week number for fallback query selection
 * @param forDashboard - Whether this is for dashboard (stricter requirements)
 * @param weekTitle - Optional week title to make search contextually relevant (e.g. "Foundations of Presence")
 * @param pillarName - Optional pillar name to add thematic context (e.g. "Emotional Regulation")
 */
async function searchPixabayForJourney(
  weekNumber: number,
  forDashboard: boolean = false,
  weekTitle?: string,
  pillarName?: string
): Promise<string | null> {
  try {
    console.log(`\n🎯 === PIXABAY SEARCH for Week ${weekNumber} ===`);
    console.log(`   Title: "${weekTitle}", Pillar: "${pillarName}"`);
    
    // PROGRESSIVE PARAMETER RELAXATION
    // Start strict, relax if no results
    const paramSets = [
      { minWidth: 1920, minHeight: 1080, label: 'Full HD' },
      { minWidth: 1280, minHeight: 720, label: 'HD' },
      { minWidth: undefined, minHeight: undefined, label: 'Any size' },
    ];
    
    const baseParams = forDashboard ? DASHBOARD_CARD_SEARCH_PARAMS : VISUAL_DNA_SEARCH_PARAMS;
    
    // CASCADING FALLBACK STRATEGY
    // Try progressively simpler queries AND parameters
    
    const stopWords = ['of', 'the', 'and', 'in', 'to', 'a', 'an', 'for', 'with', 'from'];
    
    // Strategy 1: CONTEXTUAL FIRST (title words ONLY - no visual DNA yet)
    // This ensures each week gets unique imagery based on its theme
    if (weekTitle) {
      const titleWords = weekTitle
        .toLowerCase()
        .split(' ')
        .filter(word => !stopWords.includes(word) && word.length > 3)
        .slice(0, 2); // Take max 2 meaningful words
      
      if (titleWords.length > 0) {
        // Strategy 1A: Add THERAPEUTIC context to prevent literal sports imagery
        // e.g., "riding wave" → "riding wave meditation" (not motorboats/surfing)
        const therapeuticQuery = [...titleWords, 'meditation'].join(' ');
        
        console.log(`🔍 [Strategy 1A] THERAPEUTIC CONTEXT: "${therapeuticQuery}"`);
        
        for (const params of paramSets) {
          const result = await searchPixabay(
            therapeuticQuery,
            20,
            1,
            baseParams.imageType,
            baseParams.orientation,
            undefined,
            params.minWidth,
            params.minHeight
          );
          
          if (result.hits && result.hits.length > 0) {
            console.log(`✅ Found ${result.hits.length} contextual results`);
            
            const scoredImages = result.hits.map(image => ({
              image,
              score: scorePixabayImage(image),
            }));
            
            scoredImages.sort((a, b) => b.score - a.score);
            
            console.log('🎯 Top 3 contextual:', scoredImages.slice(0, 3).map(s => ({
              tags: s.image.tags.substring(0, 50),
              score: s.score,
            })));
            
            const bestMatch = scoredImages[0];
            console.log(`📊 Best therapeutic score: ${bestMatch.score} (threshold: 60)`);
            // Therapeutic context should score 60+ (rejects sports/action)
            if (bestMatch.score >= 60) {
              console.log(`✅ Selected THERAPEUTIC image (score: ${bestMatch.score})`);
              return bestMatch.image.webformatURL;
            }
          }
        }
        
        // Strategy 1B: Add abstract/soft (but not purple yet)
        console.log(`🔍 [Strategy 1B] CONTEXT + ABSTRACT: "${titleWords.join(' ')} abstract soft"`);
        const abstractQuery = [...titleWords, 'abstract', 'soft'].join(' ');
        
        for (const params of paramSets) {
          const result = await searchPixabay(
            abstractQuery,
            20,
            1,
            baseParams.imageType,
            baseParams.orientation,
            undefined,
            params.minWidth,
            params.minHeight
          );
          
          if (result.hits && result.hits.length > 0) {
            console.log(`✅ Found ${result.hits.length} abstract results`);
            
            const scoredImages = result.hits.map(image => ({
              image,
              score: scorePixabayImage(image),
            }));
            
            scoredImages.sort((a, b) => b.score - a.score);
            
            const bestMatch = scoredImages[0];
            console.log(`📊 Best abstract score: ${bestMatch.score} (threshold: 60)`);
            if (bestMatch.score >= 60) {
              console.log(`✅ Selected ABSTRACT image (score: ${bestMatch.score})`);
              return bestMatch.image.webformatURL;
            }
          }
        }
      }
    }
    
    // Strategy 2: GENERIC VISUAL DNA (deterministic based on week number)
    const queryIndex = weekNumber % JOURNEY_VISUAL_DNA_QUERIES.length;
    const fallbackQuery = JOURNEY_VISUAL_DNA_QUERIES[queryIndex];
    
    for (const params of paramSets) {
      console.log(`🔍 [Strategy 2.${paramSets.indexOf(params) + 1}] "${fallbackQuery}" (${params.label})`);
      
      // REMOVE colors parameter
      const fallbackResult = await searchPixabay(
        fallbackQuery,
        20,
        1,
        baseParams.imageType,
        baseParams.orientation,
        undefined, // NO colors parameter
        params.minWidth,
        params.minHeight
      );

      if (fallbackResult.hits && fallbackResult.hits.length > 0) {
        console.log(`✅ Found ${fallbackResult.hits.length} results`);
        
        const fallbackScored = fallbackResult.hits.map(image => ({
          image,
          score: scorePixabayImage(image),
        }));

        fallbackScored.sort((a, b) => b.score - a.score);

        console.log('🎯 Top 3:', fallbackScored.slice(0, 3).map(s => ({
          tags: s.image.tags.substring(0, 50),
          score: s.score,
        })));

        const fallbackBest = fallbackScored[0];
        console.log(`📊 Best score: ${fallbackBest.score} (threshold: 60)`);
        if (fallbackBest.score >= 60) {
          console.log(`✅ Selected image (score: ${fallbackBest.score}, ${params.label})`);
          return fallbackBest.image.webformatURL;
        } else {
          console.log(`⚠️ Score too low (${fallbackBest.score}), trying next param set...`);
        }
      } else {
        console.log(`⚠️ No results, trying next param set...`);
      }
    }
    
    // If we get here, nothing worked
    console.log('❌ No Pixabay results found after all attempts');
    return null;

  } catch (error) {
    // Silently handle - Pixabay may not be available in preview/development
    // App will fallback to gradients
    return null;
  }
}

// ============================================================================
// SMART IMAGE SELECTION
// ============================================================================

/**
 * Get Journey image for a specific week
 * Uses Pixabay with Visual DNA rules, falls back to curated images
 * 
 * @param weekNumber - Week number (1-52+)
 * @param forDashboard - If true, uses stricter quality requirements
 * @param weekTitle - Optional week title for contextually relevant imagery (e.g. "Foundations of Presence")
 * @param pillarName - Optional pillar name for thematic relevance (e.g. "Emotional Regulation")
 * @returns Image URL (Pixabay or curated fallback)
 */
export async function getJourneyWeekImage(
  weekNumber: number,
  forDashboard: boolean = false,
  weekTitle?: string,
  pillarName?: string
): Promise<string> {
  // Check cache first
  const cached = getCachedImage(weekNumber);
  if (cached) {
    console.log(`✅ Using cached Journey image for Week ${weekNumber}`);
    return cached;
  }

  // Try Pixabay search with PILLAR + TITLE contextual search
  const pixabayImage = await searchPixabayForJourney(weekNumber, forDashboard, weekTitle, pillarName);

  if (pixabayImage) {
    // Cache the Pixabay result
    setCachedImage(weekNumber, pixabayImage, 'pixabay');
    return pixabayImage;
  }

  // Fallback: Return empty string to trigger CSS gradient fallback
  // The component will show JOURNEY_GRADIENT_FALLBACK via CSS
  console.log(`⚠️ No Pixabay image found for Week ${weekNumber}, using gradient fallback`);
  return "";
}

/**
 * Get Journey card image for dashboard
 * 
 * Logic:
 * - If patient has active week → Show week's Pixabay image (dynamic preview)
 * - If Pixabay hasn't loaded → Show Image 85 (quality guarantee)
 * - If patient hasn't started → Show Image 85 (portal invitation)
 * 
 * @param patientId - Patient ID (null if not logged in)
 * @param currentWeek - Patient's current week (null if not started)
 * @param weekTitle - Optional week title for contextually relevant imagery
 * @returns Image URL for dashboard card
 */
export async function getJourneyCardImage(
  patientId: string | null,
  currentWeek: number | null,
  weekTitle?: string
): Promise<string> {
  // New patient or no active week → Return empty for gradient fallback
  if (!patientId || !currentWeek) {
    console.log('📸 Dashboard Card: Using gradient fallback (no active week)');
    return "";
  }

  // Patient has active week → Try to show dynamic preview
  console.log(`📸 Dashboard Card: Fetching dynamic preview for Week ${currentWeek}${weekTitle ? ` "${weekTitle}"` : ''}`);

  try {
    const weekImage = await getJourneyWeekImage(currentWeek, true, weekTitle);
    return weekImage || ""; // Return empty string if no image found
  } catch (error) {
    console.warn('Error fetching Journey card image, using gradient fallback:', error);
    return "";
  }
}

/**
 * Preload Journey image for upcoming week
 * Call this when user completes a week to cache next week's image
 */
export function preloadNextWeekImage(nextWeekNumber: number) {
  // Fire and forget - cache in background
  getJourneyWeekImage(nextWeekNumber, false).catch(err => {
    console.warn('Failed to preload next week image:', err);
  });
}

/**
 * Get E-R-A stage specific image
 * Uses same base image with different gradient overlays (handled in components)
 * 
 * @param weekNumber - Week number
 * @param stage - E-R-A stage ('experience' | 'recognize' | 'align')
 * @param weekTitle - Optional week title for contextually relevant imagery
 * @returns Base image URL (overlays applied in component)
 */
export async function getERAStageImage(
  weekNumber: number,
  stage: 'experience' | 'recognize' | 'align',
  weekTitle?: string
): Promise<string> {
  // All stages use the same base image
  // Overlays create the visual progression (handled in JourneyWeekFlow)
  return getJourneyWeekImage(weekNumber, false, weekTitle);
}

/**
 * Clear Journey imagery cache (for testing/debugging)
 */
export function clearJourneyImageCache() {
  localStorage.removeItem(CACHE_KEY);
  console.log('🗑️ Journey imagery cache cleared');
}

/**
 * Debug helper: Inspect Journey imagery cache
 * Call from browser console: window.debugJourneyCache()
 */
export function debugJourneyCache() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
      console.log('📦 Journey imagery cache is empty');
      return;
    }

    const cache: CachedJourneyImage[] = JSON.parse(cached);
    console.log('📦 Journey imagery cache:', cache.length, 'entries');
    
    cache.forEach((entry, index) => {
      console.log(`\n[${index + 1}] Week ${entry.weekNumber}:`);
      console.log('  Source:', entry.source);
      console.log('  URL type:', typeof entry.imageUrl);
      console.log('  URL starts with:', entry.imageUrl.substring(0, 50) + '...');
      console.log('  Valid?:', 
        entry.imageUrl.startsWith('blob:') || 
        entry.imageUrl.startsWith('https:') ||
        entry.imageUrl.startsWith('http:') ||
        entry.imageUrl.startsWith('data:')
      );
      console.log('  Cached:', new Date(entry.timestamp).toLocaleString());
      console.log('  Expires:', new Date(entry.timestamp + CACHE_DURATION).toLocaleString());
    });

    // Check for invalid entries
    const invalidEntries = cache.filter(e => 
      !e.imageUrl || 
      typeof e.imageUrl !== 'string' || 
      e.imageUrl.startsWith('figma:asset/')
    );

    if (invalidEntries.length > 0) {
      console.warn('\n⚠️ Found', invalidEntries.length, 'invalid cache entries:');
      invalidEntries.forEach(e => {
        console.warn('  Week', e.weekNumber, ':', e.imageUrl);
      });
      console.log('\n💡 Run clearJourneyImageCache() to clean up');
    } else {
      console.log('\n✅ All cache entries are valid!');
    }
  } catch (error) {
    console.error('Error inspecting Journey cache:', error);
  }
}

// Expose debug function to window for console access
if (typeof window !== 'undefined') {
  (window as any).debugJourneyCache = debugJourneyCache;
  (window as any).clearJourneyCache = clearJourneyImageCache;
}
