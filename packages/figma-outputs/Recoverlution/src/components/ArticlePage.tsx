/**
 * ARTICLE PAGE - Immersive Reading Experience
 * 
 * Philosophy: "Every word honors the effort of recovery"
 * 
 * Design Synergy:
 * - Journey: Poetic language, deep immersion, warmth in storytelling
 * - Navicue: Dynamic state tracking, visual progress indicators
 * - Wellbeing: Clinical + patient names, soft therapeutic colors
 * - Toolkit: Library architecture, practice integration
 * 
 * Innovation:
 * - Breathing reading rhythm with generous white space
 * - Embedded practices that feel like natural pauses
 * - Progress indicators that honor the journey
 * - Typography that invites presence, not speed
 * 
 * THE ANCHOR RULE: NO CARD ON CARD. Glass overlays on images, clean text on white.
 * infiniteK: Soft therapeutic colors, no emojis, meaningful language
 */

import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Clock, User, Tag, ChevronRight, Bookmark } from "lucide-react";
import { PracticeCard } from "./PracticeCard";

interface ArticleSection {
  type: "text" | "heading" | "quote" | "practice" | "reflection";
  content: string | any;
}

interface ArticlePageProps {
  id: string;
  title: string;
  subtitle: string;
  pillar: string;
  pillarClinical: string;
  pillarPatient: string;
  pillarColor: string;
  theme: string;
  themePatient: string;
  heroImage: string;
  thoughtLeader: string;
  readingTime: number;
  sections: ArticleSection[];
  onBack?: () => void;
  nextArticle?: {
    id: string;
    title: string;
    pillarPatient: string;
  };
}

export function ArticlePage({
  id,
  title,
  subtitle,
  pillar,
  pillarClinical,
  pillarPatient,
  pillarColor,
  theme,
  themePatient,
  heroImage,
  thoughtLeader,
  readingTime,
  sections,
  onBack,
  nextArticle
}: ArticlePageProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#FAFAFA',
      position: 'relative'
    }}>
      {/* Reading Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(62, 43, 184, 0.1)',
        zIndex: 1000
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${pillarColor} 0%, #5739FB 100%)`,
          transition: 'width 0.1s ease'
        }} />
      </div>

      {/* Back Button - Fixed */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'fixed',
            top: 'calc(72px + var(--spacing-4))',
            left: 'var(--spacing-6)',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            border: '1px solid rgba(62, 43, 184, 0.15)',
            padding: '12px 20px',
            borderRadius: 'var(--radius-none)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 100,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.5) inset';
          }}
        >
          <ArrowLeft className="w-4 h-4" style={{ color: '#3E2BB8' }} />
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#1A1A1A'
          }}>
            Back to Toolkit
          </span>
        </button>
      )}

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '60vh',
        minHeight: '500px',
        maxHeight: '700px',
        overflow: 'hidden'
      }}>
        {/* Hero Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}>
          <img
            src={heroImage}
            alt={`${title} - ${pillarPatient} article hero image`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.7) 100%)'
          }} />
        </div>

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--spacing-8) var(--spacing-6)',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: 'var(--spacing-3)'
          }}>
            <BookOpen className="w-4 h-4" style={{ color: '#FFFFFF' }} />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600
            }}>
              {pillarClinical}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            margin: '0 0 var(--spacing-3) 0',
            lineHeight: 1.2,
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0 0 var(--spacing-4) 0',
            lineHeight: 1.6,
            maxWidth: '700px'
          }}>
            {subtitle}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-none)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <User className="w-3 h-3" style={{ color: '#FFFFFF' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: '#FFFFFF',
                fontWeight: 600
              }}>
                {pillarPatient}
              </span>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-none)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Tag className="w-3 h-3" style={{ color: '#FFFFFF' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: '#FFFFFF',
                fontWeight: 600
              }}>
                {themePatient}
              </span>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-none)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Clock className="w-3 h-3" style={{ color: '#FFFFFF' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: '#FFFFFF',
                fontWeight: 600
              }}>
                {readingTime} minute read
              </span>
            </div>

            {thoughtLeader && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-none)'
              }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  color: '#FFFFFF',
                  fontWeight: 600
                }}>
                  {thoughtLeader}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'var(--spacing-12) var(--spacing-6)',
        background: '#FAFAFA'
      }}>
        {sections.map((section, index) => {
          if (section.type === "text") {
            return (
              <p
                key={index}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.125rem',
                  color: '#1A1A1A',
                  lineHeight: 1.8,
                  marginBottom: 'var(--spacing-6)',
                  opacity: 0.92
                }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            );
          }

          if (section.type === "heading") {
            return (
              <h2
                key={index}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: '#1A1A1A',
                  lineHeight: 1.3,
                  marginTop: 'var(--spacing-10)',
                  marginBottom: 'var(--spacing-4)',
                  paddingBottom: 'var(--spacing-3)',
                  borderBottom: `2px solid ${pillarColor}40`
                }}
              >
                {section.content}
              </h2>
            );
          }

          if (section.type === "quote") {
            return (
              <div
                key={index}
                style={{
                  background: `${pillarColor}08`,
                  border: `2px solid ${pillarColor}20`,
                  borderLeft: `4px solid ${pillarColor}`,
                  padding: 'var(--spacing-6)',
                  borderRadius: 'var(--radius-none)',
                  marginBottom: 'var(--spacing-6)'
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: '#1A1A1A',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  "{section.content}"
                </p>
              </div>
            );
          }

          if (section.type === "reflection") {
            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(32px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                  border: '1px solid rgba(62, 43, 184, 0.15)',
                  padding: 'var(--spacing-6)',
                  borderRadius: 'var(--radius-none)',
                  marginBottom: 'var(--spacing-6)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
                }}
              >
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#3E2BB8',
                  margin: '0 0 var(--spacing-3) 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Reflection Point
                </h4>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: '#1A1A1A',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {section.content}
                </p>
              </div>
            );
          }

          if (section.type === "practice") {
            return (
              <div key={index} style={{ marginBottom: 'var(--spacing-8)' }}>
                <PracticeCard
                  {...section.content}
                  context="embedded"
                  defaultExpanded={false}
                />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Next Article Card */}
      {nextArticle && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'var(--spacing-8) var(--spacing-6) var(--spacing-12) var(--spacing-6)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            border: '1px solid rgba(62, 43, 184, 0.15)',
            padding: 'var(--spacing-6)',
            borderRadius: 'var(--radius-none)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.5) inset';
          }}
          >
            <div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                color: '#9CA3AF',
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600
              }}>
                Continue Reading
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#1A1A1A',
                margin: '0 0 4px 0'
              }}>
                {nextArticle.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                color: '#6B7280',
                margin: 0
              }}>
                {nextArticle.pillarPatient}
              </p>
            </div>
            <ChevronRight className="w-6 h-6" style={{ color: '#3E2BB8', flexShrink: 0 }} />
          </div>
        </div>
      )}
    </div>
  );
}