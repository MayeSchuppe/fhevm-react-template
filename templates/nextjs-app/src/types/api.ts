export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface EncryptRequest {
  value: string | number | bigint | boolean;
  type: 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'address';
}

export interface EncryptResponse {
  encrypted: string;
  type: string;
}

export interface DecryptRequest {
  encryptedData: string;
  contractAddress: string;
  handle: string;
}

export interface DecryptResponse {
  decrypted: string | number | bigint | boolean;
}

export interface ComputeRequest {
  operation: 'add' | 'sub' | 'mul' | 'div';
  operand1: string;
  operand2: string;
  type: string;
}

export interface ComputeResponse {
  result: string;
}

export interface KeyResponse {
  publicKey: string;
  timestamp: number;
}
