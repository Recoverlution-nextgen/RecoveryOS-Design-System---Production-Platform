// supabase/functions/_shared/realtime.ts
// Realtime broadcast helpers

export interface BroadcastMessage {
  type: string;
  payload: Record<string, unknown>;
}

export async function broadcastToUser(
  userId: string,
  channel: 'feed' | 'notifications' | 'journey',
  message: BroadcastMessage
): Promise<void> {
  try {
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const topic = `user:${userId}:${channel}`;
    
    await supabase.channel(topic).send({
      type: 'broadcast',
      event: message.type,
      payload: message.payload,
    });
  } catch (err) {
    console.error('[Realtime] Broadcast failed:', err);
    // Don't throw - broadcasting is best-effort
  }
}

export async function broadcastToJourney(
  journeyInstanceId: string,
  message: BroadcastMessage
): Promise<void> {
  try {
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const topic = `journey:${journeyInstanceId}:scene`;
    
    await supabase.channel(topic).send({
      type: 'broadcast',
      event: message.type,
      payload: message.payload,
    });
  } catch (err) {
    console.error('[Realtime] Journey broadcast failed:', err);
  }
}
