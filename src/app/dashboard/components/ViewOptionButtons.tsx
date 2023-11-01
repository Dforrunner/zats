'use client';

import Link from '@/components/Link';
import { updateSearchQuery } from '@/lip/helpers';
import { useSearchParams } from 'next/navigation';

export default function ViewOptionButtons() {
  const searchParams = useSearchParams().toString();

  const path = (value: string) =>
    '/dashboard' + updateSearchQuery(searchParams, 'board', value);

  const btnStyle =
    'text-gray-300 border-gray-300 h-[26px] rounded-[20px] text-xs';
  return (
    <div className='flex justify-start gap-2 p-2 w-full'>
      <Link
        type='button'
        variant='outlined'
        href={path('1')}
        className={btnStyle}
      >
        Overview
      </Link>
      <Link
        type='button'
        variant='outlined'
        href={path('2')}
        className={btnStyle}
      >
        Requests
      </Link>
      <Link
        type='button'
        variant='outlined'
        href={path('3')}
        className={btnStyle}
      >
        Charts
      </Link>
    </div>
  );
}
