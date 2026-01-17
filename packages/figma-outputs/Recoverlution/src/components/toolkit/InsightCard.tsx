import { useState } from 'react';
import type { Insight } from '@/lib/types/toolkit';
import { Lightbulb, ChevronRight, X } from 'lucide-react';

interface InsightCardProps {
  insight: Insight;
  onRespond: (response: { insight_id: string; resonance_score: number }) => void;
  isRecommended?: boolean;
}

export function InsightCard({ insight, onRespond, isRecommended = false }: InsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [resonanceScore, setResonanceScore] = useState(50);
  const [hasResponded, setHasResponded] = useState(false);

  const pillarColors: Record<string, string> = {
    ER: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    SR: 'bg-[#5739FB]/10 border-[#5739FB]',
    SC: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    CR: 'bg-[#5739FB]/10 border-[#5739FB]',
    II: 'bg-[#3E2BB8]/10 border-[#3E2BB8]',
    DM: 'bg-[#5739FB]/10 border-[#5739FB]',
  };

  const handleSubmitResponse = () => {
    onRespond({
      insight_id: insight.id,
      resonance_score: resonanceScore,
    });
    setHasResponded(true);
    setTimeout(() => {
      setIsExpanded(false);
    }, 1500);
  };

  return (
    <>
      {/* Card View */}
      <div className="group cursor-pointer border border-[#3E2BB8]/20 bg-white p-6 hover:border-[#3E2BB8] transition-all">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 text-xs border ${pillarColors[insight.pillar_id]} text-[#3E2BB8]`}>
                {insight.pillar_id}
              </span>
              {isRecommended && (
                <span className="px-3 py-1 text-xs border border-[#5739FB] bg-[#5739FB]/10 text-[#5739FB]">
                  LUMA RECOMMENDED
                </span>
              )}
            </div>
            <h3 className="text-[#3E2BB8] mb-2 group-hover:text-[#5739FB] transition-colors">
              {insight.title}
            </h3>
            <p className="text-sm text-[#5739FB] mb-3 italic">
              {insight.core_truth}
            </p>
          </div>
          <Lightbulb className="size-5 text-[#5739FB] flex-shrink-0" />
        </div>

        {/* Card Variant */}
        <p className="text-[#3E2BB8]/80 mb-4">
          {insight.variants.card}
        </p>

        {/* Read More Button */}
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 text-[#5739FB] hover:text-[#3E2BB8] transition-colors"
        >
          <span>Read more</span>
          <ChevronRight className="size-4" />
        </button>

        {/* Schema Tags */}
        {insight.schema_targets.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#3E2BB8]/10">
            {insight.schema_targets.slice(0, 3).map((schema) => (
              <span
                key={schema}
                className="px-2 py-1 text-xs bg-[#3E2BB8]/5 text-[#3E2BB8]/60"
              >
                {schema.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white border border-[#3E2BB8]/20 p-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="size-6 text-[#5739FB]" />
                  <span className={`px-3 py-1 text-xs border ${pillarColors[insight.pillar_id]} text-[#3E2BB8]`}>
                    {insight.pillar_id}
                  </span>
                </div>
                <h2 className="text-[#3E2BB8] mb-2">{insight.title}</h2>
                <p className="text-[#5739FB] italic">
                  {insight.core_truth}
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-[#3E2BB8]/5 transition-colors"
              >
                <X className="size-6 text-[#3E2BB8]" />
              </button>
            </div>

            {/* Full Content */}
            <div className="mb-8">
              <p className="text-[#3E2BB8]/80 leading-relaxed">
                {insight.variants.full}
              </p>
            </div>

            {/* Response Section */}
            {!hasResponded ? (
              <div className="p-6 bg-[#5739FB]/5 border border-[#5739FB]/20">
                <p className="text-[#3E2BB8] mb-4">
                  {insight.response_contract.prompt}
                </p>

                {insight.response_contract.type === 'slider' ? (
                  <>
                    <div className="mb-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={resonanceScore}
                        onChange={(e) => setResonanceScore(Number(e.target.value))}
                        className="w-full h-2 bg-[#3E2BB8]/20 appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #5739FB ${resonanceScore}%, #3E2BB8 20% ${resonanceScore}%)`,
                        }}
                      />
                      <div className="flex justify-between text-sm text-[#3E2BB8]/60 mt-2">
                        <span>Not at all</span>
                        <span className="text-[#5739FB]">{resonanceScore}</span>
                        <span>Completely</span>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmitResponse}
                      className="w-full bg-[#5739FB] text-white px-6 py-3 hover:bg-[#3E2BB8] transition-colors"
                    >
                      Submit Response
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setResonanceScore(0);
                        handleSubmitResponse();
                      }}
                      className="flex-1 border border-[#3E2BB8]/20 text-[#3E2BB8] px-6 py-3 hover:bg-[#3E2BB8]/5 transition-colors"
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        setResonanceScore(100);
                        handleSubmitResponse();
                      }}
                      className="flex-1 bg-[#5739FB] text-white px-6 py-3 hover:bg-[#3E2BB8] transition-colors"
                    >
                      Yes
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-[#5739FB]/10 border border-[#5739FB]/20 text-center">
                <p className="text-[#5739FB]">Response captured. Thank you.</p>
              </div>
            )}

            {/* Schema Tags */}
            <div className="mt-6 pt-6 border-t border-[#3E2BB8]/20">
              <h4 className="text-sm text-[#3E2BB8]/60 uppercase tracking-wide mb-3">
                Key Concepts
              </h4>
              <div className="flex flex-wrap gap-2">
                {insight.schema_targets.map((schema) => (
                  <span
                    key={schema}
                    className="px-3 py-2 text-sm bg-[#3E2BB8]/5 text-[#3E2BB8] border border-[#3E2BB8]/10"
                  >
                    {schema.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Content */}
            {(insight.related_articles.length > 0 || insight.related_practices.length > 0) && (
              <div className="mt-6 p-4 bg-[#3E2BB8]/5 border border-[#3E2BB8]/10">
                <h4 className="text-sm text-[#3E2BB8] mb-2">Explore Further</h4>
                <div className="space-y-1 text-sm text-[#3E2BB8]/80">
                  {insight.related_articles.length > 0 && (
                    <div>{insight.related_articles.length} related articles</div>
                  )}
                  {insight.related_practices.length > 0 && (
                    <div>{insight.related_practices.length} related practices</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
