'use client';

import { Button } from '@mui/material';
import { QuickRequest } from '@/models/QuickRequest';
import { v4 as uuidv4 } from 'uuid';
import { RequestArea, RequestQueue } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { POST } from '@/models/Endpoints';
import axios from 'axios';
import { queryClient } from '@/context/TanStackContext';
import { TicketPostBody } from '@/models/RequestDataModels';

interface Props {
  queues: RequestQueue[];
  area?: RequestArea;
}
export default function QuickRequest({ queues, area }: Props) {
  const mutation = useMutation({
    mutationFn: (data: TicketPostBody) => {
      return axios.post(POST.Ticket, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['requesterArea'],
      });
    },
  });

  const createTicket = (queue: RequestQueue) => {
    if (area) {
      mutation.mutate({
        PlantId: area.PlantId,
        RequesterId: area.Id,
        RequestQueueId: queue.Id,
      });
    }
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
