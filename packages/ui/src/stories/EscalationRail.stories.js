import { EscalationRail } from '../components/trust/EscalationRail';
const meta = {
    title: 'Tier C: Trust Surfaces/EscalationRail',
    component: EscalationRail,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Show escalation as infrastructure. Clean handoff under drift by protocol.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const IndividualSelfRoute = {
    args: {
        currentLevel: 'self',
        handoffTypes: ['peer', 'clinician', 'crisis'],
        supportGraphEnabled: true,
        consentGate: true,
        lens: 'individual',
        onEscalate: (level) => console.log(`Escalated to: ${level}`),
        onHandoff: (type) => console.log(`Handoff to: ${type}`),
    },
};
export const IndividualTighten = {
    args: {
        currentLevel: 'tighten',
        handoffTypes: ['peer', 'clinician', 'crisis'],
        supportGraphEnabled: true,
        consentGate: true,
        lens: 'individual',
        onEscalate: (level) => console.log(`Escalated to: ${level}`),
        onHandoff: (type) => console.log(`Handoff to: ${type}`),
    },
};
export const IndividualHandoff = {
    args: {
        currentLevel: 'handoff',
        handoffTypes: ['peer', 'clinician', 'crisis'],
        supportGraphEnabled: true,
        consentGate: true,
        lens: 'individual',
        onEscalate: (level) => console.log(`Escalated to: ${level}`),
        onHandoff: (type) => console.log(`Handoff to: ${type}`),
    },
};
export const ProfessionalSwitch = {
    args: {
        currentLevel: 'switch',
        handoffTypes: ['peer', 'clinician', 'crisis'],
        supportGraphEnabled: true,
        consentGate: true,
        lens: 'professional',
        onEscalate: (level) => console.log(`Escalated to: ${level}`),
        onHandoff: (type) => console.log(`Handoff to: ${type}`),
    },
};
export const OrganisationHandoff = {
    args: {
        currentLevel: 'handoff',
        handoffTypes: ['peer', 'clinician', 'crisis'],
        supportGraphEnabled: true,
        consentGate: true,
        lens: 'organisation',
        onEscalate: (level) => console.log(`Escalated to: ${level}`),
        onHandoff: (type) => console.log(`Handoff to: ${type}`),
    },
};
export const NoGraph = {
    args: {
        currentLevel: 'tighten',
        handoffTypes: ['clinician', 'crisis'],
        supportGraphEnabled: false,
        consentGate: true,
        lens: 'professional',
        onEscalate: (level) => console.log(`Escalated to: ${level}`),
        onHandoff: (type) => console.log(`Handoff to: ${type}`),
    },
};
