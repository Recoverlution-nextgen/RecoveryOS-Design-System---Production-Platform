/**
 * ASSET PROCESSING PIPELINE
 *
 * Handles automated asset transcoding, optimization, and intelligent tagging
 * Processes images (AVIF/WebP), videos (WebM/MP4), and applies AI-powered tagging
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export interface ProcessingJob {
  id: string;
  asset_id: string;
  job_type: 'transcode' | 'optimize' | 'tag' | 'governance_check' | 'thumbnail';
  job_config: any;
  priority: number;
}

export interface AssetMetadata {
  id: string;
  asset_type: string;
  format: string;
  storage_path: string;
  content_category: string;
  therapeutic_focus: string[];
}

/**
 * Asset Processing Engine
 */
export class AssetProcessingEngine {
  private static readonly WORKERS = 3; // Concurrent processing workers
  private static processingQueue: ProcessingJob[] = [];
  private static activeJobs = new Set<string>();

  /**
   * Initialize processing pipeline
   */
  static async initialize(): Promise<void> {
    // Start processing workers
    for (let i = 0; i < this.WORKERS; i++) {
      this.startWorker(i);
    }

    // Load pending jobs from database
    await this.loadPendingJobs();

    console.log('Asset processing pipeline initialized');
  }

  /**
   * Start a processing worker
   */
  private static async startWorker(workerId: number): Promise<void> {
    while (true) {
      try {
        const job = await this.getNextJob();
        if (job) {
          await this.processJob(job);
        } else {
          // Wait before checking for new jobs
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      } catch (error) {
        console.error(`Worker ${workerId} error:`, error);
        await new Promise(resolve => setTimeout(resolve, 10000)); // Back off on error
      }
    }
  }

  /**
   * Get next job from queue
   */
  private static async getNextJob(): Promise<ProcessingJob | null> {
    // Check in-memory queue first
    if (this.processingQueue.length > 0) {
      const job = this.processingQueue.shift()!;
      this.activeJobs.add(job.id);
      return job;
    }

    // Check database for new jobs
    const { data: jobs, error } = await supabase
      .from('asset_processing_jobs')
      .select('*')
      .eq('job_status', 'queued')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(1);

    if (error || !jobs || jobs.length === 0) {
      return null;
    }

    const job = jobs[0];
    this.activeJobs.add(job.id);

    // Mark as processing
    await supabase
      .from('asset_processing_jobs')
      .update({
        job_status: 'processing',
        started_at: new Date().toISOString()
      })
      .eq('id', job.id);

    return job;
  }

  /**
   * Process a job
   */
  private static async processJob(job: ProcessingJob): Promise<void> {
    try {
      console.log(`Processing job ${job.id}: ${job.job_type}`);

      let result: any = null;

      switch (job.job_type) {
        case 'optimize':
          result = await ImageOptimizer.optimize(job.asset_id, job.job_config);
          break;
        case 'transcode':
          result = await VideoTranscoder.transcode(job.asset_id, job.job_config);
          break;
        case 'thumbnail':
          result = await ThumbnailGenerator.generate(job.asset_id, job.job_config);
          break;
        case 'tag':
          result = await AssetTagger.tag(job.asset_id, job.job_config);
          break;
        case 'governance_check':
          result = await GovernanceChecker.check(job.asset_id, job.job_config);
          break;
        default:
          throw new Error(`Unknown job type: ${job.job_type}`);
      }

      // Mark job as completed
      await supabase
        .from('asset_processing_jobs')
        .update({
          job_status: 'completed',
          completed_at: new Date().toISOString(),
          result_data: result
        })
        .eq('id', job.id);

      console.log(`Job ${job.id} completed successfully`);

    } catch (error) {
      console.error(`Job ${job.id} failed:`, error);

      // Mark job as failed
      await supabase
        .from('asset_processing_jobs')
        .update({
          job_status: 'failed',
          completed_at: new Date().toISOString(),
          error_message: error instanceof Error ? error.message : 'Unknown error'
        })
        .eq('id', job.id);

    } finally {
      this.activeJobs.delete(job.id);
    }
  }

  /**
   * Load pending jobs from database
   */
  private static async loadPendingJobs(): Promise<void> {
    const { data: jobs, error } = await supabase
      .from('asset_processing_jobs')
      .select('*')
      .eq('job_status', 'queued')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true });

    if (!error && jobs) {
      this.processingQueue.push(...jobs);
      console.log(`Loaded ${jobs.length} pending jobs`);
    }
  }

  /**
   * Queue a new processing job
   */
  static async queueJob(job: Omit<ProcessingJob, 'id'>): Promise<string> {
    const { data, error } = await supabase
      .from('asset_processing_jobs')
      .insert({
        asset_id: job.asset_id,
        job_type: job.job_type,
        job_config: job.job_config,
        priority: job.priority
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to queue job: ${error.message}`);
    }

    // Add to in-memory queue for immediate processing
    this.processingQueue.push({ ...job, id: data.id });

    return data.id;
  }
}

/**
 * Image Optimization Engine
 */
export class ImageOptimizer {
  /**
   * Optimize image asset
   */
  static async optimize(assetId: string, config: any): Promise<any> {
    const { data: asset, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', assetId)
      .single();

    if (error || !asset) {
      throw new Error(`Asset not found: ${assetId}`);
    }

    // Download original image
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('Assets')
      .download(asset.storage_path);

    if (downloadError) {
      throw new Error(`Failed to download asset: ${downloadError.message}`);
    }

    const originalBlob = fileData as Blob;
    const results: any = {
      original_size: originalBlob.size,
      optimizations: {}
    };

    // Generate optimized formats
    const formats = config.formats || ['avif', 'webp'];
    const quality = config.quality || 85;

    for (const format of formats) {
      try {
        const optimizedBlob = await this.optimizeImage(originalBlob, format, quality);
        const optimizedPath = asset.storage_path.replace(/\.[^.]+$/, `.${format}`);

        // Upload optimized version
        const { error: uploadError } = await supabase.storage
          .from('Assets')
          .upload(optimizedPath, optimizedBlob, {
            contentType: `image/${format}`,
            upsert: true
          });

        if (uploadError) {
          console.error(`Failed to upload ${format}:`, uploadError);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('Assets')
          .getPublicUrl(optimizedPath);

        results.optimizations[format] = {
          path: optimizedPath,
          url: urlData.publicUrl,
          size: optimizedBlob.size,
          compression_ratio: originalBlob.size / optimizedBlob.size
        };

      } catch (error) {
        console.error(`Failed to optimize ${format}:`, error);
      }
    }

    // Update asset with transcoded formats
    await supabase
      .from('assets')
      .update({
        transcoded_formats: results.optimizations,
        compression_ratio: Math.max(...Object.values(results.optimizations).map((opt: any) => opt.compression_ratio))
      })
      .eq('id', assetId);

    return results;
  }

  /**
   * Optimize image using Canvas API
   */
  private static async optimizeImage(blob: Blob, format: string, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(
          (result) => {
            if (result) {
              resolve(result);
            } else {
              reject(new Error('Canvas toBlob failed'));
            }
          },
          `image/${format}`,
          quality / 100
        );
      };

      img.onerror = () => reject(new Error('Image load failed'));
      img.src = URL.createObjectURL(blob);
    });
  }
}

/**
 * Thumbnail Generator
 */
export class ThumbnailGenerator {
  /**
   * Generate thumbnail for asset
   */
  static async generate(assetId: string, config: any): Promise<any> {
    const { data: asset, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', assetId)
      .single();

    if (error || !asset) {
      throw new Error(`Asset not found: ${assetId}`);
    }

    // Download original
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('Assets')
      .download(asset.storage_path);

    if (downloadError) {
      throw new Error(`Failed to download asset: ${downloadError.message}`);
    }

    const thumbnailBlob = await this.createThumbnail(fileData as Blob, config);
    const thumbnailPath = asset.storage_path.replace(/\.[^.]+$/, '_thumb.jpg');

    // Upload thumbnail
    const { error: uploadError } = await supabase.storage
      .from('Assets')
      .upload(thumbnailPath, thumbnailBlob, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (uploadError) {
      throw new Error(`Failed to upload thumbnail: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('Assets')
      .getPublicUrl(thumbnailPath);

    // Update asset
    await supabase
      .from('assets')
      .update({
        thumbnail_url: urlData.publicUrl
      })
      .eq('id', assetId);

    return {
      thumbnail_path: thumbnailPath,
      thumbnail_url: urlData.publicUrl,
      size: thumbnailBlob.size
    };
  }

  /**
   * Create thumbnail using Canvas API
   */
  private static async createThumbnail(blob: Blob, config: any): Promise<Blob> {
    const { width = 300, height = 200, fit = 'cover' } = config;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      img.onload = () => {
        const scale = fit === 'cover'
          ? Math.max(width / img.width, height / img.height)
          : Math.min(width / img.width, height / img.height);

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        ctx?.drawImage(img, x, y, scaledWidth, scaledHeight);

        canvas.toBlob(
          (result) => {
            if (result) {
              resolve(result);
            } else {
              reject(new Error('Thumbnail creation failed'));
            }
          },
          'image/jpeg',
          0.85
        );
      };

      img.onerror = () => reject(new Error('Image load failed'));
      img.src = URL.createObjectURL(blob);
    });
  }
}

/**
 * AI-Powered Asset Tagger
 */
export class AssetTagger {
  /**
   * Apply intelligent tags to asset
   */
  static async tag(assetId: string, config: any): Promise<any> {
    const { data: asset, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', assetId)
      .single();

    if (error || !asset) {
      throw new Error(`Asset not found: ${assetId}`);
    }

    // Download asset for analysis
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('Assets')
      .download(asset.storage_path);

    if (downloadError) {
      throw new Error(`Failed to download asset: ${downloadError.message}`);
    }

    // Generate tags based on content analysis
    const tags = await this.generateTags(asset, fileData as Blob, config);

    // Insert tags into database
    const tagInserts = tags.map(tag => ({
      asset_id: assetId,
      tag_category: tag.category,
      tag_name: tag.name,
      tag_value: tag.value,
      confidence_score: tag.confidence,
      tag_source: 'ai_generated'
    }));

    const { error: tagError } = await supabase
      .from('asset_tags')
      .insert(tagInserts);

    if (tagError) {
      throw new Error(`Failed to insert tags: ${tagError.message}`);
    }

    // Update asset with semantic tags
    const semanticTags = tags
      .filter(tag => tag.category === 'semantic')
      .map(tag => tag.name);

    const clinicalTags = tags
      .filter(tag => tag.category === 'clinical')
      .map(tag => tag.name);

    await supabase
      .from('assets')
      .update({
        semantic_tags: semanticTags,
        clinical_tags: clinicalTags
      })
      .eq('id', assetId);

    return {
      tags_generated: tags.length,
      semantic_tags: semanticTags,
      clinical_tags: clinicalTags
    };
  }

  /**
   * Generate intelligent tags based on asset content
   */
  private static async generateTags(asset: any, blob: Blob, config: any): Promise<any[]> {
    const tags: any[] = [];

    // Basic content analysis based on filename and category
    const fileName = asset.storage_path.toLowerCase();

    // Therapeutic focus tags
    if (asset.therapeutic_focus) {
      asset.therapeutic_focus.forEach((focus: string) => {
        tags.push({
          category: 'therapeutic',
          name: focus.toLowerCase().replace(/\s+/g, '_'),
          value: focus,
          confidence: 1.0
        });
      });
    }

    // Content category tags
    if (asset.content_category) {
      tags.push({
        category: 'content',
        name: asset.content_category.toLowerCase().replace(/\s+/g, '_'),
        value: asset.content_category,
        confidence: 1.0
      });
    }

    // Semantic tags based on filename patterns
    const semanticPatterns = {
      'emotional': ['emotion', 'feeling', 'mood', 'affect'],
      'cognitive': ['thinking', 'thought', 'belief', 'cognition'],
      'behavioral': ['action', 'behavior', 'habit', 'routine'],
      'relational': ['relationship', 'connection', 'social', 'interaction'],
      'physiological': ['body', 'physical', 'somatic', 'biological']
    };

    Object.entries(semanticPatterns).forEach(([category, patterns]) => {
      patterns.forEach(pattern => {
        if (fileName.includes(pattern) || asset.title?.toLowerCase().includes(pattern)) {
          tags.push({
            category: 'semantic',
            name: category,
            value: category,
            confidence: 0.8
          });
        }
      });
    });

    // Clinical relevance tags
    const clinicalKeywords = {
      'anxiety': ['anxiety', 'panic', 'worry', 'fear'],
      'depression': ['depression', 'sadness', 'hopeless', 'low_mood'],
      'trauma': ['trauma', 'ptsd', 'abuse', 'shock'],
      'addiction': ['addiction', 'substance', 'recovery', 'relapse'],
      'stress': ['stress', 'pressure', 'overwhelm', 'burnout']
    };

    Object.entries(clinicalKeywords).forEach(([condition, keywords]) => {
      keywords.forEach(keyword => {
        if (fileName.includes(keyword) || asset.title?.toLowerCase().includes(keyword)) {
          tags.push({
            category: 'clinical',
            name: condition,
            value: condition,
            confidence: 0.7
          });
        }
      });
    });

    return tags;
  }
}

/**
 * Governance Compliance Checker
 */
export class GovernanceChecker {
  /**
   * Check asset against governance rules
   */
  static async check(assetId: string, config: any): Promise<any> {
    const { data: asset, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', assetId)
      .single();

    if (error || !asset) {
      throw new Error(`Asset not found: ${assetId}`);
    }

    // Get applicable governance rules
    const { data: rules, error: rulesError } = await supabase
      .from('asset_governance_rules')
      .select('*')
      .eq('is_active', true);

    if (rulesError) {
      throw new Error(`Failed to fetch governance rules: ${rulesError.message}`);
    }

    const violations: any[] = [];
    const compliance: any[] = [];

    // Check each rule
    for (const rule of rules || []) {
      const result = await this.evaluateRule(asset, rule);
      if (result.violated) {
        violations.push({
          rule_id: rule.id,
          rule_name: rule.rule_name,
          severity: rule.severity,
          message: result.message
        });
      } else {
        compliance.push({
          rule_id: rule.id,
          rule_name: rule.rule_name
        });
      }
    }

    // Update asset governance status
    const status = violations.length > 0 ? 'requires_revision' : 'approved';

    await supabase
      .from('assets')
      .update({
        governance_status: status,
        review_notes: violations.length > 0 ? JSON.stringify(violations) : null
      })
      .eq('id', assetId);

    return {
      status,
      violations_count: violations.length,
      violations,
      compliance_count: compliance.length
    };
  }

  /**
   * Evaluate a governance rule against an asset
   */
  private static async evaluateRule(asset: any, rule: any): Promise<{ violated: boolean; message?: string }> {
    // Simple rule evaluation (in production, this would be more sophisticated)
    const conditions = rule.conditions;

    // Check file size limits
    if (conditions.max_file_size && asset.file_size_bytes > conditions.max_file_size) {
      return {
        violated: true,
        message: `File size ${asset.file_size_bytes} exceeds limit ${conditions.max_file_size}`
      };
    }

    // Check content categories
    if (conditions.allowed_categories && !conditions.allowed_categories.includes(asset.content_category)) {
      return {
        violated: true,
        message: `Content category '${asset.content_category}' not in allowed categories`
      };
    }

    // Check required therapeutic focus
    if (conditions.required_therapeutic_focus) {
      const hasRequired = conditions.required_therapeutic_focus.some((focus: string) =>
        asset.therapeutic_focus?.includes(focus)
      );
      if (!hasRequired) {
        return {
          violated: true,
          message: `Missing required therapeutic focus: ${conditions.required_therapeutic_focus.join(', ')}`
        };
      }
    }

    return { violated: false };
  }
}

/**
 * Video Transcoder (Placeholder for future implementation)
 */
export class VideoTranscoder {
  static async transcode(assetId: string, config: any): Promise<any> {
    // Video transcoding would require server-side processing
    // This is a placeholder for WebCodecs API or server-side implementation
    console.log(`Video transcoding not yet implemented for asset ${assetId}`);
    return { status: 'not_implemented' };
  }
}

// Initialize processing pipeline when module loads
if (typeof window !== 'undefined') {
  AssetProcessingEngine.initialize();
}

export { AssetProcessingEngine, ImageOptimizer, ThumbnailGenerator, AssetTagger, GovernanceChecker, VideoTranscoder };