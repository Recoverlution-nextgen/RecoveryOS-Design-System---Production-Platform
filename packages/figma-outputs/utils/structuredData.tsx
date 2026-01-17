/**
 * Structured Data (Schema.org) for SEO
 * JSON-LD format for rich snippets in search results
 */

export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Recoverlution',
    url: 'https://recoverlution.com',
    logo: 'https://recoverlution.com/logo.png',
    description: 'Evidence-based recovery platform for rehab facilities. Neuroadaptive therapy software delivering exceptional patient outcomes with 365-day therapeutic continuity.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    sameAs: [
      'https://www.linkedin.com/company/recoverlution',
      'https://twitter.com/recoverlution'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'hello@recoverlution.com',
      availableLanguage: 'English'
    }
  },

  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Recoverlution Platform',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Contact for enterprise pricing'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '87',
      bestRating: '5',
      worstRating: '1'
    },
    featureList: [
      'Six-pillar recovery framework',
      'ERA (Experience-Recognize-Align) methodology',
      'Real-time patient engagement tracking',
      'Therapeutic content library',
      'Outcome analytics dashboard',
      'HIPAA-compliant infrastructure'
    ]
  },

  breadcrumbs: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }),

  article: (data: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    author: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': 'Person',
      name: data.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Recoverlution',
      logo: {
        '@type': 'ImageObject',
        url: 'https://recoverlution.com/logo.png'
      }
    }
  }),

  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }),

  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Recoverlution Recovery Platform',
    provider: {
      '@type': 'Organization',
      name: 'Recoverlution'
    },
    serviceType: 'Behavioral Health Technology',
    description: 'Comprehensive recovery platform for rehab facilities featuring neuroadaptive therapy tools, patient engagement tracking, and evidence-based therapeutic content.',
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Rehab Facilities, Treatment Centers, Behavioral Health Providers'
    }
  },

  videoObject: (data: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: data.name,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    uploadDate: data.uploadDate,
    duration: data.duration,
    contentUrl: 'https://recoverlution.com/videos/' + data.name
  })
};

/**
 * Add structured data to page
 * Use in component or page
 */
export function addStructuredData(data: object) {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);

  // Cleanup function
  return () => {
    document.head.removeChild(script);
  };
}

/**
 * Hook to add structured data to a page
 */
export function useStructuredData(data: object) {
  if (typeof window !== 'undefined' && document) {
    // Check if script already exists
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    const dataString = JSON.stringify(data);
    
    let scriptExists = false;
    existingScripts.forEach(script => {
      if (script.textContent === dataString) {
        scriptExists = true;
      }
    });

    if (!scriptExists) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = dataString;
      document.head.appendChild(script);
    }
  }
}
