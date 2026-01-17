/**
 * BUZZ TAG COMPONENT
 * 
 * Purpose: Expert-grade industry buzzwords that stamp authority and build trust
 * Philosophy: "We lead with science" - Apple doesn't, but we do
 * 
 * RULES:
 * - Always used in groups of 3
 * - 1-2 words maximum per tag
 * - NEVER repeat words already in the copy
 * - States VALUE, not description
 * - Expert-grade, industry-relevant, buyer validation tick boxes
 * 
 * Design: Smaller than eyebrow, left-aligned, WHITE TEXT, single row
 * Function: Acts as bottom bookend to the eyebrow top bookend
 * 
 * Created: October 31, 2025
 */

interface BuzzTagProps {
  tags: string[]; // Exactly 3 tags
  sectionColor: string; // Section-specific color (e.g., '#5739FB' for purple)
}

export function BuzzTag({ tags, sectionColor }: BuzzTagProps) {
  
  // Ensure exactly 3 tags
  if (tags.length !== 3) {
    console.warn(`BuzzTag expects exactly 3 tags, received ${tags.length}`);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, 3).map((tag, index) => (
        <div
          key={index}
          className="inline-flex items-center px-2 py-1 backdrop-blur-sm border border-white/30"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0px'
          }}
        >
          <span
            className="uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.5625rem',
              letterSpacing: '0.1em',
              color: '#FFFFFF',
              whiteSpace: 'nowrap'
            }}
          >
            {tag}
          </span>
        </div>
      ))}
    </div>
  );
}