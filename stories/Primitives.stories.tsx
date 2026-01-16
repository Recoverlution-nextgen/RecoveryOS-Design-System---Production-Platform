import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  Switch,
  TextArea,
} from "@recoverlution/ui";

const meta = {
  title: "Design System/Primitives",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "grid",
      gap: "20px",
      background: "var(--semantic-colors-surface-base, #1F1D27)",
      color: "var(--semantic-colors-ink-primary, #F9F8FF)",
      padding: "24px",
      borderRadius: "12px",
    }}
  >
    {children}
  </div>
);

export const Buttons: Story = {
  args: {},
  render: () => (
    <Container>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="primary" size="sm">
          Small
        </Button>
        <Button variant="primary" size="lg">
          Large
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </Container>
  ),
};

export const FormFields: Story = {
  args: {},
  render: () => (
    <Container>
      <Input label="Email" placeholder="you@example.com" helperText="We will never spam." />
      <Input label="Email" placeholder="you@example.com" status="success" helperText="Looks good." />
      <Input label="Email" placeholder="you@example.com" error="This field is required" />
      <TextArea label="Notes" placeholder="Add context" helperText="Plain text only." />
      <Select
        label="Plan"
        defaultValue="pro"
        options={[
          { label: "Starter", value: "starter" },
          { label: "Pro", value: "pro" },
          { label: "Enterprise", value: "enterprise" },
        ]}
      />
      <Select
        label="Plan"
        defaultValue="starter"
        error="Choose a plan"
        options={[
          { label: "Starter", value: "starter" },
          { label: "Pro", value: "pro" },
          { label: "Enterprise", value: "enterprise" },
        ]}
      />
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Checkbox label="Remember me" defaultChecked />
        <Switch label="Notifications" defaultChecked />
      </div>
    </Container>
  ),
};

export const Surfaces: Story = {
  args: {},
  render: () => (
    <Container>
      <Card
        title="Recovery Pulse"
        footer="Updated 5 minutes ago"
      >
        <p style={{ margin: 0, color: "var(--semantic-colors-ink-secondary, #C9C4D8)" }}>
          A lightweight card showing how typography and surface tokens play together.
        </p>
      </Card>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        <Badge label="Brand" tone="brand" />
        <Badge label="Neutral" tone="neutral" />
        <Badge label="Success" tone="success" />
        <Badge label="Danger" tone="danger" />
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" size={56} />
      </div>
    </Container>
  ),
};
