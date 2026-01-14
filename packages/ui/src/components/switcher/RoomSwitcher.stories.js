import { RoomSwitcher } from './RoomSwitcher';
const meta = {
    title: 'Tier B: Belief Machine/RoomSwitcher',
    component: RoomSwitcher,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        currentRoom: 'journeys',
        tempo: 'moment',
        depth: 'glance',
        lens: 'individual',
    },
};
export const NaviCuesActive = {
    args: {
        currentRoom: 'navicues',
        tempo: 'moment',
        depth: 'seed',
        lens: 'individual',
    },
};
export const WeeklyMode = {
    args: {
        currentRoom: 'journeys',
        tempo: 'week',
        depth: 'thread',
        lens: 'individual',
    },
};
export const JourneyDepth = {
    args: {
        currentRoom: 'journeys',
        tempo: 'week',
        depth: 'journey',
        lens: 'individual',
    },
};
export const ProfessionalLens = {
    args: {
        currentRoom: 'navicues',
        tempo: 'moment',
        depth: 'seed',
        lens: 'professional',
    },
};
export const OrganisationLens = {
    args: {
        currentRoom: 'journeys',
        tempo: 'week',
        depth: 'thread',
        lens: 'organisation',
    },
};
export const Interactive = {
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
