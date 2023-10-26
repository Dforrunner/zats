'use client';

import { Button } from '@mui/material';
import { QuickRequest } from '@/models/QuickRequest';
import { v4 as uuidv4 } from 'uuid';
import { RequestArea } from '@/models/RequestArea';
import { RequestQueue } from '@/models/RequestQueue';
import { TicketQueueContext } from '@/providers/TicketQueueProvider';
import { useContext } from 'react';

interface Props {
  queues: RequestQueue[];
  area?: RequestArea;
}
export default function QuickRequest({ queues, area }: Props) {
  const { addTicket } = useContext(TicketQueueContext);

  const createTicket = async (queue: RequestQueue) => {
    addTicket({
      PlantId: area!.PlantId,
      RequesterId: area!.Id,
      RequestQueueId: queue.Id,
    });
  };

  return (
    <div className='flex gap-5 px-5 py-10 justify-center w-full'>
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
  );
}
