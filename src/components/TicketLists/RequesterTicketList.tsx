'use client';

import { v4 as uuidv4 } from 'uuid';
import RequesterTicket from './RequesterTicket';
import { TicketStatus } from '@/models/Ticket';
import { RequestArea } from '@/models/RequestArea';
import { useContext } from 'react';
import { TicketQueueContext } from '@/providers/TicketQueueProvider';

interface Props {
  area: RequestArea;
}
export default function RequesterTicketList({ area }: Props) {
  const { ticketList } = useContext(TicketQueueContext);

  if (!ticketList!.length) return <div className='text-center'>No tickets</div>;

  return (
    <div className='w-full overflow-auto h-full pb-[400px] px-8'>
      {ticketList
        .filter(
          (t) =>
            ![TicketStatus.Confirmed, TicketStatus.Canceled].includes(
              t.Status as TicketStatus
            )
        )
        .sort(
          (a, b) =>
            new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime()
        )
        .map((ticket) => (
          <RequesterTicket
            key={ticket.Id + 'requester'}
            ticket={ticket as any}
            area={area}
          />
        ))}
    </div>
  );
}
