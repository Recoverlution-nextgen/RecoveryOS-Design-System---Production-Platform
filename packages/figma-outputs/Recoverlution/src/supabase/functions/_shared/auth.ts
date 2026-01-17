// supabase/functions/_shared/auth.ts
// JWT verification and user extraction

interface UserClaims {
  sub: string;  // user_id
  email?: string;
  role?: string;
  app_metadata?: {
    is_admin?: boolean;
    organization_id?: string;
  };
}

export async function getUserFromRequest(req: Request): Promise<UserClaims | null> {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    
    // Use Supabase JWT verification
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return null;
    }

    return {
      sub: user.id,
      email: user.email,
      role: user.role,
      app_metadata: user.app_metadata as UserClaims['app_metadata'],
    };
  } catch (err) {
    console.error('[Auth] Error extracting user:', err);
    return null;
  }
}

export function requireAuth(user: UserClaims | null): asserts user is UserClaims {
  if (!user) {
    throw new Error('Unauthorized');
  }
}

export function requireAdmin(user: UserClaims | null): asserts user is UserClaims {
  requireAuth(user);
  if (!user.app_metadata?.is_admin) {
    throw new Error('Admin access required');
  }
}
