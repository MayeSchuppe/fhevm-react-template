/**
 * Server-side FHE operations
 * Note: Most FHE operations happen client-side for security
 * This file contains server utilities for contract interactions
 */

import { Contract, JsonRpcProvider } from 'ethers';

export interface ServerFHEConfig {
  rpcUrl: string;
  chainId: number;
}

/**
 * Get a read-only contract instance for server-side operations
 */
export function getReadOnlyContract(
  address: string,
  abi: any[],
  rpcUrl: string
): Contract {
  const provider = new JsonRpcProvider(rpcUrl);
  return new Contract(address, abi, provider);
}

/**
 * Verify a contract is deployed at the given address
 */
export async function verifyContractDeployment(
  address: string,
  rpcUrl: string
): Promise<boolean> {
  try {
    const provider = new JsonRpcProvider(rpcUrl);
    const code = await provider.getCode(address);
    return code !== '0x';
  } catch (error) {
    console.error('Contract verification error:', error);
    return false;
  }
}

/**
 * Get the current block number
 */
export async function getCurrentBlock(rpcUrl: string): Promise<number> {
  const provider = new JsonRpcProvider(rpcUrl);
  return await provider.getBlockNumber();
}
