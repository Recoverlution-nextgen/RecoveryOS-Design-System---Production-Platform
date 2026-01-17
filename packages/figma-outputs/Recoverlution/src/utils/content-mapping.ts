/**
 * RECOVERLUTION CONTENT MAPPING SYSTEM
 * 
 * Maps content (articles, insights, journeys, practices, navicues) to learning blocks.
 * Content is NOT the block itself - it's one of many ways to address a block.
 * 
 * RELATIONSHIPS:
 * - Blocks = Learning objectives (what to master)
 * - Content = Various modalities to address those objectives
 * - One piece of content can address multiple blocks
 * - One block can be addressed by multiple pieces of content
 */

import type { PillarCode } from './taxonomy';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ContentType = 'article' | 'insight' | 'journey' | 'practice' | 'navicue' | 'video';

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  
  // What blocks does this content address?
  target_blocks: string[]; // Block IDs
  primary_block?: string; // Main focus block
  
  // Denormalized for filtering (derived from primary_block)
  pillar_id?: PillarCode;
  concept_id?: string;
  theme_id?: string;
  
  // Metadata
  created_at?: string;
  updated_at?: string;
}

// ----------------------------------------------------------------------------
// ARTICLE
// ----------------------------------------------------------------------------

export interface Article extends BaseContent {
  type: 'article';
  
  // Core content
  subtitle?: string;
  author?: string;
  reading_time: number; // minutes
  content: any; // Rich content structure
  
  // Reading mode
  reading_mode_content?: any;
  reading_mode_settings?: {
    font_size?: number;
    line_height?: number;
    width?: number;
  };
  
  // Associated resources
  practices?: string[]; // Practice IDs embedded in article
  related_articles?: string[];
  
  // Search & discovery
  keywords?: Array<{ keyword: string; weight: number }>;
  tags?: string[];
  
  // Engagement tracking
  avg_completion_rate?: number;
  avg_time_spent?: number;
}

// ----------------------------------------------------------------------------
// INSIGHT (Interactive Micro-learning)
// ----------------------------------------------------------------------------

export interface Checkpoint {
  id: string;
  type: 'intro' | 'comprehension' | 'reflection' | 'application' | 'final';
  position: number; // Where in the content (0-100%)
  
  question: string;
  response_type: 'scale' | 'multiple_choice' | 'text' | 'slider';
  
  options?: Array<{
    value: any;
    label: string;
    feedback?: string; // Optional immediate feedback
  }>;
  
  // For assessment
  correct_answer?: any;
  weight?: number; // How much this counts toward comprehension score
}

export interface InsightSection {
  id: string;
  heading?: string;
  content: any; // Rich content
  visual_element?: {
    type: 'image' | 'diagram' | 'video' | 'interactive';
    src?: string;
    alt?: string;
  };
  practice_id?: string; // Embedded practice
}

export interface Insight extends BaseContent {
  type: 'insight';
  
  // Structure
  intro_text: string;
  sections: InsightSection[];
  summary_text: string;
  
  // Interactivity
  checkpoints: Checkpoint[];
  
  // Metadata
  estimated_time: number; // minutes
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  
  // Associated resources
  practices?: string[]; // Practice IDs
  related_insights?: string[];
  
  // Search & discovery
  keywords?: Array<{ keyword: string; weight: number }>;
  
  // Engagement tracking
  avg_completion_rate?: number;
  avg_comprehension_score?: number;
}

// ----------------------------------------------------------------------------
// JOURNEY
// ----------------------------------------------------------------------------

export interface JourneyDay {
  day: number;
  title: string;
  content: any;
  practices?: string[];
  checkpoints?: Checkpoint[];
  reflection_prompt?: string;
}

export interface Journey extends BaseContent {
  type: 'journey';
  
  // Journeys target THEMES (which contain multiple blocks)
  target_theme: string; // Theme ID
  // target_blocks inherited from BaseContent
  
  // Structure
  description: string;
  days: number;
  daily_content: JourneyDay[];
  
  // Metadata
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[]; // Other journey IDs
  
  // Visual
  hero_image?: string;
  color_scheme?: string;
  
  // Engagement tracking
  avg_completion_rate?: number;
  avg_day_reached?: number;
}

// ----------------------------------------------------------------------------
// PRACTICE
// ----------------------------------------------------------------------------

export interface Practice extends BaseContent {
  type: 'practice';
  
  // Practices can reinforce many blocks across themes
  reinforces_blocks: string[]; // Block IDs
  target_blocks: string[]; // Same as reinforces_blocks (for consistency)
  
  // Core details
  category: 'breathwork' | 'meditation' | 'movement' | 'journaling' | 'grounding' | 'other';
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // Instructions
  description: string;
  instructions: string[];
  tips?: string[];
  
  // Media
  audio_url?: string;
  video_url?: string;
  image_url?: string;
  themeAssetUrl?: string; // Visual asset for the practice's theme
  
  // Metadata
  equipment_needed?: string[];
  best_time?: 'morning' | 'afternoon' | 'evening' | 'anytime';
  
  // Engagement tracking
  avg_completion_rate?: number;
  total_attempts?: number;
}

// ----------------------------------------------------------------------------
// NAVICUE (Daily Check-in Question)
// ----------------------------------------------------------------------------

export interface NavicueResponse {
  value: any;
  label: string;
  signals?: string[]; // What this response indicates (e.g., "hyperarousal", "regulated")
}

export interface Navicue extends BaseContent {
  type: 'navicue';
  
  // Navicues inform multiple blocks by gathering daily data
  informs_blocks: string[]; // Block IDs
  target_blocks: string[]; // Same as informs_blocks (for consistency)
  
  // Question
  prompt: string;
  prompt_context?: string; // Additional context/explanation
  
  // Response format
  response_type: 'scale' | 'slider' | 'multiple_choice' | 'yes_no' | 'text';
  responses?: NavicueResponse[];
  
  // For sliders/scales
  min_value?: number;
  max_value?: number;
  min_label?: string;
  max_label?: string;
  
  // Frequency
  frequency: 'daily' | 'weekly' | 'custom';
  time_of_day?: 'morning' | 'midday' | 'evening' | 'anytime';
  
  // Assessment
  expected_pattern?: string; // What healthy responses look like
  red_flag_threshold?: any; // When to alert
}

// ============================================================================
// BLOCK-CONTENT MAPPING
// ============================================================================

export interface BlockContentMap {
  block_id: string;
  
  // All content addressing this block
  articles: string[]; // Article IDs
  insights: string[]; // Insight IDs
  journeys: string[]; // Journey IDs (via parent theme)
  practices: string[]; // Practice IDs
  navicues: string[]; // Navicue IDs
  videos?: string[]; // Video IDs (future)
  
  // Recommended order/priority
  recommended_sequence?: Array<{
    content_id: string;
    content_type: ContentType;
    priority: number; // 1 = highest
    reason?: string;
  }>;
}

// ============================================================================
// KV STORE KEYS
// ============================================================================

export const ContentKeys = {
  // Content by type
  article: (articleId: string) => `content:article:${articleId}`,
  insight: (insightId: string) => `content:insight:${insightId}`,
  journey: (journeyId: string) => `content:journey:${journeyId}`,
  practice: (practiceId: string) => `content:practice:${practiceId}`,
  navicue: (navicueId: string) => `content:navicue:${navicueId}`,
  
  // All content of a type
  allArticles: () => 'content:article:',
  allInsights: () => 'content:insight:',
  allJourneys: () => 'content:journey:',
  allPractices: () => 'content:practice:',
  allNavicues: () => 'content:navicue:',
  
  // Content by pillar/concept/theme
  articlesForPillar: (pillarId: PillarCode) => `content:article:${pillarId}_`,
  insightsForPillar: (pillarId: PillarCode) => `content:insight:${pillarId}_`,
  journeysForPillar: (pillarId: PillarCode) => `content:journey:${pillarId}_`,
  
  // Block-Content mappings
  blockContentMap: (blockId: string) => `map:block_content:${blockId}`,
  
  // Content-Block mappings (reverse lookup)
  contentBlockMap: (contentType: ContentType, contentId: string) => 
    `map:content_blocks:${contentType}:${contentId}`,
  
  // Keywords
  contentKeywords: (contentId: string) => `map:keywords:${contentId}`,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all content addressing a specific block
 */
export async function getContentForBlock(
  blockId: string,
  kvGet: (key: string) => Promise<any>
): Promise<BlockContentMap | null> {
  const key = ContentKeys.blockContentMap(blockId);
  return await kvGet(key);
}

/**
 * Get all blocks addressed by a piece of content
 */
export async function getBlocksForContent(
  contentType: ContentType,
  contentId: string,
  kvGet: (key: string) => Promise<any>
): Promise<string[]> {
  const key = ContentKeys.contentBlockMap(contentType, contentId);
  const map = await kvGet(key);
  return map?.block_ids || [];
}

/**
 * Search content by keyword
 */
export function searchContentByKeyword(
  allContent: BaseContent[],
  keyword: string,
  minWeight: number = 0
): BaseContent[] {
  
  const keywordLower = keyword.toLowerCase();
  
  return allContent.filter(content => {
    // Check title
    if (content.title.toLowerCase().includes(keywordLower)) {
      return true;
    }
    
    // Check weighted keywords
    if ('keywords' in content && content.keywords) {
      const hasKeyword = content.keywords.some(k => 
        k.keyword.toLowerCase().includes(keywordLower) && k.weight >= minWeight
      );
      if (hasKeyword) return true;
    }
    
    return false;
  });
}

/**
 * Filter content by pillar/concept/theme
 */
export function filterContentByHierarchy(
  allContent: BaseContent[],
  filters: {
    pillar_id?: PillarCode;
    concept_id?: string;
    theme_id?: string;
  }
): BaseContent[] {
  
  return allContent.filter(content => {
    if (filters.theme_id && content.theme_id !== filters.theme_id) {
      return false;
    }
    
    if (filters.concept_id && content.concept_id !== filters.concept_id) {
      return false;
    }
    
    if (filters.pillar_id && content.pillar_id !== filters.pillar_id) {
      return false;
    }
    
    return true;
  });
}

/**
 * Get recommended content for a user based on their block statuses
 */
export function getRecommendedContent(
  allContent: BaseContent[],
  userBlockStatuses: Array<{
    block_id: string;
    status: 'red' | 'orange' | 'green';
    score: number;
  }>
): BaseContent[] {
  
  // Find red and orange blocks
  const needsAttention = userBlockStatuses
    .filter(b => b.status === 'red' || b.status === 'orange')
    .sort((a, b) => a.score - b.score); // Lowest scores first
  
  if (needsAttention.length === 0) {
    return [];
  }
  
  // Get content addressing these blocks
  const recommended = new Map<string, BaseContent>();
  
  for (const block of needsAttention) {
    const relevantContent = allContent.filter(content => 
      content.target_blocks.includes(block.block_id)
    );
    
    for (const content of relevantContent) {
      if (!recommended.has(content.id)) {
        recommended.set(content.id, content);
      }
    }
    
    // Limit to top 10
    if (recommended.size >= 10) break;
  }
  
  return Array.from(recommended.values());
}

// ============================================================================
// CONTENT ID GENERATION
// ============================================================================

/**
 * Generate content IDs based on primary block
 */
export function generateContentId(
  type: ContentType,
  primaryBlockId: string,
  sequence: number
): string {
  const prefix = type.toUpperCase();
  
  if (type === 'practice') {
    // Practices are more universal
    const category = 'GEN'; // Could be BR (breathwork), MED (meditation), etc.
    return `PRAC_${category}_${sequence.toString().padStart(3, '0')}`;
  }
  
  if (type === 'navicue') {
    // Navicues are organized by what they measure
    return `NAVICUE_${primaryBlockId}_${sequence.toString().padStart(2, '0')}`;
  }
  
  // Articles, Insights, Journeys tied to blocks
  return `${prefix}_${primaryBlockId}_${sequence.toString().padStart(2, '0')}`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  ContentKeys,
  getContentForBlock,
  getBlocksForContent,
  searchContentByKeyword,
  filterContentByHierarchy,
  getRecommendedContent,
  generateContentId
};