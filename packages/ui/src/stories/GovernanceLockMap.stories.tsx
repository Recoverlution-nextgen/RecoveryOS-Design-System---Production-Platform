import type { Meta, StoryObj } from '@storybook/react';
import { GovernanceLockMap } from '../components/trust/GovernanceLockMap';

const meta = {
  title: 'Tier C: Trust Surfaces/GovernanceLockMap',
  component: GovernanceLockMap,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Show stability contract LOCKED/CONTROLLED/EXPANDABLE. Demonstrates "labels evolve, IDs don\'t" principle.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GovernanceLockMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndividualDefault: Story = {
  args: {
    showExamples: true,
    showIdStability: true,
    lens: 'individual',
  },
};

export const IndividualNoExamples: Story = {
  args: {
    showExamples: false,
    showIdStability: true,
    lens: 'individual',
  },
};

export const ProfessionalDefault: Story = {
  args: {
    showExamples: true,
    showIdStability: true,
    lens: 'professional',
  },
};

export const OrganisationFull: Story = {
  args: {
    showExamples: true,
    showIdStability: true,
    lens: 'organisation',
  },
};

export const OrganisationMinimal: Story = {
  args: {
    showExamples: false,
    showIdStability: false,
    lens: 'organisation',
  },
};
