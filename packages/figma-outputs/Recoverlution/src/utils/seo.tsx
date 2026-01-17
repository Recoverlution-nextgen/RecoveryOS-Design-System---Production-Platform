/**
 * SEO Metadata Configuration
 * Centralized SEO data for all marketing pages
 */

export const SEO_CONFIG = {
  siteName: 'Recoverlution',
  siteUrl: 'https://recoverlution.com',
  defaultImage: 'https://recoverlution.com/og-image.png',
  twitterHandle: '@recoverlution',
  
  pages: {
    home: {
      title: 'Recoverlution - Recovery at the Speed of Life | B2B Recovery Platform',
      description: 'Transform your rehab facility with Recoverlution\'s neuroadaptive platform. Deliver exceptional 365-day patient outcomes with evidence-based care, real-time tracking, and proven therapeutic continuity.',
      keywords: 'addiction recovery platform, rehab facility software, patient engagement, neuroadaptive therapy, evidence-based treatment, recovery outcomes, therapeutic continuity, behavioral health technology, substance abuse treatment, B2B recovery solutions',
      canonicalUrl: 'https://recoverlution.com'
    },
    
    platform: {
      title: 'Platform Features - Recoverlution | Recovery Operating System for Rehabs',
      description: 'Explore Recoverlution\'s six-pillar recovery architecture: emotional regulation, stress resilience, cognitive reframing, decision mastery, social connection, and identity alignment. Built for measurable neurological change.',
      keywords: 'recovery platform features, six pillars recovery, emotional regulation tools, neuroadaptive learning, therapeutic engagement software, patient recovery tracking, behavioral health platform, addiction treatment technology',
      canonicalUrl: 'https://recoverlution.com/platform'
    },
    
    science: {
      title: 'The Science - Recoverlution | Human Cognition Platform & ERA Framework',
      description: 'Discover the neuroscience behind Recoverlution: Our Human Cognition Platform (HCP) uses the Experience-Recognize-Align (ERA) framework and neuroplasticity principles to turn recovery insights into reflexes.',
      keywords: 'recovery neuroscience, neuroplasticity therapy, trauma-informed design, HCP architecture, ERA framework, cognitive behavioral therapy, evidence-based recovery, applied neuroscience, behavioral change technology',
      canonicalUrl: 'https://recoverlution.com/science'
    },
    
    story: {
      title: 'Our Story - Recoverlution | Building the Future of Recovery Care',
      description: 'Founded by experts in neuroscience, behavioral health, and technology, Recoverlution was built to solve the critical gap in post-discharge patient engagement and therapeutic continuity for rehab facilities.',
      keywords: 'recovery technology company, addiction treatment innovation, behavioral health startup, recovery platform founders, therapeutic technology mission, rehab facility solutions',
      canonicalUrl: 'https://recoverlution.com/story'
    },
    
    pricing: {
      title: 'Pricing - Recoverlution | Seat-Based Licensing for Rehab Facilities',
      description: 'Flexible seat-based pricing for rehab facilities of all sizes. Core and Enterprise plans include patient management, therapeutic content library, outcome tracking, and dedicated support. Request a demo today.',
      keywords: 'recovery software pricing, rehab facility software cost, seat-based licensing, behavioral health platform pricing, treatment center technology, recovery platform plans, therapeutic software subscription',
      canonicalUrl: 'https://recoverlution.com/pricing'
    },
    
    demo: {
      title: 'Schedule a Demo - Recoverlution | See the Platform in Action',
      description: 'Book a personalized demo of Recoverlution\'s recovery platform. See how we help rehab facilities deliver exceptional patient outcomes with neuroadaptive technology and evidence-based care.',
      keywords: 'recovery platform demo, rehab software demonstration, schedule platform tour, behavioral health technology demo, addiction treatment software demo',
      canonicalUrl: 'https://recoverlution.com/demo'
    },
    
    privacy: {
      title: 'Privacy Policy - Recoverlution | HIPAA-Compliant Data Protection',
      description: 'Recoverlution\'s privacy policy: How we collect, use, and protect patient health information in compliance with HIPAA, GDPR, and industry security standards.',
      keywords: 'HIPAA privacy policy, patient data protection, healthcare data security, behavioral health privacy, PHI protection',
      canonicalUrl: 'https://recoverlution.com/privacy'
    },
    
    terms: {
      title: 'Terms of Service - Recoverlution | Platform Usage Agreement',
      description: 'Terms of service for Recoverlution\'s B2B recovery platform. Review our usage policies, service agreements, and legal terms for rehab facilities and healthcare providers.',
      keywords: 'platform terms of service, healthcare software agreement, B2B service terms, recovery platform legal',
      canonicalUrl: 'https://recoverlution.com/terms'
    },
    
    cookies: {
      title: 'Cookie Policy - Recoverlution | How We Use Cookies',
      description: 'Learn how Recoverlution uses cookies to improve user experience, analyze platform usage, and ensure security. Manage your cookie preferences.',
      keywords: 'cookie policy, website cookies, privacy preferences, data tracking policy',
      canonicalUrl: 'https://recoverlution.com/cookies'
    }
  }
};

/**
 * Get SEO metadata for a specific page
 */
export function getPageSEO(pageKey: keyof typeof SEO_CONFIG.pages) {
  return SEO_CONFIG.pages[pageKey];
}
