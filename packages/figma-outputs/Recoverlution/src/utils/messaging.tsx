/**
 * MESSAGING MATRIX - COMPLETE SYSTEM
 * 
 * Central source of truth for ALL messaging touchpoints across the platform.
 * Maps every place where core features are referenced to ensure 100% consistency.
 * 
 * This matrix covers:
 * - Dashboard tiles (desktop + mobile variants)
 * - Page headers
 * - Navigation dropdowns
 * - Marketing website
 * - Platform tour
 * - Any other universal slots
 */

export interface MessagingSlot {
  location: string;
  text: string;
  context?: string; // Why this variant exists (e.g., "Space constraint on mobile")
  characterCount?: number;
}

export interface FeatureMessaging {
  featureName: string;
  coreConcept: string; // One-line essence of what this feature IS
  slots: MessagingSlot[];
}

/**
 * THE MESSAGING MATRIX
 * 
 * All 7 dashboard tiles + their messaging across every touchpoint
 */
export const MESSAGING_MATRIX: FeatureMessaging[] = [
  {
    featureName: "Journey",
    coreConcept: "Your personalized therapeutic pathway through structured recovery content",
    slots: [
      {
        location: "Dashboard Tile (Desktop)",
        text: "a timeless path to where you belong",
        context: "Poetic but descriptive - DNA compliant (no possessive)",
        characterCount: 35
      },
      {
        location: "Dashboard Tile (Tablet)",
        text: "where you belong",
        context: "Condensed for space constraint",
        characterCount: 16
      },
      {
        location: "Dashboard Tile (Mobile)",
        text: "where you belong",
        context: "Condensed for space constraint",
        characterCount: 16
      },
      {
        location: "Page Header Subtitle",
        text: "A timeless path to where you belong, as yourself",
        context: "Header messaging - emotional anchor with identity focus",
        characterCount: 49
      },
      {
        location: "Nav Dropdown Label",
        text: "Journey",
        context: "Simple category label in navigation",
        characterCount: 7
      },
      {
        location: "Platform Tour - Step 1",
        text: "Your Journey awaits",
        context: "Tour introduction to Journey feature",
        characterCount: 19
      },
      {
        location: "Footer Link",
        text: "Journey",
        context: "Footer navigation label",
        characterCount: 7
      },
      {
        location: "Marketing Website - Home Page",
        text: "Structured therapeutic journeys",
        context: "Your Recovery Operating System section",
        characterCount: 30
      },
      {
        location: "Marketing Website - Platform Page",
        text: "Personalized Recovery Pathways",
        context: "Feature title on marketing site",
        characterCount: 30
      },
      {
        location: "Marketing Website - Platform Description",
        text: "12-week therapeutic journeys mapped to the E-R-A flow, delivering structured content that meets patients where they are.",
        context: "Benefit-focused description for buyers",
        characterCount: 134
      }
    ]
  },
  {
    featureName: "NaviCues",
    coreConcept: "Micro-interventions that deliver timely wisdom in the flow of life",
    slots: [
      {
        location: "Dashboard Tile (Desktop)",
        text: "timely wisdom",
        context: "Emphasizes right-time delivery of insights",
        characterCount: 13
      },
      {
        location: "Dashboard Tile (Tablet)",
        text: "timely wisdom",
        context: "Same as desktop",
        characterCount: 13
      },
      {
        location: "Dashboard Tile (Mobile)",
        text: "timely wisdom",
        context: "Same across all breakpoints",
        characterCount: 13
      },
      {
        location: "Page Header Subtitle",
        text: "Recovery in the flow of life.",
        context: "Header messaging - NOW principle, contextual delivery",
        characterCount: 31
      },
      {
        location: "Nav Dropdown Label",
        text: "NaviCues",
        context: "Navigation category label",
        characterCount: 8
      },
      {
        location: "Platform Tour - Step 2",
        text: "Quick wisdom when you need it",
        context: "Tour introduction to NaviCues",
        characterCount: 29
      },
      {
        location: "Footer Link",
        text: "NaviCues",
        context: "Footer navigation",
        characterCount: 8
      },
      {
        location: "Marketing Website - Home Page",
        text: "Timely micro-interventions",
        context: "Your Recovery Operating System section",
        characterCount: 26
      },
      {
        location: "Marketing Website - Platform Page",
        text: "Contextual Micro-Interventions",
        context: "Feature title on marketing site",
        characterCount: 30
      },
      {
        location: "Marketing Website - Platform Description",
        text: "Instagram-style therapeutic exercises that deliver exactly what's needed, when it's needed. Quick, powerful, portable wisdom.",
        context: "Benefit-focused for buyers - emphasizes mobile-first",
        characterCount: 135
      }
    ]
  },
  {
    featureName: "State (Inner Compass)",
    coreConcept: "Real-time visualization of inner state using neuroscience-backed metrics",
    slots: [
      {
        location: "Dashboard Tile (Desktop)",
        text: "inner compass",
        context: "Navigation metaphor for self-awareness",
        characterCount: 13
      },
      {
        location: "Dashboard Tile (Tablet)",
        text: "inner compass",
        context: "Same as desktop",
        characterCount: 13
      },
      {
        location: "Dashboard Tile (Mobile)",
        text: "inner compass",
        context: "Same across all breakpoints",
        characterCount: 13
      },
      {
        location: "Page Header Subtitle",
        text: "Your living snapshot. How you're doing, right now.",
        context: "NOW principle - current state, not historical tracking",
        characterCount: 55
      },
      {
        location: "Nav Dropdown Label",
        text: "State",
        context: "Navigation label (also called Inner Compass internally)",
        characterCount: 5
      },
      {
        location: "Platform Tour - Step 3",
        text: "Check in with your inner state",
        context: "Tour introduction to State feature",
        characterCount: 30
      },
      {
        location: "Footer Link",
        text: "State",
        context: "Footer navigation",
        characterCount: 5
      },
      {
        location: "Marketing Website - Home Page",
        text: "Real-time inner state tracking",
        context: "Your Recovery Operating System section",
        characterCount: 30
      },
      {
        location: "Marketing Website - Platform Page",
        text: "Inner State Visualization",
        context: "Feature title on marketing site",
        characterCount: 25
      },
      {
        location: "Marketing Website - Platform Description",
        text: "Real-time dashboard of tempo, flow, and sync. Track inner states without timelines or pressure - just awareness.",
        context: "Emphasizes neuroscience + NOW principle",
        characterCount: 120
      }
    ]
  },
  {
    featureName: "Wellbeing",
    coreConcept: "Foundational self-care resources that support whole-person recovery",
    slots: [
      {
        location: "Dashboard Tile (Desktop)",
        text: "on-demand nourishment for mind, body & soul",
        context: "Holistic trinity + NOW Principle (on-demand availability)",
        characterCount: 43
      },
      {
        location: "Dashboard Tile (Tablet)",
        text: "on-demand nourishment for mind, body & soul",
        context: "Same as desktop",
        characterCount: 43
      },
      {
        location: "Dashboard Tile (Mobile)",
        text: "on-demand nourishment for mind, body & soul",
        context: "Same across all breakpoints",
        characterCount: 43
      },
      {
        location: "Page Header Subtitle",
        text: "Your foundation. Sleep, movement, nourishment, rest.",
        context: "Lists core wellbeing categories",
        characterCount: 56
      },
      {
        location: "Nav Dropdown Label",
        text: "Wellbeing",
        context: "Navigation category",
        characterCount: 9
      },
      {
        location: "Platform Tour - Step 4",
        text: "Build your foundation",
        context: "Tour introduction to Wellbeing",
        characterCount: 21
      },
      {
        location: "Footer Link",
        text: "Wellbeing",
        context: "Footer navigation",
        characterCount: 9
      },
      {
        location: "Marketing Website - Home Page",
        text: "Foundational wellbeing resources",
        context: "Your Recovery Operating System section",
        characterCount: 32
      },
      {
        location: "Marketing Website - Platform Page",
        text: "Whole-Person Wellbeing",
        context: "Feature title on marketing site",
        characterCount: 22
      },
      {
        location: "Marketing Website - Platform Description",
        text: "Evidence-based resources for sleep, movement, nutrition, and self-care. The foundation that supports therapeutic work.",
        context: "Emphasizes evidence base + holistic approach",
        characterCount: 127
      }
    ]
  },
  {
    featureName: "Toolkit",
    coreConcept: "Comprehensive library of therapeutic resources, articles, and building blocks",
    slots: [
      {
        location: "Dashboard Tile (Desktop)",
        text: "Precision practices for everyday moments",
        context: "Intentional + specific (capital P for emphasis)",
        characterCount: 40
      },
      {
        location: "Dashboard Tile (Tablet)",
        text: "Precision practices for everyday moments",
        context: "Same as desktop",
        characterCount: 40
      },
      {
        location: "Dashboard Tile (Mobile)",
        text: "Precision practices for everyday moments",
        context: "Same across all breakpoints",
        characterCount: 40
      },
      {
        location: "Page Header Subtitle",
        text: "Your library. Articles, building blocks, and resources for every moment.",
        context: "Lists content types available",
        characterCount: 76
      },
      {
        location: "Nav Dropdown Label",
        text: "Toolkit",
        context: "Navigation category",
        characterCount: 7
      },
      {
        location: "Platform Tour - Step 5",
        text: "Explore your toolkit",
        context: "Tour introduction to Toolkit",
        characterCount: 20
      },
      {
        location: "Footer Link",
        text: "Toolkit",
        context: "Footer navigation",
        characterCount: 7
      },
      {
        location: "Marketing Website - Home Page",
        text: "Comprehensive resource library",
        context: "Your Recovery Operating System section",
        characterCount: 30
      },
      {
        location: "Marketing Website - Platform Page",
        text: "Therapeutic Resource Library",
        context: "Feature title on marketing site",
        characterCount: 28
      },
      {
        location: "Marketing Website - Platform Description",
        text: "180+ articles, building blocks, and micro-practices organized by therapeutic pillar. Deep resources when patients need them.",
        context: "Quantified content + organization system",
        characterCount: 133
      }
    ]
  },
  {
    featureName: "Navigate",
    coreConcept: "Support network management and crisis resources for when help is needed",
    slots: [
      {
        location: "Dashboard Tile (Desktop)",
        text: "connected care network",
        context: "Human connection + structural support (concise)",
        characterCount: 22
      },
      {
        location: "Dashboard Tile (Tablet)",
        text: "connected care network",
        context: "Same as desktop",
        characterCount: 22
      },
      {
        location: "Dashboard Tile (Mobile)",
        text: "connected care network",
        context: "Same across all breakpoints",
        characterCount: 22
      },
      {
        location: "Page Header Subtitle",
        text: "Your people. Emergency contacts, support circles, and help when you need it.",
        context: "Emphasizes human connection + safety net",
        characterCount: 79
      },
      {
        location: "Nav Dropdown Label",
        text: "Navigate",
        context: "Navigation category",
        characterCount: 8
      },
      {
        location: "Platform Tour - Step 6",
        text: "Build your support network",
        context: "Tour introduction to Navigate",
        characterCount: 26
      },
      {
        location: "Footer Link",
        text: "Navigate",
        context: "Footer navigation",
        characterCount: 8
      },
      {
        location: "Marketing Website - Home Page",
        text: "Support network management",
        context: "Your Recovery Operating System section",
        characterCount: 26
      },
      {
        location: "Marketing Website - Platform Page",
        text: "Support Network & Crisis Resources",
        context: "Feature title on marketing site",
        characterCount: 34
      },
      {
        location: "Marketing Website - Platform Description",
        text: "Emergency contacts, support circles, and crisis hotlines. Ensures patients are never alone when they need help most.",
        context: "Safety-focused messaging for clinical buyers",
        characterCount: 126
      }
    ]
  },
  {
    featureName: "Momentum",
    coreConcept: "Living charts that visualize inner state patterns without timelines or pressure",
    slots: [
      {
        location: "Dashboard Tile (Desktop)",
        text: "guiding heartbeat",
        context: "Living rhythm metaphor - pulse of recovery",
        characterCount: 17
      },
      {
        location: "Dashboard Tile (Tablet)",
        text: "guiding heartbeat",
        context: "Same as desktop",
        characterCount: 17
      },
      {
        location: "Dashboard Tile (Mobile)",
        text: "guiding heartbeat",
        context: "Same across all breakpoints",
        characterCount: 17
      },
      {
        location: "Page Header Subtitle",
        text: "Your rhythm. How your inner metrics are shifting over time.",
        context: "NOW principle - patterns not goals, metrics not milestones",
        characterCount: 62
      },
      {
        location: "Nav Dropdown Label",
        text: "Momentum",
        context: "Navigation category",
        characterCount: 8
      },
      {
        location: "Platform Tour - Step 7",
        text: "See your inner rhythms",
        context: "Tour introduction to Momentum",
        characterCount: 22
      },
      {
        location: "Footer Link",
        text: "Momentum",
        context: "Footer navigation",
        characterCount: 8
      },
      {
        location: "Marketing Website - Home Page",
        text: "Progress without pressure",
        context: "Your Recovery Operating System section",
        characterCount: 25
      },
      {
        location: "Marketing Website - Platform Page",
        text: "Living Analytics Dashboard",
        context: "Feature title on marketing site",
        characterCount: 26
      },
      {
        location: "Marketing Website - Platform Description",
        text: "Beautiful visualizations of tempo, flow, and sync over time. No timelines, no goals - just awareness of inner rhythms.",
        context: "Differentiates from traditional progress tracking",
        characterCount: 126
      }
    ]
  }
];

/**
 * UTILITY FUNCTIONS
 */

/**
 * Get all messaging for a specific feature
 */
export function getFeatureMessaging(featureName: string): FeatureMessaging | undefined {
  return MESSAGING_MATRIX.find(f => f.featureName.toLowerCase() === featureName.toLowerCase());
}

/**
 * Get specific messaging slot for a feature
 */
export function getMessagingSlot(featureName: string, location: string): MessagingSlot | undefined {
  const feature = getFeatureMessaging(featureName);
  return feature?.slots.find(s => s.location.toLowerCase().includes(location.toLowerCase()));
}

/**
 * Get dashboard tile messaging (most common use case)
 */
export function getDashboardTileText(featureName: string, breakpoint: 'desktop' | 'tablet' | 'mobile' = 'desktop'): string {
  const location = `Dashboard Tile (${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)})`;
  const slot = getMessagingSlot(featureName, location);
  return slot?.text || '';
}

/**
 * Get page header subtitle
 */
export function getPageHeaderSubtitle(featureName: string): string {
  const slot = getMessagingSlot(featureName, 'Page Header Subtitle');
  return slot?.text || '';
}

/**
 * Audit all messaging for consistency
 */
export function auditMessagingConsistency(): {
  feature: string;
  issues: string[];
}[] {
  const issues: { feature: string; issues: string[] }[] = [];
  
  MESSAGING_MATRIX.forEach(feature => {
    const featureIssues: string[] = [];
    
    // Check for dashes (DNA violation)
    feature.slots.forEach(slot => {
      if (slot.text.includes('—') || slot.text.includes('-')) {
        if (!slot.text.match(/\b\w+-\w+\b/)) { // Allow hyphenated words like "self-care"
          featureIssues.push(`Dash found in "${slot.location}": "${slot.text}"`);
        }
      }
    });
    
    // Check character count consistency across breakpoints
    const dashboardSlots = feature.slots.filter(s => s.location.includes('Dashboard Tile'));
    if (dashboardSlots.length > 1) {
      const texts = dashboardSlots.map(s => s.text);
      const uniqueTexts = new Set(texts);
      if (uniqueTexts.size > 1) {
        featureIssues.push(`Dashboard tile text varies across breakpoints: ${Array.from(uniqueTexts).join(' vs ')}`);
      }
    }
    
    if (featureIssues.length > 0) {
      issues.push({
        feature: feature.featureName,
        issues: featureIssues
      });
    }
  });
  
  return issues;
}

/**
 * Get messaging matrix as table data for display
 */
export function getMessagingTable(): {
  feature: string;
  dashboardTile: string;
  pageHeader: string;
  marketingTitle: string;
  coreConcept: string;
}[] {
  return MESSAGING_MATRIX.map(feature => ({
    feature: feature.featureName,
    dashboardTile: getDashboardTileText(feature.featureName),
    pageHeader: getPageHeaderSubtitle(feature.featureName),
    marketingTitle: getMessagingSlot(feature.featureName, 'Marketing Website - Platform Page')?.text || '',
    coreConcept: feature.coreConcept
  }));
}

/**
 * Export all messaging for a specific location (e.g., "Dashboard Tile")
 */
export function getMessagingByLocation(location: string): {
  feature: string;
  text: string;
  context?: string;
}[] {
  const results: { feature: string; text: string; context?: string }[] = [];
  
  MESSAGING_MATRIX.forEach(feature => {
    const slot = feature.slots.find(s => s.location.toLowerCase().includes(location.toLowerCase()));
    if (slot) {
      results.push({
        feature: feature.featureName,
        text: slot.text,
        context: slot.context
      });
    }
  });
  
  return results;
}
