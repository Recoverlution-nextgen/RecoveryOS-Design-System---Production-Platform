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
};
export default meta;
export const IndividualPillars = {
    args: {
        level: 'pillars',
        depth: 'thread',
        showRunThis: true,
        lens: 'individual',
        onNodeSelect: (node) => console.log('Node selected:', node),
        onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
    },
};
export const IndividualConcepts = {
    args: {
        level: 'concepts',
        depth: 'thread',
        showRunThis: true,
        lens: 'individual',
        onNodeSelect: (node) => console.log('Node selected:', node),
        onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
    },
};
export const IndividualMindblocks = {
    args: {
        level: 'mindblocks',
        depth: 'journey',
        showRunThis: true,
        lens: 'individual',
        onNodeSelect: (node) => console.log('Node selected:', node),
        onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
    },
};
export const ProfessionalExplorer = {
    args: {
        level: 'pillars',
        depth: 'thread',
        showRunThis: true,
        lens: 'professional',
        onNodeSelect: (node) => console.log('Node selected:', node),
        onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
    },
};
export const OrganisationArchitecture = {
    args: {
        level: 'concepts',
        depth: 'journey',
        showRunThis: true,
        lens: 'organisation',
        onNodeSelect: (node) => console.log('Node selected:', node),
        onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
    },
};
export const GlanceMode = {
    args: {
        level: 'pillars',
        depth: 'glance',
        showRunThis: false,
        lens: 'individual',
        onNodeSelect: (node) => console.log('Node selected:', node),
        onRunMoment: (nodeId) => console.log('Run moment:', nodeId),
    },
};
