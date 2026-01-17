/**
 * MARKETING DEMO PAGE V2 - EXHIBITION-LEVEL BOOKING EXPERIENCE
 * 
 * Mission: Make scheduling a demo feel exciting, valuable, and seamless
 * Design DNA: Layered Floating Glass, premium infiniteK elegance
 * Philosophy: Build anticipation, showcase value, remove friction
 * 
 * GLASS UPGRADE (Nov 1, 2025):
 * - "What you'll experience" (4 tiles): Applied Economics compound glass treatment
 * - "Our promise to you" (3 tiles): Applied Economics compound glass treatment
 * - Bottom box REFINED: "Recovery is a journey" - reduced from oversized to subtle
 *   - Removed eyebrow badge
 *   - Reduced headline from clamp(1.875rem, 3.5vw, 2.5rem) to clamp(1.125rem, 1.8vw, 1.375rem)
 *   - Simplified three-phrase layout with smaller text and spacing
 * 
 * HORIZONTAL ICON + WHITE COPY TRANSFORMATION (Nov 1, 2025):
 * - "What you'll experience" (4 tiles):
 *   - Icon moved next to headline (horizontal row layout)
 *   - Full white copy throughout (headlines + descriptions)
 *   - Checkmarks replaced with buzz tags
 *   - Duration badge transformed to buzz tag style (white copy on glass)
 *   - Increased min-height (320px) to showcase asset backgrounds better
 * - "Our promise to you" (3 tiles):
 *   - Icon moved next to headline (horizontal row layout)
 *   - Full white copy throughout
 *   - Copy box centered vertically with equal padding
 *   - Aligned formatting with "What you'll experience"
 * 
 * IMMERSIVE DEMO BOOKING SECTION (Nov 1, 2025):
 * - NEW SECTION between "What you'll experience" and "Our promise to you"
 * - THE PRIMARY CONVERSION MOMENT - moved from buried bottom section
 * - Split layout: Left = Value proposition (4 benefits), Right = Booking action
 * - Premium purple-to-purple gradient with cyan accents
 * - Large glass container with shimmer effects
 * - Clear "30 minutes" messaging with calendar icon
 * - Trust elements: "No commitment" + "Cancel anytime"
 * 
 * PODCAST PROMOTION (Nov 1, 2025):
 * - Transformed final "Ready to see it live?" CTA into Recovery Rewired podcast promotion
 * - Links to https://recoveryrewired.com
 * - "Want to hear more about our science, story, and soul?"
 * - Same premium glass treatment as Science page final section
 * - Three value props: Neuroscience deep dives, Patient stories, Evidence insights
 * - Headphones icon + Radio eyebrow badge
 * 
 * Created: October 27, 2025
 * Transformed: November 1, 2025 - Immersive Booking + Podcast Promotion
 */

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Calendar, Video, CheckCircle, Sparkles, Brain, Target, ChevronRight, Clock, Award, Send, Headphones, Mic, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { MarketingHeader } from '../MarketingHeader';
import { MarketingFooter } from '../MarketingFooter';
import { SEOHead } from '../SEOHead';
import { getPageSEO } from '../../utils/seo';
import { analytics } from '../../utils/analytics';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import FinalCTAClean from '../FinalCTAClean';
import { HeroClass } from '../marketing/universal';
import { DemoPageExperience } from '../DemoPageExperience';
import { DemoPagePromise } from '../DemoPagePromise';
import { DemoPageBooking } from '../DemoPageBooking';

// Hero Asset - Nov 6, 2025 Optimized
import { heroDemoOptimized } from '../../utils/heroAssets';
import finalCTAAsset from 'figma:asset/7b763a62c53248a14f65b031b79c6fafd2885219.png'; // Final CTA - Cyan chair

interface MarketingDemoPageV2Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onLogin?: () => void;
}

// Brand colors now managed in /utils/sectionStyles.tsx (BRAND_COLORS)
const BRAND = {
  dark: '#3E2BB8', // Needed for immersive booking section gradient
  mid: '#5739FB', // Needed for immersive booking section gradient
  cyan: '#40E0D0', // Needed for immersive booking section gradient
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

export function MarketingDemoPage({ onBack, onNavigate, onLogin }: MarketingDemoPageV2Props) {
  const [bookingStep, setBookingStep] = useState<'intro' | 'calendar' | 'confirmed'>('intro');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    notes: '',
    preferredTimeSlot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const seo = getPageSEO('demo');
  const workingDays = getNext5WorkingDays();

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
        setBookingStep('confirmed');
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

  return (
    <div className="min-h-screen bg-white">
      <SEOHead {...seo} />
      
      {/* Master Marketing Header - Demo page (no CTA button) */}
      <MarketingHeader 
        onNavigate={onNavigate}
        onEnterPlatform={onLogin}
        currentPage="demo"
      />

      {bookingStep === 'intro' && (
        <>
          {/* 🎨 HERO - Universal Component */}
          <HeroClass
            eyebrow="LIVE PLATFORM DEMO"
            eyebrowIcon={
              <Video 
                size={14}
                style={{ strokeWidth: 2.5 }} 
              />
            }
            headline={
              <>
                See recovery<br />
                <span style={{ color: '#40E0D0' }}>
                  in action
                </span>
              </>
            }
            subheadline="Schedule a personalized 30-minute walkthrough of the Recoverlution platform. See how neuroscience-backed recovery drives measurable outcomes."
            ctaText="SCHEDULE NOW"
            ctaOnClick={() => setBookingStep('calendar')}
            backgroundAsset={heroDemoOptimized}
            backgroundAssetAlt="Soft 3D icons on purple gradient representing demo features - plus, flower, cloud, connection"
            backgroundFilter="brightness(0.85) saturate(1.1)"
            overlayGradient="linear-gradient(180deg, rgba(10, 25, 47, 0.3) 0%, rgba(10, 25, 47, 0.1) 50%, rgba(10, 25, 47, 0.3) 100%)"
          />

          {/* WHAT YOU'LL EXPERIENCE - Universal Tile System */}
          <DemoPageExperience />

          {/* SIMPLIFIED BOOKING SECTION - Embedded form with TileClass benefits */}
          <DemoPageBooking />

          {/* OUR PROMISE TO YOU - Universal Tile System */}
          <DemoPagePromise />

          {/* FINAL CTA - CLEAN */}
          <FinalCTAClean 
            backgroundAsset={finalCTAAsset}
            eyebrow="READY TO BEGIN"
            headline="Join the Recoverlution"
            accentWord="Recoverlution"
            subtext="Schedule a personalized walkthrough and discover how Recoverlution transforms treatment delivery with neuroscience-backed tools."
            buttonText="SCHEDULE DEMO"
            onButtonClick={() => setBookingStep('calendar')}
            accentColor="#5739FB"
            EyebrowIcon={Sparkles}
          />
        </>
      )}

      {bookingStep === 'calendar' && (
        <section className="py-24 md:py-32 bg-white min-h-screen">
          <div className="max-w-2xl mx-auto px-6 md:px-12">
            
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Eyebrow Badge - Current Homepage Style */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 backdrop-blur-sm border border-white/30"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0px'
                  }}
                >
                  <Calendar 
                    size={18} 
                    style={{ 
                      color: BRAND.cyan,
                      strokeWidth: 2
                    }} 
                  />
                  <span 
                    className="uppercase tracking-wider"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      letterSpacing: '0.15em',
                      color: BRAND.cyan
                    }}
                  >
                    SCHEDULE YOUR WALKTHROUGH
                  </span>
                </div>
              </motion.div>

              <h2 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 800, 
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                  marginBottom: '1rem'
                }}
              >
                Let's{' '}
                <span style={{ 
                  color: BRAND.cyan,
                  textShadow: `0 0 40px ${BRAND.cyan}30`
                }}>
                  connect
                </span>
              </h2>
              <p
                style={{
                  fontSize: '1.0625rem',
                  color: '#6B7280',
                  fontWeight: 500,
                  maxWidth: '28rem',
                  margin: '0 auto',
                  lineHeight: 1.6
                }}
              >
                Share your details and preferred time. Our team will confirm within 24 hours.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="border"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 100%),
                  radial-gradient(circle at 30% 20%, ${BRAND.cyan}03 0%, transparent 50%)
                `,
                borderColor: `${BRAND.cyan}12`,
                borderRadius: '0px',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                padding: 'clamp(2rem, 4vw, 2.5rem)'
              }}
            >
              
              <div className="space-y-6">
                
                {/* Top Row - 2 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#374151',
                        marginBottom: '0.5rem'
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
                        border: `1px solid rgba(209, 213, 219, 0.5)`,
                        borderRadius: '0px',
                        fontSize: '0.9375rem',
                        fontFamily: 'var(--font-sans)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = BRAND.cyan;
                        e.target.style.boxShadow = `0 0 0 3px ${BRAND.cyan}08`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                        e.target.style.boxShadow = 'none';
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
                        color: '#374151',
                        marginBottom: '0.5rem'
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
                        border: `1px solid rgba(209, 213, 219, 0.5)`,
                        borderRadius: '0px',
                        fontSize: '0.9375rem',
                        fontFamily: 'var(--font-sans)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = BRAND.cyan;
                        e.target.style.boxShadow = `0 0 0 3px ${BRAND.cyan}08`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Second Row - 2 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="organization"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#374151',
                        marginBottom: '0.5rem'
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
                        border: `1px solid rgba(209, 213, 219, 0.5)`,
                        borderRadius: '0px',
                        fontSize: '0.9375rem',
                        fontFamily: 'var(--font-sans)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = BRAND.cyan;
                        e.target.style.boxShadow = `0 0 0 3px ${BRAND.cyan}08`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                        e.target.style.boxShadow = 'none';
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
                        color: '#374151',
                        marginBottom: '0.5rem'
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
                        border: `1px solid rgba(209, 213, 219, 0.5)`,
                        borderRadius: '0px',
                        fontSize: '0.9375rem',
                        fontFamily: 'var(--font-sans)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = BRAND.cyan;
                        e.target.style.boxShadow = `0 0 0 3px ${BRAND.cyan}08`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* PREFERRED TIME SLOT SELECTOR - More Elegant */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#374151',
                      marginBottom: '0.75rem'
                    }}
                  >
                    Preferred Time *
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                                key={`${dayIndex}-${period}`}
                                type="button"
                                onClick={() => setFormData({ ...formData, preferredTimeSlot: slotValue })}
                                className="group relative overflow-hidden"
                                style={{
                                  padding: '0.875rem 1rem',
                                  border: isSelected 
                                    ? `2px solid ${BRAND.cyan}` 
                                    : `1px solid rgba(209, 213, 219, 0.5)`,
                                  borderRadius: '0px',
                                  background: isSelected
                                    ? `linear-gradient(135deg, ${BRAND.cyan}08, ${BRAND.cyan}04)`
                                    : 'rgba(255, 255, 255, 0.9)',
                                  fontFamily: 'var(--font-display)',
                                  fontWeight: isSelected ? 700 : 600,
                                  fontSize: '0.8125rem',
                                  letterSpacing: '0.02em',
                                  color: isSelected ? BRAND.cyan : '#6B7280',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                  boxShadow: isSelected
                                    ? `0 2px 8px ${BRAND.cyan}15, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                                    : 'none',
                                  textAlign: 'left'
                                }}
                              >
                                <span className="relative flex items-center justify-between gap-2">
                                  <span style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    gap: '0.125rem'
                                  }}>
                                    <span style={{ 
                                      fontSize: '0.75rem',
                                      opacity: 0.7,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.05em'
                                    }}>
                                      {dateStr}
                                    </span>
                                    <span>{period}</span>
                                  </span>
                                  {isSelected && (
                                    <CheckCircle 
                                      size={16} 
                                      style={{ 
                                        color: BRAND.cyan,
                                        flexShrink: 0
                                      }} 
                                    />
                                  )}
                                </span>
                              </button>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Anything specific you'd like to discuss? (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="Tell us about your facility and key interests..."
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: `1px solid rgba(209, 213, 219, 0.5)`,
                      borderRadius: '0px',
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-sans)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.2s',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = BRAND.cyan;
                      e.target.style.boxShadow = `0 0 0 3px ${BRAND.cyan}08`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      padding: '1rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '0px',
                      color: '#DC2626',
                      fontSize: '0.875rem'
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setBookingStep('intro')}
                    className="group relative overflow-hidden"
                    style={{
                      padding: '1rem 1.5rem',
                      border: `1px solid rgba(209, 213, 219, 0.5)`,
                      borderRadius: '0px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      letterSpacing: '0.05em',
                      color: '#6B7280',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      flex: '0 0 auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#9CA3AF';
                      e.currentTarget.style.color = '#374151';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                      e.currentTarget.style.color = '#6B7280';
                    }}
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                      BACK
                    </span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden"
                    style={{
                      padding: '1rem 2rem',
                      background: isSubmitting 
                        ? `linear-gradient(135deg, ${BRAND.cyan}80, ${BRAND.mid}80)`
                        : `linear-gradient(135deg, ${BRAND.cyan}, ${BRAND.mid})`,
                      border: 'none',
                      borderRadius: '0px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      letterSpacing: '0.08em',
                      color: '#FFFFFF',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: isSubmitting
                        ? `0 8px 24px ${BRAND.cyan}15`
                        : `
                          0 12px 32px ${BRAND.cyan}30,
                          0 4px 12px ${BRAND.cyan}20,
                          inset 0 1px 0 rgba(255, 255, 255, 0.3)
                        `,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      flex: '1 1 auto'
                    }}
                  >
                    <span className="relative flex items-center justify-center gap-2.5">
                      {isSubmitting ? (
                        <>
                          <div
                            style={{
                              width: '16px',
                              height: '16px',
                              border: '2px solid rgba(255, 255, 255, 0.3)',
                              borderTop: '2px solid #FFFFFF',
                              borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite'
                            }}
                          />
                          SUBMITTING...
                        </>
                      ) : (
                        <>
                          CONFIRM TIME
                          <Send size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </div>

              </div>

            </motion.form>

          </div>
        </section>
      )}

      {bookingStep === 'confirmed' && (
        <section className="py-32 md:py-40 bg-white min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center justify-center mb-8"
                style={{
                  width: '5rem',
                  height: '5rem',
                  background: `linear-gradient(135deg, ${BRAND.cyan}, #2EBFAF)`,
                  borderRadius: '0px',
                  boxShadow: `
                    0 20px 60px ${BRAND.cyan}40,
                    inset 0 2px 0 rgba(255, 255, 255, 0.3)
                  `
                }}
              >
                <CheckCircle size={48} style={{ color: '#FFFFFF' }} />
              </div>

              <h2 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 800, 
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                  marginBottom: '1.5rem'
                }}
              >
                Demo request received!
              </h2>

              <p
                style={{
                  fontSize: '1.25rem',
                  lineHeight: 1.6,
                  color: '#6B7280',
                  fontWeight: 500,
                  marginBottom: '1rem'
                }}
              >
                Thank you for your interest in Recoverlution. Our team will review your request and reach out within 24 hours to confirm your demo.
              </p>

              {formData.preferredTimeSlot && (
                <div
                  className="inline-block border mb-8"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.lightPurple}, rgba(255, 255, 255, 0.9))`,
                    borderColor: `${BRAND.mid}20`,
                    borderRadius: '0px',
                    padding: '1.5rem 2rem',
                    boxShadow: `0 8px 24px ${BRAND.mid}10`
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: BRAND.mid,
                      letterSpacing: '0.05em',
                      marginBottom: '0.5rem'
                    }}
                  >
                    YOUR PREFERRED TIME
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#111827'
                    }}
                  >
                    {formData.preferredTimeSlot}
                  </div>
                </div>
              )}

              <button
                onClick={onBack}
                className="group"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.mid}, ${BRAND.dark})`,
                  border: 'none',
                  borderRadius: '0px',
                  padding: '1rem 2.5rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  letterSpacing: '0.05em',
                  color: '#FFFFFF',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer',
                  boxShadow: `
                    0 8px 24px ${BRAND.mid}30,
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
                  transition: 'all 0.3s'
                }}
              >
                RETURN TO HOMEPAGE
              </button>

            </motion.div>

          </div>
        </section>
      )}

      {/* Master Marketing Footer - only show on intro step */}
      {bookingStep === 'intro' && <MarketingFooter onNavigate={onNavigate} />}

      {/* Shimmer Animation Keyframes */}
      <style>{`
        @keyframes shimmer-glass {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0.3;
          }
          50% {
            transform: translateX(100%);
            opacity: 0.8;
          }
        }
      `}</style>

    </div>
  );
}
