/**
 * Stream Chat Integration - Alumni Messenger
 * Context-first messaging for therapeutic peer support
 * 
 * Part of ST52: Alumni Messenger
 */

import { StreamChat, Channel, ChannelFilters, ChannelOptions, ChannelSort, MessageResponse } from 'stream-chat';

// ============================================================================
// TYPES
// ============================================================================

export type MessageIntent = 
  | 'supportive'      // "I'm here for you"
  | 'confirming'      // "I hear you"
  | 'sharing'         // "This is my experience"
  | 'requesting'      // "I need support"
  | 'celebrating'     // "Win moment"
  | 'checking-in'     // "How are you?"
  | 'resource-share'; // "This helped me"

export type PillarType = 
  | 'Emotional Regulation'
  | 'Stress Resilience'
  | 'Social Connectivity'
  | 'Cognitive Reframing'
  | 'Identity Integration'
  | 'Decision Mastery';

export type ChannelType = 
  | 'cohort'          // Treatment center discharge group
  | 'pillar'          // Topic-based support
  | 'milestone';      // 30/60/90 day groups

export interface AlumniUser {
  id: string;
  name: string;
  role: 'alumni' | 'peer-mentor' | 'therapist' | 'moderator';
  sobrietyDays?: number;
  cohort?: string;
  facility?: string;
}

export interface ContextualMessage {
  text: string;
  intent: MessageIntent;
  pillar?: PillarType;
  moodBefore?: {
    energy: number;
    clarity: number;
    connection: number;
  };
}

export interface AlumniChannel {
  id: string;
  name: string;
  type: ChannelType;
  createdDate: Date;
  archiveDate?: Date;
  memberCount: number;
  status: 'active' | 'archived';
}

// ============================================================================
// STREAM CHAT CLIENT SINGLETON
// ============================================================================

let streamChatClient: StreamChat | null = null;

/**
 * Initialize Stream Chat client
 * Call this once on app startup with API key
 */
export async function initStreamChat(apiKey: string): Promise<StreamChat> {
  if (streamChatClient) {
    return streamChatClient;
  }

  streamChatClient = StreamChat.getInstance(apiKey);
  console.log('✅ Stream Chat initialized');
  
  return streamChatClient;
}

/**
 * Get existing Stream Chat client
 */
export function getStreamChatClient(): StreamChat | null {
  return streamChatClient;
}

// ============================================================================
// USER AUTHENTICATION
// ============================================================================

/**
 * Connect user to Stream Chat
 * Called after user logs in
 */
export async function connectStreamUser(
  user: AlumniUser,
  userToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!streamChatClient) {
      return { success: false, error: 'Stream Chat not initialized' };
    }

    await streamChatClient.connectUser(
      {
        id: user.id,
        name: user.name,
        role: user.role,
        sobriety_days: user.sobrietyDays,
        cohort: user.cohort,
        facility: user.facility,
      },
      userToken
    );

    console.log('✅ User connected to Stream Chat:', user.name);
    return { success: true };
    
  } catch (error: any) {
    console.error('❌ Stream Chat connection failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Disconnect user from Stream Chat
 * Called on logout
 */
export async function disconnectStreamUser(): Promise<void> {
  if (streamChatClient) {
    await streamChatClient.disconnectUser();
    console.log('✅ User disconnected from Stream Chat');
  }
}

// ============================================================================
// CHANNEL MANAGEMENT
// ============================================================================

/**
 * Create a cohort channel
 * For alumni who discharged around the same time
 */
export async function createCohortChannel(params: {
  cohortName: string;
  facilityName: string;
  memberIds: string[];
  createdDate: Date;
}): Promise<{ success: boolean; channel?: Channel; error?: string }> {
  try {
    if (!streamChatClient) {
      return { success: false, error: 'Stream Chat not initialized' };
    }

    const channelId = `cohort-${params.facilityName.toLowerCase().replace(/\s+/g, '-')}-${params.cohortName.toLowerCase().replace(/\s+/g, '-')}`;

    const channel = streamChatClient.channel('messaging', channelId, {
      name: `${params.facilityName} - ${params.cohortName}`,
      members: params.memberIds,
      created_by_id: streamChatClient.userID,
      channel_type: 'cohort',
      facility: params.facilityName,
      cohort: params.cohortName,
      created_date: params.createdDate.toISOString(),
      // Auto-archive after 90 days
      archive_date: new Date(params.createdDate.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    });

    await channel.create();
    console.log('✅ Cohort channel created:', channelId);
    
    return { success: true, channel };
    
  } catch (error: any) {
    console.error('❌ Failed to create cohort channel:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Create a pillar channel
 * Topic-based support groups
 */
export async function createPillarChannel(params: {
  pillar: PillarType;
  memberIds: string[];
}): Promise<{ success: boolean; channel?: Channel; error?: string }> {
  try {
    if (!streamChatClient) {
      return { success: false, error: 'Stream Chat not initialized' };
    }

    const channelId = `pillar-${params.pillar.toLowerCase().replace(/\s+/g, '-')}`;

    const channel = streamChatClient.channel('messaging', channelId, {
      name: `${params.pillar} Support`,
      members: params.memberIds,
      created_by_id: streamChatClient.userID,
      channel_type: 'pillar',
      pillar: params.pillar,
      permanent: true, // Pillar channels don't auto-archive
    });

    await channel.create();
    console.log('✅ Pillar channel created:', channelId);
    
    return { success: true, channel };
    
  } catch (error: any) {
    console.error('❌ Failed to create pillar channel:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get user's channels
 */
export async function getUserChannels(): Promise<{ success: boolean; channels?: Channel[]; error?: string }> {
  try {
    if (!streamChatClient || !streamChatClient.userID) {
      return { success: false, error: 'Stream Chat not initialized or user not connected' };
    }

    const filter: ChannelFilters = {
      type: 'messaging',
      members: { $in: [streamChatClient.userID] },
    };

    const sort: ChannelSort = { last_message_at: -1 };
    const options: ChannelOptions = { limit: 20 };

    const channels = await streamChatClient.queryChannels(filter, sort, options);
    
    console.log(`✅ Retrieved ${channels.length} channels`);
    return { success: true, channels };
    
  } catch (error: any) {
    console.error('❌ Failed to get channels:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// CONTEXT-FIRST MESSAGING
// ============================================================================

/**
 * Send contextual message
 * REQUIRES intent tag - this is the key differentiator from WhatsApp!
 */
export async function sendContextualMessage(
  channel: Channel,
  message: ContextualMessage
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!message.intent) {
      return { success: false, error: 'Message intent is required' };
    }

    await channel.sendMessage({
      text: message.text,
      intent: message.intent,
      pillar: message.pillar,
      mood_before: message.moodBefore,
      // Custom data for analytics
      timestamp: new Date().toISOString(),
    });

    console.log(`✅ Message sent with intent: ${message.intent}`);
    return { success: true };
    
  } catch (error: any) {
    console.error('❌ Failed to send message:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get suggested responses based on message intent
 */
export function getSuggestedResponses(messageIntent: MessageIntent): string[] {
  const suggestions: Record<MessageIntent, string[]> = {
    'requesting': [
      "I hear you",
      "You're not alone",
      "This too shall pass",
      "One day at a time",
    ],
    'celebrating': [
      "So proud of you!",
      "That's amazing!",
      "Keep going!",
      "You deserve this",
    ],
    'sharing': [
      "Thank you for sharing",
      "I relate to this",
      "That's really helpful",
    ],
    'checking-in': [
      "Doing okay today",
      "Taking it one step at a time",
      "Grateful to be here",
    ],
    'supportive': [
      "Thank you",
      "That means a lot",
      "Grateful for this community",
    ],
    'confirming': [
      "Absolutely",
      "I understand",
      "Makes sense",
    ],
    'resource-share': [
      "Saved this!",
      "Really helpful, thanks",
      "Going to try this",
    ],
  };

  return suggestions[messageIntent] || [];
}

// ============================================================================
// INTENT TAG HELPERS
// ============================================================================

export const INTENT_TAGS: { value: MessageIntent; label: string; description: string; emoji: string }[] = [
  {
    value: 'supportive',
    label: 'Supportive',
    description: "I'm here for you",
    emoji: '🤝',
  },
  {
    value: 'confirming',
    label: 'Confirming',
    description: 'I hear you',
    emoji: '👂',
  },
  {
    value: 'sharing',
    label: 'Sharing',
    description: 'This is my experience',
    emoji: '💭',
  },
  {
    value: 'requesting',
    label: 'Requesting',
    description: 'I need support',
    emoji: '🙏',
  },
  {
    value: 'celebrating',
    label: 'Celebrating',
    description: 'Win moment!',
    emoji: '🎉',
  },
  {
    value: 'checking-in',
    label: 'Checking In',
    description: 'How are you?',
    emoji: '👋',
  },
  {
    value: 'resource-share',
    label: 'Resource',
    description: 'This helped me',
    emoji: '📚',
  },
];

/**
 * Get intent tag display info
 */
export function getIntentDisplay(intent: MessageIntent): { label: string; emoji: string; color: string } {
  const tag = INTENT_TAGS.find(t => t.value === intent);
  
  const colors: Record<MessageIntent, string> = {
    'supportive': '#3B82F6',
    'confirming': '#10B981',
    'sharing': '#8B5CF6',
    'requesting': '#F59E0B',
    'celebrating': '#EC4899',
    'checking-in': '#06B6D4',
    'resource-share': '#6366F1',
  };

  return {
    label: tag?.label || intent,
    emoji: tag?.emoji || '💬',
    color: colors[intent],
  };
}

// ============================================================================
// MODERATION HELPERS
// ============================================================================

/**
 * Flag a message for moderation
 */
export async function flagMessage(
  channel: Channel,
  messageId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!streamChatClient) {
      return { success: false, error: 'Stream Chat not initialized' };
    }

    await streamChatClient.flagMessage(messageId, {
      reason,
      custom: {
        flagged_at: new Date().toISOString(),
      },
    });

    console.log('✅ Message flagged:', messageId);
    return { success: true };
    
  } catch (error: any) {
    console.error('❌ Failed to flag message:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// ANALYTICS TRACKING
// ============================================================================

/**
 * Track message analytics
 * Send to backend for Momentum integration
 */
export async function trackMessageAnalytics(params: {
  channelId: string;
  channelType: ChannelType;
  intent: MessageIntent;
  pillar?: PillarType;
  responseTimeMs?: number;
}): Promise<void> {
  try {
    // This would send to your backend
    console.log('📊 Message analytics:', params);
    
    // TODO: Integrate with Momentum data layer
    // - Log to patient_interactions table
    // - Update Flow metric (breadth of practice)
    // - Track mood delta if mood_before/after provided
    
  } catch (error) {
    console.error('❌ Failed to track analytics:', error);
  }
}

// ============================================================================
// DEMO / TESTING HELPERS
// ============================================================================

/**
 * Create test users for multi-user testing
 */
export const TEST_USERS: AlumniUser[] = [
  {
    id: 'test-emma',
    name: 'Emma (Patient, Day 45)',
    role: 'alumni',
    sobrietyDays: 45,
    cohort: 'January 2025',
    facility: 'Sunshine Valley',
  },
  {
    id: 'test-alex',
    name: 'Alex (Patient, Day 90)',
    role: 'alumni',
    sobrietyDays: 90,
    cohort: 'December 2024',
    facility: 'Sunshine Valley',
  },
  {
    id: 'test-mike',
    name: 'Mike (Peer Mentor)',
    role: 'peer-mentor',
    sobrietyDays: 180,
    cohort: 'June 2024',
    facility: 'Sunshine Valley',
  },
  {
    id: 'test-sarah',
    name: 'Dr. Sarah (Therapist)',
    role: 'therapist',
    facility: 'Sunshine Valley',
  },
  {
    id: 'test-lisa',
    name: 'Lisa (Care Coordinator)',
    role: 'moderator',
    facility: 'Sunshine Valley',
  },
];

/**
 * Generate mock user token (for testing only)
 * In production, get this from your backend
 */
export function generateMockUserToken(userId: string): string {
  // Stream Chat requires server-side token generation
  // For now, return placeholder - we'll need Stream API key with user token endpoint
  return `mock-token-${userId}`;
}
