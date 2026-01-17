import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export default function OpenAITestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<string>('');

  const runTest = async (testType: 'connection' | 'welcome' | 'list' | 'clear' | 'initialize') => {
    const endpoints = {
      connection: '/audio/test',
      welcome: '/audio/welcome',
      list: '/audio/list',
      clear: '/audio/clear-all',
      initialize: '/audio/initialize'
    };
    
    const buttonTexts = {
      connection: 'Testing OpenAI API connection...',
      welcome: 'Generating welcome audio (this may take 2-3 seconds)...',
      list: 'Listing cached audio files...',
      clear: 'Clearing all cached audio files...',
      initialize: 'Generating ALL Journey audio with OpenAI TTS (this may take 30-60 seconds)...'
    };

    setLoading(buttonTexts[testType]);
    setResult('');

    try {
      const method = testType === 'clear' ? 'DELETE' : testType === 'initialize' ? 'POST' : 'GET';
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a${endpoints[testType]}`,
        {
          method,
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();

      if (data.success || data.url) {
        setResult(`✅ SUCCESS!\n\n${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`❌ FAILED\n\n${JSON.stringify(data, null, 2)}`);
      }
    } catch (error: any) {
      setResult(`❌ ERROR\n\n${error.message}`);
    } finally {
      setLoading('');
    }
  };

  const handleClearWithConfirm = () => {
    if (window.confirm('This will delete ALL cached audio files. They will be regenerated with OpenAI TTS on next playback. Continue?')) {
      runTest('clear');
    }
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '800px',
      margin: '50px auto',
      padding: '20px',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>🎙️ OpenAI TTS Connection Test</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Test if your OpenAI API key is working correctly</p>

        <div style={{
          background: '#e7f3ff',
          border: '1px solid #b3d9ff',
          color: '#004085',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>This test will:</strong><br />
          1. Check if OPENAI_API_KEY is set in Supabase<br />
          2. Make a minimal test request to OpenAI TTS API<br />
          3. Display detailed error messages if something fails
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => runTest('connection')}
            disabled={!!loading}
            style={{
              background: loading ? '#ccc' : '#3E2BB8',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Run Connection Test
          </button>

          <button
            onClick={() => runTest('welcome')}
            disabled={!!loading}
            style={{
              background: loading ? '#ccc' : '#3E2BB8',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Test Welcome Audio Generation
          </button>

          <button
            onClick={() => runTest('list')}
            disabled={!!loading}
            style={{
              background: loading ? '#ccc' : '#0891b2',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            📂 List Cached Audio Files
          </button>

          <button
            onClick={handleClearWithConfirm}
            disabled={!!loading}
            style={{
              background: loading ? '#ccc' : '#dc2626',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            🗑️ Clear All Cached Audio
          </button>

          <button
            onClick={() => {
              if (window.confirm('This will generate ALL 8 Journey audio files (welcome + 7 days) with OpenAI TTS-HD. This takes about 30-60 seconds. Continue?')) {
                runTest('initialize');
              }
            }}
            disabled={!!loading}
            style={{
              background: loading ? '#ccc' : '#16a34a',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600
            }}
          >
            ✨ Generate ALL Journey Audio (OpenAI)
          </button>
        </div>

        {/* Step 5: Single Scene Debug Generation */}
        <div style={{ marginTop: '32px', padding: '24px', background: '#fff3cd', borderRadius: '8px', border: '2px solid #ffc107' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>⚠️ Step 5: Debug Single Scene (day-1)</h2>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Delete day-1.mp3 and regenerate it with verbose logging to see what's happening.
          </p>
          <button
            onClick={async () => {
              try {
                console.log('🗑️ Deleting day-1.mp3...');
                
                // Delete the file
                const deleteResponse = await fetch(
                  `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/audio/clear/day-1`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Authorization': `Bearer ${publicAnonKey}`
                    }
                  }
                );
                
                const deleteResult = await deleteResponse.json();
                console.log('Delete result:', deleteResult);
                
                console.log('🎙️ Generating fresh day-1.mp3 with OpenAI...');
                
                // Wait a moment
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Fetch it (auto-generates)
                const generateResponse = await fetch(
                  `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/audio/day-1`,
                  {
                    headers: {
                      'Authorization': `Bearer ${publicAnonKey}`
                    }
                  }
                );
                
                const generateResult = await generateResponse.json();
                console.log('✅ Generation result:', generateResult);
                
                if (generateResult.url) {
                  console.log('🔊 Playing newly generated day-1...');
                  const audio = new Audio(generateResult.url);
                  audio.play();
                  
                  alert('✅ Generated fresh day-1.mp3! Check console for details. Listen carefully - is it Nova (premium) or robotic?');
                } else {
                  alert('❌ Failed to generate. Check console.');
                }
                
              } catch (error) {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
              }
            }}
            disabled={!!loading}
            style={{
              background: '#ffc107',
              color: '#000',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600
            }}
          >
            🔬 Debug: Regenerate day-1 with Logging
          </button>
        </div>

        {/* Step 6: Direct Audio Test */}
        <div style={{ marginTop: '32px', padding: '24px', background: '#f3f4f6', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Step 6: Direct Audio Playback Test</h2>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Listen directly to what's in the cached files. If you hear robotic voice, the files are corrupted. These should ALL sound like premium Nova voice.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['welcome', 'day-1', 'day-2', 'day-3', 'day-4', 'day-5', 'day-6', 'day-7'].map(sceneKey => (
              <button
                key={sceneKey}
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/audio/${sceneKey}`,
                      {
                        headers: {
                          'Authorization': `Bearer ${publicAnonKey}`
                        }
                      }
                    );
                    
                    if (!response.ok) {
                      alert(`Failed to fetch ${sceneKey}: ${response.status}`);
                      return;
                    }
                    
                    const data = await response.json();
                    
                    if (data.url) {
                      // Play audio directly
                      const audio = new Audio(data.url);
                      audio.play();
                      console.log(`🔊 Playing ${sceneKey} from:`, data.url);
                    } else {
                      alert(`No URL returned for ${sceneKey}`);
                    }
                  } catch (error) {
                    console.error(`Error playing ${sceneKey}:`, error);
                    alert(`Error: ${error.message}`);
                  }
                }}
                style={{
                  background: '#3E2BB8',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  fontSize: '14px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🔊 {sceneKey}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '4px',
            fontFamily: "'Courier New', monospace",
            fontSize: '14px',
            whiteSpace: 'pre-wrap',
            background: '#fff3cd',
            border: '1px solid #ffeeba',
            color: '#856404'
          }}>
            ⏳ {loading}
          </div>
        )}

        {result && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '4px',
            fontFamily: "'Courier New', monospace",
            fontSize: '14px',
            whiteSpace: 'pre-wrap',
            background: result.startsWith('✅') ? '#d4edda' : '#f8d7da',
            border: result.startsWith('✅') ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
            color: result.startsWith('✅') ? '#155724' : '#721c24'
          }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
