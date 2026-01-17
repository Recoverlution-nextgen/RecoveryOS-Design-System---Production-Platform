import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();
app.use('*', cors());

// Gemini 2.0 Flash endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// Governance schema (embedded directly to avoid import issues in Deno)
const governanceSchema = {
  "version": "1.0.0",
  "kinds": ["image", "video", "audio", "pdf", "other"],
  "rooms": ["journeys", "navicues", "toolkit", "wellbeing", "state", "library", "dashboard"],
  "proof_fit": ["receipt_ready", "pre", "post", "micro_win", "checklist", "before_after"],
  "governance": {
    "locked": {
      "pillars": [
        { "id": "pillar_ER", "labels": ["emotional regulation", "ER"] },
        { "id": "pillar_SR", "labels": ["self regulation", "self-regulation", "SR"] },
        { "id": "pillar_SC", "labels": ["social connection", "SC"] },
        { "id": "pillar_CR", "labels": ["cognitive reframing", "CR"] },
        { "id": "pillar_II", "labels": ["identity integration", "II"] },
        { "id": "pillar_DM", "labels": ["decision making", "DM"] }
      ]
    },
    "controlled": {
      "concepts": [
        { "id": "concept_attention_orienting", "labels": ["orienting", "attention orienting", "orient"] },
        { "id": "concept_arousal_regulation", "labels": ["arousal regulation", "calm down", "downshift"] },
        { "id": "concept_repair_reconnection", "labels": ["repair", "reconnection", "relationship repair"] },
        { "id": "concept_choice_architecture", "labels": ["choice architecture", "choice space", "decision shaping"] }
      ],
      "themes": [
        { "id": "theme_create_choice_space", "labels": ["create choice space", "choice space"] },
        { "id": "theme_downshift_under_load", "labels": ["downshift under load", "downshift"] },
        { "id": "theme_repair_the_moment", "labels": ["repair the moment", "repair"] },
        { "id": "theme_proof_capture", "labels": ["proof capture", "receipts", "before after", "checklist"] }
      ],
      "schemas": [
        { "id": "schema_proof_capture", "labels": ["proof", "receipt", "before-after", "checklist", "timeline"] },
        { "id": "schema_spine_feed", "labels": ["spine feed", "feed with a spine", "order from noise"] },
        { "id": "schema_real_life_run", "labels": ["runs in real life", "continuity", "motion loop"] },
        { "id": "schema_one_os_three_worlds", "labels": ["one os", "three worlds", "lens refraction"] }
      ]
    }
  },
  "asset_classes": ["atmosphere", "hero", "system", "icon", "proof"]
};

interface TaggingProposal {
  pillar_id: string | null;
  concept_id: string | null;
  theme_id: string | null;
  schema_id: string | null;
  asset_class: 'atmosphere' | 'hero' | 'system' | 'icon' | 'proof';
  proof_fit: string[];
  usage_tags: string[];
  audience: string | null;
  descriptors: string[];
  confidence: {
    pillar: number;
    concept: number;
    theme: number;
    schema: number;
    asset_class: number;
    overall: number;
  };
  reasoning: string;
}

// Build domain-specific prompt with governance schema
function buildPrompt(imageUrl: string, existingData?: any): string {
  const governanceContext = JSON.stringify(governanceSchema.governance, null, 2);
  
  return `You are an expert in the Recoverlution therapeutic platform taxonomy.

CRITICAL RULES:
1. Use ONLY the exact IDs from the taxonomy below
2. Return ONLY valid JSON (no markdown, no explanations outside JSON)
3. Provide confidence scores (0-1) for each field
4. Be conservative - if unsure, return null with low confidence

LOCKED TAXONOMY (Pillars - use exact IDs):
${governanceSchema.governance.locked.pillars.map(p => `- ${p.id}: ${p.labels.join(', ')}`).join('\n')}

CONTROLLED TAXONOMY (Concepts):
${governanceSchema.governance.controlled.concepts.map(c => `- ${c.id}: ${c.labels.join(', ')}`).join('\n')}

CONTROLLED TAXONOMY (Themes):
${governanceSchema.governance.controlled.themes.map(t => `- ${t.id}: ${t.labels.join(', ')}`).join('\n')}

CONTROLLED TAXONOMY (Schemas):
${governanceSchema.governance.controlled.schemas.map(s => `- ${s.id}: ${s.labels.join(', ')}`).join('\n')}

ASSET CLASSES: ${governanceSchema.asset_classes.join(', ')}

PROOF FIT OPTIONS: ${governanceSchema.proof_fit.join(', ')}

USAGE TAGS OPTIONS: ${governanceSchema.rooms.join(', ')}

MAPPING EXAMPLES:
- Before/after transformation imagery → proof_fit: ["before_after", "receipt_ready"], schema_id: "schema_proof_capture", asset_class: "proof"
- Breathing/meditation visual → concept_id: "concept_arousal_regulation", theme_id: "theme_downshift_under_load", pillar_id: "pillar_ER", usage_tags: ["wellbeing"]
- UI element/dashboard component → asset_class: "system", usage_tags: ["dashboard"]
- Hero section visual → asset_class: "hero", usage_tags: ["journeys"]
- Relationship repair scene → concept_id: "concept_repair_reconnection", theme_id: "theme_repair_the_moment", pillar_id: "pillar_SC"
- Choice/decision imagery → concept_id: "concept_choice_architecture", theme_id: "theme_create_choice_space", pillar_id: "pillar_DM"

EXISTING DATA (if any):
${existingData ? JSON.stringify(existingData, null, 2) : 'None - this is a new asset'}

INSTRUCTIONS:
Analyze the image at the URL below and map it to our taxonomy.

Return ONLY this exact JSON structure (no markdown, no code blocks):
{
  "pillar_id": "pillar_ER" | null,
  "concept_id": "concept_..." | null,
  "theme_id": "theme_..." | null,
  "schema_id": "schema_..." | null,
  "asset_class": "hero" | "atmosphere" | "system" | "icon" | "proof",
  "proof_fit": [],
  "usage_tags": [],
  "audience": "general" | "clinical" | "family" | null,
  "descriptors": ["keyword1", "keyword2"],
  "confidence": {
    "pillar": 0.0,
    "concept": 0.0,
    "theme": 0.0,
    "schema": 0.0,
    "asset_class": 0.0,
    "overall": 0.0
  },
  "reasoning": "Brief explanation of why these mappings were chosen"
}

IMAGE URL: ${imageUrl}`;
}

// Analyze single image with Gemini
app.post('/make-server-49b28b8a/ai-tagging/analyze', async (c) => {
  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('[ai-tagging] GEMINI_API_KEY not configured');
      return c.json({ ok: false, error: 'GEMINI_API_KEY not configured' }, 500);
    }

    const body = await c.req.json();
    const { image_url, asset_id, existing_data } = body;

    if (!image_url) {
      return c.json({ ok: false, error: 'image_url required' }, 400);
    }

    console.log('[ai-tagging] Analyzing image:', image_url);

    const prompt = buildPrompt(image_url, existing_data);

    // Call Gemini API
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { 
              inline_data: {
                mime_type: 'image/jpeg',
                data: await fetchImageAsBase64(image_url)
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('[ai-tagging] Gemini API error:', errorText);
      return c.json({ ok: false, error: `Gemini API error: ${geminiResponse.status}`, details: errorText }, 500);
    }

    const geminiData = await geminiResponse.json();
    console.log('[ai-tagging] Gemini raw response:', JSON.stringify(geminiData, null, 2));

    // Extract text from Gemini response
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      console.error('[ai-tagging] No text in Gemini response');
      return c.json({ ok: false, error: 'No text in Gemini response' }, 500);
    }

    // Parse JSON (handle markdown code blocks if present)
    let proposal: TaggingProposal;
    try {
      const cleanedText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      proposal = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('[ai-tagging] Failed to parse Gemini JSON:', rawText);
      return c.json({ ok: false, error: 'Failed to parse Gemini response as JSON', raw: rawText }, 500);
    }

    console.log('[ai-tagging] Parsed proposal:', proposal);

    return c.json({
      ok: true,
      proposal,
      asset_id,
      raw_response: rawText
    });

  } catch (error: any) {
    console.error('[ai-tagging] Error during analysis:', error);
    return c.json({ ok: false, error: error.message || 'Unknown error during AI tagging' }, 500);
  }
});

// Batch analyze multiple images
app.post('/make-server-49b28b8a/ai-tagging/batch', async (c) => {
  try {
    const body = await c.req.json();
    const { assets } = body; // Array of { id, image_url, existing_data }

    if (!assets || !Array.isArray(assets)) {
      return c.json({ ok: false, error: 'assets array required' }, 400);
    }

    console.log(`[ai-tagging] Batch analyzing ${assets.length} images`);

    const results = [];
    for (const asset of assets) {
      try {
        const analyzeResponse = await app.request('/make-server-49b28b8a/ai-tagging/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url: asset.image_url,
            asset_id: asset.id,
            existing_data: asset.existing_data
          })
        });

        const result = await analyzeResponse.json();
        results.push(result);

        // Rate limiting: wait 500ms between requests
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error: any) {
        console.error(`[ai-tagging] Error analyzing asset ${asset.id}:`, error);
        results.push({
          ok: false,
          asset_id: asset.id,
          error: error.message
        });
      }
    }

    return c.json({
      ok: true,
      results,
      total: assets.length,
      successful: results.filter(r => r.ok).length,
      failed: results.filter(r => !r.ok).length
    });

  } catch (error: any) {
    console.error('[ai-tagging] Batch error:', error);
    return c.json({ ok: false, error: error.message || 'Unknown batch error' }, 500);
  }
});

// Apply approved proposal to database
app.post('/make-server-49b28b8a/ai-tagging/apply', async (c) => {
  try {
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    if (!serviceRoleKey || !supabaseUrl) {
      return c.json({ ok: false, error: 'Supabase credentials not configured' }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await c.req.json();
    const { asset_id, proposal } = body;

    if (!asset_id || !proposal) {
      return c.json({ ok: false, error: 'asset_id and proposal required' }, 400);
    }

    console.log(`[ai-tagging] Applying proposal to asset ${asset_id}`);

    // Update marketing_assets with AI proposal
    const { data, error } = await supabase
      .from('marketing_assets')
      .update({
        pillar_id: proposal.pillar_id,
        concept_id: proposal.concept_id,
        theme_id: proposal.theme_id,
        schema_id: proposal.schema_id,
        asset_class: proposal.asset_class,
        proof_fit: proposal.proof_fit,
        usage_tags: proposal.usage_tags,
        audience: proposal.audience,
        descriptors: proposal.descriptors,
        ai_tags: proposal,
        ai_status: 'approved',
        ai_last_run_at: new Date().toISOString(),
        last_enriched_at: new Date().toISOString()
      })
      .eq('id', asset_id)
      .select();

    if (error) {
      console.error('[ai-tagging] Database update error:', error);
      return c.json({ ok: false, error: error.message }, 500);
    }

    console.log('[ai-tagging] Successfully updated asset:', data);

    return c.json({
      ok: true,
      asset_id,
      updated: data
    });

  } catch (error: any) {
    console.error('[ai-tagging] Apply error:', error);
    return c.json({ ok: false, error: error.message || 'Unknown apply error' }, 500);
  }
});

// Helper: Fetch image and convert to base64
async function fetchImageAsBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return base64;
  } catch (error: any) {
    console.error('[ai-tagging] Error fetching image:', error);
    throw new Error(`Failed to fetch image: ${error.message}`);
  }
}

export default app;