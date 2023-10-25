import PageHeader from '@/components/PageHeader';
import { FulfillerTicketList } from '@/components/TicketLists';
import { getRequestAreas, getRequestQueue } from '@/lip/requests';
import { View } from '@/models/View';
import TicketQueueProvider from '@/providers/TicketQueueProvider';

//Prevents caching for this page which we do not want.
//We want to get fetch data from data source each time to get latest tickets
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

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
        <TicketQueueProvider
          initialData={queue.Tickets}
          viewType={View.Fulfiller}
          viewId={params.id}
        >
          <FulfillerTicketList requestAreas={requestAreas} queue={queue} />
        </TicketQueueProvider>
      ) : (
        <div className='text-center py-10'>Queue is empty</div>
      )}
    </main>
  );
}
