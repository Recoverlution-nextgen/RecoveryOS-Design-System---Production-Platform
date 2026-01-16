import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@recoverlution/ui";

const meta: Meta<typeof Button> = {
  title: "Foundations/Button",
  component: Button,
  parameters: {
    layout: "centered"
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Click me",
    variant: "primary"
  }
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary"
  }
};
