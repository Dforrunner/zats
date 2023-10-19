import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lip/prisma';
import { Ticket, TicketStatus } from '@/models/Ticket';

export async function GET(req: NextRequest) {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        Requester: true,
        RequestQueue: true
      }
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to query tickets' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ticket = await req.json() as Ticket;
    const data = {} as any;

    if (!ticket.Status) {
      return NextResponse.json({ message: 'Changes not detected' }, { status: 400 })
    }

    if (ticket.Status) {
      data.Status = ticket.Status
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

    console.log({ data })


    const updatedTicket = await prisma.ticket.update({
      include: {
        Requester: true,
        RequestQueue: true
      },
      where: {
        Id: ticket.Id
      },
      data
    })

    return NextResponse.json(updatedTicket, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}