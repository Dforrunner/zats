import { Status } from './Status';
import { Ticket } from './Ticket';

export interface RequestArea {
  Id: number;
  Name: string;
  Description?: string;
  Status?: Status;
  PlantId?: number;
  Tickets?: Ticket[];
}
