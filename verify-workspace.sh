#!/bin/bash

# RecoveryOS Workspace Setup Helper
# Run this to verify you're in the correct reorganized workspace

echo "🔍 RecoveryOS Workspace Verification"
echo "===================================="
echo ""

# Check current directory
echo "📍 Current Directory: $(pwd)"
echo ""

# Check if we're on main branch
echo "📋 Git Branch: $(git branch --show-current)"
echo ""

# Check for reorganized files
echo "📄 Key Files Check:"
echo "├── COMPARISON_GUIDE.md: $(test -f COMPARISON_GUIDE.md && echo '✅ EXISTS' || echo '❌ MISSING')"
echo "├── RecoveryOS-Dual-Version.code-workspace: $(test -f RecoveryOS-Dual-Version.code-workspace && echo '✅ EXISTS' || echo '❌ MISSING')"
echo "├── README.md: $(test -f README.md && echo '✅ EXISTS' || echo '❌ MISSING')"
echo ""

# Check directory structure
echo "📁 Directory Structure:"
echo "├── context/: $(test -d context && echo '✅ EXISTS' || echo '❌ MISSING')"
echo "├── docs/: $(test -d docs && echo '✅ EXISTS' || echo '❌ MISSING')"
echo "├── src/: $(test -d src && echo '✅ EXISTS' || echo '❌ MISSING')"
echo ""

# Check src cleanliness
src_files=$(find src -name "*.tsx" -o -name "*.ts" 2>/dev/null | wc -l)
src_dirs=$(find src -type d 2>/dev/null | wc -l)
echo "🧹 Source Directory: $src_files TypeScript files across $src_dirs directories"
echo ""

echo "🎯 If everything shows ✅, you're in the right workspace!"
echo ""
echo "📋 If VS Code Explorer doesn't show these files:"
echo "1. File → Close Folder"
echo "2. File → Open Folder..."
echo "3. Select: /Users/danielfincham/recoverlution-platform"
echo "4. Click Select Folder"
echo ""
echo "🚀 Then double-click RecoveryOS-Dual-Version.code-workspace for dual view!"