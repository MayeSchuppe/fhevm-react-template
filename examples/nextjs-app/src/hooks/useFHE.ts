import { useState, useEffect, useCallback } from 'react';
import { initializeFHEClient, getFHEClient, resetFHEClient } from '@/lib/fhe/client';
import type { FhevmClient } from '@fhevm/sdk';
import type { FHEConfig } from '@/types/fhe';

export function useFHE() {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async (config: FHEConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const fheClient = await initializeFHEClient(config);
      setClient(fheClient);
      setIsInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize FHE client';
      setError(errorMessage);
      console.error('FHE initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    resetFHEClient();
    setClient(null);
    setIsInitialized(false);
    setError(null);
  }, []);

  useEffect(() => {
    const existingClient = getFHEClient();
    if (existingClient) {
      setClient(existingClient);
      setIsInitialized(true);
    }
  }, []);

  return {
    client,
    isInitialized,
    isLoading,
    error,
    initialize,
    reset,
  };
}
