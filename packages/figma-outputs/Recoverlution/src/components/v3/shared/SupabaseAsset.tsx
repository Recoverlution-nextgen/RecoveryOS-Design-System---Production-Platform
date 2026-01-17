import { useState, useEffect } from 'react';
import { createClient } from '../../../utils/supabase/client';

const supabase = createClient();

interface SupabaseAssetProps {
  tag: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function SupabaseAsset({ 
  tag, 
  alt, 
  className = '',
  fallback = '/public/favicon.png'
}: SupabaseAssetProps) {
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAsset() {
      try {
        // Try to fetch from media_assets table if it exists
        const { data, error: fetchError } = await supabase
          .from('media_assets')
          .select('path, bucket')
          .contains('tags', [tag])
          .single();

        if (fetchError || !data) {
          // Fallback: try dashboard-assets bucket with tag as filename
          const { data: { publicUrl } } = supabase.storage
            .from('dashboard-assets')
            .getPublicUrl(tag);
          
          setAssetUrl(publicUrl);
          setLoading(false);
          return;
        }

        // Get public URL from storage
        const { data: { publicUrl } } = supabase.storage
          .from(data.bucket)
          .getPublicUrl(data.path);

        setAssetUrl(publicUrl);
        setLoading(false);
      } catch (err) {
        console.error('SupabaseAsset error:', err);
        setError(true);
        setLoading(false);
      }
    }

    fetchAsset();
  }, [tag]);

  if (loading) {
    return (
      <div 
        className={`bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse ${className}`}
        aria-label="Loading image"
      />
    );
  }

  if (error || !assetUrl) {
    return (
      <img 
        src={fallback} 
        alt={alt} 
        className={className}
      />
    );
  }

  return (
    <img 
      src={assetUrl} 
      alt={alt} 
      className={className}
      loading="lazy"
    />
  );
}