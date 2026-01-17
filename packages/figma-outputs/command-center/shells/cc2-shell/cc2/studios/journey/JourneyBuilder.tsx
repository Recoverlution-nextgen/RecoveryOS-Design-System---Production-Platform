/**
 * JOURNEY BUILDER - Create & edit 13-scene journeys
 * Simplified for now - shows structure, can be expanded later
 */

import { useState, useEffect } from 'react';
import { X, Plus, GripVertical, Edit, Trash2, Save } from 'lucide-react';

interface Scene {
  sequence: number;
  type: string;
  phase?: string;
  headline: string;
  context?: string;
  duration_minutes: number;
}

interface JourneyBuilderProps {
  journeyId: string | null;
  onClose: () => void;
  onSave: () => void;
}

export function JourneyBuilder({ journeyId, onClose, onSave }: JourneyBuilderProps) {
  const [anchor, setAnchor] = useState('');
  const [pillarName, setPillarName] = useState('');
  const [description, setDescription] = useState('');
  const [eraHeadlines, setEraHeadlines] = useState({
    experience: '',
    recognize: '',
    align: '',
  });
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [editingScene, setEditingScene] = useState<number | null>(null);

  useEffect(() => {
    if (journeyId) {
      // Load existing journey for editing
      loadJourney(journeyId);
    } else {
      // Initialize with template structure
      initializeTemplate();
    }
  }, [journeyId]);

  function initializeTemplate() {
    setScenes([
      { sequence: 1, type: 'introduction', headline: '', context: '', duration_minutes: 3 },
      { sequence: 2, type: 'experience_teaching', phase: 'Experience', headline: '', context: '', duration_minutes: 5 },
      { sequence: 3, type: 'experience_cue', phase: 'Experience', headline: '', context: '', duration_minutes: 1 },
      { sequence: 4, type: 'experience_reflection', phase: 'Experience', headline: '', context: '', duration_minutes: 3 },
      { sequence: 5, type: 'bridge_e_to_r', headline: '', context: '', duration_minutes: 3 },
      { sequence: 6, type: 'recognize_teaching', phase: 'Recognize', headline: '', context: '', duration_minutes: 5 },
      { sequence: 7, type: 'recognize_cue', phase: 'Recognize', headline: '', context: '', duration_minutes: 1 },
      { sequence: 8, type: 'recognize_reflection', phase: 'Recognize', headline: '', context: '', duration_minutes: 3 },
      { sequence: 9, type: 'bridge_r_to_a', headline: '', context: '', duration_minutes: 3 },
      { sequence: 10, type: 'align_teaching', phase: 'Align', headline: '', context: '', duration_minutes: 5 },
      { sequence: 11, type: 'align_cue', phase: 'Align', headline: '', context: '', duration_minutes: 1 },
      { sequence: 12, type: 'align_reflection', phase: 'Align', headline: '', context: '', duration_minutes: 3 },
      { sequence: 13, type: 'integration', phase: 'Integrate', headline: '', context: '', duration_minutes: 5 },
    ]);
  }

  async function loadJourney(id: string) {
    // Load journey from backend
    console.log('Loading journey:', id);
  }

  function handleSave() {
    // Validate and save
    if (!anchor || !pillarName || scenes.length !== 13) {
      alert('Please fill in all required fields and ensure 13 scenes');
      return;
    }

    console.log('Saving journey:', { anchor, pillarName, eraHeadlines, scenes });
    onSave();
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center p-8">
        <div className="w-full max-w-5xl bg-[#0A0B0F] border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {journeyId ? 'Edit Journey' : 'Create New Journey'}
              </h2>
              <p className="text-sm text-zinc-400">13-scene transformational arc</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Journey
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Anchor (The Tool)
                </label>
                <input
                  type="text"
                  value={anchor}
                  onChange={(e) => setAnchor(e.target.value)}
                  placeholder="Buy 2 Seconds"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5739FB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Pillar
                  </label>
                  <select
                    value={pillarName}
                    onChange={(e) => setPillarName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#5739FB]"
                  >
                    <option value="">Select pillar</option>
                    <option value="Emotional Regulation">Emotional Regulation</option>
                    <option value="Stress Resilience">Stress Resilience</option>
                    <option value="Social Connectivity">Social Connectivity</option>
                    <option value="Cognitive Reframing">Cognitive Reframing</option>
                    <option value="Identity Integration">Identity Integration</option>
                    <option value="Decision Mastery">Decision Mastery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this journey about?"
                  rows={3}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5739FB]"
                />
              </div>
            </div>

            {/* ERA Headlines */}
            <div>
              <div className="text-sm font-medium text-zinc-400 mb-3">ERA Headlines</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Experience</label>
                  <input
                    type="text"
                    value={eraHeadlines.experience}
                    onChange={(e) => setEraHeadlines({ ...eraHeadlines, experience: e.target.value })}
                    placeholder="Where Urges Live"
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#5739FB]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Recognize</label>
                  <input
                    type="text"
                    value={eraHeadlines.recognize}
                    onChange={(e) => setEraHeadlines({ ...eraHeadlines, recognize: e.target.value })}
                    placeholder="The Source"
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#5739FB]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2">Align</label>
                  <input
                    type="text"
                    value={eraHeadlines.align}
                    onChange={(e) => setEraHeadlines({ ...eraHeadlines, align: e.target.value })}
                    placeholder="The Choice"
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#5739FB]"
                  />
                </div>
              </div>
            </div>

            {/* Scene List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-zinc-400">
                  13 Scenes ({scenes.length}/13)
                </div>
              </div>

              <div className="space-y-2">
                {scenes.map((scene, index) => (
                  <div
                    key={scene.sequence}
                    className="flex items-center gap-3 p-4 bg-black/40 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <GripVertical className="w-4 h-4 text-zinc-600" />
                    <div className="w-8 h-8 flex items-center justify-center bg-[#3E2BB8]/20 text-[#5739FB] font-bold text-sm">
                      {scene.sequence}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {scene.headline || 'Untitled Scene'}
                        </span>
                        {scene.phase && (
                          <span className="text-xs px-2 py-0.5 bg-[#5739FB]/20 text-[#5739FB]">
                            {scene.phase}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {scene.type.replace(/_/g, ' ')} · {scene.duration_minutes} min
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingScene(index)}
                      className="p-2 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
