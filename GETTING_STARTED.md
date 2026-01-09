# RecoveryOS: Getting Started Now

## What's Running Right Now

✅ **Web App**: `http://localhost:5173` (Vite dev server)  
✅ **Motion Architecture**: Fully integrated (7 components, 6 hooks, 6 sequences)  
✅ **Component Library**: 11 production-ready components  
✅ **Design Tokens**: Generated (CSS, TypeScript, iOS/Android JSON)  
✅ **Event Schema**: Immutable, auditable proof capture  

## Quick Start: Test the System

### 1. Try Proof Capture (Seal Button)
1. Go to `http://localhost:5173`
2. You're on **Companion** view (person's perspective)
3. Find the **UniversalPlayer** card with the seal button
4. Click the seal button
5. Watch: Seal compresses → Success pulse (green glow) → Receipt animates in
6. Proof added to your **ProofStack** below

**What's Happening**:
- `useProofCapture()` hook triggered
- Event created with immutable `delivery_id` (UUID)
- Event logged to localStorage
- MotionProofPill celebrates with bounce + color shift
- Clinician sees event in Console view

### 2. Try View Navigation (Three Altitudes)
1. In header, click **Console** button
2. Watch: Current view fades out, Console fades in (stagger children)
3. You're now seeing **clinician perspective**
   - Event stream (all your proof captures)
   - Heat trend (your state over time)
   - Success rate (% captured vs. attempted)
   - Consent adherence (scopes enabled)
4. Click **Command** button
5. You're now seeing **organisation perspective**
   - Delivery count (total interventions)
   - Compliance % (auditable sessions)
   - Escalation audit (who was contacted, when)
6. Click **Companion** to go back

**What's Happening**:
- `useViewTransition()` hook triggered on view change
- MotionView fades out old view, fades in new view
- Same event store shared across all three views
- Each view shows different signals from same data

### 3. Try Theme Shift (Calm ↔ Heat)
1. In header, find **Theme** buttons (Calm / Heat)
2. Currently on **Calm** (cool grays, soft accents)
3. Click **Heat** button
4. Watch: Colors shift, accents brighten, contrast increases
5. Click back to **Calm**

**What's Happening**:
- `useHeatShift()` hook triggers on theme toggle
- Body class changes from `.theme-calm` to `.theme-heat`
- CSS variables animate (400ms ease-in-out)
- Accent alpha increases (0.14 → 0.25) in heat mode
- Perfect for signaling escalation context

### 4. Try Consent & Quiet Hours
1. On Companion view, scroll down to **ConsentSheet**
2. You see three toggles:
   - State Signals (log your state?)
   - Notifications (get notifications?)
   - Escalation Contact (include in escalation signal?)
3. Try toggling each
4. Scroll to **QuietHoursPicker**
5. Set start/end times (e.g., 10pm → 8am)
6. Click seal button again
7. In dev console, see `IntegrityLog` includes `quiet_hours_active: true`

**What's Happening**:
- `useConsent()` hook tracks scope toggles
- `useQuietHours()` hook manages quiet period
- Every event includes consent context
- Console and CommandCenter respect quiet hours
- Escalation suppressed during quiet hours (unless alert level exceeds threshold)

### 5. Try Escalation
1. On Companion view, scroll to **EscalationChooser**
2. See three options:
   - Self-stabilise only (no escalation)
   - Clinician (primary contact)
   - Support person (designated person)
3. Select different options
4. (Currently, escalation is not auto-triggered; this is for user selection)
5. In Console view, you'd see escalation choice logged

**What's Happening**:
- User selects escalation pathway upfront
- When system detects heat > threshold, escalation selected
- MotionAlert wraps escalation with shake + pulse + glow
- Clinician gets alert via Console
- Organisation gets audit trail in CommandCenter

## Test Accessibility

### Try Reduced Motion
1. **macOS**: System Preferences → Accessibility → Display → Reduce motion (ON)
2. Reload `http://localhost:5173`
3. Click seal button
4. Notice: No animation, but proof still captures!
5. Switch views: Instant, no fade transition
6. Toggle heat: Instant color change (no animation)

**What's Happening**:
- `useReducedMotion()` hook detects system preference
- All MotionCard, MotionView, MotionList animations disabled
- UX still works perfectly, just without motion
- Essential info (proof captured, view changed) still visible

## Explore Code

### Design Tokens
```bash
# View token source
open packages/ui/src/styles/theme.css

# View CSS variables (calm mode)
# --color-surface-base: hsl(200, 12%, 8%);
# --accent-primary: hsl(160, 70%, 48%);
# --accent-alpha: 0.14;

# In heat mode:
# Same colors, but --accent-alpha: 0.25 (brighter accents)
```

### Motion Architecture
```bash
# View motion config (spring presets, durations)
open packages/ui/src/motion/config.ts

# View orchestration hooks
open packages/ui/src/motion/hooks.ts

# View animated components
open packages/ui/src/motion/components.tsx

# View sequences (multi-step choreography)
open packages/ui/src/motion/sequences.ts
```

### Event Schema
```bash
# View event types and factories
open packages/ui/src/types/events.ts

# View persistence hooks
open packages/ui/src/hooks/index.ts
```

### Web App
```bash
# View main app (view toggle, motion orchestration)
open apps/web/src/App.tsx

# View entry point (style imports)
open apps/web/src/main.tsx
```

## Development Commands

```bash
# Generate tokens (JSON → CSS/TS/iOS/Android)
npm run tokens

# Start Vite dev server (auto-reload)
npm run web:dev

# Build for production
npm run web:build

# Run Storybook (component library + design documentation)
npm run storybook

# Type check
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

## Storybook (Component Library)

If you want to see all components in isolation:

```bash
npm run storybook
# Opens http://localhost:6006
```

Features:
- All 11 components with stories
- Calm / Heat theme toggle (toolbar)
- Motion component variants
- Accessibility panel
- Source code inspector

## Key Files to Review

| File | Purpose |
|------|---------|
| `SYSTEM_COMPLETE.md` | Full system architecture overview |
| `MOTION.md` | Motion choreography guide |
| `packages/ui/src/motion/config.ts` | Spring physics + duration tokens |
| `packages/ui/src/motion/hooks.ts` | Orchestration state management |
| `packages/ui/src/motion/components.tsx` | Animated primitives (7 components) |
| `packages/ui/src/motion/sequences.ts` | Multi-step choreography |
| `packages/ui/src/types/events.ts` | Event schema + proof receipts |
| `apps/web/src/App.tsx` | Main app with motion + view toggle |

## Test Checklist

As you interact with the system, verify:

- [ ] Seal button triggers proof capture animation
- [ ] ProofStack animates new proof in (cascade effect)
- [ ] View toggle (Companion → Console → Command) fades smoothly
- [ ] Heat button shifts colors + accents (400ms)
- [ ] Calm button returns to cool grays (400ms)
- [ ] Consent toggles enable/disable scopes
- [ ] Quiet hours persist when you reload
- [ ] Events logged to localStorage (open DevTools → Application → Local Storage)
- [ ] All animations stop when `prefers-reduced-motion: reduce` is ON
- [ ] Console shows event stream + heat trend
- [ ] CommandCenter shows compliance metrics + escalation audit

## Troubleshooting

### "Port 5173 already in use"
```bash
# Kill the existing process
lsof -ti :5173 | xargs kill -9

# Or use a different port
npm run web:dev -- --port 3000
```

### "Module not found: @ui/..."
```bash
# Rebuild node_modules
rm -rf node_modules package-lock.json
npm install
npm run tokens
```

### "Motion animations not smooth (jank)"
- Open Chrome DevTools → Performance tab
- Record while clicking seal button
- Look for dropped frames or long tasks
- Likely causes: Large event list, slow device
- Solution: Reduce list size in test data, use requestAnimationFrame profiling

### "Theme toggle doesn't work"
- Check localStorage in DevTools → Application
- Look for `recovery-os-theme` key
- If missing, try toggling theme again
- Reload page if stuck

## Next Steps for You

### Immediate
1. ✅ Click seal button → watch proof celebrate
2. ✅ Switch views → watch transitions
3. ✅ Toggle heat/calm → watch colors shift
4. ✅ Enable quiet hours → capture proof → check log
5. ✅ Set `prefers-reduced-motion` → verify animations stop

### Short Term
6. Read `MOTION.md` (motion architecture detail)
7. Read `SYSTEM_COMPLETE.md` (full system overview)
8. Review `packages/ui/src/motion/` files (understand choreography)
9. Open Storybook (`npm run storybook`) to see all components

### Medium Term
10. Add your own components to library
11. Adjust motion timings (edit `config.ts` durations)
12. Add new animation sequences
13. Integrate with backend (replace mock events with API calls)

### Long Term
14. Build iOS app (consume iOS token JSON)
15. Build Android app (consume Android token JSON)
16. Add analytics (track which animations users see)
17. User testing with real clinicians + persons in recovery

---

**You're all set!** Open `http://localhost:5173` and start exploring. Click the seal button to see the magic happen. 🚀

Questions? Check `MOTION.md` or `SYSTEM_COMPLETE.md`.
