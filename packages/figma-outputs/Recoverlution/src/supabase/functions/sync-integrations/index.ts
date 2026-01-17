/**
 * DAILY INTEGRATION SYNC
 * Runs at 6am daily, syncs data from all connected integrations
 * 
 * Deploy with cron: supabase functions deploy sync-integrations --no-verify-jwt
 * Schedule: 0 6 * * * (6am daily)
 */

import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface Integration {
  id: string;
  patient_id: string;
  provider: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

Deno.serve(async (_req) => {
  console.log('🔄 Starting integration sync...');

  // Get all active integrations
  const { data: integrations, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('status', 'active');

  if (error) {
    console.error('Error fetching integrations:', error);
    return new Response('Error', { status: 500 });
  }

  console.log(`Found ${integrations?.length || 0} active integrations`);

  // Sync each integration
  for (const integration of integrations || []) {
    try {
      await syncIntegration(integration);
    } catch (error) {
      console.error(`Error syncing ${integration.provider} for ${integration.patient_id}:`, error);
      // Mark as error but continue with others
      await supabase
        .from('integrations')
        .update({ status: 'error' })
        .eq('id', integration.id);
    }
  }

  return new Response('Sync complete', { status: 200 });
});

async function syncIntegration(integration: Integration) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split('T')[0];

  console.log(`Syncing ${integration.provider} for patient ${integration.patient_id}...`);

  switch (integration.provider) {
    case 'oura':
      await syncOura(integration, dateStr);
      break;
    case 'strava':
      await syncStrava(integration, dateStr);
      break;
    case 'google_fit':
      await syncGoogleFit(integration, dateStr);
      break;
    case 'google_calendar':
      await syncGoogleCalendar(integration, dateStr);
      break;
    case 'outlook':
      await syncOutlook(integration, dateStr);
      break;
    default:
      console.warn(`Unknown provider: ${integration.provider}`);
  }

  // Update last_sync
  await supabase
    .from('integrations')
    .update({ last_sync: new Date().toISOString() })
    .eq('id', integration.id);
}

async function syncOura(integration: Integration, date: string) {
  // Fetch sleep data
  const sleepResponse = await fetch(
    `https://api.ouraring.com/v2/usercollection/daily_sleep?start_date=${date}`,
    { headers: { Authorization: `Bearer ${integration.access_token}` } }
  );

  if (!sleepResponse.ok) throw new Error('Oura sleep fetch failed');
  const sleepData = await sleepResponse.json();

  // Fetch readiness data
  const readinessResponse = await fetch(
    `https://api.ouraring.com/v2/usercollection/daily_readiness?start_date=${date}`,
    { headers: { Authorization: `Bearer ${integration.access_token}` } }
  );

  if (!readinessResponse.ok) throw new Error('Oura readiness fetch failed');
  const readinessData = await readinessResponse.json();

  if (sleepData.data?.[0] && readinessData.data?.[0]) {
    const sleepScore = sleepData.data[0].score;
    const readinessScore = readinessData.data[0].score;

    // Store in integration_data
    await supabase.from('integration_data').insert({
      integration_id: integration.id,
      data_type: 'sleep',
      date,
      raw_data: { sleep: sleepData.data[0], readiness: readinessData.data[0] },
      mapped_data: {
        energy: readinessScore, // Maps to Sync.energy
        clarity: Math.round((sleepScore + readinessScore) / 2), // Maps to Sync.clarity
        hrv: readinessData.data[0].contributors?.hrv_balance || 0
      }
    });

    console.log(`✅ Oura synced: Sleep ${sleepScore}, Readiness ${readinessScore}`);
  }
}

async function syncStrava(integration: Integration, date: string) {
  const timestamp = Math.floor(new Date(date).getTime() / 1000);
  
  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?after=${timestamp}`,
    { headers: { Authorization: `Bearer ${integration.access_token}` } }
  );

  if (!response.ok) throw new Error('Strava fetch failed');
  const activities = await response.json();

  for (const activity of activities) {
    await supabase.from('integration_data').insert({
      integration_id: integration.id,
      data_type: 'activity',
      date,
      raw_data: activity,
      mapped_data: {
        activity_type: activity.type.toLowerCase(),
        duration_minutes: Math.round(activity.moving_time / 60),
        distance_meters: activity.distance,
        calories: activity.calories,
        achievements: activity.achievement_count, // PRs
        social_support: activity.kudos_count // Social Connectivity pillar
      }
    });
  }

  console.log(`✅ Strava synced: ${activities.length} activities`);
}

async function syncGoogleFit(integration: Integration, date: string) {
  // Aggregate steps for the day
  const startTime = new Date(date).getTime();
  const endTime = startTime + (24 * 60 * 60 * 1000);

  const response = await fetch(
    'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${integration.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        aggregateBy: [{
          dataTypeName: 'com.google.step_count.delta'
        }],
        bucketByTime: { durationMillis: 86400000 }, // 1 day
        startTimeMillis: startTime,
        endTimeMillis: endTime
      })
    }
  );

  if (!response.ok) throw new Error('Google Fit fetch failed');
  const data = await response.json();

  const steps = data.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0;

  await supabase.from('integration_data').insert({
    integration_id: integration.id,
    data_type: 'activity',
    date,
    raw_data: data,
    mapped_data: {
      steps,
      activity_minutes: Math.round(steps / 100) // Rough estimate
    }
  });

  console.log(`✅ Google Fit synced: ${steps} steps`);
}

async function syncGoogleCalendar(integration: Integration, date: string) {
  const startTime = new Date(date).toISOString();
  const endTime = new Date(date);
  endTime.setDate(endTime.getDate() + 1);

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
    `timeMin=${startTime}&timeMax=${endTime.toISOString()}&singleEvents=true`,
    { headers: { Authorization: `Bearer ${integration.access_token}` } }
  );

  if (!response.ok) throw new Error('Google Calendar fetch failed');
  const data = await response.json();

  for (const event of data.items || []) {
    // Detect therapy sessions
    const isTherapy = /therapy|counseling|session|recovery|treatment/i.test(
      `${event.summary || ''} ${event.description || ''}`
    );

    await supabase.from('integration_data').insert({
      integration_id: integration.id,
      data_type: 'calendar_event',
      date,
      raw_data: event,
      mapped_data: {
        summary: event.summary,
        start_time: event.start.dateTime || event.start.date,
        end_time: event.end.dateTime || event.end.date,
        is_therapy: isTherapy,
        location: event.location
      }
    });
  }

  console.log(`✅ Google Calendar synced: ${data.items?.length || 0} events`);
}

async function syncOutlook(integration: Integration, date: string) {
  const startTime = new Date(date).toISOString();
  const endTime = new Date(date);
  endTime.setDate(endTime.getDate() + 1);

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/me/calendarview?` +
    `startDateTime=${startTime}&endDateTime=${endTime.toISOString()}`,
    { headers: { Authorization: `Bearer ${integration.access_token}` } }
  );

  if (!response.ok) throw new Error('Outlook fetch failed');
  const data = await response.json();

  for (const event of data.value || []) {
    const isTherapy = /therapy|counseling|session|recovery|treatment/i.test(
      `${event.subject || ''} ${event.bodyPreview || ''}`
    );

    await supabase.from('integration_data').insert({
      integration_id: integration.id,
      data_type: 'calendar_event',
      date,
      raw_data: event,
      mapped_data: {
        summary: event.subject,
        start_time: event.start.dateTime,
        end_time: event.end.dateTime,
        is_therapy: isTherapy,
        location: event.location?.displayName
      }
    });
  }

  console.log(`✅ Outlook synced: ${data.value?.length || 0} events`);
}
