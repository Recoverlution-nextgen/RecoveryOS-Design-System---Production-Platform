/**
 * NAVICUE 200-COMPONENT TAXONOMY
 * 
 * Complete component type system for 10,000 NaviCues
 * 
 * Architecture:
 * - 26 existing primitives (foundation)
 * - 174 new component types (expansion to 200)
 * - All schema-mapped, Council-voiced, measurable
 * 
 * Categories:
 * 1. Core Experience Primitives (26) ✓
 * 2. Legacy Content Integration (30)
 * 3. Schema Waypack Variants (40)
 * 4. Therapeutic Modalities (30)
 * 5. Interaction Depth Levels (20)
 * 6. Somatic & Embodiment (15)
 * 7. Relational & Repair (15)
 * 8. Wisdom & Contemplation (20)
 * 9. Evidence & Proof (10)
 * 10. Advanced Mechanics (14)
 */

// ============================================================================
// CATEGORY 1: CORE EXPERIENCE PRIMITIVES (26) - EXISTING
// ============================================================================

export type CorePrimitives =
  | "practice"
  | "belief_probe"
  | "statement_mirror"
  | "reframe_seed"
  | "identity_koan"
  | "paradox_prompt"
  | "story_shard"
  | "curveball"
  | "grip_scan"
  | "allowing_gate"
  | "release_prompt"
  | "story_drop"
  | "inventory_spark"
  | "proof_stamp"
  | "council_rotate"
  | "two_column_reality"
  | "parts_rollcall"
  | "values_fork"
  | "micro_thread_3"
  | "recall_card_create"
  | "recall_card_return"
  | "proof_stamp_capture"
  | "repair_draft"
  | "sangha_ping"
  | "story_seed"
  | "paradox_key_safe"
  | "witness_switch"
  | "somatic_map_tap";

// ============================================================================
// CATEGORY 2: LEGACY CONTENT INTEGRATION (30)
// ============================================================================

export type LegacyContentTypes =
  // Soundbites (conversational wisdom drops)
  | "soundbite_drop"           // Quick wisdom delivery
  | "soundbite_thread"         // 3-5 soundbites in sequence
  | "soundbite_constellation"  // Themed cluster
  
  // Articles (long-form teaching)
  | "article_intro"            // Article opening cue
  | "article_checkpoint"       // Mid-article check-in
  | "article_anchor"           // Key takeaway capture
  | "article_bridge"           // Connect to practice
  
  // Insights (aha moments)
  | "insight_delivery"         // Core insight drop
  | "insight_resonance"        // Does this land?
  | "insight_application"      // How does this apply?
  | "insight_proof_link"       // Connect to evidence
  
  // Practices (embodied actions)
  | "practice_intro"           // Practice setup
  | "practice_guide"           // Step-by-step
  | "practice_completion"      // Post-practice check
  | "practice_habit_link"      // Connect to routine
  
  // STATE (real-time check-ins)
  | "state_snapshot"           // Current state capture
  | "state_tracker"            // Trend over time
  | "state_regulation_prompt"  // Quick regulation
  | "state_insight_spark"      // State → insight bridge
  
  // Content Bridges
  | "content_recommend"        // Suggest next content
  | "content_playlist"         // Curated sequence
  | "content_deepdive"         // Go deeper prompt
  
  // Meta-content
  | "library_navigator"        // Browse mode
  | "search_spark"             // Quick search prompt
  | "bookmark_create"          // Save for later
  | "bookmark_return"          // Resurface saved
  | "content_reflection"       // What stuck?
  | "content_share"            // Share with others
  | "content_remix"            // Personalize it;

// ============================================================================
// CATEGORY 3: SCHEMA WAYPACK VARIANTS (40)
// ============================================================================

export type SchemaWaypackTypes =
  // Recognition (K layer)
  | "schema_recognition"       // "Is this me?"
  | "schema_origin_trace"      // When did this start?
  | "schema_cost_inventory"    // What's the price?
  | "schema_protection_map"    // What does it protect?
  
  // Belief Work (B layer)
  | "schema_belief_test"       // Is this always true?
  | "schema_exception_hunt"    // When doesn't this apply?
  | "schema_reframe_seed"      // Alternative view
  | "schema_compassion_lens"   // Self-compassion angle
  
  // Release (B/E bridge)
  | "schema_release_ritual"    // Letting go practice
  | "schema_surrender_prompt"  // Drop the grip
  | "schema_witness_practice"  // Observe don't fuse
  
  // Repair (E layer)
  | "schema_repair_script"     // Relational repair
  | "schema_boundary_craft"    // Set clean boundary
  | "schema_need_voice"        // Speak the need
  | "schema_proof_capture"     // Evidence of change
  
  // Schema-specific mechanics
  | "shame_heat_map"           // Body-based shame
  | "abandonment_timeline"     // Pattern over time
  | "control_release_dial"     // Soften control
  | "perfectionism_80_percent" // Good enough test
  | "victimhood_lever_hunt"    // Find one choice
  | "suppression_allow_gate"   // Feel without story
  | "pleasing_no_practice"     // Boundary rep
  | "scarcity_enough_check"    // Sufficiency test
  | "comparison_values_anchor" // Return to values
  | "catastrophe_fact_check"   // Reality test
  | "fusion_identity_zoom"     // Zoom out from role
  | "mistrust_graded_open"     // Tiny trust step
  | "deprivation_ask_practice" // Direct request
  | "isolation_join_micro"     // Small connection
  | "failure_start_tiny"       // Winnable action
  | "dependence_solo_step"     // Do it yourself
  | "enmeshment_self_act"      // Private values move
  | "entitlement_limit_respect"// Honor boundary
  | "control_lack_tolerate"    // Sit with uncertainty
  | "subjugation_assert_micro" // Tiny assertion
  | "sacrifice_receive_allow"  // Accept help
  | "negativity_counter_log"   // Evidence collection
  | "inhibition_express_small" // Micro expression
  | "standards_rest_allow"     // Rest without earning
  | "punitiveness_repair_vs_punish"; // Choose repair

// ============================================================================
// CATEGORY 4: THERAPEUTIC MODALITIES (30)
// ============================================================================

export type TherapeuticModalityTypes =
  // IFS (Internal Family Systems)
  | "parts_identify"           // Which part is here?
  | "parts_dialogue"           // Talk to a part
  | "parts_unblend"            // Separate from part
  | "parts_witness"            // Self energy check
  | "parts_compassion"         // Love the protector
  
  // ACT (Acceptance & Commitment Therapy)
  | "values_clarify"           // What matters?
  | "values_vs_goals"          // Distinguish
  | "values_aligned_action"    // One inch toward
  | "defusion_technique"       // Unhook from thought
  | "willing_posture"          // Make room for
  
  // DBT (Dialectical Behavior Therapy)
  | "distress_tolerance"       // TIPP/ACCEPTS
  | "opposite_action"          // Do the opposite
  | "emotion_regulation_skill" // Which skill now?
  | "interpersonal_dear_man"   // Assert cleanly
  | "radical_acceptance"       // Accept what is
  
  // CBT (Cognitive Behavioral)
  | "thought_record"           // Catch the thought
  | "evidence_for_against"     // Reality test
  | "alternative_explanation"  // Other angles
  | "behavioral_experiment"    // Test the belief
  
  // Somatic Experiencing
  | "pendulation_practice"     // Resource → activation
  | "titration_dose"           // Small exposure
  | "discharge_allow"          // Let energy move
  | "grounding_anchor"         // Return to body
  
  // Motivational Interviewing
  | "ambivalence_explore"      // Both sides
  | "change_talk_evoke"        // Reasons to change
  | "readiness_ruler"          // How ready 0-10?
  
  // EFT (Emotionally Focused)
  | "attachment_need_name"     // Core need
  | "cycle_interrupt"          // Break the pattern
  | "soften_reach"             // Vulnerable bid;

// ============================================================================
// CATEGORY 5: INTERACTION DEPTH LEVELS (20)
// ============================================================================

export type DepthLevelTypes =
  // Glance (5-10 seconds)
  | "glance_truth"             // One-liner wisdom
  | "glance_question"          // Single provocation
  | "glance_stat"              // Quick fact
  | "glance_quote"             // Council wisdom
  
  // Seed (30-60 seconds)
  | "seed_story"               // Mini-narrative
  | "seed_practice"            // Micro-action
  | "seed_reframe"             // Quick flip
  | "seed_recognition"         // Pattern name
  
  // Thread (2-5 minutes)
  | "thread_guided"            // Step-by-step
  | "thread_inquiry"           // Deep question sequence
  | "thread_practice_full"     // Complete practice
  | "thread_teaching"          // Full concept
  
  // Journey (10-20 minutes)
  | "journey_arc"              // Full narrative
  | "journey_transformation"   // Before → during → after
  | "journey_integration"      // Tie it together
  
  // Depth toggles
  | "depth_expand"             // Go deeper option
  | "depth_simplify"           // Make it simpler
  | "depth_context"            // Add background
  | "depth_apply"              // Make it practical;

// ============================================================================
// CATEGORY 6: SOMATIC & EMBODIMENT (15)
// ============================================================================

export type SomaticEmbodimentTypes =
  | "body_scan_brief"          // Quick scan
  | "body_tension_map"         // Where's the grip?
  | "body_temperature_check"   // Hot/cold/numb
  | "body_gesture_capture"     // What's the posture?
  | "breath_pattern_notice"    // How are you breathing?
  | "breath_regulation"        // Guide the breath
  | "movement_micro"           // Tiny movement
  | "posture_shift"            // Change position
  | "grounding_5_4_3_2_1"      // Sensory anchor
  | "somatic_discharge"        // Shake/move energy
  | "body_yes_no"              // Body wisdom check
  | "interoception_practice"   // Feel inside
  | "proprioception_anchor"    // Where am I in space?
  | "vagal_tone_check"         // Safety signal
  | "nervous_system_state";    // Ventral/dorsal/sympathetic

// ============================================================================
// CATEGORY 7: RELATIONAL & REPAIR (15)
// ============================================================================

export type RelationalRepairTypes =
  | "rupture_acknowledge"      // Name the break
  | "repair_timing"            // When to repair?
  | "repair_script_draft"      // Write it out
  | "repair_practice_voice"    // Say it aloud
  | "apology_clean"            // No but/if
  | "amends_action"            // Make it right
  | "boundary_set"             // Draw the line
  | "boundary_hold"            // Keep it
  | "need_articulate"          // Say what you need
  | "bid_for_connection"       // Reach out
  | "receive_bid"              // Accept the reach
  | "conflict_repair"          // Fix the fight
  | "trust_micro_test"         // Small vulnerability
  | "forgiveness_process"      // Let it go
  | "relationship_inventory";  // Who's safe?

// ============================================================================
// CATEGORY 8: WISDOM & CONTEMPLATION (20)
// ============================================================================

export type WisdomContemplationTypes =
  // Koans & Paradoxes
  | "koan_classic"             // Timeless question
  | "koan_personal"            // Your paradox
  | "paradox_hold"             // Both are true
  | "paradox_resolve"          // Transcend the binary
  
  // Teaching Stories
  | "parable_delivery"         // Narrative wisdom
  | "myth_modern"              // Ancient → now
  | "metaphor_seed"            // Symbolic teaching
  
  // Philosophical Inquiry
  | "meaning_question"         // Why does this matter?
  | "purpose_probe"            // What's the point?
  | "existence_inquiry"        // Who am I really?
  | "death_contemplation"      // Memento mori
  
  // Council Wisdom
  | "mate_inquiry"             // Compassionate question
  | "bill_w_step"              // 12-step wisdom
  | "watts_paradox"            // Alan Watts twist
  | "ram_dass_love"            // Loving awareness
  | "therapist_reflect"        // Clinical mirror
  | "hawkins_release"          // Surrender prompt
  
  // Contemplative Practice
  | "meditation_seed"          // Brief sit
  | "gratitude_practice"       // What's here?
  | "impermanence_notice";     // Everything changes

// ============================================================================
// CATEGORY 9: EVIDENCE & PROOF (10)
// ============================================================================

export type EvidenceProofTypes =
  | "proof_micro_win"          // Tiny success
  | "proof_photo_capture"      // Visual evidence
  | "proof_voice_note"         // Audio proof
  | "proof_streak_track"       // Days in a row
  | "proof_comparison"         // Then vs now
  | "evidence_vault_add"       // Store the win
  | "evidence_vault_review"    // Look back
  | "measurement_pre_post"     // Before/after
  | "progress_timeline"        // Map the journey
  | "celebration_ritual";      // Honor the change

// ============================================================================
// CATEGORY 10: ADVANCED MECHANICS (14)
// ============================================================================

export type AdvancedMechanicsTypes =
  // Time-based
  | "future_self_letter"       // Write to future you
  | "future_self_return"       // Receive the letter
  | "past_self_compassion"     // Love who you were
  | "timeline_reframe"         // Rewrite the story
  
  // Simulation & Prediction
  | "scenario_simulator"       // What if...?
  | "decision_tree"            // Map the options
  | "prediction_capture"       // What will happen?
  | "prediction_review"        // Were you right?
  
  // Pattern Recognition
  | "pattern_detect"           // Name the loop
  | "pattern_interrupt"        // Break the cycle
  | "habit_stack"              // Link behaviors
  
  // Meta-cognition
  | "thinking_about_thinking"  // Notice the noticing
  | "belief_archaeology"       // Where'd that come from?
  | "narrative_edit";          // Rewrite the script

// ============================================================================
// UNIVERSAL TYPE (All 200)
// ============================================================================

export type NaviCue200ComponentType =
  | CorePrimitives
  | LegacyContentTypes
  | SchemaWaypackTypes
  | TherapeuticModalityTypes
  | DepthLevelTypes
  | SomaticEmbodimentTypes
  | RelationalRepairTypes
  | WisdomContemplationTypes
  | EvidenceProofTypes
  | AdvancedMechanicsTypes;

// ============================================================================
// COMPONENT METADATA
// ============================================================================

export type ComponentMetadata = {
  component_type: NaviCue200ComponentType;
  category: 
    | "core_primitive"
    | "legacy_content"
    | "schema_waypack"
    | "therapeutic_modality"
    | "depth_level"
    | "somatic_embodiment"
    | "relational_repair"
    | "wisdom_contemplation"
    | "evidence_proof"
    | "advanced_mechanics";
  family?: string;
  kbe_bias?: "K" | "B" | "E" | "any";
  tier_bias?: "hot" | "warm" | "cool" | "any";
  council_fit?: ("mate" | "bill_w" | "watts" | "ram_dass" | "therapist" | "hawkins")[];
  interaction_time_seconds?: number;
  typical_response_types?: string[];
  schema_targets_common?: string[];
  contraindications?: {
    high_heat?: boolean;
    high_fusion?: boolean;
    low_choice?: boolean;
  };
  description?: string;
};

// Component Registry with Metadata
export const COMPONENT_REGISTRY_200: Record<string, ComponentMetadata> = {
  // Will be populated with all 200 components
  // This serves as the "phone book" for the system
};
