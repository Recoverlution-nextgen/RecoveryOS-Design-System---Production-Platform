export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <header className="space-y-3">
          <p className="text-sm font-semibold text-slate-400">Command Center</p>
          <h1 className="text-4xl font-bold tracking-tight">Studios + Governance</h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Author journeys, navicues, components, and content with RLS-enforced roles and previews in the same runtime.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Studios" body="Journey Studio, NaviCue Studio, Content Assembly Lab." />
          <Card title="Safety" body="RLS roles, cadence/consent guardrails, publish workflow." />
          <Card title="Preview" body="Preview in the Universal Player runtime before shipping." />
        </div>
      </div>
    </main>
  );
}

type CardProps = { title: string; body: string };
function Card({ title, body }: CardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-md shadow-black/30 backdrop-blur">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-200 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
