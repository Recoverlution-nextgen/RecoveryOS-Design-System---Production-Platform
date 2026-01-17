/**
 * RAW CONTENT UTILITIES - V3 READY
 * Simple utilities for content management
 */

export interface RawContentItem {
  id: string;
  type: 'text' | 'video' | 'image' | 'audio' | 'navicue';
  title?: string;
  content: string;
  metadata?: {
    duration?: number;
    author?: string;
    tags?: string[];
    pillar?: string;
  };
}

/**
 * Simple content loader - replace with your data source
 */
export async function loadRawContent(type?: string, limit?: number): Promise<RawContentItem[]> {
  // This is a placeholder - replace with your actual data loading logic
  // Could be from Supabase, local JSON, API, etc.

  const mockContent: RawContentItem[] = [
    {
      id: '1',
      type: 'text',
      title: 'Welcome to Your Journey',
      content: 'Take a deep breath. You are exactly where you need to be.',
      metadata: { pillar: 'ER', tags: ['mindfulness', 'breathing'] }
    },
    {
      id: '2',
      type: 'text',
      title: 'A Simple Practice',
      content: 'Notice what you are feeling right now, without judgment.',
      metadata: { pillar: 'SC', tags: ['awareness', 'acceptance'] }
    }
  ];

  let filtered = mockContent;
  if (type) {
    filtered = mockContent.filter(item => item.type === type);
  }

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}

/**
 * Content queue manager
 */
export class RawContentQueue {
  private items: RawContentItem[] = [];
  private currentIndex = 0;

  constructor(items: RawContentItem[]) {
    this.items = [...items];
  }

  get current(): RawContentItem | null {
    return this.items[this.currentIndex] || null;
  }

  get next(): RawContentItem | null {
    return this.items[this.currentIndex + 1] || null;
  }

  get hasNext(): boolean {
    return this.currentIndex < this.items.length - 1;
  }

  get progress(): { current: number; total: number } {
    return {
      current: this.currentIndex + 1,
      total: this.items.length
    };
  }

  advance(): RawContentItem | null {
    if (this.hasNext) {
      this.currentIndex++;
      return this.current;
    }
    return null;
  }

  reset(): void {
    this.currentIndex = 0;
  }

  addItem(item: RawContentItem): void {
    this.items.push(item);
  }

  removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    if (this.currentIndex >= this.items.length) {
      this.currentIndex = Math.max(0, this.items.length - 1);
    }
  }
}

/**
 * Simple content filter
 */
export function filterRawContent(
  items: RawContentItem[],
  filters: {
    type?: string;
    pillar?: string;
    tags?: string[];
  }
): RawContentItem[] {
  return items.filter(item => {
    if (filters.type && item.type !== filters.type) return false;
    if (filters.pillar && item.metadata?.pillar !== filters.pillar) return false;
    if (filters.tags && filters.tags.length > 0) {
      const itemTags = item.metadata?.tags || [];
      const hasMatchingTag = filters.tags.some(tag => itemTags.includes(tag));
      if (!hasMatchingTag) return false;
    }
    return true;
  });
}

/**
 * Content shuffler
 */
export function shuffleRawContent(items: RawContentItem[]): RawContentItem[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}