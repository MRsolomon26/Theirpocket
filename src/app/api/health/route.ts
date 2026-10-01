import { NextResponse } from 'next/server';

// GET /api/health - Health check endpoint
export async function GET() {
  try {
    // Check if DATABASE_URL is configured
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      return NextResponse.json(
        {
          status: 'degraded',
          database: 'not_configured',
          message: 'DATABASE_URL environment variable not set',
        },
        { status: 503 }
      );
    }

    // Try to connect to database
    const { prisma } = await import('@/lib/db');
    
    // Simple connection test
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
