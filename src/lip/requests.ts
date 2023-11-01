import { GET } from './endpoints';
import { RequestArea } from '@/models/RequestArea';
import { RequestQueue } from '@/models/RequestQueue';
import { Stats } from '@/models/Stats';

export const getRequestQueue = async (id: string) => {
  const res = await fetch(GET.RequestQueue({ Id: id }), {
    cache: 'no-store',
  });
  return (await res.json()) as RequestQueue;
};

export const getRequestQueues = async () => {
  const res = await fetch(GET.RequestQueues(), {
    cache: 'no-store',
  });
  return (await res.json()) as RequestQueue[];
};

export const getRequestArea = async (queueId: string) => {
  const res = await fetch(GET.RequestArea({ Id: queueId }), {
    cache: 'no-store',
  });
  return (await res.json()) as RequestArea;
};

export const getRequestAreas = async () => {
  const res = await fetch(GET.RequestAreas(), {
    cache: 'no-store',
  });
  return (await res.json()) as RequestArea[];
};

export const getStats = async (searchParams?: Record<string, string>) => {
  const res = await fetch(GET.Stats(searchParams), {
    cache: 'no-store',
  });
  return (await res.json());
};