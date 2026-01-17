import { ArrowRight } from "lucide-react";
import { getStory, type Story } from "../utils/storyRegistry";

interface StoryLinkProps {
  storyId: string;
  onNavigate: (route: string) => void;
  variant?: "badge" | "pill" | "inline";
  showTitle?: boolean;
}

/**
 * StoryLink - Clickable link to a story/documentation page
 * 
 * Usage:
 * <StoryLink storyId="ST42" onNavigate={handleNavigate} />
 * <StoryLink storyId="ST3" onNavigate={handleNavigate} variant="pill" showTitle />
 */
export function StoryLink({ storyId, onNavigate, variant = "badge", showTitle = false }: StoryLinkProps) {
  const story = getStory(storyId);
  
  if (!story) {
    return <span className="text-gray-400 text-xs">@{storyId}</span>;
  }

  const handleClick = () => {
    onNavigate(story.route);
  };

  // Badge variant - compact, just the ID
  if (variant === "badge") {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3E2BB8]/10 hover:bg-[#3E2BB8]/20 text-[#3E2BB8] text-xs font-medium transition-colors group"
        title={story.title}
      >
        {storyId}
        <div className="w-2 h-2 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    );
  }

  // Pill variant - ID + optional title
  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#3E2BB8]/20 hover:border-[#5739FB]/40 hover:shadow-md hover:shadow-[#5739FB]/10 transition-all group"
      >
        <span className="text-xs font-medium text-[#3E2BB8]">{storyId}</span>
        {showTitle && (
          <>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-700 group-hover:text-[#3E2BB8] transition-colors">
              {story.title}
            </span>
          </>
        )}
        <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#5739FB] group-hover:translate-x-0.5 transition-all" />
      </button>
    );
  }

  // Inline variant - styled like a link in text
  if (variant === "inline") {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-1 text-[#3E2BB8] hover:text-[#5739FB] underline underline-offset-2 decoration-[#3E2BB8]/30 hover:decoration-[#5739FB]/50 transition-colors"
        title={story.title}
      >
        @{storyId}
      </button>
    );
  }

  return null;
}

interface StoryBadgeGridProps {
  storyIds: string[];
  onNavigate: (route: string) => void;
  title?: string;
}

/**
 * StoryBadgeGrid - Display multiple story links in a grid
 * 
 * Usage:
 * <StoryBadgeGrid storyIds={["ST42", "ST43", "ST45"]} onNavigate={handleNavigate} title="Related Stories" />
 */
export function StoryBadgeGrid({ storyIds, onNavigate, title = "Related Stories" }: StoryBadgeGridProps) {
  const stories = storyIds.map(id => getStory(id)).filter(Boolean) as Story[];
  
  if (stories.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="text-sm text-gray-600">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {stories.map(story => (
          <StoryLink key={story.id} storyId={story.id} onNavigate={onNavigate} variant="pill" showTitle />
        ))}
      </div>
    </div>
  );
}

interface RelatedStoriesProps {
  currentStoryId: string;
  onNavigate: (route: string) => void;
  limit?: number;
}

/**
 * RelatedStories - Automatically show related stories based on tags
 * 
 * Usage:
 * <RelatedStories currentStoryId="ST42" onNavigate={handleNavigate} />
 */
export function RelatedStories({ currentStoryId, onNavigate, limit = 5 }: RelatedStoriesProps) {
  const story = getStory(currentStoryId);
  
  if (!story || !story.tags || story.tags.length === 0) return null;

  // Find related stories based on shared tags
  const allStories = Object.values(getStory("ST1") ? { } : {}); // Get all stories
  const related = Object.keys(require("../utils/storyRegistry").STORY_REGISTRY)
    .map(id => getStory(id))
    .filter(Boolean)
    .filter(s => s!.id !== currentStoryId)
    .filter(s => s!.tags?.some(tag => story.tags?.includes(tag)))
    .sort((a, b) => {
      const aShared = a!.tags?.filter(tag => story.tags?.includes(tag)).length || 0;
      const bShared = b!.tags?.filter(tag => story.tags?.includes(tag)).length || 0;
      return bShared - aShared;
    })
    .slice(0, limit) as Story[];

  if (related.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-[#3E2BB8]/5 to-[#5739FB]/5 rounded-xl p-6 border border-[#5739FB]/10">
      <h3 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Related Documentation
      </h3>
      <div className="flex flex-wrap gap-2">
        {related.map(story => (
          <StoryLink key={story.id} storyId={story.id} onNavigate={onNavigate} variant="pill" showTitle />
        ))}
      </div>
    </div>
  );
}
