/**
 * Public Language Token System
 * Semantic tokens using RecoveryOS public vocabulary
 */
export const publicLanguageTokens = {
    // Return tokens (the universal action)
    return: {
        surface: 'var(--color-accent-primary)',
        ink: 'var(--color-text-inverse)',
        focusRing: 'var(--color-accent-alpha-025)',
        press: 'var(--color-accent-secondary)',
        glow: 'hsla(160, 70%, 48%, 0.14)',
        hover: 'hsla(160, 70%, 48%, 0.85)',
    },
    // Thread tokens (continuity line)
    thread: {
        line: 'var(--color-accent-primary)',
        node: 'var(--color-accent-alpha-025)',
        pulse: 'hsla(160, 70%, 48%, 0.3)',
        depth: 'var(--elevation-raised)',
        active: 'var(--color-accent-primary)',
        dormant: 'hsla(160, 70%, 48%, 0.08)',
    },
    // Trace tokens (proof objects)
    trace: {
        surface: 'var(--color-surface-raised)',
        border: 'var(--color-border-subtle)',
        stamp: 'var(--color-accent-primary)',
        seal: 'hsla(160, 70%, 48%, 0.25)',
        vaultSurface: 'var(--color-surface-floating)',
        draft: 'hsla(0, 0%, 100%, 0.05)',
        sealed: 'hsla(160, 70%, 48%, 0.12)',
    },
    // Handrail tokens (safety infrastructure)
    handrail: {
        surface: 'var(--color-surface-base)',
        border: 'var(--color-border-primary)',
        callout: 'var(--color-accent-alpha-014)',
        escalate: 'var(--color-state-caution)',
        quiet: 'hsla(0, 0%, 100%, 0.08)',
    },
    // Drift tokens (off-course state)
    drift: {
        low: 'var(--color-state-safe)',
        medium: 'var(--color-state-caution)',
        high: 'var(--color-state-alert)',
        indicator: 'hsla(0, 0%, 100%, 0.2)',
    },
    // Lens tokens (altitude emphasis)
    lens: {
        individual: 'hsla(160, 70%, 48%, 0.14)',
        professional: 'hsla(200, 60%, 55%, 0.14)',
        organisation: 'hsla(40, 80%, 60%, 0.14)',
        active: 'var(--color-accent-primary)',
        inactive: 'hsla(0, 0%, 100%, 0.08)',
    },
    // Motion tokens (spring physics + durations)
    motion: {
        arrive: {
            duration: 'var(--duration-base)',
            spring: 'var(--spring-gentle)',
        },
        glide: {
            duration: 'var(--duration-fast)',
            easing: 'var(--ease-out)',
        },
        settle: {
            duration: 'var(--duration-slow)',
            spring: 'var(--spring-settle)',
        },
        confirm: {
            duration: 'var(--duration-base)',
            spring: 'var(--spring-bouncy)',
        },
        carry: {
            duration: 'var(--duration-ceremony)',
            spring: 'var(--spring-gentle)',
        },
    },
    // Grip tokens (micro-experience)
    grip: {
        anchor: {
            surface: 'hsla(160, 70%, 48%, 0.08)',
            border: 'hsla(160, 70%, 48%, 0.2)',
            icon: 'var(--color-accent-primary)',
        },
        compass: {
            surface: 'hsla(200, 60%, 55%, 0.08)',
            border: 'hsla(200, 60%, 55%, 0.2)',
            icon: 'var(--color-state-safe)',
        },
        handrail: {
            surface: 'hsla(40, 80%, 60%, 0.08)',
            border: 'hsla(40, 80%, 60%, 0.2)',
            icon: 'var(--color-state-caution)',
        },
    },
    // Attention modes
    attention: {
        calm: {
            spacing: 'var(--space-large)',
            density: 'spacious',
            motion: 'slow',
        },
        focus: {
            spacing: 'var(--space-base)',
            density: 'compact',
            motion: 'snappy',
        },
    },
};
/**
 * Mode tokens (Appearance + Attention + Accessibility)
 */
export const modeTokens = {
    appearance: {
        light: {
            surface: 'hsla(0, 0%, 98%, 1)',
            text: 'hsla(0, 0%, 10%, 1)',
            accent: 'hsla(160, 70%, 45%, 1)',
        },
        dark: {
            surface: 'hsla(200, 12%, 8%, 1)',
            text: 'hsla(0, 0%, 95%, 1)',
            accent: 'hsla(160, 70%, 48%, 1)',
        },
    },
    attention: {
        calm: {
            spacing: '1.5',
            density: 'spacious',
            duration: '1.2',
        },
        focus: {
            spacing: '1',
            density: 'compact',
            duration: '0.8',
        },
    },
    accessibility: {
        reduceMotion: {
            duration: '0',
            spring: 'instant',
        },
        increaseContrast: {
            border: '2',
            alpha: '1',
        },
    },
};
/**
 * Scene tokens (page choreography)
 */
export const sceneTokens = {
    hero: {
        spacing: 'var(--space-xxlarge)',
        density: 'minimal',
    },
    demo: {
        spacing: 'var(--space-large)',
        density: 'comfortable',
    },
    reveal: {
        duration: 'var(--duration-ceremony)',
        spring: 'var(--spring-gentle)',
    },
    closing: {
        spacing: 'var(--space-xxlarge)',
        density: 'minimal',
    },
};
