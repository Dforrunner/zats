import AreaSelection from '@/components/AreaSelection';
import PageHeader from '@/components/PageHeader';

export default function Page({ params }: { params: string }) {
  return (
    <main className='w-full h-screen'>
      <div className='h-[9vh]'>
        <PageHeader title='Select Requester Area' href='/' />
      </div>
      <div className='h-[91vh]'>
        <AreaSelection />
      </div>
      
    </main>
  );
}
