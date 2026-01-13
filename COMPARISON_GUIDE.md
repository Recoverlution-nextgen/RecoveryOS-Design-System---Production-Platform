# RecoveryOS Version Comparison Guide

## 🎯 Side-by-Side Development Environment

This workspace contains **both** the live RecoveryOS implementation AND the clean rebuild simultaneously, enabling easy comparison and reference during development.

## � Quick Setup

**Option 1: One-Click Setup**
- Double-click `RecoveryOS-Dual-Version.code-workspace` to open both versions side-by-side instantly!

**Option 2: Manual Setup**
1. Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type: "Workspaces: Add Folder to Workspace..."
3. Navigate to: `context/live-version/reference`
4. Select the `reference` folder and click "Add"

## �📁 Directory Structure

```
RecoveryOS Workspace/
├── 📁 src/                          # 🆕 NEW VERSION (Clean Rebuild)
│   ├── App.tsx                     # Modern React/TypeScript
│   ├── main.tsx                    # Clean entry point
│   ├── components/                 # Organized components
│   └── [services/, pages/, etc.]   # Clean architecture
│
├── 📁 context/live-version/reference/  # ✅ LIVE VERSION (FigmaMake)
│   ├── src/                        # FigmaMake implementation
│   ├── package.json               # Live dependencies
│   └── [config files]             # Live configurations
│
└── 📁 [docs/, context/, etc.]      # Documentation & Context
```

## 🔍 Quick Comparison Commands

### View Both Structures
```bash
# Live version file structure
find context/live-version/reference/src -type f | head -20

# New version file structure
find src -type f | head -20
```

### Compare Dependencies
```bash
# See dependency differences
diff context/live-version/reference/package.json package.json
```

### Compare Specific Files
```bash
# Compare main entry points
diff context/live-version/reference/src/main.tsx src/main.tsx

# Compare app components
diff context/live-version/reference/src/App.tsx src/App.tsx
```

## 📊 Version Comparison Matrix

| Feature | Live Version | New Version | Status |
|---------|-------------|-------------|--------|
| **Frontend** | FigmaMake | Modern React/TypeScript | 🔄 Migrating |
| **Architecture** | Mixed structure | Clean, organized | ✅ Complete |
| **Documentation** | Scattered | Comprehensive archive | ✅ Complete |
| **Assets** | Unorganized | Systematic categories | ✅ Complete |
| **Dependencies** | Live stack | Modern stack | 🔄 Planning |

## 🚀 Development Workflow

### When Building New Features
1. **Reference Live**: Check `context/live-version/reference/src/` for existing patterns
2. **Build Clean**: Implement in `src/` with modern architecture
3. **Compare**: Use diff commands to ensure feature parity
4. **Document**: Update migration notes in `docs/migration/`

### When Debugging
1. **Check Live Behavior**: Reference live implementation
2. **Compare Logic**: Diff similar files between versions
3. **Test New**: Validate in clean rebuild environment

## 🛡️ Safety Guidelines

- ✅ **Live Reference**: Read-only, never modify
- ✅ **Clean Separation**: Live code isolated from development
- ✅ **Git Safety**: Main branch focused on rebuild only
- ✅ **No Cross-Contamination**: Keep implementations separate

## 📞 Quick Access

### Live Version
- **Source**: `context/live-version/reference/src/`
- **Config**: `context/live-version/reference/package.json`
- **Docs**: `context/live-version/README.md`

### New Version
- **Source**: `src/`
- **Config**: `package.json`
- **Docs**: `README.md`

## 🎯 Next Steps

1. **Feature Analysis**: Compare components between versions
2. **API Migration**: Map live endpoints to new architecture
3. **UI Redesign**: Reference live UX while building modern UI
4. **Testing**: Ensure feature parity during rebuild

---

**Guide Created**: January 11, 2026
**Environment**: ✅ Dual-version workspace ready
**Status**: 🟢 Ready for side-by-side development