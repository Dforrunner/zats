'use client';

import { ReactNode } from 'react';
import { Ticket } from '@/models/Ticket';
import { Button } from '@mui/material';
import { formatDate } from '@/helpers/datetime-format';
import Brightness1Icon from '@mui/icons-material/Brightness1';

interface Props {
  ticket: Ticket,
  children?: ReactNode
}
export default function TicketBase({ ticket, children }: Props) {

  return (
    <div className='w-[90%] h-[200px] border-[1px] border-slate-400 border-solid rounded bg-white flex flex-col justify-between p-3'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-2xl'>{ticket.Type?.Name}</div>
          <div className='text-muted'>{ticket.Requestor?.Name}</div>
        </div>
        <div className='flex flex-col items-end relative'>
          <Button
            className={`w-[130px] ${ticket.Status}`}
            startIcon={<Brightness1Icon className={ticket.Status} />}
          >
            {ticket.Status}
          </Button>
        </div>
      </div>

      <div className='flex justify-between gap-3 '>
        <div className='text-sm text-gray-700'>
          <div>Created On: {formatDate(ticket.CreatedOn)}</div>
          <div>
            Accepted On:
            <span className='pl-1'>
              {ticket.StartedOn ? formatDate(ticket.StartedOn) : 'Waiting'}
            </span>
          </div>
        </div>
        <div className='flex gap-2'>
          {children}
        </div>

      </div>
    </div>
  );
}
