import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BrowserProvider } from 'ethers';
import { FhevmClient, createFhevmClient } from '../core/FhevmClient';
import type { FhevmClientConfig } from '../core/types';

interface FhevmContextValue {
  client: FhevmClient | null;
  isLoading: boolean;
  error: Error | null;
  init: (provider: any, network: string, gatewayUrl?: string) => Promise<void>;
}

const FhevmContext = createContext<FhevmContextValue | undefined>(undefined);

export interface FhevmProviderProps {
  children: ReactNode;
  config?: Partial<FhevmClientConfig>;
}

export function FhevmProvider({ children, config }: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const init = async (provider: any, network: string, gatewayUrl?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const browserProvider = new BrowserProvider(provider);
      const fhevmClient = await createFhevmClient({
        provider: browserProvider,
        network,
        gatewayUrl: gatewayUrl || config?.gatewayUrl || '',
        aclAddress: config?.aclAddress,
      });

      setClient(fhevmClient);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error('FHEVM initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FhevmContext.Provider value={{ client, isLoading, error, init }}>
      {children}
    </FhevmContext.Provider>
  );
}

export function useFhevm(): FhevmContextValue {
  const context = useContext(FhevmContext);
  if (!context) {
    throw new Error('useFhevm must be used within FhevmProvider');
  }
  return context;
}
