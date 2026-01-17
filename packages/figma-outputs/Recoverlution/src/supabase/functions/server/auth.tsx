import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// Initialize demo user on first request (idempotent)
app.post('/init-demo-user', async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const DEMO_EMAIL = 'demo@recoverlution.com';
    const DEMO_PASSWORD = 'recoverlution2025';

    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users?.some(u => u.email === DEMO_EMAIL);

    if (userExists) {
      return c.json({ 
        success: true, 
        message: 'Demo user already exists',
        exists: true 
      });
    }

    // Create the demo user
    const { data, error } = await supabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true, // Auto-confirm since we don't have email server
      user_metadata: {
        name: 'Demo User',
        role: 'demo',
      },
    });

    if (error) {
      console.error('[Auth] Error creating demo user:', error);
      return c.json({ success: false, error: error.message }, 500);
    }

    console.log('[Auth] Demo user created successfully:', data.user?.id);
    return c.json({ 
      success: true, 
      message: 'Demo user created successfully',
      userId: data.user?.id 
    });
  } catch (error) {
    console.error('[Auth] Unexpected error:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

export default app;
