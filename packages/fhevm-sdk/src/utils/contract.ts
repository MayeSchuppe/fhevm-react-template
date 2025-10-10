import { Contract, type BrowserProvider } from 'ethers';

export async function deployContract(
  provider: BrowserProvider,
  abi: any[],
  bytecode: string,
  ...args: any[]
): Promise<Contract> {
  const signer = await provider.getSigner();
  const factory = new (await import('ethers')).ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy(...args);
  await contract.waitForDeployment();
  return contract;
}

export async function getContract(
  provider: BrowserProvider,
  address: string,
  abi: any[]
): Promise<Contract> {
  const signer = await provider.getSigner();
  return new Contract(address, abi, signer);
}

export async function waitForTransaction(
  provider: BrowserProvider,
  txHash: string,
  confirmations: number = 1
): Promise<any> {
  const receipt = await provider.waitForTransaction(txHash, confirmations);
  return receipt;
}

export function encodeParameters(types: string[], values: any[]): string {
  const { AbiCoder } = require('ethers');
  const abiCoder = AbiCoder.defaultAbiCoder();
  return abiCoder.encode(types, values);
}

export function decodeParameters(types: string[], data: string): any[] {
  const { AbiCoder } = require('ethers');
  const abiCoder = AbiCoder.defaultAbiCoder();
  return abiCoder.decode(types, data);
}
