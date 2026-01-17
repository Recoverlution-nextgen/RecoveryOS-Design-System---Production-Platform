/**
 * HUB REGISTRY - THE SINGLE SOURCE OF TRUTH
 * 
 * Every piece of content in Recoverlution registers here.
 * This is the skyscraper foundation - everything builds on this.
 * 
 * Philosophy: "Building Plains with Elevated Objects"
 * - Registry is the plains (flat, organized, interconnected)
 * - Content items are the elevated objects (visible, accessible, meaningful)
 * 
 * Rules:
 * 1. Everything registers (no orphans)
 * 2. Dependencies are explicit (no surprises)
 * 3. Impacts are tracked (no side effects)
 * 4. Status is always current (no stale content)
 */

import type { PageType } from './router';

// Hub Categories - Two main tabs
export type HubCategory = 'dna' | 'content';

// Hub Sections - Organized groups within each category
export type DNASection = 
  | 'Brand Foundation'
  | 'Design System (infiniteK)'
  | 'Asset Management'
  | 'Technical DNA';

export type ContentSection = 
  | '6 Pillars Framework'
  | 'NaviCue System'
  | 'Building Blocks Library'
  | 'Journey Infrastructure'
  | 'Epic Stories';

export type HubSection = DNASection | ContentSection;

// Item Status
export type HubStatus = 'complete' | 'in-progress' | 'planned';

// Hub Item - The core data structure
export interface HubItem {
  id: string;
  title: string;
  description: string;
  category: HubCategory;
  section: HubSection;
  route: PageType;
  
  // Tags for search and filtering
  tags: string[];
  
  // Dependencies - What this item requires
  dependencies?: string[]; // IDs of other HubItems
  
  // Impacts - What depends on this item
  impacts?: string[]; // IDs of other HubItems
  
  // Status tracking
  status: HubStatus;
  lastUpdated: Date;
  
  // Icon (lucide-react icon name)
  icon?: string;
  
  // Color (for visual distinction)
  color?: string;
}

/**
 * THE REGISTRY - All content lives here
 * 
 * Organized by ID for fast lookup
 * Add new items here to auto-register them in the hub
 */
export const HUB_REGISTRY: Record<string, HubItem> = {
  // ============================================
  // DNA HUB - Brand Foundation
  // ============================================
  'brand-anchor': {
    id: 'brand-anchor',
    title: 'Brand Anchor',
    description: 'The DNA that powers everything - our philosophy, principles, and copywriting rules',
    category: 'dna',
    section: 'Brand Foundation',
    route: 'docs-brand-anchor',
    tags: ['dna', 'philosophy', 'anchor', 'foundation'],
    impacts: ['all-pages', 'copywriting-rules', 'design-system'],
    status: 'complete',
    lastUpdated: new Date('2025-10-20'),
    icon: 'Anchor',
    color: '#3E2BB8'
  },
  
  'copywriting-rules': {
    id: 'copywriting-rules',
    title: 'DNA Copywriting Rules',
    description: 'No minimizing words, no dashes, Apple-level clarity',
    category: 'dna',
    section: 'Brand Foundation',
    route: 'docs-brand-anchor',
    tags: ['copy', 'writing', 'dna', 'rules'],
    dependencies: ['brand-anchor'],
    impacts: ['all-pages', 'momentum', 'journey'],
    status: 'complete',
    lastUpdated: new Date('2025-10-19'),
    icon: 'FileText',
    color: '#5739FB'
  },
  
  // ============================================
  // DNA HUB - Design System (infiniteK)
  // ============================================
  'design-system': {
    id: 'design-system',
    title: 'infiniteK Design System',
    description: 'Frosted glass v4.9, color matrix, borderless cards, Apple aesthetic',
    category: 'dna',
    section: 'Design System (infiniteK)',
    route: 'dna-design-system',
    tags: ['design', 'infiniteK', 'glass', 'system'],
    dependencies: ['brand-anchor'],
    impacts: ['all-pages', 'dashboard', 'momentum'],
    status: 'complete',
    lastUpdated: new Date('2025-10-20'),
    icon: 'Layers',
    color: '#5739FB'
  },
  
  'frosted-glass': {
    id: 'frosted-glass',
    title: 'Frosted Glass v4.9',
    description: 'Premium glass system that works on white AND images - our differentiator',
    category: 'dna',
    section: 'Design System (infiniteK)',
    route: 'demo-frosted-glass',
    tags: ['glass', 'frosted', 'v4.9', 'design'],
    dependencies: ['design-system'],
    impacts: ['all-cards', 'dashboard', 'momentum', 'journey'],
    status: 'complete',
    lastUpdated: new Date('2025-10-19'),
    icon: 'Sparkles',
    color: '#7C67FF'
  },
  
  'color-matrix': {
    id: 'color-matrix',
    title: 'Color Matrix DNA',
    description: 'Six pillars, brain states, NOW states, metrics - our complete color system',
    category: 'dna',
    section: 'Design System (infiniteK)',
    route: 'dna-design-system',
    tags: ['color', 'matrix', 'pillars', 'system'],
    dependencies: ['design-system', '6-pillars'],
    impacts: ['all-pages', 'navicues', 'journey'],
    status: 'complete',
    lastUpdated: new Date('2025-10-18'),
    icon: 'Palette',
    color: '#9D8FFF'
  },
  
  // ============================================
  // DNA HUB - Asset Management
  // ============================================
  'asset-manager': {
    id: 'asset-manager',
    title: 'Asset Manager',
    description: 'Centralized image mapping, background gallery, mockup library',
    category: 'dna',
    section: 'Asset Management',
    route: 'dna-asset-manager',
    tags: ['assets', 'images', 'backgrounds', 'mockups'],
    dependencies: ['design-system'],
    impacts: ['all-pages', 'dashboard', 'marketing'],
    status: 'complete',
    lastUpdated: new Date('2025-10-20'),
    icon: 'Image',
    color: '#3E2BB8'
  },
  
  'background-gallery': {
    id: 'background-gallery',
    title: 'Background Gallery (24 Images)',
    description: 'Triple colorway backgrounds for all 8 dashboard cards',
    category: 'dna',
    section: 'Asset Management',
    route: 'demo-card-backgrounds',
    tags: ['backgrounds', 'gallery', 'images', 'cards'],
    dependencies: ['asset-manager'],
    impacts: ['dashboard', 'momentum', 'journey', 'navicues'],
    status: 'complete',
    lastUpdated: new Date('2025-10-17'),
    icon: 'Images',
    color: '#5739FB'
  },
  
  'page-image-mapping': {
    id: 'page-image-mapping',
    title: 'Page Image Mapping',
    description: 'Centralized mapping system - dashboard cards AND page headers use same images',
    category: 'dna',
    section: 'Asset Management',
    route: 'dna-asset-manager',
    tags: ['mapping', 'images', 'centralized', 'system'],
    dependencies: ['background-gallery'],
    impacts: ['all-pages', 'dashboard'],
    status: 'complete',
    lastUpdated: new Date('2025-10-16'),
    icon: 'Map',
    color: '#7C67FF'
  },
  
  // ============================================
  // DNA HUB - Technical DNA
  // ============================================
  'analytics-setup': {
    id: 'analytics-setup',
    title: 'Analytics & Routing',
    description: 'PostHog analytics, URL routing system, page view tracking',
    category: 'dna',
    section: 'Technical DNA',
    route: 'docs-brand-anchor', // No dedicated page yet
    tags: ['analytics', 'routing', 'posthog', 'tracking'],
    dependencies: [],
    impacts: ['all-pages'],
    status: 'complete',
    lastUpdated: new Date('2025-10-15'),
    icon: 'BarChart3',
    color: '#3E2BB8'
  },
  
  // ============================================
  // CONTENT LAB - 6 Pillars Framework
  // ============================================
  '6-pillars': {
    id: '6-pillars',
    title: '6 Pillars of Recovery',
    description: 'Therapeutic framework - the foundation of all content',
    category: 'content',
    section: '6 Pillars Framework',
    route: 'docs-brand-anchor',
    tags: ['pillars', 'framework', 'therapeutic', 'foundation'],
    dependencies: [],
    impacts: ['navicues', 'journey', 'building-blocks', 'content-mapping'],
    status: 'complete',
    lastUpdated: new Date('2025-10-18'),
    icon: 'Columns3',
    color: '#5739FB'
  },
  
  'pillar-emotional-regulation': {
    id: 'pillar-emotional-regulation',
    title: 'Emotional Regulation Pillar',
    description: 'Managing emotions, distress tolerance, affect modulation',
    category: 'content',
    section: '6 Pillars Framework',
    route: 'docs-pillar-emotional-regulation',
    tags: ['pillar', 'emotional', 'regulation', 'distress'],
    dependencies: ['6-pillars'],
    impacts: ['navicues', 'content-mapping'],
    status: 'complete',
    lastUpdated: new Date('2025-10-10'),
    icon: 'Heart',
    color: '#E85D75'
  },
  
  'pillar-stress-resilience': {
    id: 'pillar-stress-resilience',
    title: 'Stress Resilience Pillar',
    description: 'Building capacity to handle life stress, adaptive coping',
    category: 'content',
    section: '6 Pillars Framework',
    route: 'docs-pillar-stress-resilience',
    tags: ['pillar', 'stress', 'resilience', 'coping'],
    dependencies: ['6-pillars'],
    impacts: ['navicues', 'content-mapping'],
    status: 'complete',
    lastUpdated: new Date('2025-10-10'),
    icon: 'Shield',
    color: '#9B59B6'
  },
  
  'pillar-social-connectivity': {
    id: 'pillar-social-connectivity',
    title: 'Social Connectivity Pillar',
    description: 'Building relationships, community, therapeutic alliance',
    category: 'content',
    section: '6 Pillars Framework',
    route: 'docs-pillar-social-connectivity',
    tags: ['pillar', 'social', 'connection', 'community'],
    dependencies: ['6-pillars'],
    impacts: ['navicues', 'alumni', 'navigate'],
    status: 'complete',
    lastUpdated: new Date('2025-10-10'),
    icon: 'Users',
    color: '#3498DB'
  },
  
  'pillar-cognitive-reframing': {
    id: 'pillar-cognitive-reframing',
    title: 'Cognitive Reframing Pillar',
    description: 'Changing thought patterns, challenging beliefs, perspective shifts',
    category: 'content',
    section: '6 Pillars Framework',
    route: 'docs-pillar-cognitive-reframing',
    tags: ['pillar', 'cognitive', 'reframing', 'thoughts'],
    dependencies: ['6-pillars'],
    impacts: ['navicues', 'content-mapping'],
    status: 'complete',
    lastUpdated: new Date('2025-10-10'),
    icon: 'Brain',
    color: '#F39C12'
  },
  
  'pillar-identity-integration': {
    id: 'pillar-identity-integration',
    title: 'Identity Integration Pillar',
    description: 'Self-concept in recovery, values alignment, wholeness',
    category: 'content',
    section: '6 Pillars Framework',
    route: 'docs-pillar-identity-integration',
    tags: ['pillar', 'identity', 'integration', 'self'],
    dependencies: ['6-pillars'],
    impacts: ['navicues', 'journey'],
    status: 'complete',
    lastUpdated: new Date('2025-10-10'),
    icon: 'Compass',
    color: '#2ECC71'
  },
  
  'pillar-decision-mastery': {
    id: 'pillar-decision-mastery',
    title: 'Decision Mastery Pillar',
    description: 'Agency, choice-making, navigating complexity',
    category: 'content',
    section: '6 Pillars Framework',
    route: 'docs-pillar-decision-mastery',
    tags: ['pillar', 'decision', 'mastery', 'agency'],
    dependencies: ['6-pillars'],
    impacts: ['navicues', 'content-mapping'],
    status: 'complete',
    lastUpdated: new Date('2025-10-10'),
    icon: 'GitBranch',
    color: '#E74C3C'
  },
  
  // ============================================
  // CONTENT LAB - NaviCue System
  // ============================================
  'navicue-framework': {
    id: 'navicue-framework',
    title: 'NaviCue Framework',
    description: 'Recovery Instagram - quick-fire provocations that spark curiosity',
    category: 'content',
    section: 'NaviCue System',
    route: 'docs-navicue-suite',
    tags: ['navicue', 'framework', 'instagram', 'content'],
    dependencies: ['6-pillars'],
    impacts: ['navicue-suite', 'recovery-instagram'],
    status: 'complete',
    lastUpdated: new Date('2025-10-17'),
    icon: 'Zap',
    color: '#5739FB'
  },
  
  'navicue-suite': {
    id: 'navicue-suite',
    title: 'NaviCue Suite (36 Suites)',
    description: 'Complete NaviCue library - 6 suites per pillar',
    category: 'content',
    section: 'NaviCue System',
    route: 'docs-navicue-suite',
    tags: ['navicue', 'suite', 'library', '36-suites'],
    dependencies: ['navicue-framework', '6-pillars'],
    impacts: ['navicues-page', 'journey'],
    status: 'in-progress',
    lastUpdated: new Date('2025-10-18'),
    icon: 'Grid3x3',
    color: '#7C67FF'
  },
  
  'recovery-instagram': {
    id: 'recovery-instagram',
    title: 'Recovery Instagram Demo',
    description: 'Interactive demo of NaviCue swipe experience',
    category: 'content',
    section: 'NaviCue System',
    route: 'demo-recovery-instagram',
    tags: ['demo', 'instagram', 'navicue', 'swipe'],
    dependencies: ['navicue-framework'],
    impacts: ['navicues-page'],
    status: 'complete',
    lastUpdated: new Date('2025-10-15'),
    icon: 'Smartphone',
    color: '#9D8FFF'
  },
  
  // ============================================
  // CONTENT LAB - Building Blocks Library
  // ============================================
  'building-blocks': {
    id: 'building-blocks',
    title: 'Building Blocks Hierarchy',
    description: 'Micro-block library - the neuroscience foundation',
    category: 'content',
    section: 'Building Blocks Library',
    route: 'docs-micro-block-library',
    tags: ['building-blocks', 'micro-blocks', 'neuroscience', 'hierarchy'],
    dependencies: ['6-pillars'],
    impacts: ['content-mapping', 'momentum-data'],
    status: 'complete',
    lastUpdated: new Date('2025-10-17'),
    icon: 'Boxes',
    color: '#F39C12'
  },
  
  'content-mapping': {
    id: 'content-mapping',
    title: 'Content Mapping & Tagging',
    description: 'Map content to pillars, micro-blocks, and therapeutic outcomes',
    category: 'content',
    section: 'Building Blocks Library',
    route: 'docs-content-mapping',
    tags: ['mapping', 'tagging', 'content', 'system'],
    dependencies: ['building-blocks', '6-pillars'],
    impacts: ['navicues', 'journey', 'momentum'],
    status: 'complete',
    lastUpdated: new Date('2025-10-16'),
    icon: 'Tags',
    color: '#3B82F6'
  },
  
  // ============================================
  // CONTENT LAB - Journey Infrastructure
  // ============================================
  'journey-infrastructure': {
    id: 'journey-infrastructure',
    title: 'Journey Infrastructure (NOW Principle)',
    description: 'E-R-A flow, SEED system, 52-week framework - fluid and forever',
    category: 'content',
    section: 'Journey Infrastructure',
    route: 'docs-journey-infrastructure',
    tags: ['journey', 'era', 'seed', 'now-principle'],
    dependencies: ['6-pillars'],
    impacts: ['journey-page', 'weekly-era'],
    status: 'complete',
    lastUpdated: new Date('2025-10-18'),
    icon: 'Route',
    color: '#8B5CF6'
  },
  
  'weekly-era': {
    id: 'weekly-era',
    title: 'Weekly ERA Sprints',
    description: '52-week journey framework with E-R-A flow',
    category: 'content',
    section: 'Journey Infrastructure',
    route: 'docs-weekly-era-sprints',
    tags: ['weekly', 'era', '52-weeks', 'sprints'],
    dependencies: ['journey-infrastructure'],
    impacts: ['journey-page'],
    status: 'complete',
    lastUpdated: new Date('2025-10-15'),
    icon: 'Calendar',
    color: '#A78BFA'
  },
  
  'video-library': {
    id: 'video-library',
    title: 'Video Library Audit',
    description: 'Wellbeing video collection audit and organization',
    category: 'content',
    section: 'Journey Infrastructure',
    route: 'docs-video-library-audit',
    tags: ['video', 'library', 'audit', 'wellbeing'],
    dependencies: ['content-mapping'],
    impacts: ['wellbeing-page', 'toolkit'],
    status: 'complete',
    lastUpdated: new Date('2025-10-14'),
    icon: 'Video',
    color: '#EF4444'
  },
  
  // ============================================
  // DNA HUB - Platform Pages (The 8 Core Dashboard Cards)
  // ============================================
  'dashboard': {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Home page - 8 glass cards with NOW state, current week, and patient progress',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Dashboard',
    tags: ['platform', 'dashboard', 'home', 'glass-cards'],
    dependencies: ['frosted-glass', 'page-image-mapping', 'color-matrix'],
    impacts: ['all-navigation'],
    status: 'complete',
    lastUpdated: new Date('2025-10-20'),
    icon: 'LayoutDashboard',
    color: '#3E2BB8'
  },
  
  'journey-page': {
    id: 'journey-page',
    title: 'Journey (NOW View)',
    description: 'E-R-A flow, SEED system, weekly sprints - patient always in the NOW',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Journey',
    tags: ['platform', 'journey', 'era', 'seed', 'now-principle'],
    dependencies: ['journey-infrastructure', 'weekly-era', 'frosted-glass'],
    impacts: ['dashboard', 'navicues'],
    status: 'complete',
    lastUpdated: new Date('2025-10-20'),
    icon: 'Route',
    color: '#8B5CF6'
  },
  
  'wellbeing-page': {
    id: 'wellbeing-page',
    title: 'Wellbeing Library',
    description: 'Video library - guided meditations, exercises, therapeutic content',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Wellbeing',
    tags: ['platform', 'wellbeing', 'videos', 'library'],
    dependencies: ['video-library', 'frosted-glass', 'page-image-mapping'],
    impacts: ['toolkit'],
    status: 'complete',
    lastUpdated: new Date('2025-10-17'),
    icon: 'Video',
    color: '#2ECC71'
  },
  
  'inner-compass-page': {
    id: 'inner-compass-page',
    title: 'Inner Compass',
    description: 'State tracking - Energy, Clarity, Connection dimensions',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Inner Compass',
    tags: ['platform', 'state', 'tracking', 'compass'],
    dependencies: ['frosted-glass', 'page-image-mapping'],
    impacts: ['momentum-page'],
    status: 'complete',
    lastUpdated: new Date('2025-10-18'),
    icon: 'Compass',
    color: '#EC4899'
  },
  
  'toolkit-page': {
    id: 'toolkit-page',
    title: 'Toolkit',
    description: 'Saved content - articles, exercises, building blocks',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Toolkit',
    tags: ['platform', 'toolkit', 'saved', 'library'],
    dependencies: ['frosted-glass', 'page-image-mapping'],
    impacts: ['navicues', 'wellbeing'],
    status: 'complete',
    lastUpdated: new Date('2025-10-16'),
    icon: 'Briefcase',
    color: '#F59E0B'
  },
  
  'navigate-page': {
    id: 'navigate-page',
    title: 'Navigate',
    description: 'Clinician messaging - therapeutic alliance, support chat',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Navigate',
    tags: ['platform', 'navigate', 'messaging', 'clinician'],
    dependencies: ['frosted-glass', 'page-image-mapping'],
    impacts: [],
    status: 'complete',
    lastUpdated: new Date('2025-10-15'),
    icon: 'MessageCircle',
    color: '#3B82F6'
  },
  
  'momentum-page': {
    id: 'momentum-page',
    title: 'Momentum',
    description: 'Analytics dashboard - Tempo, Flow, Sync metrics with living charts',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Momentum',
    tags: ['platform', 'momentum', 'analytics', 'metrics'],
    dependencies: ['frosted-glass', 'page-image-mapping', 'color-matrix'],
    impacts: [],
    status: 'complete',
    lastUpdated: new Date('2025-10-19'),
    icon: 'TrendingUp',
    color: '#06B6D4'
  },
  
  'alumni-page': {
    id: 'alumni-page',
    title: 'Alumni Messenger',
    description: 'Community messaging - peer support, connection after treatment',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Alumni',
    tags: ['platform', 'alumni', 'community', 'messaging'],
    dependencies: ['frosted-glass'],
    impacts: [],
    status: 'complete',
    lastUpdated: new Date('2025-10-19'),
    icon: 'Users',
    color: '#3498DB'
  },
  
  'profile-page': {
    id: 'profile-page',
    title: 'Profile & Settings',
    description: 'Patient profile - settings, preferences, tour controls',
    category: 'dna',
    section: 'Technical DNA',
    route: 'Profile',
    tags: ['platform', 'profile', 'settings'],
    dependencies: ['frosted-glass'],
    impacts: [],
    status: 'complete',
    lastUpdated: new Date('2025-10-20'),
    icon: 'User',
    color: '#9B59B6'
  },
  
  // ============================================
  // DNA HUB - Demo Pages
  // ============================================
  'demo-journey-flow': {
    id: 'demo-journey-flow',
    title: 'Journey Flow Demo',
    description: 'Interactive E-R-A + SEED flow demonstration',
    category: 'dna',
    section: 'Asset Management',
    route: 'demo-journey-flow',
    tags: ['demo', 'journey', 'era', 'seed'],
    dependencies: ['journey-infrastructure'],
    impacts: [],
    status: 'complete',
    lastUpdated: new Date('2025-10-14'),
    icon: 'PlayCircle',
    color: '#8B5CF6'
  },
  
  'demo-backgrounds': {
    id: 'demo-backgrounds',
    title: 'Intelligent Backgrounds Demo',
    description: 'Pexels + Colormind AI background generation',
    category: 'dna',
    section: 'Asset Management',
    route: 'demo-backgrounds',
    tags: ['demo', 'backgrounds', 'pexels', 'colormind'],
    dependencies: ['asset-manager'],
    impacts: [],
    status: 'complete',
    lastUpdated: new Date('2025-10-13'),
    icon: 'Wand2',
    color: '#F39C12'
  },
  
  // ============================================
  // CONTENT LAB - Architecture Docs
  // ============================================
  'docs-hcp': {
    id: 'docs-hcp',
    title: 'Human Cognition Platform',
    description: 'Core architecture - the foundation of the therapeutic system',
    category: 'content',
    section: 'Journey Infrastructure',
    route: 'docs-hcp',
    tags: ['architecture', 'hcp', 'foundation', 'system'],
    dependencies: ['6-pillars'],
    impacts: ['journey-infrastructure', 'building-blocks'],
    status: 'complete',
    lastUpdated: new Date('2025-10-12'),
    icon: 'Brain',
    color: '#9B59B6'
  },
  
  'docs-era-flow': {
    id: 'docs-era-flow',
    title: 'E-R-A Flow',
    description: 'Expose-Reflect-Apply learning mechanics',
    category: 'content',
    section: 'Journey Infrastructure',
    route: 'docs-era-flow',
    tags: ['era', 'flow', 'learning', 'mechanics'],
    dependencies: ['journey-infrastructure'],
    impacts: ['journey-page'],
    status: 'complete',
    lastUpdated: new Date('2025-10-12'),
    icon: 'Repeat',
    color: '#8B5CF6'
  },
  
  'docs-infinite-canvas': {
    id: 'docs-infinite-canvas',
    title: 'Infinite Canvas Principle',
    description: 'Design philosophy - building plains with elevated objects',
    category: 'content',
    section: 'Building Blocks Library',
    route: 'docs-infinite-canvas',
    tags: ['design', 'philosophy', 'canvas', 'principle'],
    dependencies: ['design-system'],
    impacts: ['all-pages'],
    status: 'complete',
    lastUpdated: new Date('2025-10-11'),
    icon: 'Maximize2',
    color: '#3B82F6'
  },
  
  'docs-sphere-principle': {
    id: 'docs-sphere-principle',
    title: 'The Sphere Principle',
    description: 'Core philosophy - recovery is not linear, it\'s spherical',
    category: 'content',
    section: 'Building Blocks Library',
    route: 'docs-sphere-principle',
    tags: ['philosophy', 'sphere', 'principle', 'recovery'],
    dependencies: ['6-pillars'],
    impacts: ['journey-infrastructure'],
    status: 'complete',
    lastUpdated: new Date('2025-10-11'),
    icon: 'Circle',
    color: '#9D8FFF'
  },
  
  'docs-content-roadmap': {
    id: 'docs-content-roadmap',
    title: 'Content Build-Out Roadmap',
    description: 'ST43-ST46 implementation plan',
    category: 'content',
    section: 'Epic Stories',
    route: 'docs-content-roadmap',
    tags: ['roadmap', 'stories', 'implementation'],
    dependencies: [],
    impacts: ['weekly-era', 'building-blocks', 'content-mapping'],
    status: 'complete',
    lastUpdated: new Date('2025-10-17'),
    icon: 'Map',
    color: '#10B981'
  },
  
  // ============================================
  // CONTENT LAB - Epic Stories
  // ============================================
  'st50-momentum-data': {
    id: 'st50-momentum-data',
    title: 'ST50: Momentum Data Architecture',
    description: 'Complete analytics engine - Tempo, Flow, Sync tracking',
    category: 'content',
    section: 'Epic Stories',
    route: 'docs-brand-anchor', // Story docs not exposed yet
    tags: ['story', 'momentum', 'analytics', 'data'],
    dependencies: ['building-blocks', 'content-mapping'],
    impacts: ['momentum-page', 'backend'],
    status: 'planned',
    lastUpdated: new Date('2025-10-20'),
    icon: 'Database',
    color: '#06B6D4'
  },
  
  'st30-social-signin': {
    id: 'st30-social-signin',
    title: 'ST30: Social Sign-In',
    description: 'Apple & Google OAuth - App Store ready authentication',
    category: 'content',
    section: 'Epic Stories',
    route: 'docs-brand-anchor',
    tags: ['story', 'auth', 'oauth', 'apple', 'google'],
    dependencies: [],
    impacts: ['login-page', 'backend'],
    status: 'planned',
    lastUpdated: new Date('2025-10-20'),
    icon: 'LogIn',
    color: '#3E2BB8'
  },
  
  'st51-integrations': {
    id: 'st51-integrations',
    title: 'ST51: Integration Specifications',
    description: 'Messaging (Stream Chat) + Video (Daily.co) integrations',
    category: 'content',
    section: 'Epic Stories',
    route: 'docs-brand-anchor',
    tags: ['story', 'integrations', 'messaging', 'video'],
    dependencies: [],
    impacts: ['alumni-page', 'navigate-page'],
    status: 'in-progress',
    lastUpdated: new Date('2025-10-19'),
    icon: 'Workflow',
    color: '#10B981'
  },
};

/**
 * HELPER FUNCTIONS - Query the registry
 */

// Get all items in a category
export function getItemsByCategory(category: HubCategory): HubItem[] {
  return Object.values(HUB_REGISTRY).filter(item => item.category === category);
}

// Get all items in a section
export function getItemsBySection(section: HubSection): HubItem[] {
  return Object.values(HUB_REGISTRY).filter(item => item.section === section);
}

// Get items by tag
export function getItemsByTag(tag: string): HubItem[] {
  return Object.values(HUB_REGISTRY).filter(item => 
    item.tags.includes(tag)
  );
}

// Get items by status
export function getItemsByStatus(status: HubStatus): HubItem[] {
  return Object.values(HUB_REGISTRY).filter(item => item.status === status);
}

// Get item by ID
export function getItemById(id: string): HubItem | undefined {
  return HUB_REGISTRY[id];
}

// Get dependencies of an item
export function getDependencies(itemId: string): HubItem[] {
  const item = HUB_REGISTRY[itemId];
  if (!item || !item.dependencies) return [];
  
  return item.dependencies
    .map(depId => HUB_REGISTRY[depId])
    .filter(Boolean);
}

// Get what depends on an item
export function getImpactedItems(itemId: string): HubItem[] {
  return Object.values(HUB_REGISTRY).filter(item =>
    item.dependencies?.includes(itemId)
  );
}

// Check if item has all dependencies met
export function areDependenciesMet(itemId: string): boolean {
  const item = HUB_REGISTRY[itemId];
  if (!item || !item.dependencies) return true;
  
  return item.dependencies.every(depId => {
    const dep = HUB_REGISTRY[depId];
    return dep && dep.status === 'complete';
  });
}

// Get dependency chain (recursive)
export function getDependencyChain(itemId: string, visited = new Set<string>()): HubItem[] {
  if (visited.has(itemId)) return [];
  visited.add(itemId);
  
  const item = HUB_REGISTRY[itemId];
  if (!item || !item.dependencies) return [];
  
  const chain: HubItem[] = [];
  
  for (const depId of item.dependencies) {
    const dep = HUB_REGISTRY[depId];
    if (dep) {
      chain.push(dep);
      chain.push(...getDependencyChain(depId, visited));
    }
  }
  
  return chain;
}

// Get impact chain (recursive)
export function getImpactChain(itemId: string, visited = new Set<string>()): HubItem[] {
  if (visited.has(itemId)) return [];
  visited.add(itemId);
  
  const impacted = getImpactedItems(itemId);
  const chain: HubItem[] = [...impacted];
  
  for (const item of impacted) {
    chain.push(...getImpactChain(item.id, visited));
  }
  
  return chain;
}

/**
 * UTILITY FUNCTIONS - Warnings and checks
 */

// Warn if changing an item affects others
export function checkChangeImpact(itemId: string): {
  willAffect: HubItem[];
  hasDependencies: HubItem[];
  isBlocked: boolean;
} {
  const item = HUB_REGISTRY[itemId];
  const willAffect = getImpactChain(itemId);
  const hasDependencies = getDependencyChain(itemId);
  const isBlocked = !areDependenciesMet(itemId);
  
  return {
    willAffect,
    hasDependencies,
    isBlocked
  };
}

// Get section summary
export function getSectionSummary(section: HubSection): {
  section: HubSection;
  total: number;
  complete: number;
  inProgress: number;
  planned: number;
  items: HubItem[];
} {
  const items = getItemsBySection(section);
  
  return {
    section,
    total: items.length,
    complete: items.filter(i => i.status === 'complete').length,
    inProgress: items.filter(i => i.status === 'in-progress').length,
    planned: items.filter(i => i.status === 'planned').length,
    items
  };
}

// Get category summary
export function getCategorySummary(category: HubCategory): {
  category: HubCategory;
  total: number;
  complete: number;
  inProgress: number;
  planned: number;
  sections: ReturnType<typeof getSectionSummary>[];
} {
  const items = getItemsByCategory(category);
  
  // Get unique sections
  const sections = [...new Set(items.map(i => i.section))];
  
  return {
    category,
    total: items.length,
    complete: items.filter(i => i.status === 'complete').length,
    inProgress: items.filter(i => i.status === 'in-progress').length,
    planned: items.filter(i => i.status === 'planned').length,
    sections: sections.map(s => getSectionSummary(s))
  };
}

// Search items
export function searchItems(query: string): HubItem[] {
  const lowerQuery = query.toLowerCase();
  
  return Object.values(HUB_REGISTRY).filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
