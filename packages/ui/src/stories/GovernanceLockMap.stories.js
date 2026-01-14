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
};
export default meta;
export const IndividualDefault = {
    args: {
        showExamples: true,
        showIdStability: true,
        lens: 'individual',
    },
};
export const IndividualNoExamples = {
    args: {
        showExamples: false,
        showIdStability: true,
        lens: 'individual',
    },
};
export const ProfessionalDefault = {
    args: {
        showExamples: true,
        showIdStability: true,
        lens: 'professional',
    },
};
export const OrganisationFull = {
    args: {
        showExamples: true,
        showIdStability: true,
        lens: 'organisation',
    },
};
export const OrganisationMinimal = {
    args: {
        showExamples: false,
        showIdStability: false,
        lens: 'organisation',
    },
};
