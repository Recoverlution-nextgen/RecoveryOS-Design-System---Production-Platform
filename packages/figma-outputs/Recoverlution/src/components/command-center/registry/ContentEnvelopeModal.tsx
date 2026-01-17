// CONTENT ENVELOPE MODAL + RESPONSE CONTRACT VALIDATOR
import { useContentEnvelope } from '@/lib/hooks/useRegistry';
import { X, CheckCircle2, AlertCircle, Shield, Zap } from 'lucide-react';

interface Props {
  contentRef: string;
  onClose: () => void;
}

export function ContentEnvelopeModal({ contentRef, onClose }: Props) {
  const { data: content, isLoading } = useContentEnvelope(contentRef);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-white/10 rounded-lg p-8">
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!content) {
    return null;
  }
  
  const hasValidContract = !!content.response_contract;
  const hasWhyNow = !!content.why_now_template;
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-medium text-white/90">Content Envelope</h2>
            <p className="text-sm text-white/50">{content.canonical_id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Identity */}
          <Section title="Identity" icon="🆔">
            <Field label="Content Kind" value={content.content_kind} />
            <Field label="Source Table" value={content.source_table} />
            <Field label="Source PK" value={content.source_pk} />
            <Field label="Version" value={`v${content.version}`} />
            <Field label="Status" value={content.status} />
          </Section>
          
          {/* Targeting */}
          <Section title="Targeting" icon="🎯">
            <Field label="Pillar" value={content.pillar_id} />
            {content.theme_id && <Field label="Theme" value={content.theme_id} />}
            <Field label="Tags" value={content.tags.join(', ') || 'None'} />
            <Field label="State Bands" value={content.state_band_allowed.join(', ')} />
            <Field label="Arousal Contexts" value={content.arousal_context_allowed.join(', ')} />
          </Section>
          
          {/* Safety */}
          <Section title="Safety" icon="🛡️">
            <Field label="Risk Level" value={content.risk_level} />
            <Field label="Harm Types" value={content.harm_types.join(', ') || 'None'} />
            <Field label="Requires Support" value={content.requires_support ? 'Yes' : 'No'} />
            {content.contraindications.length > 0 && (
              <Field label="Contraindications" value={content.contraindications.join(', ')} />
            )}
          </Section>
          
          {/* Response Contract */}
          <Section
            title="Response Contract"
            icon="📝"
            status={hasValidContract ? 'valid' : 'invalid'}
          >
            {hasValidContract ? (
              <>
                <Field label="Required" value={content.response_contract.required ? 'Yes' : 'No'} />
                <Field label="Type" value={content.response_contract.type} />
                <Field label="Proof Mode" value={content.response_contract.proof_capture_mode} />
                <Field label="On No Response" value={content.response_contract.on_no_response} />
                {content.response_contract.entry_cue && (
                  <Field label="Entry Cue" value={content.response_contract.entry_cue} />
                )}
                {content.response_contract.exit_receipt && (
                  <Field label="Exit Receipt" value={content.response_contract.exit_receipt} />
                )}
              </>
            ) : (
              <p className="text-sm text-red-400">Missing or invalid contract</p>
            )}
          </Section>
          
          {/* WhyNow */}
          <Section
            title="WhyNow Template"
            icon="💡"
            status={hasWhyNow ? 'valid' : 'invalid'}
          >
            {hasWhyNow ? (
              <>
                <div className="p-3 bg-white/5 border border-white/10 rounded">
                  <p className="text-sm text-white/90 font-mono">{content.why_now_template}</p>
                </div>
                <Field label="Inputs" value={content.why_now_inputs.join(', ')} />
              </>
            ) : (
              <p className="text-sm text-red-400">Missing WhyNow template</p>
            )}
          </Section>
          
          {/* Measurement */}
          <Section title="Measurement Contract" icon="📊">
            <Field label="Signals Captured" value={content.measurement_contract.signals_captured.join(', ')} />
            <Field label="Proof Pathway" value={content.measurement_contract.proof_pathway} />
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  status,
  children,
}: {
  title: string;
  icon: string;
  status?: 'valid' | 'invalid';
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <h3 className="text-sm font-medium text-white/90">{title}</h3>
        </div>
        {status && (
          status === 'valid' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )
        )}
      </div>
      <div className="p-4 space-y-2">
        {children}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-white/50">{label}:</span>
      <span className="text-white/90 font-medium">{value}</span>
    </div>
  );
}

// Response Contract Validator component (exported separately if needed)
export function ResponseContractValidator({ contract }: { contract: any }) {
  const isValid = contract &&
    typeof contract.required === 'boolean' &&
    contract.type &&
    contract.proof_capture_mode &&
    contract.on_no_response;
  
  return (
    <div className={`p-3 border rounded ${isValid ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
      <div className="flex items-center gap-2">
        {isValid ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-400" />
        )}
        <span className={`text-sm font-medium ${isValid ? 'text-emerald-400' : 'text-red-400'}`}>
          {isValid ? 'Valid Contract' : 'Invalid Contract'}
        </span>
      </div>
    </div>
  );
}
