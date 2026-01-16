import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "@recoverlution/ui";

const meta = {
  title: "Design System/Card",
  component: Card,
  args: {
    title: "Recovery Pulse",
    footer: "Updated 5 minutes ago",
    children: (
      <p style={{ margin: 0, color: "var(--semantic-colors-ink-secondary, #C9C4D8)" }}>
        A lightweight card showing how typography and surface tokens play together.
      </p>
    ),
  },
  argTypes: {
    title: { control: "text" },
    footer: { control: "text" },
  },
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
