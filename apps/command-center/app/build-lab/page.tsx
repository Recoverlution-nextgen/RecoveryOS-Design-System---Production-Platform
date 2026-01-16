import { Panel, SectionHeader } from "@recoverlution/ui";

export const dynamic = "force-dynamic";

export default function BuildLabPage() {
  return (
    <>
      <Panel>
        <SectionHeader
          eyebrow="Build Lab"
          title="Studios + Assembly"
          subtitle="Component playground, journey studio, navicue forge, content lab"
        />
      </Panel>

      <div className="ui-grid">
        <Panel>
          <SectionHeader eyebrow="Component Playground" title="Design system registry" subtitle="Browse variants, motion, a11y" />
          <div style={{ marginTop: 12, height: 180, borderRadius: 12, border: "1px dashed var(--semantic-colors-border-subtle, #4B495B)" }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Universal Player" title="Cue templates" subtitle="Layout + logic + receipts" />
          <div style={{ marginTop: 12, height: 180, borderRadius: 12, border: "1px dashed var(--semantic-colors-border-subtle, #4B495B)" }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Journey Studio" title="13-screen sprints" subtitle="Experience → Recognize → Align" />
          <div style={{ marginTop: 12, height: 180, borderRadius: 12, border: "1px dashed var(--semantic-colors-border-subtle, #4B495B)" }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="NaviCue Forge" title="Infinite streams" subtitle="Families, constraints, variation" />
          <div style={{ marginTop: 12, height: 180, borderRadius: 12, border: "1px dashed var(--semantic-colors-border-subtle, #4B495B)" }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Content Assembly" title="Atoms + packs" subtitle="Soundbites, practices, insights" />
          <div style={{ marginTop: 12, height: 180, borderRadius: 12, border: "1px dashed var(--semantic-colors-border-subtle, #4B495B)" }} />
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Experiment Lab" title="A/B + safety" subtitle="Cohorts, guardrails, impact" />
          <div style={{ marginTop: 12, height: 180, borderRadius: 12, border: "1px dashed var(--semantic-colors-border-subtle, #4B495B)" }} />
        </Panel>
      </div>
    </>
  );
}
