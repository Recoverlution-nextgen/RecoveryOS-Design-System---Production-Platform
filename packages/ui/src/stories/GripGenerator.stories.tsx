import type { Meta, StoryObj } from '@storybook/react';
import { GripGenerator } from '../components/grip/GripGenerator';

const meta = {
  title: 'Continuity Layer/GripGenerator',
  component: GripGenerator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    lens: {
      control: 'select',
      options: ['individual', 'professional', 'organisation'],
    },
  },
} satisfies Meta<typeof GripGenerator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Individual lens: "What kind of help?"
 */
export const Individual: Story = {
  args: {
    lens: 'individual',
    onConfirm: (config) => console.log('Grip confirmed:', config),
    onCancel: () => console.log('Grip cancelled'),
  },
};

/**
 * Professional lens: "Select grip type"
 */
export const Professional: Story = {
  args: {
    lens: 'professional',
    onConfirm: (config) => console.log('Grip configured:', config),
    onCancel: () => console.log('Configuration cancelled'),
  },
};

/**
 * Organisation lens: "Grip type"
 */
export const Organisation: Story = {
  args: {
    lens: 'organisation',
    onConfirm: (config) => console.log('Sequence configured:', config),
    onCancel: () => console.log('Configuration terminated'),
  },
};
