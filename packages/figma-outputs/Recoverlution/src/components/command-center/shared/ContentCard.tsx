// CONTENT CARD (reusable)
import type { ContentEnvelope } from '@/lib/types/constitution';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface Props {
  content: ContentEnvelope;
  onClick?: () => void;
  selected?: boolean;
}

export function ContentCard({ content, onClick, selected }: Props) {
  const hasValidContract = !!content.response_contract;
  const hasWhyNow = !!content.why_now_template;
  const isActive = content.is_active && content.status === 'active';
  
  const kindColors: Record<string, string> = {
    article: 'bg-blue-500/20 text-blue-400',
    practice: 'bg-violet-500/20 text-violet-400',
    insight: 'bg-pink-500/20 text-pink-400',
    video: 'bg-emerald-500/20 text-emerald-400',
    journey_scene: 'bg-amber-500/20 text-amber-400',
    state_checkin: 'bg-cyan-500/20 text-cyan-400',
    story: 'bg-rose-500/20 text-rose-400',
    navicue: 'bg-indigo-500/20 text-indigo-400',
  };
  
  return (
    <div
      onClick={onClick}
      className={`p-4 bg-white/5 border rounded transition-all cursor-pointer ${
        selected
          ? 'border-[#5739FB] bg-[#5739FB]/10'
          : 'border-white/10 hover:border-white/20 hover:bg-white/8'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-xs ${kindColors[content.content_kind] || 'bg-gray-500/20 text-gray-400'} rounded font-medium uppercase tracking-wide`}>
              {content.content_kind}
            </span>
            {!isActive && (
              <span className="px-2 py-0.5 text-xs bg-gray-500/20 text-gray-400 rounded font-medium uppercase tracking-wide">
                {content.status}
              </span>
            )}
          </div>
          <p className="text-sm text-white/90 truncate">{content.canonical_id}</p>
          <p className="text-xs text-white/50 mt-0.5">
            {content.source_table} · v{content.version}
          </p>
        </div>
        
        <div className="flex flex-col gap-1">
          {hasValidContract ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" title="Valid contract" />
          ) : (
            <XCircle className="w-4 h-4 text-red-400" title="Missing contract" />
          )}
          {hasWhyNow ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" title="Has WhyNow" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400" title="Missing WhyNow" />
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs">
        <span className="px-2 py-0.5 bg-[#5739FB]/20 text-[#5739FB] rounded font-medium">
          {content.pillar_id}
        </span>
        {content.tags.slice(0, 2).map((tag, i) => (
          <span key={i} className="px-2 py-0.5 bg-white/5 text-white/60 rounded">
            {tag}
          </span>
        ))}
        {content.tags.length > 2 && (
          <span className="text-white/40">+{content.tags.length - 2}</span>
        )}
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs text-white/40">
        <span>Risk: {content.risk_level}</span>
        <span>{new Date(content.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
