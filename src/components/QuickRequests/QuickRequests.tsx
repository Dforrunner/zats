'use client';

import { Button } from '@mui/material';
import { QuickRequest } from '@/models/QuickRequest';
import { v4 as uuidv4 } from 'uuid';
import { RequestArea, RequestQueue } from '@prisma/client';

interface Props {
  queues: RequestQueue[];
  area?: RequestArea 
}
export default function QuickRequest({ queues, area }: Props) {
  const createTicket = (queue: RequestQueue) => {
    
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
          {queue.Name}
        </Button>
      ))}
    </div>
  );
}
