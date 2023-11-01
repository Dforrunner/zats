import { TicketStatus } from '@/models/Ticket';

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

export function fakeTicketComplete(areaIdsSorted: number[], queueIdsSorted: number[]) {
  const createdOn = randomDate(
    new Date('2022-10-30T00:00:00'),
    new Date(),
    8,
    17
  );

  const t1 = 1 * 60000; //1mins
  const t2 = randomInt(10, 120) * 60000; //1 - 120 mins
  const startedOn = randomDate(
    new Date(createdOn.getTime() + t1),
    new Date(createdOn.getTime() + t2),
    createdOn.getHours(),
    23
  );

  const c1 = 5 * 60000; //5mins
  const c2 = randomInt(15, 120) * 60000; //5 - 120 mins
  const completedOn = randomDate(
    new Date(startedOn.getTime() + c1),
    new Date(startedOn.getTime() + c2),
    startedOn.getHours(),
    23
  );

  return {
    CreatedOn: createdOn,
    AssignedOn: undefined,
    StartedOn: startedOn,
    CompletedOn: completedOn,
    Status: 'Confirmed',
    Requester: {
      connect: {
        Id: areaIdsSorted[randomInt(0, areaIdsSorted.length - 1)],
      },
    },
    RequestQueue: {
      connect: {
        Id: queueIdsSorted[randomInt(0, queueIdsSorted.length - 1)],
      },
    },
  };
}


export function fakeActiveTickets(areaIdsSorted: number[], queueIdsSorted: number[]) {

  const CreatedOn = new Date();

  const t1 = 1 * 60000; //1mins
  const t2 = randomInt(10, 120) * 60000; //1 - 120 mins
  const assignedOn = randomDate(
    new Date(CreatedOn.getTime() + t1),
    new Date(CreatedOn.getTime() + t2),
    8,
    17
  );

  const startedOn = randomDate(
    new Date(assignedOn.getTime() + t1),
    new Date(assignedOn.getTime() + t2),
    8,
    17
  );


  const ticketBase = (queueId: number, requesterId: number) => ({
    CreatedOn: CreatedOn,
    CompletedOn: undefined,
    Requester: {
      connect: {
        Id: requesterId,
      },
    },
    RequestQueue: {
      connect: {
        Id: queueId,
      },
    },
  });

  const ticketOptions = (queueId: number, requesterId: number) => [
    {
      ...ticketBase(queueId, requesterId),
      Status: TicketStatus.Open,
      AssignedOn: undefined,
      StartedOn: undefined,
    },
    {
      ...ticketBase(queueId, requesterId),
      Status: TicketStatus.Assigned,
      AssignedOn: assignedOn,
      StartedOn: undefined,
    },
    {
      ...ticketBase(queueId, requesterId),
      Status: TicketStatus.InProgress,
      AssignedOn: assignedOn,
      StartedOn: startedOn,
    }
  ]

  const queueMinId = queueIdsSorted[0];
  const queueMaxId = queueIdsSorted[queueIdsSorted.length - 1];

  const randNumOfTickets = () => randomInt(0, queueMaxId - queueMinId + 1);

  const allActiveTickets: any[] = [];
  let ticketIndex = 0;
  areaIdsSorted.map(areaId => {
    const areaTickets = Array(randNumOfTickets()).fill({}).map((_, index) => {
      if (ticketIndex > ticketOptions(0, 0).length) {
        ticketIndex = 0
      }
      return ticketOptions(queueIdsSorted[index], areaId)[ticketIndex++]
    });

    allActiveTickets.push(...areaTickets)
  })


  return allActiveTickets.filter(t => !!t);
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