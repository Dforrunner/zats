'use client';

import { Typography, Button } from '@mui/material';
import { QuickRequest } from '@/models/QuickRequest';
import { v4 as uuidv4 } from 'uuid';
import { TicketQueueContext } from '@/context/TicketQueueContext/TicketQueueContext';
import { useContext } from 'react';

export default function QuickRequest() {
  const { addTicket } = useContext(TicketQueueContext);

  return (
    <div className='flex flex-col items-center bg-gray-200 w-full py-5'>
      <Typography sx={{ ml: 2, flex: 0 }} variant='h5' component='div'>
        Quick Request
      </Typography>

      {/* <div className='flex gap-5 p-5 justify-center w-full'>
          {['Quality'].map(
            (request) =>
              request.ZoneIds.includes(team.Zone.Id) && (
                <Button
                  className='bg-blue-500 w-[30%] h-[60px]'
                  variant='contained'
                  key={uuidv4()}
                  onClick={() => handleQuickRequest(request)}
                >
                  {request.Name}
                </Button>
              )
          )}
        </div> */}
    </div>
  );
}
