import PageHeader from '@/components/PageHeader';
import { FulfillerTicketList } from '@/components/TicketLists';
import { getRequestAreas, getRequestQueue } from '@/lip/requests';
import TicketQueueProvider from '@/providers/TicketStore';

interface Props {
  params: {
    id: string;
  };
}
export default async function Page({ params }: Props) {
  const queue = await getRequestQueue(params.id);

  const tickets = !!queue.Tickets?.length;

  const requestAreas = tickets ? await getRequestAreas() : [];

  return (
    <main className='w-screen h-screen'>
      <PageHeader title={queue?.Name} href='/fulfiller' />
      {tickets ? (
        <TicketQueueProvider initialData={queue.Tickets}>
          <FulfillerTicketList
            requestAreas={requestAreas}
            queue={queue}
          />
        </TicketQueueProvider>
      ) : (
        <div className='text-center py-10'>Queue is empty</div>
      )}
    </main>
  );
}
