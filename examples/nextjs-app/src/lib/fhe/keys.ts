import type { FhevmInstance } from 'fhevmjs';

/**
 * Get the public key from an FHEVM instance
 */
export function getPublicKey(instance: FhevmInstance): string {
  const publicKey = instance.getPublicKey();
  return Buffer.from(publicKey).toString('hex');
}

/**
 * Store public key in session storage
 */
export function storePublicKey(key: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('fhe_public_key', key);
}

/**
 * Retrieve public key from session storage
 */
export function retrievePublicKey(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('fhe_public_key');
}

/**
 * Clear stored public key
 */
export function clearPublicKey(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('fhe_public_key');
}

/**
 * Validate public key format
 */
export function isValidPublicKey(key: string): boolean {
  // Public key should be a hex string
  return /^[0-9a-fA-F]+$/.test(key) && key.length > 0;
}
