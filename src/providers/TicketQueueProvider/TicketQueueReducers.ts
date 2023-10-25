import { Ticket } from '@/models/Ticket';

interface ModifyState {
  Type: 'ADD' | 'UPDATE';
  Payload: Ticket;
}

interface ResetState {
  Type: 'RESET_STATE';
  Payload: Ticket[];
}

type Action = ModifyState | ResetState;

const TicketQueueReducer = (state: Ticket[], action: Action) => {
  switch (action.Type) {
    case 'RESET_STATE':
      return action.Payload;
    case 'ADD':
      return [action.Payload, ...state];
    case 'UPDATE':
      return structuredClone(
        state.map((item: any) =>
          item.Id === action.Payload.Id ? action.Payload : item
        )
      );
    default:
      return state;
  }
};

export default TicketQueueReducer;
