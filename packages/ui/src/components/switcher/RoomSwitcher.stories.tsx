import type { Meta, StoryObj } from '@storybook/react';
import { RoomSwitcher } from './RoomSwitcher';

const meta: Meta<typeof RoomSwitcher> = {
  title: 'Tier B: Belief Machine/RoomSwitcher',
  component: RoomSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RoomSwitcher>;

export const Default: Story = {
  args: {
    currentRoom: 'journeys',
    tempo: 'moment',
    depth: 'glance',
    lens: 'individual',
  },
};

export const NaviCuesActive: Story = {
  args: {
    currentRoom: 'navicues',
    tempo: 'moment',
    depth: 'seed',
    lens: 'individual',
  },
};

export const WeeklyMode: Story = {
  args: {
    currentRoom: 'journeys',
    tempo: 'week',
    depth: 'thread',
    lens: 'individual',
  },
};

export const JourneyDepth: Story = {
  args: {
    currentRoom: 'journeys',
    tempo: 'week',
    depth: 'journey',
    lens: 'individual',
  },
};

export const ProfessionalLens: Story = {
  args: {
    currentRoom: 'navicues',
    tempo: 'moment',
    depth: 'seed',
    lens: 'professional',
  },
};

export const OrganisationLens: Story = {
  args: {
    currentRoom: 'journeys',
    tempo: 'week',
    depth: 'thread',
    lens: 'organisation',
  },
};

export const Interactive: Story = {
  args: {
    currentRoom: 'journeys',
    tempo: 'moment',
    depth: 'glance',
    lens: 'individual',
    onRoomSelect: (roomId) => console.log('Room selected:', roomId),
    onTempoChange: (tempo) => console.log('Tempo changed:', tempo),
    onDepthChange: (depth) => console.log('Depth changed:', depth),
  },
};
