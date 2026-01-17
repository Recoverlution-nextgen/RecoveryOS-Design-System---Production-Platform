/**
 * ARTICLE FORMATTING UTILITY
 * 
 * Systematic cleanup for article content per infiniteK brand standards:
 * - NO markdown bold markers (**text**)
 * - NO em dashes (—) per "no dashes site-wide" rule
 * - NO inconsistent typography
 * 
 * Arrows (→) are preserved as they indicate relationships, not dashes
 */

export function cleanArticleContent(content: string): string {
  let cleaned = content;
  
  // Remove markdown bold markers **Text:** → Text:
  // Match **SomeText:** and replace with SomeText:
  cleaned = cleaned.replace(/\*\*([A-Za-z0-9\s\-'(),\/]+):\*\*/g, '$1:');
  
  // Remove standalone markdown bold **Text** → Text
  // This catches remaining bold markers that aren't followed by colons
  cleaned = cleaned.replace(/\*\*([A-Za-z0-9\s\-'(),\/]+)\*\*/g, '$1');
  
  // Replace em dashes based on context
  // Em dash in quotes with attribution: "Quote" — Author → "Quote" (Author)
  cleaned = cleaned.replace(/"\s*—\s*([^\n"]+)/g, '" ($1)');
  
  // Em dash at Level 3 in narrative identity → becomes "when"
  // "Level 3—when you revise" → "Level 3 when you revise"
  cleaned = cleaned.replace(/(\d+)—([a-z])/g, '$1 $2');
  
  // Em dash used for clarification/emphasis → use colon or remove
  // We'll replace with colon if it's followed by lowercase, remove otherwise
  cleaned = cleaned.replace(/—\s*([a-z])/g, ': $1');
  
  // Remove any remaining em dashes (likely separators or emphasis)
  cleaned = cleaned.replace(/—/g, '');
  
  return cleaned;
}

/**
 * Process an entire article object to clean all text content
 */
export function cleanArticle(article: any): any {
  const cleaned = { ...article };
  
  // Clean summary
  if (cleaned.summary) {
    cleaned.summary = cleanArticleContent(cleaned.summary);
  }
  
  // Clean subtitle
  if (cleaned.subtitle) {
    cleaned.subtitle = cleanArticleContent(cleaned.subtitle);
  }
  
  // Clean all sections
  if (cleaned.sections && Array.isArray(cleaned.sections)) {
    cleaned.sections = cleaned.sections.map((section: any) => ({
      ...section,
      heading: section.heading ? cleanArticleContent(section.heading) : section.heading,
      content: section.content ? cleanArticleContent(section.content) : section.content
    }));
  }
  
  return cleaned;
}

/**
 * Process an array of articles
 */
export function cleanArticles(articles: any[]): any[] {
  return articles.map(cleanArticle);
}