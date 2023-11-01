'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  interval?: number;
}
export default function RefreshTimer({ interval = 3000 }: Props) {
  const router = useRouter();

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      router.refresh();
    }, interval);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);
  return <></>;
}
