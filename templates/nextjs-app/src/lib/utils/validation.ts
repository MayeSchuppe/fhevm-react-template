/**
 * Validation utilities for forms and inputs
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate numeric input
 */
export function validateNumber(
  value: string,
  min?: number,
  max?: number
): ValidationResult {
  const num = parseFloat(value);

  if (isNaN(num)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }

  if (min !== undefined && num < min) {
    return { isValid: false, error: `Value must be at least ${min}` };
  }

  if (max !== undefined && num > max) {
    return { isValid: false, error: `Value must be at most ${max}` };
  }

  return { isValid: true };
}

/**
 * Validate integer input
 */
export function validateInteger(
  value: string,
  min?: number,
  max?: number
): ValidationResult {
  const num = parseInt(value, 10);

  if (isNaN(num) || !Number.isInteger(num)) {
    return { isValid: false, error: 'Please enter a valid integer' };
  }

  if (min !== undefined && num < min) {
    return { isValid: false, error: `Value must be at least ${min}` };
  }

  if (max !== undefined && num > max) {
    return { isValid: false, error: `Value must be at most ${max}` };
  }

  return { isValid: true };
}

/**
 * Validate Ethereum address
 */
export function validateAddress(address: string): ValidationResult {
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return {
      isValid: false,
      error: 'Please enter a valid Ethereum address',
    };
  }

  return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, error: 'This field is required' };
  }

  return { isValid: true };
}

/**
 * Validate uint8 value (0-255)
 */
export function validateUint8(value: string): ValidationResult {
  return validateInteger(value, 0, 255);
}

/**
 * Validate uint16 value (0-65535)
 */
export function validateUint16(value: string): ValidationResult {
  return validateInteger(value, 0, 65535);
}

/**
 * Validate uint32 value (0-4294967295)
 */
export function validateUint32(value: string): ValidationResult {
  return validateInteger(value, 0, 4294967295);
}
