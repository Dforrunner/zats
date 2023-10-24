'use client';

import Link from '@/components/Link';
import { Button, Typography } from '@mui/material';

interface Props {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: Props) {
  const isNotFoundError = error.stack?.startsWith('NotFoundError');
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-5 text-center'>
      <Typography variant='h5' className='pb-10'>
        {error.message || 'Something went wrong'}
      </Typography>

      {!isNotFoundError && (
        <Typography variant='inherit'>
          Please try again later or contact support if the problem persists
        </Typography>
      )}
      <div className='flex gap-2 '>
        {!isNotFoundError && (
          <Button variant='outlined' onClick={reset}>
            Try again
          </Button>
        )}
        <Link
          type='button'
          href='/'
          variant='contained'
          className='bg-blue-500'
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
