export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <header className="space-y-3">
          <p className="text-sm font-semibold text-slate-500">Platform Shell</p>
          <h1 className="text-4xl font-bold tracking-tight">Rooms + Universal Player</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            The governed app shell for RecoveryOS: navigation spine, rooms registry, and the player runtime entrypoint.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Rooms registry" body="Configure which rooms are available, their thresholds, and permissions." />
          <Card title="Player-ready" body="Universal Player hooks in for journeys, navicues, toolkit, and receipts." />
          <Card title="Signals" body="State, consent, and telemetry ready to wire to Supabase data + orchestration." />
        </div>
      </div>
    </main>
  );
}

type CardProps = { title: string; body: string };
function Card({ title, body }: CardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
