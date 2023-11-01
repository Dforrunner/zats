'user client';

import { v4 as uuidv4 } from 'uuid';
import FulfillerTicket from './FulfillerTicket';
import { TicketStatus } from '@/models/Ticket';
import MultiSelectFilter from '../MultiSelectFilter';
import { useContext, useEffect, useState } from 'react';
import { RequestQueue } from '@/models/RequestQueue';
import { RequestArea } from '@/models/RequestArea';
import { TicketFilters } from '@/models/TicketFilters';
import { TicketQueueContext } from '@/providers/TicketQueueProvider';

interface Props {
  requestAreas: RequestArea[];
  queue: RequestQueue;
}
export default function FulfillerTicketList({ requestAreas, queue }: Props) {
  const areaNames = requestAreas.map((a) => a.Name);
  const { ticketList } = useContext(TicketQueueContext);
  const [filter, setFilters] = useState<TicketFilters>({
    Areas: [],
    Statuses: [],
  });

  const sortedTickets = ticketList.sort(
    (a, b) => new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime() //Sorting by date
  );

  const allActiveTickets = sortedTickets.filter(
    (ticket) =>
      ![
        TicketStatus.Confirmed,
        TicketStatus.Canceled,
        TicketStatus.Completed,
      ].includes(ticket.Status)
  );

  const [tickets, setTickets] = useState(allActiveTickets);

  //Runs filter logic every time ticketList data changes
  useEffect(() => {
    handleFilter(filter);
  }, [ticketList]);

  const handleFilter = (filters: TicketFilters) => {
    setFilters(filters);
    const { Areas, Statuses } = filters;

    if (!Areas.length && !Statuses.length) {
      return setTickets(allActiveTickets);
    }

    if (Areas.length && Statuses.length) {
      return setTickets(
        ticketList.filter(
          (ticket) =>
            Areas.includes(ticket.Requester?.Name) &&
            Statuses.includes(ticket.Status)
        )
      );
    }

    if (!Areas.length && Statuses.length) {
      return setTickets(
        ticketList.filter((ticket) => Statuses.includes(ticket.Status))
      );
    }

    setTickets(
      allActiveTickets.filter((t) => Areas.includes(t.Requester?.Name))
    );
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='w-full px-10'>
        <MultiSelectFilter items={areaNames} onSelect={handleFilter} />
      </div>

      <div className='overflow-auto w-full pb-10 px-8'>
        {tickets.map((ticket) => (
          <FulfillerTicket
            queue={queue}
            key={ticket.Id + 'fulfiller'}
            ticket={ticket}
          />
        ))}
      </div>

      {!tickets.length && (
        <div className='text-center text-gray-500'>
          There are no active request in this queue
        </div>
      )}
    </div>
  );
}
