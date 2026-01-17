/**
 * Journey Page - Clean Build
 * Built: November 9, 2025
 * 
 * A clean slate Journey page with proper header.
 * Content will be added incrementally with proper design system alignment.
 */

import { PlatformPageHeader } from '../PlatformPageHeader';

export function JourneyPage() {
  return (
    <div className="journey-page">
      {/* Universal Platform Header */}
      <PlatformPageHeader 
        page="Journey"
        headline="Your path forward, one practice at a time"
        height="medium"
      />

      {/* Content Area - Clean slate ready for build */}
      <div className="journey-content">
        {/* Content goes here */}
      </div>
    </div>
  );
}
