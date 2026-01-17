import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import navicueSyncRoutes from './navicue-sync.ts';

// Import all new route modules
import cc2StatsRoutes from './cc2-stats.tsx';
import cc2EventsRoutes from './cc2-events.tsx';
import cc2ProofsRoutes from './cc2-proofs.tsx';
import cc2DecisionsRoutes from './cc2-decisions.tsx';
import cc2ClinicalRoutes from './cc2-clinical.tsx';
import cc2AuditRoutes from './cc2-audit.tsx';
import cc2MindblockRoutes from './cc2-mindblocks.tsx';
import cc2ProtocolRoutes from './cc2-protocols.tsx';
import cc2IndividualRoutes from './cc2-individuals.tsx';
import lumaSimulateRoutes from './luma-simulate.tsx';
import professionalsRoutes from './professionals.tsx';
import organizationsRoutes from './organizations.tsx';
import videoConferencingRoutes from './video-conferencing.tsx';
import schedulingRoutes from './scheduling.tsx';
import billingRoutes from './billing.tsx';
import familyHubRoutes from './family-hub.tsx';
import peerConnectionsRoutes from './peer-connections.tsx';
import integrationsRoutes from './integrations.tsx';
import wellbeingVideosRoutes from './wellbeing-videos.tsx';
import complianceCheckerRoutes from './compliance-checker.tsx';
import authRoutes from './auth.tsx';
import journeyRoutes from './journey-enhanced.tsx';
import journeyRuntimeRoutes from './journey-runtime.tsx';
import syntheticsControlRoutes from './synthetics-control.tsx';
import notificationsRoutes from './notifications.tsx';
import mediaEnrichmentRoutes from './media-enrichment.tsx';
import aiTaggingRoutes from './ai-tagging.tsx';
import soundbitesRoutes from './soundbites.tsx';

const app = new Hono();

// Middleware
app.use('*', logger(console.log));
app.use('*', cors());

// Create a sub-app with the /make-server-49b28b8a prefix
const apiApp = new Hono();

// Original routes
apiApp.route('/', navicueSyncRoutes);

// Auth routes
apiApp.route('/auth', authRoutes);

// CC2 routes
apiApp.route('/cc2', cc2StatsRoutes);
apiApp.route('/cc2/events', cc2EventsRoutes);
apiApp.route('/cc2/proofs', cc2ProofsRoutes);
apiApp.route('/cc2/decisions', cc2DecisionsRoutes);
apiApp.route('/cc2/clinical', cc2ClinicalRoutes);
apiApp.route('/cc2/audit', cc2AuditRoutes);
apiApp.route('/cc2/mindblocks', cc2MindblockRoutes);
apiApp.route('/cc2/protocols', cc2ProtocolRoutes);
apiApp.route('/cc2/individuals', cc2IndividualRoutes);

// Synthetics control routes
apiApp.route('/synthetics', syntheticsControlRoutes);

// LUMA routes
apiApp.route('/luma', lumaSimulateRoutes);

// Professional/Organization routes
apiApp.route('/professionals', professionalsRoutes);
apiApp.route('/organizations', organizationsRoutes);

// Integration routes
apiApp.route('/video', videoConferencingRoutes);
apiApp.route('/scheduling', schedulingRoutes);
apiApp.route('/billing', billingRoutes);
apiApp.route('/integrations', integrationsRoutes);

// Peer & Family routes
apiApp.route('/peer', peerConnectionsRoutes);
apiApp.route('/family', familyHubRoutes);

// Content routes
apiApp.route('/wellbeing', wellbeingVideosRoutes);
apiApp.route('/compliance', complianceCheckerRoutes);

// Journey routes (NEW: unified at /journey)
apiApp.route('/journey-legacy', journeyRoutes);
apiApp.route('/journey', journeyRuntimeRoutes);

// Notifications routes (NEW: realtime in-app notifications)
apiApp.route('/notifications', notificationsRoutes);

// Media enrichment routes (NEW: media enrichment)
apiApp.route('/media-enrichment', mediaEnrichmentRoutes);

// AI tagging routes (NEW: AI-powered asset tagging with Gemini)
apiApp.route('/ai-tagging', aiTaggingRoutes);

// Soundbites routes (NEW: soundbites)
apiApp.route('/soundbites', soundbitesRoutes);

// Health check
apiApp.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Population health direct endpoint (for convenience)
apiApp.get('/population-health', async (c) => {
  try {
    const organization_id = c.req.query('organization_id');
    
    if (!organization_id) {
      return c.json({ error: 'organization_id required' }, 400);
    }

    // Redirect to organization endpoint
    return c.redirect(`/organizations/${organization_id}/population-health`);
  } catch (error) {
    console.error('Error in population-health redirect:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Mount the API app at /make-server-49b28b8a
app.route('/make-server-49b28b8a', apiApp);

Deno.serve(app.fetch);