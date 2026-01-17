/**
 * PERFORMANCE OPTIMIZATION UTILITIES
 * 
 * Comprehensive performance optimization for production deployment:
 * - Image lazy loading
 * - Critical resource preloading
 * - Code splitting hints
 * - Performance monitoring
 */

/**
 * Image Loading Strategies
 */
export const IMAGE_LOADING = {
  // Critical images (above fold, hero) - load immediately
  eager: 'eager' as const,
  
  // Non-critical images - lazy load when near viewport
  lazy: 'lazy' as const,
};

export const IMAGE_FETCH_PRIORITY = {
  // Critical hero images
  high: 'high' as const,
  
  // Important but not critical
  low: 'low' as const,
  
  // Browser default
  auto: 'auto' as const,
};

/**
 * Determine optimal loading strategy based on position
 */
export function getImageLoadingStrategy(position: 'hero' | 'section2' | 'section3+' | 'footer'): {
  loading: 'eager' | 'lazy';
  fetchPriority: 'high' | 'low' | 'auto';
} {
  switch (position) {
    case 'hero':
      return { loading: 'eager', fetchPriority: 'high' };
    case 'section2':
      return { loading: 'eager', fetchPriority: 'auto' };
    case 'section3+':
      return { loading: 'lazy', fetchPriority: 'low' };
    case 'footer':
      return { loading: 'lazy', fetchPriority: 'low' };
    default:
      return { loading: 'lazy', fetchPriority: 'auto' };
  }
}

/**
 * Image Optimization Helpers
 */
export const IMAGE_OPTIMIZATION = {
  // Responsive srcset generation
  generateSrcSet: (baseUrl: string, widths: number[]): string => {
    return widths.map(width => `${baseUrl}?w=${width} ${width}w`).join(', ');
  },

  // Sizes attribute for responsive images
  sizes: {
    hero: '100vw',
    fullWidth: '100vw',
    halfWidth: '(min-width: 1024px) 50vw, 100vw',
    thirdWidth: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
    quarterWidth: '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  },

  // Common responsive breakpoint widths
  breakpoints: {
    mobile: [375, 414, 768],
    tablet: [768, 1024],
    desktop: [1280, 1536, 1920],
    all: [375, 414, 768, 1024, 1280, 1536, 1920]
  }
};

/**
 * Critical Resource Preloading
 * Call this in App.tsx or page components for critical assets
 */
export function preloadCriticalAssets(assets: Array<{
  url: string;
  type: 'image' | 'font' | 'style' | 'script';
  as?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}>) {
  if (typeof window === 'undefined') return;

  assets.forEach(asset => {
    // Check if already preloaded
    const existing = document.querySelector(`link[rel="preload"][href="${asset.url}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset.url;
    
    if (asset.as) {
      link.as = asset.as;
    } else {
      // Auto-determine 'as' attribute
      if (asset.type === 'image') link.as = 'image';
      if (asset.type === 'font') link.as = 'font';
      if (asset.type === 'style') link.as = 'style';
      if (asset.type === 'script') link.as = 'script';
    }

    if (asset.crossOrigin) {
      link.crossOrigin = asset.crossOrigin;
    }

    // Fonts need crossorigin
    if (asset.type === 'font' && !asset.crossOrigin) {
      link.crossOrigin = 'anonymous';
    }

    document.head.appendChild(link);
  });
}

/**
 * DNS Prefetch for external domains
 */
export function prefetchDomains(domains: string[]) {
  if (typeof window === 'undefined') return;

  domains.forEach(domain => {
    const existing = document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

/**
 * Preconnect for critical external domains (e.g., CDNs, APIs)
 */
export function preconnectDomains(domains: string[]) {
  if (typeof window === 'undefined') return;

  domains.forEach(domain => {
    const existing = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Performance Monitoring
 */
export const PERFORMANCE = {
  // Mark a performance point
  mark: (name: string) => {
    if ('performance' in window && performance.mark) {
      performance.mark(name);
    }
  },

  // Measure between two marks
  measure: (name: string, startMark: string, endMark: string) => {
    if ('performance' in window && performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
      } catch (e) {
        console.warn('Performance measurement failed:', e);
      }
    }
  },

  // Get Core Web Vitals
  getCoreWebVitals: () => {
    if (!('performance' in window)) return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      // First Contentful Paint
      FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || null,
      
      // Largest Contentful Paint (requires web-vitals library for accurate measurement)
      LCP: null, // Use web-vitals library for accurate LCP
      
      // Cumulative Layout Shift (requires web-vitals library)
      CLS: null, // Use web-vitals library for accurate CLS
      
      // First Input Delay (requires web-vitals library)
      FID: null, // Use web-vitals library for accurate FID
      
      // Time to Interactive
      TTI: navigation?.domInteractive - navigation?.fetchStart || null,
      
      // DOM Content Loaded
      DCL: navigation?.domContentLoadedEventEnd - navigation?.fetchStart || null,
      
      // Page Load
      Load: navigation?.loadEventEnd - navigation?.fetchStart || null
    };
  },

  // Log performance metrics to console (dev only)
  logMetrics: () => {
    if (process.env.NODE_ENV !== 'development') return;
    
    const vitals = PERFORMANCE.getCoreWebVitals();
    console.group('🎯 Performance Metrics');
    console.table(vitals);
    console.groupEnd();
  }
};

/**
 * Intersection Observer for lazy loading components
 */
export function useLazyLoadObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
): (node: HTMLElement | null) => void {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '200px', // Start loading 200px before entering viewport
    threshold: 0,
    ...options
  };

  return (node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    }, defaultOptions);

    observer.observe(node);
  };
}

/**
 * Critical CSS Extraction Helper
 * Returns CSS for above-the-fold content
 */
export const CRITICAL_CSS = {
  // Hero section styles (inline in HTML)
  hero: `
    /* Hero critical styles */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,

  // Typography (inline in HTML)
  typography: `
    /* Critical typography */
    @font-face {
      font-family: 'SF Pro Display';
      font-display: swap;
    }
  `
};

/**
 * Resource Hints Configuration
 * Add these to your index.html <head>
 */
export const RESOURCE_HINTS = {
  // DNS prefetch for external domains
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],

  // Preconnect for critical external resources
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],

  // Preload critical assets
  preload: [
    // Add hero images here
    // { href: '/hero-home.png', as: 'image', type: 'image/png' }
  ]
};

/**
 * Code Splitting Hints
 * Use these with React.lazy() for optimal loading
 */
export const CODE_SPLITTING = {
  // Critical routes - preload
  critical: ['/', '/demo'],
  
  // Important routes - load on hover
  important: ['/platform', '/science', '/pricing'],
  
  // Lazy routes - load on demand
  lazy: ['/story', '/privacy', '/terms', '/cookies']
};

/**
 * Cache Control Headers
 * Configure in your hosting provider (Vercel, Netlify, etc.)
 */
export const CACHE_HEADERS = {
  // Static assets (images, fonts, CSS, JS)
  static: 'public, max-age=31536000, immutable',
  
  // HTML pages
  html: 'public, max-age=0, must-revalidate',
  
  // API responses
  api: 'private, max-age=0, no-cache, no-store, must-revalidate'
};
