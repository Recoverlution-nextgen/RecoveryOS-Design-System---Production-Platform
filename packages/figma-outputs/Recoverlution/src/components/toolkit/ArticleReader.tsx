/**
 * @deprecated Use BlockRenderer from /components/players/BlockRenderer.tsx instead
 * This component will be removed in next version
 * 
 * ArticleReader is being replaced by BlockRenderer which includes:
 * - Full Truth Layer integration
 * - Practice injection
 * - State capture
 * - Enhanced proof tracking
 */

import { useState, useEffect, useRef } from 'react';
import type { Article, ReadingProgress } from '@/lib/types/toolkit';
import { X, Clock, BookOpen, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ArticleReaderProps {
  article: Article;
  onClose: () => void;
  onComplete: (proof: {
    article_id: string;
    percent_read: number;
    exit_response?: string;
  }) => void;
}

export function ArticleReader({ article, onClose, onComplete }: ArticleReaderProps) {
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [exitResponse, setExitResponse] = useState('');
  const [percentRead, setPercentRead] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const percent = Math.round((scrollTop / scrollHeight) * 100);

      setPercentRead(Math.min(percent, 100));

      // Only mark as reached end when truly at bottom (95%+)
      if (percent >= 95 && !hasReachedEnd) {
        setHasReachedEnd(true);
      }
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [hasReachedEnd]);

  const handleComplete = () => {
    onComplete({
      article_id: article.id,
      percent_read: percentRead,
      exit_response: exitResponse,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col">
      {/* Minimal Progress Bar */}
      <div className="h-0.5 bg-[#3E2BB8]/5">
        <div
          className="h-full bg-[#5739FB] transition-all duration-300"
          style={{ width: `${percentRead}%` }}
        />
      </div>

      {/* Clean Header */}
      <div className="border-b border-[#3E2BB8]/10 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 text-xs tracking-wide uppercase border border-[#3E2BB8]/20 text-[#3E2BB8]/60">
                  {article.pillar_id}
                </span>
                <div className="flex items-center gap-2 text-sm text-[#3E2BB8]/40">
                  <Clock className="size-3.5" />
                  <span>{article.reading_time_minutes} min read</span>
                </div>
              </div>
              <h1 className="text-[#3E2BB8] mb-2 leading-tight">{article.title}</h1>
              {article.subtitle && (
                <p className="text-[#3E2BB8]/50 text-lg leading-relaxed">{article.subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#3E2BB8]/5 transition-colors rounded-full"
              aria-label="Close"
            >
              <X className="size-5 text-[#3E2BB8]/60" />
            </button>
          </div>
        </div>
      </div>

      {/* Premium Content */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto px-8 py-16">
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl text-[#3E2BB8] mb-8 mt-0 leading-tight">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl text-[#3E2BB8] mt-16 mb-6 leading-tight">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl text-[#3E2BB8] mt-12 mb-4 leading-snug">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-[#3E2BB8]/70 mb-6 leading-[1.8] text-lg">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="text-[#3E2BB8]/70 mb-8 space-y-3 pl-6">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="leading-[1.8]">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="text-[#3E2BB8] font-medium">{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[#5739FB] pl-6 py-2 my-8 text-[#3E2BB8]/60 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {article.body}
            </ReactMarkdown>

            {/* Subtle Concepts */}
            {article.schema_targets && article.schema_targets.length > 0 && (
              <div className="mt-16 pt-8 border-t border-[#3E2BB8]/10">
                <h4 className="text-xs uppercase tracking-wider text-[#3E2BB8]/40 mb-4">
                  Key Concepts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {article.schema_targets.map((schema) => (
                    <span
                      key={schema}
                      className="px-3 py-1.5 text-sm bg-[#3E2BB8]/5 text-[#3E2BB8]/60 border border-[#3E2BB8]/10"
                    >
                      {schema.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Content - Clean */}
            {(article.related_practices?.length > 0 || article.related_insights?.length > 0) && (
              <div className="mt-12 p-8 bg-[#5739FB]/5 border border-[#5739FB]/10">
                <h4 className="text-[#3E2BB8] mb-4 text-lg">Continue Your Journey</h4>
                <div className="space-y-3 text-[#3E2BB8]/60">
                  {article.related_practices?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#5739FB]">→</span>
                      <span>{article.related_practices.length} related practices</span>
                    </div>
                  )}
                  {article.related_insights?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#5739FB]">→</span>
                      <span>{article.related_insights.length} deeper insights</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Organic Exit Prompt - Only at the very end */}
            {hasReachedEnd && (
              <div className="mt-16 pt-12 border-t border-[#3E2BB8]/10">
                <div className="max-w-2xl">
                  <h4 className="text-[#3E2BB8] mb-3 text-lg">Reflection</h4>
                  <p className="text-[#3E2BB8]/50 mb-6 text-base">
                    Take a moment to capture what resonated with you.
                  </p>
                  <textarea
                    value={exitResponse}
                    onChange={(e) => setExitResponse(e.target.value)}
                    placeholder="What landed for you?"
                    className="w-full px-4 py-3 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] placeholder:text-[#3E2BB8]/30 focus:outline-none focus:border-[#5739FB]/50 transition-colors mb-4 rounded-sm"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleComplete}
                      className="px-6 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors flex items-center gap-2"
                    >
                      <Check className="size-4" />
                      <span>Complete Reading</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 border border-[#3E2BB8]/20 text-[#3E2BB8]/60 hover:bg-[#3E2BB8]/5 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}