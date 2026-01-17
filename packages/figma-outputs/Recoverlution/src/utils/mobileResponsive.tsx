/**
 * MOBILE RESPONSIVE UTILITIES
 * Universal mobile-first design system for all marketing pages
 * 
 * Created: November 4, 2025
 * Purpose: Fix critical mobile responsiveness issues across platform
 */

/**
 * MOBILE-FIRST TYPOGRAPHY SCALE
 * Uses clamp() for fluid, responsive sizing
 * Format: clamp(minMobile, fluidScale, maxDesktop)
 */
export const MOBILE_TYPE = {
  // Hero Typography (Homepage, Feature Pages)
  hero: {
    h1: 'clamp(2rem, 8vw, 6rem)',           // 32px → 96px
    h2: 'clamp(1.75rem, 7vw, 5rem)',        // 28px → 80px
    h3: 'clamp(1.5rem, 6vw, 3rem)',         // 24px → 48px
    eyebrow: 'clamp(0.6875rem, 2vw, 0.8125rem)', // 11px → 13px
  },
  
  // Section Typography (Body Sections)
  section: {
    h2: 'clamp(1.5rem, 6vw, 4rem)',         // 24px → 64px (Section headers)
    h3: 'clamp(1.25rem, 5vw, 2.5rem)',      // 20px → 40px (Card titles)
    h4: 'clamp(1.125rem, 4vw, 2rem)',       // 18px → 32px (Subsections)
    eyebrow: 'clamp(0.6875rem, 2vw, 0.8125rem)', // 11px → 13px
  },
  
  // Body Copy
  body: {
    lead: 'clamp(1rem, 3vw, 1.25rem)',      // 16px → 20px (Lead paragraphs)
    base: 'clamp(0.9375rem, 2.5vw, 1.0625rem)', // 15px → 17px (Standard text)
    small: 'clamp(0.8125rem, 2vw, 0.9375rem)',  // 13px → 15px (Small text)
  },
  
  // Labels & Micro Copy
  labels: {
    eyebrow: 'clamp(0.6875rem, 2vw, 0.8125rem)', // 11px → 13px (Badge eyebrows)
    caps: 'clamp(0.625rem, 1.8vw, 0.75rem)',     // 10px → 12px (Small caps)
    badge: 'clamp(0.5625rem, 1.5vw, 0.6875rem)', // 9px → 11px (Tiny badges)
    buzzTag: 'clamp(0.5rem, 1.5vw, 0.5625rem)',  // 8px → 9px (Buzz tags)
  }
};

/**
 * MOBILE-FIRST SPACING SCALE
 * Responsive padding, margins, gaps
 */
export const MOBILE_SPACING = {
  // Section Spacing (Full-width sections)
  section: {
    y: 'py-16 sm:py-20 md:py-24 lg:py-32 xl:py-48',     // 64px → 192px
    yCompact: 'py-12 sm:py-16 md:py-20 lg:py-24',       // 48px → 96px
    x: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',        // 16px → 64px
  },
  
  // Container Spacing (Content containers)
  container: {
    y: 'py-8 sm:py-10 md:py-12 lg:py-16',               // 32px → 64px
    yCompact: 'py-6 sm:py-8 md:py-10 lg:py-12',         // 24px → 48px
    x: 'px-4 sm:px-5 md:px-6 lg:px-8',                  // 16px → 32px
  },
  
  // Card Spacing (Glass cards, tiles)
  card: {
    compact: 'p-4 sm:p-5 md:p-5 lg:p-6',                // 16px → 24px
    standard: 'p-5 sm:p-6 md:p-6 lg:p-8',               // 20px → 32px
    spacious: 'p-6 sm:p-7 md:p-8 lg:p-10 xl:p-12',     // 24px → 48px
    hero: 'p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16',        // 24px → 64px
  },
  
  // Grid Gaps
  gap: {
    tight: 'gap-2 sm:gap-3 md:gap-3 lg:gap-4',          // 8px → 16px
    standard: 'gap-4 sm:gap-5 md:gap-6 lg:gap-8',       // 16px → 32px
    loose: 'gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12', // 24px → 48px
  }
};

/**
 * MOBILE-FIRST GRID LAYOUTS
 * Responsive grid patterns for all use cases
 */
export const MOBILE_GRIDS = {
  // Standard Grids
  twoCol: 'grid grid-cols-1 md:grid-cols-2',
  threeCol: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  fourCol: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  sixCol: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  
  // Feature Section Grid (40/60 split)
  feature: 'grid grid-cols-1 lg:grid-cols-12',
  
  // Asymmetric Grids
  asymmetric: {
    '40-60': {
      left: 'lg:col-span-5',   // 40% on desktop
      right: 'lg:col-span-7',  // 60% on desktop
    },
    '33-67': {
      left: 'lg:col-span-4',   // 33% on desktop
      right: 'lg:col-span-8',  // 67% on desktop
    },
    '50-50': {
      left: 'lg:col-span-6',   // 50% on desktop
      right: 'lg:col-span-6',  // 50% on desktop
    }
  }
};

/**
 * TOUCH TARGET STANDARDS
 * Ensure all interactive elements are finger-friendly
 */
export const TOUCH_TARGETS = {
  // Minimum touch sizes (Apple/Google standards)
  minimum: {
    width: '44px',
    height: '44px',
    padding: '12px',
  },
  
  // Comfortable touch sizes
  comfortable: {
    width: '48px',
    height: '48px',
    padding: '14px',
  },
  
  // Spacious touch sizes
  spacious: {
    width: '56px',
    height: '56px',
    padding: '16px',
  },
  
  // Tailwind classes for buttons
  button: {
    compact: 'min-h-[44px] min-w-[44px] px-4 py-2.5',
    standard: 'min-h-[48px] min-w-[48px] px-6 py-3',
    large: 'min-h-[56px] min-w-[56px] px-8 py-4',
  }
};

/**
 * MOBILE BREAKPOINT UTILITIES
 * For conditional rendering based on screen size
 */
export const MOBILE_BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  
  // Specific devices
  mobileS: '(max-width: 374px)',   // iPhone SE
  mobileM: '(max-width: 413px)',   // iPhone 12
  mobileL: '(max-width: 767px)',   // All mobile
  tabletS: '(min-width: 768px)',   // iPad
  tabletL: '(min-width: 1024px)',  // iPad Pro
};

/**
 * RESPONSIVE ASPECT RATIOS
 * For hero images, mockups, and assets
 */
export const MOBILE_ASPECT = {
  hero: {
    mobile: 'aspect-[4/3]',        // Portrait-friendly
    tablet: 'md:aspect-[16/10]',   // Landscape tablet
    desktop: 'lg:aspect-[21/9]',   // Cinematic desktop
  },
  
  mockup: {
    mobile: 'aspect-[3/4]',        // Portrait mockup
    tablet: 'md:aspect-[4/3]',     // Square-ish
    desktop: 'lg:aspect-[16/9]',   // Standard widescreen
  },
  
  tile: {
    mobile: 'aspect-[1/1]',        // Square on mobile
    tablet: 'md:aspect-[4/3]',     // Slightly wider
    desktop: 'lg:aspect-[16/9]',   // Wide on desktop
  }
};

/**
 * MOBILE-FRIENDLY GLASS TREATMENTS
 * Responsive backdrop blur and padding
 */
export const MOBILE_GLASS = {
  // Blur intensity (less blur on mobile for performance)
  blur: {
    light: 'backdrop-blur-[4px] md:backdrop-blur-[8px] lg:backdrop-blur-[12px]',
    medium: 'backdrop-blur-[8px] md:backdrop-blur-[16px] lg:backdrop-blur-[24px]',
    heavy: 'backdrop-blur-[12px] md:backdrop-blur-[24px] lg:backdrop-blur-[32px]',
  },
  
  // Background opacity
  bg: {
    light: 'bg-white/5 md:bg-white/8',
    medium: 'bg-white/8 md:bg-white/10',
    heavy: 'bg-white/10 md:bg-white/12',
  },
  
  // Combined glass effect
  hero: 'bg-white/8 backdrop-blur-[12px] md:backdrop-blur-[24px] lg:backdrop-blur-[32px]',
  card: 'bg-white/8 backdrop-blur-[8px] md:backdrop-blur-[16px] lg:backdrop-blur-[24px]',
  overlay: 'bg-white/5 backdrop-blur-[4px] md:backdrop-blur-[8px] lg:backdrop-blur-[12px]',
};

/**
 * MOBILE ANIMATION UTILITIES
 * Reduced motion on mobile for performance
 */
export const MOBILE_ANIMATION = {
  // Duration (shorter on mobile)
  duration: {
    quick: 0.3,      // Hover, toggles
    medium: 0.5,     // Most animations (reduced from 0.6-0.8)
    slow: 0.7,       // Large elements (reduced from 0.9-1.2)
  },
  
  // Disable animations on mobile
  prefersReducedMotion: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0 },  // Instant on reduced motion
  }
};

/**
 * MOBILE-FIRST HERO PANEL POSITIONING
 * Responsive positioning for glass hero panels
 */
export const MOBILE_HERO_PANEL = {
  // Top-left panel (Home, Story)
  topLeft: {
    position: 'relative md:absolute',
    top: 'md:top-12 lg:top-16',
    left: 'md:left-8 lg:left-12',
    width: 'w-full md:max-w-xl lg:max-w-2xl',
    margin: 'mb-8 md:mb-0',
  },
  
  // Centered panel
  centered: {
    position: 'relative',
    maxWidth: 'max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl',
    margin: 'mx-auto',
  },
  
  // Bottom panel
  bottom: {
    position: 'relative md:absolute',
    bottom: 'md:bottom-12 lg:bottom-16',
    left: 'md:left-8 lg:left-12',
    width: 'w-full md:max-w-xl lg:max-w-2xl',
    margin: 'mt-8 md:mt-0',
  }
};

/**
 * CAROUSEL/SCROLL PATTERNS
 * Mobile-friendly horizontal scrolling
 */
export const MOBILE_SCROLL = {
  // Horizontal scroll container
  container: 'flex overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide',
  
  // Scroll item
  item: 'flex-shrink-0 snap-center',
  
  // Item widths
  width: {
    narrow: 'min-w-[280px] max-w-[300px]',
    standard: 'min-w-[300px] max-w-[340px]',
    wide: 'min-w-[340px] max-w-[380px]',
  }
};

/**
 * MOBILE UTILITIES - Helper functions
 */
export const mobileUtils = {
  // Combine responsive classes
  combine: (...classes: string[]) => classes.filter(Boolean).join(' '),
  
  // Get mobile-first padding
  getPadding: (size: 'compact' | 'standard' | 'spacious' | 'hero') => {
    return MOBILE_SPACING.card[size];
  },
  
  // Get mobile-first typography
  getType: (category: keyof typeof MOBILE_TYPE, variant: string) => {
    return MOBILE_TYPE[category][variant as keyof typeof MOBILE_TYPE[typeof category]];
  },
  
  // Check if mobile
  isMobile: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_BREAKPOINTS.mobile).matches;
  },
  
  // Check if tablet
  isTablet: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_BREAKPOINTS.tablet).matches;
  },
  
  // Check if desktop
  isDesktop: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_BREAKPOINTS.desktop).matches;
  }
};

/**
 * EXPORT ALL UTILITIES
 */
export default {
  MOBILE_TYPE,
  MOBILE_SPACING,
  MOBILE_GRIDS,
  TOUCH_TARGETS,
  MOBILE_BREAKPOINTS,
  MOBILE_ASPECT,
  MOBILE_GLASS,
  MOBILE_ANIMATION,
  MOBILE_HERO_PANEL,
  MOBILE_SCROLL,
  mobileUtils
};
