/**
 * Journey Landing Page - infiniteK Design System
 * 
 * DESIGN PRINCIPLES - Anchored by PlatformPageHeader (320px):
 * - Heights in multiples of 160px (half header): 160px, 320px, 480px
 * - Hero: 480px (1.5x header height)
 * - Cards: 320px (matches header) or content-based
 * - Padding scale: 28px (mobile) / 48px (tablet) / 64px (desktop)
 * - Gap scale: 24px (mobile) / 32px (desktop)
 * - Border radius: 0px (infiniteK rule)
 * - Glass: bg-white/10, backdrop-blur-32px, border-white/20
 * - Shadows: 0 8px 32px rgba(0,0,0,0.12)
 * 
 * THE ANCHOR RULE: NO CARD ON CARD. NO BORDER ON BORDER.
 */

import { useState, useEffect } from 'react';
import { PlatformPageHeader } from '../PlatformPageHeader';
import { CheckCircle2, Circle, BookOpen, Play } from 'lucide-react';
import { DASHBOARD_ASSETS } from '../../utils/dashboardAssets';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId } from '../../utils/supabase/info';

interface JourneyLandingPageProps {
  patientId?: string | null;
  onNavigate?: (page: string) => void;
  onBeginPractice?: () => void;
}

// Journey Page specific assets
const JOURNEY_PAGE_ASSETS = {
  ripplePattern: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Platform/Journey%20Page/3D%20PATTERN%20_%20ripple%20blue.webp'
};

// Design system constants (anchored to 320px header)
const DESIGN = {
  heights: {
    hero: 280,      // Compact hero
    card: 320,      // matches header
    compact: 160    // 0.5x header
  },
  padding: {
    mobile: 24,
    tablet: 40,
    desktop: 48
  },
  gap: {
    mobile: 20,
    desktop: 24
  }
};

// Responsive breakpoints
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024
};

// Weekly content structure - ERA pattern (Experience → Recognize → Align)
const WEEK_INTRO = {
  pillar: 'Navigate',
  theme: 'Buy 2 Seconds',
  title: 'Learning to Pause',
  context: 'This week you will learn to notice the space between trigger and response. This space is where your power lives. Most people react automatically, but you are learning to pause, to choose, to respond with intention.'
};

// Practice moments - ERA pattern (Experience → Recognize → Align)
// "Time is Now" model - no day assignments, just sequential phases
const WEEK_DAYS = [
  { 
    day: 1,
    phase: 'Experience',
    cycle: 'E1',
    focus: 'Notice the space',
    cue: 'As you go about your day today, just catch yourself once. When something pushes your buttons, notice it. Feel the space between what happened and how you want to respond. That space is your power.'
  },
  { 
    day: 2,
    phase: 'Recognize',
    cycle: 'R1',
    focus: 'What did you feel',
    cue: 'Yesterday you noticed the gap. Today, bring it back. What did you feel in your body. What thoughts came up. Did the urge fade, or did it demand more.'
  },
  { 
    day: 3,
    phase: 'Align',
    cycle: 'A1',
    focus: 'Choose your response',
    cue: 'As you go about your day today, when you catch the trigger, choose your next move. Not your old pattern. Your new choice. Name three things you could do instead. Pick the hardest one. Do it.'
  },
  { 
    day: 4,
    phase: 'Experience',
    cycle: 'E2',
    focus: 'Spot your warning signs',
    cue: 'As you go about your day today, notice the moment before the urge takes over. Your body signals the trigger before your mind catches up. Tight chest. Clenched jaw. Racing heart. What is yours.'
  },
  { 
    day: 5,
    phase: 'Recognize',
    cycle: 'R2',
    focus: 'Where do you feel it',
    cue: 'Yesterday you spotted the warning signs. Today, get specific. Where in your body do you feel the impulse. Is it your throat. Your gut. Your hands. The more precise you are, the faster you can catch it next time.'
  },
  { 
    day: 6,
    phase: 'Align',
    cycle: 'A2',
    focus: 'What did you choose',
    cue: 'Yesterday you chose differently. Today, sit with this question: What does freedom from urgency feel like. Not freedom from feeling, but freedom from being controlled by the feeling. Notice the difference.'
  },
  { 
    day: 7,
    phase: 'Integrate',
    cycle: 'Weekly',
    focus: 'Who are you becoming',
    cue: 'I am someone who can pause before acting. Say it out loud. Write it down. What did you learn about yourself this week. This is who you are becoming.'
  }
];

export function JourneyLandingPage({ patientId, onNavigate, onBeginPractice }: JourneyLandingPageProps) {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [showGuide, setShowGuide] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // ⚡ Performance: Detect mobile for optimized rendering
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // ⚡ Performance: Preload critical assets
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = JOURNEY_PAGE_ASSETS.ripplePattern;
    preloadImage.onload = () => setImageLoaded(true);
    
    // Preload journey asset for hero card
    const preloadJourney = new Image();
    preloadJourney.src = DASHBOARD_ASSETS.journey;
  }, []);
  
  // Load completion state
  useEffect(() => {
    const completed = localStorage.getItem(`journey_completed_days_${patientId || 'demo'}`);
    if (completed) {
      setCompletedDays(JSON.parse(completed));
    }
    
    // Set selected day to first incomplete day
    const completedParsed = completed ? JSON.parse(completed) : [];
    for (let i = 1; i <= 7; i++) {
      if (!completedParsed.includes(i)) {
        setSelectedDay(i);
        break;
      }
    }
  }, [patientId]);
  
  const currentDayInfo = WEEK_DAYS[selectedDay - 1];
  const currentDayComplete = completedDays.includes(selectedDay);
  const weekProgress = (completedDays.length / 7) * 100;
  
  const handleStartFlow = () => {
    // Start flow mode from day 1
    localStorage.setItem('journey_flow_mode', 'true');
    if (onBeginPractice) {
      onBeginPractice();
    }
  };
  
  // Navigation for header
  const headerNav = (
    <>
      <button
        onClick={() => setShowGuide(!showGuide)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.9)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '6px 12px',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
        }}
      >
        <BookOpen size={14} />
        GUIDE
      </button>
      
      <button
        onClick={handleStartFlow}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.9)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '6px 12px',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
        }}
      >
        <Circle size={14} style={{ fill: 'currentColor' }} />
        FLOW
      </button>
      
      <button
        onClick={() => {/* TODO: Navigate to previous weeks */}}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.9)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '6px 12px',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
        }}
      >
        <Play size={14} />
        EXPLORE
      </button>
    </>
  );
  
  return (
    <div style={{ 
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)'
    }}>
      {/* Header */}
      <PlatformPageHeader
        page="Journey"
        headline="Your weekly practice"
        navigation={headerNav}
      />
      
      {/* Guide Overlay */}
      {showGuide && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '20px' : '32px'
        }}
        onClick={() => setShowGuide(false)}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '740px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 20px 60px rgba(62, 43, 184, 0.10)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ripple Pattern Background - Full coverage */}
            {imageLoaded && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0
              }}>
                <ImageWithFallback
                  src={JOURNEY_PAGE_ASSETS.ripplePattern}
                  alt=""
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
            )}
            
            {/* Content */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              padding: isMobile ? '40px 24px' : '56px 48px',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}>
              {/* Title */}
              <h2 style={{ 
                margin: '0 0 20px 0',
                fontSize: isMobile ? '1.75rem' : '2.25rem',
                lineHeight: '1.15',
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                fontWeight: 600
              }}>
                How Journey Works
              </h2>
              
              {/* ERA Pattern Intro */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  margin: '0 0 12px 0',
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}>
                  The ERA Pattern
                </h3>
                <p style={{ 
                  margin: 0,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  lineHeight: '1.7',
                  color: '#FFFFFF',
                  opacity: 0.95,
                  letterSpacing: '0.002em'
                }}>
                  Journey is not a course. It is a guided process of self regulation, repatterning, and identity integration. 
                  Each week moves through a lived arc of experience, recognition, and alignment. Not lectures. Not modules. 
                  Something you do and feel.
                </p>
              </div>
              
              {/* E · Experience */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  margin: '0 0 12px 0',
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}>
                  E · Experience
                </h3>
                <p style={{ 
                  margin: 0,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  lineHeight: '1.7',
                  color: '#FFFFFF',
                  opacity: 0.95,
                  letterSpacing: '0.002em'
                }}>
                  The body must feel it before the mind can name it. This is somatic exposure. Safe micro drills that regulate, 
                  sense, or disrupt patterns. You experience change in real time: breath shifts, tension drops, impulse fades. 
                  It builds implicit trust in recovery.
                </p>
              </div>
              
              {/* R · Recognize */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  margin: '0 0 12px 0',
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}>
                  R · Recognize
                </h3>
                <p style={{ 
                  margin: 0,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  lineHeight: '1.7',
                  color: '#FFFFFF',
                  opacity: 0.95,
                  letterSpacing: '0.002em'
                }}>
                  The story catches up to the state. Once the system is calmer, we introduce cognitive reflection. 
                  Noticing triggers, urges, and protective biases. The aim is meta awareness without judgment. 
                  This is where insight forms.
                </p>
              </div>
              
              {/* A · Align */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ 
                  margin: '0 0 12px 0',
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}>
                  A · Align
                </h3>
                <p style={{ 
                  margin: 0,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  lineHeight: '1.7',
                  color: '#FFFFFF',
                  opacity: 0.95,
                  letterSpacing: '0.002em'
                }}>
                  Action meets identity. Now we rehearse congruence. Taking small choices that embody the new pattern. 
                  The nervous system experiences coherence between values, actions, and body state. 
                  Over time, these micro alignments rewire default behaviour.
                </p>
              </div>
              
              {/* CTA Button */}
              <button
                onClick={() => setShowGuide(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  color: '#FFFFFF',
                  padding: isMobile ? '14px 28px' : '16px 32px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  letterSpacing: '0.02em',
                  width: '100%',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Content Area - Scrollable */}
      <div className="page-content">
        <div className="content-container" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${DESIGN.gap.desktop}px`
        }}>
          
          {/* HERO: Theme Introduction + Current Practice - Integrated */}
          <div className="card-hero" style={{
            minHeight: isMobile ? '520px' : '580px'
          }}>
            {/* Ripple Pattern Background - Full coverage */}
            {imageLoaded && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0
              }}>
                <ImageWithFallback
                  src={JOURNEY_PAGE_ASSETS.ripplePattern}
                  alt=""
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
            )}

            {/* Top Section: Week Intro - THE CONTEXT (60% of space) */}
            <div style={{ 
              position: 'relative', 
              zIndex: 2,
              padding: isMobile ? `${DESIGN.padding.desktop}px ${DESIGN.padding.mobile}px` : `${DESIGN.padding.desktop * 1.5}px ${DESIGN.padding.desktop}px`,
              flex: 1.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {/* Pillar → Theme Eyebrow */}
              <p className="text-eyebrow text-white" style={{ marginBottom: isMobile ? '10px' : '12px' }}>
                {WEEK_INTRO.pillar} · {WEEK_INTRO.theme}
              </p>

              {/* Title */}
              <h1 className="text-hero-headline text-white" style={{ 
                margin: isMobile ? '0 0 16px 0' : '0 0 20px 0'
              }}>
                {WEEK_INTRO.title}
              </h1>
              
              {/* Context */}
              <p className="text-body-hero text-white" style={{ 
                maxWidth: '680px'
              }}>
                {WEEK_INTRO.context}
              </p>
            </div>

            {/* Divider */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 20%, rgba(255, 255, 255, 0.25) 80%, transparent 100%)'
            }} />

            {/* Bottom Section: Current Practice - THE NEXT STEP (40% of space) */}
            {!currentDayComplete && (
              <div style={{ 
                position: 'relative', 
                zIndex: 2,
                padding: isMobile ? `${DESIGN.padding.mobile}px` : `${DESIGN.padding.desktop}px`,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  {/* Phase Label - Small and subtle */}
                  <p style={{ 
                    margin: '0 0 12px 0',
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: 600
                  }}>
                    {currentDayInfo.phase}
                  </p>
                  
                  {/* Focus Title - Smaller, actionable */}
                  <h2 style={{ 
                    margin: '0 0 16px 0',
                    color: '#FFFFFF',
                    fontSize: isMobile ? '1.375rem' : '1.625rem',
                    lineHeight: '1.25',
                    letterSpacing: '-0.02em',
                    fontWeight: 600
                  }}>
                    {currentDayInfo.focus}
                  </h2>
                  
                  {/* Cue - Compact */}
                  <p style={{ 
                    margin: 0,
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.65',
                    fontSize: isMobile ? '0.8125rem' : '0.875rem',
                    maxWidth: '680px',
                    whiteSpace: 'pre-line'
                  }}>
                    {currentDayInfo.cue}
                  </p>
                </div>
                
                {/* CTA Button - Consistent messaging */}
                <button
                  onClick={onBeginPractice}
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: isMobile ? '24px' : '32px',
                    background: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    color: '#FFFFFF',
                    padding: isMobile ? '14px 28px' : '16px 32px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    letterSpacing: '0.02em',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  }}
                >
                  Continue your journey
                </button>
              </div>
            )}

            {/* Complete State - Integrated */}
            {currentDayComplete && (
              <div style={{ 
                position: 'relative', 
                zIndex: 2,
                padding: isMobile ? `${DESIGN.padding.mobile}px` : `${DESIGN.padding.desktop}px`,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <CheckCircle2 
                    size={isMobile ? 40 : 48} 
                    color="#FFFFFF" 
                    style={{ marginBottom: '20px', opacity: 0.9 }}
                  />
                  <h3 style={{ 
                    margin: '0 0 12px 0', 
                    color: '#FFFFFF',
                    fontSize: isMobile ? '1.25rem' : '1.5rem'
                  }}>
                    Practice Complete
                  </h3>
                  <p style={{ 
                    margin: 0,
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: '1.65',
                    fontSize: '0.9375rem'
                  }}>
                    You showed up today. This is how change happens.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Minimal Progress Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '24px'
          }}>
            {WEEK_DAYS.map((weekDay) => {
              const isComplete = completedDays.includes(weekDay.day);
              const isCurrent = weekDay.day === selectedDay;
              
              return (
                <div
                  key={weekDay.day}
                  style={{
                    width: isCurrent ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: isComplete 
                      ? '#10B981' 
                      : isCurrent 
                        ? '#3E2BB8' 
                        : 'rgba(62, 43, 184, 0.12)',
                    transition: 'all 0.3s ease',
                    cursor: isComplete || isCurrent ? 'default' : 'not-allowed'
                  }}
                  title={`${weekDay.phase}: ${weekDay.focus}`}
                />
              );
            })}
            <p style={{
              margin: '0 0 0 16px',
              fontSize: '0.8125rem',
              color: '#9CA3AF',
              letterSpacing: '0.02em'
            }}>
              {completedDays.length} of 7
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}