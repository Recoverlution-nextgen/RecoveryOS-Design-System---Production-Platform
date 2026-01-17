/**
 * BUZZ TAG SCHEMA
 * Central source of truth for all buzz tags across Articles, Insights, and Practices
 * 
 * Philosophy: 
 * - Buzz tags are discovery mechanisms, not metadata
 * - They surface on the asset to help users decide if content is relevant
 * - They come from three sources: keywords (primary), themes, and content type markers
 * - Backend may track additional metadata (steps, checkpoints, difficulty) but frontend only shows buzz tags
 * 
 * SQL MIGRATION READY:
 * This schema will translate directly to:
 * - buzz_tags table (id, tag_name, category, display_order)
 * - content_buzz_tags junction table (content_id, buzz_tag_id)
 */

// ============================================================================
// BUZZ TAG CATEGORIES
// ============================================================================

export type BuzzTagCategory = 
  | 'discovery'      // Content keywords (anxiety, stress, relationships, etc.)
  | 'theme'          // Thematic clusters (Ground the Body, Aim Attention, etc.)
  | 'level'          // Accessibility markers (Everyone, Building, Practiced)
  | 'format';        // Content format markers (Expert → Application, Step by Step, etc.)

// ============================================================================
// BUZZ TAG INTERFACE
// ============================================================================

export interface BuzzTag {
  id: string;
  label: string;
  category: BuzzTagCategory;
  displayOrder: number;
  description?: string; // For internal documentation
}

// ============================================================================
// DISCOVERY TAGS (from keywords.primary)
// ============================================================================
// These come from the article/practice/insight keywords.primary array
// They help users find content by topic/concern
// Max 3 shown on card

export const DISCOVERY_TAGS: BuzzTag[] = [
  // Emotional/Mental States
  { id: 'anxiety', label: 'Anxiety', category: 'discovery', displayOrder: 1 },
  { id: 'stress', label: 'Stress', category: 'discovery', displayOrder: 2 },
  { id: 'overwhelm', label: 'Overwhelm', category: 'discovery', displayOrder: 3 },
  { id: 'fear', label: 'Fear', category: 'discovery', displayOrder: 4 },
  { id: 'anger', label: 'Anger', category: 'discovery', displayOrder: 5 },
  { id: 'sadness', label: 'Sadness', category: 'discovery', displayOrder: 6 },
  { id: 'loneliness', label: 'Loneliness', category: 'discovery', displayOrder: 7 },
  { id: 'shame', label: 'Shame', category: 'discovery', displayOrder: 8 },
  { id: 'guilt', label: 'Guilt', category: 'discovery', displayOrder: 9 },
  
  // Capabilities/Skills
  { id: 'coping', label: 'Coping', category: 'discovery', displayOrder: 10 },
  { id: 'regulation', label: 'Regulation', category: 'discovery', displayOrder: 11 },
  { id: 'resilience', label: 'Resilience', category: 'discovery', displayOrder: 12 },
  { id: 'boundaries', label: 'Boundaries', category: 'discovery', displayOrder: 13 },
  { id: 'communication', label: 'Communication', category: 'discovery', displayOrder: 14 },
  { id: 'mindfulness', label: 'Mindfulness', category: 'discovery', displayOrder: 15 },
  { id: 'grounding', label: 'Grounding', category: 'discovery', displayOrder: 16 },
  
  // Relationships/Social
  { id: 'relationships', label: 'Relationships', category: 'discovery', displayOrder: 17 },
  { id: 'connection', label: 'Connection', category: 'discovery', displayOrder: 18 },
  { id: 'trust', label: 'Trust', category: 'discovery', displayOrder: 19 },
  { id: 'isolation', label: 'Isolation', category: 'discovery', displayOrder: 20 },
  { id: 'support', label: 'Support', category: 'discovery', displayOrder: 21 },
  
  // Identity/Self
  { id: 'identity', label: 'Identity', category: 'discovery', displayOrder: 22 },
  { id: 'self-worth', label: 'Self Worth', category: 'discovery', displayOrder: 23 },
  { id: 'values', label: 'Values', category: 'discovery', displayOrder: 24 },
  { id: 'purpose', label: 'Purpose', category: 'discovery', displayOrder: 25 },
  { id: 'authenticity', label: 'Authenticity', category: 'discovery', displayOrder: 26 },
  
  // Cognitive
  { id: 'thoughts', label: 'Thoughts', category: 'discovery', displayOrder: 27 },
  { id: 'patterns', label: 'Patterns', category: 'discovery', displayOrder: 28 },
  { id: 'perspective', label: 'Perspective', category: 'discovery', displayOrder: 29 },
  { id: 'beliefs', label: 'Beliefs', category: 'discovery', displayOrder: 30 },
  { id: 'awareness', label: 'Awareness', category: 'discovery', displayOrder: 31 },
  
  // Decision/Action
  { id: 'choices', label: 'Choices', category: 'discovery', displayOrder: 32 },
  { id: 'decisions', label: 'Decisions', category: 'discovery', displayOrder: 33 },
  { id: 'commitment', label: 'Commitment', category: 'discovery', displayOrder: 34 },
  { id: 'agency', label: 'Agency', category: 'discovery', displayOrder: 35 },
  { id: 'clarity', label: 'Clarity', category: 'discovery', displayOrder: 36 },
];

// ============================================================================
// THEME TAGS (from themeName)
// ============================================================================
// These come from the content's themeName field
// They show thematic clusters within pillars

export const THEME_TAGS: BuzzTag[] = [
  // Emotional Regulation Themes
  { id: 'ground-body', label: 'Ground the Body', category: 'theme', displayOrder: 1 },
  { id: 'aim-attention', label: 'Aim Attention', category: 'theme', displayOrder: 2 },
  { id: 'name-emotion', label: 'Name the Emotion', category: 'theme', displayOrder: 3 },
  { id: 'tolerate-feeling', label: 'Tolerate the Feeling', category: 'theme', displayOrder: 4 },
  { id: 'discharge-energy', label: 'Discharge Energy', category: 'theme', displayOrder: 5 },
  
  // Stress Resilience Themes
  { id: 'baseline-capacity', label: 'Baseline Capacity', category: 'theme', displayOrder: 6 },
  { id: 'recovery-windows', label: 'Recovery Windows', category: 'theme', displayOrder: 7 },
  { id: 'resilience-anchors', label: 'Resilience Anchors', category: 'theme', displayOrder: 8 },
  { id: 'adaptive-load', label: 'Adaptive Load', category: 'theme', displayOrder: 9 },
  
  // Social Connectivity Themes
  { id: 'repair-trust', label: 'Repair Trust', category: 'theme', displayOrder: 10 },
  { id: 'show-up-messy', label: 'Show Up Messy', category: 'theme', displayOrder: 11 },
  { id: 'build-bridges', label: 'Build Bridges', category: 'theme', displayOrder: 12 },
  { id: 'co-regulation', label: 'Co-Regulation', category: 'theme', displayOrder: 13 },
  
  // Cognitive Reframing Themes
  { id: 'catch-distortion', label: 'Catch Distortion', category: 'theme', displayOrder: 14 },
  { id: 'test-accuracy', label: 'Test Accuracy', category: 'theme', displayOrder: 15 },
  { id: 'shift-lens', label: 'Shift the Lens', category: 'theme', displayOrder: 16 },
  { id: 'build-flexibility', label: 'Build Flexibility', category: 'theme', displayOrder: 17 },
  
  // Identity Integration Themes
  { id: 'define-self', label: 'Define Self', category: 'theme', displayOrder: 18 },
  { id: 'honor-both', label: 'Honor Both', category: 'theme', displayOrder: 19 },
  { id: 'align-action', label: 'Align Action', category: 'theme', displayOrder: 20 },
  { id: 'integrate-parts', label: 'Integrate Parts', category: 'theme', displayOrder: 21 },
  
  // Decision Mastery Themes
  { id: 'clarify-options', label: 'Clarify Options', category: 'theme', displayOrder: 22 },
  { id: 'weigh-cost', label: 'Weigh the Cost', category: 'theme', displayOrder: 23 },
  { id: 'commit-path', label: 'Commit to Path', category: 'theme', displayOrder: 24 },
  { id: 'course-correct', label: 'Course Correct', category: 'theme', displayOrder: 25 },
];

// ============================================================================
// LEVEL TAGS (from difficulty field on Practices)
// ============================================================================
// Only used for Practices to indicate accessibility
// Replaces difficulty labels with inclusive language

export const LEVEL_TAGS: BuzzTag[] = [
  { id: 'everyone', label: 'Everyone', category: 'level', displayOrder: 1, description: 'Accessible to all, no prior experience needed' },
  { id: 'building', label: 'Building', category: 'level', displayOrder: 2, description: 'For those with some practice under their belt' },
  { id: 'practiced', label: 'Practiced', category: 'level', displayOrder: 3, description: 'For experienced practitioners' },
];

// Mapping from old difficulty values
export const DIFFICULTY_TO_LEVEL: Record<string, string> = {
  'beginner': 'everyone',
  'intermediate': 'building',
  'advanced': 'practiced',
};

// ============================================================================
// FORMAT TAGS (content type markers)
// ============================================================================
// Optional tags that describe the format/structure of content
// Used sparingly to set expectations

export const FORMAT_TAGS: BuzzTag[] = [
  { id: 'expert-application', label: 'Expert → Application', category: 'format', displayOrder: 1, description: 'For Insights: mechanism then application pattern' },
  { id: 'step-by-step', label: 'Step by Step', category: 'format', displayOrder: 2, description: 'For Practices: sequential guided practice' },
  { id: 'deep-dive', label: 'Deep Dive', category: 'format', displayOrder: 3, description: 'For Articles: comprehensive exploration' },
  { id: 'quick-hit', label: 'Quick Hit', category: 'format', displayOrder: 4, description: 'For short content pieces' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get buzz tags for Articles
 * Shows: keywords.primary (max 3) as discovery tags
 */
export function getArticleBuzzTags(article: {
  keywords?: { primary: string[]; secondary: string[]; tertiary: string[] };
}): string[] {
  if (!article.keywords?.primary) return [];
  return article.keywords.primary.slice(0, 3);
}

/**
 * Get buzz tags for Insights
 * Shows: keywords.primary (max 3) as discovery tags
 */
export function getInsightBuzzTags(insight: {
  keywords?: { primary: string[]; secondary: string[]; tertiary: string[] };
  themeName?: string;
}): string[] {
  // Use keywords.primary for consistency across all content types
  if (insight.keywords?.primary && insight.keywords.primary.length > 0) {
    return insight.keywords.primary.slice(0, 3);
  }
  
  // Fallback to theme name if no keywords (shouldn't happen in production)
  if (insight.themeName) {
    return [insight.themeName];
  }
  
  return [];
}

/**
 * Get buzz tags for Practices
 * Shows: keywords.primary (max 3) as discovery tags
 * Note: difficulty (Everyone/Building/Practiced) is internal metadata, not a buzz tag
 */
export function getPracticeBuzzTags(practice: {
  keywords?: { primary: string[]; secondary: string[]; tertiary: string[] };
}): string[] {
  if (!practice.keywords?.primary) return [];
  return practice.keywords.primary.slice(0, 3);
}

/**
 * Format buzz tag for display
 * Handles capitalization and special cases
 */
export function formatBuzzTag(tag: string): string {
  // Check if it's a level tag
  const levelTag = LEVEL_TAGS.find(t => t.id === tag.toLowerCase() || t.label.toLowerCase() === tag.toLowerCase());
  if (levelTag) return levelTag.label;
  
  // Check if it's a theme tag
  const themeTag = THEME_TAGS.find(t => t.id === tag.toLowerCase() || t.label.toLowerCase() === tag.toLowerCase());
  if (themeTag) return themeTag.label;
  
  // Check if it's a discovery tag
  const discoveryTag = DISCOVERY_TAGS.find(t => t.id === tag.toLowerCase() || t.label.toLowerCase() === tag.toLowerCase());
  if (discoveryTag) return discoveryTag.label;
  
  // Default: capitalize first letter of each word
  return tag
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * SQL MIGRATION NOTES:
 * 
 * When migrating to SQL:
 * 1. Create buzz_tags table with all tags from this file
 * 2. Create content_buzz_tags junction table
 * 3. Run migration to populate buzz tags for existing content using the helper functions above
 * 4. Update content creation flow to tag content at creation time
 * 5. Build tag management UI for clinicians to add/remove tags
 * 
 * Example SQL schema:
 * 
 * CREATE TABLE buzz_tags (
 *   id UUID PRIMARY KEY,
 *   tag_id VARCHAR(50) UNIQUE NOT NULL,
 *   label VARCHAR(100) NOT NULL,
 *   category VARCHAR(20) NOT NULL,
 *   display_order INTEGER,
 *   description TEXT,
 *   created_at TIMESTAMP DEFAULT NOW()
 * );
 * 
 * CREATE TABLE content_buzz_tags (
 *   id UUID PRIMARY KEY,
 *   content_id VARCHAR(100) NOT NULL,
 *   content_type VARCHAR(20) NOT NULL,
 *   buzz_tag_id UUID REFERENCES buzz_tags(id),
 *   display_order INTEGER,
 *   created_at TIMESTAMP DEFAULT NOW()
 * );
 */