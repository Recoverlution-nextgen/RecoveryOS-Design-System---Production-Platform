/**
 * Preview Mode Detection
 * 
 * Detects if the app is running in Figma Make preview mode
 * Allows conditional loading of heavy features for better preview performance
 */

import { useState, useEffect } from 'react';

/**
 * Detect if running in preview/demo mode
 * Checks for Figma, preview, or demo hostnames
 */
export function isPreviewMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname.toLowerCase();
  
  return (
    hostname.includes('figma') ||
    hostname.includes('preview') ||
    hostname.includes('demo') ||
    hostname.includes('localhost') // Consider localhost as preview for development
  );
}

/**
 * React hook for preview mode detection
 * Returns true if in preview mode
 */
export function usePreviewMode() {
  const [isPreview, setIsPreview] = useState(false);
  
  useEffect(() => {
    setIsPreview(isPreviewMode());
  }, []);
  
  return isPreview;
}

/**
 * Get preview mode configuration
 * Returns settings optimized for preview performance
 */
export function getPreviewConfig() {
  const isPreview = isPreviewMode();
  
  return {
    isPreview,
    // Skip analytics in preview
    enableAnalytics: !isPreview,
    // Skip monitoring in preview
    enableMonitoring: !isPreview,
    // Skip tour in preview (unless explicitly testing)
    enableTour: !isPreview,
    // Use lower quality images in preview
    imageQuality: isPreview ? 'medium' : 'high',
    // Defer heavy content in preview
    deferHeavyContent: isPreview,
    // Reduce animation complexity in preview
    reduceAnimations: isPreview,
  };
}

/**
 * Conditional loading wrapper
 * Only loads content if not in preview mode (or if forced)
 */
export function loadInProduction<T>(
  loader: () => T,
  fallback: T,
  force = false
): T {
  if (force || !isPreviewMode()) {
    return loader();
  }
  return fallback;
}
