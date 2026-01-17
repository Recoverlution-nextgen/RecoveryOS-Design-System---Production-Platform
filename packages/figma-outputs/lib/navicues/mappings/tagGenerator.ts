/**
 * TAG GENERATOR
 * 
 * Auto-generates tags for NaviCues based on metadata.
 * Tags enable flexible filtering, search, and analytics.
 */

export interface NaviCueMetadata {
  family: string;
  schema?: string;
  kbe_target?: string;
  council_lens?: string;
  way_process?: string;
  heat_level?: string;
  response_type: string;
  text_line?: string;
  pillar_id?: string;
}

/**
 * Generate comprehensive tags for a NaviCue
 */
export function generateTags(metadata: NaviCueMetadata): string[] {
  const tags: string[] = [];
  
  // Family tags
  tags.push(`family_${metadata.family}`);
  
  // Schema tags
  if (metadata.schema) {
    tags.push(`schema_${metadata.schema}`);
  }
  
  // KBE tags
  if (metadata.kbe_target) {
    tags.push(`kbe_${metadata.kbe_target}`);
  }
  
  // Council tags (Batch 3)
  if (metadata.council_lens) {
    tags.push(`council_${metadata.council_lens}`);
  }
  
  // Way process tags (Batch 3)
  if (metadata.way_process) {
    tags.push(`way_${metadata.way_process}`);
  }
  
  // Heat level tags (critical for state gating)
  if (metadata.heat_level) {
    tags.push(`heat_${metadata.heat_level}`);
  }
  
  // Pillar tags
  if (metadata.pillar_id) {
    tags.push(`pillar_${metadata.pillar_id}`);
  }
  
  // Response type tags
  tags.push(`response_${metadata.response_type}`);
  
  // Modality tags (inferred from response type)
  const modalityTags = getModalityTags(metadata.response_type);
  tags.push(...modalityTags);
  
  // Duration tags (inferred from response type)
  const durationTag = getDurationTag(metadata.response_type);
  if (durationTag) {
    tags.push(durationTag);
  }
  
  // Clinical approach tags (inferred from family)
  const approachTags = getClinicalApproachTags(metadata.family);
  tags.push(...approachTags);
  
  // Content-based tags (if text_line provided)
  if (metadata.text_line) {
    const contentTags = getContentBasedTags(metadata.text_line);
    tags.push(...contentTags);
  }
  
  return [...new Set(tags)]; // Deduplicate
}

/**
 * Get modality tags based on response type
 */
function getModalityTags(responseType: string): string[] {
  const modalityMap: Record<string, string[]> = {
    voice10: ['modality_voice', 'modality_audio'],
    voice30: ['modality_voice', 'modality_audio'],
    voice60: ['modality_voice', 'modality_audio'],
    tap: ['modality_text', 'modality_cognitive'],
    binary: ['modality_text', 'modality_cognitive'],
    slider: ['modality_interactive', 'modality_reflective'],
    breath: ['modality_somatic', 'modality_body'],
  };
  
  return modalityMap[responseType] || ['modality_text'];
}

/**
 * Get duration tag based on response type
 */
function getDurationTag(responseType: string): string | null {
  const durationMap: Record<string, string> = {
    tap: 'duration_short',           // < 1 min
    binary: 'duration_short',
    slider: 'duration_medium',       // 1-3 min
    voice10: 'duration_medium',
    voice30: 'duration_long',        // 3-5 min
    voice60: 'duration_long',
    breath: 'duration_medium',
  };
  
  return durationMap[responseType] || null;
}

/**
 * Get clinical approach tags based on family
 */
function getClinicalApproachTags(family: string): string[] {
  const approachMap: Record<string, string[]> = {
    grip_scan: ['approach_somatic', 'approach_mindfulness', 'approach_body_based'],
    allowing_gate: ['approach_act', 'approach_acceptance', 'approach_defusion'],
    release_prompt: ['approach_act', 'approach_letting_go', 'approach_surrender'],
    story_drop: ['approach_cbt', 'approach_decentering', 'approach_cognitive'],
    paradox_key: ['approach_dbt', 'approach_dialectics', 'approach_integration'],
    proof_stamp: ['approach_cbt', 'approach_evidence_based', 'approach_cognitive'],
    inventory_spark: ['approach_psychodynamic', 'approach_reflection', 'approach_insight'],
    sangha_ping: ['approach_relational', 'approach_connection', 'approach_interpersonal'],
  };
  
  return approachMap[family] || [];
}

/**
 * Get content-based tags using keyword detection
 */
function getContentBasedTags(textLine: string): string[] {
  const tags: string[] = [];
  const lower = textLine.toLowerCase();
  
  // Emotion keywords
  const emotionPatterns = {
    'emotion_anger': ['anger', 'angry', 'rage', 'furious'],
    'emotion_fear': ['fear', 'afraid', 'scared', 'anxious', 'worry'],
    'emotion_sadness': ['sad', 'grief', 'loss', 'hurt'],
    'emotion_shame': ['shame', 'embarrass', 'humiliat'],
    'emotion_joy': ['joy', 'happy', 'delight', 'celebrate'],
  };
  
  for (const [tag, keywords] of Object.entries(emotionPatterns)) {
    if (keywords.some(kw => lower.includes(kw))) {
      tags.push(tag);
    }
  }
  
  // Body-based keywords
  if (/\b(body|breath|sensation|feel|notice|aware)\b/.test(lower)) {
    tags.push('content_body_based');
  }
  
  // Cognitive keywords
  if (/\b(thought|think|believe|story|mind|narrative)\b/.test(lower)) {
    tags.push('content_cognitive');
  }
  
  // Relational keywords
  if (/\b(relation|connection|other|someone|together)\b/.test(lower)) {
    tags.push('content_relational');
  }
  
  // Action-oriented
  if (/\b(do|act|try|practice|experiment)\b/.test(lower)) {
    tags.push('content_action');
  }
  
  // Reflection-oriented
  if (/\b(notice|observe|witness|aware|see)\b/.test(lower)) {
    tags.push('content_reflection');
  }
  
  // Question form
  if (lower.includes('?')) {
    tags.push('format_question');
  }
  
  // Invitation form
  if (/\b(what if|can you|try|imagine)\b/.test(lower)) {
    tags.push('format_invitation');
  }
  
  // Statement form
  if (!lower.includes('?') && !lower.includes('try') && !lower.includes('can you')) {
    tags.push('format_statement');
  }
  
  return tags;
}

/**
 * Council-specific tags (Batch 3)
 */
export const COUNCIL_LENS_TAGS = {
  mate: ['wisdom_mate', 'lens_trauma', 'lens_compassion', 'lens_developmental'],
  billw: ['wisdom_billw', 'lens_recovery', 'lens_surrender', 'lens_spiritual'],
  watts: ['wisdom_watts', 'lens_paradox', 'lens_eastern', 'lens_nondual'],
  ramdass: ['wisdom_ramdass', 'lens_loving_awareness', 'lens_presence', 'lens_devotional'],
  master_therapists: ['wisdom_therapists', 'lens_clinical', 'lens_relational', 'lens_integrative'],
  hawkins: ['wisdom_hawkins', 'lens_consciousness', 'lens_letting_go', 'lens_calibration'],
};

/**
 * Way process tags (Batch 3)
 */
export const WAY_PROCESS_TAGS = {
  see_clearly: ['way_perception', 'way_awareness', 'way_insight'],
  feel_honestly: ['way_emotion', 'way_somatic', 'way_body'],
  release: ['way_letting_go', 'way_surrender', 'way_freedom'],
  trust_unfolding: ['way_faith', 'way_process', 'way_patience'],
  choose_response: ['way_agency', 'way_choice', 'way_empowerment'],
  embody_truth: ['way_integration', 'way_living', 'way_embodiment'],
};

/**
 * Generate council-specific tags
 */
export function getCouncilTags(councilLens?: string): string[] {
  if (!councilLens) return [];
  return COUNCIL_LENS_TAGS[councilLens as keyof typeof COUNCIL_LENS_TAGS] || [];
}

/**
 * Generate way process tags
 */
export function getWayProcessTags(wayProcess?: string): string[] {
  if (!wayProcess) return [];
  return WAY_PROCESS_TAGS[wayProcess as keyof typeof WAY_PROCESS_TAGS] || [];
}

/**
 * Complete tag generation with all enhancements
 */
export function generateEnhancedTags(metadata: NaviCueMetadata): string[] {
  const baseTags = generateTags(metadata);
  const councilTags = getCouncilTags(metadata.council_lens);
  const wayTags = getWayProcessTags(metadata.way_process);
  
  return [...new Set([...baseTags, ...councilTags, ...wayTags])];
}

/**
 * Tag search/filter helper
 */
export function matchesTags(
  navicueTags: string[],
  requiredTags?: string[],
  excludedTags?: string[]
): boolean {
  // Must have all required tags
  if (requiredTags && requiredTags.length > 0) {
    if (!requiredTags.every(tag => navicueTags.includes(tag))) {
      return false;
    }
  }
  
  // Must not have any excluded tags
  if (excludedTags && excludedTags.length > 0) {
    if (excludedTags.some(tag => navicueTags.includes(tag))) {
      return false;
    }
  }
  
  return true;
}
