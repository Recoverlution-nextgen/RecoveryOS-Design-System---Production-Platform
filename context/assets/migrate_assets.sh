#!/bin/bash

# RecoveryOS Asset Migration Script
# This script organizes scattered asset folders into the context archive

echo "🔍 Scanning for asset folders to organize..."

# Check for asset folders by category
found_assets=false

# Design Assets (asset, Asset)
design_folders=$(find . -maxdepth 1 -type d -name "*asset*" -o -name "*Asset*" | grep -v context)
if [[ -n "$design_folders" ]]; then
    echo "📁 Found design-assets folders:"
    echo "$design_folders"
    found_assets=true
fi

# UI Assets (C+F, C[0-9])
ui_folders=$(find . -maxdepth 1 -type d -name "*C+F*" -o -name "*C[0-9]*" | grep -v context)
if [[ -n "$ui_folders" ]]; then
    echo "📁 Found ui-assets folders:"
    echo "$ui_folders"
    found_assets=true
fi

# Icon Assets (icons, Icon)
icon_folders=$(find . -maxdepth 1 -type d -name "*icons*" -o -name "*Icon*" | grep -v context)
if [[ -n "$icon_folders" ]]; then
    echo "�� Found icon-assets folders:"
    echo "$icon_folders"
    found_assets=true
fi

# Component Assets (Components, Component)
component_folders=$(find . -maxdepth 1 -type d -name "*Components*" -o -name "*Component*" | grep -v context)
if [[ -n "$component_folders" ]]; then
    echo "📁 Found component-assets folders:"
    echo "$component_folders"
    found_assets=true
fi

# Brand Assets (brand, kit)
brand_folders=$(find . -maxdepth 1 -type d -name "*brand*" -o -name "*kit*" | grep -v context)
if [[ -n "$brand_folders" ]]; then
    echo "📁 Found brand-assets folders:"
    echo "$brand_folders"
    found_assets=true
fi

if [[ "$found_assets" = false ]]; then
    echo "✅ No scattered asset folders found - workspace is clean!"
    echo ""
    echo "Asset organization structure is ready:"
    echo "context/assets/"
    echo "├── design-assets/     # For asset/, asset2/, Asset Json/, etc."
    echo "├── ui-assets/         # For C+F/, C3/, C4/, etc."
    echo "├── icon-assets/       # For icons/, icons2/, Icon4/, etc."
    echo "├── component-assets/  # For Components Ideas/, Component Registry/"
    echo "├── brand-assets/      # For brand kit/, kit/"
    echo "└── archived-assets/   # For deprecated assets"
else
    echo ""
    echo "🚨 ACTION REQUIRED: Asset folders found that need organization!"
    echo ""
    echo "To organize assets, run:"
    echo "chmod +x context/assets/migrate_assets.sh"
    echo "./context/assets/migrate_assets.sh --move"
    echo ""
    echo "Or manually move folders according to the guide in:"
    echo "context/assets/ASSET_ORGANIZATION_GUIDE.md"
fi

echo ""
echo "📚 See context/assets/ASSET_ORGANIZATION_GUIDE.md for complete organization rules."
