'user client';

import { v4 as uuidv4 } from 'uuid';
import { View } from '@/models/View';
import { Ticket } from '@/models/Ticket';
import TicketBase from './TicketBase';
import { RequestQueue } from '@/models/RequestQueue';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  view: View;
  id?: string;
}

export default function TicketList({ view, id }: Props) {
    console.log({id});
  const { data, isLoading, isError } = useQuery({
    queryKey: ['requestQueue'],
    queryFn: async () => {
      const { data } = await axios.get('/api/queue', { params: { Id: id } });
      return data as RequestQueue;
    },
  });
  return (
    <div className='flex flex-col items-center gap-3 w-full overflow-auto h-full pb-10'>
      {view === View.Requestor &&
        data?.Tickets?.map((ticket) => <TicketBase key={uuidv4()} ticket={ticket} />)}
      {view === View.Fulfiller &&
        data?.Tickets?.map((ticket) => <TicketBase key={uuidv4()} ticket={ticket} />)}
    </div>
  );
}
