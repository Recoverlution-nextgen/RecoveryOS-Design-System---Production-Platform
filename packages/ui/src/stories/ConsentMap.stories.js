import { ConsentMap } from '../components/trust/ConsentMap';
const meta = {
    title: 'Tier C: Trust Surfaces/ConsentMap',
    component: ConsentMap,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Calm readable "what system can see/do/ask" panel. Consent by design, not compliance theater.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const IndividualDefault = {
    args: {
        lens: 'individual',
        showDetails: false,
        onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
    },
};
export const IndividualWithDetails = {
    args: {
        lens: 'individual',
        showDetails: true,
        onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
    },
};
export const ProfessionalDefault = {
    args: {
        lens: 'professional',
        showDetails: false,
        onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
    },
};
export const OrganisationDefault = {
    args: {
        lens: 'organisation',
        showDetails: false,
        onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
    },
};
export const OrganisationWithDetails = {
    args: {
        lens: 'organisation',
        showDetails: true,
        onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
    },
};
