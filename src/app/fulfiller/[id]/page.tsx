import { FulfillerTicketList } from '@/components/TicketLists';

interface Props {
  params: {
    id: string;
  };
}
export default function Page({ params }: Props) {
  return (
    <main className='w-screen h-screen'>
      <FulfillerTicketList id={params.id} />
    </main>
  );
}
