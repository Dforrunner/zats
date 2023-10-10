import { Ticket, TicketStatus} from "@/models/Ticket";

interface Action {
    Type: 'ADD' | 'REMOVE' | 'UPDATE',
    Payload: Ticket
}

const TicketQueueReducer = (state: Ticket[], action: Action) => {
    const payload = action.Payload;
   switch(action.Type) {
        case 'ADD':
           return !state.some(t =>
               t.Type.Id === payload.Type.Id &&
               t.Zone.Id === payload.Zone.Id &&
               t.Status !== TicketStatus.Canceled &&
               t.Status !== TicketStatus.Completed
           )
               ? [payload, ...state]
               : state
        case 'REMOVE':
            return state.filter((item: any) => item.Id !== payload.Id)
        case 'UPDATE':
           return [...state.map((item: any) => item.Id === payload.Id ? payload : item)]
        default:
            return state;
   }
}

export default TicketQueueReducer;