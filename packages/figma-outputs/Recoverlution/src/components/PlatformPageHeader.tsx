/**
 * PLATFORM PAGE HEADER - Universal Smart Header
 * 
 * Automatically pulls the correct asset and copy for each platform page.
 * One component to rule them all - no more duplicated header code!
 * 
 * Usage:
 * <PlatformPageHeader page="Journey" navigation={...} />
 * <PlatformPageHeader page="Wellbeing" height="tall" />
 * 
 * infiniteK Design System:
 * - Banner image from DASHBOARD_ASSETS
 * - Frosted glass footer bar
 * - borderRadius: 0px everywhere
 * - Purple gradient fallback
 */

import { ReactNode } from "react";
import { DASHBOARD_ASSETS } from "../utils/dashboardAssetManifest";

// Page configuration - ALL platform pages in one place
const PAGE_CONFIG = {
  Journey: {
    title: "JOURNEY",
    headline: "Your path forward, one seed at a time",
    asset: DASHBOARD_ASSETS.journey
  },
  Navicues: {
    title: "NAVICUES",
    headline: "Provocations that wake the brain",
    asset: DASHBOARD_ASSETS.navicues
  },
  Wellbeing: {
    title: "WELLBEING",
    headline: "Practices to nourish every part of you",
    asset: DASHBOARD_ASSETS.wellbeing
  },
  State: {
    title: "STATE",
    headline: "Track how you feel, understand what you need",
    asset: DASHBOARD_ASSETS.state
  },
  Toolkit: {
    title: "TOOLKIT",
    headline: "Your saved resources, ready when you need them",
    asset: DASHBOARD_ASSETS.toolkit
  },
  Navigate: {
    title: "NAVIGATE",
    headline: "Stay connected with your care team",
    asset: DASHBOARD_ASSETS.navigate
  },
  Momentum: {
    title: "MOMENTUM",
    headline: "See your progress, celebrate your growth",
    asset: DASHBOARD_ASSETS.momentum
  },
  Profile: {
    title: "SETTINGS",
    headline: "Your profile, preferences, and privacy",
    asset: DASHBOARD_ASSETS.settings
  }
} as const;

export type PlatformPage = keyof typeof PAGE_CONFIG;

interface PlatformPageHeaderProps {
  /** Which platform page is this? */
  page: PlatformPage;
  /** Optional custom headline (overrides default) */
  headline?: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Optional custom background image (overrides default asset) */
  backgroundImage?: string;
  /** Optional navigation elements (right side of glass bar) */
  navigation?: ReactNode;
  /** Optional action buttons */
  actions?: ReactNode;
  /** Header height */
  height?: "compact" | "medium" | "tall";
}

export function PlatformPageHeader({
  page,
  headline,
  subheadline,
  backgroundImage,
  navigation,
  actions,
  height = "medium"
}: PlatformPageHeaderProps) {
  // Get page config
  const config = PAGE_CONFIG[page];
  
  // Use custom values or fall back to config
  const finalHeadline = headline || config.headline;
  const finalAsset = backgroundImage || config.asset;

  // Height classes
  const heightClass = height === "compact" ? "h-[280px]" : height === "tall" ? "h-[400px]" : "h-[320px]";

  return (
    <div className={`relative w-full ${heightClass}`}>
      {/* BACKGROUND - Image with gradient fallback */}
      <div className="absolute inset-0">
        {/* Gradient fallback (always present) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3E2BB8] via-[#5739FB] to-[#7C67FF]" />
        
        {/* Image overlay */}
        {finalAsset && (
          <img
            src={finalAsset}
            alt={config.title}
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => {
              console.log(`✅ Header image loaded for ${page}:`, finalAsset);
            }}
            onError={(e) => {
              console.error(`❌ Header image FAILED for ${page}:`, finalAsset);
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        
        {/* Bottom scrim for glass readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* GLASS BAR AT BOTTOM - infiniteK frosted glass v4.9 */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="w-full">
          <div 
            className="bg-white/10 backdrop-blur-[32px] backdrop-saturate-[180%]
                       border-t border-white/20 px-6 md:px-12 py-4 md:py-5
                       shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                       transition-all duration-300 hover:bg-white/15"
            style={{ borderRadius: '0px' }}
          >
            {/* SINGLE ROW LAYOUT: Title | Headline | Subheadline | Nav */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              
              {/* Title */}
              <div className="flex-shrink-0">
                <span 
                  className="text-white/90 text-xs uppercase tracking-[0.15em]" 
                  style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}
                >
                  {config.title}
                </span>
              </div>

              {/* Vertical Separator (desktop only) */}
              <div className="hidden md:block w-px h-6 bg-white/20" />

              {/* Headline */}
              <div className="flex-shrink-0">
                <h1 
                  className="text-white text-sm mb-0 leading-tight" 
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
                >
                  {finalHeadline}
                </h1>
              </div>

              {/* Subheadline (if provided) */}
              {subheadline && (
                <>
                  <div className="hidden md:block w-px h-6 bg-white/20" />
                  <div className="flex-1 min-w-0">
                    <p 
                      className="text-white/80 text-sm mb-0 truncate" 
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
                    >
                      {subheadline}
                    </p>
                  </div>
                </>
              )}

              {/* Spacer */}
              <div className="flex-1 hidden md:block" />

              {/* Navigation or Actions (right side) */}
              {(navigation || actions) && (
                <>
                  <div className="hidden md:block w-px h-6 bg-white/20" />
                  <div className="flex-shrink-0 flex items-center gap-3">
                    {navigation}
                    {actions}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}