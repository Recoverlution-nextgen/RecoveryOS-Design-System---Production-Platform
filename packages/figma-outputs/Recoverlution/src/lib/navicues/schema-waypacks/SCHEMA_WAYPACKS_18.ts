/**
 * 21 SCHEMA WAYPACKS
 * 
 * Clinical-grade schema targeting with Council-of-Six voice blends
 * Each schema gets a complete "arsenal" for K/B/E rotation
 * 
 * Based on Schema Therapy's 18 Early Maladaptive Schemas
 * PLUS Recoverlution's 3 additional schemas (Scarcity, Comparison, Victim)
 * Delivered via the Council of Six wisdom lenses
 */

import { SchemaWaypack } from '../../../types/navicue-contract';

export const SCHEMA_WAYPACKS_21: SchemaWaypack[] = [
  // ========================================================================
  // DOMAIN 1: DISCONNECTION & REJECTION
  // ========================================================================
  
  {
    schema_id: "ST_DEFECTIVENESS_SHAME",
    domain: "Disconnection_Rejection",
    display_name: "Shame / Unworthiness",
    
    core_illusion: "I am fundamentally flawed or unlovable.",
    core_protection: ["hide", "perform", "self_attack", "numb"],
    somatic_signature: ["chest collapse", "downward gaze", "throat tight"],
    grip_type: ["punishment", "withdrawal"],
    
    release_key: "Surrender the verdict. Allow the heat. Drop the trial.",
    clean_choice: ["One dignity act.", "One true sentence to one safe person."],
    repair_pattern: ["Truth breaks secrecy.", "Repair replaces sentencing."],
    belonging_medicine: ["Safe witnessing without fixing.", "Ritual contact over intensity."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe", "identity_koan"],
      always_avoid: ["diagnosis language", "global labels"]
    },
    
    recommended_families: {
      K: ["story_drop", "grip_scan", "witness_switch"],
      B: ["allowing_gate", "release_prompt", "two_column_reality"],
      E: ["proof_stamp_capture", "sangha_ping", "inventory_spark"]
    },
    
    lens_blend: {
      mate: 0.24,
      therapist: 0.22,
      ram_dass: 0.18,
      hawkins: 0.16,
      bill_w: 0.14,
      watts: 0.06,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["shame_intensity", "connection"]
    }
  },
  
  {
    schema_id: "ST_ABANDONMENT_INSTABILITY",
    domain: "Disconnection_Rejection",
    display_name: "Abandonment / Instability",
    
    core_illusion: "If I let people in, they will leave.",
    core_protection: ["cling", "test", "withdraw_first", "perform_safety"],
    somatic_signature: ["hollow stomach", "heart ache", "agitation"],
    grip_type: ["grasping", "withdrawal"],
    
    release_key: "Release pre-emptive retreat. Let consistency earn trust.",
    clean_choice: ["One low-stakes reach-out.", "One direct ask without testing."],
    repair_pattern: ["Name need directly.", "Repair ruptures early."],
    belonging_medicine: ["Consistency over intensity.", "Borrow steadiness."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["forced vulnerability"]
    },
    
    recommended_families: {
      K: ["grip_scan", "story_drop"],
      B: ["allowing_gate", "release_prompt"],
      E: ["sangha_ping", "proof_stamp_capture", "inventory_spark"]
    },
    
    lens_blend: {
      therapist: 0.24,
      mate: 0.20,
      bill_w: 0.18,
      ram_dass: 0.16,
      hawkins: 0.14,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["connection"]
    }
  },
  
  {
    schema_id: "ST_MISTRUST_ABUSE",
    domain: "Disconnection_Rejection",
    display_name: "Mistrust / Abuse",
    
    core_illusion: "If I open up, I will be harmed, used, or controlled.",
    core_protection: ["armor", "suspicion", "scanning", "control", "isolate"],
    somatic_signature: ["jaw clench", "gut tight", "hyper_alert eyes"],
    grip_type: ["certainty", "control", "withdrawal"],
    
    release_key: "Surrender global certainty. Practice graded trust with tiny and real steps.",
    clean_choice: ["One safe disclosure with boundaries.", "One boundary spoken cleanly."],
    repair_pattern: ["Truth plus boundary, not accusation.", "Repair without self-betrayal."],
    belonging_medicine: ["Safe consistency.", "Predictable support rhythms."],
    
    contraindications: {
      tier3_hot: ["identity_koan", "paradox_key_safe"],
      always_avoid: ["forced trust exercises"]
    },
    
    recommended_families: {
      K: ["grip_scan", "somatic_map_tap"],
      B: ["allowing_gate", "story_drop"],
      E: ["proof_stamp_capture", "sangha_ping", "inventory_spark"]
    },
    
    lens_blend: {
      therapist: 0.28,
      mate: 0.18,
      ram_dass: 0.16,
      hawkins: 0.16,
      bill_w: 0.14,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["connection", "certainty"]
    }
  },
  
  {
    schema_id: "ST_EMOTIONAL_DEPRIVATION",
    domain: "Disconnection_Rejection",
    display_name: "Emotional Deprivation",
    
    core_illusion: "No one will truly meet me emotionally.",
    core_protection: ["dont_ask", "numb", "intellectualize", "self_reliance_hard"],
    somatic_signature: ["emptiness", "flat chest", "quiet ache"],
    grip_type: ["withdrawal", "certainty"],
    
    release_key: "Let the ache exist without concluding the story.",
    clean_choice: ["One direct request.", "One small receive without justifying."],
    repair_pattern: ["Name the need without apology.", "Repair by returning to contact."],
    belonging_medicine: ["Practice receiving.", "Ritual check-ins."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["dismissing the ache"]
    },
    
    recommended_families: {
      K: ["story_drop", "witness_switch"],
      B: ["allowing_gate", "release_prompt"],
      E: ["sangha_ping", "proof_stamp_capture"]
    },
    
    lens_blend: {
      mate: 0.24,
      therapist: 0.24,
      ram_dass: 0.18,
      hawkins: 0.16,
      bill_w: 0.12,
      watts: 0.06,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["connection"]
    }
  },
  
  {
    schema_id: "ST_SOCIAL_ISOLATION",
    domain: "Disconnection_Rejection",
    display_name: "Social Isolation / Alienation",
    
    core_illusion: "I don't belong. I'm not like them.",
    core_protection: ["hide", "compare", "opt_out", "stay_safe_alone"],
    somatic_signature: ["tight chest", "self_conscious heat", "smallness"],
    grip_type: ["withdrawal", "approval"],
    
    release_key: "Surrender the belonging test. Join small circles repeatedly.",
    clean_choice: ["One micro-join without performance.", "One hello without crafting."],
    repair_pattern: ["Truth beats impression management."],
    belonging_medicine: ["Small circles.", "Consistency."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["forced group activities"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["allowing_gate", "two_column_reality"],
      E: ["sangha_ping", "proof_stamp_capture"]
    },
    
    lens_blend: {
      therapist: 0.26,
      ram_dass: 0.18,
      mate: 0.18,
      bill_w: 0.16,
      hawkins: 0.14,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["connection"]
    }
  },
  
  // ========================================================================
  // DOMAIN 2: IMPAIRED AUTONOMY
  // ========================================================================
  
  {
    schema_id: "ST_DEPENDENCE_INCOMPETENCE",
    domain: "Impaired_Autonomy",
    display_name: "Dependence / Incompetence",
    
    core_illusion: "I can't handle life on my own.",
    core_protection: ["avoid", "defer", "seek_rescue", "freeze"],
    somatic_signature: ["collapse", "fog", "low energy"],
    grip_type: ["certainty", "withdrawal"],
    
    release_key: "Surrender the helpless story. Build capability through tiny proofs.",
    clean_choice: ["One winnable step.", "One task completed end to end."],
    repair_pattern: ["Stop self-betrayal. Keep promises small and kept."],
    belonging_medicine: ["Coaching, not rescuing.", "Accountability contact."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["shame-based challenges"]
    },
    
    recommended_families: {
      K: ["grip_scan"],
      B: ["release_prompt", "two_column_reality"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      therapist: 0.30,
      bill_w: 0.18,
      mate: 0.16,
      ram_dass: 0.14,
      hawkins: 0.14,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["competence"]
    }
  },
  
  {
    schema_id: "ST_FAILURE",
    domain: "Impaired_Autonomy",
    display_name: "Failure",
    
    core_illusion: "I will fail. I'm not capable.",
    core_protection: ["avoid", "procrastinate", "quit_early", "overprepare"],
    somatic_signature: ["pressure behind eyes", "tight chest", "restless dread"],
    grip_type: ["certainty", "approval"],
    
    release_key: "Surrender the prediction. Let action produce evidence.",
    clean_choice: ["One five-minute start.", "Ship eighty percent."],
    repair_pattern: ["Replace judging with learning. Keep receipts of effort."],
    belonging_medicine: ["Witnessed effort.", "Mentor contact."],
    
    contraindications: {
      tier3_hot: ["inventory_spark"],
      always_avoid: ["performance pressure"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["release_prompt", "two_column_reality"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      therapist: 0.26,
      bill_w: 0.18,
      hawkins: 0.16,
      mate: 0.14,
      watts: 0.14,
      ram_dass: 0.12,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["competence"]
    }
  },
  
  {
    schema_id: "ST_VULNERABILITY_HARM",
    domain: "Impaired_Autonomy",
    display_name: "Vulnerability to Harm / Illness",
    
    core_illusion: "Danger is imminent. Something bad will happen.",
    core_protection: ["check", "reassure", "avoid", "overplan"],
    somatic_signature: ["racing heart", "tight breath", "tension spikes"],
    grip_type: ["certainty", "control"],
    
    release_key: "Surrender the need to know. Allow fear sensations. Reduce checking.",
    clean_choice: ["One grounding fact.", "One graded approach step."],
    repair_pattern: ["Trade reassurance loops for contact plus action."],
    belonging_medicine: ["Co-regulation.", "Predictable support."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["catastrophic scenarios"]
    },
    
    recommended_families: {
      K: ["grip_scan", "somatic_map_tap"],
      B: ["allowing_gate", "release_prompt"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      therapist: 0.28,
      hawkins: 0.18,
      ram_dass: 0.16,
      mate: 0.14,
      bill_w: 0.14,
      watts: 0.10,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["certainty"]
    }
  },
  
  {
    schema_id: "ST_ENMESHMENT_UNDEVELOPED_SELF",
    domain: "Impaired_Autonomy",
    display_name: "Enmeshment / Undeveloped Self",
    
    core_illusion: "I don't know who I am without them or the role.",
    core_protection: ["merge", "please", "obey_role", "fear_separation"],
    somatic_signature: ["tight face", "rigidity", "identity panic"],
    grip_type: ["approval", "certainty"],
    
    release_key: "Surrender role-identity. Choose one private values act.",
    clean_choice: ["One preference spoken.", "One boundary held."],
    repair_pattern: ["Truth without drama. Repair without collapse."],
    belonging_medicine: ["Relationships that survive honesty."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["identity stripping"]
    },
    
    recommended_families: {
      K: ["story_drop", "witness_switch"],
      B: ["release_prompt", "values_fork"],
      E: ["proof_stamp_capture", "inventory_spark", "sangha_ping"]
    },
    
    lens_blend: {
      therapist: 0.26,
      watts: 0.16,
      ram_dass: 0.16,
      hawkins: 0.16,
      bill_w: 0.14,
      mate: 0.12,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["identity_flex"]
    }
  },
  
  {
    schema_id: "ST_VICTIM_POWERLESSNESS",
    domain: "Impaired_Autonomy",
    display_name: "Powerlessness / Victimhood",
    
    core_illusion: "Things happen to me. I have no power.",
    core_protection: ["freeze", "despair", "blame", "wait_for_rescue"],
    somatic_signature: ["heaviness", "shutdown", "low energy"],
    grip_type: ["withdrawal", "certainty"],
    
    release_key: "Surrender the no-choice story. Find one lever.",
    clean_choice: ["One tiny agency lever.", "One boundary or request."],
    repair_pattern: ["Stop self-betrayal; keep one promise to self."],
    belonging_medicine: ["Co-regulation to exit shutdown."],
    
    contraindications: {
      tier3_hot: ["confrontational_responsibility"],
      always_avoid: ["victim blaming"]
    },
    
    recommended_families: {
      K: ["grip_scan"],
      B: ["allowing_gate", "release_prompt"],
      E: ["proof_stamp_capture", "sangha_ping", "inventory_spark"]
    },
    
    lens_blend: {
      mate: 0.18,
      therapist: 0.26,
      bill_w: 0.18,
      hawkins: 0.18,
      ram_dass: 0.12,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["agency"]
    }
  },
  
  // ========================================================================
  // DOMAIN 3: IMPAIRED LIMITS
  // ========================================================================
  
  {
    schema_id: "ST_ENTITLEMENT_GRANDIOSITY",
    domain: "Impaired_Limits",
    display_name: "Entitlement / Grandiosity",
    
    core_illusion: "Rules don't apply. I deserve exception.",
    core_protection: ["override", "justify", "deflect", "avoid_limits"],
    somatic_signature: ["heat", "impulse push", "tight jaw"],
    grip_type: ["control", "certainty"],
    
    release_key: "Surrender exception-thinking. Choose humility in action.",
    clean_choice: ["One limit respected.", "One repair made quickly."],
    repair_pattern: ["Ownership without excuses.", "Amends over arguments."],
    belonging_medicine: ["Accountability community."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["moralizing"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["release_prompt", "two_column_reality"],
      E: ["inventory_spark", "proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      bill_w: 0.24,
      therapist: 0.22,
      hawkins: 0.18,
      watts: 0.14,
      mate: 0.12,
      ram_dass: 0.10,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["harm_reduction"]
    }
  },
  
  {
    schema_id: "ST_INSUFFICIENT_SELF_CONTROL",
    domain: "Impaired_Limits",
    display_name: "Insufficient Self-Control / Discipline",
    
    core_illusion: "I can't tolerate discomfort. I can't delay.",
    core_protection: ["escape", "distract", "impulse", "avoid_discomfort"],
    somatic_signature: ["itchy energy", "restlessness", "pressure"],
    grip_type: ["relief_seeking"],
    
    release_key: "Allow discomfort to crest. Don't feed it. Build tolerance reps.",
    clean_choice: ["One delay between sixty and three hundred seconds.", "One clean substitute action."],
    repair_pattern: ["Keep promises small and kept."],
    belonging_medicine: ["Accountability ping.", "Borrow steadiness."],
    
    contraindications: {
      tier3_hot: ["inventory_spark", "paradox_key_safe"],
      always_avoid: ["willpower shaming"]
    },
    
    recommended_families: {
      K: ["grip_scan", "somatic_map_tap"],
      B: ["allowing_gate", "release_prompt"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      therapist: 0.28,
      hawkins: 0.22,
      bill_w: 0.18,
      ram_dass: 0.14,
      mate: 0.10,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["delay_capacity"]
    }
  },
  
  // ========================================================================
  // DOMAIN 4: OTHER-DIRECTEDNESS
  // ========================================================================
  
  {
    schema_id: "ST_SUBJUGATION",
    domain: "Other_Directedness",
    display_name: "Subjugation",
    
    core_illusion: "If I assert myself, there will be consequences.",
    core_protection: ["silence", "comply", "disappear", "appease"],
    somatic_signature: ["throat clamp", "stomach twist", "tight smile"],
    grip_type: ["approval", "withdrawal"],
    
    release_key: "Release the reflex to vanish. Speak one clean boundary sentence.",
    clean_choice: ["One honest preference.", "One no without apology."],
    repair_pattern: ["Name resentment early.", "Repair with truth not explosion."],
    belonging_medicine: ["Safe people who welcome honesty."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["forced assertion"]
    },
    
    recommended_families: {
      K: ["grip_scan"],
      B: ["release_prompt", "values_fork"],
      E: ["proof_stamp_capture", "sangha_ping", "inventory_spark"]
    },
    
    lens_blend: {
      therapist: 0.28,
      hawkins: 0.18,
      bill_w: 0.18,
      mate: 0.14,
      ram_dass: 0.14,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["boundary_strength"]
    }
  },
  
  {
    schema_id: "ST_SELF_SACRIFICE",
    domain: "Other_Directedness",
    display_name: "Self-Sacrifice",
    
    core_illusion: "My needs are selfish.",
    core_protection: ["overgive", "suppress_need", "resent_silently"],
    somatic_signature: ["quiet depletion", "heavy limbs", "tight chest"],
    grip_type: ["approval"],
    
    release_key: "Allow guilt sensations without obeying them. Receive without apology.",
    clean_choice: ["One self-care act.", "One request made clearly."],
    repair_pattern: ["Repair self-abandonment."],
    belonging_medicine: ["Relationships that don't require self-erasure."],
    
    contraindications: {
      tier3_hot: ["inventory_spark"],
      always_avoid: ["selfishness accusations"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["allowing_gate", "values_fork"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      ram_dass: 0.22,
      therapist: 0.24,
      hawkins: 0.18,
      mate: 0.16,
      bill_w: 0.12,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["needs_expression"]
    }
  },
  
  {
    schema_id: "ST_APPROVAL_SEEKING",
    domain: "Other_Directedness",
    display_name: "Approval Seeking / People Pleasing",
    
    core_illusion: "I must keep others happy to be safe.",
    core_protection: ["manage_others", "overagree", "perform", "avoid_conflict"],
    somatic_signature: ["stomach twist", "tension before no", "tight smile"],
    grip_type: ["approval", "control"],
    
    release_key: "Surrender reputation management. Choose truth in small doses.",
    clean_choice: ["One clean no.", "One true preference."],
    repair_pattern: ["Speak early; resent less."],
    belonging_medicine: ["Honesty-safe relationships."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["shaming people pleasing"]
    },
    
    recommended_families: {
      K: ["grip_scan"],
      B: ["release_prompt", "two_column_reality"],
      E: ["proof_stamp_capture", "sangha_ping", "inventory_spark"]
    },
    
    lens_blend: {
      therapist: 0.26,
      bill_w: 0.18,
      hawkins: 0.18,
      mate: 0.14,
      ram_dass: 0.14,
      watts: 0.10,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["boundary_strength"]
    }
  },
  
  {
    schema_id: "ST_SCARCITY",
    domain: "Other_Directedness",
    display_name: "Scarcity",
    
    core_illusion: "There is never enough for me.",
    core_protection: ["grasp", "hoard", "panic", "overwork", "envy"],
    somatic_signature: ["tight gut", "urgency", "future-tripping"],
    grip_type: ["certainty", "relief_seeking"],
    
    release_key: "Release must-get-now. Practice sufficiency.",
    clean_choice: ["One act of sufficiency.", "One act of generosity."],
    repair_pattern: ["Reduce compulsive grabbing."],
    belonging_medicine: ["Service breaks scarcity.", "Trust rituals."],
    
    contraindications: {
      tier3_hot: ["gratitude_bypass"],
      always_avoid: ["minimizing real lack"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["release_prompt", "values_fork"],
      E: ["proof_stamp_capture", "sangha_ping", "inventory_spark"]
    },
    
    lens_blend: {
      watts: 0.16,
      hawkins: 0.18,
      bill_w: 0.18,
      therapist: 0.20,
      mate: 0.12,
      ram_dass: 0.16,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["need_spell"]
    }
  },
  
  {
    schema_id: "ST_COMPARISON_STATUS",
    domain: "Other_Directedness",
    display_name: "Comparison / Status",
    
    core_illusion: "My worth depends on being better than others.",
    core_protection: ["rank", "perform", "envy", "self_attack", "hide"],
    somatic_signature: ["agitation", "tight chest", "restless attention"],
    grip_type: ["approval", "punishment"],
    
    release_key: "Drop the scoreboard. Return to values and real action.",
    clean_choice: ["One private values action.", "One kindness without credit."],
    repair_pattern: ["Clean inner speech."],
    belonging_medicine: ["Be seen without ranking."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["comparison language"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["release_prompt", "values_fork"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      ram_dass: 0.18,
      watts: 0.16,
      therapist: 0.22,
      hawkins: 0.16,
      mate: 0.12,
      bill_w: 0.16,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["self_attack"]
    }
  },
  
  // ========================================================================
  // DOMAIN 5: OVERVIGILANCE & INHIBITION
  // ========================================================================
  
  {
    schema_id: "ST_NEGATIVITY_PESSIMISM",
    domain: "Overvigilance_Inhibition",
    display_name: "Negativity / Pessimism",
    
    core_illusion: "Loss and threat are the main truth.",
    core_protection: ["brace", "scan", "dismiss_good", "doom_loop"],
    somatic_signature: ["tight forehead", "chest pressure", "low hope"],
    grip_type: ["certainty"],
    
    release_key: "Surrender selective attention. Record disconfirming evidence.",
    clean_choice: ["One reality-based counterexample.", "One values action anyway."],
    repair_pattern: ["Replace prophecy with data."],
    belonging_medicine: ["Borrow hope from others."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["toxic positivity"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["release_prompt", "two_column_reality"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      therapist: 0.26,
      hawkins: 0.18,
      watts: 0.16,
      bill_w: 0.14,
      mate: 0.14,
      ram_dass: 0.12,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["certainty"]
    }
  },
  
  {
    schema_id: "ST_EMOTIONAL_INHIBITION",
    domain: "Overvigilance_Inhibition",
    display_name: "Emotional Inhibition / Suppression",
    
    core_illusion: "Feelings are dangerous and should be hidden.",
    core_protection: ["numb", "intellectualize", "detach", "control_expression"],
    somatic_signature: ["throat clamp", "chest armor", "shallow breath"],
    grip_type: ["control", "withdrawal"],
    
    release_key: "Allow sensation in small doses. Drop story. Soften armor.",
    clean_choice: ["One honest sentence.", "One emotion named and located."],
    repair_pattern: ["Truth kindly. Early."],
    belonging_medicine: ["Safe witnessing."],
    
    contraindications: {
      tier3_hot: ["deep_past_digging"],
      always_avoid: ["forced emotional expression"]
    },
    
    recommended_families: {
      K: ["grip_scan", "somatic_map_tap"],
      B: ["allowing_gate", "story_drop"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      ram_dass: 0.20,
      therapist: 0.26,
      hawkins: 0.20,
      mate: 0.14,
      bill_w: 0.12,
      watts: 0.08,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["warmth_safety"]
    }
  },
  
  {
    schema_id: "ST_UNRELENTING_STANDARDS",
    domain: "Overvigilance_Inhibition",
    display_name: "Unrelenting Standards / Perfectionism",
    
    core_illusion: "I must be perfect to be acceptable.",
    core_protection: ["overwork", "hide_flaws", "procrastinate", "never_finish"],
    somatic_signature: ["pressure", "tight chest", "restless drive"],
    grip_type: ["approval", "punishment"],
    
    release_key: "Surrender performance identity. Let good-enough teach safety.",
    clean_choice: ["Ship eighty percent.", "Rest without earning it."],
    repair_pattern: ["Replace self-attack with learning language."],
    belonging_medicine: ["Be liked while unfinished."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["just relax advice"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["release_prompt", "values_fork"],
      E: ["proof_stamp_capture", "inventory_spark"]
    },
    
    lens_blend: {
      therapist: 0.24,
      watts: 0.16,
      hawkins: 0.18,
      bill_w: 0.16,
      mate: 0.12,
      ram_dass: 0.14,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["self_attack"]
    }
  },
  
  {
    schema_id: "ST_PUNITIVENESS",
    domain: "Overvigilance_Inhibition",
    display_name: "Punitiveness",
    
    core_illusion: "Mistakes deserve punishment.",
    core_protection: ["self_attack", "punish_others", "rigidity", "shame_spiral"],
    somatic_signature: ["tight jaw", "heat in chest", "hard eyes"],
    grip_type: ["punishment", "certainty"],
    
    release_key: "Surrender sentencing. Replace punishment with repair.",
    clean_choice: ["One kind correction.", "One repair instead of lash."],
    repair_pattern: ["Amends restore safety faster than blame."],
    belonging_medicine: ["Accountability with compassion."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["harsh confrontation"]
    },
    
    recommended_families: {
      K: ["story_drop"],
      B: ["release_prompt", "two_column_reality"],
      E: ["inventory_spark", "proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      bill_w: 0.22,
      therapist: 0.22,
      hawkins: 0.18,
      mate: 0.16,
      ram_dass: 0.12,
      watts: 0.10,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["self_attack", "shame_intensity"]
    }
  },
  
  {
    schema_id: "ST_CATASTROPHIZING",
    domain: "Overvigilance_Inhibition",
    display_name: "Catastrophizing / Doom Forecasting",
    
    core_illusion: "The worst will happen.",
    core_protection: ["brace", "avoid", "overplan", "reassurance_seek"],
    somatic_signature: ["tight breath", "racing heart", "tension spikes"],
    grip_type: ["certainty", "control"],
    
    release_key: "Surrender the need to know. Return to one fact plus one action.",
    clean_choice: ["Name one observable fact.", "Take one next step."],
    repair_pattern: ["Replace reassurance loops with contact plus plan."],
    belonging_medicine: ["Co-regulation."],
    
    contraindications: {
      tier3_hot: ["paradox_key_safe"],
      always_avoid: ["nightmare scenarios"]
    },
    
    recommended_families: {
      K: ["grip_scan", "somatic_map_tap"],
      B: ["allowing_gate", "two_column_reality"],
      E: ["proof_stamp_capture", "sangha_ping"]
    },
    
    lens_blend: {
      therapist: 0.26,
      hawkins: 0.18,
      ram_dass: 0.16,
      mate: 0.14,
      bill_w: 0.14,
      watts: 0.12,
      system: 0.00
    },
    
    metrics: {
      primary: ["fusion", "resistance", "choice_access"],
      secondary: ["certainty"]
    }
  }
];

// Export individual schemas for targeted use
export const SCHEMA_SHAME = SCHEMA_WAYPACKS_21.find(s => s.schema_id === "ST_DEFECTIVENESS_SHAME")!;
export const SCHEMA_ABANDONMENT = SCHEMA_WAYPACKS_21.find(s => s.schema_id === "ST_ABANDONMENT_INSTABILITY")!;
export const SCHEMA_MISTRUST = SCHEMA_WAYPACKS_21.find(s => s.schema_id === "ST_MISTRUST_ABUSE")!;
export const SCHEMA_CONTROL = SCHEMA_WAYPACKS_21.find(s => s.schema_id === "ST_UNRELENTING_STANDARDS")!;
export const SCHEMA_PERFECTIONISM = SCHEMA_CONTROL;
export const SCHEMA_VICTIM = SCHEMA_WAYPACKS_21.find(s => s.schema_id === "ST_VICTIM_POWERLESSNESS")!;

// Group schemas by domain for easy filtering
export const SCHEMAS_BY_DOMAIN = {
  disconnection_rejection: SCHEMA_WAYPACKS_21.filter(s => s.domain === "Disconnection_Rejection"),
  impaired_autonomy: SCHEMA_WAYPACKS_21.filter(s => s.domain === "Impaired_Autonomy"),
  impaired_limits: SCHEMA_WAYPACKS_21.filter(s => s.domain === "Impaired_Limits"),
  other_directedness: SCHEMA_WAYPACKS_21.filter(s => s.domain === "Other_Directedness"),
  overvigilance_inhibition: SCHEMA_WAYPACKS_21.filter(s => s.domain === "Overvigilance_Inhibition"),
};