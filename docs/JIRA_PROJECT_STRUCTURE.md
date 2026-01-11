# RecoveryOS - Jira Project Structure

## Project: REC (RecoveryOS)

---

## EPIC 1: Phase 0 - Asset System ✅ COMPLETE
**Status:** Done  
**Priority:** Highest  
**Labels:** `infrastructure`, `assets`, `phase-0`

### Issues:

#### REC-1: Asset Governance System Integration ✅
**Type:** Task  
**Status:** Done  
**Story Points:** 5  
**Description:**
- Created asset-governance.json with 3-tier governance (locked/controlled/expandable)
- Built TypeScript wrapper with AssetGovernance class
- Implemented 7 placement rules for component-driven fetching
- Added 5 label mappings for natural language resolution
- Performance budgets (400KB posters, 1.8MB loops)

**Acceptance Criteria:**
- ✅ JSON schema loaded and typed
- ✅ Placement rules working
- ✅ Label mapping resolves correctly
- ✅ Budget validation in dev mode

---

#### REC-2: Supabase Integration ✅
**Type:** Task  
**Status:** Done  
**Story Points:** 3  
**Description:**
- Installed @supabase/supabase-js v2.90.1
- Created supabase client with env vars
- Built asset fetching functions with governance awareness
- SQL schema documented in SUPABASE_SETUP.md

**Acceptance Criteria:**
- ✅ Supabase client configured
- ✅ Environment variables set
- ✅ Asset queries working
- ✅ Documentation complete

---

#### REC-3: React Asset Hooks ✅
**Type:** Task  
**Status:** Done  
**Story Points:** 3  
**Description:**
- useAssetsByComponent - placement-driven fetching
- useAssetsByLabels - natural language search
- useHeroScene - poster/loop with reduced motion support
- useAssetsByClass - filter by asset class

**Acceptance Criteria:**
- ✅ All 4 hooks implemented
- ✅ TypeScript types correct
- ✅ Loading/error states handled
- ✅ Reduced motion respected

---

## EPIC 2: Phase 1 - Infrastructure ✅ COMPLETE
**Status:** Done  
**Priority:** Highest  
**Labels:** `infrastructure`, `phase-1`

### Issues:

#### REC-4: Form Components ✅
**Type:** Task  
**Status:** Done  
**Story Points:** 3  
**Description:**
- Input/Textarea/Button components
- Full ARIA accessibility
- Semantic token styling
- Loading states

**Acceptance Criteria:**
- ✅ All form components built
- ✅ Accessibility audit passed
- ✅ Semantic tokens applied

---

#### REC-5: SEO Infrastructure ✅
**Type:** Task  
**Status:** Done  
**Story Points:** 2  
**Description:**
- Dynamic meta tag management
- OpenGraph + Twitter Cards
- JSON-LD structured data
- Canonical URLs

**Acceptance Criteria:**
- ✅ SEO component working
- ✅ Meta tags update dynamically
- ✅ Structured data generated

---

#### REC-6: Error Boundaries & Loading States ✅
**Type:** Task  
**Status:** Done  
**Story Points:** 2  
**Description:**
- React ErrorBoundary component
- LoadingSpinner, Skeleton, PageLoader
- Graceful error fallbacks
- Reduced motion support

**Acceptance Criteria:**
- ✅ ErrorBoundary catches errors
- ✅ Loading components styled
- ✅ Reduced motion respected

---

## EPIC 3: Phase 2A - Core Assets 🔄 IN PROGRESS
**Status:** In Progress  
**Priority:** Highest  
**Labels:** `assets`, `phase-2`, `core-12`

### Issues:

#### REC-7: Core 12 Asset Conversion 🔄
**Type:** Task  
**Status:** In Progress  
**Assignee:** Current User  
**Story Points:** 5  
**Description:**
Convert and optimize Core 12 assets to web formats:
- 4× Hero posters (AVIF primary, WebP fallback, ≤400KB each)
- 4× Hero loops (WebM primary, MP4 fallback, ≤1.8MB, 8-12s, seamless)
- 1× Noise texture (tileable PNG, ≤50KB)
- 1× Thread line texture (SVG preferred)
- 1× Seal pulse (CSS-based preferred, optional micro WebM)
- 1× Receipt object texture (for TraceTravel)

**Acceptance Criteria:**
- [ ] All 12 assets converted to web formats
- [ ] Budget constraints met (400KB/1.8MB)
- [ ] Fallback formats provided
- [ ] Assets optimized and compressed

**Technical Notes:**
- Use AVIF for hero posters (better compression than WebP)
- WebM VP9 codec for video loops
- Ensure loops are seamless (last frame = first frame)
- Test with prefers-reduced-motion

---

#### REC-8: Supabase Storage Setup 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 2  
**Blocked By:** REC-7  
**Description:**
1. Run SQL schema from SUPABASE_SETUP.md to create assets table
2. Create 'assets' storage bucket in Supabase
3. Upload Core 12 assets with metadata
4. Tag assets with governance IDs (scene-01, pillar_ER, etc.)

**Acceptance Criteria:**
- [ ] Assets table created with indexes
- [ ] Storage bucket configured (public read)
- [ ] All 12 assets uploaded
- [ ] Metadata and tags populated correctly
- [ ] Row Level Security policies set

**SQL Steps:**
```sql
-- Run in Supabase SQL Editor
CREATE TABLE assets (...); -- from SUPABASE_SETUP.md
CREATE STORAGE BUCKET assets;
-- Upload via Supabase UI or API
```

---

#### REC-9: Asset Governance Testing 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 2  
**Blocked By:** REC-8  
**Description:**
Test all asset governance features:
- Component placement rules (WalkthroughPresenter → hero assets)
- Label resolution (breathing → arousal_regulation)
- Budget validation warnings
- Hero scene hook with reduced motion
- Token mapping

**Acceptance Criteria:**
- [ ] useHeroScene returns poster + loop
- [ ] useAssetsByLabels resolves correctly
- [ ] Budget warnings show in console
- [ ] Reduced motion hides loops
- [ ] All 7 placement rules tested

---

## EPIC 4: Phase 2B - Narrative Components 📋 TO DO
**Status:** To Do  
**Priority:** High  
**Labels:** `components`, `phase-2`, `narrative`

### Issues:

#### REC-10: SpineExplorer Enhancement 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 5  
**Estimated Time:** 1.5 hours  
**Description:**
Enhance SpineAtlas with zoom/pan controls and system asset integration:
- Add zoom levels (glance/seed/thread/journey)
- Integrate thread overlay from assets
- Add pillar halos (6 variations)
- Depth dial controls zoom
- Node detail reveals at zoom

**Acceptance Criteria:**
- [ ] Zoom controls working (4 levels)
- [ ] System assets loaded via useAssetsByComponent('SpineExplorer')
- [ ] Thread overlay visible
- [ ] Pillar halos colored correctly
- [ ] Smooth zoom transitions

**Technical Approach:**
```tsx
const { assets } = useAssetsByComponent('SpineExplorer');
const threadAsset = assets.find(a => a.type === 'thread-texture');
const halos = assets.filter(a => a.type === 'halo' && a.pillar_id);
```

---

#### REC-11: ContinuityStream Component 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 5  
**Estimated Time:** 1.5 hours  
**Description:**
Timeline component showing proof continuity:
- Step rails with state dots
- Color-coded by stage (routed/delivered/sealed/reviewed)
- State assets via placement rules
- Auto-scroll to current step
- Responsive timeline layout

**Acceptance Criteria:**
- [ ] Timeline renders with steps
- [ ] State dots colored by stage
- [ ] Assets loaded via useAssetsByComponent('ContinuityStream')
- [ ] Auto-scroll working
- [ ] Responsive design

---

#### REC-12: OrchestrationFeed Component 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 3  
**Estimated Time:** 1 hour  
**Description:**
Dashboard-style feed showing orchestration logic:
- "Why routed" card (cyan rail)
- "What held" card (green tint)
- "What's next" card (purple lift)
- Dashboard assets via placement rules

**Acceptance Criteria:**
- [ ] 3 cards render correctly
- [ ] Color coding applied
- [ ] Assets loaded via useAssetsByComponent('OrchestrationFeed')
- [ ] Cards responsive

---

#### REC-13: TrustRails Component 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 3  
**Estimated Time:** 1 hour  
**Description:**
Trust settings interface (OS-style, not compliance):
- Governance visualization (LOCKED/CONTROLLED/EXPANDABLE)
- Toggle states (iOS-style switches)
- Green clarity accents
- Stability geometry (3 nested rings)

**Acceptance Criteria:**
- [ ] Governance rings render
- [ ] Toggle switches work
- [ ] Calm design aesthetic
- [ ] No warning colors

---

## EPIC 5: Phase 2C - WalkthroughPresenter Integration 📋 TO DO
**Status:** To Do  
**Priority:** High  
**Labels:** `components`, `phase-2`, `hero`

### Issues:

#### REC-14: WalkthroughPresenter Hero Integration 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 3  
**Blocked By:** REC-8  
**Description:**
Replace static hero tokens with dynamic asset fetching:
- Use useHeroScene hook for each scene
- Add loading states (PageLoader)
- Fallback to CSS gradients on error
- Respect prefers-reduced-motion
- Budget validation warnings

**Acceptance Criteria:**
- [ ] All 4 scenes fetch assets dynamically
- [ ] Loading spinner shows during fetch
- [ ] Poster displays immediately
- [ ] Loop swaps in after load
- [ ] Reduced motion shows poster only
- [ ] Graceful error handling

**Code Changes:**
```tsx
// Before: Static HERO_TOKENS
// After:
const { poster, loop, loading } = useHeroScene(sceneId);
if (loading) return <PageLoader />;
```

---

## EPIC 6: Phase 3 - Pages & Routing 📋 TO DO
**Status:** To Do  
**Priority:** Medium  
**Labels:** `pages`, `phase-3`, `routing`

### Issues:

#### REC-15: React Router Setup 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 2  
**Estimated Time:** 30 minutes  
**Description:**
- Install react-router-dom
- Create router.tsx with 6 routes
- Wrap in ErrorBoundary
- Add Suspense with PageLoader
- Navigation component

**Routes:**
1. `/` - Home (WalkthroughPresenter)
2. `/journey` - Journey page
3. `/framework` - Framework page
4. `/how-it-works` - How It Works page
5. `/contact` - Contact page
6. `/glossary` - Glossary page

---

#### REC-16: Home Page 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 3  
**Description:**
- WalkthroughPresenter (4 scenes)
- SEO: title, description, OG image
- Hero assets via useHeroScene
- CTA to /journey

---

#### REC-17: Journey Page 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 5  
**Description:**
- SpineExplorer component
- Journey-specific content
- SEO optimization
- Asset tags: journeys

---

#### REC-18: Framework Page 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 5  
**Description:**
- TrustRails component
- Governance visualization
- Framework explainer copy
- SEO optimization

---

#### REC-19: How It Works Page 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 5  
**Description:**
- ContinuityStream component
- OrchestrationFeed component
- Step-by-step explainer
- SEO optimization

---

#### REC-20: Contact Page 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 3  
**Description:**
- Form components (Input/Textarea/Button)
- Form validation
- Submit handler (email or API)
- SEO optimization

---

#### REC-21: Glossary Page 📋
**Type:** Story  
**Status:** To Do  
**Story Points:** 3  
**Description:**
- Searchable term list
- Pillar-based organization
- Copy from existing glossary docs
- SEO optimization

---

## EPIC 7: Phase 4 - Launch Prep 📋 TO DO
**Status:** To Do  
**Priority:** Low  
**Labels:** `launch`, `phase-4`

### Issues:

#### REC-22: Performance Optimization 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 3  
**Description:**
- Lighthouse audit (target: 90+ all metrics)
- Code splitting
- Image lazy loading
- Font optimization
- Bundle size analysis

---

#### REC-23: Accessibility Audit 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 3  
**Description:**
- WCAG 2.1 AA compliance
- Screen reader testing
- Keyboard navigation
- Focus management
- Color contrast check

---

#### REC-24: Browser Testing 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 2  
**Description:**
- Chrome/Edge
- Firefox
- Safari (macOS + iOS)
- Mobile responsive

---

#### REC-25: Analytics & Monitoring 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 2  
**Description:**
- Error tracking (Sentry integration point ready)
- Page view tracking
- Asset load performance
- User journey tracking

---

#### REC-26: Deploy to Production 📋
**Type:** Task  
**Status:** To Do  
**Story Points:** 2  
**Description:**
- Choose hosting (Vercel/Netlify recommended)
- Configure build pipeline
- Set up domains
- SSL certificates
- Deploy!

---

## Summary

**Total Story Points:** 79  
**Estimated Time to MVP:** ~10 hours remaining  

**Completed:** 21 points (Phase 0-1)  
**In Progress:** 5 points (REC-7)  
**Remaining:** 53 points (Phase 2B-4)

**Current Priority:**
1. ✅ Finish Core 12 asset conversion (REC-7)
2. ⏭️ Upload assets to Supabase (REC-8)
3. ⏭️ Test asset governance (REC-9)
4. ⏭️ Integrate WalkthroughPresenter (REC-14)

---

## Labels to Create in Jira

- `infrastructure` - Foundation systems
- `assets` - Asset-related work
- `components` - Component development
- `pages` - Page assembly
- `routing` - Navigation/routing
- `phase-0` - Asset system
- `phase-1` - Infrastructure
- `phase-2` - Core components
- `phase-3` - Pages & routes
- `phase-4` - Launch prep
- `core-12` - Core 12 assets
- `narrative` - Narrative components
- `hero` - Hero scenes
- `launch` - Production launch

---

## Workflow States

1. **To Do** - Not started
2. **In Progress** - Currently working
3. **Blocked** - Waiting on dependency
4. **Review** - Ready for review
5. **Done** - Complete

---

## Quick Import Instructions

1. Go to https://danielfincham.atlassian.net/jira/software/projects/REC/
2. Use bulk create or CSV import with this structure
3. Set up epics first, then add issues
4. Link issues with "Blocked By" relationships
5. Assign REC-7 to yourself (current task)

---

**Generated:** 9 January 2026  
**Project:** RecoveryOS  
**Status:** Asset system complete, asset conversion in progress
