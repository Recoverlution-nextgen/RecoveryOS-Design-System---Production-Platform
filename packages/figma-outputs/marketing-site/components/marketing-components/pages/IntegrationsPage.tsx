/**
 * INTEGRATIONS PAGE
 * User connects external services (Oura, Strava, Google Calendar, etc.)
 */

import { useState, useEffect } from 'react';
import { initiateOAuth, providers } from '../../utils/integrations/oauth';
import { createClient } from '../../utils/supabase/client';

interface Integration {
  id: string;
  provider: string;
  status: string;
  last_sync: string | null;
  created_at: string;
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadIntegrations();
  }, []);

  async function loadIntegrations() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('integrations')
      .select('*')
      .eq('patient_id', user.id)
      .eq('status', 'active');

    setIntegrations(data || []);
    setLoading(false);
  }

  async function handleConnect(providerId: string) {
    // Initiate OAuth flow
    initiateOAuth(providerId);
  }

  async function handleDisconnect(integrationId: string) {
    const confirmed = window.confirm('Disconnect this integration? Your data will stop syncing.');
    if (!confirmed) return;

    await supabase
      .from('integrations')
      .update({ status: 'disconnected' })
      .eq('id', integrationId);

    loadIntegrations();
  }

  const isConnected = (providerId: string) => 
    integrations.some(int => int.provider === providerId);

  const getIntegration = (providerId: string) =>
    integrations.find(int => int.provider === providerId);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 style={{ marginBottom: '12px' }}>Connected Services</h1>
        <p className="text-lg opacity-70">
          Sync data from your favorite apps to power Momentum intelligence
        </p>
      </header>

      {/* Health & Fitness */}
      <section className="mb-12">
        <h2 className="mb-6">Health & Fitness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard
            id="oura"
            name="Oura Ring"
            icon="💍"
            description="Sync sleep and readiness to power your Energy & Clarity metrics"
            dataTypes={['Sleep', 'Readiness', 'HRV', 'Activity']}
            connected={isConnected('oura')}
            integration={getIntegration('oura')}
            onConnect={() => handleConnect('oura')}
            onDisconnect={() => handleDisconnect(getIntegration('oura')!.id)}
          />
          
          <IntegrationCard
            id="strava"
            name="Strava"
            icon="🏃"
            description="Track workouts and celebrate progress in your Stress Resilience pillar"
            dataTypes={['Runs', 'Rides', 'Workouts', 'PRs']}
            connected={isConnected('strava')}
            integration={getIntegration('strava')}
            onConnect={() => handleConnect('strava')}
            onDisconnect={() => handleDisconnect(getIntegration('strava')!.id)}
          />
          
          <IntegrationCard
            id="google_fit"
            name="Google Fit"
            icon="📱"
            description="Sync activity and health data from your Android device"
            dataTypes={['Steps', 'Sleep', 'Heart Rate', 'Activity']}
            connected={isConnected('google_fit')}
            integration={getIntegration('google_fit')}
            onConnect={() => handleConnect('google_fit')}
            onDisconnect={() => handleDisconnect(getIntegration('google_fit')!.id)}
          />
        </div>
      </section>

      {/* Calendar & Scheduling */}
      <section className="mb-12">
        <h2 className="mb-6">Calendar & Scheduling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard
            id="google_calendar"
            name="Google Calendar"
            icon="📅"
            description="Auto-detect therapy appointments and track attendance"
            dataTypes={['Appointments', 'Events', 'Attendance']}
            connected={isConnected('google_calendar')}
            integration={getIntegration('google_calendar')}
            onConnect={() => handleConnect('google_calendar')}
            onDisconnect={() => handleDisconnect(getIntegration('google_calendar')!.id)}
          />
          
          <IntegrationCard
            id="outlook"
            name="Outlook Calendar"
            icon="📆"
            description="Sync appointments from your Microsoft calendar"
            dataTypes={['Appointments', 'Events', 'Attendance']}
            connected={isConnected('outlook')}
            integration={getIntegration('outlook')}
            onConnect={() => handleConnect('outlook')}
            onDisconnect={() => handleDisconnect(getIntegration('outlook')!.id)}
          />
        </div>
      </section>

      {/* Privacy Notice */}
      <footer className="mt-16 p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
        <h3 className="mb-3">Privacy & Security</h3>
        <ul className="space-y-2 opacity-70">
          <li>• Your data is encrypted and used only to improve your experience</li>
          <li>• You can disconnect any integration at any time</li>
          <li>• Disconnecting will remove all synced data from our systems</li>
          <li>• We never share your data with third parties</li>
        </ul>
      </footer>
    </div>
  );
}

interface IntegrationCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  dataTypes: string[];
  connected: boolean;
  integration?: Integration;
  onConnect: () => void;
  onDisconnect: () => void;
}

function IntegrationCard({
  name,
  icon,
  description,
  dataTypes,
  connected,
  integration,
  onConnect,
  onDisconnect
}: IntegrationCardProps) {
  return (
    <div className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="mb-1">{name}</h3>
          {connected && (
            <p className="text-sm text-green-400">
              ● Connected {integration?.last_sync && `• Synced ${new Date(integration.last_sync).toLocaleDateString()}`}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm opacity-70 mb-4">{description}</p>

      {/* Data Types */}
      <div className="flex flex-wrap gap-2 mb-4">
        {dataTypes.map(type => (
          <span 
            key={type}
            className="px-2 py-1 text-xs bg-white bg-opacity-10 rounded"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {connected ? (
          <button
            onClick={onDisconnect}
            className="flex-1 px-4 py-2 bg-red-500 bg-opacity-20 text-red-300 rounded hover:bg-opacity-30 transition-all"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={onConnect}
            className="flex-1 px-4 py-2 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
