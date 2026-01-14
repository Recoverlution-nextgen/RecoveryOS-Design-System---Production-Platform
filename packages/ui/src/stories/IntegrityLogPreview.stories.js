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
};
export default meta;
export const IndividualSummary = {
    args: {
        detail: 'summary',
        filters: [],
        lens: 'individual',
        maxEntries: 10,
        onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
    },
};
export const IndividualExpanded = {
    args: {
        detail: 'expanded',
        filters: [],
        lens: 'individual',
        maxEntries: 10,
        onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
    },
};
export const ProfessionalSummary = {
    args: {
        detail: 'summary',
        filters: [],
        lens: 'professional',
        maxEntries: 10,
        onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
    },
};
export const OrganisationExpanded = {
    args: {
        detail: 'expanded',
        filters: [],
        lens: 'organisation',
        maxEntries: 10,
        onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
    },
};
export const FilteredByEscalation = {
    args: {
        detail: 'summary',
        filters: ['escalation'],
        lens: 'professional',
        maxEntries: 10,
        onExpandEntry: (entryId) => console.log(`Expanded: ${entryId}`),
    },
};
