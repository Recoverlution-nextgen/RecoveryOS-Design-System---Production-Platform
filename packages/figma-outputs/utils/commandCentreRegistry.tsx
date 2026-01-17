/**
 * COMMAND CENTRE REGISTRY
 * 
 * Single source of truth for all Command Centre content.
 * Powers universal search, cross-linking, and metadata tracking.
 * 
 * Every page, story, component, and principle lives here.
 */

export type Category = 
  | "Foundation"
  | "System" 
  | "Content"
  | "Platform"
  | "Design"
  | "Tools";

export type Status = 
  | "complete"
  | "in-progress"
  | "planned"
  | "needs-review";

export interface RegistryPage {
  id: string;
  title: string;
  category: Category;
  route: string;
  status: Status;
  version: string;
  lastUpdated: string;
  owner: string;
  description: string;
  dependencies?: string[];
  relatedPages?: string[];
  tags?: string[];
  icon?: string;
}

export interface Story {
  id: string;
  number: number;
  title: string;
  status: Status;
  category: string;
  description: string;
  route?: string;
  dependencies?: string[];
  relatedStories?: string[];
}

/**
 * ALL COMMAND CENTRE PAGES
 */
export const COMMAND_CENTRE_PAGES: RegistryPage[] = [
  // FOUNDATION
  {
    id: "brand-anchor",
    title: "Brand Anchor",
    category: "Foundation",
    route: "docs-brand-anchor",
    status: "complete",
    version: "2.0",
    lastUpdated: "2025-10-22",
    owner: "Product Team",
    description: "Product DNA, philosophy, messaging lab, and core values",
    dependencies: [],
    relatedPages: ["messaging-matrix", "design-system"],
    tags: ["dna", "philosophy", "messaging", "brand", "values"],
    icon: "CircleDot"
  },
  {
    id: "how-we-build",
    title: "How We Build",
    category: "Foundation",
    route: "docs-how-we-build",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-15",
    owner: "Product Team",
    description: "Building principles, decision framework, and architectural values",
    dependencies: ["brand-anchor"],
    relatedPages: ["tech-stack"],
    tags: ["principles", "architecture", "philosophy"],
    icon: "Code"
  },

  // SYSTEM
  {
    id: "hcp",
    title: "Human Cognition Platform",
    category: "System",
    route: "docs-hcp",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Product Team",
    description: "Three-layer architecture: Intelligence, Therapeutic, Human layers",
    dependencies: ["brand-anchor"],
    relatedPages: ["era-flow", "sphere-principle"],
    tags: ["architecture", "framework", "hcp", "system"],
    icon: "Layers"
  },
  {
    id: "era-flow",
    title: "ERA Flow",
    category: "System",
    route: "docs-era-flow",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Product Team",
    description: "Exploration → Reflection → Action: Turn insights into reflexes",
    dependencies: ["hcp"],
    relatedPages: ["journey-infrastructure", "weekly-era-sprints"],
    tags: ["era", "framework", "flow", "therapeutic"],
    icon: "GitBranch"
  },
  {
    id: "sphere-principle",
    title: "Sphere Principle",
    category: "System",
    route: "docs-sphere-principle",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Product Team",
    description: "Visual system for representing recovery as continuous, multi-dimensional growth",
    dependencies: ["six-pillars"],
    relatedPages: ["hcp"],
    tags: ["visualization", "framework", "sphere"],
    icon: "CircleDot"
  },
  {
    id: "infinite-canvas",
    title: "Infinite Canvas Principle",
    category: "System",
    route: "docs-infinite-canvas",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Product Team",
    description: "NaviCues spark curiosity, Building Blocks enable infinite exploration",
    dependencies: ["era-flow"],
    relatedPages: ["navicue-suite", "building-blocks"],
    tags: ["design", "philosophy", "navigation", "exploration"],
    icon: "Infinity"
  },
  {
    id: "journey-infrastructure",
    title: "Journey Infrastructure",
    category: "System",
    route: "docs-journey-infrastructure",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-20",
    owner: "Product Team",
    description: "The NOW Principle: No timelines, no completion tracking, always in the now",
    dependencies: ["era-flow"],
    relatedPages: ["weekly-era-sprints", "navicue-suite"],
    tags: ["journey", "now-principle", "infrastructure"],
    icon: "Sparkles"
  },

  // CONTENT
  {
    id: "six-pillars",
    title: "Six Pillars",
    category: "Content",
    route: "docs-pillars",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Clinical Team",
    description: "Therapeutic framework: Emotional Regulation, Stress Resilience, Social Connectivity, Cognitive Reframing, Identity Integration, Decision Mastery",
    dependencies: [],
    relatedPages: ["micro-blocks", "weekly-era-sprints"],
    tags: ["pillars", "therapeutic", "framework", "clinical"],
    icon: "Layers"
  },
  {
    id: "micro-blocks",
    title: "Micro-Block Library",
    category: "Content",
    route: "docs-micro-block-library",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-15",
    owner: "Clinical Team",
    description: "48 fundamental brain states and therapeutic practices across all pillars",
    dependencies: ["six-pillars"],
    relatedPages: ["weekly-era-sprints", "content-mapping"],
    tags: ["micro-blocks", "neuroscience", "brain-states", "practices"],
    icon: "Grid3x3"
  },
  {
    id: "weekly-era-sprints",
    title: "Weekly ERA Sprints",
    category: "Content",
    route: "docs-weekly-era-sprints",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-15",
    owner: "Clinical Team",
    description: "12-week structured journeys mapping therapeutic content to the ERA flow",
    dependencies: ["era-flow", "micro-blocks"],
    relatedPages: ["journey-infrastructure", "navicue-suite"],
    tags: ["journey", "era", "sprints", "12-week", "content"],
    icon: "Calendar"
  },
  {
    id: "content-mapping",
    title: "Content Mapping System",
    category: "Content",
    route: "docs-content-mapping",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-15",
    owner: "Content Team",
    description: "Tag and track which resources target which micro-blocks for strategic gap analysis",
    dependencies: ["micro-blocks"],
    relatedPages: ["video-library-audit"],
    tags: ["content", "mapping", "tagging", "analytics"],
    icon: "Tags"
  },
  {
    id: "video-library-audit",
    title: "Video Library Audit",
    category: "Content",
    route: "docs-video-library-audit",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-15",
    owner: "Content Team",
    description: "Comprehensive audit of video content with coverage matrix and gap prioritization",
    dependencies: ["content-mapping"],
    relatedPages: ["micro-blocks"],
    tags: ["video", "audit", "content", "coverage"],
    icon: "Video"
  },
  {
    id: "navicue-suite",
    title: "NaviCue Suite",
    category: "Content",
    route: "docs-navicue-suite",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-18",
    owner: "Product Team",
    description: "Complete framework: NaviCue types, scoring engine, library, and dynamic serving",
    dependencies: ["infinite-canvas", "micro-blocks"],
    relatedPages: ["journey-infrastructure", "building-blocks"],
    tags: ["navicues", "micro-interventions", "framework"],
    icon: "Zap"
  },
  {
    id: "navicue-arsenal",
    title: "NaviCue Arsenal",
    category: "Content",
    route: "navicue-arsenal",
    status: "complete",
    version: "1.0",
    lastUpdated: "2024-12-23",
    owner: "Product Team",
    description: "Belief transformation command center: Ladders, heatmaps, voice archetypes, and live demos",
    dependencies: ["navicue-suite", "micro-blocks"],
    relatedPages: ["navicue-suite", "journey-infrastructure"],
    tags: ["navicues", "belief-change", "arsenal", "voices", "sequences"],
    icon: "Zap"
  },
  {
    id: "content-lab",
    title: "Content Lab",
    category: "Content",
    route: "content-lab",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-18",
    owner: "Content Team",
    description: "Jira-style workspace for building and tracking therapeutic content",
    dependencies: [],
    relatedPages: ["weekly-era-sprints", "micro-blocks", "navicue-suite"],
    tags: ["workspace", "content", "building", "tools"],
    icon: "LayoutGrid"
  },

  // PLATFORM
  {
    id: "core-features",
    title: "Core Features",
    category: "Platform",
    route: "docs-core-features",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Product Team",
    description: "The 10 functional blocks that define Recoverlution",
    dependencies: ["brand-anchor"],
    relatedPages: ["feature-definitions", "roadmap"],
    tags: ["features", "platform", "roadmap"],
    icon: "Zap"
  },
  {
    id: "feature-definitions",
    title: "Feature Definitions",
    category: "Platform",
    route: "docs-feature-definitions",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Product Team",
    description: "What each feature is (and isn't)",
    dependencies: ["core-features"],
    relatedPages: ["brand-anchor"],
    tags: ["features", "definitions", "clarity"],
    icon: "FileText"
  },
  {
    id: "roadmap",
    title: "Content Build-Out Roadmap",
    category: "Platform",
    route: "docs-content-roadmap",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Product Team",
    description: "Strategic plan for NaviCues, Building Blocks, and therapeutic content creation",
    dependencies: [],
    relatedPages: ["navicue-suite", "weekly-era-sprints"],
    tags: ["roadmap", "strategy", "planning"],
    icon: "Map"
  },

  // DESIGN
  {
    id: "dna-hub",
    title: "DNA Hub",
    category: "Design",
    route: "dna-hub",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-20",
    owner: "Design Team",
    description: "Central hub for design system, assets, and visual standards",
    dependencies: [],
    relatedPages: ["design-system", "asset-manager", "messaging-matrix"],
    tags: ["design", "hub", "navigation"],
    icon: "Home"
  },
  {
    id: "design-system",
    title: "Design System Documentation",
    category: "Design",
    route: "dna-design-system",
    status: "complete",
    version: "2.0",
    lastUpdated: "2025-10-22",
    owner: "Design Team",
    description: "Complete design system: principles, components, patterns, and page templates",
    dependencies: ["brand-anchor"],
    relatedPages: ["messaging-matrix", "asset-manager"],
    tags: ["design", "components", "patterns", "standards"],
    icon: "Layers"
  },
  {
    id: "asset-manager",
    title: "Image Asset Manager",
    category: "Design",
    route: "dna-asset-manager",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-21",
    owner: "Design Team",
    description: "Browse, search, and manage hero images from Pexels and Unsplash with live API integration",
    dependencies: [],
    relatedPages: ["design-system"],
    tags: ["images", "assets", "pexels", "unsplash", "api"],
    icon: "Image"
  },
  {
    id: "messaging-matrix",
    title: "Messaging Matrix",
    category: "Design",
    route: "docs-brand-anchor",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-22",
    owner: "Product Team",
    description: "Complete map of every messaging touchpoint across the platform - ensures 100% consistency",
    dependencies: ["brand-anchor"],
    relatedPages: ["design-system"],
    tags: ["messaging", "copy", "consistency", "brand"],
    icon: "MessageSquare"
  },
  {
    id: "card-backgrounds",
    title: "Card Background Gallery",
    category: "Design",
    route: "demo-card-backgrounds",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-21",
    owner: "Design Team",
    description: "Map custom Pixabay abstracts to your 7 dashboard cards with visual preview and assignment system",
    dependencies: [],
    relatedPages: ["asset-manager", "design-system"],
    tags: ["backgrounds", "dashboard", "pixabay", "cards"],
    icon: "Palette"
  },

  // TOOLS
  {
    id: "email-blast",
    title: "Email Blast Tool",
    category: "Tools",
    route: "admin-email-blast",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-15",
    owner: "Marketing Team",
    description: "Campaign builder for CEO outreach with template system",
    dependencies: [],
    relatedPages: [],
    tags: ["email", "marketing", "outreach", "tool"],
    icon: "Mail"
  },
  {
    id: "linkedin-carousel",
    title: "LinkedIn Carousel Generator",
    category: "Tools",
    route: "admin-linkedin-carousel",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-10",
    owner: "Marketing Team",
    description: "Create engaging LinkedIn carousel posts with brand styling",
    dependencies: [],
    relatedPages: [],
    tags: ["linkedin", "social", "marketing", "carousel"],
    icon: "Presentation"
  },
  {
    id: "pixabay-test",
    title: "Pixabay API Test",
    category: "Tools",
    route: "admin-pixabay-test",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-10-18",
    owner: "Engineering",
    description: "Diagnostic tool for testing Pixabay API integration and search queries",
    dependencies: [],
    relatedPages: ["asset-manager"],
    tags: ["api", "testing", "pixabay", "diagnostic"],
    icon: "TestTube"
  },
  {
    id: "component-architecture-lab",
    title: "Component Architecture Lab",
    category: "Design",
    route: "component-architecture-lab",
    status: "complete",
    version: "1.0",
    lastUpdated: "2025-11-04",
    owner: "Design Team",
    description: "Visual matrix system for managing component patterns, reusability decisions, and section auditing",
    dependencies: ["design-system"],
    relatedPages: ["design-system", "dna-hub"],
    tags: ["components", "architecture", "patterns", "matrix", "cms", "organization"],
    icon: "Layers"
  }
];

/**
 * ALL STORIES (ST0-ST54+)
 */
export const STORY_REGISTRY: Story[] = [
  {
    id: "ST42",
    number: 42,
    title: "Weekly ERA Sprints",
    status: "complete",
    category: "Content",
    description: "12-week structured journeys mapped to the ERA flow",
    route: "docs-weekly-era-sprints",
    dependencies: [],
    relatedStories: ["ST43", "ST44"]
  },
  {
    id: "ST43",
    number: 43,
    title: "Micro-Block Library",
    status: "complete",
    category: "Content",
    description: "48 fundamental brain states and therapeutic practices",
    route: "docs-micro-block-library",
    dependencies: ["ST42"],
    relatedStories: ["ST44", "ST45"]
  },
  {
    id: "ST44",
    number: 44,
    title: "Content Mapping System",
    status: "complete",
    category: "Content",
    description: "Tag and track resources mapped to micro-blocks",
    route: "docs-content-mapping",
    dependencies: ["ST43"],
    relatedStories: ["ST45", "ST46"]
  },
  {
    id: "ST45",
    number: 45,
    title: "Content Mapping & Tagging",
    status: "complete",
    category: "Content",
    description: "Strategic gap analysis through content tagging",
    route: "docs-content-mapping",
    dependencies: ["ST43", "ST44"],
    relatedStories: ["ST46"]
  },
  {
    id: "ST46",
    number: 46,
    title: "Video Library Audit",
    status: "complete",
    category: "Content",
    description: "Comprehensive audit with coverage matrix",
    route: "docs-video-library-audit",
    dependencies: ["ST44", "ST45"],
    relatedStories: ["ST47"]
  },
  {
    id: "ST47",
    number: 47,
    title: "Cross-Referencing System",
    status: "complete",
    category: "Platform",
    description: "Auto-linking between related content",
    route: "docs-brand-anchor",
    dependencies: [],
    relatedStories: []
  },
  {
    id: "ST48",
    number: 48,
    title: "NaviCue Suite Framework",
    status: "complete",
    category: "Content",
    description: "Complete NaviCue framework with types, scoring, and library",
    route: "docs-navicue-suite",
    dependencies: ["ST43"],
    relatedStories: ["ST49"]
  },
  {
    id: "ST49",
    number: 49,
    title: "Journey Infrastructure - NOW Principle",
    status: "complete",
    category: "Platform",
    description: "Patient-facing journey with no timelines, no completion tracking",
    route: "docs-journey-infrastructure",
    dependencies: ["ST42", "ST48"],
    relatedStories: ["ST50"]
  },
  {
    id: "ST50",
    number: 50,
    title: "Momentum Data Architecture",
    status: "complete",
    category: "Platform",
    description: "Living analytics dashboard with inner metrics visualization",
    route: "docs-brand-anchor",
    dependencies: ["ST49"],
    relatedStories: ["ST51"]
  },
  {
    id: "ST51",
    number: 51,
    title: "Integration Specifications",
    status: "complete",
    category: "Platform",
    description: "Backend integration for patient data and state tracking",
    route: "docs-brand-anchor",
    dependencies: ["ST50"],
    relatedStories: ["ST52"]
  },
  {
    id: "ST52",
    number: 52,
    title: "Alumni Messenger",
    status: "complete",
    category: "Platform",
    description: "Post-treatment community platform with Stream Chat",
    route: "docs-brand-anchor",
    dependencies: [],
    relatedStories: []
  }
  // Add more stories as needed
];

/**
 * UTILITY FUNCTIONS
 */

/**
 * Search across all registry content
 */
export function searchRegistry(query: string): {
  pages: RegistryPage[];
  stories: Story[];
} {
  const lowerQuery = query.toLowerCase();
  
  const matchedPages = COMMAND_CENTRE_PAGES.filter(page =>
    page.title.toLowerCase().includes(lowerQuery) ||
    page.description.toLowerCase().includes(lowerQuery) ||
    page.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    page.id.toLowerCase().includes(lowerQuery)
  );
  
  const matchedStories = STORY_REGISTRY.filter(story =>
    story.id.toLowerCase().includes(lowerQuery) ||
    story.title.toLowerCase().includes(lowerQuery) ||
    story.description.toLowerCase().includes(lowerQuery) ||
    story.category.toLowerCase().includes(lowerQuery)
  );
  
  return {
    pages: matchedPages,
    stories: matchedStories
  };
}

/**
 * Get page by ID
 */
export function getPageById(id: string): RegistryPage | undefined {
  return COMMAND_CENTRE_PAGES.find(page => page.id === id);
}

/**
 * Get page by route
 */
export function getPageByRoute(route: string): RegistryPage | undefined {
  return COMMAND_CENTRE_PAGES.find(page => page.route === route);
}

/**
 * Get story by ID (e.g., "ST42")
 */
export function getStoryById(id: string): Story | undefined {
  return STORY_REGISTRY.find(story => story.id === id);
}

/**
 * Get all pages in a category
 */
export function getPagesByCategory(category: Category): RegistryPage[] {
  return COMMAND_CENTRE_PAGES.filter(page => page.category === category);
}

/**
 * Get all pages by status
 */
export function getPagesByStatus(status: Status): RegistryPage[] {
  return COMMAND_CENTRE_PAGES.filter(page => page.status === status);
}

/**
 * Get related pages for a given page
 */
export function getRelatedPages(pageId: string): RegistryPage[] {
  const page = getPageById(pageId);
  if (!page || !page.relatedPages) return [];
  
  return page.relatedPages
    .map(id => getPageById(id))
    .filter((p): p is RegistryPage => p !== undefined);
}

/**
 * Get page dependencies
 */
export function getPageDependencies(pageId: string): RegistryPage[] {
  const page = getPageById(pageId);
  if (!page || !page.dependencies) return [];
  
  return page.dependencies
    .map(id => getPageById(id))
    .filter((p): p is RegistryPage => p !== undefined);
}

/**
 * Get all categories with page counts
 */
export function getCategorySummary(): Record<Category, number> {
  const summary: Record<Category, number> = {
    Foundation: 0,
    System: 0,
    Content: 0,
    Platform: 0,
    Design: 0,
    Tools: 0
  };
  
  COMMAND_CENTRE_PAGES.forEach(page => {
    summary[page.category]++;
  });
  
  return summary;
}

/**
 * Get registry statistics
 */
export function getRegistryStats() {
  return {
    totalPages: COMMAND_CENTRE_PAGES.length,
    totalStories: STORY_REGISTRY.length,
    byCategory: getCategorySummary(),
    byStatus: {
      complete: getPagesByStatus('complete').length,
      inProgress: getPagesByStatus('in-progress').length,
      planned: getPagesByStatus('planned').length,
      needsReview: getPagesByStatus('needs-review').length
    }
  };
}