import { Ticket } from "./Ticket";

export interface RequestQueue {
    Id: number,
    Name: string,
    Status: string,
    Tickets?: Ticket[]
}