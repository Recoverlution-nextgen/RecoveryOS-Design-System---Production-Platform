/**
 * NAVICUE TYPE BUILDER - Command Center Room
 * 
 * 100 Bridge Types that aggregate/surface content from ALL rooms
 * 
 * Categories:
 * - Content Aggregators (30 types)
 * - Integration Mechanisms (20 types)
 * - Proof & Transfer Bridges (15 types)
 * - Reflection & Integration (15 types)
 * - LUMA Voice Integration (20 types)
 */

import React, { useState } from 'react';

interface NaviCueTypeBuilderRoomProps {
  onNavigate: (page: string) => void;
}

type NaviCueCategory = 'aggregators' | 'integration' | 'proof' | 'reflection' | 'luma-voice';

export default function NaviCueTypeBuilderRoom({ onNavigate }: NaviCueTypeBuilderRoomProps) {
  const [category, setCategory] = useState<NaviCueCategory>('aggregators');

  return (
    <div className="platform-container" style={{ paddingTop: 'var(--spacing-7)' }}>
      {/* Header */}
      <div className="glass-primary" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
        <button
          onClick={() => onNavigate('/command-center-execution')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-none)',
            padding: 'var(--spacing-2) var(--spacing-3)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          ← Back to Command Center
        </button>

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <span style={{ fontSize: '40px', marginRight: 'var(--spacing-3)' }}>🔗</span>
          <h1 style={{ display: 'inline', fontSize: 'var(--font-size-display)' }}>NaviCue Type Builder</h1>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>
          100 bridge types that aggregate/surface content from ALL rooms into LUMA
        </p>

        {/* Category Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-2)' }}>
          {[
            { id: 'aggregators' as NaviCueCategory, label: 'Content Aggregators', count: 30, icon: '📦' },
            { id: 'integration' as NaviCueCategory, label: 'Integration', count: 20, icon: '🔄' },
            { id: 'proof' as NaviCueCategory, label: 'Proof & Transfer', count: 15, icon: '✅' },
            { id: 'reflection' as NaviCueCategory, label: 'Reflection', count: 15, icon: '🪞' },
            { id: 'luma-voice' as NaviCueCategory, label: 'LUMA Voice', count: 20, icon: '🎙️' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: 'var(--spacing-3)',
                background: category === cat.id ? 'rgba(87, 57, 251, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: category === cat.id ? '1px solid rgba(87, 57, 251, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-none)',
                color: category === cat.id ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: 'var(--spacing-1)' }}>{cat.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 'var(--font-weight-semibold)' }}>{cat.label}</div>
              <div style={{ fontSize: '11px', opacity: 0.7 }}>{cat.count} types</div>
            </button>
          ))}
        </div>
      </div>

      {/* NaviCue Types */}
      <NaviCueTypesList category={category} />
    </div>
  );
}

// ============================================================================
// NAVICUE TYPES LIST
// ============================================================================

function NaviCueTypesList({ category }: { category: NaviCueCategory }) {
  const types = getTypesForCategory(category);

  return (
    <div>
      <div className="glass-primary" style={{ padding: 'var(--spacing-5)', marginBottom: 'var(--spacing-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-2)' }}>
              {getCategoryTitle(category)}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              {getCategoryDescription(category)}
            </p>
          </div>
          <button style={{
            padding: 'var(--spacing-2) var(--spacing-4)',
            background: 'rgba(87, 57, 251, 0.15)',
            border: '1px solid rgba(87, 57, 251, 0.4)',
            borderRadius: 'var(--radius-none)',
            color: 'var(--color-accent)',
            cursor: 'pointer',
          }}>
            Batch Import All ({types.length} types)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-4)' }}>
        {types.map((type, idx) => (
          <div key={idx} className="glass-secondary" style={{ padding: 'var(--spacing-4)' }}>
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-1)' }}>
                {type.name}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                {type.id}
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)', lineHeight: '1.5' }}>
              {type.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-3)' }}>
              {type.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: 'var(--spacing-1) var(--spacing-2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-none)',
                    fontSize: '10px',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-3)' }}>
              Delivery: {type.deliveryMechanism}
            </div>

            <button style={{
              width: '100%',
              padding: 'var(--spacing-2)',
              background: 'rgba(87, 57, 251, 0.08)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              borderRadius: 'var(--radius-none)',
              color: 'var(--color-accent)',
              cursor: 'pointer',
              fontSize: '12px',
            }}>
              Add to Library
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TYPE DEFINITIONS (100 Types Across 5 Categories)
// ============================================================================

function getTypesForCategory(category: NaviCueCategory) {
  const types = {
    aggregators: [
      { id: 'article_intro_ER', name: 'Article Intro (ER)', description: 'Introduce Emotional Regulation article, offer read or LUMA explain', tags: ['ER', 'article', 'knowing'], deliveryMechanism: 'tap + voice' },
      { id: 'article_intro_SR', name: 'Article Intro (SR)', description: 'Introduce Stress Resilience article', tags: ['SR', 'article', 'knowing'], deliveryMechanism: 'tap + voice' },
      { id: 'article_intro_SC', name: 'Article Intro (SC)', description: 'Introduce Social Connectivity article', tags: ['SC', 'article', 'knowing'], deliveryMechanism: 'tap + voice' },
      { id: 'article_intro_CR', name: 'Article Intro (CR)', description: 'Introduce Cognitive Restructuring article', tags: ['CR', 'article', 'knowing'], deliveryMechanism: 'tap + voice' },
      { id: 'article_intro_II', name: 'Article Intro (II)', description: 'Introduce Identity Integration article', tags: ['II', 'article', 'knowing'], deliveryMechanism: 'tap + voice' },
      { id: 'article_intro_DM', name: 'Article Intro (DM)', description: 'Introduce Decision Mastery article', tags: ['DM', 'article', 'knowing'], deliveryMechanism: 'tap + voice' },
      { id: 'practice_invitation_breathwork', name: 'Practice Invitation (Breathwork)', description: 'Suggest breathwork practice, preview steps', tags: ['practice', 'breathwork', 'embodying'], deliveryMechanism: 'tap + preview' },
      { id: 'practice_invitation_somatic', name: 'Practice Invitation (Somatic)', description: 'Suggest somatic grounding practice', tags: ['practice', 'somatic', 'embodying'], deliveryMechanism: 'tap + preview' },
      { id: 'practice_invitation_cognitive', name: 'Practice Invitation (Cognitive)', description: 'Suggest cognitive reframing practice', tags: ['practice', 'cognitive', 'embodying'], deliveryMechanism: 'tap + preview' },
      { id: 'wellness_gateway_yoga', name: 'Wellness Gateway (Yoga)', description: 'Introduce yoga video, show 30s preview clip', tags: ['wellness', 'yoga', 'embodying'], deliveryMechanism: 'video preview' },
      { id: 'wellness_gateway_meditation', name: 'Wellness Gateway (Meditation)', description: 'Introduce meditation video', tags: ['wellness', 'meditation', 'embodying'], deliveryMechanism: 'video preview' },
      { id: 'wellness_gateway_breathwork', name: 'Wellness Gateway (Breathwork)', description: 'Introduce breathwork video', tags: ['wellness', 'breathwork', 'embodying'], deliveryMechanism: 'video preview' },
      { id: 'journey_scene_bridge', name: 'Journey Scene Bridge', description: 'Transition between Journey scenes', tags: ['journey', 'transition'], deliveryMechanism: 'auto-flow' },
      { id: 'state_prompt_morning', name: 'State Prompt (Morning)', description: 'Morning State check-in prompt', tags: ['state', 'morning'], deliveryMechanism: '3D sliders' },
      { id: 'state_prompt_evening', name: 'State Prompt (Evening)', description: 'Evening State check-in prompt', tags: ['state', 'evening'], deliveryMechanism: '3D sliders' },
      { id: 'alumni_post_surfacer_shame', name: 'Alumni Post (Shame)', description: 'Surface relevant shame-related community post', tags: ['alumni', 'shame', 'social'], deliveryMechanism: 'text + reactions' },
      { id: 'alumni_post_surfacer_control', name: 'Alumni Post (Control)', description: 'Surface control-related community post', tags: ['alumni', 'control', 'social'], deliveryMechanism: 'text + reactions' },
      { id: 'insight_prompt_ER', name: 'Insight Prompt (ER)', description: 'Deliver ER insight, ask for reflection', tags: ['insight', 'ER', 'believing'], deliveryMechanism: 'text + voice10' },
      { id: 'insight_prompt_CR', name: 'Insight Prompt (CR)', description: 'Deliver CR insight', tags: ['insight', 'CR', 'believing'], deliveryMechanism: 'text + voice10' },
      { id: 'insight_prompt_SC', name: 'Insight Prompt (SC)', description: 'Deliver SC insight', tags: ['insight', 'SC', 'believing'], deliveryMechanism: 'text + voice10' },
    ],
    integration: [
      { id: 'practice_to_article_ER', name: 'Practice → Article (ER)', description: 'After ER practice, offer deeper learning via article', tags: ['integration', 'ER'], deliveryMechanism: 'recommendation' },
      { id: 'article_to_practice_ER', name: 'Article → Practice (ER)', description: 'After ER article, offer application via practice', tags: ['integration', 'ER'], deliveryMechanism: 'recommendation' },
      { id: 'wellness_to_state', name: 'Wellness → State', description: 'After wellness video, check State change', tags: ['integration', 'wellness'], deliveryMechanism: 'state check' },
      { id: 'state_to_intervention_red', name: 'State → Intervention (Red)', description: 'Based on red arousal, recommend grounding content', tags: ['integration', 'state', 'red'], deliveryMechanism: 'adaptive' },
      { id: 'state_to_intervention_amber', name: 'State → Intervention (Amber)', description: 'Based on amber arousal, recommend moderate content', tags: ['integration', 'state', 'amber'], deliveryMechanism: 'adaptive' },
      { id: 'state_to_intervention_green', name: 'State → Intervention (Green)', description: 'Based on green arousal, recommend challenging content', tags: ['integration', 'state', 'green'], deliveryMechanism: 'adaptive' },
      { id: 'journey_to_toolkit', name: 'Journey → Toolkit', description: 'Link Journey scene to relevant Toolkit item', tags: ['integration', 'journey'], deliveryMechanism: 'contextual' },
      { id: 'alumni_to_practice', name: 'Alumni → Practice', description: 'Community insight triggers suggested practice', tags: ['integration', 'alumni'], deliveryMechanism: 'recommendation' },
    ],
    proof: [
      { id: 'micro_proof_capture_practice', name: 'Micro-Proof (Practice)', description: 'After practice, capture micro-proof moment', tags: ['proof', 'practice'], deliveryMechanism: 'capture' },
      { id: 'micro_proof_capture_article', name: 'Micro-Proof (Article)', description: 'After article, capture insight moment', tags: ['proof', 'article'], deliveryMechanism: 'capture' },
      { id: 'transfer_test_prompt', name: 'Transfer Test Prompt', description: 'Prompt real-world application test', tags: ['proof', 'transfer'], deliveryMechanism: 'challenge' },
      { id: 'prediction_error_check', name: 'Prediction Error Check', description: 'Did outcome match expectation?', tags: ['proof', 'learning'], deliveryMechanism: 'reflection' },
      { id: 'durability_check_1week', name: 'Durability Check (1 week)', description: 'Is change lasting after 1 week?', tags: ['proof', 'durability'], deliveryMechanism: 'followup' },
      { id: 'durability_check_1month', name: 'Durability Check (1 month)', description: 'Is change lasting after 1 month?', tags: ['proof', 'durability'], deliveryMechanism: 'followup' },
      { id: 'receipt_capture_win', name: 'Receipt Capture (Win)', description: 'Capture evidence of positive change', tags: ['proof', 'receipt'], deliveryMechanism: 'capture' },
      { id: 'receipt_capture_insight', name: 'Receipt Capture (Insight)', description: 'Capture moment of insight', tags: ['proof', 'receipt'], deliveryMechanism: 'capture' },
    ],
    reflection: [
      { id: 'practice_reflection_breathwork', name: 'Practice Reflection (Breathwork)', description: 'What did you notice during breathwork?', tags: ['reflection', 'breathwork'], deliveryMechanism: 'voice10' },
      { id: 'practice_reflection_somatic', name: 'Practice Reflection (Somatic)', description: 'What did your body tell you?', tags: ['reflection', 'somatic'], deliveryMechanism: 'voice10' },
      { id: 'article_resonance', name: 'Article Resonance', description: 'What part resonated most?', tags: ['reflection', 'article'], deliveryMechanism: 'voice10' },
      { id: 'wellness_body_scan', name: 'Wellness Body Scan', description: 'How does your body feel post-video?', tags: ['reflection', 'wellness'], deliveryMechanism: 'slider' },
      { id: 'journey_integration', name: 'Journey Integration', description: 'Integrate scene learning into life', tags: ['reflection', 'journey'], deliveryMechanism: 'journaling' },
      { id: 'schema_awareness_shame', name: 'Schema Awareness (Shame)', description: 'Notice shame pattern in real time', tags: ['reflection', 'shame'], deliveryMechanism: 'awareness' },
      { id: 'schema_awareness_control', name: 'Schema Awareness (Control)', description: 'Notice control pattern in real time', tags: ['reflection', 'control'], deliveryMechanism: 'awareness' },
    ],
    'luma-voice': [
      { id: 'luma_explain_ER', name: 'LUMA Explain (ER)', description: 'Ask LUMA to explain ER concept', tags: ['luma', 'ER', 'voice'], deliveryMechanism: 'voice explanation' },
      { id: 'luma_explain_CR', name: 'LUMA Explain (CR)', description: 'Ask LUMA to explain CR concept', tags: ['luma', 'CR', 'voice'], deliveryMechanism: 'voice explanation' },
      { id: 'luma_reflect_shame', name: 'LUMA Reflect (Shame)', description: 'LUMA guides reflection on shame', tags: ['luma', 'shame', 'voice'], deliveryMechanism: 'guided reflection' },
      { id: 'luma_reflect_control', name: 'LUMA Reflect (Control)', description: 'LUMA guides reflection on control', tags: ['luma', 'control', 'voice'], deliveryMechanism: 'guided reflection' },
      { id: 'luma_compare_shame_guilt', name: 'LUMA Compare (Shame vs Guilt)', description: 'LUMA contrasts shame and guilt', tags: ['luma', 'comparison', 'voice'], deliveryMechanism: 'voice teaching' },
      { id: 'luma_apply_practice', name: 'LUMA Apply (Practice)', description: 'LUMA suggests practice application', tags: ['luma', 'practice', 'voice'], deliveryMechanism: 'voice coaching' },
      { id: 'luma_narrative_timeline', name: 'LUMA Narrative (Timeline)', description: 'LUMA maps your story arc over time', tags: ['luma', 'narrative', 'voice'], deliveryMechanism: 'storytelling' },
      { id: 'luma_narrative_themes', name: 'LUMA Narrative (Themes)', description: 'LUMA identifies recurring themes', tags: ['luma', 'narrative', 'voice'], deliveryMechanism: 'pattern recognition' },
    ],
  };

  return types[category] || [];
}

function getCategoryTitle(category: NaviCueCategory): string {
  const titles = {
    aggregators: 'Content Aggregators (30 types)',
    integration: 'Integration Mechanisms (20 types)',
    proof: 'Proof & Transfer Bridges (15 types)',
    reflection: 'Reflection & Integration (15 types)',
    'luma-voice': 'LUMA Voice Integration (20 types)',
  };
  return titles[category];
}

function getCategoryDescription(category: NaviCueCategory): string {
  const descriptions = {
    aggregators: 'NaviCues that introduce content from other rooms (articles, practices, wellness videos, Journey scenes, Alumni posts)',
    integration: 'NaviCues that connect experiences across rooms (practice→article, state→intervention, Journey→Toolkit)',
    proof: 'NaviCues that capture learning and test real-world application (micro-proofs, transfer tests, durability checks)',
    reflection: 'NaviCues that deepen understanding (practice reflections, article resonance, schema awareness)',
    'luma-voice': 'NaviCues that use LUMA TALK for deeper introspection (explanations, guided reflections, narrative mapping)',
  };
  return descriptions[category];
}
