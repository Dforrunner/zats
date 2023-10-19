import { RequestQueue } from './RequestQueue';
import { RequestArea } from './RequestArea';

export enum TicketStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Assigned = 'Assigned',
  Completed = 'Completed',
  Canceled = 'Canceled',
}

export interface Ticket {
  Id: number;
  Type: RequestQueue;
  TypeId?: number;
  RequestorId: number;
  Requestor: RequestArea;
  CreatedOn: Date;
  AssignedOn?: Date;
  StartedOn?: Date;
  CompletedOn?: Date;
  Status: TicketStatus;
}
