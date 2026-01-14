import governanceData from './asset-governance.json';
// Asset governance helpers
export class AssetGovernance {
    constructor() {
        Object.defineProperty(this, "governanceData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.governanceData = governanceData;
    }
    static getInstance() {
        if (!AssetGovernance.instance) {
            AssetGovernance.instance = new AssetGovernance();
        }
        return AssetGovernance.instance;
    }
    // Get pillar by ID or label
    getPillar(idOrLabel) {
        return this.governanceData.governance.locked.pillars.find((p) => p.id === idOrLabel || p.labels.some((l) => l.toLowerCase() === idOrLabel.toLowerCase()));
    }
    // Get concept by ID or label
    getConcept(idOrLabel) {
        return this.governanceData.governance.controlled.concepts.find((c) => c.id === idOrLabel || c.labels.some((l) => l.toLowerCase() === idOrLabel.toLowerCase()));
    }
    // Get theme by ID or label
    getTheme(idOrLabel) {
        return this.governanceData.governance.controlled.themes.find((t) => t.id === idOrLabel || t.labels.some((l) => l.toLowerCase() === idOrLabel.toLowerCase()));
    }
    // Get schema by ID or label
    getSchema(idOrLabel) {
        return this.governanceData.governance.controlled.schemas.find((s) => s.id === idOrLabel || s.labels.some((l) => l.toLowerCase() === idOrLabel.toLowerCase()));
    }
    // Match asset to component placement rules
    getPlacementForComponent(componentName, route) {
        return this.governanceData.placement_rules.find((rule) => {
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
    getDeliveryFitHints(assetClass) {
        const hints = this.governanceData.delivery_fit_hints;
        return hints[assetClass];
    }
    // Validate asset against budgets
    validateAssetBudget(asset) {
        const warnings = [];
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
    getTokensForClass(assetClass) {
        return this.governanceData.tokens.asset_class_tokens[assetClass] || [];
    }
    // Match labels to governance entities
    matchLabels(labels) {
        const result = {
            pillars: [],
            concepts: [],
            themes: [],
            schemas: [],
        };
        labels.forEach((label) => {
            const normalizedLabel = label.toLowerCase();
            // Check pillars
            const pillar = this.governanceData.governance.locked.pillars.find((p) => p.labels.some((l) => l.toLowerCase() === normalizedLabel));
            if (pillar && !result.pillars.find((p) => p.id === pillar.id)) {
                result.pillars.push(pillar);
            }
            // Check concepts
            const concept = this.governanceData.governance.controlled.concepts.find((c) => c.labels.some((l) => l.toLowerCase() === normalizedLabel));
            if (concept && !result.concepts.find((c) => c.id === concept.id)) {
                result.concepts.push(concept);
            }
            // Check themes
            const theme = this.governanceData.governance.controlled.themes.find((t) => t.labels.some((l) => l.toLowerCase() === normalizedLabel));
            if (theme && !result.themes.find((t) => t.id === theme.id)) {
                result.themes.push(theme);
            }
            // Check schemas
            const schema = this.governanceData.governance.controlled.schemas.find((s) => s.labels.some((l) => l.toLowerCase() === normalizedLabel));
            if (schema && !result.schemas.find((s) => s.id === schema.id)) {
                result.schemas.push(schema);
            }
        });
        return result;
    }
    // Get enhanced tags for label mapping
    getEnhancedTags(labels) {
        const result = {
            usage_tags: [],
            proof_fit: [],
            concept_id: undefined,
            theme_id: undefined,
            schema_id: undefined,
        };
        labels.forEach((label) => {
            const normalizedLabel = label.toLowerCase();
            const mapping = this.governanceData.label_map.find((m) => m.labels.some((l) => l.toLowerCase() === normalizedLabel));
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
export const ASSET_CLASSES = ['atmosphere', 'hero', 'system', 'icon', 'proof'];
export const ROOMS = ['journeys', 'navicues', 'toolkit', 'wellbeing', 'state', 'library', 'dashboard'];
