import { Status } from './Status';
import { Ticket } from './Ticket';

export interface RequestArea {
  Id: number;
  Name: string;
  Status?: Status;
  PlantId?: number;
  Ticket?: Ticket[];
}