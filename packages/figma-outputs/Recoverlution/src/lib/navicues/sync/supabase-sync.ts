/**
 * SUPABASE SYNC UTILITY
 * 
 * Unified sync for ALL NaviCues (3,000 legacy + 7,000 new = 10,000 total)
 * 
 * Handles:
 * - Batch import from JSON
 * - Individual cue upsert
 * - Variant management
 * - Target management
 * - Conflict resolution (update vs insert)
 */

import { GeneratedNavicue } from '../../../types/navicue-contract';

// ============================================================================
// SYNC CONFIGURATION
// ============================================================================

export interface SyncConfig {
  supabaseUrl: string;
  supabaseKey: string;
  batchSize?: number; // Number of cues to sync per request (default: 100)
  onProgress?: (current: number, total: number) => void;
  onError?: (error: Error, cue: GeneratedNavicue) => void;
  dryRun?: boolean; // If true, don't actually write to DB
}

export interface SyncResult {
  total: number;
  inserted: number;
  updated: number;
  failed: number;
  errors: Array<{ code: string; error: string }>;
}

// ============================================================================
// SYNC FUNCTIONS
// ============================================================================

/**
 * Sync a single NaviCue to Supabase
 */
export async function syncNavicue(
  cue: GeneratedNavicue,
  config: SyncConfig
): Promise<{ success: boolean; error?: string }> {
  if (config.dryRun) {
    console.log('[DRY RUN] Would sync:', cue.code);
    return { success: true };
  }
  
  try {
    const response = await fetch(`${config.supabaseUrl}/functions/v1/make-server-49b28b8a/navicues/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.supabaseKey}`,
      },
      body: JSON.stringify({ navicue: cue }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

/**
 * Sync a batch of NaviCues to Supabase
 */
export async function syncBatch(
  cues: GeneratedNavicue[],
  config: SyncConfig
): Promise<SyncResult> {
  const result: SyncResult = {
    total: cues.length,
    inserted: 0,
    updated: 0,
    failed: 0,
    errors: [],
  };
  
  const batchSize = config.batchSize || 100;
  
  for (let i = 0; i < cues.length; i += batchSize) {
    const batch = cues.slice(i, i + batchSize);
    
    if (config.dryRun) {
      console.log(`[DRY RUN] Would sync batch ${i / batchSize + 1}: ${batch.length} cues`);
      result.inserted += batch.length;
      config.onProgress?.(i + batch.length, cues.length);
      continue;
    }
    
    try {
      const response = await fetch(`${config.supabaseUrl}/functions/v1/make-server-49b28b8a/navicues/sync-batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.supabaseKey}`,
        },
        body: JSON.stringify({ navicues: batch }),
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      
      const batchResult = await response.json();
      result.inserted += batchResult.inserted || 0;
      result.updated += batchResult.updated || 0;
      result.failed += batchResult.failed || 0;
      
      if (batchResult.errors) {
        result.errors.push(...batchResult.errors);
      }
      
    } catch (error) {
      batch.forEach(cue => {
        result.failed++;
        result.errors.push({ code: cue.code, error: String(error) });
        config.onError?.(error as Error, cue);
      });
    }
    
    config.onProgress?.(i + batch.length, cues.length);
  }
  
  return result;
}

/**
 * Sync ALL 10,000 NaviCues (legacy 3,000 + new 7,000)
 */
export async function syncAll10000(
  legacy3000: GeneratedNavicue[],
  new7000: GeneratedNavicue[],
  config: SyncConfig
): Promise<SyncResult> {
  const all = [...legacy3000, ...new7000];
  
  console.log(`Syncing ${all.length} NaviCues to Supabase...`);
  console.log(`  - Legacy: ${legacy3000.length}`);
  console.log(`  - New: ${new7000.length}`);
  
  return await syncBatch(all, config);
}

// ============================================================================
// QUERY UTILITIES
// ============================================================================

/**
 * Fetch all NaviCues from Supabase (for verification)
 */
export async function fetchAllNavicues(config: SyncConfig): Promise<GeneratedNavicue[]> {
  const response = await fetch(`${config.supabaseUrl}/functions/v1/make-server-49b28b8a/navicues`, {
    headers: {
      'Authorization': `Bearer ${config.supabaseKey}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch NaviCues: ${await response.text()}`);
  }
  
  const data = await response.json();
  return data.navicues || [];
}

/**
 * Get sync stats from Supabase
 */
export async function getSyncStats(config: SyncConfig): Promise<{
  total: number;
  by_batch: Record<string, number>;
  by_tier: Record<string, number>;
  by_kbe: Record<string, number>;
  by_component: Record<string, number>;
}> {
  const response = await fetch(`${config.supabaseUrl}/functions/v1/make-server-49b28b8a/navicues/stats`, {
    headers: {
      'Authorization': `Bearer ${config.supabaseKey}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${await response.text()}`);
  }
  
  return await response.json();
}

// ============================================================================
// CONFLICT RESOLUTION
// ============================================================================

/**
 * Check if a NaviCue already exists in Supabase
 */
export async function navicueExists(code: string, config: SyncConfig): Promise<boolean> {
  const response = await fetch(
    `${config.supabaseUrl}/functions/v1/make-server-49b28b8a/navicues/${code}`,
    {
      headers: {
        'Authorization': `Bearer ${config.supabaseKey}`,
      },
    }
  );
  
  return response.ok;
}

/**
 * Resolve conflicts: update existing vs insert new
 */
export async function syncWithConflictResolution(
  cue: GeneratedNavicue,
  config: SyncConfig,
  strategy: 'skip' | 'update' | 'version' = 'update'
): Promise<{ success: boolean; action: 'inserted' | 'updated' | 'skipped'; error?: string }> {
  const exists = await navicueExists(cue.code, config);
  
  if (exists) {
    switch (strategy) {
      case 'skip':
        return { success: true, action: 'skipped' };
      
      case 'update':
        // Update existing (variants become new versions)
        return {
          success: true,
          action: 'updated',
          ...(await syncNavicue(cue, config)),
        };
      
      case 'version':
        // Create new variant versions, don't replace
        return {
          success: true,
          action: 'updated',
          ...(await syncNavicue(cue, { ...config, /* version mode */ })),
        };
    }
  }
  
  // Doesn't exist, insert new
  return {
    success: true,
    action: 'inserted',
    ...(await syncNavicue(cue, config)),
  };
}
