/**
 * ALT TEXT CONFIGURATION - COMPREHENSIVE IMAGE ACCESSIBILITY
 * 
 * Centralized alt text for all images across the platform
 * Following best practices:
 * - Descriptive but concise (under 125 characters ideal)
 * - Context-specific based on usage
 * - No "image of" or "picture of" prefixes
 * - Includes relevant keywords for SEO
 * - Empty alt="" for decorative images
 */

export const ALT_TEXT = {
  // HERO IMAGES
  heroes: {
    home: 'Recoverlution platform interface showing neuroadaptive recovery journeys and patient engagement dashboard',
    platform: 'Human Cognition Platform displaying six-pillar recovery framework and therapeutic content library',
    science: 'Neuroscience visualization showing ERA framework and micro-block architecture for behavioral change',
    story: 'Recoverlution founding team collaborating on recovery technology innovation',
    pricing: 'Recovery platform pricing tiers with feature comparison for rehab facilities',
    demo: 'Personalized platform walkthrough showing journey curation and patient monitoring tools'
  },

  // SECTION 2 - BOOKEND/COMPOUND GLASS ASSETS
  section2: {
    homeArchitecture: 'Recovery architecture visualization showing interconnected neural pathways and micro-block system',
    platformHumanBaseline: 'Human baseline assessment interface tracking conscious and subconscious recovery metrics',
    scienceArchitecture: 'Neuroscience diagram illustrating interconnected recovery systems and behavioral momentum',
    storyCrisis: 'Emotional journey map showing personal loss leading to clinical innovation'
  },

  // SECTION 3 - FEATURE TILES/CARDS
  section3: {
    homeTransform: 'Therapist using Recoverlution platform to transform traditional treatment into continuous care',
    platformStructured: 'Structured pathway interface showing Journey, Navicues, and Luma recovery tools',
    scienceERA: 'ERA framework visualization with Experience, Recognize, and Align stages',
    storyInsight: 'Clinical gap analysis revealing need for post-discharge patient engagement'
  },

  // SIX PILLARS ASSETS
  pillars: {
    emotionalRegulation: 'Patient practicing emotional regulation techniques through guided breathwork exercise',
    stressResilience: 'Stress resilience training showing progressive muscle relaxation and body awareness',
    cognitiveReframing: 'Cognitive reframing session displaying thought pattern recognition and restructuring',
    decisionMastery: 'Decision mastery exercise teaching impulse control and deliberate choice-making',
    socialConnectivity: 'Group therapy session fostering authentic social connection and support networks',
    identityIntegration: 'Identity integration work helping patient align values with recovery journey'
  },

  // PLATFORM FEATURES
  platform: {
    journey: 'Journey management dashboard showing weekly ERA sessions and patient progress tracking',
    navicues: 'Navicues micro-content library with contextual recovery prompts and behavioral interventions',
    luma: 'Luma adaptive guidance system providing personalized recovery insights and recommendations',
    navigate: 'Navigate compass tool helping patients orient emotional states and decision-making',
    wellbeing: 'Wellbeing tracking interface monitoring physical health, sleep, and stress markers',
    toolkit: 'Recovery toolkit collection with breathwork, meditation, and grounding exercises',
    state: 'State tracking visualization showing emotional regulation patterns over time',
    momentum: 'Momentum analytics displaying patient engagement trends and outcome metrics',
    therapistPortal: 'Therapist portal showing journey curation, session scheduling, and patient monitoring',
    connectedCare: 'Connected care integration dashboard with EHR sync and clinical workflow tools'
  },

  // PRICING ECONOMICS TILES
  economics: {
    infrastructure: 'Recovery infrastructure diagram showing alumni network creating perpetual value',
    retention: 'Patient retention graph demonstrating 67% lift with continuous engagement',
    referrals: 'Referral network visualization showing organic word-of-mouth growth'
  },

  // STAKEHOLDER TILES
  stakeholders: {
    patients: 'Patient using mobile app for daily recovery check-ins and therapeutic exercises',
    facilities: 'Rehab facility dashboard monitoring census, outcomes, and alumni engagement',
    therapists: 'Therapist reviewing patient progress analytics and journey effectiveness',
    families: 'Family portal showing loved one recovery progress and communication tools',
    payers: 'Insurance analytics dashboard displaying outcome metrics and cost-effectiveness'
  },

  // STORY PAGE ASSETS
  story: {
    mission: 'Team mission statement emphasizing evidence-based innovation and patient-first design',
    values: 'Core values visualization showing neuroscience, ethics, and therapeutic excellence',
    team: 'Recoverlution team members bringing expertise in behavioral health and technology'
  },

  // MULTI-DEVICE CONTINUITY
  devices: {
    phone: 'Recoverlution mobile app on smartphone showing daily journey sessions',
    tablet: 'Therapist using tablet for real-time patient engagement and journey curation',
    desktop: 'Desktop analytics dashboard with comprehensive outcome tracking and reporting',
    wearables: 'Smartwatch integration displaying wellness metrics and recovery reminders'
  },

  // FINAL CTA ASSETS
  finalCTA: {
    home: 'Schedule demo button leading to personalized platform walkthrough',
    platform: 'Request access to six-pillar recovery operating system',
    science: 'Explore neuroscience-backed recovery technology',
    story: 'Join mission to transform addiction treatment',
    pricing: 'Start free trial of recovery platform',
    demo: 'Book consultation with recovery technology expert'
  },

  // DECORATIVE (empty alt for screen readers to skip)
  decorative: {
    backgroundPattern: '',
    gradientOverlay: '',
    glassEffect: '',
    shimmerAnimation: ''
  }
};

/**
 * Get alt text for specific image by category and key
 */
export function getAltText(category: keyof typeof ALT_TEXT, key: string): string {
  const categoryObj = ALT_TEXT[category] as Record<string, string>;
  return categoryObj[key] || '';
}

/**
 * Generate contextual alt text for dynamic content
 * Use when alt text needs to include dynamic data
 */
export function generateAltText(template: string, data: Record<string, string>): string {
  let result = template;
  Object.entries(data).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, value);
  });
  return result;
}

/**
 * Validate alt text follows best practices
 * - Not too long (< 125 chars recommended)
 * - Not empty (unless decorative)
 * - No redundant words like "image of"
 */
export function validateAltText(altText: string, isDecorative = false): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (isDecorative && altText !== '') {
    warnings.push('Decorative images should have empty alt text (alt="")');
  }

  if (!isDecorative && altText === '') {
    warnings.push('Non-decorative images must have descriptive alt text');
  }

  if (altText.length > 125) {
    warnings.push('Alt text is too long. Keep under 125 characters for best practice.');
  }

  const redundantPhrases = ['image of', 'picture of', 'photo of', 'graphic of'];
  redundantPhrases.forEach(phrase => {
    if (altText.toLowerCase().includes(phrase)) {
      warnings.push(`Avoid redundant phrase: "${phrase}"`);
    }
  });

  return {
    isValid: warnings.length === 0,
    warnings
  };
}
