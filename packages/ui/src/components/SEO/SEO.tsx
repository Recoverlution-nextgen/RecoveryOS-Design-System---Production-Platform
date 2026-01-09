import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      
      // Twitter
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ];

    if (ogImage) {
      metaTags.push(
        { property: 'og:image', content: ogImage },
        { name: 'twitter:image', content: ogImage }
      );
    }

    if (noindex) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }

    // Remove existing meta tags
    metaTags.forEach(({ name, property }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      const existing = document.head.querySelector(selector);
      if (existing) {
        existing.remove();
      }
    });

    // Add new meta tags
    metaTags.forEach((tag) => {
      const meta = document.createElement('meta');
      if ('name' in tag && tag.name) {
        meta.name = tag.name;
      }
      if ('property' in tag && tag.property) {
        meta.setAttribute('property', tag.property);
      }
      if ('content' in tag) {
        meta.content = tag.content;
      }
      document.head.appendChild(meta);
    });

    // Set canonical URL
    if (canonicalUrl) {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // Cleanup function
    return () => {
      metaTags.forEach(({ name, property }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        const existing = document.head.querySelector(selector);
        if (existing) {
          existing.remove();
        }
      });

      if (canonicalUrl) {
        const link = document.head.querySelector('link[rel="canonical"]');
        if (link) {
          link.remove();
        }
      }
    };
  }, [title, description, keywords, ogImage, ogType, twitterCard, canonicalUrl, noindex]);

  return null;
}

// Structured data helper for JSON-LD
export interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export function generateOrganizationSchema(org: OrganizationSchema): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    description: org.description,
    url: org.url,
    logo: org.logo,
    sameAs: org.sameAs,
  });
}

export function StructuredData({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
