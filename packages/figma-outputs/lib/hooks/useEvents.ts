// EVENT SPINE HOOKS
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type {
  EventSpineEntry,
  EventSpineFilters,
  EventAnalytics,
  EventType,
} from '@/lib/types/constitution';

const supabase = createClient();

export function useEventSpine(filters?: EventSpineFilters, options?: { realTime?: boolean }) {
  return useQuery({
    queryKey: ['event_spine', filters],
    queryFn: async (): Promise<EventSpineEntry[]> => {
      let query = supabase
        .from('event_spine')
        .select('*')
        .order('occurred_at', { ascending: false })
        .limit(100);
      
      if (filters?.event_type?.length) {
        query = query.in('event_type', filters.event_type);
      }
      
      if (filters?.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      
      if (filters?.content_ref) {
        query = query.eq('content_ref', filters.content_ref);
      }
      
      if (filters?.time_range) {
        query = query
          .gte('occurred_at', filters.time_range.start)
          .lte('occurred_at', filters.time_range.end);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: options?.realTime ? 5000 : false, // Poll every 5 seconds if realTime
  });
}

export function useEventAnalytics(timeRange?: { start: string; end: string }) {
  return useQuery({
    queryKey: ['event_analytics', timeRange],
    queryFn: async (): Promise<EventAnalytics> => {
      let query = supabase.from('event_spine').select('*');
      
      if (timeRange) {
        query = query
          .gte('occurred_at', timeRange.start)
          .lte('occurred_at', timeRange.end);
      }
      
      const { data: events } = await query;
      
      if (!events) {
        return {
          total_events: 0,
          events_by_type: {} as Record<EventType, number>,
          events_over_time: [],
          completion_funnel: {
            exposed: 0,
            opened: 0,
            interacted: 0,
            completed: 0,
            abandoned: 0,
          },
          top_content: [],
        };
      }
      
      // Count by type
      const events_by_type: Record<string, number> = {};
      events.forEach(event => {
        events_by_type[event.event_type] = (events_by_type[event.event_type] || 0) + 1;
      });
      
      // Events over time (group by hour)
      const eventsOverTimeMap: Record<string, Record<string, number>> = {};
      events.forEach(event => {
        const hour = new Date(event.occurred_at).toISOString().slice(0, 13) + ':00:00';
        if (!eventsOverTimeMap[hour]) eventsOverTimeMap[hour] = {};
        eventsOverTimeMap[hour][event.event_type] = (eventsOverTimeMap[hour][event.event_type] || 0) + 1;
      });
      
      const events_over_time = Object.entries(eventsOverTimeMap).flatMap(([timestamp, types]) =>
        Object.entries(types).map(([event_type, count]) => ({
          timestamp,
          count,
          event_type: event_type as EventType,
        }))
      ).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      
      // Completion funnel
      const completion_funnel = {
        exposed: events_by_type['content_exposed'] || 0,
        opened: events_by_type['content_opened'] || 0,
        interacted: events_by_type['content_interacted'] || 0,
        completed: events_by_type['content_completed'] || 0,
        abandoned: events_by_type['content_abandoned'] || 0,
      };
      
      // Top content by exposure
      const contentCounts: Record<string, { exposure_count: number; completed: number }> = {};
      events.forEach(event => {
        if (!event.content_ref) return;
        if (!contentCounts[event.content_ref]) {
          contentCounts[event.content_ref] = { exposure_count: 0, completed: 0 };
        }
        if (event.event_type === 'content_exposed') {
          contentCounts[event.content_ref].exposure_count++;
        }
        if (event.event_type === 'content_completed') {
          contentCounts[event.content_ref].completed++;
        }
      });
      
      const top_content = Object.entries(contentCounts)
        .map(([content_ref, stats]) => ({
          content_ref,
          exposure_count: stats.exposure_count,
          completion_rate: stats.exposure_count > 0 ? stats.completed / stats.exposure_count : 0,
        }))
        .sort((a, b) => b.exposure_count - a.exposure_count)
        .slice(0, 10);
      
      return {
        total_events: events.length,
        events_by_type: events_by_type as Record<EventType, number>,
        events_over_time,
        completion_funnel,
        top_content,
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useContentExposures(userId?: string) {
  return useQuery({
    queryKey: ['content_exposures', userId],
    queryFn: async (): Promise<EventSpineEntry[]> => {
      let query = supabase
        .from('event_spine')
        .select('*')
        .eq('event_type', 'content_exposed')
        .order('occurred_at', { ascending: false })
        .limit(50);
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useEventTimeline(userId: string) {
  return useQuery({
    queryKey: ['event_timeline', userId],
    queryFn: async (): Promise<EventSpineEntry[]> => {
      const { data, error } = await supabase
        .from('event_spine')
        .select('*')
        .eq('user_id', userId)
        .order('occurred_at', { ascending: true })
        .limit(200);
      
      if (error) throw error;
      return data || [];
    },
  });
}
