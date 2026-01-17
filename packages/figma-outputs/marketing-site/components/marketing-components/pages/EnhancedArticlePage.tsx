/**
 * Enhanced Article Page - infiniteK Design
 * 
 * Clinical, elegant article reading experience
 * Premium white elegance with typography-first design
 * NO CARD ON CARD. NO BORDER ON BORDER.
 */

import { useState, useEffect } from "react";
import { ArrowLeft, BookmarkPlus, BookmarkCheck, Clock, Brain, User, ArrowRight, Share2, Lightbulb } from "lucide-react";
import { getArticleById } from "../../utils/contentLibraryMaster";
import type { ArticleData } from "../../data/articles/ER-articles-complete";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { SIX_PILLARS } from "../../utils/colorSystem";

interface EnhancedArticlePageProps {
  articleId: string;
  onBack: () => void;
  onNavigateToArticle: (id: string) => void;
}

export function EnhancedArticlePage({ articleId, onBack, onNavigateToArticle }: EnhancedArticlePageProps) {
  const [article, setArticle] = useState<ArticleData | undefined>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<typeof article['relatedContent']>([]);

  useEffect(() => {
    const fetchedArticle = getArticleById(articleId) as ArticleData | undefined;
    setArticle(fetchedArticle);
    
    if (fetchedArticle) {
      // Get related articles from relatedContent
      const articles = fetchedArticle.relatedContent.filter(r => r.type === 'article');
      setRelatedArticles(articles);
      
      // Check if bookmarked
      const bookmarks = JSON.parse(localStorage.getItem('article-bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(articleId));
    }
  }, [articleId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('article-bookmarks') || '[]');
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== articleId);
      localStorage.setItem('article-bookmarks', JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      bookmarks.push(articleId);
      localStorage.setItem('article-bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>
            Article not found
          </h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[#3E2BB8] text-white transition-all"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, borderRadius: '0px' }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Map pillarId to pillar key for SIX_PILLARS
  const pillarMap: Record<string, keyof typeof SIX_PILLARS> = {
    'ER': 'emotionalRegulation',
    'SR': 'stressResilience',
    'SC': 'socialConnectivity',
    'CR': 'cognitiveReframing',
    'II': 'identityIntegration',
    'DM': 'decisionMastery'
  };
  
  const pillarKey = pillarMap[article.pillarId];
  const pillar = SIX_PILLARS[pillarKey] || SIX_PILLARS.emotionalRegulation;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky Top Nav */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-[32px] backdrop-saturate-[180%] border-b border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-[#3E2BB8] transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Toolkit
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleBookmark}
                className={`w-10 h-10 flex items-center justify-center transition-colors ${
                  isBookmarked
                    ? 'text-[#3E2BB8]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                style={{ borderRadius: '0px' }}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <BookmarkPlus className="w-5 h-5" />
                )}
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                style={{ borderRadius: '0px' }}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="flex-1">
        {/* Hero Image Section - Use assetUrl (theme-mapped) or fallback to heroImage */}
        {(article.assetUrl || article.heroImage) && (
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            <ImageWithFallback
              src={article.assetUrl || article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/40" />
          </div>
        )}

        {/* Header Section - Premium white space */}
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
          {/* Title */}
          <h1 
            className="text-gray-900 mb-6"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700, 
              fontSize: '3rem',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 pb-8 mb-8 border-b border-gray-200/60">
            <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
              <User className="w-4 h-4" />
              <span>{article.thoughtLeader}</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
            <div 
              className="px-3 py-1"
              style={{ 
                backgroundColor: '#F3F4F6',
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '0px'
              }}
            >
              {article.difficulty}
            </div>
          </div>

          {/* Summary - Elevated */}
          <div 
            className="px-8 py-6 mb-12 border-l-4"
            style={{ 
              backgroundColor: `${pillar.primary}05`,
              borderLeftColor: pillar.primary
            }}
          >
            <p 
              className="text-gray-700"
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '1.125rem',
                lineHeight: '1.7'
              }}
            >
              {article.summary}
            </p>
          </div>

          {/* Blocks Covered */}
          {article.blocks && article.blocks.length > 0 && (
            <div className="mb-12">
              <h3 
                className="text-gray-500 uppercase tracking-wider mb-4"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem' }}
              >
                Building Blocks Covered
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.blocks.map((block, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5"
                    style={{
                      backgroundColor: `${pillar.primary}10`,
                      color: pillar.primary,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      borderRadius: '0px'
                    }}
                  >
                    {block}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Article Content Sections - Typography first */}
        <div className="max-w-3xl mx-auto px-6 pb-16">
          {article.sections.map((section, index) => (
            <div key={index} className="mb-12">
              {section.heading && (
                <h2
                  className="mb-6"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 700,
                    fontSize: '1.875rem',
                    color: pillar.primary,
                    lineHeight: '1.2'
                  }}
                >
                  {section.heading}
                </h2>
              )}
              
              {section.type === 'quote' ? (
                <blockquote 
                  className="px-8 py-6 border-l-4 my-8"
                  style={{ 
                    borderLeftColor: pillar.primary,
                    backgroundColor: '#FAFAFA'
                  }}
                >
                  <p 
                    className="text-gray-700 italic"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1.125rem',
                      lineHeight: '1.7'
                    }}
                  >
                    {section.content}
                  </p>
                </blockquote>
              ) : section.type === 'key-point' ? (
                <div 
                  className="px-8 py-6 my-8"
                  style={{ backgroundColor: '#FAFAFA' }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-2 h-2 mt-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: pillar.primary,
                        borderRadius: '0px'
                      }}
                    />
                    <div 
                      className="text-gray-800 whitespace-pre-line"
                      style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '1rem',
                        lineHeight: '1.7'
                      }}
                    >
                      {section.content}
                    </div>
                  </div>
                </div>
              ) : section.type === 'practice' ? (
                <div 
                  className="px-8 py-6 my-8 border-l-4"
                  style={{ 
                    borderLeftColor: pillar.primary,
                    backgroundColor: `${pillar.primary}05`
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5" style={{ color: pillar.primary }} />
                    <h4 
                      className="uppercase tracking-wider"
                      style={{ 
                        color: pillar.primary,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}
                    >
                      Practice
                    </h4>
                  </div>
                  <div 
                    className="text-gray-800 whitespace-pre-line"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1rem',
                      lineHeight: '1.7'
                    }}
                  >
                    {section.content}
                  </div>
                </div>
              ) : section.type === 'reflection' ? (
                <div 
                  className="px-8 py-6 my-8"
                  style={{ backgroundColor: '#F5F3FF' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5" style={{ color: pillar.primary }} />
                    <h4 
                      className="uppercase tracking-wider text-gray-700"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}
                    >
                      Reflection
                    </h4>
                  </div>
                  <div 
                    className="text-gray-800 whitespace-pre-line"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1rem',
                      lineHeight: '1.7'
                    }}
                  >
                    {section.content}
                  </div>
                </div>
              ) : (
                <p 
                  className="text-gray-800 whitespace-pre-line"
                  style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '1.0625rem',
                    lineHeight: '1.8'
                  }}
                >
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Related Articles - Only show if there are article type related content */}
        {relatedArticles.length > 0 && (
          <div className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-200/60">
            <h3 
              className="text-gray-900 mb-8"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: '2rem'
              }}
            >
              Related Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.slice(0, 4).map(related => (
                <button
                  key={related.id}
                  onClick={() => onNavigateToArticle(related.id)}
                  className="text-left bg-white border border-gray-200/60 hover:border-[#3E2BB8]/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all p-6"
                  style={{ borderRadius: '0px' }}
                >
                  <h4 
                    className="text-gray-900 mb-2"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      lineHeight: '1.3'
                    }}
                  >
                    {related.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[#3E2BB8] mt-3">
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}>
                      Read Article
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}