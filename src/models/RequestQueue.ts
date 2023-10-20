import { Plant } from "@prisma/client";
import { Ticket } from "./Ticket";

export interface RequestQueue {
    Id: number,
    Name: string,
    PlantId: number,
    Status: string,
    Tickets?: Ticket[]
    Plant?: Plant
}