import PageHeader from '@/components/PageHeader';
import { FulfillerTicketList } from '@/components/TicketLists';
import prisma from '@/lip/prisma';
import { RequestArea } from '@/models/RequestArea';
import { RequestQueue } from '@/models/RequestQueue';
import { redirect } from 'next/navigation';

const getRequestQueue = async (id: number) => {
  return await prisma.requestQueue.findFirst({
    where: {
      Id: id,
    },
  }) as RequestQueue;
};

const getRequestAreas = async () => {
  return await prisma.requestArea.findMany({
    where: {
      Status: 'Active',
    },
  });
};

interface Props {
  params: {
    id: string;
  };
}
export default async function Page({ params }: Props) {
  const queue = await getRequestQueue(Number(params.id));

  if(!queue) return redirect('/fulfiller');

  const requestAreas = await getRequestAreas();
  return (
    <main className='w-screen h-screen'>
      <PageHeader title={queue?.Name} />     
      <FulfillerTicketList id={params.id} requestAreas={requestAreas as RequestArea} queue={queue}/>
    </main>
  );
}
