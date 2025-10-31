import type { FhevmInstance } from 'fhevmjs';

export type EncryptedType =
  | 'ebool'
  | 'euint8'
  | 'euint16'
  | 'euint32'
  | 'euint64'
  | 'euint128'
  | 'euint256'
  | 'eaddress'
  | 'ebytes64'
  | 'ebytes128'
  | 'ebytes256';

export interface EncryptedData {
  data: Uint8Array;
  type: EncryptedType;
}

export interface FHEConfig {
  network: string;
  gatewayUrl: string;
  chainId?: number;
}

export interface DecryptionRequest {
  contractAddress: string;
  handle: string;
  userAddress: string;
}

export interface FHEContextValue {
  instance: FhevmInstance | null;
  isInitialized: boolean;
  error: string | null;
  initialize: (config: FHEConfig) => Promise<void>;
}
