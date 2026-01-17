// REGISTRY HOOKS (Content + Delivery)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type {
  ContentEnvelope,
  DeliveryEnvelope,
  ContentRegistryFilters,
} from '@/lib/types/constitution';

const supabase = createClient();

export function useContentRegistry(filters?: ContentRegistryFilters) {
  return useQuery({
    queryKey: ['content_registry', filters],
    queryFn: async (): Promise<ContentEnvelope[]> => {
      let query = supabase
        .from('content_registry')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (filters?.content_kind?.length) {
        query = query.in('content_kind', filters.content_kind);
      }
      
      if (filters?.pillar_id?.length) {
        query = query.in('pillar_id', filters.pillar_id);
      }
      
      if (filters?.status?.length) {
        query = query.in('status', filters.status);
      }
      
      if (filters?.search) {
        // Search in source_table and canonical_id
        query = query.or(`source_table.ilike.%${filters.search}%,canonical_id.ilike.%${filters.search}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useContentEnvelope(contentRef: string | null) {
  return useQuery({
    queryKey: ['content_envelope', contentRef],
    queryFn: async (): Promise<ContentEnvelope | null> => {
      if (!contentRef) return null;
      
      const { data, error } = await supabase
        .from('content_registry')
        .select('*')
        .eq('id', contentRef)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!contentRef,
  });
}

export function useDeliveryRegistry(contentRef: string | null) {
  return useQuery({
    queryKey: ['delivery_registry', contentRef],
    queryFn: async (): Promise<DeliveryEnvelope[]> => {
      if (!contentRef) return [];
      
      const { data, error } = await supabase
        .from('delivery_registry')
        .select('*')
        .eq('content_ref', contentRef)
        .eq('is_active', true);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!contentRef,
  });
}

export function useContentStats() {
  return useQuery({
    queryKey: ['content_stats'],
    queryFn: async () => {
      const { count: total } = await supabase
        .from('content_registry')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      
      const { count: active } = await supabase
        .from('content_registry')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')
        .eq('is_active', true);
      
      const { count: draft } = await supabase
        .from('content_registry')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'draft');
      
      // Count by content_kind
      const { data: byKind } = await supabase
        .from('content_registry')
        .select('content_kind')
        .eq('is_active', true);
      
      const kindCounts: Record<string, number> = {};
      byKind?.forEach(item => {
        kindCounts[item.content_kind] = (kindCounts[item.content_kind] || 0) + 1;
      });
      
      return {
        total: total || 0,
        active: active || 0,
        draft: draft || 0,
        by_kind: kindCounts,
      };
    },
  });
}

export function useDeliveryStats() {
  return useQuery({
    queryKey: ['delivery_stats'],
    queryFn: async () => {
      const { count: total } = await supabase
        .from('delivery_registry')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      
      // Count by delivery_kind
      const { data: byKind } = await supabase
        .from('delivery_registry')
        .select('delivery_kind')
        .eq('is_active', true);
      
      const kindCounts: Record<string, number> = {};
      byKind?.forEach(item => {
        kindCounts[item.delivery_kind] = (kindCounts[item.delivery_kind] || 0) + 1;
      });
      
      return {
        total: total || 0,
        by_kind: kindCounts,
      };
    },
  });
}

// Mutation: Update content envelope
export function useUpdateContentEnvelope() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: { id: string; updates: Partial<ContentEnvelope> }) => {
      const { data, error } = await supabase
        .from('content_registry')
        .update({
          ...params.updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content_registry'] });
      queryClient.invalidateQueries({ queryKey: ['content_envelope'] });
    },
  });
}

// Mutation: Create delivery
export function useCreateDelivery() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (delivery: Omit<DeliveryEnvelope, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('delivery_registry')
        .insert(delivery)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['delivery_registry', variables.content_ref] });
      queryClient.invalidateQueries({ queryKey: ['delivery_stats'] });
    },
  });
}
