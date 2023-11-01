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
    color,
    name,
  }: {
    status: TicketStatus;
    color: string;
    name: string;
  }) => (
    <Button
      variant='outlined'
      onClick={() => update(status)}
      className={'w-[180px] ' + color}
    >
      {name}
    </Button>
  );

  return (
    <TicketBase
      title={ticket.Requester?.Title}
      subtitle={queue?.Name}
      ticket={ticket}
    >
      <div className='flex gap-2'>
        {(() => {
          switch (ticket.Status) {
            case TicketStatus.Open:
              return (
                <ActionButton
                  status={TicketStatus.Assigned}
                  name='Acknowledge'
                  color='Accept'
                />
              );
            case TicketStatus.Assigned:
              return (
                <ActionButton
                  status={TicketStatus.InProgress}
                  name='Mark In Progress'
                  color='Start'
                />
              );
            case TicketStatus.InProgress:
              return (
                <ActionButton
                  status={TicketStatus.Completed}
                  name='Mark Complete'
                  color='Complete'
                />
              );
            default:
              return;
          }
        })()}
      </div>
    </TicketBase>
  );
}
