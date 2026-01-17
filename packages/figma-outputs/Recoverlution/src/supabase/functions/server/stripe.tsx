/**
 * STRIPE UTILITIES FOR FOUNDING MEMBER CHECKOUT
 * 
 * Handles Stripe checkout sessions and webhook verification
 * for the Therapy founding member program.
 * 
 * Updated: Dec 21, 2025 - Force redeploy to pick up new secret key
 */

import Stripe from 'npm:stripe@17.5.0';

// Initialize Stripe with secret key
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

console.log('🔑 Stripe Secret Key check (REDEPLOYED):', {
  exists: !!stripeSecretKey,
  length: stripeSecretKey?.length || 0,
  prefix: stripeSecretKey?.substring(0, 7) || 'MISSING',
  timestamp: new Date().toISOString()
});

if (!stripeSecretKey) {
  console.error('🔴 CRITICAL: STRIPE_SECRET_KEY environment variable is not set!');
}

const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2024-11-20.acacia',
});

/**
 * Create a Stripe checkout session for founding member access
 */
export async function createCheckoutSession(params: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}) {
  try {
    console.log('🔵 Creating Stripe checkout session:', {
      priceId: params.priceId,
      customerEmail: params.customerEmail,
      metadata: params.metadata
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: params.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // One-time payment
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      customer_email: params.customerEmail,
      metadata: params.metadata || {},
      allow_promotion_codes: true,
    });

    console.log('🟢 Stripe session created successfully:', session.id);
    return { success: true, sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('🔴 Error creating Stripe checkout session:', error);
    console.error('🔴 Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
      raw: error.raw
    });
    return { success: false, error: error.message };
  }
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  webhookSecret: string
): Stripe.Event | null {
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    return event;
  } catch (error) {
    console.error('🔴 Webhook signature verification failed:', error.message);
    return null;
  }
}

/**
 * Get a Stripe checkout session by ID
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return { success: true, session };
  } catch (error) {
    console.error('🔴 Error retrieving checkout session:', error.message);
    return { success: false, error: error.message };
  }
}