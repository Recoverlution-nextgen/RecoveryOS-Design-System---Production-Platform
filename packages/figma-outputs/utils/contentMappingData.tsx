/**
 * CONTENT MAPPING & TAGGING SYSTEM
 * ST45: Content Mapping & Tagging System
 * 
 * Catalogs all content, tags it with taxonomy, maps to micro-blocks,
 * identifies gaps, and enables rich discovery.
 */

/**
 * CONTENT TYPES
 */
export type ContentType = 
  | 'article'           // Long-form educational content (Library)
  | 'exercise'          // Interactive practice (e.g., emotion wheel)
  | 'video'             // Wellbeing videos
  | 'audio'             // Guided meditations, podcasts
  | 'worksheet'         // Printable/fillable PDFs
  | 'infographic'       // Visual explainers
  | 'quiz'              // Knowledge check
  | 'reflection'        // Journaling prompts
  | 'case-study'        // Real patient stories
  | 'research-summary'; // Neuroscience deep-dives

/**
 * CONTENT TAXONOMY INTERFACE
 */
export interface TaggedContent {
  // Identity
  id: string;                    // 'A01', 'V01', 'E01'
  type: ContentType;
  title: string;
  description: string;           // Short summary
  
  // Hierarchy Mapping
  pillarIds: string[];           // ['emotional-regulation']
  conceptIds: string[];          // ['window-of-tolerance']
  themeIds: string[];            // ['down-regulation-techniques']
  microBlockIds: string[];       // ['mb-001', 'mb-002']
  
  // Clinical Tags
  targetStates: ('red' | 'orange' | 'green')[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;         // Minutes to consume
  
  // Topical Tags
  topics: string[];              // ['anxiety', 'breathing', 'stress']
  interventions: string[];       // ['CBT', 'DBT', 'ACT', 'Somatic']
  populations: string[];         // ['alcohol', 'opioids', 'trauma', 'general']
  
  // Format
  format: 'text' | 'video' | 'audio' | 'interactive' | 'mixed';
  accessibility: string[];       // ['screen-reader', 'captions', 'transcripts']
  
  // Content
  content?: string;              // Full content (for articles)
  url?: string;                  // External URL (for videos)
  thumbnail?: string;            // Image URL
  
  // Metadata
  author: string;
  reviewedBy?: string;
  publishedDate: string;
  lastUpdated: string;
  version: number;
  status: 'draft' | 'review' | 'published' | 'archived';
  
  // Analytics (placeholder)
  viewCount: number;
  favoriteCount: number;
  completionRate: number;        // 0-100%
}

/**
 * COVERAGE ANALYSIS
 */
export interface MicroBlockCoverage {
  microBlockId: string;
  microBlockName: string;
  articles: string[];            // Content IDs
  videos: string[];
  exercises: string[];
  coverageScore: number;         // 0-100
  coverageLevel: 'excellent' | 'good' | 'poor' | 'orphaned';
}

/**
 * GAP ANALYSIS
 */
export interface ContentGap {
  microBlockId: string;
  microBlockName: string;
  pillarName: string;
  missingContentTypes: ContentType[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  reasoning: string;             // Why it's critical
  appearsInWeeks: number[];      // Which journey weeks use this
  favoriteCount: number;         // How popular the block is
}

/**
 * EXISTING CONTENT INVENTORY
 * Tagged articles, videos, and exercises currently in the platform
 */
export const TAGGED_CONTENT: TaggedContent[] = [
  // ARTICLES - Emotional Regulation / Window of Tolerance
  {
    id: 'A01',
    type: 'article',
    title: 'Understanding Window of Tolerance',
    description: 'Learn the foundational concept of nervous system regulation and how to recognize when you\'re outside your optimal zone.',
    pillarIds: ['emotional-regulation'],
    conceptIds: ['window-of-tolerance'],
    themeIds: ['recognizing-dysregulation', 'hyperarousal', 'hypoarousal'],
    microBlockIds: ['mb-034', 'mb-035', 'mb-036'],
    targetStates: ['red', 'orange', 'green'],
    difficulty: 'beginner',
    estimatedTime: 8,
    topics: ['dysregulation', 'nervous system', 'trauma', 'self-regulation'],
    interventions: ['polyvagal theory', 'somatic experiencing'],
    populations: ['general'],
    format: 'text',
    accessibility: ['screen-reader'],
    author: 'Clinical Team',
    reviewedBy: 'Dr. Sarah Johnson',
    publishedDate: '2024-06-12',
    lastUpdated: '2024-09-15',
    version: 2,
    status: 'published',
    viewCount: 3457,
    favoriteCount: 892,
    completionRate: 76,
  },

  {
    id: 'A02',
    type: 'article',
    title: 'Box Breathing: Science & Practice',
    description: 'Deep dive into the neuroscience of box breathing and how to use it effectively in crisis moments.',
    pillarIds: ['emotional-regulation'],
    conceptIds: ['distress-tolerance'],
    themeIds: ['crisis-survival-skills'],
    microBlockIds: ['mb-001'],
    targetStates: ['red', 'orange'],
    difficulty: 'beginner',
    estimatedTime: 6,
    topics: ['breathing', 'anxiety', 'panic', 'hyperarousal', 'vagus nerve'],
    interventions: ['breathwork', 'somatic'],
    populations: ['general'],
    format: 'text',
    accessibility: ['screen-reader'],
    author: 'Clinical Team',
    reviewedBy: 'Dr. Michael Chen',
    publishedDate: '2024-07-03',
    lastUpdated: '2024-10-01',
    version: 1,
    status: 'published',
    viewCount: 2847,
    favoriteCount: 1234,
    completionRate: 82,
  },

  {
    id: 'A03',
    type: 'article',
    title: 'Grounding Techniques for Dissociation',
    description: 'Practical strategies to return to the present moment when you feel spacey, numb, or disconnected.',
    pillarIds: ['emotional-regulation'],
    conceptIds: ['distress-tolerance'],
    themeIds: ['crisis-survival-skills'],
    microBlockIds: ['mb-002', 'mb-007'],
    targetStates: ['red', 'orange'],
    difficulty: 'beginner',
    estimatedTime: 7,
    topics: ['dissociation', 'grounding', 'present-moment', 'mindfulness', 'trauma'],
    interventions: ['somatic', 'mindfulness'],
    populations: ['trauma', 'general'],
    format: 'text',
    accessibility: ['screen-reader'],
    author: 'Clinical Team',
    publishedDate: '2024-08-15',
    lastUpdated: '2024-10-10',
    version: 1,
    status: 'published',
    viewCount: 1876,
    favoriteCount: 567,
    completionRate: 71,
  },

  // VIDEOS - Wellbeing Content
  {
    id: 'V01',
    type: 'video',
    title: 'Box Breathing Guided Practice (5 min)',
    description: 'Follow along with this guided box breathing exercise to calm your nervous system.',
    pillarIds: ['emotional-regulation'],
    conceptIds: ['distress-tolerance'],
    themeIds: ['crisis-survival-skills'],
    microBlockIds: ['mb-001'],
    targetStates: ['red', 'orange'],
    difficulty: 'beginner',
    estimatedTime: 5,
    topics: ['breathing', 'guided-practice', 'calming'],
    interventions: ['breathwork'],
    populations: ['general'],
    format: 'video',
    accessibility: ['captions'],
    url: 'https://example.com/box-breathing-video',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    author: 'Wellbeing Team',
    publishedDate: '2024-05-21',
    lastUpdated: '2024-05-21',
    version: 1,
    status: 'published',
    viewCount: 5432,
    favoriteCount: 1876,
    completionRate: 68,
  },

  {
    id: 'V02',
    type: 'video',
    title: '5-4-3-2-1 Grounding Exercise',
    description: 'A calming video guide through the 5-4-3-2-1 sensory grounding technique.',
    pillarIds: ['emotional-regulation'],
    conceptIds: ['distress-tolerance'],
    themeIds: ['crisis-survival-skills'],
    microBlockIds: ['mb-002'],
    targetStates: ['red', 'orange'],
    difficulty: 'beginner',
    estimatedTime: 4,
    topics: ['grounding', 'dissociation', 'mindfulness'],
    interventions: ['mindfulness'],
    populations: ['general'],
    format: 'video',
    accessibility: ['captions'],
    url: 'https://example.com/grounding-video',
    thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
    author: 'Wellbeing Team',
    publishedDate: '2024-06-08',
    lastUpdated: '2024-06-08',
    version: 1,
    status: 'published',
    viewCount: 3214,
    favoriteCount: 987,
    completionRate: 74,
  },

  {
    id: 'V03',
    type: 'video',
    title: 'Progressive Muscle Relaxation (15 min)',
    description: 'Full-body progressive muscle relaxation to release stored tension.',
    pillarIds: ['emotional-regulation'],
    conceptIds: ['distress-tolerance'],
    themeIds: ['crisis-survival-skills'],
    microBlockIds: ['mb-003'],
    targetStates: ['red', 'orange'],
    difficulty: 'beginner',
    estimatedTime: 15,
    topics: ['tension-release', 'body-scan', 'relaxation'],
    interventions: ['somatic'],
    populations: ['general'],
    format: 'video',
    accessibility: ['captions', 'audio-only'],
    url: 'https://example.com/pmr-video',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    author: 'Wellbeing Team',
    publishedDate: '2024-07-12',
    lastUpdated: '2024-07-12',
    version: 1,
    status: 'published',
    viewCount: 2156,
    favoriteCount: 654,
    completionRate: 82,
  },

  // EXERCISES - Interactive Content
  {
    id: 'E01',
    type: 'exercise',
    title: '30-Day Breathwork Challenge',
    description: 'Track your daily breathwork practice and see your progress over 30 days.',
    pillarIds: ['emotional-regulation'],
    conceptIds: ['distress-tolerance'],
    themeIds: ['crisis-survival-skills'],
    microBlockIds: ['mb-001', 'mb-005'],
    targetStates: ['orange', 'green'],
    difficulty: 'beginner',
    estimatedTime: 5,
    topics: ['breathwork', 'habit-building', 'tracking'],
    interventions: ['breathwork', 'behavioral'],
    populations: ['general'],
    format: 'interactive',
    accessibility: ['screen-reader'],
    author: 'Product Team',
    publishedDate: '2024-09-01',
    lastUpdated: '2024-09-01',
    version: 1,
    status: 'published',
    viewCount: 1234,
    favoriteCount: 456,
    completionRate: 45,
  },

  {
    id: 'E02',
    type: 'exercise',
    title: 'Window of Tolerance Self-Assessment',
    description: 'Interactive quiz to help you identify your current regulation state.',
    pillarIds: ['emotional-regulation'],
    conceptIds: ['window-of-tolerance'],
    themeIds: ['recognizing-dysregulation'],
    microBlockIds: ['mb-034', 'mb-035', 'mb-036'],
    targetStates: ['red', 'orange', 'green'],
    difficulty: 'beginner',
    estimatedTime: 10,
    topics: ['self-assessment', 'awareness', 'regulation'],
    interventions: ['psychoeducation'],
    populations: ['general'],
    format: 'interactive',
    accessibility: ['screen-reader'],
    author: 'Product Team',
    publishedDate: '2024-08-20',
    lastUpdated: '2024-08-20',
    version: 1,
    status: 'published',
    viewCount: 2876,
    favoriteCount: 891,
    completionRate: 67,
  },
];

/**
 * HELPER FUNCTIONS
 */

export function getContentById(id: string): TaggedContent | undefined {
  return TAGGED_CONTENT.find(content => content.id === id);
}

export function getContentByType(type: ContentType): TaggedContent[] {
  return TAGGED_CONTENT.filter(content => content.type === type);
}

export function getContentByPillar(pillarId: string): TaggedContent[] {
  return TAGGED_CONTENT.filter(content => content.pillarIds.includes(pillarId));
}

export function getContentByMicroBlock(microBlockId: string): TaggedContent[] {
  return TAGGED_CONTENT.filter(content => 
    content.microBlockIds.includes(microBlockId)
  );
}

export function getContentByState(state: 'red' | 'orange' | 'green'): TaggedContent[] {
  return TAGGED_CONTENT.filter(content => content.targetStates.includes(state));
}

export function searchContent(query: string): TaggedContent[] {
  const lowerQuery = query.toLowerCase();
  return TAGGED_CONTENT.filter(content => 
    content.title.toLowerCase().includes(lowerQuery) ||
    content.description.toLowerCase().includes(lowerQuery) ||
    content.topics.some(topic => topic.toLowerCase().includes(lowerQuery)) ||
    content.interventions.some(i => i.toLowerCase().includes(lowerQuery))
  );
}

/**
 * COVERAGE ANALYSIS
 * Calculate how well each micro-block is supported by content
 */
export function calculateMicroBlockCoverage(microBlockId: string, microBlockName: string): MicroBlockCoverage {
  const relatedContent = getContentByMicroBlock(microBlockId);
  
  const articles = relatedContent.filter(c => c.type === 'article').map(c => c.id);
  const videos = relatedContent.filter(c => c.type === 'video').map(c => c.id);
  const exercises = relatedContent.filter(c => c.type === 'exercise').map(c => c.id);
  
  // Coverage scoring:
  // 100% = 1+ article, 1+ video, 1+ exercise
  // 67% = 2 of 3 content types
  // 33% = 1 of 3 content types
  // 0% = No content (orphaned)
  
  const hasArticle = articles.length > 0;
  const hasVideo = videos.length > 0;
  const hasExercise = exercises.length > 0;
  const contentTypeCount = [hasArticle, hasVideo, hasExercise].filter(Boolean).length;
  
  let coverageScore = 0;
  let coverageLevel: MicroBlockCoverage['coverageLevel'] = 'orphaned';
  
  if (contentTypeCount === 3) {
    coverageScore = 100;
    coverageLevel = 'excellent';
  } else if (contentTypeCount === 2) {
    coverageScore = 67;
    coverageLevel = 'good';
  } else if (contentTypeCount === 1) {
    coverageScore = 33;
    coverageLevel = 'poor';
  }
  
  return {
    microBlockId,
    microBlockName,
    articles,
    videos,
    exercises,
    coverageScore,
    coverageLevel,
  };
}

/**
 * GAP ANALYSIS
 * Identify which micro-blocks need more content
 */
export function identifyContentGaps(
  microBlocks: { id: string; name: string; pillarName: string; appearsInWeeks: number[]; favoriteCount: number }[]
): ContentGap[] {
  const gaps: ContentGap[] = [];
  
  for (const block of microBlocks) {
    const coverage = calculateMicroBlockCoverage(block.id, block.name);
    
    if (coverage.coverageScore < 100) {
      const missingContentTypes: ContentType[] = [];
      if (coverage.articles.length === 0) missingContentTypes.push('article');
      if (coverage.videos.length === 0) missingContentTypes.push('video');
      if (coverage.exercises.length === 0) missingContentTypes.push('exercise');
      
      // Prioritization logic
      let priority: ContentGap['priority'] = 'low';
      let reasoning = '';
      
      // Critical: No content at all + appears in early weeks + high usage
      if (coverage.coverageScore === 0 && block.appearsInWeeks.some(w => w <= 4)) {
        priority = 'critical';
        reasoning = `Orphaned block in Week ${Math.min(...block.appearsInWeeks)} with no supporting content`;
      }
      // High: Low coverage + early weeks OR high usage
      else if (coverage.coverageScore <= 33 && (block.appearsInWeeks.some(w => w <= 6) || block.favoriteCount > 1000)) {
        priority = 'high';
        reasoning = block.appearsInWeeks.some(w => w <= 6) 
          ? `Poor coverage in Week ${Math.min(...block.appearsInWeeks)}`
          : `High usage (${block.favoriteCount} favorites) but poor coverage`;
      }
      // Medium: Partial coverage
      else if (coverage.coverageScore === 67) {
        priority = 'medium';
        reasoning = 'Good coverage but missing one content type';
      }
      // Low: Late weeks + low usage
      else {
        priority = 'low';
        reasoning = 'Later journey weeks, can be filled over time';
      }
      
      gaps.push({
        microBlockId: block.id,
        microBlockName: block.name,
        pillarName: block.pillarName,
        missingContentTypes,
        priority,
        reasoning,
        appearsInWeeks: block.appearsInWeeks,
        favoriteCount: block.favoriteCount,
      });
    }
  }
  
  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  gaps.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  return gaps;
}

/**
 * CONTENT STATISTICS
 */
export function getContentStatistics() {
  const total = TAGGED_CONTENT.length;
  const byType = {
    articles: TAGGED_CONTENT.filter(c => c.type === 'article').length,
    videos: TAGGED_CONTENT.filter(c => c.type === 'video').length,
    exercises: TAGGED_CONTENT.filter(c => c.type === 'exercise').length,
    other: TAGGED_CONTENT.filter(c => !['article', 'video', 'exercise'].includes(c.type)).length,
  };
  const published = TAGGED_CONTENT.filter(c => c.status === 'published').length;
  const totalViews = TAGGED_CONTENT.reduce((sum, c) => sum + c.viewCount, 0);
  const totalFavorites = TAGGED_CONTENT.reduce((sum, c) => sum + c.favoriteCount, 0);
  const avgCompletionRate = TAGGED_CONTENT.reduce((sum, c) => sum + c.completionRate, 0) / total;
  
  return {
    total,
    byType,
    published,
    totalViews,
    totalFavorites,
    avgCompletionRate: Math.round(avgCompletionRate),
  };
}

/**
 * TOPIC TAGS (for autocomplete)
 */
export const COMMON_TOPICS = [
  'anxiety', 'breathing', 'stress', 'panic', 'trauma', 'dissociation',
  'grounding', 'mindfulness', 'self-regulation', 'nervous system',
  'hyperarousal', 'hypoarousal', 'dysregulation', 'emotion regulation',
  'coping skills', 'crisis management', 'urges', 'cravings',
  'shame', 'guilt', 'anger', 'grief', 'depression',
  'sleep', 'insomnia', 'nightmares', 'flashbacks',
  'boundaries', 'relationships', 'attachment', 'communication',
  'self-compassion', 'self-worth', 'identity', 'values',
];

/**
 * INTERVENTION TYPES (for autocomplete)
 */
export const INTERVENTION_TYPES = [
  'CBT', 'DBT', 'ACT', 'Mindfulness', 'Somatic',
  'Polyvagal Theory', 'Somatic Experiencing', 'EMDR',
  'Motivational Interviewing', 'Behavioral Activation',
  'Breathwork', 'Psychoeducation', 'Narrative Therapy',
];

/**
 * POPULATION TAGS (for autocomplete)
 */
export const POPULATION_TAGS = [
  'general', 'alcohol', 'opioids', 'stimulants', 'cannabis',
  'trauma', 'PTSD', 'anxiety', 'depression',
  'early recovery', 'long-term recovery', 'relapse prevention',
];
