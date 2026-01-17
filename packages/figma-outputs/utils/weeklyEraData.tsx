/**
 * WEEKLY ERA SPRINTS DATA MODEL
 * ST43: Weekly ERA Sprints Design
 * 
 * 12 weeks × 7 days = 84 daily exercises
 * Each week completes 1 THEME (not full Concept)
 * Daily structure follows ERA flow: Experience → Recognize → Align
 */

export interface DailyExercise {
  week: number; // 1-12
  day: number; // 1-7
  eraPhase: 'experience' | 'recognize' | 'align';
  theme: string; // e.g., "Understanding Your Brain on Addiction"
  domain: string; // e.g., "Neuroscience Foundation"
  title: string; // e.g., "Your First Box Breathing Practice"
  estimatedTime: number; // Minutes
  format: 'video' | 'audio' | 'reading' | 'interactive' | 'reflection';
  content: {
    introduction: string; // 2-3 sentences
    mainContent: string | string[]; // Video URL, Building Block ID, or exercise steps
    practice: string; // What to do
    reflection: string; // Prompt for journaling
  };
  relatedMicroBlocks: string[]; // IDs of micro-blocks covered
  relatedNaviCues: string[]; // IDs of NaviCues to practice
  successCriteria: string; // "Completed practice" or "Tracked 3 moments"
}

export interface WeeklyTheme {
  week: number;
  eraPhase: 'experience' | 'recognize' | 'align';
  theme: string;
  domain: string;
  pillar: string;
  description: string;
  dailyFocus: string;
  exercises: DailyExercise[];
}

/**
 * SIMPLIFIED 8-WEEK JOURNEY FOR ST49 (Journey Infrastructure Testing)
 * Mapping weeks to micro-blocks for the traffic light system
 */
export const weeklyEraData: Array<{
  weekNumber: number;
  primaryFocus: string;
  pillarEmphasis: string;
  microBlockIds: string[];
}> = [
  {
    weekNumber: 1,
    primaryFocus: 'Foundation: Understanding Your Brain',
    pillarEmphasis: 'Cognitive Reframing + Emotional Regulation',
    microBlockIds: ['CB-COG-001', 'CB-COG-002', 'CB-EMO-001', 'CB-EMO-002', 'CB-EMO-003'],
  },
  {
    weekNumber: 2,
    primaryFocus: 'Recognizing Dysregulation',
    pillarEmphasis: 'Emotional Regulation + Stress Resilience',
    microBlockIds: ['CB-EMO-001', 'CB-EMO-002', 'CB-EMO-004', 'CB-STR-001', 'CB-STR-002'],
  },
  {
    weekNumber: 3,
    primaryFocus: 'Down-Regulation Techniques',
    pillarEmphasis: 'Emotional Regulation + Decision Mastery',
    microBlockIds: ['CB-EMO-001', 'CB-EMO-003', 'CB-DEC-001', 'CB-DEC-002'],
  },
  {
    weekNumber: 4,
    primaryFocus: 'Integration: Building Your Toolkit',
    pillarEmphasis: 'All Pillars - Synthesis',
    microBlockIds: ['CB-EMO-005', 'CB-COG-003', 'CB-SOC-001', 'CB-IDE-001'],
  },
  {
    weekNumber: 5,
    primaryFocus: 'Spotting Your Triggers',
    pillarEmphasis: 'Cognitive Reframing + Social Connectivity',
    microBlockIds: ['CB-COG-002', 'CB-COG-003', 'CB-COG-004', 'CB-SOC-002'],
  },
  {
    weekNumber: 6,
    primaryFocus: 'Understanding Micro-Blocks',
    pillarEmphasis: 'Identity Integration + Tracking',
    microBlockIds: ['CB-IDE-001', 'CB-IDE-002', 'CB-STR-001', 'CB-DEC-001'],
  },
  {
    weekNumber: 7,
    primaryFocus: 'Autonomy: Distress Tolerance Toolkit',
    pillarEmphasis: 'Stress Resilience + Crisis Skills',
    microBlockIds: ['CB-STR-002', 'CB-STR-003', 'CB-EMO-003', 'CB-DEC-002'],
  },
  {
    weekNumber: 8,
    primaryFocus: 'Radical Acceptance & Values Alignment',
    pillarEmphasis: 'Identity Integration + Decision Mastery',
    microBlockIds: ['CB-IDE-001', 'CB-IDE-003', 'CB-DEC-001', 'CB-DEC-003', 'CB-SOC-003', 'CB-SOC-004'],
  },
];

/**
 * 12-WEEK CURRICULUM OVERVIEW
 * Weeks 1-4: EXPERIENCE Phase
 * Weeks 5-8: RECOGNIZE Phase
 * Weeks 9-12: ALIGN Phase
 */
export const TWELVE_WEEK_OVERVIEW: Omit<WeeklyTheme, 'exercises'>[] = [
  // WEEKS 1-4: EXPERIENCE PHASE
  {
    week: 1,
    eraPhase: 'experience',
    theme: 'Understanding Your Brain on Addiction',
    domain: 'Neuroscience Foundation',
    pillar: 'Cognitive Reframing',
    description: 'Learn the neuroscience basics of addiction, the reward system, neuroplasticity, and hope for recovery.',
    dailyFocus: 'Brain basics, reward system, neuroplasticity, hope',
  },
  {
    week: 2,
    eraPhase: 'experience',
    theme: 'Recognizing Dysregulation',
    domain: 'Window of Tolerance',
    pillar: 'Emotional Regulation',
    description: 'Understand hyper/hypo arousal states and learn to recognize signs, patterns, and begin tracking.',
    dailyFocus: 'Hyper/hypo states, signs, patterns, tracking',
  },
  {
    week: 3,
    eraPhase: 'experience',
    theme: 'Down-Regulation Techniques',
    domain: 'Window of Tolerance - Hyperarousal',
    pillar: 'Emotional Regulation',
    description: 'Master practical techniques for calming your nervous system when it gets stuck in hyperarousal.',
    dailyFocus: 'Breathing, grounding, cold, movement, practice',
  },
  {
    week: 4,
    eraPhase: 'experience',
    theme: 'Naming Your Emotions',
    domain: 'Affect Labeling',
    pillar: 'Emotional Regulation',
    description: 'Develop emotional vocabulary and granularity to better understand and process your feelings.',
    dailyFocus: 'Emotion wheel, vocabulary, granularity, journaling',
  },

  // WEEKS 5-8: RECOGNIZE PHASE
  {
    week: 5,
    eraPhase: 'recognize',
    theme: 'Spotting Your Triggers',
    domain: 'Cognitive Reframing',
    pillar: 'Cognitive Reframing',
    description: 'Identify external and internal triggers, recognize patterns, and create your trigger map.',
    dailyFocus: 'External triggers, internal triggers, patterns, mapping',
  },
  {
    week: 6,
    eraPhase: 'recognize',
    theme: 'Understanding Your Micro-Blocks',
    domain: 'Traffic Light System',
    pillar: 'Identity Integration',
    description: 'Learn precision tracking with micro-block tags using the red/orange/green system.',
    dailyFocus: 'Red/orange/green, tracking, state changes, awareness',
  },
  {
    week: 7,
    eraPhase: 'recognize',
    theme: 'Distress Tolerance Toolkit',
    domain: 'Crisis Skills',
    pillar: 'Stress Resilience',
    description: 'Build your crisis skills toolkit with TIPP skills and learn distraction vs. tolerance.',
    dailyFocus: 'TIPP skills, distraction vs. tolerance, when to use',
  },
  {
    week: 8,
    eraPhase: 'recognize',
    theme: 'Radical Acceptance Practice',
    domain: 'Acceptance',
    pillar: 'Stress Resilience',
    description: 'Practice radical acceptance, learn what it is and isn\'t, and master turning the mind.',
    dailyFocus: 'What acceptance is/isn\'t, turning the mind, practice',
  },

  // WEEKS 9-12: ALIGN PHASE
  {
    week: 9,
    eraPhase: 'align',
    theme: 'Clarifying Your Values',
    domain: 'Values Compass',
    pillar: 'Identity Integration',
    description: 'Identify your core values, rank them, check alignment, and commit to values-based action.',
    dailyFocus: 'Identify values, rank, alignment check, action',
  },
  {
    week: 10,
    eraPhase: 'align',
    theme: 'Working with Resistance',
    domain: 'Growth Mindset',
    pillar: 'Identity Integration',
    description: 'Understand resistance as information, practice self-compassion, and build persistence.',
    dailyFocus: 'Resistance as information, self-compassion, persistence',
  },
  {
    week: 11,
    eraPhase: 'align',
    theme: 'Decision Mastery Basics',
    domain: 'Aligned Action',
    pillar: 'Decision Mastery',
    description: 'Master foundational decision skills: HALT, impulse pause, future self, and daily practice.',
    dailyFocus: 'HALT, impulse pause, future self, practice',
  },
  {
    week: 12,
    eraPhase: 'align',
    theme: 'Building Your Practice Library',
    domain: 'Ongoing Recovery',
    pillar: 'All Pillars',
    description: 'Review your favorites, design your weekly routine, commit to ongoing practice, and celebrate.',
    dailyFocus: 'Review favorites, weekly routine, commitment, celebration',
  },
];

/**
 * WEEK 1: UNDERSTANDING YOUR BRAIN ON ADDICTION
 * Full 7-day exercise design
 */
export const WEEK_1_EXERCISES: DailyExercise[] = [
  // DAY 1: EXPERIENCE (Monday)
  {
    week: 1,
    day: 1,
    eraPhase: 'experience',
    theme: 'Understanding Your Brain on Addiction',
    domain: 'Neuroscience Foundation',
    title: 'Welcome to Your Recovery Journey',
    estimatedTime: 15,
    format: 'video',
    content: {
      introduction: 'Welcome to Week 1. This week, you\'ll learn how addiction changes your brain—and why recovery is possible through neuroplasticity.',
      mainContent: 'https://example.com/videos/brain-on-addiction-intro.mp4', // Placeholder
      practice: 'Watch the 5-minute intro video, then complete the self-assessment: "Where are you now in your recovery journey?" Rate your current state across physical, emotional, and social dimensions.',
      reflection: 'What brings you hope as you begin this journey? Write 3 things you\'re curious to learn about your brain.',
    },
    relatedMicroBlocks: ['neuroscience-basics', 'neuroplasticity-foundation'],
    relatedNaviCues: [],
    successCriteria: 'Watched video and completed self-assessment',
  },

  // DAY 2: EXPERIENCE (Tuesday)
  {
    week: 1,
    day: 2,
    eraPhase: 'experience',
    theme: 'Understanding Your Brain on Addiction',
    domain: 'Neuroscience Foundation',
    title: 'The Hijacked Reward System',
    estimatedTime: 18,
    format: 'video',
    content: {
      introduction: 'Today you\'ll discover how addiction hijacks your brain\'s reward system—and why substances feel more compelling than natural rewards.',
      mainContent: [
        'Watch: "Your Brain Before and After Addiction" (8min animated video)',
        'Interactive Exercise: Rank these by dopamine spike - Sex, Cocaine, Food, Alcohol, Exercise',
        'Reveals correct order and explains the neuroscience behind each',
      ],
      practice: 'Complete the drag-and-drop ranking exercise. Notice which results surprise you.',
      reflection: 'What surprised you most about how your brain changed? How does understanding this science change how you see your past behaviors?',
    },
    relatedMicroBlocks: ['dopamine-reward-system', 'tolerance-withdrawal', 'brain-chemistry'],
    relatedNaviCues: [],
    successCriteria: 'Completed video and interactive ranking exercise',
  },

  // DAY 3: EXPERIENCE (Wednesday)
  {
    week: 1,
    day: 3,
    eraPhase: 'experience',
    theme: 'Understanding Your Brain on Addiction',
    domain: 'Neuroscience Foundation',
    title: 'Neuroplasticity: Your Brain Can Change',
    estimatedTime: 20,
    format: 'reading',
    content: {
      introduction: 'The most hopeful truth in neuroscience: your brain is not fixed. It can rewire, heal, and form new pathways.',
      mainContent: 'Building Block: "The Science of Neuroplasticity - How Recovery Rewires Your Brain"',
      practice: 'Read the Building Block (10-12min). As you read, highlight or note 3 key insights that give you hope.',
      reflection: 'If your brain can change, what would you most want to rewire? What new pathway would you like to build?',
    },
    relatedMicroBlocks: ['neuroplasticity', 'brain-rewiring', 'recovery-timeline'],
    relatedNaviCues: [],
    successCriteria: 'Read Building Block and identified 3 hopeful insights',
  },

  // DAY 4: RECOGNIZE (Thursday)
  {
    week: 1,
    day: 4,
    eraPhase: 'recognize',
    theme: 'Understanding Your Brain on Addiction',
    domain: 'Neuroscience Foundation',
    title: 'Spotting Your Brain Patterns',
    estimatedTime: 15,
    format: 'interactive',
    content: {
      introduction: 'Now that you understand the science, let\'s start noticing when your reward system activates in daily life.',
      mainContent: [
        'Pattern-spotting exercise throughout the day',
        'Notice 3 moments when you felt a strong craving, urge, or compulsion',
        'For each moment, track: What happened? What did you feel in your body? What thought came up?',
      ],
      practice: 'Use your Inner Compass to track each moment. Don\'t try to change anything—just notice.',
      reflection: 'At the end of the day: What patterns do you see? Are there specific times, places, or emotions that trigger your brain\'s reward system?',
    },
    relatedMicroBlocks: ['craving-awareness', 'body-signals', 'trigger-recognition'],
    relatedNaviCues: ['urge-surfing'],
    successCriteria: 'Tracked 3 moments of craving/urge using Inner Compass',
  },

  // DAY 5: RECOGNIZE (Friday)
  {
    week: 1,
    day: 5,
    eraPhase: 'recognize',
    theme: 'Understanding Your Brain on Addiction',
    domain: 'Neuroscience Foundation',
    title: 'The Timeline of Healing',
    estimatedTime: 17,
    format: 'audio',
    content: {
      introduction: 'Recovery isn\'t linear, but your brain follows predictable stages of healing. Understanding this timeline can help you be patient with yourself.',
      mainContent: 'Audio guide: "What to Expect: The First 90 Days and Beyond" (12min)',
      practice: 'Listen to the audio timeline. As you listen, note which stage you\'re in now and what comes next.',
      reflection: 'What\'s the hardest part of waiting for your brain to heal? How can you practice self-compassion during this process?',
    },
    relatedMicroBlocks: ['recovery-stages', 'paws-symptoms', 'healing-timeline'],
    relatedNaviCues: ['self-compassion'],
    successCriteria: 'Listened to audio and identified current recovery stage',
  },

  // DAY 6: ALIGN (Saturday)
  {
    week: 1,
    day: 6,
    eraPhase: 'align',
    theme: 'Understanding Your Brain on Addiction',
    domain: 'Neuroscience Foundation',
    title: 'Your Personal Brain Map',
    estimatedTime: 20,
    format: 'interactive',
    content: {
      introduction: 'Time to create your personal brain map—a visual guide to your reward system, triggers, and healing goals.',
      mainContent: [
        'Interactive exercise: Map Your Brain',
        'Step 1: Draw or describe your "before" brain (addiction patterns)',
        'Step 2: Identify your biggest triggers and where they live in your life',
        'Step 3: Sketch your "future" brain (desired pathways)',
        'Step 4: Name 3 actions that support rewiring',
      ],
      practice: 'Complete all 4 steps. This is YOUR map—make it personal, messy, real.',
      reflection: 'Looking at your map, what\'s the first small step you can take to start rewiring? Choose one action for this week.',
    },
    relatedMicroBlocks: ['self-awareness', 'goal-setting', 'brain-mapping'],
    relatedNaviCues: [],
    successCriteria: 'Created personal brain map with triggers and rewiring goals',
  },

  // DAY 7: ALIGN (Sunday)
  {
    week: 1,
    day: 7,
    eraPhase: 'align',
    theme: 'Understanding Your Brain on Addiction',
    domain: 'Neuroscience Foundation',
    title: 'Week 1 Reflection & Integration',
    estimatedTime: 12,
    format: 'reflection',
    content: {
      introduction: 'You made it through Week 1. Let\'s reflect on what you learned and celebrate your progress.',
      mainContent: [
        'Watch: "Marcus\'s Story - How Understanding My Brain Changed Everything" (5min testimonial)',
        'Week Review Questions:',
        '• What\'s the most important thing you learned this week?',
        '• How is your understanding of addiction different now?',
        '• What gives you hope for recovery?',
      ],
      practice: 'Answer the 3 reflection questions. Be honest and specific.',
      reflection: 'Next week, you\'ll learn to recognize dysregulation in your body. What questions do you have about that? What are you curious about?',
    },
    relatedMicroBlocks: ['self-reflection', 'integration', 'hope'],
    relatedNaviCues: [],
    successCriteria: 'Watched testimonial and completed week review',
  },
];

/**
 * Helper function to get all exercises for a specific week
 */
export function getWeekExercises(week: number): DailyExercise[] {
  // For now, only Week 1 is implemented
  if (week === 1) {
    return WEEK_1_EXERCISES;
  }
  
  // TODO: Implement Weeks 2-12
  return [];
}

/**
 * Helper function to get a specific day's exercise
 */
export function getDayExercise(week: number, day: number): DailyExercise | null {
  const weekExercises = getWeekExercises(week);
  return weekExercises.find(ex => ex.week === week && ex.day === day) || null;
}

/**
 * Helper function to get week overview
 */
export function getWeekOverview(week: number): Omit<WeeklyTheme, 'exercises'> | null {
  return TWELVE_WEEK_OVERVIEW.find(w => w.week === week) || null;
}

/**
 * Helper function to calculate completion percentage
 */
export function calculateWeekProgress(week: number, completedDays: number[]): number {
  const totalDays = 7;
  const completed = completedDays.filter(day => day >= 1 && day <= 7).length;
  return Math.round((completed / totalDays) * 100);
}

/**
 * ERA Phase Color Helpers
 */
export const ERA_COLORS = {
  experience: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
  },
  recognize: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
  },
  align: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
  },
} as const;

/**
 * Format Helper
 */
export const FORMAT_ICONS = {
  video: '🎥',
  audio: '🎧',
  reading: '📖',
  interactive: '✨',
  reflection: '💭',
} as const;
