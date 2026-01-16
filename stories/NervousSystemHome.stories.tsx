import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NervousSystemHome } from "../apps/command-center/app/components/NervousSystemHome";

const meta = {
  title: "Command Center/Nervous System Home",
  component: NervousSystemHome,
  parameters: { layout: "fullscreen" },
  args: {
    source: "Demo",
    signals: [
      { title: "RLS policy updated", detail: "Journey Studio editors: publish window locked to 7d.", time: "2m", tone: "success" },
      { title: "Consent cadence", detail: "NaviCue Studio flagged 2 journeys needing fresh consent copy.", time: "18m", tone: "warn" },
      { title: "Preview runtime", detail: "Universal Player build 0.12.4 promoted to staging.", time: "42m" },
      { title: "Signals", detail: "Trace pipeline backpressure eased after limiter tweak.", time: "1h" },
    ],
    feed: [
      { id: "demo-1", item_kind: "navicue", content_type: "journey", content_ref: "journey/anchor", score: 0.86, priority: 9, context_tags: ["recovery", "clarity"] },
      { id: "demo-2", item_kind: "practice", content_type: "audio", content_ref: "soundbite/clarity", score: 0.73, priority: 7, context_tags: ["calm"] },
      { id: "demo-3", item_kind: "insight", content_type: "article", content_ref: "article/growth", score: 0.65, priority: 6, context_tags: ["growth"] },
    ],
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NervousSystemHome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {};

export const Live: Story = {
  args: {
    source: "Live",
  },
};
