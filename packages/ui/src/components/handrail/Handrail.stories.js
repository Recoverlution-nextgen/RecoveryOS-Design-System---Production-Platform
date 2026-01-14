import { Handrail } from './Handrail';
const meta = {
    title: 'Tier A: Iconic Object/Handrail',
    component: Handrail,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};
export default meta;
export const Collapsed = {
    args: {
        currentLevel: 'stable',
        lens: 'individual',
        isExpanded: false,
    },
};
export const Expanded = {
    args: {
        currentLevel: 'stable',
        lens: 'individual',
        isExpanded: true,
    },
};
export const StableLevel = {
    args: {
        currentLevel: 'stable',
        lens: 'individual',
        isExpanded: true,
    },
};
export const ConcernedLevel = {
    args: {
        currentLevel: 'concerned',
        lens: 'individual',
        isExpanded: true,
    },
};
export const UrgentLevel = {
    args: {
        currentLevel: 'urgent',
        lens: 'individual',
        isExpanded: true,
    },
};
export const CrisisLevel = {
    args: {
        currentLevel: 'crisis',
        lens: 'individual',
        isExpanded: true,
    },
};
export const ProfessionalLens = {
    args: {
        currentLevel: 'concerned',
        lens: 'professional',
        isExpanded: true,
    },
};
export const OrganisationLens = {
    args: {
        currentLevel: 'urgent',
        lens: 'organisation',
        isExpanded: true,
    },
};
export const Interactive = {
    args: {
        currentLevel: 'stable',
        lens: 'individual',
        isExpanded: true,
        onContactSelect: (contactId) => console.log('Contact selected:', contactId),
        onLevelChange: (level) => console.log('Level changed:', level),
        onToggle: () => console.log('Panel toggled'),
    },
};
