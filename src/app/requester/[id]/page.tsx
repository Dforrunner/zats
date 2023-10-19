import PageHeader from '@/components/PageHeader';
import QuickRequests from '@/components/QuickRequests';
import { RequesterTicketList } from '@/components/TicketLists';
import prisma from '@/lip/prisma';
import { RequestArea } from '@prisma/client';

async function getQueues() {
  return await prisma.requestQueue.findMany();
}

async function getArea(id: number) {
  return await prisma.requestArea.findFirst({
    where: {
      Id: id
    }
  });
}

interface Props {
  params: {
    id: string;
  };
}
export default async function Page({ params }: Props) {
  const queues = await getQueues();
  const area = await getArea(Number(params.id));

  return (
    <main className='w-screen h-screen'>
      {area && 
      <>
        <PageHeader title={`${area?.Name} ${area?.Description ? ' - ' + area?.Description : ''}`} />
        <QuickRequests queues={queues} area={area}/>
        <RequesterTicketList id={params.id} area={area}/>
      </>
      }
      
    </main>
  );
}
