#!/bin/bash
# ============================================================================
# RECOVERLUTION - MEDIA ENRICHMENT TEST SCRIPT
# ============================================================================
# Tests the enrichment system end-to-end
# ============================================================================

set -e

echo "🧪 Testing Media Enrichment System"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check environment variables
if [ -z "$SUPABASE_PROJECT_ID" ]; then
  echo -e "${RED}❌ SUPABASE_PROJECT_ID not set${NC}"
  echo "Export it first: export SUPABASE_PROJECT_ID=your-project-id"
  exit 1
fi

if [ -z "$SUPABASE_ANON_KEY" ]; then
  echo -e "${RED}❌ SUPABASE_ANON_KEY not set${NC}"
  echo "Export it first: export SUPABASE_ANON_KEY=your-anon-key"
  exit 1
fi

BASE_URL="https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1"

echo -e "${BLUE}Base URL: ${BASE_URL}${NC}"
echo ""

# Test 1: Health Check
echo -e "${BLUE}Test 1: Health Check${NC}"
echo "Testing: GET /make-server-49b28b8a/health"
HEALTH_RESPONSE=$(curl -s "${BASE_URL}/make-server-49b28b8a/health" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}")

if echo "$HEALTH_RESPONSE" | grep -q "ok"; then
  echo -e "${GREEN}✅ Health check passed${NC}"
  echo "Response: $HEALTH_RESPONSE"
else
  echo -e "${RED}❌ Health check failed${NC}"
  echo "Response: $HEALTH_RESPONSE"
fi
echo ""

# Test 2: 401 Unauthorized (No Auth)
echo -e "${BLUE}Test 2: 401 Unauthorized (No Auth)${NC}"
echo "Testing: GET /relay_enrich_admin (no Authorization header)"
RESPONSE_401=$(curl -s -w "\n%{http_code}" "${BASE_URL}/relay_enrich_admin")
HTTP_CODE_401=$(echo "$RESPONSE_401" | tail -n 1)
BODY_401=$(echo "$RESPONSE_401" | head -n -1)

if [ "$HTTP_CODE_401" = "401" ]; then
  echo -e "${GREEN}✅ 401 test passed${NC}"
  echo "HTTP Code: $HTTP_CODE_401"
  echo "Response: $BODY_401"
else
  echo -e "${RED}❌ 401 test failed (expected 401, got $HTTP_CODE_401)${NC}"
  echo "Response: $BODY_401"
fi
echo ""

# Test 3: Admin Check
echo -e "${BLUE}Test 3: Admin UUID Verification${NC}"
echo "Checking if UUID 01c6597f-bb21-4e02-ad66-44370743c223 is in app_admins..."

if [ -z "$SUPABASE_DB_URL" ]; then
  echo -e "${YELLOW}⚠️  SUPABASE_DB_URL not set, skipping database check${NC}"
else
  ADMIN_CHECK=$(psql $SUPABASE_DB_URL -t -c "SELECT COUNT(*) FROM app_admins WHERE user_id = '01c6597f-bb21-4e02-ad66-44370743c223';")
  ADMIN_COUNT=$(echo $ADMIN_CHECK | tr -d ' ')
  
  if [ "$ADMIN_COUNT" = "1" ]; then
    echo -e "${GREEN}✅ Admin UUID found in app_admins table${NC}"
  else
    echo -e "${RED}❌ Admin UUID NOT found in app_admins table${NC}"
    echo "Run: psql \$SUPABASE_DB_URL -f ./scripts/add-admin-01c6597f.sql"
  fi
fi
echo ""

# Test 4: With Access Token (if provided)
echo -e "${BLUE}Test 4: Authenticated Request${NC}"
if [ -z "$ACCESS_TOKEN" ]; then
  echo -e "${YELLOW}⚠️  ACCESS_TOKEN not set, skipping authenticated test${NC}"
  echo "To test with your token:"
  echo "  export ACCESS_TOKEN=your-access-token"
  echo "  ./scripts/test-enrichment.sh"
else
  echo "Testing: GET /relay_enrich_admin?prefix=dashboard-assets (with token)"
  RESPONSE_200=$(curl -s -w "\n%{http_code}" "${BASE_URL}/relay_enrich_admin?prefix=dashboard-assets" \
    -H "Authorization: Bearer ${ACCESS_TOKEN}")
  HTTP_CODE_200=$(echo "$RESPONSE_200" | tail -n 1)
  BODY_200=$(echo "$RESPONSE_200" | head -n -1)
  
  if [ "$HTTP_CODE_200" = "200" ]; then
    echo -e "${GREEN}✅ Authenticated request succeeded${NC}"
    echo "HTTP Code: $HTTP_CODE_200"
    echo "Response: $BODY_200"
  elif [ "$HTTP_CODE_200" = "403" ]; then
    echo -e "${RED}❌ 403 Forbidden - User not in app_admins${NC}"
    echo "Response: $BODY_200"
    echo "Fix: Run ./scripts/add-admin-01c6597f.sql"
  else
    echo -e "${RED}❌ Request failed (HTTP $HTTP_CODE_200)${NC}"
    echo "Response: $BODY_200"
  fi
fi
echo ""

# Test 5: Database Tables
echo -e "${BLUE}Test 5: Database Tables${NC}"
if [ -z "$SUPABASE_DB_URL" ]; then
  echo -e "${YELLOW}⚠️  SUPABASE_DB_URL not set, skipping database check${NC}"
else
  echo "Checking required tables exist..."
  
  TABLES=$(psql $SUPABASE_DB_URL -t -c "SELECT tablename FROM pg_tables WHERE tablename IN ('app_admins', 'enrichment_audit_log', 'media_assets') ORDER BY tablename;")
  
  if echo "$TABLES" | grep -q "app_admins"; then
    echo -e "${GREEN}✅ app_admins table exists${NC}"
  else
    echo -e "${RED}❌ app_admins table missing${NC}"
  fi
  
  if echo "$TABLES" | grep -q "enrichment_audit_log"; then
    echo -e "${GREEN}✅ enrichment_audit_log table exists${NC}"
  else
    echo -e "${RED}❌ enrichment_audit_log table missing${NC}"
  fi
  
  if echo "$TABLES" | grep -q "media_assets"; then
    echo -e "${GREEN}✅ media_assets table exists${NC}"
  else
    echo -e "${RED}❌ media_assets table missing${NC}"
  fi
fi
echo ""

# Test 6: Functions Deployed
echo -e "${BLUE}Test 6: Functions Deployed${NC}"
echo "Checking deployed functions..."
FUNCTIONS=$(supabase functions list 2>/dev/null || echo "")

if echo "$FUNCTIONS" | grep -q "make-server-49b28b8a"; then
  echo -e "${GREEN}✅ make-server-49b28b8a deployed${NC}"
else
  echo -e "${RED}❌ make-server-49b28b8a not deployed${NC}"
  echo "Run: supabase functions deploy make-server-49b28b8a"
fi

if echo "$FUNCTIONS" | grep -q "relay_enrich_admin"; then
  echo -e "${GREEN}✅ relay_enrich_admin deployed${NC}"
else
  echo -e "${RED}❌ relay_enrich_admin not deployed${NC}"
  echo "Run: supabase functions deploy relay_enrich_admin"
fi
echo ""

# Summary
echo "===================================="
echo -e "${BLUE}Test Summary${NC}"
echo "===================================="
echo ""
echo "Required environment variables:"
echo "  SUPABASE_PROJECT_ID: ${SUPABASE_PROJECT_ID:-${RED}NOT SET${NC}}"
echo "  SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY:+SET}${SUPABASE_ANON_KEY:-${RED}NOT SET${NC}}"
echo "  SUPABASE_DB_URL: ${SUPABASE_DB_URL:+SET}${SUPABASE_DB_URL:-${YELLOW}NOT SET (optional)${NC}}"
echo "  ACCESS_TOKEN: ${ACCESS_TOKEN:+SET}${ACCESS_TOKEN:-${YELLOW}NOT SET (optional)${NC}}"
echo ""
echo "Next steps:"
echo "  1. If any tests failed, check the error messages above"
echo "  2. Run deployment: ./scripts/deploy-enrichment.sh"
echo "  3. Export ACCESS_TOKEN and re-run this script for full test"
echo ""
echo "Get your access token from the app:"
echo "  - Sign in to Recoverlution"
echo "  - Open browser console"
echo "  - Run: const { data: { session } } = await supabase.auth.getSession(); console.log(session.access_token)"
echo "  - Copy the token"
echo "  - export ACCESS_TOKEN=<paste-token-here>"
echo ""
