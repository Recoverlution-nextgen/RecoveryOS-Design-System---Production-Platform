import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: object | object[];
}

/**
 * SEO Head Component
 * Manages page-specific meta tags for SEO optimization
 */
export function SEOHead({ 
  title, 
  description, 
  keywords,
  canonicalUrl = 'https://recoverlution.com',
  ogImage = 'https://recoverlution.com/og-image.png',
  noIndex = false,
  structuredData
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    // Standard meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    
    // Robots meta tag for noIndex
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }
    
    // Open Graph tags (for social sharing - WhatsApp, LinkedIn, Facebook, etc.)
    updateMetaTag('og:site_name', 'Recoverlution', true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', 'Recoverlution - Evidence-Based Recovery Platform', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@recoverlution');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', 'Recoverlution - Evidence-Based Recovery Platform');
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
    
    // Structured Data (JSON-LD)
    if (structuredData) {
      // Remove existing structured data scripts for this page
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-page]');
      existingScripts.forEach(script => script.remove());
      
      // Handle array of structured data or single object
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      
      // Add each structured data object as separate script
      dataArray.forEach((data, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page', 'true');
        script.setAttribute('data-index', index.toString());
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
    
  }, [title, description, keywords, canonicalUrl, ogImage, structuredData]);
  
  return null; // This component doesn't render anything
}
