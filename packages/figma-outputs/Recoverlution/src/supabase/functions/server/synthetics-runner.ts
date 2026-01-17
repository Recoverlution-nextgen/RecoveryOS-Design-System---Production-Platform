/**
 * SYNTHETICS RUNNER MODULE
 * Core logic for generating continuous synthetic data
 * Called by synthetics-control.tsx endpoints
 */

import { createClient } from 'npm:@supabase/supabase-js';

// Deterministic PRNG (xorshift32)
function makePRNG(seed: number) {
  let x = seed || Date.now();
  return function rand() {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return ((x >>> 0) / 0xFFFFFFFF);
  };
}

// Scene event types
const SCENE_EVENT_TYPES = [
  'scene_started',
  'scene_progressed', 
  'scene_completed',
  'scene_abandoned',
  'artifact_captured',
  'choice_selected',
  'reflection_submitted',
  'timer_expired'
];

// Mindblock signal types from NaviCue v2 schema
const MINDBLOCK_SIGNAL_TYPES = [
  'viewed',
  'engaged',
  'completed',
  'applied',
  'resonated',
  'challenged',
  'bookmarked',
  'shared'
];

// Journey templates
const JOURNEY_TEMPLATES = [
  'onboarding',
  'daily_check_in',
  'trigger_awareness',
  'craving_management',
  'emotional_regulation',
  'identity_work',
  'relapse_prevention',
  'morning_intention',
  'evening_reflection'
];

interface SyntheticSettings {
  enabled: boolean;
  sessions_per_min: number;
  max_per_run: number;
  error_rate: number;
  abandon_rate: number;
}

interface SimUser {
  profile_id: string;
  org_id: string | null;
  persona_key: string;
  started_at: string;
}

interface RunResult {
  success: boolean;
  sessions_created: number;
  scene_events_created: number;
  mindblock_events_created: number;
  settings: {
    target: number;
    abandon_rate: number;
    error_rate: number;
  };
  timestamp: string;
  error?: string;
}

/**
 * Run synthetic data generation
 * Creates N journey sessions with realistic behavior
 */
export async function runSynthetics(
  targetOverride?: number
): Promise<RunResult> {
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supa = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { 
    auth: { persistSession: false } 
  });

  try {
    // 1. Fetch settings
    const { data: settings, error: settingsErr } = await supa
      .from('synthetic_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (settingsErr) {
      console.error('No synthetic_settings found. Creating default row...');
      // Create default settings if not exists
      const { error: insertErr } = await supa
        .from('synthetic_settings')
        .insert({
          id: 1,
          enabled: true,
          sessions_per_min: 2,
          max_per_run: 5,
          error_rate: 0.05,
          abandon_rate: 0.15,
          updated_at: new Date().toISOString()
        });
      
      if (insertErr) throw insertErr;
      
      // Use defaults
      return runSyntheticsWithSettings(supa, {
        enabled: true,
        sessions_per_min: 2,
        max_per_run: 5,
        error_rate: 0.05,
        abandon_rate: 0.15
      }, targetOverride);
    }

    if (!settings.enabled && !targetOverride) {
      return {
        success: false,
        sessions_created: 0,
        scene_events_created: 0,
        mindblock_events_created: 0,
        settings: {
          target: 0,
          abandon_rate: settings.abandon_rate,
          error_rate: settings.error_rate
        },
        timestamp: new Date().toISOString(),
        error: 'Synthetics are disabled. Use /toggle to enable or provide target param.'
      };
    }

    return runSyntheticsWithSettings(supa, settings as SyntheticSettings, targetOverride);

  } catch (error: any) {
    console.error('Synthetics run error:', error);
    return {
      success: false,
      sessions_created: 0,
      scene_events_created: 0,
      mindblock_events_created: 0,
      settings: {
        target: 0,
        abandon_rate: 0,
        error_rate: 0
      },
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
}

async function runSyntheticsWithSettings(
  supa: any, 
  settings: SyntheticSettings, 
  targetOverride?: number
): Promise<RunResult> {
  const target = targetOverride || Math.min(
    settings.sessions_per_min,
    settings.max_per_run
  );

  console.log(`🤖 Running synthetics: target=${target} sessions`);

  // 2. Fetch available sim_users
  const { data: simUsers, error: simUsersErr } = await supa
    .from('sim_users')
    .select('profile_id, org_id, persona_key, started_at')
    .limit(target * 2); // Get more than we need for variety

  if (simUsersErr) throw simUsersErr;

  if (!simUsers || simUsers.length === 0) {
    return {
      success: false,
      sessions_created: 0,
      scene_events_created: 0,
      mindblock_events_created: 0,
      settings: {
        target,
        abandon_rate: settings.abandon_rate,
        error_rate: settings.error_rate
      },
      timestamp: new Date().toISOString(),
      error: 'No sim_users found. Run seed-synthetics first.'
    };
  }

  console.log(`📊 Found ${simUsers.length} sim_users available`);

  // 3. Create journey sessions
  const rand = makePRNG(Date.now());
  const sessionsCreated = [];
  const sceneEventsCreated = [];
  const mindblockEventsCreated = [];

  for (let i = 0; i < target; i++) {
    // Pick a random sim user
    const user: SimUser = simUsers[Math.floor(rand() * simUsers.length)];
    
    // Pick a random journey template
    const template = JOURNEY_TEMPLATES[Math.floor(rand() * JOURNEY_TEMPLATES.length)];
    
    // Determine journey behavior
    const willAbandon = rand() < settings.abandon_rate;
    const willError = rand() < settings.error_rate;
    const sceneCount = Math.floor(3 + rand() * 5); // 3-7 scenes
    const completedScenes = willAbandon 
      ? Math.floor(rand() * sceneCount) 
      : sceneCount;

    // Create journey_instance
    const { data: instance, error: instanceErr } = await supa
      .from('journey_instances')
      .insert({
        user_id: user.profile_id,
        organization_id: user.org_id,
        template_id: template,
        status: willAbandon ? 'abandoned' : 'completed',
        current_scene_number: completedScenes,
        total_scenes: sceneCount,
        started_at: new Date().toISOString(),
        completed_at: willAbandon ? null : new Date().toISOString(),
        metadata: {
          synthetic: true,
          persona_key: user.persona_key,
          run_timestamp: new Date().toISOString()
        }
      })
      .select('id')
      .single();

    if (instanceErr) {
      console.error('Failed to create journey_instance:', instanceErr);
      continue;
    }

    sessionsCreated.push(instance.id);
    console.log(`  ✅ Created journey ${instance.id} for user ${user.profile_id.slice(0, 8)}`);

    // 4. Create scene events for this journey
    for (let sceneNum = 1; sceneNum <= completedScenes; sceneNum++) {
      const isLast = sceneNum === completedScenes;
      const eventType = isLast && willAbandon 
        ? 'scene_abandoned'
        : isLast 
        ? 'scene_completed'
        : 'scene_progressed';

      // Scene started event
      const { error: startErr } = await supa
        .from('journey_scene_events')
        .insert({
          journey_instance_id: instance.id,
          user_id: user.profile_id,
          organization_id: user.org_id,
          template_id: template,
          scene_number: sceneNum,
          event_type: 'scene_started',
          event_payload: {
            synthetic: true,
            persona_key: user.persona_key,
            timestamp: new Date().toISOString()
          },
          created_at: new Date().toISOString()
        });

      if (!startErr) sceneEventsCreated.push('scene_started');

      // Scene completion/progress/abandon event
      const { error: endErr } = await supa
        .from('journey_scene_events')
        .insert({
          journey_instance_id: instance.id,
          user_id: user.profile_id,
          organization_id: user.org_id,
          template_id: template,
          scene_number: sceneNum,
          event_type: eventType,
          event_payload: {
            synthetic: true,
            persona_key: user.persona_key,
            duration_seconds: Math.floor(30 + rand() * 180), // 30-210s
            timestamp: new Date().toISOString()
          },
          created_at: new Date().toISOString()
        });

      if (!endErr) sceneEventsCreated.push(eventType);

      // Maybe emit artifact capture
      if (rand() < 0.3 && !willAbandon) {
        await supa
          .from('journey_scene_events')
          .insert({
            journey_instance_id: instance.id,
            user_id: user.profile_id,
            organization_id: user.org_id,
            template_id: template,
            scene_number: sceneNum,
            event_type: 'artifact_captured',
            event_payload: {
              synthetic: true,
              artifact_type: ['reflection', 'insight', 'commitment', 'practice'][Math.floor(rand() * 4)],
              persona_key: user.persona_key,
              timestamp: new Date().toISOString()
            },
            created_at: new Date().toISOString()
          });
        
        sceneEventsCreated.push('artifact_captured');
      }
    }

    // 5. Generate mindblock events (NaviCue interactions)
    const mindblockCount = Math.floor(1 + rand() * 4); // 1-4 mindblocks per journey
    
    // Fetch random mindblocks
    const { data: mindblocks, error: mbErr } = await supa
      .from('mindblock_library')
      .select('id')
      .limit(mindblockCount * 2);

    if (!mbErr && mindblocks && mindblocks.length > 0) {
      for (let m = 0; m < mindblockCount; m++) {
        const mb = mindblocks[Math.floor(rand() * mindblocks.length)];
        const signalType = MINDBLOCK_SIGNAL_TYPES[Math.floor(rand() * MINDBLOCK_SIGNAL_TYPES.length)];
        
        const { error: mbEventErr } = await supa
          .from('mindblock_events')
          .insert({
            individual_id: user.profile_id,
            organization_id: user.org_id,
            mindblock_id: mb.id,
            signal_type: signalType,
            evidence: {
              synthetic: true,
              persona_key: user.persona_key,
              journey_instance_id: instance.id,
              context: 'journey_scene',
              timestamp: new Date().toISOString()
            },
            created_at: new Date().toISOString()
          });

        if (!mbEventErr) mindblockEventsCreated.push(signalType);
      }
    }
  }

  console.log(`✨ Synthetics run complete:
    - Sessions: ${sessionsCreated.length}
    - Scene events: ${sceneEventsCreated.length}
    - Mindblock events: ${mindblockEventsCreated.length}
  `);

  return {
    success: true,
    sessions_created: sessionsCreated.length,
    scene_events_created: sceneEventsCreated.length,
    mindblock_events_created: mindblockEventsCreated.length,
    settings: {
      target,
      abandon_rate: settings.abandon_rate,
      error_rate: settings.error_rate
    },
    timestamp: new Date().toISOString()
  };
}
