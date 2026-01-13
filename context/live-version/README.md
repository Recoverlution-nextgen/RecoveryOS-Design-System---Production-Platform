# RecoveryOS Live Version Reference

## 📋 Overview

This directory contains a reference copy of the current live RecoveryOS implementation from the `develop` branch. This version is currently live and uses FigmaMake for the frontend.

**⚠️ IMPORTANT**: This is for reference only. The live version should NOT be modified from this workspace.

## 🏗️ Current Live Tech Stack

Based on the develop branch package.json:

### Frontend
- **FigmaMake**: Current frontend framework
- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool

### Backend & Infrastructure
- **Supabase**: Database and backend services
- **Stripe**: Payment processing
- **Various UI libraries**: Radix UI, Tailwind CSS, Framer Motion

### Key Dependencies
- React 18.x
- TypeScript
- Supabase client
- Stripe integration
- UI component libraries (Radix, Tailwind, etc.)

## 📁 Reference Structure

```
context/live-version/reference/
├── src/                    # Live source code (FigmaMake-based)
├── package.json           # Live dependencies and scripts
├── public/               # Static assets (if any)
└── *.config.*           # Build configurations
```

## 🔄 Migration Context

### Current State
- ✅ **Live and stable** - Currently deployed and serving users
- ✅ **FigmaMake frontend** - Uses FigmaMake for UI components
- ✅ **Supabase backend** - Database and API services active

### Future State (This Workspace)
- 🔄 **Clean rebuild** - Building from scratch in main branch
- 🔄 **Modern frontend** - Moving away from FigmaMake
- 🔄 **Enhanced architecture** - Improved structure and performance

## 📊 Key Differences

| Aspect | Live Version (develop) | New Version (main) |
|--------|----------------------|-------------------|
| Frontend | FigmaMake | Modern React/TypeScript |
| Structure | Mixed organization | Clean, organized |
| Documentation | Scattered | Comprehensive archive |
| Assets | Unorganized | Systematic categorization |

## 🔍 How to Use This Reference

1. **Architecture Review**: Study the live implementation patterns
2. **Feature Analysis**: Understand current functionality
3. **Migration Planning**: Identify what to preserve vs. rebuild
4. **API Contracts**: Reference existing Supabase schemas
5. **User Flow Analysis**: Understand current user experience

## 🚫 What NOT to Do

- ❌ **Don't modify** files in this reference directory
- ❌ **Don't deploy** from this reference
- ❌ **Don't use** this as the basis for new development
- ❌ **Don't merge** changes back to develop branch

## 📞 Contact & Support

For questions about the live version:
- Check the develop branch on GitHub
- Review live deployment logs
- Contact the deployment team

---

**Reference Created**: January 11, 2026
**Live Version Status**: ✅ Active and serving users
**Reference Purpose**: Architecture analysis and migration planning