import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { snapshotRoutes } from "../visual/routes";
const EXCLUDED_RULES = [
// Add exceptions only when justified + logged in DECISIONS.md
];
test.describe("RecoveryOS a11y checks (axe)", () => {
    for (const r of snapshotRoutes) {
        test(`A11y: ${r.name}`, async ({ page }) => {
            // Use a stable "default" lens/band for baseline checks.
            const url = `${r.path}${r.path.includes("?") ? "&" : "?"}lens=individual&band=medium`;
            await page.goto(url, { waitUntil: "networkidle" });
            const results = await new AxeBuilder({ page })
                .disableRules(EXCLUDED_RULES)
                .analyze();
            // Fail hard on violations
            if (results.violations.length) {
                console.error(`A11y violations for ${r.name}:`);
                for (const v of results.violations) {
                    console.error(`- ${v.id}: ${v.help}`);
                    for (const n of v.nodes)
                        console.error(`  • ${n.target.join(", ")}`);
                }
            }
            expect(results.violations).toEqual([]);
        });
    }
});
