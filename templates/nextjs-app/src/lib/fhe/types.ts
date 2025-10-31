/**
 * FHE type definitions and utilities
 */

export type FHEType =
  | 'bool'
  | 'uint8'
  | 'uint16'
  | 'uint32'
  | 'uint64'
  | 'uint128'
  | 'uint256'
  | 'address'
  | 'bytes64'
  | 'bytes128'
  | 'bytes256';

export type FHEValue = boolean | number | bigint | string | Uint8Array;

/**
 * Map FHE types to their maximum values
 */
export const FHE_TYPE_LIMITS: Record<string, bigint> = {
  uint8: 2n ** 8n - 1n,
  uint16: 2n ** 16n - 1n,
  uint32: 2n ** 32n - 1n,
  uint64: 2n ** 64n - 1n,
  uint128: 2n ** 128n - 1n,
  uint256: 2n ** 256n - 1n,
};

/**
 * Validate a value against its FHE type
 */
export function validateFHEValue(value: FHEValue, type: FHEType): boolean {
  switch (type) {
    case 'bool':
      return typeof value === 'boolean';

    case 'uint8':
    case 'uint16':
    case 'uint32':
      if (typeof value !== 'number') return false;
      return value >= 0 && BigInt(value) <= FHE_TYPE_LIMITS[type];

    case 'uint64':
    case 'uint128':
    case 'uint256':
      const bigValue = typeof value === 'bigint' ? value : BigInt(value);
      return bigValue >= 0n && bigValue <= FHE_TYPE_LIMITS[type];

    case 'address':
      return typeof value === 'string' && /^0x[0-9a-fA-F]{40}$/.test(value);

    case 'bytes64':
    case 'bytes128':
    case 'bytes256':
      return value instanceof Uint8Array;

    default:
      return false;
  }
}

/**
 * Get the size in bytes for an FHE type
 */
export function getFHETypeSize(type: FHEType): number {
  switch (type) {
    case 'bool':
    case 'uint8':
      return 1;
    case 'uint16':
      return 2;
    case 'uint32':
      return 4;
    case 'uint64':
      return 8;
    case 'uint128':
      return 16;
    case 'uint256':
      return 32;
    case 'address':
      return 20;
    case 'bytes64':
      return 64;
    case 'bytes128':
      return 128;
    case 'bytes256':
      return 256;
    default:
      return 0;
  }
}
