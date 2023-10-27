import { PrismaClient } from '@prisma/client';
import {
  fakeTicketComplete,
  fakeRequestAreaComplete,
  fakeActiveTickets,
} from './fake-data';

const prisma = new PrismaClient();
let AreaLastId = 123;
let areaMaxId = AreaLastId;
export async function populateDbWithFakeDate() {
    
  await prisma.$transaction(
    Array(60)
      .fill({})
      .map((i, index) => {
        areaMaxId = AreaLastId + index;
        return prisma.requestArea.create({
          data: fakeRequestAreaComplete(areaMaxId),
        });
      })
  );

  await prisma.$transaction(
    Array(60)
      .fill({})
      .map(() =>
        prisma.ticket.create({
          data: fakeTicketComplete(AreaLastId, areaMaxId),
        })
      )
  );

  await prisma.$transaction(
    Array(60)
      .fill({})
      .map(() =>
        prisma.ticket.create({
          data: fakeActiveTickets(AreaLastId, areaMaxId),
        })
      )
  );
}
