/**
 * Journey Audio Narration API
 * 
 * Endpoints:
 * - POST /generate - Generate audio using OpenAI TTS
 * - GET /:sceneKey - Get signed URL for pre-generated audio
 */

import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const app = new Hono();

const BUCKET_NAME = 'make-49b28b8a-journey-narration';

/**
 * GET /test
 * Diagnostic endpoint to test OpenAI API key
 */
app.get('/test', async (c) => {
  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      return c.json({ 
        success: false,
        error: 'OPENAI_API_KEY environment variable not set',
        hint: 'Add the key in Supabase Dashboard → Edge Functions → Environment Variables'
      }, 500);
    }
    
    // Test with minimal audio generation
    console.log('🧪 Testing OpenAI API connection...');
    console.log(`   Key format: ${openaiApiKey.substring(0, 10)}...`);
    
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'nova',
        input: 'Test.',
        speed: 1.0,
        response_format: 'mp3'
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API error:', errorText);
      
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = { rawError: errorText };
      }
      
      return c.json({
        success: false,
        error: 'OpenAI API request failed',
        status: response.status,
        details: errorDetails,
        hint: response.status === 401 
          ? 'Invalid API key - check that the key is correct and active'
          : response.status === 429
          ? 'Rate limit exceeded or insufficient credits'
          : 'Check OpenAI API status and your account'
      }, response.status);
    }
    
    const audioData = await response.arrayBuffer();
    console.log(`✅ OpenAI API test successful! Generated ${audioData.byteLength} bytes`);
    
    return c.json({
      success: true,
      message: 'OpenAI API connection working',
      testAudioSize: audioData.byteLength,
      keyPrefix: openaiApiKey.substring(0, 10) + '...'
    });
    
  } catch (error) {
    console.error('❌ Test error:', error);
    return c.json({
      success: false,
      error: 'Test failed',
      details: error.message
    }, 500);
  }
});

/**
 * GET /list
 * List all cached audio files (diagnostic)
 */
app.get('/list', async (c) => {
  try {
    await ensureBucketExists();
    
    const supabase = getSupabaseClient();
    
    const { data: files, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list();
    
    if (error) {
      return c.json({ 
        success: false,
        error: 'Failed to list files',
        details: error.message 
      }, 500);
    }
    
    return c.json({ 
      success: true,
      bucket: BUCKET_NAME,
      fileCount: files?.length || 0,
      files: files?.map(f => ({
        name: f.name,
        size: f.metadata?.size,
        created: f.created_at,
        updated: f.updated_at
      })) || []
    });
    
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to list files',
      details: error.message
    }, 500);
  }
});

/**
 * DELETE /clear/:sceneKey
 * Delete cached audio for a specific scene to force regeneration
 */
app.delete('/clear/:sceneKey', async (c) => {
  try {
    const sceneKey = c.req.param('sceneKey');
    
    await ensureBucketExists();
    
    const supabase = getSupabaseClient();
    const fileName = `${sceneKey}.mp3`;
    
    console.log(`🗑️ Deleting cached audio: ${fileName}`);
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);
    
    if (error) {
      console.error(`Failed to delete ${fileName}:`, error);
      return c.json({ 
        success: false,
        error: 'Failed to delete audio file',
        details: error.message 
      }, 500);
    }
    
    console.log(`✅ Deleted ${fileName} - will regenerate on next request`);
    
    return c.json({ 
      success: true,
      message: `Cleared audio for ${sceneKey}`,
      sceneKey,
      nextAction: 'Audio will be regenerated with OpenAI TTS on next playback'
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    return c.json({
      success: false,
      error: 'Failed to delete audio',
      details: error.message
    }, 500);
  }
});

/**
 * DELETE /clear-all
 * Delete ALL cached audio files to force complete regeneration
 */
app.delete('/clear-all', async (c) => {
  try {
    await ensureBucketExists();
    
    const supabase = getSupabaseClient();
    
    console.log(`🗑️ Deleting ALL cached audio files...`);
    
    // List all files
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list();
    
    if (listError) {
      console.error('Failed to list files:', listError);
      return c.json({ 
        success: false,
        error: 'Failed to list audio files',
        details: listError.message 
      }, 500);
    }
    
    if (!files || files.length === 0) {
      return c.json({ 
        success: true,
        message: 'No cached audio files to delete',
        deletedCount: 0
      });
    }
    
    // Delete all files
    const fileNames = files.map(f => f.name);
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(fileNames);
    
    if (deleteError) {
      console.error('Failed to delete files:', deleteError);
      return c.json({ 
        success: false,
        error: 'Failed to delete audio files',
        details: deleteError.message 
      }, 500);
    }
    
    console.log(`✅ Deleted ${fileNames.length} audio files`);
    console.log(`   Files: ${fileNames.join(', ')}`);
    
    return c.json({ 
      success: true,
      message: `Cleared all cached audio`,
      deletedCount: fileNames.length,
      deletedFiles: fileNames,
      nextAction: 'All audio will be regenerated with OpenAI TTS on next playback'
    });
    
  } catch (error) {
    console.error('Delete all error:', error);
    return c.json({
      success: false,
      error: 'Failed to delete all audio',
      details: error.message
    }, 500);
  }
});

// Initialize Supabase client
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// Ensure bucket exists
const ensureBucketExists = async () => {
  const supabase = getSupabaseClient();
  
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
  
  if (!bucketExists) {
    console.log(`Creating Journey narration bucket: ${BUCKET_NAME}`);
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: false,
      fileSizeLimit: 10485760 // 10MB max per file
    });
    
    if (error && !error.message.includes('already exists')) {
      console.error('Failed to create bucket:', error);
      throw error;
    }
  }
};

/**
 * POST /generate
 * Generate audio using OpenAI TTS and store in Supabase Storage
 * 
 * Body:
 * {
 *   sceneKey: string (e.g., "welcome", "day-1-experience")
 *   text: string (the narrative text)
 *   voice?: string (default: "nova")
 *   speed?: number (default: 0.95)
 * }
 */
app.post('/generate', async (c) => {
  try {
    const { sceneKey, text, voice = 'nova', speed = 0.95 } = await c.req.json();
    
    if (!sceneKey || !text) {
      return c.json({ error: 'Missing required fields: sceneKey, text' }, 400);
    }
    
    // Get OpenAI API key
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      return c.json({ error: 'OPENAI_API_KEY not configured' }, 500);
    }
    
    console.log(`🎙️ Generating audio for scene: ${sceneKey}`);
    console.log(`   Voice: ${voice}, Speed: ${speed}`);
    console.log(`   Text length: ${text.length} characters`);
    
    // Generate audio via OpenAI TTS
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1-hd', // Higher quality
        voice: voice,
        input: text,
        speed: speed,
        response_format: 'mp3'
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI TTS error:', error);
      return c.json({ error: 'Failed to generate audio', details: error }, response.status);
    }
    
    // Get audio buffer
    const audioBuffer = await response.arrayBuffer();
    const audioBytes = new Uint8Array(audioBuffer);
    
    console.log(`✅ Audio generated: ${audioBytes.length} bytes`);
    
    // Ensure bucket exists
    await ensureBucketExists();
    
    // Upload to Supabase Storage
    const supabase = getSupabaseClient();
    const fileName = `${sceneKey}.mp3`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, audioBytes, {
        contentType: 'audio/mpeg',
        upsert: true // Replace if exists
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ error: 'Failed to upload audio', details: uploadError.message }, 500);
    }
    
    console.log(`✅ Audio uploaded to storage: ${fileName}`);
    
    // Generate signed URL (valid for 1 year)
    const { data: urlData, error: urlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, 31536000); // 1 year
    
    if (urlError) {
      console.error('URL generation error:', urlError);
      return c.json({ error: 'Failed to generate URL', details: urlError.message }, 500);
    }
    
    return c.json({
      success: true,
      sceneKey,
      url: urlData.signedUrl,
      size: audioBytes.length,
      message: 'Audio generated and stored successfully'
    });
    
  } catch (error) {
    console.error('Audio generation error:', error);
    return c.json({
      error: 'Failed to generate audio',
      details: error.message
    }, 500);
  }
});

/**
 * GET /:sceneKey
 * Get signed URL for pre-generated audio
 * AUTO-GENERATES on first request if missing (lazy loading)
 */
app.get('/:sceneKey', async (c) => {
  try {
    const sceneKey = c.req.param('sceneKey');
    
    await ensureBucketExists();
    
    const supabase = getSupabaseClient();
    const fileName = `${sceneKey}.mp3`;
    
    // Check if file exists
    const { data: fileData, error: fileError } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        search: fileName
      });
    
    // FILE MISSING: Auto-generate it (lazy loading)
    if (fileError || !fileData || fileData.length === 0) {
      console.log(`🔄 Audio not found for ${sceneKey}, auto-generating...`);
      
      // Get narrative text from scene library
      const sceneText = getSceneNarrative(sceneKey);
      
      // Context scenes use dynamic TTS - return graceful response
      if (sceneKey.includes('-context')) {
        return c.json({ 
          success: false,
          useTTS: true,
          sceneKey,
          message: 'Context scenes use dynamic text-to-speech narration'
        }, 200); // 200 status, not 404
      }
      
      if (!sceneText) {
        return c.json({ 
          error: 'Audio file not found and scene not recognized', 
          sceneKey,
          availableScenes: ['welcome', 'day-1', 'day-2', 'day-3', 'day-4', 'day-5', 'day-6', 'day-7']
        }, 404);
      }
      
      // Auto-generate the audio
      try {
        const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
        if (!openaiApiKey) {
          console.error('❌ OPENAI_API_KEY not configured - cannot auto-generate audio');
          return c.json({ 
            error: 'Audio not found and OpenAI API key not configured',
            sceneKey,
            fallback: 'Using Web Speech API instead'
          }, 503);
        }
        
        console.log(`   Generating audio via OpenAI TTS...`);
        console.log(`   Model: tts-1-hd`);
        console.log(`   Voice: nova`);
        console.log(`   Speed: 0.95`);
        console.log(`   Text: "${sceneText.substring(0, 50)}..."`);
        console.log(`   Text length: ${sceneText.length} characters`);
        
        // Generate audio via OpenAI TTS
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'tts-1-hd',
            voice: 'nova',
            input: sceneText,
            speed: 0.95,
            response_format: 'mp3' // Explicitly request MP3 format
          })
        });
        
        if (!response.ok) {
          const error = await response.text();
          console.error('OpenAI TTS error:', error);
          throw new Error(`OpenAI TTS failed: ${error}`);
        }
        
        // Get audio buffer
        const audioBuffer = await response.arrayBuffer();
        const audioBytes = new Uint8Array(audioBuffer);
        
        console.log(`   📦 Received ${audioBytes.length} bytes from OpenAI`);
        console.log(`   📦 Size: ${(audioBytes.length / 1024).toFixed(1)}KB`);
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, audioBytes, {
            contentType: 'audio/mpeg',
            upsert: true
          });
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Upload failed: ${uploadError.message}`);
        }
        
        console.log(`   ✅ Auto-generated and uploaded ${sceneKey} successfully!`);
        
      } catch (genError) {
        console.error(`❌ Auto-generation failed for ${sceneKey}:`, genError);
        return c.json({ 
          error: 'Failed to auto-generate audio',
          sceneKey,
          details: genError.message,
          fallback: 'Using Web Speech API instead'
        }, 503);
      }
    }
    
    // Generate signed URL (valid for 1 hour)
    const { data: urlData, error: urlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, 3600);
    
    if (urlError) {
      console.error('URL generation error:', urlError);
      return c.json({ error: 'Failed to generate URL', details: urlError.message }, 500);
    }
    
    return c.json({
      success: true,
      sceneKey,
      url: urlData.signedUrl
    });
    
  } catch (error) {
    console.error('Audio retrieval error:', error);
    return c.json({
      error: 'Failed to retrieve audio',
      details: error.message
    }, 500);
  }
});

/**
 * POST /batch-generate
 * Generate all Journey audio files in one batch
 */
app.post('/batch-generate', async (c) => {
  try {
    const { scenes, voice = 'nova', speed = 0.95 } = await c.req.json();
    
    if (!scenes || !Array.isArray(scenes)) {
      return c.json({ error: 'Missing required field: scenes (array)' }, 400);
    }
    
    console.log(`🎙️ Batch generating ${scenes.length} audio files...`);
    
    const results = [];
    let totalCharacters = 0;
    
    for (const scene of scenes) {
      const { sceneKey, text } = scene;
      
      if (!sceneKey || !text) {
        console.warn(`Skipping invalid scene:`, scene);
        continue;
      }
      
      totalCharacters += text.length;
      
      // Call the generate endpoint for each scene
      const generateResponse = await fetch(
        `${c.req.url.replace('/batch-generate', '/generate')}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sceneKey, text, voice, speed })
        }
      );
      
      const result = await generateResponse.json();
      results.push(result);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    const estimatedCost = (totalCharacters / 1000000) * 15; // $15 per million chars
    
    console.log(`✅ Batch generation complete!`);
    console.log(`   Total characters: ${totalCharacters}`);
    console.log(`   Estimated cost: $${estimatedCost.toFixed(4)}`);
    
    return c.json({
      success: true,
      totalScenes: scenes.length,
      totalCharacters,
      estimatedCost: `$${estimatedCost.toFixed(4)}`,
      results
    });
    
  } catch (error) {
    console.error('Batch generation error:', error);
    return c.json({
      error: 'Failed to batch generate audio',
      details: error.message
    }, 500);
  }
});

/**
 * POST /initialize
 * Pre-generate ALL Journey audio files at once (one-time setup)
 * Call this once to populate the audio library
 */
app.post('/initialize', async (c) => {
  try {
    console.log('🚀 Initializing Journey audio library...');
    
    const sceneKeys = ['welcome', 'day-1', 'day-2', 'day-3', 'day-4', 'day-5', 'day-6', 'day-7'];
    const results = [];
    let totalCharacters = 0;
    let successCount = 0;
    let skipCount = 0;
    
    await ensureBucketExists();
    const supabase = getSupabaseClient();
    
    for (const sceneKey of sceneKeys) {
      const fileName = `${sceneKey}.mp3`;
      
      // Check if already exists
      const { data: fileData } = await supabase.storage
        .from(BUCKET_NAME)
        .list('', { search: fileName });
      
      if (fileData && fileData.length > 0) {
        console.log(`   ⏭️  ${sceneKey} already exists, skipping`);
        skipCount++;
        results.push({ sceneKey, status: 'skipped', message: 'Already exists' });
        continue;
      }
      
      // Generate new audio
      const sceneText = getSceneNarrative(sceneKey);
      if (!sceneText) {
        console.warn(`   ⚠️  No narrative found for ${sceneKey}`);
        results.push({ sceneKey, status: 'error', message: 'No narrative text' });
        continue;
      }
      
      totalCharacters += sceneText.length;
      
      console.log(`   🎙️  Generating ${sceneKey}...`);
      
      try {
        const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
        if (!openaiApiKey) {
          throw new Error('OPENAI_API_KEY not configured');
        }
        
        // Generate via OpenAI TTS
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'tts-1-hd',
            voice: 'nova',
            input: sceneText,
            speed: 0.95,
            response_format: 'mp3'
          })
        });
        
        if (!response.ok) {
          const error = await response.text();
          throw new Error(`OpenAI TTS failed: ${error}`);
        }
        
        const audioBuffer = await response.arrayBuffer();
        const audioBytes = new Uint8Array(audioBuffer);
        
        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, audioBytes, {
            contentType: 'audio/mpeg',
            upsert: true
          });
        
        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }
        
        console.log(`      ✅ Success (${(audioBytes.length / 1024).toFixed(1)}KB)`);
        successCount++;
        results.push({ 
          sceneKey, 
          status: 'generated', 
          size: audioBytes.length,
          sizeKB: `${(audioBytes.length / 1024).toFixed(1)}KB`
        });
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 800));
        
      } catch (error) {
        console.error(`      ❌ Failed: ${error.message}`);
        results.push({ sceneKey, status: 'error', message: error.message });
      }
    }
    
    const estimatedCost = (totalCharacters / 1000000) * 15;
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ AUDIO LIBRARY INITIALIZED');
    console.log('='.repeat(60));
    console.log(`   Generated: ${successCount}/${sceneKeys.length}`);
    console.log(`   Skipped: ${skipCount}/${sceneKeys.length}`);
    console.log(`   Total characters: ${totalCharacters.toLocaleString()}`);
    console.log(`   Estimated cost: $${estimatedCost.toFixed(4)}`);
    console.log('='.repeat(60));
    
    return c.json({
      success: true,
      message: 'Audio library initialized',
      summary: {
        total: sceneKeys.length,
        generated: successCount,
        skipped: skipCount,
        totalCharacters,
        estimatedCost: `$${estimatedCost.toFixed(4)}`
      },
      results
    });
    
  } catch (error) {
    console.error('Initialization error:', error);
    return c.json({
      error: 'Failed to initialize audio library',
      details: error.message
    }, 500);
  }
});

/**
 * Helper: Get narrative text for a scene
 */
function getSceneNarrative(sceneKey: string): string | null {
  // 13-SCENE UNIVERSAL ARCHITECTURE - REFINED NARRATIVE
  const narratives: Record<string, string> = {
    // SCENE 1: Introduction
    'intro-1': 'This week belongs to one tool. Not complicated. Not new. But when it becomes yours, everything shifts. You are going to learn to buy yourself 2 seconds. Two seconds between feeling and acting. Two seconds between the pull and the choice. Two seconds where freedom lives. Right now, those 2 seconds might not exist. The urge arrives. The action follows. Automatic. Instant. Familiar. But this week, you are going to create space where there was none. By the time you leave here, those 2 seconds will be yours. Not borrowed. Not imagined. Yours.',
    
    // SCENE 2: Experience Teaching
    'teaching-2': 'Every urge starts in your body before it reaches your mind. The pull to use. The impulse to run. The need to numb. They do not arrive as thoughts. They arrive as sensations. A tightness. A heat. A hollow ache. Before you can change your relationship with craving, you have to know where it lives. Close your eyes if that feels safe. Take three slow breaths. Now think of something small you want right now. To check your phone. To shift in your seat. To stop reading. Where do you feel it? Your chest? Your throat? Your hands? Stay with it. Ten seconds. Do not act. Just notice. What happens when you watch instead of move? Now notice your breath. Pause it. Hold for two seconds. Feel the pressure build. That pull. That urgency. Now release. Breathe. That building, that holding, that release, this is the shape of every urge. It rises. It peaks. And if you do not feed it, it falls.',
    
    // SCENE 3: Experience Cue
    'cue-3': 'As you go about your day, feel for the window. The space between wanting and acting. You are not trying to stop anything. Not trying to fix anything. Just notice when it opens. Your only work today: see the window.',
    
    // SCENE 4: Experience Reflection (interactive - no audio needed)
    'reflection-4': null,
    
    // SCENE 5: Bridge E→R
    'bridge-5': 'You have been feeling for the window. The space between urge and action. You know its shape now. You know where it lives in your body. But here is the question: What is driving it? Urges do not appear randomly. They have roots. Patterns. Foundations. Old wiring. Ancient stories about who you are and what you need. This week, you go deeper. You stop asking "What do I feel?" and start asking "Where does this come from?" The window is still there. You still buy your 2 seconds. But now, inside those 2 seconds, you begin to see the source. Not to judge it. Not to fight it. To name it. And in naming it, to separate from it.',
    
    // SCENE 6: Recognize Teaching
    'teaching-6': 'When you name something, you create distance. You are no longer the urge. You are the one watching the urge. Two seconds is long enough for your prefrontal cortex to wake up. Long enough for choice to become possible. Long enough to ask: what is this, really? Today, when an urge arrives, name it. Out loud or in your mind: "I am feeling the urge to _____." Just name it. Watch what happens. Does it shift? Does it shrink? Does it loosen its grip? Naming is not about making it disappear. Naming is about remembering: you are not it. Now try this. Three times today, pause for two full seconds before responding to someone. A question. A frustration. An invitation. Stop. Breathe. Two seconds. Then respond however you want. You are not trying to change what you say. You are trying to feel what it is like to have space before you speak.',
    
    // SCENE 7: Recognize Cue
    'cue-7': 'As you buy your 2 seconds, look for the source. What thought is underneath? What belief? What old story is running? Your work today: name the source.',
    
    // SCENE 8: Recognize Reflection (interactive - no audio needed)
    'reflection-8': null,
    
    // SCENE 9: Bridge R→A
    'bridge-9': 'You have felt the urge. You have named it. You have traced it back to its source. Now comes the hardest part. The most powerful part. What do you do with it? Knowing is not enough. Feeling is not enough. Recovery is not about understanding your impulses. It is about choosing something different. This is where you stop reacting and start claiming. Where you stop being pulled by old patterns and start moving toward who you are becoming. This is not about willpower. This is about alignment. Your 2 seconds are no longer just a pause. They are a doorway. And the question you ask inside that doorway is this: Does this action align with who I am becoming?',
    
    // SCENE 10: Align Teaching
    'teaching-10': 'You have been practicing the pause. You know how to feel the window. You know how to name the source. Now you add one question. Not from your head. From your gut. Does this action align with who I am becoming? Let the answer rise from your body. Your gut knows. It always knows. Today, before you act, pause. Buy your 2 seconds. Ask the question: Does this align with who I am becoming? Feel the answer. Then choose. Not perfectly. Not painlessly. But consciously. Notice what it feels like to choose from this place. Not from craving. Not from fear. From alignment. Now try this. Three times today, when you pause before acting, place your hand on your heart. Say this, out loud or silently: I chose this. This is my power. Feel what it is like to witness your own agency. To see yourself choosing. You are not just changing behavior. You are rewiring your brain.',
    
    // SCENE 11: Align Cue
    'cue-11': 'Use your 2 seconds to choose. When you pause, ask: does this align with who I am becoming? Feel the answer. Then move. Your work today: choose from alignment.',
    
    // SCENE 12: Align Reflection (interactive - no audio needed)
    'reflection-12': null,
    
    // SCENE 13: Completion
    'completion-13': 'Take a moment. Look back at this week. You came here to build one tool. And you did. You learned to feel the window between urge and action. You learned to name the source. You learned to choose from alignment. You bought yourself 2 seconds. And inside those 2 seconds, you found space. Choice. Power. This is not the end. This is just the beginning. The window will always be there. Some days you will see it clearly. Some days it will be harder to find. But now you know it exists. And that changes everything. You do not need to have it all figured out. You just need to know this: The space between urge and action belongs to you.',
    
    // SCENE 13: Integration (alias)
    'integration-13': 'Take a moment. Look back at this week. You came here to build one tool. And you did. You learned to feel the window between urge and action. You learned to name the source. You learned to choose from alignment. You bought yourself 2 seconds. And inside those 2 seconds, you found space. Choice. Power. This is not the end. This is just the beginning. The window will always be there. Some days you will see it clearly. Some days it will be harder to find. But now you know it exists. And that changes everything. You do not need to have it all figured out. You just need to know this: The space between urge and action belongs to you.',
    
    // LEGACY 7-DAY (keep for backwards compatibility during transition)
    'welcome': 'This is Journey. Not a course. Not a program. A process. Each week you will move through a lived arc. Experience. Recognition. Alignment. The body must feel it before the mind can name it. This is where real change lives. When you are ready, we begin.',
    'day-1': 'If you are comfortable, close your eyes. Take three breaths. Now think of something small you want right now. Maybe to check your phone. Maybe to shift in your seat. Maybe to stop reading. Where do you feel that want? Your chest? Your hands? Your jaw? See if you can stay with it for ten seconds without acting. What happens when you just watch it?',
    'day-2': 'Notice your breath right now. What if you paused your breathing for just two seconds? Try it. Feel what happens. That pull. That pressure. That is your body asking. Now breathe. Feel the release. This is what every urge feels like. A building. A holding. A release. When urges arrive today out there in your world, you will recognize this shape.',
    'day-3': 'Today, when an urge shows up, try saying this out loud or in your mind: I am feeling the urge to _____. Just name it. Watch what happens. Does it shift? Does it get smaller? Does it lose some of its grip? Naming is not about making it go away. Naming is about remembering that you are not it.',
    'day-4': 'Today, see if you can pause for two full seconds before responding to someone. Three times. A question. A frustration. An offer. Stop. Breathe. Two seconds. Then respond however you want. You are not trying to change what you say. You are trying to notice what it feels like to have space before you speak.',
    'day-5': 'You have been practicing the pause. Now try adding one question: Does this action align with who I am becoming? Let the answer come from your body, not your thoughts. Your gut will know. Then choose. Notice what it feels like to choose from that place instead of reacting from the urge.',
    'day-6': 'Today, every time you pause before acting, place your hand on your heart. Say this out loud or silently: I chose this. This is my power. Try to do this three times today. Notice what it feels like to witness your own strength. You are not just changing behavior. You are rewiring your brain.',
    'day-7': 'Take a few minutes to reflect. How did this practice change you this week? What surprised you? What will you do to keep this pause alive? You do not need to have it all figured out. You just need to know that the space between urge and action belongs to you.'
  };
  
  // Handle context scenes - they use dynamic content from the narrator
  // and should fall back to Web Speech API (frontend handles this)
  if (sceneKey.includes('-context')) {
    return null; // Signal to use TTS instead of pre-recorded audio
  }
  
  return narratives[sceneKey] || null;
}

export default app;