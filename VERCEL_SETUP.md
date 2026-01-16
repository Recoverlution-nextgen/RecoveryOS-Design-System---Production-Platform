# Vercel setup (multi-app)

Projects to create (one per app):
- **recoveryos-marketing** — root: `apps/marketing`
- **recoveryos-platform** — root: `apps/platform`
- **recoveryos-command-center** — root: `apps/command-center`

Recommended Vercel settings (for each project)
- Framework preset: Next.js
- Root directory: as above
- Build command: `pnpm install --frozen-lockfile && pnpm build`
- Output directory: `.next`
- Node version: 18 or 20
- Install command: `pnpm install --frozen-lockfile`
- Ignore build step: leave empty (or `pnpm lint` if you want a pre-build gate)

Environment variables (per project)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL` (server-side only where needed)
- `SUPABASE_SERVICE_ROLE` (command-center/server-only; never expose client-side)
- `SENTRY_DSN` (optional)
- `POSTHOG_API_KEY`, `POSTHOG_HOST` (optional)

CI/CD flow (GitHub → Vercel)
- Connect each Vercel project to this repo and set the root directory as above.
- Branch previews: enabled by default; will deploy when PRs are opened.

Notes
- Each app is a Next.js App Router stub. Build will pass without additional wiring.
- Shared TS base config lives at `packages/config/tsconfig.base.json`.
- Additional shared packages are scaffolded under `packages/` (player, luma, content, data, observability, config) and can be filled in incrementally.
