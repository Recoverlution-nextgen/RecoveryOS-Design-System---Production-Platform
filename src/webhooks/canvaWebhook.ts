/**
 * CANVA WEBHOOK HANDLER
 *
 * Handles real-time webhooks from Canva for design updates
 * Automatically triggers asset re-processing when designs change
 */

import { CanvaWebhookHandler } from '../services/canvaConnect';

export interface CanvaWebhookPayload {
  eventType: string;
  designId: string;
  userId: string;
  timestamp: string;
  changes?: {
    title?: { from: string; to: string };
    updated_at?: string;
    thumbnail?: boolean;
  };
}

/**
 * Webhook endpoint handler for Canva events
 * This would typically be deployed as a serverless function or API endpoint
 */
export async function handleCanvaWebhook(request: Request): Promise<Response> {
  try {
    // Verify webhook signature (in production)
    const signature = request.headers.get('X-Canva-Signature');
    if (!signature) {
      return new Response('Missing signature', { status: 401 });
    }

    // Parse webhook payload
    const payload: CanvaWebhookPayload = await request.json();

    console.log('Received Canva webhook:', payload);

    // Handle different event types
    switch (payload.eventType) {
      case 'design.updated':
        await handleDesignUpdate(payload);
        break;

      case 'design.created':
        await handleDesignCreate(payload);
        break;

      case 'design.deleted':
        await handleDesignDelete(payload);
        break;

      default:
        console.log(`Unhandled webhook event type: ${payload.eventType}`);
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Webhook processing failed:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

/**
 * Handle design update events
 */
async function handleDesignUpdate(payload: CanvaWebhookPayload): Promise<void> {
  const { designId } = payload;

  console.log(`Processing design update for ${designId}`);

  try {
    // Use the webhook handler from canvaConnect service
    await CanvaWebhookHandler.handleDesignUpdate({
      designId,
      eventType: payload.eventType,
      ...payload
    });

    console.log(`Successfully processed design update for ${designId}`);

  } catch (error) {
    console.error(`Failed to process design update for ${designId}:`, error);
    // In production, you might want to retry or send alerts
  }
}

/**
 * Handle design creation events
 */
async function handleDesignCreate(payload: CanvaWebhookPayload): Promise<void> {
  const { designId } = payload;

  console.log(`New design created: ${designId}`);

  // For new designs, we might want to automatically import them
  // if they match certain criteria (e.g., in a specific folder)
  // This would require additional logic to determine if auto-import is desired

  try {
    // Check if auto-import is enabled for this user/design
    const shouldAutoImport = await checkAutoImportEligibility(designId);

    if (shouldAutoImport) {
      console.log(`Auto-importing new design ${designId}`);
      await CanvaWebhookHandler.handleDesignUpdate({
        designId,
        eventType: 'design.created',
        ...payload
      });
    } else {
      console.log(`Skipping auto-import for design ${designId}`);
    }

  } catch (error) {
    console.error(`Failed to process design creation for ${designId}:`, error);
  }
}

/**
 * Handle design deletion events
 */
async function handleDesignDelete(payload: CanvaWebhookPayload): Promise<void> {
  const { designId } = payload;

  console.log(`Design deleted: ${designId}`);

  try {
    // Mark corresponding asset as inactive or delete it
    await markAssetInactive(designId);

    console.log(`Marked asset inactive for deleted design ${designId}`);

  } catch (error) {
    console.error(`Failed to process design deletion for ${designId}:`, error);
  }
}

/**
 * Check if a design should be auto-imported
 */
async function checkAutoImportEligibility(designId: string): Promise<boolean> {
  // This would check user preferences, design metadata, etc.
  // For now, return false to require manual import
  return false;
}

/**
 * Mark asset as inactive when design is deleted
 */
async function markAssetInactive(designId: string): Promise<void> {
  // This would update the asset record in Supabase
  // Implementation depends on your database setup
  console.log(`Would mark asset inactive for design ${designId}`);
}

/**
 * Webhook verification middleware
 */
export function verifyCanvaWebhook(request: Request): boolean {
  const signature = request.headers.get('X-Canva-Signature');
  const timestamp = request.headers.get('X-Canva-Timestamp');

  if (!signature || !timestamp) {
    return false;
  }

  // In production, verify the signature using your webhook secret
  // const expectedSignature = crypto.createHmac('sha256', WEBHOOK_SECRET)
  //   .update(`${timestamp}.${body}`)
  //   .digest('hex');

  // return signature === expectedSignature;

  // For development, accept all webhooks
  return true;
}

/**
 * Express.js route handler (for traditional server setup)
 */
export function canvaWebhookRoute(req: any, res: any): void {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!verifyCanvaWebhook(req)) {
    res.status(401).json({ error: 'Invalid signature' });
    return;
  }

  handleCanvaWebhook(req)
    .then(() => res.status(200).json({ status: 'ok' }))
    .catch((error) => {
      console.error('Webhook route error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

/**
 * Next.js API route handler
 */
export async function canvaWebhookNextApi(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!verifyCanvaWebhook(req)) {
    res.status(401).json({ error: 'Invalid signature' });
    return;
  }

  try {
    const response = await handleCanvaWebhook(req);
    res.status(response.status).json({ status: 'ok' });
  } catch (error) {
    console.error('Next.js webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Fastify route handler
 */
export function canvaWebhookFastify(fastify: any, options: any, done: any): void {
  fastify.post('/webhooks/canva', async (request: any, reply: any) => {
    if (!verifyCanvaWebhook(request)) {
      reply.code(401).send({ error: 'Invalid signature' });
      return;
    }

    try {
      const response = await handleCanvaWebhook(request);
      reply.code(response.status).send({ status: 'ok' });
    } catch (error) {
      console.error('Fastify webhook error:', error);
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  done();
}

/**
 * Development webhook tester
 */
export async function testWebhook(payload: CanvaWebhookPayload): Promise<void> {
  console.log('Testing webhook with payload:', payload);

  const mockRequest = {
    headers: new Map([
      ['X-Canva-Signature', 'test-signature'],
      ['X-Canva-Timestamp', Date.now().toString()]
    ]),
    json: () => Promise.resolve(payload)
  } as any;

  const response = await handleCanvaWebhook(mockRequest);
  console.log('Webhook test response:', response.status);
}

// Export for use in different frameworks
export {
  handleCanvaWebhook as default,
  canvaWebhookRoute,
  canvaWebhookNextApi,
  canvaWebhookFastify,
  testWebhook
};