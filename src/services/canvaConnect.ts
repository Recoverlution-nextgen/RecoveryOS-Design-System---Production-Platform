/**
 * CANVA CONNECT API INTEGRATION
 *
 * Handles OAuth 2.0 PKCE authentication and design export automation
 * Integrates with Supabase for asset storage and processing pipeline
 */

import { createClient } from '@supabase/supabase-js';

// Canva API Configuration
const CANVA_CONFIG = {
  clientId: process.env.VITE_CANVA_CLIENT_ID || '',
  clientSecret: process.env.CANVA_CLIENT_SECRET || '',
  redirectUri: process.env.VITE_CANVA_REDIRECT_URI || 'http://localhost:3000/auth/canva/callback',
  baseUrl: 'https://api.canva.com/rest/v1',
  oauthUrl: 'https://www.canva.com/api/oauth/authorize',
  tokenUrl: 'https://api.canva.com/rest/v1/oauth/token'
};

// Supabase client for asset storage
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export interface CanvaDesign {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  urls: {
    edit_url: string;
    view_url: string;
  };
}

export interface CanvaExportJob {
  id: string;
  design_id: string;
  status: 'in_progress' | 'success' | 'fail';
  export_url?: string;
  error?: string;
}

export interface AssetProcessingContext {
  designId: string;
  exportUrl: string;
  contentCategory: string;
  therapeuticFocus: string[];
  governanceRules: string[];
}

/**
 * OAuth 2.0 PKCE Authentication Flow
 */
export class CanvaAuth {
  private static codeVerifier: string | null = null;
  private static state: string | null = null;

  /**
   * Generate PKCE code challenge
   */
  private static async generateCodeChallenge(): Promise<{ verifier: string; challenge: string }> {
    const verifier = this.generateRandomString(64);
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    return { verifier, challenge };
  }

  /**
   * Generate random string for PKCE
   */
  private static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Initiate OAuth flow
   */
  static async initiateAuth(): Promise<string> {
    const { verifier, challenge } = await this.generateCodeChallenge();
    this.codeVerifier = verifier;
    this.state = this.generateRandomString(32);

    const params = new URLSearchParams({
      client_id: CANVA_CONFIG.clientId,
      redirect_uri: CANVA_CONFIG.redirectUri,
      response_type: 'code',
      scope: 'design:content:read design:content:write design:meta:read',
      code_challenge: challenge,
      code_challenge_method: 'S256',
      state: this.state
    });

    return `${CANVA_CONFIG.oauthUrl}?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  static async exchangeCodeForToken(code: string, returnedState: string): Promise<any> {
    if (returnedState !== this.state) {
      throw new Error('Invalid state parameter');
    }

    const response = await fetch(CANVA_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CANVA_CONFIG.clientId,
        client_secret: CANVA_CONFIG.clientSecret,
        code: code,
        code_verifier: this.codeVerifier!,
        grant_type: 'authorization_code',
        redirect_uri: CANVA_CONFIG.redirectUri
      })
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const tokenData = await response.json();

    // Store tokens securely (in production, use secure storage)
    localStorage.setItem('canva_access_token', tokenData.access_token);
    localStorage.setItem('canva_refresh_token', tokenData.refresh_token);
    localStorage.setItem('canva_token_expires', Date.now() + (tokenData.expires_in * 1000));

    return tokenData;
  }

  /**
   * Get valid access token (refresh if needed)
   */
  static async getAccessToken(): Promise<string> {
    const token = localStorage.getItem('canva_access_token');
    const expires = localStorage.getItem('canva_token_expires');
    const refreshToken = localStorage.getItem('canva_refresh_token');

    if (!token || !expires || Date.now() > parseInt(expires)) {
      if (refreshToken) {
        return await this.refreshAccessToken(refreshToken);
      } else {
        throw new Error('No valid access token available');
      }
    }

    return token;
  }

  /**
   * Refresh access token
   */
  private static async refreshAccessToken(refreshToken: string): Promise<string> {
    const response = await fetch(CANVA_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CANVA_CONFIG.clientId,
        client_secret: CANVA_CONFIG.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const tokenData = await response.json();

    localStorage.setItem('canva_access_token', tokenData.access_token);
    localStorage.setItem('canva_refresh_token', tokenData.refresh_token);
    localStorage.setItem('canva_token_expires', Date.now() + (tokenData.expires_in * 1000));

    return tokenData.access_token;
  }
}

/**
 * Canva API Client
 */
export class CanvaAPI {
  /**
   * Get user's designs
   */
  static async getDesigns(): Promise<CanvaDesign[]> {
    const token = await CanvaAuth.getAccessToken();

    const response = await fetch(`${CANVA_CONFIG.baseUrl}/designs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch designs: ${response.statusText}`);
    }

    const data = await response.json();
    return data.designs || [];
  }

  /**
   * Get specific design details
   */
  static async getDesign(designId: string): Promise<CanvaDesign> {
    const token = await CanvaAuth.getAccessToken();

    const response = await fetch(`${CANVA_CONFIG.baseUrl}/designs/${designId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch design: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Export design to asset
   */
  static async exportDesign(designId: string, format: 'png' | 'jpg' | 'pdf' | 'gif' = 'png'): Promise<CanvaExportJob> {
    const token = await CanvaAuth.getAccessToken();

    const response = await fetch(`${CANVA_CONFIG.baseUrl}/designs/${designId}/exports`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        format: format,
        quality: 'pro' // Highest quality
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to export design: ${response.statusText}`);
    }

    const exportJob = await response.json();

    // Poll for completion
    return await this.pollExportJob(designId, exportJob.id);
  }

  /**
   * Poll export job until completion
   */
  private static async pollExportJob(designId: string, exportId: string): Promise<CanvaExportJob> {
    const token = await CanvaAuth.getAccessToken();
    const maxAttempts = 30; // 5 minutes max
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch(`${CANVA_CONFIG.baseUrl}/designs/${designId}/exports/${exportId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to check export status: ${response.statusText}`);
      }

      const job = await response.json();

      if (job.status === 'success') {
        return job;
      } else if (job.status === 'fail') {
        throw new Error(`Export failed: ${job.error}`);
      }

      // Wait 10 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
    }

    throw new Error('Export job timed out');
  }
}

/**
 * Asset Processing Pipeline Integration
 */
export class AssetProcessor {
  /**
   * Process Canva export into RecoveryOS asset
   */
  static async processCanvaExport(context: AssetProcessingContext): Promise<any> {
    try {
      // 1. Download the exported asset
      const exportResponse = await fetch(context.exportUrl);
      if (!exportResponse.ok) {
        throw new Error(`Failed to download export: ${exportResponse.statusText}`);
      }

      const assetBlob = await exportResponse.blob();

      // 2. Upload to Supabase Storage
      const fileName = `canva-${context.designId}-${Date.now()}.png`;
      const storagePath = `Assets/Platform/Canva/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('Assets')
        .upload(storagePath, assetBlob, {
          contentType: 'image/png',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      // 3. Get public URL
      const { data: urlData } = supabase.storage
        .from('Assets')
        .getPublicUrl(storagePath);

      // 4. Create asset record
      const assetData = {
        asset_id: `canva-${context.designId}`,
        title: `Canva Design ${context.designId}`,
        description: `Auto-exported from Canva design ${context.designId}`,
        asset_type: 'image',
        format: 'png',
        original_format: 'png',
        storage_path: storagePath,
        public_url: urlData.publicUrl,
        processing_status: 'completed',
        processing_completed_at: new Date().toISOString(),
        content_category: context.contentCategory,
        therapeutic_focus: context.therapeuticFocus,
        source_type: 'canva_export',
        source_id: context.designId,
        source_metadata: {
          export_url: context.exportUrl,
          governance_rules: context.governanceRules
        },
        file_size_bytes: assetBlob.size
      };

      const { data: assetRecord, error: assetError } = await supabase
        .from('assets')
        .insert(assetData)
        .select()
        .single();

      if (assetError) {
        throw new Error(`Asset record creation failed: ${assetError.message}`);
      }

      // 5. Queue processing jobs
      await this.queueProcessingJobs(assetRecord.id);

      // 6. Apply governance rules
      await this.applyGovernanceRules(assetRecord.id, context.governanceRules);

      return assetRecord;

    } catch (error) {
      console.error('Asset processing failed:', error);
      throw error;
    }
  }

  /**
   * Queue asset processing jobs
   */
  private static async queueProcessingJobs(assetId: string): Promise<void> {
    const jobs = [
      {
        asset_id: assetId,
        job_type: 'optimize',
        job_config: { formats: ['avif', 'webp'], quality: 85 },
        priority: 3
      },
      {
        asset_id: assetId,
        job_type: 'thumbnail',
        job_config: { width: 300, height: 200, fit: 'cover' },
        priority: 2
      },
      {
        asset_id: assetId,
        job_type: 'tag',
        job_config: { auto_tag: true, clinical_focus: true },
        priority: 1
      }
    ];

    const { error } = await supabase
      .from('asset_processing_jobs')
      .insert(jobs);

    if (error) {
      console.error('Failed to queue processing jobs:', error);
    }
  }

  /**
   * Apply governance rules to asset
   */
  private static async applyGovernanceRules(assetId: string, rules: string[]): Promise<void> {
    // Implementation for governance rule application
    // This would check against the asset_governance_rules table
    console.log(`Applying governance rules to asset ${assetId}:`, rules);
  }
}

/**
 * Webhook Handler for Real-time Updates
 */
export class CanvaWebhookHandler {
  /**
   * Handle design update webhook
   */
  static async handleDesignUpdate(payload: any): Promise<void> {
    const { designId, eventType } = payload;

    if (eventType === 'design.updated') {
      // Queue re-export and re-processing
      console.log(`Design ${designId} updated, queuing re-processing`);

      // Get design details
      const design = await CanvaAPI.getDesign(designId);

      // Check if we have an existing asset for this design
      const { data: existingAsset } = await supabase
        .from('assets')
        .select('id')
        .eq('source_id', designId)
        .eq('source_type', 'canva_export')
        .single();

      if (existingAsset) {
        // Update existing asset
        await this.updateExistingAsset(existingAsset.id, design);
      } else {
        // Create new asset
        await this.createNewAssetFromWebhook(design);
      }
    }
  }

  /**
   * Update existing asset from webhook
   */
  private static async updateExistingAsset(assetId: string, design: CanvaDesign): Promise<void> {
    // Re-export and update asset
    const exportJob = await CanvaAPI.exportDesign(design.id);
    const context: AssetProcessingContext = {
      designId: design.id,
      exportUrl: exportJob.export_url!,
      contentCategory: 'pending_categorization',
      therapeuticFocus: [],
      governanceRules: []
    };

    await AssetProcessor.processCanvaExport(context);
  }

  /**
   * Create new asset from webhook
   */
  private static async createNewAssetFromWebhook(design: CanvaDesign): Promise<void> {
    // This would typically require additional metadata from the webhook payload
    // For now, create with minimal info and flag for manual review
    console.log(`New design detected: ${design.id} - ${design.title}`);
  }
}

// Export main classes
export { CanvaAuth, CanvaAPI, AssetProcessor, CanvaWebhookHandler };