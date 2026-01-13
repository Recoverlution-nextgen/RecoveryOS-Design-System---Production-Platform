# Recoverlution Development Workflow
**Visual Reference: Figma Make → GitHub → Jira Integration**

---

## 🔄 Complete Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    RECOVERLUTION PLATFORM                        │
│                   Professional Workflow V1.0                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  NOTION     │────▶│   JIRA      │────▶│   GITHUB    │
│  Docs       │     │  Planning   │     │   Code      │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │                    │
      │              9 Epics             650+ files
      │             109 Stories          350+ components
      │                    │                    │
      └────────────────────┴────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  SUPABASE   │
                    │  Database   │
                    └─────────────┘
```

---

## 📊 Migration Flow

### Before: Figma Make Solo Development

```
                 ┌──────────────┐
                 │ Figma Make   │
                 │              │
                 │ • All code   │
                 │ • No version │
                 │   control    │
                 │ • No issues  │
                 │ • Solo work  │
                 └──────────────┘
                        │
                        ▼
                  [ Ship to web ]
```

### After: Professional Workflow

```
    ┌───────────┐         ┌────────────┐         ┌──────────┐
    │   JIRA    │  Issue  │   GITHUB   │ Deploy  │  VERCEL  │
    │  SCRUM-XX │────────▶│  Feature   │────────▶│   Live   │
    │           │         │  Branch    │         │   Site   │
    └───────────┘         └────────────┘         └──────────┘
         │                       │
         │                       │
         └───────────────────────┘
              Auto-synced via
              GitHub for Jira
```

---

## 🎯 Development Cycle

### 1. Planning (Jira)

```
┌─────────────────────────────────────────┐
│  JIRA BOARD                              │
├─────────────────────────────────────────┤
│                                          │
│  TO DO           IN PROGRESS    DONE    │
│  ┌─────────┐    ┌─────────┐   ┌─────┐  │
│  │SCRUM-15 │───▶│SCRUM-12 │──▶│SCRM-│  │
│  │User Auth│    │Journey  │   │ 11  │  │
│  └─────────┘    │Backend  │   └─────┘  │
│  ┌─────────┐    └─────────┘            │
│  │SCRUM-22 │                            │
│  │NaviCue  │                            │
│  └─────────┘                            │
└─────────────────────────────────────────┘
         │
         ▼ Pick issue
   Start working
```

### 2. Development (GitHub)

```
┌──────────────────────────────────────────────┐
│  GITHUB REPOSITORY                            │
├──────────────────────────────────────────────┤
│                                               │
│  main (protected)                             │
│  │                                            │
│  ├─ develop                                   │
│  │  │                                         │
│  │  ├─ SCRUM-15-user-authentication          │
│  │  │  ├─ commit: "SCRUM-15 Add login"       │
│  │  │  ├─ commit: "SCRUM-15 Add logout"      │
│  │  │  └─ commit: "SCRUM-15 #done Complete"  │
│  │  │                                         │
│  │  ├─ SCRUM-22-navicue-player               │
│  │  │  └─ commit: "SCRUM-22 Player UI"       │
│  │  │                                         │
│  │  └─ [merge PR] ────────────────────▶      │
│  │                                            │
│  └─ [release] ──────────────────────────▶    │
│                                               │
└──────────────────────────────────────────────┘
```

### 3. Integration (Automatic)

```
COMMIT MESSAGE              JIRA UPDATES
─────────────────────────────────────────────
"SCRUM-15 Add login"   ──▶  • Commit shown in
                              Development tab
                            • Link to GitHub

"SCRUM-15 #comment     ──▶  • Comment added
Testing complete"             to issue

"SCRUM-15 #time 2h"    ──▶  • Time logged
                              (2 hours)

"SCRUM-15 #done"       ──▶  • Issue moves to
                              DONE status
```

---

## 🌳 Branch Strategy

```
main (production)
│
├─ develop (integration)
│  │
│  ├─ SCRUM-15-user-authentication
│  │  └─ [Feature work happens here]
│  │
│  ├─ SCRUM-22-navicue-player
│  │  └─ [Feature work happens here]
│  │
│  └─ SCRUM-33-journey-backend
│     └─ [Feature work happens here]
│
└─ hotfix/SCRUM-99-critical-bug
   └─ [Emergency fixes only]
```

**Rules:**
- ✅ Feature branches from `develop`
- ✅ PRs merge back to `develop`
- ✅ `main` only updated from `develop` after testing
- ❌ Never commit directly to `main` or `develop`

---

## 🔄 Daily Workflow

### Morning
```
1. Check Jira board
   ↓
2. Pick issue (e.g., SCRUM-15)
   ↓
3. Create branch: SCRUM-15-description
   ↓
4. Start coding
```

### During Work
```
1. Make changes
   ↓
2. Commit frequently with issue key
   ↓
3. Push to GitHub regularly
   ↓
4. Jira automatically updates
```

### End of Day
```
1. Push final changes
   ↓
2. Update Jira issue status
   ↓
3. Create PR if feature complete
   ↓
4. Request review (if applicable)
```

---

## 📋 Commit Workflow

### Standard Commit

```bash
# Local changes
git add .
git commit -m "SCRUM-15 Implemented login UI"
git push origin SCRUM-15-user-authentication
```

```
RESULT IN GITHUB:
✓ Commit appears in branch
✓ Shows in commit history

RESULT IN JIRA:
✓ Commit linked in SCRUM-15
✓ Shows in Development section
✓ Link to GitHub commit
```

### Smart Commit

```bash
git commit -m "SCRUM-15 #comment Login tested #time 2h #done"
git push origin SCRUM-15-user-authentication
```

```
RESULT IN JIRA:
✓ Comment: "Login tested"
✓ Time logged: 2 hours
✓ Status: TO DO → DONE
✓ Commit linked
```

---

## 🔀 Pull Request Flow

```
1. CREATE BRANCH              2. MAKE COMMITS
┌──────────────┐             ┌──────────────┐
│ SCRUM-15-    │             │ commit #1    │
│ user-auth    │────────────▶│ commit #2    │
└──────────────┘             │ commit #3    │
                             └──────────────┘
                                    │
                                    ▼
                        3. CREATE PULL REQUEST
                             ┌──────────────┐
                             │ Title:       │
                             │ "SCRUM-15:   │
                             │ User Auth"   │
                             └──────────────┘
                                    │
                                    ▼
                          4. CODE REVIEW
                             ┌──────────────┐
                             │ Reviewer     │
                             │ checks code  │
                             │ & approves   │
                             └──────────────┘
                                    │
                                    ▼
                           5. MERGE TO DEVELOP
                             ┌──────────────┐
                             │ Feature now  │
                             │ in develop   │
                             │ branch       │
                             └──────────────┘
                                    │
                                    ▼
                          6. JIRA AUTO-UPDATE
                             ┌──────────────┐
                             │ SCRUM-15     │
                             │ shows merged │
                             │ PR status    │
                             └──────────────┘
```

---

## 🎯 Epic → Story → Commit Hierarchy

```
EPIC 4: Core Platform Features
│
├─ STORY SCRUM-15: User Authentication
│  │
│  ├─ COMMIT: "SCRUM-15 Add login form component"
│  ├─ COMMIT: "SCRUM-15 Integrate Supabase auth"
│  ├─ COMMIT: "SCRUM-15 Add error handling"
│  └─ COMMIT: "SCRUM-15 #done Complete authentication"
│
├─ STORY SCRUM-16: User Profile
│  │
│  ├─ COMMIT: "SCRUM-16 Create profile component"
│  └─ COMMIT: "SCRUM-16 Add update functionality"
│
└─ STORY SCRUM-17: Settings Page
   └─ [commits...]
```

---

## 📊 Information Flow

### Code Changes → Jira Updates

```
DEVELOPER ACTION              AUTOMATIC RESULT
────────────────────────────────────────────────
Create branch:           ──▶  Branch visible in
SCRUM-15-feature              Jira Development tab

Commit with "SCRUM-15"   ──▶  Commit linked to
                              issue SCRUM-15

Create PR with          ──▶  PR status shown
"SCRUM-15: Title"            in Jira issue

Merge PR                ──▶  Deployment status
                              updated in Jira

Smart commit #done      ──▶  Issue transitions
                              to DONE status
```

---

## 🔍 Where to Find What

```
┌──────────────────────────────────────────────┐
│  PLATFORM COMPONENT           LOCATION        │
├──────────────────────────────────────────────┤
│  Project planning        │  Jira Board       │
│  Issue tracking          │  Jira Issues      │
│  Source code             │  GitHub           │
│  Documentation           │  Notion + /docs   │
│  Database                │  Supabase         │
│  Deployments (future)    │  Vercel           │
│  CI/CD (future)          │  GitHub Actions   │
└──────────────────────────────────────────────┘
```

---

## 🚀 Release Process (Future)

```
DEVELOP BRANCH          RELEASE              MAIN BRANCH
─────────────────────────────────────────────────────────
Multiple features  ──▶  Test thoroughly  ──▶  Deploy to
merged and ready       Create release         production
                       tag (v1.2.0)
                                              
SCRUM-15 ✓                                    Update live
SCRUM-16 ✓                                    site
SCRUM-17 ✓                                    
SCRUM-18 ✓            Merge develop      ──▶ Users see
                      to main                 new features
```

---

## 📈 Team Collaboration

### Single Developer

```
Developer ──▶ Create branch
          ──▶ Make commits
          ──▶ Create PR
          ──▶ Merge (self-review)
          ──▶ Deploy
```

### Team (Future)

```
Developer A ──▶ Feature branch A ──┐
                                    ├──▶ Develop ──▶ Main
Developer B ──▶ Feature branch B ──┤
                                    │
Developer C ──▶ Feature branch C ──┘
        │
        └──▶ Code review
        └──▶ Approval required
        └──▶ Tests must pass
```

---

## 🎓 Learning Path

### Week 1: Basics
- Clone repository
- Create feature branch
- Make commits with Jira keys
- Push to GitHub
- See Jira updates

### Week 2: Workflow
- Create pull requests
- Use smart commits
- Navigate Jira board
- Update issue statuses

### Week 3: Advanced
- Resolve merge conflicts
- Rebase branches
- Review others' code
- Manage releases

---

## 🛠️ Tools Integration

```
┌─────────────────────────────────────────────┐
│             DEVELOPMENT STACK                │
├─────────────────────────────────────────────┤
│                                              │
│  Notion      ──▶  Documentation              │
│  Jira        ──▶  Project Management         │
│  GitHub      ──▶  Version Control            │
│  Supabase    ──▶  Backend/Database           │
│  Vercel      ──▶  Deployment (future)        │
│  Actions     ──▶  CI/CD (future)             │
│                                              │
│  All connected via:                          │
│  • GitHub for Jira integration               │
│  • Webhook automation                        │
│  • API integrations                          │
│                                              │
└─────────────────────────────────────────────┘
```

---

## ✅ Success Indicators

### Good Workflow
```
✓ Every commit has SCRUM-XX
✓ Branches follow naming convention
✓ PRs have clear descriptions
✓ Jira issues stay updated
✓ Code reviewed before merge
✓ Main branch always deployable
```

### Workflow Issues
```
✗ Commits without Jira keys
✗ Working directly on main
✗ Unclear commit messages
✗ Stale branches
✗ Unreviewed merges
```

---

## 🎯 Quick Reference

### Create Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b SCRUM-15-feature-name
```

### Commit Changes
```bash
git add .
git commit -m "SCRUM-15 Description of change"
git push origin SCRUM-15-feature-name
```

### Smart Commit
```bash
git commit -m "SCRUM-15 #comment Note #time 2h #done"
```

### Create PR
```
Title: SCRUM-15: Feature Name
Description: What changed and why
Link: Closes SCRUM-15
```

---

**This workflow transforms solo development into professional team-ready collaboration!** 🚀

---

*Last Updated: December 23, 2024*
