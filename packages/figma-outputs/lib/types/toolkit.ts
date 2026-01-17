// TOOLKIT TYPES
// Articles, Insights (Mind Steps), Practices

import type { PillarId, KBELayer, StateBand } from './navicues/types';

// ARTICLE
export interface Article {
  id: string;
  title: string;
  subtitle: string;
  pillar_id: PillarId;
  theme_id: string;
  
  // Content
  body: string; // Markdown
  reading_time_minutes: number;
  hook: string; // 50-word teaser for cards
  
  // Schema Mapping
  schema_targets: string[];
  mindblock_targets: string[];
  
  // Clinical
  kbe_layer: KBELayer;
  evidence_level: 'research' | 'clinical' | 'experiential';
  
  // Engagement Contract
  response_contract: {
    entry_cue: string;
    exit_receipt: string;
    proof_capture_mode: 'receipt' | 'micro_proof';
  };
  
  // Connections
  related_practices: string[];
  related_insights: string[];
  next_article: string | null;
  
  // Metadata
  author: string;
  created_at: string;
  status: 'draft' | 'published' | 'archived';
}

// INSIGHT (Mind Step)
export interface Insight {
  id: string;
  title: string;
  body: string; // 150-300 words
  pillar_id: PillarId;
  
  // The "Aha!" Moment
  core_truth: string; // One-sentence distillation
  
  // Schema Mapping
  schema_targets: string[];
  mindblock_targets: string[];
  
  // Delivery Variants
  variants: {
    card: string; // 50-word hook
    full: string; // 300-word expansion
    voice_script: string; // LUMA voice delivery
  };
  
  // Contract
  response_contract: {
    type: 'slider' | 'binary';
    prompt: string;
  };
  
  // Connections
  related_articles: string[];
  related_practices: string[];
  
  created_at: string;
  status: 'draft' | 'published' | 'archived';
}

// PRACTICE
export type PracticeModality = 'breathing' | 'movement' | 'reflection' | 'sensory' | 'grounding';

export interface PracticeStep {
  step_number: number;
  instruction: string;
  duration_seconds?: number;
  voice_guidance?: string;
}

export interface Practice {
  id: string;
  title: string;
  subtitle: string;
  pillar_id: PillarId;
  
  // Practice Details
  duration_minutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modality: PracticeModality;
  
  // Instructions
  intro: string;
  steps: PracticeStep[];
  
  // Schema Mapping
  schema_targets: string[];
  state_band_allowed: StateBand[];
  
  // Completion Contract
  response_contract: {
    completion_check: boolean;
    exit_questions: string[];
    proof_capture_mode: 'practice_completion';
  };
  
  // Connections
  related_articles: string[];
  related_insights: string[];
  
  created_at: string;
  status: 'draft' | 'published' | 'archived';
}

// Reading Progress
export interface ReadingProgress {
  article_id: string;
  user_id: string;
  percent_read: number;
  last_position: number; // Scroll position
  completed: boolean;
  started_at: string;
  completed_at?: string;
}

// Practice Completion
export interface PracticeCompletion {
  practice_id: string;
  user_id: string;
  completed: boolean;
  duration_actual_minutes: number;
  exit_responses: Record<string, any>;
  state_before?: {
    tempo: number;
    flow: number;
    sync: number;
  };
  state_after?: {
    tempo: number;
    flow: number;
    sync: number;
  };
  completed_at: string;
}

// Insight Response
export interface InsightResponse {
  insight_id: string;
  user_id: string;
  resonance_score: number; // 0-100 if slider, 0 or 100 if binary
  response_type: 'slider' | 'binary';
  responded_at: string;
}
