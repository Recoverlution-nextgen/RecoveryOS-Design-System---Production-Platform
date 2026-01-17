/**
 * ============================================================================
 * DASHBOARD TILE ASSETS - SaaS Deployment Ready
 * infiniteK Design System - CDN-Optimized Delivery
 * ============================================================================
 * 
 * This file re-exports assets from the centralized manifest
 * Maintains backward compatibility with existing DashboardPage imports
 * 
 * Migration Status: ✅ SaaS-READY
 *   - No more figma:asset dependencies
 *   - Uses Supabase Storage + TinyPNG CDN
 *   - Works on any deployment platform
 * 
 * Updated: November 7, 2025
 * ============================================================================
 */

import { DASHBOARD_ASSETS, ASSET_METADATA } from './dashboardAssetManifest';

/**
 * Named exports with "Optimized" suffix for backward compatibility
 * These are CDN-ready URLs from Supabase Storage
 */

export const journeyOptimized = DASHBOARD_ASSETS.journey;
export const wellbeingOptimized = DASHBOARD_ASSETS.wellbeing;
export const navicuesOptimized = DASHBOARD_ASSETS.navicues;
export const toolkitOptimized = DASHBOARD_ASSETS.toolkit;
export const stateOptimized = DASHBOARD_ASSETS.state;
export const navigateOptimized = DASHBOARD_ASSETS.navigate;
export const momentumOptimized = DASHBOARD_ASSETS.momentum;

/**
 * Re-export metadata for consistency
 */
export const DASHBOARD_ASSET_INFO = ASSET_METADATA;

/**
 * Direct exports for cleaner imports
 */
export { DASHBOARD_ASSETS, ASSET_METADATA } from './dashboardAssetManifest';
