"use client";

import { Button, Typography } from '@mui/material'
import { useContext, useState } from 'react';

import CreateTicketDialog from '@/components/CreateTicketDialog';
import QuickRequests from '@/components/QuickRequests';

import BackButton from '@/components/BackButton';
import TicketList from '@/components/TicketList';
import { TeamContext } from '@/context/TeamContext/TeamContext';
import { TeamType } from '@/models/Team';

export default function Page({ params }: {
  params: string
}) {
  const [open, setOpen] = useState(false);
  const {team} = useContext(TeamContext);
  console.log({params})
  const handleCreateTicketDialogOpen = () => {
    setOpen(true);
  };

  const handleCreateTicketDialogClose = () => {
    setOpen(false);
  };

  return (
    <main className="flex min-h-screen max-h-screen gap-4 flex-col items-center">
      <BackButton />
      <Typography variant='h4' className='pt-4'>
        {team.Type === TeamType.Zone && team.Zone.Name}
      </Typography>
      <QuickRequests />

      <Button
        className='w-[90%] h-[80px] text-[35px] bg-blue-500 -mt-3'
        variant="contained"
        onClick={handleCreateTicketDialogOpen}
      >
        New Request
      </Button>

      <CreateTicketDialog
        open={open}
        handleClose={handleCreateTicketDialogClose}
      />
      
      <h1 className='text-[30px]'>Request Tickets</h1>    

      <TicketList />
    </main>
  )
}