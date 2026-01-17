/**
 * NAVICUE SYNC ENDPOINT
 * 
 * Server-side handler for syncing NaviCues to Supabase
 * Handles both individual cue sync and batch sync
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// ============================================================================
// SYNC SINGLE NAVICUE
// ============================================================================

app.post('/navicues/sync', async (c) => {
  try {
    const { navicue } = await c.req.json();
    
    if (!navicue || !navicue.code) {
      return c.json({ error: 'Invalid navicue data' }, 400);
    }
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    // 1. Upsert main navicue row
    const { data: navicueRow, error: navicueError } = await supabase
      .from('navicues')
      .upsert({
        code: navicue.code,
        kbe_layer: navicue.kbe_layer,
        tier: navicue.tier,
        family: navicue.family,
        component_type: navicue.component_type,
        default_response_type: navicue.default_response_type,
        intent: navicue.intent,
        tags: navicue.tags || [],
        config: navicue.config || {},
        analytics_config: navicue.analytics_config || {},
        status: 'draft',
      }, {
        onConflict: 'code',
        ignoreDuplicates: false,
      })
      .select('id')
      .single();
    
    if (navicueError) {
      console.error('Error upserting navicue:', navicueError);
      return c.json({ error: navicueError.message }, 500);
    }
    
    const navicueId = navicueRow.id;
    
    // 2. Insert/update variants
    if (navicue.variants && navicue.variants.length > 0) {
      // Delete old variants (if updating)
      await supabase
        .from('navicue_variants')
        .delete()
        .eq('navicue_id', navicueId);
      
      // Insert new variants
      const variantsToInsert = navicue.variants.map((v: any, idx: number) => ({
        navicue_id: navicueId,
        lens: v.lens,
        language: 'en',
        copy: v.copy,
        is_default: idx === 0,
        version: 1,
      }));
      
      const { error: variantsError } = await supabase
        .from('navicue_variants')
        .insert(variantsToInsert);
      
      if (variantsError) {
        console.error('Error inserting variants:', variantsError);
        return c.json({ error: variantsError.message }, 500);
      }
    }
    
    // 3. Insert/update targets
    if (navicue.targets && navicue.targets.length > 0) {
      // Delete old targets (if updating)
      await supabase
        .from('navicue_targets')
        .delete()
        .eq('navicue_id', navicueId);
      
      // Insert new targets
      const targetsToInsert = navicue.targets.map((t: any) => ({
        navicue_id: navicueId,
        scope_type: t.scope_type,
        schema_id: t.schema_id || null,
        family_id: t.family_id || null,
        mindblock_id: t.mindblock_id || null,
        pillar_id: t.pillar_id || null,
        concept_id: t.concept_id || null,
        theme_id: t.theme_id || null,
        weight: t.weight || 1.0,
        is_primary: t.is_primary || false,
      }));
      
      const { error: targetsError } = await supabase
        .from('navicue_targets')
        .insert(targetsToInsert);
      
      if (targetsError) {
        console.error('Error inserting targets:', targetsError);
        return c.json({ error: targetsError.message }, 500);
      }
    }
    
    // 4. Insert steps (if micro-thread)
    if (navicue.steps && navicue.steps.length > 0) {
      // Delete old steps (if updating)
      await supabase
        .from('navicue_steps')
        .delete()
        .eq('navicue_id', navicueId);
      
      // Insert new steps
      const stepsToInsert = navicue.steps.map((s: any) => ({
        navicue_id: navicueId,
        step_index: s.step_index,
        component_type: s.component_type,
        response_type: s.response_type,
        config: s.config || {},
      }));
      
      const { error: stepsError } = await supabase
        .from('navicue_steps')
        .insert(stepsToInsert);
      
      if (stepsError) {
        console.error('Error inserting steps:', stepsError);
        return c.json({ error: stepsError.message }, 500);
      }
    }
    
    return c.json({
      success: true,
      navicue_id: navicueId,
      code: navicue.code,
    });
    
  } catch (error) {
    console.error('Error in /navicues/sync:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ============================================================================
// SYNC BATCH
// ============================================================================

app.post('/navicues/sync-batch', async (c) => {
  try {
    const { navicues } = await c.req.json();
    
    if (!Array.isArray(navicues)) {
      return c.json({ error: 'navicues must be an array' }, 400);
    }
    
    const result = {
      total: navicues.length,
      inserted: 0,
      updated: 0,
      failed: 0,
      errors: [] as Array<{ code: string; error: string }>,
    };
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    // Process each navicue
    for (const navicue of navicues) {
      try {
        // Check if exists
        const { data: existing } = await supabase
          .from('navicues')
          .select('id')
          .eq('code', navicue.code)
          .single();
        
        // Sync (same logic as single sync above)
        const { data: navicueRow, error: navicueError } = await supabase
          .from('navicues')
          .upsert({
            code: navicue.code,
            kbe_layer: navicue.kbe_layer,
            tier: navicue.tier,
            family: navicue.family,
            component_type: navicue.component_type,
            default_response_type: navicue.default_response_type,
            intent: navicue.intent,
            tags: navicue.tags || [],
            config: navicue.config || {},
            analytics_config: navicue.analytics_config || {},
            status: 'draft',
          }, {
            onConflict: 'code',
            ignoreDuplicates: false,
          })
          .select('id')
          .single();
        
        if (navicueError) throw navicueError;
        
        const navicueId = navicueRow.id;
        
        // Variants
        if (navicue.variants) {
          await supabase.from('navicue_variants').delete().eq('navicue_id', navicueId);
          await supabase.from('navicue_variants').insert(
            navicue.variants.map((v: any, idx: number) => ({
              navicue_id: navicueId,
              lens: v.lens,
              language: 'en',
              copy: v.copy,
              is_default: idx === 0,
              version: 1,
            }))
          );
        }
        
        // Targets
        if (navicue.targets) {
          await supabase.from('navicue_targets').delete().eq('navicue_id', navicueId);
          await supabase.from('navicue_targets').insert(
            navicue.targets.map((t: any) => ({
              navicue_id: navicueId,
              scope_type: t.scope_type,
              schema_id: t.schema_id || null,
              family_id: t.family_id || null,
              mindblock_id: t.mindblock_id || null,
              pillar_id: t.pillar_id || null,
              concept_id: t.concept_id || null,
              theme_id: t.theme_id || null,
              weight: t.weight || 1.0,
              is_primary: t.is_primary || false,
            }))
          );
        }
        
        // Steps
        if (navicue.steps) {
          await supabase.from('navicue_steps').delete().eq('navicue_id', navicueId);
          await supabase.from('navicue_steps').insert(
            navicue.steps.map((s: any) => ({
              navicue_id: navicueId,
              step_index: s.step_index,
              component_type: s.component_type,
              response_type: s.response_type,
              config: s.config || {},
            }))
          );
        }
        
        if (existing) {
          result.updated++;
        } else {
          result.inserted++;
        }
        
      } catch (error) {
        result.failed++;
        result.errors.push({
          code: navicue.code,
          error: String(error),
        });
      }
    }
    
    return c.json(result);
    
  } catch (error) {
    console.error('Error in /navicues/sync-batch:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ============================================================================
// STATS
// ============================================================================

app.get('/navicues/stats', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: navicues, error } = await supabase
      .from('navicues')
      .select('code, kbe_layer, tier, component_type, tags');
    
    if (error) throw error;
    
    const stats = {
      total: navicues.length,
      by_batch: {} as Record<string, number>,
      by_tier: {} as Record<string, number>,
      by_kbe: {} as Record<string, number>,
      by_component: {} as Record<string, number>,
    };
    
    for (const n of navicues) {
      // Count by tier
      stats.by_tier[n.tier] = (stats.by_tier[n.tier] || 0) + 1;
      
      // Count by KBE
      stats.by_kbe[n.kbe_layer] = (stats.by_kbe[n.kbe_layer] || 0) + 1;
      
      // Count by component
      stats.by_component[n.component_type] = (stats.by_component[n.component_type] || 0) + 1;
      
      // Count by batch (from tags)
      const batchTag = n.tags?.find((t: string) => t.startsWith('batch_'));
      if (batchTag) {
        stats.by_batch[batchTag] = (stats.by_batch[batchTag] || 0) + 1;
      }
    }
    
    return c.json(stats);
    
  } catch (error) {
    console.error('Error in /navicues/stats:', error);
    return c.json({ error: String(error) }, 500);
  }
});

export default app;
