'use client';

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box className='relative flex text-slate-300'>
      <CircularProgress
        variant='determinate'
        {...props}
        color='inherit'
        size='10'
      />
      <Box className='absolute w-full h-full flex justify-center items-center'>
        <Typography variant='caption' component='div'>
          {props.value / 10}
        </Typography>
      </Box>
    </Box>
  );
}

//TODO: Sync with refresh timer
export default function CounterDownProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
