import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lip/prisma';

export async function GET(req: NextRequest) {
  try {
    const requestQueues = await prisma.requestQueue.findMany({
      include: {
        Tickets: false,
      },
    });

    return NextResponse.json(requestQueues, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to query Request requestQueues' }, { status: 500 });
  }
}
