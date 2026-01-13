import type { Meta, StoryObj } from '@storybook/react';
import { IntegrityLogPreview } from '../components/trust/IntegrityLogPreview';

const meta = {
  title: 'Tier C: Trust Surfaces/IntegrityLogPreview',
  component: IntegrityLogPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Make auditable delivery logs readable, not bureaucratic.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IntegrityLogPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndividualSummary: Story = {
  args: {
    detail: 'summary',
    filters: [],
    lens: 'individual',
    maxEntries: 10,
    onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
  },
};

export const IndividualExpanded: Story = {
  args: {
    detail: 'expanded',
    filters: [],
    lens: 'individual',
    maxEntries: 10,
    onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
  },
};

export const ProfessionalSummary: Story = {
  args: {
    detail: 'summary',
    filters: [],
    lens: 'professional',
    maxEntries: 10,
    onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
  },
};

export const OrganisationExpanded: Story = {
  args: {
    detail: 'expanded',
    filters: [],
    lens: 'organisation',
    maxEntries: 10,
    onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
  },
};

export const FilteredByEscalation: Story = {
  args: {
    detail: 'summary',
    filters: ['escalation'],
    lens: 'professional',
    maxEntries: 10,
    onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
  },
};
