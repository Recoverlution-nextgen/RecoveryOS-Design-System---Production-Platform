import { ConductorView } from '../components/conductor/ConductorView';
const meta = {
    title: 'Tier B: Belief Machines/ConductorView',
    component: ConductorView,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Show "feed with spine" — orchestration without AI hype. Demonstrates why this move, right now, by governed routing.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const IndividualRouting = {
    args: {
        signals: ['energy', 'clarity'],
        inputsVisible: 'minimal',
        whyDrawer: false,
        governanceOverlay: false,
        lens: 'individual',
        state: 'routing',
        routedMove: {
            target: 'Settle the wave',
            mechanism: 'Breathing with rhythm',
            primitive: 'Breathwork',
            dose: '10s',
        },
    },
};
export const IndividualWithWhy = {
    args: {
        signals: ['energy', 'anchorage'],
        inputsVisible: 'minimal',
        whyDrawer: true,
        governanceOverlay: false,
        lens: 'individual',
        state: 'routing',
        routedMove: {
            target: 'Find your footing',
            mechanism: 'Grounding practice',
            primitive: 'Breathwork',
            dose: '10s',
        },
    },
};
export const ProfessionalFull = {
    args: {
        signals: ['energy', 'clarity', 'anchorage'],
        inputsVisible: 'expanded',
        whyDrawer: true,
        governanceOverlay: true,
        lens: 'professional',
        state: 'routing',
        routedMove: {
            target: 'Arousal regulation',
            mechanism: 'Parasympathetic activation',
            primitive: 'Box breathing protocol',
            dose: '10s',
        },
        governance: {
            consentBoundaries: ['Breathwork', 'Reflection', 'Movement'],
            quietHours: false,
            escalationReady: true,
        },
    },
};
export const ProfessionalConnection = {
    args: {
        signals: ['connection', 'clarity'],
        inputsVisible: 'minimal',
        whyDrawer: false,
        governanceOverlay: true,
        lens: 'professional',
        state: 'routing',
        routedMove: {
            target: 'Social engagement',
            mechanism: 'Relational repair',
            primitive: 'Structured reflection',
            dose: '30s',
        },
        governance: {
            consentBoundaries: ['Reflection', 'Journaling'],
            quietHours: false,
            escalationReady: true,
        },
    },
};
export const OrganisationAudit = {
    args: {
        signals: ['energy', 'clarity'],
        inputsVisible: 'minimal',
        whyDrawer: true,
        governanceOverlay: true,
        lens: 'organisation',
        state: 'routing',
        routedMove: {
            target: 'AROUSAL_REGULATION',
            mechanism: 'PARASYMPATHETIC_ACTIVATION',
            primitive: 'BREATH_4X4_PROTOCOL',
            dose: '10s',
        },
        governance: {
            consentBoundaries: ['BREATHWORK', 'REFLECTION', 'MOVEMENT'],
            quietHours: false,
            escalationReady: true,
        },
    },
};
export const OrganisationQuietHours = {
    args: {
        signals: ['anchorage'],
        inputsVisible: 'minimal',
        whyDrawer: false,
        governanceOverlay: true,
        lens: 'organisation',
        state: 'routing',
        routedMove: {
            target: 'BASELINE_MAINTENANCE',
            mechanism: 'CONTINUOUS_MONITORING',
            primitive: 'GUIDED_REFLECTION',
            dose: '2m',
        },
        governance: {
            consentBoundaries: ['REFLECTION', 'BREATHWORK'],
            quietHours: true,
            escalationReady: true,
        },
    },
};
export const ListeningState = {
    args: {
        signals: ['energy'],
        inputsVisible: 'minimal',
        whyDrawer: false,
        governanceOverlay: false,
        lens: 'individual',
        state: 'listening',
        routedMove: {
            target: 'Detecting signals...',
            mechanism: 'Pattern recognition',
            primitive: 'Pending',
            dose: '—',
        },
    },
};
export const DeliveryState = {
    args: {
        signals: ['clarity', 'connection'],
        inputsVisible: 'minimal',
        whyDrawer: false,
        governanceOverlay: false,
        lens: 'professional',
        state: 'delivering',
        routedMove: {
            target: 'Decision clarity',
            mechanism: 'Prefrontal engagement',
            primitive: 'Structured reflection',
            dose: '30s',
        },
    },
};
