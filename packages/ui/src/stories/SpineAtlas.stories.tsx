import type { Meta, StoryObj } from '@storybook/react';
import { SpineAtlas } from '../components/atlas/SpineAtlas';

const meta = {
  title: 'Tier B: Belief Machines/SpineAtlas',
  component: SpineAtlas,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Framework explorer. Zoom in/out across levels: Pillars → Concepts → Mindblocks. Each node reveals what it changes, how it runs, and what proof looks like.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpineAtlas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndividualPillars: Story = {
  args: {
    level: 'pillars',
    depth: 'thread',
    showRunThis: true,
    lens: 'individual',
    onNodeSelect: (node) => console.log('Node selected:', node),
    onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
  },
};

export const IndividualConcepts: Story = {
  args: {
    level: 'concepts',
    depth: 'thread',
    showRunThis: true,
    lens: 'individual',
    onNodeSelect: (node) => console.log('Node selected:', node),
    onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
  },
};

export const IndividualMindblocks: Story = {
  args: {
    level: 'mindblocks',
    depth: 'journey',
    showRunThis: true,
    lens: 'individual',
    onNodeSelect: (node) => console.log('Node selected:', node),
    onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
  },
};

export const ProfessionalExplorer: Story = {
  args: {
    level: 'pillars',
    depth: 'thread',
    showRunThis: true,
    lens: 'professional',
    onNodeSelect: (node) => console.log('Node selected:', node),
    onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
  },
};

export const OrganisationArchitecture: Story = {
  args: {
    level: 'concepts',
    depth: 'journey',
    showRunThis: true,
    lens: 'organisation',
    onNodeSelect: (node) => console.log('Node selected:', node),
    onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
  },
};

export const GlanceMode: Story = {
  args: {
    level: 'pillars',
    depth: 'glance',
    showRunThis: false,
    lens: 'individual',
    onNodeSelect: (node) => console.log('Node selected:', node),
    onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
  },
};
