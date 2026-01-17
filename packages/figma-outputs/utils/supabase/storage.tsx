/**
 * STORAGE URL HELPERS
 * 
 * Centralizes storage URL generation for assets
 * Project: wzeqlkbmqxlsjryidagf (unified)
 */

import { projectId } from './info';

const STORAGE_BASE_URL = `https://${projectId}.supabase.co/storage/v1/object/public`;

/**
 * Get full storage URL for an asset
 * @param bucket - Storage bucket name (e.g., 'dashboard-assets', 'audio')
 * @param path - Path within bucket (e.g., 'Website/Therapy/hero/Therapy_Hero-2-2.avif')
 */
export function getStorageUrl(bucket: string, path: string): string {
  return `${STORAGE_BASE_URL}/${bucket}/${path}`;
}

/**
 * Get dashboard asset URL
 * @param path - Path within dashboard-assets bucket
 */
export function getDashboardAssetUrl(path: string): string {
  return getStorageUrl('dashboard-assets', path);
}

/**
 * Get audio asset URL
 * @param path - Path within audio bucket
 */
export function getAudioUrl(path: string): string {
  return getStorageUrl('audio', path);
}

/**
 * Legacy URL migration helper
 * Converts old owtwhnvntwavuuvkrmvh URLs to new wzeqlkbmqxlsjryidagf URLs
 */
export function migrateLegacyUrl(url: string): string {
  if (url.includes('owtwhnvntwavuuvkrmvh.supabase.co')) {
    return url.replace('owtwhnvntwavuuvkrmvh.supabase.co', `${projectId}.supabase.co`);
  }
  return url;
}

// Export storage base for direct access if needed
export { STORAGE_BASE_URL };
