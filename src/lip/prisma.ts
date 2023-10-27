import { getTimeInSeconds } from '@/helpers/datetime-format';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient()
    .$extends({
      result: {
        ticket: {
          WaitTime: {
            compute(ticket) {
              return getTimeInSeconds(ticket.CreatedOn, ticket.CompletedOn);
            },
          },
        },
      },
    })
    .$extends({
      result: {
        requestArea: {
          Title: {
            compute(area) {
              return `${area.Name}${
                area.Description ? ' - ' + area.Description : ''
              }`;
            },
          },
        },
      },
    });;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
