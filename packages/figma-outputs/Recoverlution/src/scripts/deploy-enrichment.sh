#!/bin/bash
# ============================================================================
# RECOVERLUTION - MEDIA ENRICHMENT DEPLOYMENT SCRIPT
# ============================================================================
# Deploys the complete media enrichment system
# ============================================================================

set -e  # Exit on error

echo "🚀 Recoverlution Media Enrichment Deployment"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Deploy migration
echo -e "${BLUE}Step 1: Deploying database migration...${NC}"
supabase db push
echo -e "${GREEN}✅ Migration deployed${NC}"
echo ""

# Step 2: Add admin
echo -e "${BLUE}Step 2: Adding admin user...${NC}"
echo -e "${YELLOW}Running: psql \$SUPABASE_DB_URL -f /scripts/add-admin-01c6597f.sql${NC}"
psql $SUPABASE_DB_URL -f ./scripts/add-admin-01c6597f.sql
echo -e "${GREEN}✅ Admin user added${NC}"
echo ""

# Step 3: Deploy backend server
echo -e "${BLUE}Step 3: Deploying backend server (make-server-49b28b8a)...${NC}"
supabase functions deploy make-server-49b28b8a
echo -e "${GREEN}✅ Backend server deployed${NC}"
echo ""

# Step 4: Deploy relay function
echo -e "${BLUE}Step 4: Deploying relay function (relay_enrich_admin)...${NC}"
supabase functions deploy relay_enrich_admin
echo -e "${GREEN}✅ Relay function deployed${NC}"
echo ""

# Step 5: Verify deployment
echo -e "${BLUE}Step 5: Verifying deployment...${NC}"
echo ""

# Check health endpoint
echo -e "${YELLOW}Testing health endpoint...${NC}"
HEALTH_RESPONSE=$(curl -s "https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-49b28b8a/health" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}")

if echo "$HEALTH_RESPONSE" | grep -q "ok"; then
  echo -e "${GREEN}✅ Health check passed${NC}"
else
  echo -e "${RED}❌ Health check failed${NC}"
  echo "$HEALTH_RESPONSE"
fi
echo ""

# Check functions list
echo -e "${YELLOW}Verifying functions...${NC}"
supabase functions list | grep -E "(make-server-49b28b8a|relay_enrich_admin)" || true
echo ""

# Final summary
echo ""
echo "=============================================="
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo "=============================================="
echo ""
echo "Next steps:"
echo "  1. Navigate to Command Center 2"
echo "  2. Click 'Media Enrichment' studio"
echo "  3. Run enrichment with prefix: dashboard-assets"
echo ""
echo "Test commands:"
echo ""
echo "  # Test 401 (no auth)"
echo "  curl -i \"https://\${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin\""
echo ""
echo "  # Test 200 (with your admin token)"
echo "  curl -i \"https://\${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/relay_enrich_admin?prefix=dashboard-assets\" \\"
echo "    -H \"Authorization: Bearer YOUR_ACCESS_TOKEN\""
echo ""
echo "View logs:"
echo "  supabase functions logs relay_enrich_admin"
echo "  supabase functions logs make-server-49b28b8a"
echo ""
echo "Check audit log:"
echo "  psql \$SUPABASE_DB_URL -c \"SELECT * FROM enrichment_audit_log ORDER BY requested_at DESC LIMIT 5;\""
echo ""
