import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@recoverlution/ui";

const meta = {
  title: "Design System/Avatar",
  component: Avatar,
  args: {
    name: "Ada Lovelace",
    size: 40,
  },
  argTypes: {
    size: { control: { type: "range", min: 32, max: 96, step: 4 } },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
      {[32, 40, 56, 72, 88].map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
