import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommandCenterShell } from "./CommandCenterShell";

const feedDemo = [
  {
    id: "demo-1",
    item_kind: "navicue",
    content_type: "journey",
    content_ref: "journey/anchor",
    score: 0.86,
    priority: 9,
    context_tags: ["recovery", "clarity"],
  },
  {
    id: "demo-2",
    item_kind: "practice",
    content_type: "audio",
    content_ref: "soundbite/clarity",
    score: 0.73,
    priority: 7,
    context_tags: ["calm"],
  },
  {
    id: "demo-3",
    item_kind: "insight",
    content_type: "article",
    content_ref: "article/growth",
    score: 0.65,
    priority: 6,
    context_tags: ["growth"],
  },
  {
    id: "demo-4",
    item_kind: "component",
    content_type: "ui",
    content_ref: "button/primary",
    score: 0.58,
    priority: 5,
    context_tags: ["ui", "a11y"],
  },
];

const signals = [
  { title: "RLS policy updated", detail: "Journey Studio editors: publish window locked to 7d.", time: "2m", tone: "success" as const },
  { title: "Consent cadence", detail: "NaviCue Studio flagged 2 journeys needing fresh consent copy.", time: "18m", tone: "warn" as const },
  { title: "Preview runtime", detail: "Universal Player build 0.12.4 promoted to staging.", time: "42m" },
  { title: "Signals", detail: "Trace pipeline backpressure eased after limiter tweak.", time: "1h" },
];

const meta = {
  title: "Command Center/Shell",
  component: CommandCenterShell,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    feed: feedDemo,
    signals,
    source: "Demo",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandCenterShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {};

export const Live: Story = {
  args: {
    source: "Live",
  },
};
