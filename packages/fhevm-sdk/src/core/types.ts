import type { BrowserProvider, Eip1193Provider } from 'ethers';

export interface FhevmClientConfig {
  provider: BrowserProvider | Eip1193Provider;
  network: string;
  gatewayUrl?: string;
  aclAddress?: string;
}

export interface EncryptedData {
  data: Uint8Array;
  handles: string[];
}

export interface DecryptionRequest {
  contractAddress: string;
  handle: string;
  userAddress: string;
}

export interface DecryptionResult {
  value: bigint | number | boolean | string;
  type: 'uint' | 'int' | 'bool' | 'address' | 'bytes';
}

export interface FhevmInstance {
  encrypt_bool(value: boolean): EncryptedData;
  encrypt_uint8(value: number): EncryptedData;
  encrypt_uint16(value: number): EncryptedData;
  encrypt_uint32(value: number): EncryptedData;
  encrypt_uint64(value: bigint): EncryptedData;
  encrypt_uint128(value: bigint): EncryptedData;
  encrypt_uint256(value: bigint): EncryptedData;
  encrypt_address(value: string): EncryptedData;
  encrypt_bytes64(value: Uint8Array): EncryptedData;
  encrypt_bytes128(value: Uint8Array): EncryptedData;
  encrypt_bytes256(value: Uint8Array): EncryptedData;
}

export interface ContractDetails {
  address: string;
  abi: any[];
  publicKey?: string;
}
