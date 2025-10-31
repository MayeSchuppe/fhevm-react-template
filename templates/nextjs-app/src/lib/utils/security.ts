/**
 * Security utilities for FHE operations
 */

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>'"&]/g, '');
}

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

/**
 * Validate transaction hash format
 */
export function isValidTxHash(hash: string): boolean {
  return /^0x[0-9a-fA-F]{64}$/.test(hash);
}

/**
 * Securely clear sensitive data from memory
 */
export function clearSensitiveData(data: any): void {
  if (typeof data === 'string') {
    data = '';
  } else if (data instanceof Uint8Array) {
    data.fill(0);
  } else if (typeof data === 'object') {
    for (const key in data) {
      delete data[key];
    }
  }
}

/**
 * Rate limiting helper for API calls
 */
export class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number, timeWindowMs: number) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);

    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }

    return false;
  }

  reset(): void {
    this.requests = [];
  }
}
