import type { Meta, StoryObj } from '@storybook/react';
import { NaviCueCard } from './NaviCueCard';

const meta: Meta<typeof NaviCueCard> = {
  title: 'LUMA/NaviCueCard',
  component: NaviCueCard,
  args: {
    title: 'Downshift under load',
    intent: 'Stabilise arousal and widen choice space',
    suitability: 'safe',
    primitive: 'Breath drop + orient',
    proofRequest: 'Log one felt shift within 30s',
    status: 'pending',
  },
};

export default meta;

type Story = StoryObj<typeof NaviCueCard>;

export const Default: Story = {};

export const Caution: Story = {
  args: {
    suitability: 'caution',
    status: 'captured',
  },
};

export const Alert: Story = {
  args: {
    suitability: 'alert',
    status: 'missed',
  },
};
