/**
 * THERAPY CONVERSATION ENGINE
 * 
 * AI-powered conversational qualification and onboarding for therapists.
 * 
 * Flow:
 * 1. Discovery - Understand their practice
 * 2. Qualification - Confirm fit
 * 3. Objection Handling - Address concerns
 * 4. Readiness - Guide to signup
 * 
 * Backend: Supabase Edge Function
 * AI: OpenAI GPT-4 for curation
 * Storage: KV store for session management
 * 
 * Created: November 27, 2025
 */

import { Hono } from 'npm:hono';
import * as store from './simple-store.tsx';

const app = new Hono();

// Types
interface ConversationMessage {
  role: 'system' | 'therapist';
  content: string;
  timestamp: string;
}

interface ConversationInsights {
  practiceType?: 'addiction' | 'trauma' | 'anxiety' | 'general' | 'mixed';
  clientCount?: number;
  challenges?: string[];
  concerns?: string[];
  readinessScore: number;
}

interface ConversationSession {
  phase: 'discovery' | 'qualification' | 'objection' | 'readiness' | 'signup';
  messages: ConversationMessage[];
  insights: ConversationInsights;
  createdAt: string;
  updatedAt: string;
}

interface MessageRequest {
  sessionId?: string;
  message: string;
  phase?: string;
}

interface MessageResponse {
  sessionId: string;
  reply: string;
  contentToShow: ContentView;
  phase: string;
  readinessScore: number;
  quickReplies: string[];
  isReady: boolean;
}

interface ContentView {
  type: 'product-preview' | 'therapist-console' | 'privacy-security' | 'pricing' | 'signup-form' | 'success';
  title: string;
  description?: string;
  data?: any;
}

// Content Curation Mapping
const CONTENT_LIBRARY: { [key: string]: ContentView } = {
  'craving-navicue': {
    type: 'product-preview',
    title: 'NaviCue: Craving Regulation',
    description: 'What your client sees at moment of activation.',
    data: {
      pillarColor: '#E85D75',
      clientMessage: 'You seem activated right now. Your body is sending signals. Take three slow breaths.',
      therapistSignal: 'Activity: ↑ Regulation attempt logged',
      therapistInsight: 'Pattern: Evening activation (3 days this week)'
    }
  },
  'therapist-console': {
    type: 'therapist-console',
    title: 'Your Signal Dashboard',
    description: 'High-level engagement trends. Not surveillance.',
    data: {
      clients: [
        { name: 'Client A', engagement: 85, trend: 'up', lastActive: '2 hours ago' },
        { name: 'Client B', engagement: 62, trend: 'stable', lastActive: '1 day ago' },
        { name: 'Client C', engagement: 45, trend: 'down', lastActive: '4 days ago' }
      ]
    }
  },
  'privacy-architecture': {
    type: 'privacy-security',
    title: 'Privacy by Default',
    description: 'Clinical boundaries. Technical integrity.',
    data: {
      principles: [
        'Detailed data stays on client device',
        'You see trends and signals, not diaries',
        'End-to-end encryption for sensitive data',
        'HIPAA-aligned architecture',
        'Clear escalation paths for risk'
      ]
    }
  },
  'pricing-structure': {
    type: 'pricing',
    title: 'Simple Pricing',
    description: 'Add continuity revenue without complexity.',
    data: {
      therapist: '$49/month (unlimited clients)',
      client: '$29/month per client',
      model: 'You charge clients directly. We power infrastructure.'
    }
  }
};

// Readiness Scoring Algorithm
function calculateReadiness(insights: ConversationInsights, messages: ConversationMessage[]): number {
  let score = 0;
  
  // Has identified a clear problem/challenge (25 points)
  if (insights.challenges && insights.challenges.length > 0) {
    score += 25;
  }
  
  // Qualified practice profile (25 points)
  if (insights.practiceType && ['addiction', 'trauma', 'mixed'].includes(insights.practiceType)) {
    score += 15;
  }
  if (insights.clientCount && insights.clientCount >= 5 && insights.clientCount <= 50) {
    score += 10;
  }
  
  // Addressed concerns/objections (25 points)
  if (insights.concerns && insights.concerns.length > 0) {
    score += 25;
  }
  
  // Expressed intent/interest (25 points)
  const lastMessages = messages.slice(-3).map(m => m.content.toLowerCase());
  const intentKeywords = ['yes', 'ready', 'let\'s', 'show me', 'how do i', 'sign up', 'try'];
  const hasIntent = lastMessages.some(msg => 
    intentKeywords.some(keyword => msg.includes(keyword))
  );
  if (hasIntent) {
    score += 25;
  }
  
  return Math.min(100, score);
}

// Extract insights from conversation using simple pattern matching
function extractInsights(message: string, currentInsights: ConversationInsights): ConversationInsights {
  const lowerMessage = message.toLowerCase();
  const insights = { ...currentInsights };
  
  // Practice type detection
  if (lowerMessage.includes('addiction')) {
    insights.practiceType = lowerMessage.includes('trauma') ? 'mixed' : 'addiction';
  } else if (lowerMessage.includes('trauma')) {
    insights.practiceType = 'trauma';
  } else if (lowerMessage.includes('anxiety')) {
    insights.practiceType = 'anxiety';
  }
  
  // Client count extraction
  const numberMatch = lowerMessage.match(/(\d+)\s*(clients?|patients?)/);
  if (numberMatch) {
    insights.clientCount = parseInt(numberMatch[1]);
  }
  
  // Challenge detection
  if (!insights.challenges) insights.challenges = [];
  const challengeKeywords = ['gap', 'revert', 'dropout', 'fade', 'lose', 'struggle', 'between sessions'];
  challengeKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword) && !insights.challenges?.includes(keyword)) {
      insights.challenges?.push(keyword);
    }
  });
  
  // Concern detection
  if (!insights.concerns) insights.concerns = [];
  const concernKeywords = ['privacy', 'boundaries', 'time', 'cost', 'hipaa', 'security'];
  concernKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword) && !insights.concerns?.includes(keyword)) {
      insights.concerns?.push(keyword);
    }
  });
  
  return insights;
}

// Generate AI response using OpenAI
async function generateAIResponse(
  session: ConversationSession,
  userMessage: string
): Promise<{ reply: string; contentKey: string; quickReplies: string[] }> {
  
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured');
  }
  
  // Build conversation history for context
  const conversationHistory = session.messages.map(m => ({
    role: m.role === 'system' ? 'assistant' : 'user',
    content: m.content
  }));
  
  // System prompt
  const systemPrompt = `You are a conversational guide for Recoverlution's therapist onboarding.

BRAND VOICE:
- Direct, conversational, empowering
- No corporate jargon, no minimizing words
- "Apple for Addiction" - elegant simplicity
- Trauma-aware, therapist-respectful

YOUR GOAL:
1. Understand their practice (discovery)
2. Qualify fit (qualification)
3. Address concerns (objection handling)
4. Guide to signup (readiness)

QUALIFICATION CRITERIA:
- Works with addiction, trauma, anxiety, or complex populations
- 5-50 clients
- Independent or small group practice
- Values continuity and outcomes

CURRENT PHASE: ${session.phase}
READINESS SCORE: ${session.insights.readinessScore}

INSIGHTS SO FAR:
- Practice Type: ${session.insights.practiceType || 'unknown'}
- Client Count: ${session.insights.clientCount || 'unknown'}
- Challenges: ${session.insights.challenges?.join(', ') || 'none identified'}
- Concerns: ${session.insights.concerns?.join(', ') || 'none expressed'}

RULES:
- Keep responses under 50 words
- Ask ONE question at a time
- Show empathy for therapist challenges
- Never pushy or salesy
- Use "we" and "your" (collaborative)
- When readiness score > 75, guide toward signup
- End your response with a JSON object specifying content and quick replies

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:
[Your conversational response here]

METADATA: {"contentKey": "content-key-here", "quickReplies": ["Reply 1", "Reply 2"]}

AVAILABLE CONTENT KEYS:
- craving-navicue (for showing client experience)
- therapist-console (for showing therapist dashboard)
- privacy-architecture (for privacy concerns)
- pricing-structure (for cost questions)
- signup-form (when ready to sign up)

Respond to the therapist's message naturally, then include the METADATA line.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory,
          { role: 'user', content: userMessage }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiReply = data.choices[0].message.content;
    
    // Parse metadata from response
    const metadataMatch = aiReply.match(/METADATA:\s*({.*})/);
    let contentKey = 'craving-navicue'; // default
    let quickReplies: string[] = [];
    
    if (metadataMatch) {
      try {
        const metadata = JSON.parse(metadataMatch[1]);
        contentKey = metadata.contentKey || contentKey;
        quickReplies = metadata.quickReplies || [];
      } catch (e) {
        console.error('Failed to parse metadata:', e);
      }
    }
    
    // Remove metadata from reply
    const cleanReply = aiReply.replace(/METADATA:.*$/s, '').trim();
    
    return {
      reply: cleanReply,
      contentKey,
      quickReplies
    };
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Fallback response
    return {
      reply: "Tell me more about your practice. What challenges do you see most often?",
      contentKey: 'craving-navicue',
      quickReplies: ["Between-session dropout", "Privacy concerns", "Time constraints"]
    };
  }
}

// Determine next phase based on readiness
function determineNextPhase(readinessScore: number, currentPhase: string): string {
  if (readinessScore >= 75) return 'readiness';
  if (readinessScore >= 50) return 'objection';
  if (readinessScore >= 25) return 'qualification';
  return 'discovery';
}

// POST /message - Send message and get AI response
app.post('/message', async (c) => {
  try {
    const body: MessageRequest = await c.req.json();
    const { sessionId: providedSessionId, message } = body;
    
    // Generate or use existing session ID
    const sessionId = providedSessionId || `therapy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Get or create session
    let session: ConversationSession;
    const existingSession = await store.get<ConversationSession>(`conversation_${sessionId}`);
    
    if (existingSession) {
      session = existingSession;
    } else {
      // New session
      session = {
        phase: 'discovery',
        messages: [],
        insights: {
          readinessScore: 0
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    // Add therapist message
    session.messages.push({
      role: 'therapist',
      content: message,
      timestamp: new Date().toISOString()
    });
    
    // Extract insights from message
    session.insights = extractInsights(message, session.insights);
    
    // Calculate readiness score
    session.insights.readinessScore = calculateReadiness(session.insights, session.messages);
    
    // Generate AI response
    const { reply, contentKey, quickReplies } = await generateAIResponse(session, message);
    
    // Add system message
    session.messages.push({
      role: 'system',
      content: reply,
      timestamp: new Date().toISOString()
    });
    
    // Determine next phase
    session.phase = determineNextPhase(session.insights.readinessScore, session.phase) as any;
    session.updatedAt = new Date().toISOString();
    
    // Save session
    await store.set(`conversation_${sessionId}`, session);
    
    // Get content to show
    const contentToShow = CONTENT_LIBRARY[contentKey] || CONTENT_LIBRARY['craving-navicue'];
    
    // Check if ready for signup
    const isReady = session.insights.readinessScore >= 75;
    if (isReady) {
      contentToShow.type = 'signup-form';
      contentToShow.title = 'Create Your Account';
    }
    
    // Build response
    const response: MessageResponse = {
      sessionId,
      reply,
      contentToShow,
      phase: session.phase,
      readinessScore: session.insights.readinessScore,
      quickReplies,
      isReady
    };
    
    return c.json(response);
    
  } catch (error) {
    console.error('Error in /message:', error);
    return c.json({ 
      error: 'Failed to process message',
      details: error.message 
    }, 500);
  }
});

// GET /session/:sessionId - Retrieve session
app.get('/session/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const session = await store.get<ConversationSession>(`conversation_${sessionId}`);
    
    if (!session) {
      return c.json({ error: 'Session not found' }, 404);
    }
    
    return c.json(session);
    
  } catch (error) {
    console.error('Error in /session:', error);
    return c.json({ 
      error: 'Failed to retrieve session',
      details: error.message 
    }, 500);
  }
});

// POST /signup - Create therapist account
app.post('/signup', async (c) => {
  try {
    const { email, password, practiceName, sessionId } = await c.req.json();
    
    if (!email || !password || !practiceName) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // Create Supabase client with service role
    const { createClient } = await import('npm:@supabase/supabase-js@2.39.7');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    // Create user with admin API
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name: practiceName,
        role: 'therapist',
        practiceName,
        onboardedAt: new Date().toISOString()
      },
      email_confirm: true // Auto-confirm since no email server configured
    });
    
    if (createError) {
      console.error('Signup error:', createError);
      return c.json({ 
        error: 'Failed to create account',
        details: createError.message 
      }, 400);
    }
    
    // Generate access token for auto-login
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
    });
    
    if (sessionError) {
      console.error('Session generation error:', sessionError);
    }
    
    // Store therapist profile in KV
    await store.set(`therapist_${userData.user.id}`, {
      email,
      practiceName,
      role: 'therapist',
      clients: [],
      createdAt: new Date().toISOString(),
      conversationSessionId: sessionId
    });
    
    // Mark conversation as completed
    if (sessionId) {
      const session = await store.get<ConversationSession>(`conversation_${sessionId}`);
      if (session) {
        session.phase = 'signup';
        session.updatedAt = new Date().toISOString();
        await store.set(`conversation_${sessionId}`, session);
      }
    }
    
    return c.json({
      success: true,
      userId: userData.user.id,
      email: userData.user.email,
      // Note: For auto-login, frontend will need to use signInWithPassword
      message: 'Account created successfully'
    });
    
  } catch (error) {
    console.error('Error in /signup:', error);
    return c.json({ 
      error: 'Failed to create account',
      details: error.message 
    }, 500);
  }
});

export default app;