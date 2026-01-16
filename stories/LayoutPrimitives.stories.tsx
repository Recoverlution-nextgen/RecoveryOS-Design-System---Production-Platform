import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Main, Panel, Pill, Rail, SectionHeader, Shell } from "@recoverlution/ui";

const meta = {
  title: "Design System/Layout Primitives",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  render: () => (
    <Shell>
      <Rail>
        <Panel>
          <SectionHeader eyebrow="RecoveryOS" title="Command Center" subtitle="3-part system" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <Pill label="Supabase Live" dotTone="success" />
            <Pill label="RLS enforced" tone="muted" />
          </div>
        </Panel>
        <Panel>
          <SectionHeader eyebrow="Navigation" title="Sections" />
          <div style={{ display: "grid", gap: 10 }}>
            <div className="ui-nav-item active">
              Nervous System <span>Visual truth + stream</span>
            </div>
            <div className="ui-nav-item">
              Build Lab <span>Studios + assembly</span>
            </div>
            <div className="ui-nav-item">
              Governance <span>Safety + reliability</span>
            </div>
          </div>
        </Panel>
      </Rail>
      <Main>
        <Panel>
          <SectionHeader eyebrow="Nervous System" title="System Map" subtitle="Living map of signals and decisions" />
          <div style={{ marginTop: 12, height: 160, borderRadius: 12, border: "1px dashed var(--semantic-colors-border-subtle, #4B495B)" }} />
        </Panel>
      </Main>
    </Shell>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
