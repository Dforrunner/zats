import { NextResponse } from 'next/server';
import prisma from '@/lip/prisma';

export async function GET() {
  try {
    const requestQueues = await prisma.requestQueue.findMany();

    return NextResponse.json(requestQueues, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to query Request Queues' }, { status: 500 });
  }
}
