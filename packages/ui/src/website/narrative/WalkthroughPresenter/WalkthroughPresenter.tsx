import { useState, useEffect, useCallback, useMemo } from 'react';
import { getHeroScene, type SceneId } from '../../../assets/tokens';
import { AmbientField } from '../../primitives/AmbientField/AmbientField';
import './WalkthroughPresenter.css';

export interface WalkthroughPresenterProps {
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  onSceneChange?: (sceneId: SceneId) => void;
  className?: string;
}

export function WalkthroughPresenter({
  autoAdvance = false,
  autoAdvanceDelay = 8000,
  onSceneChange,
  className = ''
}: WalkthroughPresenterProps) {
  const [currentScene, setCurrentScene] = useState<SceneId>('scene-01');
  const [videoLoaded, setVideoLoaded] = useState<Record<SceneId, boolean>>({
    'scene-01': false,
    'scene-02': false,
    'scene-03': false,
    'scene-04': false,
  });
  
  const sceneIds = useMemo<SceneId[]>(() => ['scene-01', 'scene-02', 'scene-03', 'scene-04'], []);
  const currentIndex = sceneIds.indexOf(currentScene);

  // Navigate to specific scene
  const goToScene = useCallback((sceneId: SceneId) => {
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevious();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
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
    if (!autoAdvance) return;

    const timer = setTimeout(() => {
      goToNext();
    }, autoAdvanceDelay);

    return () => clearTimeout(timer);
  }, [autoAdvance, autoAdvanceDelay, currentScene, goToNext]);

  // Lazy load video for current scene
  useEffect(() => {
    if (!videoLoaded[currentScene]) {
      const video = document.getElementById(`scene-video-${currentScene}`) as HTMLVideoElement;
      if (video && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
        setVideoLoaded(prev => ({ ...prev, [currentScene]: true }));
      }
    }
  }, [currentScene, videoLoaded]);

  return (
    <div className={`ro-walkthrough ${className}`}>
      <AmbientField variant="calm" intensity="high" className="ro-walkthrough__ambient" />
      
      {/* Scene Content */}
      {sceneIds.map((sceneId) => {
        const sceneData = getHeroScene(sceneId);
        const isActive = sceneId === currentScene;
        
        return (
          <div
            key={sceneId}
            className={`ro-walkthrough__scene ${isActive ? 'ro-walkthrough__scene--active' : ''}`}
            aria-hidden={!isActive}
          >
            {/* Poster (always loaded for eager display) */}
            <picture className="ro-walkthrough__poster">
              <source srcSet={sceneData.poster.avif} type="image/avif" />
              <source srcSet={sceneData.poster.webp} type="image/webp" />
              <img
                src={sceneData.poster.webp}
                alt=""
                className="ro-walkthrough__poster-img"
                loading={sceneId === 'scene-01' ? 'eager' : 'lazy'}
              />
            </picture>

            {/* Video loop (lazy loaded when scene becomes active) */}
            <video
              id={`scene-video-${sceneId}`}
              className="ro-walkthrough__video"
              data-src={sceneData.loop.webm}
              loop
              muted
              playsInline
              autoPlay={isActive}
              aria-hidden="true"
            >
              <source data-src={sceneData.loop.webm} type="video/webm" />
              <source data-src={sceneData.loop.mp4} type="video/mp4" />
            </video>

            {/* Scene Content */}
            <div className="ro-walkthrough__content">
              <div className="ro-walkthrough__text">
                <h2 className="ro-walkthrough__title">{sceneData.title}</h2>
                <p className="ro-walkthrough__subtitle">{sceneData.subtitle}</p>
              </div>

              <button className="ro-walkthrough__cta">
                {sceneData.cta}
              </button>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      <nav className="ro-walkthrough__nav" aria-label="Scene navigation">
        <button
          className="ro-walkthrough__nav-btn ro-walkthrough__nav-btn--prev"
          onClick={goToPrevious}
          aria-label="Previous scene"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="ro-walkthrough__indicators">
          {sceneIds.map((sceneId, index) => (
            <button
              key={sceneId}
              className={`ro-walkthrough__indicator ${sceneId === currentScene ? 'ro-walkthrough__indicator--active' : ''}`}
              onClick={() => goToScene(sceneId)}
              aria-label={`Go to scene ${index + 1}`}
              aria-current={sceneId === currentScene ? 'true' : 'false'}
            />
          ))}
        </div>

        <button
          className="ro-walkthrough__nav-btn ro-walkthrough__nav-btn--next"
          onClick={goToNext}
          aria-label="Next scene"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </nav>

      {/* Keyboard hint (hidden after first interaction) */}
      <div className="ro-walkthrough__hint" aria-live="polite">
        <span>Use arrow keys or 1-4 to navigate</span>
      </div>
    </div>
  );
}
