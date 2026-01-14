export function testAttr(testId?: string): { "data-testid"?: string } {
  // Option A (recommended): only include when provided
  if (!testId) return {};
  return { "data-testid": testId };
}

/**
 * Option B (if you want a global switch):
 * Set window.__RECOVERYOS_TESTIDS__ = true in docs/snapshot app only.
 */
// export function testAttr(testId?: string): { "data-testid"?: string } {
//   const enabled = typeof window !== "undefined" && (window as any).__RECOVERYOS_TESTIDS__ === true;
//   if (!enabled || !testId) return {};
//   return { "data-testid": testId };
// }