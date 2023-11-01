import { Status } from './Status';
import { Ticket } from './Ticket';

export interface RequestArea {
  Id: number;
  Name: string;
  Title: string;
  Description?: string;
  Status: Status;
  Tickets?: Ticket[];
}
