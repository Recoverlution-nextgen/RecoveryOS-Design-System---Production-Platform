/**
 * Intelligent Background System
 * 
 * Uses Pixabay API for high-quality, brand-harmonious backgrounds
 * 
 * Source:
 * - Pixabay: Free high-quality images, excellent for ethereal/abstract themes
 */

import { searchPixabayForBackground, pixabayToBackgroundFormat, type PixabayImage } from './pixabayAPI';

export interface BackgroundTheme {
  query: string;
  colorFilter?: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  source?: 'pexels' | 'pixabay'; // Which API to use
  pixabayTheme?: 'ethereal' | 'fluid' | 'calm' | 'state' | 'abstract' | 'minimal' | 'nature';
}

// Recoverlution-optimized search queries
export const BACKGROUND_THEMES = {
  // Core brand themes
  peaceful: {
    query: 'minimal abstract calm',
    colorFilter: 'violet',
    orientation: 'landscape' as const,
  },
  journey: {
    query: 'peaceful path nature',
    colorFilter: 'blue',
    orientation: 'landscape' as const,
  },
  wellness: {
    query: 'serene meditation',
    orientation: 'landscape' as const,
  },
  
  // Abstract/Minimal
  gradient: {
    query: 'smooth gradient minimal',
    colorFilter: 'violet',
    orientation: 'landscape' as const,
  },
  waves: {
    query: 'abstract waves calm',
    colorFilter: 'blue',
    orientation: 'landscape' as const,
  },
  light: {
    query: 'soft light minimal',
    orientation: 'landscape' as const,
  },
  
  // Nature-inspired
  forest: {
    query: 'peaceful forest mist',
    colorFilter: 'green',
    orientation: 'landscape' as const,
  },
  water: {
    query: 'calm water reflection',
    colorFilter: 'blue',
    orientation: 'landscape' as const,
  },
  sky: {
    query: 'peaceful sky clouds',
    colorFilter: 'blue',
    orientation: 'landscape' as const,
  },
  
  // Purple/Brand focused
  purple: {
    query: 'purple gradient abstract',
    colorFilter: 'violet',
    orientation: 'landscape' as const,
  },
  lavender: {
    query: 'lavender field minimal',
    colorFilter: 'violet',
    orientation: 'landscape' as const,
  },
  
  // Pixabay-exclusive themes (ethereal/abstract)
  ethereal: {
    query: 'ethereal abstract',
    orientation: 'landscape' as const,
    source: 'pixabay' as const,
    pixabayTheme: 'ethereal' as const,
  },
  fluid: {
    query: 'fluid abstract',
    orientation: 'landscape' as const,
    source: 'pixabay' as const,
    pixabayTheme: 'fluid' as const,
  },
  state: {
    query: 'state tracking',
    orientation: 'landscape' as const,
    source: 'pixabay' as const,
    pixabayTheme: 'state' as const,
  },
  navicues: {
    query: 'ink water flow',
    orientation: 'landscape' as const,
    source: 'pixabay' as const,
    pixabayTheme: 'fluid' as const,
  },
} as const;

export type BackgroundThemeKey = keyof typeof BACKGROUND_THEMES;

/**
 * Fetch a curated set of images for a theme (with proper format conversion)
 */
export async function fetchThemeImages(
  theme: BackgroundThemeKey,
  count: number = 10
): Promise<any[]> {
  const config = BACKGROUND_THEMES[theme];
  
  console.log(`🔍 [fetchThemeImages] Fetching ${count} images for theme: ${theme}`, config);
  
  try {
    // Use Pixabay for all themes
    const pixabayTheme = config.pixabayTheme || config.query;
    console.log(`📡 [fetchThemeImages] Calling Pixabay with theme: "${pixabayTheme}"`);
    
    const pixabayImages = await searchPixabayForBackground(pixabayTheme, count);
    
    console.log(`✅ [fetchThemeImages] Pixabay returned ${pixabayImages.length} images`);
    
    // Convert to background format
    const converted = pixabayImages.map(img => pixabayToBackgroundFormat(img));
    console.log(`🔄 [fetchThemeImages] Converted ${converted.length} images to background format`);
    
    return converted;
  } catch (error) {
    // Silently handle - Pixabay may not be available in preview/development
    console.warn('⚠️ [fetchThemeImages] Pixabay theme fetch error:', error);
    return [];
  }
}

/**
 * Get a single random image from a theme (properly formatted)
 */
export async function getRandomThemeImage(
  theme: BackgroundThemeKey
): Promise<any | null> {
  const images = await fetchThemeImages(theme, 15);
  
  if (images.length === 0) {
    console.warn(`⚠️ [getRandomThemeImage] No images available for theme: ${theme}`);
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];
  
  console.log(`🎲 [getRandomThemeImage] Selected image ${randomIndex + 1} of ${images.length} for theme: ${theme}`);
  
  return selectedImage;
}

/**
 * Generate a palette that harmonizes with the image
 * Uses brand-harmonious purple palette
 */
export async function generateImagePalette(
  photo: any
): Promise<{ colors: string[]; photo: any }> {
  // Use brand colors - no external API needed
  return {
    colors: ['#3E2BB8', '#5739FB', '#7C67FF', '#9D8FFF', '#C4B5FD'],
    photo,
  };
}

/**
 * Smart background selector - chooses best image based on content context
 */
export async function selectContextualBackground(
  context: 'dashboard' | 'journey' | 'navicues' | 'wellness' | 'toolkit' | 'navigate' | 'momentum' | 'state'
): Promise<{ photo: any; palette: string[] } | null> {
  // Map contexts to themes
  const themeMap: Record<typeof context, BackgroundThemeKey> = {
    dashboard: 'peaceful',
    journey: 'journey',
    navicues: 'navicues', // Pixabay ink water flow
    wellness: 'wellness',
    toolkit: 'light',
    navigate: 'waves',
    momentum: 'gradient',
    state: 'state', // Pixabay ethereal blue smoke
  };
  
  const theme = themeMap[context];
  const photo = await getRandomThemeImage(theme);
  
  if (!photo) return null;
  
  const { colors } = await generateImagePalette(photo);
  
  return {
    photo,
    palette: colors,
  };
}

/**
 * Generate CSS gradient background (modern alternative to images)
 * Uses brand palette for harmonious gradients
 */
export async function generateGradientBackground(): Promise<string> {
  // Use brand colors
  const [color1, color2, color3, color4, color5] = ['#3E2BB8', '#5739FB', '#7C67FF', '#9D8FFF', '#C4B5FD'];
  
  return `
    background: 
      radial-gradient(at 20% 30%, ${color1}15 0px, transparent 50%),
      radial-gradient(at 80% 20%, ${color2}20 0px, transparent 50%),
      radial-gradient(at 40% 70%, ${color3}10 0px, transparent 50%),
      radial-gradient(at 90% 80%, ${color4}15 0px, transparent 50%),
      radial-gradient(at 10% 80%, ${color5}10 0px, transparent 50%),
      linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%);
  `.trim();
}

/**
 * Cache key generator for backgrounds
 */
export function getBackgroundCacheKey(
  theme: BackgroundThemeKey,
  index: number = 0
): string {
  return `bg_${theme}_${index}_${new Date().toDateString()}`;
}

/**
 * Store/retrieve background from localStorage (avoid re-fetching)
 */
export function cacheBackground(
  key: string,
  photo: any,
  palette: string[]
): void {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ photo, palette, timestamp: Date.now() })
    );
  } catch (error) {
    console.warn('Failed to cache background:', error);
  }
}

export function getCachedBackground(
  key: string
): { photo: any; palette: string[] } | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const data = JSON.parse(cached);
    
    // Cache valid for 24 hours
    const age = Date.now() - data.timestamp;
    if (age > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(key);
      return null;
    }
    
    return { photo: data.photo, palette: data.palette };
  } catch (error) {
    console.warn('Failed to retrieve cached background:', error);
    return null;
  }
}
