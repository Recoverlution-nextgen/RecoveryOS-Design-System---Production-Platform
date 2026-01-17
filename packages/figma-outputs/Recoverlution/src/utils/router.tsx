/**
 * Client-Side Router for Recoverlution
 * 
 * Provides clean URL routing with browser history support.
 * Maps URLs to page types for the application.
 */

export type PageType = 
  | "Dashboard" 
  | "Today"
  | "Journey" 
  | "Journey V2"
  | "Navicues"
  | "building-blocks"
  | "Micro Blocks"
  | "Content Library"
  | "content-library-showcase"
  | "Wellbeing" 
  | "Inner Compass" 
  | "Diary"
  | "Story Map"
  | "Identity Lines"
  | "Toolkit" 
  | "Navigate" 
  | "Momentum" 
  | "Alumni"
  | "Profile" 
  | "Player"
  | "Thread"
  | "Website" 
  | "Login"
  | "Setup"
  | "patient-onboarding"
  | "marketing-about" 
  | "marketing-story"
  | "marketing-pricing" 
  | "marketing-platform"
  | "marketing-platform-v1"
  | "marketing-science"
  | "marketing-science-v1"
  | "marketing-story-v1"
  | "marketing-pricing-v1"
  | "marketing-demo-v1"
  | "marketing-demo"
  | "marketing-privacy"
  | "marketing-terms"
  | "marketing-cookies"
  | "marketing-therapy"
  | "hero-test"
  | "careers-fractional-sales"
  | "admin-email-blast"
  | "admin-linkedin-carousel"
  | "admin-pixabay-test"
  | "admin-openai-test"
  | "admin-journey-reset"
  | "command-center"
  | "command-center-execution"
  | "command-center-navicue-arsenal"
  | "command-center-journey-arsenal"
  | "command-center/journey-lab"
  | "command-center/content-lab"
  | "command-center/wellbeing-studio"
  | "command-center/state-dashboard"
  | "command-center/navigate-orchestrator"
  | "command-center/momentum"
  | "command-center/communications"
  | "command-center/navicue-builder"
  | "schema-exposure"
  | "dna-hub"
  | "dna-design-system"
  | "dna-asset-manager"
  | "dna-messaging-matrix"
  | "dna-tinycdn-preview"
  | "content-lab"
  | "demo-recovery-instagram"
  | "demo-journey-flow"
  | "demo-frosted-glass"
  | "demo-backgrounds"
  | "demo-card-backgrounds"
  | "docs-brand-anchor"
  | "docs-hcp"
  | "docs-era-flow"
  | "docs-infinite-canvas"
  | "docs-pillar-emotional-regulation"
  | "docs-pillar-stress-resilience"
  | "docs-pillar-social-connectivity"
  | "docs-pillar-cognitive-reframing"
  | "docs-pillar-identity-integration"
  | "docs-pillar-decision-mastery"
  | "docs-sphere-principle"
  | "docs-content-roadmap"
  | "docs-weekly-era-sprints"
  | "docs-micro-block-library"
  | "docs-content-mapping"
  | "docs-video-library-audit"
  | "docs-navicue-suite"
  | "docs-journey-infrastructure"
  | "navicue-arsenal"
  | "navicue-arsenal-v2"
  | "navicue-arsenal-browser"
  | "cc2"
  | "v3"
  | "v3-platform"
  | "v3-science"
  | "v3-organisations"
  | "v3-professionals"
  | "v3-individuals"
  | "v3-companions"
  | string;

/**
 * Route configuration mapping URLs to page types
 */
const ROUTE_MAP: Record<string, PageType> = {
  '/': 'Website',
  '/about': 'marketing-about',
  '/story': 'marketing-story',
  '/pricing': 'marketing-pricing',
  '/platform': 'v3-platform',
  '/science': 'v3-science',
  '/demo': 'marketing-demo',
  '/login': 'Login',
  '/setup': 'Setup',
  '/privacy': 'marketing-privacy',
  '/terms': 'marketing-terms',
  '/cookies': 'marketing-cookies',
  '/therapy': 'marketing-therapy',
  '/home-old': 'home-old',
  
  // Unlisted pages (not in sitemap or nav)
  '/careers/fractional-sales': 'careers-fractional-sales',
  '/admin/email-blast': 'admin-email-blast',
  '/admin/linkedin-carousel': 'admin-linkedin-carousel',
  '/admin/pixabay-test': 'admin-pixabay-test',
  '/admin-pixabay-test': 'admin-pixabay-test',
  '/admin/openai-test': 'admin-openai-test',
  '/test-openai': 'admin-openai-test',
  '/admin-journey-reset': 'admin-journey-reset',
  '/hero-test': 'hero-test',
  '/command-center': 'command-center',
  '/command-centre': 'command-center',
  '/command-center-navicue-arsenal': 'command-center-navicue-arsenal',
  '/command-center-execution': 'command-center-execution',
  '/command-center-journey-arsenal': 'command-center-journey-arsenal',
  '/command-center/journey-lab': 'command-center/journey-lab',
  '/command-center/content-lab': 'command-center/content-lab',
  '/command-center/wellbeing-studio': 'command-center/wellbeing-studio',
  '/command-center/state-dashboard': 'command-center/state-dashboard',
  '/command-center/navigate-orchestrator': 'command-center/navigate-orchestrator',
  '/command-center/momentum': 'command-center/momentum',
  '/command-center/communications': 'command-center/communications',
  '/command-center/navicue-builder': 'command-center/navicue-builder',
  '/schema-exposure': 'schema-exposure',
  '/dna-hub': 'dna-hub',
  '/dna/design-system': 'dna-design-system',
  '/dna/asset-manager': 'dna-asset-manager',
  '/dna/messaging-matrix': 'dna-messaging-matrix',
  '/dna/tinycdn-preview': 'dna-tinycdn-preview',
  '/content-lab': 'content-lab',
  '/demo/journey-flow': 'demo-journey-flow',
  '/demo/frosted-glass': 'demo-frosted-glass',
  '/demo/backgrounds': 'demo-backgrounds',
  '/demo-backgrounds': 'demo-backgrounds',
  '/demo/trianglify': 'demo-backgrounds', // Redirect old Trianglify to new system
  '/demo-trianglify': 'demo-backgrounds', // Redirect old Trianglify to new system
  '/demo/card-backgrounds': 'demo-card-backgrounds',
  '/demo-card-backgrounds': 'demo-card-backgrounds',
  '/docs/brand-anchor': 'docs-brand-anchor',
  '/docs/product-dna': 'docs-brand-anchor', // Alias for Product DNA Hub
  '/docs/hcp': 'docs-hcp',
  '/docs/era-flow': 'docs-era-flow',
  '/docs/infinite-canvas': 'docs-infinite-canvas',
  '/docs/pillar/emotional-regulation': 'docs-pillar-emotional-regulation',
  '/docs/pillar/stress-resilience': 'docs-pillar-stress-resilience',
  '/docs/pillar/social-connectivity': 'docs-pillar-social-connectivity',
  '/docs/pillar/cognitive-reframing': 'docs-pillar-cognitive-reframing',
  '/docs/pillar/identity-integration': 'docs-pillar-identity-integration',
  '/docs/pillar/decision-mastery': 'docs-pillar-decision-mastery',
  '/docs/sphere-principle': 'docs-sphere-principle',
  '/docs/content-roadmap': 'docs-content-roadmap',
  '/docs/weekly-era-sprints': 'docs-weekly-era-sprints',
  '/docs/micro-block-library': 'docs-micro-block-library',
  '/docs/content-mapping': 'docs-content-mapping',
  '/docs/video-library-audit': 'docs-video-library-audit',
  '/docs/navicue-suite': 'docs-navicue-suite',
  '/docs/journey-infrastructure': 'docs-journey-infrastructure',
  
  // Platform pages (authenticated) - THE ROOMS
  '/patient-onboarding': 'patient-onboarding',
  '/dashboard': 'Dashboard',
  '/today': 'Today', // NEW: Daily anchor
  '/journey': 'Journey',
  '/journey-v2': 'Journey V2', // NEW: 7-day ERA blocks
  '/navicues': 'Navicues',
  '/building-blocks': 'building-blocks',
  '/micro-blocks': 'Micro Blocks', // NEW: 440 atomic skills
  '/content': 'Content Library', // NEW: Articles + practices
  '/content-library-showcase': 'content-library-showcase', // NEW: Showcase of content library
  '/wellbeing': 'Wellbeing',
  '/inner-compass': 'Inner Compass',
  '/diary': 'Diary', // NEW: Micro-moment captures
  '/story-map': 'Story Map', // NEW: Pain/protection mapping
  '/identity': 'Identity Lines', // NEW: Weekly anchor sentences
  '/toolkit': 'Toolkit',
  '/navigate': 'Navigate',
  '/momentum': 'Momentum',
  '/alumni': 'Alumni',
  '/profile': 'Profile',
  '/player': 'Player',
  '/thread': 'Thread',
  '/navicue-arsenal': 'navicue-arsenal',
  '/navicue-arsenal-v2': 'navicue-arsenal-v2',
  '/navicue-arsenal-browser': 'navicue-arsenal-browser',
  '/cc2': 'cc2',
  '/v3': 'v3',
  '/v3-platform': 'v3-platform',
  '/v3-science': 'v3-science',
  '/v3-organisations': 'v3-organisations',
  '/v3-professionals': 'v3-professionals',
  '/v3-individuals': 'v3-individuals',
  '/v3-companions': 'v3-companions',
};

/**
 * Reverse map: Page types to URLs
 */
const PAGE_TO_URL: Record<string, string> = {
  'Website': '/',
  'v3-platform': '/platform',
  'v3-science': '/science',
  'v3-organisations': '/organisations',
  'v3-professionals': '/professionals',
  'v3-individuals': '/individuals',
  'v3-companions': '/companions',
  'marketing-about': '/about',
  'marketing-story': '/story',
  'marketing-pricing': '/pricing',
  'marketing-platform': '/platform',
  'marketing-science': '/science',
  'marketing-demo': '/demo',
  'Login': '/login',
  'marketing-privacy': '/privacy',
  'marketing-terms': '/terms',
  'marketing-cookies': '/cookies',
  'marketing-therapy': '/therapy',
  'careers-fractional-sales': '/careers/fractional-sales',
  'admin-email-blast': '/admin/email-blast',
  'admin-linkedin-carousel': '/admin/linkedin-carousel',
  'admin-pixabay-test': '/admin/pixabay-test',
  'hero-test': '/hero-test',
  'command-center': '/command-center',
  'command-center-navicue-arsenal': '/command-center-navicue-arsenal',
  'schema-exposure': '/schema-exposure',
  'dna-hub': '/dna-hub',
  'dna-design-system': '/dna/design-system',
  'dna-asset-manager': '/dna/asset-manager',
  'dna-tinycdn-preview': '/dna/tinycdn-preview',
  'content-lab': '/content-lab',
  'demo-journey-flow': '/demo/journey-flow',
  'demo-frosted-glass': '/demo/frosted-glass',
  'demo-backgrounds': '/demo/backgrounds',
  'demo-card-backgrounds': '/demo/card-backgrounds',
  'docs-brand-anchor': '/docs/brand-anchor',
  'docs-hcp': '/docs/hcp',
  'docs-era-flow': '/docs/era-flow',
  'docs-infinite-canvas': '/docs/infinite-canvas',
  'docs-pillar-emotional-regulation': '/docs/pillar/emotional-regulation',
  'docs-pillar-stress-resilience': '/docs/pillar/stress-resilience',
  'docs-pillar-social-connectivity': '/docs/pillar/social-connectivity',
  'docs-pillar-cognitive-reframing': '/docs/pillar/cognitive-reframing',
  'docs-pillar-identity-integration': '/docs/pillar/identity-integration',
  'docs-pillar-decision-mastery': '/docs/pillar/decision-mastery',
  'docs-sphere-principle': '/docs/sphere-principle',
  'docs-content-roadmap': '/docs/content-roadmap',
  'docs-weekly-era-sprints': '/docs/weekly-era-sprints',
  'docs-micro-block-library': '/docs/micro-block-library',
  'docs-content-mapping': '/docs/content-mapping',
  'docs-video-library-audit': '/docs/video-library-audit',
  'docs-navicue-suite': '/docs/navicue-suite',
  'docs-journey-infrastructure': '/docs/journey-infrastructure',
  'patient-onboarding': '/patient-onboarding',
  'Dashboard': '/dashboard',
  'Journey': '/journey',
  'Navicues': '/navicues',
  'building-blocks': '/building-blocks',
  'Wellbeing': '/wellbeing',
  'Inner Compass': '/inner-compass',
  'Toolkit': '/toolkit',
  'Navigate': '/navigate',
  'Momentum': '/momentum',
  'Alumni': '/alumni',
  'Profile': '/profile',
  'Player': '/player',
  'Thread': '/thread',
  'navicue-arsenal': '/navicue-arsenal',
  'navicue-arsenal-v2': '/navicue-arsenal-v2',
  'navicue-arsenal-browser': '/navicue-arsenal-browser',
  'cc2': '/cc2',
  'v3': '/v3',
  'v3-platform': '/v3-platform',
  'v3-science': '/v3-science',
  'v3-organisations': '/v3-organisations',
  'v3-professionals': '/v3-professionals',
  'v3-individuals': '/v3-individuals',
  'v3-companions': '/v3-companions',
};

/**
 * Get the current page from the URL
 */
export const getCurrentPage = (): PageType => {
  const path = window.location.pathname;
  
  // DEBUG: Log routing
  console.log('🗺️ Router:', { path });
  
  // Check for article pages (e.g., /toolkit/article/123)
  const articleMatch = path.match(/\/toolkit\/article\/(\d+)/);
  if (articleMatch) {
    return `article-${articleMatch[1]}`;
  }
  
  // Check for building block pages (e.g., /toolkit/block/123)
  const blockMatch = path.match(/\/toolkit\/block\/(\d+)/);
  if (blockMatch) {
    return `block-${blockMatch[1]}`;
  }
  
  // Check for week detail pages (e.g., /journey/week/1)
  const weekMatch = path.match(/\/journey\/week\/(\d+)/);
  if (weekMatch) {
    return `week-${weekMatch[1]}`;
  }
  
  // Check direct route match
  if (ROUTE_MAP[path]) {
    const pageType = ROUTE_MAP[path];
    console.log('✅ Router matched:', { path, pageType });
    return pageType;
  }
  
  // Default to home
  console.log('⚠️ Router: No match found, defaulting to Website');
  return 'Website';
};

/**
 * Navigate to a page (updates URL and browser history)
 */
export const navigateToPage = (page: PageType, title?: string) => {
  let url: string;
  
  // Handle article pages
  if (page.startsWith('article-')) {
    const articleId = page.replace('article-', '');
    url = `/toolkit/article/${articleId}`;
  } 
  // Handle building block pages
  else if (page.startsWith('block-')) {
    const blockId = page.replace('block-', '');
    url = `/toolkit/block/${blockId}`;
  }
  // Handle week pages
  else if (page.startsWith('week-')) {
    const weekNum = page.replace('week-', '');
    url = `/journey/week/${weekNum}`;
  } 
  else {
    url = PAGE_TO_URL[page] || '/';
  }
  
  // Update browser history
  window.history.pushState({ page }, title || '', url);
  
  // Update document title
  if (title) {
    document.title = title;
  }
  
  // Dispatch custom event for App.tsx to listen to
  window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
};

/**
 * Replace current URL without adding to history
 */
export const replaceCurrentPage = (page: PageType, title?: string) => {
  let url: string;
  
  // Handle article pages
  if (page.startsWith('article-')) {
    const articleId = page.replace('article-', '');
    url = `/toolkit/article/${articleId}`;
  } 
  // Handle building block pages
  else if (page.startsWith('block-')) {
    const blockId = page.replace('block-', '');
    url = `/toolkit/block/${blockId}`;
  }
  // Handle week pages
  else if (page.startsWith('week-')) {
    const weekNum = page.replace('week-', '');
    url = `/journey/week/${weekNum}`;
  }
  else {
    url = PAGE_TO_URL[page] || '/';
  }
  
  // Replace browser history
  window.history.replaceState({ page }, title || '', url);
  
  // Update document title
  if (title) {
    document.title = title;
  }
};

/**
 * Get URL for a page (useful for links)
 */
export const getPageUrl = (page: PageType): string => {
  if (page.startsWith('article-')) {
    const articleId = page.replace('article-', '');
    return `/toolkit/article/${articleId}`;
  }
  
  if (page.startsWith('block-')) {
    const blockId = page.replace('block-', '');
    return `/toolkit/block/${blockId}`;
  }
  
  if (page.startsWith('week-')) {
    const weekNum = page.replace('week-', '');
    return `/journey/week/${weekNum}`;
  }
  
  return PAGE_TO_URL[page] || '/';
};

/**
 * Initialize router - call this on app mount
 */
export const initializeRouter = (onNavigate: (page: PageType) => void) => {
  // Handle browser back/forward buttons
  window.addEventListener('popstate', (event) => {
    const page = event.state?.page || getCurrentPage();
    onNavigate(page);
  });
  
  // Set initial state if not already set
  if (!window.history.state?.page) {
    const currentPage = getCurrentPage();
    window.history.replaceState({ page: currentPage }, '', window.location.pathname);
  }
};

/**
 * Get page title for SEO
 */
export const getPageTitle = (page: PageType): string => {
  const titles: Record<string, string> = {
    'Website': 'Recoverlution - Evidence-Based Recovery Platform for Rehab Facilities',
    'marketing-about': 'About Us - Recoverlution',
    'marketing-story': 'Our Story - Recoverlution',
    'marketing-pricing': 'Pricing - Recoverlution',
    'marketing-platform': 'Platform - Recoverlution',
    'marketing-platform-v1': 'Platform V1 - Recovery Infrastructure - Recoverlution',
    'marketing-home-v3': 'Home V3 - Recoverlution',
    'marketing-science': 'The Science - Recoverlution',
    'marketing-demo': 'Schedule a Demo - Recoverlution',
    'Login': 'Login - Recoverlution',
    'marketing-privacy': 'Privacy Policy - Recoverlution',
    'marketing-terms': 'Terms of Service - Recoverlution',
    'marketing-cookies': 'Cookie Policy - Recoverlution',
    'careers-fractional-sales': 'Fractional Sales Role - Recoverlution',
    'admin-email-blast': 'Email Blast Tool - Recoverlution',
    'admin-linkedin-carousel': 'LinkedIn Carousel Template - Recoverlution',
    'admin-pixabay-test': 'Pixabay API Test - Diagnostic Tool - Recoverlution',
    'hero-test': 'Hero Glass Test - 5 Experiments - Recoverlution',
    'dna-hub': 'DNA HUB - Strategic Foundation - Recoverlution',
    'dna-design-system': 'Design System Documentation - Recoverlution',
    'dna-asset-manager': 'Image Asset Manager - Pexels + Unsplash - Recoverlution',
    'dna-tinycdn-preview': 'TinyPNG CDN Preview - Image Optimization - Recoverlution',
    'content-lab': 'Content Lab - Infrastructure Tools - Recoverlution',
    'demo-journey-flow': 'Journey Flow Demo - E-R-A + SEED - Recoverlution',
    'demo-frosted-glass': 'Frosted Glass System Demo - The Differentiator - Recoverlution',
    'demo-backgrounds': 'Intelligent Backgrounds - Pexels + Colormind AI - Recoverlution',
    'demo-card-backgrounds': 'Card Background Gallery - Pixabay Abstracts - Recoverlution',
    'docs-brand-anchor': 'Product DNA Hub - Recoverlution Internal',
    'docs-hcp': 'Human Cognition Platform - Architecture - Recoverlution',
    'docs-era-flow': 'ERA Flow - Learning Mechanics - Recoverlution',
    'docs-infinite-canvas': 'Infinite Canvas Principle - Design Philosophy - Recoverlution',
    'docs-pillar-emotional-regulation': 'Chapter One: Steady the Storm - Emotional Regulation - Recoverlution',
    'docs-pillar-stress-resilience': 'Chapter Two: Hold the Line - Stress Resilience - Recoverlution',
    'docs-pillar-social-connectivity': 'Chapter Three: Build the Bridge - Social Connectivity - Recoverlution',
    'docs-pillar-cognitive-reframing': 'Chapter Four: Change the Lens - Cognitive Reframing - Recoverlution',
    'docs-pillar-identity-integration': 'Chapter Five: Become Who You Practice - Identity Integration - Recoverlution',
    'docs-pillar-decision-mastery': 'Chapter Six: Make Space to Choose - Decision Mastery - Recoverlution',
    'docs-sphere-principle': 'The Sphere Principle - Core Philosophy - Recoverlution',
    'docs-content-roadmap': 'Content Build-Out Roadmap - ST43-ST46 - Recoverlution',
    'docs-weekly-era-sprints': 'ST43: Weekly ERA Sprints Design - 12-Week Journey - Recoverlution',
    'docs-micro-block-library': 'ST44: Micro-Block Library - 440 Therapeutic Practices - Recoverlution',
    'docs-content-mapping': 'ST45: Content Mapping & Gap Analysis - Recoverlution',
    'docs-video-library-audit': 'ST46: Video Library Audit & Gap Analysis - Recoverlution',
    'docs-navicue-suite': 'ST48: NaviCue Content Suite - Phase 1 - Recoverlution',
    'docs-journey-infrastructure': 'ST49: Journey Infrastructure - The NOW Principle - Recoverlution',
    'patient-onboarding': 'Patient Onboarding - Recoverlution',
    'Dashboard': 'Dashboard - Recoverlution',
    'Journey': 'Journey - Recoverlution',
    'Navicues': 'NaviCues - Recoverlution',
    'building-blocks': 'Building Blocks - Infinite Exploration - Recoverlution',
    'Wellbeing': 'Wellbeing - Recoverlution',
    'Inner Compass': 'Inner Compass - Recoverlution',
    'Toolkit': 'Toolkit - Your Recovery Essentials - Recoverlution',
    'Navigate': 'Navigate - Recoverlution',
    'Momentum': 'Momentum - Recoverlution',
    'Alumni': 'Alumni Messenger - Recoverlution',
    'Profile': 'Profile - Recoverlution',
    'Player': 'Player - Recoverlution',
    'Thread': 'Your Thread - Sound Bites & Anchor Points - Recoverlution',
    'navicue-arsenal': 'NaviCue Arsenal - Recoverlution',
    'navicue-arsenal-v2': 'NaviCue Arsenal V2 - Recoverlution',
    'navicue-arsenal-browser': 'NaviCue Arsenal Browser - Recoverlution',
    'cc2': 'CC2 - Recoverlution',
    'v3': 'V3 - Recoverlution',
    'v3-platform': 'V3 Platform - Recoverlution',
    'v3-science': 'V3 Science - Recoverlution',
    'v3-organisations': 'V3 Organisations - Recoverlution',
    'v3-professionals': 'V3 Professionals - Recoverlution',
    'v3-individuals': 'V3 Individuals - Recoverlution',
    'v3-companions': 'V3 Companions - Recoverlution',
  };
  
  // Handle article pages
  if (page.startsWith('article-')) {
    return `Article - Recoverlution`;
  }
  
  // Handle building block pages
  if (page.startsWith('block-')) {
    return `Building Block - Recoverlution`;
  }
  
  // Handle week pages
  if (page.startsWith('week-')) {
    const weekNum = page.replace('week-', '');
    return `Week ${weekNum} - Journey - Recoverlution`;
  }
  
  return titles[page] || 'Recoverlution';
};

export default {
  getCurrentPage,
  navigateToPage,
  replaceCurrentPage,
  getPageUrl,
  initializeRouter,
  getPageTitle,
};