import { TicketType } from "./TicketType";
import { Zone } from "./Zone";

export enum TicketStatus {
    Active = 'Active',
    Pending = 'Pending',
    Accepted = 'Accepted',
    Completed = 'Completed',
    Canceled = 'Canceled'
}

export interface Ticket {
    Id: number,
    Type: TicketType,
    Title?: string,
    Description?: string,
    Zone: Zone,
    RequesterId?: number,
    QueueId?: number,
    CreatedOn: Date,
    AcceptedOn?: Date,
    CompletedOn?: Date,
    Status: TicketStatus,
    CompleterId?: number,
    PlaceInQueue?: number,
    EstimatedWaitTime?: string
}