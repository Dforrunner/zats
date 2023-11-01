import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lip/prisma';
import { fakeTicketComplete } from '../../../../../prisma/fake-data';
import { populateDbWithFakeDate } from '../../../../../prisma/script';

export async function GET(req: NextRequest) {
  try {
    await populateDbWithFakeDate();
    const requestAreas = await prisma.requestArea.findMany({
      include: {
        Tickets: {
          include: {
            RequestQueue: true,
          },
        },
      },
    });

    return NextResponse.json(requestAreas, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to query Request Areas' },
      { status: 500 }
    );
  }
}
