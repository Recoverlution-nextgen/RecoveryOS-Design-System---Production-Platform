import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox, Input, Select, Switch, TextArea } from "@recoverlution/ui";

const meta = {
  title: "Design System/Fields",
  component: Input,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const selectOptions = [
  { label: "Starter", value: "starter" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "18px", maxWidth: "520px" }}>
      <Input label="Email" placeholder="you@example.com" helperText="We will never spam." />
      <Input label="Email" placeholder="you@example.com" status="success" helperText="Looks good." />
      <Input label="Email" placeholder="you@example.com" error="This field is required" />
      <TextArea label="Notes" placeholder="Add context" helperText="Plain text only." />
      <Select label="Plan" defaultValue="pro" options={selectOptions} />
      <Select label="Plan" defaultValue="starter" error="Choose a plan" options={selectOptions} />
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Checkbox label="Remember me" defaultChecked />
        <Switch label="Notifications" defaultChecked />
      </div>
    </div>
  ),
};
