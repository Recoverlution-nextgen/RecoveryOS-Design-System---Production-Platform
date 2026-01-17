/**
 * CONTENT LIBRARY MASTER
 * Central import point for all 100 pieces of content across 6 pillars
 * 
 * THIS FILE CONSOLIDATES:
 * - 30 Insights (from insightLibrary.ts)
 * - 30 Articles (from /data/articles/*)
 * - 40 Practices (from /data/practices/*)
 */

// Import all article collections
import { emotionalRegulationArticles } from '../data/articles/ER-articles-complete';
import { stressResilienceArticles } from '../data/articles/SR-articles-complete';
import { socialConnectivityArticles } from '../data/articles/SC-articles-complete';
import { cognitiveReframingArticles } from '../data/articles/CR-articles-complete';
import { identityIntegrationArticles } from '../data/articles/II-articles-complete';
import { decisionMasteryArticles } from '../data/articles/DM-articles-complete';

// Import all practice collections
import { emotionalRegulationPractices } from '../data/practices/ER-practices-complete';
import { stressResiliencePractices } from '../data/practices/SR-practices-complete';
import { socialConnectivityPractices } from '../data/practices/SC-practices-complete';
import { cognitiveReframingPractices } from '../data/practices/CR-practices-complete';
import { identityIntegrationPractices } from '../data/practices/II-practices-complete';
import { decisionMasteryPractices } from '../data/practices/DM-practices-complete';

// Import insight library
import { insights } from './insightLibrary';
import { SIX_PILLARS } from './colorSystem';
import { getThemeAssetUrl } from './themeAssetMapping';

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Clean article content per infiniteK brand standards:
 * - NO markdown bold markers (**text**)
 * - NO em dashes (—) per "no dashes site-wide" rule
 * - Arrows (→) preserved as they indicate relationships
 */
function cleanContent(content: string): string {
  if (!content) return content;
  
  let cleaned = content;
  
  // Remove markdown bold markers **Text:** → Text:
  cleaned = cleaned.replace(/\*\*([A-Za-z0-9\s\-'(),\/]+):\*\*/g, '$1:');
  
  // Remove standalone markdown bold **Text** → Text
  cleaned = cleaned.replace(/\*\*([A-Za-z0-9\s\-'(),\/]+)\*\*/g, '$1');
  
  // Replace em dashes in quotes with parenthetical attribution
  // "Quote" — Author → "Quote" (Author)
  cleaned = cleaned.replace(/"\s*—\s*([^\n"]+)/g, '" ($1)');
  
  // Em dash before lowercase (clarification) → colon
  cleaned = cleaned.replace(/\s*—\s*([a-z])/g, ': $1');
  
  // Remove any remaining em dashes
  cleaned = cleaned.replace(/—/g, '');
  
  return cleaned;
}

/**
 * Clean an entire article object
 */
function cleanArticle(article: any): any {
  return {
    ...article,
    title: cleanContent(article.title),
    subtitle: cleanContent(article.subtitle),
    summary: cleanContent(article.summary),
    sections: article.sections?.map((section: any) => ({
      ...section,
      heading: cleanContent(section.heading),
      content: cleanContent(section.content)
    }))
  };
}

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type PillarType = 'emotional-regulation' | 'stress-resilience' | 'social-connectivity' | 'cognitive-reframing' | 'identity-integration' | 'decision-mastery';

export interface ContentPiece {
  id: string;
  type: 'article' | 'practice' | 'insight';
  title: string;
  pillar: PillarType;
  pillarName: string;
  pillarColor: string;
  difficulty?: string;
  duration?: number;
  summary?: string;
  blocks?: string[];
  keywords?: {
    primary: string[];
    secondary: string[];
    tertiary: string[];
  };
  themeName?: string;
  blockName?: string;
  assetUrl?: string;
}

// ============================================================================
// PILLAR METADATA
// ============================================================================

export const pillarMetadata: Record<PillarType, { name: string; color: string; icon: string; description: string }> = {
  'emotional-regulation': {
    name: 'Emotional Regulation',
    color: SIX_PILLARS.emotionalRegulation.primary, // #7C67FF
    icon: '❤️',
    description: 'How do I feel what I feel without being consumed by it?'
  },
  'stress-resilience': {
    name: 'Stress Resilience',
    color: SIX_PILLARS.stressResilience.primary, // #C49DC4
    icon: '🌊',
    description: 'How do I stay steady when everything feels like too much?'
  },
  'social-connectivity': {
    name: 'Social Connectivity',
    color: SIX_PILLARS.socialConnectivity.primary, // #9D8FFF
    icon: '🤝',
    description: 'How do I build relationships that nourish instead of drain me?'
  },
  'cognitive-reframing': {
    name: 'Cognitive Reframing',
    color: SIX_PILLARS.cognitiveReframing.primary, // #3E2BB8
    icon: '🧠',
    description: 'How do I challenge the thoughts that keep me stuck?'
  },
  'identity-integration': {
    name: 'Identity Integration',
    color: SIX_PILLARS.identityIntegration.primary, // #5739FB
    icon: '🦋',
    description: 'Who am I becoming, and how do I live aligned with that?'
  },
  'decision-mastery': {
    name: 'Decision Mastery',
    color: SIX_PILLARS.decisionMastery.primary, // #A8C4E1
    icon: '⚡',
    description: 'How do I make choices that serve my future, not just my present?'
  }
};

// Helper to get pillar metadata
function getPillarInfo(pillarId: string): { pillar: PillarType; pillarName: string; pillarColor: string } {
  const pillarMap: Record<string, PillarType> = {
    'ER': 'emotional-regulation',
    'SR': 'stress-resilience',
    'SC': 'social-connectivity',
    'CR': 'cognitive-reframing',
    'II': 'identity-integration',
    'DM': 'decision-mastery'
  };
  
  const pillar = pillarMap[pillarId] || 'emotional-regulation';
  const metadata = pillarMetadata[pillar];
  
  return {
    pillar,
    pillarName: metadata.name,
    pillarColor: metadata.color
  };
}

// ============================================================================
// CONSOLIDATED ARTICLE LIBRARY
// ============================================================================

export const allArticles = [
  ...emotionalRegulationArticles,
  ...stressResilienceArticles,
  ...socialConnectivityArticles,
  ...cognitiveReframingArticles,
  ...identityIntegrationArticles,
  ...decisionMasteryArticles
].map(article => cleanArticle({
  ...article,
  ...getPillarInfo(article.pillarId),
  assetUrl: getThemeAssetUrl(article.themeName)
}));

// ============================================================================
// CONSOLIDATED PRACTICE LIBRARY
// ============================================================================

export const allPractices = [
  ...emotionalRegulationPractices,
  ...stressResiliencePractices,
  ...socialConnectivityPractices,
  ...cognitiveReframingPractices,
  ...identityIntegrationPractices,
  ...decisionMasteryPractices
].map(practice => ({
  ...practice,
  ...getPillarInfo(practice.pillarId),
  title: practice.name,
  summary: practice.description,
  assetUrl: getThemeAssetUrl(practice.themeName)
}));

// ============================================================================
// CONSOLIDATED INSIGHTS
// ============================================================================

export const allInsights = insights.map(insight => ({
  ...insight,
  ...getPillarInfo(insight.pillarId),
  summary: insight.whyItMatters,
  themeName: insight.themeName,
  blockName: insight.blockName
}));

// ============================================================================
// UNIFIED CONTENT LIBRARY (ALL 100 PIECES)
// ============================================================================

export const allContent: ContentPiece[] = [
  ...allArticles.map(a => ({
    id: a.id,
    type: 'article' as const,
    title: a.title,
    pillar: a.pillar,
    pillarName: a.pillarName,
    pillarColor: a.pillarColor,
    difficulty: a.difficulty,
    duration: a.readTime,
    summary: a.summary,
    blocks: a.blocks,
    keywords: a.keywords,
    assetUrl: a.assetUrl
  })),
  ...allPractices.map(p => ({
    id: p.id,
    type: 'practice' as const,
    title: p.name,
    pillar: p.pillar,
    pillarName: p.pillarName,
    pillarColor: p.pillarColor,
    difficulty: p.difficulty,
    duration: p.duration,
    summary: p.description,
    blocks: p.blocks,
    keywords: p.keywords,
    assetUrl: p.assetUrl
  })),
  ...allInsights.map(i => ({
    id: i.id,
    type: 'insight' as const,
    title: i.title,
    pillar: i.pillar,
    pillarName: i.pillarName,
    pillarColor: i.pillarColor,
    summary: i.whyItMatters,
    blocks: [i.blockId],
    themeName: i.themeName,
    blockName: i.blockName
  }))
];

// ============================================================================
// SEARCH AND FILTER UTILITIES
// ============================================================================

export function searchContent(query: string): ContentPiece[] {
  const lowerQuery = query.toLowerCase();
  return allContent.filter(content =>
    content.title.toLowerCase().includes(lowerQuery) ||
    content.summary?.toLowerCase().includes(lowerQuery) ||
    content.keywords?.primary.some(k => k.toLowerCase().includes(lowerQuery)) ||
    content.keywords?.secondary.some(k => k.toLowerCase().includes(lowerQuery))
  );
}

export function getContentByPillar(pillar: PillarType): ContentPiece[] {
  return allContent.filter(content => content.pillar === pillar);
}

export function getContentByType(type: 'article' | 'practice' | 'insight'): ContentPiece[] {
  return allContent.filter(content => content.type === type);
}

export function getContentByBlock(blockId: string): ContentPiece[] {
  return allContent.filter(content => 
    content.blocks?.includes(blockId)
  );
}

export function getArticleById(id: string) {
  return allArticles.find(a => a.id === id);
}

export function getPracticeById(id: string) {
  return allPractices.find(p => p.id === id);
}

export function getInsightById(id: string) {
  return allInsights.find(i => i.id === id);
}

// ============================================================================
// STATS
// ============================================================================

export const contentStats = {
  total: allContent.length,
  articles: allArticles.length,
  practices: allPractices.length,
  insights: allInsights.length,
  byPillar: {
    'emotional-regulation': getContentByPillar('emotional-regulation').length,
    'stress-resilience': getContentByPillar('stress-resilience').length,
    'social-connectivity': getContentByPillar('social-connectivity').length,
    'cognitive-reframing': getContentByPillar('cognitive-reframing').length,
    'identity-integration': getContentByPillar('identity-integration').length,
    'decision-mastery': getContentByPillar('decision-mastery').length
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Collections
  allArticles as articles,
  allPractices as practices,
  allInsights as insights,
  
  // Individual article collections (if needed)
  emotionalRegulationArticles,
  stressResilienceArticles,
  socialConnectivityArticles,
  cognitiveReframingArticles,
  identityIntegrationArticles,
  decisionMasteryArticles,
  
  // Individual practice collections (if needed)
  emotionalRegulationPractices,
  stressResiliencePractices,
  socialConnectivityPractices,
  cognitiveReframingPractices,
  identityIntegrationPractices,
  decisionMasteryPractices
};