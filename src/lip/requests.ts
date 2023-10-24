import { GET } from './endpoints';
import { RequestArea } from '@/models/RequestArea';
import { RequestQueue } from '@/models/RequestQueue';

export const getRequestQueue = async (id: string) => {
  const res = await fetch(GET.RequestQueue({ Id: id }), {
    next: { revalidate: 5 },
    cache: 'no-store',
  });
  return (await res.json()) as RequestQueue;
};

export const getRequestQueues = async () => {
  const res = await fetch(GET.RequestQueues(), {
    next: { revalidate: 5 },
    cache: 'no-store',
  });
  return (await res.json()) as RequestQueue[];
};

export const getRequestAreas = async () => {
  const res = await fetch(GET.RequestAreas(), {
    next: { revalidate: 5 },
    cache: 'no-store',
  });
  return (await res.json()) as RequestArea[];
};

export const getRequestArea = async (queueId: string) => {
  const res = await fetch(GET.RequestArea({ Id: queueId }), {
    next: { revalidate: 5 },
    cache: 'no-store',
  });
  return (await res.json()) as RequestArea;
};
