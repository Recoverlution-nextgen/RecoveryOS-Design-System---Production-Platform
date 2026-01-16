import type { FeedQueueItem } from "designsystem/supabase";

const hasSupabaseEnv = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      process.env.SUPABASE_URL
  ) &&
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );

const fallbackFeed: FeedQueueItem[] = [
  {
    id: "demo-1",
    item_kind: "navicue",
    content_type: "journey",
    content_id: "journey-demo",
    content_ref: "journey/anchor",
    score: 0.86,
    priority: 9,
    context_tags: ["recovery", "clarity"],
  },
  {
    id: "demo-2",
    item_kind: "practice",
    content_type: "audio",
    content_id: "sb-clarity",
    content_ref: "soundbite/clarity",
    score: 0.73,
    priority: 7,
    context_tags: ["calm"],
  },
  {
    id: "demo-3",
    item_kind: "insight",
    content_type: "article",
    content_id: "insight-growth",
    content_ref: "article/growth",
    score: 0.65,
    priority: 6,
    context_tags: ["growth"],
  },
];

export async function fetchFeedPreview(limit = 5): Promise<FeedQueueItem[]> {
  if (!hasSupabaseEnv()) {
    return fallbackFeed.slice(0, limit);
  }

  try {
    const { supabaseClient } = await import("designsystem/supabase");
    const items = await supabaseClient.feedPull({ limit });
    return items ?? [];
  } catch (error) {
    console.error("Supabase feedPull failed, falling back to demo data", error);
    return fallbackFeed.slice(0, limit);
  }
}
