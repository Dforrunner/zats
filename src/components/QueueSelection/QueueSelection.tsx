'use client';

import { RequestQueue } from '@/models/RequestQueue';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from '../Link';
import { v4 as uuidv4 } from 'uuid';
import { GET } from '@/models/Endpoints';

export default function QueueSelection() {
  const { data } = useQuery({
    queryKey: ['requestQueueList'],
    queryFn: async () => {
      const { data } = await axios.get(GET.RequestQueues);
      return data as RequestQueue[];
    },
  });

  return (
    <div className='w-full px-5 flex flex-col gap-5'>
      {data &&
        data.length &&
        data.map((queue) => (
          <Link
            href={`/fulfiller/${queue.Id}`}
            type='button'
            variant='contained'
            key={uuidv4()}
            className={`bg-blue-500 w-full h-[100px] text-2xl`}
          >
            {queue.Name}
          </Link>
        ))}
    </div>
  );
}
