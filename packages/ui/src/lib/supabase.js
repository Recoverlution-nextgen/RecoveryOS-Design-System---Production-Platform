import { createClient } from '@supabase/supabase-js';
import { governance } from '../assets/asset-governance';
// Supabase configuration
// Add these to your .env file:
// VITE_SUPABASE_URL=your-project-url
// VITE_SUPABASE_ANON_KEY=your-anon-key
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not set. Asset fetching will not work.');
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Fetch hero scene assets
export async function getHeroSceneAssets(sceneId) {
    const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('category', 'hero')
        .eq('scene_id', sceneId)
        .order('type', { ascending: true });
    if (error) {
        console.error('Error fetching hero assets:', error);
        return null;
    }
    return {
        poster: data?.find(a => a.type === 'hero-poster'),
        loop: data?.find(a => a.type === 'hero-loop'),
    };
}
// Fetch system assets (thread, halos, etc.)
export async function getSystemAssets() {
    const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('category', 'system')
        .order('name', { ascending: true });
    if (error) {
        console.error('Error fetching system assets:', error);
        return [];
    }
    return data;
}
// Fetch assets by tags (for flexible querying)
export async function getAssetsByTags(tags) {
    const { data, error } = await supabase
        .from('assets')
        .select('*')
        .contains('tags', tags);
    if (error) {
        console.error('Error fetching assets by tags:', error);
        return [];
    }
    return data;
}
// Fetch pillar-specific assets
export async function getPillarAssets(pillarId) {
    const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('pillar_id', pillarId)
        .order('name', { ascending: true });
    if (error) {
        console.error('Error fetching pillar assets:', error);
        return [];
    }
    return data;
}
// Get single asset by name
export async function getAssetByName(name) {
    const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('name', name)
        .single();
    if (error) {
        console.error('Error fetching asset:', error);
        return null;
    }
    return data;
}
// Get Core 12 assets (minimum viable set)
export async function getCore12Assets() {
    const { data, error } = await supabase
        .from('assets')
        .select('*')
        .in('type', [
        'hero-poster',
        'hero-loop',
        'noise-texture',
        'thread-texture',
        'seal-pulse',
        'receipt-object'
    ])
        .order('type', { ascending: true });
    if (error) {
        console.error('Error fetching Core 12 assets:', error);
        return [];
    }
    return data;
}
// === GOVERNANCE-DRIVEN ASSET QUERIES ===
// Get assets by component placement rules
export async function getAssetsByComponent(componentName, route) {
    const placement = governance.getPlacementForComponent(componentName, route);
    if (!placement) {
        console.warn(`No placement rule found for component: ${componentName}`);
        return [];
    }
    let query = supabase.from('assets').select('*');
    // Filter by asset class if specified
    if (placement.asset_class) {
        query = query.eq('category', placement.asset_class);
    }
    // Filter by usage tags if specified
    if (placement.usage_tags_add && placement.usage_tags_add.length > 0) {
        query = query.contains('tags', placement.usage_tags_add);
    }
    // Filter by schema if specified
    if (placement.schema_id) {
        query = query.contains('tags', [placement.schema_id]);
    }
    const { data, error } = await query;
    if (error) {
        console.error('Error fetching assets by component:', error);
        return [];
    }
    // Validate budgets in dev mode
    if (import.meta.env.DEV && data) {
        data.forEach((asset) => {
            const validation = governance.validateAssetBudget(asset);
            if (!validation.valid) {
                console.warn(`Asset ${asset.name} has budget warnings:`, validation.warnings);
            }
        });
    }
    return data;
}
// Get assets by label mapping (natural language to governance entities)
export async function getAssetsByLabels(labels) {
    const enhanced = governance.getEnhancedTags(labels);
    const queryTags = [...enhanced.usage_tags, ...enhanced.proof_fit];
    if (enhanced.concept_id)
        queryTags.push(enhanced.concept_id);
    if (enhanced.theme_id)
        queryTags.push(enhanced.theme_id);
    if (enhanced.schema_id)
        queryTags.push(enhanced.schema_id);
    if (queryTags.length === 0) {
        console.warn(`No tags resolved for labels: ${labels.join(', ')}`);
        return [];
    }
    return getAssetsByTags(queryTags);
}
// Get delivery fit hints for an asset class
export function getDeliveryFitForClass(assetClass) {
    return governance.getDeliveryFitHints(assetClass);
}
// Get CSS tokens for an asset class
export function getTokensForAssetClass(assetClass) {
    return governance.getTokensForClass(assetClass);
}
// Validate asset against budget constraints
export function validateAssetBudget(asset) {
    return governance.validateAssetBudget(asset);
}
