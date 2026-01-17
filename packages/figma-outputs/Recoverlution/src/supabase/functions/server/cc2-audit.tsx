/**
 * CC2 DATA AUDIT ROUTES
 * Endpoints for verifying NaviCue-to-Schema mappings and data integrity
 */

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * GET /cc2/audit/navicue-targets
 * Audit NaviCue target mappings (schema/family/mindblock)
 */
app.get('/navicue-targets', async (c) => {
  try {
    // Get all navicues with their targets
    const { data: navicues, error } = await supabase
      .from('navicue_v2_detail_view')
      .select('*')
      .eq('status', 'active');

    if (error) throw error;

    const results = {
      total: navicues?.length || 0,
      withSchemaTarget: 0,
      withFamilyTarget: 0,
      withMindblockTarget: 0,
      withMultipleTargets: 0,
      missingPrimaryTarget: 0,
      invalidSchemaIds: [] as any[],
      invalidFamilyIds: [] as any[],
      invalidMindblockIds: [] as any[],
    };

    // Audit each navicue
    navicues?.forEach((navicue: any) => {
      const targets = navicue.targets || [];
      
      const hasSchema = targets.some((t: any) => t.scope_type === 'schema');
      const hasFamily = targets.some((t: any) => t.scope_type === 'family');
      const hasMindblock = targets.some((t: any) => t.scope_type === 'mindblock');
      const hasPrimary = targets.some((t: any) => t.is_primary);

      if (hasSchema) results.withSchemaTarget++;
      if (hasFamily) results.withFamilyTarget++;
      if (hasMindblock) results.withMindblockTarget++;
      if (targets.length > 1) results.withMultipleTargets++;
      if (!hasPrimary && targets.length > 0) results.missingPrimaryTarget++;

      // Check for invalid references (these would fail FK constraints if enforced)
      targets.forEach((target: any) => {
        if (target.scope_type === 'schema' && !target.schema_id) {
          results.invalidSchemaIds.push({ navicue_id: navicue.id, code: navicue.code });
        }
        if (target.scope_type === 'family' && !target.family_id) {
          results.invalidFamilyIds.push({ navicue_id: navicue.id, code: navicue.code });
        }
        if (target.scope_type === 'mindblock' && !target.mindblock_id) {
          results.invalidMindblockIds.push({ navicue_id: navicue.id, code: navicue.code });
        }
      });
    });

    return c.json({ results });
  } catch (error) {
    console.error('Error auditing navicue targets:', error);
    return c.json({ error: 'Failed to audit navicue targets' }, 500);
  }
});

/**
 * GET /cc2/audit/schema-coverage
 * Check how many NaviCues exist per schema
 */
app.get('/schema-coverage', async (c) => {
  try {
    // Get all schemas
    const { data: schemas, error: schemasError } = await supabase
      .from('schema_catalog')
      .select('id, schema_key, title')
      .order('schema_key');

    if (schemasError) throw schemasError;

    // Get navicue counts per schema
    const { data: targets, error: targetsError } = await supabase
      .from('navicue_targets_v2')
      .select('schema_id, navicue_id')
      .eq('scope_type', 'schema')
      .eq('is_primary', true);

    if (targetsError) throw targetsError;

    // Count navicues per schema
    const counts: Record<string, number> = {};
    targets?.forEach((target: any) => {
      if (target.schema_id) {
        counts[target.schema_id] = (counts[target.schema_id] || 0) + 1;
      }
    });

    // Build coverage report
    const coverage = schemas?.map(schema => ({
      schema_id: schema.id,
      schema_key: schema.schema_key,
      title: schema.title,
      navicueCount: counts[schema.id] || 0,
    })) || [];

    const summary = {
      totalSchemas: schemas?.length || 0,
      schemasWithNaviCues: coverage.filter(s => s.navicueCount > 0).length,
      schemasWithoutNaviCues: coverage.filter(s => s.navicueCount === 0).length,
      totalNaviCues: Object.values(counts).reduce((sum, count) => sum + count, 0),
      avgNaviCuesPerSchema: (Object.values(counts).reduce((sum, count) => sum + count, 0) / (schemas?.length || 1)).toFixed(2),
    };

    return c.json({ summary, coverage });
  } catch (error) {
    console.error('Error auditing schema coverage:', error);
    return c.json({ error: 'Failed to audit schema coverage' }, 500);
  }
});

/**
 * GET /cc2/audit/orphaned-navicues
 * Find NaviCues with missing or invalid schema references
 */
app.get('/orphaned-navicues', async (c) => {
  try {
    // Get all active navicues
    const { data: navicues, error: navicuesError } = await supabase
      .from('navicues_v2_list_view')
      .select('id, code, primary_schema_id, status')
      .eq('status', 'active');

    if (navicuesError) throw navicuesError;

    // Get all valid schema IDs
    const { data: schemas, error: schemasError } = await supabase
      .from('schema_catalog')
      .select('id');

    if (schemasError) throw schemasError;

    const validSchemaIds = new Set(schemas?.map(s => s.id) || []);

    // Find orphaned navicues
    const orphaned = navicues?.filter(nav => {
      return nav.primary_schema_id && !validSchemaIds.has(nav.primary_schema_id);
    }) || [];

    const missingPrimary = navicues?.filter(nav => !nav.primary_schema_id) || [];

    return c.json({
      summary: {
        totalActive: navicues?.length || 0,
        orphaned: orphaned.length,
        missingPrimarySchema: missingPrimary.length,
      },
      orphanedNaviCues: orphaned,
      missingPrimarySchema: missingPrimary,
    });
  } catch (error) {
    console.error('Error finding orphaned navicues:', error);
    return c.json({ error: 'Failed to find orphaned navicues' }, 500);
  }
});

/**
 * GET /cc2/audit/data-integrity
 * Full data integrity check across all tables
 */
app.get('/data-integrity', async (c) => {
  try {
    const report = {
      timestamp: new Date().toISOString(),
      checks: [] as any[],
    };

    // 1. Check for navicues without steps
    const { data: navicuesWithoutSteps } = await supabase
      .from('navicues_v2')
      .select('id, code')
      .not('id', 'in', supabase.from('navicue_steps_v2').select('navicue_id'));

    report.checks.push({
      name: 'NaviCues without steps',
      count: navicuesWithoutSteps?.length || 0,
      severity: navicuesWithoutSteps?.length ? 'warning' : 'ok',
    });

    // 2. Check for navicues without variants
    const { data: navicuesWithoutVariants } = await supabase
      .from('navicues_v2')
      .select('id, code')
      .not('id', 'in', supabase.from('navicue_variants_v2').select('navicue_id'));

    report.checks.push({
      name: 'NaviCues without variants',
      count: navicuesWithoutVariants?.length || 0,
      severity: navicuesWithoutVariants?.length ? 'warning' : 'ok',
    });

    // 3. Check for navicues without targets
    const { data: navicuesWithoutTargets } = await supabase
      .from('navicues_v2')
      .select('id, code')
      .not('id', 'in', supabase.from('navicue_targets_v2').select('navicue_id'));

    report.checks.push({
      name: 'NaviCues without targets',
      count: navicuesWithoutTargets?.length || 0,
      severity: navicuesWithoutTargets?.length ? 'error' : 'ok',
    });

    // 4. Check for duplicate default variants
    const { data: duplicateDefaults, error: dupError } = await supabase
      .rpc('check_duplicate_defaults', {})
      .catch(() => ({ data: null, error: null })); // Catch if RPC doesn't exist

    report.checks.push({
      name: 'Duplicate default variants per language',
      count: duplicateDefaults?.length || 0,
      severity: duplicateDefaults?.length ? 'error' : 'ok',
      note: dupError ? 'RPC not available' : undefined,
    });

    // 5. Count total records
    const { count: navicueCount } = await supabase
      .from('navicues_v2')
      .select('*', { count: 'exact', head: true });

    const { count: stepsCount } = await supabase
      .from('navicue_steps_v2')
      .select('*', { count: 'exact', head: true });

    const { count: variantsCount } = await supabase
      .from('navicue_variants_v2')
      .select('*', { count: 'exact', head: true });

    const { count: targetsCount } = await supabase
      .from('navicue_targets_v2')
      .select('*', { count: 'exact', head: true });

    report.checks.push({
      name: 'Total records',
      counts: {
        navicues: navicueCount,
        steps: stepsCount,
        variants: variantsCount,
        targets: targetsCount,
      },
      severity: 'info',
    });

    const overallStatus = report.checks.some(c => c.severity === 'error')
      ? 'errors'
      : report.checks.some(c => c.severity === 'warning')
      ? 'warnings'
      : 'healthy';

    return c.json({ status: overallStatus, report });
  } catch (error) {
    console.error('Error checking data integrity:', error);
    return c.json({ error: 'Failed to check data integrity' }, 500);
  }
});

/**
 * GET /cc2/audit/heat-kbe-distribution
 * Analyze Heat × KBE distribution across NaviCues
 */
app.get('/heat-kbe-distribution', async (c) => {
  try {
    // Get all navicues with state_band and kbe_layer
    const { data: navicues, error } = await supabase
      .from('navicues_v2_list_view')
      .select('state_band, kbe_layer, status')
      .eq('status', 'active');

    if (error) throw error;

    // Build distribution matrix
    const distribution: Record<string, Record<string, number>> = {
      overwhelmed: { learn: 0, believe: 0, live: 0 },
      activated: { learn: 0, believe: 0, live: 0 },
      calm: { learn: 0, believe: 0, live: 0 },
    };

    navicues?.forEach((nav: any) => {
      const heat = nav.state_band || 'activated';
      const kbe = nav.kbe_layer || 'learn';
      if (distribution[heat] && distribution[heat][kbe] !== undefined) {
        distribution[heat][kbe]++;
      }
    });

    const summary = {
      total: navicues?.length || 0,
      byHeat: {
        overwhelmed: Object.values(distribution.overwhelmed).reduce((a, b) => a + b, 0),
        activated: Object.values(distribution.activated).reduce((a, b) => a + b, 0),
        calm: Object.values(distribution.calm).reduce((a, b) => a + b, 0),
      },
      byKBE: {
        learn: distribution.overwhelmed.learn + distribution.activated.learn + distribution.calm.learn,
        believe: distribution.overwhelmed.believe + distribution.activated.believe + distribution.calm.believe,
        live: distribution.overwhelmed.live + distribution.activated.live + distribution.calm.live,
      },
    };

    return c.json({ summary, distribution });
  } catch (error) {
    console.error('Error analyzing heat-kbe distribution:', error);
    return c.json({ error: 'Failed to analyze distribution' }, 500);
  }
});

export default app;
