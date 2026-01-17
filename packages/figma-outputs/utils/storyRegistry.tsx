/**
 * STORY REGISTRY - Central mapping of all ST# stories
 * 
 * This is the single source of truth for story-to-page relationships.
 * Use this to create bidirectional links between DNA HUB and Content Lab.
 */

export interface Story {
  id: string; // e.g., "ST1", "ST42"
  title: string;
  route: string; // PageType from router
  type: "foundation" | "pillar" | "strategy" | "content-tool" | "intelligence" | "management" | "therapeutic";
  status: "complete" | "in-progress" | "planned";
  tags?: string[]; // Related concepts
}

export const STORY_REGISTRY: Record<string, Story> = {
  // Foundation Stories
  "ST1": {
    id: "ST1",
    title: "Our Anchor",
    route: "docs-brand-anchor",
    type: "foundation",
    status: "complete",
    tags: ["brand", "philosophy", "design-principles"],
  },
  "ST2": {
    id: "ST2",
    title: "Human Cognition Platform (HCP)",
    route: "docs-hcp",
    type: "foundation",
    status: "complete",
    tags: ["architecture", "three-layer-system", "intelligence"],
  },
  "ST3": {
    id: "ST3",
    title: "ERA Flow",
    route: "docs-era-flow",
    type: "foundation",
    status: "complete",
    tags: ["learning-mechanics", "exploration-reflection-action"],
  },
  "ST4": {
    id: "ST4",
    title: "Infinite Canvas Principle",
    route: "docs-infinite-canvas",
    type: "foundation",
    status: "complete",
    tags: ["design-philosophy", "navicues", "building-blocks"],
  },

  // Six Pillars Stories
  "ST5": {
    id: "ST5",
    title: "Chapter One: Steady the Storm (Emotional Regulation)",
    route: "docs-pillar-emotional-regulation",
    type: "pillar",
    status: "complete",
    tags: ["emotional-regulation", "neuroscience", "therapeutic"],
  },
  "ST6": {
    id: "ST6",
    title: "Chapter Two: Hold the Line (Stress Resilience)",
    route: "docs-pillar-stress-resilience",
    type: "pillar",
    status: "complete",
    tags: ["stress-resilience", "neuroscience", "therapeutic"],
  },
  "ST7": {
    id: "ST7",
    title: "Chapter Three: Build the Bridge (Social Connectivity)",
    route: "docs-pillar-social-connectivity",
    type: "pillar",
    status: "complete",
    tags: ["social-connectivity", "neuroscience", "therapeutic"],
  },
  "ST8": {
    id: "ST8",
    title: "Chapter Four: Change the Lens (Cognitive Reframing)",
    route: "docs-pillar-cognitive-reframing",
    type: "pillar",
    status: "complete",
    tags: ["cognitive-reframing", "neuroscience", "therapeutic"],
  },
  "ST9": {
    id: "ST9",
    title: "Chapter Five: Become Who You Practice (Identity Integration)",
    route: "docs-pillar-identity-integration",
    type: "pillar",
    status: "complete",
    tags: ["identity-integration", "neuroscience", "therapeutic"],
  },
  "ST10": {
    id: "ST10",
    title: "Chapter Six: Make Space to Choose (Decision Mastery)",
    route: "docs-pillar-decision-mastery",
    type: "pillar",
    status: "complete",
    tags: ["decision-mastery", "neuroscience", "therapeutic"],
  },

  // Strategy & Vision Stories
  "ST11": {
    id: "ST11",
    title: "Sphere Principle",
    route: "docs-sphere-principle",
    type: "strategy",
    status: "complete",
    tags: ["visual-system", "recovery-model", "design"],
  },
  "ST12": {
    id: "ST12",
    title: "Content Build-Out Roadmap",
    route: "docs-content-roadmap",
    type: "strategy",
    status: "complete",
    tags: ["roadmap", "content-strategy", "planning"],
  },

  // Content Infrastructure Stories (ST42-46)
  "ST42": {
    id: "ST42",
    title: "Weekly ERA Sprints - 12-Week Journeys",
    route: "docs-weekly-era-sprints",
    type: "content-tool",
    status: "complete",
    tags: ["era-flow", "journeys", "therapeutic-content", "12-weeks"],
  },
  "ST43": {
    id: "ST43",
    title: "Micro-Block Library - 48 Therapeutic Practices",
    route: "docs-micro-block-library",
    type: "content-tool",
    status: "complete",
    tags: ["micro-blocks", "neuroscience", "brain-states", "six-pillars"],
  },
  "ST45": {
    id: "ST45",
    title: "Content Mapping & Gap Analysis",
    route: "docs-content-mapping",
    type: "content-tool",
    status: "complete",
    tags: ["content-mapping", "gap-analysis", "resource-tracking"],
  },
  "ST46": {
    id: "ST46",
    title: "Video Library Audit & Gap Analysis",
    route: "docs-video-library-audit",
    type: "content-tool",
    status: "complete",
    tags: ["video", "gap-analysis", "content-audit"],
  },

  // Hub Architecture & Content Suites
  "ST47": {
    id: "ST47",
    title: "DNA HUB + Content Lab Architecture",
    route: "dna-hub",
    type: "strategy",
    status: "complete",
    tags: ["documentation", "hub-system", "knowledge-management"],
  },
  "ST48": {
    id: "ST48",
    title: "NaviCue Content Suite - Phase 1",
    route: "docs-navicue-suite",
    type: "therapeutic",
    status: "complete",
    tags: ["navicues", "therapeutic-content", "micro-blocks", "infinite-canvas"],
  },
};

/**
 * Get a story by ID
 */
export const getStory = (id: string): Story | undefined => {
  return STORY_REGISTRY[id];
};

/**
 * Get all stories of a specific type
 */
export const getStoriesByType = (type: Story["type"]): Story[] => {
  return Object.values(STORY_REGISTRY).filter(story => story.type === type);
};

/**
 * Get all stories with a specific tag
 */
export const getStoriesByTag = (tag: string): Story[] => {
  return Object.values(STORY_REGISTRY).filter(story => 
    story.tags?.includes(tag)
  );
};

/**
 * Get all stories with a specific status
 */
export const getStoriesByStatus = (status: Story["status"]): Story[] => {
  return Object.values(STORY_REGISTRY).filter(story => story.status === status);
};

/**
 * Parse text for @ST# mentions and return array of found story IDs
 */
export const parseStoryMentions = (text: string): string[] => {
  const regex = /@ST(\d+)/g;
  const matches = text.matchAll(regex);
  const storyIds: string[] = [];
  
  for (const match of matches) {
    const storyId = `ST${match[1]}`;
    if (STORY_REGISTRY[storyId]) {
      storyIds.push(storyId);
    }
  }
  
  return storyIds;
};

/**
 * Get related stories for a given story (based on shared tags)
 */
export const getRelatedStories = (storyId: string, limit: number = 5): Story[] => {
  const story = STORY_REGISTRY[storyId];
  if (!story || !story.tags) return [];
  
  const related = Object.values(STORY_REGISTRY)
    .filter(s => s.id !== storyId) // Exclude self
    .filter(s => s.tags?.some(tag => story.tags?.includes(tag))) // Shared tags
    .sort((a, b) => {
      // Sort by number of shared tags
      const aShared = a.tags?.filter(tag => story.tags?.includes(tag)).length || 0;
      const bShared = b.tags?.filter(tag => story.tags?.includes(tag)).length || 0;
      return bShared - aShared;
    })
    .slice(0, limit);
  
  return related;
};

/**
 * Get completion stats
 */
export const getStoryStats = () => {
  const all = Object.values(STORY_REGISTRY);
  const complete = all.filter(s => s.status === "complete").length;
  const inProgress = all.filter(s => s.status === "in-progress").length;
  const planned = all.filter(s => s.status === "planned").length;
  
  return {
    total: all.length,
    complete,
    inProgress,
    planned,
    completionRate: Math.round((complete / all.length) * 100),
  };
};
