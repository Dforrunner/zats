import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lip/prisma';

export async function GET(req: NextRequest) {
  const queueId = await req.nextUrl.searchParams.get('Id');
  console.log({ queueId });
  // if (!queueId) {
  //   return NextResponse.redirect('/fulfiller');
  // }

  try {
    const requestQueue = await prisma.requestArea.findFirst({
      where: {
        Id: Number(queueId),
      },
      include: {
        Tickets: {
          include: {
            RequestQueue: true
          }
        }
      },
    });

    // if (!requestQueue) return NextResponse.redirect('/fulfiller');

    return NextResponse.json(requestQueue, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to query Request Queues' }, { status: 500 });
  }
}
