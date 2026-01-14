import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getHeroScene } from '../../../assets/tokens';
import { AmbientField } from '../../primitives/AmbientField/AmbientField';
import './WalkthroughPresenter.css';
export function WalkthroughPresenter({ autoAdvance = false, autoAdvanceDelay = 8000, onSceneChange, className = '' }) {
    const [currentScene, setCurrentScene] = useState('scene-01');
    const [videoLoaded, setVideoLoaded] = useState({
        'scene-01': false,
        'scene-02': false,
        'scene-03': false,
        'scene-04': false,
    });
    const sceneIds = useMemo(() => ['scene-01', 'scene-02', 'scene-03', 'scene-04'], []);
    const currentIndex = sceneIds.indexOf(currentScene);
    // Navigate to specific scene
    const goToScene = useCallback((sceneId) => {
        setCurrentScene(sceneId);
        onSceneChange?.(sceneId);
    }, [onSceneChange]);
    // Navigate to next/previous scene
    const goToNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % sceneIds.length;
        goToScene(sceneIds[nextIndex]);
    }, [currentIndex, sceneIds, goToScene]);
    const goToPrevious = useCallback(() => {
        const prevIndex = (currentIndex - 1 + sceneIds.length) % sceneIds.length;
        goToScene(sceneIds[prevIndex]);
    }, [currentIndex, sceneIds, goToScene]);
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                goToNext();
            }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                goToPrevious();
            }
            else if (['1', '2', '3', '4'].includes(e.key)) {
                e.preventDefault();
                const sceneIndex = parseInt(e.key) - 1;
                goToScene(sceneIds[sceneIndex]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrevious, goToScene, sceneIds]);
    // Auto-advance timer
    useEffect(() => {
        if (!autoAdvance)
            return;
        const timer = setTimeout(() => {
            goToNext();
        }, autoAdvanceDelay);
        return () => clearTimeout(timer);
    }, [autoAdvance, autoAdvanceDelay, currentScene, goToNext]);
    // Lazy load video for current scene
    useEffect(() => {
        if (!videoLoaded[currentScene]) {
            const video = document.getElementById(`scene-video-${currentScene}`);
            if (video && video.dataset.src) {
                video.src = video.dataset.src;
                video.load();
                setVideoLoaded(prev => ({ ...prev, [currentScene]: true }));
            }
        }
    }, [currentScene, videoLoaded]);
    return (_jsxs("div", { className: `ro-walkthrough ${className}`, children: [_jsx(AmbientField, { variant: "calm", intensity: "high", className: "ro-walkthrough__ambient" }), sceneIds.map((sceneId) => {
                const sceneData = getHeroScene(sceneId);
                const isActive = sceneId === currentScene;
                return (_jsxs("div", { className: `ro-walkthrough__scene ${isActive ? 'ro-walkthrough__scene--active' : ''}`, "aria-hidden": !isActive, children: [_jsxs("picture", { className: "ro-walkthrough__poster", children: [_jsx("source", { srcSet: sceneData.poster.avif, type: "image/avif" }), _jsx("source", { srcSet: sceneData.poster.webp, type: "image/webp" }), _jsx("img", { src: sceneData.poster.webp, alt: "", className: "ro-walkthrough__poster-img", loading: sceneId === 'scene-01' ? 'eager' : 'lazy' })] }), _jsxs("video", { id: `scene-video-${sceneId}`, className: "ro-walkthrough__video", "data-src": sceneData.loop.webm, loop: true, muted: true, playsInline: true, autoPlay: isActive, "aria-hidden": "true", children: [_jsx("source", { "data-src": sceneData.loop.webm, type: "video/webm" }), _jsx("source", { "data-src": sceneData.loop.mp4, type: "video/mp4" })] }), _jsxs("div", { className: "ro-walkthrough__content", children: [_jsxs("div", { className: "ro-walkthrough__text", children: [_jsx("h2", { className: "ro-walkthrough__title", children: sceneData.title }), _jsx("p", { className: "ro-walkthrough__subtitle", children: sceneData.subtitle })] }), _jsx("button", { className: "ro-walkthrough__cta", children: sceneData.cta })] })] }, sceneId));
            }), _jsxs("nav", { className: "ro-walkthrough__nav", "aria-label": "Scene navigation", children: [_jsx("button", { className: "ro-walkthrough__nav-btn ro-walkthrough__nav-btn--prev", onClick: goToPrevious, "aria-label": "Previous scene", children: _jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M15 18l-6-6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("div", { className: "ro-walkthrough__indicators", children: sceneIds.map((sceneId, index) => (_jsx("button", { className: `ro-walkthrough__indicator ${sceneId === currentScene ? 'ro-walkthrough__indicator--active' : ''}`, onClick: () => goToScene(sceneId), "aria-label": `Go to scene ${index + 1}`, "aria-current": sceneId === currentScene ? 'true' : 'false' }, sceneId))) }), _jsx("button", { className: "ro-walkthrough__nav-btn ro-walkthrough__nav-btn--next", onClick: goToNext, "aria-label": "Next scene", children: _jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] }), _jsx("div", { className: "ro-walkthrough__hint", "aria-live": "polite", children: _jsx("span", { children: "Use arrow keys or 1-4 to navigate" }) })] }));
}
