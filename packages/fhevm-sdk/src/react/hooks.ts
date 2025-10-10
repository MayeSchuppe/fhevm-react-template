import { useState, useCallback, useEffect } from 'react';
import { Contract, type BrowserProvider } from 'ethers';
import { useFhevm } from './context';
import { EncryptionHelper } from '../core/encryption';
import { DecryptionHelper } from '../core/decryption';
import type { EncryptedData, DecryptionRequest } from '../core/types';

export function useEncryption() {
  const { client, isLoading: clientLoading } = useFhevm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (type: string, value: any): Promise<EncryptedData | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const instance = client.getInstance();
        const helper = new EncryptionHelper(instance);

        let encrypted: EncryptedData;
        switch (type) {
          case 'bool':
            encrypted = helper.encryptBool(value);
            break;
          case 'uint8':
            encrypted = helper.encryptUint8(value);
            break;
          case 'uint16':
            encrypted = helper.encryptUint16(value);
            break;
          case 'uint32':
            encrypted = helper.encryptUint32(value);
            break;
          case 'uint64':
            encrypted = helper.encryptUint64(BigInt(value));
            break;
          case 'uint128':
            encrypted = helper.encryptUint128(BigInt(value));
            break;
          case 'uint256':
            encrypted = helper.encryptUint256(BigInt(value));
            break;
          case 'address':
            encrypted = helper.encryptAddress(value);
            break;
          default:
            throw new Error(`Unsupported encryption type: ${type}`);
        }

        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  return { encrypt, isLoading: isLoading || clientLoading, error };
}

export function useDecryption(gatewayUrl: string) {
  const { client } = useFhevm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(
    async (request: DecryptionRequest): Promise<bigint | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const provider = client.getProvider();
        const helper = new DecryptionHelper(provider, gatewayUrl);
        const result = await helper.userDecrypt(request);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [client, gatewayUrl]
  );

  return { decrypt, isLoading, error };
}

export function useContract(
  contractAddress: string,
  abi: any[]
) {
  const { client } = useFhevm();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!client || !contractAddress || !abi) return;

    const initContract = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const provider = client.getProvider();
        const signer = await provider.getSigner();
        const contractInstance = new Contract(contractAddress, abi, signer);
        setContract(contractInstance);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    initContract();
  }, [client, contractAddress, abi]);

  const write = useCallback(
    async (functionName: string, ...args: any[]) => {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      if (typeof contract[functionName] !== 'function') {
        throw new Error(`Function ${functionName} not found`);
      }

      const tx = await contract[functionName](...args);
      const receipt = await tx.wait();
      return receipt;
    },
    [contract]
  );

  const read = useCallback(
    async (functionName: string, ...args: any[]) => {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      if (typeof contract[functionName] !== 'function') {
        throw new Error(`Function ${functionName} not found`);
      }

      return await contract[functionName](...args);
    },
    [contract]
  );

  return { contract, write, read, isLoading, error };
}

export function useFhevmEncrypt() {
  const { client } = useFhevm();

  const encryptValue = useCallback(
    (type: string, value: any): EncryptedData | null => {
      if (!client) return null;

      const instance = client.getInstance();
      const helper = new EncryptionHelper(instance);

      switch (type) {
        case 'bool':
          return helper.encryptBool(value);
        case 'uint8':
          return helper.encryptUint8(value);
        case 'uint16':
          return helper.encryptUint16(value);
        case 'uint32':
          return helper.encryptUint32(value);
        case 'uint64':
          return helper.encryptUint64(BigInt(value));
        case 'uint128':
          return helper.encryptUint128(BigInt(value));
        case 'uint256':
          return helper.encryptUint256(BigInt(value));
        case 'address':
          return helper.encryptAddress(value);
        default:
          throw new Error(`Unsupported type: ${type}`);
      }
    },
    [client]
  );

  return { encryptValue };
}
