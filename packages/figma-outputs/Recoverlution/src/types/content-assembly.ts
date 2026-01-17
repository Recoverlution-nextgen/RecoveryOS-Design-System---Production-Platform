/**
 * CONTENT ASSEMBLY TYPE SYSTEM
 * 
 * Production TypeScript contracts for the complete 6-pillar content model:
 * - pillar_practice (PR-XX-###): Micro-practices (60-300 seconds)
 * - block (BL-XX-###): Longform guides (1000+ words)
 * - micro_lesson (IN-XX-###): Interactive sequences (7 scenes)
 * 
 * All content shares unified metadata, targeting, and measurement systems.
 */

// ==================== CORE ENUMS ====================

export type PillarId = 
  | 'emotional_regulation'
  | 'stress_resilience'
  | 'social_connectivity'
  | 'cognitive_reframing'
  | 'identity_integration'
  | 'decision_mastery';

export type ContentKind = 'pillar_practice' | 'block' | 'micro_lesson';

export type ExerciseType =
  | 'grounding'
  | 'breathwork'
  | 'journaling'
  | 'planning'
  | 'cognitive_reframe'
  | 'movement'
  | 'social_script'
  | 'values';

export type ArousalFit = 'green' | 'amber' | 'red';
export type StateBand = 'green' | 'amber' | 'red' | 'downshift_first';

// ==================== SHARED STRUCTURES ====================

export interface TargetingRules {
  arousal_fit: ArousalFit;
  allowed_state_bands: StateBand[];
  target_pillar: PillarId;
  target_schema?: string;
}

export interface ConfigJson {
  subtitle: string;
  context: string;
  schema: string[];
  family: string[];
  concept: string[];
  theme: string[];
  mindblocks: string[];
  exercise_type?: ExerciseType;
  duration_seconds?: number;
  required_practices?: string[];
  sections_required?: string[];
  length_target?: string;
  scene_count?: number;
  interaction_types?: string[];
  steps_outline?: string;
  ui_components: string[];
  measures: string;
}

// ==================== PILLAR PRACTICE ====================

export interface PillarPractice {
  code: string; // PR-XX-###
  kind: 'pillar_practice';
  pillar_id: PillarId;
  schema_slugs: string; // Pipe-separated
  family_tags: string; // Pipe-separated
  concept_tags: string;
  theme_tags: string;
  mindblock_tags: string;
  title: string;
  subheadline: string;
  context: string;
  people_refs: string; // Pipe-separated (e.g., "Stephen Porges|Deb Dana")
  practice_injections: string; // Empty for practices themselves
  assets: string; // Pipe-separated
  ai_writer_brief: string;
  front_end_brief: string;
  ui_components: string; // Pipe-separated
  measurability: string; // Pipe-separated
  targeting_rules: string; // JSON stringified
  config_json: string; // JSON stringified
}

// ==================== BLOCK ====================

export interface Block {
  code: string; // BL-XX-###
  kind: 'block';
  pillar_id: PillarId;
  schema_slugs: string;
  family_tags: string;
  concept_tags: string;
  theme_tags: string;
  mindblock_tags: string;
  title: string;
  subheadline: string;
  context: string;
  people_refs: string;
  practice_injections: string; // References PR-XX-### codes
  assets: string;
  ai_writer_brief: string;
  front_end_brief: string;
  ui_components: string;
  measurability: string;
  targeting_rules: string;
  config_json: string;
}

// ==================== MICRO LESSON ====================

export interface MicroLesson {
  code: string; // IN-XX-###
  kind: 'micro_lesson';
  pillar_id: PillarId;
  schema_slugs: string;
  family_tags: string;
  concept_tags: string;
  theme_tags: string;
  mindblock_tags: string;
  title: string;
  subheadline: string;
  context: string;
  people_refs: string;
  practice_injections: string;
  assets: string;
  ai_writer_brief: string;
  front_end_brief: string;
  ui_components: string;
  measurability: string;
  targeting_rules: string;
  config_json: string;
}

// ==================== UNION TYPE ====================

export type ContentItem = PillarPractice | Block | MicroLesson;

// ==================== SCHEMA STRUCTURE ====================

export interface SchemaItems {
  label: string;
  items: ContentItem[];
}

export interface PillarSchema {
  [schemaSlug: string]: SchemaItems;
}

export interface PillarData {
  pillar_name: string;
  schemas: PillarSchema;
}

export interface ContentDatabase {
  pillars: {
    [pillarId in PillarId]: PillarData;
  };
}

// ==================== HELPER TYPES ====================

export interface ParsedConfig {
  subtitle?: string;
  context?: string;
  schema?: string[];
  family?: string[];
  concept?: string[];
  theme?: string[];
  mindblocks?: string[];
  exercise_type?: ExerciseType;
  duration_seconds?: number;
  required_practices?: string[];
  ui_components?: string[];
  measures?: string;
  sections_required?: string[];
  scene_count?: number;
}

export interface ParsedTargeting {
  arousal_fit?: ArousalFit;
  allowed_state_bands?: StateBand[];
  target_pillar?: PillarId;
  target_schema?: string;
}

// ==================== FILTER/SEARCH ====================

export interface ContentFilters {
  pillar?: PillarId;
  schema?: string;
  kind?: ContentKind;
  family?: string;
  concept?: string;
  theme?: string;
  mindblock?: string;
  searchTerm?: string;
}

export interface ContentStats {
  total_items: number;
  by_kind: {
    pillar_practice: number;
    block: number;
    micro_lesson: number;
  };
  by_pillar: {
    [key in PillarId]: number;
  };
  total_schemas: number;
}
