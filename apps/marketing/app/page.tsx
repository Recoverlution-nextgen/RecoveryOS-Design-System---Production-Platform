export default function Page() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-300">RecoveryOS</p>
          <h1 className="text-5xl font-semibold">Marketing Surface</h1>
          <p className="text-lg text-slate-200">
            Built for cinematic storytelling, motion-rich demos, and high-conversion launch flows.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Story-first" body="Narratives with motion, scroll choreography, and responsive templates." />
          <Card title="Performance" body="Next.js App Router + streaming for fast page loads." />
          <Card title="CMS-ready" body="Plumb to headless CMS and CRM capture without breaking flow." />
        </div>
      </div>
    </main>
  );
}

type CardProps = { title: string; body: string };
function Card({ title, body }: CardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 backdrop-blur">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-200 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
