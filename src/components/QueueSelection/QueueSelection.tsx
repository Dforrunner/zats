import Link from '../Link';
import { v4 as uuidv4 } from 'uuid';
import { getRequestQueues } from '@/lip/requests';

export default async function QueueSelection() {
  const queues = await getRequestQueues();

  if (!queues.length)
    return <div className='text-center py-10'>Queues not found</div>;

  return (
    <div className='w-full px-5 pt-10 flex flex-col gap-5'>
      {queues.map((queue) => (
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
