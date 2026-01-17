import type { Article } from '@/lib/types/toolkit';
import { Clock, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  isRecommended?: boolean;
}

export function ArticleCard({ article, onClick, isRecommended = false }: ArticleCardProps) {
  const pillarColors: Record<string, string> = {
    ER: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    SR: 'bg-[#5739FB]/10 border-[#5739FB]',
    SC: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    CR: 'bg-[#5739FB]/10 border-[#5739FB]',
    II: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    DM: 'bg-[#5739FB]/10 border-[#5739FB]',
  };

  const pillarNames: Record<string, string> = {
    ER: 'Emotional Regulation',
    SR: 'Shame Resilience',
    SC: 'Self Concept',
    CR: 'Connection & Relationship',
    II: 'Identity & Integration',
    DM: 'Decision Making',
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer border border-[#3E2BB8]/20 bg-white p-6 hover:border-[#3E2BB8] transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 text-xs border ${pillarColors[article.pillar_id]} text-[#3E2BB8]`}>
              {pillarNames[article.pillar_id]}
            </span>
            {isRecommended && (
              <span className="px-3 py-1 text-xs border border-[#5739FB] bg-[#5739FB]/10 text-[#5739FB]">
                LUMA RECOMMENDED
              </span>
            )}
          </div>
          <h3 className="text-[#3E2BB8] group-hover:text-[#5739FB] transition-colors">
            {article.title}
          </h3>
          <p className="text-[#3E2BB8]/60 mt-1">
            {article.subtitle}
          </p>
        </div>
        <BookOpen className="size-5 text-[#3E2BB8]/40 group-hover:text-[#5739FB] transition-colors flex-shrink-0" />
      </div>

      {/* Hook */}
      <p className="text-[#3E2BB8]/80 mb-4">
        {article.hook}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between pt-4 border-t border-[#3E2BB8]/10">
        <div className="flex items-center gap-2 text-sm text-[#3E2BB8]/60">
          <Clock className="size-4" />
          <span>{article.reading_time_minutes} min read</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#3E2BB8]/40 uppercase tracking-wide">
            {article.kbe_layer}
          </span>
        </div>
      </div>

      {/* Schema Tags */}
      {article.schema_targets.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {article.schema_targets.slice(0, 3).map((schema) => (
            <span
              key={schema}
              className="px-2 py-1 text-xs bg-[#3E2BB8]/5 text-[#3E2BB8]/60"
            >
              {schema.replace(/_/g, ' ')}
            </span>
          ))}
          {article.schema_targets.length > 3 && (
            <span className="px-2 py-1 text-xs text-[#3E2BB8]/40">
              +{article.schema_targets.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
