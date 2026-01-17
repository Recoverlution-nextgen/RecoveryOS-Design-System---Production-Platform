/**
 * Analytics Utilities for Recoverlution
 * 
 * Provides centralized analytics tracking with PostHog integration.
 * Privacy-friendly, HIPAA-compliant event tracking for B2B SaaS platform.
 * 
 * Features:
 * - Page view tracking
 * - Conversion tracking (demo bookings, logins)
 * - User behavior insights
 * - Session replay (for debugging)
 * - Performance monitoring
 */

import posthog from 'posthog-js';

// Analytics configuration - PostHog API key (safe to include client-side)
const POSTHOG_API_KEY = 'phc_2majy8Iies7cZvDhCyvMLcnGyAFUp3BmuptBz7kSxe7';
const POSTHOG_HOST = 'https://us.i.posthog.com';

// Initialize PostHog (only in production or if API key is provided)
let isInitialized = false;

export const initializeAnalytics = () => {
  if (isInitialized) return;
  
  if (POSTHOG_API_KEY) {
    posthog.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only', // HIPAA compliance - only track identified users
      capture_pageview: false, // We'll handle page views manually
      capture_pageleave: true,
      autocapture: false, // Manual tracking for better control
      disable_session_recording: false, // Enable session replay for debugging
      session_recording: {
        maskAllInputs: true, // Mask sensitive data
        maskTextSelector: '[data-private]', // Mask elements with data-private attribute
      },
    });
    isInitialized = true;
    console.log('✅ PostHog Analytics initialized');
  } else {
    console.log('⚠️ PostHog API key not found - Analytics disabled (development mode)');
  }
};

// Event Types - Strongly typed analytics events
export type AnalyticsEvent = 
  // Page Views
  | { type: 'page_view'; page: string; referrer?: string }
  
  // Marketing Site Events
  | { type: 'demo_booking_started' }
  | { type: 'demo_booking_completed'; name: string; email: string; organization: string }
  | { type: 'demo_booking_failed'; error: string }
  | { type: 'cta_clicked'; location: string; cta_text: string }
  | { type: 'pricing_viewed'; plan?: string }
  | { type: 'video_played'; video_id: string }
  | { type: 'video_completed'; video_id: string }
  
  // Authentication Events
  | { type: 'login_attempted'; email: string }
  | { type: 'login_succeeded'; email: string }
  | { type: 'login_failed'; email: string; error: string }
  | { type: 'logout' }
  
  // Platform Navigation
  | { type: 'platform_entered'; entry_point: string }
  | { type: 'pillar_viewed'; pillar: string }
  | { type: 'article_viewed'; article_id: number; article_title: string }
  | { type: 'navicue_triggered'; navicue_type: string }
  | { type: 'luma_opened'; trigger_source: string }
  | { type: 'luma_closed'; duration_seconds: number }
  
  // User Interactions
  | { type: 'content_favorited'; content_type: string; content_id: string }
  | { type: 'content_unfavorited'; content_type: string; content_id: string }
  | { type: 'state_logged'; state: 'red' | 'orange' | 'green'; pillar?: string }
  | { type: 'care_team_message_sent'; recipient_role: string }
  | { type: 'journey_step_completed'; journey_id: string; step_id: string }
  
  // Performance & Errors
  | { type: 'error_occurred'; error_message: string; component: string; stack?: string }
  | { type: 'page_load_completed'; page: string; load_time_ms: number };

// Track an analytics event
export const trackEvent = (event: AnalyticsEvent) => {
  if (!isInitialized || !POSTHOG_API_KEY) {
    // Log to console in development
    console.log('📊 Analytics Event:', event.type, event);
    return;
  }

  // Send to PostHog
  posthog.capture(event.type, event);
};

// Track page view
export const trackPageView = (page: string, referrer?: string) => {
  trackEvent({ type: 'page_view', page, referrer });
  
  // Also send to PostHog's pageview tracker
  if (isInitialized && POSTHOG_API_KEY) {
    posthog.capture('$pageview', { page });
  }
};

// Identify a user (for authenticated sessions)
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (!isInitialized || !POSTHOG_API_KEY) return;
  
  posthog.identify(userId, properties);
  console.log('👤 User identified:', userId);
};

// Reset user identity (on logout)
export const resetUser = () => {
  if (!isInitialized || !POSTHOG_API_KEY) return;
  
  posthog.reset();
  console.log('👤 User session reset');
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (!isInitialized || !POSTHOG_API_KEY) return;
  
  posthog.setPersonProperties(properties);
};

// Track conversion goals
export const trackConversion = (goalName: string, value?: number, properties?: Record<string, any>) => {
  if (!isInitialized || !POSTHOG_API_KEY) return;
  
  posthog.capture('conversion', {
    goal: goalName,
    value,
    ...properties,
  });
  
  console.log('🎯 Conversion tracked:', goalName, value);
};

// Track errors
export const trackError = (error: Error, component: string, additionalContext?: Record<string, any>) => {
  console.error(`❌ Error in ${component}:`, error);
  
  trackEvent({
    type: 'error_occurred',
    error_message: error.message,
    component,
    stack: error.stack,
    ...additionalContext,
  });
};

// Performance tracking
export const trackPerformance = (page: string, startTime: number) => {
  const loadTime = performance.now() - startTime;
  
  trackEvent({
    type: 'page_load_completed',
    page,
    load_time_ms: Math.round(loadTime),
  });
  
  console.log(`⚡ Page load: ${page} - ${Math.round(loadTime)}ms`);
};

// Feature flag evaluation (PostHog feature flags)
export const isFeatureEnabled = (flagKey: string): boolean => {
  if (!isInitialized || !POSTHOG_API_KEY) return false;
  
  return posthog.isFeatureEnabled(flagKey) || false;
};

// Get feature flag variant
export const getFeatureFlag = (flagKey: string): string | boolean | undefined => {
  if (!isInitialized || !POSTHOG_API_KEY) return undefined;
  
  return posthog.getFeatureFlag(flagKey);
};

// Opt user out of tracking (GDPR compliance)
export const optOut = () => {
  if (!isInitialized || !POSTHOG_API_KEY) return;
  
  posthog.opt_out_capturing();
  console.log('🔒 User opted out of analytics');
};

// Opt user back in
export const optIn = () => {
  if (!isInitialized || !POSTHOG_API_KEY) return;
  
  posthog.opt_in_capturing();
  console.log('🔓 User opted in to analytics');
};

// Check if user has opted out
export const hasOptedOut = (): boolean => {
  if (!isInitialized || !POSTHOG_API_KEY) return false;
  
  return posthog.has_opted_out_capturing();
};

// Session replay controls
export const startSessionRecording = () => {
  if (!isInitialized || !POSTHOG_API_KEY) return;
  
  posthog.startSessionRecording();
};

export const stopSessionRecording = () => {
  if (!isInitialized || !POSTHOG_API_KEY) return;
  
  posthog.stopSessionRecording();
};

// Export PostHog instance for advanced usage
export { posthog };

// Convenience functions for common tracking scenarios
export const analytics = {
  // Initialize on app startup
  init: initializeAnalytics,
  
  // Page tracking
  pageView: trackPageView,
  
  // Event tracking
  track: trackEvent,
  
  // User management
  identify: identifyUser,
  reset: resetUser,
  setProperties: setUserProperties,
  
  // Conversions
  conversion: trackConversion,
  
  // Errors
  error: trackError,
  
  // Performance
  performance: trackPerformance,
  
  // Feature flags
  feature: {
    isEnabled: isFeatureEnabled,
    getValue: getFeatureFlag,
  },
  
  // Privacy
  privacy: {
    optOut,
    optIn,
    hasOptedOut,
  },
  
  // Session recording
  recording: {
    start: startSessionRecording,
    stop: stopSessionRecording,
  },
};

// Default export
export default analytics;
