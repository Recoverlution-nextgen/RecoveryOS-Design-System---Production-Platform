import type { Meta, StoryObj } from '@storybook/react';
import { Handrail } from './Handrail';

const meta: Meta<typeof Handrail> = {
  title: 'Tier A: Iconic Object/Handrail',
  component: Handrail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Handrail>;

export const Collapsed: Story = {
  args: {
    currentLevel: 'stable',
    lens: 'individual',
    isExpanded: false,
  },
};

export const Expanded: Story = {
  args: {
    currentLevel: 'stable',
    lens: 'individual',
    isExpanded: true,
  },
};

export const StableLevel: Story = {
  args: {
    currentLevel: 'stable',
    lens: 'individual',
    isExpanded: true,
  },
};

export const ConcernedLevel: Story = {
  args: {
    currentLevel: 'concerned',
    lens: 'individual',
    isExpanded: true,
  },
};

export const UrgentLevel: Story = {
  args: {
    currentLevel: 'urgent',
    lens: 'individual',
    isExpanded: true,
  },
};

export const CrisisLevel: Story = {
  args: {
    currentLevel: 'crisis',
    lens: 'individual',
    isExpanded: true,
  },
};

export const ProfessionalLens: Story = {
  args: {
    currentLevel: 'concerned',
    lens: 'professional',
    isExpanded: true,
  },
};

export const OrganisationLens: Story = {
  args: {
    currentLevel: 'urgent',
    lens: 'organisation',
    isExpanded: true,
  },
};

export const Interactive: Story = {
  args: {
    currentLevel: 'stable',
    lens: 'individual',
    isExpanded: true,
    onContactSelect: (contactId) => console.log('Contact selected:', contactId),
    onLevelChange: (level) => console.log('Level changed:', level),
    onToggle: () => console.log('Panel toggled'),
  },
};
