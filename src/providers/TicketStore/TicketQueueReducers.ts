import { Ticket } from '@/models/Ticket';

interface Action {
  Type: 'ADD' | 'UPDATE';
  Payload: Ticket;
}

const TicketQueueReducer = (state: Ticket[], action: Action) => {
  const payload = action.Payload;
  switch (action.Type) {
    case 'ADD':
      return [payload, ...state];
    case 'UPDATE':
      return structuredClone(
        state.map((item: any) => (item.Id === payload.Id ? payload : item))
      );
    default:
      return state;
  }
};

export default TicketQueueReducer;
