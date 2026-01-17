/**
 * ROOMS API - The Matrix
 * 
 * All features as "rooms" that LUMA can route to
 * Each room is interconnected - no dead ends
 * 
 * Philosophy:
 * - Features are rooms in a house
 * - LUMA is the concierge
 * - Patient can explore OR be guided
 * - Every room links to 2-3 other rooms
 */

import { Hono } from 'npm:hono@3';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// ============================================================================
// ROOM REGISTRY (The Map)
// ============================================================================

const ROOMS = {
  today: {
    id: 'today',
    name: 'Today',
    description: 'Your daily anchor - ERA + Spark + Wellbeing',
    icon: 'sun',
    routes: {
      frontend: '/today',
      api: '/rooms/today'
    },
    connects_to: ['journey', 'navicues', 'inner_compass', 'diary']
  },
  
  journey: {
    id: 'journey',
    name: 'Journey',
    description: '7-day ERA building blocks',
    icon: 'compass',
    routes: {
      frontend: '/journey-v2',
      api: '/rooms/journey'
    },
    connects_to: ['today', 'micro_blocks', 'content', 'momentum']
  },
  
  navicues: {
    id: 'navicues',
    name: 'NaviCues',
    description: 'Instagram-style brain rewiring',
    icon: 'sparkles',
    routes: {
      frontend: '/navicues',
      api: '/rooms/navicues'
    },
    connects_to: ['today', 'micro_blocks', 'diary']
  },
  
  micro_blocks: {
    id: 'micro_blocks',
    name: 'Micro-Blocks',
    description: '440 atomic skills library',
    icon: 'grid',
    routes: {
      frontend: '/micro-blocks',
      api: '/rooms/micro-blocks'
    },
    connects_to: ['journey', 'navicues', 'content', 'wellbeing']
  },
  
  content: {
    id: 'content',
    name: 'Content Library',
    description: 'Articles, practices, research',
    icon: 'book',
    routes: {
      frontend: '/content',
      api: '/rooms/content'
    },
    connects_to: ['micro_blocks', 'journey', 'wellbeing']
  },
  
  wellbeing: {
    id: 'wellbeing',
    name: 'Wellbeing',
    description: 'Video practices library',
    icon: 'heart',
    routes: {
      frontend: '/wellbeing',
      api: '/rooms/wellbeing'
    },
    connects_to: ['micro_blocks', 'content', 'inner_compass']
  },
  
  inner_compass: {
    id: 'inner_compass',
    name: 'Inner Compass',
    description: 'State check-ins (Tempo/Flow/Sync)',
    icon: 'gauge',
    routes: {
      frontend: '/inner-compass',
      api: '/rooms/inner-compass'
    },
    connects_to: ['today', 'wellbeing', 'story_map']
  },
  
  diary: {
    id: 'diary',
    name: 'Diary',
    description: 'Micro-moment captures',
    icon: 'pen',
    routes: {
      frontend: '/diary',
      api: '/rooms/diary'
    },
    connects_to: ['today', 'story_map', 'navicues']
  },
  
  story_map: {
    id: 'story_map',
    name: 'Story Map',
    description: 'Pain, protection, identity seeds',
    icon: 'map',
    routes: {
      frontend: '/story-map',
      api: '/rooms/story-map'
    },
    connects_to: ['diary', 'inner_compass', 'identity']
  },
  
  identity: {
    id: 'identity',
    name: 'Identity Lines',
    description: 'Your weekly anchor sentence',
    icon: 'user',
    routes: {
      frontend: '/identity',
      api: '/rooms/identity'
    },
    connects_to: ['story_map', 'today', 'journey']
  },
  
  momentum: {
    id: 'momentum',
    name: 'Momentum',
    description: 'Progress visualization',
    icon: 'trending-up',
    routes: {
      frontend: '/momentum',
      api: '/rooms/momentum'
    },
    connects_to: ['journey', 'today', 'inner_compass']
  },
  
  team: {
    id: 'team',
    name: 'Team',
    description: 'Therapist messaging',
    icon: 'users',
    routes: {
      frontend: '/alumni-messenger',
      api: '/rooms/team'
    },
    connects_to: ['today', 'sos']
  },
  
  sos: {
    id: 'sos',
    name: 'SOS',
    description: 'Crisis support',
    icon: 'alert-circle',
    routes: {
      frontend: '/sos',
      api: '/rooms/sos'
    },
    connects_to: ['team', 'inner_compass', 'wellbeing']
  }
};

// ============================================================================
// GET /rooms (List all rooms)
// ============================================================================

app.get('/rooms', (c) => {
  return c.json({
    rooms: Object.values(ROOMS),
    total_rooms: Object.keys(ROOMS).length,
    philosophy: 'Features are rooms. LUMA is the concierge. Guide, not dictate.'
  });
});

// ============================================================================
// GET /rooms/:room_id (Room details + connections)
// ============================================================================

app.get('/rooms/:room_id', (c) => {
  const roomId = c.req.param('room_id');
  const room = ROOMS[roomId as keyof typeof ROOMS];
  
  if (!room) {
    return c.json({ error: 'Room not found' }, 404);
  }
  
  // Get connected rooms
  const connections = room.connects_to.map(connectedId => {
    const connectedRoom = ROOMS[connectedId as keyof typeof ROOMS];
    return {
      id: connectedRoom.id,
      name: connectedRoom.name,
      description: connectedRoom.description,
      icon: connectedRoom.icon,
      route: connectedRoom.routes.frontend
    };
  });
  
  return c.json({
    room,
    connections,
    message: `From ${room.name}, you can explore: ${connections.map(c => c.name).join(', ')}`
  });
});

// ============================================================================
// POST /rooms/navigate (LUMA routing logic)
// ============================================================================

app.post('/rooms/navigate', async (c) => {
  const body = await c.req.json();
  const { user_id, rehab_id, from_room, intent, context } = body;
  
  /**
   * Intent can be:
   * - 'next' (LUMA decides what's helpful next)
   * - 'regulate' (need to calm down NOW)
   * - 'understand' (want to learn why)
   * - 'practice' (ready to do the work)
   * - 'reflect' (process what happened)
   * - 'connect' (reach out for support)
   */
  
  // Get user baseline
  const baseline = await calculateSentientBaseline(user_id, rehab_id);
  
  // Get story map context
  const story = await getStoryMapContext(user_id, rehab_id);
  
  // Routing logic
  let recommendedRoom = null;
  let reasoning = '';
  
  if (intent === 'regulate' || baseline.regulate_ready === 0) {
    // REGULATION FIRST
    recommendedRoom = ROOMS.wellbeing;
    reasoning = 'Your baseline suggests regulation is needed before other work.';
  } else if (intent === 'understand') {
    // LEARNING PATH
    recommendedRoom = ROOMS.content;
    reasoning = 'When curious, the Content Library helps you understand the why.';
  } else if (intent === 'practice') {
    // DOING PATH
    const hasActiveJourney = await checkActiveJourney(user_id, rehab_id);
    if (hasActiveJourney) {
      recommendedRoom = ROOMS.journey;
      reasoning = 'You have an active Journey block - let\'s continue that practice.';
    } else {
      recommendedRoom = ROOMS.navicues;
      reasoning = 'NaviCues are perfect for quick, powerful practice moments.';
    }
  } else if (intent === 'reflect') {
    // PROCESSING PATH
    recommendedRoom = ROOMS.diary;
    reasoning = 'Capture what\'s on your mind - even 30 seconds helps process.';
  } else if (intent === 'connect') {
    // SUPPORT PATH
    recommendedRoom = ROOMS.team;
    reasoning = 'Reaching out is strength. Your therapist is here.';
  } else {
    // DEFAULT: LUMA DECIDES
    
    // Check for unresolved SOS
    const { data: activeSOS } = await supabase
      .from('rescue_events')
      .select('*')
      .eq('user_id', user_id)
      .eq('resolved', false)
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (activeSOS && activeSOS.length > 0) {
      recommendedRoom = ROOMS.sos;
      reasoning = 'You have an active SOS. Let\'s check in on that first.';
    } else if (!baseline.regulate_ready) {
      recommendedRoom = ROOMS.wellbeing;
      reasoning = 'Your sleep/HRV suggest a regulation practice would help.';
    } else if (from_room === 'journey' && baseline.cognitive_bandwidth > 0) {
      recommendedRoom = ROOMS.navicues;
      reasoning = 'Great work on your Journey block - ready for a brain ping?';
    } else if (from_room === 'navicues') {
      recommendedRoom = ROOMS.diary;
      reasoning = 'After a NaviCue, capturing your thoughts helps consolidate.';
    } else if (story.protectionBias === 'control') {
      recommendedRoom = ROOMS.journey; // Decision Mastery pillar
      reasoning = 'Your protection pattern suggests working on choice flexibility.';
    } else if (story.protectionBias === 'image') {
      recommendedRoom = ROOMS.identity; // Identity Integration
      reasoning = 'Exploring your identity line might help with image protection.';
    } else {
      // Default to Today
      recommendedRoom = ROOMS.today;
      reasoning = 'Let\'s check your Today view - everything starts there.';
    }
  }
  
  return c.json({
    from: from_room ? ROOMS[from_room as keyof typeof ROOMS] : null,
    to: recommendedRoom,
    reasoning,
    context: {
      baseline,
      story,
      intent
    },
    next_steps: recommendedRoom.connects_to.map(id => ({
      room: ROOMS[id as keyof typeof ROOMS].name,
      route: ROOMS[id as keyof typeof ROOMS].routes.frontend
    }))
  });
});

// ============================================================================
// Helper: Calculate Sentient Baseline
// ============================================================================

async function calculateSentientBaseline(userId: string, rehabId: string) {
  // Get recent signals (last 24 hours)
  const { data: signals } = await supabase
    .from('signals')
    .select('*')
    .eq('user_id', userId)
    .gte('captured_at', new Date(Date.now() - 24*3600*1000).toISOString())
    .order('captured_at', { ascending: false });
  
  const sleep_minutes = signals?.find(s => s.key === 'sleep_minutes')?.value_num ?? 0;
  const rmssd = signals?.find(s => s.key === 'rmssd')?.value_num ?? 0;
  
  // Get latest state
  const { data: state } = await supabase
    .from('state_logs')
    .select('*')
    .eq('patient_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  const tempo = state?.tempo ?? 5;
  const flow = state?.flow ?? 5;
  const sync = state?.sync ?? 5;
  
  // Calculate indices
  const regulate_ready = (sleep_minutes >= 360 && rmssd >= 30) ? 1 : 0;
  const cognitive_bandwidth = ((flow + sync) / 2) >= 5 ? 1 : 0;
  const social_capacity = tempo >= 5 ? 1 : 0;
  
  return {
    regulate_ready,
    cognitive_bandwidth,
    social_capacity,
    sleep_minutes,
    rmssd,
    state: { tempo, flow, sync }
  };
}

// ============================================================================
// Helper: Get Story Map Context
// ============================================================================

async function getStoryMapContext(userId: string, rehabId: string) {
  const since = new Date(Date.now() - 14*24*3600*1000).toISOString();
  
  const { data: story } = await supabase
    .from('story_map_entries')
    .select('protection_bias, hot_contexts, pain_vectors')
    .eq('user_id', userId)
    .eq('rehab_id', rehabId)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(20);
  
  const protectionBias = story?.find(s => s.protection_bias)?.protection_bias ?? null;
  const hotContexts = [...new Set((story || []).flatMap(s => s.hot_contexts || []))];
  const painVectors = (story || []).flatMap(s => s.pain_vectors || []);
  
  return { protectionBias, hotContexts, painVectors };
}

// ============================================================================
// Helper: Check Active Journey
// ============================================================================

async function checkActiveJourney(userId: string, rehabId: string) {
  const { data: assignment } = await supabase
    .from('block_assignments')
    .select('*')
    .eq('patient_id', userId)
    .eq('rehab_id', rehabId)
    .eq('status', 'in_progress')
    .order('assigned_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  return !!assignment;
}

// ============================================================================
// POST /rooms/breadcrumbs (Track navigation path)
// ============================================================================

app.post('/rooms/breadcrumbs', async (c) => {
  const body = await c.req.json();
  const { user_id, rehab_id, path } = body;
  
  /**
   * path = ['today', 'journey', 'navicues', 'diary']
   * 
   * This helps us understand:
   * - Are patients exploring freely?
   * - Are they getting stuck in one room?
   * - Which paths lead to outcomes?
   */
  
  // Log to events table
  await supabase.from('events').insert({
    rehab_id,
    patient_id: user_id,
    kind: 'navigation_path',
    data: { path, timestamp: new Date().toISOString() }
  });
  
  // Analyze path
  const pathLength = path.length;
  const uniqueRooms = new Set(path).size;
  const repeatedRooms = pathLength - uniqueRooms;
  
  const analysis = {
    exploration_score: (uniqueRooms / pathLength) * 100, // Higher = more exploration
    focus_score: (repeatedRooms / pathLength) * 100, // Higher = more repetition (could be good)
    journey_room_visits: path.filter((r: string) => r === 'journey').length,
    navicue_room_visits: path.filter((r: string) => r === 'navicues').length
  };
  
  return c.json({
    path,
    analysis,
    message: analysis.exploration_score > 50 
      ? 'You\'re exploring broadly - that\'s great!' 
      : 'You\'re focused on a few rooms - deep work happening.'
  });
});

// ============================================================================
// GET /rooms/matrix (Visualization data)
// ============================================================================

app.get('/rooms/matrix', (c) => {
  /**
   * Returns matrix format for D3.js or other viz
   * Shows all room-to-room connections
   */
  
  const nodes = Object.values(ROOMS).map(room => ({
    id: room.id,
    name: room.name,
    group: getGroup(room.id)
  }));
  
  const links = Object.values(ROOMS).flatMap(room =>
    room.connects_to.map(target => ({
      source: room.id,
      target: target,
      value: 1
    }))
  );
  
  return c.json({
    nodes,
    links,
    description: 'The interconnected matrix - every room connects to 2-3 others'
  });
});

function getGroup(roomId: string): number {
  // Group rooms by category for visualization
  if (['today', 'momentum'].includes(roomId)) return 1; // Overview
  if (['journey', 'navicues', 'micro_blocks'].includes(roomId)) return 2; // Practice
  if (['content', 'wellbeing'].includes(roomId)) return 3; // Learning
  if (['diary', 'story_map', 'identity'].includes(roomId)) return 4; // Reflection
  if (['inner_compass', 'team', 'sos'].includes(roomId)) return 5; // Support
  return 0;
}

// ============================================================================
// Export
// ============================================================================

export default app;
