import { createClient } from "jsr:@supabase/supabase-js@2";

const VERSION = "navicues-sync@2025-12-28";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SYNC_SECRET = Deno.env.get("NAVICUES_SYNC_SECRET") ?? "";

console.info(`navicues-sync: server start ${VERSION}`);

Deno.serve(async (req: Request) => {
  const started = Date.now();

  try {
    const contentType = req.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await req.json().catch(() => ({}))
      : {};
    const { dry_run = false } = body as { dry_run?: boolean };

    // Auth: support both admin user token AND automation secret
    const secret = req.headers.get("x-sync-secret") ?? "";
    const hasSecret = SYNC_SECRET && secret === SYNC_SECRET;

    let userId: string | null = null;

    if (!hasSecret) {
      const callerAuth = req.headers.get("Authorization") ?? "";
      const supabaseUser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: callerAuth } },
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const { data, error } = await supabaseUser.auth.getUser();
      if (error || !data?.user) {
        console.warn("navicues-sync: auth failed", error?.message);
        return json({ error: "unauthorized", hint: "Sign in or provide x-sync-secret header" }, 401);
      }
      userId = data.user.id;
    }

    // Service client for DB work
    const supabaseService = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Dry run: just count what would be synced
    if (dry_run) {
      const { count, error: countError } = await supabaseService
        .from('navicue_library')
        .select('*', { count: 'exact', head: true })
        .eq('active', true);

      if (countError) {
        return json({
          ok: false,
          error: 'Failed to count NaviCues',
          details: countError.message,
          version: VERSION
        }, 500);
      }

      return json({
        ok: true,
        dry_run: true,
        found: count || 0,
        message: `Dry run complete. Found ${count} active NaviCues ready to sync.`,
        version: VERSION,
        elapsed_ms: Date.now() - started
      });
    }

    // Full sync
    const result = await syncAll(supabaseService, userId ?? "automation");

    return json({
      ok: true,
      dry_run: false,
      userId,
      result,
      version: VERSION,
      elapsed_ms: Date.now() - started
    });

  } catch (e) {
    console.error("navicues-sync: request error", serializeError(e));
    return json({ 
      error: "unhandled_error", 
      details: e instanceof Error ? e.message : String(e),
      version: VERSION 
    }, 500);
  }
});

async function syncAll(supabase: ReturnType<typeof createClient>, userId: string) {
  console.info("navicues-sync: sync start", { ts: new Date().toISOString(), userId });

  const batchId = `sync_${Date.now()}`;

  // Fetch all active NaviCues from library
  const { data: navicues, error: fetchError } = await supabase
    .from('navicue_library')
    .select('*')
    .eq('active', true);

  if (fetchError || !navicues) {
    throw new Error(`Failed to fetch NaviCues: ${fetchError?.message}`);
  }

  console.info(`navicues-sync: loaded ${navicues.length} NaviCues from navicue_library`);

  // Upsert to canonical navicues table
  const navicuesToInsert = navicues.map(nc => ({
    navicue_id: nc.navicue_id,
    text: nc.text,
    voice: nc.voice,
    track: nc.track,
    mechanism: nc.mechanism,
    core_schema: nc.core_schema,
    secondary_schema: nc.secondary_schema,
    mindblock: nc.mindblock,
    metadata: nc.metadata || {},
    active: true,
    created_at: nc.created_at,
    updated_at: new Date().toISOString(),
  }));

  const { error: insertError } = await supabase
    .from('navicues')
    .upsert(navicuesToInsert, { 
      onConflict: 'navicue_id',
      ignoreDuplicates: false 
    });

  if (insertError) {
    throw new Error(`Failed to insert NaviCues: ${insertError.message}`);
  }

  console.info(`navicues-sync: upserted ${navicues.length} NaviCues to canonical table`);

  // Create schema links
  const schemaLinks: any[] = [];
  navicues.forEach(nc => {
    if (nc.core_schema) {
      schemaLinks.push({
        navicue_id: nc.navicue_id,
        schema_name: nc.core_schema,
        relationship_type: 'core',
      });
    }
    if (nc.secondary_schema) {
      schemaLinks.push({
        navicue_id: nc.navicue_id,
        schema_name: nc.secondary_schema,
        relationship_type: 'secondary',
      });
    }
  });

  let schemaLinksInserted = 0;
  if (schemaLinks.length > 0) {
    const { error: schemaError } = await supabase
      .from('navicue_schemas')
      .upsert(schemaLinks, { 
        onConflict: 'navicue_id,schema_name',
        ignoreDuplicates: true 
      });

    if (!schemaError) {
      schemaLinksInserted = schemaLinks.length;
      console.info(`navicues-sync: created ${schemaLinksInserted} schema links`);
    }
  }

  // Create mindblock links
  const mindblockLinks: any[] = [];
  navicues.forEach(nc => {
    if (nc.mindblock) {
      mindblockLinks.push({
        navicue_id: nc.navicue_id,
        mindblock_name: nc.mindblock,
      });
    }
  });

  let mindblockLinksInserted = 0;
  if (mindblockLinks.length > 0) {
    const { error: mindblockError } = await supabase
      .from('navicue_mindblocks')
      .upsert(mindblockLinks, { 
        onConflict: 'navicue_id,mindblock_name',
        ignoreDuplicates: true 
      });

    if (!mindblockError) {
      mindblockLinksInserted = mindblockLinks.length;
      console.info(`navicues-sync: created ${mindblockLinksInserted} mindblock links`);
    }
  }

  console.info("navicues-sync: sync finished", { ts: new Date().toISOString(), userId });

  return {
    batch_id: batchId,
    message: `Successfully synced ${navicues.length} NaviCues`,
    source: {
      table: 'navicue_library',
      active_count: navicues.length,
    },
    canonical: {
      navicues: navicues.length,
      schema_links: schemaLinksInserted,
      mindblock_links: mindblockLinksInserted,
    }
  };
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-sync-secret"
    },
  });
}

function serializeError(e: unknown) {
  if (e instanceof Error) return { message: e.message, stack: e.stack };
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}
