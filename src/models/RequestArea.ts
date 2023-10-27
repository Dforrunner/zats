import { Plant } from '@prisma/client';
import { Status } from './Status';
import { Ticket } from './Ticket';

export interface RequestArea {
  Id: number;
  Name: string;
  Description?: string;
  Status: Status;
  Tickets?: Ticket[];
  Plant?: Plant
}
