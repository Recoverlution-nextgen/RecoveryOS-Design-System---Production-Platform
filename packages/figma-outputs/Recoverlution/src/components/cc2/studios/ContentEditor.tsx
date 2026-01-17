/**
 * CONTENT EDITOR - CREATE/EDIT CONTENT CONTRACTS
 * Full form for content registry entries
 * Deliveries · Variants · Targeting · Safety · Measurement
 */

import { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, AlertCircle } from 'lucide-react';

interface ContentEditorProps {
  content: any | null;
  onSave: (data: any) => void;
  onCancel: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function ContentEditor({ content, onSave, onCancel, tenantScope }: ContentEditorProps) {
  const [formData, setFormData] = useState({
    content_kind: content?.content_kind || 'navicue',
    source_table: content?.source_table || '',
    source_pk: content?.source_pk || '',
    version: content?.version || '1.0.0',
    status: content?.status || 'draft',
    pillar_id: content?.pillar_id || '',
    theme_id: content?.theme_id || '',
    tags: content?.tags || [],
    state_fit: content?.state_fit || ['green', 'amber'],
    arousal_min: content?.arousal_min || 0,
    arousal_max: content?.arousal_max || 100,
    risk_level: content?.risk_level || 'low',
    contraindications: content?.contraindications || [],
    response_types: content?.response_types || [],
    measurement_intent: content?.measurement_intent || '',
    proof_pathway: content?.proof_pathway || 'receipt',
    visibility_scope: content?.visibility_scope || tenantScope,
  });

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const contentKinds = [
    'navicue',
    'practice',
    'article',
    'video',
    'soundbite',
    'journey_scene',
    'check_in',
    'meeting',
  ];

  const pillars = [
    { id: 'ER', label: 'Emotional Regulation' },
    { id: 'SR', label: 'Stress Resilience' },
    { id: 'SC', label: 'Social Connectivity' },
    { id: 'CR', label: 'Cognitive Reframing' },
    { id: 'II', label: 'Identity Integration' },
    { id: 'DM', label: 'Decision Mastery' },
  ];

  const statuses = ['draft', 'review', 'published', 'deprecated'];
  const riskLevels = ['low', 'medium', 'high', 'crisis_only'];
  const proofPathways = ['receipt', 'micro_proof', 'transfer_test', 'durability_check'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: string[] = [];
    if (!formData.content_kind) newErrors.push('Content kind is required');
    if (!formData.pillar_id) newErrors.push('Pillar is required');
    if (formData.tags.length === 0) newErrors.push('At least one tag is required');
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    onSave(formData);
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t: string) => t !== tag),
    });
  };

  const toggleStateFit = (state: string) => {
    const newStateFit = formData.state_fit.includes(state)
      ? formData.state_fit.filter((s: string) => s !== state)
      : [...formData.state_fit, state];
    setFormData({ ...formData, state_fit: newStateFit });
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {content ? 'Edit Content' : 'Create New Content'}
            </h1>
            <p className="text-zinc-400">
              Define the contract for this deliverable intervention
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-500/20 border border-red-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-400 mb-2">Please fix the following errors:</p>
                <ul className="text-sm text-red-300 space-y-1">
                  {errors.map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section className="bg-zinc-900/50 border border-zinc-800 p-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Content Kind *</label>
                <select
                  value={formData.content_kind}
                  onChange={(e) => setFormData({ ...formData, content_kind: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                >
                  {contentKinds.map((kind) => (
                    <option key={kind} value={kind}>
                      {kind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Source Table</label>
                <input
                  type="text"
                  value={formData.source_table}
                  onChange={(e) => setFormData({ ...formData, source_table: e.target.value })}
                  placeholder="e.g., navicues"
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#5739FB]"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Source PK</label>
                <input
                  type="text"
                  value={formData.source_pk}
                  onChange={(e) => setFormData({ ...formData, source_pk: e.target.value })}
                  placeholder="e.g., uuid or slug"
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#5739FB]"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Version</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Visibility Scope</label>
                <select
                  value={formData.visibility_scope}
                  onChange={(e) => setFormData({ ...formData, visibility_scope: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                >
                  <option value="platform">Platform</option>
                  <option value="org">Organization</option>
                  <option value="professional">Professional</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </section>

          {/* Targeting */}
          <section className="bg-zinc-900/50 border border-zinc-800 p-6">
            <h2 className="text-xl font-bold mb-4">Targeting</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Pillar *</label>
                <select
                  value={formData.pillar_id}
                  onChange={(e) => setFormData({ ...formData, pillar_id: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                >
                  <option value="">Select a pillar...</option>
                  {pillars.map((pillar) => (
                    <option key={pillar.id} value={pillar.id}>
                      {pillar.id} - {pillar.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-3">State Fit</label>
                <div className="flex gap-3">
                  {['green', 'amber', 'red'].map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => toggleStateFit(state)}
                      className={`
                        px-4 py-2 border transition-colors capitalize
                        ${formData.state_fit.includes(state)
                          ? state === 'green' ? 'border-green-500 bg-green-500/20 text-green-400'
                            : state === 'amber' ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400'
                            : 'border-red-500 bg-red-500/20 text-red-400'
                          : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                        }
                      `}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Arousal Min (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.arousal_min}
                    onChange={(e) => setFormData({ ...formData, arousal_min: parseInt(e.target.value) })}
                    className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Arousal Max (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.arousal_max}
                    onChange={(e) => setFormData({ ...formData, arousal_max: parseInt(e.target.value) })}
                    className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Tags *</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add a tag..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#5739FB]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag: string) => (
                    <div
                      key={tag}
                      className="px-3 py-1 bg-zinc-800 border border-zinc-700 flex items-center gap-2"
                    >
                      <span className="text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-zinc-500 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Safety */}
          <section className="bg-zinc-900/50 border border-zinc-800 p-6">
            <h2 className="text-xl font-bold mb-4">Safety</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Risk Level</label>
                <select
                  value={formData.risk_level}
                  onChange={(e) => setFormData({ ...formData, risk_level: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                >
                  {riskLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Measurement */}
          <section className="bg-zinc-900/50 border border-zinc-800 p-6">
            <h2 className="text-xl font-bold mb-4">Measurement & Proof</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Measurement Intent</label>
                <textarea
                  value={formData.measurement_intent}
                  onChange={(e) => setFormData({ ...formData, measurement_intent: e.target.value })}
                  placeholder="What should this content measure or achieve?"
                  rows={3}
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#5739FB]"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Proof Pathway</label>
                <select
                  value={formData.proof_pathway}
                  onChange={(e) => setFormData({ ...formData, proof_pathway: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:border-[#5739FB]"
                >
                  {proofPathways.map((pathway) => (
                    <option key={pathway} value={pathway}>
                      {pathway}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
