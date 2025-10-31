import { useState, useCallback } from 'react';
import { getEncryptionHelper } from '@/lib/fhe/client';
import type { FHEType, FHEValue } from '@/lib/fhe/types';
import { validateFHEValue } from '@/lib/fhe/types';

export function useEncryption() {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encrypt = useCallback(async (type: FHEType, value: FHEValue) => {
    setIsEncrypting(true);
    setError(null);

    try {
      const helper = getEncryptionHelper();
      if (!helper) {
        throw new Error('FHE client not initialized. Please initialize first.');
      }

      if (!validateFHEValue(value, type)) {
        throw new Error(`Invalid value for type ${type}`);
      }

      let encrypted: { data: Uint8Array };

      switch (type) {
        case 'bool':
          encrypted = helper.encryptBool(value as boolean);
          break;
        case 'uint8':
          encrypted = helper.encryptUint8(value as number);
          break;
        case 'uint16':
          encrypted = helper.encryptUint16(value as number);
          break;
        case 'uint32':
          encrypted = helper.encryptUint32(value as number);
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
          encrypted = helper.encryptAddress(value as string);
          break;
        default:
          throw new Error(`Unsupported encryption type: ${type}`);
      }

      return encrypted;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Encryption failed';
      setError(errorMessage);
      console.error('Encryption error:', err);
      throw err;
    } finally {
      setIsEncrypting(false);
    }
  }, []);

  const encryptToHex = useCallback(async (type: FHEType, value: FHEValue): Promise<string> => {
    const encrypted = await encrypt(type, value);
    return Array.from(encrypted.data)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }, [encrypt]);

  return {
    encrypt,
    encryptToHex,
    isEncrypting,
    error,
  };
}
