'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Props {
  href: string;
}
export default function BackButton({ href }: Props) {
  const router = useRouter();

  return (
    <Button
      className='bg-gray-400 absolute top-5 left-9'
      onClick={() => router.push(href)}
      variant='contained'
      startIcon={<ArrowBackIosIcon />}
    >
      Back
    </Button>
  );
}
