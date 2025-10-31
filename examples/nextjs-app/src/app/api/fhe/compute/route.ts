import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, ComputeRequest, ComputeResponse } from '@/types/api';

/**
 * FHE Computation API Route
 * POST - Perform homomorphic computation
 *
 * Note: In production, computation happens on-chain in smart contracts.
 * This endpoint demonstrates the concept.
 */
export async function POST(request: NextRequest) {
  try {
    const body: ComputeRequest = await request.json();
    const { operation, operand1, operand2, type } = body;

    if (!operation || !operand1 || !operand2) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields: operation, operand1, operand2',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate operation
    const validOperations = ['add', 'sub', 'mul', 'div'];
    if (!validOperations.includes(operation)) {
      const response: ApiResponse = {
        success: false,
        error: `Invalid operation. Must be one of: ${validOperations.join(', ')}`,
      };
      return NextResponse.json(response, { status: 400 });
    }

    // In a real implementation, this would:
    // 1. Call a smart contract with encrypted operands
    // 2. The contract performs homomorphic computation
    // 3. Return the encrypted result

    // For demonstration, we simulate the computation
    const num1 = parseInt(operand1.slice(0, 8), 16) || 0;
    const num2 = parseInt(operand2.slice(0, 8), 16) || 0;

    let result: number;
    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'sub':
        result = num1 - num2;
        break;
      case 'mul':
        result = num1 * num2;
        break;
      case 'div':
        result = num2 !== 0 ? Math.floor(num1 / num2) : 0;
        break;
      default:
        result = 0;
    }

    // Simulate encrypted result
    const encryptedResult = result.toString(16).padStart(64, '0');

    const responseData: ComputeResponse = {
      result: encryptedResult,
    };

    const response: ApiResponse<ComputeResponse> = {
      success: true,
      data: responseData,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Computation failed',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * GET - Get computation information
 */
export async function GET(request: NextRequest) {
  const response: ApiResponse = {
    success: true,
    data: {
      message: 'FHE Computation endpoint',
      supportedOperations: ['add', 'sub', 'mul', 'div'],
      note: 'Computations are performed on encrypted data without decryption',
    },
  };

  return NextResponse.json(response);
}
