'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Props {
  href: string;
  className?: string;
}
export default function BackButton({ href, className }: Props) {
  const router = useRouter();

  return (
    <Button
      className={className || 'bg-gray-400 '}
      onClick={() => router.push(href)}
      variant='contained'
      startIcon={<ArrowBackIosIcon />}
    >
      Back
    </Button>
  );
}
