/**
 * Content Assembly Lab - TypeScript Definitions
 * Complete type system for all content across 6 pillars
 */

// ============================================================================
// PILLAR & SCHEMA DEFINITIONS
// ============================================================================

export type PillarId = 
  | 'emotional_regulation'
  | 'stress_resilience'
  | 'social_connectivity'
  | 'cognitive_reframing'
  | 'identity_integration'
  | 'decision_mastery';

export type PillarCode = 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM';

export interface Pillar {
  id: PillarId;
  code: PillarCode;
  name: string;
  description: string;
  color: string;
  schemas: Schema[];
}

export interface Schema {
  slug: string;
  label: string;
  pillar: PillarId;
  items: ContentItem[];
}

// ============================================================================
// CONTENT ITEM TYPES
// ============================================================================

export type ContentKind = 'pillar_practice' | 'block' | 'micro_lesson';

export type ExerciseType =
  | 'grounding'
  | 'breathwork'
  | 'journaling'
  | 'planning'
  | 'cognitive_reframe'
  | 'social_script'
  | 'values'
  | 'movement';

export type AssetType =
  | 'audio_guide'
  | 'micro_diagram'
  | 'progress_visual'
  | 'mini_animation'
  | 'hero_illustration'
  | 'checklist'
  | 'quote_card'
  | 'worksheet_pdf';

export type UIComponent =
  | 'practice_timer'
  | 'state_gate'
  | 'multi_select_tags'
  | '1_to_10_slider'
  | 'choice_map'
  | 'if_then_builder'
  | 'guided_journal'
  | 'reflection_prompt'
  | 'next_steps_cards'
  | 'save_to_toolkit_cta'
  | 'why_this_now_drawer'
  | 'timed_breathing_widget';

export type ArousalFit = 'green' | 'amber' | 'red';
export type StateBand = 'green' | 'amber' | 'red' | 'downshift_first';

// ============================================================================
// BASE CONTENT ITEM
// ============================================================================

export interface BaseContentItem {
  code: string;
  kind: ContentKind;
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

// ============================================================================
// PILLAR PRACTICE
// ============================================================================

export interface PillarPractice extends BaseContentItem {
  kind: 'pillar_practice';
  exercise_type: ExerciseType;
  duration_seconds: number;
}

// ============================================================================
// BLOCK (LONGFORM CONTENT)
// ============================================================================

export type BlockType =
  | 'hidden_mechanic'
  | 'simple_model'
  | 'real_world_reset'
  | 'why_beneath_it';

export interface Block extends BaseContentItem {
  kind: 'block';
  block_type: BlockType;
  length_target: 'ember' | 'flame' | 'fire';
  sections_required: string[];
}

// ============================================================================
// MICRO LESSON (INTERACTIVE SEQUENCE)
// ============================================================================

export interface MicroLesson extends BaseContentItem {
  kind: 'micro_lesson';
  scene_number: number;
  scene_count: number;
  interaction_types: string[];
}

// ============================================================================
// UNIFIED CONTENT ITEM
// ============================================================================

export type ContentItem = PillarPractice | Block | MicroLesson;

// ============================================================================
// TARGETING RULES
// ============================================================================

export interface TargetingRules {
  arousal_fit: ArousalFit;
  allowed_state_bands: StateBand[];
  target_pillar: PillarId;
  target_schema?: string;
}

// ============================================================================
// CONFIG JSON (PARSED)
// ============================================================================

export interface PracticeConfig {
  subtitle: string;
  context: string;
  schema: string[];
  family: string[];
  concept: string[];
  theme: string[];
  mindblocks: string[];
  exercise_type: ExerciseType;
  duration_seconds: number;
  steps_outline: string;
  ui_components: UIComponent[];
  measures: string;
}

export interface BlockConfig {
  subtitle: string;
  context: string;
  schema: string[];
  family: string[];
  concept: string[];
  theme: string[];
  mindblocks: string[];
  required_practices: string[];
  sections_required: string[];
  length_target: string;
  measures: string;
}

export interface LessonConfig {
  subtitle: string;
  context: string;
  schema: string[];
  family: string[];
  concept: string[];
  theme: string[];
  mindblocks: string[];
  required_practices: string[];
  scene_count: number;
  interaction_types: string[];
  measures: string;
}

// ============================================================================
// CONTENT REGISTRY
// ============================================================================

export interface ContentRegistry {
  pillars: Pillar[];
  practices: PillarPractice[];
  blocks: Block[];
  lessons: MicroLesson[];
  metadata: {
    total_items: number;
    last_updated: string;
    version: string;
  };
}

// ============================================================================
// STUDIO INTERFACES
// ============================================================================

export interface ContentFilter {
  pillar?: PillarId;
  schema?: string;
  kind?: ContentKind;
  search?: string;
}

export interface ContentPreview {
  item: ContentItem;
  parsed_config: PracticeConfig | BlockConfig | LessonConfig;
  parsed_targeting: TargetingRules;
  asset_list: AssetType[];
  ui_component_list: UIComponent[];
}

// ============================================================================
// EXPORT FORMATS
// ============================================================================

export interface WriterBrief {
  item_code: string;
  title: string;
  kind: ContentKind;
  pillar: string;
  schema: string;
  writer_instructions: string;
  context: string;
  people_to_reference: string[];
  practice_to_inject?: string;
  word_count_target?: number;
  sections_required?: string[];
}

export interface ExportBundle {
  pillar: PillarId;
  schema: string;
  practices: PillarPractice[];
  blocks: Block[];
  lessons: MicroLesson[];
  export_date: string;
}
