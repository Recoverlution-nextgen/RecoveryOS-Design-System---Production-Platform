# GitHub Migration Guide
## Recoverlution Platform: Figma Make → GitHub Repository

**Repository:** https://github.com/Finchy23/recoverlution-platform  
**Current State:** Repository exists with `main` and `develop` branches  
**Migration Date:** December 23, 2024

---

## Overview

This guide provides step by step instructions to migrate the entire Recoverlution codebase from Figma Make to the GitHub repository, establishing the foundation for professional version control and Jira integration.

---

## Pre-Migration Checklist

- [x] GitHub repository created at `Finchy23/recoverlution-platform`
- [x] Main and develop branches exist
- [ ] Local development environment ready
- [ ] Git installed and configured
- [ ] GitHub authentication set up (SSH or HTTPS)

---

## Migration Strategy

### Phase 1: Initial Repository Setup (30 minutes)
**Goal:** Clone repository and set up proper branch structure

### Phase 2: Code Transfer (45 minutes)
**Goal:** Copy all files from Figma Make to local repository

### Phase 3: First Commit (15 minutes)
**Goal:** Push complete codebase to GitHub

### Phase 4: Jira Integration (20 minutes)
**Goal:** Connect GitHub to Jira SCRUM project

---

## Phase 1: Initial Repository Setup

### Step 1.1: Clone the Repository

Open your terminal and navigate to where you want the project:

```bash
cd ~/Projects  # Or wherever you keep your code
git clone https://github.com/Finchy23/recoverlution-platform.git
cd recoverlution-platform
```

### Step 1.2: Verify Branch Structure

```bash
git branch -a
# Should show:
# * main
#   remotes/origin/main
#   remotes/origin/develop
```

### Step 1.3: Switch to Develop Branch

We'll work on `develop` first, then merge to `main` when ready:

```bash
git checkout develop
```

---

## Phase 2: Code Transfer

### Step 2.1: Download Complete Codebase from Figma Make

**Option A: Manual Download (Recommended)**
1. In Figma Make, click the download/export button
2. Download as ZIP archive
3. Extract to a temporary folder

**Option B: Copy from Local Figma Make Cache**
If you have Figma Make files locally, copy them directly.

### Step 2.2: Copy Files to Repository

From the extracted folder or Figma Make workspace, copy ALL files to your cloned repository:

```bash
# Example if files are in ~/Downloads/recoverlution-export
cp -r ~/Downloads/recoverlution-export/* ~/Projects/recoverlution-platform/

# Or if copying from Figma Make local cache:
# Find the Figma Make workspace directory and copy from there
```

### Step 2.3: Verify File Structure

Check that all key directories exist:

```bash
ls -la
# Should see:
# components/
# docs/
# styles/
# supabase/
# utils/
# App.tsx
# package.json
# etc.
```

---

## Phase 3: First Commit

### Step 3.1: Review What's Being Added

```bash
git status
# Shows all untracked files
```

### Step 3.2: Create .gitignore

Before committing, create a proper `.gitignore` file:

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
logs/
*.log

# Temporary files
tmp/
temp/
*.tmp

# Supabase local
.supabase/

# Build artifacts
*.tsbuildinfo
EOF
```

### Step 3.3: Stage All Files

```bash
git add .
```

### Step 3.4: Create Initial Commit

```bash
git commit -m "Initial codebase migration from Figma Make

Complete platform codebase including:
- 350+ React components (infiniteK design system)
- Full marketing suite (Homepage, Platform, Science, Story, Therapy, Pricing)
- LUMA AI orchestration layer with 5-layer interface
- Journey system with immersive week-based architecture
- NaviCue arsenal (500 NaviCues, 20 delivery mechanisms)
- Sound Bites system (450 entries in Supabase)
- Complete documentation (100+ MD files)
- Supabase backend integration
- Stripe payment integration (Foundation £99, Professional £199)
- 6-Pillar Clinical Blueprint implementation

Database: wzeqlkbmqxlsjryidagf.supabase.co
Design System: infiniteK with brand colors #3E2BB8 and #5739FB
Architecture: ANCHOR RULE compliant (no card on card, no rounded corners)"
```

### Step 3.5: Push to GitHub

```bash
git push origin develop
```

### Step 3.6: Verify on GitHub

1. Go to https://github.com/Finchy23/recoverlution-platform
2. Switch to `develop` branch
3. Confirm all files are visible

---

## Phase 4: Branch Strategy Setup

### Step 4.1: Protect Main Branch

On GitHub:
1. Go to **Settings** → **Branches**
2. Click **Add rule** for `main` branch
3. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass
   - ✅ Include administrators

### Step 4.2: Create Feature Branch Template

Document the branch naming convention:

```bash
# Format: SCRUM-{issue-number}-{short-description}
# Examples:
git checkout -b SCRUM-11-github-repo-setup
git checkout -b SCRUM-15-ssl-configuration
git checkout -b SCRUM-22-journey-backend-api
```

---

## Phase 5: Jira-GitHub Integration

### Step 5.1: Install GitHub for Jira

1. Go to https://marketplace.atlassian.com/apps/1219592/github-for-jira
2. Click **Get it now** (free)
3. Select **danielfincham.atlassian.net**
4. Click **Install app**

### Step 5.2: Connect Repository

1. In Jira, go to **Settings** (⚙️) → **Apps** → **GitHub**
2. Click **Get started** or **Add an organization**
3. Click **Connect GitHub organization**
4. Authorize for account **Finchy23**
5. Grant access to **recoverlution-platform**
6. Click **Install & Authorize**

### Step 5.3: Link to SCRUM Project

1. Select **recoverlution-platform** repository
2. Choose **SCRUM** project from dropdown
3. Click **Connect**

### Step 5.4: Test Integration

Create a test commit to verify:

```bash
git checkout -b SCRUM-11-test-integration
echo "# Integration Test" > TEST.md
git add TEST.md
git commit -m "SCRUM-11 Test Jira-GitHub integration"
git push origin SCRUM-11-test-integration
```

Then check Jira issue SCRUM-11 for the **Development** section showing your commit.

---

## Phase 6: Establish Workflow

### Step 6.1: Standard Development Flow

```bash
# 1. Start with a Jira issue (e.g., SCRUM-15)
# 2. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b SCRUM-15-feature-name

# 3. Make changes and commit with issue key
git add .
git commit -m "SCRUM-15 Implemented feature X"

# 4. Push and create Pull Request
git push origin SCRUM-15-feature-name
# Create PR on GitHub with title: "SCRUM-15 Feature implementation"

# 5. Review, approve, merge to develop
# 6. Periodically merge develop → main for releases
```

### Step 6.2: Smart Commits (Advanced)

Use Jira smart commit syntax:

```bash
# Add comment to issue
git commit -m "SCRUM-15 #comment Added SSL configuration"

# Transition issue to Done
git commit -m "SCRUM-15 #done Completed SSL setup"

# Log time (2 hours)
git commit -m "SCRUM-15 #time 2h Configured certificates"

# Combine multiple actions
git commit -m "SCRUM-15 #comment Fixed certificate chain #time 1h #done"
```

---

## Post-Migration Checklist

After successful migration:

- [ ] All files visible in GitHub repository
- [ ] `.gitignore` properly configured
- [ ] Branch protection rules enabled on `main`
- [ ] Jira-GitHub integration active
- [ ] Test commit linked to Jira issue
- [ ] Development workflow documented
- [ ] Team members added to repository (if applicable)
- [ ] README.md updated with setup instructions

---

## Next Steps After Migration

### Immediate (Week 1)
1. **Update README.md** with setup instructions for new developers
2. **Create CONTRIBUTING.md** with coding standards
3. **Set up GitHub Actions** for CI/CD (from SCRUM Epic 2)
4. **Configure deployment** to Vercel/production

### Short Term (Weeks 2-4)
1. Start using Jira workflow for all development
2. Implement automated testing (SCRUM Epic 3)
3. Set up staging environment
4. Configure automated deployments

### Medium Term (Months 2-3)
1. Full production deployment
2. Monitoring and analytics setup
3. Team collaboration workflows
4. Documentation refinement

---

## Troubleshooting

### Issue: Git clone fails
**Solution:** Check GitHub authentication. Use SSH keys or Personal Access Token.

### Issue: Push rejected
**Solution:** Pull latest changes first: `git pull origin develop --rebase`

### Issue: Large files rejected
**Solution:** Use Git LFS for files over 50MB, or move to Supabase Storage.

### Issue: Jira integration not showing commits
**Solution:** 
1. Ensure issue key (SCRUM-XX) is in commit message
2. Check integration is connected in Jira settings
3. Wait up to 5 minutes for sync

---

## File Size Reference

Current codebase statistics:
- **Total Files:** ~650+
- **React Components:** ~350
- **Documentation Files:** ~100
- **Utility Files:** ~80
- **Supabase Functions:** ~30
- **Style Files:** ~15

Estimated repository size: ~50-100 MB (excluding node_modules)

---

## Support Resources

- **GitHub Docs:** https://docs.github.com
- **Jira Integration:** https://github.com/atlassian/github-for-jira
- **Git Basics:** https://git-scm.com/book/en/v2
- **Smart Commits:** https://support.atlassian.com/jira-software-cloud/docs/process-issues-with-smart-commits/

---

## Migration Completion Sign-Off

**Migrated By:** _________________  
**Date Completed:** _________________  
**Repository Status:** ☐ Clean ☐ Ready for Development  
**Integration Status:** ☐ Jira Connected ☐ Tested  
**Team Notified:** ☐ Yes ☐ No

---

*This migration establishes the professional foundation for Recoverlution platform development, enabling version control, collaborative workflows, and automated deployment pipelines.*
