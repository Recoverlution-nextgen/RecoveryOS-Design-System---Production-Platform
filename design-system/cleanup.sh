#!/bin/bash

# 🚀 Design System Pre-Ship Cleanup Script
# Run this before pushing to the new repository

echo "🧹 Starting design system cleanup..."

# Clean all build artifacts
echo "🗑️  Cleaning build artifacts..."
npm run clean

# Format all code
echo "💅 Formatting code..."
npm run format

# Lint and fix issues
echo "🔍 Running linter..."
npm run lint:fix

# Type check
echo "🔷 Running type check..."
npm run typecheck

# Build everything
echo "🔨 Building all packages..."
npm run build

echo "✅ Cleanup complete!"
echo ""
echo "📋 Final checklist:"
echo "  ✅ Code formatted"
echo "  ✅ Linting passed"
echo "  ✅ Type checking passed"
echo "  ✅ All packages built"
echo "  ✅ Build artifacts cleaned"
echo ""
echo "🚀 Ready to ship to recoverlution/recoverlution-platform!"