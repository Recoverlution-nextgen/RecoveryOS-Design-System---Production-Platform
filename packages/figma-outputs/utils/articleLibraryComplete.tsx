/**
 * Complete Article Library - Ready for 180+ Articles
 * 
 * Current Status: Foundation with sample articles + full utility functions
 * Next Step: Expand to 180+ articles following these templates
 * 
 * infiniteK Design System Integration
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
  image?: string; // Hero image for article
  content: ArticleSection[];
  relatedArticles?: number[];
}

export interface ArticleSection {
  heading?: string;
  content: string;
  type?: 'text' | 'practice' | 'reflection' | 'key-point' | 'quote';
}

// Pillar metadata - Updated to infiniteK colors
export const pillarMetadata: Record<PillarType, { name: string; color: string; icon: string; description: string }> = {
  'emotional-regulation': {
    name: 'Emotional Regulation',
    color: '#7C67FF', // infiniteK purple
    icon: '❤️',
    description: "How do I feel what I feel without being consumed by it?"
  },
  'stress-resilience': {
    name: 'Stress Resilience',
    color: '#C49DC4', // Soft lavender
    icon: '🌊',
    description: "How do I stay steady when everything feels like too much?"
  },
  'social-connectivity': {
    name: 'Social Connectivity',
    color: '#9D8FFF', // Light purple
    icon: '🤝',
    description: "How do I connect when isolation feels safer?"
  },
  'cognitive-reframing': {
    name: 'Cognitive Reframing',
    color: '#3E2BB8', // infiniteK deep purple
    icon: '💭',
    description: "How do I shift the story I tell myself?"
  },
  'identity-integration': {
    name: 'Identity Integration',
    color: '#5739FB', // infiniteK bright purple
    icon: '🌱',
    description: "How do I become whole when I have felt so fractured?"
  },
  'decision-mastery': {
    name: 'Decision Mastery',
    color: '#E1A57E', // Warm tan
    icon: '⚖️',
    description: "How do I make the hard choice when cravings scream louder than values?"
  }
};

// Sample Articles - Templates for the 180+ library
export const articleLibrary: Article[] = [
  {
    id: 1,
    title: "What Is Emotional Regulation? A Science Backed Introduction",
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    thoughtLeader: 'Dan Siegel',
    microBlocks: ['Emotional awareness', 'Window of tolerance'],
    type: 'Theory',
    difficulty: 'Beginner',
    readTime: 8,
    journeyWeek: 1,
    summary: "Understanding what emotional regulation really means and why it matters for recovery. Learn the neuroscience behind managing emotions without suppressing them.",
    image: "https://images.unsplash.com/photo-1759185408853-45d428437c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHB1cnBsZSUyMGdyYWRpZW50JTIwY2FsbXxlbnwxfHx8fDE3NjExNjI4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    content: [
      {
        heading: "What This Article Covers",
        content: "Emotional regulation is not about controlling your emotions or pushing them away. It's about developing a healthy relationship with what you feel. In this article, you'll learn what emotional regulation truly means from a neuroscience perspective, why it's essential for recovery, and how your brain is designed to help you feel without being overwhelmed.",
        type: 'text'
      },
      {
        heading: "The Common Misconception",
        content: "Many people think emotional regulation means staying calm all the time or never getting angry, sad, or anxious. This is a myth that can actually harm your recovery. True emotional regulation means experiencing the full range of human emotions while maintaining your ability to function and make choices aligned with your values.",
        type: 'text'
      },
      {
        heading: "What Emotional Regulation Actually Is",
        content: "Dr. Dan Siegel, a clinical professor of psychiatry at UCLA and founder of interpersonal neurobiology, defines emotional regulation as the ability to notice, name, and navigate your emotional experiences. It's a three-step process:\n\n1. **Notice** - Developing awareness of what you're feeling in your body and mind\n2. **Name** - Putting words to your emotional experience (\"I'm feeling anxious\" vs \"I feel bad\")\n3. **Navigate** - Choosing how to respond rather than reacting automatically\n\nThis process happens in your brain through the connection between your prefrontal cortex (thinking brain) and your limbic system (emotional brain). When these two systems communicate well, you can feel emotions fully while still thinking clearly.",
        type: 'key-point'
      },
      {
        heading: "Why This Matters in Recovery",
        content: "When you're in active addiction, substances often serve as a crude emotional regulation tool. They push you outside your window temporarily, then crash you below it. In recovery, you're learning to stay in your window naturally through awareness and skill building.\n\nResearch shows that people who develop emotional regulation skills have:\n- 65% lower relapse rates in the first year\n- Better relationships and social support\n- Reduced anxiety and depression\n- Improved decision making abilities\n- Greater overall life satisfaction",
        type: 'text'
      },
      {
        content: "\"Name it to tame it. When we can put words to our internal experience, we can begin to regulate it.\" - Dr. Dan Siegel",
        type: 'quote'
      },
      {
        heading: "Your First Step",
        content: "Start simple. For the next 24 hours, practice noticing:\n\n1. **What am I feeling right now?** (Don't judge it, just notice)\n2. **Where do I feel it in my body?** (Chest? Stomach? Shoulders?)\n3. **Can I name it?** (Use specific emotion words)\n\nThat's it. You don't need to change anything. Just notice, locate, and name. You're already building your emotional regulation skills.",
        type: 'practice'
      }
    ],
    relatedArticles: [2, 3]
  },
  {
    id: 2,
    title: "The Window of Tolerance: Your Emotional Sweet Spot",
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    thoughtLeader: 'Dan Siegel',
    microBlocks: ['Window of tolerance', 'Hyper/hypoarousal'],
    type: 'Theory',
    difficulty: 'Beginner',
    readTime: 10,
    journeyWeek: 1,
    summary: "Deep dive into understanding your window of tolerance and how to recognize when you've left it. Learn practical ways to return to your optimal zone.",
    image: "https://images.unsplash.com/photo-1761077207277-6ecf4f46998d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHdhdGVyJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NjExNjI4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    content: [
      {
        heading: "Understanding Your Window",
        content: "Think of your nervous system like a guitar string. Too tight (hyperarousal), and it snaps. Too loose (hypoarousal), and it won't make sound. Just right (within your window), and it creates beautiful music.\n\nDr. Dan Siegel's window of tolerance concept explains why sometimes you can handle stress gracefully, and other times the smallest thing sends you spiraling. It's not about willpower - it's about where you are in your window.",
        type: 'text'
      },
      {
        heading: "The Three Zones",
        content: "**HYPERAROUSAL (Above the Window)**\n\nWhen you're pushed above your window, your sympathetic nervous system takes over. This is your 'fight or flight' response. You might experience:\n\n- Racing thoughts\n- Heart pounding\n- Feeling overwhelmed or panicked\n- Anger or irritability\n- Hypervigilance (constantly scanning for threats)\n- Difficulty concentrating\n- Impulsive urges\n\nIn this state, your thinking brain (prefrontal cortex) goes partially offline. This is why you might say or do things you regret when you're 'too activated.'\n\n**WITHIN THE WINDOW (Optimal Zone)**\n\nThis is your sweet spot. Here you can:\n\n- Feel emotions without being consumed\n- Think clearly while still feeling\n- Make value based decisions\n- Connect with others authentically\n- Learn and integrate new information\n- Respond rather than react\n\n**HYPOAROUSAL (Below the Window)**\n\nWhen you drop below your window, your dorsal vagal system activates. This is your 'freeze' or shutdown response. You might experience:\n\n- Emotional numbness\n- Disconnection from your body\n- Difficulty making decisions\n- Low energy or exhaustion\n- Feeling 'checked out' or dissociated\n- Depression or hopelessness\n- Difficulty caring about anything",
        type: 'key-point'
      },
      {
        content: "\"The wider your window of tolerance, the more resilient you become. Not because stress goes away, but because you can stay present with it.\" - Dr. Dan Siegel",
        type: 'quote'
      },
      {
        heading: "Track Your Window",
        content: "For the next week, check in with yourself 3 times a day:\n\n**Morning, Afternoon, Evening:**\n1. Am I in my window, above it, or below it?\n2. What might have influenced this?\n3. What can I do right now to support myself?\n\nSimply noticing patterns will help you understand your unique nervous system and what helps you stay regulated.",
        type: 'reflection'
      }
    ],
    relatedArticles: [1, 3]
  },
  {
    id: 3,
    title: "Name It to Tame It: The Neuroscience of Emotion Labeling",
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    thoughtLeader: 'Dan Siegel, Lisa Feldman Barrett',
    microBlocks: ['Affect labeling', 'Emotional granularity'],
    type: 'Theory',
    difficulty: 'Intermediate',
    readTime: 12,
    journeyWeek: 2,
    summary: "Discover the powerful neuroscience behind putting words to your emotions. Learn why 'naming it' actually changes what happens in your brain.",
    image: "https://images.unsplash.com/photo-1748183607998-30e288846885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbmF0dXJlJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzYxMTYyODkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: [
      {
        heading: "A Powerful Discovery",
        content: "In 2007, UCLA neuroscientist Matthew Lieberman published groundbreaking research that changed how we understand emotional processing. Using fMRI brain scans, he discovered that when people put their feelings into words, activity in the amygdala (the brain's fear and emotion center) significantly decreased, while activity in the prefrontal cortex (thinking and regulation center) increased.\n\nIn other words: Simply naming your emotion changes what's happening in your brain. Dr. Dan Siegel called this 'name it to tame it' - one of the most powerful tools in emotional regulation.",
        type: 'text'
      },
      {
        heading: "Why 'Bad' or 'Stressed' Isn't Enough",
        content: "Dr. Lisa Feldman Barrett, neuroscientist at Northeastern University, discovered that emotional granularity - the ability to use precise emotion words - directly correlates with mental health outcomes.\n\nPeople with high emotional granularity (who use specific emotion words) have:\n- Lower rates of depression and anxiety\n- Better emotion regulation\n- Fewer physical health problems\n- Better decision making under stress\n- Higher resilience\n\n**Low Granularity:**\n'I feel bad.'\n'I'm stressed.'\n'I'm upset.'\n\n**High Granularity:**\n'I feel disappointed that the meeting was canceled.'\n'I'm anxious about tomorrow's presentation.'\n'I'm frustrated with myself for forgetting to call back.'\n\nThe more specific you can be, the more your brain can do something useful with the information.",
        type: 'key-point'
      },
      {
        heading: "How to Practice Affect Labeling",
        content: "**The 4 Part Process:**\n\n1. **Pause** - Stop and check in with yourself\n2. **Scan** - Notice what you feel in your body\n3. **Name** - Find the most accurate emotion word(s)\n4. **Acknowledge** - Say it out loud or write it down\n\n**Example:**\nInstead of: 'I'm just stressed.'\nTry: 'I notice tension in my shoulders and my mind is racing. I think what I'm actually feeling is anxious about the upcoming meeting and a bit resentful that I have to go when I'm already overwhelmed.'\n\nYou just activated your prefrontal cortex, reduced amygdala activity, and gave your brain specific information it can work with.",
        type: 'practice'
      },
      {
        content: "\"Between the stimulus and the response, there is a space. In that space lies our power to choose our response.\" - Viktor Frankl\n\nNaming emotions creates that space.",
        type: 'quote'
      }
    ],
    relatedArticles: [1, 2]
  }
];

// Utility Functions
export function getArticleById(id: number): Article | undefined {
  return articleLibrary.find(article => article.id === id);
}

export function getRelatedArticles(articleId: number): Article[] {
  const article = getArticleById(articleId);
  if (!article || !article.relatedArticles) return [];
  
  return article.relatedArticles
    .map(id => getArticleById(id))
    .filter(Boolean) as Article[];
}

export function getArticlesByPillar(pillar: PillarType): Article[] {
  return articleLibrary.filter(article => article.pillar === pillar);
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articleLibrary.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.summary.toLowerCase().includes(lowerQuery) ||
    article.thoughtLeader.toLowerCase().includes(lowerQuery) ||
    article.microBlocks.some(block => block.toLowerCase().includes(lowerQuery))
  );
}

export function getArticlesByDifficulty(difficulty: ArticleDifficulty): Article[] {
  return articleLibrary.filter(article => article.difficulty === difficulty);
}

export function getArticlesByType(type: ArticleType): Article[] {
  return articleLibrary.filter(article => article.type === type);
}

export function getJourneyWeekArticles(weekNumber: number): Article[] {
  return articleLibrary.filter(article => article.journeyWeek === weekNumber);
}

// Export all for easy importing
export { articleLibrary as default };
