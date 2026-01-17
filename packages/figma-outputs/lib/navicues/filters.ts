/**
 * NAVICUE FILTER COMPOSITION
 * Multi-dimensional filtering logic for NaviCue arsenal
 */

import { NaviCue, NaviCueFilters, PillarId, ResponseType, Modality, KBELayer, SparkFamily } from './types';

// ============================================================================
// FILTER FUNCTIONS
// ============================================================================

export function applyFilters(navicues: NaviCue[], filters: NaviCueFilters): NaviCue[] {
  let filtered = [...navicues];

  // Pillar filter
  if (filters.pillar) {
    const pillars = Array.isArray(filters.pillar) ? filters.pillar : [filters.pillar];
    filtered = filtered.filter(nc => pillars.includes(nc.pillar_id));
  }

  // Concept filter
  if (filters.concept) {
    const concepts = Array.isArray(filters.concept) ? filters.concept : [filters.concept];
    filtered = filtered.filter(nc => nc.concept_id && concepts.includes(nc.concept_id));
  }

  // Theme filter
  if (filters.theme) {
    const themes = Array.isArray(filters.theme) ? filters.theme : [filters.theme];
    filtered = filtered.filter(nc => nc.theme_id && themes.includes(nc.theme_id));
  }

  // Tags filter (match ANY tag)
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(nc => 
      nc.tags && nc.tags.some(tag => filters.tags!.includes(tag))
    );
  }

  // Response types filter
  if (filters.responseTypes && filters.responseTypes.length > 0) {
    filtered = filtered.filter(nc => filters.responseTypes!.includes(nc.response_type));
  }

  // Modalities filter
  if (filters.modalities && filters.modalities.length > 0) {
    filtered = filtered.filter(nc => filters.modalities!.includes(nc.modality));
  }

  // Difficulty filter
  if (filters.difficulty) {
    const difficulties = Array.isArray(filters.difficulty) ? filters.difficulty : [filters.difficulty];
    filtered = filtered.filter(nc => nc.difficulty && difficulties.includes(nc.difficulty));
  }

  // Duration filter
  if (filters.durationMinutes) {
    const durations = Array.isArray(filters.durationMinutes) ? filters.durationMinutes : [filters.durationMinutes];
    filtered = filtered.filter(nc => nc.duration_minutes && durations.includes(nc.duration_minutes));
  }

  // KBE Layer filter
  if (filters.kbeLayer) {
    const layers = Array.isArray(filters.kbeLayer) ? filters.kbeLayer : [filters.kbeLayer];
    filtered = filtered.filter(nc => layers.includes(nc.kbe_target));
  }

  // Family filter
  if (filters.family) {
    const families = Array.isArray(filters.family) ? filters.family : [filters.family];
    filtered = filtered.filter(nc => families.includes(nc.family));
  }

  // Schema filter
  if (filters.schema) {
    const schemas = Array.isArray(filters.schema) ? filters.schema : [filters.schema];
    filtered = filtered.filter(nc => nc.schema && schemas.includes(nc.schema));
  }

  // Track filter
  if (filters.track) {
    const tracks = Array.isArray(filters.track) ? filters.track : [filters.track];
    filtered = filtered.filter(nc => nc.track && tracks.includes(nc.track));
  }

  // Voice archetype filter
  if (filters.voiceArchetype) {
    const voices = Array.isArray(filters.voiceArchetype) ? filters.voiceArchetype : [filters.voiceArchetype];
    filtered = filtered.filter(nc => nc.voice_archetype && voices.includes(nc.voice_archetype));
  }

  // Exclude IDs filter
  if (filters.excludeIds && filters.excludeIds.length > 0) {
    filtered = filtered.filter(nc => !filters.excludeIds!.includes(nc.id));
  }

  return filtered;
}

// ============================================================================
// FILTER BUILDERS
// ============================================================================

export class FilterBuilder {
  private filters: NaviCueFilters = {};

  pillar(pillar: PillarId | PillarId[]): FilterBuilder {
    this.filters.pillar = pillar;
    return this;
  }

  concept(concept: string | string[]): FilterBuilder {
    this.filters.concept = concept;
    return this;
  }

  theme(theme: string | string[]): FilterBuilder {
    this.filters.theme = theme;
    return this;
  }

  tags(tags: string[]): FilterBuilder {
    this.filters.tags = tags;
    return this;
  }

  responseTypes(types: ResponseType[]): FilterBuilder {
    this.filters.responseTypes = types;
    return this;
  }

  modalities(modalities: Modality[]): FilterBuilder {
    this.filters.modalities = modalities;
    return this;
  }

  difficulty(difficulty: number | number[]): FilterBuilder {
    this.filters.difficulty = difficulty;
    return this;
  }

  duration(minutes: number | number[]): FilterBuilder {
    this.filters.durationMinutes = minutes;
    return this;
  }

  kbeLayer(layer: KBELayer | KBELayer[]): FilterBuilder {
    this.filters.kbeLayer = layer;
    return this;
  }

  family(family: SparkFamily | SparkFamily[]): FilterBuilder {
    this.filters.family = family;
    return this;
  }

  schema(schema: string | string[]): FilterBuilder {
    this.filters.schema = schema;
    return this;
  }

  track(track: string | string[]): FilterBuilder {
    this.filters.track = track;
    return this;
  }

  voiceArchetype(voice: string | string[]): FilterBuilder {
    this.filters.voiceArchetype = voice;
    return this;
  }

  exclude(ids: string[]): FilterBuilder {
    this.filters.excludeIds = ids;
    return this;
  }

  build(): NaviCueFilters {
    return this.filters;
  }
}

// ============================================================================
// SORTING FUNCTIONS
// ============================================================================

export type SortField = 'difficulty' | 'duration' | 'pillar' | 'response_type' | 'created_at' | 'name';
export type SortDirection = 'asc' | 'desc';

export function sortNaviCues(
  navicues: NaviCue[], 
  field: SortField, 
  direction: SortDirection = 'asc'
): NaviCue[] {
  const sorted = [...navicues].sort((a, b) => {
    let aVal: any;
    let bVal: any;

    switch (field) {
      case 'difficulty':
        aVal = a.difficulty || 0;
        bVal = b.difficulty || 0;
        break;
      case 'duration':
        aVal = a.duration_minutes || 0;
        bVal = b.duration_minutes || 0;
        break;
      case 'pillar':
        aVal = a.pillar_id;
        bVal = b.pillar_id;
        break;
      case 'response_type':
        aVal = a.response_type;
        bVal = b.response_type;
        break;
      case 'created_at':
        aVal = a.created_at || '';
        bVal = b.created_at || '';
        break;
      case 'name':
        aVal = a.name || a.id;
        bVal = b.name || b.id;
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function shuffleNaviCues(navicues: NaviCue[]): NaviCue[] {
  const shuffled = [...navicues];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function groupByPillar(navicues: NaviCue[]): Record<PillarId, NaviCue[]> {
  const grouped: Record<string, NaviCue[]> = {
    ER: [],
    SR: [],
    SC: [],
    CR: [],
    II: [],
    DM: []
  };

  navicues.forEach(nc => {
    if (grouped[nc.pillar_id]) {
      grouped[nc.pillar_id].push(nc);
    }
  });

  return grouped as Record<PillarId, NaviCue[]>;
}

export function groupByResponseType(navicues: NaviCue[]): Record<ResponseType, NaviCue[]> {
  const grouped: Partial<Record<ResponseType, NaviCue[]>> = {};

  navicues.forEach(nc => {
    if (!grouped[nc.response_type]) {
      grouped[nc.response_type] = [];
    }
    grouped[nc.response_type]!.push(nc);
  });

  return grouped as Record<ResponseType, NaviCue[]>;
}

export function getFilteredCount(navicues: NaviCue[], filters: NaviCueFilters): number {
  return applyFilters(navicues, filters).length;
}

export function getAvailableTags(navicues: NaviCue[]): string[] {
  const tags = new Set<string>();
  navicues.forEach(nc => {
    nc.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getAvailableResponseTypes(navicues: NaviCue[]): ResponseType[] {
  const types = new Set<ResponseType>();
  navicues.forEach(nc => types.add(nc.response_type));
  return Array.from(types).sort();
}