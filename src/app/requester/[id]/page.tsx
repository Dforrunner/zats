import PageHeader from '@/components/PageHeader';
import QuickRequests from '@/components/QuickRequests';
import { RequesterTicketList } from '@/components/TicketLists';
import { getRequestArea, getRequestQueues } from '@/lip/requests';
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
  const area = await getRequestArea(params.id);
  const queues = await getRequestQueues();

  return (
    <main className='w-screen h-screen overflow-hidden'>
      <PageHeader
        title={`${area?.Name} ${
          area?.Description ? ' - ' + area?.Description : ''
        }`}
        href='/requester'
      />
      <TicketQueueProvider
        initialData={area.Tickets}
        viewType={View.Requestor}
        viewId={params.id}
      >
        <QuickRequests queues={queues} area={area} />
        <RequesterTicketList area={area} />
      </TicketQueueProvider>
    </main>
  );
}
