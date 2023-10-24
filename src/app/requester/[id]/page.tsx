import PageHeader from '@/components/PageHeader';
import QuickRequests from '@/components/QuickRequests';
import { RequesterTicketList } from '@/components/TicketLists';
import { getRequestArea, getRequestQueues } from '@/lip/requests';
import TicketQueueProvider from '@/providers/TicketStore/TicketQueueProvider';

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
      <div className='progress-animation' />
      <PageHeader
        title={`${area?.Name} ${
          area?.Description ? ' - ' + area?.Description : ''
        }`}
        href='/requester'
      />
      <TicketQueueProvider initialData={area.Tickets}>
        <QuickRequests queues={queues} area={area} />
        <RequesterTicketList area={area} />
      </TicketQueueProvider>
    </main>
  );
}
