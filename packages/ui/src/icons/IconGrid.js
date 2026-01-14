import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState } from 'react';
import { Icon } from './Icon';
const ALL = [
    // core
    'spine',
    'lens',
    'altitude',
    'trace',
    'receipt',
    // loop
    'sense',
    'route',
    'deliver',
    'seal',
    'review',
    'continuity',
    'orchestrate',
    // trust
    'consentMap',
    'quietHours',
    'escalation',
    'governance',
    'integrityLog',
    // utility
    'play',
    'pause',
    'next',
    'back',
    'close',
    'info',
    'external',
    'chevronDown',
    // pillars
    'pillarER',
    'pillarSR',
    'pillarSC',
    'pillarCR',
    'pillarII',
    'pillarDM',
];
const SIZES = [16, 20, 24, 32];
const TONES = ['ink', 'muted', 'cyan', 'pillar'];
export function IconGrid() {
    const [tone, setTone] = useState('ink');
    const [pulse, setPulse] = useState(false);
    const rows = useMemo(() => ALL, []);
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs("div", { style: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }, children: [_jsx("label", { htmlFor: "tone-select", style: { fontSize: 12, opacity: 0.75 }, children: "Tone" }), _jsx("select", { id: "tone-select", value: tone, onChange: (e) => setTone(e.target.value), children: TONES.map((t) => (_jsx("option", { value: t, children: t }, t))) }), _jsxs("label", { htmlFor: "pulse-checkbox", style: { fontSize: 12, opacity: 0.75, marginLeft: 12 }, children: [_jsx("input", { id: "pulse-checkbox", type: "checkbox", checked: pulse, onChange: (e) => setPulse(e.target.checked) }), _jsx("span", { style: { marginLeft: 6 }, children: "Pulse" })] })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '220px repeat(4, 120px)', gap: 10 }, children: [_jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: "Name" }), SIZES.map((s) => (_jsxs("div", { style: { fontSize: 12, opacity: 0.7 }, children: [s, "px"] }, s))), rows.map((name) => (_jsxs(React.Fragment, { children: [_jsx("div", { style: { fontFamily: 'Inter, system-ui', fontSize: 12, opacity: 0.85 }, children: name }), SIZES.map((size) => (_jsx("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    height: 44,
                                    borderRadius: 12,
                                    border: '1px solid rgba(233,231,255,0.12)',
                                    paddingLeft: 12,
                                    background: 'rgba(21,20,42,0.35)',
                                }, children: _jsx(Icon, { name: name, size: size, tone: tone, pulse: pulse && name === 'seal' }) }, `${name}-${size}`)))] }, name)))] })] }));
}
