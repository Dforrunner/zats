'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import QueueSelection from '@/components/QueueSelection';

export default function Page() {
  return (
    <main className='flex min-h-screen max-h-screen gap-10 flex-col items-center'>
      <PageHeader title='Select Request Queue' />
      <QueueSelection />
    </main>
  );
}
