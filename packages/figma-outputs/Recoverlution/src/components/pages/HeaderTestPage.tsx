/**
 * Header Test Page - Verify PlatformPageHeader is working
 */

import { PlatformPageHeader } from "../PlatformPageHeader";

export function HeaderTestPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Test basic header */}
      <PlatformPageHeader page="Journey" />
      
      {/* Content */}
      <div className="flex-1 p-12">
        <h1 className="text-4xl mb-4">Header Test Page</h1>
        <p>If you see a header above with "JOURNEY" title and purple gradient, the system is working!</p>
        
        <div className="mt-8 space-y-4">
          <div className="p-4 bg-gray-100">
            <strong>Testing:</strong> PlatformPageHeader with page="Journey"
          </div>
          <div className="p-4 bg-gray-100">
            <strong>Expected:</strong> Purple gradient banner with "JOURNEY" title and glass footer bar
          </div>
          <div className="p-4 bg-gray-100">
            <strong>Asset URL:</strong> Should load from DASHBOARD_ASSETS.journey
          </div>
        </div>
      </div>
    </div>
  );
}
