import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lip/prisma';

export async function GET(req: NextRequest) {
    try {
        const requestAreas = await prisma.requestArea.findMany({
            include: {
                Tickets: false,
            },
        });

        return NextResponse.json(requestAreas, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to query Request Areas' }, { status: 500 });
    }
}
