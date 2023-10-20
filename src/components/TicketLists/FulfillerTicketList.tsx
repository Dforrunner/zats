'user client';

import { v4 as uuidv4 } from 'uuid';
import { RequestQueue } from '@/models/RequestQueue';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FulfillerTicket from './FulfillerTicket';
import { GET } from '@/models/Endpoints';
import PageHeader from '../PageHeader';
import { TicketStatus } from '@/models/Ticket';

interface Props {
  id?: string;
}
export default function FulfillerTicketList({ id }: Props) {
  const { data } = useQuery({
    queryKey: ['requestQueue'],
    queryFn: async () => {
      const { data } = await axios.get(GET.RequestQueue, { params: { Id: id } });
      return data as RequestQueue;
    },
    refetchInterval: 5000,
  });

  return (
    <div className='flex flex-col items-center gap-3 w-full overflow-auto h-full pb-10 px-8'>
      <PageHeader title={data?.Name} />

      {data?.Tickets?.filter((t) => ![TicketStatus.Confirmed, TicketStatus.Canceled, TicketStatus.Completed].includes(t.Status))
        .sort((a, b) => new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime())
        .map((ticket) => (
          <FulfillerTicket queue={data} key={uuidv4()} ticket={ticket} />
        ))}
    </div>
  );
}
