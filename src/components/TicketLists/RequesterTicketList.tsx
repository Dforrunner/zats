'user client';

import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RequesterTicket from './RequesterTicket';
import { RequestArea } from '@/models/RequestArea';
import { GET } from '@/models/Endpoints';
import { TicketStatus } from '@/models/Ticket';

interface Props {
  id?: string;
  area: any; //TODO: fix type to match prisma RequestArea type
}
export default function RequesterTicketList({ id }: Props) {
  const { data } = useQuery({
    queryKey: ['requesterArea'],
    queryFn: async () => {
      const { data } = await axios.get(GET.RequestArea, { params: { Id: id } });
      return data as RequestArea;
    },
    refetchInterval: 15000,
  });

  return (
    <div className='w-full overflow-auto h-full pb-[400px] px-8'>
      {data?.Tickets?.filter(
        (t) => ![TicketStatus.Confirmed, TicketStatus.Canceled].includes(t.Status)
      )
        .sort((a, b) => new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime())
        .map((ticket) => (
          <RequesterTicket key={uuidv4()} ticket={ticket} area={data} />
        ))}
    </div>
  );
}
