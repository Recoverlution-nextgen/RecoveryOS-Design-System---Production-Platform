/**
 * NAVICUE BATCH GENERATOR
 * 
 * Generates 7,000 NaviCues (Batch 4-10) using:
 * - 18 Schema Waypacks
 * - Council of Six voice rotation
 * - Experience primitives (12 new component types)
 * - K/B/E balance
 * - Tier gating
 * - Quality checks
 * 
 * This is the engine that takes you from 3,000 → 10,000
 */

import { 
  GeneratedNavicue,
  SchemaWaypack,
  ComponentType,
  KbeLayer,
  Tier,
  CouncilLens,
  NavicueCopy,
  NavicueQualityCheck 
} from '../../../types/navicue-contract';

import { SCHEMA_WAYPACKS_21 } from '../schema-waypacks/SCHEMA_WAYPACKS_18';

// ============================================================================
// GENERATOR CONFIG
// ============================================================================

export type GeneratorConfig = {
  batch_number: number;          // 4-10
  target_count: number;          // 1000 per batch
  schema_balance: boolean;       // Distribute evenly across schemas
  kbe_ratio: {                   // K:B:E distribution
    K: number;
    B: number;
    E: number;
  };
  council_rotation: boolean;     // Rotate Council lenses
  quality_gates: boolean;        // Run quality checks
  seed?: number;                 // For reproducible generation
};

export const DEFAULT_CONFIG: GeneratorConfig = {
  batch_number: 4,
  target_count: 1000,
  schema_balance: true,
  kbe_ratio: {
    K: 0.40,  // 40% Knowing
    B: 0.35,  // 35% Believing
    E: 0.25,  // 25% Embodying
  },
  council_rotation: true,
  quality_gates: true,
};

// ============================================================================
// COUNCIL VOICE TEMPLATES
// ============================================================================

const COUNCIL_TEMPLATES = {
  mate: {
    witness_switch: {
      glance: "Notice what your body is holding right now.",
      seed: "What's the ache beneath the pattern?",
      thread: ["Notice the sensation.", "What does this part of you need?", "Can you offer that to yourself?"]
    },
    two_column_reality: {
      left_label: "What the mind says",
      right_label: "What the body knows",
    },
    parts_rollcall: {
      prompt: "Which part of you is trying to protect you right now?",
    }
  },
  
  bill_w: {
    proof_stamp_capture: {
      prompt: "What's the next right thing for the next ten minutes?",
      types: ["dignity_act", "reach_out", "truth_told", "amends_made"]
    },
    inventory_spark: {
      prompt: "One truth. One repair. One person to tell.",
    },
    sangha_ping: {
      options: ["Text my sponsor", "Call a meeting", "Send a check-in", "Ask for help"]
    }
  },
  
  watts: {
    paradox_key_safe: {
      cool_tier_only: true,
      prompts: [
        "Who is the 'you' trying to control the mind?",
        "If you stopped fighting yourself for sixty seconds, would you become worse or simply more honest?",
        "What if the problem is not the thought but the believer?"
      ]
    },
    two_column_reality: {
      left_label: "The story",
      right_label: "The watcher of the story",
    }
  },
  
  ram_dass: {
    witness_switch: {
      glance: "Can you notice the one who notices?",
      seed: "Stay as loving awareness for three breaths.",
      thread: ["Notice the thought.", "Notice the space around it.", "Rest there."]
    },
    allowing_gate: {
      prompts: [
        "Can you be with this without fixing it?",
        "Let it be here. You don't have to become it.",
        "What if this feeling is allowed to exist?"
      ]
    }
  },
  
  therapist: {
    values_fork: {
      prompts: [
        "Which move brings you closer to who you want to be?",
        "Which choice respects your values right now?",
        "One inch toward what matters."
      ]
    },
    parts_rollcall: {
      parts: [
        { key: "protector", label: "Protector" },
        { key: "judge", label: "Judge" },
        { key: "pleaser", label: "Pleaser" },
        { key: "runner", label: "Runner" },
        { key: "child", label: "Wounded Child" },
        { key: "numb", label: "Numb One" },
        { key: "wise", label: "Wise Self" },
      ]
    }
  },
  
  hawkins: {
    release_prompt: {
      sequence: ["Allow", "Surrender", "Let Go"],
      prompts: [
        "Can you allow this feeling to be here without resisting?",
        "Can you surrender the need to fix it?",
        "Can you let it go like an exhale?"
      ]
    },
    allowing_gate: {
      prompts: [
        "Release the grip by two percent.",
        "Let the wave crest without feeding it.",
        "Soften the demand."
      ]
    }
  }
};

// ============================================================================
// COMPONENT TYPE TEMPLATES
// ============================================================================

const COMPONENT_TEMPLATES: Record<ComponentType, any> = {
  // NEW EXPERIENCE PRIMITIVES
  witness_switch: {
    response_type: "slider_0_10",
    response_key: "fusion_0_10",
    tiers: ["cool", "warm", "hot"],
  },
  
  two_column_reality: {
    response_type: "side_choice",
    response_key: "side_chosen",
    tiers: ["cool", "warm"],
  },
  
  parts_rollcall: {
    response_type: "choice_single",
    response_key: "part_selected",
    tiers: ["cool", "warm", "hot"],
  },
  
  values_fork: {
    response_type: "choice_single",
    response_key: "value_chosen",
    tiers: ["cool", "warm"],
  },
  
  micro_thread_3: {
    response_type: "none",
    multi_step: true,
    tiers: ["cool"],
  },
  
  recall_card_create: {
    response_type: "text_1line",
    response_key: "recall_text",
    tiers: ["cool", "warm"],
  },
  
  recall_card_return: {
    response_type: "slider_0_10",
    response_key: "helpfulness",
    tiers: ["warm", "hot"],
  },
  
  proof_stamp_capture: {
    response_type: "checklist",
    response_key: "action_done",
    tiers: ["cool", "warm", "hot"],
  },
  
  repair_draft: {
    response_type: "draft_message",
    response_key: "repair_text",
    tiers: ["cool"],
  },
  
  sangha_ping: {
    response_type: "choice_single",
    response_key: "contact_intent",
    tiers: ["warm", "hot"],
  },
  
  story_seed: {
    response_type: "text_short",
    response_key: "reflection",
    tiers: ["cool", "warm"],
  },
  
  paradox_key_safe: {
    response_type: "rank_3",
    response_key: "certainty_shift",
    tiers: ["cool"], // ONLY cool tier
  },
  
  somatic_map_tap: {
    response_type: "tap_region",
    response_key: "body_location",
    tiers: ["hot", "warm", "cool"],
  },
  
  // EXISTING FAMILIES (from 3,000)
  statement_mirror: {
    response_type: "slider_0_10",
    tiers: ["cool", "warm"],
  },
  
  belief_probe: {
    response_type: "choice_multi",
    tiers: ["cool", "warm"],
  },
  
  reframe_seed: {
    response_type: "binary",
    tiers: ["cool", "warm"],
  },
  
  identity_koan: {
    response_type: "binary",
    tiers: ["cool"],
  },
  
  paradox_prompt: {
    response_type: "rank_3",
    tiers: ["cool"],
  },
  
  practice: {
    response_type: "checklist",
    tiers: ["cool", "warm", "hot"],
  },
  
  story_shard: {
    response_type: "voice_10s",
    tiers: ["cool", "warm"],
  },
  
  curveball: {
    response_type: "choice_single",
    tiers: ["cool", "warm"],
  },
  
  // COUNCIL BATCH 3 FAMILIES
  grip_scan: {
    response_type: "slider_0_10",
    response_key: "grip_intensity",
    tiers: ["hot", "warm", "cool"],
  },
  
  allowing_gate: {
    response_type: "slider_0_10",
    response_key: "resistance",
    tiers: ["hot", "warm", "cool"],
  },
  
  release_prompt: {
    response_type: "slider_0_10",
    response_key: "release_degree",
    tiers: ["warm", "hot"],
  },
  
  story_drop: {
    response_type: "slider_0_10",
    response_key: "fusion",
    tiers: ["cool", "warm", "hot"],
  },
  
  inventory_spark: {
    response_type: "checklist",
    tiers: ["cool"],
  },
  
  proof_stamp: {
    response_type: "binary",
    tiers: ["cool", "warm", "hot"],
  },
  
  council_rotate: {
    response_type: "choice_single",
    response_key: "lens_chosen",
    tiers: ["cool", "warm"],
  },
};

// ============================================================================
// BATCH GENERATOR CLASS
// ============================================================================

export class NaviCueBatchGenerator {
  private config: GeneratorConfig;
  private generated: GeneratedNavicue[] = [];
  private cueCounter: number;
  
  constructor(config: Partial<GeneratorConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.cueCounter = (this.config.batch_number - 1) * 1000; // Start from correct batch
  }
  
  /**
   * Generate a full batch of NaviCues
   */
  generate(): GeneratedNavicue[] {
    console.log(`🔥 Generating Batch ${this.config.batch_number} (${this.config.target_count} NaviCues)...`);
    
    this.generated = [];
    
    // Calculate per-schema allocation
    const schemasToUse = SCHEMA_WAYPACKS_21;
    const cuesPerSchema = Math.floor(this.config.target_count / schemasToUse.length);
    
    // Generate for each schema
    for (const schema of schemasToUse) {
      const schemaCues = this.generateForSchema(schema, cuesPerSchema);
      this.generated.push(...schemaCues);
    }
    
    // Fill remaining to hit target
    const remaining = this.config.target_count - this.generated.length;
    if (remaining > 0) {
      const fillCues = this.generateForSchema(schemasToUse[0], remaining);
      this.generated.push(...fillCues);
    }
    
    // Run quality checks
    if (this.config.quality_gates) {
      this.runQualityChecks();
    }
    
    console.log(`✅ Generated ${this.generated.length} NaviCues for Batch ${this.config.batch_number}`);
    
    return this.generated;
  }
  
  /**
   * Generate NaviCues for a specific schema
   */
  private generateForSchema(waypack: SchemaWaypack, count: number): GeneratedNavicue[] {
    const cues: GeneratedNavicue[] = [];
    
    // Calculate K/B/E distribution
    const kCount = Math.floor(count * this.config.kbe_ratio.K);
    const bCount = Math.floor(count * this.config.kbe_ratio.B);
    const eCount = count - kCount - bCount;
    
    // Generate K cues
    for (let i = 0; i < kCount; i++) {
      const family = this.selectFamily(waypack, "K");
      cues.push(this.generateCue(waypack, "K", family));
    }
    
    // Generate B cues
    for (let i = 0; i < bCount; i++) {
      const family = this.selectFamily(waypack, "B");
      cues.push(this.generateCue(waypack, "B", family));
    }
    
    // Generate E cues
    for (let i = 0; i < eCount; i++) {
      const family = this.selectFamily(waypack, "E");
      cues.push(this.generateCue(waypack, "E", family));
    }
    
    return cues;
  }
  
  /**
   * Select appropriate family/component for KBE layer
   */
  private selectFamily(waypack: SchemaWaypack, kbe: KbeLayer): ComponentType {
    const recommended = waypack.recommended_families[kbe];
    if (!recommended || recommended.length === 0) {
      // Fallback to default families
      const defaults: Record<KbeLayer, ComponentType[]> = {
        K: ["witness_switch", "grip_scan", "story_drop"],
        B: ["allowing_gate", "release_prompt", "two_column_reality"],
        E: ["proof_stamp_capture", "sangha_ping", "inventory_spark"],
      };
      return this.randomChoice(defaults[kbe]);
    }
    
    return this.randomChoice(recommended);
  }
  
  /**
   * Generate a single NaviCue
   */
  private generateCue(
    waypack: SchemaWaypack,
    kbe: KbeLayer,
    component: ComponentType
  ): GeneratedNavicue {
    this.cueCounter++;
    const code = `nc.${String(this.cueCounter).padStart(4, '0')}`;
    
    // Select tier based on component constraints
    const tier = this.selectTier(component);
    
    // Generate variants for each council lens (weighted)
    const variants = this.generateVariants(waypack, component, kbe);
    
    // Create NaviCue
    const cue: GeneratedNavicue = {
      code,
      kbe_layer: kbe,
      tier,
      family: component,
      component_type: component,
      default_response_type: COMPONENT_TEMPLATES[component]?.response_type || "binary",
      
      intent: `${kbe} layer for ${waypack.display_name}: ${this.getIntent(kbe, component)}`,
      config: this.getComponentConfig(component, waypack),
      
      variants,
      
      targets: [{
        scope_type: "schema",
        schema_id: waypack.schema_id,
        weight: 1.0,
        is_primary: true,
      }],
      
      tags: [
        waypack.schema_id.toLowerCase().replace('st_', ''),
        kbe.toLowerCase(),
        component,
        tier,
        `batch_${this.config.batch_number}`
      ],
    };
    
    return cue;
  }
  
  /**
   * Generate variants for different Council lenses
   */
  private generateVariants(
    waypack: SchemaWaypack,
    component: ComponentType,
    kbe: KbeLayer
  ): Array<{ lens: CouncilLens; copy: NavicueCopy }> {
    const variants: Array<{ lens: CouncilLens; copy: NavicueCopy }> = [];
    
    // Select top 3 lenses by weight
    const lenses = Object.entries(waypack.lens_blend)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([lens]) => lens as CouncilLens);
    
    for (const lens of lenses) {
      variants.push({
        lens,
        copy: this.generateCopy(lens, component, waypack, kbe)
      });
    }
    
    return variants;
  }
  
  /**
   * Generate copy based on Council lens + component type
   */
  private generateCopy(
    lens: CouncilLens,
    component: ComponentType,
    waypack: SchemaWaypack,
    kbe: KbeLayer
  ): NavicueCopy {
    // Get council template
    const template = COUNCIL_TEMPLATES[lens]?.[component];
    
    // Generate schema-specific copy
    const copy: NavicueCopy = {
      headline: this.generateHeadline(lens, component, waypack),
      body: this.generateBody(lens, component, waypack, kbe),
      prompt: this.generatePrompt(lens, component, waypack),
    };
    
    // Add component-specific fields
    if (component === "two_column_reality") {
      copy.left_label = template?.left_label || "Mind says";
      copy.right_label = template?.right_label || "Reality says";
      copy.left_text = this.generateLeftColumn(waypack);
      copy.right_text = this.generateRightColumn(waypack);
    }
    
    if (component === "parts_rollcall" && lens === "therapist") {
      copy.options = COUNCIL_TEMPLATES.therapist.parts_rollcall.parts.map(p => p.label);
    }
    
    if (component === "values_fork") {
      copy.options = [
        this.generateValueOption(waypack, "A"),
        this.generateValueOption(waypack, "B")
      ];
    }
    
    return copy;
  }
  
  /**
   * Generate headline
   */
  private generateHeadline(lens: CouncilLens, component: ComponentType, waypack: SchemaWaypack): string {
    const headlines: Record<CouncilLens, string[]> = {
      mate: [
        "What's the ache beneath this?",
        "What does this part of you need?",
        "Can you offer compassion to this?",
      ],
      bill_w: [
        "What's the next right thing?",
        "One truth. One repair. One person.",
        "Who can you tell about this?",
      ],
      watts: [
        "Who is trying to control the mind?",
        "What if you stopped fighting for sixty seconds?",
        "Can you notice the noticer?",
      ],
      ram_dass: [
        "Can you be with this?",
        "Stay as loving awareness.",
        "Let it be here without becoming it.",
      ],
      therapist: [
        "Which part is driving right now?",
        "What matters most in this moment?",
        "One inch toward your values.",
      ],
      hawkins: [
        "Can you allow this?",
        "Surrender the demand.",
        "Let it go like an exhale.",
      ],
      system: ["Notice what's here."],
    };
    
    return this.randomChoice(headlines[lens]);
  }
  
  /**
   * Generate body text
   */
  private generateBody(
    lens: CouncilLens,
    component: ComponentType,
    waypack: SchemaWaypack,
    kbe: KbeLayer
  ): string {
    // Schema-specific templates
    const bodyTemplates: Record<KbeLayer, string[]> = {
      K: [
        `Notice: ${waypack.core_illusion}`,
        `Your mind says: ${waypack.core_illusion}`,
        `The pattern: ${waypack.grip_type.join(", ")}.`,
      ],
      B: [
        `Release key: ${waypack.release_key}`,
        `What if you could: ${waypack.release_key.toLowerCase()}`,
        `One possibility: ${waypack.clean_choice[0]}`,
      ],
      E: [
        `Try: ${waypack.clean_choice[0]}`,
        `${waypack.repair_pattern[0]}`,
        `${waypack.belonging_medicine[0]}`,
      ],
    };
    
    return this.randomChoice(bodyTemplates[kbe]);
  }
  
  /**
   * Generate prompt
   */
  private generatePrompt(lens: CouncilLens, component: ComponentType, waypack: SchemaWaypack): string {
    // Component-specific prompts
    if (component === "witness_switch") {
      return "Notice the thought. Now notice the one who can notice it.";
    }
    
    if (component === "grip_scan") {
      return "Where do you feel it in your body? How tight is the grip?";
    }
    
    if (component === "allowing_gate") {
      return "Can you let this feeling be here without fixing it?";
    }
    
    return `How does this land for you?`;
  }
  
  private generateLeftColumn(waypack: SchemaWaypack): string {
    return waypack.core_illusion;
  }
  
  private generateRightColumn(waypack: SchemaWaypack): string {
    return `This is a thought, not a truth. ${waypack.release_key}`;
  }
  
  private generateValueOption(waypack: SchemaWaypack, option: "A" | "B"): string {
    return option === "A" 
      ? waypack.clean_choice[0]
      : waypack.clean_choice[1] || "Stay present with this.";
  }
  
  /**
   * Select tier based on component
   */
  private selectTier(component: ComponentType): Tier {
    const template = COMPONENT_TEMPLATES[component];
    if (!template || !template.tiers) return "warm";
    
    const tiers = template.tiers as Tier[];
    
    // Prefer warm tier for most (balanced)
    if (tiers.includes("warm")) return "warm";
    if (tiers.includes("cool")) return "cool";
    if (tiers.includes("hot")) return "hot";
    
    return "warm";
  }
  
  /**
   * Get component config
   */
  private getComponentConfig(component: ComponentType, waypack: SchemaWaypack): Record<string, unknown> {
    const config: Record<string, unknown> = {};
    
    if (component === "parts_rollcall") {
      config.parts = COUNCIL_TEMPLATES.therapist.parts_rollcall.parts;
    }
    
    if (component === "somatic_map_tap") {
      config.regions = waypack.somatic_signature;
      config.measure_grip = true;
    }
    
    return config;
  }
  
  /**
   * Get intent description
   */
  private getIntent(kbe: KbeLayer, component: ComponentType): string {
    const intents: Record<KbeLayer, string> = {
      K: "Recognition and awareness without collapse",
      B: "Loosen certainty, widen meaning, create space",
      E: "Tiny action, proof capture, repair, or connection",
    };
    
    return intents[kbe];
  }
  
  /**
   * Run quality checks on generated cues
   */
  private runQualityChecks(): void {
    console.log("Running quality checks...");
    
    let passed = 0;
    let failed = 0;
    
    for (const cue of this.generated) {
      const check = this.checkQuality(cue);
      if (check.passed) {
        passed++;
      } else {
        failed++;
        console.warn(`❌ Quality check failed for ${cue.code}:`, check.errors);
      }
    }
    
    console.log(`Quality: ${passed} passed, ${failed} failed`);
  }
  
  /**
   * Check quality of a single NaviCue
   */
  private checkQuality(cue: GeneratedNavicue): NavicueQualityCheck {
    const checks = {
      has_variants: cue.variants.length > 0,
      has_targets: cue.targets.length > 0,
      has_kbe_layer: !!cue.kbe_layer,
      tier_appropriate_for_component: this.checkTierAppropriate(cue),
      council_lens_valid: cue.variants.every(v => !!v.lens),
      no_diagnosis_language: this.checkNoDiagnosis(cue),
      copy_not_empty: cue.variants.every(v => !!v.copy.headline || !!v.copy.body),
    };
    
    const passed = Object.values(checks).every(c => c === true);
    const errors = Object.entries(checks)
      .filter(([, v]) => !v)
      .map(([k]) => k);
    
    return {
      navicue_code: cue.code,
      checks,
      passed,
      errors,
      warnings: [],
    };
  }
  
  private checkTierAppropriate(cue: GeneratedNavicue): boolean {
    const template = COMPONENT_TEMPLATES[cue.component_type];
    if (!template || !template.tiers) return true;
    
    return template.tiers.includes(cue.tier);
  }
  
  private checkNoDiagnosis(cue: GeneratedNavicue): boolean {
    const diagnosisWords = ["you are", "you're broken", "diagnosis", "disorder", "condition"];
    
    for (const variant of cue.variants) {
      const allText = [
        variant.copy.headline,
        variant.copy.body,
        variant.copy.prompt,
      ].join(" ").toLowerCase();
      
      for (const word of diagnosisWords) {
        if (allText.includes(word)) return false;
      }
    }
    
    return true;
  }
  
  /**
   * Export to JSON
   */
  exportToJSON(): string {
    return JSON.stringify({
      metadata: {
        batch_number: this.config.batch_number,
        generated_count: this.generated.length,
        generated_at: new Date().toISOString(),
        config: this.config,
      },
      navicues: this.generated,
    }, null, 2);
  }
  
  /**
   * Random choice helper
   */
  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

// ============================================================================
// BATCH GENERATION HELPERS
// ============================================================================

/**
 * Generate a full batch (1000 NaviCues)
 */
export function generateBatch(batchNumber: number): GeneratedNavicue[] {
  const generator = new NaviCueBatchGenerator({ batch_number: batchNumber });
  return generator.generate();
}

/**
 * Generate all 7 batches (Batch 4-10 = 7,000 NaviCues)
 */
export function generateAll7000(): GeneratedNavicue[] {
  const all: GeneratedNavicue[] = [];
  
  for (let batch = 4; batch <= 10; batch++) {
    console.log(`\n${"=".repeat(80)}`);
    console.log(`BATCH ${batch}`);
    console.log("=".repeat(80));
    
    const cues = generateBatch(batch);
    all.push(...cues);
  }
  
  console.log(`\n✅ COMPLETE: Generated ${all.length} NaviCues (Batches 4-10)`);
  
  return all;
}

/**
 * Generate and export to file
 */
export function generateAndExport(batchNumber: number): string {
  const generator = new NaviCueBatchGenerator({ batch_number: batchNumber });
  generator.generate();
  return generator.exportToJSON();
}