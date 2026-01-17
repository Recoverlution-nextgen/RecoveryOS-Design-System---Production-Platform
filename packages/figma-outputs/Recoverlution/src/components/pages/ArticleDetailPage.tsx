/**
 * Article Detail Page - infiniteK Design System
 * 
 * Structure:
 * - Floating glass nav (no background, just button)
 * - Full-bleed hero with aligned left padding
 * - Centered reading column (680px)
 * - Simple related content grid
 * 
 * NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, BookmarkPlus, BookmarkCheck, Clock, User, Lightbulb, BookOpen, Activity } from 'lucide-react';
import { getArticleById } from '../../utils/contentLibraryMaster';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PracticeCard } from '../PracticeCard';
import { getPillarColor } from '../../utils/colorSystem';
import { BulletList } from '../BulletList';

interface ArticleDetailPageProps {
  articleId: string;
  onBack?: () => void;
  onNavigateToArticle?: (articleId: string) => void;
}

export function ArticleDetailPage({ articleId, onBack, onNavigateToArticle }: ArticleDetailPageProps) {
  const article = getArticleById(articleId);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const bookmarks = JSON.parse(localStorage.getItem('article-bookmarks-v2') || '[]');
    setIsBookmarked(bookmarks.includes(articleId));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('article-bookmarks-v2') || '[]');
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== articleId);
      localStorage.setItem('article-bookmarks-v2', JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      bookmarks.push(articleId);
      localStorage.setItem('article-bookmarks-v2', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
            Article not found
          </p>
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white shadow-[0_2px_12px_rgba(62,43,184,0.25)] hover:shadow-[0_4px_20px_rgba(62,43,184,0.35)] transition-all duration-300"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                borderRadius: '0px'
              }}
            >
              <ArrowLeft size={18} />
              Back to Toolkit
            </button>
          )}
        </div>
      </div>
    );
  }

  const renderSection = (section: any, index: number) => {
    const { type, heading, content } = section;

    switch (type) {
      case 'text':
        // Parse content to detect mixed prose and bullet sections
        const parts = content.split(/\n\n+/);
        const renderedParts: JSX.Element[] = [];
        
        parts.forEach((part: string, partIndex: number) => {
          const lines = part.trim().split('\n');
          const bulletLines = lines.filter(l => l.trim().startsWith('•'));
          
          // If this part is entirely bullet points
          if (bulletLines.length > 0 && bulletLines.length === lines.length) {
            const items = bulletLines.map(l => l.trim().substring(1).trim());
            renderedParts.push(
              <BulletList 
                key={`bullet-${partIndex}`}
                items={items}
                variant="structured"
                className="mb-6"
              />
            );
          } else if (bulletLines.length > 0) {
            // Mixed content - has both prose and bullets
            let currentProse: string[] = [];
            let currentBullets: string[] = [];
            
            lines.forEach((line, lineIndex) => {
              if (line.trim().startsWith('•')) {
                // If we have accumulated prose, render it first
                if (currentProse.length > 0) {
                  renderedParts.push(
                    <p key={`prose-${partIndex}-${lineIndex}`} className="copy-primary text-gray-800 mb-4">
                      {currentProse.join('\n')}
                    </p>
                  );
                  currentProse = [];
                }
                currentBullets.push(line.trim().substring(1).trim());
              } else if (line.trim()) {
                // If we have accumulated bullets, render them first
                if (currentBullets.length > 0) {
                  renderedParts.push(
                    <BulletList 
                      key={`bullet-${partIndex}-${lineIndex}`}
                      items={currentBullets}
                      variant="structured"
                      className="mb-4"
                    />
                  );
                  currentBullets = [];
                }
                currentProse.push(line);
              }
            });
            
            // Render any remaining prose or bullets
            if (currentProse.length > 0) {
              renderedParts.push(
                <p key={`prose-end-${partIndex}`} className="copy-primary text-gray-800 mb-6">
                  {currentProse.join('\n')}
                </p>
              );
            }
            if (currentBullets.length > 0) {
              renderedParts.push(
                <BulletList 
                  key={`bullet-end-${partIndex}`}
                  items={currentBullets}
                  variant="structured"
                  className="mb-6"
                />
              );
            }
          } else {
            // Pure prose
            renderedParts.push(
              <p key={`prose-${partIndex}`} className="copy-primary text-gray-800 mb-6">
                {part.trim()}
              </p>
            );
          }
        });
        
        return (
          <div key={index} className="mb-8">
            {heading && (
              <h2 className="headline-subsection text-[#1A1A1A] mb-6">
                {heading}
              </h2>
            )}
            {renderedParts}
          </div>
        );

      case 'key-point':
        return (
          <div key={index} className="article-key-point">
            <div className="article-key-point__header">
              <Lightbulb className="article-key-point__icon" strokeWidth={2} />
              {heading && (
                <h3 className="article-key-point__label">
                  {heading}
                </h3>
              )}
            </div>
            <p className="article-key-point__content" style={{ whiteSpace: 'pre-line' }}>
              {content}
            </p>
          </div>
        );

      case 'quote':
        // Parse quote and attribution properly
        // Format: "Quote text" (Author) or "Quote text" — Author (source)
        let quoteText = content;
        let author = '';
        let source = '';
        
        // Remove leading/trailing quotes from display
        const quoteMatch = content.match(/^"(.+)"\s*(?:[—-]\s*(.+?))?\s*(?:\((.+?)\))?$/);
        
        if (quoteMatch) {
          quoteText = quoteMatch[1]; // Extract text without quotes
          
          // Check if we have attribution after em dash
          if (quoteMatch[2]) {
            author = quoteMatch[2].trim();
          }
          
          // Check if we have attribution in parentheses
          if (quoteMatch[3]) {
            const parenContent = quoteMatch[3].trim();
            // If we already have an author from em dash, this is the source
            if (author) {
              source = parenContent;
            } else {
              // Otherwise this is the author
              author = parenContent;
            }
          }
        } else {
          // Fallback: just remove quotes if present
          quoteText = content.replace(/^"|"$/g, '');
        }
        
        return (
          <blockquote key={index} className="article-quote">
            <p className="article-quote__text">
              {quoteText}
            </p>
            {author && (
              <footer>
                <p className="article-quote__author">
                  {author}
                </p>
                {source && (
                  <p className="article-quote__source">
                    {source}
                  </p>
                )}
              </footer>
            )}
          </blockquote>
        );

      case 'practice':
        return (
          <div key={index} className="mb-12">
            <PracticeCard
              id={`practice-${index}`}
              title={heading || 'Practice'}
              description={content}
              pillar={article.pillar}
              pillarName={article.pillarName}
              pillarColor={getPillarColor(article.pillar)}
              type="Breathing"
              duration={5}
              difficulty="Beginner"
              steps={content.split('\n').filter((line: string) => line.trim())}
              context="embedded"
              defaultExpanded={false}
            />
          </div>
        );

      case 'reflection':
        return (
          <aside key={index} className="article-reflection">
            <div className="article-reflection__label">
              Pause & Reflect
            </div>
            <p className="article-reflection__content" style={{ whiteSpace: 'pre-line' }}>
              {content}
            </p>
          </aside>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-[101]"
        style={{ background: 'rgba(87, 57, 251, 0.1)' }}
      >
        <div 
          className="h-full bg-[#5739FB] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation - NO BACKGROUND */}
      <div className="sticky top-0 z-100" style={{ height: '80px' }}>
        <div className="h-full max-w-[1400px] mx-auto px-12 flex items-center justify-between">
          {/* Glass Back Button */}
          <button
            onClick={onBack}
            className="glass-card inline-flex items-center gap-2.5 px-5 py-3 text-primary hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.8)_inset] hover:border-white/40 transition-all duration-300"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              borderRadius: '0px'
            }}
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Back to Toolkit
          </button>

          {/* Save Button */}
          <button
            onClick={toggleBookmark}
            className="glass-card group relative p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.8)_inset] hover:border-white/40 transition-all duration-300"
            style={{
              borderRadius: '0px'
            }}
            title={isBookmarked ? 'Saved' : 'Save article'}
          >
            {isBookmarked ? (
              <BookmarkCheck size={20} className="text-primary" />
            ) : (
              <BookmarkPlus size={20} className="text-primary group-hover:opacity-80 transition-opacity" />
            )}
          </button>
        </div>
      </div>

      {/* Hero Section - Full Bleed */}
      <div 
        className="relative w-full overflow-hidden"
        style={{ height: '560px', marginTop: '-80px' }}
      >
        <ImageWithFallback
          src={article.assetUrl}
          alt={article.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)'
          }}
        />

        {/* Hero Content - Aligned with article content */}
        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="max-w-[1400px] mx-auto px-12">
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span 
                  className="eyebrow"
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'rgba(255, 255, 255, 0.9)',
                    letterSpacing: '0.1em'
                  }}
                >
                  {article.pillarName}
                </span>
                <span 
                  className="w-1 h-1 rounded-full"
                  style={{ background: 'rgba(255, 255, 255, 0.6)' }}
                />
                <span 
                  className="eyebrow"
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'rgba(255, 255, 255, 0.9)',
                    letterSpacing: '0.1em'
                  }}
                >
                  ARTICLE
                </span>
              </div>

              {/* Title - Use subsection headline */}
              <h1 
                className="headline-subsection text-white mb-5"
                style={{
                  textShadow: '0 2px 24px rgba(0, 0, 0, 0.4)'
                }}
              >
                {article.title}
              </h1>

              {/* Subtitle */}
              {article.subtitle && (
                <p 
                  className="copy-primary text-white/95 mb-6"
                  style={{
                    textShadow: '0 1px 12px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {article.subtitle}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-6 flex-wrap">
                {article.thoughtLeader && (
                  <div className="flex items-center gap-2">
                    <User size={16} style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                    <span 
                      className="text-white/95"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {article.thoughtLeader}
                    </span>
                  </div>
                )}
                {article.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                    <span 
                      className="text-white/95"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {article.readTime} minute read
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content - Centered Reading Column */}
      <article className="max-w-[1400px] mx-auto px-12 py-20">
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Lead / Summary */}
          {article.summary && (
            <p className="article-lead" style={{ whiteSpace: 'pre-line' }}>
              {article.summary}
            </p>
          )}

          {/* Quote (always position 2 - right after summary) */}
          {(() => {
            const sections = article.sections || [];
            const quoteSection = sections.find((s: any) => s.type === 'quote');
            if (quoteSection) {
              return renderSection(quoteSection, -1);
            }
            return null;
          })()}

          {/* Article Sections (excluding quote since we rendered it above) */}
          {article.sections?.filter((s: any) => s.type !== 'quote').map((section: any, index: number) => 
            renderSection(section, index)
          )}

          {/* What's Next - Integrated into article flow */}
          {article.relatedContent && article.relatedContent.length > 0 && (
            <div style={{ 
              marginTop: 'var(--spacing-16)', 
              paddingTop: 'var(--spacing-12)', 
              borderTop: '1px solid rgba(62, 43, 184, 0.12)' 
            }}>
              {/* Section header with eyebrow */}
              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <h2 className="headline-card text-[#1A1A1A]" style={{ margin: 0 }}>
                  Keep Building
                </h2>
              </div>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'var(--spacing-3)' 
              }}>
                {article.relatedContent.map((related: any, index: number) => {
                  const isArticle = related.type === 'article';
                  const isInsight = related.type === 'insight';
                  const isPractice = related.type === 'practice';

                  // Determine icon and content type label
                  let IconComponent = BookOpen;
                  let typeLabel = 'ARTICLE';
                  let iconColor = '#5739FB';
                  
                  if (isInsight) {
                    IconComponent = Lightbulb;
                    typeLabel = 'INSIGHT';
                    iconColor = '#3E2BB8';
                  } else if (isPractice) {
                    IconComponent = Activity;
                    typeLabel = 'PRACTICE';
                    iconColor = '#3E2BB8';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isArticle && onNavigateToArticle) {
                          onNavigateToArticle(related.id);
                        }
                      }}
                      className="group w-full text-left"
                      style={{
                        border: '1px solid rgba(62, 43, 184, 0.12)',
                        padding: 'var(--spacing-4)',
                        borderRadius: '0px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = iconColor;
                        const accentBar = e.currentTarget.querySelector('.accent-bar') as HTMLElement;
                        if (accentBar) accentBar.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(62, 43, 184, 0.12)';
                        const accentBar = e.currentTarget.querySelector('.accent-bar') as HTMLElement;
                        if (accentBar) accentBar.style.opacity = '0.5';
                      }}
                    >
                      {/* Left accent bar */}
                      <div 
                        className="accent-bar"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '3px',
                          height: '100%',
                          background: iconColor,
                          opacity: 0.5,
                          transition: 'opacity 0.2s ease'
                        }} 
                      />

                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 'var(--spacing-3)' 
                      }}>
                        {/* Icon */}
                        <div 
                          style={{
                            width: '36px',
                            height: '36px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <IconComponent 
                            size={18} 
                            style={{ 
                              color: iconColor,
                              strokeWidth: 2
                            }} 
                          />
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div 
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: '#9CA3AF',
                              marginBottom: '0.25rem'
                            }}
                          >
                            {typeLabel}
                          </div>
                          <h3 
                            className="group-hover:text-[#5739FB]"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '1rem',
                              fontWeight: 600,
                              lineHeight: 1.4,
                              color: '#1A1A1A',
                              margin: 0,
                              transition: 'color 0.2s ease'
                            }}
                          >
                            {related.title}
                          </h3>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}