import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

/**
 * Health check endpoint
 * Returns basic app status with unique request ID and timestamp
 */
export async function GET() {
  try {
    const requestId = randomUUID();
    const timestamp = new Date().toISOString();
    
    return NextResponse.json({
      ok: true,
      request_id: requestId,
      ts: timestamp,
      app: 'GSC Intelligence',
      version: '1.0.0',
      environment: process.env.NEXT_PUBLIC_ENV || 'dev'
    }, {
      status: 200,
      headers: {
        'X-Request-ID': requestId,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      ok: false,
      error: 'Health check failed',
      request_id: randomUUID(),
      ts: new Date().toISOString()
    }, {
      status: 500
    });
  }
}