// STATE MODEL HOOKS
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type {
  UserStateSnapshot,
  StateDistribution,
  StateBand,
  ArousalContext,
} from '@/lib/types/constitution';

const supabase = createClient();

export function useStateSnapshots(userId?: string, limit = 50) {
  return useQuery({
    queryKey: ['state_snapshots', userId, limit],
    queryFn: async (): Promise<UserStateSnapshot[]> => {
      let query = supabase
        .from('user_state_snapshots')
        .select('*')
        .order('captured_at', { ascending: false })
        .limit(limit);
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useStateTimeline(userId: string, timeRange?: { start: string; end: string }) {
  return useQuery({
    queryKey: ['state_timeline', userId, timeRange],
    queryFn: async (): Promise<UserStateSnapshot[]> => {
      let query = supabase
        .from('user_state_snapshots')
        .select('*')
        .eq('user_id', userId)
        .order('captured_at', { ascending: true });
      
      if (timeRange) {
        query = query
          .gte('captured_at', timeRange.start)
          .lte('captured_at', timeRange.end);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });
}

export function useStateDistribution() {
  return useQuery({
    queryKey: ['state_distribution'],
    queryFn: async (): Promise<StateDistribution> => {
      // Get most recent state per user
      const { data: allSnapshots } = await supabase
        .from('user_state_snapshots')
        .select('user_id, state_band, captured_at')
        .order('captured_at', { ascending: false });
      
      if (!allSnapshots) {
        return {
          green: 0,
          amber: 0,
          red: 0,
          shutdown: 0,
          total_users: 0,
        };
      }
      
      // Get most recent snapshot per user
      const latestByUser: Record<string, StateBand> = {};
      allSnapshots.forEach(snapshot => {
        if (!latestByUser[snapshot.user_id]) {
          latestByUser[snapshot.user_id] = snapshot.state_band;
        }
      });
      
      const distribution: StateDistribution = {
        green: 0,
        amber: 0,
        red: 0,
        shutdown: 0,
        total_users: Object.keys(latestByUser).length,
      };
      
      Object.values(latestByUser).forEach(band => {
        if (band === 'green') distribution.green++;
        else if (band === 'amber') distribution.amber++;
        else if (band === 'red') distribution.red++;
        else if (band === 'shutdown') distribution.shutdown++;
      });
      
      return distribution;
    },
    refetchInterval: 30000,
  });
}

export function useCurrentState(userId: string) {
  return useQuery({
    queryKey: ['current_state', userId],
    queryFn: async (): Promise<UserStateSnapshot | null> => {
      const { data, error } = await supabase
        .from('user_state_snapshots')
        .select('*')
        .eq('user_id', userId)
        .order('captured_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // Ignore "not found"
      return data;
    },
    enabled: !!userId,
  });
}

// Helper: Compute state band from Tempo/Flow/Sync
export function computeStateBand(tempo: number, flow: number, sync: number): {
  composite: number;
  state_band: StateBand;
  arousal_context: ArousalContext;
} {
  const composite = Math.round((tempo + flow + sync) / 3);
  
  let state_band: StateBand;
  if (composite >= 60) state_band = 'green';
  else if (composite >= 40) state_band = 'amber';
  else if (composite >= 20) state_band = 'red';
  else state_band = 'shutdown';
  
  let arousal_context: ArousalContext;
  if (tempo < 30) arousal_context = 'shutdown';
  else if (tempo > 70 && sync < 40) arousal_context = 'activated';
  else arousal_context = 'calm';
  
  return { composite, state_band, arousal_context };
}

// State band rules (constants)
export const STATE_BAND_RULES = {
  green: {
    composite_range: [60, 100] as [number, number],
    arousal_allowed: ['calm'] as ArousalContext[],
    content_types_allowed: 'all',
    description: 'Stable, resourced, ready for growth',
  },
  amber: {
    composite_range: [40, 59] as [number, number],
    arousal_allowed: ['calm', 'activated'] as ArousalContext[],
    content_types_allowed: 'standard',
    description: 'Managing, needs support but not crisis',
  },
  red: {
    composite_range: [20, 39] as [number, number],
    arousal_allowed: ['activated', 'shutdown'] as ArousalContext[],
    content_types_allowed: 'crisis_safe',
    description: 'Struggling, needs grounding',
  },
  shutdown: {
    composite_range: [0, 19] as [number, number],
    arousal_allowed: ['shutdown'] as ArousalContext[],
    content_types_allowed: 'rescue_only',
    description: 'Crisis, needs immediate support',
  },
};

export function useStateTrends(userId: string, days = 7) {
  return useQuery({
    queryKey: ['state_trends', userId, days],
    queryFn: async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const { data: snapshots } = await supabase
        .from('user_state_snapshots')
        .select('*')
        .eq('user_id', userId)
        .gte('captured_at', startDate.toISOString())
        .order('captured_at', { ascending: true });
      
      if (!snapshots) return null;
      
      // Group by day
      const byDay: Record<string, { tempo: number[]; flow: number[]; sync: number[] }> = {};
      
      snapshots.forEach(snapshot => {
        const day = new Date(snapshot.captured_at).toISOString().slice(0, 10);
        if (!byDay[day]) {
          byDay[day] = { tempo: [], flow: [], sync: [] };
        }
        byDay[day].tempo.push(snapshot.tempo);
        byDay[day].flow.push(snapshot.flow);
        byDay[day].sync.push(snapshot.sync);
      });
      
      // Average by day
      const trends = Object.entries(byDay).map(([day, values]) => ({
        day,
        avg_tempo: values.tempo.reduce((sum, v) => sum + v, 0) / values.tempo.length,
        avg_flow: values.flow.reduce((sum, v) => sum + v, 0) / values.flow.length,
        avg_sync: values.sync.reduce((sum, v) => sum + v, 0) / values.sync.length,
        count: values.tempo.length,
      }));
      
      return trends;
    },
    enabled: !!userId,
  });
}
