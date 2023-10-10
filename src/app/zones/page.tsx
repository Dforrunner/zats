"use client"

import { Button } from '@mui/material'
import { useState } from 'react';

import CreateTicketDialog from '@/components/CreateTicketDialog';
import QuickRequests from '@/components/QuickRequests';

import RequestTickets from '@/components/TicketList/RequestTicket';
import BackButton from '@/components/BackButton';
import TicketList from '@/components/TicketList';

export default function Page() {
  const [open, setOpen] = useState(false);
  
  const handleCreateTicketDialogOpen = () => {
    setOpen(true);
  };

  const handleCreateTicketDialogClose = () => {
    setOpen(false);
  };

  return (
    <main className="flex min-h-screen max-h-screen gap-4 flex-col items-center">
      <BackButton />
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
