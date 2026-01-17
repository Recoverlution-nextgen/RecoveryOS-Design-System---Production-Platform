/**
 * Pixabay API Integration
 * 
 * Free high-quality stock photography and illustrations
 * API Docs: https://pixabay.com/api/docs/
 * 
 * Key advantages over Pexels:
 * - Free API with generous limits
 * - No API key required for basic usage (optional for higher limits)
 * - Excellent abstract/ethereal imagery
 * - Perfect for State/Inner Compass themes
 * 
 * Architecture: Frontend calls server proxy → Server calls Pixabay with API key
 */

import { projectId, publicAnonKey } from './supabase/info';

export interface PixabayImage {
  id: number;
  pageURL: string;
  type: 'photo' | 'illustration' | 'vector';
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
  // SVG support (only available for illustrations/vectors)
  vectorURL?: string; // SVG download URL (if available)
}

export interface PixabaySearchResult {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}

/**
 * Search for images on Pixabay
 * 
 * @param query - Search query (e.g., "blue smoke orchid", "abstract fluid")
 * @param perPage - Number of results (default: 20, max: 200)
 * @param page - Page number for pagination
 * @param imageType - Filter by type ('all', 'photo', 'illustration', 'vector')
 * @param orientation - Filter by orientation ('all', 'horizontal', 'vertical')
 * @param colors - Filter by color ('grayscale', 'transparent', 'red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'lilac', 'pink', 'white', 'gray', 'black', 'brown')
 * @param minWidth - Minimum image width in pixels
 * @param minHeight - Minimum image height in pixels
 */
export async function searchPixabay(
  query: string,
  perPage: number = 20,
  page: number = 1,
  imageType: 'all' | 'photo' | 'illustration' | 'vector' = 'photo',
  orientation: 'all' | 'horizontal' | 'vertical' = 'horizontal',
  colors?: string,
  minWidth?: number,
  minHeight?: number
): Promise<PixabaySearchResult> {
  try {
    // Call server proxy for Pixabay API (server has the API key)
    const params = new URLSearchParams({
      q: query,
      per_page: perPage.toString(),
      page: page.toString(),
      image_type: imageType,
      orientation: orientation,
    });

    if (colors) params.append('colors', colors);
    if (minWidth) params.append('min_width', minWidth.toString());
    if (minHeight) params.append('min_height', minHeight.toString());

    // Call server proxy (server has the PIXABAY_API_KEY)
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/pixabay/search?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );

    if (!response.ok) {
      // Silently fail - return empty results
      // App should work without Pixabay (will use gradient fallbacks)
      return {
        total: 0,
        totalHits: 0,
        hits: [],
      };
    }

    const data: PixabaySearchResult = await response.json();
    console.log(`📊 Pixabay response for "${query}":`, {
      total: data.total,
      totalHits: data.totalHits,
      returned: data.hits?.length || 0
    });
    return data;
  } catch (error) {
    // Silently handle API errors - return empty result
    // (API key might be invalid/expired, rate limited, or network issue)
    // Don't log in production to avoid console noise
    if (error instanceof TypeError && error.message.includes('fetch')) {
      // Network/CORS error - likely in development/preview
      // Silent fail - app should work without Pixabay
    } else {
      console.warn('Pixabay API error:', error);
    }
    return {
      total: 0,
      totalHits: 0,
      hits: [],
    };
  }
}

/**
 * Search optimized for Recoverlution use cases
 * Returns high-quality images suitable for card backgrounds
 */
export async function searchPixabayForBackground(
  theme: 'ethereal' | 'fluid' | 'calm' | 'state' | 'abstract' | 'minimal' | 'nature' | string,
  perPage: number = 20
): Promise<PixabayImage[]> {
  // Define search queries optimized for each theme
  const themeQueries: Record<string, { query: string; colors?: string }> = {
    // Perfect for State/Inner Compass
    ethereal: {
      query: 'smoke orchid abstract fluid',
      colors: 'blue',
    },
    fluid: {
      query: 'liquid abstract flow',
      colors: 'blue',
    },
    state: {
      query: 'blue smoke white ethereal',
      colors: 'blue',
    },
    
    // Other themes
    calm: {
      query: 'minimal peaceful abstract',
    },
    abstract: {
      query: 'smooth gradient minimal',
      colors: 'lilac',
    },
    minimal: {
      query: 'clean white minimal',
    },
    nature: {
      query: 'peaceful nature calm',
    },
    
    // Purple theme
    'purple gradient abstract': {
      query: 'purple abstract gradient',
      colors: 'lilac',
    },
  };

  // If theme is a predefined key, use it; otherwise treat as direct query
  const config = themeQueries[theme] || { query: theme, colors: 'lilac' };
  
  console.log(`🔍 [searchPixabayForBackground] Using config:`, config);
  
  const result = await searchPixabay(
    config.query,
    perPage,
    1,
    'photo',
    'horizontal',
    config.colors,
    1920, // Minimum width for high quality
    1080  // Minimum height for high quality
  );
  
  return result.hits;
}

/**
 * Get a single random image from a theme
 */
export async function getRandomPixabayImage(
  theme: 'ethereal' | 'fluid' | 'calm' | 'state' | 'abstract' | 'minimal' | 'nature'
): Promise<PixabayImage | null> {
  const images = await searchPixabayForBackground(theme, 20);
  
  if (images.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

/**
 * Helper to get the best image URL for a specific use case
 */
export function getPixabayImageUrl(
  image: PixabayImage,
  size: 'preview' | 'webformat' | 'large' | 'svg' = 'large'
): string {
  // SVG only available for illustrations/vectors
  if (size === 'svg' && image.vectorURL) {
    return image.vectorURL;
  }
  
  switch (size) {
    case 'preview':
      return image.previewURL;
    case 'webformat':
      return image.webformatURL;
    case 'large':
      return image.largeImageURL;
    default:
      return image.largeImageURL;
  }
}

/**
 * Check if image can be downloaded as SVG
 */
export function canDownloadSVG(image: PixabayImage): boolean {
  return (image.type === 'illustration' || image.type === 'vector') && !!image.vectorURL;
}

/**
 * Convert Pixabay image to a format compatible with our background system
 */
export function pixabayToBackgroundFormat(image: PixabayImage) {
  return {
    id: image.id,
    url: image.pageURL,
    photographer: image.user,
    photographer_url: `https://pixabay.com/users/${image.user}-${image.user_id}/`,
    src: {
      original: image.largeImageURL,
      large2x: image.largeImageURL,
      large: image.largeImageURL,
      medium: image.webformatURL,
      small: image.previewURL,
      portrait: image.webformatURL,
      landscape: image.webformatURL,
      tiny: image.previewURL,
    },
    alt: image.tags,
  };
}
