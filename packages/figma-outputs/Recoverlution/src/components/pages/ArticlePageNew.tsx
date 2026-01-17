/**
 * ARTICLE PAGE - Unified Content System
 * 
 * Philosophy: "Every word honors the effort of recovery"
 * THE ANCHOR RULE: NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 * 
 * This component renders articles from the database with:
 * - Proper asset mapping (4:5 ratio images)
 * - Unified CSS styling (/styles/content.css)
 * - Clean typography (no ugly bullets)
 * - Brand-aligned footer
 * - Embedded practices
 */

import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Clock, User, Tag, ChevronRight } from "lucide-react";
import "../styles/content.css";

interface ArticleSection {
  type: "text" | "heading" | "quote" | "practice" | "reflection";
  content: string | any;
  heading?: string;
}

interface ArticlePageProps {
  // Article data from database
  id: string;
  title: string;
  subtitle: string;
  pillar_id: string;
  pillarClinical: string;
  pillarPatient: string;
  pillarColor: string;
  concept_id: string;
  theme_id: string;
  themePatient: string;
  asset_url?: string; // From content_assets table
  hero_image?: string; // Fallback if no asset
  thought_leader: string;
  read_time: number;
  difficulty: string;
  sections: ArticleSection[];
  
  // Navigation
  onBack?: () => void;
  nextArticle?: {
    id: string;
    title: string;
    pillarPatient: string;
  };
}

export function ArticlePageNew({
  id,
  title,
  subtitle,
  pillar_id,
  pillarClinical,
  pillarPatient,
  pillarColor,
  theme_id,
  themePatient,
  asset_url,
  hero_image,
  thought_leader,
  read_time,
  difficulty,
  sections,
  onBack,
  nextArticle
}: ArticlePageProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hero image: prefer mapped asset, fallback to hero_image
  const displayImage = asset_url || hero_image;

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

  // Render different section types
  const renderSection = (section: ArticleSection, index: number) => {
    switch (section.type) {
      case "text":
        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        );

      case "heading":
        return (
          <h2 key={index}>
            {section.content}
          </h2>
        );

      case "quote":
        return (
          <div key={index} className="article-quote">
            <p className="article-quote__text">
              {section.content}
            </p>
          </div>
        );

      case "reflection":
        return (
          <div key={index} className="article-reflection">
            <h4 className="article-reflection__label">
              Reflection Point
            </h4>
            <p className="article-reflection__text">
              {section.content}
            </p>
          </div>
        );

      case "practice":
        // TODO: Render embedded practice card
        return (
          <div key={index} style={{ marginBottom: 'var(--spacing-8)' }}>
            <p>Practice: {section.content?.title || "Practice component"}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="article-page">
      {/* Reading Progress Bar */}
      <div className="article-progress">
        <div 
          className="article-progress__bar"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(90deg, ${pillarColor} 0%, #5739FB 100%)`
          }}
        />
      </div>

      {/* Back Button */}
      {onBack && (
        <button onClick={onBack} className="article-back-button">
          <ArrowLeft className="w-4 h-4" style={{ color: '#3E2BB8' }} />
          <span className="article-back-button__text">Back to Toolkit</span>
        </button>
      )}

      {/* Hero Section */}
      <div className="article-hero">
        <div className="article-hero__image-wrapper">
          <img
            src={displayImage}
            alt={`${title} - ${pillarPatient}`}
            className="article-hero__image"
          />
          <div className="article-hero__gradient" />
        </div>

        <div className="article-hero__content">
          <div className="article-hero__eyebrow">
            <BookOpen className="w-4 h-4" style={{ color: '#FFFFFF' }} />
            <span className="article-hero__eyebrow-text">
              {pillarClinical}
            </span>
          </div>

          <h1 className="article-hero__title">{title}</h1>
          <p className="article-hero__subtitle">{subtitle}</p>

          <div className="article-hero__badges">
            <div className="article-hero__badge">
              <User className="w-3 h-3" style={{ color: '#FFFFFF' }} />
              <span className="article-hero__badge-text">{pillarPatient}</span>
            </div>

            <div className="article-hero__badge">
              <Tag className="w-3 h-3" style={{ color: '#FFFFFF' }} />
              <span className="article-hero__badge-text">{themePatient}</span>
            </div>

            <div className="article-hero__badge">
              <Clock className="w-3 h-3" style={{ color: '#FFFFFF' }} />
              <span className="article-hero__badge-text">{read_time} minute read</span>
            </div>

            {thought_leader && (
              <div className="article-hero__badge">
                <span className="article-hero__badge-text">{thought_leader}</span>
              </div>
            )}

            <div className="article-hero__badge">
              <span className="article-hero__badge-text">{difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="article-content">
        {sections.map((section, index) => renderSection(section, index))}
      </div>

      {/* Next Article */}
      {nextArticle && (
        <div className="article-next">
          <div className="article-next__card">
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

      {/* Footer */}
      <footer className="content-footer">
        <div className="content-footer__container">
          <p className="content-footer__text">
            Part of <span className="content-footer__brand">Recoverlution</span> Therapeutic Toolkit
          </p>
        </div>
      </footer>
    </div>
  );
}