'use client';

import { Button } from '@mui/material';
import { QuickRequest } from '@/models/QuickRequest';
import { v4 as uuidv4 } from 'uuid';
import { RequestArea } from '@/models/RequestArea';
import { RequestQueue } from '@/models/RequestQueue';
import { TicketQueueContext } from '@/providers/TicketQueueProvider';
import { useContext, useState } from 'react';

interface Props {
  queues: RequestQueue[];
  area?: RequestArea;
}
export default function QuickRequest({ queues, area }: Props) {
  const { addTicket } = useContext(TicketQueueContext);
  const [msg, setMsg] = useState('');

  const createTicket = async (queue: RequestQueue) => {
    const res = await addTicket({
      RequesterId: area!.Id,
      RequestQueueId: queue.Id,
    });

    //Show response msg for a short period
    if (res) {
      setMsg(res);

      const timer = setTimeout(() => {
        setMsg('');
        clearTimeout(timer);
      }, 3000);
    }
  };

  return (
    <div className=' px-5 py-10  w-full'>
      <div className='flex gap-5 justify-center'>
        {queues.map((queue) => (
          <Button
            className='bg-blue-500 w-[30%] h-[60px]'
            variant='contained'
            key={uuidv4()}
            onClick={() => createTicket(queue)}
          >
            {queue?.Name}
          </Button>
        ))}
      </div>

      <div className='text-center h-[20px] pt-1 text-sm text-gray-600'>
        {msg}
      </div>
    </div>
  );
}
