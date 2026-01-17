import { useEffect, useState } from 'react';
import { performAssetHealthCheck } from '../utils/assetManifest';
import { getBrokenImages, hasBrokenImages, generateImageAlertReport } from './MonitoredImage';

/**
 * ASSET HEALTH MONITOR
 * 
 * Floating indicator that shows asset health status.
 * Only visible in development or when there are errors.
 * 
 * Shows:
 * - Green dot: All assets loading correctly
 * - Red dot: Broken images detected - CLICK FOR DETAILS
 */

export function AssetHealthMonitor() {
  const [hasErrors, setHasErrors] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    // Run health check on mount
    performAssetHealthCheck();

    // Check for broken images every 2 seconds
    const interval = setInterval(() => {
      const broken = hasBrokenImages();
      const brokenImages = getBrokenImages();
      
      if (broken !== hasErrors) {
        setHasErrors(broken);
        setErrorCount(brokenImages.length);
        
        if (broken) {
          console.error(generateImageAlertReport());
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [hasErrors]);

  // Only show in development OR if there are errors
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname.includes('figma');
  
  if (!isDevelopment && !hasErrors) {
    return null;
  }

  return (
    <>
      {/* Floating Status Indicator */}
      <div
        onClick={() => setShowDetails(!showDetails)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: hasErrors 
            ? 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)'
            : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          transition: 'transform 0.2s ease',
          border: '3px solid white'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title={hasErrors ? `⚠️ ${errorCount} images broken - Click for details` : '✅ All assets OK'}
      >
        <div style={{ 
          fontSize: '24px',
          animation: hasErrors ? 'pulse 2s ease-in-out infinite' : 'none'
        }}>
          {hasErrors ? '⚠️' : '✅'}
        </div>
      </div>

      {/* Error Details Panel */}
      {showDetails && hasErrors && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '400px',
            maxHeight: '500px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '2px solid #DC2626',
            padding: '20px',
            zIndex: 9999,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '2px solid #DC2626'
          }}>
            <h3 style={{ 
              margin: 0, 
              color: '#DC2626',
              fontSize: '16px',
              fontWeight: 700
            }}>
              🚨 Asset Failures Detected
            </h3>
            <button
              onClick={() => setShowDetails(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ 
            background: '#FEE2E2', 
            padding: '12px', 
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <div style={{ color: '#991B1B', fontWeight: 600, marginBottom: '4px' }}>
              {errorCount} {errorCount === 1 ? 'image' : 'images'} failed to load
            </div>
            <div style={{ color: '#7F1D1D', fontSize: '11px' }}>
              This is critical - potential buyers may be seeing broken images
            </div>
          </div>

          <pre style={{ 
            margin: 0, 
            whiteSpace: 'pre-wrap',
            fontSize: '11px',
            lineHeight: '1.5',
            color: '#1F2937'
          }}>
            {generateImageAlertReport()}
          </pre>

          <button
            onClick={() => {
              console.log('📋 Full asset health check:');
              performAssetHealthCheck();
              alert('Check console for full asset health report');
            }}
            style={{
              marginTop: '12px',
              width: '100%',
              padding: '8px',
              background: '#3E2BB8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            Run Full Health Check
          </button>
        </div>
      )}
    </>
  );
}
