/**
 * LUMA (Intelligent Journey Recommendation Engine)
 * 
 * Purpose: Recommends the next best Block for a patient based on:
 * - Current ERA phase (Experience/Recognize/Align)
 * - Recent state check-ins (energy/clarity/connection)
 * - Progress history (events, completed blocks)
 * - Block metadata (day_type, context_tags, explore_weight)
 * 
 * Architecture:
 * - Reads from: blocks, block_assignments, state_checkins, events
 * - Writes to: events (logs recommendation)
 * - Returns: { next: Block, whyNow: string, state: StateCheckin }
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface LUMARequest {
  rehab_id: string;
  user_id: string;
  phase: 'experience' | 'recognize' | 'align';
  context?: any;
}

interface Block {
  id: string;
  name: string;
  description: string;
  theme_id: string;
  day_type: string[];
  era: {
    mon_seed?: string;
    tue_embody?: string;
    wed_root?: string;
    thu_adapt?: string;
    fri_lens?: string;
    sat_integrate?: string;
    sun_reflect?: string;
  };
  measures?: any;
  context_tags?: string[];
  skill_tags?: string[];
  explore_weight?: number;
  effectiveness_score?: number;
  completion_rate?: number;
}

interface StateCheckin {
  tempo: number;
  flow: number;
  sync: number;
  timestamp: string;
}

interface LUMAResponse {
  next: Block | null;
  whyNow: string;
  state: StateCheckin | null;
}

/**
 * Main LUMA recommendation handler
 */
export async function handleLUMARequest(req: Request): Promise<Response> {
  try {
    const body: LUMARequest = await req.json();
    const { rehab_id, user_id, phase, context } = body;
    
    console.log(`[LUMA] Recommendation request for rehab ${rehab_id}, user ${user_id}, phase: ${phase}`);
    
    // Validate inputs
    if (!rehab_id) {
      return new Response(JSON.stringify({ error: 'Missing rehab_id' }), { status: 400 });
    }
    
    if (!user_id) {
      return new Response(JSON.stringify({ error: 'Missing user_id' }), { status: 400 });
    }
    
    if (!['experience', 'recognize', 'align'].includes(phase)) {
      return new Response(JSON.stringify({ error: 'Invalid phase' }), { status: 400 });
    }
    
    // Get latest state check-in
    const latestState = await getLatestState(rehab_id, user_id);
    
    // Get recent events
    const recentEvents = await getRecentEvents(rehab_id, user_id);
    
    // Get current assignments
    const currentAssignments = await getCurrentAssignments(rehab_id, user_id);
    
    // Get available blocks
    const availableBlocks = await getAvailableBlocks(phase);
    
    // Score and rank blocks
    const scoredBlocks = scoreBlocks(
      availableBlocks,
      latestState,
      recentEvents,
      currentAssignments,
      phase
    );
    
    // Select top block
    const nextBlock = scoredBlocks.length > 0 ? scoredBlocks[0].block : null;
    
    // Generate reasoning
    const whyNow = generateReasoning(nextBlock, latestState, phase, scoredBlocks[0]?.score);
    
    // Log recommendation event
    if (nextBlock) {
      await logRecommendation(rehab_id, user_id, nextBlock.id, phase, whyNow);
    }
    
    const response: LUMAResponse = {
      next: nextBlock,
      whyNow,
      state: latestState,
    };
    
    console.log(`[LUMA] Recommended block: ${nextBlock?.name || 'None'}`);
    
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('[LUMA] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate recommendation', details: error.message }),
      { status: 500 }
    );
  }
}

/**
 * Get patient's latest state check-in
 */
async function getLatestState(rehabId: string, userId: string): Promise<StateCheckin | null> {
  const { data, error } = await supabase
    .from('state_logs')
    .select('tempo, flow, sync, created_at')
    .eq('rehab_id', rehabId)
    .eq('patient_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error || !data) {
    console.log('[LUMA] No state check-ins found for user');
    return null;
  }
  
  return {
    tempo: data.tempo,
    flow: data.flow,
    sync: data.sync,
    timestamp: data.created_at,
  };
}

/**
 * Get recent events (last 10)
 */
async function getRecentEvents(rehabId: string, userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('events')
    .select('kind, data, timestamp')
    .eq('rehab_id', rehabId)
    .eq('patient_id', userId)
    .order('timestamp', { ascending: false })
    .limit(10);
  
  if (error) {
    console.log('[LUMA] Error fetching events:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Get current block assignments
 */
async function getCurrentAssignments(rehabId: string, userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('block_assignments')
    .select('block_id, phase, status, assigned_at')
    .eq('rehab_id', rehabId)
    .eq('patient_id', userId)
    .in('status', ['pending', 'active']);
  
  if (error) {
    console.log('[LUMA] Error fetching assignments:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Get all published blocks
 */
async function getAvailableBlocks(phase: string): Promise<Block[]> {
  const { data, error } = await supabase
    .from('blocks')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('[LUMA] Error fetching blocks:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Score and rank blocks
 * 
 * Scoring factors:
 * - State alignment (does block match energy/clarity needs?)
 * - Phase fit (does block have content for this phase?)
 * - Recency (avoid recently completed blocks)
 * - Explore weight (prioritize important blocks)
 * - Context tags (match current situation)
 */
function scoreBlocks(
  blocks: Block[],
  state: StateCheckin | null,
  events: any[],
  assignments: any[],
  phase: string
): Array<{ block: Block; score: number }> {
  const completedBlockIds = events
    .filter(e => e.kind === 'era.step.done')
    .map(e => e.data?.block_id)
    .filter(Boolean);
  
  const assignedBlockIds = assignments.map(a => a.block_id);
  
  const scored = blocks.map(block => {
    let score = 0;
    
    // Base score: explore weight
    score += (block.explore_weight || 0.5) * 30;
    
    // Phase fit: Does block have content for this phase?
    if (hasPhaseContent(block, phase)) {
      score += 25;
    }
    
    // State alignment: Match energy/clarity to block type
    if (state) {
      score += scoreStateAlignment(block, state);
    }
    
    // Recency penalty: Avoid recently completed blocks
    const recentlyCompleted = completedBlockIds.slice(0, 3).includes(block.id);
    if (recentlyCompleted) {
      score -= 40;
    }
    
    // Already assigned: Boost if in progress
    const isAssigned = assignedBlockIds.includes(block.id);
    if (isAssigned) {
      score += 15;
    }
    
    // Context diversity: Prefer blocks with useful context tags
    if (block.context_tags && block.context_tags.length > 0) {
      score += 5;
    }
    
    return { block, score };
  });
  
  // Sort by score (highest first)
  return scored.sort((a, b) => b.score - a.score);
}

/**
 * Check if block has content for the given phase
 */
function hasPhaseContent(block: Block, phase: string): boolean {
  if (!block.era) return false;
  
  // All blocks have 7-day ERA instructions regardless of phase
  // Phase determines how the block is framed, not content availability
  return !!(
    block.era.mon_seed ||
    block.era.tue_embody ||
    block.era.wed_root ||
    block.era.thu_adapt ||
    block.era.fri_lens ||
    block.era.sat_integrate ||
    block.era.sun_reflect
  );
}

/**
 * Score state alignment
 * 
 * Strategy:
 * - Low tempo → Recommend grounding/stabilizing practices
 * - Low flow → Recommend awareness/clarity practices
 * - Low sync → Recommend connection/alignment practices
 * 
 * State scale: 1-10 (Tempo, Flow, Sync)
 */
function scoreStateAlignment(block: Block, state: StateCheckin): number {
  let score = 0;
  
  const avgState = (state.tempo + state.flow + state.sync) / 3;
  
  // Low overall state (< 4) → Favor "challenging" blocks (build resilience)
  if (avgState < 4 && block.day_type?.includes('challenging')) {
    score += 10;
  }
  
  // High overall state (> 7) → Favor "growth" blocks (deep work)
  if (avgState > 7 && block.day_type?.includes('growth')) {
    score += 10;
  }
  
  // Stable state (4-7) → Favor "stable" blocks (consistent practice)
  if (avgState >= 4 && avgState <= 7 && block.day_type?.includes('stable')) {
    score += 10;
  }
  
  // Bonus for blocks with high effectiveness scores (ML-powered)
  if (block.effectiveness_score) {
    score += block.effectiveness_score * 15;
  }
  
  return score;
}

/**
 * Generate human-readable reasoning
 */
function generateReasoning(
  block: Block | null,
  state: StateCheckin | null,
  phase: string,
  score?: number
): string {
  if (!block) {
    return 'No blocks available for this phase';
  }
  
  let reasoning = `Starting ${phase} phase`;
  
  if (state) {
    const avgState = Math.round((state.tempo + state.flow + state.sync) / 3);
    if (avgState < 4) {
      reasoning += ', building foundation during challenge';
    } else if (avgState > 7) {
      reasoning += ', strong state for deeper practice';
    } else {
      reasoning += ', steady state for consistent growth';
    }
  }
  
  if (block.context_tags && block.context_tags.length > 0) {
    reasoning += ` → Supports ${block.context_tags.slice(0, 2).join(', ')}`;
  }
  
  return reasoning;
}

/**
 * Log recommendation to events table
 */
async function logRecommendation(
  rehabId: string,
  userId: string,
  blockId: string,
  phase: string,
  reasoning: string
): Promise<void> {
  const { error } = await supabase
    .from('events')
    .insert({
      rehab_id: rehabId,
      patient_id: userId,
      kind: 'block_assigned',
      data: {
        block_id: blockId,
        phase,
        reasoning,
        assigned_by: 'luma',
      },
    });
  
  if (error) {
    console.error('[LUMA] Failed to log recommendation:', error);
  }
}
