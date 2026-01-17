// DECISION TRACE HOOKS
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type {
  DecisionTrace,
  DecisionTraceFilters,
} from '@/lib/types/constitution';

const supabase = createClient();

export function useDecisionTraces(filters?: DecisionTraceFilters) {
  return useQuery({
    queryKey: ['decision_traces', filters],
    queryFn: async (): Promise<DecisionTrace[]> => {
      let query = supabase
        .from('decision_traces')
        .select('*')
        .order('decided_at', { ascending: false })
        .limit(100);
      
      if (filters?.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      
      if (filters?.decision_type?.length) {
        query = query.in('decision_type', filters.decision_type);
      }
      
      if (filters?.content_ref) {
        query = query.eq('content_ref_chosen', filters.content_ref);
      }
      
      if (filters?.min_confidence !== undefined) {
        query = query.gte('why_now_confidence', filters.min_confidence);
      }
      
      if (filters?.time_range) {
        query = query
          .gte('decided_at', filters.time_range.start)
          .lte('decided_at', filters.time_range.end);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useDecisionTrace(traceId: string | null) {
  return useQuery({
    queryKey: ['decision_trace', traceId],
    queryFn: async (): Promise<DecisionTrace | null> => {
      if (!traceId) return null;
      
      const { data, error } = await supabase
        .from('decision_traces')
        .select('*')
        .eq('decision_trace_id', traceId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!traceId,
  });
}

export function useDecisionComparison(traceIds: string[]) {
  return useQuery({
    queryKey: ['decision_comparison', traceIds],
    queryFn: async (): Promise<DecisionTrace[]> => {
      if (traceIds.length === 0) return [];
      
      const { data, error } = await supabase
        .from('decision_traces')
        .select('*')
        .in('decision_trace_id', traceIds);
      
      if (error) throw error;
      return data || [];
    },
    enabled: traceIds.length > 0,
  });
}

export function useDecisionStats() {
  return useQuery({
    queryKey: ['decision_stats'],
    queryFn: async () => {
      const { count: total } = await supabase
        .from('decision_traces')
        .select('*', { count: 'exact', head: true });
      
      const { data: allTraces } = await supabase
        .from('decision_traces')
        .select('why_now_confidence, decided_at');
      
      if (!allTraces) {
        return {
          total: 0,
          avg_confidence: 0,
          decisions_today: 0,
        };
      }
      
      const avg_confidence = allTraces.length > 0
        ? allTraces.reduce((sum, t) => sum + (t.why_now_confidence || 0), 0) / allTraces.length
        : 0;
      
      const today = new Date().toISOString().slice(0, 10);
      const decisions_today = allTraces.filter(t =>
        t.decided_at.startsWith(today)
      ).length;
      
      return {
        total: total || 0,
        avg_confidence,
        decisions_today,
      };
    },
    refetchInterval: 30000,
  });
}

export function useRecentDecisions(limit = 10) {
  return useQuery({
    queryKey: ['recent_decisions', limit],
    queryFn: async (): Promise<DecisionTrace[]> => {
      const { data, error } = await supabase
        .from('decision_traces')
        .select('*')
        .order('decided_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });
}
