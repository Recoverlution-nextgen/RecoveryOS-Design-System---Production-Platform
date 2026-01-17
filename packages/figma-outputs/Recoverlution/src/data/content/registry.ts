/**
 * MASTER CONTENT REGISTRY - ALL 600 ITEMS
 * Complete therapeutic content across 6 pillars
 */

import { emotionalRegulationComplete } from './pillars/emotional-regulation-complete';
import { stressResilienceComplete } from './pillars/stress-resilience-complete';
import { socialConnectivityComplete } from './pillars/social-connectivity-complete';
import { 
  cognitiveReframingComplete,
  identityIntegrationComplete,
  decisionMasteryComplete 
} from './pillars/remaining-three-pillars-complete';

import type { PillarId } from '@/types/content';

// Pillar metadata
export const PILLARS = [
  {
    id: 'emotional_regulation' as PillarId,
    code: 'ER',
    name: 'Emotional Regulation',
    description: 'Build capacity to feel without being overwhelmed',
    color: '#FF6B6B',
    count: emotionalRegulationComplete.stats.total
  },
  {
    id: 'stress_resilience' as PillarId,
    code: 'SR',
    name: 'Stress Resilience',
    description: 'Manage stress and build adaptive capacity',
    color: '#4ECDC4',
    count: stressResilienceComplete.stats.total
  },
  {
    id: 'social_connectivity' as PillarId,
    code: 'SC',
    name: 'Social Connectivity',
    description: 'Heal relationships and build secure connections',
    color: '#95E1D3',
    count: socialConnectivityComplete.stats.total
  },
  {
    id: 'cognitive_reframing' as PillarId,
    code: 'CR',
    name: 'Cognitive Reframing',
    description: 'Change thoughts to change outcomes',
    color: '#FFD93D',
    count: cognitiveReframingComplete.stats.total
  },
  {
    id: 'identity_integration' as PillarId,
    code: 'II',
    name: 'Identity Integration',
    description: 'Become whole by integrating all parts of yourself',
    color: '#A8E6CF',
    count: identityIntegrationComplete.stats.total
  },
  {
    id: 'decision_mastery' as PillarId,
    code: 'DM',
    name: 'Decision Mastery',
    description: 'Make better choices under uncertainty',
    color: '#C7CEEA',
    count: decisionMasteryComplete.stats.total
  },
];

// Complete content registry
export const contentRegistry = {
  practices: [
    ...emotionalRegulationComplete.practices,
    ...stressResilienceComplete.practices,
    ...socialConnectivityComplete.practices,
    ...cognitiveReframingComplete.practices,
    ...identityIntegrationComplete.practices,
    ...decisionMasteryComplete.practices,
  ],
  blocks: [
    ...emotionalRegulationComplete.blocks,
    ...stressResilienceComplete.blocks,
    ...socialConnectivityComplete.blocks,
    ...cognitiveReframingComplete.blocks,
    ...identityIntegrationComplete.blocks,
    ...decisionMasteryComplete.blocks,
  ],
  lessons: [
    ...emotionalRegulationComplete.lessons,
    ...stressResilienceComplete.lessons,
    ...socialConnectivityComplete.lessons,
    ...cognitiveReframingComplete.lessons,
    ...identityIntegrationComplete.lessons,
    ...decisionMasteryComplete.lessons,
  ],
};

// Stats
export const contentStats = {
  total: contentRegistry.practices.length + contentRegistry.blocks.length + contentRegistry.lessons.length,
  practices: contentRegistry.practices.length,
  blocks: contentRegistry.blocks.length,
  lessons: contentRegistry.lessons.length,
  pillars: PILLARS.length,
  by_pillar: PILLARS.reduce((acc, pillar) => {
    acc[pillar.id] = pillar.count;
    return acc;
  }, {} as Record<PillarId, number>)
};

console.log('📦 Content Registry Loaded:');
console.log(`   Total Items: ${contentStats.total}`);
console.log(`   Practices: ${contentStats.practices}`);
console.log(`   Blocks: ${contentStats.blocks}`);
console.log(`   Lessons: ${contentStats.lessons}`);
console.log(`   Across ${contentStats.pillars} Pillars`);
