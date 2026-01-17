/**
 * ONE-TIME SETUP FUNCTION
 * Creates the demo user for Recoverlution
 * 
 * To run this:
 * 1. This function will be auto-deployed by Figma Make
 * 2. Call it once from your browser console or Postman:
 *    
 *    fetch('https://YOUR_PROJECT.supabase.co/functions/v1/setup-demo-user', {
 *      method: 'POST',
 *      headers: {
 *        'Authorization': 'Bearer YOUR_ANON_KEY'
 *      }
 *    }).then(r => r.json()).then(console.log)
 * 
 * 3. You should see: { success: true, message: "Demo user created" }
 * 4. Now you can login with demo@recoverlution.com / recoverlution2025
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const DEMO_EMAIL = 'demo@recoverlution.com';
    const DEMO_PASSWORD = 'recoverlution2025';

    console.log('[Setup] Checking for existing demo user...');

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('[Setup] Error listing users:', listError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to check existing users', details: listError.message }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    const userExists = existingUsers?.users?.some(u => u.email === DEMO_EMAIL);

    if (userExists) {
      console.log('[Setup] Demo user already exists');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Demo user already exists',
          email: DEMO_EMAIL,
          exists: true 
        }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    console.log('[Setup] Creating new demo user...');

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
      console.error('[Setup] Error creating demo user:', error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    console.log('[Setup] Demo user created successfully:', data.user?.id);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Demo user created successfully',
        email: DEMO_EMAIL,
        userId: data.user?.id,
        instructions: 'You can now login with demo@recoverlution.com / recoverlution2025'
      }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('[Setup] Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
});
