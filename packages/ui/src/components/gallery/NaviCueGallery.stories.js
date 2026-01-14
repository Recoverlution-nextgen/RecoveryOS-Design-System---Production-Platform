import { NaviCueGallery } from './NaviCueGallery';
const meta = {
    title: 'Components/NaviCueGallery',
    component: NaviCueGallery,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        selectedCategory: 'all',
        lens: 'individual',
    },
};
export const IndividualLens = {
    args: {
        selectedCategory: 'all',
        lens: 'individual',
    },
};
export const ProfessionalLens = {
    args: {
        selectedCategory: 'all',
        lens: 'professional',
    },
};
export const OrganisationLens = {
    args: {
        selectedCategory: 'all',
        lens: 'organisation',
    },
};
export const GroundingCategory = {
    args: {
        selectedCategory: 'grounding',
        lens: 'individual',
    },
};
export const ReflectionCategory = {
    args: {
        selectedCategory: 'reflection',
        lens: 'individual',
    },
};
export const ConnectionCategory = {
    args: {
        selectedCategory: 'connection',
        lens: 'individual',
    },
};
export const Interactive = {
    args: {
        selectedCategory: 'all',
        lens: 'individual',
        onLaunch: (cueId) => console.log('Launching NaviCue:', cueId),
        onCategoryChange: (category) => console.log('Category changed:', category),
    },
};
