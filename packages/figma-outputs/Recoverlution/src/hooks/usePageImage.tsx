import { useState, useEffect } from 'react';
import { lazyPageImages, type PageImageKey } from '../utils/lazyPageImages';

/**
 * Hook to lazy load page images
 * Only loads the image when the component mounts
 */
export function usePageImage(pageName: PageImageKey) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await lazyPageImages[pageName]();
        setImageUrl(imageModule.default);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to load image for ${pageName}:`, error);
        setLoading(false);
      }
    };

    loadImage();
  }, [pageName]);

  return { imageUrl, loading };
}
