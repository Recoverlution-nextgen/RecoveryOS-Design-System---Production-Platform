/**
 * Complete Article Library
 * 180+ therapeutic articles mapped to Six Pillars
 * Each article includes: full content, thought leader attribution, micro-block tags, journey mapping
 */

export type ArticleDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ArticleType = 'Theory' | 'Practice' | 'Science' | 'Story';
export type PillarType = 'emotional-regulation' | 'stress-resilience' | 'social-connectivity' | 'cognitive-reframing' | 'identity-integration' | 'decision-mastery';

export interface Article {
  id: number;
  title: string;
  pillar: PillarType;
  pillarName: string;
  pillarColor: string;
  thoughtLeader: string;
  microBlocks: string[];
  type: ArticleType;
  difficulty: ArticleDifficulty;
  readTime: number; // minutes
  journeyWeek?: number;
  summary: string;
  content: ArticleSection[];
  relatedArticles?: number[];
}

export interface ArticleSection {
  heading?: string;
  content: string;
  type?: 'text' | 'practice' | 'reflection' | 'key-point' | 'quote';
}

// Pillar metadata for UI
export const pillarMetadata: Record<PillarType, { name: string; color: string; icon: string; description: string }> = {
  'emotional-regulation': {
    name: 'Emotional Regulation',
    color: '#E85D75',
    icon: '❤️',
    description: "How do I feel what I feel without being consumed by it?"
  },
  'stress-resilience': {
    name: 'Stress Resilience',
    color: '#9B59B6',
    icon: '🌊',
    description: "How do I stay steady when everything feels like too much?"
  },
  'social-connectivity': {
    name: 'Social Connectivity',
    color: '#3498DB',
    icon: '🤝',
    description: "How do I connect when isolation feels safer?"
  },
  'cognitive-reframing': {
    name: 'Cognitive Reframing',
    color: '#F39C12',
    icon: '💭',
    description: "How do I shift the story I tell myself?"
  },
  'identity-integration': {
    name: 'Identity Integration',
    color: '#2ECC71',
    icon: '🌱',
    description: "How do I become whole when I have felt so fractured?"
  },
  'decision-mastery': {
    name: 'Decision Mastery',
    color: '#E74C3C',
    icon: '⚖️',
    description: "How do I make the hard choice when cravings scream louder than values?"
  }
};

// This is just the header section - I'll append the rest from the original file
