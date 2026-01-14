import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
    testDir: "./tests/visual",
    timeout: 30000,
    expect: {
        // pixel-level diffs: tighten later once stable
        toHaveScreenshot: { maxDiffPixelRatio: 0.01 }
    },
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4173",
        trace: "retain-on-failure"
    },
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } }
    ],
    reporter: [["list"], ["html", { open: "never" }]]
});
