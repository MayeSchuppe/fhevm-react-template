import { createFhevmClient, EncryptionHelper } from '@fhevm/sdk';
import type { FhevmClient } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';
import type { FHEConfig } from '@/types/fhe';

let clientInstance: FhevmClient | null = null;

/**
 * Initialize the FHE client for browser usage
 */
export async function initializeFHEClient(config: FHEConfig): Promise<FhevmClient> {
  if (clientInstance) {
    return clientInstance;
  }

  if (typeof window === 'undefined') {
    throw new Error('FHE client can only be initialized in browser environment');
  }

  if (!window.ethereum) {
    throw new Error('No Ethereum provider found. Please install MetaMask.');
  }

  const provider = new BrowserProvider(window.ethereum);

  clientInstance = await createFhevmClient({
    provider,
    network: config.network,
    gatewayUrl: config.gatewayUrl,
  });

  return clientInstance;
}

/**
 * Get the current FHE client instance
 */
export function getFHEClient(): FhevmClient | null {
  return clientInstance;
}

/**
 * Create an encryption helper from the current client
 */
export function getEncryptionHelper(): EncryptionHelper | null {
  if (!clientInstance) return null;

  const instance = clientInstance.getInstance();
  return new EncryptionHelper(instance);
}

/**
 * Reset the FHE client instance
 */
export function resetFHEClient(): void {
  clientInstance = null;
}
