import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lip/prisma';

export async function GET(req: NextRequest) {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        Requestor: true,
        Type: true
      }
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to query tickets' }, { status: 500 });
  }
}
