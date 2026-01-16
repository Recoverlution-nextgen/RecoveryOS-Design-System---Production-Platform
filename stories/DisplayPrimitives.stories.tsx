import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar, Badge, Card } from "@recoverlution/ui";

const meta = {
  title: "Design System/Display",
  component: Card,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardWithContent: Story = {
  render: () => (
    <Card title="Recovery Pulse" footer="Updated 5 minutes ago">
      <p style={{ margin: 0, color: "var(--semantic-colors-ink-secondary, #C9C4D8)" }}>
        A lightweight card showing how typography and surface tokens play together.
      </p>
    </Card>
  ),
};

export const Badges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
      <Badge label="Brand" tone="brand" />
      <Badge label="Neutral" tone="neutral" />
      <Badge label="Success" tone="success" />
      <Badge label="Danger" tone="danger" />
    </div>
  ),
};

export const Avatars: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
      <Avatar name="Ada Lovelace" />
      <Avatar name="Grace Hopper" size={56} />
      <Avatar name="Alan Turing" size={72} />
    </div>
  ),
};
