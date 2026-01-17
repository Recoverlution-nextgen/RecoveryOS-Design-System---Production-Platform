/**
 * Momentum Data Layer
 * Tracks Return · Rely · Shift metrics across all patient interactions
 * 
 * Part of ST50: Momentum Data Architecture
 */

import { SIX_PILLARS_ARRAY } from './colorSystem';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type PillarType = 
  | "Emotional Regulation"
  | "Stress Resilience"
  | "Social Connectivity"
  | "Cognitive Reframing"
  | "Identity Integration"
  | "Decision Mastery";

export type ContentType = 
  | 'navicue'
  | 'video'
  | 'article'
  | 'exercise'
  | 'journey-step'
  | 'building-block';

export type BrainState = 'red' | 'orange' | 'green';

export type EventType = 
  | 'view'
  | 'save'
  | 'complete'
  | 'revisit'
  | 'share'
  | 'reflect'
  | 'state-check-in'
  | 'therapy-session';

// ============================================================================
// CORE DATA INTERFACES
// ============================================================================

export interface InteractionEvent {
  id: string;
  patientId: string;
  timestamp: Date;
  eventType: EventType;
  
  // Content Context
  contentType?: ContentType;
  contentId?: string;
  
  // Session Context
  sessionId: string;
  sessionDuration: number; // milliseconds
  
  // Pillar Mapping
  primaryPillar?: PillarType;
  secondaryPillars?: PillarType[];
  
  // Micro-block Mapping
  microBlockIds?: string[];
  
  // Emotional Context
  priorState?: InnerState;
  postState?: InnerState;
  
  // Device & Location
  deviceType: 'mobile' | 'desktop' | 'tablet';
  location?: 'facility' | 'home' | 'other';
}

export interface InnerState {
  energy: number;      // 0-100
  clarity: number;     // 0-100
  connection: number;  // 0-100
}

export interface StateCheckIn {
  id: string;
  patientId: string;
  timestamp: Date;
  
  energy: number;
  clarity: number;
  connection: number;
  syncScore: number; // Average of three dimensions
  
  timeOfDay: 'morning' | 'midday' | 'evening' | 'night';
  triggers?: string[];
  notes?: string;
}

export interface MicroBlockState {
  id: string;
  patientId: string;
  microBlockId: string;
  pillar: PillarType;
  
  currentState: BrainState;
  stateHistory: Array<{
    state: BrainState;
    timestamp: Date;
    trigger?: string;
  }>;
  
  contentEngaged: string[];
  lastEngaged: Date | null;
  engagementFrequency: number;
  
  timeInCurrentState: number; // days
  totalShifts: number;
  lastShiftDate: Date | null;
  trendDirection: 'improving' | 'stable' | 'declining';
}

export interface SavedContent {
  id: string;
  patientId: string;
  contentId: string;
  contentType: ContentType;
  
  savedAt: Date;
  savedFrom: 'journey' | 'navicues' | 'toolkit' | 'luma-recommendation' | 'navigate';
  
  timesRevisited: number;
  lastRevisited: Date | null;
  averageSessionDuration: number;
  
  notes?: string;
  tags?: string[];
  isFavorite: boolean;
}

// ============================================================================
// TEMPO: Return Metric
// ============================================================================

export interface TempoData {
  daysActive: number;
  totalDays: number;
  averageReturnsPerDay: number;
  longestStreak: number;
  consistency: number; // 0-100
  
  dailyReturns: Array<{
    day: string;
    returns: number;
    primaryContent?: string;
  }>;
  
  preferredTimes: {
    morning: number;
    midday: number;
    evening: number;
    night: number;
  };
}

export function calculateTempo(
  patientId: string,
  timeframe: 'week' | 'month' = 'week',
  events?: InteractionEvent[]
): TempoData {
  // If no events provided, use mock data (real implementation would query DB)
  if (!events) {
    return getMockTempoData(timeframe);
  }
  
  const days = timeframe === 'week' ? 7 : 30;
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  // Filter events within timeframe
  const relevantEvents = events.filter(e => 
    e.timestamp >= startDate && e.timestamp <= now
  );
  
  // Group by day
  const dailyGroups = groupEventsByDay(relevantEvents, days);
  
  // Calculate metrics
  const daysActive = dailyGroups.filter(d => d.events.length > 0).length;
  const totalReturns = relevantEvents.length;
  const averageReturnsPerDay = daysActive > 0 ? totalReturns / days : 0;
  const longestStreak = calculateStreak(dailyGroups);
  const consistency = calculateConsistency(dailyGroups);
  
  // Analyze preferred times
  const preferredTimes = analyzePreferredTimes(relevantEvents);
  
  // Build daily returns array
  const dailyReturns = dailyGroups.map(d => ({
    day: formatDayLabel(d.date),
    returns: d.events.length,
    primaryContent: d.events.length > 0 
      ? getMostEngagedContent(d.events)
      : undefined
  }));
  
  return {
    daysActive,
    totalDays: days,
    averageReturnsPerDay: Math.round(averageReturnsPerDay * 10) / 10,
    longestStreak,
    consistency,
    dailyReturns,
    preferredTimes
  };
}

// ============================================================================
// FLOW: Breadth Metric
// ============================================================================

export interface FlowData {
  breadthPercentage: number;
  typesEngaged: number;
  totalSaved: number;
  revisitRate: number;
  
  byType: {
    navicues: number;
    videos: number;
    articles: number;
    exercises: number;
    journeySteps: number;
    buildingBlocks: number;
  };
  
  pillarDistribution: Record<PillarType, number>;
  
  flowBalance: {
    structured: number;
    guided: number;
    learning: number;
    practice: number;
  };
}

export function calculateFlow(
  patientId: string,
  savedContent?: SavedContent[]
): FlowData {
  // If no saved content provided, use mock data
  if (!savedContent) {
    return getMockFlowData();
  }
  
  // Count by type
  const byType = {
    navicues: savedContent.filter(s => s.contentType === 'navicue').length,
    videos: savedContent.filter(s => s.contentType === 'video').length,
    articles: savedContent.filter(s => s.contentType === 'article').length,
    exercises: savedContent.filter(s => s.contentType === 'exercise').length,
    journeySteps: savedContent.filter(s => s.contentType === 'journey-step').length,
    buildingBlocks: savedContent.filter(s => s.contentType === 'building-block').length
  };
  
  const typesEngaged = Object.values(byType).filter(count => count > 0).length;
  const breadthPercentage = Math.round((typesEngaged / 6) * 100);
  
  // Calculate revisit rate
  const totalSaved = savedContent.length;
  const revisited = savedContent.filter(s => s.timesRevisited > 0).length;
  const revisitRate = totalSaved > 0 ? Math.round((revisited / totalSaved) * 100) : 0;
  
  // Pillar distribution (would need content metadata in real implementation)
  const pillarDistribution = calculatePillarDistribution(savedContent);
  
  // Flow balance
  const flowBalance = {
    structured: byType.journeySteps,
    guided: byType.navicues,
    learning: byType.videos + byType.articles,
    practice: byType.exercises + byType.buildingBlocks
  };
  
  return {
    breadthPercentage,
    typesEngaged,
    totalSaved,
    revisitRate,
    byType,
    pillarDistribution,
    flowBalance
  };
}

// ============================================================================
// SYNC: Internal Equilibrium Metric
// ============================================================================

export interface SyncData {
  syncScore: number | null;
  current: InnerState | null;
  trends: {
    energy: 'improving' | 'stable' | 'declining';
    clarity: 'improving' | 'stable' | 'declining';
    connection: 'improving' | 'stable' | 'declining';
  } | null;
  volatility: number;
  checkInFrequency: number;
  
  correlations?: {
    timeOfDay: Record<string, number>;
    commonTriggers: string[];
  };
}

export function calculateSync(
  patientId: string,
  checkIns?: StateCheckIn[]
): SyncData {
  // If no check-ins provided, use mock data
  if (!checkIns || checkIns.length === 0) {
    return getMockSyncData();
  }
  
  // Sort by timestamp (newest first)
  const sortedCheckIns = [...checkIns].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );
  
  const latest = sortedCheckIns[0];
  const syncScore = Math.round((latest.energy + latest.clarity + latest.connection) / 3);
  
  // Calculate trends
  const trends = sortedCheckIns.length >= 3 ? {
    energy: calculateTrendDirection(sortedCheckIns.map(c => c.energy)),
    clarity: calculateTrendDirection(sortedCheckIns.map(c => c.clarity)),
    connection: calculateTrendDirection(sortedCheckIns.map(c => c.connection))
  } : null;
  
  // Calculate volatility
  const volatility = calculateVolatility(sortedCheckIns);
  
  return {
    syncScore,
    current: {
      energy: latest.energy,
      clarity: latest.clarity,
      connection: latest.connection
    },
    trends,
    volatility,
    checkInFrequency: checkIns.length
  };
}

// ============================================================================
// BRAIN STATE: Micro-block Traffic Lights
// ============================================================================

export interface BrainStateData {
  byPillar: Array<{
    pillar: PillarType;
    red: number;
    orange: number;
    green: number;
    total: number;
    recentShifts: number;
    engagementLevel: 'high' | 'medium' | 'low';
  }>;
  
  overall: {
    totalBlocks: number;
    greenBlocks: number;
    orangeBlocks: number;
    redBlocks: number;
    greenPercentage: number;
    shiftsThisWeek: number;
    needsAttention: string[];
  };
}

export function calculateBrainState(
  patientId: string,
  microBlocks?: MicroBlockState[]
): BrainStateData {
  // If no micro-blocks provided, use mock data
  if (!microBlocks) {
    return getMockBrainStateData();
  }
  
  // Group by pillar
  const byPillar = SIX_PILLARS_ARRAY.map(pillar => {
    const pillarBlocks = microBlocks.filter(mb => mb.pillar === pillar.name);
    
    const red = pillarBlocks.filter(mb => mb.currentState === 'red').length;
    const orange = pillarBlocks.filter(mb => mb.currentState === 'orange').length;
    const green = pillarBlocks.filter(mb => mb.currentState === 'green').length;
    
    // Count recent shifts (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentShifts = pillarBlocks.filter(mb => 
      mb.lastShiftDate && mb.lastShiftDate >= weekAgo
    ).length;
    
    // Calculate engagement level
    const avgFrequency = pillarBlocks.reduce((sum, mb) => sum + mb.engagementFrequency, 0) / pillarBlocks.length;
    const engagementLevel: 'high' | 'medium' | 'low' = 
      avgFrequency >= 3 ? 'high' : avgFrequency >= 1 ? 'medium' : 'low';
    
    return {
      pillar: pillar.name,
      red,
      orange,
      green,
      total: pillarBlocks.length,
      recentShifts,
      engagementLevel
    };
  });
  
  // Overall metrics
  const totalBlocks = microBlocks.length;
  const greenBlocks = microBlocks.filter(mb => mb.currentState === 'green').length;
  const orangeBlocks = microBlocks.filter(mb => mb.currentState === 'orange').length;
  const redBlocks = microBlocks.filter(mb => mb.currentState === 'red').length;
  const greenPercentage = totalBlocks > 0 ? Math.round((greenBlocks / totalBlocks) * 100) : 0;
  
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const shiftsThisWeek = microBlocks.filter(mb => 
    mb.lastShiftDate && mb.lastShiftDate >= weekAgo
  ).length;
  
  const needsAttention = microBlocks
    .filter(mb => mb.currentState === 'red' && mb.engagementFrequency < 1)
    .map(mb => mb.microBlockId);
  
  return {
    byPillar,
    overall: {
      totalBlocks,
      greenBlocks,
      orangeBlocks,
      redBlocks,
      greenPercentage,
      shiftsThisWeek,
      needsAttention
    }
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function groupEventsByDay(events: InteractionEvent[], days: number): Array<{ date: Date; events: InteractionEvent[] }> {
  const groups: Array<{ date: Date; events: InteractionEvent[] }> = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    date.setHours(0, 0, 0, 0);
    
    const dayEvents = events.filter(e => {
      const eventDate = new Date(e.timestamp);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === date.getTime();
    });
    
    groups.unshift({ date, events: dayEvents });
  }
  
  return groups;
}

function calculateStreak(dailyGroups: Array<{ events: InteractionEvent[] }>): number {
  let currentStreak = 0;
  let maxStreak = 0;
  
  for (const day of dailyGroups.reverse()) {
    if (day.events.length > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  
  return maxStreak;
}

function calculateConsistency(dailyGroups: Array<{ events: InteractionEvent[] }>): number {
  const daysWithActivity = dailyGroups.filter(d => d.events.length > 0).length;
  return Math.round((daysWithActivity / dailyGroups.length) * 100);
}

function analyzePreferredTimes(events: InteractionEvent[]): TempoData['preferredTimes'] {
  const times = { morning: 0, midday: 0, evening: 0, night: 0 };
  
  events.forEach(e => {
    const hour = e.timestamp.getHours();
    if (hour >= 5 && hour < 12) times.morning++;
    else if (hour >= 12 && hour < 17) times.midday++;
    else if (hour >= 17 && hour < 22) times.evening++;
    else times.night++;
  });
  
  return times;
}

function formatDayLabel(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

function getMostEngagedContent(events: InteractionEvent[]): string {
  const contentCounts: Record<string, number> = {};
  
  events.forEach(e => {
    if (e.contentId) {
      contentCounts[e.contentId] = (contentCounts[e.contentId] || 0) + 1;
    }
  });
  
  const sorted = Object.entries(contentCounts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || 'Mixed';
}

function calculatePillarDistribution(savedContent: SavedContent[]): Record<PillarType, number> {
  // In real implementation, would need content metadata to map content to pillars
  // For now, return mock distribution
  const distribution: Record<PillarType, number> = {
    "Emotional Regulation": 0,
    "Stress Resilience": 0,
    "Social Connectivity": 0,
    "Cognitive Reframing": 0,
    "Identity Integration": 0,
    "Decision Mastery": 0
  };
  
  // Mock distribution based on content count
  const perPillar = Math.floor(savedContent.length / 6);
  Object.keys(distribution).forEach((key, idx) => {
    distribution[key as PillarType] = perPillar + (idx < savedContent.length % 6 ? 1 : 0);
  });
  
  return distribution;
}

function calculateTrendDirection(values: number[]): 'improving' | 'stable' | 'declining' {
  if (values.length < 2) return 'stable';
  
  const recent = values.slice(0, Math.min(3, values.length));
  const older = values.slice(Math.min(3, values.length));
  
  const recentAvg = recent.reduce((sum, v) => sum + v, 0) / recent.length;
  const olderAvg = older.length > 0 
    ? older.reduce((sum, v) => sum + v, 0) / older.length
    : recentAvg;
  
  const diff = recentAvg - olderAvg;
  
  if (diff > 5) return 'improving';
  if (diff < -5) return 'declining';
  return 'stable';
}

function calculateVolatility(checkIns: StateCheckIn[]): number {
  if (checkIns.length < 2) return 0;
  
  const syncScores = checkIns.map(c => c.syncScore);
  const differences = syncScores.slice(0, -1).map((score, i) => 
    Math.abs(score - syncScores[i + 1])
  );
  
  const avgDifference = differences.reduce((sum, d) => sum + d, 0) / differences.length;
  
  // Convert to 0-100 scale (assuming max difference of 50 is "very volatile")
  return Math.min(100, Math.round((avgDifference / 50) * 100));
}

// ============================================================================
// MOCK DATA GENERATORS (for development/testing)
// ============================================================================

function getMockTempoData(timeframe: 'week' | 'month'): TempoData {
  const days = timeframe === 'week' ? 7 : 30;
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return {
    daysActive: timeframe === 'week' ? 5 : 22,
    totalDays: days,
    averageReturnsPerDay: 3.7,
    longestStreak: 4,
    consistency: timeframe === 'week' ? 71 : 73,
    
    dailyReturns: timeframe === 'week' 
      ? dayLabels.map((day, i) => ({
          day,
          returns: [3, 5, 2, 4, 6, 2, 3][i]
        }))
      : Array.from({ length: 30 }, (_, i) => ({
          day: `Day ${i + 1}`,
          returns: Math.floor(Math.random() * 7)
        })),
    
    preferredTimes: {
      morning: 12,
      midday: 8,
      evening: 15,
      night: 5
    }
  };
}

function getMockFlowData(): FlowData {
  return {
    breadthPercentage: 83,
    typesEngaged: 5,
    totalSaved: 75,
    revisitRate: 68,
    
    byType: {
      navicues: 12,
      videos: 8,
      articles: 15,
      exercises: 18,
      journeySteps: 22,
      buildingBlocks: 0
    },
    
    pillarDistribution: {
      "Emotional Regulation": 14,
      "Stress Resilience": 11,
      "Social Connectivity": 9,
      "Cognitive Reframing": 18,
      "Identity Integration": 12,
      "Decision Mastery": 11
    },
    
    flowBalance: {
      structured: 22,
      guided: 12,
      learning: 23,
      practice: 18
    }
  };
}

function getMockSyncData(): SyncData {
  return {
    syncScore: 78,
    current: {
      energy: 78,
      clarity: 85,
      connection: 72
    },
    trends: {
      energy: 'improving',
      clarity: 'stable',
      connection: 'improving'
    },
    volatility: 32,
    checkInFrequency: 18
  };
}

function getMockBrainStateData(): BrainStateData {
  return {
    byPillar: [
      {
        pillar: "Emotional Regulation",
        red: 25,
        orange: 45,
        green: 30,
        total: 100,
        recentShifts: 3,
        engagementLevel: 'medium'
      },
      {
        pillar: "Stress Resilience",
        red: 35,
        orange: 40,
        green: 25,
        total: 100,
        recentShifts: 2,
        engagementLevel: 'medium'
      },
      {
        pillar: "Social Connectivity",
        red: 40,
        orange: 35,
        green: 25,
        total: 100,
        recentShifts: 1,
        engagementLevel: 'low'
      },
      {
        pillar: "Cognitive Reframing",
        red: 20,
        orange: 50,
        green: 30,
        total: 100,
        recentShifts: 4,
        engagementLevel: 'high'
      },
      {
        pillar: "Identity Integration",
        red: 30,
        orange: 45,
        green: 25,
        total: 100,
        recentShifts: 2,
        engagementLevel: 'medium'
      },
      {
        pillar: "Decision Mastery",
        red: 25,
        orange: 40,
        green: 35,
        total: 100,
        recentShifts: 3,
        engagementLevel: 'high'
      }
    ],
    overall: {
      totalBlocks: 600,
      greenBlocks: 170,
      orangeBlocks: 255,
      redBlocks: 175,
      greenPercentage: 28,
      shiftsThisWeek: 15,
      needsAttention: ['block-123', 'block-456', 'block-789']
    }
  };
}

// ============================================================================
// EVENT TRACKING API (for instrumentation)
// ============================================================================

export function trackInteraction(event: Omit<InteractionEvent, 'id' | 'timestamp' | 'sessionId'>): void {
  // In real implementation, this would:
  // 1. Generate ID and timestamp
  // 2. Get or create session ID
  // 3. Send to Supabase
  // 4. Trigger real-time updates
  
  console.log('📊 Track Interaction:', event);
  
  // TODO: Implement actual tracking
  // await supabase
  //   .from('interaction_events')
  //   .insert({ ...event, id: uuid(), timestamp: new Date(), sessionId: getSessionId() });
}

export function trackStateCheckIn(checkIn: Omit<StateCheckIn, 'id' | 'timestamp' | 'syncScore'>): void {
  const syncScore = Math.round((checkIn.energy + checkIn.clarity + checkIn.connection) / 3);
  
  console.log('🎯 Track State Check-in:', { ...checkIn, syncScore });
  
  // TODO: Implement actual tracking
}

export function saveContent(
  patientId: string,
  contentId: string,
  contentType: ContentType,
  savedFrom: SavedContent['savedFrom']
): void {
  console.log('💾 Save Content:', { patientId, contentId, contentType, savedFrom });
  
  // TODO: Implement actual save
}

export function updateMicroBlockState(
  patientId: string,
  microBlockId: string,
  newState: BrainState,
  trigger?: string
): void {
  console.log('🧠 Update Micro-block State:', { patientId, microBlockId, newState, trigger });
  
  // TODO: Implement actual update
}
