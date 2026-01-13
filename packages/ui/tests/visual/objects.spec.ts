import { test, expect } from "@playwright/test";
import { snapshotRoutes, LENSES, BANDS } from "./routes";

test.describe("RecoveryOS visual snapshots", () => {
  for (const r of snapshotRoutes) {
    for (const lens of LENSES) {
      for (const band of BANDS) {
        test(`${r.name} [${lens}] [${band}]`, async ({ page }) => {
          const url = `${r.path}${r.path.includes("?") ? "&" : "?"}lens=${lens}&band=${band}`;

          await page.goto(url, { waitUntil: "networkidle" });

          // Ensure stable rendering: fonts loaded, animations settled.
          await page.evaluate(async () => {
            // Wait for fonts
            // @ts-ignore
            if (document.fonts && document.fonts.ready) await document.fonts.ready;
          });

          // Freeze time-dependent UI if any (optional: implement in registry)
          await page.addStyleTag({ content: `
            *, *::before, *::after {
              animation: none !important;
              transition: none !important;
              caret-color: transparent !important;
            }
          `});

          // Snapshot the full viewport (object pages should be centered)
          await expect(page).toHaveScreenshot(`${sanitize(r.name)}__${lens}__${band}.png`, {
            fullPage: true
          });
        });
      }
    }
  }
});

function sanitize(name: string) {
  return name.replace(/[^\w.-]+/g, "_");
}