import { Ticket } from "./Ticket";

export interface QuickRequest {
    Id: Number,
    Name: string,
    ZoneIds: Number[],
    Ticket?: Ticket
}