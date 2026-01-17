/**
 * Intelligent Background Component
 * 
 * Premium replacement for Trianglify
 * Uses Pixabay photography + frosted glass overlays
 */

import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  selectContextualBackground,
  generateGradientBackground,
  getBackgroundCacheKey,
  cacheBackground,
  getCachedBackground,
  type BackgroundThemeKey,
  BACKGROUND_THEMES,
  getRandomThemeImage,
  generateImagePalette,
} from '../utils/intelligentBackgrounds';

interface IntelligentBackgroundProps {
  /** Automatic context-aware theme selection */
  context?: 'dashboard' | 'journey' | 'navicues' | 'wellness' | 'toolkit' | 'navigate' | 'momentum' | 'state';
  /** Manual theme override */
  theme?: BackgroundThemeKey;
  /** Use gradient instead of photo */
  mode?: 'photo' | 'gradient';
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Children to render on top */
  children?: React.ReactNode;
  /** Optional callback with generated palette */
  onPaletteGenerated?: (palette: string[]) => void;
}

export function IntelligentBackground({
  context,
  theme,
  mode = 'photo',
  overlayOpacity = 0.85,
  children,
  onPaletteGenerated,
}: IntelligentBackgroundProps) {
  const [photo, setPhoto] = useState<any>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [gradientCSS, setGradientCSS] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBackground();
  }, [context, theme, mode]);

  const loadBackground = async () => {
    setIsLoading(true);
    console.log(`🎨 [IntelligentBackground] Loading background:`, { context, theme, mode });

    try {
      if (mode === 'gradient') {
        const css = await generateGradientBackground();
        setGradientCSS(css);
        setIsLoading(false);
        console.log(`✅ [IntelligentBackground] Gradient loaded`);
        return;
      }

      // Photo mode
      let result: { photo: any; palette: string[] } | null = null;

      if (theme) {
        // Manual theme selection
        const cacheKey = getBackgroundCacheKey(theme);
        const cached = getCachedBackground(cacheKey);

        if (cached) {
          console.log(`💾 [IntelligentBackground] Using cached background for theme: ${theme}`);
          result = cached;
        } else {
          console.log(`🔍 [IntelligentBackground] Fetching new background for theme: ${theme}`);
          const themePhoto = await getRandomThemeImage(theme);
          if (themePhoto) {
            console.log(`✅ [IntelligentBackground] Photo fetched successfully:`, {
              photographer: themePhoto.photographer,
              hasLarge2x: !!themePhoto.src?.large2x
            });
            const { colors } = await generateImagePalette(themePhoto);
            result = { photo: themePhoto, palette: colors };
            cacheBackground(cacheKey, themePhoto, colors);
          } else {
            console.warn(`⚠️ [IntelligentBackground] No photo returned for theme: ${theme}`);
          }
        }
      } else if (context) {
        // Context-aware selection
        console.log(`🔍 [IntelligentBackground] Fetching background for context: ${context}`);
        result = await selectContextualBackground(context);
      }

      if (result) {
        console.log(`🎉 [IntelligentBackground] Background loaded successfully!`);
        setPhoto(result.photo);
        setPalette(result.palette);
        if (onPaletteGenerated) {
          onPaletteGenerated(result.palette);
        }
      } else {
        console.warn(`⚠️ [IntelligentBackground] No background result - will show fallback`);
      }
    } catch (error) {
      console.error('❌ [IntelligentBackground] Error loading background:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'gradient') {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: gradientCSS }}
        />
        {children}
      </div>
    );
  }

  // Enhanced null checking for photo structure
  if (isLoading || !photo || !photo.src || !photo.src.large2x) {
    // Show why we're using fallback
    if (!isLoading) {
      console.log(`🔄 [IntelligentBackground] Using fallback - photo state:`, {
        hasPhoto: !!photo,
        hasSrc: !!photo?.src,
        hasLarge2x: !!photo?.src?.large2x
      });
    }
    
    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-white to-gray-50">
        {children}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Photo layer */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={photo.src.large2x}
          alt={photo.alt || 'Background'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Frosted glass overlay for readability */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: `rgba(255, 255, 255, ${overlayOpacity})`,
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Photo credit (bottom-right corner) */}
      {photo.photographer && (
        <a
          href={photo.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 z-20 text-xs text-gray-500 hover:text-gray-700 transition-colors bg-white/70 backdrop-blur-sm px-2 py-1 rounded"
        >
          Photo by {photo.photographer}
        </a>
      )}
    </div>
  );
}

/**
 * Simpler version for headers only
 */
export function IntelligentHeader({
  theme,
  height = '400px',
  children,
}: {
  theme: BackgroundThemeKey;
  height?: string;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ height }} className="relative overflow-hidden">
      <IntelligentBackground theme={theme} overlayOpacity={0.75}>
        {children}
      </IntelligentBackground>
    </div>
  );
}

/**
 * Theme selector component for demos/admin
 */
export function BackgroundThemeSelector({
  currentTheme,
  onThemeChange,
}: {
  currentTheme: BackgroundThemeKey;
  onThemeChange: (theme: BackgroundThemeKey) => void;
}) {
  const themes = Object.keys(BACKGROUND_THEMES) as BackgroundThemeKey[];
  
  // Check if theme uses Pixabay
  const isPixabayTheme = (theme: BackgroundThemeKey) => {
    return BACKGROUND_THEMES[theme]?.source === 'pixabay';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((theme) => {
        const usePixabay = isPixabayTheme(theme);
        return (
          <button
            key={theme}
            onClick={() => onThemeChange(theme)}
            className={`px-4 py-2 rounded-lg transition-all relative ${
              currentTheme === theme
                ? 'bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-[#5739FB]/30'
            }`}
          >
            {theme}
            {usePixabay && (
              <span className={`ml-1.5 text-xs ${
                currentTheme === theme ? 'text-white/70' : 'text-blue-500'
              }`}>
                ✦
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
