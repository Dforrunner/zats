'use client';

import Link from '@/components/Link';
import { updateSearchQuery } from '@/lip/helpers';
import { useSearchParams } from 'next/navigation';

export default function FilterButtons() {
  const searchParams = useSearchParams().toString();

  const path = (value: string) =>
    '/dashboard' + updateSearchQuery(searchParams, 'timePeriod', value);

  const btnStyle =
    'text-gray-300 border-gray-300 h-[26px] rounded-[20px] text-xs';
  return (
    <div className='flex justify-end gap-2 p-2 w-full'>
      <Link
        type='button'
        variant='outlined'
        href={path('day')}
        className={btnStyle}
      >
        Past Day
      </Link>
      <Link
        type='button'
        variant='outlined'
        href={path('week')}
        className={btnStyle}
      >
        Past Week
      </Link>
      <Link
        type='button'
        variant='outlined'
        href={path('month')}
        className={btnStyle}
      >
        Past Month
      </Link>
      <Link
        type='button'
        variant='outlined'
        href={path('year')}
        className={btnStyle}
      >
        Past Year
      </Link>
    </div>
  );
}
