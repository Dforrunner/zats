/**
 * This file is used to populate the database with dummy data 
 */
import prisma from '@/lip/prisma';

import {
    fakeTicketComplete,
    fakeRequestAreaComplete,
    fakeActiveTickets,
} from './dummyDataGenFunction';

/**
 * This function populates the database with dummy RequestAreas, Completed Tickets and Active Tickets.
 * NOTE: Queues need to be added manually. You can use the prisma studio to do so. Just run "npx prisma studio". 
 * You may need to run "npx prisma generate" if you haven't done so or the prisma schema changed 
 */
interface Props {
    numberOfAreasToAdd?: number,
    numberOfCompletedTicketsToAdd?: number
    numberOfActiveTicketsToAdd?: number //If not specified it'll randomly add between numberOfAreasToAdd and numberOfAreasToAdd*numberOfQueues
}
export async function populateDbWithDummyData(props: Props = { numberOfAreasToAdd: 55, numberOfCompletedTicketsToAdd: 1000 }) {

    const queues = await prisma.requestQueue.findMany();
    if (!queues || !queues.length) {
        throw new Error('Queues not found. Create queues manually since there will only be a few');
    }

    const queueIdsSorted = queues.map(a => a.Id).sort((a, b) => a - b);
    let areas = await prisma.requestArea.findMany();
    let areaMaxId = 0;
    const newAreaIds: number[] = [];

    //If area doesn't exist in DB we need to create one to get the ID for a starting point
    if (!areas || !areas.length) {
        const res = await prisma.requestArea.create({
            data: fakeRequestAreaComplete(0),
        });
        areaMaxId = res.Id;
    } else {
        const areaIdsSorted = areas.map(a => a.Id).sort((a, b) => a - b)
        areaMaxId = areaIdsSorted[areaIdsSorted.length - 1] || 0;
    }

    //ADD Request Areas
    try {
        await prisma.$transaction(
            Array(props.numberOfAreasToAdd)
                .fill({})
                .map((i, index) => {
                    areaMaxId++;
                    newAreaIds.push(areaMaxId);
                    return prisma.requestArea.create({
                        data: fakeRequestAreaComplete(areaMaxId),
                    });
                })
        );
    } catch (e) {
        console.log('Failed to create dummy request areas', e)
    }

    //ADD Confirmed Tickets
    try {
        await prisma.$transaction(
            Array(props.numberOfCompletedTicketsToAdd)
                .fill({})
                .map(() => {
                    return prisma.ticket.create({
                        data: fakeTicketComplete(newAreaIds, queueIdsSorted),
                    })
                }
                )
        );
    } catch (e) {
        console.log('Failed to create dummy confirmed tickets', e)
    }

    //ADD Active Tickets
    try {

        const activeTickets = fakeActiveTickets(newAreaIds, queueIdsSorted).map(ticket => {

            return prisma.ticket.create({
                data: ticket,
            })
        })
        await prisma.$transaction(
            props.numberOfActiveTicketsToAdd ? activeTickets.slice(0, props.numberOfActiveTicketsToAdd) : activeTickets
        )
    } catch (e) {
        console.log('Failed to create dummy active tickets', e)
    }
}


export async function populateDbWithDummyConfirmedTickets(numberOfCompletedTicketsToAdd = 1000) {

    const queues = await prisma.requestQueue.findMany();
    if (!queues || !queues.length) {
        throw new Error('Queues not found. Create queues manually since there will only be a few');
    }

    const queueIdsSorted = queues.map(a => a.Id).sort((a, b) => a - b);
    const areas = await prisma.requestArea.findMany();

    const areaIdsSorted = areas.map(a => a.Id).sort((a, b) => a - b)

    //ADD Confirmed Tickets
    await prisma.$transaction(
        Array(numberOfCompletedTicketsToAdd)
            .fill({})
            .map(() =>
                prisma.ticket.create({
                    data: fakeTicketComplete(areaIdsSorted, queueIdsSorted),
                })
            )
    );
}