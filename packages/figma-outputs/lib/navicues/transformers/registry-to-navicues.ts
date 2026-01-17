/**
 * REGISTRY TO NAVICUES TRANSFORMER
 * 
 * Converts the NaviCueArsenalBrowser registry (74 component entries)
 * into proper NaviCue data objects ready for Universal Player.
 * 
 * Strategy:
 * 1. Import registry metadata (id, name, description, philosophy)
 * 2. Apply inference rules to fill missing fields
 * 3. Export as complete NaviCue objects
 */

import { NaviCue, PillarId, ResponseType, VoiceArchetypeName } from '../types';

// ============================================================================
// REGISTRY ENTRY TYPE (from NaviCueArsenalBrowser)
// ============================================================================

interface RegistryEntry {
  id: string;
  name: string;
  track: 'clinical' | 'guru' | 'infinite';
  category: string;
  description: string;
  philosophy?: string;
}

// ============================================================================
// INFERENCE RULES
// ============================================================================

/**
 * Infer pillar from category, description, and philosophy
 */
function inferPillar(entry: RegistryEntry): { pillar_id: PillarId; pillar_name: string; pillar_color: string } {
  const text = `${entry.category} ${entry.description} ${entry.philosophy || ''}`.toLowerCase();
  
  // ER - Emotional Regulation
  if (text.match(/breath|arousal|vagal|emotion|grounding|regulation|window of tolerance|polyvagal|calm/)) {
    return { pillar_id: 'ER', pillar_name: 'Emotional Regulation', pillar_color: '#EF4444' };
  }
  
  // SR - Schema Revision  
  if (text.match(/pattern|habit|control|belief|backwards law|resistance|effort|trying/)) {
    return { pillar_id: 'SR', pillar_name: 'Schema Revision', pillar_color: '#3B82F6' };
  }
  
  // SC - Self Compassion
  if (text.match(/compassion|suffering|pain|resistance|validation|acceptance|fierce grace/)) {
    return { pillar_id: 'SC', pillar_name: 'Self Compassion', pillar_color: '#10B981' };
  }
  
  // CR - Cognitive Reframing
  if (text.match(/reframe|perspective|paradox|duality|superposition|probability/)) {
    return { pillar_id: 'CR', pillar_name: 'Cognitive Reframing', pillar_color: '#F59E0B' };
  }
  
  // II - Integrated Identity
  if (text.match(/identity|witness|ego|soul|self|role|observer|awareness of awareness|being|who/)) {
    return { pillar_id: 'II', pillar_name: 'Integrated Identity', pillar_color: '#9333EA' };
  }
  
  // DM - Developing Meaning
  if (text.match(/meaning|purpose|void|existence|now|eternal|present moment/)) {
    return { pillar_id: 'DM', pillar_name: 'Developing Meaning', pillar_color: '#EC4899' };
  }
  
  // Default to most common pillar for track
  if (entry.track === 'clinical') {
    return { pillar_id: 'ER', pillar_name: 'Emotional Regulation', pillar_color: '#EF4444' };
  }
  if (entry.track === 'guru') {
    return { pillar_id: 'II', pillar_name: 'Integrated Identity', pillar_color: '#9333EA' };
  }
  return { pillar_id: 'CR', pillar_name: 'Cognitive Reframing', pillar_color: '#F59E0B' };
}

/**
 * Infer response type from description and name
 */
function inferResponseType(entry: RegistryEntry): ResponseType {
  const text = `${entry.name} ${entry.description}`.toLowerCase();
  
  if (text.match(/breath|count|inhale|exhale|breathing/)) return 'breath';
  if (text.match(/slider|spectrum|scale|adjust|tune/)) return 'slider';
  if (text.match(/yes\/no|true\/false|or|toggle|switch/)) return 'binary';
  if (text.match(/map|window|zones|position/)) return 'spectrum';
  if (text.match(/hold|duration|stay|sustain/)) return 'hold';
  if (text.match(/name|identify|label|word/)) return 'one_word';
  if (text.match(/tap|press|button|click|anchor/)) return 'tap';
  
  // Default: tap for most wisdom/practice
  return 'tap';
}

/**
 * Infer NaviCue family from content type
 */
function inferFamily(entry: RegistryEntry): NaviCue['family'] {
  const text = `${entry.name} ${entry.description} ${entry.philosophy || ''}`.toLowerCase();
  
  if (text.match(/paradox|contradiction|backwards|duality/)) return 'paradox_prompt';
  if (text.match(/identity|ego|soul|self|who|role|observer/)) return 'identity_koan';
  if (text.match(/reframe|shift|perspective|new truth/)) return 'reframe_seed';
  if (text.match(/practice|exercise|technique|ritual/)) return 'practice';
  if (text.match(/question|probe|assess|detect|measure/)) return 'belief_probe';
  
  // Default based on track
  if (entry.track === 'clinical') return 'practice';
  if (entry.track === 'guru') return 'identity_koan';
  return 'paradox_prompt';
}

/**
 * Infer KBE target from track and content
 */
function inferKBETarget(entry: RegistryEntry): 'knowing' | 'believing' | 'embodying' {
  const text = `${entry.description}`.toLowerCase();
  
  if (text.match(/baseline|measure|assess|detect|recognize|map|identify/)) return 'knowing';
  if (text.match(/shift|reframe|perspective|realize|understand|accept/)) return 'believing';
  if (text.match(/practice|exercise|technique|anchor|integrate|embody/)) return 'embodying';
  
  // Default: believing for wisdom, knowing for clinical assessment
  if (entry.track === 'clinical') return 'knowing';
  return 'believing';
}

/**
 * Infer voice archetype from category
 */
function inferVoiceArchetype(entry: RegistryEntry): VoiceArchetypeName | undefined {
  if (entry.category === 'Ram Dass') return 'mystic';
  if (entry.category === 'Alan Watts') return 'philosopher';
  if (entry.category === 'Quantum') return 'scientist';
  if (entry.category === 'Music') return 'artist';
  return undefined;
}

/**
 * Generate concept and theme from philosophy/description
 */
function inferTaxonomy(entry: RegistryEntry): { concept_name: string; theme_name: string } {
  // Extract key concepts from philosophy or description
  const source = entry.philosophy || entry.description;
  
  // Simple extraction: use first meaningful phrase
  const concept = source.split(/[.,;]/)[0].trim();
  const theme = entry.name;
  
  return {
    concept_name: concept.charAt(0).toUpperCase() + concept.slice(1),
    theme_name: theme
  };
}

/**
 * Assign difficulty based on philosophy depth
 */
function inferDifficulty(entry: RegistryEntry): number {
  const text = `${entry.description} ${entry.philosophy || ''}`;
  
  // Simple heuristics
  if (text.match(/paradox|infinite|meta|recursive|consciousness/)) return 5;
  if (text.match(/identity|ego|soul|witness/)) return 4;
  if (text.match(/shift|reframe|perspective/)) return 3;
  if (text.match(/practice|exercise|technique/)) return 2;
  return 1;
}

/**
 * Generate tags from text
 */
function generateTags(entry: RegistryEntry): string[] {
  const tags: string[] = [];
  
  // Add category as tag
  tags.push(entry.category.toLowerCase().replace(/\s+/g, '-'));
  
  // Extract key words from description
  const words = entry.description.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 4);
  
  // Take first 3-4 meaningful words
  tags.push(...words.slice(0, 3));
  
  return [...new Set(tags)]; // Remove duplicates
}

// ============================================================================
// TRANSFORMER FUNCTION
// ============================================================================

/**
 * Transform registry entry to complete NaviCue object
 */
export function transformRegistryEntry(entry: RegistryEntry): NaviCue {
  const pillar = inferPillar(entry);
  const { concept_name, theme_name } = inferTaxonomy(entry);
  const voiceArchetype = inferVoiceArchetype(entry);
  
  // Generate clean ID
  const idPrefix = entry.track === 'clinical' ? 'NC-CL' :
                   entry.track === 'guru' ? 'NC-GU' :
                   'NC-IN';
  const idNum = entry.id.replace(/[^\d]/g, '').padStart(3, '0');
  const cleanId = `${idPrefix}-${idNum}`;
  
  return {
    id: cleanId,
    name: entry.name,
    family: inferFamily(entry),
    modality: 'text', // Most are text-based
    text_line: entry.description, // Use description as the prompt
    pillar_id: pillar.pillar_id,
    pillar_name: pillar.pillar_name,
    pillar_color: pillar.pillar_color,
    concept_name,
    theme_name,
    response_type: inferResponseType(entry),
    kbe_target: inferKBETarget(entry),
    tags: generateTags(entry),
    difficulty: inferDifficulty(entry),
    duration_minutes: 2, // Default 2 min
    voice_archetype: voiceArchetype,
  };
}

/**
 * Transform multiple entries
 */
export function transformRegistryToNaviCues(entries: RegistryEntry[]): NaviCue[] {
  return entries.map(transformRegistryEntry);
}
