import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/api';

/**
 * Main FHE API route
 * GET - Get FHE status and information
 */
export async function GET(request: NextRequest) {
  try {
    const response: ApiResponse = {
      success: true,
      data: {
        message: 'FHE API is running',
        version: '1.0.0',
        endpoints: {
          encrypt: '/api/fhe/encrypt',
          decrypt: '/api/fhe/decrypt',
          compute: '/api/fhe/compute',
          keys: '/api/keys',
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
