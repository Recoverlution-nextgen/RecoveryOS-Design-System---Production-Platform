import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@recoverlution/ui";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  args: {
    label: "Badge",
    tone: "brand" as const,
  },
  argTypes: {
    tone: { control: { type: "select" }, options: ["brand", "neutral", "success", "danger"] },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllTones: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
      {(["brand", "neutral", "success", "danger"] as const).map((tone) => (
        <Badge key={tone} {...args} tone={tone} label={`${tone} tone`} />
      ))}
    </div>
  ),
};
