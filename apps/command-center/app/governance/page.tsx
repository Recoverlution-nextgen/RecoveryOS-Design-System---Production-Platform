import { Panel, SectionHeader } from "@recoverlution/ui";

export const dynamic = "force-dynamic";

export default function GovernancePage() {
  return (
    <>
      <Panel>
        <SectionHeader
          eyebrow="Governance"
          title="Truth, safety, reliability"
          subtitle="Supabase console, permissions, audit, integrations"
        />
      </Panel>

      <div className="ui-grid">
        <Panel>
          <SectionHeader eyebrow="Supabase" title="Data console" subtitle="Schema, views, RLS policies" />
          <div className="ui-placeholder" style={{ marginTop: 12 }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Identity" title="Roles + permissions" subtitle="Admins, clinicians, editors" />
          <div className="ui-placeholder" style={{ marginTop: 12 }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Integrations" title="Connectors" subtitle="Wearables, calendars, notifications" />
          <div className="ui-placeholder" style={{ marginTop: 12 }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Observability" title="Reliability" subtitle="Latency, error budgets, delivery" />
          <div className="ui-placeholder" style={{ marginTop: 12 }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Safety" title="Policy engine" subtitle="Consent, escalation, kill switches" />
          <div className="ui-placeholder" style={{ marginTop: 12 }} />
        </Panel>
      </div>
    </>
  );
}
