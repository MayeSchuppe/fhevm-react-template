'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { FhevmClient } from '@fhevm/sdk';
import { initializeFHEClient, resetFHEClient } from '@/lib/fhe/client';
import type { FHEConfig, FHEContextValue } from '@/types/fhe';

const FHEContext = createContext<FHEContextValue | undefined>(undefined);

export function FHEProvider({ children }: { children: React.ReactNode }) {
  const [instance, setInstance] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async (config: FHEConfig) => {
    setError(null);

    try {
      const client: FhevmClient = await initializeFHEClient(config);
      const fhevmInstance = client.getInstance();
      setInstance(fhevmInstance);
      setIsInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize FHE';
      setError(errorMessage);
      console.error('FHE initialization error:', err);
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    resetFHEClient();
    setInstance(null);
    setIsInitialized(false);
    setError(null);
  }, []);

  return (
    <FHEContext.Provider
      value={{
        instance,
        isInitialized,
        error,
        initialize,
      }}
    >
      {children}
    </FHEContext.Provider>
  );
}

export function useFHEContext(): FHEContextValue {
  const context = useContext(FHEContext);
  if (!context) {
    throw new Error('useFHEContext must be used within FHEProvider');
  }
  return context;
}
