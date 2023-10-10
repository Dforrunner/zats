"use client"
import BackButton from "@/components/BackButton";
import { Typography } from "@mui/material";
import TicketList from "@/components/TicketList";
import { TeamContext } from "@/context/TeamContext/TeamContext";
import { useContext } from "react";
import { TeamType } from "@/models/Team";

export default function Page() {
    const {team} = useContext(TeamContext);
    
    return (
        <main className="flex min-h-screen max-h-screen gap-10 flex-col items-center">
            <BackButton />
            <Typography className='pt-5' variant='h4'>
                Ticket Board - {team.Type === TeamType.Support && team.Name}
            </Typography>
            <TicketList />
        </main>
    )
}