'use client';

import { Ticket, TicketStatus } from '@/models/Ticket';
import { Button } from '@mui/material';
import TicketBase from './TicketBase';
import { RequestQueue } from '@/models/RequestQueue';
import { useContext } from 'react';
import { TicketQueueContext } from '@/providers/TicketQueueProvider';

interface Props {
  ticket: Ticket;
  queue: RequestQueue;
}
export default function FulfillerTicket({ ticket, queue }: Props) {
  const { updateTicket } = useContext(TicketQueueContext);

  const update = (status: TicketStatus) => {
    updateTicket({
      ...ticket,
      Status: status,
    });
  };

  const ActionButton = ({
    status,
    name,
  }: {
    status: TicketStatus;
    name: string;
  }) => (
    <Button
      variant='outlined'
      onClick={() => update(status)}
      className={'w-[150px] ' + name}
    >
      {name}
    </Button>
  );

  return (
    <TicketBase
      title={`${ticket.Requester.Name} ${
        ticket.Requester.Description ? ' - ' + ticket.Requester.Description : ''
      }`}
      subtitle={queue.Name}
      ticket={ticket}
    >
      <div className='flex gap-2'>
        {(() => {
          switch (ticket.Status) {
            case TicketStatus.Open:
              return (
                <ActionButton status={TicketStatus.Assigned} name='Accept' />
              );
            case TicketStatus.Assigned:
              return (
                <ActionButton status={TicketStatus.InProgress} name='Start' />
              );
            case TicketStatus.InProgress:
              return (
                <ActionButton status={TicketStatus.Completed} name='Complete' />
              );
            default:
              return;
          }
        })()}
      </div>
    </TicketBase>
  );
}
