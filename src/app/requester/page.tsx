import AreaSelection from '@/components/AreaSelection';
import PageHeader from '@/components/PageHeader';

export default function Page({ params }: { params: string }) {
  return (
    <main className='w-screen h-screen'>
      <PageHeader title='Select Requester Area' href='/' />
      <AreaSelection />
    </main>
  );
}
