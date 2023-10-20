import { RequestQueue } from './RequestQueue';
import { RequestArea } from './RequestArea';

export enum TicketStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Assigned = 'Assigned',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Confirmed = 'Confirmed'
}

export interface Ticket {
  Id: number;
  RequestQueue?: RequestQueue;
  RequestQueueId: number;
  RequesterId: number;
  Requester: RequestArea;
  CreatedOn: Date;
  AssignedOn?: Date;
  StartedOn?: Date;
  CompletedOn?: Date;
  Status: TicketStatus;
}
