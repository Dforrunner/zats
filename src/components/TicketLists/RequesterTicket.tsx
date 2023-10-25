'use client';

import { Ticket, TicketStatus } from '@/models/Ticket';
import { Button } from '@mui/material';
import TicketBase from './TicketBase';
import { RequestArea } from '@/models/RequestArea';
import { useContext } from 'react';
import { TicketQueueContext } from '@/providers/TicketQueue';

interface Props {
  ticket: Ticket;
  area: RequestArea;
}
export default function RequesterTicket({ ticket, area }: Props) {
  const { updateTicket } = useContext(TicketQueueContext);

  const handleStatusChange = async (status: TicketStatus) => {
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
      onClick={() => handleStatusChange(status)}
      className={name.replace(' ', '')}
    >
      {name}
    </Button>
  );

  return (
    <TicketBase
      title={ticket.RequestQueue!.Name}
      subtitle={`${area.Name}${
        area.Description ? ' - ' + area.Description : ''
      }`}
      ticket={ticket}
    >
      <div className='flex gap-2'>
        {ticket.Status === TicketStatus.Completed && (
          <ActionButton
            status={TicketStatus.Confirmed}
            name='Confirm Completion'
          />
        )}

        {ticket.Status !== TicketStatus.Confirmed &&
          ticket.Status !== TicketStatus.Completed && (
            <ActionButton status={TicketStatus.Canceled} name='Close Request' />
          )}
      </div>
    </TicketBase>
  );
}
