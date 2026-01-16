# Supabase Integration Playbook

## Env

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `NEXT_PUBLIC_SUPABASE_CDN_URL` (optional; blank = storage public URL)

## Client (server-side only)

Import from `designsystem/supabase`:

- Views/RPCs: `fetchSoundbiteTracksFrontend`, `fetchSoundbiteTracksByCode`, `listRecentListens`
- Functions: `signDownloadUrl`, `generateUploadUrl`, `listUserAudio`, `renameUserAudio`, `deleteUserAudio`, `feedPull`, `logEvent`
- Direct tables: `fetchFeedQueue`, `fetchContentRegistryById`
- Legacy assets: `queryStorageAssets`, `getAssetFacets`, etc.

## Available Functions (per Supabase agent brief)

- `/functions/v1/sign-download-url` → `{ signed_url, expires_in }`
- `/functions/v1/generate-upload-url` → `{ url, headers, expires_in }`
- `/functions/v1/list-user-audio?prefix=user/{uid}/audio`
- `/functions/v1/rename-user-audio`, `/functions/v1/delete-user-audio`
- `/functions/v1/v1_feed_pull` (feed queue)
- `/functions/v1/events-api` (generic logging)

## Views / RPCs expected

- `v_soundbite_tracks_frontend` (catalog tracks)
- `v_soundbite_tracks_by_code` (variant grouping)
- `list_recent_listens(user_id uuid, limit int)`

If missing, create them (see Supabase agent brief) or the demo endpoints will return a hint.

## Demo endpoints (Next API)

- `GET /api/supabase-demo` → tests `v_soundbite_tracks_frontend` (returns hint if view missing)
- `GET /api/supabase-feed` → tries `v1_feed_pull`, falls back to `user_feed_queue_v2`

## UI probe

- `SupabaseStatus` component on the home page fetches both endpoints and shows OK/FAIL with hints.

## Safety

- Do not use `supabaseClient` in browser components (service key may be present in env). Use Next API routes or server components to mediate.
- Service key stays server-side; anon key is fine for client fetch to your API.

## Next steps

- Wire playback: pull feed item → content_registry lookup → sign-download-url → audio player.
- Wire user audio: generate-upload-url → PUT bytes → list-user-audio → rename/delete.
- Logging: use `logEvent` (events-api) and/or insert into `engagement_events`.
- Create missing views/RPCs if hints indicate cache/view not found.
