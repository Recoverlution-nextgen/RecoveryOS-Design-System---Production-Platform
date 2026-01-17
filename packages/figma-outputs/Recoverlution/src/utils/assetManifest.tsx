/**
 * ASSET MANIFEST SYSTEM
 * 
 * Centralized registry of all figma:asset imports with:
 * - Logical naming (what the asset IS)
 * - Actual imported asset URL
 * - Usage location (which pages use it)
 * - Metadata (dimensions, purpose, etc)
 * - Version tracking
 * 
 * This prevents confusion and provides a single source of truth
 * for all platform assets.
 * 
 * IMPORTANT: figma:asset URLs must be imported as modules, not used as strings!
 */

// Import all platform mockups as static assets
import dashboardMockupImg from "figma:asset/0de72b5904836c2c893bf67c17161fa2d0664c1b.png";
import journeyMockupImg from "figma:asset/c133d9dce2b2099bae63a5797ac12c7c6afee9bb.png";
import navicuesMockupImg from "figma:asset/3e3a5d48085458459da2fa754069374a0432e4b4.png";
import lumaMockupImg from "figma:asset/c0cb9b3b0aa1887aaf488fd7ee62fe777499cb79.png";
import libraryMockupImg from "figma:asset/f0c69257d7a13e84ce3c3cfde046786833297157.png";
import libraryMockup2Img from "figma:asset/75240700f653efee81459019fc4a1accd7521c43.png";
import innerCompassMockupImg from "figma:asset/719538fda9d86318ef5d536c3c7f2f902d16069b.png";
import navigateMockupImg from "figma:asset/7ad617efe789c513f8349c50f987dc43d6b67c4d.png";

export interface AssetMetadata {
  id: string;
  name: string;
  url: string; // Now this is an actual imported URL, not a figma:asset string
  usedIn: string[];
  purpose: string;
  dimensions?: string;
  version?: string;
  lastVerified?: string;
}

/**
 * PLATFORM FEATURE MOCKUPS
 * Used on Marketing Platform Page and Homepage
 */
export const PLATFORM_MOCKUPS: Record<string, AssetMetadata> = {
  dashboard: {
    id: 'dashboard-mockup',
    name: 'Dashboard Overview',
    url: dashboardMockupImg,
    usedIn: ['MarketingPlatformPage', 'MarketingHomePage'],
    purpose: 'Shows main dashboard with patient metrics and cards',
    lastVerified: '2024-10-22'
  },
  journey: {
    id: 'journey-mockup',
    name: 'Journey Weekly View',
    url: journeyMockupImg,
    usedIn: ['MarketingPlatformPage', 'MarketingHomePage'],
    purpose: 'Shows weekly journey structure with E-R-A flow',
    lastVerified: '2024-10-22'
  },
  navicues: {
    id: 'navicues-mockup',
    name: 'NaviCues Interface',
    url: navicuesMockupImg,
    usedIn: ['MarketingPlatformPage', 'MarketingHomePage'],
    purpose: 'Shows NaviCues interactive exercises',
    lastVerified: '2024-10-22'
  },
  luma: {
    id: 'luma-mockup',
    name: 'LUMA AI Assistant',
    url: lumaMockupImg,
    usedIn: ['MarketingPlatformPage', 'MarketingHomePage'],
    purpose: 'Shows LUMA chat interface',
    lastVerified: '2024-10-22'
  },
  library: {
    id: 'library-mockup',
    name: 'Content Library',
    url: libraryMockupImg,
    usedIn: ['MarketingPlatformPage', 'MarketingHomePage'],
    purpose: 'Shows article and content library',
    lastVerified: '2024-10-22'
  },
  libraryPart2: {
    id: 'library-mockup-2',
    name: 'Content Library Detail',
    url: libraryMockup2Img,
    usedIn: ['MarketingPlatformPage'],
    purpose: 'Shows detailed view of library content',
    lastVerified: '2024-10-22'
  },
  innerCompass: {
    id: 'inner-compass-mockup',
    name: 'Inner Compass State View',
    url: innerCompassMockupImg,
    usedIn: ['MarketingPlatformPage', 'MarketingHomePage'],
    purpose: 'Shows inner state visualization',
    lastVerified: '2024-10-22'
  },
  navigate: {
    id: 'navigate-mockup',
    name: 'Navigate Support Tools',
    url: navigateMockupImg,
    usedIn: ['MarketingPlatformPage'],
    purpose: 'Shows navigation and support features',
    lastVerified: '2024-10-22'
  }
};

/**
 * Get asset URL by ID with error checking
 */
export function getAssetUrl(assetId: string): string {
  const asset = PLATFORM_MOCKUPS[assetId];
  if (!asset) {
    console.error(`❌ Asset not found in manifest: ${assetId}`);
    return '';
  }
  return asset.url;
}

/**
 * Get all assets used on a specific page
 */
export function getPageAssets(pageName: string): AssetMetadata[] {
  return Object.values(PLATFORM_MOCKUPS).filter(asset => 
    asset.usedIn.includes(pageName)
  );
}

/**
 * Validate an asset URL (check if it's properly formatted)
 * Now validates actual imported URLs, not figma:asset strings
 */
export function validateAssetUrl(url: string): boolean {
  // After import, these become blob URLs or data URLs
  return typeof url === 'string' && url.length > 0;
}

/**
 * Get asset metadata by URL (reverse lookup)
 */
export function getAssetByUrl(url: string): AssetMetadata | undefined {
  return Object.values(PLATFORM_MOCKUPS).find(asset => asset.url === url);
}

/**
 * Asset health check - logs all assets and their status
 */
export function performAssetHealthCheck(): void {
  console.group('🔍 ASSET HEALTH CHECK');
  
  Object.entries(PLATFORM_MOCKUPS).forEach(([key, asset]) => {
    const isValid = validateAssetUrl(asset.url);
    const status = isValid ? '✅' : '❌';
    
    console.log(`${status} ${asset.name} (${key})`);
    console.log(`   URL type: ${typeof asset.url}`);
    console.log(`   URL preview: ${asset.url.substring(0, 100)}${asset.url.length > 100 ? '...' : ''}`);
    console.log(`   Used in: ${asset.usedIn.join(', ')}`);
    console.log(`   Last verified: ${asset.lastVerified || 'Never'}`);
    console.log('');
  });
  
  console.groupEnd();
}
