import { useState } from 'react';
import { AlertCircle, CheckCircle, Play, RefreshCw, ArrowLeft } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';

interface EnrichmentResult {
  ok: boolean;
  accepted?: boolean;
  [key: string]: any;
}

interface EnrichmentPanelProps {
  onBack?: () => void;
}

export default function EnrichmentPanel({ onBack }: EnrichmentPanelProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EnrichmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const runEnrichment = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Hardcoded URL exactly as Supabase AI provided
      // PUBLIC endpoint - no auth needed
      const url = 'https://wzeqlkbmqxlsjryidagf.functions.supabase.co/relay_enrich_admin?prefix=dashboard-assets&force=true';

      console.log('[EnrichmentPanel] Calling:', url);

      const res = await fetch(url, {
        method: 'GET',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log('[EnrichmentPanel] Success:', data);
      setResult(data);
    } catch (e: any) {
      console.error('[EnrichmentPanel] Error:', e);
      setError(e.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl font-bold text-[var(--text-default)] mb-2">
          Media Enrichment
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Sync dashboard-assets bucket media metadata
        </p>
      </div>

      {/* ONE BUTTON */}
      <div className="mb-6">
        <button
          onClick={runEnrichment}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[var(--brand-primary)] text-white text-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Running enrichment...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Sync Media Assets
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 text-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Failed</h3>
              <p className="text-sm text-red-200/80">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Display */}
      {result && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 text-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Success</h3>
              <p className="text-sm text-green-200/80">Media enrichment triggered successfully</p>
            </div>
          </div>
        </div>
      )}

      {/* Full Result JSON */}
      {result && (
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <h2 className="text-lg font-semibold text-[var(--text-default)] mb-4">
            Response
          </h2>
          <pre className="text-xs text-[var(--text-muted)] overflow-auto max-h-96 p-4 bg-[var(--bg-default)] border border-[var(--border-default)]">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}