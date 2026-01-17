// SAFETY POLICY HOOKS
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type {
  SafetyPolicy,
  SafetyPolicyOutcome,
  SafetyPolicyStats,
} from '@/lib/types/constitution';

const supabase = createClient();

export function useSafetyPolicies() {
  return useQuery({
    queryKey: ['safety_policies'],
    queryFn: async (): Promise<SafetyPolicy[]> => {
      const { data, error } = await supabase
        .from('safety_policies')
        .select('*')
        .order('priority', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useSafetyPolicy(policyId: string | null) {
  return useQuery({
    queryKey: ['safety_policy', policyId],
    queryFn: async (): Promise<SafetyPolicy | null> => {
      if (!policyId) return null;
      
      const { data, error } = await supabase
        .from('safety_policies')
        .select('*')
        .eq('id', policyId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!policyId,
  });
}

export function useSafetyOutcomes(filters?: {
  user_id?: string;
  policy_id?: string;
  time_range?: { start: string; end: string };
}) {
  return useQuery({
    queryKey: ['safety_outcomes', filters],
    queryFn: async (): Promise<SafetyPolicyOutcome[]> => {
      let query = supabase
        .from('safety_policy_outcomes')
        .select('*')
        .order('evaluated_at', { ascending: false })
        .limit(100);
      
      if (filters?.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      
      if (filters?.policy_id) {
        query = query.eq('policy_id', filters.policy_id);
      }
      
      if (filters?.time_range) {
        query = query
          .gte('evaluated_at', filters.time_range.start)
          .lte('evaluated_at', filters.time_range.end);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useSafetyPolicyStats() {
  return useQuery({
    queryKey: ['safety_policy_stats'],
    queryFn: async (): Promise<SafetyPolicyStats[]> => {
      const { data: policies } = await supabase
        .from('safety_policies')
        .select('id, policy_name');
      
      if (!policies) return [];
      
      const stats = await Promise.all(
        policies.map(async (policy) => {
          const { data: outcomes } = await supabase
            .from('safety_policy_outcomes')
            .select('*')
            .eq('policy_id', policy.id);
          
          const outcomesCounts: Record<string, number> = {};
          const uniqueUsers = new Set<string>();
          let blockCount = 0;
          
          outcomes?.forEach(outcome => {
            outcomesCounts[outcome.outcome] = (outcomesCounts[outcome.outcome] || 0) + 1;
            uniqueUsers.add(outcome.user_id);
            if (outcome.outcome === 'block' || outcome.outcome === 'block_and_route') {
              blockCount++;
            }
          });
          
          const total_evaluations = outcomes?.length || 0;
          const block_rate = total_evaluations > 0 ? blockCount / total_evaluations : 0;
          
          return {
            policy_id: policy.id,
            policy_name: policy.policy_name,
            total_evaluations,
            outcomes: outcomesCounts as any,
            block_rate,
            users_affected: uniqueUsers.size,
          };
        })
      );
      
      return stats;
    },
    refetchInterval: 30000,
  });
}

// Mutation: Create policy
export function useCreatePolicy() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (policy: Omit<SafetyPolicy, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('safety_policies')
        .insert(policy)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety_policies'] });
    },
  });
}

// Mutation: Update policy
export function useUpdatePolicy() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: { id: string; updates: Partial<SafetyPolicy> }) => {
      const { data, error} = await supabase
        .from('safety_policies')
        .update(params.updates)
        .eq('id', params.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety_policies'] });
      queryClient.invalidateQueries({ queryKey: ['safety_policy'] });
    },
  });
}

// Mutation: Toggle policy active state
export function useTogglePolicy() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: { id: string; is_active: boolean }) => {
      const { data, error } = await supabase
        .from('safety_policies')
        .update({ is_active: params.is_active })
        .eq('id', params.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety_policies'] });
    },
  });
}

// Mutation: Reorder policies (update priorities)
export function useReorderPolicies() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderedIds: string[]) => {
      // Update priority based on position in array
      const updates = orderedIds.map((id, index) =>
        supabase
          .from('safety_policies')
          .update({ priority: (index + 1) * 10 })
          .eq('id', id)
      );
      
      await Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety_policies'] });
    },
  });
}
