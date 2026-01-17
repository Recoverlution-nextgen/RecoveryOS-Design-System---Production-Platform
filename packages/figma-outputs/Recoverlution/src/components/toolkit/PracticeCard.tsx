import type { Practice } from '@/lib/types/toolkit';
import { Play, Clock } from 'lucide-react';

interface PracticeCardProps {
  practice: Practice;
  onClick: () => void;
  isRecommended?: boolean;
}

export function PracticeCard({ practice, onClick, isRecommended = false }: PracticeCardProps) {
  const pillarColors: Record<string, string> = {
    ER: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    SR: 'bg-[#5739FB]/10 border-[#5739FB]',
    SC: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    CR: 'bg-[#5739FB]/10 border-[#5739FB]',
    II: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    DM: 'bg-[#5739FB]/10 border-[#5739FB]',
  };

  const difficultyColors: Record<string, string> = {
    beginner: 'text-[#5739FB] bg-[#5739FB]/5',
    intermediate: 'text-[#3E2BB8] bg-[#3E2BB8]/5',
    advanced: 'text-[#3E2BB8] bg-[#3E2BB8]/10',
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
            <span className={`px-3 py-1 text-xs border ${pillarColors[practice.pillar_id]} text-[#3E2BB8]`}>
              {practice.pillar_id}
            </span>
            {isRecommended && (
              <span className="px-3 py-1 text-xs border border-[#5739FB] bg-[#5739FB]/10 text-[#5739FB]">
                LUMA RECOMMENDED
              </span>
            )}
          </div>
          <h3 className="text-[#3E2BB8] group-hover:text-[#5739FB] transition-colors">
            {practice.title}
          </h3>
          <p className="text-[#3E2BB8]/60 mt-1">
            {practice.subtitle}
          </p>
        </div>
        <Play className="size-5 text-[#5739FB] flex-shrink-0" />
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-4 mb-4 text-sm text-[#3E2BB8]/60">
        <div className="flex items-center gap-2">
          <Clock className="size-4" />
          <span>{practice.duration_minutes} min</span>
        </div>
        <span className="capitalize">{practice.modality}</span>
        <span className={`px-2 py-1 text-xs ${difficultyColors[practice.difficulty]}`}>
          {practice.difficulty}
        </span>
      </div>

      {/* Intro */}
      <p className="text-[#3E2BB8]/80 mb-4 line-clamp-2">
        {practice.intro}
      </p>

      {/* Schema Tags */}
      {practice.schema_targets.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#3E2BB8]/10">
          {practice.schema_targets.slice(0, 3).map((schema) => (
            <span
              key={schema}
              className="px-2 py-1 text-xs bg-[#3E2BB8]/5 text-[#3E2BB8]/60"
            >
              {schema.replace(/_/g, ' ')}
            </span>
          ))}
          {practice.schema_targets.length > 3 && (
            <span className="px-2 py-1 text-xs text-[#3E2BB8]/40">
              +{practice.schema_targets.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
