import PageHeader from '@/components/PageHeader';

export default function Page({ params }: { params: string }) {
  
  return (
    <main className='flex min-h-screen max-h-screen gap-4 flex-col items-center'>
      <PageHeader title='Select Requester Area' />

      {/* <TicketList /> */}
    </main>
  );
}
