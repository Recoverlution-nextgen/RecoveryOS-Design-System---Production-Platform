# ✅ DESIGN SYSTEM INSTALLED

The complete `design-system-bedrock` repository has been integrated into `/design-system/`.

## 📁 Structure

```
/design-system/
├── README.md                              # Design system overview
├── styles/
│   ├── tokens.css                         # All design tokens (colors, spacing, motion)
│   └── globals.css                        # Motion utilities, glass effects, keyframes
├── src/
│   └── primitives/
│       ├── index.ts                       # Export all primitives
│       ├── Text.tsx                       # Typography primitive
│       ├── Surface.tsx                    # Container/elevation primitive
│       ├── Stack.tsx                      # Layout primitive
│       ├── Button.tsx                     # Action primitive
│       ├── Icon.tsx                       # Icon wrapper (Lucide)
│       ├── Input.tsx                      # Form input primitive
│       ├── Divider.tsx                    # Separator primitive
│       ├── ProofStrip.tsx                 # Clinical stepper (Receipt → Transfer → Trajectory)
│       └── WhyThis.tsx                    # Contextual explanation primitive
└── docs/
    └── COMPONENT_BUILDS_CLEAN.md          # Copy specs for all 10 playground components
```

## 🎯 Usage in Your App

### Import Primitives
```tsx
import { Text, Surface, Stack, Button, Icon } from './design-system/src/primitives';
```

### Import Styles (in your main App.tsx or globals.css)
```css
@import "./design-system/styles/tokens.css";
@import "./design-system/styles/globals.css";
```

### Use Primitives
```tsx
<Surface tone="raised" glass={true} padding="var(--space-6)">
  <Stack gap={4}>
    <Text variant="h2" tone="primary">Headline</Text>
    <Text variant="body" tone="muted">Description text.</Text>
    <Button variant="primary">Run simulation</Button>
  </Stack>
</Surface>
```

## ⚖️ Design Laws (ENFORCED)

1. **NO CARD ON CARD** - Never nest Surface inside Surface
2. **NO ROUNDED CORNERS** - `--radius: 0px` (sharp 90° angles only)
3. **NO EMOJIS** - Zero emojis in UI code
4. **NO DASHES IN COPY** - Use sentences, not em-dashes
5. **TOKENS ONLY** - All colors via `var(--color-*)`, all spacing via `var(--space-*)`
6. **PRIMITIVES ONLY** - Build from the 9 primitives, not raw HTML
7. **CLINICAL COPY** - Verb-first, concrete, authoritative, warm, zero hype
8. **MOTION TOKENS** - Use `var(--motion-*)` and utility classes
9. **GLASS UTILITIES** - Use `glass={true}` or `.glass-*` classes
10. **SPEC COPY** - Follow `COMPONENT_BUILDS_CLEAN.md` exactly

## 🚀 Next Steps

1. **Build NEW components** using primitives from `/design-system/`
2. **Leave OLD components** untouched for now
3. **Over time**, rebuild existing components to use design system
4. **Push changes** back to GitHub when ready

## 📖 Copy Reference

All 10 playground component copy specs are in `/design-system/docs/COMPONENT_BUILDS_CLEAN.md`.

Use those headlines, subheads, CTAs, and microcopy exactly as written.

---

**This design system is now ready to use. Start building playground components with it!**
