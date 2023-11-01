import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lip/prisma';
import { Ticket, TicketStatus } from '@/models/Ticket';
import { groupByDate } from '@/lip/group-date';
import { RequestArea } from '@/models/RequestArea';
import { RequestAreaStats, RequestQueueStats, Stats } from '@/models/Stats';
import dayjs from 'dayjs';
import { RequestQueue } from '@/models/RequestQueue';
import { NumberOfDays, TimeUnit } from '@/models/TimeUnit';


export async function GET(req: NextRequest) {
    try {
        const timePeriod = await req.nextUrl.searchParams.get('timePeriod') as TimeUnit;
        const getTicketsGreaterThanOrEqualDate = getFilterDate(timePeriod)

        const requestAreasQuery = prisma.requestArea.findMany({
            include: {
                Tickets: {
                    where: {
                        CreatedOn: {
                            gte: getTicketsGreaterThanOrEqualDate
                        },
                    },
                    include: {
                        RequestQueue: true
                    }
                }
            },
        });

        const requestQueueQuery = prisma.requestQueue.findMany({
            include: {
                Tickets: {
                    where: {
                        CreatedOn: {
                            gte: getTicketsGreaterThanOrEqualDate
                        },
                    }
                }
            },
        });

        const [requestAreas, requestQueues] = await prisma.$transaction([
            requestAreasQuery,
            requestQueueQuery
        ])

        const stats: Stats = {
            ...getQueueAndPlantStats(requestQueues as any, timePeriod),
            AreaStats: getRequestAreaStat(requestAreas as any),
        }

        return NextResponse.json(stats, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to query Request Areas' },
            { status: 500 }
        );
    }
}

const getRequestAreaStat = (requestAreas: RequestArea[]) => {
    const areaStats: RequestAreaStats[] = requestAreas.map((area) => {
        const areaTickets = area.Tickets || [];
        let areaTotalWaitDuration = 0;
        let areaTicketCount = areaTickets.length;
        let activeTickets: Ticket[] = [];

        areaTickets.forEach((ticketObj) => {
            const ticket = ticketObj as unknown as Ticket;
            const ticketStatus = ticket.Status;

            if (TicketStatus.Open === ticketStatus) activeTickets.push(ticket);
            if (TicketStatus.Assigned === ticketStatus) activeTickets.push(ticket);
            if (TicketStatus.InProgress === ticketStatus) activeTickets.push(ticket);

            areaTotalWaitDuration += ticket.WaitDuration;
        });

        return {
            AvgWaitDuration: Math.ceil(areaTotalWaitDuration / areaTicketCount),
            ActiveTickets: activeTickets,
            TotalTickets: areaTicketCount,
            ...area
        };
    })

    return areaStats
}

const getQueueAndPlantStats = (requestQueues: RequestQueue[], timeUnit: TimeUnit) => {
    let plantTotalWaitDuration = 0;
    let totalTicketCount = 0;
    let totalOpenTickets = 0;
    let totalAssignedTickets = 0;
    let totalInProgressTickets = 0;

    const queueStats: RequestQueueStats[] = requestQueues.map((queue) => {
        const queueTickets = queue.Tickets || [];
        let queueTotalWaitDuration = 0;
        const queueTicketCount = queueTickets.length;
        let queueActiveTicketCount = 0;
        let queueOpenTicketCount = 0;
        let queueAssignedTicketCount = 0;
        let queueInProgressTicketCount = 0;

        queueTickets.forEach((ticketObj) => {
            const ticket = ticketObj as unknown as Ticket;
            const ticketStatus = ticket.Status;

            if (TicketStatus.Open === ticketStatus) {
                totalOpenTickets++;
                queueActiveTicketCount++;
                queueOpenTicketCount++;
            }
            if (TicketStatus.Assigned === ticketStatus) {
                totalAssignedTickets++;
                queueActiveTicketCount++;
                queueAssignedTicketCount++;
            }
            if (TicketStatus.InProgress === ticketStatus) {
                totalInProgressTickets++;
                queueActiveTicketCount++;
                queueInProgressTicketCount++;
            }

            queueTotalWaitDuration += ticket.WaitDuration;
        });

        plantTotalWaitDuration += queueTotalWaitDuration;
        totalTicketCount += queueTicketCount;

        return {
            AvgWaitDuration: Math.ceil(queueTotalWaitDuration / queueTicketCount),
            GroupedTickets: groupByDate(queueTickets, 'CreatedOn', timeUnit),
            TotalTicketCount: queueTicketCount,
            ActiveTicketCount: queueActiveTicketCount,
            OpenTicketCount: queueOpenTicketCount,
            AssignedTicketCount: queueAssignedTicketCount,
            InProgressTicketCount: queueInProgressTicketCount,
            ...queue
        };
    })

    return {
        AvgPlantWaitDuration: Math.ceil(plantTotalWaitDuration / totalTicketCount),
        TotalOpenTickets: totalOpenTickets,
        TotalAssignedTickets: totalAssignedTickets,
        TotalInProgressTickets: totalInProgressTickets,
        TotalActiveTickets: totalOpenTickets + totalAssignedTickets + totalInProgressTickets,
        QueueStats: queueStats
    }
}

const getFilterDate = (timePeriod: string | null) => {
    const numberOfDays = timePeriod ? NumberOfDays[timePeriod] : 1;
    return dayjs().subtract(numberOfDays, 'day').toISOString()
}
