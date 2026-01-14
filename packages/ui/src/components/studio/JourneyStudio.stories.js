import { JourneyStudio } from './JourneyStudio';
const meta = {
    title: 'Components/JourneyStudio',
    component: JourneyStudio,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        currentPhase: 'experience',
        lens: 'individual',
    },
};
export const ExperiencePhase = {
    args: {
        currentPhase: 'experience',
        lens: 'individual',
    },
};
export const RecognizePhase = {
    args: {
        currentPhase: 'recognize',
        lens: 'individual',
    },
};
export const AlignPhase = {
    args: {
        currentPhase: 'align',
        lens: 'individual',
    },
};
export const ProfessionalLens = {
    args: {
        currentPhase: 'experience',
        lens: 'professional',
    },
};
export const OrganisationLens = {
    args: {
        currentPhase: 'align',
        lens: 'organisation',
    },
};
export const Interactive = {
    args: {
        currentPhase: 'experience',
        lens: 'individual',
        onPhaseChange: (phase) => console.log('Phase changed:', phase),
        onInstall: (config) => console.log('Journey installed:', config),
    },
};
