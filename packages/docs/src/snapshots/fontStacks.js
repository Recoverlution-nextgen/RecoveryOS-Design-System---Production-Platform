export function applyFontStack(stack) {
    const root = document.documentElement;
    if (stack === "plex") {
        root.style.setProperty("--font-ui", "IBM Plex Sans");
        root.style.setProperty("--font-serif", "IBM Plex Serif");
        root.style.setProperty("--font-mono", "IBM Plex Mono");
        root.dataset.fontStack = "plex";
    }
}
