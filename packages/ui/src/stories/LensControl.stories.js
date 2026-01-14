import { jsx as _jsx } from "react/jsx-runtime";
import { LensControl } from '../components/lens/LensControl';
import { useState } from 'react';
const meta = {
    title: 'Continuity Layer/LensControl',
    component: LensControl,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['compact', 'comfortable'],
        },
    },
};
export default meta;
/**
 * Interactive lens control with state
 */
export const Interactive = {
    render: (args) => {
        const [lens, setLens] = useState('individual');
        return _jsx(LensControl, { ...args, value: lens, onChange: setLens });
    },
    args: {
        size: 'comfortable',
    },
};
/**
 * Compact size: Mobile-friendly
 */
export const Compact = {
    render: (args) => {
        const [lens, setLens] = useState('professional');
        return _jsx(LensControl, { ...args, value: lens, onChange: setLens });
    },
    args: {
        size: 'compact',
    },
};
/**
 * Individual lens active
 */
export const IndividualActive = {
    render: (args) => {
        const [lens, setLens] = useState('individual');
        return _jsx(LensControl, { ...args, value: lens, onChange: setLens });
    },
    args: {
        size: 'comfortable',
    },
};
/**
 * Professional lens active
 */
export const ProfessionalActive = {
    render: (args) => {
        const [lens, setLens] = useState('professional');
        return _jsx(LensControl, { ...args, value: lens, onChange: setLens });
    },
    args: {
        size: 'comfortable',
    },
};
/**
 * Organisation lens active
 */
export const OrganisationActive = {
    render: (args) => {
        const [lens, setLens] = useState('organisation');
        return _jsx(LensControl, { ...args, value: lens, onChange: setLens });
    },
    args: {
        size: 'comfortable',
    },
};
