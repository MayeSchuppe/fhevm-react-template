export function toHex(value: number | bigint | Uint8Array): string {
  if (typeof value === 'number' || typeof value === 'bigint') {
    return '0x' + value.toString(16);
  }
  return '0x' + Array.from(value, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function fromHex(hex: string): bigint {
  return BigInt(hex);
}

export function toBytes(value: string): Uint8Array {
  if (value.startsWith('0x')) {
    value = value.slice(2);
  }
  const bytes = new Uint8Array(value.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(value.substr(i * 2, 2), 16);
  }
  return bytes;
}

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function shortenAddress(address: string, chars: number = 4): string {
  if (!isValidAddress(address)) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
}

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function parseError(error: any): string {
  if (error?.message) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
}

export function formatUnits(value: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals);
  const quotient = value / divisor;
  const remainder = value % divisor;
  return `${quotient}.${remainder.toString().padStart(decimals, '0')}`;
}

export function parseUnits(value: string, decimals: number = 18): bigint {
  const [whole, fraction = '0'] = value.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole) * BigInt(10 ** decimals) + BigInt(paddedFraction);
}
