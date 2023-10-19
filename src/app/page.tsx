import Link from '@/components/Link';
import { Button } from '@mui/material';

export default function Home() {
  return (
    <main className='flex w-screen h-screen gap-10 flex-col items-center justify-center px-5'>
      <Link
        href='/requester'
        type='button'
        variant='contained'
        className='bg-blue-500 w-full h-[300px] text-4xl'
      >
        Requester
      </Link>

      <Link
        href='fulfiller'
        type='button'
        variant='contained'
        className='bg-blue-500 w-full h-[300px] text-4xl'
      >
        Fulfiller
      </Link>
    </main>
  );
}
