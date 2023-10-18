"user client";

import { TicketQueueContext } from "@/context/TicketQueueContext/TicketQueueContext";
import { ZoneContext } from "@/context/ZoneContext/ZoneContext";
import { TicketStatus } from "@/models/Ticket";
import { useContext } from "react";
import RequestTicket from "./RequestTicket";
import { v4 as uuidv4 } from 'uuid';
import { TeamContext } from "@/context/TeamContext/TeamContext";
import { TeamType } from "@/models/Team";
import SupportTicket from "./SupportTicket";

export default function TicketList() {
    const { ticketList } = useContext(TicketQueueContext);
    const { team } = useContext(TeamContext);

    return (
    <div className='flex flex-col items-center gap-3 w-full overflow-auto h-full pb-10'>
        {team.Type === TeamType.Zone && ticketList.map(ticket =>
            ticket.Zone.Id === team.Zone.Id &&
            <RequestTicket key={uuidv4()} ticket={ticket} />
        )}
        {team.Type === TeamType.Support && ticketList.map(ticket =>
            team.Zones.some(zone => zone.Id === ticket.Zone.Id) &&
            <SupportTicket key={uuidv4()} ticket={ticket} />
        )}
    </div>
    )
}