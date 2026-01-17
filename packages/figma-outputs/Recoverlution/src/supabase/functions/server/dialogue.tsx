/**
 * DIALOGUE API
 * 
 * Backend for Anchor Point dialogue experience
 * Dynamic configuration, pattern detection, safety monitoring
 * OpenAI-powered LUMA responses with adaptive intelligence
 */

import { Hono } from 'npm:hono';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as store from './simple-store.tsx';

const app = new Hono();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// ============================================================================
// SYSTEM PROMPTS (Dream Team Voice)
// ============================================================================

const SYSTEM_PROMPTS = {
  inquiry: `You are LUMA, a warm, non-judgmental companion in the user's recovery journey. 
You embody the wisdom of Buddhist teachers and contemplative guides. You are in Inquiry mode - curious and open.

Your role is to:
- Ask reflective questions that open new perspectives
- Point to what is already here, without analyzing
- Create space for insight to emerge
- Never advise, diagnose, or prescribe
- Speak like Ram Dass, Alan Watts - gentle, present, spacious

You are NOT a therapist. You do not solve problems. You illuminate.
Keep responses short (1-2 sentences). Let silence breathe.`,

  philosophy: `You are LUMA, a warm, non-judgmental companion in the user's recovery journey.
You embody the wisdom of Buddhist teachers and contemplative guides. You are in Philosophy mode - expansive and big-picture.

Your role is to:
- Help them see patterns and meaning
- Zoom out to universal truths
- Connect their experience to larger wisdom
- Never advise, diagnose, or prescribe
- Speak like Pema Chödrön, Alan Watts - philosophical, spacious

You are NOT a therapist. You do not solve problems. You illuminate.
Keep responses thoughtful but concise (2-3 sentences). Honor the mystery.`,

  reflection: `You are LUMA, a warm, non-judgmental companion in the user's recovery journey.
You embody the wisdom of Buddhist teachers and contemplative guides. You are in Reflection mode - gentle and present-moment.

Your role is to:
- Ground them in the here and now
- Invite body-based awareness
- Witness what is arising without fixing
- Never advise, diagnose, or prescribe
- Speak like Tara Brach, Thich Nhat Hanh - gentle, somatic, present

You are NOT a therapist. You do not solve problems. You hold space.
Keep responses very short (1-2 sentences). Honor presence.`,

  exploration: `You are LUMA, a warm, non-judgmental companion in the user's recovery journey.
You embody the wisdom of Buddhist teachers and contemplative guides. You are in Exploration mode - deep dive and focused.

Your role is to:
- Follow the thread deeper
- Ask "what else?" and "tell me more"
- Help them uncover layers without directing
- Never advise, diagnose, or prescribe
- Speak like Byron Katie, Stephen Levine - curious, patient, deep

You are NOT a therapist. You do not solve problems. You explore together.
Keep responses invitational (1-2 sentences). Stay curious.`,

  challenge: `You are LUMA, a warm, non-judgmental companion in the user's recovery journey.
You embody the wisdom of Buddhist teachers and contemplative guides. You are in Challenge mode - direct and loving.

Your role is to:
- Offer gentle confrontation at the edge
- Name what they are avoiding with compassion
- Ask provocative questions without judgment
- Never advise, diagnose, or prescribe
- Speak like Pema Chödrön at her most direct - loving, clear, edge-working

You are NOT a therapist. You do not solve problems. You illuminate the edge.
Keep responses direct but compassionate (1-2 sentences). Honor the courage it takes.`
};

// ============================================================================
// CRISIS LANGUAGE DETECTION
// ============================================================================

const CRISIS_KEYWORDS = [
  'kill myself', 'end it all', 'not worth living', 'better off dead',
  'suicide', 'self harm', 'hurt myself', 'end my life',
  'cannot go on', 'want to die', 'no point living'
];

function detectCrisisLanguage(text: string): boolean {
  const lowerText = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

// ============================================================================
// EMOTIONAL INTENSITY DETECTION
// ============================================================================

function analyzeEmotionalIntensity(text: string): number {
  // Simple heuristic (0-10 scale)
  let intensity = 5;

  // Length factor
  if (text.length > 200) intensity += 2;
  if (text.length < 20) intensity -= 1;

  // Emotional language
  const highEmotionWords = ['overwhelmed', 'exhausted', 'terrified', 'devastated', 'hopeless', 'drowning', 'breaking'];
  const count = highEmotionWords.filter(word => text.toLowerCase().includes(word)).length;
  intensity += count * 1.5;

  // Punctuation
  const exclamations = (text.match(/!/g) || []).length;
  intensity += exclamations * 0.5;

  return Math.min(10, Math.max(0, intensity));
}

// ============================================================================
// PROMPT GENERATION
// ============================================================================

async function generatePrompts(
  mode: string,
  lumaMessage: string,
  conversationHistory: any[],
  userContext: any
): Promise<string[]> {
  try {
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      console.warn('OpenAI API key not found, using fallback prompts');
      return getFallbackPrompts(mode);
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Generate 3 contextual prompt options for the user to choose from. 
            These should be in the USER'S voice (not LUMA's voice).
            Always include one vulnerable option like "I don't know..." or "I'm scared to say".
            Format as JSON array of strings.
            Keep prompts conversational and authentic.`
          },
          {
            role: 'user',
            content: `LUMA just said: "${lumaMessage}"\n\nMode: ${mode}\n\nGenerate 3 response prompts.`
          }
        ],
        temperature: 0.8,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text());
      return getFallbackPrompts(mode);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    try {
      const prompts = JSON.parse(content);
      if (Array.isArray(prompts) && prompts.length === 3) {
        return prompts;
      }
    } catch (e) {
      console.error('Failed to parse OpenAI prompt response:', e);
    }

    return getFallbackPrompts(mode);
  } catch (error) {
    console.error('Error generating prompts:', error);
    return getFallbackPrompts(mode);
  }
}

function getFallbackPrompts(mode: string): string[] {
  const fallbacks: Record<string, string[]> = {
    inquiry: ['I keep wondering about this', 'Something feels stuck', 'I do not know...'],
    philosophy: ['This pattern keeps repeating', 'I see the connection', 'Tell me more'],
    reflection: ['I notice tension', 'I feel resistance', 'I am not sure'],
    exploration: ['There is more here', 'I want to understand', 'Something else...'],
    challenge: ['I know but I avoid', 'I am afraid to look', 'What if I am wrong']
  };

  return fallbacks[mode] || ['Tell me more', 'I am not sure', 'Something else'];
}

// ============================================================================
// LUMA RESPONSE GENERATION
// ============================================================================

async function generateLumaResponse(
  mode: string,
  userMessage: string,
  conversationHistory: any[],
  userContext: any
): Promise<{ response: string; shouldTriggerMicroCue: boolean; microCueType?: string }> {
  try {
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      console.warn('OpenAI API key not found, using fallback response');
      return {
        response: 'What are you noticing right now?',
        shouldTriggerMicroCue: false
      };
    }

    // Analyze user message
    const intensity = analyzeEmotionalIntensity(userMessage);
    const isLongMessage = userMessage.length > 100;
    const isShortMessage = userMessage.length < 20;
    const isStuck = userMessage.toLowerCase().includes('not know') || 
                    userMessage.toLowerCase().includes('maybe') ||
                    userMessage.toLowerCase().includes('unsure');

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.inquiry
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role === 'luma' ? 'assistant' : 'user',
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Add adaptive context based on analysis
    if (isLongMessage) {
      messages.unshift({
        role: 'system',
        content: 'The user is decanting/releasing. Witness with minimal words. Just be present.'
      });
    } else if (isStuck) {
      messages.unshift({
        role: 'system',
        content: 'The user seems stuck. Ground them in body/sensations rather than cognition.'
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text());
      return {
        response: 'I am here with you.',
        shouldTriggerMicroCue: false
      };
    }

    const data = await response.json();
    const lumaResponse = data.choices[0]?.message?.content || 'What are you noticing?';

    // Determine if micro-cue should trigger
    const shouldTriggerMicroCue = intensity > 7 || conversationHistory.length > 6;
    const microCueType = intensity > 8 ? 'breath' : isStuck ? 'body' : 'anchorpoint';

    return {
      response: lumaResponse,
      shouldTriggerMicroCue,
      microCueType: shouldTriggerMicroCue ? microCueType : undefined
    };
  } catch (error) {
    console.error('Error generating LUMA response:', error);
    return {
      response: 'I am here. What are you noticing?',
      shouldTriggerMicroCue: false
    };
  }
}

// ============================================================================
// ROUTES
// ============================================================================

// Start dialogue session
app.post('/start', async (c) => {
  try {
    const { mode, userId } = await c.req.json();

    if (!mode || !['inquiry', 'philosophy', 'reflection', 'exploration', 'challenge'].includes(mode)) {
      return c.json({ error: 'Invalid mode' }, 400);
    }

    const sessionId = `dialogue_${userId}_${Date.now()}`;

    // Opening messages per mode
    const openingMessages: Record<string, string> = {
      inquiry: 'What question is alive for you right now?',
      philosophy: 'What pattern keeps showing up for you?',
      reflection: 'What are you noticing in this moment?',
      exploration: 'What feeling wants to be explored?',
      challenge: 'What are you avoiding that wants your attention?'
    };

    const lumaMessage = openingMessages[mode];

    // Save session to store
    await store.set(sessionId, {
      mode,
      userId,
      messages: [
        {
          role: 'luma',
          content: lumaMessage,
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString()
    });

    // Generate initial prompts
    const prompts = await generatePrompts(mode, lumaMessage, [], {});

    return c.json({
      sessionId,
      lumaMessage,
      prompts
    });
  } catch (error) {
    console.error('Error starting dialogue session:', error);
    return c.json({ error: 'Failed to start session' }, 500);
  }
});

// Send message
app.post('/:sessionId/message', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const { message, userId } = await c.req.json();

    if (!message || !message.trim()) {
      return c.json({ error: 'Message is required' }, 400);
    }

    // Get session from store
    const session = await store.get(sessionId);
    if (!session) {
      return c.json({ error: 'Session not found' }, 404);
    }

    // Check for crisis language
    const isCrisis = detectCrisisLanguage(message);
    if (isCrisis) {
      console.warn(`Crisis language detected in session ${sessionId}`);
      // TODO: Flag for human review, provide resources
      return c.json({
        crisis: true,
        response: 'I hear that you are in a lot of pain. You do not have to hold this alone. Would you like to connect with someone who can support you right now?',
        resources: [
          { name: 'National Suicide Prevention Lifeline', number: '988' },
          { name: 'Crisis Text Line', number: 'Text HOME to 741741' }
        ]
      });
    }

    // Add user message to history
    const userMessageObj = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    session.messages.push(userMessageObj);

    // Generate LUMA response
    const { response: lumaResponse, shouldTriggerMicroCue, microCueType } = 
      await generateLumaResponse(session.mode, message, session.messages, { userId });

    // Add LUMA message to history
    const lumaMessageObj = {
      role: 'luma',
      content: lumaResponse,
      timestamp: new Date().toISOString()
    };
    session.messages.push(lumaMessageObj);

    // Save updated session
    await store.set(sessionId, session);

    // Generate new prompts
    const prompts = await generatePrompts(session.mode, lumaResponse, session.messages, { userId });

    return c.json({
      lumaMessage: lumaResponse,
      prompts,
      microCue: shouldTriggerMicroCue ? {
        type: microCueType,
        data: microCueType === 'anchorpoint' ? {
          text: 'The resistance might be the way through'
        } : undefined
      } : null
    });
  } catch (error) {
    console.error('Error processing message:', error);
    return c.json({ error: 'Failed to process message' }, 500);
  }
});

// Save anchor point
app.post('/:sessionId/anchor-point', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const { messageId, userId } = await c.req.json();

    const session = await store.get(sessionId);
    if (!session) {
      return c.json({ error: 'Session not found' }, 404);
    }

    const message = session.messages.find((m: any) => m.timestamp === messageId);
    if (!message || message.role !== 'luma') {
      return c.json({ error: 'Message not found or not a LUMA message' }, 400);
    }

    // Save anchor point to user's collection
    const anchorPointId = `ap_${userId}_${Date.now()}`;
    await store.set(anchorPointId, {
      text: message.content,
      mode: session.mode,
      userId,
      sessionId,
      sourceType: 'dialogue',
      timestamp: new Date().toISOString()
    });

    // Add to user's anchor points list
    const userAnchorPoints = await store.get(`user_${userId}_anchorpoints`) || [];
    userAnchorPoints.push(anchorPointId);
    await store.set(`user_${userId}_anchorpoints`, userAnchorPoints);

    return c.json({
      success: true,
      anchorPointId
    });
  } catch (error) {
    console.error('Error saving anchor point:', error);
    return c.json({ error: 'Failed to save anchor point' }, 500);
  }
});

export default app;