import { TicketStatus } from '@/models/Ticket';
import { faker } from '@faker-js/faker';

function randomDate(
  start: Date,
  end: Date,
  startHour: number,
  endHour: number
) {
  var date = new Date(
    +start + Math.random() * (end.getTime() - start.getTime())
  );
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
}
function randomInt(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const randomQueue = () => randomInt(1, 3);
const randomArea = (max: number) => randomInt(1, max);

export function fakeTicketComplete(areaIdMin:number, areaIdMax: number) {
  const CreatedOn = randomDate(
    new Date('2018-01-01T00:00:00'),
    new Date(),
    8,
    17
  );

  const t1 = 1 * 60000; //1mins
  const t2 = randomInt(1, 120) * 60000; //1 - 120 mins
  const startedOn = randomDate(
    new Date(CreatedOn.getTime() + t1),
    new Date(CreatedOn.getTime() + t2),
    8,
    17
  );

  const c1 = 5 * 60000; //5mins
  const c2 = randomInt(5, 120) * 60000; //5 - 120 mins
  const completedOn = randomDate(
    new Date(startedOn.getTime() + c1),
    new Date(startedOn.getTime() + c2),
    8,
    17
  );

  return {
    CreatedOn: CreatedOn,
    AssignedOn: undefined,
    StartedOn: startedOn,
    CompletedOn: completedOn,
    Status: 'Confirmed',
    Requester: {
      connect: {
        Id: randomInt(areaIdMin, areaIdMax),
      },
    },
    RequestQueue: {
      connect: {
        Id: randomQueue(),
      },
    },
  };
}

const requester = {} as any;

export function fakeActiveTickets(areaIdMin: number, areaIdMax: number) {
  const randRequester = randomInt(areaIdMin, areaIdMax);
  const randQueue = 1;
  
  if (!requester[randRequester]) {
    requester[randRequester] = [randQueue];
  }

  if (requester[randRequester]?.includes(randQueue)) {
    console.log('Try again', requester[randRequester], randQueue);
    return fakeActiveTickets(areaIdMin, areaIdMax);
  }

  return {
    CreatedOn: new Date(),
    AssignedOn: undefined,
    StartedOn: undefined,
    CompletedOn: undefined,
    Status: [TicketStatus.Open, TicketStatus.Assigned, TicketStatus.InProgress][
      randomInt(0, 2)
    ],
    Requester: {
      connect: {
        Id: randQueue,
      },
    },
    RequestQueue: {
      connect: {
        Id: randRequester,
      },
    },
  };
}


export function fakeRequestAreaComplete(AreaId: number) {
  return {
    Name: `Area ${AreaId}`,
    Description: capitalizeFirstLetter(
      (Math.random() + 1).toString(36).substring(7)
    ),
    Status: 'Active',
    CreatedOn: new Date(),
  };
}
