import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@recoverlution/ui";

const meta = {
  title: "Design System/Button",
  component: Button,
  args: {
    children: "Press",
    variant: "primary" as const,
    size: "md" as const,
  },
  argTypes: {
    variant: { control: { type: "radio" }, options: ["primary", "secondary"] },
    size: { control: { type: "radio" }, options: ["sm", "md", "lg"] },
    onClick: { action: "click" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
