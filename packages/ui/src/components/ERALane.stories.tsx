import type { Meta, StoryObj } from '@storybook/react';
import { ERALane } from './ERALane';

const meta: Meta<typeof ERALane> = {
  title: 'LUMA/ERALane',
  component: ERALane,
};

export default meta;

type Story = StoryObj<typeof ERALane>;

export const Default: Story = {};

export const Advanced: Story = {
  args: {
    steps: [
      {
        id: 'experience',
        label: 'Experience',
        description: 'Felt shift: breath + body-first',
        status: 'done',
      },
      {
        id: 'recognise',
        label: 'Recognise',
        description: 'Name the loop in-flight',
        status: 'active',
      },
      {
        id: 'align',
        label: 'Align',
        description: 'Place the next right move',
        status: 'pending',
      },
    ],
  },
};
