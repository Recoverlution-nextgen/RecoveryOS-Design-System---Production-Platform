# GitHub Migration: Quick Start
**Get the Recoverlution codebase into GitHub in 4 steps**

---

## Prerequisites

✅ GitHub repository exists at: `https://github.com/Finchy23/recoverlution-platform`  
✅ You have Git installed locally  
✅ You have GitHub authentication configured (SSH or HTTPS)

---

## Step 1: Clone the Repository (2 minutes)

Open terminal and run:

```bash
cd ~/Projects  # Or wherever you keep code
git clone https://github.com/Finchy23/recoverlution-platform.git
cd recoverlution-platform
```

Verify you see `main` and `develop` branches:
```bash
git branch -a
```

Switch to develop:
```bash
git checkout develop
```

---

## Step 2: Get Files from Figma Make (5 minutes)

### Option A: Download from Figma Make UI
1. In Figma Make, find the export/download option
2. Download project as ZIP
3. Extract to temporary folder

### Option B: If Figma Make has local files
Find the local cache directory and note the path.

---

## Step 3: Copy All Files (3 minutes)

From your terminal, copy everything to the repository:

```bash
# If you downloaded to ~/Downloads/recoverlution-export:
cp -r ~/Downloads/recoverlution-export/* ~/Projects/recoverlution-platform/

# OR if you know the Figma Make local path:
# cp -r /path/to/figma-make/workspace/* ~/Projects/recoverlution-platform/
```

Verify files copied:
```bash
ls -la
# Should see: components/, docs/, styles/, supabase/, utils/, App.tsx, etc.
```

---

## Step 4: Push to GitHub (5 minutes)

### 4a. Add .gitignore (if not already there)
```bash
# The .gitignore file has already been created in this workspace
# It will be included when you copy files
```

### 4b. Stage all files
```bash
git add .
```

### 4c. Create initial commit
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

### 4d. Push to GitHub
```bash
git push origin develop
```

### 4e. Verify on GitHub
1. Go to https://github.com/Finchy23/recoverlution-platform
2. Click "develop" branch dropdown
3. Confirm all files are visible

---

## ✅ Success Checklist

After pushing, verify:

- [ ] All components visible in `/components` folder on GitHub
- [ ] Documentation in `/docs` folder
- [ ] Styles in `/styles` folder
- [ ] Supabase functions in `/supabase/functions/server`
- [ ] README.md displays correctly
- [ ] .gitignore is present (protects secrets)
- [ ] No `.env` files committed (check!)

---

## 🚨 Troubleshooting

### "Permission denied" when pushing
**Fix:** Set up GitHub authentication (SSH key or Personal Access Token)

### "Large files" error
**Fix:** Files over 100MB need Git LFS. Move large assets to Supabase Storage instead.

### "Nothing to commit"
**Fix:** Make sure you copied files to the correct directory. Run `ls -la` to verify.

### Push rejected
**Fix:** Pull latest first: `git pull origin develop --rebase`

---

## Next Steps

Once code is in GitHub:

1. **Verify everything pushed** (5 min)
2. **Set up Jira-GitHub integration** (20 min) - See [GITHUB-MIGRATION-GUIDE.md](/GITHUB-MIGRATION-GUIDE.md) Phase 5
3. **Make a test commit** with Jira issue key (5 min)
4. **Start using Jira workflow** for development

---

## Help

**Full Migration Guide:** [GITHUB-MIGRATION-GUIDE.md](/GITHUB-MIGRATION-GUIDE.md)  
**Repository:** https://github.com/Finchy23/recoverlution-platform  
**Jira Board:** https://danielfincham.atlassian.net/jira/software/projects/SCRUM/boards/1

---

**Total Time:** ~15 minutes  
**Difficulty:** Easy  
**Prerequisites:** Git installed, GitHub access

---

*Let's get this code where it belongs! 🚀*
