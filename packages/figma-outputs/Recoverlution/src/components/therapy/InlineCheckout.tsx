'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface InlineCheckoutProps {
  tier: 'foundation' | 'professional';
  onBack: () => void;
}

const tierConfig = {
  foundation: {
    name: 'Foundation',
    priceId: 'price_1ScSBTITiQLBtRtS3hCLHadj',
    price: '£99',
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

export default function InlineCheckout({ tier, onBack }: InlineCheckoutProps) {
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
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/founding-members/create-checkout-session`;
      console.log('🔵 Calling checkout API:', url);
      console.log('🔵 Payload:', { priceId: config.priceId, tier, email });
      
      const response = await fetch(url, {
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
      });

      console.log('🔵 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔴 Error response:', errorText);
        throw new Error(`Failed to create checkout session: ${response.status}`);
      }

      const data = await response.json();
      console.log('🟢 Checkout session created:', data);
      const { sessionId, url: checkoutUrl } = data;

      // Redirect directly to Stripe Checkout URL (modern approach)
      if (checkoutUrl) {
        console.log('🟢 Redirecting to Stripe:', checkoutUrl);
        window.location.href = checkoutUrl;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('🔴 Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="group transition-all duration-300"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '-0.01em',
            borderRadius: '0px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          Back
        </button>
      </div>

      {/* Header */}
      <div className="text-center">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
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

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#FFFFFF',
            marginBottom: '0.75rem'
          }}
        >
          {config.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#FFFFFF',
            }}
          >
            {config.price}
          </span>
          <span
            style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 500,
            }}
          >
            one time
          </span>
        </div>

        <p
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 500,
            marginBottom: '2rem'
          }}
        >
          {config.savings}
        </p>
      </div>

      {/* Checkout Card */}
      <div className="max-w-2xl mx-auto">
        <div
          style={{
            padding: '2.5rem',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '0px'
          }}
        >
          {/* Features */}
          <div style={{ marginBottom: '2rem' }}>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.125rem',
                letterSpacing: '-0.01em',
                color: '#FFFFFF',
                marginBottom: '1.25rem',
              }}
            >
              What you get:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {config.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <CheckCircle2
                    size={20}
                    style={{ color: '#FFFFFF', flexShrink: 0, marginTop: '0.125rem' }}
                    strokeWidth={2.5}
                  />
                  <span
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.9)',
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
                color: '#FFFFFF',
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
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: '1rem 1.25rem',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '2px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '0px',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: '#FEE2E2',
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
              backgroundColor: isProcessing ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.125rem',
              letterSpacing: '-0.01em',
              borderRadius: '0px',
              border: '2px solid rgba(255, 255, 255, 0.5)',
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
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
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
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              marginTop: '1.5rem',
              fontWeight: 500,
            }}
          >
            Secure payment powered by Stripe. Your founding member access starts immediately. Platform launches April 1st, 2025 with 3 months free subscription.
          </p>
        </div>
      </div>
    </motion.div>
  );
}