/**
 * Journey Asset Mapper
 * 
 * Intelligently maps blocks/themes to dashboard tile assets
 * Strategy: Smart reuse - same asset can appear for related content
 * 
 * Asset Pool:
 * - Journey tile (default, spiritual/identity themes)
 * - Wellbeing tile (health, stress, physical themes)
 * - Toolkit tile (skills, practices, tools themes)
 * - State tile (emotional, awareness themes)
 * - Navigate tile (decision, choice themes)
 * - Momentum tile (progress, growth themes)
 */

// Dashboard tile assets
export const JOURNEY_ASSETS = {
  journey: 'https://ucarecdn.com/dc4db9fc-dd75-43bb-b8df-03c065cd3d1b/-/preview/1000x1000/',
  wellbeing: 'https://ucarecdn.com/4bd4a8ce-af62-40af-993b-b058da05d59c/-/preview/1000x1000/',
  toolkit: 'https://ucarecdn.com/8cd040d0-c57e-426c-ba13-4d7797acd45b/-/preview/1000x1000/',
  state: 'https://ucarecdn.com/6ef962d0-2629-4c9a-a4c3-cef0bb7a882e/-/preview/1000x1000/',
  navigate: 'https://ucarecdn.com/8e9c42ab-0833-48a9-9e97-f3ffe28d8a6b/-/preview/1000x1000/',
  momentum: 'https://ucarecdn.com/e26e0d43-8eec-4754-a09d-f4f3e54b3c61/-/preview/1000x1000/',
};

// Pillar to asset mapping
export const PILLAR_ASSET_MAP: Record<string, keyof typeof JOURNEY_ASSETS> = {
  'emotional-regulation': 'state',
  'stress-resilience': 'wellbeing',
  'social-connectivity': 'toolkit',
  'cognitive-reframing': 'journey',
  'identity-integration': 'journey',
  'decision-mastery': 'navigate',
};

// Pillar color gradients (matches existing design system)
export const PILLAR_GRADIENTS: Record<string, string> = {
  'emotional-regulation': 'from-rose-500 to-pink-500',
  'stress-resilience': 'from-amber-500 to-orange-500',
  'social-connectivity': 'from-blue-500 to-cyan-500',
  'cognitive-reframing': 'from-[#3E2BB8] to-[#5739FB]',
  'identity-integration': 'from-emerald-500 to-teal-500',
  'decision-mastery': 'from-yellow-500 to-amber-500',
};

/**
 * Get asset for a block based on theme/pillar
 * Falls back to Journey tile if no match
 */
export function getBlockAsset(blockId: string, pillarName?: string): string {
  // If pillar name provided, use pillar mapping
  if (pillarName) {
    const pillarKey = pillarName.toLowerCase().replace(/\s+/g, '-');
    const assetKey = PILLAR_ASSET_MAP[pillarKey];
    if (assetKey) {
      return JOURNEY_ASSETS[assetKey];
    }
  }
  
  // Parse block ID to extract pillar (e.g., "P-01.C-01.T-01.B-001" -> P-01)
  const pillarMatch = blockId.match(/^P-(\d+)/);
  if (pillarMatch) {
    const pillarNum = parseInt(pillarMatch[1]);
    
    // Map pillar number to asset
    const pillarAssets: (keyof typeof JOURNEY_ASSETS)[] = [
      'state',       // P-01: Emotional Regulation
      'wellbeing',   // P-02: Stress & Resilience
      'toolkit',     // P-03: Social Connectivity
      'journey',     // P-04: Cognitive Reframing
      'journey',     // P-05: Identity Integration
      'navigate',    // P-06: Decision Mastery
    ];
    
    if (pillarNum >= 1 && pillarNum <= 6) {
      return JOURNEY_ASSETS[pillarAssets[pillarNum - 1]];
    }
  }
  
  // Default fallback
  return JOURNEY_ASSETS.journey;
}

/**
 * Get gradient for a block based on pillar
 */
export function getBlockGradient(blockId: string, pillarName?: string): string {
  if (pillarName) {
    const pillarKey = pillarName.toLowerCase().replace(/\s+/g, '-');
    return PILLAR_GRADIENTS[pillarKey] || PILLAR_GRADIENTS['cognitive-reframing'];
  }
  
  // Parse block ID
  const pillarMatch = blockId.match(/^P-(\d+)/);
  if (pillarMatch) {
    const pillarNum = parseInt(pillarMatch[1]);
    const pillarKeys = [
      'emotional-regulation',
      'stress-resilience',
      'social-connectivity',
      'cognitive-reframing',
      'identity-integration',
      'decision-mastery',
    ];
    
    if (pillarNum >= 1 && pillarNum <= 6) {
      return PILLAR_GRADIENTS[pillarKeys[pillarNum - 1]];
    }
  }
  
  return PILLAR_GRADIENTS['cognitive-reframing'];
}

/**
 * Get pillar name from block ID
 */
export function getPillarNameFromBlockId(blockId: string): string {
  const pillarMatch = blockId.match(/^P-(\d+)/);
  if (pillarMatch) {
    const pillarNum = parseInt(pillarMatch[1]);
    const pillarNames = [
      'Emotional Regulation',
      'Stress & Resilience',
      'Social Connectivity',
      'Cognitive Reframing',
      'Identity Integration',
      'Decision Mastery',
    ];
    
    if (pillarNum >= 1 && pillarNum <= 6) {
      return pillarNames[pillarNum - 1];
    }
  }
  
  return 'Journey';
}

/**
 * Get asset URL for immersive welcome scene
 * Uses Journey tile - calm, abstract, flowing
 */
export function getWelcomeAsset(): string {
  return JOURNEY_ASSETS.journey;
}

/**
 * Get asset URL for practice scene based on theme
 * Maps pillar to appropriate visual asset from JOURNEY_ASSETS
 */
export function getPracticeAsset(themeId: string): string {
  // Extract pillar ID from theme_id (e.g., 'P-01.C-01.T-01' -> 'P-01')
  const pillarMatch = themeId.match(/^P-(\d+)/);
  
  if (pillarMatch) {
    const pillarNum = parseInt(pillarMatch[1]);
    
    // Map pillar number to asset key
    const pillarAssets: (keyof typeof JOURNEY_ASSETS)[] = [
      'state',       // P-01: Emotional Regulation
      'wellbeing',   // P-02: Stress & Resilience
      'toolkit',     // P-03: Social Connectivity
      'journey',     // P-04: Cognitive Reframing
      'journey',     // P-05: Identity Integration
      'navigate',    // P-06: Decision Mastery
    ];
    
    if (pillarNum >= 1 && pillarNum <= 6) {
      return JOURNEY_ASSETS[pillarAssets[pillarNum - 1]];
    }
  }
  
  // Default: Journey tile
  return JOURNEY_ASSETS.journey;
}
