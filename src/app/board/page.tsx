"use client"
import RequestTickets from "@/components/TicketList/RequestTicket";
import BackButton from "@/components/BackButton";
import { Typography } from "@mui/material";
import TicketList from "@/components/TicketList";

export default function Page() {
    
    return (
        <main className="flex min-h-screen max-h-screen gap-10 flex-col items-center">
            <BackButton />
            <Typography className='p-5' variant='h4'>
                Ticket Board
            </Typography>
            <TicketList />
        </main>
    )
}