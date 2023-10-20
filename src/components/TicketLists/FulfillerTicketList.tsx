'user client';

import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FulfillerTicket from './FulfillerTicket';
import { GET } from '@/models/Endpoints';
import { Ticket, TicketStatus } from '@/models/Ticket';
import MultiSelectFilter from '../MultiSelectFilter';
import { useState } from 'react';
import { RequestQueue } from '@/models/RequestQueue';
import { RequestArea } from '@/models/RequestArea';

interface Props {
  id?: string;
  requestAreas: RequestArea[];
  queue: RequestQueue
}
export default function FulfillerTicketList({ id, requestAreas, queue }: Props) {
  const areaNames = requestAreas.map((a) => a.Name);
  const [activeTickets, setActiveTickets] = useState<Ticket[]>([]);
  const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);
  const [cancelledTickets, setCancelledTickets] = useState<Ticket[]>([]);

  const { data } = useQuery({
    queryKey: ['requestQueue'],
    queryFn: async () => {
      const { data } = await axios.get<RequestQueue>(
        GET.RequestQueue,
        { params: { Id: id } }
      );

      const tickets = data?.Tickets;
      if (!tickets) return null;
      
      const sortedTickets = tickets.sort(
        (a, b) =>
          new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime()
      );

      const newData = {
        ActiveTickets: sortedTickets.filter(
          (ticket) =>
            ![
              TicketStatus.Confirmed,
              TicketStatus.Canceled,
              TicketStatus.Completed,
            ].includes(ticket.Status)
        ),
        CompletedTickets: sortedTickets.filter(
          (ticket) =>
            ![TicketStatus.Confirmed, TicketStatus.Completed].includes(
              ticket.Status
            )
        ),
        CancelledTickets: sortedTickets.filter(
          (ticket) => ![TicketStatus.Canceled].includes(ticket.Status)
        ),
      };

      setActiveTickets(newData.ActiveTickets as any);
      return newData;
    },
    refetchInterval: 5000,
  });

  const handleAreaFilter = (selectedAreas: string[]) => {
    console.log({ selectedAreas });
  };

  return (
    <div className='flex flex-col items-center gap-3 w-full overflow-auto h-full pb-10 px-8'>
      <MultiSelectFilter items={areaNames} onSelect={handleAreaFilter} />

      {!data?.ActiveTickets.length && (
        <div className='text-center text-gray-500'>
          There are no active request in this queue
        </div>
      )}

      {activeTickets.map((ticket) => (
          <FulfillerTicket queue={queue} key={uuidv4()} ticket={ticket} />
        ))
      }
    </div>
  );
}
