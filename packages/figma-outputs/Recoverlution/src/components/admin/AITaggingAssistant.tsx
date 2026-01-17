import { useState, useEffect } from 'react';
import { ArrowLeft, Bot, CheckCircle, AlertCircle, Loader, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface MarketingAsset {
  id: string;
  public_url: string;
  object_name: string;
  asset_class: string | null;
  pillar_id: string | null;
  concept_id: string | null;
  theme_id: string | null;
  schema_id: string | null;
  proof_fit: string[] | null;
  usage_tags: string[] | null;
  ai_status: string | null;
  ai_last_run_at: string | null;
}

interface TaggingProposal {
  pillar_id: string | null;
  concept_id: string | null;
  theme_id: string | null;
  schema_id: string | null;
  asset_class: string;
  proof_fit: string[];
  usage_tags: string[];
  audience: string | null;
  descriptors: string[];
  confidence: {
    pillar: number;
    concept: number;
    theme: number;
    schema: number;
    asset_class: number;
    overall: number;
  };
  reasoning: string;
}

interface AITaggingAssistantProps {
  onBack?: () => void;
}

export default function AITaggingAssistant({ onBack }: AITaggingAssistantProps) {
  const [assets, setAssets] = useState<MarketingAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [proposals, setProposals] = useState<Map<string, { proposal: TaggingProposal; raw: string }>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'untagged' | 'all' | 'needs_review'>('untagged');

  const supabase = createClient();

  // Load assets from database
  const loadAssets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('marketing_assets')
        .select('*')
        .eq('kind', 'image')
        .order('created_at', { ascending: false })
        .limit(50);

      if (filter === 'untagged') {
        query = query.is('pillar_id', null);
      } else if (filter === 'needs_review') {
        query = query.eq('ai_status', 'proposed');
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('[AITaggingAssistant] Database error:', fetchError);
        throw new Error(`Database error: ${fetchError.message}`);
      }

      console.log('[AITaggingAssistant] Loaded', data?.length || 0, 'assets');
      setAssets(data || []);
    } catch (e: any) {
      console.error('[AITaggingAssistant] Load assets error:', e);
      setError(`Failed to load assets: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, [filter]);

  // Analyze single image with Gemini
  const analyzeImage = async (asset: MarketingAsset) => {
    setAnalyzing(asset.id);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const relayUrl = `https://${projectId}.supabase.co/functions/v1/relay_ai_tagging/analyze`;

      console.log('[AITaggingAssistant] Calling:', relayUrl);
      console.log('[AITaggingAssistant] Request payload:', {
        image_url: asset.public_url,
        asset_id: asset.id,
      });

      const response = await fetch(relayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          image_url: asset.public_url,
          asset_id: asset.id,
          existing_data: {
            object_name: asset.object_name,
            asset_class: asset.asset_class,
            pillar_id: asset.pillar_id,
            concept_id: asset.concept_id,
            theme_id: asset.theme_id,
            schema_id: asset.schema_id,
          },
        }),
      });

      console.log('[AITaggingAssistant] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[AITaggingAssistant] Response error:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('[AITaggingAssistant] AI Response:', result);

      if (result.ok && result.proposal) {
        const newProposals = new Map(proposals);
        newProposals.set(asset.id, {
          proposal: result.proposal,
          raw: result.raw_response,
        });
        setProposals(newProposals);
      } else {
        throw new Error(result.error || 'Failed to get AI proposal');
      }
    } catch (e: any) {
      console.error('[AITaggingAssistant] Error:', e);
      // Provide more detailed error message
      const errorMsg = e.message || 'Unknown error';
      setError(`Failed to analyze image: ${errorMsg}. Check console for details.`);
    } finally {
      setAnalyzing(null);
    }
  };

  // Apply proposal to database
  const applyProposal = async (assetId: string) => {
    const proposalData = proposals.get(assetId);
    if (!proposalData) return;

    setAnalyzing(assetId);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const relayUrl = `https://${projectId}.supabase.co/functions/v1/relay_ai_tagging/apply`;

      const response = await fetch(relayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          asset_id: assetId,
          proposal: proposalData.proposal,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('[AITaggingAssistant] Applied:', result);

      // Refresh assets
      await loadAssets();

      // Remove proposal from map
      const newProposals = new Map(proposals);
      newProposals.delete(assetId);
      setProposals(newProposals);
    } catch (e: any) {
      console.error('[AITaggingAssistant] Apply error:', e);
      setError(e.message);
    } finally {
      setAnalyzing(null);
    }
  };

  // Reject proposal
  const rejectProposal = (assetId: string) => {
    const newProposals = new Map(proposals);
    newProposals.delete(assetId);
    setProposals(newProposals);
  };

  return (
    <div className="p-8">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-[var(--text-muted)] hover:text-[var(--text-default)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Studios
        </button>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Bot className="w-6 h-6 text-[var(--accent-cyan)]" />
          <h1 className="text-2xl font-bold text-[var(--text-default)]">
            AI Tagging Assistant
          </h1>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          Powered by Gemini 2.0 Flash with Recoverlution taxonomy
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('untagged')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'untagged'
              ? 'bg-[var(--brand-primary)] text-white'
              : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-default)]'
          }`}
        >
          Untagged ({assets.filter(a => !a.pillar_id).length})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-[var(--brand-primary)] text-white'
              : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-default)]'
          }`}
        >
          All Images
        </button>
        <button
          onClick={loadAssets}
          className="ml-auto px-4 py-2 text-sm font-medium bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-default)] transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 text-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Error</h3>
              <p className="text-sm text-red-200/80">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 animate-spin text-[var(--accent-cyan)]" />
        </div>
      )}

      {/* Assets Grid */}
      {!loading && assets.length === 0 && (
        <div className="text-center py-12 text-[var(--text-muted)]">
          No assets found
        </div>
      )}

      {!loading && assets.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {assets.map((asset) => {
            const proposal = proposals.get(asset.id);
            
            return (
              <div
                key={asset.id}
                className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)]"
              >
                <div className="flex gap-6">
                  {/* Image Preview */}
                  <div className="flex-shrink-0">
                    <img
                      src={asset.public_url}
                      alt={asset.object_name}
                      className="w-48 h-48 object-cover bg-[var(--bg-default)]"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--text-default)] mb-2">
                      {asset.object_name}
                    </h3>

                    {/* Current Tags */}
                    <div className="mb-4 text-sm">
                      <div className="text-[var(--text-muted)] mb-1">Current:</div>
                      <div className="flex flex-wrap gap-2">
                        {asset.pillar_id && (
                          <span className="px-2 py-1 bg-[var(--brand-dark-purple)] text-white text-xs">
                            {asset.pillar_id}
                          </span>
                        )}
                        {asset.asset_class && (
                          <span className="px-2 py-1 bg-[var(--brand-mid-purple)] text-white text-xs">
                            {asset.asset_class}
                          </span>
                        )}
                        {!asset.pillar_id && !asset.asset_class && (
                          <span className="text-[var(--text-muted)] text-xs">No tags</span>
                        )}
                      </div>
                    </div>

                    {/* AI Proposal */}
                    {proposal && (
                      <div className="mb-4 p-4 bg-[var(--bg-default)] border border-[var(--accent-cyan)]/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Bot className="w-4 h-4 text-[var(--accent-cyan)]" />
                          <span className="text-sm font-semibold text-[var(--text-default)]">
                            AI Proposal (Confidence: {(proposal.proposal.confidence.overall * 100).toFixed(0)}%)
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                          {proposal.proposal.pillar_id && (
                            <div>
                              <span className="text-[var(--text-muted)]">Pillar:</span>
                              <span className="ml-2 text-[var(--text-default)]">{proposal.proposal.pillar_id}</span>
                            </div>
                          )}
                          {proposal.proposal.concept_id && (
                            <div>
                              <span className="text-[var(--text-muted)]">Concept:</span>
                              <span className="ml-2 text-[var(--text-default)]">{proposal.proposal.concept_id}</span>
                            </div>
                          )}
                          {proposal.proposal.theme_id && (
                            <div>
                              <span className="text-[var(--text-muted)]">Theme:</span>
                              <span className="ml-2 text-[var(--text-default)]">{proposal.proposal.theme_id}</span>
                            </div>
                          )}
                          {proposal.proposal.schema_id && (
                            <div>
                              <span className="text-[var(--text-muted)]">Schema:</span>
                              <span className="ml-2 text-[var(--text-default)]">{proposal.proposal.schema_id}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-[var(--text-muted)]">Class:</span>
                            <span className="ml-2 text-[var(--text-default)]">{proposal.proposal.asset_class}</span>
                          </div>
                        </div>

                        <div className="text-xs text-[var(--text-muted)] mb-3">
                          {proposal.proposal.reasoning}
                        </div>

                        {/* Approve/Reject */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => applyProposal(asset.id)}
                            disabled={analyzing === asset.id}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => rejectProposal(asset.id)}
                            disabled={analyzing === asset.id}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50 transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Analyze Button */}
                    {!proposal && (
                      <button
                        onClick={() => analyzeImage(asset)}
                        disabled={analyzing === asset.id}
                        className="flex items-center gap-2 px-6 py-2 bg-[var(--brand-primary)] text-white text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
                      >
                        {analyzing === asset.id ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Bot className="w-4 h-4" />
                            Analyze with AI
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}