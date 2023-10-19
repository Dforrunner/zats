import PageHeader from '@/components/PageHeader/PageHeader';
import QueueSelection from '@/components/QueueSelection';

export default function Page() {
  return (
    <main className='w-screen h-screen'>
      <PageHeader title='Select Request Queue' />
      <QueueSelection />
    </main>
  );
}
