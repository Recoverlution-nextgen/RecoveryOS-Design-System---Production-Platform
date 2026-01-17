/**
 * DEMO ARTICLE - Window of Tolerance
 * 
 * Purpose: Showcase the Article + Practice integration
 * Based on real clinical content from Emotional Regulation pillar
 * 
 * NOTE: This demonstrates the ArticlePageNew component with unified CSS
 */

import { ArticlePageNew } from "./pages/ArticlePageNew";

export function DemoArticle({ onBack }: { onBack?: () => void }) {
  // Demo article data - matches database structure
  const articleData = {
    id: "article_window_tolerance",
    title: "The Window of Tolerance: Your Emotional Sweet Spot",
    subtitle: "Understanding how your nervous system finds balance between overwhelm and shutdown",
    pillar_id: "ER",
    pillarClinical: "Emotional Regulation",
    pillarPatient: "Feeling It Through",
    pillarColor: "#7C67FF",
    concept_id: "ER_WOT",
    theme_id: "ER_WOT_AIM",
    themePatient: "Aim Attention",
    asset_url: "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=1200",
    thought_leader: "Dan Siegel",
    read_time: 12,
    difficulty: "Beginner",
    sections: [
      {
        type: "text",
        content: "There's a zone where you feel present. Where emotions move through you without taking over. Where stress happens, but doesn't shatter you. Dan Siegel calls this the <strong>Window of Tolerance</strong>, and it's one of the most important concepts in understanding how we regulate our emotional lives."
      },
      {
        type: "text",
        content: "Think of it as the Goldilocks zone of your nervous system. Not too activated. Not too numb. Just right. Within this window, you can think clearly, feel your feelings, and respond to what's happening around you without losing yourself in the process."
      },
      {
        type: "heading",
        content: "What Happens Outside the Window"
      },
      {
        type: "text",
        content: "When stress, trauma, or overwhelming emotions push you beyond your window of tolerance, your nervous system does what it's designed to do: it protects you. But the protection comes at a cost."
      },
      {
        type: "quote",
        content: "You can go too high into hyperarousal, or too low into hypoarousal. Both feel like survival, not living."
      },
      {
        type: "text",
        content: "<strong>Hyperarousal</strong> looks like anxiety, panic, anger, racing thoughts, and feeling like everything is too much. You're flooded. Your heart races. You can't slow down. You might lash out or need to escape."
      },
      {
        type: "text",
        content: "<strong>Hypoarousal</strong> looks like numbness, disconnection, brain fog, and feeling like nothing matters. You're shut down. Emotions feel distant or gone. You might feel frozen, empty, or like you're watching life from behind glass."
      },
      {
        type: "heading",
        content: "Why Your Window Narrows"
      },
      {
        type: "text",
        content: "Trauma, chronic stress, addiction, and unprocessed grief all shrink your window. What used to feel manageable now feels overwhelming. What used to be a minor inconvenience now sends you spiraling or shutting down."
      },
      {
        type: "text",
        content: "This isn't weakness. This is your nervous system doing what nervous systems do when they've been overwhelmed too many times: they become more protective, more reactive, more ready to flip into survival mode at the slightest trigger."
      },
      {
        type: "reflection",
        content: "Think about a moment recently when you felt outside your window. Were you flooded (hyperarousal) or shut down (hypoarousal)? What was happening around you? What was happening inside you?"
      },
      {
        type: "heading",
        content: "How to Widen Your Window"
      },
      {
        type: "text",
        content: "The good news: your window can expand. It takes practice, patience, and the right tools. But it's possible to build a wider range of tolerance for difficult emotions and stressful situations."
      },
      {
        type: "text",
        content: "You widen your window by practicing regulation when you're <em>inside</em> it. Not when you're flooded or shut down, but when you're present enough to notice what's happening and respond with intention."
      },
      {
        type: "text",
        content: "Every time you practice these tools, you're teaching your nervous system that it's safe to stay present. You're building new neural pathways. You're expanding your capacity to feel without being consumed."
      },
      {
        type: "quote",
        content: "Recovery isn't about never leaving your window. It's about recognizing when you've left it and knowing how to come back."
      },
      {
        type: "text",
        content: "This is the foundation of emotional regulation. Not control. Not suppression. But awareness, practice, and compassion for the system that's working so hard to keep you safe."
      }
    ],
    nextArticle: {
      id: "article_emotion_labeling",
      title: "Name It to Tame It: The Neuroscience of Emotion Labeling",
      pillarPatient: "Feeling It Through"
    }
  };

  return <ArticlePageNew {...articleData} onBack={onBack} />;
}