/**
 * CC2 PROOFS ENDPOINT
 * Proof Ledger data for Command Center 2
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// GET /proofs - Query proof artifacts
app.get('/', async (c) => {
  try {
    const proofType = c.req.query('proof_type'); // 'practice' | 'article' | 'state'
    const userId = c.req.query('user_id');
    const contentId = c.req.query('content_id');
    const dateFrom = c.req.query('date_from');
    const dateTo = c.req.query('date_to');
    const limit = parseInt(c.req.query('limit') || '100');
    const offset = parseInt(c.req.query('offset') || '0');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    let proofs: any[] = [];
    let totalCount = 0;

    // Query based on proof type
    if (!proofType || proofType === 'practice') {
      const { data, count } = await supabase
        .from('practice_completions')
        .select('*, content_items(title, kind)', { count: 'exact' })
        .order('completed_at', { ascending: false })
        .range(offset, offset + limit - 1);

      proofs = proofs.concat((data || []).map(p => ({
        ...p,
        proof_type: 'practice',
      })));
      totalCount += count || 0;
    }

    if (!proofType || proofType === 'state') {
      const { data, count } = await supabase
        .from('state_checkins')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      proofs = proofs.concat((data || []).map(s => ({
        ...s,
        proof_type: 'state',
      })));
      totalCount += count || 0;
    }

    // Filter by user_id if provided
    if (userId) {
      proofs = proofs.filter(p => p.user_id === userId);
    }

    // Filter by content_id if provided (for practices)
    if (contentId) {
      proofs = proofs.filter(p => p.content_id === contentId);
    }

    // Filter by date range
    if (dateFrom) {
      proofs = proofs.filter(p => {
        const timestamp = p.completed_at || p.created_at;
        return timestamp >= dateFrom;
      });
    }

    if (dateTo) {
      proofs = proofs.filter(p => {
        const timestamp = p.completed_at || p.created_at;
        return timestamp <= dateTo;
      });
    }

    return c.json({
      data: proofs,
      count: totalCount,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error in cc2-proofs:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
