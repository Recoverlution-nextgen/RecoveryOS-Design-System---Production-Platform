/**
 * DEMO PAGE - BOOKING SECTION
 * Simplified experience using TileClass for benefits + embedded booking form
 * 
 * Created: November 5, 2025
 * Replaces the large "Experience the platform" section and embedded calendar
 */

import React, { useState } from 'react';
import { Brain, Target, Award, Sparkles, Calendar, ArrowRight, CheckCircle, Video } from 'lucide-react';
import { motion } from 'motion/react';
import { TileClass, CentralisedHeadlineClass } from './marketing/universal';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { analytics } from '../utils/analytics';

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  cyan: '#40E0D0'
};

// Generate next 5 working days (Mon-Fri)
const getNext5WorkingDays = () => {
  const days = [];
  const today = new Date();
  let currentDate = new Date(today);
  
  while (days.length < 5) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.getDay();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(new Date(currentDate));
    }
  }
  
  return days;
};

export function DemoPageBooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    notes: '',
    preferredTimeSlot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workingDays = getNext5WorkingDays();

  const benefits = [
    {
      icon: Brain,
      title: 'ERA Framework',
      description: 'How the neuroscience maps to patient neuroplasticity',
      color: BRAND.mid
    },
    {
      icon: Target,
      title: 'Custom Integration',
      description: 'Content integration for your treatment approach',
      color: BRAND.mid
    },
    {
      icon: Award,
      title: 'ROI Modeling',
      description: 'Aligned to your strategic KPIs and outcomes',
      color: BRAND.cyan
    },
    {
      icon: Sparkles,
      title: 'Live Walkthrough',
      description: 'Patient and clinical dashboards in action',
      color: BRAND.cyan
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate preferred time slot is selected
    if (!formData.preferredTimeSlot) {
      setError('Please select a preferred time slot');
      setIsSubmitting(false);
      return;
    }

    analytics.track({ type: 'demo_booking_started' });

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString()
          })
        }
      );

      if (response.ok) {
        analytics.track({ type: 'demo_booked' });
        setIsConfirmed(true);
      } else {
        throw new Error('Booking failed');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('Something went wrong. Please try again or email us at hello@recoverlution.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <section className="py-32 md:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-24 h-24 mx-auto mb-8 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${BRAND.cyan}20, ${BRAND.cyan}10)`,
                border: `2px solid ${BRAND.cyan}30`,
                borderRadius: '0px',
                boxShadow: `0 12px 40px ${BRAND.cyan}20`
              }}
            >
              <CheckCircle size={48} style={{ color: BRAND.cyan, strokeWidth: 2 }} />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#111827',
                marginBottom: '1.5rem'
              }}
            >
              You're{' '}
              <span style={{ color: BRAND.cyan }}>
                all set
              </span>
            </h2>

            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#6B7280',
                marginBottom: '2rem',
                maxWidth: '32rem',
                margin: '0 auto'
              }}
            >
              We've received your request and will send a calendar invite within 24 hours. Check your email for confirmation and prep materials.
            </p>

            <div
              className="inline-flex items-center gap-2 px-6 py-3 mt-6"
              style={{
                background: `linear-gradient(135deg, ${BRAND.cyan}10, ${BRAND.cyan}05)`,
                border: `1px solid ${BRAND.cyan}20`,
                borderRadius: '0px'
              }}
            >
              <Calendar size={18} style={{ color: BRAND.cyan }} />
              <span
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#374151'
                }}
              >
                {formData.preferredTimeSlot}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-32 md:py-40 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.mid} 100%)` }}
    >
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" style={{ borderRadius: '0px' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl" style={{ borderRadius: '0px' }}></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Centralised Headline - Matches Homepage Pattern */}
        <CentralisedHeadlineClass
          eyebrow="YOUR PERSONALIZED WALKTHROUGH"
          eyebrowIcon={<Video size={14} style={{ strokeWidth: 2.5 }} />}
          eyebrowColor="#FFFFFF"
          eyebrowBackground={`linear-gradient(135deg, ${BRAND.cyan}15, ${BRAND.cyan}10)`}
          eyebrowBorder="rgba(255, 255, 255, 0.25)"
          headline={
            <>
              Experience{' '}
              <span style={{ 
                background: `linear-gradient(135deg, ${BRAND.cyan}, #40E0D0)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                the platform
              </span>
            </>
          }
          headlineColor="#FFFFFF"
          subheadline="Schedule a 30-minute walkthrough tailored to your facility. See the neuroscience, experience the platform, ask anything."
          subheadlineColor="rgba(255, 255, 255, 0.9)"
          marginBottom="mb-16"
        />

        {/* Benefits Grid - 4 Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {benefits.map((benefit, i) => (
            <TileClass
              key={i}
              icon={benefit.icon}
              iconColor={benefit.color}
              title={benefit.title}
              description={benefit.description}
              animationDelay={i * 0.1}
              minHeight="220px"
              gradientOverlay="linear-gradient(135deg, rgba(87, 57, 251, 0.08) 0%, rgba(62, 43, 184, 0.06) 100%)"
            />
          ))}
        </div>

        {/* Embedded Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="border"
            style={{
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%),
                radial-gradient(circle at 50% 50%, ${BRAND.cyan}12 0%, ${BRAND.mid}08 100%)
              `,
              borderColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '0px',
              backdropFilter: 'blur(40px) saturate(180%) brightness(1.15)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.15)',
              boxShadow: `
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 0 rgba(255, 255, 255, 0.05),
                0 32px 80px rgba(0, 0, 0, 0.3),
                0 12px 32px ${BRAND.cyan}20
              `,
              padding: 'clamp(2rem, 4vw, 3rem)'
            }}
          >
            {/* Form Header */}
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.cyan}25, ${BRAND.cyan}15)`,
                  border: `2px solid ${BRAND.cyan}40`,
                  borderRadius: '0px',
                  boxShadow: `inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 12px 40px ${BRAND.cyan}30`
                }}
              >
                <Calendar size={32} style={{ color: '#FFFFFF', strokeWidth: 1.5 }} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)'
                }}
              >
                Schedule Your Demo
              </h3>

              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                30 minutes · No commitment · Cancel anytime
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#FFFFFF',
                      marginBottom: '0.5rem',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0px',
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-sans)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = BRAND.cyan;
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#FFFFFF',
                      marginBottom: '0.5rem',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0px',
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-sans)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = BRAND.cyan;
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>
              </div>

              {/* Organization & Role Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="organization"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#FFFFFF',
                      marginBottom: '0.5rem',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    Organization *
                  </label>
                  <input
                    id="organization"
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0px',
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-sans)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = BRAND.cyan;
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#FFFFFF',
                      marginBottom: '0.5rem',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    Your Role *
                  </label>
                  <input
                    id="role"
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Clinical Director"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0px',
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-sans)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = BRAND.cyan;
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>
              </div>

              {/* Preferred Time Selector */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#FFFFFF',
                    marginBottom: '0.75rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Preferred Time *
                </label>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {workingDays.map((day, dayIndex) => {
                    const dateStr = day.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    });
                    
                    return (
                      <React.Fragment key={dayIndex}>
                        {['AM', 'PM'].map((period) => {
                          const slotValue = `${dateStr} - ${period}`;
                          const isSelected = formData.preferredTimeSlot === slotValue;

                          return (
                            <button
                              key={period}
                              type="button"
                              onClick={() => setFormData({ ...formData, preferredTimeSlot: slotValue })}
                              style={{
                                padding: '0.75rem 0.5rem',
                                border: isSelected 
                                  ? `2px solid ${BRAND.cyan}`
                                  : '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '0px',
                                background: isSelected
                                  ? `linear-gradient(135deg, ${BRAND.cyan}30, ${BRAND.cyan}20)`
                                  : 'rgba(255, 255, 255, 0.05)',
                                color: '#FFFFFF',
                                fontSize: '0.8125rem',
                                fontFamily: 'var(--font-display)',
                                fontWeight: isSelected ? 700 : 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                textAlign: 'center'
                              }}
                            >
                              <div>{dateStr.split(',')[0]}</div>
                              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                                {dateStr.split(' ')[1]} {dateStr.split(' ')[2]}
                              </div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '0.25rem' }}>
                                {period}
                              </div>
                            </button>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Notes (Optional) */}
              <div>
                <label
                  htmlFor="notes"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#FFFFFF',
                    marginBottom: '0.5rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Anything specific you'd like to discuss? (Optional)
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0px',
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-sans)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    transition: 'all 0.2s',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = BRAND.cyan;
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  style={{
                    padding: '0.875rem 1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0px',
                    color: '#FEE2E2',
                    fontSize: '0.875rem'
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden w-full mt-6"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.cyan}, #2EBFAF)`,
                  border: 'none',
                  borderRadius: '0px',
                  padding: '1.25rem 3rem',
                  boxShadow: `
                    0 24px 64px ${BRAND.cyan}50,
                    0 8px 24px ${BRAND.cyan}40,
                    inset 0 2px 0 rgba(255, 255, 255, 0.4)
                  `,
                  transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                <span 
                  className="flex items-center justify-center gap-3"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    letterSpacing: '0.08em',
                    color: '#FFFFFF',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {isSubmitting ? 'SCHEDULING...' : 'SCHEDULE DEMO'}
                  {!isSubmitting && (
                    <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
                  )}
                </span>
              </button>

            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
