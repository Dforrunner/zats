import { PrismaClient } from '@prisma/client';
import { timeDiffInMilliseconds } from './datetime-format';

const prismaClientSingleton = () => {
  //Extends adds computed fields based on existing data. For more info: https://www.prisma.io/docs/concepts/components/prisma-client/computed-fields
  return new PrismaClient().$extends({
    result: {
      ticket: {
        WaitDuration: {
          needs: { CreatedOn: true, CompletedOn: true },
          compute(ticket) {
            return timeDiffInMilliseconds(ticket.CreatedOn, ticket.CompletedOn);
          },
        },
      },
    },
  })
    .$extends({
      result: {
        requestArea: {
          Title: {
            needs: { Name: true, Description: true },
            compute(area) {
              return `${area.Name}${area.Description ? ' - ' + area.Description : ''
                }`;
            },
          },
        },
      },
    });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma;
