/**
 * useAnalytics Hook
 * 
 * React hook for easy analytics tracking in components.
 * Provides automatic cleanup and performance tracking.
 */

import { useEffect, useRef, useCallback } from 'react';
import { analytics, trackEvent, type AnalyticsEvent } from '../utils/analytics';

export const useAnalytics = () => {
  return {
    track: trackEvent,
    identify: analytics.identify,
    reset: analytics.reset,
    conversion: analytics.conversion,
    error: analytics.error,
  };
};

/**
 * Hook to track page views automatically
 * Call this at the top of each page component
 */
export const usePageTracking = (pageName: string) => {
  const startTimeRef = useRef<number>(performance.now());
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    // Track page view (only once)
    if (!hasTrackedRef.current) {
      analytics.pageView(pageName, document.referrer);
      hasTrackedRef.current = true;
    }

    // Track performance on unmount
    return () => {
      const startTime = startTimeRef.current;
      if (startTime) {
        analytics.performance(pageName, startTime);
      }
    };
  }, [pageName]);
};

/**
 * Hook to track user interactions with automatic cleanup
 */
export const useInteractionTracking = () => {
  const track = useCallback((event: AnalyticsEvent) => {
    trackEvent(event);
  }, []);

  return track;
};

/**
 * Hook to track form submissions
 */
export const useFormTracking = (formName: string) => {
  const trackFormStart = useCallback(() => {
    trackEvent({ 
      type: 'cta_clicked', 
      location: formName, 
      cta_text: 'Form Started' 
    });
  }, [formName]);

  const trackFormComplete = useCallback((data: Record<string, any>) => {
    console.log(`✅ Form completed: ${formName}`, data);
  }, [formName]);

  const trackFormError = useCallback((error: string) => {
    trackEvent({
      type: 'error_occurred',
      error_message: error,
      component: formName,
    });
  }, [formName]);

  return {
    trackStart: trackFormStart,
    trackComplete: trackFormComplete,
    trackError: trackFormError,
  };
};

/**
 * Hook to track video playback
 */
export const useVideoTracking = (videoId: string) => {
  const hasStartedRef = useRef(false);
  const hasCompletedRef = useRef(false);

  const trackPlay = useCallback(() => {
    if (!hasStartedRef.current) {
      trackEvent({ type: 'video_played', video_id: videoId });
      hasStartedRef.current = true;
    }
  }, [videoId]);

  const trackComplete = useCallback(() => {
    if (!hasCompletedRef.current) {
      trackEvent({ type: 'video_completed', video_id: videoId });
      hasCompletedRef.current = true;
    }
  }, [videoId]);

  return {
    trackPlay,
    trackComplete,
  };
};

/**
 * Hook to track LUMA overlay
 */
export const useLumaTracking = () => {
  const openTimeRef = useRef<number | null>(null);

  const trackOpen = useCallback((triggerSource: string) => {
    openTimeRef.current = Date.now();
    trackEvent({ 
      type: 'luma_opened', 
      trigger_source: triggerSource 
    });
  }, []);

  const trackClose = useCallback(() => {
    if (openTimeRef.current) {
      const durationSeconds = Math.round((Date.now() - openTimeRef.current) / 1000);
      trackEvent({ 
        type: 'luma_closed', 
        duration_seconds: durationSeconds 
      });
      openTimeRef.current = null;
    }
  }, []);

  return {
    trackOpen,
    trackClose,
  };
};

export default useAnalytics;
