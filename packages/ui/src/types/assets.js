/**
 * Asset Schema: Copy-on-asset system where text is etched into visuals
 * Assets are the heroes - they tell the story, carry the narrative
 */
/**
 * Factory: Create asset with etched copy
 */
export function createAssetWithEtchedCopy(id, slug, title, narrative, source, etchedText, tone = 'neutral', dimensions = { width: 400, height: 300 }) {
    return {
        id,
        slug,
        title,
        narrative,
        format: 'svg',
        tone,
        layers: ['background', 'etched-text'],
        etchedCopy: {
            text: etchedText,
            position: 'center',
            style: 'transparent',
            typography: {
                family: 'SF Pro Display',
                size: 24,
                weight: 600,
                letterSpacing: 0.02,
                lineHeight: 1.2,
            },
            color: 'hsla(0, 0%, 100%, 0.14)',
            blend: 'overlay',
        },
        glassEffect: {
            opacity: 0.14,
            blur: 24,
            border: {
                width: 1,
                color: 'hsla(0, 0%, 100%, 0.08)',
                opacity: 0.8,
            },
        },
        source,
        alt: title,
        dimensions,
        usedIn: ['companion', 'console', 'command'],
        elevation: 'raised',
    };
}
/**
 * Factory: Create hero asset (large, narrative-driven)
 */
export function createHeroAsset(id, slug, title, narrative, source, etchedText, usedIn) {
    return {
        id,
        slug,
        title,
        narrative,
        format: 'svg',
        tone: 'neutral',
        layers: ['background', 'midground', 'foreground', 'etched-text'],
        etchedCopy: {
            text: etchedText,
            position: 'center',
            style: 'illuminated',
            typography: {
                family: 'SF Pro Display',
                size: 48,
                weight: 700,
                letterSpacing: 0.01,
                lineHeight: 1.1,
            },
            color: 'hsla(160, 70%, 48%, 0.25)',
            blend: 'screen',
        },
        glassEffect: {
            opacity: 0.25,
            blur: 32,
            gradient: {
                from: 'hsla(200, 12%, 8%, 0.8)',
                to: 'hsla(200, 12%, 12%, 0.6)',
                angle: 135,
            },
            border: {
                width: 1,
                color: 'hsla(160, 70%, 48%, 0.14)',
                opacity: 1,
            },
            shadow: {
                x: 0,
                y: 8,
                blur: 24,
                color: 'hsla(0, 0%, 0%, 0.4)',
            },
        },
        source,
        alt: title,
        dimensions: { width: 1200, height: 600 },
        usedIn,
        elevation: 'floating',
    };
}
