import type { FhevmInstance, EncryptedData } from './types';

export class EncryptionHelper {
  private instance: FhevmInstance;

  constructor(instance: FhevmInstance) {
    this.instance = instance;
  }

  encryptBool(value: boolean): EncryptedData {
    return this.instance.encrypt_bool(value);
  }

  encryptUint8(value: number): EncryptedData {
    if (value < 0 || value > 255) {
      throw new Error('Value must be between 0 and 255');
    }
    return this.instance.encrypt_uint8(value);
  }

  encryptUint16(value: number): EncryptedData {
    if (value < 0 || value > 65535) {
      throw new Error('Value must be between 0 and 65535');
    }
    return this.instance.encrypt_uint16(value);
  }

  encryptUint32(value: number): EncryptedData {
    if (value < 0 || value > 4294967295) {
      throw new Error('Value must be between 0 and 4294967295');
    }
    return this.instance.encrypt_uint32(value);
  }

  encryptUint64(value: bigint): EncryptedData {
    return this.instance.encrypt_uint64(value);
  }

  encryptUint128(value: bigint): EncryptedData {
    return this.instance.encrypt_uint128(value);
  }

  encryptUint256(value: bigint): EncryptedData {
    return this.instance.encrypt_uint256(value);
  }

  encryptAddress(address: string): EncryptedData {
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid Ethereum address');
    }
    return this.instance.encrypt_address(address);
  }

  encryptBytes64(value: Uint8Array): EncryptedData {
    if (value.length !== 64) {
      throw new Error('Bytes must be exactly 64 bytes');
    }
    return this.instance.encrypt_bytes64(value);
  }

  encryptBytes128(value: Uint8Array): EncryptedData {
    if (value.length !== 128) {
      throw new Error('Bytes must be exactly 128 bytes');
    }
    return this.instance.encrypt_bytes128(value);
  }

  encryptBytes256(value: Uint8Array): EncryptedData {
    if (value.length !== 256) {
      throw new Error('Bytes must be exactly 256 bytes');
    }
    return this.instance.encrypt_bytes256(value);
  }
}

export function createEncryptionHelper(instance: FhevmInstance): EncryptionHelper {
  return new EncryptionHelper(instance);
}
