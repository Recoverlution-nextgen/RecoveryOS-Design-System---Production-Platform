import governanceData from './asset-governance.json';
import type { Asset } from '../lib/supabase';

// Type definitions from asset governance schema
export type AssetClass = 'atmosphere' | 'hero' | 'system' | 'icon' | 'proof';
export type Room = 'journeys' | 'navicues' | 'toolkit' | 'wellbeing' | 'state' | 'library' | 'dashboard';
export type ProofFit = 'receipt_ready' | 'pre' | 'post' | 'micro_win' | 'checklist' | 'before_after';
export type HeatBand = 'amber' | 'green' | 'purple';
export type Dose = 'glance' | 'seed' | 'focus';

export interface PillarDefinition {
  id: string;
  labels: string[];
}

export interface ConceptDefinition {
  id: string;
  labels: string[];
}

export interface ThemeDefinition {
  id: string;
  labels: string[];
}

export interface SchemaDefinition {
  id: string;
  labels: string[];
}

export interface PlacementRule {
  match: {
    route_contains?: string;
    component_matches?: string;
  };
  usage_tags_add?: string[];
  asset_class?: AssetClass;
  schema_id?: string;
}

export interface DeliveryFit {
  sense: boolean;
  route: boolean;
  deliver: boolean;
  seal: boolean;
  heat_band: HeatBand;
  dose: Dose;
}

// Asset governance helpers
export class AssetGovernance {
  private static instance: AssetGovernance;
  private governanceData: typeof governanceData;

  private constructor() {
    this.governanceData = governanceData;
  }

  static getInstance(): AssetGovernance {
    if (!AssetGovernance.instance) {
      AssetGovernance.instance = new AssetGovernance();
    }
    return AssetGovernance.instance;
  }

  // Get pillar by ID or label
  getPillar(idOrLabel: string): PillarDefinition | undefined {
    return this.governanceData.governance.locked.pillars.find(
      (p: PillarDefinition) => p.id === idOrLabel || p.labels.some((l: string) => l.toLowerCase() === idOrLabel.toLowerCase())
    );
  }

  // Get concept by ID or label
  getConcept(idOrLabel: string): ConceptDefinition | undefined {
    return this.governanceData.governance.controlled.concepts.find(
      (c: ConceptDefinition) => c.id === idOrLabel || c.labels.some((l: string) => l.toLowerCase() === idOrLabel.toLowerCase())
    );
  }

  // Get theme by ID or label
  getTheme(idOrLabel: string): ThemeDefinition | undefined {
    return this.governanceData.governance.controlled.themes.find(
      (t: ThemeDefinition) => t.id === idOrLabel || t.labels.some((l: string) => l.toLowerCase() === idOrLabel.toLowerCase())
    );
  }

  // Get schema by ID or label
  getSchema(idOrLabel: string): SchemaDefinition | undefined {
    return this.governanceData.governance.controlled.schemas.find(
      (s: SchemaDefinition) => s.id === idOrLabel || s.labels.some((l: string) => l.toLowerCase() === idOrLabel.toLowerCase())
    );
  }

  // Match asset to component placement rules
  getPlacementForComponent(componentName: string, route?: string): PlacementRule | undefined {
    return this.governanceData.placement_rules.find((rule: any): rule is PlacementRule => {
      if (rule.match.component_matches && componentName.includes(rule.match.component_matches)) {
        return true;
      }
      if (rule.match.route_contains && route?.includes(rule.match.route_contains)) {
        return true;
      }
      return false;
    });
  }

  // Get delivery fit hints by asset class
  getDeliveryFitHints(assetClass: AssetClass): DeliveryFit | undefined {
    const hints = this.governanceData.delivery_fit_hints as Record<string, any>;
    return hints[assetClass] as DeliveryFit | undefined;
  }

  // Validate asset against budgets
  validateAssetBudget(asset: Asset): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];
    const budgets = this.governanceData.budgets;

    if (asset.type === 'hero-poster' && asset.file_size) {
      const sizeKB = asset.file_size / 1024;
      if (sizeKB > budgets.image.hero_poster_kb_max) {
        warnings.push(`Hero poster exceeds ${budgets.image.hero_poster_kb_max}KB budget (${sizeKB.toFixed(0)}KB)`);
      }
    }

    if (asset.type === 'hero-loop' && asset.file_size) {
      const sizeMB = asset.file_size / (1024 * 1024);
      if (sizeMB > budgets.video.hero_loop_mb_max) {
        warnings.push(`Hero loop exceeds ${budgets.video.hero_loop_mb_max}MB budget (${sizeMB.toFixed(1)}MB)`);
      }
    }

    if (asset.format !== budgets.image.primary && asset.format !== budgets.image.fallback &&
        asset.type.includes('poster')) {
      warnings.push(`Prefer ${budgets.image.primary} format, fallback to ${budgets.image.fallback}`);
    }

    return {
      valid: warnings.length === 0,
      warnings,
    };
  }

  // Get asset class tokens
  getTokensForClass(assetClass: AssetClass): string[] {
    return this.governanceData.tokens.asset_class_tokens[assetClass] || [];
  }

  // Match labels to governance entities
  matchLabels(labels: string[]): {
    pillars: PillarDefinition[];
    concepts: ConceptDefinition[];
    themes: ThemeDefinition[];
    schemas: SchemaDefinition[];
  } {
    const result = {
      pillars: [] as PillarDefinition[],
      concepts: [] as ConceptDefinition[],
      themes: [] as ThemeDefinition[],
      schemas: [] as SchemaDefinition[],
    };

    labels.forEach((label) => {
      const normalizedLabel = label.toLowerCase();

      // Check pillars
      const pillar = this.governanceData.governance.locked.pillars.find((p: PillarDefinition) =>
        p.labels.some((l: string) => l.toLowerCase() === normalizedLabel)
      );
      if (pillar && !result.pillars.find((p) => p.id === pillar.id)) {
        result.pillars.push(pillar);
      }

      // Check concepts
      const concept = this.governanceData.governance.controlled.concepts.find((c: ConceptDefinition) =>
        c.labels.some((l: string) => l.toLowerCase() === normalizedLabel)
      );
      if (concept && !result.concepts.find((c) => c.id === concept.id)) {
        result.concepts.push(concept);
      }

      // Check themes
      const theme = this.governanceData.governance.controlled.themes.find((t: ThemeDefinition) =>
        t.labels.some((l: string) => l.toLowerCase() === normalizedLabel)
      );
      if (theme && !result.themes.find((t) => t.id === theme.id)) {
        result.themes.push(theme);
      }

      // Check schemas
      const schema = this.governanceData.governance.controlled.schemas.find((s: SchemaDefinition) =>
        s.labels.some((l: string) => l.toLowerCase() === normalizedLabel)
      );
      if (schema && !result.schemas.find((s) => s.id === schema.id)) {
        result.schemas.push(schema);
      }
    });

    return result;
  }

  // Get enhanced tags for label mapping
  getEnhancedTags(labels: string[]): {
    usage_tags: string[];
    proof_fit: string[];
    concept_id?: string;
    theme_id?: string;
    schema_id?: string;
  } {
    const result = {
      usage_tags: [] as string[],
      proof_fit: [] as string[],
      concept_id: undefined as string | undefined,
      theme_id: undefined as string | undefined,
      schema_id: undefined as string | undefined,
    };

    labels.forEach((label) => {
      const normalizedLabel = label.toLowerCase();
      
      interface LabelMapping {
        labels: string[];
        usage_tags_add?: string[];
        proof_fit_add?: string[];
        concept_id?: string;
        theme_id?: string;
        schema_id?: string;
      }
      
      const mapping = this.governanceData.label_map.find((m: LabelMapping) =>
        m.labels.some((l: string) => l.toLowerCase() === normalizedLabel)
      );

      if (mapping) {
        if (mapping.usage_tags_add) {
          result.usage_tags.push(...mapping.usage_tags_add);
        }
        if (mapping.proof_fit_add) {
          result.proof_fit.push(...mapping.proof_fit_add);
        }
        if (mapping.concept_id) {
          result.concept_id = mapping.concept_id;
        }
        if (mapping.theme_id) {
          result.theme_id = mapping.theme_id;
        }
        if (mapping.schema_id) {
          result.schema_id = mapping.schema_id;
        }
      }
    });

    // Deduplicate
    result.usage_tags = [...new Set(result.usage_tags)];
    result.proof_fit = [...new Set(result.proof_fit)];

    return result;
  }
}

// Export singleton instance
export const governance = AssetGovernance.getInstance();

// Convenience exports
export const PILLARS = governanceData.governance.locked.pillars;
export const CONCEPTS = governanceData.governance.controlled.concepts;
export const THEMES = governanceData.governance.controlled.themes;
export const SCHEMAS = governanceData.governance.controlled.schemas;
export const ASSET_CLASSES = ['atmosphere', 'hero', 'system', 'icon', 'proof'] as const;
export const ROOMS = ['journeys', 'navicues', 'toolkit', 'wellbeing', 'state', 'library', 'dashboard'] as const;
