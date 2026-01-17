/**
 * USER CONTEXT PROVIDER
 * Global context for user role, organization, permissions
 * Powers entire multi-tenancy system
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '../utils/supabase/client';

export type Role = 'platform_admin' | 'org_admin' | 'professional' | 'patient';
export type Permission = 'view_all' | 'edit_all' | 'view_org' | 'edit_org' | 'view_own' | 'edit_own';

export interface UserContextType {
  userId: string;
  email: string;
  role: Role;
  organizationId?: string;
  organizationName?: string;
  professionalId?: string;
  professionalName?: string;
  permissions: Permission[];
  isLoading: boolean;
  refreshContext: () => Promise<void>;
}

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  platform_admin: ['view_all', 'edit_all'],
  org_admin: ['view_org', 'edit_org', 'view_all'],
  professional: ['view_own', 'edit_own', 'view_org'],
  patient: ['view_own', 'edit_own'],
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadUserContext();
  }, []);

  async function loadUserContext() {
    try {
      setIsLoading(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        // Not logged in - provide default context
        setUser({
          userId: '',
          email: '',
          role: 'patient',
          permissions: [],
          isLoading: false,
          refreshContext: loadUserContext,
        });
        setIsLoading(false);
        return;
      }

      // Check if org admin
      const { data: org } = await supabase
        .from('organizations')
        .select('*')
        .eq('admin_user_id', authUser.id)
        .maybeSingle();

      // Check if professional
      const { data: pro } = await supabase
        .from('professionals')
        .select('*, organizations(name)')
        .eq('user_id', authUser.id)
        .maybeSingle();

      // Determine role (priority: org_admin > professional > platform_admin)
      let role: Role = 'platform_admin'; // Default fallback
      let organizationId: string | undefined;
      let organizationName: string | undefined;
      let professionalId: string | undefined;
      let professionalName: string | undefined;

      if (org) {
        role = 'org_admin';
        organizationId = org.id;
        organizationName = org.name;
      } else if (pro) {
        role = 'professional';
        professionalId = pro.id;
        professionalName = pro.name;
        organizationId = pro.organization_id;
        organizationName = pro.organizations?.name;
      }
      // else remains platform_admin

      const userContext: UserContextType = {
        userId: authUser.id,
        email: authUser.email || '',
        role,
        organizationId,
        organizationName,
        professionalId,
        professionalName,
        permissions: ROLE_PERMISSIONS[role],
        isLoading: false,
        refreshContext: loadUserContext,
      };

      setUser(userContext);
    } catch (error) {
      console.error('Error loading user context:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="opacity-70">Loading user context...</p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

export function usePermission(permission: Permission): boolean {
  const { permissions } = useUser();
  return permissions.includes(permission);
}

export function useTenantScope(): { tenantScope: 'platform' | 'org' | 'professional', tenantId?: string } {
  const { role, organizationId, professionalId } = useUser();
  
  if (role === 'platform_admin') {
    return { tenantScope: 'platform' };
  } else if (role === 'org_admin') {
    return { tenantScope: 'org', tenantId: organizationId };
  } else {
    return { tenantScope: 'professional', tenantId: professionalId };
  }
}