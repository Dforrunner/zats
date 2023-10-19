'use client';
import PageHeader from '@/components/PageHeader';
import TicketList from '@/components/TicketList';
import { RequestQueue } from '@/models/RequestQueue';
import { View } from '@/models/View';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  params: {
    id: string;
  };
}
export default function Page({ params }: Props) {
  return (
    <main className='flex min-h-screen max-h-screen gap-10 flex-col items-center'>
      <PageHeader title='Select Request Queue' />
      <TicketList view={View.Fulfiller} id={params.id} />
    </main>
  );
}
