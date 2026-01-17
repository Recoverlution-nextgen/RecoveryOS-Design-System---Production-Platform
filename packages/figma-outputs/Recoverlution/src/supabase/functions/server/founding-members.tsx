/**
 * FOUNDING MEMBERS API
 * 
 * Handles Stripe checkout sessions and webhook processing
 * for Recoverlution Continuity founding member program.
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { createCheckoutSession, verifyWebhookSignature, getCheckoutSession } from './stripe.tsx';

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

/**
 * POST /create-checkout-session
 * Creates a Stripe checkout session for founding member access
 */
app.post('/create-checkout-session', async (c) => {
  try {
    const body = await c.req.json();
    const { priceId, tier, email } = body;

    console.log('🔵 Checkout request received:', { priceId, tier, email });

    if (!priceId || !tier) {
      console.error('🔴 Missing required fields');
      return c.json({ error: 'Missing required fields: priceId, tier' }, 400);
    }

    // Create checkout session
    const result = await createCheckoutSession({
      priceId,
      successUrl: `${c.req.header('origin') || 'https://recoverlution.com'}/therapy?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${c.req.header('origin') || 'https://recoverlution.com'}/therapy`,
      customerEmail: email,
      metadata: {
        tier,
        program: 'founding_member',
        launch_date: '2025-04-01',
      },
    });

    if (!result.success) {
      console.error('🔴 Failed to create checkout session:', result.error);
      return c.json({ error: result.error || 'Failed to create checkout session' }, 500);
    }

    console.log('🟢 Checkout session created:', result.sessionId);
    return c.json({ 
      sessionId: result.sessionId,
      url: result.url 
    });
  } catch (error) {
    console.error('🔴 Error in create-checkout-session endpoint:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

/**
 * POST /webhook
 * Stripe webhook handler for payment events
 */
app.post('/webhook', async (c) => {
  try {
    const signature = c.req.header('stripe-signature');
    const rawBody = await c.req.text();

    if (!signature) {
      console.error('Missing stripe-signature header');
      return c.json({ error: 'Missing signature' }, 400);
    }

    // Verify webhook signature
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return c.json({ error: 'Webhook secret not configured' }, 500);
    }

    const event = verifyWebhookSignature(rawBody, signature, webhookSecret);
    if (!event) {
      console.error('Invalid webhook signature');
      return c.json({ error: 'Invalid signature' }, 400);
    }

    console.log(`✅ Received Stripe webhook: ${event.type}`);

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Extract data from session
      const customerEmail = session.customer_email || session.customer_details?.email;
      const customerId = session.customer;
      const paymentIntentId = session.payment_intent;
      const tier = session.metadata?.tier || 'unknown';
      const amountTotal = session.amount_total || 0;

      console.log('💳 Payment completed:', {
        email: customerEmail,
        tier,
        amount: amountTotal / 100,
      });

      // Store founding member in database
      const { data, error } = await supabase
        .from('founding_members_therapy')
        .insert({
          email: customerEmail,
          stripe_customer_id: customerId,
          stripe_payment_intent_id: paymentIntentId,
          tier,
          amount_paid: amountTotal / 100, // Convert from cents to pounds
          status: 'active',
          metadata: {
            session_id: session.id,
            launch_date: '2025-04-01',
            payment_date: new Date().toISOString(),
          },
        })
        .select()
        .single();

      if (error) {
        console.error('Error storing founding member:', error);
        // Don't return error to Stripe - payment succeeded
        // We'll handle this manually
      } else {
        console.log('✅ Founding member stored:', data);
      }

      // TODO: Send welcome email via Resend
      // This will be added in the next step
    }

    return c.json({ received: true });
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * GET /verify-session/:sessionId
 * Verify a checkout session after redirect
 */
app.get('/verify-session/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');

    if (!sessionId) {
      return c.json({ error: 'Missing session ID' }, 400);
    }

    const result = await getCheckoutSession(sessionId);

    if (!result.success) {
      return c.json({ error: 'Failed to retrieve session' }, 500);
    }

    const session = result.session;

    return c.json({
      success: session.payment_status === 'paid',
      email: session.customer_email || session.customer_details?.email,
      tier: session.metadata?.tier,
      amountPaid: session.amount_total ? session.amount_total / 100 : 0,
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;