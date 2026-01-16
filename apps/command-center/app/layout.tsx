import "./globals.css";
import type { ReactNode } from "react";
import Image from "next/image";
import { CommandCenterNav } from "./components/CommandCenterNav";

export const metadata = {
  title: "RecoveryOS Command Center",
  description: "Studios, governance, and admin surfaces."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="ds-body">
        <div className="ui-shell">
          <aside className="ui-rail">
            <div className="ui-panel">
              <Image
                src="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/marketing-assets/Logo/wide/svg/recoverlution_logo_wide_dark.svg"
                alt="Recoverlution"
                width={220}
                height={48}
                style={{ width: "100%", height: "auto", maxWidth: 220, marginBottom: 12 }}
                priority
              />
              <div className="ui-section-header">
                <div className="ui-section-eyebrow">Command Center</div>
                <div className="ui-section-title">Operating System</div>
                <div className="ui-section-subtitle">Nervous System · Build Lab · Governance</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                <span className="ui-pill" data-tone="muted">
                  <span className="ui-dot" /> Supabase
                </span>
                <span className="ui-pill" data-tone="muted">RLS enforced</span>
              </div>
            </div>
            <div className="ui-panel">
              <div className="ui-section-header">
                <div className="ui-section-eyebrow">Navigation</div>
                <div className="ui-section-title">System</div>
              </div>
              <CommandCenterNav />
            </div>
          </aside>
          <section className="ui-main">{children}</section>
        </div>
      </body>
    </html>
  );
}
