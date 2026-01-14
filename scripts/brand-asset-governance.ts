// scripts/brand-asset-governance.ts
import type { BrandAsset } from './generate-brand-assets';

// Brand asset governance mapping - Universal/Flexible Approach
export interface BrandAssetGovernance {
  type: string;
  // More flexible - assets can serve multiple therapeutic purposes
  possiblePillars: string[]; // Multiple pillars possible
  coreConcepts: string[]; // Universal concepts that apply
  flexibleThemes: string[]; // Themes that can adapt to context
  universalTags: string[]; // Always applicable tags
  description: string;
  // Usage contexts - what therapeutic scenarios work well
  therapeuticContexts: string[];
}

// Universal governance mapping - flexible, not prescriptive
export const BRAND_GOVERNANCE: Record<string, BrandAssetGovernance> = {
  evolvingforms: {
    type: 'evolvingforms',
    possiblePillars: ['ER', 'DM', 'SR'], // Can serve multiple pillars
    coreConcepts: ['transformation', 'pattern-recognition', 'evolution', 'change'],
    flexibleThemes: ['becoming', 'growth', 'transition', 'emergence'],
    universalTags: ['therapeutic', 'contemplative'],
    description: 'Abstract representations of evolving forms and patterns - highly adaptable',
    therapeuticContexts: ['pattern recognition', 'personal growth', 'life transitions', 'healing journeys']
  },
  flowstate: {
    type: 'flowstate',
    possiblePillars: ['DM', 'II', 'ER'], // Flow can support multiple areas
    coreConcepts: ['flow-state', 'harmony', 'balance', 'engagement'],
    flexibleThemes: ['presence', 'optimal-experience', 'alignment', 'rhythm'],
    universalTags: ['therapeutic', 'encouraging'],
    description: 'Visual metaphors for flow state and optimal experience - universally applicable',
    therapeuticContexts: ['stress reduction', 'focus enhancement', 'creative work', 'meditation']
  },
  mindblock: {
    type: 'mindblock',
    possiblePillars: ['SC', 'II', 'ER'], // Mental barriers affect multiple areas
    coreConcepts: ['limitation', 'obstacle', 'cognitive-barrier', 'constraint'],
    flexibleThemes: ['acceptance', 'release', 'freedom', 'breakthrough'],
    universalTags: ['therapeutic', 'neutral'],
    description: 'Representations of cognitive barriers and mental blocks - context-dependent',
    therapeuticContexts: ['overcoming obstacles', 'self-compassion', 'cognitive reframing', 'limitation work']
  },
  neural_flow: {
    type: 'neural_flow',
    possiblePillars: ['II', 'DM', 'ER'], // Neural patterns support integration
    coreConcepts: ['neural-patterns', 'cognitive-flow', 'connection', 'integration'],
    flexibleThemes: ['flow', 'connection', 'integration', 'neural-plasticity'],
    universalTags: ['therapeutic', 'contemplative'],
    description: 'Neural network patterns and cognitive flow visualization - brain-focused but flexible',
    therapeuticContexts: ['neural integration', 'cognitive processing', 'mindfulness', 'neural retraining']
  },
  neural_flower: {
    type: 'neural_flower',
    possiblePillars: ['SR', 'ER', 'SC'], // Growth can be self-reflective or emotional
    coreConcepts: ['neural-growth', 'cognitive-blossoming', 'development', 'reflection'],
    flexibleThemes: ['growth', 'blossoming', 'reflection', 'emergence'],
    universalTags: ['therapeutic', 'encouraging'],
    description: 'Neural growth patterns resembling floral forms - beautiful and versatile for heroes',
    therapeuticContexts: ['personal growth', 'self-reflection', 'healing', 'transformation', 'celebration']
  }
};

// Generate governance-compliant tags for a brand asset - Universal approach
export function generateGovernanceTags(asset: BrandAsset): string[] {
  const governance = BRAND_GOVERNANCE[asset.type];
  if (!governance) {
    console.warn(`No governance mapping found for asset type: ${asset.type}`);
    return asset.tags; // Fallback to basic tags
  }

  const tags: string[] = [];

  // Universal approach: assets can serve multiple therapeutic purposes
  // Add all possible pillars as tags (flexible usage)
  tags.push(...governance.possiblePillars);

  // Add core concepts (these are universally applicable)
  tags.push(...governance.coreConcepts);

  // Add flexible themes (context-dependent but always relevant)
  tags.push(...governance.flexibleThemes);

  // Universal therapeutic tags
  tags.push(...governance.universalTags);

  // Tone-based enhancement (light/dark affects therapeutic feel)
  if (asset.tone === 'light') {
    tags.push('encouraging', 'uplifting');
  } else {
    tags.push('contemplative', 'grounding');
  }

  // Description-based enhancement (flexible interpretation)
  const desc = asset.description.toLowerCase();
  if (desc.includes('alignment') || desc.includes('harmony')) {
    tags.push('alignment', 'harmony', 'balance');
  }
  if (desc.includes('shift') || desc.includes('change')) {
    tags.push('transformation', 'change', 'transition');
  }
  if (desc.includes('flow') || desc.includes('movement')) {
    tags.push('flow', 'movement', 'fluidity');
  }
  if (desc.includes('growth') || desc.includes('development')) {
    tags.push('growth', 'development', 'progression');
  }
  if (desc.includes('connection') || desc.includes('link')) {
    tags.push('connection', 'relationship', 'linkage');
  }

  // Ensure intent is present (universal requirement)
  if (!tags.includes('therapeutic')) {
    tags.push('therapeutic');
  }

  return [...new Set(tags)]; // Remove duplicates, keep flexible
}

  // Tone-based tags - more nuanced
  if (asset.tone === 'light') {
    tags.push('encouraging', 'uplifting');
  } else {
    tags.push('contemplative', 'grounding');
  }

  // Description-based enhancement - more flexible interpretation
  const desc = asset.description.toLowerCase();
  if (desc.includes('alignment') || desc.includes('harmony')) {
    tags.push('harmony', 'balance', 'alignment');
  }
  if (desc.includes('shift') || desc.includes('change') || desc.includes('transformation')) {
    tags.push('transformation', 'change', 'transition');
  }
  if (desc.includes('flow') || desc.includes('movement')) {
    tags.push('flow', 'movement', 'fluidity');
  }
  if (desc.includes('growth') || desc.includes('development')) {
    tags.push('growth', 'development', 'progression');
  }
  if (desc.includes('connection') || desc.includes('link')) {
    tags.push('connection', 'relationship', 'integration');
  }
  if (desc.includes('breakthrough') || desc.includes('freedom')) {
    tags.push('breakthrough', 'freedom', 'release');
  }

  // Ensure intent is present (universal tag requirement)
  if (!tags.includes('therapeutic') && !tags.includes('educational') && !tags.includes('navigational')) {
    tags.push('therapeutic'); // Default intent for universal assets
  }

  // Ensure intent is present (universal tag requirement)
  if (!tags.includes('therapeutic') && !tags.includes('educational') && !tags.includes('navigational')) {
    tags.push('therapeutic'); // Default intent for universal assets
  }

  return [...new Set(tags)]; // Remove duplicates, keep flexible
}

// Validate brand asset against governance rules - Universal approach
export function validateBrandAsset(asset: BrandAsset): {
  valid: boolean;
  warnings: string[];
  frameworkTags: string[];
  universalTags: string[];
} {
  const warnings: string[] = [];
  const governance = BRAND_GOVERNANCE[asset.type];

  if (!governance) {
    warnings.push(`Unknown asset type: ${asset.type} - treated as universal`);
    return {
      valid: true, // Allow unknown types as universal
      warnings,
      frameworkTags: [],
      universalTags: ['therapeutic', 'individual']
    };
  }

  // Framework tag validation - more flexible
  const frameworkTags = [
    governance.possiblePillars[0], // Primary pillar
    ...governance.coreConcepts.slice(0, 3),
    ...governance.flexibleThemes.slice(0, 3)
  ];

  // Universal tag validation - more flexible
  const universalTags = [...governance.universalTags];
  if (asset.tone === 'light') {
    universalTags.push('encouraging', 'uplifting');
  } else {
    universalTags.push('contemplative', 'grounding');
  }

  // More lenient validation for universal assets
  if (frameworkTags.length > 8) { // Increased limit for flexibility
    warnings.push(`Many framework tags: ${frameworkTags.length} (recommended max 8)`);
  }

  if (universalTags.length > 6) { // Increased limit for flexibility
    warnings.push(`Many universal tags: ${universalTags.length} (recommended max 6)`);
  }

  // Check for required intent - more flexible
  const hasIntent = universalTags.some(tag =>
    ['therapeutic', 'educational', 'navigational', 'decorative'].includes(tag)
  );
  if (!hasIntent) {
    warnings.push('Missing recommended intent tag (therapeutic, educational, navigational, or decorative)');
  }

  return {
    valid: warnings.length === 0,
    warnings,
    frameworkTags,
    universalTags
  };
}

// Generate Supabase-ready asset record - Universal approach
export function generateSupabaseAssetRecord(asset: BrandAsset) {
  const governance = BRAND_GOVERNANCE[asset.type];
  const tags = generateGovernanceTags(asset);

  // Determine primary format (prefer AVIF, then WebP, then JPG)
  const formatPriority = ['avif', 'webp', 'jpg'];
  const primaryFormat = formatPriority.find(fmt => asset.formats[fmt as keyof typeof asset.formats]);

  if (!primaryFormat) {
    throw new Error(`No supported format found for asset: ${asset.id}`);
  }

  const formatData = asset.formats[primaryFormat as keyof typeof asset.formats];

  return {
    id: asset.id,
    name: asset.name,
    type: 'hero-poster', // All brand assets are posters, but universal
    category: 'hero',
    pillar_id: governance?.possiblePillars[0] || 'ER', // Primary pillar, fallback to ER
    format: primaryFormat,
    url: asset.supabasePath,
    width: formatData?.width,
    height: formatData?.height,
    file_size: formatData?.size,
    tags,
    created_at: new Date().toISOString()
  };
}