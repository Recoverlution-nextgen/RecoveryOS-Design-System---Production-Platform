/**
 * INTELLIGENT ASSET SELECTOR
 *
 * Context-aware asset selection engine that matches therapeutic content
 * with user state, session context, and clinical relevance
 */

import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export interface UserContext {
  currentEmotion?: string;
  therapeuticGoals?: string[];
  sessionPhase?: 'engagement' | 'education' | 'practice' | 'reflection';
  clinicalProfile?: {
    primaryConcerns: string[];
    therapeuticApproaches: string[];
    progressStage: 'early' | 'middle' | 'advanced';
  };
  accessibility?: {
    prefersReducedMotion: boolean;
    colorBlindness: boolean;
    textSize: 'small' | 'medium' | 'large';
  };
}

export interface AssetSelectionCriteria {
  contentCategory?: string;
  therapeuticFocus?: string[];
  emotionalResonance?: string[];
  clinicalRelevance?: string[];
  performanceBudget?: {
    maxLoadTime: number;
    maxFileSize: number;
    preferredFormats: string[];
  };
  contextualTags?: string[];
}

export interface SelectedAsset {
  id: string;
  asset_id: string;
  title: string;
  url: string;
  thumbnail_url?: string;
  therapeutic_match_score: number;
  contextual_relevance: number;
  performance_score: number;
  accessibility_score: number;
  selection_reason: string[];
}

/**
 * Intelligent Asset Selector Hook
 */
export function useAssetSelector(context: UserContext) {
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate selection criteria based on user context
  const criteria = useMemo(() => {
    return generateSelectionCriteria(context);
  }, [context]);

  // Select assets when criteria change
  useEffect(() => {
    if (Object.keys(criteria).length > 0) {
      selectAssets(criteria);
    }
  }, [criteria]);

  /**
   * Generate selection criteria from user context
   */
  function generateSelectionCriteria(context: UserContext): AssetSelectionCriteria {
    const criteria: AssetSelectionCriteria = {};

    // Content category based on session phase
    if (context.sessionPhase) {
      switch (context.sessionPhase) {
        case 'engagement':
          criteria.contentCategory = 'emotional-regulation';
          break;
        case 'education':
          criteria.contentCategory = 'cognitive-reframing';
          break;
        case 'practice':
          criteria.contentCategory = 'decision-mastery';
          break;
        case 'reflection':
          criteria.contentCategory = 'identity-integration';
          break;
      }
    }

    // Therapeutic focus based on clinical profile
    if (context.clinicalProfile?.primaryConcerns) {
      criteria.therapeuticFocus = context.clinicalProfile.primaryConcerns.map(concern =>
        concern.toLowerCase().replace(/\s+/g, '-')
      );
    }

    // Emotional resonance based on current emotion
    if (context.currentEmotion) {
      criteria.emotionalResonance = [context.currentEmotion];
    }

    // Clinical relevance
    if (context.clinicalProfile?.therapeuticApproaches) {
      criteria.clinicalRelevance = context.clinicalProfile.therapeuticApproaches;
    }

    // Performance budget
    criteria.performanceBudget = {
      maxLoadTime: 2000, // 2 seconds
      maxFileSize: 500000, // 500KB
      preferredFormats: ['avif', 'webp', 'png']
    };

    return criteria;
  }

  /**
   * Select optimal assets based on criteria
   */
  async function selectAssets(criteria: AssetSelectionCriteria): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      // Query assets with scoring
      const assets = await queryAndScoreAssets(criteria);

      // Sort by composite score
      assets.sort((a, b) => {
        const scoreA = (a.therapeutic_match_score * 0.4) +
                      (a.contextual_relevance * 0.3) +
                      (a.performance_score * 0.2) +
                      (a.accessibility_score * 0.1);
        const scoreB = (b.therapeutic_match_score * 0.4) +
                      (b.contextual_relevance * 0.3) +
                      (b.performance_score * 0.2) +
                      (b.accessibility_score * 0.1);
        return scoreB - scoreA;
      });

      // Take top matches
      const topAssets = assets.slice(0, 5);

      // Log selection for analytics
      await logAssetSelection(topAssets, criteria);

      setSelectedAssets(topAssets);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Asset selection failed');
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Query and score assets based on criteria
   */
  async function queryAndScoreAssets(criteria: AssetSelectionCriteria): Promise<SelectedAsset[]> {
    let query = supabase
      .from('assets')
      .select(`
        id,
        asset_id,
        title,
        public_url,
        thumbnail_url,
        content_category,
        therapeutic_focus,
        tags,
        semantic_tags,
        clinical_tags,
        performance_score,
        file_size_bytes,
        transcoded_formats
      `)
      .eq('is_active', true)
      .eq('governance_status', 'approved');

    // Apply filters
    if (criteria.contentCategory) {
      query = query.eq('content_category', criteria.contentCategory);
    }

    const { data: assets, error } = await query;

    if (error) {
      throw new Error(`Asset query failed: ${error.message}`);
    }

    if (!assets) {
      return [];
    }

    // Score and transform assets
    const scoredAssets: SelectedAsset[] = assets.map(asset => {
      const scores = calculateAssetScores(asset, criteria);
      const optimalUrl = selectOptimalUrl(asset, criteria.performanceBudget);

      return {
        id: asset.id,
        asset_id: asset.asset_id,
        title: asset.title,
        url: optimalUrl,
        thumbnail_url: asset.thumbnail_url,
        therapeutic_match_score: scores.therapeutic,
        contextual_relevance: scores.contextual,
        performance_score: scores.performance,
        accessibility_score: scores.accessibility,
        selection_reason: scores.reasons
      };
    });

    return scoredAssets;
  }

  /**
   * Calculate comprehensive scores for an asset
   */
  function calculateAssetScores(asset: any, criteria: AssetSelectionCriteria): {
    therapeutic: number;
    contextual: number;
    performance: number;
    accessibility: number;
    reasons: string[];
  } {
    const reasons: string[] = [];
    let therapeuticScore = 0;
    let contextualScore = 0;
    let performanceScore = asset.performance_score || 50;
    let accessibilityScore = 100; // Default high accessibility

    // Therapeutic matching
    if (criteria.therapeuticFocus && asset.therapeutic_focus) {
      const matches = criteria.therapeuticFocus.filter(focus =>
        asset.therapeutic_focus.some((tf: string) =>
          tf.toLowerCase().includes(focus.toLowerCase())
        )
      );
      therapeuticScore = (matches.length / criteria.therapeuticFocus.length) * 100;
      if (matches.length > 0) {
        reasons.push(`Therapeutic focus match: ${matches.join(', ')}`);
      }
    }

    // Clinical relevance
    if (criteria.clinicalRelevance && asset.clinical_tags) {
      const clinicalMatches = criteria.clinicalRelevance.filter(relevance =>
        asset.clinical_tags.some((tag: string) =>
          tag.toLowerCase().includes(relevance.toLowerCase())
        )
      );
      if (clinicalMatches.length > 0) {
        therapeuticScore = Math.max(therapeuticScore, 80);
        reasons.push(`Clinical relevance: ${clinicalMatches.join(', ')}`);
      }
    }

    // Emotional resonance
    if (criteria.emotionalResonance && asset.semantic_tags) {
      const emotionMatches = criteria.emotionalResonance.filter(emotion =>
        asset.semantic_tags.some((tag: string) =>
          tag.toLowerCase().includes(emotion.toLowerCase())
        )
      );
      if (emotionMatches.length > 0) {
        contextualScore = 90;
        reasons.push(`Emotional resonance: ${emotionMatches.join(', ')}`);
      }
    }

    // Contextual tags
    if (criteria.contextualTags && asset.tags) {
      const contextMatches = criteria.contextualTags.filter(tag =>
        JSON.stringify(asset.tags).toLowerCase().includes(tag.toLowerCase())
      );
      if (contextMatches.length > 0) {
        contextualScore = Math.max(contextualScore, 70);
        reasons.push(`Contextual tags: ${contextMatches.join(', ')}`);
      }
    }

    // Performance scoring
    if (criteria.performanceBudget) {
      const { maxFileSize, preferredFormats } = criteria.performanceBudget;
      if (asset.file_size_bytes && asset.file_size_bytes > maxFileSize) {
        performanceScore *= 0.5;
        reasons.push('File size exceeds budget');
      }

      if (asset.transcoded_formats) {
        const availableFormats = Object.keys(asset.transcoded_formats);
        const hasPreferred = preferredFormats.some(format =>
          availableFormats.includes(format)
        );
        if (hasPreferred) {
          performanceScore *= 1.2;
          reasons.push(`Optimized format available: ${preferredFormats.join(', ')}`);
        }
      }
    }

    return {
      therapeutic: therapeuticScore,
      contextual: contextualScore,
      performance: Math.min(performanceScore, 100),
      accessibility: accessibilityScore,
      reasons: reasons.length > 0 ? reasons : ['General content match']
    };
  }

  /**
   * Select optimal URL based on performance budget
   */
  function selectOptimalUrl(asset: any, budget?: any): string {
    if (!budget || !asset.transcoded_formats) {
      return asset.public_url;
    }

    const { preferredFormats } = budget;

    // Try preferred formats first
    for (const format of preferredFormats) {
      if (asset.transcoded_formats[format]) {
        return asset.transcoded_formats[format].url;
      }
    }

    return asset.public_url;
  }

  /**
   * Log asset selection for analytics
   */
  async function logAssetSelection(assets: SelectedAsset[], criteria: AssetSelectionCriteria): Promise<void> {
    try {
      const logEntries = assets.map(asset => ({
        asset_id: asset.id,
        access_type: 'api_call',
        access_context: 'intelligent_selection',
        load_time_ms: 0, // Would be measured in actual implementation
        bytes_transferred: 0, // Would be measured in actual implementation
        user_agent: navigator.userAgent
      }));

      await supabase
        .from('asset_access_logs')
        .insert(logEntries);
    } catch (error) {
      console.error('Failed to log asset selection:', error);
    }
  }

  /**
   * Manually refresh asset selection
   */
  function refreshSelection(): void {
    if (Object.keys(criteria).length > 0) {
      selectAssets(criteria);
    }
  }

  return {
    selectedAssets,
    isLoading,
    error,
    criteria,
    refreshSelection
  };
}

/**
 * Asset Display Component
 */
export function AssetDisplay({ asset, onLoad, onError }: {
  asset: SelectedAsset;
  onLoad?: () => void;
  onError?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="asset-container">
      {!isLoaded && !hasError && (
        <div className="asset-loading">
          <div className="loading-spinner" />
        </div>
      )}

      {hasError && (
        <div className="asset-error">
          <p>Asset failed to load</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      <img
        src={asset.url}
        alt={asset.title}
        style={{ display: isLoaded ? 'block' : 'none' }}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          setHasError(true);
          onError?.();
        }}
      />

      {process.env.NODE_ENV === 'development' && (
        <div className="asset-debug-info">
          <small>
            Therapeutic: {asset.therapeutic_match_score.toFixed(1)} |
            Contextual: {asset.contextual_relevance.toFixed(1)} |
            Performance: {asset.performance_score.toFixed(1)}
          </small>
          <br />
          <small>Reasons: {asset.selection_reason.join(', ')}</small>
        </div>
      )}
    </div>
  );
}

/**
 * Asset Selector Component
 */
export function IntelligentAssetSelector({
  context,
  maxAssets = 3,
  onAssetSelect
}: {
  context: UserContext;
  maxAssets?: number;
  onAssetSelect?: (assets: SelectedAsset[]) => void;
}) {
  const { selectedAssets, isLoading, error, refreshSelection } = useAssetSelector(context);

  useEffect(() => {
    if (selectedAssets.length > 0 && onAssetSelect) {
      onAssetSelect(selectedAssets.slice(0, maxAssets));
    }
  }, [selectedAssets, maxAssets, onAssetSelect]);

  if (error) {
    return (
      <div className="asset-selector-error">
        <p>Failed to load therapeutic assets: {error}</p>
        <button onClick={refreshSelection}>Retry</button>
      </div>
    );
  }

  return (
    <div className="intelligent-asset-selector">
      {isLoading && (
        <div className="asset-loading-state">
          <p>Selecting optimal therapeutic content...</p>
          <div className="loading-bar" />
        </div>
      )}

      <div className="selected-assets">
        {selectedAssets.slice(0, maxAssets).map((asset, index) => (
          <AssetDisplay
            key={asset.id}
            asset={asset}
            onLoad={() => console.log(`Asset ${asset.asset_id} loaded`)}
            onError={() => console.log(`Asset ${asset.asset_id} failed to load`)}
          />
        ))}
      </div>

      {selectedAssets.length > maxAssets && (
        <button
          className="load-more-assets"
          onClick={() => onAssetSelect?.(selectedAssets)}
        >
          Load {selectedAssets.length - maxAssets} more relevant assets
        </button>
      )}
    </div>
  );
}

export { useAssetSelector, IntelligentAssetSelector, AssetDisplay };