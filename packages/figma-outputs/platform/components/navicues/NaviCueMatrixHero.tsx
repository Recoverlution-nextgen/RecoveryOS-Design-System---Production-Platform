/**
 * NAVICUE MATRIX HERO
 * 
 * The definitive visualization of the NaviCue Arsenal organized by:
 * - Clinical Foundation: 6 Pillars (ER, SR, SC, CR, II, DM)
 * - Knowledge Layers: Knowing → Believing → Embodying
 * - Schema Coverage: 12 core schemas mapped to NaviCues
 * 
 * Respects infiniteK design:
 * - THE ANCHOR RULE: No card on card, no border on border
 * - No rounded corners
 * - Clean orthogonal grid
 * - Brand colors: #3E2BB8 and #5739FB
 * 
 * Data source: Actual Supabase navicues table
 */

import React, { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';

// ============================================================================
// TYPES (From actual schema)
// ============================================================================

interface NaviCue {
  navicue_id: string;
  name: string;
  family: string;
  text_line: string;
  pillar_id: 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM';
  kbe_layer: 'knowing' | 'believing' | 'embodying';
  schemas: string[];
  mindblock_codes: string[];
  response_type: string;
  voice_archetype: string;
  status: string;
  track: string;
  intent_primary: string;
  intent_secondary: string | null;
  delivery_mechanism: string;
}

interface PillarStats {
  pillar_id: string;
  pillar_name: string;
  pillar_color: string;
  total: number;
  knowing: number;
  believing: number;
  embodying: number;
  schemas_covered: string[];
}

interface SchemaStats {
  schema: string;
  total: number;
  by_pillar: Record<string, number>;
}

interface ResponseTypeStats {
  response_type: string;
  total: number;
  by_pillar: Record<string, number>;
}

interface IntentStats {
  intent: string;
  total: number;
  by_pillar: Record<string, number>;
  by_kbe: { knowing: number; believing: number; embodying: number };
}

interface VoiceArchetypeStats {
  archetype: string;
  total: number;
  by_pillar: Record<string, number>;
  by_kbe: { knowing: number; believing: number; embodying: number };
}

interface TrackStats {
  track: string;
  total: number;
  pillars: Record<string, number>;
}

// ============================================================================
// PILLAR DEFINITIONS (From clinical foundation)
// ============================================================================

const PILLARS = {
  ER: { name: 'Emotional Regulation', color: '#EF4444', description: 'Emotional awareness, modulation, window of tolerance' },
  SR: { name: 'Self Regulation', color: '#F59E0B', description: 'Impulse control, habits, delayed gratification' },
  SC: { name: 'Social Connection', color: '#10B981', description: 'Attachment, trust, intimacy, vulnerability' },
  CR: { name: 'Cognitive Reframing', color: '#3B82F6', description: 'Thought patterns, perspective shifts, beliefs' },
  II: { name: 'Identity Integration', color: '#8B5CF6', description: 'Self-concept, roles, values, integration' },
  DM: { name: 'Developing Meaning', color: '#EC4899', description: 'Purpose, values, spirituality, meaning-making' },
};

const CORE_SCHEMAS = [
  'shame',
  'control',
  'abandonment',
  'perfectionism',
  'victimhood',
  'emotional-suppression',
  'people-pleasing',
  'scarcity',
  'comparison',
  'catastrophizing',
  'identity-fusion',
  'safety-seeking',
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function NaviCueMatrixHero() {
  const [loading, setLoading] = useState(true);
  const [pillarStats, setPillarStats] = useState<PillarStats[]>([]);
  const [schemaStats, setSchemaStats] = useState<SchemaStats[]>([]);
  const [responseTypeStats, setResponseTypeStats] = useState<ResponseTypeStats[]>([]);
  const [intentStats, setIntentStats] = useState<IntentStats[]>([]);
  const [voiceArchetypeStats, setVoiceArchetypeStats] = useState<VoiceArchetypeStats[]>([]);
  const [trackStats, setTrackStats] = useState<TrackStats[]>([]);
  const [totalNaviCues, setTotalNaviCues] = useState(0);
  const [view, setView] = useState<'pillars' | 'schemas' | 'kbe' | 'response' | 'intent' | 'voice' | 'track'>('pillars');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const supabase = createClient();

      // Fetch all NaviCues (no status filter - get all)
      const { data: navicues, error } = await supabase
        .from('navicues')
        .select('*');

      if (error) {
        console.error('Error loading stats:', error);
        setLoading(false);
        return;
      }
      
      if (!navicues || navicues.length === 0) {
        console.warn('No NaviCues found in database');
        setLoading(false);
        return;
      }

      console.log(`✅ Loaded ${navicues.length} NaviCues from Supabase`);

      // Calculate pillar stats
      const pillarStatsMap: Record<string, PillarStats> = {};
      Object.keys(PILLARS).forEach(pillarId => {
        pillarStatsMap[pillarId] = {
          pillar_id: pillarId,
          pillar_name: PILLARS[pillarId as keyof typeof PILLARS].name,
          pillar_color: PILLARS[pillarId as keyof typeof PILLARS].color,
          total: 0,
          knowing: 0,
          believing: 0,
          embodying: 0,
          schemas_covered: [],
        };
      });

      navicues.forEach((nc: any) => {
        const pillar = pillarStatsMap[nc.pillar_id];
        if (pillar) {
          pillar.total++;
          if (nc.kbe_layer === 'knowing') pillar.knowing++;
          else if (nc.kbe_layer === 'believing') pillar.believing++;
          else if (nc.kbe_layer === 'embodying') pillar.embodying++;

          // Track schemas
          if (nc.schemas && Array.isArray(nc.schemas)) {
            nc.schemas.forEach((schema: string) => {
              if (!pillar.schemas_covered.includes(schema)) {
                pillar.schemas_covered.push(schema);
              }
            });
          }
        }
      });

      setPillarStats(Object.values(pillarStatsMap));
      setTotalNaviCues(navicues.length);

      // Calculate schema stats
      const schemaStatsMap: Record<string, SchemaStats> = {};
      CORE_SCHEMAS.forEach(schema => {
        schemaStatsMap[schema] = {
          schema,
          total: 0,
          by_pillar: {},
        };
      });

      navicues.forEach((nc: any) => {
        if (nc.schemas && Array.isArray(nc.schemas)) {
          nc.schemas.forEach((schema: string) => {
            if (schemaStatsMap[schema]) {
              schemaStatsMap[schema].total++;
              schemaStatsMap[schema].by_pillar[nc.pillar_id] = 
                (schemaStatsMap[schema].by_pillar[nc.pillar_id] || 0) + 1;
            }
          });
        }
      });

      setSchemaStats(Object.values(schemaStatsMap).sort((a, b) => b.total - a.total));

      // Calculate response type stats
      const responseTypeStatsMap: Record<string, ResponseTypeStats> = {};
      navicues.forEach((nc: any) => {
        if (!responseTypeStatsMap[nc.response_type]) {
          responseTypeStatsMap[nc.response_type] = {
            response_type: nc.response_type,
            total: 0,
            by_pillar: {},
          };
        }
        responseTypeStatsMap[nc.response_type].total++;
        responseTypeStatsMap[nc.response_type].by_pillar[nc.pillar_id] = 
          (responseTypeStatsMap[nc.response_type].by_pillar[nc.pillar_id] || 0) + 1;
      });

      setResponseTypeStats(Object.values(responseTypeStatsMap));

      // Calculate intent stats
      const intentStatsMap: Record<string, IntentStats> = {};
      navicues.forEach((nc: any) => {
        const primaryIntent = nc.intent_primary;
        const secondaryIntent = nc.intent_secondary;

        // Only process if primary intent exists
        if (primaryIntent) {
          if (!intentStatsMap[primaryIntent]) {
            intentStatsMap[primaryIntent] = {
              intent: primaryIntent,
              total: 0,
              by_pillar: {},
              by_kbe: { knowing: 0, believing: 0, embodying: 0 },
            };
          }
          intentStatsMap[primaryIntent].total++;
          intentStatsMap[primaryIntent].by_pillar[nc.pillar_id] = 
            (intentStatsMap[primaryIntent].by_pillar[nc.pillar_id] || 0) + 1;
          intentStatsMap[primaryIntent].by_kbe[nc.kbe_layer] = 
            (intentStatsMap[primaryIntent].by_kbe[nc.kbe_layer] || 0) + 1;
        }

        // Process secondary intent if it exists
        if (secondaryIntent) {
          if (!intentStatsMap[secondaryIntent]) {
            intentStatsMap[secondaryIntent] = {
              intent: secondaryIntent,
              total: 0,
              by_pillar: {},
              by_kbe: { knowing: 0, believing: 0, embodying: 0 },
            };
          }
          intentStatsMap[secondaryIntent].total++;
          intentStatsMap[secondaryIntent].by_pillar[nc.pillar_id] = 
            (intentStatsMap[secondaryIntent].by_pillar[nc.pillar_id] || 0) + 1;
          intentStatsMap[secondaryIntent].by_kbe[nc.kbe_layer] = 
            (intentStatsMap[secondaryIntent].by_kbe[nc.kbe_layer] || 0) + 1;
        }
      });

      setIntentStats(Object.values(intentStatsMap));

      // Calculate voice archetype stats
      const voiceArchetypeStatsMap: Record<string, VoiceArchetypeStats> = {};
      navicues.forEach((nc: any) => {
        // Only process if voice archetype exists
        if (nc.voice_archetype) {
          if (!voiceArchetypeStatsMap[nc.voice_archetype]) {
            voiceArchetypeStatsMap[nc.voice_archetype] = {
              archetype: nc.voice_archetype,
              total: 0,
              by_pillar: {},
              by_kbe: { knowing: 0, believing: 0, embodying: 0 },
            };
          }
          voiceArchetypeStatsMap[nc.voice_archetype].total++;
          voiceArchetypeStatsMap[nc.voice_archetype].by_pillar[nc.pillar_id] = 
            (voiceArchetypeStatsMap[nc.voice_archetype].by_pillar[nc.pillar_id] || 0) + 1;
          voiceArchetypeStatsMap[nc.voice_archetype].by_kbe[nc.kbe_layer] = 
            (voiceArchetypeStatsMap[nc.voice_archetype].by_kbe[nc.kbe_layer] || 0) + 1;
        }
      });

      setVoiceArchetypeStats(Object.values(voiceArchetypeStatsMap));

      // Calculate track stats
      const trackStatsMap: Record<string, TrackStats> = {};
      navicues.forEach((nc: any) => {
        // Only process if track exists
        if (nc.track) {
          if (!trackStatsMap[nc.track]) {
            trackStatsMap[nc.track] = {
              track: nc.track,
              total: 0,
              pillars: {},
            };
          }
          trackStatsMap[nc.track].total++;;
          trackStatsMap[nc.track].pillars[nc.pillar_id] = 
            (trackStatsMap[nc.track].pillars[nc.pillar_id] || 0) + 1;
        }
      });

      setTrackStats(Object.values(trackStatsMap));
      setLoading(false);
    } catch (error) {
      console.error('Error loading stats:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-8 flex items-center justify-center" style={{ color: '#FFFFFF' }}>
        <div className="text-center">
          <div className="text-2xl mb-4">Loading NaviCue Arsenal</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Fetching from Supabase...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8" style={{ color: '#FFFFFF' }}>
      {/* HEADER */}
      <div className="mb-12">
        <div className="mb-6">
          <h1 className="text-5xl mb-3">NaviCue Arsenal</h1>
          <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Clinical foundation organized by Pillar → Schema → Knowledge Layer
          </p>
        </div>

        {/* TOTAL COUNT */}
        <div 
          className="inline-block px-8 py-6 border-2"
          style={{ 
            borderColor: '#5739FB',
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
          }}
        >
          <div className="text-6xl mb-2" style={{ color: '#5739FB' }}>{totalNaviCues}</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Total Active NaviCues
          </div>
        </div>
      </div>

      {/* VIEW SELECTOR */}
      <div className="mb-12 flex gap-4">
        <button
          onClick={() => setView('pillars')}
          className="px-6 py-3 border-2 transition-all"
          style={{
            borderColor: view === 'pillars' ? '#5739FB' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: view === 'pillars' ? 'rgba(87, 57, 251, 0.2)' : 'transparent',
            color: view === 'pillars' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Pillar Matrix
        </button>
        <button
          onClick={() => setView('schemas')}
          className="px-6 py-3 border-2 transition-all"
          style={{
            borderColor: view === 'schemas' ? '#5739FB' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: view === 'schemas' ? 'rgba(87, 57, 251, 0.2)' : 'transparent',
            color: view === 'schemas' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Schema Coverage
        </button>
        <button
          onClick={() => setView('kbe')}
          className="px-6 py-3 border-2 transition-all"
          style={{
            borderColor: view === 'kbe' ? '#5739FB' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: view === 'kbe' ? 'rgba(87, 57, 251, 0.2)' : 'transparent',
            color: view === 'kbe' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          KBE Distribution
        </button>
        <button
          onClick={() => setView('response')}
          className="px-6 py-3 border-2 transition-all"
          style={{
            borderColor: view === 'response' ? '#5739FB' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: view === 'response' ? 'rgba(87, 57, 251, 0.2)' : 'transparent',
            color: view === 'response' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Response Type
        </button>
        <button
          onClick={() => setView('intent')}
          className="px-6 py-3 border-2 transition-all"
          style={{
            borderColor: view === 'intent' ? '#5739FB' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: view === 'intent' ? 'rgba(87, 57, 251, 0.2)' : 'transparent',
            color: view === 'intent' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Intent
        </button>
        <button
          onClick={() => setView('voice')}
          className="px-6 py-3 border-2 transition-all"
          style={{
            borderColor: view === 'voice' ? '#5739FB' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: view === 'voice' ? 'rgba(87, 57, 251, 0.2)' : 'transparent',
            color: view === 'voice' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Voice Archetype
        </button>
        <button
          onClick={() => setView('track')}
          className="px-6 py-3 border-2 transition-all"
          style={{
            borderColor: view === 'track' ? '#5739FB' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: view === 'track' ? 'rgba(87, 57, 251, 0.2)' : 'transparent',
            color: view === 'track' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          Track
        </button>
      </div>

      {/* PILLAR MATRIX VIEW */}
      {view === 'pillars' && (
        <PillarMatrixView 
          stats={pillarStats} 
          selectedPillar={selectedPillar}
          onSelectPillar={setSelectedPillar}
        />
      )}

      {/* SCHEMA COVERAGE VIEW */}
      {view === 'schemas' && (
        <SchemaCoverageView stats={schemaStats} pillarStats={pillarStats} />
      )}

      {/* KBE DISTRIBUTION VIEW */}
      {view === 'kbe' && (
        <KBEDistributionView stats={pillarStats} />
      )}

      {/* RESPONSE TYPE VIEW */}
      {view === 'response' && (
        <ResponseTypeView stats={responseTypeStats} pillarStats={pillarStats} />
      )}

      {/* INTENT VIEW */}
      {view === 'intent' && (
        <IntentView stats={intentStats} pillarStats={pillarStats} />
      )}

      {/* VOICE ARCHETYPE VIEW */}
      {view === 'voice' && (
        <VoiceArchetypeView stats={voiceArchetypeStats} pillarStats={pillarStats} />
      )}

      {/* TRACK VIEW */}
      {view === 'track' && (
        <TrackView stats={trackStats} pillarStats={pillarStats} />
      )}
    </div>
  );
}

// ============================================================================
// PILLAR MATRIX VIEW
// ============================================================================

function PillarMatrixView({ stats, selectedPillar, onSelectPillar }: {
  stats: PillarStats[];
  selectedPillar: string | null;
  onSelectPillar: (pillar: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      {stats.map(pillar => {
        const isSelected = selectedPillar === pillar.pillar_id;

        return (
          <div key={pillar.pillar_id}>
            <button
              onClick={() => onSelectPillar(isSelected ? null : pillar.pillar_id)}
              className="w-full text-left border-2 transition-all"
              style={{
                borderColor: isSelected ? pillar.pillar_color : 'rgba(255, 255, 255, 0.1)',
                backgroundColor: isSelected ? `${pillar.pillar_color}20` : 'transparent',
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {/* Pillar Header */}
                    <div className="flex items-center gap-4 mb-3">
                      <div 
                        className="w-16 h-16 border-2 flex items-center justify-center"
                        style={{ borderColor: pillar.pillar_color }}
                      >
                        <span className="text-2xl" style={{ color: pillar.pillar_color }}>
                          {pillar.pillar_id}
                        </span>
                      </div>
                      <div>
                        <div className="text-2xl mb-1">{pillar.pillar_name}</div>
                        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          {PILLARS[pillar.pillar_id as keyof typeof PILLARS].description}
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-5 gap-4 mt-6">
                      <div className="border-l-2 pl-4" style={{ borderColor: pillar.pillar_color }}>
                        <div className="text-3xl mb-1">{pillar.total}</div>
                        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Total NaviCues
                        </div>
                      </div>
                      <div className="border-l-2 pl-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <div className="text-3xl mb-1">{pillar.knowing}</div>
                        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Knowing
                        </div>
                      </div>
                      <div className="border-l-2 pl-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <div className="text-3xl mb-1">{pillar.believing}</div>
                        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Believing
                        </div>
                      </div>
                      <div className="border-l-2 pl-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <div className="text-3xl mb-1">{pillar.embodying}</div>
                        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Embodying
                        </div>
                      </div>
                      <div className="border-l-2 pl-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <div className="text-3xl mb-1">{pillar.schemas_covered.length}</div>
                        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Schemas Covered
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Expanded Schema Detail */}
            {isSelected && (
              <div 
                className="mt-4 p-6 border-2"
                style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="text-lg mb-4">Schemas Addressed by {pillar.pillar_id}</div>
                <div className="grid grid-cols-4 gap-3">
                  {pillar.schemas_covered.map(schema => (
                    <div 
                      key={schema}
                      className="px-4 py-2 border"
                      style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <div className="text-sm">{schema}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// SCHEMA COVERAGE VIEW
// ============================================================================

function SchemaCoverageView({ stats, pillarStats }: {
  stats: SchemaStats[];
  pillarStats: PillarStats[];
}) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="text-2xl mb-2">12 Core Schemas</div>
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          NaviCue coverage for each schema, broken down by pillar
        </div>
      </div>

      {stats.map(schema => (
        <div 
          key={schema.schema}
          className="border-2 p-6"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl mb-1 capitalize">{schema.schema.replace(/-/g, ' ')}</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {schema.total} NaviCues total
              </div>
            </div>
            <div 
              className="w-20 h-20 border-2 flex items-center justify-center"
              style={{ borderColor: '#5739FB' }}
            >
              <span className="text-3xl" style={{ color: '#5739FB' }}>
                {schema.total}
              </span>
            </div>
          </div>

          {/* Pillar Breakdown */}
          <div className="grid grid-cols-6 gap-3">
            {Object.keys(PILLARS).map(pillarId => {
              const count = schema.by_pillar[pillarId] || 0;
              const pillarColor = PILLARS[pillarId as keyof typeof PILLARS].color;

              return (
                <div 
                  key={pillarId}
                  className="border p-3 text-center"
                  style={{ borderColor: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="text-2xl mb-1" style={{ color: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.3)' }}>
                    {count}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {pillarId}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// KBE DISTRIBUTION VIEW
// ============================================================================

function KBEDistributionView({ stats }: { stats: PillarStats[] }) {
  // Calculate totals across all pillars
  const totalKnowing = stats.reduce((sum, p) => sum + p.knowing, 0);
  const totalBelieving = stats.reduce((sum, p) => sum + p.believing, 0);
  const totalEmbodying = stats.reduce((sum, p) => sum + p.embodying, 0);
  const total = totalKnowing + totalBelieving + totalEmbodying;

  return (
    <div className="space-y-8">
      {/* Overall Distribution */}
      <div>
        <div className="text-2xl mb-6">Knowledge → Belief → Embodiment Distribution</div>
        <div className="grid grid-cols-3 gap-6">
          <div 
            className="border-2 p-8"
            style={{ borderColor: '#3B82F6' }}
          >
            <div className="text-5xl mb-3" style={{ color: '#3B82F6' }}>{totalKnowing}</div>
            <div className="text-xl mb-2">Knowing</div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {((totalKnowing / total) * 100).toFixed(1)}% of total
            </div>
            <div className="text-xs mt-4" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Awareness, assessment, pattern recognition
            </div>
          </div>

          <div 
            className="border-2 p-8"
            style={{ borderColor: '#F59E0B' }}
          >
            <div className="text-5xl mb-3" style={{ color: '#F59E0B' }}>{totalBelieving}</div>
            <div className="text-xl mb-2">Believing</div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {((totalBelieving / total) * 100).toFixed(1)}% of total
            </div>
            <div className="text-xs mt-4" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Reframes, perspective shifts, new beliefs
            </div>
          </div>

          <div 
            className="border-2 p-8"
            style={{ borderColor: '#10B981' }}
          >
            <div className="text-5xl mb-3" style={{ color: '#10B981' }}>{totalEmbodying}</div>
            <div className="text-xl mb-2">Embodying</div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {((totalEmbodying / total) * 100).toFixed(1)}% of total
            </div>
            <div className="text-xs mt-4" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Practices, integration, automaticity
            </div>
          </div>
        </div>
      </div>

      {/* By Pillar */}
      <div>
        <div className="text-2xl mb-6">KBE Distribution by Pillar</div>
        <div className="space-y-4">
          {stats.map(pillar => {
            const pillarTotal = pillar.knowing + pillar.believing + pillar.embodying;

            return (
              <div 
                key={pillar.pillar_id}
                className="border-2 p-6"
                style={{ borderColor: pillar.pillar_color }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 border-2 flex items-center justify-center"
                    style={{ borderColor: pillar.pillar_color }}
                  >
                    <span style={{ color: pillar.pillar_color }}>{pillar.pillar_id}</span>
                  </div>
                  <div className="text-xl">{pillar.pillar_name}</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl mb-1">{pillar.knowing}</div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      Knowing ({((pillar.knowing / pillarTotal) * 100).toFixed(0)}%)
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">{pillar.believing}</div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      Believing ({((pillar.believing / pillarTotal) * 100).toFixed(0)}%)
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">{pillar.embodying}</div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      Embodying ({((pillar.embodying / pillarTotal) * 100).toFixed(0)}%)
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// RESPONSE TYPE VIEW
// ============================================================================

function ResponseTypeView({ stats, pillarStats }: {
  stats: ResponseTypeStats[];
  pillarStats: PillarStats[];
}) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="text-2xl mb-2">Response Types</div>
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          NaviCue response types, broken down by pillar
        </div>
      </div>

      {stats.map(responseType => (
        <div 
          key={responseType.response_type}
          className="border-2 p-6"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl mb-1 capitalize">{responseType.response_type.replace(/-/g, ' ')}</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {responseType.total} NaviCues total
              </div>
            </div>
            <div 
              className="w-20 h-20 border-2 flex items-center justify-center"
              style={{ borderColor: '#5739FB' }}
            >
              <span className="text-3xl" style={{ color: '#5739FB' }}>
                {responseType.total}
              </span>
            </div>
          </div>

          {/* Pillar Breakdown */}
          <div className="grid grid-cols-6 gap-3">
            {Object.keys(PILLARS).map(pillarId => {
              const count = responseType.by_pillar[pillarId] || 0;
              const pillarColor = PILLARS[pillarId as keyof typeof PILLARS].color;

              return (
                <div 
                  key={pillarId}
                  className="border p-3 text-center"
                  style={{ borderColor: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="text-2xl mb-1" style={{ color: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.3)' }}>
                    {count}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {pillarId}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// INTENT VIEW
// ============================================================================

function IntentView({ stats, pillarStats }: {
  stats: IntentStats[];
  pillarStats: PillarStats[];
}) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="text-2xl mb-2">Intents</div>
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          NaviCue intents, broken down by pillar and KBE layer
        </div>
      </div>

      {stats.map(intent => (
        <div 
          key={intent.intent}
          className="border-2 p-6"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl mb-1 capitalize">{intent.intent.replace(/-/g, ' ')}</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {intent.total} NaviCues total
              </div>
            </div>
            <div 
              className="w-20 h-20 border-2 flex items-center justify-center"
              style={{ borderColor: '#5739FB' }}
            >
              <span className="text-3xl" style={{ color: '#5739FB' }}>
                {intent.total}
              </span>
            </div>
          </div>

          {/* Pillar Breakdown */}
          <div className="grid grid-cols-6 gap-3">
            {Object.keys(PILLARS).map(pillarId => {
              const count = intent.by_pillar[pillarId] || 0;
              const pillarColor = PILLARS[pillarId as keyof typeof PILLARS].color;

              return (
                <div 
                  key={pillarId}
                  className="border p-3 text-center"
                  style={{ borderColor: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="text-2xl mb-1" style={{ color: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.3)' }}>
                    {count}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {pillarId}
                  </div>
                </div>
              );
            })}
          </div>

          {/* KBE Layer Breakdown */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div 
              className="border p-3 text-center"
              style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <div className="text-2xl mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {intent.by_kbe.knowing}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Knowing
              </div>
            </div>
            <div 
              className="border p-3 text-center"
              style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <div className="text-2xl mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {intent.by_kbe.believing}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Believing
              </div>
            </div>
            <div 
              className="border p-3 text-center"
              style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <div className="text-2xl mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {intent.by_kbe.embodying}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Embodying
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// VOICE ARCHETYPE VIEW
// ============================================================================

function VoiceArchetypeView({ stats, pillarStats }: {
  stats: VoiceArchetypeStats[];
  pillarStats: PillarStats[];
}) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="text-2xl mb-2">Voice Archetypes</div>
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          NaviCue voice archetypes, broken down by pillar and KBE layer
        </div>
      </div>

      {stats.map(archetype => (
        <div 
          key={archetype.archetype}
          className="border-2 p-6"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl mb-1 capitalize">{archetype.archetype.replace(/-/g, ' ')}</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {archetype.total} NaviCues total
              </div>
            </div>
            <div 
              className="w-20 h-20 border-2 flex items-center justify-center"
              style={{ borderColor: '#5739FB' }}
            >
              <span className="text-3xl" style={{ color: '#5739FB' }}>
                {archetype.total}
              </span>
            </div>
          </div>

          {/* Pillar Breakdown */}
          <div className="grid grid-cols-6 gap-3">
            {Object.keys(PILLARS).map(pillarId => {
              const count = archetype.by_pillar[pillarId] || 0;
              const pillarColor = PILLARS[pillarId as keyof typeof PILLARS].color;

              return (
                <div 
                  key={pillarId}
                  className="border p-3 text-center"
                  style={{ borderColor: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="text-2xl mb-1" style={{ color: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.3)' }}>
                    {count}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {pillarId}
                  </div>
                </div>
              );
            })}
          </div>

          {/* KBE Layer Breakdown */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div 
              className="border p-3 text-center"
              style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <div className="text-2xl mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {archetype.by_kbe.knowing}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Knowing
              </div>
            </div>
            <div 
              className="border p-3 text-center"
              style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <div className="text-2xl mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {archetype.by_kbe.believing}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Believing
              </div>
            </div>
            <div 
              className="border p-3 text-center"
              style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <div className="text-2xl mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {archetype.by_kbe.embodying}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Embodying
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// TRACK VIEW
// ============================================================================

function TrackView({ stats, pillarStats }: {
  stats: TrackStats[];
  pillarStats: PillarStats[];
}) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="text-2xl mb-2">Tracks</div>
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          NaviCue tracks, broken down by pillar
        </div>
      </div>

      {stats.map(track => (
        <div 
          key={track.track}
          className="border-2 p-6"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl mb-1 capitalize">{track.track.replace(/-/g, ' ')}</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {track.total} NaviCues total
              </div>
            </div>
            <div 
              className="w-20 h-20 border-2 flex items-center justify-center"
              style={{ borderColor: '#5739FB' }}
            >
              <span className="text-3xl" style={{ color: '#5739FB' }}>
                {track.total}
              </span>
            </div>
          </div>

          {/* Pillar Breakdown */}
          <div className="grid grid-cols-6 gap-3">
            {Object.keys(PILLARS).map(pillarId => {
              const count = track.pillars[pillarId] || 0;
              const pillarColor = PILLARS[pillarId as keyof typeof PILLARS].color;

              return (
                <div 
                  key={pillarId}
                  className="border p-3 text-center"
                  style={{ borderColor: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="text-2xl mb-1" style={{ color: count > 0 ? pillarColor : 'rgba(255, 255, 255, 0.3)' }}>
                    {count}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {pillarId}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}