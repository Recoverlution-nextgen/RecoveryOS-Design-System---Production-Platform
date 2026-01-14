/**
 * OS Objects: Passes, receipts, vault cards, timelines
 * Tangible system artifacts with skeuomorphic depth
 */
/**
 * Proof Receipt — sealed evidence of delivery
 */
export const PROOF_RECEIPT = {
    id: 'os-object-proof-receipt',
    slug: 'proof-receipt',
    title: 'Proof Receipt',
    narrative: 'Immutable evidence: This delivery happened, this shift was felt, this proof was sealed',
    family: 'os-objects',
    familyMetadata: {
        family: 'os-objects',
        objectType: 'receipt',
        materialFinish: 'glass',
        interactable: true,
        dataBinding: 'RecoveryOSEvent.proof',
    },
    format: 'svg',
    source: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="receiptGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:hsla(200, 12%, 12%, 0.9);stop-opacity:1" />
        <stop offset="100%" style="stop-color:hsla(200, 12%, 10%, 0.85);stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" rx="12" fill="url(#receiptGlass)" stroke="hsla(160, 70%, 48%, 0.2)" stroke-width="1" />
    
    <!-- Receipt lines (data fields) -->
    <line x1="30" y1="60" x2="370" y2="60" stroke="hsla(0, 0%, 100%, 0.08)" stroke-width="1" />
    <line x1="30" y1="100" x2="370" y2="100" stroke="hsla(0, 0%, 100%, 0.08)" stroke-width="1" />
    <line x1="30" y1="140" x2="370" y2="140" stroke="hsla(0, 0%, 100%, 0.08)" stroke-width="1" />
    
    <!-- Seal badge -->
    <circle cx="350" cy="50" r="20" fill="hsla(160, 70%, 48%, 0.2)" stroke="hsla(160, 70%, 48%, 0.4)" stroke-width="1" />
    <text x="350" y="55" text-anchor="middle" font-family="SF Mono" font-size="12" font-weight="700" fill="hsla(160, 70%, 48%, 1)">✓</text>
  </svg>`,
    alt: 'Glass receipt card with sealed proof badge',
    dimensions: { width: 400, height: 200 },
    etchedCopy: {
        text: 'SEALED',
        position: 'top',
        style: 'embossed',
        typography: {
            family: 'SF Mono',
            size: 10,
            weight: 700,
            letterSpacing: 0.15,
            lineHeight: 1,
        },
        color: 'hsla(160, 70%, 48%, 0.6)',
        blend: 'normal',
    },
    glassEffect: {
        opacity: 0.95,
        blur: 16,
        border: {
            width: 1,
            color: 'hsla(160, 70%, 48%, 0.2)',
            opacity: 1,
        },
        shadow: {
            x: 0,
            y: 4,
            blur: 12,
            color: 'hsla(0, 0%, 0%, 0.3)',
        },
    },
    usedIn: ['companion', 'console', 'command'],
    elevation: 'raised',
};
/**
 * Vault Card — archived proof for long-term audit
 */
export const VAULT_CARD = {
    id: 'os-object-vault-card',
    slug: 'vault-card',
    title: 'Vault Card',
    narrative: 'Long-term archive: Proof stored, defensible, retrievable for audit or reflection',
    family: 'os-objects',
    familyMetadata: {
        family: 'os-objects',
        objectType: 'vault-card',
        materialFinish: 'metal',
        interactable: true,
        dataBinding: 'IntegrityLog.org_audit_id',
    },
    format: 'svg',
    source: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vaultMetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:hsla(0, 0%, 20%, 0.95);stop-opacity:1" />
        <stop offset="100%" style="stop-color:hsla(0, 0%, 15%, 0.9);stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="300" height="400" rx="16" fill="url(#vaultMetal)" stroke="hsla(0, 0%, 30%, 0.4)" stroke-width="2" />
    
    <!-- Vault lock icon -->
    <circle cx="150" cy="100" r="30" fill="none" stroke="hsla(160, 70%, 48%, 0.3)" stroke-width="2" />
    <rect x="135" y="100" width="30" height="40" rx="4" fill="hsla(160, 70%, 48%, 0.2)" />
    
    <!-- Data slots -->
    <rect x="30" y="200" width="240" height="30" rx="4" fill="hsla(0, 0%, 10%, 0.5)" />
    <rect x="30" y="250" width="240" height="30" rx="4" fill="hsla(0, 0%, 10%, 0.5)" />
    <rect x="30" y="300" width="240" height="30" rx="4" fill="hsla(0, 0%, 10%, 0.5)" />
  </svg>`,
    alt: 'Metal vault card with lock icon and data slots',
    dimensions: { width: 300, height: 400 },
    etchedCopy: {
        text: 'ARCHIVED',
        position: 'bottom',
        style: 'carved',
        typography: {
            family: 'SF Mono',
            size: 12,
            weight: 700,
            letterSpacing: 0.12,
            lineHeight: 1,
        },
        color: 'hsla(0, 0%, 50%, 0.7)',
        blend: 'normal',
    },
    glassEffect: {
        opacity: 0.9,
        blur: 8,
        border: {
            width: 2,
            color: 'hsla(0, 0%, 30%, 0.4)',
            opacity: 1,
        },
        shadow: {
            x: 0,
            y: 8,
            blur: 24,
            color: 'hsla(0, 0%, 0%, 0.5)',
        },
    },
    usedIn: ['command'],
    elevation: 'floating',
};
/**
 * Timeline Pass — temporal view of recovery loop
 */
export const TIMELINE_PASS = {
    id: 'os-object-timeline-pass',
    slug: 'timeline-pass',
    title: 'Timeline Pass',
    narrative: 'Time-based view: See when deliveries happened, how patterns evolved, where you were held',
    family: 'os-objects',
    familyMetadata: {
        family: 'os-objects',
        objectType: 'timeline',
        materialFinish: 'liquid',
        interactable: true,
        dataBinding: 'RecoveryOSEvent.timestamp',
    },
    format: 'svg',
    source: `<svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="timelineFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:hsla(160, 70%, 48%, 0.1);stop-opacity:1" />
        <stop offset="50%" style="stop-color:hsla(160, 70%, 48%, 0.25);stop-opacity:1" />
        <stop offset="100%" style="stop-color:hsla(160, 70%, 48%, 0.1);stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Timeline spine -->
    <line x1="50" y1="100" x2="750" y2="100" stroke="url(#timelineFlow)" stroke-width="3" />
    
    <!-- Event markers -->
    <circle cx="150" cy="100" r="8" fill="hsla(160, 70%, 48%, 0.4)" />
    <circle cx="350" cy="100" r="8" fill="hsla(160, 70%, 48%, 0.4)" />
    <circle cx="550" cy="100" r="8" fill="hsla(160, 70%, 48%, 0.4)" />
    <circle cx="700" cy="100" r="8" fill="hsla(160, 70%, 48%, 0.6)" />
    
    <!-- Time labels -->
    <text x="150" y="130" text-anchor="middle" font-family="SF Pro Text" font-size="11" fill="hsla(0, 0%, 100%, 0.4)">Mon</text>
    <text x="350" y="130" text-anchor="middle" font-family="SF Pro Text" font-size="11" fill="hsla(0, 0%, 100%, 0.4)">Wed</text>
    <text x="550" y="130" text-anchor="middle" font-family="SF Pro Text" font-size="11" fill="hsla(0, 0%, 100%, 0.4)">Fri</text>
    <text x="700" y="130" text-anchor="middle" font-family="SF Pro Text" font-size="11" fill="hsla(0, 0%, 100%, 0.5)">Today</text>
  </svg>`,
    alt: 'Flowing timeline with event markers across the week',
    dimensions: { width: 800, height: 200 },
    etchedCopy: {
        text: 'Last 7 days',
        position: 'top',
        style: 'transparent',
        typography: {
            family: 'SF Pro Text',
            size: 14,
            weight: 500,
            letterSpacing: 0.02,
            lineHeight: 1,
        },
        color: 'hsla(0, 0%, 100%, 0.3)',
        blend: 'normal',
    },
    usedIn: ['companion', 'console'],
    elevation: 'surface',
};
/**
 * Export all OS object assets
 */
export const OS_OBJECT_ASSETS = [
    PROOF_RECEIPT,
    VAULT_CARD,
    TIMELINE_PASS,
];
