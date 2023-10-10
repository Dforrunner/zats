import { TicketQueueContext } from "@/context/TicketQueueContext/TicketQueueContext";
import { ZoneContext } from "@/context/ZoneContext/ZoneContext";
import { TicketStatus } from "@/models/Ticket";
import { useContext } from "react";
import RequestTicket from "./RequestTicket";
import { v4 as uuidv4 } from 'uuid';

export default function TicketList() {
    const { ticketList } = useContext(TicketQueueContext);
    const { zone } = useContext(ZoneContext);

    return (
    <div className='flex flex-col items-center gap-3 w-full overflow-auto h-full pb-10'>
        {ticketList.map(ticket =>
            ticket.Zone.Id === zone?.Id && ticket.Status !== TicketStatus.Completed &&
            <RequestTicket key={uuidv4()} ticket={ticket} />
        )}
    </div>
    )
}