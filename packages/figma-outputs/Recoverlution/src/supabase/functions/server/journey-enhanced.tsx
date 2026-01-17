import { Hono } from 'npm:hono';
import * as store from './simple-store.tsx';
import { BUY_2_SECONDS_BLOCK_ENHANCED } from './journey-data.tsx';

console.log('📦 Loading journey-enhanced module...');

const journey = new Hono();

console.log('✅ Journey Hono instance created');

// ============================================================================
// API ROUTES
// ============================================================================

// GET /journey/blocks/:blockId
journey.get('/blocks/:blockId', async (c) => {
  try {
    const blockId = c.req.param('blockId');
    
    console.log('📦 Fetching block:', blockId);
    
    // Check if enhanced version exists
    let block = await store.get(`journey:block:${blockId}`);
    
    console.log('📦 KV lookup result:', { found: !!block, blockId });
    
    // If not in KV, seed it
    if (!block && blockId === 'buy-2-seconds') {
      console.log('🌱 Block not found in KV, seeding...');
      block = await seedEnhancedBlock();
      console.log('✅ Block seeded:', { hasScenes: !!(block as any)?.scenes, sceneCount: (block as any)?.scenes?.length });
    }
    
    if (!block) {
      console.error('❌ Block not found after seed attempt');
      return c.json({ error: 'Block not found' }, 404);
    }
    
    // IMPORTANT: Wrap in { block: ... } for frontend compatibility
    return c.json({ block });
  } catch (error) {
    console.error('❌ Error fetching block:', error);
    return c.json({ error: 'Failed to fetch block' }, 500);
  }
});

// POST /journey/seed-enhanced
journey.post('/seed-enhanced', async (c) => {
  try {
    const block = await seedEnhancedBlock();
    return c.json({ 
      success: true, 
      message: 'Enhanced block seeded',
      block 
    });
  } catch (error) {
    console.error('Error seeding enhanced block:', error);
    return c.json({ error: 'Failed to seed block' }, 500);
  }
});

// POST /journey/force-reseed - Clear cache and re-seed with latest
journey.post('/force-reseed', async (c) => {
  try {
    console.log('🔄 Force re-seeding journey data...');
    
    // Re-seed with latest (overwrites existing)
    const block = await seedEnhancedBlock();
    console.log('✅ Block re-seeded successfully');
    
    return c.json({ 
      success: true, 
      message: 'Journey data re-seeded with latest enhanced scenes',
      block 
    });
  } catch (error) {
    console.error('❌ Error force re-seeding:', error);
    return c.json({ 
      success: false,
      error: error.message 
    }, 500);
  }
});

// GET /journey/assignments/:rehabId/:patientId/current
journey.get('/assignments/:rehabId/:patientId/current', async (c) => {
  try {
    const rehabId = c.req.param('rehabId');
    const patientId = c.req.param('patientId');
    
    const assignmentId = await store.get(`assignment_index:${rehabId}:${patientId}:current`);
    
    if (!assignmentId) {
      return c.json({ assignment: null });
    }
    
    const assignment = await store.get(`assignment:${assignmentId}`);
    return c.json(assignment || { assignment: null });
    
  } catch (error) {
    console.error('Error fetching current assignment:', error);
    return c.json({ error: 'Failed to fetch assignment' }, 500);
  }
});

// POST /journey/assignments
journey.post('/assignments', async (c) => {
  try {
    const body = await c.req.json();
    const { rehab_id, patient_id, block_id } = body;
    
    if (!rehab_id || !patient_id || !block_id) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // Get block to determine total scenes
    const block = await store.get(`block:${block_id}`);
    if (!block) {
      return c.json({ error: 'Block not found' }, 404);
    }
    
    const totalScenes = block.scenes?.length || 13;
    
    const assignment = {
      id: `${rehab_id}:${patient_id}:${block_id}:${Date.now()}`,
      rehab_id,
      patient_id,
      block_id,
      status: 'active',
      current_day: 1,
      current_sequence: 1,
      total_scenes: totalScenes,
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await store.set(`assignment:${assignment.id}`, assignment);
    await store.set(`assignment_index:${rehab_id}:${patient_id}:current`, assignment.id);
    
    return c.json(assignment);
    
  } catch (error) {
    console.error('Error creating assignment:', error);
    return c.json({ error: 'Failed to create assignment' }, 500);
  }
});

// PATCH /journey/assignments/:assignmentId
journey.patch('/assignments/:assignmentId', async (c) => {
  try {
    const assignmentId = c.req.param('assignmentId');
    const updates = await c.req.json();
    
    const assignment = await store.get(`assignment:${assignmentId}`);
    if (!assignment) {
      return c.json({ error: 'Assignment not found' }, 404);
    }
    
    const updated = {
      ...assignment,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    await store.set(`assignment:${assignmentId}`, updated);
    return c.json(updated);
    
  } catch (error) {
    console.error('Error updating assignment:', error);
    return c.json({ error: 'Failed to update assignment' }, 500);
  }
});

// POST /journey/assignments/:assignmentId/advance
journey.post('/assignments/:assignmentId/advance', async (c) => {
  try {
    const assignmentId = c.req.param('assignmentId');
    
    console.log('⏭️ Advancing assignment:', assignmentId);
    
    const assignment = await store.get(`assignment:${assignmentId}`);
    if (!assignment) {
      console.error('❌ Assignment not found:', assignmentId);
      return c.json({ error: 'Assignment not found' }, 404);
    }
    
    const currentDay = assignment.current_day || 1;
    const nextDay = currentDay + 1;
    
    console.log('📅 Advancing from day', currentDay, 'to day', nextDay);
    
    const updated = {
      ...assignment,
      current_day: nextDay,
      current_sequence: nextDay,
      last_interaction_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await store.set(`assignment:${assignmentId}`, updated);
    
    console.log('✅ Assignment advanced successfully');
    return c.json({ assignment: updated });
    
  } catch (error) {
    console.error('❌ Error advancing assignment:', error);
    return c.json({ error: 'Failed to advance assignment' }, 500);
  }
});

// POST /journey/assignments/:assignmentId/complete
journey.post('/assignments/:assignmentId/complete', async (c) => {
  try {
    const assignmentId = c.req.param('assignmentId');
    
    console.log('✅ Completing assignment:', assignmentId);
    
    const assignment = await store.get(`assignment:${assignmentId}`);
    if (!assignment) {
      return c.json({ error: 'Assignment not found' }, 404);
    }
    
    const updated = {
      ...assignment,
      status: 'completed',
      completed_at: new Date().toISOString(),
      completion_percentage: 100,
      updated_at: new Date().toISOString()
    };
    
    await store.set(`assignment:${assignmentId}`, updated);
    
    console.log('✅ Assignment marked as completed');
    return c.json({ assignment: updated });
    
  } catch (error) {
    console.error('❌ Error completing assignment:', error);
    return c.json({ error: 'Failed to complete assignment' }, 500);
  }
});

// DELETE /journey/assignments/:rehabId/:patientId/reset
journey.delete('/assignments/:rehabId/:patientId/reset', async (c) => {
  try {
    const rehabId = c.req.param('rehabId');
    const patientId = c.req.param('patientId');
    
    const assignmentId = await store.get(`assignment_index:${rehabId}:${patientId}:current`);
    
    console.log('🗑️ Resetting assignment:', { rehabId, patientId });
    
    if (assignmentId) {
      await store.del(`assignment:${assignmentId}`);
    }
    await store.del(`assignment_index:${rehabId}:${patientId}:current`);
    
    return c.json({ success: true, message: 'Assignment reset' });
    
  } catch (error) {
    console.error('Error resetting assignment:', error);
    return c.json({ error: 'Failed to reset assignment' }, 500);
  }
});

// POST /journey/reflections
journey.post('/reflections', async (c) => {
  try {
    const body = await c.req.json();
    const { assignment_id, sequence, input_type, raw_text } = body;
    
    const reflection = {
      id: `reflection:${assignment_id}:${sequence}:${Date.now()}`,
      assignment_id,
      sequence,
      input_type,
      raw_text,
      created_at: new Date().toISOString()
    };
    
    await store.set(reflection.id, reflection);
    return c.json(reflection);
    
  } catch (error) {
    console.error('Error saving reflection:', error);
    return c.json({ error: 'Failed to save reflection' }, 500);
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function seedEnhancedBlock() {
  await store.set('journey:block:buy-2-seconds', BUY_2_SECONDS_BLOCK_ENHANCED);
  console.log('✅ Enhanced block seeded with 13 scenes');
  return BUY_2_SECONDS_BLOCK_ENHANCED;
}

export default journey;