/**
 * ASSET HEALTH TEST UTILITY
 * 
 * Run this to verify the asset monitoring system is working correctly.
 * Call from browser console after the app loads.
 */

import { PLATFORM_MOCKUPS, performAssetHealthCheck, validateAssetUrl, getPageAssets } from './assetManifest';
import { getBrokenImages, hasBrokenImages, generateImageAlertReport } from '../components/MonitoredImage';

export function runAssetHealthTest() {
  console.group('🧪 ASSET HEALTH TEST SUITE');
  
  // Test 1: Asset Manifest Loaded
  console.group('Test 1: Asset Manifest');
  const assetCount = Object.keys(PLATFORM_MOCKUPS).length;
  console.log(`✅ Asset manifest loaded with ${assetCount} assets`);
  console.groupEnd();
  
  // Test 2: URL Validation
  console.group('Test 2: URL Validation');
  let validCount = 0;
  let invalidCount = 0;
  
  Object.entries(PLATFORM_MOCKUPS).forEach(([key, asset]) => {
    if (validateAssetUrl(asset.url)) {
      validCount++;
    } else {
      invalidCount++;
      console.error(`❌ Invalid URL format for ${key}: ${asset.url}`);
    }
  });
  
  console.log(`✅ ${validCount} assets have valid URLs`);
  if (invalidCount > 0) {
    console.error(`❌ ${invalidCount} assets have invalid URLs`);
  }
  console.groupEnd();
  
  // Test 3: Usage Tracking
  console.group('Test 3: Usage Tracking');
  const marketingPlatformAssets = getPageAssets('MarketingPlatformPage');
  const marketingHomeAssets = getPageAssets('MarketingHomePage');
  console.log(`MarketingPlatformPage uses ${marketingPlatformAssets.length} assets`);
  console.log(`MarketingHomePage uses ${marketingHomeAssets.length} assets`);
  console.groupEnd();
  
  // Test 4: Asset Metadata
  console.group('Test 4: Asset Metadata');
  Object.entries(PLATFORM_MOCKUPS).forEach(([key, asset]) => {
    const hasMetadata = asset.id && asset.name && asset.url && asset.usedIn && asset.purpose;
    if (hasMetadata) {
      console.log(`✅ ${key} has complete metadata`);
    } else {
      console.error(`❌ ${key} missing metadata`);
    }
  });
  console.groupEnd();
  
  // Test 5: Broken Image Detection
  console.group('Test 5: Broken Image Detection');
  const broken = getBrokenImages();
  if (broken.length === 0) {
    console.log('✅ No broken images detected');
  } else {
    console.error(`❌ ${broken.length} broken images detected:`);
    console.error(generateImageAlertReport());
  }
  console.groupEnd();
  
  // Test 6: Last Verified Dates
  console.group('Test 6: Last Verified Dates');
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  
  Object.entries(PLATFORM_MOCKUPS).forEach(([key, asset]) => {
    if (!asset.lastVerified) {
      console.warn(`⚠️ ${key} has never been verified`);
    } else {
      const verifiedDate = new Date(asset.lastVerified);
      if (verifiedDate < thirtyDaysAgo) {
        console.warn(`⚠️ ${key} last verified over 30 days ago: ${asset.lastVerified}`);
      }
    }
  });
  console.groupEnd();
  
  // Final Summary
  console.group('📊 TEST SUMMARY');
  console.log(`Total Assets: ${assetCount}`);
  console.log(`Valid URLs: ${validCount}`);
  console.log(`Invalid URLs: ${invalidCount}`);
  console.log(`Broken Images: ${broken.length}`);
  console.log(`Pages Tracked: MarketingPlatformPage, MarketingHomePage`);
  
  const allPassed = invalidCount === 0 && broken.length === 0;
  if (allPassed) {
    console.log('✅ ALL TESTS PASSED - Asset system healthy');
  } else {
    console.error('❌ SOME TESTS FAILED - Check details above');
  }
  console.groupEnd();
  
  console.groupEnd();
  
  return {
    passed: allPassed,
    totalAssets: assetCount,
    validUrls: validCount,
    invalidUrls: invalidCount,
    brokenImages: broken.length
  };
}

// Export for console usage
if (typeof window !== 'undefined') {
  (window as any).runAssetHealthTest = runAssetHealthTest;
  (window as any).performAssetHealthCheck = performAssetHealthCheck;
  (window as any).getBrokenImages = getBrokenImages;
  (window as any).generateImageAlertReport = generateImageAlertReport;
  
  console.log('🔧 Asset Health Test utilities loaded. Run in console:');
  console.log('  runAssetHealthTest() - Full test suite');
  console.log('  performAssetHealthCheck() - Asset manifest check');
  console.log('  getBrokenImages() - List broken images');
  console.log('  generateImageAlertReport() - Generate alert report');
}
