import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lip/prisma';
import { Ticket, TicketStatus } from '@/models/Ticket';
import { TicketPostBody } from '@/models/RequestDataModels';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        Requester: true,
        RequestQueue: true,
      },
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to query tickets' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as TicketPostBody;

    //TODO: Add request validation
    const schema = z.object({
      RequestQueueId: z.number(),
      RequesterId: z.number(),
    });

    const response = schema.safeParse(data);
  
    if (!response.success) {
      const { errors } = response.error;
      return NextResponse.json({ error: 'Invalid request', errors }, { status: 400 });
    }

    const ticketExists = await prisma.ticket.findFirst({
      where: {
        RequestQueueId: data.RequestQueueId,
        RequesterId: data.RequesterId,
        NOT: {
          Status: {
            in: [TicketStatus.Canceled, TicketStatus.Confirmed],
          },
        },
      },
    });

    if (ticketExists) {
      return NextResponse.json(
        { message: 'This request has been created already' },
        { status: 409 }
      );
    }

    const insertedTicket = await prisma.ticket.create({
      data: {
        RequestQueue: {
          connect: {
            Id: data.RequestQueueId,
          },
        },
        Requester: {
          connect: {
            Id: data.RequesterId,
          },
        },
      },
      include: {
        Requester: true,
        RequestQueue: true,
      },
    });

    return NextResponse.json(insertedTicket, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const ticket = (await req.json()) as Ticket;
    const data = {} as any;

    if (!ticket.Status) {
      return NextResponse.json({ message: 'Changes not detected' }, { status: 400 });
    }

    if (ticket.Status) {
      data.Status = ticket.Status;
    }
    if (!ticket.AssignedOn && ticket.Status === TicketStatus.Assigned) {
      data.AssignedOn = new Date().toISOString();
    }
    if (!ticket.StartedOn && ticket.Status === TicketStatus.InProgress) {
      data.StartedOn = new Date().toISOString();
    }
    if (!ticket.CompletedOn && ticket.Status === TicketStatus.Completed) {
      data.CompletedOn = new Date().toISOString();
    }

    const updatedTicket = await prisma.ticket.update({
      include: {
        Requester: true,
        RequestQueue: true,
      },
      where: {
        Id: ticket.Id,
      },
      data,
    });

    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (e) {
    console.error({ e });
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}
