import { createInstance } from 'fhevmjs';
import type { BrowserProvider } from 'ethers';
import type { FhevmClientConfig, FhevmInstance, ContractDetails } from './types';

export class FhevmClient {
  private instance: FhevmInstance | null = null;
  private provider: BrowserProvider;
  private network: string;
  private gatewayUrl: string;
  private aclAddress: string;
  private contractPublicKeys: Map<string, string> = new Map();

  constructor(config: FhevmClientConfig) {
    this.provider = config.provider as BrowserProvider;
    this.network = config.network;
    this.gatewayUrl = config.gatewayUrl || '';
    this.aclAddress = config.aclAddress || '';
  }

  async init(): Promise<void> {
    if (this.instance) {
      return;
    }

    try {
      const network = await this.provider.getNetwork();
      const chainId = Number(network.chainId);

      this.instance = await createInstance({
        chainId,
        networkUrl: this.network,
        gatewayUrl: this.gatewayUrl,
        aclAddress: this.aclAddress,
      }) as FhevmInstance;
    } catch (error) {
      throw new Error(`Failed to initialize FHEVM client: ${error}`);
    }
  }

  async getPublicKey(contractAddress: string): Promise<string> {
    if (this.contractPublicKeys.has(contractAddress)) {
      return this.contractPublicKeys.get(contractAddress)!;
    }

    try {
      const signer = await this.provider.getSigner();
      const contract = new (await import('ethers')).Contract(
        contractAddress,
        ['function getPublicKey() view returns (bytes memory)'],
        signer
      );

      const publicKey = await contract.getPublicKey();
      this.contractPublicKeys.set(contractAddress, publicKey);
      return publicKey;
    } catch (error) {
      throw new Error(`Failed to fetch public key: ${error}`);
    }
  }

  getInstance(): FhevmInstance {
    if (!this.instance) {
      throw new Error('FHEVM client not initialized. Call init() first.');
    }
    return this.instance;
  }

  getProvider(): BrowserProvider {
    return this.provider;
  }

  async reencrypt(
    contractAddress: string,
    handle: string,
    userAddress: string,
    signature: string
  ): Promise<bigint> {
    if (!this.instance) {
      throw new Error('FHEVM client not initialized');
    }

    try {
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
        throw new Error(`Reencryption failed: ${response.statusText}`);
      }

      const data = await response.json();
      return BigInt(data.value);
    } catch (error) {
      throw new Error(`Reencryption error: ${error}`);
    }
  }
}

export async function createFhevmClient(
  config: FhevmClientConfig
): Promise<FhevmClient> {
  const client = new FhevmClient(config);
  await client.init();
  return client;
}
