import { RequestArea } from "./RequestArea";
import { RequestQueue } from "./RequestQueue";
import { Ticket } from "./Ticket";

export interface RequestAreaStats extends RequestArea {
    AvgWaitDuration: number,
    ActiveTickets: Ticket[],
    TotalTickets: number
}

export interface GroupedTickets {
    [key: string]: Ticket[]
}
export interface RequestQueueStats extends RequestQueue {
    AvgWaitDuration: number,
    GroupedTickets: GroupedTickets,
    TotalTicketCount: number,
    ActiveTicketCount: number,
    OpenTicketCount: number,
    InProgressTicketCount: number,
    AssignedTicketCount: number
}

export interface Stats {
    AvgPlantWaitDuration: number,
    TotalOpenTickets: number,
    TotalAssignedTickets: number,
    TotalInProgressTickets: number,
    TotalActiveTickets: number,
    AreaStats: RequestAreaStats[],
    QueueStats: RequestQueueStats[]
}