// Assets stub implementation

// Mock asset registry
const assetRegistry = {
  'logo': {
    url: '/assets/logo.png',
    alt: 'RecoveryOS Logo',
    width: 200,
    height: 60
  },
  'icon': {
    url: '/assets/icon.png',
    alt: 'RecoveryOS Icon',
    width: 48,
    height: 48
  },
  'placeholder': {
    url: '/assets/placeholder.png',
    alt: 'Placeholder Image',
    width: 400,
    height: 300
  }
};

/**
 * Get asset metadata by key
 * @param {string} key - Asset key
 * @returns {Object|null} Asset metadata or null if not found
 */
function getAsset(key) {
  return assetRegistry[key] || null;
}

/**
 * Get all available asset keys
 * @returns {string[]} Array of asset keys
 */
function getAssetKeys() {
  return Object.keys(assetRegistry);
}

module.exports = {
  getAsset,
  getAssetKeys
};
