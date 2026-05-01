import { NextResponse } from 'next/server';
import { downloadQueue } from '@/lib/downloadQueue';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = downloadQueue.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { activeDownloads: 0, queueLength: 0, maxConcurrent: 2, estimatedWait: 0 }
    );
  }
}