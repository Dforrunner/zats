import Link from '@/components/Link';

export default function Home() {
  return (
    <main className='flex w-screen h-screen gap-10 flex-col items-center justify-center px-5'>
      <Link
        href='/dashboard'
        type='button'
        variant='contained'
        className='bg-gray-400 w-full h-[200px] text-4xl'
      >
        Dashboard
      </Link>

      <Link
        href='/requester'
        type='button'
        variant='contained'
        className='bg-blue-500 w-full h-[200px] text-4xl'
      >
        Requester
      </Link>

      <Link
        href='fulfiller'
        type='button'
        variant='contained'
        className='bg-blue-500 w-full h-[200px] text-4xl'
      >
        Fulfiller
      </Link>
    </main>
  );
}
