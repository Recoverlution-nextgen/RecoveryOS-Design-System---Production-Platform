/**
 * JOURNEY REALTIME HOOK
 * 
 * Subscribes to private Realtime channel for a journey instance
 * Topic: journey:{instance_id}
 * 
 * Events:
 * - broadcast INSERT/UPDATE/DELETE for journey_scene_events
 * - custom capture_created event
 */

import { useEffect, useRef } from 'react';
import { createClient } from '../utils/supabase/client';

const supabase = createClient();

type Handlers = {
  onSceneEventInsert?: (payload: any) => void;
  onSceneEventUpdate?: (payload: any) => void;
  onSceneEventDelete?: (payload: any) => void;
  onCaptureCreated?: (payload: any) => void;
};

export function useJourneyRealtime(
  instanceId: string | null,
  handlers: Handlers = {}
) {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    let active = true;

    if (!instanceId) return;

    async function subscribe() {
      // Ensure current JWT provided to Realtime before subscribing
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        await supabase.realtime.setAuth(session.access_token);
      }

      // Prevent duplicate subscriptions
      if (channelRef.current?.state === 'subscribed') return;

      const channel = supabase.channel(`journey:${instanceId}`, {
        config: { private: true, broadcast: { ack: true } },
      });

      channelRef.current = channel;

      channel
        .on('broadcast', { event: 'INSERT' }, (p) =>
          handlers.onSceneEventInsert?.(p)
        )
        .on('broadcast', { event: 'UPDATE' }, (p) =>
          handlers.onSceneEventUpdate?.(p)
        )
        .on('broadcast', { event: 'DELETE' }, (p) =>
          handlers.onSceneEventDelete?.(p)
        )
        .on('broadcast', { event: 'capture_created' }, (p) =>
          handlers.onCaptureCreated?.(p)
        )
        .subscribe((status) => {
          if (!active) return;
          console.log('[Journey Realtime] Subscription status:', status);
        });
    }

    subscribe();

    return () => {
      active = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [instanceId]);
}
