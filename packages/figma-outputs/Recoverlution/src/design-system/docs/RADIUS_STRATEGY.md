# Border Radius Strategy - infiniteK Law Enforcement

## infiniteK LAW 02: NO ROUNDED CORNERS

**Default enforcement: `--radius: 0px`**

---

## Token Configuration

### Primary Token (Enforced)
```css
--radius: 0px;  /* infiniteK LAW 02: NO ROUNDED CORNERS */
```

**This is the default used by all primitives and components.**

### Bedrock Source Reference (Testing Only)
```css
--radius-bedrock-source: 14px;  /* GitHub bedrock original */
```

**Available for:**
- Testing specific component behaviors
- Comparing bedrock vs infiniteK implementations
- Isolated experiments (not for production)

---

## Usage in Components

### ✅ Standard Usage (Enforced)
All primitives use the enforced token:

```tsx
// Surface.tsx
style={{
  borderRadius: 'var(--radius)'  // = 0px
}}
```

### ⚠️ Testing Override (Explicit Only)
If you need to test a component with the bedrock radius:

```tsx
// Experimental component
style={{
  borderRadius: 'var(--radius-bedrock-source)'  // = 14px (testing only)
}}
```

**Note:** Any use of `--radius-bedrock-source` should:
1. Be explicitly documented
2. Be temporary/experimental
3. Never reach production
4. Be flagged in code reviews

---

## Enforcement

### 1. Token Level
- `tokens.json` sets `shape.radius` to `"0px"`
- `tokens.css` sets `--radius` to `0px`

### 2. Script Level
```bash
./scripts/infinitek-check.sh ./src
```

Checks for:
- `rounded-*` utility classes
- `borderRadius:` inline styles
- Any violation of the radius rule

### 3. Linting Level
`.eslintrc.json` blocks:
- Tailwind `rounded-*` utilities
- Raw `borderRadius` in JSX

`.stylelintrc.json` blocks:
- Hex colors (separate rule)
- Important declarations

---

## Testing Threshold

**When you need to test radius values:**

1. **Create a test variant:**
```tsx
<Surface 
  level="raised" 
  style={{ borderRadius: 'var(--radius-bedrock-source)' }}
  data-test="radius-comparison"
>
  Testing rounded corners from bedrock
</Surface>
```

2. **Document the test:**
```tsx
// TESTING ONLY: Comparing bedrock 14px radius vs infiniteK 0px
// Remove before production
```

3. **Compare behaviors:**
- Visual hierarchy
- Focus states
- Accessibility
- Brand consistency

4. **Remove before merge:**
All `--radius-bedrock-source` usage should be removed before production deployment.

---

## Migration from Bedrock

If migrating a component from the bedrock repo:

1. **Check for radius usage:**
```bash
grep -r "borderRadius\|rounded-" component.tsx
```

2. **Replace with token:**
```tsx
// Before (bedrock)
borderRadius: '14px'

// After (infiniteK)
borderRadius: 'var(--radius)'  // = 0px
```

3. **Test visually:**
Compare the sharp-corner version with the original to ensure visual hierarchy is maintained.

---

## Why This Approach?

### infiniteK Design Law
**"No rounded corners throughout the entire design system"**

This creates:
- ✅ Sharp, clinical aesthetic
- ✅ Consistent visual language
- ✅ Clear hierarchy without softening
- ✅ Professional, medical-grade feel

### Bedrock Reference
Keeping the bedrock value available:
- Allows A/B comparison
- Documents the source system
- Enables testing if needed
- Doesn't compromise the default enforcement

---

## Quick Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `0px` | ✅ Default (all components) |
| `--radius-bedrock-source` | `14px` | ⚠️ Testing only (explicit override) |

---

**Summary:** `--radius: 0px` is enforced by default. The bedrock value is preserved as a testing reference but should never be used in production.
