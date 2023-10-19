'use client';

import TicketList from '@/components/TicketList';
import PageHeader from '@/components/PageHeader';
import { View } from '@/models/View';

export default function Page() {
  return (
    <main className='flex min-h-screen max-h-screen gap-10 flex-col items-center'>
      <PageHeader title='Queue' />
      {/* <TicketList view={View.Requestor} /> */}
    </main>
  );
}
