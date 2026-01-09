import type { Meta, StoryObj } from '@storybook/react';
import { StateChip } from './StateChip';

const meta: Meta<typeof StateChip> = {
  title: 'LUMA/StateChip',
  component: StateChip,
  args: {
    label: 'Energy',
    value: 'Stable',
    tone: 'safe',
  },
};

export default meta;

type Story = StoryObj<typeof StateChip>;

export const Safe: Story = {};
export const Caution: Story = { args: { tone: 'caution', value: 'Elevated' } };
export const Alert: Story = { args: { tone: 'alert', value: 'Spiking' } };
