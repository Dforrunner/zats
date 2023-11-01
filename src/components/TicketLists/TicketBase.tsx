'use client';

import { ReactNode } from 'react';
import { Ticket } from '@/models/Ticket';
import { formatDate, formatTimeFromSeconds } from '@/lip/datetime-format';
import Brightness1Icon from '@mui/icons-material/Brightness1';

interface Props {
  title: string;
  subtitle?: string;
  ticket: Ticket;
  children?: ReactNode;
}
export default function TicketBase({
  title,
  subtitle,
  ticket,
  children,
}: Props) {
  const waitDurationInMins = ticket.WaitDuration / 60000;
  const borderColorOpacity =
    waitDurationInMins <= 15 ? 0 : Math.round(waitDurationInMins / 15) * 0.1;
  console.log(borderColorOpacity);
  return (
    <div
      className={
        'w-full h-[200px] border-[5px] border-slate-300 bg-white border-solid rounded flex flex-col justify-between p-3 my-3 '
      }
      style={{
        borderColor: borderColorOpacity
          ? `rgba(255, 0, 0, ${borderColorOpacity})`
          : 'rgb(203,213,225)',
        borderWidth: borderColorOpacity ? '5px' : '1px',
      }}
    >
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-2xl'>{title}</div>
          <div className='text-muted'>{subtitle}</div>
        </div>
        <div
          className={
            'flex items-start justify-end relative gap-1 ' +
            ticket.Status.replace(' ', '')
          }
        >
          <Brightness1Icon className={ticket.Status} />
          {ticket.Status}
        </div>
      </div>

      <div className='flex justify-between gap-3 '>
        <div className='text-sm text-gray-700'>
          <div>Created On: {formatDate(ticket.CreatedOn)}</div>
          <div>
            Started On:
            <span className='pl-1'>
              {ticket.StartedOn ? formatDate(ticket.StartedOn) : 'waiting'}
            </span>
          </div>
          <div>Wait Duration: {formatTimeFromSeconds(ticket.WaitDuration)}</div>
        </div>
        <div className='flex gap-2'>{children}</div>
      </div>
    </div>
  );
}
