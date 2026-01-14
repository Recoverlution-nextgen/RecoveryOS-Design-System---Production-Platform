import { RecoveryOSPortal } from '../components/portal/RecoveryOSPortal';
const meta = {
    title: 'Tier D: Immersive Explorers/RecoveryOSPortal',
    component: RecoveryOSPortal,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Flagship website-within-website immersive explorer. Full-screen cinematic portal with prompt corridor, spine rail, artifact rail, and 5 internal rooms.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const IndividualDefault = {
    args: {
        initialRoom: 'moment',
        spineRailVisible: true,
        artifactRailVisible: true,
        skipEnabled: true,
        lens: 'individual',
        onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
    },
};
export const ProfessionalDefault = {
    args: {
        initialRoom: 'orchestration',
        spineRailVisible: true,
        artifactRailVisible: true,
        skipEnabled: true,
        lens: 'professional',
        onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
    },
};
export const OrganisationDefault = {
    args: {
        initialRoom: 'trust',
        spineRailVisible: true,
        artifactRailVisible: true,
        skipEnabled: true,
        lens: 'organisation',
        onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
    },
};
export const MinimalChrome = {
    args: {
        initialRoom: 'moment',
        spineRailVisible: false,
        artifactRailVisible: false,
        skipEnabled: false,
        lens: 'individual',
        onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
    },
};
export const ExploreRoom = {
    args: {
        initialRoom: 'explore',
        spineRailVisible: true,
        artifactRailVisible: true,
        skipEnabled: true,
        lens: 'professional',
        onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
    },
};
export const WeekRoom = {
    args: {
        initialRoom: 'week',
        spineRailVisible: true,
        artifactRailVisible: true,
        skipEnabled: true,
        lens: 'individual',
        onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
    },
};
