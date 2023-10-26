'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    signIn('credentials', { redirect: false });
    console.log('AUTH');
  }, []);

  return (
    <main className='flex w-screen h-screen gap-10 flex-col items-center justify-center px-5'>
      Authenticating
    </main>
  );
}
