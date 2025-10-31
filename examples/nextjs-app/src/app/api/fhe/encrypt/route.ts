import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, EncryptRequest, EncryptResponse } from '@/types/api';

/**
 * FHE Encryption API Route
 * POST - Encrypt a value
 *
 * Note: In production, encryption should happen client-side for security.
 * This endpoint is for demonstration purposes only.
 */
export async function POST(request: NextRequest) {
  try {
    const body: EncryptRequest = await request.json();
    const { value, type } = body;

    if (!value || !type) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields: value and type',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // In a real implementation, this would use the FHE SDK
    // For now, we return a simulated encrypted value
    const simulatedEncryption = Buffer.from(JSON.stringify({ value, type }))
      .toString('hex')
      .padEnd(128, '0');

    const responseData: EncryptResponse = {
      encrypted: simulatedEncryption,
      type: type,
    };

    const response: ApiResponse<EncryptResponse> = {
      success: true,
      data: responseData,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Encryption failed',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * GET - Get encryption information
 */
export async function GET(request: NextRequest) {
  const response: ApiResponse = {
    success: true,
    data: {
      message: 'FHE Encryption endpoint',
      supportedTypes: [
        'bool',
        'uint8',
        'uint16',
        'uint32',
        'uint64',
        'uint128',
        'uint256',
        'address',
      ],
      note: 'For security, encryption should be performed client-side',
    },
  };

  return NextResponse.json(response);
}
