// WELLBEING TYPES
// Premium videos (yoga, meditation, breathwork)

import type { StateBand } from './state';

export type VideoCategory = 'yoga' | 'meditation' | 'breathwork' | 'body_scan' | 'movement';
export type VideoIntensity = 'gentle' | 'moderate' | 'vigorous';

export interface WellbeingVideo {
  id: string;
  title: string;
  instructor: string;
  
  // Video
  video_url: string;
  thumbnail_url: string;
  duration_minutes: number;
  
  // Classification
  category: VideoCategory;
  intensity: VideoIntensity;
  
  // Schema Mapping
  schema_targets: string[];
  state_band_allowed: StateBand[];
  
  // Body Focus
  body_systems: string[]; // ['nervous_system', 'muscular', 'respiratory']
  
  // Contract
  response_contract: {
    type: 'video_completion';
    exit_questions: string[];
  };
  
  // Connections
  related_practices: string[];
  playlist_tags: string[];
  
  // Metadata
  created_at: string;
  status: 'draft' | 'published' | 'archived';
}

// Video Completion
export interface VideoCompletion {
  video_id: string;
  user_id: string;
  percent_watched: number;
  completed: boolean;
  exit_responses: Record<string, string>;
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
