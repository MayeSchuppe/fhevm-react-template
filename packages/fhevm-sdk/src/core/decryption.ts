import { Contract, type BrowserProvider } from 'ethers';
import type { DecryptionRequest, DecryptionResult } from './types';

const EIP712_DOMAIN = {
  name: 'Authorization token',
  version: '1',
} as const;

const EIP712_TYPES = {
  Reencrypt: [
    { name: 'publicKey', type: 'bytes32' },
    { name: 'contractAddress', type: 'address' },
  ],
} as const;

export class DecryptionHelper {
  private provider: BrowserProvider;
  private gatewayUrl: string;

  constructor(provider: BrowserProvider, gatewayUrl: string) {
    this.provider = provider;
    this.gatewayUrl = gatewayUrl;
  }

  async userDecrypt(request: DecryptionRequest): Promise<bigint> {
    const { contractAddress, handle, userAddress } = request;

    try {
      const signer = await this.provider.getSigner();

      // Create EIP-712 signature
      const domain = {
        ...EIP712_DOMAIN,
        chainId: (await this.provider.getNetwork()).chainId,
        verifyingContract: contractAddress,
      };

      const message = {
        publicKey: handle,
        contractAddress,
      };

      const signature = await signer.signTypedData(domain, EIP712_TYPES, message);

      // Call gateway for reencryption
      const response = await fetch(`${this.gatewayUrl}/reencrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress,
          handle,
          userAddress,
          signature,
        }),
      });

      if (!response.ok) {
        throw new Error(`Decryption failed: ${response.statusText}`);
      }

      const data = await response.json();
      return BigInt(data.value);
    } catch (error) {
      throw new Error(`User decryption error: ${error}`);
    }
  }

  async publicDecrypt(
    contractAddress: string,
    abi: any[],
    functionName: string,
    ...args: any[]
  ): Promise<any> {
    try {
      const signer = await this.provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);

      if (typeof contract[functionName] !== 'function') {
        throw new Error(`Function ${functionName} not found in contract`);
      }

      const result = await contract[functionName](...args);
      return result;
    } catch (error) {
      throw new Error(`Public decryption error: ${error}`);
    }
  }

  async batchDecrypt(requests: DecryptionRequest[]): Promise<bigint[]> {
    try {
      const results = await Promise.all(
        requests.map(request => this.userDecrypt(request))
      );
      return results;
    } catch (error) {
      throw new Error(`Batch decryption error: ${error}`);
    }
  }
}

export function createDecryptionHelper(
  provider: BrowserProvider,
  gatewayUrl: string
): DecryptionHelper {
  return new DecryptionHelper(provider, gatewayUrl);
}
