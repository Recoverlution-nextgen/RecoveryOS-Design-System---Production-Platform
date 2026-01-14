import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RoomSwitcher.css';
const ROOMS = [
    {
        id: 'journeys',
        label: {
            individual: 'My Journeys',
            professional: 'Client Journeys',
            organisation: 'User Journeys',
        },
        description: {
            individual: "Weekly baselines you're building",
            professional: "Journeys you're supervising",
            organisation: 'Journeys across your service',
        },
        available: true,
    },
    {
        id: 'navicues',
        label: {
            individual: 'NaviCues',
            professional: 'NaviCues Library',
            organisation: 'NaviCues Catalog',
        },
        description: {
            individual: 'Quick moves when you need them',
            professional: 'Micro-interventions you can assign',
            organisation: 'Available mini-apps for deployment',
        },
        available: true,
    },
    {
        id: 'toolkit',
        label: {
            individual: 'My Toolkit',
            professional: 'Clinical Toolkit',
            organisation: 'Service Toolkit',
        },
        description: {
            individual: 'Your saved moves and patterns',
            professional: 'Your curated intervention library',
            organisation: 'Approved tools and protocols',
        },
        available: false,
        comingSoon: true,
    },
    {
        id: 'wellbeing',
        label: {
            individual: 'Wellbeing',
            professional: 'Wellbeing Metrics',
            organisation: 'Wellbeing Analytics',
        },
        description: {
            individual: "How you're tracking over time",
            professional: 'Client outcome patterns',
            organisation: 'Service-wide wellbeing data',
        },
        available: false,
        comingSoon: true,
    },
    {
        id: 'state',
        label: {
            individual: 'My State',
            professional: 'Practice State',
            organisation: 'System State',
        },
        description: {
            individual: 'Right now, from the data',
            professional: 'Your practice at a glance',
            organisation: 'System health overview',
        },
        available: false,
        comingSoon: true,
    },
];
const TEMPO_OPTIONS = [
    { value: 'moment', label: 'Moment', description: 'Right now' },
    { value: 'week', label: 'Week', description: 'Building baseline' },
];
const DEPTH_OPTIONS = [
    { value: 'glance', label: 'Glance', icon: '○' },
    { value: 'seed', label: 'Seed', icon: '◐' },
    { value: 'thread', label: 'Thread', icon: '◕' },
    { value: 'journey', label: 'Journey', icon: '●' },
];
export const RoomSwitcher = ({ currentRoom = 'journeys', tempo = 'moment', depth = 'glance', lens = 'individual', onRoomSelect, onTempoChange, onDepthChange, className = '', }) => {
    const [hoveredRoom, setHoveredRoom] = useState(null);
    const [showDepthMenu, setShowDepthMenu] = useState(false);
    const handleRoomClick = (roomId, available) => {
        if (available && onRoomSelect) {
            onRoomSelect(roomId);
        }
    };
    const handleTempoToggle = () => {
        if (onTempoChange) {
            onTempoChange(tempo === 'moment' ? 'week' : 'moment');
        }
    };
    const handleDepthSelect = (newDepth) => {
        if (onDepthChange) {
            onDepthChange(newDepth);
        }
        setShowDepthMenu(false);
    };
    return (_jsxs("div", { className: `room-switcher ${className}`, children: [_jsxs("div", { className: "room-switcher__header", children: [_jsx("h2", { className: "room-switcher__title", children: "Navigate" }), _jsxs("div", { className: "room-switcher__controls", children: [_jsx("div", { className: "room-switcher__tempo", children: _jsxs("button", { className: `tempo-button ${tempo === 'moment' ? 'active' : ''}`, onClick: handleTempoToggle, "aria-label": "Toggle tempo", children: [_jsx("span", { className: "tempo-button__icon", children: tempo === 'moment' ? '⚡' : '📅' }), _jsx("span", { className: "tempo-button__label", children: TEMPO_OPTIONS.find(t => t.value === tempo)?.label })] }) }), _jsxs("div", { className: "room-switcher__depth", children: [_jsxs("button", { className: "depth-button", onClick: () => setShowDepthMenu(!showDepthMenu), "aria-label": "Select depth", children: [_jsx("span", { className: "depth-button__icon", children: DEPTH_OPTIONS.find(d => d.value === depth)?.icon }), _jsx("span", { className: "depth-button__label", children: DEPTH_OPTIONS.find(d => d.value === depth)?.label })] }), _jsx(AnimatePresence, { children: showDepthMenu && (_jsx(motion.div, { className: "depth-menu", initial: { opacity: 0, y: -8, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -8, scale: 0.95 }, transition: { duration: 0.15 }, children: DEPTH_OPTIONS.map(option => (_jsxs("button", { className: `depth-menu__item ${depth === option.value ? 'active' : ''}`, onClick: () => handleDepthSelect(option.value), children: [_jsx("span", { className: "depth-menu__icon", children: option.icon }), _jsx("span", { className: "depth-menu__label", children: option.label })] }, option.value))) })) })] })] })] }), _jsx("div", { className: "room-switcher__grid", children: ROOMS.map(room => {
                    const isActive = currentRoom === room.id;
                    const isHovered = hoveredRoom === room.id;
                    return (_jsxs(motion.button, { className: `room-card ${isActive ? 'active' : ''} ${!room.available ? 'disabled' : ''}`, onClick: () => handleRoomClick(room.id, room.available), onHoverStart: () => setHoveredRoom(room.id), onHoverEnd: () => setHoveredRoom(null), whileHover: room.available ? { scale: 1.02 } : {}, whileTap: room.available ? { scale: 0.98 } : {}, disabled: !room.available, children: [_jsxs("div", { className: "room-card__header", children: [_jsx("h3", { className: "room-card__label", children: room.label[lens] }), room.comingSoon && (_jsx("span", { className: "room-card__badge", children: "Coming Soon" }))] }), _jsx("p", { className: "room-card__description", children: room.description[lens] }), isActive && (_jsx(motion.div, { className: "room-card__indicator", layoutId: "activeRoomIndicator", transition: { duration: 0.3, ease: 'easeInOut' } })), _jsx(AnimatePresence, { children: isHovered && room.available && !isActive && (_jsx(motion.div, { className: "room-card__hover-indicator", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } })) })] }, room.id));
                }) }), _jsx("div", { className: "room-switcher__footer", children: _jsxs("div", { className: "room-switcher__context", children: [_jsx("span", { className: "context-label", children: "Current Context:" }), _jsxs("span", { className: "context-value", children: [ROOMS.find(r => r.id === currentRoom)?.label[lens], " \u00B7 ", tempo === 'moment' ? 'Right now' : 'Weekly baseline', " \u00B7 ", depth] })] }) })] }));
};
