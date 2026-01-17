/**
 * COMMAND CENTER REGISTRY
 * 
 * Single source of truth for all Control Rooms.
 * Defines dependencies, connections, views, and build order.
 * 
 * Created: December 26, 2025
 * Status: Living registry (updated as rooms are built)
 */

export type ControlRoomStatus = 'complete' | 'in-progress' | 'planned' | 'blocked';
export type ControlRoomPriority = 'critical' | 'high' | 'medium' | 'low';

export interface ControlRoomView {
  id: string;
  name: 'string';
  icon: string;
  description: string;
  status: ControlRoomStatus;
}

export interface ControlRoom {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
  status: ControlRoomStatus;
  priority: ControlRoomPriority;
  dependencies: string[]; // IDs of rooms that must be complete first
  connections: {
    tables: string[]; // Supabase tables used
    apis: string[]; // Backend routes used
    components: string[]; // Key React components
  };
  views: ControlRoomView[]; // Sub-views within the room
  stats?: {
    total?: number;
    active?: number;
    completion?: number;
  };
}

/**
 * ALL 6 CONTROL ROOMS
 * Order matters for build sequence
 */
export const CONTROL_ROOMS: ControlRoom[] = [
  // ============================================================================
  // ROOM 3: NAVICUE ARSENAL (Complete ✅)
  // ============================================================================
  {
    id: 'navicue-arsenal',
    name: 'NaviCue Arsenal',
    icon: '⚡',
    description: 'Belief transformation command center • 500 NaviCues live • 4 tracks • 21 delivery mechanisms',
    route: '/command-center/navicue-arsenal',
    status: 'complete',
    priority: 'critical',
    dependencies: [], // No dependencies - foundation complete
    connections: {
      tables: ['navicue_library'],
      apis: ['/api/navicues'],
      components: [
        'BeliefLadder',
        'BeliefProgressTracker',
        'NaviCueArsenalBrowser',
        'CreativePlayground',
        'MagicWand',
        'MyBrain',
      ],
    },
    views: [
      {
        id: 'analytics',
        name: 'Analytics',
        icon: '📊',
        description: 'Track progress and coverage',
        status: 'complete',
      },
      {
        id: 'library',
        name: 'Library',
        icon: '📚',
        description: 'Browse 500+ NaviCue collection',
        status: 'complete',
      },
      {
        id: 'creative',
        name: 'Creative Tools',
        icon: '🎨',
        description: 'Generate and experiment',
        status: 'complete',
      },
      {
        id: 'system',
        name: 'System',
        icon: '⚙️',
        description: 'Demos and integrations',
        status: 'complete',
      },
    ],
    stats: {
      total: 500,
      active: 500,
      completion: 100,
    },
  },

  // ============================================================================
  // ROOM 3B: JOURNEY ARSENAL (Complete ✅)
  // ============================================================================
  {
    id: 'journey-arsenal',
    name: 'Journey Arsenal',
    icon: '🧭',
    description: 'Definitive guide to Experiential Journeys • ERA framework • 12-week Universal Sprint • Design principles',
    route: '/command-center/journey-arsenal',
    status: 'complete',
    priority: 'critical',
    dependencies: [], // Documentation only - no dependencies
    connections: {
      tables: ['journey_templates', 'journey_template_scenes'],
      apis: [],
      components: [
        'JourneyArsenalPage',
      ],
    },
    views: [
      {
        id: 'philosophy',
        name: 'What Journeys Are',
        icon: '🧭',
        description: 'Philosophy & core concepts',
        status: 'complete',
      },
      {
        id: 'era',
        name: 'The ERA Framework',
        icon: '🔄',
        description: 'Experience → Recognize → Align',
        status: 'complete',
      },
      {
        id: 'sprint',
        name: 'The 12-Week Sprint',
        icon: '🚀',
        description: 'Universal onboarding OS',
        status: 'complete',
      },
      {
        id: 'architecture',
        name: 'Technical Architecture',
        icon: '🏗️',
        description: 'Database & integration',
        status: 'complete',
      },
      {
        id: 'principles',
        name: 'Design Principles',
        icon: '📐',
        description: 'The non-negotiables',
        status: 'complete',
      },
    ],
    stats: {
      total: 12,
      active: 12,
      completion: 100,
    },
  },

  // ============================================================================
  // ROOM 5: SCHEMA EXPOSURE MATRIX (In Progress 🏗️)
  // ============================================================================
  {
    id: 'schema-exposure-matrix',
    name: 'Schema Exposure Matrix',
    icon: '🗄️',
    description: 'Database schema, tagging coverage, and data relationships',
    route: '/schema-exposure',
    status: 'in-progress',
    priority: 'critical',
    dependencies: [],
    connections: {
      tables: ['ALL TABLES'],
      apis: [
        '/api/schema/tables',
        '/api/schema/stats',
        '/api/schema/relationships',
      ],
      components: [
        'SchemaVisualizer',
        'TagCoverageChart',
        'RelationshipGraph',
      ],
    },
    views: [
      {
        id: 'database-tables',
        name: 'Database Tables',
        icon: '🗄️',
        description: 'All tables and their structure',
        status: 'complete',
      },
      {
        id: 'tag-coverage',
        name: 'Tag Coverage',
        icon: '📊',
        description: 'What content has which tags',
        status: 'complete',
      },
      {
        id: 'relationship-web',
        name: 'Relationship Web',
        icon: '🕸️',
        description: 'How all content connects',
        status: 'planned',
      },
      {
        id: 'clinical-taxonomy',
        name: 'Clinical Taxonomy',
        icon: '🧬',
        description: 'Pillar → Concept → Theme → Mindblock',
        status: 'complete',
      },
      {
        id: 'gap-analysis',
        name: 'Gap Analysis',
        icon: '🔍',
        description: 'Missing tags, orphaned content',
        status: 'complete',
      },
    ],
  },

  // ============================================================================
  // ROOM 1: JOURNEY CONTROL ROOM (Planned 📅)
  // ============================================================================
  {
    id: 'journey-control-room',
    name: 'Journey Control Room',
    icon: '🗺️',
    description: 'Build and manage multi-week recovery journeys',
    route: '/command-center/journey',
    status: 'planned',
    priority: 'critical',
    dependencies: [
      'schema-exposure-matrix',  // Need to see database schema first
      'content-assembly-lab',     // Need content to link to scenes
    ],
    connections: {
      tables: [
        'journeys',
        'journey_weeks',
        'journey_days',
        'journey_mindblocks',
      ],
      apis: [
        '/api/journeys',
        '/api/scenes',
        '/api/journey-progress',
      ],
      components: [
        'JourneyBuilder',
        'SceneEditor',
        'WeekPlanner',
        'DayConfigurator',
      ],
    },
    views: [
      {
        id: 'journey-builder',
        name: 'Journey Builder',
        icon: '🏗️',
        description: 'Create and edit journey structure (weeks, days, scenes)',
        status: 'planned',
      },
      {
        id: 'scene-library',
        name: 'Scene Library',
        icon: '🎬',
        description: 'All scenes across all journeys (reusable)',
        status: 'planned',
      },
      {
        id: 'flow-visualizer',
        name: 'Flow Visualizer',
        icon: '🌊',
        description: 'Visual map of journey progression',
        status: 'planned',
      },
      {
        id: 'preview-mode',
        name: 'Preview Mode',
        icon: '👁️',
        description: 'Test journey as if you are a patient',
        status: 'planned',
      },
      {
        id: 'analytics',
        name: 'Journey Analytics',
        icon: '📊',
        description: 'Completion rates, drop-off points, engagement',
        status: 'planned',
      },
    ],
  },

  // ============================================================================
  // ROOM 2: CONTENT ASSEMBLY LAB (Planned 📅)
  // ============================================================================
  {
    id: 'content-assembly-lab',
    name: 'Content Assembly Lab',
    icon: '🔧',
    description: 'Link content (NaviCues, articles, practices) to scenes',
    route: '/command-center/content',
    status: 'planned',
    priority: 'critical',
    dependencies: [
      'schema-exposure-matrix',
      'navicue-arsenal',
    ],
    connections: {
      tables: [
        'navicues',
        'articles',
        'practices',
        'insights',
        'wellbeing_videos',
      ],
      apis: [
        '/api/content/search',
        '/api/content/link',
        '/api/content/tag',
      ],
      components: [
        'ContentBrowser',
        'ContentLinker',
        'TaggingPanel',
        'SearchFilters',
      ],
    },
    views: [
      {
        id: 'content-browser',
        name: 'Content Browser',
        icon: '🗂️',
        description: 'Browse all content with filters and search',
        status: 'planned',
      },
      {
        id: 'scene-linker',
        name: 'Scene Linker',
        icon: '🔗',
        description: 'Drag and drop content into scenes',
        status: 'planned',
      },
      {
        id: 'tagging-station',
        name: 'Tagging Station',
        icon: '🏷️',
        description: 'Bulk tag content (pillar, mindblock, voice, etc.)',
        status: 'planned',
      },
      {
        id: 'relationship-map',
        name: 'Relationship Map',
        icon: '🕸️',
        description: 'Visual web showing how content connects',
        status: 'planned',
      },
      {
        id: 'orphan-finder',
        name: 'Orphan Finder',
        icon: '🔍',
        description: 'Find unlinked or untagged content',
        status: 'planned',
      },
    ],
  },

  // ============================================================================
  // ROOM 4: ANALYTICS OBSERVATORY (Planned 📅)
  // ============================================================================
  {
    id: 'analytics-observatory',
    name: 'Analytics Observatory',
    icon: '📡',
    description: 'View all user data, insights, and platform metrics',
    route: '/command-center/analytics',
    status: 'planned',
    priority: 'high',
    dependencies: [
      'schema-exposure-matrix',
      'journey-control-room',
    ],
    connections: {
      tables: [
        'patients',
        'content_engagements',
        'user_mindblock_status',
        'micro_proofs',
        'navicue_responses',
      ],
      apis: [
        '/api/analytics/personas',
        '/api/analytics/engagement',
        '/api/analytics/journeys',
      ],
      components: [
        'PersonaDashboard',
        'EngagementCharts',
        'JourneyFunnel',
        'MindblockProgress',
      ],
    },
    views: [
      {
        id: 'persona-manager',
        name: 'Persona Manager',
        icon: '👥',
        description: 'Manage 125 synthetic test personas',
        status: 'planned',
      },
      {
        id: 'engagement-dashboard',
        name: 'Engagement Dashboard',
        icon: '📊',
        description: 'Real-time platform usage and interactions',
        status: 'planned',
      },
      {
        id: 'journey-funnel',
        name: 'Journey Funnel',
        icon: '🚰',
        description: 'See where users drop off in journeys',
        status: 'planned',
      },
      {
        id: 'mindblock-heatmap',
        name: 'Mindblock Heatmap',
        icon: '🌡️',
        description: 'Red/Amber/Green status across all users',
        status: 'planned',
      },
      {
        id: 'activity-simulator',
        name: 'Activity Simulator',
        icon: '🎲',
        description: 'Generate realistic user activity for testing',
        status: 'planned',
      },
    ],
  },

  // ============================================================================
  // ROOM 6: SYSTEM CONFIGURATION (Planned 📅)
  // ============================================================================
  {
    id: 'system-configuration',
    name: 'System Configuration',
    icon: '⚙️',
    description: 'Platform settings, integrations, and environment config',
    route: '/command-center/config',
    status: 'planned',
    priority: 'medium',
    dependencies: [
      'schema-exposure-matrix',
    ],
    connections: {
      tables: [
        'rehabs',
        'users',
        'kv_store_49b28b8a',
      ],
      apis: [
        '/api/config/environment',
        '/api/config/integrations',
        '/api/config/features',
      ],
      components: [
        'EnvironmentPanel',
        'IntegrationManager',
        'FeatureFlags',
      ],
    },
    views: [
      {
        id: 'environment',
        name: 'Environment',
        icon: '🌍',
        description: 'Supabase, Stripe, OpenAI, ElevenLabs config',
        status: 'planned',
      },
      {
        id: 'integrations',
        name: 'Integrations',
        icon: '🔌',
        description: 'Third-party API connections',
        status: 'planned',
      },
      {
        id: 'feature-flags',
        name: 'Feature Flags',
        icon: '🚩',
        description: 'Enable/disable platform features',
        status: 'planned',
      },
      {
        id: 'backup-restore',
        name: 'Backup & Restore',
        icon: '💾',
        description: 'Database backups and rollback',
        status: 'planned',
      },
      {
        id: 'logs',
        name: 'System Logs',
        icon: '📜',
        description: 'Error logs, API logs, user activity',
        status: 'planned',
      },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get control room by ID
 */
export function getControlRoom(id: string): ControlRoom | undefined {
  return CONTROL_ROOMS.find((room) => room.id === id);
}

/**
 * Get all control rooms by status
 */
export function getControlRoomsByStatus(status: ControlRoomStatus): ControlRoom[] {
  return CONTROL_ROOMS.filter((room) => room.status === status);
}

/**
 * Get all control rooms by priority
 */
export function getControlRoomsByPriority(priority: ControlRoomPriority): ControlRoom[] {
  return CONTROL_ROOMS.filter((room) => room.priority === priority);
}

/**
 * Check if a control room's dependencies are met
 */
export function areDependenciesMet(roomId: string): boolean {
  const room = getControlRoom(roomId);
  if (!room) return false;
  
  return room.dependencies.every((depId) => {
    const dep = getControlRoom(depId);
    return dep && dep.status === 'complete';
  });
}

/**
 * Get dependency graph (what depends on what)
 */
export function getDependencyGraph(): Record<string, string[]> {
  const graph: Record<string, string[]> = {};
  
  CONTROL_ROOMS.forEach((room) => {
    graph[room.id] = room.dependencies;
  });
  
  return graph;
}

/**
 * Get stats across all control rooms
 */
export function getCommandCenterStats() {
  const total = CONTROL_ROOMS.length;
  const complete = getControlRoomsByStatus('complete').length;
  const inProgress = getControlRoomsByStatus('in-progress').length;
  const planned = getControlRoomsByStatus('planned').length;
  
  const totalViews = CONTROL_ROOMS.reduce((sum, room) => sum + room.views.length, 0);
  const completeViews = CONTROL_ROOMS.reduce((sum, room) => {
    return sum + room.views.filter((v) => v.status === 'complete').length;
  }, 0);
  
  return {
    controlRooms: {
      total,
      complete,
      inProgress,
      planned,
      completionPercentage: Math.round((complete / total) * 100),
    },
    views: {
      total: totalViews,
      complete: completeViews,
      completionPercentage: Math.round((completeViews / totalViews) * 100),
    },
  };
}

/**
 * Get build order (which rooms to build first based on dependencies)
 */
export function getBuildOrder(): string[] {
  const order: string[] = [];
  const remaining = new Set(CONTROL_ROOMS.map((r) => r.id));
  
  while (remaining.size > 0) {
    // Find rooms with no remaining dependencies
    const ready = Array.from(remaining).filter((id) => {
      const room = getControlRoom(id);
      if (!room) return false;
      return room.dependencies.every((dep) => !remaining.has(dep));
    });
    
    if (ready.length === 0) {
      // Circular dependency - shouldn't happen
      break;
    }
    
    ready.forEach((id) => {
      order.push(id);
      remaining.delete(id);
    });
  }
  
  return order;
}