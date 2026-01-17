'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51ScRqvITiQLBtRtSwMZKmMUMDacy64zlI7HIyivpmDTsliowJkPznGKjeagrwpMSwvGwmtIKS0MouCQyCObuJ3A200lj7G3ATl';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface FoundingMemberCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  tier: 'foundation' | 'professional';
}

const tierConfig = {
  foundation: {
    name: 'Foundation',
    priceId: 'price_1ScSBTITiQLBtRtS3hCLHadj',
    price: '£99',
    normalPrice: '£99',
    savings: 'Get 3 months free when we launch April 1st',
    features: [
      'Practice infrastructure for sessions and billing',
      'Companion continuity for recurring revenue',
      'Session signals and engagement tracking',
      'Measurable outcomes and clinical insights',
      'Founding member community access'
    ]
  },
  professional: {
    name: 'Professional',
    priceId: 'price_1ScSCvITiQLBtRtS8nN0yiuZ',
    price: '£199',
    normalPrice: '£199',
    savings: 'Get 3 months free when we launch April 1st',
    features: [
      'Everything in Foundation',
      'Dynamic Package Builder',
      'Advanced intelligence and insights',
      'Defensible ROI reporting',
      'Priority founding member support'
    ]
  }
};

export default function FoundingMemberCheckout({ isOpen, onClose, tier }: FoundingMemberCheckoutProps) {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = tierConfig[tier];

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/founding-members/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            priceId: config.priceId,
            tier: tier,
            email: email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 9998,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              zIndex: 9999,
              borderRadius: '0px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Header with gradient */}
            <div
              style={{
                background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
                padding: '2.5rem',
                position: 'relative',
              }}
            >
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '2.5rem',
                  height: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '0px',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <X size={20} style={{ color: '#FFFFFF' }} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Sparkles size={20} style={{ color: '#FFFFFF' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    letterSpacing: '0.08em',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                  }}
                >
                  FOUNDING PRACTITIONER PROGRAM
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: '#FFFFFF',
                  marginBottom: '0.75rem',
                }}
              >
                {config.name}
              </h2>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: '#FFFFFF',
                  }}
                >
                  {config.price}
                </span>
                <span
                  style={{
                    fontSize: '1.125rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontWeight: 500,
                  }}
                >
                  one time
                </span>
              </div>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                }}
              >
                {config.savings}
              </p>
            </div>

            {/* Content */}
            <div style={{ padding: '2.5rem' }}>
              {/* Features */}
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    letterSpacing: '-0.01em',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  What you get:
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {config.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2
                        size={20}
                        style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '0.125rem' }}
                        strokeWidth={2.5}
                      />
                      <span
                        style={{
                          fontSize: '0.9375rem',
                          lineHeight: 1.6,
                          color: 'var(--color-text-secondary)',
                          fontWeight: 500,
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    letterSpacing: '-0.01em',
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    border: '2px solid var(--color-border)',
                    borderRadius: '0px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: '#DC2626',
                      fontWeight: 500,
                    }}
                  >
                    {error}
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '1.25rem 2rem',
                  backgroundColor: isProcessing ? 'var(--color-border)' : 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '-0.01em',
                  borderRadius: '0px',
                  border: 'none',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease',
                  opacity: isProcessing ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Secure Checkout
                    <Sparkles size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>

              {/* Fine Print */}
              <p
                style={{
                  fontSize: '0.8125rem',
                  lineHeight: 1.5,
                  color: 'var(--color-text-tertiary)',
                  textAlign: 'center',
                  marginTop: '1.5rem',
                  fontWeight: 500,
                }}
              >
                Secure payment powered by Stripe. Your founding member access starts immediately. Platform launches April 1st, 2025 with 3 months free subscription.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}