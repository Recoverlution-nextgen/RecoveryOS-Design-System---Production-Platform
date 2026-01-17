/**
 * CONTENT TYPE SCHEMAS
 * 
 * Unified types for all platform content that NaviCues can link to:
 * - Articles (Mind Steps / Knowledge Base)
 * - Practices (Guided Exercises)
 * - Insights (Multi-Section Therapeutic Content)
 * - Wellbeing Videos (Body-Based Content)
 * - State Check-Ins (Energy · Clarity · Connection)
 * - Stories (Narrative Collection)
 * 
 * Created: December 30, 2024
 */

import { PillarId } from '../navicues/types';

// ============================================================================
// ARTICLES (Mind Steps / Knowledge Base)
// ============================================================================

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  pillar: PillarId;
  category: 'foundation' | 'deep-dive' | 'skill';
  readTime: number; // minutes
  wordCount: number;
  heroAsset: string; // 4:5 ratio image
  
  // Content structure
  hook: string; // Opening paragraph (1-2 sentences)
  sections: ArticleSection[];
  
  // Metadata
  tags: string[];
  relatedArticles: string[];
  relatedPractices: string[];
  datePublished: string;
  author?: string;
}

export interface ArticleSection {
  title: string;
  content: string; // Markdown or rich text
  assetUrl?: string;
  callout?: {
    type: 'insight' | 'practice' | 'example' | 'warning';
    content: string;
  };
}

// ============================================================================
// PRACTICES (Guided Exercises)
// ============================================================================

export interface Practice {
  id: string;
  title: string;
  subtitle: string;
  pillar: PillarId;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  heroAsset: string;
  
  // Practice structure
  introduction: string;
  steps: PracticeStep[];
  
  // The Science (what's happening in your brain)
  scienceExplanation: string;
  
  // When To Use
  whenToUse: string[];
  
  // Metadata
  tags: string[];
  relatedPractices: string[];
  equipment?: string[]; // e.g., ["mat", "cushion"]
}

export interface PracticeStep {
  title: string;
  instruction: string;
  duration?: number; // seconds (optional timer)
  image?: string;
  breathCue?: {
    inhale?: number;
    hold?: number;
    exhale?: number;
  };
}

// ============================================================================
// INSIGHTS (Multi-Section Therapeutic Content)
// ============================================================================

export interface Insight {
  id: string;
  title: string;
  subtitle: string;
  pillar: PillarId;
  readTime: number; // 5-10 minutes
  themeAssetUrl: string;
  
  // Content structure
  hook: string;
  mechanismExplanation: string; // "How this works"
  applicationGuidance: string; // "How to use this"
  
  // Interactive checkpoints
  checkpoints: InsightCheckpoint[];
  
  // Metadata
  tags: string[];
  relatedInsights: string[];
  relatedPractices: string[];
}

export interface InsightCheckpoint {
  type: 'before' | 'comprehension' | 'intent' | 'after';
  question: string;
  options: string[];
  responseType: 'binary' | 'slider' | 'voice' | 'text';
}

// ============================================================================
// WELLBEING VIDEOS (Body-Based Content)
// ============================================================================

export interface WellbeingVideo {
  id: string;
  title: string;
  category: 'yoga' | 'fitness' | 'nutrition' | 'breathwork' | 'meditation';
  topic: 'movement' | 'breathwork' | 'nutrition' | 'meditation';
  duration: string; // "20 min"
  durationMinutes: number;
  
  // Video
  jwPlayerUrl: string; // JW Player embed URL
  thumbnailUrl: string;
  
  // Content
  description: string; // Short (1 sentence)
  longDescription: string; // Full paragraph
  
  // Metadata
  pillarTags: PillarId[];
  instructor?: string;
  intensity?: 'gentle' | 'moderate' | 'vigorous';
  bestTime?: 'morning' | 'midday' | 'evening' | 'anytime';
  tags: string[];
  relatedVideos: string[];
}

// ============================================================================
// STATE CHECK-INS (Energy · Clarity · Connection)
// ============================================================================

export interface StateCheckIn {
  id: string;
  userId: string;
  timestamp: string;
  
  // The 3 dimensions (0-100)
  tempo: number; // Physical energy
  flow: number; // Mental clarity
  sync: number; // Emotional connection
  
  // Computed
  composite: number; // Average of 3
  
  // Optional context
  context?: string;
  tags?: string[];
  location?: string;
  mood?: string;
}

export interface StateTrend {
  userId: string;
  timeframe: '7d' | '30d' | '90d';
  data: Array<{
    date: string;
    tempo: number;
    flow: number;
    sync: number;
    composite: number;
  }>;
  averages: {
    tempo: number;
    flow: number;
    sync: number;
    composite: number;
  };
}

// ============================================================================
// STORIES (Narrative Collection)
// ============================================================================

export interface Story {
  id: string;
  userId: string;
  title: string;
  prompt: string; // The question/prompt that elicited this story
  
  // User response
  response: {
    type: 'text' | 'voice';
    content: string; // Text content or audio URL
    duration?: number; // For voice recordings (seconds)
    transcript?: string; // Auto-generated transcript for voice
  };
  
  // Metadata
  pillar: PillarId;
  tags: string[];
  createdAt: string;
  isPrivate: boolean;
  linkedStories?: string[]; // IDs of related stories
}

export interface StoryPrompt {
  id: string;
  text: string;
  category: 'origin' | 'pattern' | 'turning_point' | 'present' | 'future';
  pillar: PillarId;
  suggestedResponseType: 'voice' | 'text';
}

// ============================================================================
// CONTENT TYPE UNIONS
// ============================================================================

export type ContentType = 'article' | 'practice' | 'insight' | 'video' | 'state' | 'story';

export type Content = Article | Practice | Insight | WellbeingVideo | StateCheckIn | Story;

// ============================================================================
// PRESENTATION MODES
// ============================================================================

export type PresentationMode = 'inline' | 'modal' | 'fullscreen' | 'embedded';

// ============================================================================
// NAVICUE CONTENT LINKING
// ============================================================================

export interface NaviCueContentLink {
  content_type: ContentType;
  content_id: string;
  presentation_mode: PresentationMode;
  is_portal: boolean; // True if NaviCue opens content vs completing inline
  preview_data?: {
    title?: string;
    description?: string;
    thumbnailUrl?: string;
    duration?: number;
  };
}

// ============================================================================
// CONTENT LIBRARY FILTERS
// ============================================================================

export interface ContentFilters {
  pillar?: PillarId | PillarId[];
  tags?: string[];
  difficulty?: string[];
  duration?: {
    min?: number;
    max?: number;
  };
  category?: string[];
}
